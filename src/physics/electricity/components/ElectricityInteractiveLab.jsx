import React, { useMemo, useState } from 'react';
import MathText from '../../../practice/MathText';
import { ELECTRICITY_INTERACTIVES } from '../interactives/dElectricityInteractiveRegistry.mjs';
import {
  buildChargeTransferModel,
  buildElectrostaticInductionModel,
  buildChargeModel,
  buildACModel,
  buildPowerModel,
  buildOhmModel,
  buildNetworkModel,
  buildSafetyModel,
  buildCellRechargeModel,
  buildRectifierModel,
  buildLogicModel,
  buildTechnologyImpactModel,
  buildMagnetModel,
  buildCurrentFieldModel,
  buildMotorModel,
  buildInductionModel,
  buildTransformerModel
} from '../interactives/dElectricityInteractiveModels.mjs';

const Range = ({ label, value, setValue, min, max, step = 1, unit = '' }) => (
  <label className="pm-control">
    <span>{label}<output>{value}{unit}</output></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))} />
  </label>
);

const Metrics = ({ items }) => (
  <div className="pm-lab-metrics">
    {items.map(([label, value]) => (
      <div className="pm-lab-metric" key={label}>
        <span>{label}</span>
        <strong><MathText prose>{String(value)}</MathText></strong>
      </div>
    ))}
  </div>
);

const Shell = ({ meta, children, note }) => (
  <article className="pm-lab-frame electricity-lab">
    <div className="pm-lab-heading">
      <div className="pm-eyebrow">{meta.topic} interactive</div>
      <h3>{meta.title}</h3>
      <p>{meta.action}</p>
    </div>
    {children}
    {note && <p className="pm-feedback"><MathText prose>{note}</MathText></p>}
  </article>
);

const Toggle = ({ options, value, setValue }) => (
  <div className="electric-toggle">
    {options.map(option => {
      const item = typeof option === 'string' ? { value: option, label: option } : option;
      return <button type="button" key={item.value} className={value === item.value ? 'active' : ''} onClick={() => setValue(item.value)}>{item.label}</button>;
    })}
  </div>
);

function ChargeTransfer({ meta }) {
  const [electrons, setElectrons] = useState(3);
  const [direction, setDirection] = useState('toRod');
  const [testCharge, setTestCharge] = useState('negative');
  const r = useMemo(() => buildChargeTransferModel({ electrons, direction, testCharge }), [electrons, direction, testCharge]);
  return <Shell meta={meta} note="Only electrons are transferred in ordinary electrostatic charging. The material that gains electrons becomes negative.">
    <Toggle options={[{value:'toRod',label:'Electrons move to rod'},{value:'toCloth',label:'Electrons move to cloth'}]} value={direction} setValue={setDirection}/>
    <div className="pm-controls-grid"><Range label="Electrons transferred" value={electrons} setValue={setElectrons} min={1} max={8}/></div>
    <div className="electric-charge-demo" role="img" aria-label={`Rod is ${r.rodSign}; cloth is ${r.clothSign}`}>
      <div><strong>Rod</strong><span className={`charge-badge ${r.rodSign}`}>{r.rodCharge > 0 ? '+' : '−'}</span><small>{r.rodSign}</small></div>
      <span className="electric-transfer-arrow">{direction === 'toRod' ? '← e⁻' : 'e⁻ →'}</span>
      <div><strong>Cloth</strong><span className={`charge-badge ${r.clothSign}`}>{r.clothCharge > 0 ? '+' : '−'}</span><small>{r.clothSign}</small></div>
    </div>
    <Toggle options={['negative','positive'].map(x=>({value:x,label:`Test charge: ${x}`}))} value={testCharge} setValue={setTestCharge}/>
    <Metrics items={[["Rod charge",r.rodSign],["Cloth charge",r.clothSign],["Test interaction",r.interaction]]}/>
  </Shell>;
}

