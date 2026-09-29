import React, { useEffect, useMemo, useState } from "react";

const choiceTypes = new Set([
  "source-check","research-question","questionnaire-builder","case-choice",
  "observation-builder","compare","budget-choice","election-math","action-plan"
]);

function ResultMessage({ correct, text }){
  if (correct == null) return null;
  return <div className={`ss-interactive-feedback ${correct ? "correct" : "wrong"}`} role="status">
    <strong>{correct ? "Good reasoning." : "Look at the evidence again."}</strong>
    {text && <span>{text}</span>}
  </div>;
}

function ChoiceActivity({ activity, onComplete }){
  const [choice,setChoice]=useState(null);
  const selected=choice == null ? null : activity.items?.[choice];
  const correct=selected ? Boolean(selected.good) : null;

  return <div className="ss-interactive-choice">
    <div className="ss-interactive-options">
      {(activity.items || []).map((item,index)=><button
        type="button"
        key={item.label}
        className={[
          choice===index ? "selected" : "",
          choice!=null && item.good ? "correct" : "",
          choice===index && choice!=null && !item.good ? "wrong" : "",
        ].filter(Boolean).join(" ")}
        onClick={()=>{
          setChoice(index);
          if(item.good) onComplete?.({score:1,total:1});
        }}
      >
        <span>{String.fromCharCode(65+index)}</span>
        <strong>{item.label}</strong>
      </button>)}
    </div>
    <ResultMessage correct={correct} text={selected?.reason}/>
  </div>;
}

function SorterActivity({ activity, onComplete }){
  const categories=activity.categories || [];
  const [answers,setAnswers]=useState({});
  const [checked,setChecked]=useState(false);
  const items=activity.items || [];
  const score=items.filter((item,index)=>answers[index]===item.category).length;
  return <div className="ss-sorter">
    <div className="ss-sorter-grid">
      {items.map((item,index)=><div className="ss-sorter-row" key={item.label}>
        <span>{item.label}</span>
        <select value={answers[index] || ""} onChange={event=>{
          setChecked(false);
          setAnswers(current=>({...current,[index]:event.target.value}));
        }}>
          <option value="">Choose</option>
          {categories.map(category=><option key={category}>{category}</option>)}
        </select>
        {checked && <em className={answers[index]===item.category ? "correct" : "wrong"}>
          {answers[index]===item.category ? "Correct" : `Answer: ${item.category}`}
        </em>}
      </div>)}
    </div>
    <button type="button" className="ss-primary" disabled={Object.keys(answers).length<items.length} onClick={()=>{
      setChecked(true);
      if(score===items.length) onComplete?.({score,total:items.length});
    }}>Check sorting</button>
    {checked && <ResultMessage correct={score===items.length} text={`${score} of ${items.length} correct.`}/>}
  </div>;
}

function PairActivity({ activity, onComplete }){
  const pairs=activity.pairs || [];
  const options=useMemo(()=>pairs.map(pair=>pair.solution).sort(()=>0),[pairs]);
  const [answers,setAnswers]=useState({});
  const [checked,setChecked]=useState(false);
  const score=pairs.filter((pair,index)=>answers[index]===pair.solution).length;
  return <div className="ss-pairs">
    {pairs.map((pair,index)=><label className="ss-pair-row" key={pair.problem}>
      <span>{pair.problem}</span>
      <select value={answers[index] || ""} onChange={e=>{setChecked(false);setAnswers(current=>({...current,[index]:e.target.value}));}}>
        <option value="">Choose match</option>
        {options.map(option=><option key={option}>{option}</option>)}
      </select>
      {checked && <em className={answers[index]===pair.solution ? "correct" : "wrong"}>
        {answers[index]===pair.solution ? "Correct" : pair.solution}
      </em>}
    </label>)}
    <button type="button" className="ss-primary" disabled={Object.keys(answers).length<pairs.length} onClick={()=>{
      setChecked(true);
      if(score===pairs.length) onComplete?.({score,total:pairs.length});
    }}>Check matches</button>
    {checked && <ResultMessage correct={score===pairs.length} text={`${score} of ${pairs.length} correct.`}/>}
  </div>;
}

