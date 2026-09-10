import React, { useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import { PhysicsTopicQuiz } from '../../mechanics/components/PhysicsMechanicsSection';
import { SECTION_E_TOPICS } from '../sectionEAtomic.mjs';
import { SECTION_E_STRUCTURED_BANK } from '../sectionEStructuredBank.mjs';
import { PhysicsAtomicCheckpoint } from './PhysicsAtomicSection';
import '../../mechanics/components/physicsMechanics.css';
import './physicsAtomic.css';

function responseKey(partId, field) { return `${partId}:${field}`; }

function StructuredPractice() {
  const [topicId, setTopicId] = useState('E1');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [revealed, setRevealed] = useState(false);
  const questions = SECTION_E_STRUCTURED_BANK.filter(question => question.topic === topicId);
  const question = questions[Math.min(questionIndex, Math.max(0, questions.length - 1))];
  const setResponse = (part, field, value) => setResponses(previous => ({ ...previous, [responseKey(part, field)]:value }));
  return <div className="pm-structured-practice">
    <div className="pm-panel"><nav className="pm-topics" aria-label="Section E structured practice topic">{SECTION_E_TOPICS.map(topic => <button key={topic.id} type="button" className={`pm-topic-btn ${topicId === topic.id ? 'active' : ''}`} aria-pressed={topicId === topic.id} onClick={() => { setTopicId(topic.id); setQuestionIndex(0); setResponses({}); setRevealed(false); }}>{topic.id} · {topic.title}</button>)}</nav>{questions.length > 1 && <div className="pm-structured-question-tabs">{questions.map((item, index) => <button type="button" key={item.id} className={questionIndex === index ? 'active' : ''} onClick={() => { setQuestionIndex(index); setResponses({}); setRevealed(false); }}>Question {index + 1}</button>)}</div>}</div>
    {!question ? <div className="pm-empty">No structured question is available for this topic.</div> : <article className="pm-panel pm-structured-question">
      <div className="pm-structured-title"><div><span className="pm-chip">{topicId}</span><h2>{question.title}</h2></div><strong>{question.marks} marks</strong></div>
      <MathText as="p" prose className="pm-structured-stem">{question.stem}</MathText>
      <div className="pm-structured-parts">{question.parts.map(part => {
        const fields = Array.isArray(part.responseFields) && part.responseFields.length ? part.responseFields : ['answer'];
        return <section key={part.id} className="pm-structured-part"><div className="pm-structured-part-head"><strong>({part.id})</strong><span>{part.marks} marks</span></div><MathText as="p" prose>{part.prompt}</MathText>{part.requireDrawing && <div className="pm-structured-drawing-note">Complete the graph or diagram on paper or in your working space. Drawing marks remain a manual check.</div>}<div className={`pm-structured-response-grid ${fields.length > 1 ? 'multi' : ''}`}>{fields.map(field => <label key={field}><span>{field === 'answer' ? 'Your response' : field.replace(/_/g, ' ')}</span><textarea value={responses[responseKey(part.id, field)] || ''} onChange={event => setResponse(part.id, field, event.target.value)} rows={fields.length > 1 ? 3 : 4} /></label>)}</div>{revealed && <div className="pm-marking-guide"><strong>Marking guide</strong><ul>{part.criteria.map((criterion, index) => <li key={`${criterion.code}-${index}`}><span>{criterion.code}</span>{criterion.description}{criterion.manual ? ' (manual drawing check)' : ''}</li>)}</ul></div>}</section>;
      })}</div>
      <div className="pm-action-row"><button type="button" className="pm-btn" onClick={() => setRevealed(value => !value)}>{revealed ? 'Hide marking guide' : 'Reveal marking guide'}</button><span className="pm-feedback">Compare each mark-worthy point separately. Graph and diagram criteria stay manual.</span></div>
    </article>}
  </div>;
}

export default function PhysicsAtomicPractice({ userId, onBack, onActivity }) {
  const [mode, setMode] = useState('home');
  const [topicId, setTopicId] = useState('E1');
  const topic = useMemo(() => SECTION_E_TOPICS.find(item => item.id === topicId) || SECTION_E_TOPICS[0], [topicId]);
  if (mode === 'topic') return <main className="physics-mechanics physics-atomic"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics · Section E practice</div><h1>Topic test</h1><p>Choose a Physics of the Atom topic and complete a 10-question objective-linked test.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode('home')}>← Section E practice</button></div><nav className="pm-topics">{SECTION_E_TOPICS.map(item => <button key={item.id} type="button" className={`pm-topic-btn ${topicId === item.id ? 'active' : ''}`} onClick={() => setTopicId(item.id)}>{item.id} · {item.title}</button>)}</nav><PhysicsTopicQuiz key={topic.id} topic={topic} onActivity={event => onActivity?.({ ...event, section:'E', subject:'CSEC Physics' })} /></div></main>;
  if (mode === 'structured') return <main className="physics-mechanics physics-atomic"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics · Section E practice</div><h1>Structured practice</h1><p>Work through original The Physics of the Atom structured, extended-response and data-analysis questions.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode('home')}>← Section E practice</button></div><StructuredPractice /></div></main>;
  if (mode === 'checkpoint') return <main className="physics-mechanics physics-atomic"><div className="pm-shell"><div className="pm-support-head"><div><div className="pm-eyebrow">CSEC Physics · Section E practice</div><h1>Section E checkpoint</h1><p>Complete a cumulative 30-question SPARK assessment across E1 to E3.</p></div><button type="button" className="pm-btn secondary" onClick={() => setMode('home')}>← Section E practice</button></div><PhysicsAtomicCheckpoint onActivity={onActivity} /></div></main>;
  return <main className="physics-mechanics physics-atomic"><div className="pm-shell"><div className="pm-support-head"><div>{onBack && <button type="button" className="pm-btn secondary" onClick={onBack} style={{ marginBottom:12 }}>← Physics practice</button>}<div className="pm-eyebrow">CSEC Physics · Section E</div><h1>The Physics of the Atom practice</h1><p>Choose topic practice, written practice or a cumulative Section E checkpoint.</p></div></div><div className="pm-practice-card-grid"><button type="button" className="pm-practice-card" onClick={() => setMode('topic')}><span>10</span><small>Objective-linked</small><h2>Topic tests</h2><p>Choose E1 to E3 and answer 10 original multiple-choice questions with explanations.</p><b>Open topic tests →</b></button><button type="button" className="pm-practice-card" onClick={() => setMode('structured')}><span>Σ</span><small>Written practice</small><h2>Structured questions</h2><p>Practise atomic models, nuclear structure, radioactivity, half-life and nuclear energy with mark-worthy criteria.</p><b>Open structured practice →</b></button><button type="button" className="pm-practice-card" onClick={() => setMode('checkpoint')}><span>30</span><small>Cumulative</small><h2>Section E checkpoint</h2><p>Answer 30 questions across The Physics of the Atom. This is a SPARK section checkpoint.</p><b>Start checkpoint →</b></button></div></div></main>;
}
