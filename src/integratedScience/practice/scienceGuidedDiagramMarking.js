/**
 * Alternative, independently scored LABEL PRACTICE.
 * Never use this result to certify a historical freehand-drawing criterion:
 * the historical scheme additionally awards drawing quality and proportions.
 */
const GUIDES={
 stoma:{
  id:"stoma",name:"Stoma and two guard cells",maxMarks:4,
  slots:[
   {id:"A",answer:"guard cell"},
   {id:"B",answer:"stoma"},
   {id:"C",answer:"chloroplast"},
   {id:"D",answer:"nucleus"}
  ],
  options:["guard cell","stoma","chloroplast","nucleus","epidermal cell","cell wall","vacuole"]
 },
 flower:{
  id:"flower",name:"Flower, longitudinal section",maxMarks:6,
  slots:[
   {id:"A",answer:"petal"},
   {id:"B",answer:"sepal"},
   {id:"C",answer:"anther"},
   {id:"D",answer:"filament"},
   {id:"E",answer:"stigma"},
   {id:"F",answer:"ovary"}
  ],
  options:["petal","sepal","anther","filament","stigma","style","ovary","ovule","receptacle"]
 }
};
export function guidedDiagramForSource(questionId,partIndex,itemIndex){
 if(questionId==="IS-M1-P2-21"&&partIndex===1&&itemIndex===0)return GUIDES.stoma;
 if(questionId==="IS-M1-P2-27"&&partIndex===0&&itemIndex===0)return GUIDES.flower;
 return null;
}
export function readGuidedDiagramAnswers(raw){
 let parsed=raw;
 if(typeof raw==="string"){try{parsed=JSON.parse(raw);}catch{return {};}}
 if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return {};
 return Object.fromEntries(Object.entries(parsed).filter(([k,v])=>/^[A-F]$/.test(k)&&typeof v==="string")
  .map(([k,v])=>[k,v.slice(0,45)]));
}
export function markGuidedDiagram(guide,answers){
 if(!guide||!Array.isArray(guide.slots))return null;
 const value=readGuidedDiagramAnswers(answers);
 const rows=guide.slots.map(slot=>({id:slot.id,
  selected:value[slot.id]||"",
  correct:value[slot.id]===slot.answer,
  expected:slot.answer}));
 return {score:rows.filter(x=>x.correct).length,maxMarks:guide.maxMarks,rows,
  // This certifies ONLY the guided practice assessment, never the historical source.
  assessmentKind:"adapted-label-practice",sourceCriterionVerified:false};
}
const number=s=>/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(s??"").trim());
/**
 * A separate practice-only magnification exercise with GIVEN dimensions.
 * This is not a substitute for checking measurements of the student's drawing.
 */
export function markGuidedMagnification({working="",answer=""}={}){
 const normalized=String(working).replace(/,/g,"").replace(/×/g,"*").replace(/÷/g,"/").replace(/\s+/g,"").toLowerCase();
 const method=/^(?:120(?:\.0+)?\/60(?:\.0+)?(?:=2(?:\.0+)?)?)$/.test(normalized);
 const shown=String(answer).trim().replace(/^[×xX]\s*/,"").trim();
 const accurate=number(shown)&&Math.abs(Number(shown)-2)<1e-9&&/^[×xX]/.test(String(answer).trim());
 return {score:Number(method)+Number(accurate),maxMarks:2,
  methodCorrect:method,answerCorrect:accurate,
  assessmentKind:"adapted-magnification-practice",sourceCriterionVerified:false};
}