function RateCalculator({ activity, onComplete }){
  const density=activity.mode==="density";
  const [values,setValues]=useState(density
    ? {population:"",area:""}
    : {births:"",deaths:"",immigrants:"",emigrants:""}
  );
  const number=key=>Number(values[key] || 0);
  const ready=density
    ? number("population")>0 && number("area")>0
    : Object.values(values).every(value=>String(value).trim()!=="");
  let output=null;
  if(ready && density){
    output={density:number("population")/number("area")};
  }else if(ready){
    const natural=number("births")-number("deaths");
    const migration=number("immigrants")-number("emigrants");
    output={natural,migration,total:natural+migration};
  }

  return <div className="ss-calculator">
    <div className="ss-calculator-fields">
      {Object.keys(values).map(key=><label key={key}>
        <span>{key.replace(/(^.|-.)/g,value=>value.replace("-"," ").toUpperCase())}</span>
        <input type="number" min="0" inputMode="numeric" value={values[key]} onChange={e=>setValues(current=>({...current,[key]:e.target.value}))}/>
      </label>)}
    </div>
    {output && <div className="ss-calculator-result">
      {density ? <>
        <span>Population density</span>
        <strong>{output.density.toLocaleString(undefined,{maximumFractionDigits:2})} people per km²</strong>
        <small>Population ÷ land area</small>
      </> : <>
        <div><span>Natural increase</span><strong>{output.natural.toLocaleString()}</strong></div>
        <div><span>Net migration</span><strong>{output.migration.toLocaleString()}</strong></div>
        <div><span>Total change</span><strong>{output.total.toLocaleString()}</strong></div>
      </>}
      <button type="button" className="ss-primary" onClick={()=>onComplete?.({score:1,total:1})}>I understand the calculation</button>
    </div>}
  </div>;
}

function PopulationPyramid({ onComplete }){
  const [young,setYoung]=useState(72);
  const [working,setWorking]=useState(55);
  const [older,setOlder]=useState(24);
  const bars=[
    ["65+",older],["45–64",Math.max(older+8,Math.round(working*.65))],
    ["25–44",working],["15–24",Math.round((working+young)/2)],["0–14",young]
  ];
  const profile=young>working+12 ? "youthful" : older>young*.7 ? "ageing" : "balanced";
  return <div className="ss-pyramid">
    <div className="ss-pyramid-controls">
      <label>Young population <input type="range" min="20" max="90" value={young} onChange={e=>setYoung(Number(e.target.value))}/></label>
      <label>Working-age middle <input type="range" min="20" max="90" value={working} onChange={e=>setWorking(Number(e.target.value))}/></label>
      <label>Older population <input type="range" min="10" max="80" value={older} onChange={e=>setOlder(Number(e.target.value))}/></label>
    </div>
    <div className="ss-pyramid-chart" aria-label="Interactive population pyramid">
      {bars.map(([label,width])=><div className="ss-pyramid-row" key={label}>
        <span>{label}</span>
        <i style={{width:`${width}%`}}/>
        <i style={{width:`${Math.max(10,width-4)}%`}}/>
      </div>)}
    </div>
    <div className="ss-pyramid-reading">
      <strong>{profile==="youthful" ? "Broad-base pattern" : profile==="ageing" ? "Larger older population" : "More balanced profile"}</strong>
      <p>{profile==="youthful"
        ? "A relatively large youth population can increase demand for schools now and jobs later."
        : profile==="ageing"
          ? "A larger older population can increase demand for health care, pensions and elder support."
          : "A more even structure spreads service needs across several age groups."}</p>
      <button type="button" className="ss-primary" onClick={()=>onComplete?.({score:1,total:1})}>I can read the pattern</button>
    </div>
  </div>;
}

function TimelineActivity({ activity, onComplete }){
  const correct=activity.items || [];
  const [items,setItems]=useState(()=>[...correct].reverse());
  const [checked,setChecked]=useState(false);
  const move=(index,direction)=>{
    const next=[...items];
    const target=index+direction;
    if(target<0 || target>=next.length) return;
    [next[index],next[target]]=[next[target],next[index]];
    setItems(next); setChecked(false);
  };
  const isCorrect=items.every((item,index)=>item===correct[index]);
  return <div className="ss-timeline">
    {items.map((item,index)=><div key={item} className="ss-timeline-row">
      <b>{index+1}</b><span>{item}</span>
      <div><button type="button" disabled={index===0} onClick={()=>move(index,-1)} aria-label={`Move ${item} earlier`}>↑</button>
      <button type="button" disabled={index===items.length-1} onClick={()=>move(index,1)} aria-label={`Move ${item} later`}>↓</button></div>
    </div>)}
    <button type="button" className="ss-primary" onClick={()=>{setChecked(true);if(isCorrect)onComplete?.({score:items.length,total:items.length});}}>Check order</button>
    {checked && <ResultMessage correct={isCorrect} text={isCorrect ? "The sequence is correct." : "Use the arrows and try the sequence again."}/>}
  </div>;
}

