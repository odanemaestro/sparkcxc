import React from 'react';
export const oaDiagramFieldLabel=(diagram,node)=>`${diagram.title} · ${node.label}`;
export default function OaResponseDiagram({diagram,values,onChange,review,busy}){
 const [x,y,width,height]=diagram.viewBox;
 return <section className="oa-response-diagram" aria-label={diagram.title}>
  {diagram.prompt&&<p>{diagram.prompt}</p>}
  <div className="oa-diagram-scroll" tabIndex={0} role="region" aria-label={`${diagram.title}, scroll to view all boxes`}>
   <div className="oa-diagram-canvas" style={{aspectRatio:`${width}/${height}`}}>
    <svg viewBox={diagram.viewBox.join(' ')} aria-hidden="true" focusable="false">{diagram.lines.map((points,i)=><polyline key={i} points={points.map(p=>p.join(',')).join(' ')}/>)}</svg>
    {diagram.nodes.map((node,i)=><div className="oa-diagram-node" key={node.label||i} style={{left:`${(node.x-x)/width*100}%`,top:`${(node.y-y)/height*100}%`,width:`${node.width/width*100}%`,height:`${node.height/height*100}%`}}>
     {node.fixed!==undefined?<span>{node.fixed}</span>:<textarea aria-label={oaDiagramFieldLabel(diagram,node)} rows={3} value={values[oaDiagramFieldLabel(diagram,node)]||''} onChange={e=>onChange(oaDiagramFieldLabel(diagram,node),e.target.value)} readOnly={review} disabled={busy}/>}
    </div>)}
   </div>
  </div>
 </section>;
}
