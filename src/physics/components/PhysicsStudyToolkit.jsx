import React from 'react';
import MathText from '../../practice/MathText';
import { physicsStudyUpgradeForTopic } from '../course/physicsStudyUpgrade.mjs';
import './physicsStudyToolkit.css';

function StudyTable({ dataSkill }) {
  if (!dataSkill?.columns?.length || !dataSkill?.rows?.length) return null;
  return (
    <div className="pst-table-wrap" tabIndex="0" aria-label={`${dataSkill.title} table, horizontally scrollable if needed`}>
      <table className="pst-table">
        <thead><tr>{dataSkill.columns.map(column => <th key={column}><MathText prose>{column}</MathText></th>)}</tr></thead>
        <tbody>{dataSkill.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><MathText prose>{cell}</MathText></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function PhysicsStudyToolkit({ topicId }) {
  const upgrade = physicsStudyUpgradeForTopic(topicId);
  if (!upgrade) return null;

  return (
    <section className="pst-toolkit" aria-label={`${topicId} CSEC Physics study notes and exam practice`}>
      <div className="pst-heading">
        <div>
          <span className="pst-kicker">CSEC Physics</span>
          <h3>Study notes and exam practice</h3>
        </div>
        <span className="pst-badge">Worked examples and data handling</span>
      </div>

      <div className="pst-grid">
        <article className="pst-card pst-focus">
          <h4>What you should be able to do</h4>
          <ul>{upgrade.examFocus.map((item, index) => <li key={index}><MathText prose>{item}</MathText></li>)}</ul>
        </article>

        {upgrade.workedExamples.map((example, index) => (
          <article className="pst-card pst-worked" key={`${topicId}-worked-${index}`}>
            <span className="pst-card-label">Worked example {upgrade.workedExamples.length > 1 ? index + 1 : ''}</span>
            <h4><MathText prose>{example.title}</MathText></h4>
            <MathText as="p" prose>{example.prompt}</MathText>
            <ol>{example.steps.map((step, stepIndex) => <li key={stepIndex}><MathText prose>{step}</MathText></li>)}</ol>
            <div className="pst-answer"><strong>Answer</strong><MathText as="span" prose>{example.answer}</MathText></div>
          </article>
        ))}

        {upgrade.dataSkill && (
          <article className="pst-card pst-data">
            <span className="pst-card-label">Data and graph skill</span>
            <h4><MathText prose>{upgrade.dataSkill.title}</MathText></h4>
            <MathText as="p" prose>{upgrade.dataSkill.prompt}</MathText>
            <StudyTable dataSkill={upgrade.dataSkill} />
          </article>
        )}

        <article className="pst-card pst-check">
          <span className="pst-card-label">Check your understanding</span>
          <h4>Practice questions</h4>
          <div className="pst-checks">
            {upgrade.quickChecks.map((item, index) => (
              <details key={index}>
                <summary><MathText prose>{item.question}</MathText></summary>
                <div><MathText prose>{item.answer}</MathText></div>
              </details>
            ))}
          </div>
        </article>
      </div>

      {upgrade.examLanguage && (
        <div className="pst-exam-language">
          <strong>Exam technique</strong>
          <MathText as="p" prose>{upgrade.examLanguage}</MathText>
        </div>
      )}
    </section>
  );
}