function MapSpotter({ activity, visual, onComplete }){
  const [revealed,setRevealed]=useState({});
  const items=activity.items || [];
  return <div className="ss-map-activity">
    {visual && <figure className="ss-source-visual">
      <img src={visual.imageUrl} alt="Blank map of Caribbean nations"/>
      <figcaption>{visual.attribution} <a href={visual.sourceUrl} target="_blank" rel="noreferrer">Source and licence</a></figcaption>
    </figure>}
    <div className="ss-map-questions">
      {items.map((item,index)=><article key={item.label}>
        <strong>{item.label}</strong>
        <button type="button" onClick={()=>setRevealed(current=>({...current,[index]:!current[index]}))}>{revealed[index] ? "Hide answer" : "Reveal answer"}</button>
        {revealed[index] && <p>{item.answer}</p>}
      </article>)}
    </div>
    <button type="button" className="ss-primary" disabled={Object.keys(revealed).length<items.length} onClick={()=>onComplete?.({score:items.length,total:items.length})}>Complete map challenge</button>
  </div>;
}

function FamilyTree({ activity, visual, onComplete }){
  const [revealed,setRevealed]=useState({});
  return <div className="ss-family-tree-activity">
    {visual && <figure className="ss-source-visual">
      <img src={visual.imageUrl} alt="Example family tree"/>
      <figcaption>{visual.attribution} <a href={visual.sourceUrl} target="_blank" rel="noreferrer">Source and licence</a></figcaption>
    </figure>}
    {(activity.items || []).map((item,index)=><div className="ss-reveal-row" key={item.label}>
      <span>{item.label}</span>
      <button type="button" onClick={()=>setRevealed(current=>({...current,[index]:!current[index]}))}>{revealed[index] ? item.answer : "Reveal"}</button>
    </div>)}
    <button type="button" className="ss-primary" disabled={Object.keys(revealed).length<(activity.items || []).length} onClick={()=>onComplete?.({score:1,total:1})}>Complete relationship check</button>
  </div>;
}

export default function SocialStudiesInteractiveActivity({ activity, visual, onComplete }){
  const [completed,setCompleted]=useState(false);
  useEffect(()=>setCompleted(false),[activity?.title]);

  if(!activity) return null;
  const complete=result=>{
    if(!completed){
      setCompleted(true);
      onComplete?.(result);
    }
  };

  let body=null;
  if(choiceTypes.has(activity.type)) body=<ChoiceActivity activity={activity} onComplete={complete}/>;
  else if(["sorter","fact-opinion","balance-board"].includes(activity.type)) body=<SorterActivity activity={activity} onComplete={complete}/>;
  else if(["solution-match","organisation-match"].includes(activity.type)) body=<PairActivity activity={activity} onComplete={complete}/>;
  else if(activity.type==="rate-calculator") body=<RateCalculator activity={activity} onComplete={complete}/>;
  else if(activity.type==="population-pyramid") body=<PopulationPyramid onComplete={complete}/>;
  else if(activity.type==="timeline") body=<TimelineActivity activity={activity} onComplete={complete}/>;
  else if(activity.type==="map-spotter") body=<MapSpotter activity={activity} visual={visual} onComplete={complete}/>;
  else if(activity.type==="family-tree") body=<FamilyTree activity={activity} visual={visual} onComplete={complete}/>;
  else if(activity.type==="data-read") body=<ChoiceActivity activity={activity} onComplete={complete}/>;
  else body=<ChoiceActivity activity={activity} onComplete={complete}/>;

  return <section className="ss-interactive">
    <div className="ss-panel-label">SPARK interactive</div>
    <h3>{activity.title}</h3>
    <p>{activity.prompt}</p>
    {activity.data && <div className="ss-data-table-wrap"><table><thead><tr>{activity.data.headers.map(header=><th key={header}>{header}</th>)}</tr></thead><tbody>{activity.data.rows.map((row,index)=><tr key={index}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {body}
    {completed && <div className="ss-activity-complete">Activity complete</div>}
  </section>;
}
