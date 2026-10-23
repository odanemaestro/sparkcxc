import React, {useState} from "react";
import {getPhysicsGraphWorkingSpec} from "../../../grading/physicsGraphWorkingSpecsV2";
import {
 physicsGraphLine,
 samplePhysicsGraphLine,
 validatePhysicsGradientTriangle,
 validatePhysicsPressureReading,
 validatePhysicsCurrentReading,
} from "../../../grading/physicsGraphWorkingEvidenceV2";

/**
 * Candidate interaction, not an answer key.
 * Save two separate selections for the gradient triangle, or a point chosen
 * on the student's own Q1(b) plotted line for the pressure reading.
 */
export default function PhysicsGraphWorking({questionId,partId,graphPart,graphResponse={},response={},onChange=()=>{}}){
 const spec=getPhysicsGraphWorkingSpec(questionId);
 const triangle=!!spec&&partId===spec.trianglePart;
 const reading=!!spec&&partId===spec.readingPart;
 const active=triangle||reading;
 const currentReading=reading&&questionId==="phy-p2-3-q1";
 const [selection,setSelection]=useState(questionId==="phy-p2-1-q1"&&reading?"5.56":"3.0");
 if(!active)return null;
 const line=physicsGraphLine(graphResponse,questionId);
 const requestedX=Number(selection);
 const effectiveX=line&&requestedX>=line.minX&&requestedX<=line.maxX
  ?requestedX:line?(line.minX+line.maxX)/2:0;
 const selected=samplePhysicsGraphLine(graphResponse,effectiveX,questionId);
 const evidence=response?.graphEvidence;
 const points=triangle&&evidence?.kind==="physics-gradient-triangle-v1"
  &&Array.isArray(evidence.points)?evidence.points:[];
 const readPoint=reading&&evidence?.kind===(currentReading?"physics-current-reading-v1":"physics-pressure-reading-v1")
  &&evidence.point&&Number.isFinite(evidence.point.x)&&Number.isFinite(evidence.point.y)
  ?evidence.point:null;
 const pointA=points[0]&&Number.isFinite(points[0].x)&&Number.isFinite(points[0].y)?points[0]:null;
 const pointB=points[1]&&Number.isFinite(points[1].x)&&Number.isFinite(points[1].y)?points[1]:null;
 const triangleValid=pointB&&validatePhysicsGradientTriangle({graphResponse,response,questionId});
 const readingValid=readPoint&&(currentReading
  ?validatePhysicsCurrentReading({graphResponse,response,questionId})
  :validatePhysicsPressureReading({graphResponse,response,questionId}));
 const limits=spec?.limits||{xMin:0,xMax:11,yMin:0,yMax:260};
 const xTicks=Array.from({length:6},(_,i)=>limits.xMin+(limits.xMax-limits.xMin)*i/5);
 const yTicks=Array.from({length:7},(_,i)=>limits.yMin+(limits.yMax-limits.yMin)*i/6);
 const fmt=v=>Number(v.toPrecision(3)).toString();
 const step=line?(line.maxX-line.minX)/1000:0.01;
 const area={left:66,top:18,width:550,height:240};
 const px=x=>area.left+(x-limits.xMin)/(limits.xMax-limits.xMin)*area.width;
 const py=y=>area.top+area.height-(y-limits.yMin)/(limits.yMax-limits.yMin)*area.height;
 const recordPoint=step=>{
  if(!selected)return;
  if(reading){
   onChange({...response,graphEvidence:{
    kind:currentReading?"physics-current-reading-v1":"physics-pressure-reading-v1",point:selected
   }});
  }else{
   const next=step===1?[selected]:[pointA,selected];
   if(step===2&&!pointA)return;
   onChange({...response,graphEvidence:{
    kind:"physics-gradient-triangle-v1",points:next
   }});
  }
 };
 const clear=()=>onChange({...response,graphEvidence:null});
 return <section className="phy-p2-graph-working" aria-label={triangle?"Draw your gradient triangle":"Record your graph reading"}>
  <h3>{triangle?"Gradient triangle":"Reading from your graph"}</h3>
  {!line?<p className="phy-p2-graph-working-help">Draw your best-fit line in Question 1({spec?.graphPart}) first. Your own line will appear here for this working.</p>:<>
   <p className="phy-p2-graph-working-help">
    {triangle
     ?"Choose two different positions on your own best-fit line, at least half the graph width apart, to draw the gradient triangle."
     :currentReading
      ?"Use your plotted line to find the current at V = 1.75 V. Record the point, then enter the current in the answer field."
      :"Choose the position near 1/V = 5.56 on your own graph, record the point, then write your pressure reading in the answer field."}
   </p>
   <svg viewBox="0 0 640 305" role="img" aria-label="Your saved best-fit graph with selected working" className="phy-p2-working-graph">
    <rect x={area.left} y={area.top} width={area.width} height={area.height} fill="none" stroke="currentColor" opacity=".45"/>
    {xTicks.map(x=><g key={"x"+x}>
     <line x1={px(x)} x2={px(x)} y1={area.top} y2={area.top+area.height} className="phy-p2-working-grid"/>
     <text x={px(x)} y={area.top+area.height+21} textAnchor="middle">{fmt(x)}</text>
    </g>)}
    {yTicks.map(y=><g key={"y"+y}>
     <line x1={area.left} x2={area.left+area.width} y1={py(y)} y2={py(y)} className="phy-p2-working-grid"/>
     <text x={area.left-10} y={py(y)+4} textAnchor="end">{fmt(y)}</text>
    </g>)}
    <text x={area.left+area.width/2} y="301" textAnchor="middle">{graphPart?.grid?.xLabel||"Horizontal axis"}</text>
    <text x="17" y="139" transform="rotate(-90 17 139)" textAnchor="middle">{graphPart?.grid?.yLabel||"Vertical axis"}</text>
    <line x1={px(line.a.x)} y1={py(line.a.y)} x2={px(line.b.x)} y2={py(line.b.y)} className="phy-p2-working-line"/>
    {selected&&<circle cx={px(selected.x)} cy={py(selected.y)} r="5" className="phy-p2-working-selection"/>}
    {pointA&&<circle cx={px(pointA.x)} cy={py(pointA.y)} r="6" className="phy-p2-working-saved"/>}
    {pointA&&pointB&&<><polyline points={[[pointA.x,pointA.y],[pointB.x,pointA.y],[pointB.x,pointB.y]]
     .map(([x,y])=>px(x)+","+py(y)).join(" ")} className="phy-p2-working-triangle"/>
     <circle cx={px(pointB.x)} cy={py(pointB.y)} r="6" className="phy-p2-working-saved"/>
    </>}
    {readPoint&&<>
     <line x1={px(readPoint.x)} y1={py(readPoint.y)} x2={px(readPoint.x)} y2={py(0)} className="phy-p2-working-triangle"/>
     <line x1={px(0)} y1={py(readPoint.y)} x2={px(readPoint.x)} y2={py(readPoint.y)} className="phy-p2-working-triangle"/>
     <circle cx={px(readPoint.x)} cy={py(readPoint.y)} r="6" className="phy-p2-working-saved"/>
    </>}
   </svg>
   <div className="phy-p2-graph-working-controls">
    <label htmlFor={"phy-p2-graph-x-"+partId}>Move along the line <strong>x = {fmt(effectiveX)}</strong></label>
    <input id={"phy-p2-graph-x-"+partId} type="range" min={line.minX}
     max={line.maxX} step={step} value={effectiveX}
     onChange={event=>setSelection(event.target.value)}/>
    <div className="phy-p2-graph-working-buttons">
     {triangle?<>
      <button type="button" onClick={()=>recordPoint(1)} disabled={!selected}>Record first point</button>
      <button type="button" onClick={()=>recordPoint(2)} disabled={!selected||!pointA}>Record second point</button>
     </>:<button type="button" onClick={()=>recordPoint(1)} disabled={!selected}>Record graph reading</button>}
     {evidence&&<button type="button" className="phy-p2-working-clear" onClick={clear}>Clear working</button>}
    </div>
    <p role="status" className="phy-p2-graph-working-help">
     {triangle?(pointB?(triangleValid?"Gradient triangle recorded.":"Triangle is too short or does not match your saved line. Choose two points farther apart.") :pointA?"First point recorded. Choose the second.":"No triangle recorded yet.")
      :readPoint?(readingValid?(currentReading?"Current reading recorded. Enter the current in your answer.":"Graph-reading point recorded. Enter the pressure in your answer."):"Reading no longer matches your line. Record it again."):"No graph-reading point recorded yet."}
    </p>
   </div>
  </>}
 </section>;
}
