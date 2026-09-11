import React, { useMemo, useState } from 'react';
import PhysicsMechanicsSection from '../../mechanics/components/PhysicsMechanicsSection';
import PhysicsCourseLessons from './PhysicsCourseLessons';
import PhysicsThermalSection from '../../thermal/components/PhysicsThermalSection';
import PhysicsWavesSection from '../../waves/components/PhysicsWavesSection';
import PhysicsElectricitySection from '../../electricity/components/PhysicsElectricitySection';
import PhysicsAtomicSection from '../../atomic/components/PhysicsAtomicSection';
import { physicsFullCourseStats } from '../fullCourseIndex.mjs';
import './physicsSubjectView.css';

const SECTION_META = Object.freeze({
  A: { title:'Mechanics', detail:'Lessons, interactive labs, flashcards, topic tests and the Mechanics checkpoint.', accent:'A' },
  B: { title:'Thermal Physics and Kinetic Theory', detail:'Lessons, interactive labs, flashcards, topic tests, structured practice and a Section B checkpoint.', accent:'B' },
  C: { title:'Waves and Optics', detail:'Lessons, interactive labs, flashcards, topic tests, structured practice and a Section C checkpoint.', accent:'C' },
  D: { title:'Electricity and Magnetism', detail:'Lessons, interactive labs, flashcards, topic tests, structured practice and a Section D checkpoint.', accent:'D' },
  E: { title:'The Physics of the Atom', detail:'Lessons, interactive labs, flashcards, topic tests, structured practice and a Section E checkpoint.', accent:'E' },
});

export default function PhysicsSubjectView({ userId, onBack, onActivity, onEvidence }) {
  const [section, setSection] = useState(null);
  const stats = useMemo(() => physicsFullCourseStats(), []);

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
  if (section && !['A','B','C','D','E'].includes(section)) {
    return <PhysicsCourseLessons userId={userId} initialSection={section} onBack={() => setSection(null)} onActivity={onActivity} />;
  }

  return (
    <main className="physics-subject-view">
      <div className="psv-shell">
        <header className="psv-hero">
          <div>
            {onBack && <button type="button" className="psv-back" onClick={onBack}>← Back</button>}
            <div className="psv-eyebrow">CSEC Physics</div>
            <h1>Choose a section</h1>
            <p>Work through the Physics syllabus by section. Each section opens the learning tools currently available for its audited content.</p>
          </div>
          <div className="psv-stats" aria-label="CSEC Physics course coverage">
            <div><strong>{stats.sections}</strong><span>sections</span></div>
            <div><strong>{stats.topics}</strong><span>topics</span></div>
            <div><strong>{stats.objectives}</strong><span>objectives</span></div>
          </div>
        </header>

        <section className="psv-section-grid" aria-label="Physics sections">
          {Object.entries(SECTION_META).map(([id, meta]) => {
            const sectionStats = stats.bySection[id] || {topics:0, objectives:0};
            return (
              <button key={id} type="button" className="psv-section-card" onClick={() => setSection(id)}>
                <span className="psv-section-code">{meta.accent}</span>
                <span className="psv-section-copy">
                  <span className="psv-section-status">Available</span>
                  <strong>{meta.title}</strong>
                  <span>{sectionStats.topics} topics · {sectionStats.objectives} objectives</span>
                  <small>{meta.detail}</small>
                </span>
                <span className="psv-section-arrow" aria-hidden="true">↗</span>
              </button>
            );
          })}
        </section>

        <section className="psv-note">
          <strong>Assessment coverage</strong>
          <p>Full lesson and audited section-assessment coverage is available across Sections A to E. Each section includes topic practice, flashcards, structured practice, interactive learning tools and a cumulative SPARK checkpoint.</p>
        </section>
      </div>
    </main>
  );
}
