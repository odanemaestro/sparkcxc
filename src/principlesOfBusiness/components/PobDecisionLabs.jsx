import React,{useState} from "react";
import {startupFeasibility,reorderPoint,simpleLoan,priceChange} from "../data/pobDecisionModels";
import "./pobDecisionLabs.css";

const field=(label,value,setter,step=1)=><label className="pob-decision-field" key={label}>
  <span>{label}</span><input type="number" min="0" step={step} value={value}
    onChange={event=>{
      const n=Number(event.target.value);
      setter(Number.isFinite(n)?Math.max(0,Math.min(1000000000,n)):0);
    }}/>
</label>;
const money=v=>"J$"+v.toLocaleString("en-JM",{maximumFractionDigits:2});
const metric=(title,value)=><div className="pob-decision-metric" key={title}><span>{title}</span><strong>{value}</strong></div>;

function StartupLab(){
  const [price,setPrice]=useState(800),[variable,setVariable]=useState(450),[fixed,setFixed]=useState(14000),[sales,setSales]=useState(60);
  const r=startupFeasibility({unitPrice:price,unitCost:variable,monthlyFixed:fixed,expectedSales:sales});
  return <section className="pob-decision-card" aria-label="Business startup feasibility lab">
    <div className="pob-decision-heading"><span>Section 3: Establishing a Business</span><h3>Could this small business cover its costs?</h3>
      <p>Imagine a Jamaican snack vendor starting a small business. Change the costs, price and expected monthly sales to test the idea.</p></div>
    <div className="pob-decision-inputs">{field("Price per snack (J$)",price,setPrice)}{field("Variable cost per snack (J$)",variable,setVariable)}
      {field("Monthly fixed costs (J$)",fixed,setFixed)}{field("Expected snacks sold per month",sales,setSales)}</div>
    <div className="pob-decision-results" aria-live="polite">
      {metric("Sales revenue",money(r.revenue))}{metric("Total costs",money(r.totalCosts))}
      {metric("Expected profit or loss",money(r.profit))}
      {metric("Break-even output",r.breakEvenUnits===null?"Not achievable at this price":r.breakEvenUnits.toLocaleString("en-JM")+" snacks")}
    </div>
    <p className="pob-decision-explain">{r.contribution<=0
      ?"Every snack sells for no more than its variable cost. Increasing volume alone cannot cover positive fixed costs."
      :r.viable?"At these assumptions, expected sales cover estimated costs. That does not guarantee demand, cash availability or business success."
       :"Expected sales fall below the break-even quantity. Try a reasonable price, cost or demand change."}</p>
    <p className="pob-decision-formula">Revenue = price × units. Total costs = fixed costs + (variable cost × units). Profit = revenue − total costs. Break-even units = fixed costs ÷ contribution per unit, rounded up.</p>
  </section>;
}
function InventoryLab(){
 const [demand,setDemand]=useState(14),[lead,setLead]=useState(5),[buffer,setBuffer]=useState(20),[stock,setStock]=useState(80);
 const r=reorderPoint({averageDailyDemand:demand,leadTimeDays:lead,safetyStock:buffer,stockOnHand:stock});
 return <section className="pob-decision-card" aria-label="Supply chain stock planning lab">
   <div className="pob-decision-heading"><span>Section 7: Logistics and Supply Chain</span><h3>When should a shop reorder?</h3>
     <p>A community shop needs to decide when to reorder before deliveries arrive. Change demand and supplier delays to see the effect.</p></div>
   <div className="pob-decision-inputs">{field("Average items sold per day",demand,setDemand)}{field("Supplier delivery lead time (days)",lead,setLead)}
     {field("Safety stock (items)",buffer,setBuffer)}{field("Items on hand",stock,setStock)}</div>
   <div className="pob-decision-results" aria-live="polite">
     {metric("Expected demand during lead time",r.estimatedDemandDuringLeadTime.toLocaleString("en-JM")+" items")}
     {metric("Reorder point",r.point.toLocaleString("en-JM")+" items")}
     {metric("Stock cover",r.daysOfStock===null?"No sales-demand estimate":r.daysOfStock.toFixed(1)+" days")}
   </div>
   <p className="pob-decision-explain">{r.reorderRecommended?"At this stock level, the business should place a replenishment order to maintain its chosen buffer.":"Stock is currently above the reorder point; continue to monitor daily demand."}</p>
   <p className="pob-decision-formula">Reorder point = average daily demand × supplier lead time + safety stock. Real suppliers, seasonal sales and shortages can make demand uncertain.</p>
 </section>;
}
function LoanLab(){
 const [principal,setPrincipal]=useState(100000),[rate,setRate]=useState(12),[months,setMonths]=useState(18);
 const r=simpleLoan({principal,annualRate:rate,months});
 return <section className="pob-decision-card" aria-label="Simple interest borrowing lab">
   <div className="pob-decision-heading"><span>Section 8: Business Finance</span><h3>How much does a loan really cost?</h3><p>Compare loan amounts, annual interest rates and repayment periods using the simple-interest method.</p></div>
   <div className="pob-decision-inputs">{field("Amount borrowed (J$)",principal,setPrincipal)}{field("Annual simple interest rate (%)",rate,setRate,.1)}
     {field("Loan duration (months)",months,setMonths)}</div>
   <div className="pob-decision-results" aria-live="polite">{metric("Simple interest",money(r.interest))}
     {metric("Total amount repayable",money(r.totalRepayment))}
     {metric("Average monthly amount",r.monthlyAverage===null?"Enter a positive duration":money(r.monthlyAverage))}</div>
   <p className="pob-decision-formula">Simple interest = principal × annual rate × (months ÷ 12). This is a teaching model, not an actual instalment loan quotation. Banks may use reducing-balance interest, fees and other terms.</p>
 </section>;
}
function PricingLab(){
 const [old,setOld]=useState(350),[current,setCurrent]=useState(420),[units,setUnits]=useState(120);
 const r=priceChange({original:old,newPrice:current,units});
 return <section className="pob-decision-card" aria-label="Business pricing percentage lab">
   <div className="pob-decision-heading"><span>Section 6: Marketing</span><h3>What does a price change mean?</h3><p>Explore the percentage increase or decrease in a selling price and the resulting change in revenue if quantity stays constant.</p></div>
   <div className="pob-decision-inputs">{field("Old selling price (J$)",old,setOld)}{field("New selling price (J$)",current,setCurrent)}{field("Assumed quantity sold",units,setUnits)}</div>
   <div className="pob-decision-results" aria-live="polite">{metric("Price change",old===0?"Cannot calculate from a zero starting price":r.percentage.toFixed(1)+"%")}
     {metric("Change in revenue",money(r.revenueChange))}{metric("New revenue",money(r.newRevenue))}</div>
   <p className="pob-decision-formula">Percentage change = (new price − original price) ÷ original price × 100. Revenue = unit price × quantity. In reality, changing prices can also change how much customers buy.</p>
 </section>;
}
const TOOLS={3:StartupLab,6:PricingLab,7:InventoryLab,8:LoanLab};
export default function PobDecisionLabs({sectionNumber}){
 const Component=TOOLS[Number(sectionNumber)];
 return Component?<Component/>:null;
}
