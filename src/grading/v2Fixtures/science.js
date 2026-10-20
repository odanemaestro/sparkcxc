/**
 * Source-bound fixtures for point-based science Paper 2 items (Chemistry and
 * Integrated Science): written lines, calculations, answer-keyed tables and
 * structured graphs. Expected marks follow each item's own scheme points and
 * their mark annotations ("(2)" = a two-mark point).
 */
import {cleanSourcePoint} from "../v2WrittenEvidenceGate";

const F=(cls,response,expect,note)=>({cls,response,expect,note});
// "(2)", "(1+1 explanation)", or several "(1)" annotations in one point.
export const pointMarks=point=>{
 const all=[...String(point||"").matchAll(/\(\s*(\d(?:\s*\+\s*\d)*)(?:\s+[a-z ]+)?\s*\)/gi)];
 return all.length?all.reduce((n,m)=>n+m[1].split("+").reduce((a,v)=>a+Number(v),0),0):1;
};
/** "Use a lid (1) and/or better insulation (1)" is two one-mark points. */
export function subPoints(point){
 const parts=[...String(point||"").matchAll(/([^()]*?)\(\s*(\d)\s*\)/g)];
 if(parts.length<2)return [point];
 return parts.map(m=>m[1].replace(/^\s*(?:and\/or|and|or|,|;)\s*/i,"").trim()+` (${m[2]})`);
}

/**
 * A choice letter ("Q" from "P, Q or R") is a whole answer: the letter inside
 * another word earns nothing, and a competing or denied choice ("R. Q is
 * wrong.") never earns it. Other points are left unanswered, so 0 is expected.
 */
function letterFixtures(item,points,answers){
 const options=[...new Set(String(item.prompt||"").match(/\b[A-Z]\b/g)||[])].filter(o=>!/^[AI]$/.test(o));
 return points.flatMap((p,i)=>{
  const letter=cleanSourcePoint(p).trim();
  if(!/^[A-Z]$/.test(letter)||answers[i]?.trim()!==letter)return [];
  const other=options.find(o=>o!==letter);
  return [F("irrelevant",{answer:`X${letter}Z V${letter}${letter}J`},0,"choice letter inside unrelated words"),
   ...(other?[F("competing",{answer:`${other}. ${letter} is wrong.`},0,"competing choice; the source letter is denied"),
    F("competing",{answer:`${letter} or ${other}`},{min:0,max:0},"two choices given")]:[])];
 });
}

const SUBSCRIPT="₀₁₂₃₄₅₆₇₈₉";
function equationFixtures(item,maxMarks,equation){
 const states=/state symbols/i.test(item.prompt||"");
 const species=side=>side.split(/\s\+\s/).map(s=>s.trim());
 const [left,right]=equation.split(/\s*→\s*/).map(species);
 const coef=s=>{const m=s.match(/^(\d+)\s*(.*)$/);return m?[Number(m[1]),m[2]]:[1,s];};
 const join=(l,r)=>l.join(" + ")+" → "+r.join(" + ");
 const scaled=(k)=>join(...[left,right].map(side=>side.map(s=>{const [c,f]=coef(s);return (c*k)+f;})));
 const unbalanced=join(...[left,right].map((side,i)=>side.map((s,j)=>{const [c,f]=coef(s);
  return i===0&&j===0?(c+1)+f:(c===1?f:c+f);})));
 const ascii=equation.replace(/[₀-₉]/g,d=>String(SUBSCRIPT.indexOf(d))).replace("→","->");
 const [c0,f0]=coef(left[0]);
 const wrongFormula=join([(c0===1?"":c0)+f0.replace(/^([A-Z][a-z]?)/,"$1"+(/^[A-Z][a-z]?[₀-₉]/.test(f0)?"":"₃")).replace(/^([A-Z][a-z]?)([₀-₉])/,(m,e,d)=>e+SUBSCRIPT[(SUBSCRIPT.indexOf(d)+1)%10]),...left.slice(1)],right);
 const fixtures=[
  F("full",{answer:equation},maxMarks),
  F("equivalent",{answer:scaled(2)},maxMarks,"coefficients in the same ratio"),
  F("equivalent",{answer:ascii},maxMarks,"plain digits and an ASCII arrow"),
  F("partial",{answer:unbalanced},1,"correct formulae, not balanced"),
  F("incorrect",{answer:wrongFormula},0,"a reactant's formula is wrong"),
  F("competing",{answer:equation+"\n"+unbalanced},0,"two different equations"),
  F("blank",{answer:""},0),
  F("irrelevant",{answer:"The reaction makes a gas."},{min:0,max:0}),
  F("ceiling",{answer:equation+" "+equation},{min:0,max:maxMarks}),
 ];
 if(states)fixtures.push(F("partial",{answer:equation.replace(/\((?:s|l|g|aq)\)/g,"")},1,"state symbols omitted"));
 return {kind:"structured",sourceAnswer:{answer:equation},alternatives:[scaled(2),ascii],fixtures};
}
/** The point's first stated alternative, without examiner annotations. */
export function pointAnswer(point){
 // A slash between words offers alternatives ("faster / more frequent");
 // a slash in arithmetic or units ("4.90 / 98", "g/mol", "1/time") does not.
 const text=cleanSourcePoint(String(point).replace(/\((?:any\s+\w+|accept[^)]*|or equivalent)\)/gi,""));
 const first=text.split(/\s+OR\s+|(?<=[A-Za-z)])\s+\/\s+(?=[A-Za-z(])/)[0];
 return first.replace(/(?<=[A-Za-z]{2})\/[A-Za-z][A-Za-z-]*/g,"").replace(/[.;,]\s*$/,"").trim();
}
const ANTONYMS=[["increases","decreases"],["increase","decrease"],["higher","lower"],["more","less"],
 ["faster","slower"],["gains","loses"],["oxidised","reduced"],["oxidation","reduction"],["exothermic","endothermic"],
 ["acidic","alkaline"],["soluble","insoluble"],["positive","negative"],["anode","cathode"],["larger","smaller"],
 ["strong","weak"],["rises","falls"],["expands","contracts"]];
