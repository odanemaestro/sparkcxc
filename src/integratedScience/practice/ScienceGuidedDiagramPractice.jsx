import React,{useState} from "react";
import {guidedDiagramForSource,readGuidedDiagramAnswers,markGuidedDiagram,markGuidedMagnification} from "./scienceGuidedDiagramMarking";

/**
 * Original vector teaching figures. No downloaded textbook graphics and no
 * answer text is embedded in the diagrams; leader endpoints were hand-checked.
 */
export function GuidedStomaFigure(){
 const ink="#263b5b",cell="#dce7f2",chloroplast="#5c7f9a";
 return <svg viewBox="0 0 680 380" width="100%" role="img" aria-label="Unlabelled stoma diagram with callouts A to D" style={{maxWidth:680,height:"auto"}}>
  <rect x="4" y="4" width="672" height="372" rx="12" fill="#f7f9fc" stroke="#b9c7d9"/>
  <path d="M295 79 C207 61 192 307 290 318 C323 319 327 275 300 227 C275 181 277 131 295 79Z" fill={cell} stroke={ink} strokeWidth="3"/>
  <path d="M345 79 C433 61 448 307 350 318 C317 319 313 275 340 227 C365 181 363 131 345 79Z" fill={cell} stroke={ink} strokeWidth="3"/>
  <path d="M319 113 Q300 191 320 273 Q340 191 321 113Z" fill="#ffffff" stroke={ink} strokeWidth="2.4"/>
  {[[248,112],[232,157],[241,215],[254,271],[280,295],[393,112],[408,157],[399,215],[384,271],[359,295]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="10" ry="6" transform={"rotate(-22 "+x+" "+y+")"} fill={chloroplast} stroke={ink} strokeWidth="1.2"/>)}
  <circle cx="276" cy="239" r="18" fill="#b3c3d7" stroke={ink} strokeWidth="2"/>
  <circle cx="367" cy="238" r="18" fill="#b3c3d7" stroke={ink} strokeWidth="2"/>
  <circle cx="276" cy="239" r="6" fill={ink}/><circle cx="367" cy="238" r="6" fill={ink}/>
  <g stroke={ink} strokeWidth="1.7" fill="none" strokeLinecap="round">
   <polyline points="86,78 170,78 254,151"/>
   <polyline points="591,78 470,78 320,191"/>
   <polyline points="86,312 155,312 254,271"/>
   <polyline points="591,313 475,313 367,238"/>
  </g>
  {[[86,70,"A"],[591,70,"B"],[86,306,"C"],[591,307,"D"]].map(([x,y,l])=><g key={l}>
   <rect x={x-19} y={y-17} width="38" height="34" rx="8" fill={ink}/>
   <text x={x} y={y+6} textAnchor="middle" fontWeight="bold" fontSize="19" fill="#fff">{l}</text>
  </g>)}
 </svg>;
}
export function GuidedFlowerFigure(){
 const ink="#263b5b",petal="#e2dbea",sepal="#c6d4df";
 return <svg viewBox="0 0 680 400" width="100%" role="img" aria-label="Unlabelled longitudinal section of a flower with callouts A to F" style={{maxWidth:680,height:"auto"}}>
  <rect x="4" y="4" width="672" height="392" rx="12" fill="#f7f9fc" stroke="#b9c7d9"/>
  <path d="M320 278 C214 265 122 181 182 91 C238 36 309 116 330 250Z" fill={petal} stroke={ink} strokeWidth="2.6"/>
  <path d="M349 277 C466 254 547 165 489 83 C435 39 371 111 338 250Z" fill={petal} stroke={ink} strokeWidth="2.6"/>
  <path d="M330 288 Q245 293 177 268 Q238 339 332 325Z" fill={sepal} stroke={ink} strokeWidth="2.6"/>
  <path d="M340 289 Q429 291 495 266 Q442 339 340 325Z" fill={sepal} stroke={ink} strokeWidth="2.6"/>
  <path d="M337 329 L337 374" stroke={ink} strokeWidth="10" strokeLinecap="round"/>
  <path d="M273 288 C271 246 267 189 264 153 M405 288 C406 238 401 177 408 139" fill="none" stroke={ink} strokeWidth="3.5"/>
  <ellipse cx="261" cy="134" rx="13" ry="26" transform="rotate(-18 261 134)" fill="#b69aaf" stroke={ink} strokeWidth="2"/>
  <ellipse cx="411" cy="131" rx="13" ry="26" transform="rotate(20 411 131)" fill="#b69aaf" stroke={ink} strokeWidth="2"/>
  <path d="M332 122 Q335 174 334 239" stroke={ink} strokeWidth="9" fill="none" strokeLinecap="round"/>
  <path d="M330 129 C304 115 306 99 319 92 Q336 102 338 113 Q349 96 361 94 Q375 109 343 130Z" fill="#a7bbcf" stroke={ink} strokeWidth="2.3"/>
  <ellipse cx="337" cy="273" rx="39" ry="53" fill="#e2e7ed" stroke={ink} strokeWidth="2.8"/>
  <path d="M337 235 L337 305" stroke={ink} strokeWidth="1.7" strokeDasharray="4 6"/>
  <ellipse cx="323" cy="267" rx="10" ry="17" fill="#b8cade" stroke={ink} strokeWidth="1.2"/>
  <ellipse cx="350" cy="267" rx="10" ry="17" fill="#b8cade" stroke={ink} strokeWidth="1.2"/>
  <g stroke={ink} strokeWidth="1.7" fill="none" strokeLinecap="round">
   <polyline points="74,66 135,66 234,132"/>
   <polyline points="74,336 144,336 248,293"/>
   <polyline points="74,166 154,166 260,133"/>
   <polyline points="74,236 154,236 271,219"/>
   <polyline points="598,64 472,64 337,108"/>
   <polyline points="598,316 477,316 362,277"/>
  </g>
  {[[74,59,"A"],[74,329,"B"],[74,159,"C"],[74,229,"D"],[598,57,"E"],[598,309,"F"]].map(([x,y,l])=><g key={l}>
   <rect x={x-19} y={y-17} width="38" height="34" rx="8" fill={ink}/>
   <text x={x} y={y+6} textAnchor="middle" fontWeight="bold" fontSize="19" fill="#fff">{l}</text>
  </g>)}
 </svg>;
}
export default function ScienceGuidedDiagramPractice({base,questionId,partIndex,itemIndex,responses,onChange,disabled}){
 const guide=guidedDiagramForSource(questionId,partIndex,itemIndex);
 const [checked,setChecked]=useState(false);
 if(!guide)return null;
 const answers=readGuidedDiagramAnswers(responses[base+":guidedLabels"]);
 const result=markGuidedDiagram(guide,answers);
 const save=(slot,value)=>{onChange(base+":guidedLabels",JSON.stringify({...answers,[slot]:value}));setChecked(false);};
 return <section className="is-p2-guided-diagram" aria-label={guide.name+" guided labelling practice"}>
  <p><strong>Guided labelling practice (adapted question).</strong> Identify the labelled parts in this original SPARK diagram. You do not need to draw it.</p>
  {guide.id==="stoma"?<GuidedStomaFigure/>:<GuidedFlowerFigure/>}
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12,marginTop:12}}>
   {guide.slots.map(slot=><label key={slot.id} style={{display:"flex",alignItems:"center",gap:9}}>
    <strong style={{minWidth:20}}>{slot.id}</strong>
    <select aria-label={"Part "+slot.id} disabled={disabled} value={answers[slot.id]||""} onChange={e=>save(slot.id,e.target.value)} style={{flex:1,minWidth:0}}>
     <option value="">Select the part</option>
     {guide.options.map(name=><option key={name} value={name}>{name}</option>)}
    </select>
   </label>)}
  </div>
  {!disabled&&<button type="button" className="is-exam-secondary" onClick={()=>setChecked(true)} style={{marginTop:12}}>Check practice labels</button>}
  {checked&&<div role="status" style={{marginTop:10}}>
   <strong>{result.score}/{result.maxMarks} correct</strong>
   <p>{result.rows.filter(r=>!r.correct).map(r=>r.id).join(", ")||"All parts correct!"}{result.score===result.maxMarks?"":" need another look."}</p>
  </div>}
  <p style={{fontSize:".88rem",opacity:.8}}>Practice score only. The original historical question awards marks for the student's own drawing, so this result is not submitted as verified drawing marks.</p>
 </section>;
}
export function ScienceGuidedMagnificationPractice({base,responses,onChange,disabled}){
 const [checked,setChecked]=useState(false);
 let data={};try{data=JSON.parse(responses[base+":guidedMagnification"]||"{}");}catch{}
 if(!data||typeof data!=="object")data={};
 const save=(name,value)=>{onChange(base+":guidedMagnification",JSON.stringify({...data,[name]:value}));setChecked(false);};
 const result=markGuidedMagnification(data);
 return <section aria-label="Guided magnification practice">
  <p><strong>Guided magnification practice (adapted question).</strong> No drawing is needed. A diagram is stated to be <strong>120 mm high</strong> and the actual specimen is <strong>60 mm high</strong>. Calculate the magnification.</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
   <label>Calculation working
    <input value={data.working||""} disabled={disabled} placeholder="Show the division" onChange={e=>save("working",e.target.value)} />
   </label>
   <label>Magnification
    <input value={data.answer||""} disabled={disabled} placeholder="Answer with ×" onChange={e=>save("answer",e.target.value)} />
   </label>
  </div>
  {!disabled&&<button className="is-exam-secondary" type="button" onClick={()=>setChecked(true)}>Check practice calculation</button>}
  {checked&&<p role="status">{result.score}/2 practice marks. {result.score===2?"Correct calculation and answer.":"Check your working and final magnification."}</p>}
  <p style={{fontSize:".88rem",opacity:.8}}>Practice-only values. This does not validate the dimensions of a freehand drawing or certify the historical magnification mark.</p>
 </section>;
}