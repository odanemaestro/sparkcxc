import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import SparkLoader from "../ui/SparkLoader";
import "./studyCircles.css";

const AVAILABILITY = [
  ["weekday_morning", "Weekday mornings"],
  ["weekday_afternoon", "Weekday afternoons"],
  ["weekday_evening", "Weekday evenings"],
  ["saturday", "Saturday"],
  ["sunday", "Sunday"],
];

function initials(name = "Student") {
  return String(name || "Student")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "S";
}

function StudyCircleAvatar({ name, src = "", className = "" }) {
  return (
    <div className={className} aria-label={name || "Study Circle member"}>
      {src ? <img src={src} alt="" aria-hidden="true" /> : initials(name)}
    </div>
  );
}

function relativeTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function skillChips(items, kind = "strength") {
  const safe = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!safe.length) return <span className="study-circle-empty-chip">Building from your practice data</span>;
  return safe.map(item => (
    <span className={`study-circle-skill-chip ${kind}`} key={`${kind}-${item}`}>{item}</span>
  ));
}

function safeError(error, fallback) {
  const text = String(error?.message || "");
  if (/spark_get_study_circle_home|spark_get_study_circle_posts|spark_get_study_circle_members_with_avatars|spark_create_study_circle_reply|function .* does not exist|schema cache/i.test(text)) {
    return "Study Circles needs its Supabase migration before it can be used.";
  }
  if (/personal contact|contact details/i.test(text)) {
    return "Keep personal contact details inside SPARK. Phone numbers, email addresses, social handles and external links cannot be posted.";
  }
  return fallback;
}

