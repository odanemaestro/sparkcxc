import React, { useState } from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import "../socialStudies.css";

const QUESTION_CHECKS = Object.freeze([
  {
    prompt:"Don't you agree that social media causes poor study habits?",
    options:["Good question","Leading or biased"],
    answer:1,
    reason:"The wording pushes the respondent towards agreement. A neutral question should not suggest the expected answer.",
  },
  {
    prompt:"How many hours did you spend studying yesterday?",
    options:["Good question","Too vague to use"],
    answer:0,
    reason:"It asks one clear, answerable question about a defined time period.",
  },
  {
    prompt:"Do you exercise regularly and eat healthy meals and get enough sleep?",
    options:["Good question","Double- or multi-barrelled"],
    answer:1,
    reason:"It combines several issues. Each behaviour should be asked separately.",
  },
  {
    prompt:"Which ONE method do you use most often to travel to school?",
    options:["Good question","Leading or biased"],
    answer:0,
    reason:"The wording is specific, neutral and asks about one issue.",
  },
]);

const SOURCE_CHECKS = Object.freeze([
  ["Currency","Is the information recent enough for this topic?"],
  ["Authority","Who produced it, and are they qualified or responsible for the information?"],
  ["Accuracy","Can the claim be checked against evidence or another reliable source?"],
  ["Objectivity","Is the source trying to inform, persuade, sell or promote a particular position?"],
  ["Coverage","Does it provide enough information for the question being investigated?"],
  ["Relevance","Does the information directly help answer the research question?"],
]);

const STATIONS = Object.freeze([
  ["plan","1","Plan"],
  ["questions","2","Questionnaire"],
  ["sample","3","Sample"],
  ["evidence","4","Evidence"],
  ["findings","5","Findings"],
  ["write","6","Write-up"],
]);

function StationNav({active,onSelect,done}){
  return <nav className="ss-sba-stations" aria-label="Research toolkit stations">
    {STATIONS.map(([id,n,label])=><button
      type="button"
      key={id}
      className={active===id ? "active" : ""}
      onClick={()=>onSelect(id)}
    >
      <span>{done.has(id) ? "✓" : n}</span>
      <strong>{label}</strong>
    </button>)}
  </nav>;
}

function PlanStation({onDone}){
  const [topic,setTopic]=useState("");
  const [group,setGroup]=useState("");
  const [place,setPlace]=useState("");
  const ready=Boolean(topic.trim() && group.trim() && place.trim());
  const researchQuestion=ready
    ? "What are the main factors affecting "+topic.trim()+" among "+group.trim()+" in "+place.trim()+"?"
    : "";

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 1 · Plan</div>
    <h2>Turn a broad topic into a researchable problem</h2>
    <p>Decide what you want to investigate, who you need information from and where the study will take place.</p>
    <div className="ss-sba-fields">
      <label><span>Issue or topic</span><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="for example, school attendance"/></label>
      <label><span>Target group</span><input value={group} onChange={e=>setGroup(e.target.value)} placeholder="for example, Grade 10 students"/></label>
      <label><span>Place</span><input value={place} onChange={e=>setPlace(e.target.value)} placeholder="for example, a secondary school in St Catherine"/></label>
    </div>
    {researchQuestion && <div className="ss-sba-output"><span>Possible neutral research question</span><strong>{researchQuestion}</strong><small>Edit it if you need to make the issue more specific.</small></div>}
    <button type="button" className="ss-primary" disabled={!ready} onClick={onDone}>I can frame a research question</button>
  </section>;
}

