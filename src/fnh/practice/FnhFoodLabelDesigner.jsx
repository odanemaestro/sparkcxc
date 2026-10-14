import React,{useMemo,useState} from "react";
import "./fnhFoodLabelDesigner.css";

// A student-created answer to the source's empty food-label frame.
// Stored as plain text in the same answer slot as every other Paper 2 part.
export function makeFnhFoodLabel({name,serving,energy,protein,ingredients,netQuantity}){
  return [
    `Product: ${name.trim()}`,
    `Serving size: ${serving.trim()}`,
    `Energy per serving: ${energy.trim()}`,
    `Protein per serving: ${protein.trim()}`,
    `Ingredients: ${ingredients.trim()}`,
    `Net quantity: ${netQuantity.trim()}`,
  ].join("\n");
}
export function fnhFoodLabelCompleteness(values){
  return {
    nutrition:[values.energy,values.protein].filter(v=>v.trim()).length,
    general:[values.name,values.ingredients,values.netQuantity].filter(v=>v.trim()).length,
    hasServingSize:Boolean(values.serving.trim()),
  };
}
export function parseFnhFoodLabel(value=""){
 const names={Product:"name","Serving size":"serving","Energy per serving":"energy","Protein per serving":"protein",Ingredients:"ingredients","Net quantity":"netQuantity"};
 const fields={name:"",serving:"",energy:"",protein:"",ingredients:"",netQuantity:""};
 for(const line of String(value).split("\\n")){
   const index=line.indexOf(":");if(index<0)continue;
   const field=names[line.slice(0,index).trim()];
   if(field)fields[field]=line.slice(index+1).trim();
 }
 return fields;
}
export default function FnhFoodLabelDesigner({value,onChange,disabled=false}){
 const [fields,setFields]=useState(()=>parseFnhFoodLabel(value));
 const status=useMemo(()=>fnhFoodLabelCompleteness(fields),[fields]);
 const update=(field,next)=>{
   const record={...fields,[field]:next};setFields(record);onChange(makeFnhFoodLabel(record));
 };
 const entries=[
  ["name","Food product name","e.g. Caribbean Oat Cereal"],
  ["serving","Serving size","e.g. 40 g"],
  ["energy","Energy per serving","e.g. 145 kcal"],
  ["protein","Protein per serving","e.g. 6 g"],
  ["ingredients","Ingredients, in weight order","e.g. oats, raisins, cinnamon"],
  ["netQuantity","Net quantity","e.g. 400 g"],
 ];
 return <div className="fnh-label-designer">
   <div className="fnh-label-designer-head"><h3>Design your product label</h3>
     <p>The historical paper provides an empty frame. Use these fields to create your own food label with two nutrition facts and two general details.</p></div>
   <div className="fnh-label-designer-fields">{entries.map(([field,label,placeholder])=><label key={field}>
     <span>{label}</span><input type="text" placeholder={placeholder} value={fields[field]} disabled={disabled}
       onChange={event=>update(field,event.target.value)}/></label>)}</div>
   <div className="fnh-label-designer-preview" aria-label="Your food label preview">
     <strong>{fields.name||"Your product name"}</strong>
     <small>Serving: {fields.serving||"Not entered"}</small>
     <div><b>Energy:</b> {fields.energy||"Not entered"}</div>
     <div><b>Protein:</b> {fields.protein||"Not entered"}</div>
     <div><b>Ingredients:</b> {fields.ingredients||"Not entered"}</div>
     <div><b>Net quantity:</b> {fields.netQuantity||"Not entered"}</div>
   </div>
   <p className="fnh-label-designer-status" role="status">Nutrition facts: {status.nutrition}/2 · General details: {Math.min(status.general,2)}/2. This is an exam drawing activity, not a verified commercial label.</p>
   <label className="fnh-label-designer-draft"><span>Saved examination response</span>
     <textarea rows={7} disabled={disabled} value={value} onChange={event=>onChange(event.target.value)}
       aria-label="Food label written response" placeholder="You may also type or edit your food label directly here."/></label>
 </div>;
}