export default function StudyCirclesPanel({ user, showToast, setView }) {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [availability, setAvailability] = useState([]);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarUrls, setAvatarUrls] = useState({});
  const [replyTarget, setReplyTarget] = useState(null);
  const [reportTarget, setReportTarget] = useState(null);
  const [reportReason, setReportReason] = useState("Personal information");
  const [reportDetails, setReportDetails] = useState("");
  const [leaveOpen, setLeaveOpen] = useState(false);

  const load = useCallback(async ({ quiet = false } = {}) => {
    if (!user?.id) return;
    if (!quiet) setLoading(true);
    const { data, error: loadError } = await supabase.rpc("spark_get_study_circle_home");
    if (loadError) {
      console.error("Study Circles load failed:", loadError);
      setError(safeError(loadError, "Couldn't load Study Circles. Please try again."));
      if (!quiet) setLoading(false);
      return;
    }
    let nextHome = data || {};
    if (nextHome?.status === "matched") {
      const [postsResult, membersResult] = await Promise.all([
        supabase.rpc("spark_get_study_circle_posts"),
        supabase.rpc("spark_get_study_circle_members_with_avatars"),
      ]);

      const circleDataError = postsResult.error || membersResult.error;
      if (circleDataError) {
        console.error("Study Circle member/board load failed:", circleDataError);
        setError(safeError(circleDataError, "Couldn't load the Study Circle group. Please try again."));
        if (!quiet) setLoading(false);
        return;
      }

      nextHome = {
        ...nextHome,
        posts: Array.isArray(postsResult.data) ? postsResult.data : [],
        members: Array.isArray(membersResult.data) ? membersResult.data : [],
      };
    }
    setHome(nextHome);
    setAvailability(Array.isArray(nextHome?.preference?.preferred_times) ? nextHome.preference.preferred_times : []);
    setGuidelinesAccepted(Boolean(nextHome?.preference?.guidelines_accepted));
    setError("");
    if (!quiet) setLoading(false);
  }, [user?.id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!user?.id) return undefined;
    const channel = supabase
      .channel(`study-circle-notifications-${user.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `recipient_user_id=eq.${user.id}`,
      }, payload => {
        const type = String(payload?.new?.type || "");
        if (type === "study_circle_ready" || type === "study_circle_update") load({ quiet: true });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, load]);

  const profile = home?.profile || {};
  const profileReady = Boolean(profile.profile_ready);
  const status = home?.status || "inactive";
  const circle = home?.circle || null;
  const members = Array.isArray(home?.members) ? home.members : [];
  const agenda = Array.isArray(home?.agenda) ? home.agenda : [];
  const posts = Array.isArray(home?.posts) ? home.posts : [];

  // Student profile photos remain private. Resolve only the 3-4 unique
  // Circle-member paths, keep initials as the immediate fallback, and refresh
  // short-lived signed URLs before they expire. The fixed avatar containers
  // mean image loading cannot move or resize the existing UI.
  const avatarPathKey = useMemo(() => (
    Array.from(new Set(
      [
        ...members.map(member => member?.avatar_path),
        ...posts.map(post => post?.avatar_path),
      ].filter(value => typeof value === "string" && value.startsWith("profile-photos/"))
    )).sort().join("|")
  ), [members, posts]);

  useEffect(() => {
    const storedPaths = avatarPathKey ? avatarPathKey.split("|") : [];

    if (!storedPaths.length) {
      setAvatarUrls({});
      return undefined;
    }

    let active = true;

    const refreshAvatarUrls = async () => {
      const entries = await Promise.all(storedPaths.map(async storedPath => {
        const objectPath = storedPath.slice("profile-photos/".length);
        const { data: signedData, error: signedError } = await supabase.storage
          .from("profile-photos")
          .createSignedUrl(objectPath, 600);

        if (signedError) {
          console.warn("Study Circle avatar could not be signed:", signedError);
          return [storedPath, ""];
        }

        return [storedPath, signedData?.signedUrl || ""];
      }));

      if (active) setAvatarUrls(Object.fromEntries(entries));
    };

    refreshAvatarUrls();
    const timer = window.setInterval(refreshAvatarUrls, 8 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [avatarPathKey]);

  useEffect(() => {
    if (home?.status !== "matched") return undefined;
    const timer = window.setInterval(() => load({ quiet: true }), 20000);
    return () => window.clearInterval(timer);
  }, [home?.status, load]);

  const availabilityLabels = useMemo(
    () => AVAILABILITY.filter(([key]) => availability.includes(key)).map(([, label]) => label),
    [availability]
  );

  const toggleAvailability = key => {
    setAvailability(prev => prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]);
  };

  const setPreference = async (optedIn) => {
    setBusy(optedIn ? "join" : "pause");
    const { error: prefError } = await supabase.rpc("spark_set_study_circle_preference", {
      p_opted_in: optedIn,
      p_preferred_times: availability,
      p_accept_guidelines: optedIn ? guidelinesAccepted : false,
    });
    if (prefError) {
      console.error("Study Circle preference failed:", prefError);
      showToast?.(safeError(prefError, "Couldn't update your Study Circle preference."));
      setBusy("");
      return false;
    }
    await load({ quiet: true });
    setBusy("");
    return true;
  };

  const findMatch = async ({ ensurePreference = false } = {}) => {
    if (ensurePreference) {
      if (!guidelinesAccepted) {
        showToast?.("Please agree to the Study Circle guidelines first.");
        return;
      }
      const saved = await setPreference(true);
      if (!saved) return;
    }
    setBusy("match");
    const { data, error: matchError } = await supabase.rpc("spark_match_study_circle");
    if (matchError) {
      console.error("Study Circle matching failed:", matchError);
      showToast?.(safeError(matchError, "Couldn't search for a Study Circle right now."));
      setBusy("");
      return;
    }
    setHome(data || {});
    setBusy("");
    if (data?.status === "matched") showToast?.("Your Study Circle is ready.");
    else showToast?.("You're in the matching pool. SPARK will match you when a balanced group is available.");
  };

  const pauseMatching = async () => {
    const ok = await setPreference(false);
    if (ok) showToast?.("Study Circle matching paused.");
  };

  const startReply = post => {
    setReplyTarget(post);
    window.setTimeout(() => {
      document.getElementById("study-circle-composer")?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById("study-circle-message")?.focus({ preventScroll: true });
    }, 0);
  };
  const sendPost = async () => {
    const body = message.trim();
    if (!body || busy) return;
    setBusy("post");
    const request = replyTarget
      ? supabase.rpc("spark_create_study_circle_reply", {
          p_body: body,
          p_reply_to_post_id: replyTarget.id,
        })
      : supabase.rpc("spark_create_study_circle_post", { p_body: body });
    const { error: postError } = await request;
    if (postError) {
      console.error("Study Circle post failed:", postError);
      showToast?.(safeError(postError, "Couldn't post that message."));
      setBusy("");
      return;
    }
    setMessage("");
    setReplyTarget(null);
    await load({ quiet: true });
    setBusy("");
  };

  const submitReport = async () => {
    if (!reportTarget || busy) return;
    setBusy("report");
    const { error: reportError } = await supabase.rpc("spark_report_study_circle_post", {
      p_post_id: reportTarget.id,
      p_reason: reportReason,
      p_details: reportDetails.trim(),
    });
    if (reportError) {
      console.error("Study Circle report failed:", reportError);
      showToast?.("Couldn't submit the report. Please try again.");
      setBusy("");
      return;
    }
    setReportTarget(null);
    setReportReason("Personal information");
    setReportDetails("");
    setBusy("");
    showToast?.("Report submitted. Thanks for helping keep Study Circles safe.");
  };

  const leaveCircle = async () => {
    setBusy("leave");
    const { error: leaveError } = await supabase.rpc("spark_leave_study_circle");
    if (leaveError) {
      console.error("Study Circle leave failed:", leaveError);
      showToast?.("Couldn't leave the Study Circle. Please try again.");
      setBusy("");
      return;
    }
    setLeaveOpen(false);
    setBusy("");
    await load();
    showToast?.("You left the Study Circle. Matching is paused.");
  };

  if (loading) return <SparkLoader variant="section" label="Preparing Study Circles" />;

  if (error) {
    return (
      <section className="study-circles-shell">
        <div className="study-circle-page-heading">
          <div>
            <span className="study-circle-kicker">PEER LEARNING</span>
            <h1>Study Circles</h1>
            <p>Small groups matched around complementary strengths and focus areas.</p>
          </div>
        </div>
        <div className="study-circle-setup-card">
          <div className="study-circle-setup-icon">i</div>
          <div>
            <strong>Study Circles setup is required</strong>
            <p>{error}</p>
          </div>
          <button type="button" onClick={() => load()} className="study-circle-button secondary">Try again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="study-circles-shell" data-notification-anchor="student-study-circles">
      <div className="study-circle-page-heading">
        <div>
          <span className="study-circle-kicker">PEER LEARNING</span>
          <h1>Study Circles</h1>
          <p>Learn with students whose strengths complement the areas you want to improve.</p>
        </div>
        {status === "matched" && (
          <button type="button" className="study-circle-button secondary compact" onClick={() => load()} disabled={Boolean(busy)}>
            Refresh
          </button>
        )}
      </div>

      <div className="study-circle-profile-strip">
        <div className="study-circle-profile-copy">
          <span className="study-circle-kicker">YOUR LEARNING PROFILE</span>
          <strong>SPARK matches the pattern, not the score.</strong>
          <p>Your exact percentages are never shown to other students.</p>
        </div>
        <div className="study-circle-profile-group">
          <span className="study-circle-mini-label">You can help with</span>
          <div className="study-circle-chip-row">{skillChips(profile.strengths, "strength")}</div>
        </div>
        <div className="study-circle-profile-group">
          <span className="study-circle-mini-label">You want to strengthen</span>
          <div className="study-circle-chip-row">{skillChips(profile.focus, "focus")}</div>
        </div>
      </div>

      {status === "inactive" && (
        <>
          <div className="study-circle-hero-card">
            <div className="study-circle-hero-main">
              <span className="study-circle-kicker">RECIPROCAL MATCHING</span>
              <h2>Bring a strength. Build a strength.</h2>
              <p>
                SPARK looks for a small CSEC Mathematics group where each person has something useful to contribute
                and something useful to learn. No one is labelled the “weak student”.
              </p>
              <div className="study-circle-principles">
                <div><b>1</b><span><strong>Match</strong>Complementary strengths, focus areas and broad availability.</span></div>
                <div><b>2</b><span><strong>Collaborate</strong>Use a shared agenda and an in-SPARK study board.</span></div>
                <div><b>3</b><span><strong>Improve</strong>Your future practice data can make later matches smarter.</span></div>
              </div>
            </div>
            <div className="study-circle-safety-card">
              <span className="study-circle-kicker">BUILT FOR STUDENT SAFETY</span>
              <h3>Keep the learning inside SPARK.</h3>
              <ul>
                <li>No email addresses, phone numbers, social handles or external links in the study board.</li>
                <li>Other students see broad strengths and focus areas, never your exact scores.</li>
                <li>There are no private one-to-one messages inside Study Circles.</li>
                <li>Any post can be reported for review.</li>
              </ul>
            </div>
          </div>

          {!profileReady ? (
            <div className="study-circle-join-card study-circle-profile-needed">
              <div className="study-circle-section-heading">
                <div>
                  <span className="study-circle-kicker">BUILD YOUR MATCHING PROFILE</span>
                  <h2>Give SPARK enough evidence to make a useful match.</h2>
                  <p>
                    Complete a little Adaptive Practice first. Once SPARK has evidence of at least one
                    strength or focus area, Study Circle matching becomes available.
                  </p>
                </div>
              </div>
              <div className="study-circle-actions">
                <button type="button" className="study-circle-button primary" onClick={() => setView?.("practice")}>
                  Open Adaptive Practice
                </button>
              </div>
            </div>
          ) : (
            <div className="study-circle-join-card">
              <div className="study-circle-section-heading">
                <div>
                  <span className="study-circle-kicker">WHEN DO YOU USUALLY STUDY?</span>
                  <h2>Choose broad availability</h2>
                  <p>This is used only to improve matching. It is not a live calendar.</p>
                </div>
              </div>
              <div className="study-circle-availability">
                {AVAILABILITY.map(([key, label]) => (
                  <button
                    type="button"
                    key={key}
                    className={availability.includes(key) ? "selected" : ""}
                    aria-pressed={availability.includes(key)}
                    onClick={() => toggleAvailability(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label className="study-circle-guideline-check">
                <input
                  type="checkbox"
                  checked={guidelinesAccepted}
                  onChange={event => setGuidelinesAccepted(event.target.checked)}
                />
                <span>
                  I agree to keep Study Circle conversations respectful, academic and inside SPARK, and not share personal contact information.
                </span>
              </label>
              <div className="study-circle-actions">
                <button
                  type="button"
                  className="study-circle-button primary"
                  onClick={() => findMatch({ ensurePreference: true })}
                  disabled={!guidelinesAccepted || Boolean(busy)}
                >
                  {busy === "join" || busy === "match" ? "Finding your circle..." : "Find my Study Circle"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {status === "waiting" && (
        <div className="study-circle-waiting-card">
          <div className="study-circle-waiting-mark"><span /><span /><span /></div>
          <span className="study-circle-kicker">MATCHING POOL</span>
          <h2>We're building the right group, not the fastest group.</h2>
          <p>
            SPARK needs at least three opted-in students for a Study Circle. Matching favours complementary learning profiles
            and overlapping availability instead of simply grouping the next people in line.
          </p>
          {availabilityLabels.length > 0 && (
            <div className="study-circle-availability-summary">
              <span>Preferred times</span>
              <strong>{availabilityLabels.join(" · ")}</strong>
            </div>
          )}
          <div className="study-circle-actions">
            <button type="button" className="study-circle-button primary" onClick={() => findMatch()} disabled={Boolean(busy)}>
              {busy === "match" ? "Checking..." : "Check for a match"}
            </button>
            <button type="button" className="study-circle-button secondary" onClick={pauseMatching} disabled={Boolean(busy)}>
              Pause matching
            </button>
          </div>
        </div>
      )}

      {status === "matched" && circle && (
        <>
          <div className="study-circle-match-hero">
            <div>
              <span className="study-circle-kicker">YOUR STUDY CIRCLE</span>
              <h2>{circle.title || "CSEC Mathematics Study Circle"}</h2>
              <p>{members.length} students · matched from complementary learning profiles</p>
            </div>
            <div className="study-circle-match-pill">Matched by SPARK</div>
          </div>

          <div className="study-circle-section-heading">
            <div>
              <span className="study-circle-kicker">YOUR GROUP</span>
              <h2>Everyone brings something.</h2>
              <p>Only broad learning areas are shared. Exact mastery scores stay private.</p>
            </div>
          </div>

          <div className="study-circle-member-grid">
            {members.map((member, index) => (
              <article className={`study-circle-member-card ${member.is_self ? "is-self" : ""}`} key={`${member.name}-${index}`}>
                <div className="study-circle-member-head">
                  <StudyCircleAvatar
                    name={member.name}
                    src={avatarUrls[member.avatar_path] || ""}
                    className="study-circle-avatar"
                  />
                  <div>
                    <strong>{member.name}{member.is_self ? " · You" : ""}</strong>
                    <span>{member.is_self ? "Your learning profile" : "Study Circle member"}</span>
                  </div>
                </div>
                <div className="study-circle-member-block">
                  <span>Can help with</span>
                  <div className="study-circle-chip-row">{skillChips(member.strengths, "strength")}</div>
                </div>
                <div className="study-circle-member-block">
                  <span>Working on</span>
                  <div className="study-circle-chip-row">{skillChips(member.focus, "focus")}</div>
                </div>
                {Number(member.contribution_count || 0) > 0 && (
                  <div className="study-circle-contribution">{member.contribution_count} board contribution{Number(member.contribution_count) === 1 ? "" : "s"}</div>
                )}
              </article>
            ))}
          </div>

          <div className="study-circle-agenda-card">
            <div className="study-circle-section-heading">
              <div>
                <span className="study-circle-kicker">SUGGESTED COLLABORATION</span>
                <h2>Your shared study agenda</h2>
                <p>SPARK uses the group's learning pattern to suggest useful peer-to-peer exchanges.</p>
              </div>
            </div>
            {agenda.length ? (
              <div className="study-circle-agenda-list">
                {agenda.map((item, index) => (
                  <div className="study-circle-agenda-row" key={`${item.skill}-${index}`}>
                    <div className="study-circle-agenda-number">{index + 1}</div>
                    <div>
                      <strong>{item.skill}</strong>
                      <span>
                        {item.guide && item.guide !== "Work together"
                          ? `${item.guide} can lead a walkthrough while ${item.focus_for} practises the method.`
                          : `Work through an example together and compare methods.`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="study-circle-empty-state">
                Keep practising in SPARK. As the group builds more mastery data, the shared agenda will become more specific.
              </div>
            )}
          </div>

          <div className="study-circle-board">
            <div className="study-circle-section-heading">
              <div>
                <span className="study-circle-kicker">STUDY BOARD</span>
                <h2>Ask. Explain. Compare methods.</h2>
                <p>The board is shared with this Study Circle only. There are no private messages.</p>
              </div>
            </div>

            <div className="study-circle-composer" id="study-circle-composer">
              {replyTarget && (
                <div className="study-circle-replying-banner">
                  <div>
                    <span>Replying to {replyTarget.author}</span>
                    <strong>{replyTarget.body}</strong>
                  </div>
                  <button type="button" aria-label="Cancel reply" onClick={() => setReplyTarget(null)}>×</button>
                </div>
              )}
              <textarea
                id="study-circle-message"
                value={message}
                onChange={event => setMessage(event.target.value.slice(0, 700))}
                placeholder="Ask a question, explain a step, or share a study tip..."
                rows={3}
                aria-label="Study Circle message"
              />
              <div className="study-circle-composer-footer">
                <span>{message.length}/700 · Don't share phone numbers, emails, social handles or links.</span>
                <button
                  type="button"
                  className="study-circle-button primary compact"
                  onClick={sendPost}
                  disabled={!message.trim() || Boolean(busy)}
                >
                  {busy === "post" ? "Posting..." : "Post to circle"}
                </button>
              </div>
            </div>

            <div className="study-circle-post-list">
              {posts.length ? posts.map(post => (
                <article className={`study-circle-post ${post.is_mine ? "is-mine" : ""}`} key={post.id}>
                  <StudyCircleAvatar
                    name={post.author}
                    src={avatarUrls[post.avatar_path] || ""}
                    className="study-circle-post-avatar"
                  />
                  <div className="study-circle-post-body">
                    <div className="study-circle-post-meta">
                      <strong>{post.author}{post.is_mine ? " · You" : ""}</strong>
                      <span>{relativeTime(post.created_at)}</span>
                    </div>
                    {post.reply_to && (
                      <div className="study-circle-reply-quote">
                        <span>Replying to {post.reply_to.author}</span>
                        <div>{post.reply_to.body}</div>
                      </div>
                    )}
                    <p>{post.body}</p>
                    <div className="study-circle-post-actions">
                      <button type="button" className="study-circle-reply-link" onClick={() => startReply(post)}>
                        Reply
                      </button>
                      {!post.is_mine && (
                        <button type="button" className="study-circle-report-link" onClick={() => setReportTarget(post)}>
                          Report
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )) : (
                <div className="study-circle-empty-state">
                  Your Study Circle board is ready. Start with one of the suggested agenda topics above.
                </div>
              )}
            </div>
          </div>

          <div className="study-circle-footer-card">
            <div>
              <strong>Need a different group?</strong>
              <p>Leaving pauses matching. You can opt in again whenever you're ready for another Study Circle.</p>
            </div>
            <button type="button" className="study-circle-button danger secondary" onClick={() => setLeaveOpen(true)}>
              Leave circle
            </button>
          </div>
        </>
      )}

      {reportTarget && (
        <div className="study-circle-modal-layer" role="presentation">
          <button type="button" className="study-circle-modal-scrim" aria-label="Close report" onClick={() => setReportTarget(null)} />
          <div className="study-circle-modal" role="dialog" aria-modal="true" aria-labelledby="study-circle-report-title">
            <div className="study-circle-modal-head">
              <div>
                <span className="study-circle-kicker">KEEP THE CIRCLE SAFE</span>
                <h2 id="study-circle-report-title">Report this post</h2>
              </div>
              <button type="button" className="study-circle-modal-close" aria-label="Close report" onClick={() => setReportTarget(null)}>×</button>
            </div>
            <label>
              Reason
              <select value={reportReason} onChange={event => setReportReason(event.target.value)}>
                <option>Personal information</option>
                <option>Unkind or inappropriate</option>
                <option>Off-topic or spam</option>
                <option>Academic misconduct</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Additional details <span>optional</span>
              <textarea rows={3} maxLength={500} value={reportDetails} onChange={event => setReportDetails(event.target.value)} />
            </label>
            <div className="study-circle-modal-actions">
              <button type="button" className="study-circle-button secondary" onClick={() => setReportTarget(null)}>Cancel</button>
              <button type="button" className="study-circle-button primary" onClick={submitReport} disabled={busy === "report"}>
                {busy === "report" ? "Submitting..." : "Submit report"}
              </button>
            </div>
          </div>
        </div>
      )}

      {leaveOpen && (
        <div className="study-circle-modal-layer" role="presentation">
          <button type="button" className="study-circle-modal-scrim" aria-label="Close" onClick={() => setLeaveOpen(false)} />
          <div className="study-circle-modal compact-modal" role="dialog" aria-modal="true" aria-labelledby="study-circle-leave-title">
            <div className="study-circle-modal-head">
              <div>
                <span className="study-circle-kicker">STUDY CIRCLE</span>
                <h2 id="study-circle-leave-title">Leave this circle?</h2>
              </div>
              <button type="button" className="study-circle-modal-close" aria-label="Close" onClick={() => setLeaveOpen(false)}>×</button>
            </div>
            <p className="study-circle-modal-copy">You'll stop seeing the group's board and matching will be paused. You can opt in again later.</p>
            <div className="study-circle-modal-actions">
              <button type="button" className="study-circle-button secondary" onClick={() => setLeaveOpen(false)}>Stay in circle</button>
              <button type="button" className="study-circle-button danger" onClick={leaveCircle} disabled={busy === "leave"}>
                {busy === "leave" ? "Leaving..." : "Leave circle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
