import React, { useMemo, useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import {
  SOCIAL_STUDIES_SBA_GUIDE,
  SOCIAL_STUDIES_SBA_RUBRIC,
  SOCIAL_STUDIES_SBA_TRANSITION,
} from "../data/socialStudiesSbaRubric";
import { gradeSocialStudiesSba } from "../marking/socialStudiesSbaGrader";

const emptyPresentation=()=>({
  type:"",
  title:"",
  labeled:false,
  accurate:false,
  xLabel:"",
  yLabel:"",
  rows:[
    {label:"Category A",value:""},
    {label:"Category B",value:""},
    {label:"Category C",value:""},
  ],
});


function SbaPresentationBuilder({item,index,onChange}){
  const graphTypes=new Set(["bar graph","pie chart","line graph","table"]);
  if(!graphTypes.has(item.type)) return null;

  const rows=Array.isArray(item.rows) ? item.rows : [];
  const numericRows=rows.map(row=>({...row,n:Number(row.value)})).filter(row=>row.label && Number.isFinite(row.n) && row.n>=0);
  const max=Math.max(1,...numericRows.map(row=>row.n));
  const total=numericRows.reduce((sum,row)=>sum+row.n,0);
  const updateRow=(rowIndex,patch)=>{
    const next=rows.map((row,i)=>i===rowIndex ? {...row,...patch} : row);
    onChange({rows:next});
  };
  const addRow=()=>onChange({rows:[...rows,{label:`Category ${String.fromCharCode(65+rows.length)}`,value:""}]});
  const removeRow=rowIndex=>onChange({rows:rows.filter((_,i)=>i!==rowIndex)});
  const width=560,height=260,pad=42;

  return <div className="ss-sba-data-builder">
    <div className="ss-sba-axis-labels">
      <input value={item.xLabel || ""} onChange={e=>onChange({xLabel:e.target.value})} placeholder={item.type==="pie chart" ? "Category label" : "Horizontal axis label"}/>
      <input value={item.yLabel || ""} onChange={e=>onChange({yLabel:e.target.value})} placeholder={item.type==="pie chart" ? "Value / frequency" : "Vertical axis label / unit"}/>
    </div>
    <div className="ss-sba-data-rows">
      {rows.map((row,rowIndex)=><div key={rowIndex}>
        <input value={row.label} onChange={e=>updateRow(rowIndex,{label:e.target.value})} aria-label={`Presentation ${index+1} category ${rowIndex+1}`} placeholder="Category"/>
        <input type="number" min="0" step="any" value={row.value} onChange={e=>updateRow(rowIndex,{value:e.target.value})} aria-label={`Presentation ${index+1} value ${rowIndex+1}`} placeholder="Value"/>
        <button type="button" onClick={()=>removeRow(rowIndex)} disabled={rows.length<=2} aria-label={`Remove row ${rowIndex+1}`}>Remove</button>
      </div>)}
      <button type="button" className="ss-secondary" onClick={addRow}>Add data row</button>
    </div>

    {item.type==="table" ? (
      <div className="ss-sba-chart-preview" aria-label="Data table preview">
        <table><thead><tr><th>{item.xLabel || "Category"}</th><th>{item.yLabel || "Value"}</th></tr></thead>
          <tbody>{numericRows.map((row,rowIndex)=><tr key={rowIndex}><td>{row.label}</td><td>{row.n}</td></tr>)}</tbody>
        </table>
      </div>
    ) : item.type==="pie chart" ? (
      <div className="ss-sba-chart-preview ss-sba-pie-preview" aria-label="Pie chart preview">
        <svg viewBox={`0 0 ${width} ${height}`} role="img">
          {total>0 ? numericRows.reduce((acc,row,rowIndex)=>{
            const start=acc.angle;
            const angle=(row.n/total)*Math.PI*2;
            const end=start+angle;
            const cx=150,cy=130,r=92;
            const x1=cx+r*Math.cos(start),y1=cy+r*Math.sin(start);
            const x2=cx+r*Math.cos(end),y2=cy+r*Math.sin(end);
            const large=angle>Math.PI ? 1 : 0;
            acc.nodes.push(<path key={rowIndex} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`} className={`ss-sba-pie-slice slice-${rowIndex%6}`}/>);
            acc.angle=end;
            return acc;
          },{angle:-Math.PI/2,nodes:[]}).nodes : <text x="150" y="130" textAnchor="middle">Enter values to preview</text>}
          {numericRows.map((row,rowIndex)=><g key={row.label} transform={`translate(300 ${48+rowIndex*30})`}><rect width="14" height="14" className={`ss-sba-pie-slice slice-${rowIndex%6}`}/><text x="22" y="12">{row.label} {total>0 ? `(${Math.round(row.n/total*100)}%)` : ""}</text></g>)}
        </svg>
      </div>
    ) : (
      <div className="ss-sba-chart-preview" aria-label={`${item.type} preview`}>
        <svg viewBox={`0 0 ${width} ${height}`} role="img">
          <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} className="ss-sba-chart-axis"/>
          <line x1={pad} y1={pad} x2={pad} y2={height-pad} className="ss-sba-chart-axis"/>
          <text x={width/2} y={height-8} textAnchor="middle">{item.xLabel || "Category"}</text>
          <text x="14" y={height/2} textAnchor="middle" transform={`rotate(-90 14 ${height/2})`}>{item.yLabel || "Value"}</text>
          {item.type==="bar graph" && numericRows.map((row,rowIndex)=>{
            const slot=(width-pad*2)/Math.max(1,numericRows.length);
            const h=(row.n/max)*(height-pad*2);
            return <g key={row.label}><rect x={pad+rowIndex*slot+slot*.18} y={height-pad-h} width={slot*.64} height={h} className="ss-sba-bar"/><text x={pad+rowIndex*slot+slot*.5} y={height-pad+16} textAnchor="middle">{row.label}</text><text x={pad+rowIndex*slot+slot*.5} y={height-pad-h-6} textAnchor="middle">{row.n}</text></g>;
          })}
          {item.type==="line graph" && numericRows.length>0 && <>
            <polyline className="ss-sba-line" points={numericRows.map((row,rowIndex)=>{
              const x=pad+(rowIndex/(Math.max(1,numericRows.length-1)))*(width-pad*2);
              const y=height-pad-(row.n/max)*(height-pad*2);
              return `${x},${y}`;
            }).join(" ")}/>
            {numericRows.map((row,rowIndex)=>{
              const x=pad+(rowIndex/(Math.max(1,numericRows.length-1)))*(width-pad*2);
              const y=height-pad-(row.n/max)*(height-pad*2);
              return <g key={row.label}><circle cx={x} cy={y} r="5" className="ss-sba-line-point"/><text x={x} y={height-pad+16} textAnchor="middle">{row.label}</text><text x={x} y={y-8} textAnchor="middle">{row.n}</text></g>;
            })}
          </>}
        </svg>
      </div>
    )}
    <small>{numericRows.length} usable data row{numericRows.length===1?"":"s"} in this presentation.</small>
  </div>;
}

export default function SocialStudiesSbaPractice({ onExit, onComplete }){
  const [project,setProject]=useState({
    problem:"",
    reason:"",
    method:"",
    methodJustification:"",
    samplingMethod:"",
    samplingDescription:"",
    instrument:"",
    presentations:[emptyPresentation(),emptyPresentation(),emptyPresentation()],
    analysis:"",
    sources:["",""],
    findings:["","",""],
    recommendations:["",""],
    implementation:"",
    reportText:"",
    presentationElements:[],
  });
  const [checked,setChecked]=useState(false);
  const grade=useMemo(()=>gradeSocialStudiesSba(project),[project]);

  const setField=(field,value)=>{
    setProject(previous=>({...previous,[field]:value}));
    setChecked(false);
  };
  const setArrayValue=(field,index,value)=>{
    setProject(previous=>({
      ...previous,
      [field]:previous[field].map((item,itemIndex)=>itemIndex===index ? value : item),
    }));
    setChecked(false);
  };
  const setPresentation=(index,patch)=>{
    setProject(previous=>({
      ...previous,
      presentations:previous.presentations.map((item,itemIndex)=>itemIndex===index ? {...item,...patch} : item),
    }));
    setChecked(false);
  };
  const toggleElement=value=>{
    setProject(previous=>{
      const has=previous.presentationElements.includes(value);
      return {
        ...previous,
        presentationElements:has
          ? previous.presentationElements.filter(item=>item!==value)
          : [...previous.presentationElements,value],
      };
    });
    setChecked(false);
  };
  const markProject=()=>{
    setChecked(true);
    onComplete?.(grade.score,grade.maxScore);
    window.scrollTo?.(0,0);
  };

  return <main className="ss-practice-page">
    <div className="ss-practice-shell">
      <header className="ss-practice-session-head ss-sba-head">
        <button type="button" className="ss-back" onClick={onExit}><BackArrowIcon/><span>Exit SBA checker</span></button>
        <div>
          <span>Paper 031 research skills</span>
          <strong>40-mark project checker</strong>
        </div>
        <b>{checked ? `${grade.score}/40` : "SBA"}</b>
      </header>

      <section className="ss-sba-transition">
        <strong>Assessment transition</strong>
        <p>{SOCIAL_STUDIES_SBA_TRANSITION.schoolCandidates2027}</p>
        <p>{SOCIAL_STUDIES_SBA_TRANSITION.from2028}</p>
      </section>

      {checked && <section className="ss-paper-summary ss-sba-summary">
        <span className="ss-eyebrow">Practice rubric result</span>
        <h1>{grade.score}/40</h1>
        <p>{grade.percent}% of the current 40-mark SBA rubric. This equals {grade.weightedPercent}% of the full examination weighting.</p>
        {grade.penalty>0 && <p className="ss-mark-review-note">The report sample exceeds 1,150 words. The current syllabus applies a 10% deduction from the earned project score when the 1,000-word limit is exceeded by more than 150 words.</p>}
        {grade.priorities.length>0 && <div className="ss-sba-priorities">
          <strong>Highest priorities</strong>
          {grade.priorities.map(item=><p key={item.id}>{item.feedback}</p>)}
        </div>}
      </section>}

      <section className="ss-sba-intro">
        <span className="ss-eyebrow">CXC research project structure</span>
        <h1>Build and check each part of the project.</h1>
        <p>The checker follows the 40-mark project structure. Use it as practice feedback. Your teacher or CXC examiner remains responsible for the official mark.</p>
        <small>Recommended maximum report length: {SOCIAL_STUDIES_SBA_GUIDE.recommendedMaximumWords} words, excluding charts, graphs, tables and pictures.</small>
      </section>

      <div className="ss-sba-grid">
        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>1</span><div><h2>Statement of Problem</h2><small>2 marks</small></div></div>
          <p>State the issue as a clear research question or problem and identify the target population.</p>
          <textarea value={project.problem} onChange={e=>setField("problem",e.target.value)} placeholder="Example: To what extent does... among students in...?" />
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="problem")}/>}
        </section>

        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>2</span><div><h2>Reason for Research</h2><small>2 marks</small></div></div>
          <p>Explain why this problem or issue is relevant and worth investigating.</p>
          <textarea value={project.reason} onChange={e=>setField("reason",e.target.value)} placeholder="Explain why you chose the issue." />
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="reason")}/>}
        </section>

        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>3</span><div><h2>Method of Investigation</h2><small>4 marks</small></div></div>
          <label>Method
            <select value={project.method} onChange={e=>setField("method",e.target.value)}>
              <option value="">Choose a method</option>
              {SOCIAL_STUDIES_SBA_GUIDE.methods.map(item=><option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>Why this method?
            <textarea value={project.methodJustification} onChange={e=>setField("methodJustification",e.target.value)} placeholder="Explain why this method suits the research problem." />
          </label>
          <label>Sampling method
            <input value={project.samplingMethod} onChange={e=>setField("samplingMethod",e.target.value)} placeholder="Random, systematic, stratified..." />
          </label>
          <label>How the sample was selected
            <textarea value={project.samplingDescription} onChange={e=>setField("samplingDescription",e.target.value)} placeholder="State the sample size and explain how participants were selected." />
          </label>
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="method")}/>}
        </section>

        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>4</span><div><h2>Data Collection Instrument</h2><small>4 marks</small></div></div>
          <p>Enter the questionnaire, interview or observation items. Put one item on each line.</p>
          <textarea className="ss-sba-tall" value={project.instrument} onChange={e=>setField("instrument",e.target.value)} placeholder={"1. What is your age group?\n2. How often do you...?\n3. Which of the following...?"} />
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="instrument")}/>}
        </section>

        <section className="ss-sba-card ss-sba-wide">
          <div className="ss-sba-card-head"><span>5</span><div><h2>Presentation of Data</h2><small>6 marks</small></div></div>
          <p>Use three different appropriate forms. Horizontal and vertical bar graphs count as the same form.</p>
          <div className="ss-sba-presentations">
            {project.presentations.map((item,index)=><div key={index} className="ss-sba-presentation-row">
              <strong>Presentation {index+1}</strong>
              <select value={item.type} onChange={e=>setPresentation(index,{type:e.target.value})}>
                <option value="">Choose type</option>
                {SOCIAL_STUDIES_SBA_GUIDE.presentationTypes.map(type=><option key={type} value={type}>{type}</option>)}
              </select>
              <input value={item.title} onChange={e=>setPresentation(index,{title:e.target.value})} placeholder="Title" />
              <label><input type="checkbox" checked={item.labeled} onChange={e=>setPresentation(index,{labeled:e.target.checked})}/> Properly labelled</label>
              <label><input type="checkbox" checked={item.accurate} onChange={e=>setPresentation(index,{accurate:e.target.checked})}/> Checked for accuracy</label>
              <SbaPresentationBuilder item={item} index={index} onChange={patch=>setPresentation(index,patch)}/>
            </div>)}
          </div>
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="presentation")}/>}
        </section>

        <section className="ss-sba-card ss-sba-wide">
          <div className="ss-sba-card-head"><span>6</span><div><h2>Analysis and Interpretation</h2><small>8 marks</small></div></div>
          <p>Explain what the data mean. Refer to figures, percentages or frequencies and make comparisons, connections or generalisations.</p>
          <textarea className="ss-sba-tall" value={project.analysis} onChange={e=>setField("analysis",e.target.value)} placeholder="Analyse the data in relation to your research question." />
          <div className="ss-sba-two">
            {project.sources.map((source,index)=><input key={index} value={source} onChange={e=>setArrayValue("sources",index,e.target.value)} placeholder={`Source ${index+1}`} />)}
          </div>
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="analysis")}/>}
        </section>

        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>7</span><div><h2>Statement of Findings</h2><small>3 marks</small></div></div>
          <p>State three findings supported by the data.</p>
          {project.findings.map((finding,index)=><textarea key={index} value={finding} onChange={e=>setArrayValue("findings",index,e.target.value)} placeholder={`Finding ${index+1}`} />)}
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="findings")}/>}
        </section>

        <section className="ss-sba-card">
          <div className="ss-sba-card-head"><span>8</span><div><h2>Recommendations and Implementation</h2><small>3 marks</small></div></div>
          {project.recommendations.map((recommendation,index)=><textarea key={index} value={recommendation} onChange={e=>setArrayValue("recommendations",index,e.target.value)} placeholder={`Recommendation ${index+1}`} />)}
          <textarea value={project.implementation} onChange={e=>setField("implementation",e.target.value)} placeholder="Explain how one recommendation would be implemented." />
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="recommendations")}/>}
        </section>

        <section className="ss-sba-card ss-sba-wide">
          <div className="ss-sba-card-head"><span>9</span><div><h2>Writing Skills</h2><small>4 marks</small></div></div>
          <p>Paste a substantial sample of the report so SPARK can check paragraphing and sustained writing structure.</p>
          <textarea className="ss-sba-report" value={project.reportText} onChange={e=>setField("reportText",e.target.value)} placeholder="Paste your report draft or a substantial section here." />
          <small>{grade.reportWordCount} words in the report sample</small>
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="writing")}/>}
        </section>

        <section className="ss-sba-card ss-sba-wide">
          <div className="ss-sba-card-head"><span>10</span><div><h2>Overall Presentation</h2><small>4 marks</small></div></div>
          <p>Select the supporting project elements included in the report.</p>
          <div className="ss-sba-check-grid">
            {["Cover page","Table of contents","Acknowledgements","Bibliography","Appendices"].map(item=><label key={item}>
              <input type="checkbox" checked={project.presentationElements.includes(item)} onChange={()=>toggleElement(item)}/>
              {item}
            </label>)}
          </div>
          {checked && <SbaCriterion result={grade.criteria.find(item=>item.id==="overall")}/>}
        </section>
      </div>

      <section className="ss-sba-rubric-summary">
        <strong>40-mark structure</strong>
        <div>{SOCIAL_STUDIES_SBA_RUBRIC.map(item=><span key={item.id}>{item.number}. {item.label} · {item.maxMarks}</span>)}</div>
      </section>

      <div className="ss-sba-actions">
        <button type="button" className="ss-primary" onClick={markProject}>Check project against rubric</button>
        <button type="button" className="ss-secondary" onClick={onExit}>Back to Social Studies practice</button>
      </div>
    </div>
  </main>;
}

function SbaCriterion({result}){
  if(!result) return null;
  return <div className={`ss-sba-result ${result.marks===result.maxMarks ? "complete" : result.marks>0 ? "partial" : "missing"}`}>
    <strong>{result.marks}/{result.maxMarks} marks</strong>
    <p>{result.feedback}</p>
  </div>;
}
