import React,{useMemo,useState} from "react";
import "./electricityConsumptionExplorer.css";

function ApplianceView(){
  const [power,setPower]=useState(2);
  const [hours,setHours]=useState(3);
  const energy=(Number(power)||0)*(Number(hours)||0);
  return <div className="spark-consumption-appliance">
    <article>
      <span>APPLIANCE ENERGY</span>
      <h4>Energy = power × time</h4>
      <label>Power, kW<input type="number" step="0.1" value={power} onChange={e=>setPower(e.target.value)}/></label>
      <label>Time, hours<input type="number" step="0.1" value={hours} onChange={e=>setHours(e.target.value)}/></label>
      <strong>{Math.round(energy*100)/100} kWh</strong>
    </article>
    <aside><b>Bank example</b><p>A 2 kW heater used for 3 hours consumes 6 kWh.</p><p>Do not multiply watts directly by hours and label the result kWh. Convert W to kW first.</p></aside>
  </div>;
}

function MonthlyView(){
  const [watts,setWatts]=useState(1500);
  const [hours,setHours]=useState(2);
  const [days,setDays]=useState(30);
  const energy=(Number(watts)||0)/1000*(Number(hours)||0)*(Number(days)||0);
  return <div className="spark-monthly-energy">
    <div className="spark-monthly-controls">
      <label>Power, W<input type="number" value={watts} onChange={e=>setWatts(e.target.value)}/></label>
      <label>Hours per day<input type="number" step="0.1" value={hours} onChange={e=>setHours(e.target.value)}/></label>
      <label>Days<input type="number" value={days} onChange={e=>setDays(e.target.value)}/></label>
    </div>
    <article><span>MONTHLY ENERGY</span><strong>{Math.round(energy*100)/100} kWh</strong><p>({watts} ÷ 1000) × {hours} × {days}</p></article>
  </div>;
}

function MeterView(){
  const [previous,setPrevious]=useState(12450);
  const [current,setCurrent]=useState(12780);
  const used=Math.max(0,(Number(current)||0)-(Number(previous)||0));
  return <div className="spark-meter-reading">
    <div className="spark-meter-box"><span>PREVIOUS READING</span><strong>{Number(previous)||0}</strong></div>
    <div className="spark-meter-minus">−</div>
    <div className="spark-meter-box"><span>CURRENT READING</span><strong>{Number(current)||0}</strong></div>
    <div className="spark-meter-equals">=</div>
    <div className="spark-meter-box result"><span>ENERGY USED</span><strong>{used} kWh</strong></div>
    <div className="spark-meter-inputs"><label>Previous<input type="number" value={previous} onChange={e=>setPrevious(e.target.value)}/></label><label>Current<input type="number" value={current} onChange={e=>setCurrent(e.target.value)}/></label></div>
  </div>;
}

function BillView(){
  const [base,setBase]=useState(1650);
  const [units,setUnits]=useState(25);
  const [rate,setRate]=useState(18);
  const total=(Number(base)||0)+(Number(units)||0)*(Number(rate)||0);
  return <div className="spark-bill-calc">
    <article><span>CSEC PRACTICE BILL</span><h4>Fixed charge + usage charge</h4><label>Fixed charge<input type="number" value={base} onChange={e=>setBase(e.target.value)}/></label><label>Units, kWh<input type="number" value={units} onChange={e=>setUnits(e.target.value)}/></label><label>Rate per kWh<input type="number" value={rate} onChange={e=>setRate(e.target.value)}/></label><strong>Total = {total.toLocaleString()}</strong></article>
    <article className="spark-current-bill"><span>JAMAICA BILL CONTEXT</span><h4>Actual bills contain several components</h4><p>JPS currently identifies Energy, Fuel, IPP and Customer charges, along with applicable adjustments and taxes.</p><p>The Fuel Charge changes month to month because oil and natural-gas costs change. Use the rate printed on the bill for real calculations.</p></article>
  </div>;
}

function EfficiencyView(){
  const rows=[
    ["LED lamp","Low power for the same useful light output","Less electrical energy used over the same time"],
    ["Air conditioner","Efficiency depends on technology, size and maintenance","Correct sizing, clean filters and efficient inverter systems reduce use"],
    ["Water heater","Heating uses substantial energy","Reduce unnecessary heating time and heat loss"],
    ["Refrigerator","Runs for long periods","Efficient models and good door seals reduce consumption"],
  ];
  return <div className="spark-consumption-efficiency">{rows.map(([item,idea,result],i)=><article key={item}><span>{i+1}</span><div><b>{item}</b><strong>{idea}</strong><p>{result}</p></div></article>)}</div>;
}

export default function ElectricityConsumptionExplorer(){
  const [view,setView]=useState("appliance");
  const summary=useMemo(()=>({
    appliance:"Electrical energy in kilowatt-hours equals appliance power in kilowatts multiplied by operating time in hours.",
    monthly:"Small daily use adds up over a month, so both power rating and operating time matter.",
    meter:"Electricity use over a billing period is found from the difference between meter readings.",
    bill:"Real bills apply rates and charges to measured kWh. Fuel-related charges can change from month to month.",
    efficiency:"Reducing electricity use lowers energy charges and often lowers fuel-related charges that apply per kWh.",
  })[view],[view]);

  return <section className="spark-electricity-consumption">
    <header><span>ELECTRICITY CONSUMPTION</span><h3>Calculate appliance energy, monthly use, meter consumption and bill cost</h3><p>Electricity meters record energy in kilowatt-hours. One kilowatt-hour is the energy used by a 1 kW appliance operating for 1 hour.</p></header>
    <div className="spark-consumption-tabs">{[["appliance","Appliance energy"],["monthly","Monthly use"],["meter","Meter readings"],["bill","Bill calculator"],["efficiency","Reduce usage"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-consumption-stage">
      {view==="appliance"&&<ApplianceView/>}
      {view==="monthly"&&<MonthlyView/>}
      {view==="meter"&&<MeterView/>}
      {view==="bill"&&<BillView/>}
      {view==="efficiency"&&<EfficiencyView/>}
    </div>
    <div className="spark-consumption-summary"><strong>{summary}</strong><span>Convert watts to kilowatts by dividing by 1000. Then multiply kW by hours to obtain kWh.</span></div>
  </section>;
}