export function antonymSwap(text){
 let changed=false;
 const out=String(text).replace(/\b[a-z]+\b/gi,word=>{
  for(const [a,b] of ANTONYMS){
   if(word.toLowerCase()===a){changed=true;return b;}
   if(word.toLowerCase()===b){changed=true;return a;}
  }
  return word;
 });
 return changed?out:null;
}
export function perturbNumbers(text){
 if(!/\d/.test(text))return null;
 // Each occurrence moves by a different amount, so equal values ("1:1")
 // never become an equivalent pair ("2:2").
 let index=0;
 return String(text).replace(/\d+(?:\.\d+)?/g,raw=>{
  const n=Number(raw);
  if(!Number.isFinite(n))return raw;
  const decimals=(raw.split(".")[1]||"").length;
  index+=1;
  return (n===0?3+index:n*1.37+index).toFixed(decimals);
 });
}
const niceAxis=values=>{
 const lo=Math.min(...values),hi=Math.max(...values);
 const span=hi-lo||Math.abs(hi)||1;
 const raw=span/8,mag=10**Math.floor(Math.log10(raw));
 const step=[1,2,2.5,5,10].map(m=>m*mag).find(s=>s>=raw);
 const min=Math.floor(lo/step)*step,max=Math.ceil(hi/step)*step;
 const fix=v=>Number(v.toFixed(10));
 return {min:fix(min),max:fix(max===min?min+step:max),step:fix(step)};
};

function graphFixtures(item,maxMarks){
 const expected=item.response.points||[];
 const asked=((item.markScheme?.points||[]).join(" ")+" "+(item.prompt||"")).toLowerCase();
 // A requested curve is drawn smooth; a requested line of best fit is a
 // straight best-fit line; otherwise points are joined with segments.
 const connection=/\bcurve\b|\bsmooth\b/.test(asked)?"smooth":/best.?fit/.test(asked)?"best-fit":"segments";
 const graph=(pts,{x,y,join=connection}={})=>({version:1,kind:"line",connection:join,barWidth:.6,
  x:x||niceAxis(expected.map(p=>Number(p.x))),y:y||niceAxis(expected.map(p=>Number(p.y))),
  series:[{name:"data",points:pts.map(p=>`${p.x},${p.y}`).join("\n")}]});
 const labels={xLabel:item.response.x,yLabel:item.response.y};
 const wrongPts=expected.map(p=>({x:p.x,y:Number((Number(p.y)*1.6+1).toFixed(4))}));
 return {kind:"visual",fixtures:[
  F("full",{...labels,graph:graph(expected)},maxMarks),
  F("equivalent",{xLabel:String(item.response.x).replace(/\s*\/\s*/," in "),yLabel:String(item.response.y).replace(/\s*\/\s*/," in "),
   graph:graph(expected)},{min:maxMarks-1,max:maxMarks},"units written with 'in' instead of '/'"),
  F("partial",{graph:graph(expected)},maxMarks-1,"axes unlabelled"),
  F("partial",{...labels,graph:graph(expected,{join:"none"})},maxMarks-1,"points not joined"),
  F("incorrect",{xLabel:"x",yLabel:"y",graph:graph(wrongPts,{x:{min:0,max:1000,step:100},y:{min:0,max:1000,step:100},join:"none"})},0),
  F("blank",{},0),
  F("irrelevant",{answer:"I did not draw the graph."},0),
  F("ceiling",{...labels,graph:graph([...expected,...expected])},{min:0,max:maxMarks},"every point entered twice"),
 ]};
}

