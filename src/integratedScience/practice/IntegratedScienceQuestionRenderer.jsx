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
  const width=620, height=Math.max(280,Number(config.height || 320)), pad=46;
  const [points,setPoints]=useState([]);
  const [xLabel,setXLabel]=useState(config.x || "");
  const [yLabel,setYLabel]=useState(config.y || "");
  const xMax=Number(config.xMax || 10);
  const yMax=Number(config.yMax || 10);
  const toValue=(event)=>{
    const svg=event.currentTarget;
    const rect=svg.getBoundingClientRect();
    const x=Math.max(0,Math.min(xMax,((event.clientX-rect.left-pad)/Math.max(1,rect.width-pad*2))*xMax));
    const y=Math.max(0,Math.min(yMax,((rect.bottom-event.clientY-pad)/Math.max(1,rect.height-pad*2))*yMax));
    return {x:Number(x.toFixed(2)),y:Number(y.toFixed(2))};
  };
  const toScreen=point=>({
    x:pad+(point.x/xMax)*(width-pad*2),
    y:height-pad-(point.y/yMax)*(height-pad*2),
  });
  const grid=Array.from({length:11},(_,i)=>i);
  return <div className="is-practice-graph-workspace">
    <div className="is-practice-graph-fields">
      <label>X-axis <input value={xLabel} onChange={e=>setXLabel(e.target.value)} placeholder="Quantity / unit"/></label>
      <label>Y-axis <input value={yLabel} onChange={e=>setYLabel(e.target.value)} placeholder="Quantity / unit"/></label>
    </div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive graph plotting workspace" onClick={e=>setPoints(current=>[...current,toValue(e)])}>
      <rect x={pad} y={pad} width={width-pad*2} height={height-pad*2} className="is-practice-graph-paper"/>
      {grid.map(i=>{
        const x=pad+i*(width-pad*2)/10, y=pad+i*(height-pad*2)/10;
        return <React.Fragment key={i}><line x1={x} y1={pad} x2={x} y2={height-pad} className="is-practice-graph-grid"/><line x1={pad} y1={y} x2={width-pad} y2={y} className="is-practice-graph-grid"/></React.Fragment>;
      })}
      <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} className="is-practice-graph-axis"/>
      <line x1={pad} y1={pad} x2={pad} y2={height-pad} className="is-practice-graph-axis"/>
      {points.map((point,index)=>{const p=toScreen(point);return <circle key={index} cx={p.x} cy={p.y} r="5" className="is-practice-graph-point"/>;})}
      {points.length>1 && <polyline points={points.map(point=>{const p=toScreen(point);return `${p.x},${p.y}`;}).join(" ")} className="is-practice-graph-line"/>}
      <text x={width/2} y={height-8} textAnchor="middle" className="is-practice-graph-label">{xLabel || "x-axis"}</text>
      <text x="14" y={height/2} textAnchor="middle" transform={`rotate(-90 14 ${height/2})`} className="is-practice-graph-label">{yLabel || "y-axis"}</text>
    </svg>
    <div className="is-practice-graph-actions">
      <span>{points.length} point{points.length===1?"":"s"} plotted</span>
      <button type="button" onClick={()=>setPoints(current=>current.slice(0,-1))} disabled={!points.length}>Undo point</button>
      <button type="button" onClick={()=>setPoints([])} disabled={!points.length}>Clear graph</button>
    </div>
  </div>;
}

function PracticeDrawingResponse({ config }) {
  const width=620, height=Math.max(220,Number(config.height || 280));
  const [strokes,setStrokes]=useState([]);
  const [active,setActive]=useState([]);
  const pointFromEvent=event=>{
    const svg=event.currentTarget;
    const rect=svg.getBoundingClientRect();
    return {x:((event.clientX-rect.left)/Math.max(1,rect.width))*width,y:((event.clientY-rect.top)/Math.max(1,rect.height))*height};
  };
  const start=event=>{event.currentTarget.setPointerCapture?.(event.pointerId);setActive([pointFromEvent(event)]);};
  const move=event=>{if(active.length)setActive(current=>[...current,pointFromEvent(event)]);};
  const end=()=>{if(active.length>1)setStrokes(current=>[...current,active]);setActive([]);};
  const path=stroke=>stroke.map((p,i)=>`${i?"L":"M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  return <div className="is-practice-drawing-workspace">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive scientific drawing workspace" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <rect width={width} height={height} className="is-practice-drawing-paper"/>
      {strokes.map((stroke,index)=><path key={index} d={path(stroke)} className="is-practice-drawing-stroke"/>)}
      {active.length>1 && <path d={path(active)} className="is-practice-drawing-stroke"/>}
    </svg>
    <div className="is-practice-graph-actions">
      <span>{strokes.length} stroke{strokes.length===1?"":"s"}</span>
      <button type="button" onClick={()=>setStrokes(current=>current.slice(0,-1))} disabled={!strokes.length}>Undo stroke</button>
      <button type="button" onClick={()=>setStrokes([])} disabled={!strokes.length}>Clear drawing</button>
    </div>
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

  if (type === "graph") return <PracticeGraphResponse config={config} />;

  if (type === "drawing") return <PracticeDrawingResponse config={config} />;

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