function QuestionnaireStation({onDone}){
  const [answers,setAnswers]=useState({});
  const [checked,setChecked]=useState(false);
  const score=QUESTION_CHECKS.filter((item,index)=>answers[index]===item.answer).length;
  const complete=Object.keys(answers).length===QUESTION_CHECKS.length;

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 2 · Questionnaire design</div>
    <h2>Spot weak questions before respondents see them</h2>
    <p>Questions should be short, clear, specific, neutral, relevant and arranged logically. Each question should deal with one issue at a time.</p>
    <div className="ss-sba-question-list">
      {QUESTION_CHECKS.map((item,index)=><article key={item.prompt}>
        <strong>{item.prompt}</strong>
        <div>
          {item.options.map((option,optionIndex)=><button
            type="button"
            key={option}
            className={answers[index]===optionIndex ? "selected" : ""}
            onClick={()=>{setChecked(false);setAnswers(current=>({...current,[index]:optionIndex}));}}
          >{option}</button>)}
        </div>
        {checked && <p className={answers[index]===item.answer ? "correct" : "wrong"}>{item.reason}</p>}
      </article>)}
    </div>
    {!checked
      ? <button type="button" className="ss-primary" disabled={!complete} onClick={()=>setChecked(true)}>Check questionnaire</button>
      : <div className="ss-sba-check-result"><strong>{score}/{QUESTION_CHECKS.length} correct</strong><button type="button" className="ss-primary" disabled={score!==QUESTION_CHECKS.length} onClick={onDone}>Complete station</button></div>}
  </section>;
}

function SampleStation({onDone}){
  const [population,setPopulation]=useState("200");
  const [sample,setSample]=useState("40");
  const [method,setMethod]=useState("random");
  const p=Number(population),s=Number(sample);
  const valid=p>0 && s>0 && s<=p;
  const share=valid ? Math.round(s/p*1000)/10 : 0;
  const notes={
    random:"Random sampling gives each member of the population a known chance of selection when carried out properly.",
    systematic:"Systematic sampling selects at a regular interval after a suitable starting point.",
    stratified:"Stratified sampling ensures important subgroups are represented according to a planned method.",
    convenience:"Convenience sampling is easy, but the easiest people to reach may not represent the population.",
  };

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 3 · Sampling</div>
    <h2>Choose people in a way you can defend</h2>
    <div className="ss-sba-fields">
      <label><span>Population size</span><input type="number" min="1" value={population} onChange={e=>setPopulation(e.target.value)}/></label>
      <label><span>Proposed sample</span><input type="number" min="1" value={sample} onChange={e=>setSample(e.target.value)}/></label>
      <label><span>Sampling approach</span><select value={method} onChange={e=>setMethod(e.target.value)}><option value="random">Random</option><option value="systematic">Systematic</option><option value="stratified">Stratified</option><option value="convenience">Convenience</option></select></label>
    </div>
    {valid && <div className="ss-sba-output"><span>Sample proportion</span><strong>{s} of {p} people = {share}%</strong><small>{notes[method]}</small></div>}
    <div className="ss-sba-tip"><strong>Exam habit:</strong> A larger sample is not automatically a good sample. Consider how people were selected and whether they represent the population being studied.</div>
    <button type="button" className="ss-primary" disabled={!valid} onClick={onDone}>I can justify a sample</button>
  </section>;
}

function EvidenceStation({onDone}){
  const [checked,setChecked]=useState(new Set());
  const toggle=label=>setChecked(current=>{
    const next=new Set(current);
    if(next.has(label))next.delete(label);else next.add(label);
    return next;
  });

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 4 · Source evaluation</div>
    <h2>Do not use a source just because it looks official</h2>
    <p>Work through all six checks. In an exam or SBA, your source choice should be deliberate.</p>
    <div className="ss-sba-source-grid">
      {SOURCE_CHECKS.map(([label,description])=><button type="button" key={label} className={checked.has(label) ? "checked" : ""} onClick={()=>toggle(label)}>
        <span>{checked.has(label) ? "✓" : "○"}</span><strong>{label}</strong><small>{description}</small>
      </button>)}
    </div>
    <button type="button" className="ss-primary" disabled={checked.size!==SOURCE_CHECKS.length} onClick={onDone}>I can evaluate a source</button>
  </section>;
}

function FindingsStation({onDone}){
  const rows=[
    ["Lack of time",18],
    ["Cost of transport",12],
    ["Family responsibilities",6],
    ["Lack of interest",4],
  ];
  const total=rows.reduce((sum,row)=>sum+row[1],0);
  const [revealed,setRevealed]=useState(false);

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 5 · Findings</div>
    <h2>Turn raw responses into information</h2>
    <p>A survey of {total} students asked for the main reason they sometimes miss an after-school activity.</p>
    <div className="ss-data-table-wrap"><table><thead><tr><th>Reason</th><th>Responses</th><th>Percentage</th></tr></thead><tbody>
      {rows.map(([label,value])=><tr key={label}><td>{label}</td><td>{value}</td><td>{revealed ? String(Math.round(value/total*100))+"%" : "?"}</td></tr>)}
    </tbody></table></div>
    <div className="ss-sba-actions">
      <button type="button" className="ss-secondary" onClick={()=>setRevealed(true)}>Calculate percentages</button>
      <button type="button" className="ss-primary" disabled={!revealed} onClick={onDone}>I can interpret the table</button>
    </div>
    {revealed && <div className="ss-sba-output"><span>Evidence-based finding</span><strong>Lack of time was the most frequently reported reason, selected by 45% of respondents.</strong><small>This describes what the data show. It does not invent a cause the survey did not measure.</small></div>}
  </section>;
}

