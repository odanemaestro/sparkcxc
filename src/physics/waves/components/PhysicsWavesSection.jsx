import React, { useEffect, useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import PhysicsFlashcardVisual from '../../components/PhysicsFlashcardVisual';
import { PhysicsTopicQuiz } from '../../mechanics/components/PhysicsMechanicsSection';
import { SECTION_C_TOPICS, buildSectionCCheckpoint, sectionCStats } from '../sectionCWaves.mjs';
import { WAVES_INTERACTIVES, wavesInteractivesForTopic } from '../interactives/cWavesInteractiveRegistry.mjs';
import WavesInteractiveLab from './WavesInteractiveLab';
import { readPhysicsCourseProgress, setPhysicsCourseLessonCompletion } from '../../course/physicsCourseProgress.mjs';
import { readPhysicsWavesProgress, recordPhysicsWavesResult, setPhysicsWavesCompletion } from '../physicsWavesProgress.mjs';
import '../../mechanics/components/physicsMechanics.css';
import './physicsWaves.css';

function StudyView({ topic, userId, courseProgress, setCourseProgress, onActivity }) {
  const lesson = topic.lesson;
  const complete = Boolean(courseProgress[`lesson:${topic.id}`]);
  return <div className="pm-study-grid">
    <div className="pm-panel">
      {(lesson.sections || []).map((section, index) => <section className="pm-section-card" key={section.id || index}>
        <h3>{section.heading}</h3>
        {(section.paragraphs || []).map((paragraph, pIndex) => <MathText key={pIndex} as="p" prose>{paragraph}</MathText>)}
      </section>)}
      {lesson.practicals?.length > 0 && <section className="pm-section-card">
        <h3>Practical activities</h3>
        <ul>{lesson.practicals.map((item, index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul>
      </section>}
      <div className="pm-completion">
        <button type="button" className={complete ? 'done' : ''} onClick={() => {
          const next = setPhysicsCourseLessonCompletion(userId, courseProgress, topic.id, !complete);
          setCourseProgress(next);
          onActivity?.({ type:'physics_lesson_completion', subject:'CSEC Physics', section:'C', topic:topic.id, completed:!complete });
        }}>{complete ? '✓ Lesson marked complete' : 'Mark lesson complete'}</button>
        <span className="pm-feedback">Completion records study activity only. Assessment results are tracked separately.</span>
      </div>
    </div>
    <aside className="pm-panel">
      <h3>Formulae</h3>
      <div className="pm-table-wrap" tabIndex="0"><table className="pm-formula-table"><thead><tr><th>Quantity</th><th>Relationship</th><th>Unit / condition</th></tr></thead><tbody>
        {(lesson.formulae || []).map((formula, index) => <tr key={index}><td><MathText prose>{formula.name}</MathText></td><td className="pm-formula"><MathText prose>{formula.equation}</MathText></td><td><MathText prose>{`${formula.unit || ''}${formula.condition ? ` · ${formula.condition}` : ''}`}</MathText></td></tr>)}
      </tbody></table></div>
      <h3 style={{ marginTop:22 }}>Syllabus objectives</h3>
      <div className="pm-objective-list">{lesson.objectives.map(([id, text]) => {
        const card = lesson.objectiveCards?.[id] || {};
        return <div className="pm-objective" key={id}><strong>{id}</strong><MathText as="p" prose>{text}</MathText>{card.inShort && <p><b>In short:</b> <MathText prose>{card.inShort}</MathText></p>}{card.watchOut && <p><b>Watch out:</b> <MathText prose>{card.watchOut}</MathText></p>}</div>;
      })}</div>
    </aside>
  </div>;
}

function LabsView({ topic, progress, setProgress, onActivity, userId }) {
  const labs = wavesInteractivesForTopic(topic.id);
  return <div className="pm-labs-grid">{labs.map(lab => <div key={lab.id}>
    <WavesInteractiveLab interactiveId={lab.id} />
    <div className="pm-completion">
      <button type="button" className={progress[`lab:${lab.id}`] ? 'done' : ''} onClick={() => setProgress(previous => {
        const value = !previous[`lab:${lab.id}`];
        const next = setPhysicsWavesCompletion(userId, previous, `lab:${lab.id}`, value);
        onActivity?.({ type:'physics_lab_completion', subject:'CSEC Physics', section:'C', topic:topic.id, lab:lab.id, completed:value });
        return next;
      })}>{progress[`lab:${lab.id}`] ? '✓ Lab explored' : 'Mark lab explored'}</button>
      <span className="pm-feedback">Lab exploration is recorded separately from assessment mastery.</span>
    </div>
  </div>)}</div>;
}

function FlashcardsView({ topic }) {
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const cards = topic.flashcards;
  const card = cards[index % cards.length];
  useEffect(() => { setIndex(0); setBack(false); }, [topic.id]);
  return <div className="pm-panel pm-flashcard-panel">
    <div className="pm-flashcard-panel-head"><div><strong>{topic.id} · {topic.title}</strong><span>Flashcard {index + 1} of {cards.length} · {card.objective}</span></div></div>
    <button type="button" className="pm-flashcard pm-flashcard-polished" onClick={() => setBack(value => !value)}>
      {back ? <><small>ANSWER</small><MathText as="p" prose>{card.back}</MathText><PhysicsFlashcardVisual objective={card.objective}/><span className="pm-flashcard-hint">Tap to return to the question</span></> : <><small>{card.objective}</small><MathText as="h3" prose>{card.front}</MathText><span className="pm-flashcard-hint">Tap to reveal the answer</span></>}
    </button>
    <div className="pm-flashcard-nav-row">
      <button type="button" className="pm-btn secondary" disabled={index === 0} onClick={() => { setIndex(value => Math.max(0, value - 1)); setBack(false); }}>← Previous</button>
      <div className="pm-flashcard-progress-dots"><span style={{ width:`${((index + 1) / cards.length) * 100}%` }} /></div>
      <button type="button" className="pm-btn" disabled={index === cards.length - 1} onClick={() => { setIndex(value => Math.min(cards.length - 1, value + 1)); setBack(false); }}>Next card →</button>
    </div>
  </div>;
}

export function PhysicsWavesCheckpoint({ onActivity }) {
  const [seed, setSeed] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = useMemo(() => buildSectionCCheckpoint({ seed }), [seed]);
  const score = questions.filter(question => answers[question.id] === question.answer).length;
  return <div className="pm-quiz">
    <div className="pm-panel"><strong>Section C Waves and Optics checkpoint</strong><p style={{ color:'var(--pm-muted)', marginBottom:0 }}>30 objective-linked questions across C1 to C5. This is a SPARK section checkpoint, not a claim about exact CXC Paper 01 weighting.</p></div>
    {questions.map((question, index) => <article className="pm-question" key={question.id}><h3>{index + 1}. <span className="pm-chip">{question.topic}</span> <MathText prose>{question.stem}</MathText></h3>{question.options.map((option, optionIndex) => {
      const selected = answers[question.id] === optionIndex;
      const state = submitted ? (optionIndex === question.answer ? 'correct' : selected ? 'wrong' : '') : '';
      return <label key={optionIndex} className={`pm-option ${state}`}><input type="radio" name={question.id} disabled={submitted} checked={selected} onChange={() => setAnswers(previous => ({ ...previous, [question.id]:optionIndex }))} /><span>{String.fromCharCode(65 + optionIndex)}. <MathText prose>{option}</MathText></span></label>;
    })}{submitted && <div className="pm-explanation"><MathText prose>{question.explanation}</MathText></div>}</article>)}
    <div className="pm-panel">{submitted ? <><h3>Section C checkpoint: {score}/30 ({Math.round(score / 30 * 100)}%)</h3><button type="button" className="pm-btn" onClick={() => { setSeed(value => value + 1); setAnswers({}); setSubmitted(false); }}>New checkpoint</button></> : <button type="button" className="pm-btn" onClick={() => { const finalScore = questions.filter(question => answers[question.id] === question.answer).length; setSubmitted(true); onActivity?.({ type:'physics_section_checkpoint', subject:'CSEC Physics', section:'C', score:finalScore, maxScore:30, percent:Math.round(finalScore / 30 * 100) }); }}>Submit checkpoint</button>}</div>
  </div>;
}

export default function PhysicsWavesSection({ userId, onBack, onActivity }) {
  const [topicId, setTopicId] = useState('C1');
  const [mode, setMode] = useState('study');
  const [wavesProgress, setWavesProgress] = useState(() => readPhysicsWavesProgress(userId));
  const [courseProgress, setCourseProgress] = useState(() => readPhysicsCourseProgress(userId));
  const topic = SECTION_C_TOPICS.find(item => item.id === topicId) || SECTION_C_TOPICS[0];
  const stats = sectionCStats();
  useEffect(() => { setWavesProgress(readPhysicsWavesProgress(userId)); setCourseProgress(readPhysicsCourseProgress(userId)); }, [userId]);
  const labs = wavesInteractivesForTopic(topic.id);
  const completed = (courseProgress[`lesson:${topic.id}`] ? 1 : 0) + labs.filter(lab => wavesProgress[`lab:${lab.id}`]).length;
  const total = 1 + labs.length;
  const percent = Math.round(completed / total * 100);
  const activity = event => {
    if (event?.type === 'physics_topic_quiz') setWavesProgress(previous => recordPhysicsWavesResult(userId, previous, `quiz:${topic.id}`, event));
    if (event?.type === 'physics_section_checkpoint') setWavesProgress(previous => recordPhysicsWavesResult(userId, previous, 'checkpoint:C', event));
    onActivity?.({ ...event, section:event?.section || 'C', subject:event?.subject || 'CSEC Physics' });
  };
  return <main className="physics-mechanics physics-waves"><div className="pm-shell">
    <header className="pm-hero"><div>{onBack && <button type="button" className="pm-btn secondary" onClick={onBack} style={{ marginBottom:12 }}>← Back to Physics</button>}<div className="pm-eyebrow">CSEC Physics · Section C</div><h1>Waves and Optics</h1><p>Study all 29 Section C objectives through audited lessons, interactive models, flashcards, topic practice and cumulative assessment.</p></div><div className="pm-hero-stats"><div className="pm-stat"><strong>{stats.objectives}</strong><span>objectives</span></div><div className="pm-stat"><strong>{stats.mcq}</strong><span>MCQs</span></div><div className="pm-stat"><strong>{stats.flashcards}</strong><span>flashcards</span></div><div className="pm-stat"><strong>{WAVES_INTERACTIVES.length}</strong><span>interactive labs</span></div></div></header>
    <nav className="pm-topics" aria-label="Waves and Optics topics">{SECTION_C_TOPICS.map(item => <button key={item.id} type="button" aria-pressed={topic.id === item.id} className={`pm-topic-btn ${topic.id === item.id ? 'active' : ''}`} onClick={() => { setTopicId(item.id); setMode('study'); }}>{item.id} · {item.title}</button>)}</nav>
    <div className="pm-topic-head"><div><h2>{topic.id}. {topic.title}</h2><MathText as="p" prose>{topic.lesson.summary}</MathText></div><div className="pm-topic-progress"><strong>{percent}% explored</strong><div className="pm-progress-track"><i style={{ width:`${percent}%` }} /></div><span>{completed}/{total} study activities marked complete</span></div></div>
    <nav className="pm-modebar" aria-label="Waves and Optics learning mode"><button type="button" className={`pm-mode-btn ${mode === 'study' ? 'active' : ''}`} aria-pressed={mode === 'study'} onClick={() => setMode('study')}>Study</button><button type="button" className={`pm-mode-btn ${mode === 'labs' ? 'active' : ''}`} aria-pressed={mode === 'labs'} onClick={() => setMode('labs')}>Interactive labs</button><button type="button" className={`pm-mode-btn ${mode === 'flashcards' ? 'active' : ''}`} aria-pressed={mode === 'flashcards'} onClick={() => setMode('flashcards')}>Flashcards</button><button type="button" className={`pm-mode-btn ${mode === 'quiz' ? 'active' : ''}`} aria-pressed={mode === 'quiz'} onClick={() => setMode('quiz')}>Topic test</button><button type="button" className={`pm-mode-btn ${mode === 'checkpoint' ? 'active' : ''}`} aria-pressed={mode === 'checkpoint'} onClick={() => setMode('checkpoint')}>Section C checkpoint</button></nav>
    {mode === 'study' && <StudyView topic={topic} userId={userId} courseProgress={courseProgress} setCourseProgress={setCourseProgress} onActivity={onActivity} />}
    {mode === 'labs' && <LabsView topic={topic} progress={wavesProgress} setProgress={setWavesProgress} onActivity={onActivity} userId={userId} />}
    {mode === 'flashcards' && <FlashcardsView key={`fc-${topic.id}`} topic={topic} />}
    {mode === 'quiz' && <PhysicsTopicQuiz key={`q-${topic.id}`} topic={topic} onActivity={activity} />}
    {mode === 'checkpoint' && <PhysicsWavesCheckpoint onActivity={activity} />}
  </div></main>;
}
