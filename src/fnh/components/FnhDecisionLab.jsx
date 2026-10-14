import React,{useMemo,useState} from "react";
import "./fnhDecisionLab.css";

export const FNH_MEAL_FOODS=Object.freeze([
  {id:"yam",name:"Boiled yam",group:"Staples",nutrient:"Carbohydrate supplies energy."},
  {id:"breadfruit",name:"Roasted breadfruit",group:"Staples",nutrient:"Carbohydrate supplies energy and some fibre."},
  {id:"peas",name:"Stewed red peas",group:"Legumes and nuts",nutrient:"Protein, fibre and plant iron."},
  {id:"channa",name:"Curried channa",group:"Legumes and nuts",nutrient:"Plant protein, fibre and iron."},
  {id:"fish",name:"Steamed fish",group:"Foods from animals",nutrient:"Protein and important minerals."},
  {id:"egg",name:"Boiled egg",group:"Foods from animals",nutrient:"Protein and vitamin B12."},
  {id:"callaloo",name:"Steamed callaloo",group:"Vegetables",nutrient:"Fibre, folate and plant iron."},
  {id:"pumpkin",name:"Cooked pumpkin",group:"Vegetables",nutrient:"Beta-carotene, used to make vitamin A."},
  {id:"mango",name:"Fresh mango",group:"Fruits",nutrient:"Vitamin C and other nutrients."},
  {id:"guava",name:"Fresh guava",group:"Fruits",nutrient:"Vitamin C and dietary fibre."},
  {id:"avocado",name:"Avocado",group:"Fats and oils",nutrient:"Unsaturated fat and fibre."},
]);
export function fnhMealGroupSummary(selectedIds,foods=FNH_MEAL_FOODS){
  const ids=new Set(selectedIds);
  const chosen=foods.filter(food=>ids.has(food.id));
  const groups=[...new Set(chosen.map(food=>food.group))];
  return {chosen,groups,count:groups.length,fourMix:groups.length>=4,
    // Four-mix describes food groups; it does not assess serving size or safety.
    feedback:groups.length>=4
      ?"Four food groups represented. Check portions, hydration, allergies and preparation safety before calling the meal balanced."
      :`You have ${groups.length} food group${groups.length===1?"":"s"}. Select foods from ${4-groups.length} more group${4-groups.length===1?"":"s"} to make a four-mix.`};
}
export function fnhNutritionLabelTotal(perReference,referenceAmount,actualAmount){
  const a=Number(perReference),b=Number(referenceAmount),c=Number(actualAmount);
  if(!Number.isFinite(a)||!Number.isFinite(b)||!Number.isFinite(c)||a<0||b<=0||c<=0)return null;
  return (a*c)/b;
}
const money=n=>new Intl.NumberFormat("en-JM",{style:"currency",currency:"JMD",maximumFractionDigits:0}).format(n);
export const FNH_BUDGET_ITEMS=Object.freeze([
  {id:"rice",label:"Rice",price:350},
  {id:"peas",label:"Red peas",price:480},
  {id:"cabbage",label:"Cabbage",price:300},
  {id:"carrots",label:"Carrots",price:250},
  {id:"bananas",label:"Bananas",price:360},
  {id:"packaging",label:"Food-safe containers",price:210},
]);
export function fnhBudgetSummary(items,selected,budget){
  const rows=items.map(item=>({...item,quantity:Math.max(0,Math.min(99,Number(selected[item.id])||0))}));
  const total=rows.reduce((sum,row)=>sum+row.price*row.quantity,0);
  const limit=Math.max(0,Number(budget)||0);
  return {rows,total,limit,left:limit-total,withinBudget:total<=limit};
}
function MealBuilder(){
  const [selected,setSelected]=useState(["yam","peas","callaloo"]);
  const result=useMemo(()=>fnhMealGroupSummary(selected),[selected]);
  return <div className="fnh-decision-lab">
    <div className="fnh-decision-head"><span>INTERACTIVE FOOD PLANNING</span><h3>Build a Caribbean four-mix meal</h3>
      <p>Choose foods from four different food groups. Count food groups, not how many individual foods you select.</p></div>
    <div className="fnh-decision-food-grid">{FNH_MEAL_FOODS.map(food=><button type="button" key={food.id}
      className={selected.includes(food.id)?"selected":""} aria-pressed={selected.includes(food.id)}
      onClick={()=>setSelected(old=>old.includes(food.id)?old.filter(x=>x!==food.id):[...old,food.id])}>
      <strong>{food.name}</strong><small>{food.group}</small><span>{selected.includes(food.id)?"✓ Selected":"Select food"}</span>
    </button>)}</div>
    <div className="fnh-decision-feedback" role="status">
      <strong>{result.count} of 4 food groups</strong><div className="fnh-decision-meter"><span style={{width:`${Math.min(100,result.count/4*100)}%`}}/></div>
      <p>{result.feedback}</p><p><b>Groups:</b> {result.groups.join(", ")||"None yet"}</p>
      {result.chosen.map(food=><p key={food.id}><b>{food.name}:</b> {food.nutrient}</p>)}
    </div>
    <button type="button" className="fnh-decision-reset" onClick={()=>setSelected([])}>Clear meal choices</button>
  </div>;
}
function LabelCalculator(){
  const [reference,setReference]=useState("100");
  const [nutrient,setNutrient]=useState("6");
  const [portion,setPortion]=useState("250");
  const [name,setName]=useState("Sugar");
  const [unit,setUnit]=useState("g");
  const total=fnhNutritionLabelTotal(nutrient,reference,portion);
  const round=x=>Number(x.toFixed(2)).toLocaleString("en-JM");
  return <div className="fnh-decision-lab">
    <div className="fnh-decision-head"><span>LABEL READING LAB</span><h3>What is really in the full serving?</h3>
      <p>Enter the nutrition information from a food or drink label. Use the same units for both amounts, such as mL or g.</p></div>
    <div className="fnh-decision-fields">
      <label>Nutrient<select value={name} onChange={event=>{setName(event.target.value);setUnit(event.target.value==="Sodium"?"mg":"g");}}>
        <option>Sugar</option><option>Protein</option><option>Fat</option><option>Sodium</option>
      </select></label>
      <label>{name} per label reference ({unit})<input type="number" min="0" step="any" value={nutrient} onChange={e=>setNutrient(e.target.value)}/></label>
      <label>Label reference amount (mL or g)<input type="number" min="1" step="any" value={reference} onChange={e=>setReference(e.target.value)}/></label>
      <label>Amount actually consumed (same unit)<input type="number" min="1" step="any" value={portion} onChange={e=>setPortion(e.target.value)}/></label>
    </div>
    <div className="fnh-decision-feedback" role="status">
      {total==null?<p>Enter valid non-negative nutrient values and positive reference and portion amounts.</p>:<>
        <strong>{round(total)} {unit} {name.toLowerCase()}</strong>
        <p>Step 1: Number of label portions = {round(Number(portion))} ÷ {round(Number(reference))} = {round(Number(portion)/Number(reference))}.</p>
        <p>Step 2: {round(Number(nutrient))} {unit} × {round(Number(portion)/Number(reference))} = {round(total)} {unit}.</p>
        <p>Check whether the label shows total sugar or added sugar. They are not automatically the same thing.</p>
      </>}
    </div>
    <button type="button" className="fnh-decision-reset" onClick={()=>{setReference("100");setNutrient("6");setPortion("250");setName("Sugar");setUnit("g");}}>Reset example</button>
  </div>;
}
function BudgetPlanner(){
  const [budget,setBudget]=useState("2500");
  const [quantities,setQuantities]=useState({rice:1,peas:1,cabbage:1,carrots:1,bananas:1,packaging:1});
  const summary=useMemo(()=>fnhBudgetSummary(FNH_BUDGET_ITEMS,quantities,budget),[quantities,budget]);
  return <div className="fnh-decision-lab">
    <div className="fnh-decision-head"><span>CARIBBEAN HOUSEHOLD BUDGET</span><h3>Plan affordable packed lunches</h3>
      <p>Change the quantities to keep the food list within your budget. Prices are teaching examples, not live market prices.</p></div>
    <label className="fnh-decision-budget-limit">Your budget (JMD)<input type="number" min="0" value={budget} onChange={e=>setBudget(e.target.value)}/></label>
    <div className="fnh-decision-budget-items">{FNH_BUDGET_ITEMS.map(item=><label key={item.id}>{item.label}<span>{money(item.price)} per unit</span>
      <input type="number" min="0" max="99" step="1" aria-label={`Quantity of ${item.label}`}
        value={quantities[item.id]??0} onChange={e=>setQuantities(old=>({...old,[item.id]:Math.max(0,Math.floor(Number(e.target.value)||0))}))}/></label>)}</div>
    <div className="fnh-decision-feedback" role="status">
      <strong>Total: {money(summary.total)}</strong><p>Budget: {money(summary.limit)}</p>
      <p>{summary.withinBudget?`Remaining: ${money(summary.left)}. Check whether this food list supplies the right variety and number of portions.`:
        `Over budget by ${money(-summary.left)}. Compare unit prices or adjust quantities while retaining nutritious choices.`}</p>
      <p>A low-cost meal still needs safe water, suitable portions, hygiene and appropriate storage.</p>
    </div>
    <button type="button" className="fnh-decision-reset" onClick={()=>{setBudget("2500");setQuantities({rice:1,peas:1,cabbage:1,carrots:1,bananas:1,packaging:1});}}>Reset sample budget</button>
  </div>;
}
export default function FnhDecisionLab({type}){
  if(type==="fnh-meal-builder")return <MealBuilder/>;
  if(type==="fnh-label-calculator")return <LabelCalculator/>;
  if(type==="fnh-budget-planner")return <BudgetPlanner/>;
  return null;
}