function tableFixtures(item,maxMarks){
 const table=item.response.table||{};
 const blanks=[];
 (table.rows||[]).forEach((row,r)=>row.forEach((cell,c)=>{if(String(cell??"")==="")blanks.push(`r${r}c${c}`);}));
 const answers=(table.answers||[]).map(a=>Array.isArray(a)?String(a[0]):String(a));
 if(answers.length!==blanks.length||!answers.every(Boolean))return null;
 const fill=fn=>Object.fromEntries(blanks.map((k,i)=>[k,fn(answers[i],i)]));
 const groups=Array.isArray(table.markGroups)&&table.markGroups.length?table.markGroups:blanks.map((_,i)=>[i]);
 const first=new Set(groups[0]);
 const wrong=a=>perturbNumbers(a)??"none";
 return {kind:"structured",fixtures:[
  F("full",fill(a=>a),maxMarks),
  F("equivalent",fill(a=>/^\d+\.\d+$/.test(a)?a+"0":a+" "),maxMarks,"trailing zero / spacing"),
  F("partial",fill((a,i)=>first.has(i)?a:""),maxMarks/groups.length,"first mark group only"),
  F("incorrect",fill(a=>wrong(a)),0),
  F("competing",fill((a,i)=>first.has(i)?a+" or "+wrong(a):a),maxMarks-maxMarks/groups.length,"two values offered in one cell"),
  F("blank",{},0),F("irrelevant",{answer:"no idea"},0),
  F("ceiling",fill(a=>a+" "+a),{min:0,max:maxMarks}),
 ]};
}

/**
 * @param item   source bank item (prompt, marks, response, markScheme)
 * @param others written answers from other items of the same paper, used as
 *               on-topic but wrong answers
 * @param curated extra fixtures for this criterion
 */
/** Word equations: one mark for the reactants, one for the products. */
function wordEquationFixtures(maxMarks,equation){
 const [left,right]=equation.split(/\s*→\s*/);
 const plain=s=>s.replace(/\s*\([^)]*\)/g,"");
 const swapped=`${plain(right)} → ${plain(left)}`;
 const wrongProducts=`${plain(left)} → ${plain(right).split(/\s+\+\s+/).map((x,i)=>i===0?"salt":x).join(" + ")}`;
 return {kind:"structured",allOrNothing:false,sourceAnswer:{answer:equation},alternatives:[],fixtures:[
  F("full",{answer:equation},maxMarks),
  F("equivalent",{answer:plain(equation).replace("→","->")},maxMarks,"ASCII arrow, no bracketed synonyms"),
  F("partial",{answer:wrongProducts},1,"reactants right, a product wrong"),
  F("incorrect",{answer:swapped},0,"reactants and products reversed"),
  F("competing",{answer:equation+"\n"+swapped},0),
  F("blank",{answer:""},0),F("irrelevant",{answer:"I caught the bus to town on Tuesday."},0),
  F("ceiling",{answer:equation+" "+equation},{min:0,max:maxMarks}),
 ]};
}

/**
 * "About 89-92 g ... (2)" estimate items read from a graph in the same
 * question, with credit for values consistent with the student's own graph.
 */