function ElectrostaticInduction({ meta }) {
  const [rodSign, setRodSign] = useState('negative');
  const [stage, setStage] = useState('separated');
  const r = useMemo(() => buildElectrostaticInductionModel({ rodSign, stage }), [rodSign, stage]);
  return <Shell meta={meta} note="For charging by induction, remove the Earth connection before removing the charged rod.">
    <Toggle options={[{value:'negative',label:'Negative rod'},{value:'positive',label:'Positive rod'}]} value={rodSign} setValue={setRodSign}/>
    <Toggle options={[
      {value:'separated',label:'1. Bring rod near'},
      {value:'earthed',label:'2. Earth conductor'},
      {value:'earth-removed',label:'3. Remove Earth'},
      {value:'rod-removed',label:'4. Remove rod'}
    ]} value={stage} setValue={setStage}/>
    <div className="electric-induction-demo">
      <span className={`charge-badge ${r.rodSign}`}>{r.rodSign === 'negative' ? '−' : '+'}</span>
      <div className="electric-conductor"><b>{r.nearSign === 'positive' ? '+' : '−'}</b><b>{r.farSign === 'positive' ? '+' : '−'}</b></div>
      {r.earthed && <span className="electric-earth">⏚ Earth</span>}
    </div>
    <Metrics items={[["Near side",r.nearSign],["Far side",r.farSign],["Net charge",r.conductorCharge],["What happens",r.instruction]]}/>
  </Shell>;
}

function Charge({ meta }) {
  const [i, setI] = useState(2);
  const [t, setT] = useState(30);
  const r = useMemo(() => buildChargeModel({ currentA: i, timeS: t }), [i, t]);
  return <Shell meta={meta} note="Q = It. Conventional current is opposite to electron drift in a metallic conductor.">
    <div className="pm-controls-grid"><Range label="Current" value={i} setValue={setI} min={.1} max={5} step={.1} unit=" A"/><Range label="Time" value={t} setValue={setT} min={1} max={120} unit=" s"/></div>
    <Metrics items={[["Charge transferred",`${r.chargeC.toFixed(1)} C`],["Conventional current","positive to negative externally"],["Electron drift","opposite to conventional current"]]}/>
  </Shell>;
}

