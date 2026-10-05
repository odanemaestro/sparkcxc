import React, { useState } from "react";
import { resolveIntegratedScienceStimulus } from "../data/integratedScienceBank";
import IntegratedScienceText from "../components/IntegratedScienceText";
import { deriveIntegratedScienceGraphData, integratedScienceGraphBounds, parseStoredBarValues } from "./integratedScienceGraphModel";

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


function parseStoredGraphPoints(value) {
  return String(value || "").split(/\n|;/).map(line => {
    const match = line.match(/^\s*(?:([^:]+):)?\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/);
    return match ? {series:String(match[1] || "").trim(),x:Number(match[2]),y:Number(match[3])} : null;
  }).filter(point => point && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function PracticeGraphResponse({ base, config, item, sourceTable, responses, onChange, disabled = false }) {
  const width=620, height=Math.max(280,Number(config.height || 320)), pad=52;
  const model=deriveIntegratedScienceGraphData(item,sourceTable);
  const bounds=integratedScienceGraphBounds(model);
  const [selectedSeries,setSelectedSeries]=useState(model.series?.[0]?.name || "");
  const xLabel=responses[`${base}:xLabel`] ?? config.x ?? "";
  const yLabel=responses[`${base}:yLabel`] ?? config.y ?? "";
  const scaleText=responses[`${base}:scale`] || "";
  const keyText=responses[`${base}:key`] || "";

  if(model.kind==="bar"){
    const bars=parseStoredBarValues(responses[`${base}:bars`]);
    const updateBar=(seriesName,category,value)=>{
      const next={...bars,[seriesName]:{...(bars[seriesName] || {}),[category]:value}};
      onChange?.(`${base}:bars`,JSON.stringify(next));
    };
    const entered=(model.series || []).flatMap(series=>(model.categories || []).map(category=>Number(bars?.[series.name]?.[category])).filter(Number.isFinite));
    const yMax=Math.max(1,...entered);
    const groups=Math.max(1,model.categories.length), seriesCount=Math.max(1,model.series.length);
    const plotWidth=width-pad*2, groupWidth=plotWidth/groups, barWidth=Math.max(8,groupWidth*.72/seriesCount);
    return <div className="is-practice-graph-workspace">
      <div className="is-practice-graph-fields">
        <label>X-axis <input disabled={disabled} value={xLabel} onChange={e=>onChange?.(`${base}:xLabel`,e.target.value)} placeholder={model.xLabel || "Quantity / unit"}/></label>
        <label>Y-axis <input disabled={disabled} value={yLabel} onChange={e=>onChange?.(`${base}:yLabel`,e.target.value)} placeholder={model.yLabel || "Quantity / unit"}/></label>
        <label>Scale <input disabled={disabled} value={scaleText} onChange={e=>onChange?.(`${base}:scale`,e.target.value)} placeholder="e.g. 1 square = 10 units"/></label>
        {model.series.length>1 && <label>Key <input disabled={disabled} value={keyText} onChange={e=>onChange?.(`${base}:key`,e.target.value)} placeholder="State how the series are distinguished"/></label>}
      </div>
      <div className="is-practice-bar-entry-grid">
        {(model.categories || []).map(category=><div key={category} className="is-practice-bar-entry-row"><strong>{category}</strong>{(model.series || []).map(series=><label key={series.name}><span>{series.name}</span><input disabled={disabled} inputMode="decimal" value={bars?.[series.name]?.[category] ?? ""} onChange={e=>updateBar(series.name,category,e.target.value)} placeholder="Value"/></label>)}</div>)}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive bar chart workspace">
        <rect x={pad} y={pad} width={width-pad*2} height={height-pad*2} className="is-practice-graph-paper"/>
        <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} className="is-practice-graph-axis"/>
        <line x1={pad} y1={pad} x2={pad} y2={height-pad} className="is-practice-graph-axis"/>
        {(model.categories || []).map((category,categoryIndex)=><React.Fragment key={category}>
          {(model.series || []).map((series,seriesIndex)=>{
            const value=Number(bars?.[series.name]?.[category]);
            const safe=Number.isFinite(value)?Math.max(0,value):0;
            const h=(safe/yMax)*(height-pad*2);
            const x=pad+categoryIndex*groupWidth+(groupWidth-seriesCount*barWidth)/2+seriesIndex*barWidth;
            return <rect key={series.name} x={x} y={height-pad-h} width={barWidth*.82} height={h} className={`is-practice-bar is-series-${seriesIndex%3}`}/>;
          })}
          <text x={pad+categoryIndex*groupWidth+groupWidth/2} y={height-pad+18} textAnchor="middle" className="is-practice-graph-tick">{category.length>14?`${category.slice(0,12)}…`:category}</text>
        </React.Fragment>)}
        <text x={width/2} y={height-6} textAnchor="middle" className="is-practice-graph-label">{xLabel || model.xLabel || "x-axis"}</text>
        <text x="15" y={height/2} textAnchor="middle" transform={`rotate(-90 15 ${height/2})`} className="is-practice-graph-label">{yLabel || model.yLabel || "y-axis"}</text>
      </svg>
    </div>;
  }

  const points=parseStoredGraphPoints(responses[`${base}:points`]);
  const xMin=Number(config.xMin ?? bounds.xMin), xMax=Number(config.xMax ?? bounds.xMax);
  const yMin=Number(config.yMin ?? bounds.yMin), yMax=Number(config.yMax ?? bounds.yMax);
  const toValue=(event)=>{
    const svg=event.currentTarget;
    const rect=svg.getBoundingClientRect();
    const x=xMin+Math.max(0,Math.min(1,(event.clientX-rect.left-pad)/Math.max(1,rect.width-pad*2)))*(xMax-xMin);
    const y=yMin+Math.max(0,Math.min(1,(rect.bottom-event.clientY-pad)/Math.max(1,rect.height-pad*2)))*(yMax-yMin);
    return {series:selectedSeries,x:Number(x.toFixed(2)),y:Number(y.toFixed(2))};
  };
  const toScreen=point=>({
    x:pad+((point.x-xMin)/Math.max(1e-9,xMax-xMin))*(width-pad*2),
    y:height-pad-((point.y-yMin)/Math.max(1e-9,yMax-yMin))*(height-pad*2),
  });
  const writePoints=next=>onChange?.(`${base}:points`,next.map(point=>`${model.series.length>1 && point.series ? `${point.series}: ` : ""}${point.x}, ${point.y}`).join("\n"));
  const grid=Array.from({length:11},(_,i)=>i);
  return <div className="is-practice-graph-workspace">
    <div className="is-practice-graph-fields">
      <label>X-axis <input disabled={disabled} value={xLabel} onChange={e=>onChange?.(`${base}:xLabel`,e.target.value)} placeholder={model.xLabel || "Quantity / unit"}/></label>
      <label>Y-axis <input disabled={disabled} value={yLabel} onChange={e=>onChange?.(`${base}:yLabel`,e.target.value)} placeholder={model.yLabel || "Quantity / unit"}/></label>
      <label>Scale <input disabled={disabled} value={scaleText} onChange={e=>onChange?.(`${base}:scale`,e.target.value)} placeholder="State the scale you used"/></label>
      {model.series.length>1 && <label>Key <input disabled={disabled} value={keyText} onChange={e=>onChange?.(`${base}:key`,e.target.value)} placeholder="State how the series are distinguished"/></label>}
    </div>
    {model.series.length>1 && <div className="is-practice-graph-series-tabs">{model.series.map(series=><button type="button" key={series.name} disabled={disabled} className={selectedSeries===series.name?"active":""} onClick={()=>setSelectedSeries(series.name)}>{series.name}</button>)}</div>}
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive graph plotting workspace" onClick={disabled?undefined:e=>writePoints([...points,toValue(e)])}>
      <rect x={pad} y={pad} width={width-pad*2} height={height-pad*2} className="is-practice-graph-paper"/>
      {grid.map(i=>{
        const x=pad+i*(width-pad*2)/10, y=pad+i*(height-pad*2)/10;
        const xValue=xMin+(xMax-xMin)*i/10;
        const yValue=yMax-(yMax-yMin)*i/10;
        const formatTick=value=>Math.abs(value)>=100 ? Math.round(value) : Number(value.toFixed(2));
        return <React.Fragment key={i}>
          <line x1={x} y1={pad} x2={x} y2={height-pad} className="is-practice-graph-grid"/>
          <line x1={pad} y1={y} x2={width-pad} y2={y} className="is-practice-graph-grid"/>
          <text x={x} y={height-pad+16} textAnchor="middle" className="is-practice-graph-tick">{formatTick(xValue)}</text>
          <text x={pad-7} y={y+3} textAnchor="end" className="is-practice-graph-tick">{formatTick(yValue)}</text>
        </React.Fragment>;
      })}
      <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} className="is-practice-graph-axis"/>
      <line x1={pad} y1={pad} x2={pad} y2={height-pad} className="is-practice-graph-axis"/>
      {(model.series.length?model.series:[{name:""}]).map((series,seriesIndex)=>{
        const seriesPoints=points.filter(point=>model.series.length<=1 || point.series===series.name);
        return <g key={series.name || "series"} className={`is-series-${seriesIndex%3}`}>
          {seriesPoints.map((point,index)=>{const p=toScreen(point);return <circle key={index} cx={p.x} cy={p.y} r="5" className="is-practice-graph-point"/>;})}
          {seriesPoints.length>1 && <polyline points={seriesPoints.map(point=>{const p=toScreen(point);return `${p.x},${p.y}`;}).join(" ")} className="is-practice-graph-line" style={{strokeDasharray:seriesIndex===1?"8 5":seriesIndex===2?"2 4":undefined}}/>}
        </g>;
      })}
      <text x={width/2} y={height-8} textAnchor="middle" className="is-practice-graph-label">{xLabel || model.xLabel || "x-axis"}</text>
      <text x="14" y={height/2} textAnchor="middle" transform={`rotate(-90 14 ${height/2})`} className="is-practice-graph-label">{yLabel || model.yLabel || "y-axis"}</text>
    </svg>
    <div className="is-practice-graph-actions">
      <span>{points.length} point{points.length===1?"":"s"} plotted</span>
      {!disabled && <><button type="button" onClick={()=>writePoints(points.slice(0,-1))} disabled={!points.length}>Undo point</button><button type="button" onClick={()=>writePoints([])} disabled={!points.length}>Clear graph</button></>}
    </div>
    <textarea disabled={disabled} rows={2} value={responses[base] || ""} onChange={e=>onChange?.(base,e.target.value)} placeholder="Add any graph working or observations required by the question."/>
  </div>;
}