function estimateFixtures({item,maxMarks,criterionId,graph}){
 const head=cleanSourcePoint(item.markScheme.points[0]);
 const m=head.match(/^(?:about|approximately|approx\.?|roughly)\s+([\d.]+)(?:\s*[-–]\s*([\d.]+))?\s*(.*)$/i);
 const a=Number(m[1]),b=m[2]?Number(m[2]):a,unit=m[3]||"";
 const decimals=Math.max((m[1].split(".")[1]||"").length,(String(m[2]||"").split(".")[1]||"").length);
 const mid=((a+b)/2).toFixed(decimals);
 const far=((Math.max(a,b)||1)*3).toFixed(decimals);
 const fixtures=[
  F("full",{answer:`${mid} ${unit}`.trim()},maxMarks),
  F("equivalent",{answer:`about ${b.toFixed(decimals)}`},maxMarks,"upper end of the range"),
  F("incorrect",{answer:`${far} ${unit}`.trim()},0,"far outside the range, no graph drawn"),
  F("competing",{answer:`${mid} or ${far}`},0),
  F("blank",{answer:""},0),
  F("irrelevant",{answer:"The graph goes up."},0),
  F("ceiling",{answer:`${mid} ${mid}`},{min:0,max:maxMarks}),
 ];
 if(graph){
  // The student's own graph is shifted up by 20 %: reading it at the asked
  // x-value is a consistent follow-through answer.
  const x=Number((String(item.prompt).match(/[-+]?\d+(?:\.\d+)?/)||[])[0]);
  const pts=graph.item.response.points.map(p=>({x:Number(p.x),y:Number(p.y)*1.2}));
  const k=pts.findIndex((p,i)=>i>0&&x>=pts[i-1].x&&x<=p.x);
  if(k>0){
   const own=pts[k-1].y+(pts[k].y-pts[k-1].y)*(x-pts[k-1].x)/(pts[k].x-pts[k-1].x);
   const g={version:1,kind:"line",connection:"smooth",barWidth:.6,x:{min:"",max:"",step:""},y:{min:"",max:"",step:""},
    series:[{name:"data",points:pts.map(p=>`${p.x},${p.y}`).join("\n")}]};
   fixtures.push(F("follow-through",null,maxMarks,"consistent with the student's own (shifted) graph"));
   fixtures[fixtures.length-1].responses={[graph.id]:{graph:g},[criterionId]:{answer:own.toFixed(Math.max(decimals,2))}};
   fixtures.push(F("incorrect",null,0,"inconsistent with both the range and the student's own graph"));
   fixtures[fixtures.length-1].responses={[graph.id]:{graph:g},[criterionId]:{answer:(own*2.5).toFixed(Math.max(decimals,2))}};
  }
 }
 return {kind:"structured",allOrNothing:true,sourceAnswer:{answer:`${mid} ${unit}`.trim()},alternatives:[],fixtures};
}

