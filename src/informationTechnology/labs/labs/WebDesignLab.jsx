import React, { useMemo, useRef, useState } from "react";
import { LabFrame, RibbonTabs, WindowBar } from "../components/LabFrame";
import { ReducedMotionNotice, StatusMessage, ToolGroup, WorkspaceViewport, useTaskEvidence } from "../components/ProductivityKit";
import { checkSiteLinks, normalizePagePath, pageForPath } from "../models/siteModel.mjs";

const PREVIEWS = {
  desktop: { label: "Desktop", width: 720, height: 430 },
  tablet: { label: "Tablet", width: 560, height: 470 },
  mobile: { label: "Mobile", width: 330, height: 520 },
};

const NEW_PAGES = [
  { id: "activities", title: "Activities", path: "/activities", heading: "Club Activities", body: "Explore coding, robotics and digital design projects." },
  { id: "contact", title: "Contact", path: "/contact", heading: "Contact the Club", body: "Get in touch with the school technology club." },
];

export default function WebDesignLab({ lab, completed, onBack, onComplete, onEvidence }) {
  const [tab, setTab] = useState("Design");
  const [pages, setPages] = useState([{ id: "home", title: "Home", path: "/", heading: "Technology Club", body: "Welcome to our technology club website." }]);
  const [selected, setSelected] = useState("home");
  const [visited, setVisited] = useState("home");
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [image, setImage] = useState(false);
  const [links, setLinks] = useState({ pageId: "home", emailLabel: "Email us", emailHref: "mailto:club@example.com", externalLabel: "School website", externalHref: "https://example.com" });
  const [preview, setPreview] = useState("desktop");
  const [report, setReport] = useState(null);
  const revision = useRef(0);
  const { evidence, record } = useTaskEvidence(onEvidence);

  const page = pages.find(item => item.id === selected) ?? pages[0];
  const livePage = pages.find(item => item.id === visited) ?? pages[0];
  const previewSpec = PREVIEWS[preview];
  const uniqueValidPages = pages.length === 3 && new Set(pages.map(item => normalizePagePath(item.path))).size === 3 && pages.every(item => item.title.trim() && item.heading.trim() && item.body.trim());
  const currentCheck = useMemo(() => checkSiteLinks(pages, links), [pages, links]);
  const checkedCurrentRevision = report?.revision === revision.current;
  const checksPassed = checkedCurrentRevision && report.result.valid;
  const tasks = [
    { id: "plan", label: "Define the site purpose and audience", done: purpose.trim().length >= 8 && audience.trim().length >= 4 },
    { id: "pages", label: "Create three valid pages with unique paths", done: uniqueValidPages },
    { id: "content", label: "Edit page headings and body content", done: evidence.has("heading-edit") && evidence.has("body-edit") },
    { id: "media", label: "Insert a graphic in the rendered site", done: image },
    { id: "links", label: "Create valid email and external hyperlinks", done: evidence.has("email-edit") && evidence.has("external-edit") && currentCheck.issues.every(issue => !["email", "external"].includes(issue.type)) },
    { id: "navigation", label: "Use the site navigation to open another page", done: evidence.has("navigation") },
    { id: "responsive", label: "Check more than one preview size, including mobile", done: evidence.has("preview-mobile") && evidence.has("preview-other") },
    { id: "test", label: "Run the link checker with no errors", done: checksPassed && uniqueValidPages },
  ];

  function invalidate() {
    revision.current += 1;
    setReport(null);
  }

  function addPage() {
    const next = NEW_PAGES.find(candidate => !pages.some(item => item.id === candidate.id));
    if (!next) return;
    setPages(previous => [...previous, next]);
    setSelected(next.id);
    invalidate();
  }

  function updatePage(patch, evidenceId) {
    setPages(previous => previous.map(item => item.id === selected ? { ...item, ...patch } : item));
    if (evidenceId) record(evidenceId);
    invalidate();
  }

  function updateLinks(patch, evidenceId) {
    setLinks(previous => ({ ...previous, ...patch }));
    if (evidenceId) record(evidenceId);
    invalidate();
  }

  function navigate(path) {
    const destination = pageForPath(pages, path);
    if (!destination) return;
    if (destination.id !== visited) record("navigation");
    setVisited(destination.id);
    setSelected(destination.id);
  }

  function resizePreview(mode) {
    setPreview(mode);
    record(mode === "mobile" ? "preview-mobile" : "preview-other");
  }

  function runChecker() {
    const result = checkSiteLinks(pages, links);
    setReport({ revision: revision.current, result });
    setTab("Publish");
  }

  return (
    <LabFrame lab={lab} tasks={tasks} completed={completed} onBack={onBack} onComplete={onComplete}
      footer={<span>{pages.length}/3 pages · Preview: {previewSpec.label} {previewSpec.width} × {previewSpec.height} · {checksPassed ? "Links passed" : "Checks required"}</span>}>
      <div className="itv2-office-window web">
        <WindowBar title="School Technology Club" subtitle="SPARK Web Design Studio" status={checkedCurrentRevision ? (checksPassed ? "Ready" : `${report.result.issues.length} errors`) : "Draft"}/>
        <RibbonTabs tabs={["Design", "Insert", "Preview", "Publish"]} active={tab} onChange={setTab}/>

        <div className="itv2-ribbon">
          {tab === "Design" && <>
            <ToolGroup label="Site plan"><label>Purpose<input aria-label="Site purpose" value={purpose} onChange={event => setPurpose(event.target.value)} placeholder="Promote club activities"/></label><label>Audience<input aria-label="Site audience" value={audience} onChange={event => setAudience(event.target.value)} placeholder="Students and parents"/></label></ToolGroup>
            <ToolGroup label="Pages"><button type="button" onClick={addPage} disabled={pages.length >= 3}>＋ Add Page</button></ToolGroup>
          </>}
          {tab === "Insert" && <>
            <ToolGroup label="Media"><button type="button" className={image ? "active" : ""} aria-pressed={image} onClick={() => { setImage(value => !value); invalidate(); }}>Image</button></ToolGroup>
            <ToolGroup label="Email link"><label>Text<input aria-label="Email link text" value={links.emailLabel} onChange={event => updateLinks({ emailLabel: event.target.value }, "email-edit")}/></label><label>Address<input aria-label="Email link address" value={links.emailHref} onChange={event => updateLinks({ emailHref: event.target.value }, "email-edit")}/></label></ToolGroup>
            <ToolGroup label="External link"><label>Text<input aria-label="External link text" value={links.externalLabel} onChange={event => updateLinks({ externalLabel: event.target.value }, "external-edit")}/></label><label>Address<input aria-label="External link address" value={links.externalHref} onChange={event => updateLinks({ externalHref: event.target.value }, "external-edit")}/></label></ToolGroup>
          </>}
          {tab === "Preview" && <ToolGroup label="Responsive preview">{Object.entries(PREVIEWS).map(([key, item]) => <button type="button" key={key} className={preview === key ? "active" : ""} aria-pressed={preview === key} onClick={() => resizePreview(key)}>{item.label}</button>)}<ReducedMotionNotice/></ToolGroup>}
          {tab === "Publish" && <ToolGroup label="Site checks"><button type="button" onClick={runChecker}>Run link checker</button><button type="button" disabled={!checksPassed || !uniqueValidPages}>Publish site</button></ToolGroup>}
        </div>

        {report && <StatusMessage tone={report.result.valid ? "success" : "error"}><strong>{report.result.valid ? "All links passed" : `${report.result.issues.length} link-checker errors`}</strong><span>{report.result.valid ? `${report.result.checked} navigation and hyperlink checks completed.` : "Select an error below to correct its page or link."}</span></StatusMessage>}

        <div className="itv2-web-layout">
          <aside className="itv2-site-tree" aria-label="Site pages">
            <strong>Site pages</strong>
            {pages.map(item => <button type="button" key={item.id} className={item.id === selected ? "active" : ""} aria-current={item.id === selected ? "page" : undefined} onClick={() => setSelected(item.id)}><span>{item.title || "Untitled"}</span><small>{normalizePagePath(item.path)}</small></button>)}
          </aside>

          <section className="itv2-web-editor">
            <div className="itv2-web-fields">
              <label>Page title<input aria-label="Page title" value={page.title} onChange={event => updatePage({ title: event.target.value })}/></label>
              <label>Page path<input aria-label="Page path" value={page.path} onChange={event => updatePage({ path: event.target.value })}/></label>
              <label>Heading<input aria-label="Page heading" value={page.heading} onChange={event => updatePage({ heading: event.target.value }, "heading-edit")}/></label>
              <label>Body<textarea aria-label="Page body" value={page.body} onChange={event => updatePage({ body: event.target.value }, "body-edit")}/></label>
            </div>

            <WorkspaceViewport label={`${previewSpec.label} website preview`} className="itv2-web-preview-stage">
              <div className={`itv2-browser-preview ${preview}`} style={{ "--preview-width": `${previewSpec.width}px`, "--preview-height": `${previewSpec.height}px` }}>
                <div className="itv2-browser-bar"><span aria-hidden="true">● ● ●</span><strong>https://spark.local{normalizePagePath(livePage.path)}</strong><em>{previewSpec.width} × {previewSpec.height}</em></div>
                <div className="itv2-rendered-site">
                  <header><strong>Technology Club</strong><nav aria-label="Preview site navigation">{pages.map(item => <button type="button" key={item.id} aria-current={item.id === visited ? "page" : undefined} onClick={() => navigate(item.path)}>{item.title || "Untitled"}</button>)}</nav></header>
                  <main><p className="itv2-site-eyebrow">SCHOOL TECHNOLOGY CLUB</p><h2>{livePage.heading}</h2><p>{livePage.body}</p>{image && <div className="itv2-site-image" role="img" aria-label="Students building a technology project"><span>TECH</span><small>CREATE · CODE · CONNECT</small></div>}<div className="itv2-site-links"><a href={links.emailHref} onClick={event => event.preventDefault()}>{links.emailLabel || "Untitled email link"}</a><a href={links.externalHref} onClick={event => event.preventDefault()}>{links.externalLabel || "Untitled external link"}</a></div></main>
                </div>
              </div>
            </WorkspaceViewport>
          </section>
        </div>

        <section className={`itv2-link-report ${report ? (report.result.valid ? "tested" : "errors") : ""}`} aria-label="Link checker results" aria-live="polite">
          {!report && <p>Run the link checker to test every page destination, email address and external website.</p>}
          {report?.result.valid && <p><strong>✓ No errors found.</strong> Internal navigation, email and external links are valid.</p>}
          {report && !report.result.valid && <><header><strong>Errors to fix</strong><span>{report.result.issues.length} found</span></header><ul>{report.result.issues.map((issue, index) => <li key={`${issue.type}-${issue.pageId}-${index}`}><button type="button" onClick={() => { if (pages.some(item => item.id === issue.pageId)) setSelected(issue.pageId); setTab(issue.type === "page" ? "Design" : "Insert"); }}><b>{issue.type}</b><span>{issue.message}</span><code>{issue.href}</code></button></li>)}</ul></>}
        </section>
      </div>
    </LabFrame>
  );
}