function WriteStation({onDone}){
  const [finding,setFinding]=useState("");
  const [conclusion,setConclusion]=useState("");
  const [recommendation,setRecommendation]=useState("");
  const ready=[finding,conclusion,recommendation].every(value=>value.trim().length>=12);

  return <section className="ss-sba-workspace">
    <div className="ss-panel-label">Station 6 · Write-up</div>
    <h2>Separate findings, conclusions and recommendations</h2>
    <div className="ss-sba-writing">
      <label><span>Finding · What did the data show?</span><textarea value={finding} onChange={e=>setFinding(e.target.value)} placeholder="State a pattern, comparison or result supported directly by the data."/></label>
      <label><span>Conclusion · What reasonable judgement can you draw?</span><textarea value={conclusion} onChange={e=>setConclusion(e.target.value)} placeholder="Explain what the findings suggest. Do not claim more than the evidence supports."/></label>
      <label><span>Recommendation · What practical action follows?</span><textarea value={recommendation} onChange={e=>setRecommendation(e.target.value)} placeholder="Propose a realistic action linked to the problem and the evidence."/></label>
    </div>
    <div className="ss-sba-tip"><strong>Keep the chain clear:</strong> evidence → finding → conclusion → recommendation.</div>
    <button type="button" className="ss-primary" disabled={!ready} onClick={onDone}>Complete research lab</button>
  </section>;
}

export default function SocialStudiesSbaToolkit({onBack,onComplete}){
  const [active,setActive]=useState("plan");
  const [done,setDone]=useState(new Set());
  const stationIds=STATIONS.map(item=>item[0]);
  const percent=Math.round(done.size/stationIds.length*100);

  const finish=id=>{
    const finalDone=new Set([...done,id]);
    setDone(finalDone);
    const index=stationIds.indexOf(id);
    if(index>=0 && index<stationIds.length-1)setActive(stationIds[index+1]);
    if(id==="write" && finalDone.size===stationIds.length)onComplete?.({score:stationIds.length,total:stationIds.length});
  };

  let body=<PlanStation onDone={()=>finish("plan")}/>;
  if(active==="questions")body=<QuestionnaireStation onDone={()=>finish("questions")}/>;
  else if(active==="sample")body=<SampleStation onDone={()=>finish("sample")}/>;
  else if(active==="evidence")body=<EvidenceStation onDone={()=>finish("evidence")}/>;
  else if(active==="findings")body=<FindingsStation onDone={()=>finish("findings")}/>;
  else if(active==="write")body=<WriteStation onDone={()=>finish("write")}/>;

  return <main className="ss-course">
    <div className="ss-shell">
      <button type="button" className="ss-back" onClick={onBack}><BackArrowIcon/><span>Back to Social Studies</span></button>
      <header className="ss-lesson-hero ss-sba-hero">
        <div className="ss-eyebrow">Research & SBA toolkit</div>
        <h1>Investigate a social issue like a researcher.</h1>
        <p>Practise the enquiry skills used across CSEC Social Studies: planning, questionnaire design, sampling, source evaluation, data interpretation and evidence-based writing.</p>
        <div className="ss-course-meta"><span><strong>{done.size}/6</strong> stations complete</span><span><strong>{percent}%</strong> toolkit progress</span></div>
      </header>
      <StationNav active={active} onSelect={setActive} done={done}/>
      {body}
      {done.size===stationIds.length && <div className="ss-sba-complete"><strong>Research lab complete.</strong><span>You have worked through the full enquiry cycle. Repeat it whenever you want to sharpen the process.</span></div>}
    </div>
  </main>;
}
