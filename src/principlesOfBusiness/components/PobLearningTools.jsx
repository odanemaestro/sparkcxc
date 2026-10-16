import React,{useMemo,useState} from "react";
import {POB_PAPER1_ORIGINAL_ITEMS} from "../data/pobPaper1Original";
import "./pobLearningTools.css";

const clampNumber = (value,min=0,max=1e9) => Math.max(min,Math.min(max,Number.isFinite(Number(value))?Number(value):0));
function Metric({label,value}){return <div className="pob-metric"><span>{label}</span><strong>{value}</strong></div>}
const money = value => "J$"+value.toLocaleString("en-JM",{maximumFractionDigits:2});

function BusinessCalculator({sectionNumber}){
  const [price,setPrice]=useState(250),[variable,setVariable]=useState(130),
    [fixed,setFixed]=useState(12000),[quantity,setQuantity]=useState(300),
    [hours,setHours]=useState(10);
  const change=setter=>e=>setter(clampNumber(e.target.value));
  const contribution=price-variable;
  const breakeven=contribution>0?Math.ceil(fixed/contribution):null;
  const profit=quantity*contribution-fixed;
  const productivity=hours>0?quantity/hours:null;
  return <section className="pob-tool-card" aria-label="Business calculations laboratory">
    <header><span>Business decision lab</span><h3>{sectionNumber===5?"Explore productivity":"Explore pricing and costs"}</h3>
      <p>Change the numbers and watch the business results. These are illustrative figures, not current Jamaican market prices.</p></header>
    <div className="pob-input-grid">
      <label>Quantity produced or sold <input type="number" value={quantity} min="0" max="1000000000" step="1" onChange={change(setQuantity)}/></label>
      {sectionNumber===5?
        <label>Labour hours <input type="number" value={hours} min="0" max="1000000000" step="1" onChange={change(setHours)}/></label>:
        <>
          <label>Price per unit (J$) <input type="number" value={price} min="0" step="1" onChange={change(setPrice)}/></label>
          <label>Variable cost per unit (J$) <input type="number" value={variable} min="0" step="1" onChange={change(setVariable)}/></label>
          <label>Fixed costs (J$) <input type="number" value={fixed} min="0" step="1" onChange={change(setFixed)}/></label>
        </>}
    </div>
    <div className="pob-result-grid" aria-live="polite">
      {sectionNumber===5?
        <Metric label="Output per labour hour" value={productivity===null?"Add labour hours":productivity.toFixed(2)+" units/hour"}/>:
        <>
          <Metric label="Contribution per unit" value={money(contribution)}/>
          <Metric label="Estimated profit or loss" value={money(profit)}/>
          <Metric label="Break-even sales volume" value={breakeven===null?"Not possible at this price":breakeven.toLocaleString("en-JM")+" units"}/>
        </>}
    </div>
    <p className="pob-lab-note">{sectionNumber===5
      ?"Productivity = output ÷ labour hours. Higher total production does not always mean higher productivity."
      :"Contribution = selling price − variable cost. Profit here = total contribution − fixed cost. Break-even units = fixed costs ÷ positive unit contribution, rounded up."}</p>
  </section>;
}

export function PobTopicPractice({topic,onActivityComplete}){
  const codes=topic?.metadata?.syllabus?.objectiveCodes||[];
  const sectionNumber=Number(topic?.metadata?.syllabus?.section)||1;
  const questions=useMemo(()=>{
    const inSection=POB_PAPER1_ORIGINAL_ITEMS.filter(q=>q.section===sectionNumber);
    const mapped=inSection.filter(q=>codes.includes(q.objectiveCode));
    const rest=inSection.filter(q=>!codes.includes(q.objectiveCode));
    return [...mapped,...rest].slice(0,3);
  },[topic?.id,sectionNumber,codes.join(",")]);
  const [selected,setSelected]=useState({});
  const [checked,setChecked]=useState(false);
  const score=questions.filter(q=>selected[q.id]===q.answer).length;
  if(!questions.length)return null;
  return <section className="pob-tool-card" aria-label="Principles of Business quick practice">
    <header><span>Try it yourself</span><h3>Business knowledge check</h3><p>Three original CSEC-style questions from this syllabus section. Choose the best answer before checking.</p></header>
    <div className="pob-mcq-items">
      {questions.map((q,i)=><fieldset key={q.id} className="pob-mcq">
        <legend><span>Question {i+1}</span> {q.stem}</legend>
        {q.options.map((option,index)=>{
          const letter="ABCD"[index];
          const status=checked?(letter===q.answer?"correct":letter===selected[q.id]?"incorrect":""):"";
          return <label key={letter} className={"pob-choice "+status}>
            <input type="radio" name={q.id} value={letter} disabled={checked} checked={selected[q.id]===letter}
              onChange={()=>setSelected(old=>({...old,[q.id]:letter}))}/>
            <span className="pob-letter">{letter}</span><span>{option}</span>
          </label>;
        })}
        {checked&&<div className="pob-feedback">
          <strong>{selected[q.id]===q.answer?"Correct":"Correct answer: "+q.answer}</strong>
          <p>{q.explanation}</p>
        </div>}
      </fieldset>)}
    </div>
    <div className="pob-actions">
      {!checked?<button type="button" disabled={questions.some(q=>!selected[q.id])} onClick={()=>{
        setChecked(true);
        onActivityComplete?.({type:"pob_topic_practice",subjectId:"principles-of-business",topicId:topic.id,
          sectionId:topic.sectionId,activityKey:"pob-practice:"+topic.id,correct:score,total:questions.length});
      }}>Check answers</button>:
      <button type="button" className="secondary" onClick={()=>{setSelected({});setChecked(false)}}>Try again</button>}
      {checked&&<strong role="status">{score} of {questions.length} correct</strong>}
    </div>
  </section>;
}

export default function PobLearningTools({topic,onActivityComplete}){
  const sectionNumber=Number(topic?.metadata?.syllabus?.section)||0;
  return <div className="pob-learning-tools">
    {[5,6,8].includes(sectionNumber)&&<BusinessCalculator key={topic?.id} sectionNumber={sectionNumber}/>}
    <PobTopicPractice key={topic?.id} topic={topic} onActivityComplete={onActivityComplete}/>
  </div>;
}
