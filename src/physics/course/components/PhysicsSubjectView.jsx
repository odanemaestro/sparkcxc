import React, { useMemo } from 'react';
import { usePhysicsSubjectRoute } from '../../../routing/sparkRoutingV270';
import PhysicsMechanicsSection from '../../mechanics/components/PhysicsMechanicsSection';
import PhysicsCourseLessons from './PhysicsCourseLessons';
import PhysicsThermalSection from '../../thermal/components/PhysicsThermalSection';
import PhysicsWavesSection from '../../waves/components/PhysicsWavesSection';
import PhysicsElectricitySection from '../../electricity/components/PhysicsElectricitySection';
import PhysicsAtomicSection from '../../atomic/components/PhysicsAtomicSection';
import PhysicsWorkbook from '../../resources/PhysicsWorkbook';
import PhysicsFormulaList from '../../resources/PhysicsFormulaList.jsx';
import { physicsFullCourseStats } from '../fullCourseIndex.mjs';
import './physicsSubjectView.css';

const SectionArrowIcon = () => (
  <svg className="psv-section-arrow-icon" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
    <path d="M6 14L14 6M8 6h6v6" />
  </svg>
);

const BackArrowIcon = () => (
  <svg className="psv-back-arrow-icon" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
    <path d="M12.5 5.5 8 10l4.5 4.5M8 10h8" />
  </svg>
);

const SECTION_META = Object.freeze({
  A: { title:'Mechanics', detail:'Lessons, interactive labs, practical notebooks, flashcards, topic tests and the Mechanics checkpoint.', accent:'A' },
  B: { title:'Thermal Physics and Kinetic Theory', detail:'Lessons, interactive labs, practical notebooks, flashcards, topic tests, structured practice and a Section B checkpoint.', accent:'B' },
  C: { title:'Waves and Optics', detail:'Lessons, interactive labs, practical notebooks, flashcards, topic tests, structured practice and a Section C checkpoint.', accent:'C' },
  D: { title:'Electricity and Magnetism', detail:'Lessons, interactive labs, practical notebooks, flashcards, topic tests, structured practice and a Section D checkpoint.', accent:'D' },
  E: { title:'The Physics of the Atom', detail:'Lessons, interactive labs, practical notebooks, flashcards, topic tests, structured practice and a Section E checkpoint.', accent:'E' },
});

export default function PhysicsSubjectView({ userId, onBack, onActivity, onEvidence }) {
  const [section, setSection] = usePhysicsSubjectRoute();
  const stats = useMemo(() => physicsFullCourseStats(), []);

  if (section === 'WORKBOOK') {
    return <PhysicsWorkbook onBack={() => setSection(null)} onOpenSection={next => setSection(next)} onOpenFormulae={() => setSection('FORMULAE')} />;
  }
  if (section === 'FORMULAE') {
    return <PhysicsFormulaList onBack={() => setSection(null)} />;
  }
  if (section === 'A') {
    return <PhysicsMechanicsSection userId={userId} onBack={() => setSection(null)} onActivity={onActivity} onEvidence={onEvidence} />;
  }
  if (section === 'B') {
    return <PhysicsThermalSection userId={userId} onBack={() => setSection(null)} onActivity={onActivity} />;
  }
  if (section === 'C') {
    return <PhysicsWavesSection userId={userId} onBack={() => setSection(null)} onActivity={onActivity} />;
  }
  if (section === 'D') {
    return <PhysicsElectricitySection userId={userId} onBack={() => setSection(null)} onActivity={onActivity} />;
  }
  if (section === 'E') {
    return <PhysicsAtomicSection userId={userId} onBack={() => setSection(null)} onActivity={onActivity} />;
  }
  if (section && !['A','B','C','D','E','WORKBOOK','FORMULAE'].includes(section)) {
    return <PhysicsCourseLessons userId={userId} initialSection={section} onBack={() => setSection(null)} onActivity={onActivity} />;
  }

  return (
    <main className="physics-subject-view">
      <div className="psv-shell">
        <header className="psv-hero">
          <div>
            {onBack && <button type="button" className="psv-back" onClick={onBack}><BackArrowIcon/><span>Back</span></button>}
            <div className="psv-eyebrow">CSEC Physics</div>
            <h1>Choose a section</h1>
            <p>Work through the Physics syllabus by section, or open the SPARK Workbook and Formula List for focused revision.</p>
          </div>
          <div className="psv-stats" aria-label="CSEC Physics course coverage">
            <div><strong>{stats.sections}</strong><span>sections</span></div>
            <div><strong>{stats.topics}</strong><span>topics</span></div>
            <div><strong>{stats.objectives}</strong><span>objectives</span></div>
          </div>
        </header>

        <section className="psv-section-grid" aria-label="Physics study resources">
          <button type="button" className="psv-section-card" onClick={() => setSection('WORKBOOK')}>
            <span className="psv-section-code">W</span>
            <span className="psv-section-copy">
              <span className="psv-section-status">Revision resource</span>
              <strong>SPARK Physics Workbook</strong>
              <span>25 topics Â· 189 objectives</span>
              <small>Study notes, exam focus, formulae, worked examples, data skills, practical work, quick checks and objective-by-objective guidance.</small>
            </span>
            <span className="psv-section-arrow" aria-hidden="true"><SectionArrowIcon/></span>
          </button>
          <button type="button" className="psv-section-card" onClick={() => setSection('FORMULAE')}>
            <span className="psv-section-code">Æ’</span>
            <span className="psv-section-copy">
              <span className="psv-section-status">Revision resource</span>
              <strong>Physics Formula List</strong>
              <span>64 equations, relationships and direction rules</span>
              <small>Search by topic, quantity, symbol or unit. Includes magnetic direction rules and the conditions attached to key relationships.</small>
            </span>
            <span className="psv-section-arrow" aria-hidden="true"><SectionArrowIcon/></span>
          </button>
        </section>

        <section className="psv-section-grid" aria-label="Physics sections">
          {Object.entries(SECTION_META).map(([id, meta]) => {
            const sectionStats = stats.bySection[id] || {topics:0, objectives:0};
            return (
              <button key={id} type="button" className="psv-section-card" onClick={() => setSection(id)}>
                <span className="psv-section-code">{meta.accent}</span>
                <span className="psv-section-copy">
                  <span className="psv-section-status">Available</span>
                  <strong>{meta.title}</strong>
                  <span>{sectionStats.topics} topics Â· {sectionStats.objectives} objectives</span>
                  <small>{meta.detail}</small>
                </span>
                <span className="psv-section-arrow" aria-hidden="true"><SectionArrowIcon/></span>
              </button>
            );
          })}
        </section>

        <section className="psv-note">
          <strong>Assessment coverage</strong>
          <p>Full lesson and audited section-assessment coverage is available across Sections A to E. Each section includes upgraded CSEC study toolkits, topic practice, flashcards, structured practice, interactive learning tools, practical notebooks and a cumulative SPARK checkpoint.</p>
        </section>
      </div>
    </main>
  );
}
