import React, { useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import { WAVES_INTERACTIVES } from '../interactives/cWavesInteractiveRegistry.mjs';
import {
  buildWaveLabModel,
  buildWaveGraphModel,
  buildEchoLabModel,
  buildPitchLoudnessModel,
  buildEMSpectrumModel,
  buildReflectionModel,
  buildRefractionModel,
  buildTIRModel,
  buildDoubleSlitModel,
  buildLensRayModel,
  buildFocalLengthModel
} from '../interactives/cWavesInteractiveModels.mjs';

const fmt = (value, places = 2) => Number(value).toLocaleString(undefined, { maximumFractionDigits: places });
const SUP = {'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const superscript = n => String(n).split('').map(ch => SUP[ch] || ch).join('');
const scientific = (value, places = 1) => {
  if (!Number.isFinite(value) || value === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const coefficient = value / 10 ** exp;
  const shown = Number(coefficient.toFixed(places));
  return exp === 0 ? String(shown) : `${shown} × 10${superscript(exp)}`;
};
const formatLength = metres => {
  const v = Math.abs(metres);
  if (v >= 1) return `${fmt(metres, 2)} m`;
  if (v >= 1e-2) return `${fmt(metres * 100, 2)} cm`;
  if (v >= 1e-3) return `${fmt(metres * 1000, 2)} mm`;
  if (v >= 1e-6) return `${fmt(metres * 1e6, 2)} μm`;
  if (v >= 1e-9) return `${fmt(metres * 1e9, 2)} nm`;
  if (v >= 1e-12) return `${fmt(metres * 1e12, 2)} pm`;
  return `${scientific(metres, 1)} m`;
};
const formatFrequency = hz => {
  const v = Math.abs(hz);
  if (v < 1e3) return `${fmt(hz, 1)} Hz`;
  if (v < 1e6) return `${fmt(hz / 1e3, 2)} kHz`;
  if (v < 1e9) return `${fmt(hz / 1e6, 2)} MHz`;
  if (v < 1e12) return `${fmt(hz / 1e9, 2)} GHz`;
  if (v < 1e15) return `${fmt(hz / 1e12, 2)} THz`;
  return `${scientific(hz, 1)} Hz`;
};

const Range = ({ label, value, setValue, min, max, step = 1, unit = '' }) => {
  const update = e => setValue(Number(e.target.value));
  return (
    <label className="pm-control">
      <span>{label}<output>{value}{unit}</output></span>
      <input
        type="range"
        aria-label={label}
        aria-valuetext={`${value}${unit}`.trim()}
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={update}
        onChange={update}
      />
    </label>
  );
};
const Metrics = ({ items }) => <div className="pm-lab-metrics">{items.map(([label,value]) => <div className="pm-lab-metric" key={label}><span>{label}</span><strong><MathText prose>{String(value)}</MathText></strong></div>)}</div>;
const Shell = ({ meta, children, note }) => <article className="pm-lab-frame waves-lab"><div className="pm-lab-heading"><div className="pm-eyebrow">{meta.topic} interactive</div><h3>{meta.title}</h3><p>{meta.action}</p></div>{children}{note && <p className="pm-feedback"><MathText prose>{note}</MathText></p>}</article>;
const Segment = ({ options, value, setValue }) => <div className="waves-segment">{options.map(option=>{const x=typeof option==='string'?{value:option,label:option}:option;return <button type="button" key={x.value} className={value===x.value?'active':''} onClick={()=>setValue(x.value)}>{x.label}</button>})}</div>;

function wavePath({ mode, frequency, wavelength, amplitude, width=650, height=230 }) {
  const left=62,right=width-24,top=24,bottom=height-48,mid=(top+bottom)/2;
  const ampPx=Math.min((bottom-top)*.45, amplitude/.15*((bottom-top)*.43));
  const domain=mode==='position'?2:1;
  const samples=240;
  return Array.from({length:samples+1},(_,n)=>{
    const q=domain*n/samples;
    const phase=mode==='position' ? 2*Math.PI*q/wavelength : 2*Math.PI*frequency*q;
    const x=left+(right-left)*n/samples;
    const y=mid-Math.sin(phase)*ampPx;
    return `${n?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
}

function WaveBuilder({ meta }) {
  const [frequency,setFrequency]=useState(5),[wavelength,setWavelength]=useState(.4),[type,setType]=useState('transverse');
  const r=useMemo(()=>buildWaveLabModel({frequencyHz:frequency,wavelengthM:wavelength,type}),[frequency,wavelength,type]);
  const path=useMemo(()=>wavePath({mode:'position',frequency,wavelength,amplitude:.08,width:650,height:180}),[frequency,wavelength]);
  const longitudinalParticles=useMemo(()=>{
    const count=72,left=34,right=616,domainM=2,raw=[0];
    for(let i=1;i<count;i+=1){
      const positionM=domainM*(i-.5)/(count-1);
      const gap=1+.62*Math.sin(2*Math.PI*positionM/wavelength);
      raw.push(raw[i-1]+gap);
    }
    const total=raw[raw.length-1]||1;
    return raw.map(value=>left+(right-left)*value/total);
  },[wavelength]);
  return <Shell meta={meta} note="For a wave, v = fλ. Particle vibration is perpendicular to travel for a transverse wave and parallel to travel for a longitudinal wave.">
    <Segment options={[{value:'transverse',label:'Transverse'},{value:'longitudinal',label:'Longitudinal'}]} value={type} setValue={setType}/>
    <div className="pm-controls-grid"><Range label="Frequency" value={frequency} setValue={setFrequency} min={1} max={20} unit=" Hz"/><Range label="Wavelength" value={wavelength} setValue={setWavelength} min={.1} max={2} step={.05} unit=" m"/></div>
    {type==='transverse' ? <svg className="waves-mini-graph" viewBox="0 0 650 180" role="img" aria-label="Transverse wave preview"><line className="wave-axis" x1="62" y1="76" x2="626" y2="76"/><path className="wave-curve" d={path}/><text x="510" y="105">direction of travel →</text></svg> : <svg className="waves-mini-graph" viewBox="0 0 650 180" role="img" aria-label={`Longitudinal wave snapshot at ${frequency} hertz with wavelength ${wavelength} metres. Closer particle spacing shows compressions and wider spacing shows rarefactions.`}>
          <text x="42" y="26">closer spacing = compression</text>
          <text x="362" y="26">wider spacing = rarefaction</text>
          {longitudinalParticles.map((x,i)=><line key={i} x1={x} y1="50" x2={x} y2="112" style={{stroke:'var(--pm-primary)',strokeWidth:3,strokeLinecap:'round'}}/>)}
          <text x="42" y="154">particle vibration left/right</text>
          <text x="250" y="154">{`wavelength = ${fmt(wavelength,2)} m`}</text>
          <text x="420" y="154">{`f = ${frequency} Hz`}</text>
          <text x="530" y="154">travel -&gt;</text>
        </svg>}
    <Metrics items={[["Wave speed",`${fmt(r.speedMps)} m/s`],["Period",`${fmt(r.periodS,3)} s`],["Particle motion",r.particleMotion]]}/>
  </Shell>;
}

function WaveGraphs({ meta }) {
  const [mode,setMode]=useState('position'),[frequency,setFrequency]=useState(3),[wavelength,setWavelength]=useState(.3),[amplitude,setAmplitude]=useState(.06);
  const r=useMemo(()=>buildWaveGraphModel({mode,frequencyHz:frequency,wavelengthM:wavelength,amplitudeM:amplitude}),[mode,frequency,wavelength,amplitude]);
  const path=useMemo(()=>wavePath({mode,frequency,wavelength,amplitude}),[mode,frequency,wavelength,amplitude]);
  const speed=frequency*wavelength;
  const positionMode=mode==='position';
  const xTicks=positionMode
    ? [[62,'0'],[203,'0.5'],[344,'1.0'],[485,'1.5'],[626,'2.0']]
    : [[62,'0'],[203,'0.25'],[344,'0.50'],[485,'0.75'],[626,'1.00']];
  const controlNote=positionMode
    ? 'On a displacement-position graph, wavelength changes the crest spacing and amplitude changes the wave height. Frequency changes the wave speed, but it does not change the spacing in this position snapshot.'
    : 'On a displacement-time graph, frequency changes the number of cycles each second and amplitude changes the wave height. Wavelength changes the wave speed, but it does not change the time spacing.';
  return <Shell meta={meta} note="Read the horizontal axis before naming the spacing. On a displacement-position graph, one cycle gives wavelength. On a displacement-time graph, one cycle gives period.">
    <Segment options={[{value:'position',label:'Displacement-position'},{value:'time',label:'Displacement-time'}]} value={mode} setValue={setMode}/>
    <svg className="waves-graph" viewBox="0 0 650 230" role="img" aria-label={`${positionMode?'Displacement against position':'Displacement against time'} graph`}>
      <line className="wave-grid" x1="62" y1="42" x2="626" y2="42"/><line className="wave-grid" x1="62" y1="92" x2="626" y2="92"/><line className="wave-grid" x1="62" y1="142" x2="626" y2="142"/>
      {xTicks.slice(1,-1).map(([x])=><line key={`grid-${x}`} className="wave-grid" x1={x} y1="24" x2={x} y2="166"/>)}
      <line className="wave-axis" x1="62" y1="92" x2="626" y2="92"/><line className="wave-axis" x1="62" y1="24" x2="62" y2="166"/>
      <path data-testid="wave-curve" className="wave-curve" d={path}/>
      <text className="wave-axis-label wave-axis-label-y" transform="translate(16 103) rotate(-90)" textAnchor="middle">displacement / m</text>
      <text className="wave-axis-label" x="344" y="214" textAnchor="middle">{positionMode?'position / m':'time / s'}</text>
      {xTicks.map(([x,label])=><g key={`tick-${x}`}><line className="wave-tick" x1={x} y1="166" x2={x} y2="172"/><text className="wave-tick-label" x={x} y="188" textAnchor="middle">{label}</text></g>)}
      <line className="wave-tick" x1="56" y1="42" x2="62" y2="42"/><line className="wave-tick" x1="56" y1="92" x2="62" y2="92"/><line className="wave-tick" x1="56" y1="142" x2="62" y2="142"/>
      <text className="wave-tick-label" x="50" y="46" textAnchor="end">+{fmt(amplitude,2)}</text><text className="wave-tick-label" x="50" y="96" textAnchor="end">0</text><text className="wave-tick-label" x="50" y="146" textAnchor="end">−{fmt(amplitude,2)}</text>
    </svg>
    <p className="waves-control-note">{controlNote}</p>
    <div className="pm-controls-grid"><Range label="Frequency" value={frequency} setValue={setFrequency} min={1} max={10} unit=" Hz"/><Range label="Wavelength" value={wavelength} setValue={setWavelength} min={.1} max={1} step={.05} unit=" m"/><Range label="Amplitude" value={amplitude} setValue={setAmplitude} min={.02} max={.15} step={.01} unit=" m"/></div>
    <Metrics items={[[positionMode?"Wavelength":"Period",`${fmt(r.horizontalValue,3)} ${positionMode?'m':'s'}`],["Amplitude",`${fmt(amplitude,2)} m`],["Wave speed",`${fmt(speed,2)} m/s`]]}/>
  </Shell>;
}

function Echo({ meta }) { const [time,setTime]=useState(.5),[speed,setSpeed]=useState(340); const r=useMemo(()=>buildEchoLabModel({speedMps:speed,timeS:time}),[speed,time]); return <Shell meta={meta} note="The measured echo time covers the outward and return journeys, so one-way distance = vt/2."><div className="pm-controls-grid"><Range label="Echo return time" value={time} setValue={setTime} min={.1} max={2} step={.05} unit=" s"/><Range label="Wave speed" value={speed} setValue={setSpeed} min={300} max={1600} step={10} unit=" m/s"/></div><div className="waves-echo"><span>source</span><i/><span>reflector</span></div><Metrics items={[["Round-trip path",`${fmt(r.totalPathM)} m`],["Distance to reflector",`${fmt(r.distanceM)} m`]]}/></Shell>; }

function Pitch({ meta }) {
  const [frequency,setFrequency]=useState(440),[amplitude,setAmplitude]=useState(.5);
  const r=useMemo(()=>buildPitchLoudnessModel({frequencyHz:frequency,amplitude}),[frequency,amplitude]);
  const path=useMemo(()=>wavePath({mode:'time',frequency:Math.max(1,frequency/180),wavelength:.3,amplitude:.02+.13*amplitude,width:650,height:180}),[frequency,amplitude]);
  return <Shell meta={meta} note="Pitch depends on frequency. Loudness depends mainly on amplitude. The controls change the trace independently so you can compare the two effects.">
    <div className="pm-controls-grid"><Range label="Frequency" value={frequency} setValue={setFrequency} min={100} max={1200} step={10} unit=" Hz"/><Range label="Amplitude" value={amplitude} setValue={setAmplitude} min={.1} max={1} step={.05}/></div>
    <svg className="waves-mini-graph" viewBox="0 0 650 180" role="img" aria-label="Sound wave trace"><line className="wave-axis" x1="62" y1="76" x2="626" y2="76"/><path data-testid="pitch-wave-curve" className="wave-curve" d={path}/><text x="510" y="108">time →</text></svg>
    <Metrics items={[["Pitch",r.pitchLabel],["Loudness",r.loudnessLabel],["Frequency",`${frequency} Hz`]]}/>
  </Shell>;
}

function EM({ meta }) {
  const [index,setIndex]=useState(3);
  const r=useMemo(()=>buildEMSpectrumModel({index}),[index]);
  return <Shell meta={meta} note="All electromagnetic waves travel at 3 × 10⁸ m/s in a vacuum. Across the spectrum, increasing frequency means decreasing wavelength.">
    <Range label="Spectrum region" value={index} setValue={setIndex} min={0} max={6} step={1}/>
    <div className="waves-spectrum" role="group" aria-label="Electromagnetic spectrum regions">{r.order.map((x,n)=><button type="button" className={n===r.index?'active':''} aria-pressed={n===r.index} onClick={()=>setIndex(n)} key={x}>{x}</button>)}</div>
    <Metrics items={[["Region",r.region],["Wavelength",formatLength(r.wavelengthM)],["Frequency",formatFrequency(r.frequencyHz)],["Typical use",r.use]]}/>
    <p className="waves-readable-note">Equivalent in metres: <MathText>{`${scientific(r.wavelengthM,1)} m`}</MathText>. The shorter unit above is usually easier to read first.</p>
  </Shell>;
}

function Reflection({ meta }) { const [incidence,setIncidence]=useState(35); const r=useMemo(()=>buildReflectionModel({incidenceDeg:incidence}),[incidence]); return <Shell meta={meta} note="Angles of incidence and reflection are measured from the normal, not from the mirror surface."><Range label="Angle of incidence" value={incidence} setValue={setIncidence} min={0} max={80} unit="°"/><div className="waves-rays reflection" role="img" aria-label="Incident and reflected rays with normal"><span className="normal"/><span className="ray in" style={{transform:`rotate(${-incidence}deg)`}}/><span className="ray out" style={{transform:`rotate(${incidence}deg)`}}/></div><Metrics items={[["Angle of incidence",`${r.incidenceDeg}°`],["Angle of reflection",`${r.reflectionDeg}°`],["Angle to mirror surface",`${r.fromSurfaceDeg}°`]]}/></Shell>; }
function Refraction({ meta }) { const [incidence,setIncidence]=useState(45),[n,setN]=useState(1.5); const r=useMemo(()=>buildRefractionModel({incidenceDeg:incidence,refractiveIndex:n}),[incidence,n]); return <Shell meta={meta} note="For air into the material, n = sin i / sin r. Frequency remains unchanged, while speed and wavelength change."><div className="pm-controls-grid"><Range label="Angle of incidence" value={incidence} setValue={setIncidence} min={5} max={80} unit="°"/><Range label="Refractive index" value={n} setValue={setN} min={1.1} max={2.2} step={.05}/></div><div className="waves-refraction" role="img" aria-label="Ray bends toward normal entering optically denser medium"><span className="normal"/><span className="boundary"/><span className="ray incident" style={{transform:`rotate(${-incidence}deg)`}}/><span className="ray refracted" style={{transform:`rotate(${r.refractionDeg}deg)`}}/></div><Metrics items={[["Angle of refraction",`${fmt(r.refractionDeg,1)}°`],["Speed in material",`${fmt(r.speedMps/1e8,2)} × 10⁸ m/s`],["Calculated n",fmt(r.checkN,3)]]}/></Shell>; }
function TIR({ meta }) { const [n,setN]=useState(1.5),[incidence,setIncidence]=useState(50); const r=useMemo(()=>buildTIRModel({refractiveIndex:n,incidenceDeg:incidence}),[n,incidence]); return <Shell meta={meta} note="Total internal reflection occurs only when light travels from higher to lower refractive index and the angle of incidence is greater than the critical angle."><div className="pm-controls-grid"><Range label="Refractive index" value={n} setValue={setN} min={1.1} max={2.2} step={.05}/><Range label="Internal incidence" value={incidence} setValue={setIncidence} min={5} max={85} unit="°"/></div><div className={`waves-tir ${r.state.includes('total')?'active':''}`}><strong>{r.state}</strong></div><Metrics items={[["Critical angle",`${fmt(r.criticalAngleDeg,1)}°`],["Angle of incidence",`${fmt(incidence,1)}°`],["Result",r.state]]}/></Shell>; }

function wavelengthColour(nm) {
  const t=Math.max(0,Math.min(1,(nm-400)/300));
  return `hsl(${Math.round(270-270*t)} 85% 55%)`;
}
function DoubleSlit({ meta }) {
  const [wavelength,setWavelength]=useState(600),[spacing,setSpacing]=useState(.3),[distance,setDistance]=useState(2);
  const r=useMemo(()=>buildDoubleSlitModel({wavelengthNm:wavelength,slitSpacingMm:spacing,screenDistanceM:distance}),[wavelength,spacing,distance]);
  const fringePx=Math.max(8,Math.min(72,r.fringeSpacingM*1000*9));
  const bands=Array.from({length:21},(_,n)=>n-10);
  return <Shell meta={meta} note="Young's double-slit experiment gives equally spaced bright and dark fringes. For small angles, fringe spacing x = λL/d.">
    <div className="pm-controls-grid"><Range label="Wavelength" value={wavelength} setValue={setWavelength} min={400} max={700} step={10} unit=" nm"/><Range label="Slit spacing" value={spacing} setValue={setSpacing} min={.1} max={.8} step={.05} unit=" mm"/><Range label="Screen distance" value={distance} setValue={setDistance} min={.5} max={4} step={.1} unit=" m"/></div>
    <div className="waves-double-slit-setup"><div className="waves-slit-card"><span/><span/></div><div className="waves-fringe-screen" style={{'--fringe-colour':wavelengthColour(wavelength)}}>{bands.map(n=><i key={n} style={{left:`calc(50% + ${n*fringePx}px)`,opacity:Math.abs(n)%2===0?1:.35}}/> )}</div></div>
    <Metrics items={[["Fringe spacing",`${fmt(r.fringeSpacingM*1000,2)} mm`],["Central fringe","bright"],["Effect of smaller slit spacing","fringes spread farther apart"]]}/>
  </Shell>;
}

function Lens({ meta }) {
  const [focalLength,setFocalLength]=useState(10),[objectDistance,setObjectDistance]=useState(30);
  const r=useMemo(()=>buildLensRayModel({focalLengthCm:focalLength,objectDistanceCm:objectDistance}),[focalLength,objectDistance]);
  const lensX=330, scale=4.2, objectX=Math.max(44,lensX-objectDistance*scale), imageX=r.imageDistanceCm?Math.min(620,lensX+r.imageDistanceCm*scale):Math.max(30,lensX-20*scale);
  const magnification=r.magnification||1, objectTop=70, base=150, imageTop=r.imageType==='real'?base+(base-objectTop)*Math.min(2,magnification):base-(base-objectTop)*Math.min(2,magnification);
  return <Shell meta={meta} note="For a converging lens, an object beyond the focal point forms a real image. An object inside the focal length forms a virtual, upright and magnified image.">
    <div className="pm-controls-grid"><Range label="Focal length" value={focalLength} setValue={setFocalLength} min={5} max={20} unit=" cm"/><Range label="Object distance" value={objectDistance} setValue={setObjectDistance} min={4} max={60} unit=" cm"/></div>
    <svg className="waves-lens-svg" viewBox="0 0 660 220" role="img" aria-label="Converging lens ray model"><line className="wave-axis" x1="20" y1="150" x2="640" y2="150"/><line className="lens-line" x1={lensX} y1="28" x2={lensX} y2="192"/><circle cx={lensX-focalLength*scale} cy="150" r="4"/><circle cx={lensX+focalLength*scale} cy="150" r="4"/><text x={lensX-focalLength*scale-8} y="176">F</text><text x={lensX+focalLength*scale-8} y="176">F</text><line className="object-arrow" x1={objectX} y1={base} x2={objectX} y2={objectTop}/><path className="ray-path" d={`M${objectX} ${objectTop} L${lensX} ${objectTop} L${imageX} ${imageTop}`}/><path className="ray-path secondary" d={`M${objectX} ${objectTop} L${lensX} 150 L${imageX} ${imageTop}`}/><line className={`image-arrow ${r.imageType}`} x1={imageX} y1={base} x2={imageX} y2={imageTop}/><text x="286" y="22">converging lens</text></svg>
    <Metrics items={[["Image type",r.imageType],["Image distance",r.imageDistanceCm?`${fmt(r.imageDistanceCm,1)} cm`:'virtual image'],["Magnification",r.magnification?fmt(r.magnification,2):'greater than 1 in this region']]}/>
  </Shell>;
}
function Focal({ meta }) { const [u,setU]=useState(30),[v,setV]=useState(60); const r=useMemo(()=>buildFocalLengthModel({objectDistanceCm:u,imageDistanceCm:v}),[u,v]); return <Shell meta={meta} note="Measure u and v from the optical centre after obtaining a sharp image. Repeat with several object positions and compare the calculated focal lengths."><div className="pm-controls-grid"><Range label="Object distance u" value={u} setValue={setU} min={15} max={80} unit=" cm"/><Range label="Image distance v" value={v} setValue={setV} min={15} max={100} unit=" cm"/></div><Metrics items={[["Focal length",`${fmt(r.focalLengthCm,2)} cm`],["Magnification",fmt(r.magnification,2)],["Relationship","1/f = 1/u + 1/v"]]}/></Shell>; }

const MAP = {
  'c1-wave-builder': WaveBuilder,
  'c1-wave-graphs': WaveGraphs,
  'c2-echo-ranging': Echo,
  'c2-pitch-loudness': Pitch,
  'c3-em-spectrum': EM,
  'c4-reflection': Reflection,
  'c4-refraction': Refraction,
  'c4-total-internal-reflection': TIR,
  'c4-double-slit': DoubleSlit,
  'c5-lens-rays': Lens,
  'c5-focal-length': Focal
};
export default function WavesInteractiveLab({ interactiveId }) {
  const meta=WAVES_INTERACTIVES.find(item=>item.id===interactiveId);
  if(!meta)return <div className="pm-empty">Interactive not found.</div>;
  const Component=MAP[interactiveId];
  return Component?<Component meta={meta}/>:<div className="pm-empty">Interactive implementation unavailable.</div>;
}