function parseStoredStrokes(value) {
  try {
    const parsed=JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function PracticeDrawingResponse({ base, config, responses, onChange, disabled = false }) {
  const width=620, height=Math.max(220,Number(config.height || 280));
  const strokes=parseStoredStrokes(responses[`${base}:strokes`]);
  const [active,setActive]=useState([]);
  const pointFromEvent=event=>{
    const svg=event.currentTarget;
    const rect=svg.getBoundingClientRect();
    return {x:((event.clientX-rect.left)/Math.max(1,rect.width))*width,y:((event.clientY-rect.top)/Math.max(1,rect.height))*height};
  };
  const start=event=>{if(disabled)return;event.currentTarget.setPointerCapture?.(event.pointerId);setActive([pointFromEvent(event)]);};
  const move=event=>{if(!disabled&&active.length)setActive(current=>[...current,pointFromEvent(event)]);};
  const end=()=>{if(!disabled&&active.length>1)onChange?.(`${base}:strokes`,JSON.stringify([...strokes,active]));setActive([]);};
  const path=stroke=>stroke.map((p,i)=>`${i?"L":"M"} ${Number(p.x).toFixed(1)} ${Number(p.y).toFixed(1)}`).join(" ");
  return <div className="is-practice-drawing-workspace">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive scientific drawing workspace" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <rect width={width} height={height} className="is-practice-drawing-paper"/>
      {strokes.map((stroke,index)=><path key={index} d={path(stroke)} className="is-practice-drawing-stroke"/>)}
      {active.length>1 && <path d={path(active)} className="is-practice-drawing-stroke"/>}
    </svg>
    <div className="is-practice-graph-actions">
      <span>{strokes.length} stroke{strokes.length===1?"":"s"}</span>
      {!disabled && <><button type="button" onClick={()=>onChange?.(`${base}:strokes`,JSON.stringify(strokes.slice(0,-1)))} disabled={!strokes.length}>Undo stroke</button><button type="button" onClick={()=>onChange?.(`${base}:strokes`,"[]")} disabled={!strokes.length}>Clear drawing</button></>}
    </div>
    <textarea disabled={disabled} rows={3} value={responses[base] || ""} onChange={e=>onChange?.(base,e.target.value)} placeholder="Add labels and brief notes required by the question."/>
  </div>;
}

function ResponseArea({ questionId, partIndex, itemIndex, item, sourceTable, responses = {}, onChange, disabled = false }) {
  const config = item?.response || {};
  const type = config.type || "lines";
  const base=`${questionId}:${partIndex}:${itemIndex}`;

  if (type === "labels") {
    return (
      <div className="is-p2-label-responses">
        {(config.keys || []).map(key => (
          <label key={key}><span>{key}</span><input disabled={disabled} value={responses[`${base}:${key}`] || ""} onChange={event=>onChange?.(`${base}:${key}`,event.target.value)}/></label>
        ))}
      </div>
    );
  }

  if (type === "graph") return <PracticeGraphResponse base={base} config={config} item={item} sourceTable={sourceTable} responses={responses} onChange={onChange} disabled={disabled} />;

  if (type === "drawing") return <PracticeDrawingResponse base={base} config={config} responses={responses} onChange={onChange} disabled={disabled} />;

  if (type === "table") {
    const table=config.table || {};
    return <div className="is-bank-table-wrap">
      {table.title && <div className="is-bank-table-title">{table.title}</div>}
      <table className="is-bank-table">
        {Array.isArray(table.headers) && <thead><tr>{table.headers.map((cell,index)=><th key={index}>{cell}</th>)}</tr></thead>}
        <tbody>{(table.rows || []).map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,cellIndex)=><td key={cellIndex}>{String(cell ?? "") === "" ? <input disabled={disabled} value={responses[`${base}:r${rowIndex}c${cellIndex}`] || ""} onChange={event=>onChange?.(`${base}:r${rowIndex}c${cellIndex}`,event.target.value)}/> : cell}</td>)}</tr>)}</tbody>
      </table>
    </div>;
  }

  return (
    <textarea
      disabled={disabled}
      className={type === "calculation" ? "is-p2-calculation-response" : "is-p2-lines-response"}
      style={type === "calculation" ? {minHeight:config.height || 150} : undefined}
      rows={type === "calculation" ? undefined : Math.max(2,Number(config.lines || 4))}
      value={responses[base] || ""}
      onChange={event=>onChange?.(base,event.target.value)}
      aria-label={type === "calculation" ? "Calculation and working" : "Written response"}
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

export function IntegratedSciencePaper2Question({ question, responses = {}, onResponseChange, evaluation = null, checked = false }) {
  const evaluationByItem=new Map();
  (evaluation?.items || []).forEach(row=>evaluationByItem.set(`${row.partIndex}:${row.itemIndex}`,row));

  return (
    <article className="is-p2-question">
      <header className="is-p2-question-head">
        <div><h2>{question.title}</h2></div>
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
            const itemEvaluation=evaluationByItem.get(`${partIndex}:${itemIndex}`);
            return (
              <div className="is-p2-subquestion" key={`${partIndex}-${itemIndex}`}>
                <div className="is-p2-subquestion-prompt">
                  <strong>{item.label}</strong>
                  <span><IntegratedScienceText>{item.prompt}</IntegratedScienceText></span>
                  <b>{item.marks} mark{item.marks === 1 ? "" : "s"}</b>
                </div>
                {item.svg && <TrustedBankSvg svg={item.svg} />}
                {item.table && <BankTable table={item.table} />}
                <ResponseArea
                  questionId={question.id}
                  partIndex={partIndex}
                  itemIndex={itemIndex}
                  item={item}
                  sourceTable={part.table}
                  responses={responses}
                  onChange={onResponseChange}
                  disabled={checked}
                />
                {checked && itemEvaluation && (
                  <div className="is-p2-mark-scheme">
                    <strong>SPARK automatic marking</strong>
                    <div className="is-p2-auto-score"><b>{itemEvaluation.score}/{itemEvaluation.maxMarks} marks</b><span>{itemEvaluation.confidence === "high" ? "High-confidence structured check" : "Estimated from the authored marking points"}</span></div>
                    {itemEvaluation.criteria?.length > 0 && <ul className="is-p2-auto-criteria">{itemEvaluation.criteria.map(row=><li key={row.id}><b>{row.marks}/{row.maxMarks}</b> <IntegratedScienceText>{row.label}</IntegratedScienceText></li>)}</ul>}
                    <MarkScheme scheme={item.markScheme} />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}
      {checked && evaluation && <div className="is-p2-mark-scheme"><strong>Question result</strong><p><b>{evaluation.score}/{evaluation.maxMarks} marks</b></p></div>}
    </article>
  );
}

export { TrustedBankSvg, BankTable };
