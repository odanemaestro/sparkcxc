import React, { useCallback, useEffect, useMemo, useState } from "react";
import SparkLoader from "../components/ui/SparkLoader";
import Card from "../components/ui/Card";
import { recordSubjectActivity } from "./subjectProgress";
import { loadGenericSubjectStructure } from "./genericSubjectCatalog";
import IntegratedScienceModel from "./components/IntegratedScienceModel";
import IntegratedScienceLabelDiagram from "./components/IntegratedScienceLabelDiagram";
import ReviewedScienceDiagram from "./components/ReviewedScienceDiagram";
import InteractiveLabelDiagram from "./components/InteractiveLabelDiagram";
import TransportProcessExplorer from "./components/TransportProcessExplorer";
import EnglishALessonExamples from "../englishA/components/EnglishALessonExamples";
import IntegratedScienceText from "../integratedScience/components/IntegratedScienceText";
import {
  readSparkHashRoute,
  subscribeSparkRoute,
  writeSparkNestedRoute,
} from "../routing/sparkRoutingV270";
import "./genericSubjectStudy.css";

function lessonData(topic = {}) {
  const lesson = topic?.metadata?.lesson;
  return lesson && typeof lesson === "object" && !Array.isArray(lesson) ? lesson : {};
}

function lessonSections(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.sections) ? lesson.sections.filter(Boolean) : [];
}

function keyPoints(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.keyPoints) ? lesson.keyPoints.filter(Boolean) : [];
}

function lessonObjectives(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.objectives) ? lesson.objectives.filter(Boolean) : [];
}

const removedIntegratedScienceDiagramTemplates = new Set([
  "mammalian-ear",
  "flower-longitudinal",
  "human-digestive-system",
  "human-tooth",
  "human-respiratory-system",
  "human-heart",
]);

const integratedScienceReferenceOnlyDiagrams = {
  "bean-seed": { diagramId:"0263", hideCaption:true },
  "male-reproductive-system": { diagramId:"0265", hideCaption:false },
  "three-pin-plug": { diagramId:"0278", hideCaption:true },
};

