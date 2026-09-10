import React, { useEffect, useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import { PHYSICS_SECTIONS_B_TO_E, physicsLessonsBToEStats } from '../index.mjs';
import { readPhysicsCourseProgress, setPhysicsCourseLessonCompletion } from '../physicsCourseProgress.mjs';
import './physicsCourseLessons.css';

const SECTION_META = Object.freeze({
  B: { title: 'Thermal Physics and Kinetic Theory', short: 'Thermal Physics' },
  C: { title: 'Waves and Optics', short: 'Waves & Optics' },
  D: { title: 'Electricity and Magnetism', short: 'Electricity & Magnetism' },
  E: { title: 'The Physics of the Atom', short: 'Atomic Physics' },
});

function normalFormula(f){ return { name:f.name||'', equation:f.equation||'', unit:f.unit||'', condition:f.condition||f.symbols||'' }; }

export default function PhysicsCourseLessons({ userId, initialSection='B', initialTopicId, onBack, onActivity }){
  const safeInitial = PHYSICS_SECTIONS_B_TO_E[initialSection] ? initialSection : 'B';
  const [section, setSection] = useState(safeInitial);
  const [topicId, setTopicId] = useState(initialTopicId || PHYSICS_SECTIONS_B_TO_E[safeInitial][0].id);
  const [progress, setProgress] = useState(() => readPhysicsCourseProgress(userId));
  const stats = useMemo(() => physicsLessonsBToEStats(), []);

  useEffect(() => setProgress(readPhysicsCourseProgress(userId)), [userId]);
  useEffect(() => {
    const topics = PHYSICS_SECTIONS_B_TO_E[section];
    if (!topics.some(t => t.id === topicId)) setTopicId(topics[0].id);
  }, [section, topicId]);

  const topics = PHYSICS_SECTIONS_B_TO_E[section];
  const lesson = topics.find(t => t.id === topicId) || topics[0];
  const completed = Boolean(progress[`lesson:${lesson.id}`]);
  const sectionCompleted = topics.filter(t => progress[`lesson:${t.id}`]).length;
  const formulae = (lesson.formulae || []).map(normalFormula);

  const setCompleted = (value) => {
    setProgress(prev => {
      const next = setPhysicsCourseLessonCompletion(userId, prev, lesson.id, value);
      onActivity?.({ type:'physics_lesson_completion', subject:'CSEC Physics', section, topic:lesson.id, completed:Boolean(value) });
      return next;
    });
  };

  return (
    <main className="physics-course-lessons">
      <div className="pcl-shell">
        <header className="pcl-hero">
          <div>
            {onBack && <button type="button" className="pcl-btn secondary" onClick={onBack}>← Back to Physics</button>}
            <div className="pcl-eyebrow">CSEC Physics · Section {section}</div>
            <h1>{SECTION_META[section].title}</h1>
            <p>Study the syllabus objective by objective, with definitions, equations, worked reasoning, practical guidance and common examination mistakes.</p>
          </div>
          <div className="pcl-stats" aria-label="Lesson coverage summary">
            <div><strong>{stats.topics}</strong><span>topics in B-E</span></div>
            <div><strong>{stats.objectives}</strong><span>objectives in B-E</span></div>
            <div><strong>{sectionCompleted}/{topics.length}</strong><span>Section {section} complete</span></div>
          </div>
        </header>

        <nav className="pcl-section-tabs" aria-label="Physics sections B to E">
          {Object.keys(PHYSICS_SECTIONS_B_TO_E).map(s => (
            <button key={s} type="button" className={section===s?'active':''} onClick={() => setSection(s)} aria-pressed={section===s}>
              <b>{s}</b><span>{SECTION_META[s].short}</span>
            </button>
          ))}
        </nav>

        <section className="pcl-topic-bar">
          <div>
            <div className="pcl-eyebrow">Section {section}</div>
            <h2>{SECTION_META[section].title}</h2>
          </div>
          <label>
            <span>Choose a topic</span>
            <select value={lesson.id} onChange={e => setTopicId(e.target.value)}>
              {topics.map(t => <option key={t.id} value={t.id}>{t.id}. {t.title}</option>)}
            </select>
          </label>
        </section>

        <nav className="pcl-topic-pills" aria-label={`Section ${section} topics`}>
          {topics.map(t => <button key={t.id} type="button" className={lesson.id===t.id?'active':''} onClick={()=>setTopicId(t.id)}>{t.id}</button>)}
        </nav>

        <article className="pcl-lesson-head">
          <div><span className="pcl-topic-code">{lesson.id}</span><h2>{lesson.title}</h2><MathText as="p" prose>{lesson.summary}</MathText></div>
          <div className="pcl-progress-card"><strong>{completed?'Completed':'In progress'}</strong><span>{lesson.objectives.length} syllabus objectives</span></div>
        </article>

        <div className="pcl-study-grid">
          <div className="pcl-main-column">
            <section className="pcl-card">
              <h3>Why this topic matters</h3>
              <MathText as="p" prose>{lesson.whyItMatters}</MathText>
            </section>

            {(lesson.sections || []).map((s,i) => (
              <section className="pcl-card" key={s.id || i}>
                <h3>{s.heading}</h3>
                {(s.paragraphs || []).map((p,j) => <MathText as="p" prose key={j}>{p}</MathText>)}
              </section>
            ))}

            <section className="pcl-card">
              <h3>Objective by objective</h3>
              <div className="pcl-objective-cards">
                {lesson.objectives.map(([id,text]) => {
                  const card = lesson.objectiveCards?.[id] || {};
                  return <details key={id} className="pcl-objective-card">
                    <summary><span>{id}</span><MathText as="b" prose>{text}</MathText></summary>
                    <div className="pcl-objective-body">
                      {card.inShort && <p><strong>In short.</strong> <MathText prose>{card.inShort}</MathText></p>}
                      {card.detail && <MathText as="p" prose>{card.detail}</MathText>}
                      {card.formula && <div className="pcl-formula-callout"><strong>Formula</strong><MathText as="span" prose>{card.formula}</MathText></div>}
                      {card.howAsked && <p><strong>How CXC may ask it.</strong> <MathText prose>{card.howAsked}</MathText></p>}
                      {card.watchOut && <p className="pcl-watch"><strong>Watch out.</strong> <MathText prose>{card.watchOut}</MathText></p>}
                    </div>
                  </details>;
                })}
              </div>
            </section>

            {lesson.practicals?.length>0 && <section className="pcl-card"><h3>Practical activities</h3><ul>{lesson.practicals.map((x,i)=><li key={i}><MathText prose>{x}</MathText></li>)}</ul></section>}
            {lesson.commonMistakes?.length>0 && <section className="pcl-card"><h3>Mistakes that cost marks</h3><ul>{lesson.commonMistakes.map((x,i)=><li key={i}><MathText prose>{x}</MathText></li>)}</ul></section>}

            <section className="pcl-card pcl-completion">
              <div><strong>{completed ? 'Lesson complete' : 'Finished studying this topic?'}</strong><span>Completion records study progress only. It does not award mastery.</span></div>
              <button type="button" className={`pcl-btn ${completed?'done':''}`} onClick={() => setCompleted(!completed)}>{completed?'✓ Marked complete':'Mark lesson complete'}</button>
            </section>
          </div>

          <aside className="pcl-side-column">
            <section className="pcl-card sticky">
              <h3>Formulae</h3>
              {formulae.length ? <div className="pcl-table-wrap" tabIndex="0" aria-label="Formula table, horizontally scrollable if needed"><table><thead><tr><th>Quantity</th><th>Relationship</th><th>Unit / note</th></tr></thead><tbody>{formulae.map((f,i)=><tr key={i}><td><MathText prose>{f.name}</MathText></td><td className="pcl-equation"><MathText prose>{f.equation}</MathText></td><td><MathText prose>{`${f.unit}${f.condition?` · ${f.condition}`:''}`}</MathText></td></tr>)}</tbody></table></div> : <p className="pcl-muted">No calculation formula is required for this topic.</p>}
              <h3 className="pcl-side-heading">Objectives</h3>
              <ol className="pcl-mini-objectives">{lesson.objectives.map(([id,text])=><li key={id}><b>{id}</b><MathText as="span" prose>{text}</MathText></li>)}</ol>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