export function scienceFixtures({item,maxMarks,others=[],curated=[],criterionId,graph=null}){
 const type=item.response?.type||"lines";
 if(type!=="graph"&&type!=="table"&&/^(?:about|approximately|approx\.?|roughly)\s+\d/i.test(cleanSourcePoint(item.markScheme?.points?.[0]||""))){
  const set=estimateFixtures({item,maxMarks,criterionId,graph});
  return {...set,fixtures:[...set.fixtures,...curated]};
 }
 if(type==="graph"){
  if(!Array.isArray(item.response.points)||!item.response.points.length)return {blocked:"graph-without-source-data"};
  const set=graphFixtures(item,maxMarks);return {...set,sourceAnswer:set.fixtures[0].response,
   alternatives:[],fixtures:[...set.fixtures,...curated]};
 }
 if(type==="table"){
  const set=tableFixtures(item,maxMarks);
  if(!set)return {blocked:"table-without-complete-answer-key"};
  return {...set,sourceAnswer:set.fixtures[0].response,alternatives:[],fixtures:[...set.fixtures,...curated]};
 }
 if(type==="drawing")return {blocked:"free-hand-drawing-requires-visual-judgement"};
 if(type==="labels")return {blocked:"label-items-handled-separately"};
 // Allocation notes ("1 mark for correct species; ...") explain the scheme;
 // they are not separate answer points.
 const raw=(item.markScheme?.points||[]).filter(Boolean).filter(p=>!/^\s*\d\s*marks?\s+(?:for|reactants)/i.test(p));
 if(raw.length===1&&/→/.test(raw[0])&&maxMarks>=2){
  const eq=cleanSourcePoint(raw[0]).replace(/\s*\((?:[a-z][a-z ,]*)\)\s*$/i,"").trim();
  // Word equations name substances in words ("glucose + oxygen").
  const word=/[a-z]{3,}/.test(eq.split("→")[0].replace(/\([^)]*\)/g,""));
  const set=word?wordEquationFixtures(maxMarks,eq):equationFixtures(item,maxMarks,eq);
  return {...set,fixtures:[...set.fixtures,...curated]};
 }
 // Examiner instructions are not answer content. An instruction that lists
 // acceptable content ("Give two justifications, such as protein, fibre...")
 // is answered with one of its examples, justified.
 const instruction=p=>/^\s*(?:award|give|accept|credit|any\s+(?:two|three|four)|up\s+to|do not award)\b/i.test(cleanSourcePoint(p));
 let points=raw.flatMap(subPoints).filter(p=>!/^\s*\(?accept\b/i.test(p)&&!/earns credit\.?$/i.test(p))
  .filter(p=>!instruction(p)||/\bsuch as\b/i.test(p));
 // A compound point ("A, so B") under-allocated by its scheme carries one
 // mark per claim.
 if(points.reduce((n,p)=>n+pointMarks(p),0)<maxMarks){
  const split=points.flatMap(p=>/\(\s*\d/.test(p)?[p]:p.split(/,\s+so\s+|;\s+(?=[a-z])/i).map(x=>x.trim()).filter(Boolean));
  if(split.length>points.length&&split.reduce((n,p)=>n+pointMarks(p),0)<=maxMarks)points=split;
 }
 const answers=points.map(p=>{
  if(!instruction(p))return pointAnswer(p);
  const example=cleanSourcePoint(p).match(/\bsuch as\s+([^,.;]+?)(?:,|\s+or\s+|\.|$)/i)?.[1]?.trim();
  return example?`${example.charAt(0).toUpperCase()+example.slice(1)} is included because it supports health`:null;
 }).filter(Boolean);
 if(!answers.length)return {blocked:"no-source-points"};
 const total=points.reduce((n,p)=>n+pointMarks(p),0);
 if(total<maxMarks)return {blocked:"scheme-points-below-maximum"};
 const full=answers.join(". ")+".";
 const fixtures=[F("full",{answer:full},maxMarks)];
 // Hand-written fixtures for an item replace the generated partial/incorrect
 // ones where the generated expectation cannot follow the item's scheme.
 const own=new Set(curated.map(c=>c.cls));
 if(maxMarks>=2&&answers.length>=2&&!own.has("partial")){
  const firstMarks=Math.min(maxMarks,pointMarks(points[0]));
  if(firstMarks<maxMarks)fixtures.push(F("partial",{answer:answers[0]+"."},firstMarks,"first scheme point only"));
 }
 // Only a fully reversed answer is a wrong answer: every point must have its
 // key claim reversed or its values changed, or some marks remain earned.
 // A changed number only makes a point wrong when the number is the point
 // ("37 °C"); a worded point needs its claim reversed.
 const numericOnly=a=>/\d/.test(a)&&!/[a-z]{4,}/i.test(a.replace(/\b(?:mol|dm|cm|kg|mg|min|day|days|kwh|ohm|per|mass)\b/gi,""));
 const reversed=answers.map(a=>antonymSwap(a)??(numericOnly(a)?perturbNumbers(a):null));
 if(reversed.every(Boolean))
  fixtures.push(F("incorrect",{answer:reversed.join(". ")+"."},0,"every source statement reversed"));
 const offTopic=others.find(o=>o&&!answers.some(a=>o.toLowerCase().includes(a.toLowerCase().slice(0,12))));
 if(offTopic)fixtures.push(F("incorrect",{answer:offTopic},0,"answer to a different question on this paper"));
 fixtures.push(
  // Denying the first point removes its credit, unless the point is a list
  // of examples ("e.g. a; b; c"), where the other examples remain valid.
  F("contradiction",{answer:full+"\nIt is false that "+answers[0].charAt(0).toLowerCase()+answers[0].slice(1)+"."},
   {min:0,max:/^\s*(?:e\.g|for example)/i.test(points[0])?maxMarks:Math.max(0,maxMarks-Math.min(maxMarks,pointMarks(points[0])))}),
  F("keyword-list",{answer:[...new Set(full.toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(w=>w.length>3))].join(" ")},{min:0,max:maxMarks}),
  F("blank",{answer:""},0),
  F("irrelevant",{answer:"I caught the bus to town on Tuesday."},0),
  // Capital letters inside unrelated words are not answers.
  F("irrelevant",{answer:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"},0,"letters inside unrelated words"),
  F("ceiling",{answer:full+"\n"+full},{min:0,max:maxMarks}),
  ...letterFixtures(item,points,answers),
  ...curated);
 // One statement carrying every mark ("Warm an ammonium salt with a strong
 // alkali (2)") is all-or-nothing as the scheme is written.
 return {kind:"written",allOrNothing:points.length===1,sourceAnswer:{answer:full},alternatives:[],fixtures};
}
