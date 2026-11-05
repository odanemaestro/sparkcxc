import React,{useId,useState} from 'react';
import {OA_VISUAL_GUIDES,oaReference} from '../data/oaReferences';
import {OA_SBA_GUIDE,OA_SBA_THEMES,oaSbaTheme,oaSuggestedSbaYear} from '../data/oaSbaGuide';
import './officeVisualGuide.css';
const syllabus='https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Office-Administration-Syllabus-Revised-2024.pdf';
export function OfficeSbaGuide({initialYear}){
 const [year,setYear]=useState(()=>initialYear??oaSuggestedSbaYear()??'');
 const theme=oaSbaTheme(year),example=OA_SBA_GUIDE.examples[year];
 const id=useId();
 return <section className="oa-sba-guide" aria-labelledby={`${id}-title`}>
  <h3 id={`${id}-title`}>Plan your Office Administration SBA</h3>
  <p>{OA_SBA_GUIDE.introduction}</p>
  <label className="oa-guide-year" htmlFor={`${id}-year`}><span>Examination year</span><select id={`${id}-year`} value={year} onChange={e=>setYear(e.target.value)}><option value="">Choose your examination year</option>{OA_SBA_THEMES.map(t=><option key={t.year} value={t.year}>{t.year}</option>)}</select></label>
  {theme?<p><strong>Your theme:</strong> {theme.theme}. Work within the prescribed sections and follow your school’s guidance when choosing the problem.</p>:<p>Check the current CXC theme for your sitting before choosing a problem.</p>}
  <p>{OA_SBA_GUIDE.wordAdvice}</p>
  <p>The SBA carries <strong>50 marks</strong> and contributes <strong>25% of the final subject grade</strong>. The syllabus recommends a group of no more than six students; individual projects are also permitted.</p>
  {example&&<details className="oa-guide-disclosure"><summary>Example of a focused research plan</summary><h4>{example.title}</h4><p>Use this to see the scope of a workable investigation. Develop your own title, aims and instrument for the office you study.</p><ol>{example.aims.map(a=><li key={a}>{a}</li>)}</ol><h5>Five possible interview questions</h5><ol>{example.questions.map(q=><li key={q}>{q}</li>)}</ol></details>}
  <details className="oa-guide-disclosure"><summary>What belongs in the project</summary><ul>{OA_SBA_GUIDE.components.map(c=><li key={c}>{c}</li>)}</ul><p>{OA_SBA_GUIDE.assessmentNote}</p></details>
  <details className="oa-guide-disclosure"><summary>How the official criteria are organised</summary>{OA_SBA_GUIDE.criteria.map(c=><section key={c.name}><h4>{c.name} · {c.marks} marks</h4><ul>{c.items.map(item=><li key={item}>{item}</li>)}</ul></section>)}<p><a href={`${syllabus}#page=76`} target="_blank" rel="noreferrer noopener">Read the full CXC mark scheme</a></p></details>
  <details className="oa-guide-disclosure"><summary>A practical sequence for your investigation</summary><p>These are planning prompts. In your own activity schedule, use the headings <strong>Date</strong>, <strong>Activity</strong> and <strong>Comment</strong>, and record at least 12 relevant activities in sequence.</p><ol className="oa-sba-timeline">{OA_SBA_GUIDE.planningStages.map(([title,text])=><li key={title}><strong>{title}.</strong> {text}</li>)}</ol><p>{OA_SBA_GUIDE.evidenceAdvice}</p></details>
  <p className="oa-guide-source"><a href={`${syllabus}#page=72`} target="_blank" rel="noreferrer noopener">CXC SBA requirements and project components</a><span> · </span><a href={`${syllabus}#page=73`} target="_blank" rel="noreferrer noopener">Themes by examination year</a></p>
 </section>;
}
export default function OfficeVisualGuide({section,topic,mode}){
 const id=useId();
 if(mode==='sba')return <OfficeSbaGuide/>;
 const number=Number(section??topic?.metadata?.syllabus?.section);
 const guide=OA_VISUAL_GUIDES[number];
 if(!guide)return null;
 return <section className="oa-visual-guide" aria-labelledby={`${id}-title`}>
  <figure>
   <figcaption id={`${id}-title`}>{guide.title}</figcaption>
   <p>{guide.summary}</p>
   <ol className="oa-workflow" aria-label="Workflow steps">{guide.steps.map(([title,description],i)=><li key={title}><strong><span className="oa-step-number">{i+1}.</span> {title}</strong><span>{description}</span></li>)}</ol>
   <p className="oa-workflow-example"><strong>Follow the example.</strong> {guide.example}</p>
  </figure>
  <details className="oa-guide-disclosure"><summary>Examples and official reference guides</summary><ul className="oa-reference-list">{guide.references.map(key=>oaReference(key)).filter(Boolean).map(r=><li key={r.id}><a href={r.href} target="_blank" rel="noreferrer noopener">{r.title}</a><span className="oa-reference-publisher">{r.publisher}</span><p>{r.description}</p></li>)}</ul><p className="oa-guide-source">The workflow above is original SPARK teaching material. External guides open only when selected.</p></details>
 </section>;
}
