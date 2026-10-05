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

function PracticeGraphResponse({ config }) {
  const [chartType,setChartType]=useState("line");
  const [xLabel,setXLabel]=useState(config.x || "");
  const [yLabel,setYLabel]=useState(config.y || "");
  const [entries,setEntries]=useState("");
  const lines=entries.split(/\n|;/).map(line=>line.trim()).filter(Boolean);
  const numeric=lines.map(line=>{
    const match=line.match(/^(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)$/);
    return match?{x:Number(match[1]),y:Number(match[2])}:null;
  }).filter(Boolean);
  const bars=lines.map(line=>{
    const match=line.match(/^(.+?)\s*[,=:]\s*(-?\d+(?:\.\d+)?)$/);
    return match?{label:match[1].trim(),value:Number(match[2])}:null;
  }).filter(Boolean);
  const width=600,height=300,pad=48;
  const minX=numeric.length?Math.min(0,...numeric.map(p=>p.x)):0;
  const maxX=numeric.length?Math.max(1,...numeric.map(p=>p.x)):1;
  const minY=numeric.length?Math.min(0,...numeric.map(p=>p.y)):0;
  const maxY=numeric.length?Math.max(1,...numeric.map(p=>p.y)):1;
  const sx=x=>pad+(x-minX)/Math.max(1e-9,maxX-minX)*(width-pad*2);
  const sy=y=>height-pad-(y-minY)/Math.max(1e-9,maxY-minY)*(height-pad*2);
  const maxBar=Math.max(1,...bars.map(row=>row.value));

  return <div className="is-p2-graph-workspace is-topic-graph-workspace">
    <div className="is-p2-graph-fields">
      <label><span>Graph type</span><select value={chartType} onChange={e=>setChartType(e.target.value)}><option value="line">Line / curve</option><option value="bar">Bar chart</option></select></label>
      <label><span>x-axis label</span><input value={xLabel} onChange={e=>setXLabel(e.target.value)} placeholder={config.x || "x-axis"}/></label>
      <label><span>y-axis label</span><input value={yLabel} onChange={e=>setYLabel(e.target.value)} placeholder={config.y || "y-axis"}/></label>
    </div>
    <svg className="is-p2-graph-response" viewBox="0 0 600 300" role="img" aria-label="Interactive graph practice workspace">
      <rect x={pad} y={pad/2} width={width-pad*2} height={height-pad*1.5} fill="none" stroke="currentColor"/>
      {Array.from({length:11},(_,i)=><line key={`v${i}`} x1={pad+i*(width-pad*2)/10} x2={pad+i*(width-pad*2)/10} y1={pad/2} y2={height-pad} stroke="currentColor" opacity=".13"/>)}
      {Array.from({length:11},(_,i)=><line key={`h${i}`} x1={pad} x2={width-pad} y1={pad/2+i*(height-pad*1.5)/10} y2={pad/2+i*(height-pad*1.5)/10} stroke="currentColor" opacity=".13"/>)}
      {chartType==="bar" ? bars.map((row,index)=>{
        const band=(width-pad*2)/Math.max(1,bars.length),h=row.value/maxBar*(height-pad*1.8);
        return <g key={`${row.label}-${index}`}><rect x={pad+index*band+band*.18} y={height-pad-h} width={band*.64} height={Math.max(1,h)} className="is-topic-graph-bar"/><text x={pad+index*band+band*.5} y={height-pad+18} textAnchor="middle">{row.label}</text></g>;
      }) : <>
        {numeric.map((point,index)=><circle key={index} cx={sx(point.x)} cy={sy(point.y)} r="4.5" className="is-topic-graph-point"/>)}
        {numeric.length>1&&<polyline points={numeric.map(point=>`${sx(point.x)},${sy(point.y)}`).join(" ")} fill="none" className="is-topic-graph-line"/>}
      </>}
      {xLabel&&<text x={width/2} y={height-7} textAnchor="middle">{xLabel}</text>}
      {yLabel&&<text transform={`translate(14 ${height/2}) rotate(-90)`} textAnchor="middle">{yLabel}</text>}
    </svg>
    <textarea rows={5} value={entries} onChange={e=>setEntries(e.target.value)} placeholder={chartType==="bar"?"Enter one category and value per line, for example:\nA, 12\nB, 25":"Enter one coordinate per line, for example:\n1, 2\n2, 5\n3, 11"}/>
    <small className="is-graph-practice-note">Use the table in the question to enter every plotted value. The graph updates as you work.</small>
  </div>;
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
    return <PracticeGraphResponse config={config} />;
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