function AC({ meta }) {
  const [period, setPeriod] = useState(.02);
  const [peak, setPeak] = useState(120);
  const r = useMemo(() => buildACModel({ periodS: period, peakV: peak }), [period, peak]);
  const path = useMemo(() => {
    const width=620,height=220,left=48,right=600,mid=100,scale=70/240*peak;
    const total=right-left, cycles=Math.min(8,Math.max(1,total/(period*18000)));
    const pts=Array.from({length:181},(_,n)=>{const x=left+total*n/180;const y=mid-Math.sin(2*Math.PI*cycles*n/180)*scale;return `${n?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;});
    return pts.join(' ');
  },[period,peak]);
  return <Shell meta={meta} note="Frequency and period are reciprocals: f = 1/T. A.C. reverses direction repeatedly.">
    <div className="pm-controls-grid"><Range label="Period" value={period} setValue={setPeriod} min={.01} max={.1} step={.005} unit=" s"/><Range label="Peak voltage" value={peak} setValue={setPeak} min={10} max={240} unit=" V"/></div>
    <svg className="electric-graph" viewBox="0 0 640 220" role="img" aria-label="Alternating voltage against time graph">
      <line className="electric-axis" x1="48" y1="100" x2="610" y2="100"/><line className="electric-axis" x1="48" y1="20" x2="48" y2="184"/>
      <path data-testid="ac-wave-path" className="electric-curve" d={path}/>
      <text x="535" y="126">time / s</text><text x="12" y="22">voltage / V</text><text x="12" y="104">0</text>
    </svg>
    <Metrics items={[["Frequency",`${r.frequencyHz.toFixed(1)} Hz`],["Peak voltage",`${peak} V`],["Supply","alternating"]]}/>
  </Shell>;
}

function Power({ meta }) { const [v,setV]=useState(12),[i,setI]=useState(2),[t,setT]=useState(60); const r=useMemo(()=>buildPowerModel({voltageV:v,currentA:i,timeS:t}),[v,i,t]); return <Shell meta={meta} note="P = IV and E = Pt."><div className="pm-controls-grid"><Range label="Voltage" value={v} setValue={setV} min={1} max={240} unit=" V"/><Range label="Current" value={i} setValue={setI} min={.1} max={10} step={.1} unit=" A"/><Range label="Time" value={t} setValue={setT} min={1} max={300} unit=" s"/></div><Metrics items={[["Power",`${r.powerW.toFixed(1)} W`],["Electrical energy",`${r.energyJ.toFixed(0)} J`]]}/></Shell>; }
function Ohm({ meta }) { const [v,setV]=useState(6),[R,setR]=useState(12); const r=useMemo(()=>buildOhmModel({voltageV:v,resistanceOhm:R}),[v,R]); return <Shell meta={meta} note="For an ohmic conductor at constant temperature, potential difference is directly proportional to current."><div className="pm-controls-grid"><Range label="Potential difference" value={v} setValue={setV} min={1} max={24} unit=" V"/><Range label="Resistance" value={R} setValue={setR} min={1} max={50} unit=" Ω"/></div><Metrics items={[["Current",`${r.currentA.toFixed(2)} A`],["Ammeter","connected in series"],["Voltmeter","connected in parallel"]]}/></Shell>; }
function Network({ meta }) { const [r1,setR1]=useState(6),[r2,setR2]=useState(3),[mode,setMode]=useState('parallel'); const r=useMemo(()=>buildNetworkModel({r1,r2,mode}),[r1,r2,mode]); return <Shell meta={meta} note={mode==='series'?'For series resistors, R = R₁ + R₂.':'For parallel resistors, 1/R = 1/R₁ + 1/R₂.'}><Toggle options={['series','parallel']} value={mode} setValue={setMode}/><div className="pm-controls-grid"><Range label="R₁" value={r1} setValue={setR1} min={1} max={20} unit=" Ω"/><Range label="R₂" value={r2} setValue={setR2} min={1} max={20} unit=" Ω"/></div><Metrics items={[["Equivalent resistance",`${r.equivalentOhm.toFixed(2)} Ω`],["Connection",mode]]}/></Shell>; }
function Safety({ meta }) { const [p,setP]=useState(1200),[v,setV]=useState(120); const r=useMemo(()=>buildSafetyModel({powerW:p,voltageV:v}),[p,v]); const fuse=[3,5,10,13,15,20,30].find(x=>x>r.currentA)||30; return <Shell meta={meta} note="Choose a fuse or breaker rating just above the appliance's normal operating current."><div className="pm-controls-grid"><Range label="Power" value={p} setValue={setP} min={100} max={3000} step={100} unit=" W"/><Range label="Supply voltage" value={v} setValue={setV} min={100} max={240} step={10} unit=" V"/></div><Metrics items={[["Operating current",`${r.currentA.toFixed(2)} A`],["Suitable fuse",`${fuse} A`],["Earth wire","provides a low-resistance path for fault current"]]}/></Shell>; }

function CellRecharge({ meta }) {
  const [cellType,setCellType]=useState('secondary');
  const [polarity,setPolarity]=useState('correct');
  const r=useMemo(()=>buildCellRechargeModel({cellType,polarity}),[cellType,polarity]);
  return <Shell meta={meta} note="Primary cells are intended for one discharge cycle. Secondary cells are designed for repeated charging and discharging.">
    <Toggle options={[{value:'primary',label:'Primary cell'},{value:'secondary',label:'Secondary cell'}]} value={cellType} setValue={setCellType}/>
    <Toggle options={[{value:'correct',label:'Correct charger polarity'},{value:'reversed',label:'Reversed charger polarity'}]} value={polarity} setValue={setPolarity}/>
    <div className={`electric-cell-demo ${r.safeToRecharge?'safe':'unsafe'}`}><strong>{r.safeToRecharge?'Recharge condition suitable':'Do not recharge in this condition'}</strong><span>{r.result}</span></div>
    <Metrics items={[["Rechargeable",r.rechargeable?'yes':'no'],["Polarity",polarity],["Result",r.result]]}/>
  </Shell>;
}

function Rectifier({ meta }) {
  const [orientation,setOrientation]=useState('positive');
  const inputPath = useMemo(()=>Array.from({length:161},(_,n)=>{const x=40+n*3.45;const y=100-Math.sin(n/160*6*Math.PI)*55;return `${n?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`}).join(' '),[]);
  const outputPath = useMemo(()=>Array.from({length:161},(_,n)=>{const x=40+n*3.45;const input=Math.sin(n/160*6*Math.PI);const value=buildRectifierModel({input,orientation}).output;const y=100-value*55;return `${n?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`}).join(' '),[orientation]);
  return <Shell meta={meta} note="A diode conducts mainly in one direction. Half-wave rectification allows one half of the a.c. cycle through the load.">
    <Toggle options={[{value:'positive',label:'Diode passes positive half-cycle'},{value:'negative',label:'Diode reversed'}]} value={orientation} setValue={setOrientation}/>
    <div className="electric-graph-pair">
      <div><strong>A.C. input</strong><svg className="electric-graph compact" viewBox="0 0 640 180"><line className="electric-axis" x1="40" y1="100" x2="600" y2="100"/><path className="electric-curve" d={inputPath}/><text x="520" y="130">time</text></svg></div>
      <div><strong>Rectified output</strong><svg className="electric-graph compact" viewBox="0 0 640 180"><line className="electric-axis" x1="40" y1="100" x2="600" y2="100"/><path data-testid="rectifier-output" className="electric-curve" d={outputPath}/><text x="520" y="130">time</text></svg></div>
    </div>
    <Metrics items={[["Output","pulsating d.c."],["Diode direction",orientation]]}/>
  </Shell>;
}

function Logic({ meta }) { const [gate,setGate]=useState('AND'),[a,setA]=useState(1),[b,setB]=useState(1); const r=useMemo(()=>buildLogicModel({gate,a,b}),[gate,a,b]); return <Shell meta={meta}><Toggle options={['AND','OR','NOT','NAND','NOR']} value={gate} setValue={setGate}/><div className="electric-bits"><button type="button" onClick={()=>setA(1-a)}>A = {a}</button>{gate!=='NOT'&&<button type="button" onClick={()=>setB(1-b)}>B = {b}</button>}</div><Metrics items={[["Output",r.output],["Gate",gate]]}/></Shell>; }

function TechnologyImpact({ meta }) {
  const [benefit,setBenefit]=useState('');
  const [risk,setRisk]=useState('');
  const r=useMemo(()=>buildTechnologyImpactModel({benefit,risk}),[benefit,risk]);
  const benefits=['faster communication','improved medical diagnosis','automation of repetitive work'];
  const risks=['electronic waste','loss of privacy','job displacement'];
  return <Shell meta={meta} note="A balanced response states a benefit, a disadvantage and a clear link to people or the environment.">
    <div className="electric-impact-grid"><div><strong>Choose a benefit</strong><Toggle options={benefits} value={benefit} setValue={setBenefit}/></div><div><strong>Choose a concern</strong><Toggle options={risks} value={risk} setValue={setRisk}/></div></div>
    <div className={`electric-impact-response ${r.balanced?'ready':''}`}>{r.balanced?`Electronic technology can provide ${benefit}, but it can also contribute to ${risk}. A good evaluation considers both effects and the steps used to reduce the disadvantage.`:'Choose one benefit and one concern to build a balanced CSEC-style point.'}</div>
  </Shell>;
}

function Magnet({ meta }) { const [a,setA]=useState('N'),[b,setB]=useState('S'); const r=useMemo(()=>buildMagnetModel({poleA:a,poleB:b}),[a,b]); return <Shell meta={meta} note="Like poles repel and unlike poles attract. Outside a magnet, magnetic field direction is from N to S."><div className="electric-magnets"><button type="button" onClick={()=>setA(a==='N'?'S':'N')}>{a}</button><span>↔</span><button type="button" onClick={()=>setB(b==='N'?'S':'N')}>{b}</button></div><Metrics items={[["Force",r.force],["Certain test of magnetism","repulsion"]]}/></Shell>; }

function CurrentField({ meta }) {
  const [currentDirection,setCurrentDirection]=useState('up');
  const [turns,setTurns]=useState(120);
  const r=useMemo(()=>buildCurrentFieldModel({currentDirection,turns}),[currentDirection,turns]);
  const clockwise=currentDirection==='down';
  return <Shell meta={meta} note="Use the right-hand grip rule. Thumb points in the conventional-current direction; curled fingers show the magnetic-field direction around a straight conductor.">
    <Toggle options={[{value:'up',label:'Current upward'},{value:'down',label:'Current downward'}]} value={currentDirection} setValue={setCurrentDirection}/>
    <div className="pm-controls-grid"><Range label="Solenoid turns" value={turns} setValue={setTurns} min={40} max={240} step={20}/></div>
    <div className="electric-field-layout">
      <svg className="electric-field-svg" viewBox="0 0 300 220" role="img" aria-label={`Field is ${r.fieldSense} around the straight conductor`}>
        <circle cx="150" cy="110" r="70" className="electric-field-line"/><circle cx="150" cy="110" r="45" className="electric-field-line"/>
        <circle cx="150" cy="110" r="17" className="electric-conductor-core"/>
        <text x="145" y="116" textAnchor="middle">{currentDirection==='up'?'•':'×'}</text>
        <path className="electric-field-arrow" d={clockwise?'M205 66 l10 2 -6 8':'M95 66 l-10 2 6 8'}/>
        <text x="87" y="205">view along conductor</text>
      </svg>
      <div className="electric-solenoid" style={{'--field-strength':Math.min(1.8,r.relativeFieldStrength)}}>
        <span className="pole">{r.solenoidLeftPole}</span><div>{Array.from({length:8},(_,i)=><i key={i}/>)}</div><span className="pole">{r.solenoidRightPole}</span>
      </div>
    </div>
    <Metrics items={[["Field around conductor",r.fieldSense],["Solenoid left end",r.solenoidLeftPole],["Solenoid right end",r.solenoidRightPole],["Relative field strength",r.relativeFieldStrength.toFixed(2)]]}/>
  </Shell>;
}

function Motor({ meta }) { const [B,setB]=useState(.2),[i,setI]=useState(3),[L,setL]=useState(.1); const r=useMemo(()=>buildMotorModel({fieldT:B,currentA:i,lengthM:L}),[B,i,L]); return <Shell meta={meta} note="Fleming's left-hand rule gives the force direction: first finger field, second finger current, thumb motion."><div className="pm-controls-grid"><Range label="Magnetic flux density" value={B} setValue={setB} min={.05} max={1} step={.05} unit=" T"/><Range label="Current" value={i} setValue={setI} min={.5} max={10} step={.5} unit=" A"/><Range label="Length in field" value={L} setValue={setL} min={.05} max={.5} step={.05} unit=" m"/></div><Metrics items={[["Relative force index",r.forceIndex.toFixed(3)],["To increase force","increase B, I or conductor length in the field"]]}/></Shell>; }
function Induction({ meta }) { const [B,setB]=useState(.4),[speed,setSpeed]=useState(5); const r=useMemo(()=>buildInductionModel({fieldT:B,lengthM:.2,speedMps:speed}),[B,speed]); return <Shell meta={meta} note="A greater rate of change of magnetic flux linkage gives a larger induced e.m.f."><div className="pm-controls-grid"><Range label="Magnetic flux density" value={B} setValue={setB} min={.1} max={1} step={.1} unit=" T"/><Range label="Speed" value={speed} setValue={setSpeed} min={.5} max={10} step={.5} unit=" m/s"/></div><Metrics items={[["Relative e.m.f. index",r.emfIndex.toFixed(3)],["Direction rule","Fleming's right-hand rule"]]}/></Shell>; }
function Transformer({ meta }) { const [vp,setVp]=useState(240),[np,setNp]=useState(200),[ns,setNs]=useState(50); const r=useMemo(()=>buildTransformerModel({primaryV:vp,primaryTurns:np,secondaryTurns:ns,primaryCurrentA:2}),[vp,np,ns]); return <Shell meta={meta} note="For an ideal transformer, Vs/Vp = Ns/Np and input power equals output power."><div className="pm-controls-grid"><Range label="Primary voltage" value={vp} setValue={setVp} min={20} max={240} step={10} unit=" V"/><Range label="Primary turns" value={np} setValue={setNp} min={50} max={500} step={10}/><Range label="Secondary turns" value={ns} setValue={setNs} min={20} max={500} step={10}/></div><Metrics items={[["Secondary voltage",`${r.secondaryV.toFixed(1)} V`],["Ideal secondary current",`${r.secondaryCurrentA.toFixed(2)} A`],["Transformer type",r.secondaryV>vp?'step-up':r.secondaryV<vp?'step-down':'1:1'] ]}/></Shell>; }

const MAP = {
  'd1-charge-transfer': ChargeTransfer,
  'd1-induction-field': ElectrostaticInduction,
  'd2-charge-current': Charge,
  'd2-ac-waveform': AC,
  'd3-power-energy': Power,
  'd4-ohms-law': Ohm,
  'd4-series-parallel': Network,
  'd4-domestic-safety': Safety,
  'd4-cell-recharge': CellRecharge,
  'd5-diode-rectifier': Rectifier,
  'd5-logic-gates': Logic,
  'd5-technology-impact': TechnologyImpact,
  'd6-magnetic-fields': Magnet,
  'd7-current-field': CurrentField,
  'd7-motor-effect': Motor,
  'd7-induction-generator': Induction,
  'd7-transformer': Transformer
};

export default function ElectricityInteractiveLab({ interactiveId }) {
  const meta = ELECTRICITY_INTERACTIVES.find(item => item.id === interactiveId);
  if (!meta) return <div className="pm-empty">Interactive not found.</div>;
  const Component = MAP[interactiveId];
  return Component ? <Component meta={meta}/> : <div className="pm-empty">Interactive implementation unavailable.</div>;
}
