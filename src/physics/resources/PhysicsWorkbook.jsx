import React, { useEffect, useMemo, useRef, useState } from 'react';
import MathText from '../../practice/MathText';
import { PHYSICS_STUDY_UPGRADES } from '../course/physicsStudyUpgrade.mjs';
import { PHYSICS_PRACTICAL_BLUEPRINTS } from '../labs/physicsPracticalBlueprints.mjs';
import PhysicsFormulaList from './PhysicsFormulaList.jsx';
import { PHYSICS_FORMULA_LIST } from './physicsFormulaList.mjs';
import { PHYSICS_WORKBOOK_SECTIONS, PHYSICS_WORKBOOK_TOPICS, physicsWorkbookStats } from './physicsWorkbookContent.mjs';
import './physicsResources.css';

function practicalsForTopic(topicCode) {
  return Object.entries(PHYSICS_PRACTICAL_BLUEPRINTS)
    .filter(([, practical]) => practical.topic === topicCode)
    .map(([id, practical]) => ({ id, ...practical }));
}

export default function PhysicsWorkbook({ onBack, onOpenSection }) {
  const [section, setSection] = useState('A');
  const [topicCode, setTopicCode] = useState('A1');
  const [query, setQuery] = useState('');
  const [formulaModalOpen, setFormulaModalOpen] = useState(false);
  const formulaButtonRef = useRef(null);
  const modalCloseRef = useRef(null);
  const stats = useMemo(() => physicsWorkbookStats(), []);
  const topics = useMemo(() => PHYSICS_WORKBOOK_TOPICS.filter(topic => topic.section === section), [section]);
  const topic = PHYSICS_WORKBOOK_TOPICS.find(item => item.code === topicCode) || topics[0];
  const upgrade = PHYSICS_STUDY_UPGRADES[topic.code] || null;
  const practicals = practicalsForTopic(topic.code);
  const formulae = PHYSICS_FORMULA_LIST.filter(item => item.topic === topic.code);
  const needle = query.trim().toLowerCase();
  const objectives = topic.objectives.filter(objective => !needle || [objective.code, objective.statement, objective.summary, objective.exam, objective.watch].join(' ').toLowerCase().includes(needle));

  useEffect(() => {
    if (!formulaModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalCloseRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') setFormulaModalOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      formulaButtonRef.current?.focus();
    };
  }, [formulaModalOpen]);

  const changeSection = next => {
    setSection(next);
    const first = PHYSICS_WORKBOOK_TOPICS.find(item => item.section === next);
    if (first) setTopicCode(first.code);
    setQuery('');
  };

  return (
    <main className="physics-resource-root">
      <div className="physics-resource-shell">
        <header className="physics-resource-hero">
          <div>
            {onBack && <button type="button" className="physics-resource-back" onClick={onBack}>← Back to Physics</button>}
            <span className="physics-resource-eyebrow">SPARK CSEC Physics</span>
            <h1>Physics Workbook</h1>
            <p>Work through the CSEC Physics syllabus topic by topic, with focused notes, examination guidance, worked examples, data skills, practical work and quick checks.</p>
          </div>
          <div className="physics-resource-stats" aria-label="Workbook coverage">
            <div><strong>{stats.sections}</strong><span>sections</span></div>
            <div><strong>{stats.topics}</strong><span>topics</span></div>
            <div><strong>{stats.objectives}</strong><span>objectives</span></div>
          </div>
        </header>

        <div className="physics-resource-actions">
          <button ref={formulaButtonRef} type="button" className="physics-resource-primary" onClick={() => setFormulaModalOpen(true)}>Open Formula List</button>
          {onOpenSection && <button type="button" className="physics-resource-secondary" onClick={() => onOpenSection(topic.section)}>Open full Section {topic.section} study tools</button>}
        </div>

        <section className="physics-workbook-guide" aria-label="How to use the Physics Workbook">

          <div>
            <strong>Explore the Workbook</strong>
            <p>Select an objective, practical activity or quick check to reveal its expanded notes, explanations, examination guidance or answer.</p>
          </div>
        </section>

        <nav className="physics-resource-tabs" aria-label="Workbook sections">
          {Object.entries(PHYSICS_WORKBOOK_SECTIONS).map(([id, title]) => (
            <button key={id} type="button" className={section === id ? 'active' : ''} onClick={() => changeSection(id)}>{id}<span>{title}</span></button>
          ))}
        </nav>

        <div className="physics-workbook-layout">
          <aside className="physics-workbook-topic-list" aria-label={`Section ${section} topics`}>
            {topics.map(item => (
              <button key={item.code} type="button" className={topic.code === item.code ? 'active' : ''} onClick={() => { setTopicCode(item.code); setQuery(''); }}>
                <strong>{item.code}</strong><span>{item.title}</span><small>{item.objectiveCount} objectives</small>
              </button>
            ))}
          </aside>

          <article className="physics-workbook-main">
            <section className="physics-resource-card physics-workbook-intro">
              <span className="physics-resource-eyebrow">Section {topic.section} · {topic.code}</span>
              <h2>{topic.title}</h2>
              {topic.oneSentence && <p className="physics-workbook-lead"><MathText prose>{topic.oneSentence}</MathText></p>}
              {topic.explanation.map((paragraph, index) => <MathText as="p" prose key={index}>{paragraph}</MathText>)}
              {topic.whyItMatters && <div className="physics-workbook-why"><strong>Why it matters</strong><MathText as="p" prose>{topic.whyItMatters}</MathText></div>}
            </section>

            {upgrade?.examFocus?.length > 0 && <section className="physics-resource-card"><h3>Exam focus</h3><ul className="physics-resource-list">{upgrade.examFocus.map((item, index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul>{upgrade.examLanguage && <div className="physics-workbook-exam-language"><strong>Exam technique</strong><MathText as="p" prose>{upgrade.examLanguage}</MathText></div>}</section>}

            {formulae.length > 0 && <section className="physics-resource-card"><div className="physics-resource-section-head"><h3>Formulae and relationships</h3><button type="button" onClick={() => setFormulaModalOpen(true)}>Full list</button></div><div className="physics-workbook-formula-grid">{formulae.map((item, index) => <div key={index}><span>{item.name}</span><strong><MathText prose>{item.equation}</MathText></strong><small><MathText prose>{item.unit}</MathText></small></div>)}</div></section>}

            {upgrade?.workedExamples?.length > 0 && <section className="physics-resource-card"><h3>Worked examples</h3><div className="physics-workbook-example-grid">{upgrade.workedExamples.map((example, index) => <div key={index} className="physics-workbook-example"><strong>{example.title}</strong><MathText as="p" prose>{example.prompt}</MathText><ol>{example.steps.map((step, stepIndex) => <li key={stepIndex}><MathText prose>{step}</MathText></li>)}</ol><div className="physics-workbook-answer"><span>Answer</span><MathText as="strong" prose>{example.answer}</MathText></div></div>)}</div></section>}

            {upgrade?.dataSkill && <section className="physics-resource-card"><h3>Data skill</h3><strong>{upgrade.dataSkill.title}</strong><MathText as="p" prose>{upgrade.dataSkill.prompt}</MathText><div className="physics-formula-table-wrap" tabIndex="0"><table className="physics-formula-table compact"><thead><tr>{upgrade.dataSkill.columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{upgrade.dataSkill.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></section>}

            <section className="physics-resource-card">
              <div className="physics-resource-section-head"><div><h3>Objective by objective</h3><p>{topic.objectiveCount} syllabus objectives in this topic. Select an objective to open the expanded notes.</p></div><label className="physics-resource-search compact"><span>Find an objective</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search this topic..." /></label></div>
              <div className="physics-workbook-objectives">{objectives.map(objective => <details key={objective.code}><summary><strong>{objective.code}</strong><span>{objective.statement}</span></summary><div className="physics-workbook-objective-body">{objective.summary && <div><span>In short</span><MathText as="p" prose>{objective.summary}</MathText></div>}{objective.formula && <div><span>Formula</span><MathText as="p" prose>{objective.formula}</MathText></div>}{objective.exam && <div><span>How it is examined</span><MathText as="p" prose>{objective.exam}</MathText></div>}{objective.watch && <div className="physics-workbook-watch"><span>Watch out</span><MathText as="p" prose>{objective.watch}</MathText></div>}</div></details>)}</div>
              {!objectives.length && <p>No objective in this topic matches your search.</p>}
            </section>

            {practicals.length > 0 && <section className="physics-resource-card"><h3>Practical work</h3><div className="physics-workbook-practicals">{practicals.map(practical => <details key={practical.id}><summary><strong>{practical.title}</strong><span>{practical.aim}</span></summary><div><p><b>Apparatus:</b> {practical.apparatus?.join(', ')}</p><p><b>Method:</b></p><ol>{practical.method?.map((step, index) => <li key={index}>{step}</li>)}</ol>{practical.graph && <p><b>Graph:</b> {practical.graph.yLabel} against {practical.graph.xLabel}. {practical.graph.relationship}</p>}{practical.errors?.length > 0 && <><p><b>Sources of error:</b></p><ul>{practical.errors.map((error, index) => <li key={index}>{error}</li>)}</ul></>}</div></details>)}</div></section>}

            {upgrade?.quickChecks?.length > 0 && <section className="physics-resource-card"><h3>Quick checks</h3><div className="physics-workbook-checks">{upgrade.quickChecks.map((check, index) => <details key={index}><summary>{check.question}</summary><MathText as="p" prose>{check.answer}</MathText></details>)}</div></section>}
          </article>
        </div>
      </div>

      {formulaModalOpen && (
        <div className="physics-formula-modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setFormulaModalOpen(false); }}>
          <section className="physics-formula-modal" role="dialog" aria-modal="true" aria-labelledby="physics-formula-modal-title">
            <div className="physics-formula-modal-bar">
              <div>
                <span className="physics-resource-eyebrow">Workbook reference</span>
                <strong id="physics-formula-modal-title">Physics Formula List</strong>
              </div>
              <button ref={modalCloseRef} type="button" className="physics-formula-modal-close" onClick={() => setFormulaModalOpen(false)} aria-label="Close Physics Formula List">×</button>
            </div>
            <div className="physics-formula-modal-body">
              <PhysicsFormulaList inModal />
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