function lessonDiagrams(topic = {}) {
  const lesson = lessonData(topic);
  const diagrams = Array.isArray(lesson.interactiveDiagrams) ? lesson.interactiveDiagrams.filter(Boolean) : [];
  const seen = new Set();
  return diagrams.filter(diagram => {
    const key = String(diagram?.id || "").trim();
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function interactiveDiagrams(topic = {},subjectId = "") {
  return lessonDiagrams(topic).filter(diagram => {
    if (subjectId !== "integrated-science") return true;
    if (removedIntegratedScienceDiagramTemplates.has(diagram?.template)) return false;
    if (integratedScienceReferenceOnlyDiagrams[diagram?.template]) return false;
    return true;
  });
}

function referenceDiagrams(topic = {},subjectId = "") {
  if (subjectId !== "integrated-science") return [];
  return lessonDiagrams(topic)
    .map(diagram => {
      const reference = integratedScienceReferenceOnlyDiagrams[diagram?.template];
      return reference ? {...reference,key:diagram.id || diagram.template,template:diagram.template} : null;
    })
    .filter(Boolean);
}

function interactiveModels(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.interactiveModels) ? lesson.interactiveModels.filter(Boolean) : [];
}

function routeSelection(path, structure) {
  const route = readSparkHashRoute();
  if (route.path !== path) return { sectionId:null, topicId:null };

  const sectionId = String(route.params.get("section") || "");
  const topicId = String(route.params.get("topic") || "");
  const topic = (structure?.topics || []).find(item => item.id === topicId);

  if (topic) {
    return {
      sectionId:topic.sectionId || sectionId || null,
      topicId:topic.id,
    };
  }

  const section = (structure?.sections || []).find(item => item.id === sectionId);
  return { sectionId:section?.id || null, topicId:null };
}

function firstTopic(structure, completedIds = new Set()) {
  return (structure?.topics || []).find(topic => !completedIds.has(topic.id))
    || structure?.topics?.[0]
    || null;
}

function isTopicUnlocked(structure, topicId, completedIds = new Set()) {
  const topics = structure?.topics || [];
  const index = topics.findIndex(topic => topic.id === topicId);
  if (index < 0) return false;
  if (index === 0 || completedIds.has(topicId)) return true;
  return topics.slice(0, index).every(topic => completedIds.has(topic.id));
}

export function GenericLessonContent({
  subjectId,
  topic,
  completedActivityKeys = new Set(),
  onActivityComplete,
}) {
  const DiagramActivity = subjectId === "integrated-science" ? IntegratedScienceLabelDiagram : InteractiveLabelDiagram;
  const lesson = lessonData(topic);
  const blocks = lessonSections(topic);
  const points = keyPoints(topic);
  const objectives = lessonObjectives(topic);
  const diagrams = interactiveDiagrams(topic,subjectId);
  const references = referenceDiagrams(topic,subjectId);
  const models = interactiveModels(topic);
  const intro = String(lesson.introduction || topic?.description || "").trim();
  const renderLessonText = value => subjectId === "integrated-science"
    ? <IntegratedScienceText>{String(value ?? "")}</IntegratedScienceText>
    : String(value ?? "");
  const summary = String(lesson.summary || "").trim();
  const example = lesson.workedExample && typeof lesson.workedExample === "object"
    ? lesson.workedExample
    : null;

  return (
    <div className="spark-generic-lesson-body">
      {intro && <p className="spark-generic-lesson-intro">{renderLessonText(intro)}</p>}

      {objectives.length > 0 && (
        <Card className="spark-generic-objectives">
          <strong>What you should be able to do</strong>
          <ul>
            {objectives.map((objective,index) => <li key={index}>{renderLessonText(objective)}</li>)}
          </ul>
        </Card>
      )}

      {blocks.map((block, index) => {
        const paragraphs = Array.isArray(block?.paragraphs)
          ? block.paragraphs
          : block?.body
            ? [block.body]
            : [];
        const bullets = Array.isArray(block?.bullets) ? block.bullets : [];

        return (
          <section key={`${block?.title || "section"}-${index}`} className="spark-generic-lesson-section">
            {block?.title && <h3>{renderLessonText(block.title)}</h3>}
            {paragraphs.filter(Boolean).map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{renderLessonText(paragraph)}</p>
            ))}
            {bullets.length > 0 && (
              <ul>
                {bullets.filter(Boolean).map((item, bulletIndex) => (
                  <li key={bulletIndex}>{renderLessonText(item)}</li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      {models.map(model => (
        subjectId === "integrated-science"
          ? <div className="spark-integrated-science-model" key={model.id || model.type}><IntegratedScienceModel model={model} /></div>
          : model?.type === "membrane-transport"
          ? <TransportProcessExplorer key={model.id || "membrane-transport"} />
          : null
      ))}

      {diagrams.map(diagram => (
        <DiagramActivity
          key={diagram.id || diagram.title}
          activity={diagram}
          completed={completedActivityKeys.has(`diagram:${diagram.id}`)}
          onComplete={result => onActivityComplete?.({
            ...result,
            topicId:topic.id,
            sectionId:topic.sectionId,
          })}
        />
      ))}

      {references.map(reference => (
        <div className="spark-integrated-science-reference-diagram" key={reference.key}>
          <ReviewedScienceDiagram
            diagramId={reference.diagramId}
            hideCaption={reference.hideCaption}
          />
        </div>
      ))}

      {subjectId === "english-a" && (
        <EnglishALessonExamples key={topic?.id} topicId={topic?.id} />
      )}

      {points.length > 0 && (
        <Card className="spark-generic-key-points">
          <strong>Key points</strong>
          <ul>
            {points.map((point, index) => <li key={index}>{renderLessonText(point)}</li>)}
          </ul>
        </Card>
      )}

      {example && (
        <Card className="spark-generic-worked-example">
          <span>Worked example</span>
          {example.title && <h3>{renderLessonText(example.title)}</h3>}
          {example.prompt && <p>{renderLessonText(example.prompt)}</p>}
          {Array.isArray(example.steps) && example.steps.length > 0 && (
            <ol>
              {example.steps.map((step, index) => <li key={index}>{renderLessonText(step)}</li>)}
            </ol>
          )}
          {example.answer && <div className="spark-generic-example-answer">{renderLessonText(example.answer)}</div>}
        </Card>
      )}

      {summary && (
        <section className="spark-generic-lesson-summary">
          <h3>Lesson summary</h3>
          <p>{renderLessonText(summary)}</p>
        </section>
      )}

      {!intro && blocks.length === 0 && points.length === 0 && !example && !summary && (
        <Card className="spark-generic-content-empty">
          <strong>Lesson content is being prepared.</strong>
          <p>This topic is in the course structure, but its learner notes have not been published yet.</p>
        </Card>
      )}
    </div>
  );
}

export default function GenericSubjectStudyView({
  supabase,
  userId,
  subject,
  onBack,
  onManageSubjects,
  showToast,
}) {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(Boolean(subject?.id));
  const [error, setError] = useState(null);
  const [completedTopicIds, setCompletedTopicIds] = useState(new Set());
  const [completedActivityKeys, setCompletedActivityKeys] = useState(new Set());
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [expandedOutlineSections, setExpandedOutlineSections] = useState(new Set());

  const subjectId = String(subject?.id || "").trim().toLowerCase();
  const studyPath = subject?.routes?.study || (subjectId ? `/study/${subjectId}` : "/study");

  const applySelection = useCallback((nextStructure, completed) => {
    if (!nextStructure) return;

    const safeCompleted = completed || new Set();
    const routed = routeSelection(studyPath, nextStructure);

    const fallbackTopic = firstTopic(nextStructure, safeCompleted);

    if (routed.topicId && isTopicUnlocked(nextStructure, routed.topicId, safeCompleted)) {
      setActiveSectionId(routed.sectionId);
      setActiveTopicId(routed.topicId);
      return;
    }

    if (routed.sectionId) {
      const section = nextStructure.sections.find(item => item.id === routed.sectionId);
      const topic = section?.topics?.find(item => isTopicUnlocked(nextStructure, item.id, safeCompleted)) || null;
      if (topic) {
        setActiveSectionId(routed.sectionId);
        setActiveTopicId(topic.id);
        return;
      }
    }

    setActiveSectionId(fallbackTopic?.sectionId || nextStructure.sections?.[0]?.id || null);
    setActiveTopicId(fallbackTopic?.id || null);

    if (fallbackTopic && (routed.topicId || routed.sectionId)) {
      writeSparkNestedRoute(studyPath, {
        section:fallbackTopic.sectionId || null,
        topic:fallbackTopic.id,
      });
    }
  }, [studyPath]);

  useEffect(() => {
    let cancelled = false;

    if (!subjectId) {
      setLoading(false);
      setStructure(null);
      return () => { cancelled = true; };
    }

    setLoading(true);
    setError(null);

    Promise.all([
      loadGenericSubjectStructure({ supabase, subjectId }),
      userId
        ? supabase.from("spark_subject_progress")
            .select("topic_id,activity_key,activity_type,completed")
            .eq("user_id", userId)
            .eq("subject_id", subjectId)
            .eq("completed", true)
        : Promise.resolve({ data:[], error:null }),
    ]).then(([structureResult, progressResult]) => {
      if (cancelled) return;

      if (structureResult.error) {
        setError(structureResult.error);
        setStructure(null);
        setLoading(false);
        return;
      }

      const completedRows = progressResult.data || [];
      const completed = new Set(
        completedRows
          .filter(row => row.activity_type === "lesson")
          .map(row => String(
            row.topic_id || String(row.activity_key || "").replace(/^lesson:/, "")
          ).trim())
          .filter(Boolean)
      );
      const completedKeys = new Set(
        completedRows.map(row => String(row.activity_key || "").trim()).filter(Boolean)
      );

      setCompletedTopicIds(completed);
      setCompletedActivityKeys(completedKeys);
      setStructure(structureResult.data);
      applySelection(structureResult.data, completed);

      if (progressResult.error && !["42P01","PGRST205"].includes(progressResult.error.code)) {
        console.warn("Could not load generic subject lesson progress", progressResult.error);
      }

      setLoading(false);
    }).catch(loadError => {
      if (cancelled) return;
      setError(loadError);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [applySelection, subjectId, supabase, userId]);

  useEffect(() => {
    if (!structure || !subjectId) return undefined;

    return subscribeSparkRoute(route => {
      if (route.path !== studyPath) return;

      const next = routeSelection(studyPath, structure);
      if (next.topicId && isTopicUnlocked(structure, next.topicId, completedTopicIds)) {
        setActiveSectionId(next.sectionId);
        setActiveTopicId(next.topicId);
      } else if (next.sectionId) {
        const topic = structure.sections
          .find(section => section.id === next.sectionId)
          ?.topics?.find(item => isTopicUnlocked(structure, item.id, completedTopicIds));

        if (topic) {
          setActiveSectionId(next.sectionId);
          setActiveTopicId(topic.id);
        } else {
          const fallbackTopic = firstTopic(structure, completedTopicIds);
          if (fallbackTopic) {
            setActiveSectionId(fallbackTopic.sectionId || null);
            setActiveTopicId(fallbackTopic.id);
            writeSparkNestedRoute(studyPath, {
              section:fallbackTopic.sectionId || null,
              topic:fallbackTopic.id,
            });
          }
        }
      } else if (next.topicId) {
        const fallbackTopic = firstTopic(structure, completedTopicIds);
        if (fallbackTopic) {
          setActiveSectionId(fallbackTopic.sectionId || null);
          setActiveTopicId(fallbackTopic.id);
          writeSparkNestedRoute(studyPath, {
            section:fallbackTopic.sectionId || null,
            topic:fallbackTopic.id,
          });
        }
      }
    });
  }, [completedTopicIds, structure, studyPath, subjectId]);

  const activeTopic = useMemo(
    () => structure?.topics?.find(topic => topic.id === activeTopicId) || null,
    [activeTopicId, structure]
  );

  const activeSection = useMemo(
    () => structure?.sections?.find(
      section => section.id === (activeTopic?.sectionId || activeSectionId)
    ) || null,
    [activeSectionId, activeTopic, structure]
  );

  useEffect(() => {
    const sectionId = activeTopic?.sectionId || activeSectionId;
    if (!sectionId) return;
    setExpandedOutlineSections(current => {
      if (current.has(sectionId)) return current;
      return new Set([...current, sectionId]);
    });
  }, [activeSectionId, activeTopic?.sectionId]);

  const toggleOutlineSection = useCallback(sectionId => {
    setExpandedOutlineSections(current => {
      const next = new Set(current);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const completedCount = structure?.topics
    ?.filter(topic => completedTopicIds.has(topic.id))
    .length || 0;

  const totalTopics = structure?.topicCount || 0;
  const progressPercent = totalTopics
    ? Math.round((completedCount / totalTopics) * 100)
    : 0;

  const activeTopicIndex = useMemo(
    () => (structure?.topics || []).findIndex(topic => topic.id === activeTopicId),
    [activeTopicId, structure]
  );
  const previousTopic = activeTopicIndex > 0
    ? structure?.topics?.[activeTopicIndex - 1] || null
    : null;
  const nextTopic = activeTopicIndex >= 0 && activeTopicIndex < (structure?.topics?.length || 0) - 1
    ? structure?.topics?.[activeTopicIndex + 1] || null
    : null;
  const activeLessonComplete = Boolean(activeTopic && completedTopicIds.has(activeTopic.id));

  const openTopic = useCallback((topic, sectionId) => {
    if (!topic) return;
    if (!isTopicUnlocked(structure, topic.id, completedTopicIds)) {
      showToast?.("Complete the earlier lessons to unlock this lesson.", "info");
      return;
    }

    setActiveSectionId(sectionId || topic.sectionId || null);
    setActiveTopicId(topic.id);

    writeSparkNestedRoute(studyPath, {
      section:sectionId || topic.sectionId || null,
      topic:topic.id,
    });

    setOutlineOpen(false);
    if (typeof window !== "undefined") window.scrollTo?.(0, 0);
  }, [completedTopicIds, showToast, structure, studyPath]);

  const recordInteractiveComplete = useCallback(async ({
    activityId,
    title,
    score,
    total,
    percent,
    topicId,
    sectionId,
  }) => {
    const activityKey = `diagram:${activityId}`;
    if (!activityId || completedActivityKeys.has(activityKey)) return;

    try {
      const result = await recordSubjectActivity({
        supabase,
        activity:{
          subjectId,
          activityKey,
          activityType:"diagram",
          sectionId:sectionId || activeSection?.id || null,
          topicId:topicId || activeTopic?.id || null,
          title:title || "Interactive diagram",
          completed:true,
          score,
          maxScore:total,
          percent,
          metadata:{
            source:"generic_subject_interactive_diagram",
            adapter:"generic-subject-v1",
            at:new Date().toISOString(),
          },
        },
      });

      if (result?.error) throw result.error;
      setCompletedActivityKeys(current => new Set([...current,activityKey]));
      showToast?.(`${title || "Interactive diagram"} completed.`, "success");
    } catch (activityError) {
      console.error("Could not save interactive diagram progress",activityError);
      showToast?.(
        activityError?.message || "Your diagram score could not be saved.",
        "error"
      );
    }
  }, [
    activeSection?.id,
    activeTopic?.id,
    completedActivityKeys,
    showToast,
    subjectId,
    supabase,
  ]);

  const markComplete = useCallback(async () => {
    if (!activeTopic || !subjectId || saving) return;
    if (completedTopicIds.has(activeTopic.id)) return;

    setSaving(true);

    try {
      const result = await recordSubjectActivity({
        supabase,
        activity:{
          subjectId,
          activityKey:`lesson:${activeTopic.id}`,
          activityType:"lesson",
          sectionId:activeTopic.sectionId || activeSection?.id || null,
          topicId:activeTopic.id,
          title:activeTopic.title,
          completed:true,
          metadata:{
            source:"generic_subject_study",
            adapter:"generic-subject-v1",
            at:new Date().toISOString(),
          },
        },
      });

      if (result?.error) throw result.error;

      setCompletedTopicIds(current => new Set([...current, activeTopic.id]));
      showToast?.(`${activeTopic.title} completed.`, "success");
    } catch (saveError) {
      console.error("Could not save generic subject lesson progress", saveError);
      showToast?.(
        saveError?.message || "Could not mark this lesson complete.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }, [
    activeSection?.id,
    activeTopic,
    completedTopicIds,
    saving,
    showToast,
    subjectId,
    supabase,
  ]);

  if (!subject) {
    return (
      <main className="spark-generic-study">
        <div className="spark-generic-study-shell">
          <Card className="spark-generic-unavailable">
            <span className="section-kicker">SUBJECT UNAVAILABLE</span>
            <h1>This subject is not available for learners.</h1>
            <p>It may still be a draft, disabled, or no longer published.</p>
            <div className="spark-generic-empty-actions">
              {onBack && <button type="button" onClick={onBack}>Back to Study</button>}
              {onManageSubjects && (
                <button type="button" className="secondary" onClick={onManageSubjects}>
                  My subjects
                </button>
              )}
            </div>
          </Card>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <SparkLoader
        variant="section"
        label={`Loading ${subject.shortName || subject.name}`}
      />
    );
  }

  if (error) {
    return (
      <main className="spark-generic-study">
        <div className="spark-generic-study-shell">
          <Card className="spark-generic-unavailable">
            <span className="section-kicker">COURSE LOAD ERROR</span>
            <h1>We could not open {subject.shortName || subject.name}.</h1>
            <p>{error?.message || "The course structure could not be loaded."}</p>
            {onBack && <button type="button" onClick={onBack}>Back to Study</button>}
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="spark-generic-study">
      <div className="spark-generic-study-shell">
        <header className="spark-generic-study-hero">
          <div className="spark-generic-study-mark" aria-hidden="true">
            {subject.mark || subject.shortName?.slice(0,2) || "â€¢"}
          </div>

          <div className="spark-generic-study-hero-copy">
            <span className="section-kicker">{subject.qualification || "CSEC"} COURSE</span>
            <h1>{subject.name}</h1>
            <p>{subject.description}</p>
          </div>

          <div className="spark-generic-study-hero-actions">
            {onBack && (
              <button type="button" onClick={onBack}>Back</button>
            )}
          </div>
        </header>

        <section
          className="spark-generic-progress-card"
          aria-label={`${subject.shortName || subject.name} progress`}
        >
          <div>
            <strong>{completedCount}/{totalTopics || 0}</strong>
            <span>topics completed</span>
          </div>
          <div className="spark-generic-progress-track" aria-hidden="true">
            <span style={{width:`${progressPercent}%`}} />
          </div>
          <b>{progressPercent}%</b>
        </section>

        {!structure?.topicCount ? (
          <Card className="spark-generic-empty-course">
            <span className="section-kicker">COURSE STRUCTURE</span>
            <h2>Lessons are being prepared.</h2>
            <p>
              {subject.shortName || subject.name} is published in the subject
              catalog, but no learner topics are available yet.
            </p>
            {onBack && (
              <button type="button" onClick={onBack}>Choose another subject</button>
            )}
          </Card>
        ) : (
          <div className="spark-generic-learning-layout">
            <aside
              className="spark-generic-outline"
              aria-label={`${subject.shortName || subject.name} course outline`}
            >
              <div className="spark-generic-outline-head">
                <div className="spark-generic-outline-heading-copy">
                  <span>Course outline</span>
                  <strong>{totalTopics} topics</strong>
                </div>
                <button
                  type="button"
                  className="spark-generic-outline-toggle"
                  aria-expanded={outlineOpen}
                  aria-controls="spark-generic-outline-content"
                  onClick={() => setOutlineOpen(value => !value)}
                >
                  <span>{outlineOpen ? "Hide topics" : "Browse topics"}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
              </div>

              <div
                id="spark-generic-outline-content"
                className={`spark-generic-outline-content ${outlineOpen ? "open" : ""}`}
              >
                {structure.sections.map(section => {
                  const expanded = expandedOutlineSections.has(section.id);
                  return (
                    <section key={section.id} className={`spark-generic-outline-section ${expanded ? "expanded" : ""}`}>
                      <button
                        type="button"
                        className="spark-generic-outline-section-title"
                        aria-expanded={expanded}
                        onClick={() => toggleOutlineSection(section.id)}
                      >
                        <span>{section.title}</span>
                        <span className="spark-generic-outline-section-meta">
                          <small>{section.topics.length}</small>
                          <svg viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6 8l4 4 4-4" />
                          </svg>
                        </span>
                      </button>

                      <div className="spark-generic-outline-topics">
                        {section.topics.map(topic => {
                          const active = topic.id === activeTopicId;
                          const complete = completedTopicIds.has(topic.id);
                          const locked = !isTopicUnlocked(structure, topic.id, completedTopicIds);

                          return (
                            <button
                              type="button"
                              key={topic.id}
                              className={`${active ? "active" : ""} ${complete ? "complete" : ""} ${locked ? "locked" : ""}`}
                              onClick={() => openTopic(topic, section.id)}
                              aria-current={active ? "page" : undefined}
                              disabled={locked}
                              title={locked ? "Complete the earlier lessons to unlock this lesson." : undefined}
                            >
                              <span className="spark-generic-topic-state" aria-hidden="true">
                                {complete ? (
                                  <svg viewBox="0 0 20 20" focusable="false">
                                    <path d="M5 10.5l3 3L15 7" />
                                  </svg>
                                ) : locked ? (
                                  <svg viewBox="0 0 20 20" focusable="false">
                                    <rect x="5.5" y="9" width="9" height="7" rx="1.5" />
                                    <path d="M7.5 9V6.8a2.5 2.5 0 015 0V9" />
                                  </svg>
                                ) : (
                                  <span className="spark-generic-topic-dot" />
                                )}
                              </span>
                              <span>{topic.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}

                {structure.unassignedTopics.length > 0 && (
                  <section className={`spark-generic-outline-section ${expandedOutlineSections.has("__more__") ? "expanded" : ""}`}>
                    <button
                      type="button"
                      className="spark-generic-outline-section-title"
                      aria-expanded={expandedOutlineSections.has("__more__")}
                      onClick={() => toggleOutlineSection("__more__")}
                    >
                      <span>More topics</span>
                      <span className="spark-generic-outline-section-meta">
                        <small>{structure.unassignedTopics.length}</small>
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M6 8l4 4 4-4" />
                        </svg>
                      </span>
                    </button>
                    <div className="spark-generic-outline-topics">
                      {structure.unassignedTopics.map(topic => {
                        const active = topic.id === activeTopicId;
                        const complete = completedTopicIds.has(topic.id);
                        const locked = !isTopicUnlocked(structure, topic.id, completedTopicIds);
                        return (
                          <button
                            type="button"
                            key={topic.id}
                            className={`${active ? "active" : ""} ${complete ? "complete" : ""} ${locked ? "locked" : ""}`}
                            onClick={() => openTopic(topic, null)}
                            aria-current={active ? "page" : undefined}
                            disabled={locked}
                            title={locked ? "Complete the earlier lessons to unlock this lesson." : undefined}
                          >
                            <span className="spark-generic-topic-state" aria-hidden="true">
                              {complete ? (
                                <svg viewBox="0 0 20 20" focusable="false">
                                  <path d="M5 10.5l3 3L15 7" />
                                </svg>
                              ) : locked ? (
                                <svg viewBox="0 0 20 20" focusable="false">
                                  <rect x="5.5" y="9" width="9" height="7" rx="1.5" />
                                  <path d="M7.5 9V6.8a2.5 2.5 0 015 0V9" />
                                </svg>
                              ) : (
                                <span className="spark-generic-topic-dot" />
                              )}
                            </span>
                            <span>{topic.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            </aside>

            <article className="spark-generic-lesson">
              {activeTopic ? (
                <>
                  <div className="spark-generic-lesson-head">
                    <div>
                      <span className="section-kicker">
                        {activeSection?.title || "COURSE TOPIC"}
                      </span>
                      <h2>{activeTopic.title}</h2>
                    </div>

                    {completedTopicIds.has(activeTopic.id) && (
                      <span className="spark-generic-complete-chip">Completed</span>
                    )}
                  </div>

                  <GenericLessonContent
                    subjectId={subjectId}
                    topic={activeTopic}
                    completedActivityKeys={completedActivityKeys}
                    onActivityComplete={recordInteractiveComplete}
                  />

                  <div className="spark-generic-lesson-footer">
                    {previousTopic ? (
                      <button
                        type="button"
                        className="spark-generic-lesson-nav spark-generic-lesson-nav-previous"
                        onClick={() => openTopic(previousTopic, previousTopic.sectionId || null)}
                      >
                        <span aria-hidden="true">←</span>
                        <span>Previous</span>
                      </button>
                    ) : <span className="spark-generic-lesson-nav-spacer" aria-hidden="true" />}

                    <button
                      type="button"
                      className={activeLessonComplete ? "completed spark-generic-complete-action" : "spark-generic-complete-action"}
                      disabled={saving || activeLessonComplete}
                      onClick={markComplete}
                    >
                      {saving
                        ? "Saving..."
                        : activeLessonComplete
                          ? "Lesson completed"
                          : "Mark lesson complete"}
                    </button>

                    {nextTopic ? (
                      <button
                        type="button"
                        className="spark-generic-lesson-nav spark-generic-lesson-nav-next"
                        disabled={!activeLessonComplete}
                        onClick={() => activeLessonComplete && openTopic(nextTopic, nextTopic.sectionId || null)}
                        title={!activeLessonComplete ? "Complete this lesson to unlock the next lesson." : undefined}
                      >
                        <span>Next Lesson</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ) : <span className="spark-generic-lesson-nav-spacer" aria-hidden="true" />}
                  </div>
                </>
              ) : (
                <Card className="spark-generic-content-empty">
                  <strong>Choose a topic</strong>
                  <p>Select a topic from the course outline to begin.</p>
                </Card>
              )}
            </article>
          </div>
        )}
      </div>
    </main>
  );
}