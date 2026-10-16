// Criteria-driven provisional marking for the ORIGINAL SPARK POB Paper 2.
// Every awarded mark has an auditable rule; ambiguous narrative meaning is
// explicitly withheld, not silently treated as wrong or automatically correct.
import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
import {inspectPobCalculationEvidence} from "./pobCalculationFeedback";

const Q="POB-SPARK-P2-ORIGINAL-01-Q";
const row=(q,p,groups)=>[Q+q+":"+p,groups];
// Each inner group is one permitted idea; matching a group is only evidence.
// Some parts require further human-equivalent semantic assessment.
export const POB_P2_MARKING_EVIDENCE=Object.freeze(Object.fromEntries([
 row(1,"a",[["opportunity","start business","starts a business","sets up a business"],["organis","organiz","combine resources"],["risk","uncertainty"]]),
 row(1,"b",[["demand","customer","competition","market research"],["cost","finance","capital","budget"],["health","registration","licen","permit","supplier","regulation"]]),
 row(1,"c",[["share capital","pool money","combine money","share finance","skills"],["share work","share responsibility","decisions"],["disagree","conflict","slow decisions"],["liability","debts","continuity"]]),
 row(1,"d",[["demand","cost","viab","forecast"],["lender","investor","loan","repayment","risk"]]),
 row(1,"e",[["partnership","company","cooperative","co-operative"],["liability","debts"],["finance","capital","control","management"],["sauce","bottl","supermarket","expand","friends"]]),
 row(2,"a",[["plan","setting goals"],["organis","organiz","leading","directing","control","monitoring"]]),
 row(2,"b",[["supplier","buyer","customer","contact"],["quantity","description","goods","services"],["price","date","reference","delivery"]]),
 row(2,"c",[["unclear","conflicting","instructions","duties"],["clarify","meeting","role"],["unfair","workload","wages","shifts"],["negotiate","mediat","grievance","fair"]]),
 row(2,"d",[["offer","quotation","service","price"],["accept"],["consideration","payment","exchange"]]),
 row(2,"e",[["communicat","apolog","customer","supplier"],["contract","document","delivery terms","evidence"],["backup","schedule","check supplier","contingency"]]),
 row(3,"a",[["output per","productivity","labour hour"]]),
 row(3,"b",[["product"],["place","promotion","advertis","distribution"]]),
 row(3,"c",[["selling price","250"],["variable cost","130"],["fixed cost","contribution","profit"]]),
 row(3,"d",[["economies of scale","fixed costs","more customers"],["purchasing power","bulk","sales"],["quality","cash flow","cash shortage"],["management","recruitment","extra costs"]]),
 row(3,"e",[["target","customers","commuters"],["product","packaging","label","flavour"],["price","cost","value"],["place","retail","shop","promotion","advertis","sampling"]]),
 row(4,"a",[["movement","transport","storage","delivery"],["plan","coordinat","control","manage"]]),
 row(4,"b",[["bill of lading","airway bill","waybill"],["delivery note","consignment note"],["invoice","purchase order","cargo"]]),
 row(4,"c",[["delay","stockout","unavailable","customer","sales"],["spoil","damag","waste","cost","claim"]]),
 row(4,"d",[["backup","alternative route","supplier"],["temperature","refrigerat","packaging","cold chain"],["forecast","tracking","inventory","stock"]]),
 row(4,"e",[["gps","tracking","digital"],["inventory","temperature","stock","sensor"],["cost","security","connectivity","training"]]),
 row(5,"a",[["revenue","850000"],["cost of sales","470000"]]),
 row(5,"b",[["gross profit","380000"],["operating expense","260000"]]),
 row(5,"c",[["savings","saving","reserve"],["invest","asset","future return"],["cash account","bank deposit","emergency fund"],["equipment","machine","shares"]]),
 row(5,"d",[["foreign exchange","foreign currency","export earning"],["employment","jobs","tax","production","diversif"]]),
 row(5,"e",[["accuracy","accurate","speed","reorder"],["stockout","waste","tracking","decision"],["cost","training","cyber","backup","data loss"]])
]));
const normalise=text=>String(text||"").toLowerCase().replace(/,/g,"").replace(/\s+/g," ").trim();
const regexEscape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function evidence(text,alternatives){
 return alternatives.some(term=>{
   const token=normalise(term);
   const re=new RegExp("(^|[^a-z0-9])"+regexEscape(token),"i");
   return re.test(text);
 });
}
const isNegated=(text,term)=>{
 const i=text.indexOf(term);
 if(i<0)return false;
 return /\b(?:not|no|never|without)\s+(?:\w+\s+){0,3}$/.test(text.slice(Math.max(0,i-45),i));
};
export function assessPobPartEvidence(key,answer){
 const groups=POB_P2_MARKING_EVIDENCE[key];
 if(!groups)return null;
 const text=normalise(answer);
 const signals=groups.map((alternatives,index)=>({
   index,matched:alternatives.some(term=>evidence(text,[term])&&!isNegated(text,normalise(term))),
   alternatives
 }));
 const calc=inspectPobCalculationEvidence(key,answer);
 return {key,signals,calculation:calc,
  matchedConcepts:signals.filter(s=>s.matched).length,
  // Lexical overlap is not enough to award defensible extended-response marks.
  supportedMarks:null,unresolved:true,
  note:"Review concept matches against the full question, required explanation, context, alternatives and negation before awarding marks."};
}
export function assessPobPaper2Evidence(answers={},paper=POB_PAPER2_ORIGINAL_01){
 const questions=paper.questions.map(q=>({
  id:q.id,parts:q.items.map(item=>{
   const key=q.id+":"+item.id,answer=String(answers[key]||"").trim();
   const evidence=assessPobPartEvidence(key,answer);
   return {key,availableMarks:item.marks,answered:!!answer,
    assessedMarks:answer?null:0,
    criteria:item.criteria.map((criterion,index)=>({
      index,maximum:criterion.marks,rule:criterion.rule,
      provisionalEvidence:evidence?.signals[index]?.matched??false,
      awardedMarks:answer?null:0
    })),evidence};
  })
 }));
 return {questions,availableMarks:paper.marks,
  assessedMarks:questions.some(q=>q.parts.some(p=>p.answered))?null:0,
  status:"rubric-evidence-only",calibrated:false};
}
