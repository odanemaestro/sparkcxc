import React, { useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import {
  buildPendulumLabModel, evaluateBestFitLine, buildGradientToolModel, readVernierCaliper,
  readMicrometer, buildDensityDisplacementModel, evaluatePlottedPoint, leastSquaresLine,
} from '../interactives/a1InteractiveModels.mjs';
import { buildVectorResultantModel, buildVectorComponentsModel } from '../interactives/a2InteractiveModels.mjs';
import {
  buildMomentBeamModel, buildLeverExplorerModel, buildStabilityExplorerModel,
  buildForceExtensionLabModel, buildCentreOfGravityPlumblineModel,
} from '../interactives/a3InteractiveModels.mjs';
import {
  buildVelocityTimeExplorerModel, buildNewtonTrolleyModel, stickingCollision,
  recoilFromRest, buildVelocityAreaComparison,
} from '../interactives/a4InteractiveModels.mjs';
import {
  buildWorkExplorerModel, buildEnergyConservationModel, buildStairPowerModel, buildEfficiencyModel,
} from '../interactives/a5InteractiveModels.mjs';
import {
  buildPressureFootprintModel, buildPressureDepthModel, buildBuoyancyLabModel,
  buildSubmarineBallastModel, buildHoleJetModel,
} from '../interactives/a6InteractiveModels.mjs';
import { MECHANICS_INTERACTIVES } from '../interactives/mechanicsInteractiveRegistry.mjs';

const byId = new Map(MECHANICS_INTERACTIVES.map(item => [item.id, item]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, Number(v)));
const fmt = (n, dp = 2) => Number(n).toFixed(dp).replace(/\.00$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
const sx = (x, min, max, left = 54, width = 452) => left + (Number(x) - min) / (max - min) * width;
const sy = (y, min, max, top = 26, height = 220) => top + (max - Number(y)) / (max - min) * height;

function Slider({ label, value, min, max, step, onChange, display, id }) {
  return <label className="pm-control" htmlFor={id}>
    <span><strong>{label}</strong><MathText as="output" prose>{display ?? value}</MathText></span>
    <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
  </label>;
}
function Metric({ label, value, tone = '' }) { return <div className={`pm-metric ${tone}`}><MathText as="strong" prose>{value}</MathText><span>{label}</span></div>; }
function LabFrame({ title, intro, children, footer }) {
  return <div className="pm-lab-frame">
    <div className="pm-lab-heading"><h3>{title}</h3>{intro && <MathText as="p" prose>{intro}</MathText>}</div>
    {children}
    {footer && <MathText as="div" prose className="pm-lab-note">{footer}</MathText>}
  </div>;
}
function Plot({ children, label, className = '' }) {
  return <svg className={`pm-lab-svg ${className}`} viewBox="0 0 560 280" role="img" aria-label={label}>{children}</svg>;
}
function Axes({ xLabel = 'x', yLabel = 'y', zeroY = 246 }) {
  return <>
    <line x1="54" y1={zeroY} x2="520" y2={zeroY} className="pm-axis" />
    <line x1="54" y1="20" x2="54" y2="252" className="pm-axis" />
    <text x="500" y="270" className="pm-svg-label">{xLabel}</text>
    <text x="10" y="26" className="pm-svg-label">{yLabel}</text>
  </>;
}

const pendulumPoints = [
  {x:0.20,y:0.81},{x:0.30,y:1.21},{x:0.40,y:1.6129},{x:0.50,y:2.0164},{x:0.60,y:2.4025},{x:0.70,y:2.7889},
];

function PendulumLab() {
  const [length,setLength]=useState(.8),[mass,setMass]=useState(.1),[angle,setAngle]=useState(8),[n,setN]=useState(20);
  const r=useMemo(()=>buildPendulumLabModel({lengthM:length,massKg:mass,angleDeg:angle,oscillations:n}),[length,mass,angle,n]);
  const L=80+130*length/1.6, a=angle*Math.PI/180, x=280+L*Math.sin(a), y=40+L*Math.cos(a);
  return <LabFrame title="Pendulum Lab" intro="Change one factor at a time. Notice that ideal mass changes do not change the period, while length does. Large amplitudes slightly increase the period." footer="CSEC method: measure from the point of support to the centre of the bob, release without pushing, and time several complete oscillations.">
    <div className="pm-controls-grid">
      <Slider id="pend-l" label="Length" value={length} min={.2} max={1.6} step={.05} onChange={setLength} display={`${fmt(length,2)} m`} />
      <Slider id="pend-m" label="Bob mass" value={mass} min={.05} max={.5} step={.05} onChange={setMass} display={`${fmt(mass,2)} kg`} />
      <Slider id="pend-a" label="Amplitude" value={angle} min={2} max={60} step={1} onChange={setAngle} display={`${angle}°`} />
      <Slider id="pend-n" label="Oscillations timed" value={n} min={5} max={40} step={5} onChange={setN} display={n} />
    </div>
    <Plot label="Simple pendulum with adjustable length and amplitude">
      <line x1="210" y1="35" x2="350" y2="35" className="pm-heavy"/><line x1="280" y1="35" x2={x} y2={y} className="pm-line"/><circle cx={x} cy={y} r="18" className="pm-fill-primary"/>
      <line x1="280" y1="35" x2="280" y2={40+L} className="pm-dash"/><text x={x+24} y={y+5} className="pm-svg-label">bob</text>
    </Plot>
    <div className="pm-metrics"><Metric label="Period" value={`${r.correctedPeriodS.toFixed(2)} s`} /><Metric label={`${n} oscillations`} value={`${r.totalTimeS.toFixed(1)} s`} /><Metric label="Mass effect in ideal model" value="None" tone="good" /><Metric label="Amplitude check" value={r.smallAngleApproximationSuitable ? 'Small-angle region' : `+${r.amplitudeDifferencePercent.toFixed(2)}%`} tone={r.smallAngleApproximationSuitable?'good':'warn'} /></div>
  </LabFrame>;
}

function PlotPointsLab({ onEvidence }) {
  const [index,setIndex]=useState(0),[x,setX]=useState(.2),[y,setY]=useState(.8),[placed,setPlaced]=useState([]),[message,setMessage]=useState('');
  const target=pendulumPoints[index];
  const check=()=>{const r=evaluatePlottedPoint({targetX:target.x,targetY:target.y,studentX:x,studentY:y});if(r.correct){const next=[...placed,target];setPlaced(next);setMessage('Correctly plotted.');if(index<pendulumPoints.length-1){const ni=index+1;setIndex(ni);setX(pendulumPoints[ni].x);setY(Math.round(pendulumPoints[ni].y*20)/20);}else{onEvidence?.({objective:'A1.3',score:1,result:'completed'});}}else setMessage(`Not quite. Check both coordinates before moving on.`)};
  const done=placed.length===pendulumPoints.length;
  return <LabFrame title="Plot the Points" intro="Plot T² against length. The first named quantity in ‘T² against l’ belongs on the vertical axis." footer="A plotting tolerance is used because a graph is a measured construction, not an exact text-entry task.">
    <div className="pm-challenge-row"><div><strong>Point {Math.min(index+1,6)} of 6</strong><span>Target reading: l = {target.x.toFixed(2)} m, T² = {target.y.toFixed(2)} s²</span></div>{done && <span className="pm-chip success">All six plotted</span>}</div>
    <div className="pm-controls-grid"><Slider id="plot-x" label="Your l coordinate" value={x} min={.15} max={.75} step={.005} onChange={setX} display={`${x.toFixed(3)} m`} /><Slider id="plot-y" label="Your T² coordinate" value={y} min={.6} max={3.0} step={.01} onChange={setY} display={`${y.toFixed(2)} s²`} /></div>
    <Plot label="Student graph for period squared against length"><Axes xLabel="l / m" yLabel="T² / s²"/>
      {[.2,.3,.4,.5,.6,.7].map(v=><line key={`x${v}`} x1={sx(v,.15,.75)} x2={sx(v,.15,.75)} y1="26" y2="246" className="pm-grid"/>)}
      {[.8,1.2,1.6,2.0,2.4,2.8].map(v=><line key={`y${v}`} x1="54" x2="506" y1={sy(v,.6,3)} y2={sy(v,.6,3)} className="pm-grid"/>)}
      {placed.map((p,i)=><g key={i}><line x1={sx(p.x,.15,.75)-5} x2={sx(p.x,.15,.75)+5} y1={sy(p.y,.6,3)-5} y2={sy(p.y,.6,3)+5} className="pm-point"/><line x1={sx(p.x,.15,.75)-5} x2={sx(p.x,.15,.75)+5} y1={sy(p.y,.6,3)+5} y2={sy(p.y,.6,3)-5} className="pm-point"/></g>)}
      {!done && <circle cx={sx(x,.15,.75)} cy={sy(y,.6,3)} r="5" className="pm-preview-point"/>}
    </Plot>
    <div className="pm-action-row"><button type="button" className="pm-btn" onClick={check} disabled={done}>Check this point</button><button type="button" className="pm-btn secondary" onClick={()=>{setIndex(0);setPlaced([]);setX(.2);setY(.8);setMessage('');}}>Reset</button><span className="pm-feedback" aria-live="polite">{message}</span></div>
  </LabFrame>;
}

function BestFitLab({ onEvidence }) {
  const regression=useMemo(()=>leastSquaresLine(pendulumPoints),[]);
  const [slope,setSlope]=useState(3.6),[intercept,setIntercept]=useState(.15),[message,setMessage]=useState('');
  const r=useMemo(()=>evaluateBestFitLine(pendulumPoints,{slope,intercept}),[slope,intercept]);
  const check=()=>{const slopeGood=Math.abs(slope-regression.slope)<=.18, interceptGood=Math.abs(intercept-regression.intercept)<=.10;const ok=slopeGood&&interceptGood&&r.reasonablyBalanced;setMessage(ok?'Good best-fit judgement. The points are reasonably balanced around the line.':'Adjust the line so it follows the overall trend with points distributed on both sides.');if(ok)onEvidence?.({objective:'A1.4',score:1,result:'completed'});};
  return <LabFrame title="Best-Fit Challenge" intro="Move a straight line through the overall trend. Do not join the readings dot-to-dot and do not force the line through the origin unless the data support it.">
    <div className="pm-controls-grid"><Slider id="fit-m" label="Line gradient" value={slope} min={3.2} max={4.6} step={.02} onChange={setSlope} display={slope.toFixed(2)} /><Slider id="fit-b" label="Line intercept" value={intercept} min={-.2} max={.3} step={.01} onChange={setIntercept} display={intercept.toFixed(2)} /></div>
    <Plot label="Pendulum data with adjustable best fit line"><Axes xLabel="l / m" yLabel="T² / s²"/>
      {pendulumPoints.map((p,i)=><circle key={i} cx={sx(p.x,.15,.75)} cy={sy(p.y,.6,3)} r="5" className="pm-point-fill"/>)}
      <line x1={sx(.15,.15,.75)} y1={sy(slope*.15+intercept,.6,3)} x2={sx(.75,.15,.75)} y2={sy(slope*.75+intercept,.6,3)} className="pm-fit"/>
    </Plot>
    <div className="pm-metrics"><Metric label="Points above" value={r.above}/><Metric label="Points below" value={r.below}/><Metric label="RMS scatter" value={r.rms.toFixed(3)}/></div>
    <div className="pm-action-row"><button type="button" className="pm-btn" onClick={check}>Check line</button><span className="pm-feedback" aria-live="polite">{message}</span></div>
  </LabFrame>;
}

function GradientLab({ onEvidence }) {
  const slope=3.96, intercept=.02;
  const [x1,setX1]=useState(.12),[x2,setX2]=useState(.70),[message,setMessage]=useState('');
  const a=Math.min(x1,x2), b=Math.max(x1,x2), y1=slope*a+intercept, y2=slope*b+intercept;
  const r=buildGradientToolModel({x1:a,y1,x2:b,y2,graphWidthX:.6});
  const check=()=>{const ok=r.coversAtLeastHalfLine&&Math.abs(r.slope-slope)<.02;setMessage(ok?`Good triangle. Gradient ≈ ${r.slope.toFixed(2)} s² m⁻¹, giving g ≈ ${r.gFromPendulum.toFixed(2)} m s⁻².`:'Choose points farther apart on the line. A large gradient triangle reduces fractional reading error.');if(ok)onEvidence?.({objective:'A1.5',score:1,result:'completed'});};
  return <LabFrame title="Gradient Tool" intro="Choose two well-separated points on the best-fit line, then use Δy/Δx. Use points on the line, not necessarily measured data points.">
    <div className="pm-controls-grid"><Slider id="grad-x1" label="First x value" value={x1} min={.10} max={.72} step={.01} onChange={setX1} display={x1.toFixed(2)} /><Slider id="grad-x2" label="Second x value" value={x2} min={.10} max={.72} step={.01} onChange={setX2} display={x2.toFixed(2)} /></div>
    <Plot label="Large gradient triangle on a pendulum best fit line"><Axes xLabel="l / m" yLabel="T² / s²"/>
      <line x1={sx(.1,.1,.75)} y1={sy(slope*.1+intercept,.35,3.05)} x2={sx(.75,.1,.75)} y2={sy(slope*.75+intercept,.35,3.05)} className="pm-fit"/>
      <polyline points={`${sx(a,.1,.75)},${sy(y1,.35,3.05)} ${sx(b,.1,.75)},${sy(y1,.35,3.05)} ${sx(b,.1,.75)},${sy(y2,.35,3.05)}`} className="pm-triangle"/>
    </Plot>
    <div className="pm-metrics"><Metric label="Δl" value={`${r.deltaX.toFixed(2)} m`}/><Metric label="ΔT²" value={`${r.deltaY.toFixed(2)} s²`}/><Metric label="Gradient" value={`${r.slope.toFixed(2)} s² m⁻¹`}/><Metric label="g from gradient" value={`${r.gFromPendulum.toFixed(2)} m s⁻²`}/></div>
    <div className="pm-action-row"><button type="button" className="pm-btn" onClick={check}>Check triangle</button><span className="pm-feedback" aria-live="polite">{message}</span></div>
  </LabFrame>;
}

function InstrumentLab() {
  const [mode,setMode]=useState('vernier'),[main,setMain]=useState(12),[division,setDivision]=useState(6),[zero,setZero]=useState(.2);
  const r=mode==='vernier'?readVernierCaliper({mainScaleMm:main,coincidentVernierDivision:division,leastCountMm:.1,zeroErrorMm:zero}):readMicrometer({sleeveMm:main/2,thimbleDivision:division,thimbleLeastCountMm:.01,zeroErrorMm:zero/10});
  return <LabFrame title="Instrument Explorer" intro="Separate the scale reading from the zero correction. A positive zero error is subtracted from the observed reading.">
    <div className="pm-segmented"><button type="button" className={mode==='vernier'?'active':''} onClick={()=>setMode('vernier')}>Vernier caliper</button><button type="button" className={mode==='micrometer'?'active':''} onClick={()=>setMode('micrometer')}>Micrometer</button></div>
    <div className="pm-controls-grid"><Slider id="inst-main" label={mode==='vernier'?'Main scale before vernier zero':'Sleeve setting ×2'} value={main} min={4} max={25} step={1} onChange={setMain} display={mode==='vernier'?`${main} mm`:`${(main/2).toFixed(1)} mm`} /><Slider id="inst-div" label={mode==='vernier'?'Coincident vernier division':'Thimble division'} value={division} min={0} max={mode==='vernier'?9:49} step={1} onChange={setDivision} display={division}/><Slider id="inst-zero" label="Positive zero error" value={zero} min={0} max={.5} step={.1} onChange={setZero} display={mode==='vernier'?`${zero.toFixed(1)} mm`:`${(zero/10).toFixed(2)} mm`} /></div>
    <div className="pm-instrument-scale" aria-label="Simplified instrument scale">
      <div className="pm-main-scale">{Array.from({length:21},(_,i)=><span key={i} className={i%5===0?'major':''}></span>)}</div><div className="pm-vernier-scale" style={{transform:`translateX(${division*2}px)`}}>{Array.from({length:10},(_,i)=><span key={i}></span>)}</div>
    </div>
    <div className="pm-metrics"><Metric label="Observed" value={`${r.observedMm.toFixed(mode==='vernier'?1:2)} mm`}/><Metric label="Zero correction" value={`−${Math.abs(r.zeroErrorMm).toFixed(mode==='vernier'?1:2)} mm`}/><Metric label="Corrected reading" value={`${r.correctedMm.toFixed(mode==='vernier'?1:2)} mm`} tone="good"/></div>
  </LabFrame>;
}

function DensityLab() {
  const [mass,setMass]=useState(135),[initial,setInitial]=useState(50),[final,setFinal]=useState(100);
  const safeFinal=Math.max(final,initial+1); const r=buildDensityDisplacementModel({massG:mass,initialVolumeCm3:initial,finalVolumeCm3:safeFinal});
  return <LabFrame title="Density by Displacement" intro="For an irregular solid, the displaced volume is final cylinder reading minus initial reading. Then use ρ = m/V.">
    <div className="pm-controls-grid"><Slider id="den-m" label="Mass" value={mass} min={20} max={300} step={5} onChange={setMass} display={`${mass} g`}/><Slider id="den-i" label="Initial volume" value={initial} min={20} max={100} step={1} onChange={v=>{setInitial(v);if(final<=v)setFinal(v+10)}} display={`${initial} cm³`}/><Slider id="den-f" label="Final volume" value={safeFinal} min={initial+1} max={160} step={1} onChange={setFinal} display={`${safeFinal} cm³`}/></div>
    <div className="pm-cylinder-wrap"><div className="pm-cylinder"><div className="pm-water" style={{height:`${clamp(initial/160*100,8,95)}%`}}></div><span>before</span></div><div className="pm-cylinder"><div className="pm-water" style={{height:`${clamp(safeFinal/160*100,8,95)}%`}}></div><div className="pm-object"></div><span>after</span></div></div>
    <div className="pm-metrics"><Metric label="Displaced volume" value={`${r.displacedVolumeCm3.toFixed(0)} cm³`}/><Metric label="Density" value={`${r.densityGPerCm3.toFixed(2)} g cm⁻³`} tone="good"/><Metric label="Equivalent" value={`${r.densityKgPerM3.toFixed(0)} kg m⁻³`}/></div>
  </LabFrame>;
}

function VectorResultantLab() {
  const [a,setA]=useState(30),[b,setB]=useState(20),[angle,setAngle]=useState(55),[method,setMethod]=useState('triangle');
  const r=buildVectorResultantModel({firstMagnitude:a,firstAngle:0,secondMagnitude:b,secondAngle:angle,unitsPerCm:5,method});
  const scale=5, ox=75,oy=225, ah={x:ox+r.geometry.firstHead.x*scale,y:oy-r.geometry.firstHead.y*scale}, bh={x:ox+r.geometry.opposite.x*scale,y:oy-r.geometry.opposite.y*scale};
  const bStart=method==='triangle'?ah:{x:ox,y:oy}; const bEnd=method==='triangle'?bh:{x:ox+r.geometry.secondHead.x*scale,y:oy-r.geometry.secondHead.y*scale};
  return <LabFrame title="Resultant Vector Lab" intro="Build the vector construction and compare it with the calculated resultant. Oblique vectors belong in scale-diagram work; perpendicular vectors can also be calculated directly.">
    <div className="pm-controls-grid"><Slider id="vec-a" label="Vector A" value={a} min={5} max={45} step={1} onChange={setA} display={`${a} N`}/><Slider id="vec-b" label="Vector B" value={b} min={5} max={45} step={1} onChange={setB} display={`${b} N`}/><Slider id="vec-ang" label="Direction of B" value={angle} min={10} max={150} step={1} onChange={setAngle} display={`${angle}°`}/></div>
    <div className="pm-segmented"><button type="button" className={method==='triangle'?'active':''} onClick={()=>setMethod('triangle')}>Tip-to-tail</button><button type="button" className={method==='parallelogram'?'active':''} onClick={()=>setMethod('parallelogram')}>Parallelogram</button></div>
    <Plot label="Vector addition construction"><defs><marker id="pm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" className="pm-arrow-fill"/></marker></defs>
      <line x1={ox} y1={oy} x2={ah.x} y2={ah.y} className="pm-vector a" markerEnd="url(#pm-arrow)"/><line x1={bStart.x} y1={bStart.y} x2={bEnd.x} y2={bEnd.y} className="pm-vector b" markerEnd="url(#pm-arrow)"/><line x1={ox} y1={oy} x2={bh.x} y2={bh.y} className="pm-vector r" markerEnd="url(#pm-arrow)"/>
      {method==='parallelogram'&&<><line x1={ah.x} y1={ah.y} x2={bh.x} y2={bh.y} className="pm-dash"/><line x1={bEnd.x} y1={bEnd.y} x2={bh.x} y2={bh.y} className="pm-dash"/></>}
    </Plot>
    <div className="pm-metrics"><Metric label="Resultant magnitude" value={`${r.resultant.magnitude.toFixed(1)} N`}/><Metric label="Direction from east" value={`${r.resultant.angleDegrees.toFixed(1)}°`}/><Metric label="Drawing length at 5 N/cm" value={`${r.drawLengthsCm.resultant.toFixed(2)} cm`}/></div>
  </LabFrame>;
}

function ComponentLab() {
  const [m,setM]=useState(20),[angle,setAngle]=useState(30); const r=buildVectorComponentsModel({magnitude:m,angleDegrees:angle});
  const ox=95,oy=225,s=7, hx=ox+r.horizontal*s,hy=oy-r.vertical*s;
  return <LabFrame title="Component Resolver" intro="A single vector can be replaced by two perpendicular components. Which component uses sine or cosine depends on where the angle is measured.">
    <div className="pm-controls-grid"><Slider id="comp-m" label="Vector magnitude" value={m} min={5} max={30} step={1} onChange={setM} display={`${m} N`}/><Slider id="comp-a" label="Angle above horizontal" value={angle} min={5} max={85} step={1} onChange={setAngle} display={`${angle}°`}/></div>
    <Plot label="Vector resolved into horizontal and vertical components"><defs><marker id="pm-arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" className="pm-arrow-fill"/></marker></defs><line x1={ox} y1={oy} x2={hx} y2={oy} className="pm-vector a" markerEnd="url(#pm-arrow2)"/><line x1={hx} y1={oy} x2={hx} y2={hy} className="pm-vector b" markerEnd="url(#pm-arrow2)"/><line x1={ox} y1={oy} x2={hx} y2={hy} className="pm-vector r" markerEnd="url(#pm-arrow2)"/><polyline points={`${ox},${oy} ${hx},${oy} ${hx},${hy}`} className="pm-right-angle"/></Plot>
    <div className="pm-metrics"><Metric label="Horizontal F cos θ" value={`${r.horizontal.toFixed(2)} N`}/><Metric label="Vertical F sin θ" value={`${r.vertical.toFixed(2)} N`}/><Metric label="Reconstructed" value={`${r.reconstructedMagnitude.toFixed(2)} N`} tone="good"/></div>
  </LabFrame>;
}

function MomentLab() {
  const [lf,setLf]=useState(6),[ld,setLd]=useState(.4),[rf,setRf]=useState(8),[rd,setRd]=useState(.3); const reaction=lf+rf;
  const r=buildMomentBeamModel({forces:[{positionM:-ld,forceN:lf,direction:'down'},{positionM:rd,forceN:rf,direction:'down'},{positionM:0,forceN:reaction,direction:'up'}]});
  const xL=280-ld*360,xR=280+rd*360;
  return <LabFrame title="Moment Beam" intro="Move the loads. For a balanced beam, clockwise and anticlockwise moments about the same pivot are equal, and the vertical resultant is zero.">
    <div className="pm-controls-grid"><Slider id="mom-lf" label="Left force" value={lf} min={2} max={12} step={.5} onChange={setLf} display={`${lf} N`}/><Slider id="mom-ld" label="Left distance" value={ld} min={.1} max={.6} step={.05} onChange={setLd} display={`${ld.toFixed(2)} m`}/><Slider id="mom-rf" label="Right force" value={rf} min={2} max={12} step={.5} onChange={setRf} display={`${rf} N`}/><Slider id="mom-rd" label="Right distance" value={rd} min={.1} max={.6} step={.05} onChange={setRd} display={`${rd.toFixed(2)} m`}/></div>
    <Plot label="Beam with pivot and two adjustable loads"><line x1="55" y1="150" x2="505" y2="150" className="pm-heavy"/><polygon points="280,155 250,215 310,215" className="pm-fill-muted"/><line x1={xL} y1="65" x2={xL} y2="140" className="pm-force-down"/><line x1={xR} y1="65" x2={xR} y2="140" className="pm-force-down"/><text x={xL-15} y="55" className="pm-svg-label">{lf} N</text><text x={xR-15} y="55" className="pm-svg-label">{rf} N</text></Plot>
    <div className="pm-metrics"><Metric label="Anticlockwise" value={`${r.anticlockwise.toFixed(2)} N m`}/><Metric label="Clockwise" value={`${r.clockwise.toFixed(2)} N m`}/><Metric label="Turning state" value={r.balanced?'Balanced':r.netClockwise>0?'Clockwise':'Anticlockwise'} tone={r.balanced?'good':'warn'}/></div>
  </LabFrame>;
}

function LeverLab() {
  const [kind,setKind]=useState('first'),[effort,setEffort]=useState(5),[load,setLoad]=useState(10);
  const positions=kind==='first'?{fulcrumPosition:0,effortPosition:-2,loadPosition:1}:kind==='second'?{fulcrumPosition:0,loadPosition:1,effortPosition:2}:{fulcrumPosition:0,effortPosition:1,loadPosition:2};
  const r=buildLeverExplorerModel({...positions,effortN:effort,loadN:load});
  const map=p=>280+p*90;
  return <LabFrame title="Lever Explorer" intro="Identify the fulcrum, effort and load. A longer effort arm can produce the same moment with a smaller effort.">
    <div className="pm-segmented">{['first','second','third'].map(x=><button type="button" key={x} className={kind===x?'active':''} onClick={()=>setKind(x)}>{x[0].toUpperCase()+x.slice(1)} class</button>)}</div>
    <div className="pm-controls-grid"><Slider id="lev-e" label="Effort" value={effort} min={2} max={15} step={1} onChange={setEffort} display={`${effort} N`}/><Slider id="lev-l" label="Load" value={load} min={2} max={20} step={1} onChange={setLoad} display={`${load} N`}/></div>
    <Plot label={`${kind} class lever diagram`}><line x1="70" y1="145" x2="500" y2="145" className="pm-heavy"/><polygon points={`${map(positions.fulcrumPosition)},150 ${map(positions.fulcrumPosition)-22},205 ${map(positions.fulcrumPosition)+22},205`} className="pm-fill-muted"/><circle cx={map(positions.effortPosition)} cy="145" r="10" className="pm-fill-primary"/><circle cx={map(positions.loadPosition)} cy="145" r="10" className="pm-fill-accent"/><text x={map(positions.effortPosition)-18} y="120" className="pm-svg-label">effort</text><text x={map(positions.loadPosition)-14} y="120" className="pm-svg-label">load</text><text x={map(positions.fulcrumPosition)-25} y="235" className="pm-svg-label">fulcrum</text></Plot>
    <div className="pm-metrics"><Metric label="Class" value={r.leverClass}/><Metric label="Effort moment" value={`${r.effortMomentNm.toFixed(1)} N m`}/><Metric label="Load moment" value={`${r.loadMomentNm.toFixed(1)} N m`}/><Metric label="Balanced?" value={r.balanced?'Yes':'No'} tone={r.balanced?'good':'warn'}/></div>
  </LabFrame>;
}

function CentreGravityLab() {
  const model=useMemo(()=>buildCentreOfGravityPlumblineModel(),[]); const [shown,setShown]=useState(1);
  const scale=p=>({x:80+p.x*390,y:25+p.y*220}); const cg=scale(model.centre);
  const poly='120,55 365,35 480,120 420,245 230,230 80,150';
  return <LabFrame title="Centre-of-Gravity Lab" intro="Suspend an irregular lamina freely. The centre of gravity lies vertically below the suspension point, so two plumb lines locate it and a third can check it.">
    <Plot label="Irregular lamina with plumb lines"><polygon points={poly} className="pm-lamina"/>{model.lines.slice(0,shown).map((l,i)=>{const p=scale(l.suspension);return <g key={i}><circle cx={p.x} cy={p.y} r="6" className="pm-point-fill"/><line x1={p.x} y1={p.y} x2={cg.x} y2={cg.y} className="pm-fit"/><line x1={cg.x} y1={cg.y} x2={cg.x} y2="260" className="pm-dash"/></g>})}{shown>=2&&<circle cx={cg.x} cy={cg.y} r="8" className="pm-fill-accent"/>}</Plot>
    <div className="pm-action-row"><button type="button" className="pm-btn" onClick={()=>setShown(v=>Math.min(3,v+1))} disabled={shown>=3}>Suspend from another point</button><button type="button" className="pm-btn secondary" onClick={()=>setShown(1)}>Reset</button><span className="pm-feedback">{shown===1?'One vertical line does not locate a unique point.':shown===2?'The intersection locates the centre of gravity.':'The third line checks the result.'}</span></div>
  </LabFrame>;
}

function StabilityLab() {
  const [width,setWidth]=useState(1),[height,setHeight]=useState(2),[tilt,setTilt]=useState(15); const r=buildStabilityExplorerModel({widthM:width,heightM:height,tiltDegrees:tilt});
  const angle=tilt*Math.PI/180, cx=280,baseY=220,w=90*width,h=80*height; const corners=[[-w/2,0],[w/2,0],[w/2,-h],[-w/2,-h]].map(([x,y])=>({x:cx+x*Math.cos(angle)-y*Math.sin(angle),y:baseY+x*Math.sin(angle)+y*Math.cos(angle)}));
  const cgp={x:cx+(-h/2)*-Math.sin(angle),y:baseY+(-h/2)*Math.cos(angle)};
  return <LabFrame title="Topple or Return?" intro="A supported object is stable while the vertical line through its centre of gravity falls inside the base of support.">
    <div className="pm-controls-grid"><Slider id="stab-w" label="Base width" value={width} min={.5} max={2} step={.1} onChange={setWidth} display={`${width.toFixed(1)} m`}/><Slider id="stab-h" label="Centre height scale" value={height} min={.7} max={2.5} step={.1} onChange={setHeight} display={`${height.toFixed(1)} m`}/><Slider id="stab-t" label="Tilt" value={tilt} min={0} max={60} step={1} onChange={setTilt} display={`${tilt}°`}/></div>
    <Plot label="Tilting block and line of action of weight"><line x1="55" y1="220" x2="505" y2="220" className="pm-heavy"/><polygon points={corners.map(p=>`${p.x},${p.y}`).join(' ')} className={r.stable?'pm-block-stable':'pm-block-topple'}/><circle cx={cgp.x} cy={cgp.y} r="7" className="pm-fill-accent"/><line x1={cgp.x} y1={cgp.y} x2={cgp.x} y2="250" className="pm-force-down"/></Plot>
    <div className="pm-metrics"><Metric label="Critical tilt" value={`${r.criticalAngleDegrees.toFixed(1)}°`}/><Metric label="Line of action" value={r.lineOfActionInsideBase?'Inside base':'Outside base'} tone={r.lineOfActionInsideBase?'good':'danger'}/><Metric label="Prediction" value={r.stable?'Returns':'Topples'} tone={r.stable?'good':'danger'}/></div>
  </LabFrame>;
}

function SpringLab() {
  const [k,setK]=useState(50),[lop,setLop]=useState(4),[elastic,setElastic]=useState(6); const max=Math.max(8,elastic+2); const r=buildForceExtensionLabModel({springConstantNm:k,limitOfProportionalityN:lop,elasticLimitN:elastic,maxForceN:max,stepN:1});
  const maxX=Math.max(...r.points.map(p=>p.extensionM))*1.1;
  return <LabFrame title="Force-Extension Lab" intro="Collect loading data and identify the proportional region. The limit of proportionality and elastic limit are different ideas.">
    <div className="pm-controls-grid"><Slider id="spr-k" label="Spring constant" value={k} min={20} max={100} step={5} onChange={setK} display={`${k} N m⁻¹`}/><Slider id="spr-lop" label="Limit of proportionality" value={lop} min={2} max={5} step={.5} onChange={v=>{setLop(v);if(elastic<v)setElastic(v)}} display={`${lop} N`}/><Slider id="spr-el" label="Elastic limit" value={elastic} min={lop} max={7} step={.5} onChange={setElastic} display={`${elastic} N`}/></div>
    <Plot label="Force against extension graph"><Axes xLabel="extension / m" yLabel="force / N"/>{r.points.map((p,i)=><circle key={i} cx={sx(p.extensionM,0,maxX)} cy={sy(p.forceN,0,max)} r="4" className={p.region==='proportional'?'pm-point-fill':p.region==='nonlinear-elastic'?'pm-preview-point':'pm-danger-point'}/>)}</Plot>
    <div className="pm-metrics"><Metric label="Estimated k" value={`${r.estimatedSpringConstantNm.toFixed(1)} N m⁻¹`}/><Metric label="Proportional up to" value={`${lop} N`}/><Metric label="Permanent deformation risk" value={`above ${elastic} N`} tone="warn"/></div>
  </LabFrame>;
}

const defaultMotionPoints=(positive=4,negative=-4)=>[{t:0,v:0},{t:4,v:positive},{t:8,v:0},{t:12,v:negative},{t:16,v:0}];
function MotionLab() {
  const [pos,setPos]=useState(4),[neg,setNeg]=useState(-4); const pts=defaultMotionPoints(pos,neg),r=buildVelocityTimeExplorerModel(pts); const X=t=>54+t/16*452,Y=v=>sy(v,-8,8);
  return <LabFrame title="Motion Graph Explorer" intro="On a velocity-time graph, gradient is acceleration. Signed area gives displacement. Total distance is the sum of the magnitudes of the areas when velocity changes sign.">
    <div className="pm-controls-grid"><Slider id="mot-pos" label="Positive peak velocity" value={pos} min={1} max={8} step={.5} onChange={setPos} display={`${pos} m s⁻¹`}/><Slider id="mot-neg" label="Negative peak velocity" value={neg} min={-8} max={-1} step={.5} onChange={setNeg} display={`${neg} m s⁻¹`}/></div>
    <Plot label="Velocity-time graph with positive and negative motion"><Axes xLabel="t / s" yLabel="v / m s⁻¹" zeroY={Y(0)}/><polyline points={pts.map(p=>`${X(p.t)},${Y(p.v)}`).join(' ')} className="pm-motion-line"/>{pts.map((p,i)=><circle key={i} cx={X(p.t)} cy={Y(p.v)} r="5" className="pm-point-fill"/>)}</Plot>
    <div className="pm-metrics"><Metric label="Displacement" value={`${r.displacement.toFixed(1)} m`}/><Metric label="Distance" value={`${r.distance.toFixed(1)} m`}/><Metric label="Direction reversal" value={r.distance>Math.abs(r.displacement)?'Yes':'No'} tone={r.distance>Math.abs(r.displacement)?'warn':'good'}/></div>
  </LabFrame>;
}
function AreaLab() {
  const [pos,setPos]=useState(4),[neg,setNeg]=useState(-4); const pts=defaultMotionPoints(pos,neg),r=buildVelocityAreaComparison(pts); const X=t=>54+t/16*452,Y=v=>sy(v,-8,8),zero=Y(0);
  return <LabFrame title="Velocity-Time Area Builder" intro="Separate the graph into regions above and below the time axis. Below-axis area counts negative for displacement but positive for distance.">
    <div className="pm-controls-grid"><Slider id="area-pos" label="Positive peak" value={pos} min={1} max={8} step={.5} onChange={setPos} display={`${pos} m s⁻¹`}/><Slider id="area-neg" label="Negative peak" value={neg} min={-8} max={-1} step={.5} onChange={setNeg} display={`${neg} m s⁻¹`}/></div>
    <Plot label="Velocity-time graph with signed areas"><Axes xLabel="t / s" yLabel="v" zeroY={zero}/><polygon points={`${X(0)},${zero} ${X(4)},${Y(pos)} ${X(8)},${zero}`} className="pm-area-positive"/><polygon points={`${X(8)},${zero} ${X(12)},${Y(neg)} ${X(16)},${zero}`} className="pm-area-negative"/><polyline points={pts.map(p=>`${X(p.t)},${Y(p.v)}`).join(' ')} className="pm-motion-line"/></Plot>
    <div className="pm-metrics"><Metric label="Positive area" value={`${r.positiveAreaM.toFixed(1)} m`}/><Metric label="Negative area magnitude" value={`${r.negativeAreaMagnitudeM.toFixed(1)} m`}/><Metric label="Displacement" value={`${r.displacementM.toFixed(1)} m`}/><Metric label="Distance" value={`${r.distanceM.toFixed(1)} m`} tone="good"/></div>
  </LabFrame>;
}
function NewtonLab() {
  const [mass,setMass]=useState(2),[right,setRight]=useState(10),[left,setLeft]=useState(4); const r=buildNewtonTrolleyModel({massKg:mass,forcesN:[right,-left]});
  return <LabFrame title="Newton's Laws Lab" intro="Combine all forces on the same body first. Newton's second law uses the resultant force, not one selected force.">
    <div className="pm-controls-grid"><Slider id="new-m" label="Mass" value={mass} min={.5} max={6} step={.5} onChange={setMass} display={`${mass} kg`}/><Slider id="new-r" label="Force right" value={right} min={0} max={20} step={1} onChange={setRight} display={`${right} N`}/><Slider id="new-l" label="Force left" value={left} min={0} max={20} step={1} onChange={setLeft} display={`${left} N`}/></div>
    <Plot label="Trolley with opposing horizontal forces"><rect x="220" y="120" width="120" height="65" rx="10" className="pm-cart"/><circle cx="245" cy="195" r="13" className="pm-wheel"/><circle cx="315" cy="195" r="13" className="pm-wheel"/><line x1="210" y1="150" x2={210-left*6} y2="150" className="pm-vector b"/><line x1="350" y1="150" x2={350+right*6} y2="150" className="pm-vector a"/></Plot>
    <div className="pm-metrics"><Metric label="Resultant force" value={`${r.resultantN.toFixed(1)} N`}/><Metric label="Acceleration" value={`${r.accelerationMPerS2.toFixed(2)} m s⁻²`} tone={r.resultantN===0?'good':''}/><Metric label="State" value={r.state}/></div>
  </LabFrame>;
}
function CollisionLab() {
  const [mode,setMode]=useState('collision'),[m1,setM1]=useState(2),[u1,setU1]=useState(4),[m2,setM2]=useState(3),[u2,setU2]=useState(-1);
  const c=mode==='collision'?stickingCollision({mass1Kg:m1,velocity1MPerS:u1,mass2Kg:m2,velocity2MPerS:u2}):recoilFromRest({projectileMassKg:m1/100,projectileVelocityMPerS:u1*50,launcherMassKg:m2});
  return <LabFrame title="Collision and Recoil Lab" intro="Choose a positive direction before calculating momentum. Opposite directions carry opposite velocity signs.">
    <div className="pm-segmented"><button type="button" className={mode==='collision'?'active':''} onClick={()=>setMode('collision')}>Trolleys stick</button><button type="button" className={mode==='recoil'?'active':''} onClick={()=>setMode('recoil')}>Recoil from rest</button></div>
    <div className="pm-controls-grid"><Slider id="col-m1" label={mode==='collision'?'Mass 1':'Projectile mass ×100'} value={m1} min={.5} max={5} step={.5} onChange={setM1} display={mode==='collision'?`${m1} kg`:`${(m1/100).toFixed(3)} kg`}/><Slider id="col-u1" label={mode==='collision'?'Velocity 1':'Projectile speed ÷50'} value={u1} min={1} max={8} step={.5} onChange={setU1} display={mode==='collision'?`${u1} m s⁻¹`:`${u1*50} m s⁻¹`}/><Slider id="col-m2" label={mode==='collision'?'Mass 2':'Launcher mass'} value={m2} min={1} max={6} step={.5} onChange={setM2} display={`${m2} kg`}/>{mode==='collision'&&<Slider id="col-u2" label="Velocity 2" value={u2} min={-6} max={6} step={.5} onChange={setU2} display={`${u2} m s⁻¹`}/>}</div>
    {mode==='collision'?<div className="pm-metrics"><Metric label="Momentum before" value={`${c.momentumBeforeKgMPerS.toFixed(2)} kg m s⁻¹`}/><Metric label="Shared final velocity" value={`${c.finalVelocityMPerS.toFixed(2)} m s⁻¹`}/><Metric label="Momentum after" value={`${c.momentumAfterKgMPerS.toFixed(2)} kg m s⁻¹`} tone="good"/></div>:<div className="pm-metrics"><Metric label="Projectile momentum" value={`${c.projectileMomentumKgMPerS.toFixed(2)} kg m s⁻¹`}/><Metric label="Launcher recoil velocity" value={`${c.launcherVelocityMPerS.toFixed(2)} m s⁻¹`}/><Metric label="Total after" value={`${c.totalMomentumAfterKgMPerS.toFixed(2)} kg m s⁻¹`} tone="good"/></div>}
  </LabFrame>;
}

function WorkLab() {
  const [force,setForce]=useState(50),[d,setD]=useState(3),[angle,setAngle]=useState(0); const r=buildWorkExplorerModel({forceN:force,displacementM:d,angleDegrees:angle});
  return <LabFrame title="Work Explorer" intro="Only the component of force in the direction of displacement does work on the body.">
    <div className="pm-controls-grid"><Slider id="work-f" label="Force" value={force} min={10} max={100} step={5} onChange={setForce} display={`${force} N`}/><Slider id="work-d" label="Displacement" value={d} min={0} max={8} step={.5} onChange={setD} display={`${d} m`}/><Slider id="work-a" label="Angle between force and displacement" value={angle} min={0} max={90} step={5} onChange={setAngle} display={`${angle}°`}/></div>
    <div className="pm-work-visual"><span className="pm-box">load</span><span className="pm-displacement">displacement →</span><span className="pm-force-label" style={{transform:`rotate(${-angle}deg)`}}>force ↗</span></div>
    <div className="pm-metrics"><Metric label="Parallel fraction" value={r.parallelFraction.toFixed(2)}/><Metric label="Work done" value={`${r.workJ.toFixed(1)} J`} tone="good"/></div>
  </LabFrame>;
}
function EnergyLab() {
  const [mass,setMass]=useState(2),[drop,setDrop]=useState(5),[fallen,setFallen]=useState(2),[loss,setLoss]=useState(0); const available=mass*10*fallen; const safeLoss=Math.min(loss,Math.max(0,available)); const r=buildEnergyConservationModel({massKg:mass,gNPerKg:10,totalDropM:drop,fallenM:Math.min(fallen,drop),dissipatedJ:safeLoss});
  const total=Math.max(r.totalEnergyJ,1),pct=n=>`${Math.max(0,n/total*100)}%`;
  return <LabFrame title="Energy Conservation Lab" intro="Track gravitational, kinetic and non-useful energy. Energy is transferred between forms; it is not destroyed.">
    <div className="pm-controls-grid"><Slider id="en-m" label="Mass" value={mass} min={.5} max={5} step={.5} onChange={setMass} display={`${mass} kg`}/><Slider id="en-h" label="Total height" value={drop} min={2} max={10} step={.5} onChange={v=>{setDrop(v);setFallen(f=>Math.min(f,v))}} display={`${drop} m`}/><Slider id="en-f" label="Distance fallen" value={Math.min(fallen,drop)} min={0} max={drop} step={.25} onChange={setFallen} display={`${Math.min(fallen,drop)} m`}/><Slider id="en-l" label="Energy transferred to non-useful forms" value={safeLoss} min={0} max={Math.max(1,available)} step={5} onChange={setLoss} display={`${safeLoss} J`}/></div>
    <div className="pm-energy-bars"><div><span>GPE</span><i style={{width:pct(r.gravitationalJ)}}></i><b>{r.gravitationalJ.toFixed(0)} J</b></div><div><span>KE</span><i style={{width:pct(r.kineticJ)}}></i><b>{r.kineticJ.toFixed(0)} J</b></div><div><span>Other</span><i style={{width:pct(r.dissipatedJ)}}></i><b>{r.dissipatedJ.toFixed(0)} J</b></div></div>
    <div className="pm-metrics"><Metric label="Total energy tracked" value={`${r.totalEnergyJ.toFixed(0)} J`}/><Metric label="Speed" value={`${r.speedMPerS.toFixed(2)} m s⁻¹`}/></div>
  </LabFrame>;
}
function PowerLab() {
  const [mass,setMass]=useState(50),[height,setHeight]=useState(4),[time,setTime]=useState(5); const r=buildStairPowerModel({massKg:mass,gNPerKg:10,verticalHeightM:height,timeS:time});
  return <LabFrame title="Stair Power Lab" intro="Two people can do the same work but develop different power if they take different times.">
    <div className="pm-controls-grid"><Slider id="pow-m" label="Mass" value={mass} min={30} max={90} step={5} onChange={setMass} display={`${mass} kg`}/><Slider id="pow-h" label="Vertical stair height" value={height} min={1} max={8} step={.5} onChange={setHeight} display={`${height} m`}/><Slider id="pow-t" label="Time" value={time} min={2} max={20} step={.5} onChange={setTime} display={`${time} s`}/></div>
    <div className="pm-metrics"><Metric label="Work against gravity" value={`${r.energyJ.toFixed(0)} J`}/><Metric label="Useful power" value={`${r.powerW.toFixed(0)} W`} tone="good"/></div>
  </LabFrame>;
}
function EfficiencyLab() {
  const [input,setInput]=useState(500),[useful,setUseful]=useState(300),[thermal,setThermal]=useState(150),[sound,setSound]=useState(50); const r=buildEfficiencyModel({inputJ:input,usefulJ:useful,thermalJ:thermal,soundJ:sound});
  return <LabFrame title="Efficiency Flow" intro="Allocate the input between useful and non-useful outputs. Efficiency can equal 100% in an ideal or purpose-specific model, but cannot exceed 100%. Real devices commonly have non-useful transfers.">
    <div className="pm-controls-grid"><Slider id="eff-in" label="Input" value={input} min={100} max={1000} step={50} onChange={setInput} display={`${input} J`}/><Slider id="eff-u" label="Useful output" value={useful} min={0} max={1000} step={25} onChange={setUseful} display={`${useful} J`}/><Slider id="eff-t" label="Thermal output" value={thermal} min={0} max={1000} step={25} onChange={setThermal} display={`${thermal} J`}/><Slider id="eff-s" label="Sound/other" value={sound} min={0} max={500} step={25} onChange={setSound} display={`${sound} J`}/></div>
    <div className="pm-metrics"><Metric label="Output total" value={`${r.outputTotalJ.toFixed(0)} J`}/><Metric label="Energy balance" value={r.conserved?'Conserved':`${r.differenceJ.toFixed(0)} J mismatch`} tone={r.conserved?'good':'warn'}/><Metric label="Efficiency" value={`${r.efficiencyPercent.toFixed(1)}%`} tone={r.physicallyPossible?'good':'danger'}/></div>
  </LabFrame>;
}

function PressureLab() {
  const [force,setForce]=useState(600),[area,setArea]=useState(.02); const r=buildPressureFootprintModel({forceN:force,areaM2:area});
  return <LabFrame title="Pressure Footprint" intro="For the same force, concentrating the force onto a smaller normal contact area produces a larger pressure.">
    <div className="pm-controls-grid"><Slider id="prs-f" label="Normal force" value={force} min={100} max={1200} step={50} onChange={setForce} display={`${force} N`}/><Slider id="prs-a" label="Contact area" value={area} min={.005} max={.08} step={.005} onChange={setArea} display={`${area.toFixed(3)} m²`}/></div>
    <div className="pm-footprint"><div style={{width:`${60+area/.08*220}px`}}></div></div><div className="pm-metrics"><Metric label="Pressure" value={`${r.pressurePa.toFixed(0)} Pa`} tone="good"/></div>
  </LabFrame>;
}
function DepthLab() {
  const [rho,setRho]=useState(1000),[depth,setDepth]=useState(3); const r=buildPressureDepthModel({densityKgM3:rho,gNPerKg:10,depthM:depth});
  return <LabFrame title="Pressure-Depth Tank" intro="Pressure due to a fluid column increases with depth and density, and does not depend on the width or shape of the container.">
    <div className="pm-controls-grid"><Slider id="dep-r" label="Fluid density" value={rho} min={700} max={1400} step={50} onChange={setRho} display={`${rho} kg m⁻³`}/><Slider id="dep-d" label="Sensor depth" value={depth} min={.2} max={6} step={.2} onChange={setDepth} display={`${depth.toFixed(1)} m`}/></div>
    <Plot label="Pressure sensor at adjustable fluid depth"><rect x="120" y="25" width="320" height="220" rx="10" className="pm-tank"/><line x1="120" y1="55" x2="440" y2="55" className="pm-waterline"/><circle cx="300" cy={55+Math.min(depth/6*180,180)} r="12" className="pm-fill-accent"/><line x1="450" y1="55" x2="450" y2={55+Math.min(depth/6*180,180)} className="pm-dimension"/></Plot>
    <div className="pm-metrics"><Metric label="Gauge pressure" value={`${r.gaugePressurePa.toFixed(0)} Pa`} tone="good"/></div>
  </LabFrame>;
}
function HoleJetLab() {
  const [height,setHeight]=useState(1.2); const r=buildHoleJetModel({fluidHeightM:height,holeDepthsM:[height*.2,height*.5,height*.82]});
  return <LabFrame title="Hole-Jet Visualizer" intro="Open holes at different depths. The deeper hole has greater fluid pressure, so its outflow starts faster. The visual is qualitative; CSEC does not require a jet-speed formula here.">
    <Slider id="jet-h" label="Fluid height" value={height} min={.8} max={2} step={.1} onChange={setHeight} display={`${height.toFixed(1)} m`}/>
    <Plot label="Water tank with jets emerging from holes at different depths"><rect x="90" y="30" width="190" height="215" rx="8" className="pm-tank"/><line x1="90" y1="50" x2="280" y2="50" className="pm-waterline"/>{r.holes.map((h,i)=>{const y=50+h.depthM/height*175,reach=60+150*h.relativeExitSpeed;return <g key={i}><circle cx="282" cy={y} r="5" className="pm-point-fill"/><path d={`M282 ${y} Q ${282+reach*.55} ${y+20} ${282+reach} ${Math.min(258,y+60)}`} className="pm-jet"/><text x="105" y={y+5} className="pm-svg-label">{h.depthM.toFixed(2)} m</text></g>})}</Plot>
  </LabFrame>;
}
function BuoyancyLab() {
  const [mass,setMass]=useState(1.6),[vol,setVol]=useState(.002),[rho,setRho]=useState(1000); const r=buildBuoyancyLabModel({objectMassKg:mass,objectVolumeM3:vol,fluidDensityKgM3:rho,gNPerKg:10});
  const y=r.state==='rises'?100:r.state==='neutral'?145:185;
  return <LabFrame title="Buoyancy Lab" intro="Compare weight with the upthrust on a fully immersed object. If it rises and later floats at rest, the submerged volume adjusts until upthrust equals weight.">
    <div className="pm-controls-grid"><Slider id="bu-m" label="Object mass" value={mass} min={.5} max={4} step={.1} onChange={setMass} display={`${mass.toFixed(1)} kg`}/><Slider id="bu-v" label="Object volume" value={vol} min={.0005} max={.004} step={.0001} onChange={setVol} display={`${vol.toFixed(4)} m³`}/><Slider id="bu-r" label="Fluid density" value={rho} min={700} max={1300} step={25} onChange={setRho} display={`${rho} kg m⁻³`}/></div>
    <Plot label="Object immersed in a fluid with upthrust and weight"><rect x="90" y="40" width="380" height="210" rx="10" className="pm-tank"/><line x1="90" y1="75" x2="470" y2="75" className="pm-waterline"/><rect x="235" y={y} width="90" height="60" rx="8" className="pm-fill-accent"/><line x1="280" y1={y+30} x2="280" y2={y-35} className="pm-force-up"/><line x1="280" y1={y+30} x2="280" y2={y+100} className="pm-force-down"/></Plot>
    <div className="pm-metrics"><Metric label="Weight" value={`${r.weightN.toFixed(1)} N`}/><Metric label="Full-immersion upthrust" value={`${r.upthrustN.toFixed(1)} N`}/><Metric label="Initial tendency" value={r.state} tone={r.state==='sinks'?'warn':'good'}/>{r.canFloatAtSurface&&<Metric label="Floating fraction submerged" value={`${(r.fractionSubmergedAtSurface*100).toFixed(0)}%`}/>}</div>
  </LabFrame>;
}
function SubmarineLab() {
  const [dry,setDry]=useState(600),[ballast,setBallast]=useState(200),[volume,setVolume]=useState(.85),[rho,setRho]=useState(1025); const r=buildSubmarineBallastModel({dryMassKg:dry*1000,ballastWaterKg:ballast*1000,displacedVolumeM3:volume*1000,waterDensityKgM3:rho,gNPerKg:10});
  return <LabFrame title="Submarine Ballast" intro="A submarine changes its average density mainly by taking water into or expelling water from ballast tanks while its external displaced volume changes much less.">
    <div className="pm-controls-grid"><Slider id="sub-d" label="Dry mass" value={dry} min={400} max={800} step={20} onChange={setDry} display={`${dry} t`}/><Slider id="sub-b" label="Ballast water" value={ballast} min={0} max={500} step={20} onChange={setBallast} display={`${ballast} t`}/><Slider id="sub-v" label="Displaced volume ×1000" value={volume} min={.65} max={1.1} step={.02} onChange={setVolume} display={`${(volume*1000).toFixed(0)} m³`}/><Slider id="sub-r" label="Water density" value={rho} min={1000} max={1050} step={5} onChange={setRho} display={`${rho} kg m⁻³`}/></div>
    <div className={`pm-submarine ${r.state}`}><div className="pm-sub-body"><div className="pm-ballast" style={{width:`${Math.min(100,ballast/500*100)}%`}}></div></div><span>{r.state === 'neutral' ? 'neutral buoyancy' : r.state}</span></div>
    <div className="pm-metrics"><Metric label="Average density" value={`${r.averageDensityKgM3.toFixed(0)} kg m⁻³`}/><Metric label="Water density" value={`${rho} kg m⁻³`}/><Metric label="State" value={r.state} tone={r.state==='neutral'?'good':r.state==='rises'?'good':'warn'}/></div>
  </LabFrame>;
}

const components = {
  'a1-pendulum': PendulumLab,
  'a1-plot-points': PlotPointsLab,
  'a1-best-fit': BestFitLab,
  'a1-gradient': GradientLab,
  'a1-instruments': InstrumentLab,
  'a1-density': DensityLab,
  'a2-resultant': VectorResultantLab,
  'a2-components': ComponentLab,
  'a3-moment': MomentLab,
  'a3-lever': LeverLab,
  'a3-centre-gravity': CentreGravityLab,
  'a3-stability': StabilityLab,
  'a3-spring': SpringLab,
  'a4-motion': MotionLab,
  'a4-area': AreaLab,
  'a4-newton': NewtonLab,
  'a4-collision': CollisionLab,
  'a5-work': WorkLab,
  'a5-energy': EnergyLab,
  'a5-power': PowerLab,
  'a5-efficiency': EfficiencyLab,
  'a6-pressure': PressureLab,
  'a6-depth': DepthLab,
  'a6-hole-jet': HoleJetLab,
  'a6-buoyancy': BuoyancyLab,
  'a6-submarine': SubmarineLab,
};

export default function MechanicsInteractiveLab({ interactiveId, onEvidence }) {
  const meta=byId.get(interactiveId); const Component=components[interactiveId];
  if(!meta||!Component) return <div className="pm-lab-frame"><strong>Interactive unavailable.</strong></div>;
  const evidence=(payload)=>onEvidence?.({interactiveId:meta.id,topic:meta.topic,...payload});
  return <section className="pm-interactive" data-interactive-id={interactiveId}>
    <div className="pm-interactive-meta"><span>{meta.topic}</span><strong>{meta.title}</strong><em>{meta.objectives.join(' · ')}</em></div>
    <Component onEvidence={evidence}/>
  </section>;
}
