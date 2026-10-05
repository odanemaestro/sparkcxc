import React, { useState } from "react";
import { resolveIntegratedScienceStimulus } from "../data/integratedScienceBank";
import IntegratedScienceText from "../components/IntegratedScienceText";

function TrustedBankSvg({ svg, className = "" }) {
  const safe = typeof svg === "string" && /^\s*<svg[\s>]/i.test(svg) ? svg : "";
  if (!safe) return null;
  return (
    <div
      className={`is-bank-svg ${className}`.trim()}
      dangerouslySetInnerHTML={{__html:safe}}
    />
  );
}

function BankTable({ table, editable = false }) {
  if (!table) return null;
  const headers = Array.isArray(table.headers) ? table.headers : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];

  return (
    <div className="is-bank-table-wrap">
      {table.title && <div className="is-bank-table-title"><IntegratedScienceText>{table.title}</IntegratedScienceText></div>}
      <table className="is-bank-table">
        {headers.length > 0 && (
          <thead>
            <tr>{headers.map((cell,index) => <th key={index}><IntegratedScienceText>{cell}</IntegratedScienceText></th>)}</tr>
          </thead>
        )}
        <tbody>
          {rows.map((row,rowIndex) => (
            <tr key={rowIndex}>
              {(row || []).map((cell,cellIndex) => (
                <td key={cellIndex}>
                  {editable && String(cell ?? "") === ""
                    ? <input aria-label={`Table response row ${rowIndex + 1} column ${cellIndex + 1}`} />
                    : <IntegratedScienceText>{cell}</IntegratedScienceText>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.source && <small className="is-bank-table-source"><IntegratedScienceText>{table.source}</IntegratedScienceText></small>}
    </div>
  );
}

function Stimulus({ stimulus }) {
  if (!stimulus) return null;
  return (
    <section className="is-question-stimulus">
      {stimulus.lead && <p className="is-stimulus-lead">Refer <IntegratedScienceText>{stimulus.lead}</IntegratedScienceText></p>}
      {stimulus.text && <p><IntegratedScienceText>{stimulus.text}</IntegratedScienceText></p>}
      {stimulus.svg && <TrustedBankSvg svg={stimulus.svg} />}
      {stimulus.table && <BankTable table={stimulus.table} />}
    </section>
  );
}

function Statements({ statements }) {
  if (!Array.isArray(statements) || !statements.length) return null;
  const romans = ["I","II","III","IV","V"];
  return (
    <div className="is-question-statements">
      {statements.map((statement,index) => (
        <div key={index}>
          <strong>{romans[index] || index + 1}.</strong>
          <span><IntegratedScienceText>{statement}</IntegratedScienceText></span>
        </div>
      ))}
    </div>
  );
}

function OptionContent({ value, isSvg }) {
  if (isSvg) return <TrustedBankSvg svg={value} className="is-option-svg" />;
  if (Array.isArray(value)) {
    return <span className="is-option-cells">{value.map((cell,index) => <span key={index}>{cell}</span>)}</span>;
  }
  return <IntegratedScienceText>{String(value ?? "")}</IntegratedScienceText>;
}

export function IntegratedSciencePaper1Question({
  moduleData,
  question,
  selectedAnswer = null,
  onAnswer,
  revealFeedback = true,
  lockAfterAnswer = true,
  showMeta = true,
}) {
  const stimulus = resolveIntegratedScienceStimulus(moduleData,question);
  const answered = Boolean(selectedAnswer);
  const correct = answered && selectedAnswer === question.answer;

  return (
    <article className="is-p1-question">
<Stimulus stimulus={stimulus} />

      <div className="is-question-stem"><IntegratedScienceText>{question.stem}</IntegratedScienceText></div>
      <Statements statements={question.statements} />
      {question.after && <p className="is-question-after"><IntegratedScienceText>{question.after}</IntegratedScienceText></p>}

      {question.optionColumns?.length > 0 && (
        <div className="is-option-column-head">
          {question.optionColumns.map((column,index) => <span key={index}><IntegratedScienceText>{column}</IntegratedScienceText></span>)}
        </div>
      )}

      <div className={`is-answer-options ${question.optionsAreSvg ? "with-svg" : ""}`}>
        {Object.entries(question.options || {}).map(([letter,value]) => {
          const picked = selectedAnswer === letter;
          const isCorrect = revealFeedback && answered && letter === question.answer;
          const isWrong = revealFeedback && answered && picked && letter !== question.answer;
          return (
            <button
              type="button"
              key={letter}
              className={`${picked ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
              onClick={() => (!lockAfterAnswer || !answered) && onAnswer?.(letter)}
              disabled={lockAfterAnswer && answered}
            >
              <b>{letter}</b>
              <OptionContent value={value} isSvg={question.optionsAreSvg} />
            </button>
          );
        })}
      </div>

      {answered && revealFeedback && (
        <div className={`is-answer-feedback ${correct ? "correct" : "wrong"}`}>
          <strong>{correct ? "Correct" : `Correct answer: ${question.answer}`}</strong>
          <p><IntegratedScienceText>{question.explanation}</IntegratedScienceText></p>
        </div>
      )}
    </article>
  );
}

function ResponseArea({ response }) {
  const config = response || {};
  const type = config.type || "lines";

  if (type === "labels") {
    return (
      <div className="is-p2-label-responses">
        {(config.keys || []).map(key => (
          <label key={key}><span>{key}</span><input /></label>
        ))}
      </div>
    );
  }

  if (type === "graph") {
    return (
      <div className="is-p2-graph-response" style={{minHeight:config.height || 300}}>
        <span className="is-p2-y-label">{config.y || "y-axis"}</span>
        <span className="is-p2-x-label">{config.x || "x-axis"}</span>
      </div>
    );
  }

  if (type === "drawing") {
    return (
      <div className="is-p2-drawing-response" style={{minHeight:config.height || 220}}>
        <span>Drawing / diagram response area</span>
      </div>
    );
  }

  if (type === "table") {
    return <BankTable table={config.table} editable />;
  }

  if (type === "calculation") {
    return (
      <textarea
        className="is-p2-calculation-response"
        style={{minHeight:config.height || 150}}
        aria-label="Calculation and working"
      />
    );
  }

  return (
    <textarea
      className="is-p2-lines-response"
      rows={Math.max(2,Number(config.lines || 4))}
      aria-label="Written response"
    />
  );
}

function MarkScheme({ scheme }) {
  if (!scheme) return null;
  return (
    <div className="is-p2-mark-scheme">
      <strong>Mark scheme</strong>
      <ul>
        {(scheme.points || []).map((point,index) => <li key={index}><IntegratedScienceText>{point}</IntegratedScienceText></li>)}
      </ul>
      {scheme.guidance && <p><b>Guidance:</b> <IntegratedScienceText>{scheme.guidance}</IntegratedScienceText></p>}
      {Array.isArray(scheme.alternatives) && scheme.alternatives.length > 0 && (
        <p><b>Accept also:</b> <IntegratedScienceText>{scheme.alternatives.join("; ")}</IntegratedScienceText></p>
      )}
    </div>
  );
}

export function IntegratedSciencePaper2Question({ question }) {
  const [revealed,setRevealed] = useState({});
return (
    <article className="is-p2-question">
      <header className="is-p2-question-head">
        <div>
          <h2>{question.title}</h2>
        </div>
        <div className="is-p2-total">{question.totalMarks} marks</div>
      </header>
{(question.parts || []).map((part,partIndex) => (
        <section key={`${question.id}-${part.label}-${partIndex}`} className="is-p2-part">
          <h3>{part.label}</h3>
          {part.context && <p className="is-p2-context"><IntegratedScienceText>{part.context}</IntegratedScienceText></p>}
          {part.svg && <TrustedBankSvg svg={part.svg} />}
          {part.figure && <div className="is-p2-figure-caption"><IntegratedScienceText>{part.figure}</IntegratedScienceText></div>}
          {part.table && <BankTable table={part.table} />}

          {(part.items || []).map((item,itemIndex) => {
            const key = `${partIndex}-${itemIndex}`;
            return (
              <div className="is-p2-subquestion" key={key}>
                <div className="is-p2-subquestion-prompt">
                  <strong>{item.label}</strong>
                  <span><IntegratedScienceText>{item.prompt}</IntegratedScienceText></span>
                  <b>{item.marks} mark{item.marks === 1 ? "" : "s"}</b>
                </div>
                {item.svg && <TrustedBankSvg svg={item.svg} />}
                {item.table && <BankTable table={item.table} />}
                <ResponseArea response={item.response} />
                <button
                  type="button"
                  className="is-mark-scheme-toggle"
                  onClick={() => setRevealed(current => ({...current,[key]:!current[key]}))}
                >
                  {revealed[key] ? "Hide mark scheme" : "Show mark scheme"}
                </button>
                {revealed[key] && <MarkScheme scheme={item.markScheme} />}
              </div>
            );
          })}
        </section>
      ))}
    </article>
  );
}

export { TrustedBankSvg, BankTable };
