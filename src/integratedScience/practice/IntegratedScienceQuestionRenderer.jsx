import React, { useEffect, useState } from "react";
import { resolveIntegratedScienceStimulus } from "../data/integratedScienceBank";
import IntegratedScienceText from "../components/IntegratedScienceText";
import { gradeIntegratedSciencePaper2Item } from "./integratedSciencePaper2Grader";

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


function practiceResponseKey(questionId,partIndex,itemIndex,suffix=""){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  return suffix ? `${base}:${suffix}` : base;
}

function parsePracticePoints(value){
  return String(value || "").split(/\n|;/).map(line=>{
    const match=line.match(/^\s*([AB])?\s*:?\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/i);
    return match ? {series:(match[1] || "A").toUpperCase(),x:Number(match[2]),y:Number(match[3])} : null;
  }).filter(point=>point && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function PracticeGraphResponse({ item, base, responses, onChange }) {
  const config=item?.response || {};
  const width=620,height=Math.max(280,Number(config.height || 320)),pad=50;
  const points=parsePracticePoints(responses[`${base}:points`]);
  const xMin=Number(responses[`${base}:xMin`] ?? 0),xMax=Number(responses[`${base}:xMax`] ?? 10);
  const yMin=Number(responses[`${base}:yMin`] ?? 0),yMax=Number(responses[`${base}:yMax`] ?? 10);
  const valid=[xMin,xMax,yMin,yMax].every(Number.isFinite)&&xMax>xMin&&yMax>yMin;
  const connection=responses[`${base}:connection`] || "straight";
  const multiSeries=/\bBOTH\b|\bkey\b/i.test(String(item?.prompt || ""));
  const activeSeries=responses[`${base}:activeSeries`] || "A";
  const format=value=>Number(Number(value).toFixed(2));
  const serialize=next=>next.map(point=>`${point.series || "A"}: ${format(point.x)}, ${format(point.y)}`).join("\n");
  const toValue=event=>{
    if(!valid) return null;
    const svg=event.currentTarget,rect=svg.getBoundingClientRect();
    const localX=(event.clientX-rect.left)/Math.max(1,rect.width)*width;
    const localY=(event.clientY-rect.top)/Math.max(1,rect.height)*height;
    if(localX<pad||localX>width-pad||localY<pad||localY>height-pad) return null;
    const rawX=xMin+(localX-pad)/(width-pad*2)*(xMax-xMin);
    const rawY=yMax-(localY-pad)/(height-pad*2)*(yMax-yMin);
    const stepX=(xMax-xMin)/50,stepY=(yMax-yMin)/50;
    return {series:activeSeries,x:format(Math.round(rawX/stepX)*stepX),y:format(Math.round(rawY/stepY)*stepY)};
  };
  const toScreen=point=>({x:pad+(point.x-xMin)/(xMax-xMin)*(width-pad*2),y:height-pad-(point.y-yMin)/(yMax-yMin)*(height-pad*2)});
  const addPoint=event=>{const point=toValue(event);if(point)onChange(`${base}:points`,serialize([...points,point]));};
  const groups=["A","B"].map(series=>({series,points:points.filter(point=>point.series===series)}));
  const smoothPath=seriesPoints=>{
    if(seriesPoints.length<2)return "";
    const screen=seriesPoints.map(toScreen);let d=`M ${screen[0].x} ${screen[0].y}`;
    for(let i=0;i<screen.length-1;i+=1){
      const p0=screen[i-1]||screen[i],p1=screen[i],p2=screen[i+1],p3=screen[i+2]||p2;
      const c1={x:p1.x+(p2.x-p0.x)/6,y:p1.y+(p2.y-p0.y)/6},c2={x:p2.x-(p3.x-p1.x)/6,y:p2.y-(p3.y-p1.y)/6};
      d+=` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };
  const bestFit=seriesPoints=>{
    if(seriesPoints.length<2)return null;
    const n=seriesPoints.length,sx=seriesPoints.reduce((s,p)=>s+p.x,0),sy=seriesPoints.reduce((s,p)=>s+p.y,0);
    const sxx=seriesPoints.reduce((s,p)=>s+p.x*p.x,0),sxy=seriesPoints.reduce((s,p)=>s+p.x*p.y,0);
    const den=n*sxx-sx*sx;if(Math.abs(den)<1e-12)return null;
    const m=(n*sxy-sx*sy)/den,b=(sy-m*sx)/n;
    return [{x:xMin,y:m*xMin+b},{x:xMax,y:m*xMax+b}];
  };
  const renderSeries=group=>{
    if(group.points.length<2||connection==="points"||connection==="bars")return null;
    const className=group.series==="B"?"is-practice-graph-line series-b":"is-practice-graph-line";
    if(connection==="smooth")return <path key={group.series} d={smoothPath(group.points)} className={className}/>;
    if(connection==="best-fit"){const line=bestFit(group.points);return line?<line key={group.series} x1={toScreen(line[0]).x} y1={toScreen(line[0]).y} x2={toScreen(line[1]).x} y2={toScreen(line[1]).y} className={className}/>:null;}
    return <polyline key={group.series} points={group.points.map(point=>{const p=toScreen(point);return `${p.x},${p.y}`;}).join(" ")} className={className}/>;
  };
  const grid=Array.from({length:11},(_,i)=>i);
  return <div className="is-practice-graph-workspace">
    <div className="is-practice-graph-fields">
      <label>X-axis <input value={responses[`${base}:xLabel`] || ""} onChange={e=>onChange(`${base}:xLabel`,e.target.value)} placeholder={config.x || "Quantity / unit"}/></label>
      <label>Y-axis <input value={responses[`${base}:yLabel`] || ""} onChange={e=>onChange(`${base}:yLabel`,e.target.value)} placeholder={config.y || "Quantity / unit"}/></label>
    </div>
    <div className="is-practice-graph-scale">
      <label>x min<input inputMode="decimal" value={responses[`${base}:xMin`] ?? "0"} onChange={e=>onChange(`${base}:xMin`,e.target.value)}/></label>
      <label>x max<input inputMode="decimal" value={responses[`${base}:xMax`] ?? "10"} onChange={e=>onChange(`${base}:xMax`,e.target.value)}/></label>
      <label>y min<input inputMode="decimal" value={responses[`${base}:yMin`] ?? "0"} onChange={e=>onChange(`${base}:yMin`,e.target.value)}/></label>
      <label>y max<input inputMode="decimal" value={responses[`${base}:yMax`] ?? "10"} onChange={e=>onChange(`${base}:yMax`,e.target.value)}/></label>
    </div>
    <div className="is-practice-graph-toolbar">
      <label>Graph style<select value={connection} onChange={e=>onChange(`${base}:connection`,e.target.value)}><option value="straight">Straight lines</option><option value="smooth">Smooth curve</option><option value="best-fit">Line of best fit</option><option value="bars">Bar chart</option><option value="points">Points only</option></select></label>
      {multiSeries&&<label>Series<select value={activeSeries} onChange={e=>onChange(`${base}:activeSeries`,e.target.value)}><option value="A">Series A</option><option value="B">Series B</option></select></label>}
      {multiSeries&&<label>Key<input value={responses[`${base}:key`] || ""} onChange={e=>onChange(`${base}:key`,e.target.value)} placeholder="A = ...; B = ..."/></label>}
    </div>
    {!valid&&<div className="is-practice-graph-error">Each maximum must be greater than its minimum.</div>}
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive graph plotting workspace" onClick={addPoint}>
      <rect x={pad} y={pad} width={width-pad*2} height={height-pad*2} className="is-practice-graph-paper"/>
      {grid.map(i=>{const x=pad+i*(width-pad*2)/10,y=pad+i*(height-pad*2)/10;return <React.Fragment key={i}><line x1={x} y1={pad} x2={x} y2={height-pad} className="is-practice-graph-grid"/><line x1={pad} y1={y} x2={width-pad} y2={y} className="is-practice-graph-grid"/></React.Fragment>;})}
      <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} className="is-practice-graph-axis"/><line x1={pad} y1={pad} x2={pad} y2={height-pad} className="is-practice-graph-axis"/>
      {connection==="bars"?points.map((point,index)=>{const p=toScreen(point),zero=toScreen({x:point.x,y:Math.max(yMin,Math.min(yMax,0))});return <rect key={index} x={p.x-12} y={Math.min(p.y,zero.y)} width="24" height={Math.max(2,Math.abs(zero.y-p.y))} className={point.series==="B"?"is-practice-graph-bar series-b":"is-practice-graph-bar"}/>;}):groups.map(renderSeries)}
      {connection!=="bars"&&points.map((point,index)=>{const p=toScreen(point);return <circle key={index} cx={p.x} cy={p.y} r="5" className={point.series==="B"?"is-practice-graph-point series-b":"is-practice-graph-point"}/>;})}
      <text x={width/2} y={height-8} textAnchor="middle" className="is-practice-graph-label">{responses[`${base}:xLabel`] || config.x || "x-axis"}</text>
      <text x="14" y={height/2} textAnchor="middle" transform={`rotate(-90 14 ${height/2})`} className="is-practice-graph-label">{responses[`${base}:yLabel`] || config.y || "y-axis"}</text>
    </svg>
    <div className="is-practice-graph-actions">
      <span>{points.length} point{points.length===1?"":"s"} plotted</span>
      <button type="button" onClick={()=>onChange(`${base}:points`,serialize(points.slice(0,-1)))} disabled={!points.length}>Undo point</button>
      <button type="button" onClick={()=>onChange(`${base}:points`,"")} disabled={!points.length}>Clear graph</button>
    </div>
    <textarea className="is-p2-lines-response" rows={2} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)} placeholder="Add any labels, category names or working required by the question."/>
  </div>;
}

function readPracticeStrokes(value){
  try{const parsed=JSON.parse(String(value || "[]"));return Array.isArray(parsed)?parsed:[];}catch{return [];}
}

function PracticeDrawingResponse({ base, responses, onChange, config }) {
  const width=620,height=Math.max(220,Number(config.height || 280));
  const strokes=readPracticeStrokes(responses[`${base}:strokes`]);
  const [active,setActive]=useState([]);
  const pointFromEvent=event=>{const rect=event.currentTarget.getBoundingClientRect();return {x:((event.clientX-rect.left)/Math.max(1,rect.width))*width,y:((event.clientY-rect.top)/Math.max(1,rect.height))*height};};
  const start=event=>{event.currentTarget.setPointerCapture?.(event.pointerId);setActive([pointFromEvent(event)]);};
  const move=event=>{if(active.length)setActive(current=>[...current,pointFromEvent(event)]);};
  const end=()=>{if(active.length>1)onChange(`${base}:strokes`,JSON.stringify([...strokes,active]));setActive([]);};
  const path=stroke=>stroke.map((p,i)=>`${i?"L":"M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  return <div className="is-practice-drawing-workspace">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive scientific drawing workspace" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <rect width={width} height={height} className="is-practice-drawing-paper"/>
      {strokes.map((stroke,index)=><path key={index} d={path(stroke)} className="is-practice-drawing-stroke"/>)}{active.length>1&&<path d={path(active)} className="is-practice-drawing-stroke"/>}
    </svg>
    <div className="is-practice-graph-actions">
      <span>{strokes.length} stroke{strokes.length===1?"":"s"}</span>
      <button type="button" onClick={()=>onChange(`${base}:strokes`,JSON.stringify(strokes.slice(0,-1)))} disabled={!strokes.length}>Undo stroke</button>
      <button type="button" onClick={()=>onChange(`${base}:strokes`,"[]")} disabled={!strokes.length}>Clear drawing</button>
    </div>
    <textarea className="is-p2-lines-response" rows={3} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)} placeholder="Add the labels and brief notes that belong on your drawing."/>
  </div>;
}

function ResponseArea({ item, base, responses, onChange }) {
  const config=item?.response || {},type=config.type || "lines";
  if(type==="labels")return <div className="is-p2-label-responses">{(config.keys||[]).map(key=><label key={key}><span>{key}</span><input value={responses[`${base}:${key}`] || ""} onChange={e=>onChange(`${base}:${key}`,e.target.value)}/></label>)}</div>;
  if(type==="graph")return <PracticeGraphResponse item={item} base={base} responses={responses} onChange={onChange}/>;
  if(type==="drawing")return <PracticeDrawingResponse base={base} responses={responses} onChange={onChange} config={config}/>;
  if(type==="table"){
    const table=config.table || {};
    return <div className="is-bank-table-wrap"><table className="is-bank-table">{Array.isArray(table.headers)&&<thead><tr>{table.headers.map((cell,index)=><th key={index}>{cell}</th>)}</tr></thead>}<tbody>{(table.rows||[]).map((row,r)=><tr key={r}>{row.map((cell,col)=><td key={col}>{String(cell??"")===""?<input value={responses[`${base}:r${r}c${col}`] || ""} onChange={e=>onChange(`${base}:r${r}c${col}`,e.target.value)}/>:cell}</td>)}</tr>)}</tbody></table></div>;
  }
  return <textarea className={type==="calculation"?"is-p2-calculation-response":"is-p2-lines-response"} style={type==="calculation"?{minHeight:config.height||150}:undefined} rows={type==="calculation"?undefined:Math.max(2,Number(config.lines||4))} aria-label={type==="calculation"?"Calculation and working":"Written response"} value={responses[base] || ""} onChange={e=>onChange(base,e.target.value)}/>;
}

function MarkScheme({ item, evaluation }) {
  const scheme=item?.markScheme;
  if(!scheme)return null;
  return <div className="is-p2-mark-scheme">
    <strong>SPARK marking review</strong>
    {evaluation&&<div className="is-p2-auto-score"><b>{evaluation.score}/{evaluation.maxMarks} marks</b><span>{evaluation.confidence==="high"?"High-confidence structured check":"Automatic practice estimate"}</span></div>}
    {evaluation?.criteria?.length>0&&<ul className="is-p2-auto-criteria">{evaluation.criteria.map(row=><li key={row.id}><b>{row.marks}/{row.maxMarks}</b> <IntegratedScienceText>{row.label}</IntegratedScienceText></li>)}</ul>}
    <details><summary>View authored mark scheme</summary><ul>{(scheme.points||[]).map((point,index)=><li key={index}><IntegratedScienceText>{point}</IntegratedScienceText></li>)}</ul>{scheme.guidance&&<p><b>Guidance:</b> <IntegratedScienceText>{scheme.guidance}</IntegratedScienceText></p>}{Array.isArray(scheme.alternatives)&&scheme.alternatives.length>0&&<p><b>Accept also:</b> <IntegratedScienceText>{scheme.alternatives.join("; ")}</IntegratedScienceText></p>}</details>
  </div>;
}

export function IntegratedSciencePaper2Question({ question }) {
  const [responses,setResponses]=useState({});
  const [evaluations,setEvaluations]=useState({});
  useEffect(()=>{setResponses({});setEvaluations({});},[question?.id]);
  const updateResponse=(key,value)=>{
    setResponses(current=>({...current,[key]:value}));
    setEvaluations(current=>{const next={...current};Object.keys(next).forEach(id=>{if(id.startsWith(key.split(":").slice(0,3).join(":")))delete next[id];});return next;});
  };
  return <article className="is-p2-question">
    <header className="is-p2-question-head"><div><h2>{question.title}</h2></div><div className="is-p2-total">{question.totalMarks} marks</div></header>
    {(question.parts||[]).map((part,partIndex)=><section key={`${question.id}-${part.label}-${partIndex}`} className="is-p2-part">
      <h3>{part.label}</h3>
      {part.context&&<p className="is-p2-context"><IntegratedScienceText>{part.context}</IntegratedScienceText></p>}{part.svg&&<TrustedBankSvg svg={part.svg}/>}
      {part.figure&&<div className="is-p2-figure-caption"><IntegratedScienceText>{part.figure}</IntegratedScienceText></div>}{part.table&&<BankTable table={part.table}/>}
      {(part.items||[]).map((item,itemIndex)=>{
        const base=practiceResponseKey(question.id,partIndex,itemIndex);
        const evaluation=evaluations[base];
        return <div className="is-p2-subquestion" key={base}>
          <div className="is-p2-subquestion-prompt"><strong>{item.label}</strong><span><IntegratedScienceText>{item.prompt}</IntegratedScienceText></span><b>{item.marks} mark{item.marks===1?"":"s"}</b></div>
          {item.svg&&<TrustedBankSvg svg={item.svg}/>} {item.table&&<BankTable table={item.table}/>}
          <ResponseArea item={item} base={base} responses={responses} onChange={updateResponse}/>
          <button type="button" className="is-mark-scheme-toggle" onClick={()=>setEvaluations(current=>({...current,[base]:gradeIntegratedSciencePaper2Item(question,partIndex,itemIndex,item,responses)}))}>{evaluation?"Check again":"Check response"}</button>
          {evaluation&&<MarkScheme item={item} evaluation={evaluation}/>}
        </div>;
      })}
    </section>)}
  </article>;
}

export { TrustedBankSvg, BankTable };
