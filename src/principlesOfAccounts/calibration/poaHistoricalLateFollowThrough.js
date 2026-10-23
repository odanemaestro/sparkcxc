import {POA_HISTORICAL_METHODS_LATE} from "../marking/poaHistoricalMethodsLate";

// Independent dependency recipes. The deliberately wrong upstream amount does
// not earn accuracy; only the explicitly allocated later method is tested.
const recipes=[
 [2015,"mj",5,"Sales revenue","Production cost",x=>x*1.5,"x*1.5"],
 [2016,"mj",4,"Unit production cost","Production cost",x=>x/12900,"x/12900"],
 [2017,"mj",3,"Gross profit per punch","Cost per punch",x=>11-x,"11-x"],
 [2018,"mj",2,"Inventory turnover","Average inventory",x=>756200/x,"756200/x"],
 [2018,"mj",5,"Unit production cost","Production cost",x=>x/40000,"x/40000"],
 [2021,"jan",3,"Selling price","Cost per product",x=>x*1.25,"x*1.25"],
 [2022,"mj",3,"Unit production cost","Production cost",x=>x/50000,"x/50000"],
 [2023,"jan",2,"Order selling price","Order production cost",x=>x*1.5,"x*1.5"],
 [2024,"mj",2,"Ordinary return percentage","Ordinary profit available",x=>x/180000*100,"x/180000*100"],
 [2025,"jan",3,"Unit production cost","Production cost",x=>x/22500,"x/22500"],
 [2025,"jan",3,"Unit selling price","Unit production cost",x=>x*1.6,"x*1.6"],
 [2025,"mj",4,"Maturity payout","Total interest",x=>65000+x,"65000+x"],
 [2026,"jan",4,"Jennie return percentage","Jennie profit share",x=>x/150000*100,"x/150000*100"],
];
export const POA_LATE_FOLLOW_THROUGH_FIXTURES=recipes.flatMap(([year,sitting,questionNumber,label,from,compute,formula])=>{
 const paperId=`poa-2-${year}-${sitting}`,policy=POA_HISTORICAL_METHODS_LATE.find(p=>p.paperId===paperId&&p.questionNumber===questionNumber);
 const section=policy.sections.find(s=>s.points.some(p=>p.label===label+" method")),point=section.points.find(p=>p.label===label+" method");
 const own=123457,result=compute(own),expression=formula.replace(/\bx\b/g,String(own));
 const response=(answer,ambiguous=false)=>({working:`${from}: ${own}.\n${ambiguous?`${from}: ${own+100}.\n`:""}${label}: ${answer}.\n${label} calculation: ${expression} = ${answer}.`});
 return [{paperId,questionNumber,partId:section.id,pointId:point.id,cls:"own-figure",response:response(result),expect:point.marks},
  {paperId,questionNumber,partId:section.id,pointId:point.id,cls:"incorrect-own-figure",response:response(result+1),expect:0},
  {paperId,questionNumber,partId:section.id,pointId:point.id,cls:"ambiguous-own-figure",response:response(result,true),expect:0}];
});
