import { readScienceGraph, graphPoints, graphAxis } from "../../integratedScience/practice/scienceGraphModel";
import { matchScienceWrittenEvidence } from "../../grading/scienceWrittenEvidence";
// Chemistry Paper 02 deterministic practice grader.
// Authored mark schemes remain the source of truth. Free-response scores are estimates.

export const CHEMISTRY_P2_GRADER_VERSION="1.2.0";

const STOP=new Set("a an and are as at be because been by for from has have in into is it of on or that the their then this to was were when which with".split(" "));
const SYN={
  oxidised:["oxidized","oxidation"],oxidized:["oxidised","oxidation"],
  sulphate:["sulfate"],sulfate:["sulphate"],
  sulphuric:["sulfuric"],sulfuric:["sulphuric"],
  colourless:["colorless"],colorless:["colourless"],
  aluminium:["aluminum"],aluminum:["aluminium"],
  precipitate:["ppt"],
  electrons:["electron"],ions:["ion"],
  mol:["mole","moles"],moles:["mol","mole"],
  // Shared with Integrated Science, which marks written points with this grader.
  microorganisms:["microbes","germs","bacteria"],microorganism:["microbe","germ","bacterium"],
  insect:["insects","bee","bees"],insects:["insect","bee","bees"],
  chloroplast:["chloroplasts"],chloroplasts:["chloroplast"],
  nitrate:["nitrates","nitrogen compounds"],nitrates:["nitrate","nitrogen compounds"],
  gravity:["gravitational","gravitation"],gravitational:["gravity","gravitation"],
  dilute:["diluted","low concentration"],concentrated:["high concentration","stronger solution"],
  permeable:["selectively permeable","semi permeable","semipermeable"],
};

function clean(value){
  return String(value??"").toLowerCase()
    .replace(/[–—−⁻₋]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
    .replace(/[₀-₉]/g,ch=>String("₀₁₂₃₄₅₆₇₈₉".indexOf(ch)))
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,ch=>String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(ch)))
    .replace(/⁺/g,"+")
    // A full stop ends a sentence ("Yeast.") unless it is a decimal point.
    .replace(/(?<!\d)\.|\.(?!\d)/g," ")
    .replace(/[^a-z0-9.+/%°=^*()\-]+/g," ")
    .replace(/\s+/g," ").trim();
}
export const normalizeChemistryResponse=clean;
const stem=t=>t.replace(/(ing|ed|es|s)$/,"");
function tokens(value){return clean(value).split(" ").filter(t=>t&&t.length>1&&!STOP.has(t));}
function tokenPresent(text,token){
  const c=clean(text),t=clean(token);
  if((" "+c+" ").includes(" "+t+" ")) return true;
  if((SYN[t]||[]).some(v=>(" "+c+" ").includes(" "+clean(v)+" "))) return true;
  const wanted=stem(t);
  return tokens(c).some(v=>stem(v)===wanted||v===t.replace(/s$/,"")||t===v.replace(/s$/,""));
}
function strip(point){
  return String(point||"")
    // Inline acceptance notes ("(accept goggles, gloves ...)") widen the
    // point; they are not text the candidate must write. Nor are examples
    // inside a point ("..., e.g. amino acids to make proteins").
    .replace(/\s*\((?:accept|allow)\b[^)]*\)/gi,"")
    .replace(/\s*\((?:e\.g\.?|for example)[^)]*\)/gi,"")
    .replace(/(?<=\S),?\s+(?:e\.g\.?|for example)\s.*$/i,"")
    .replace(/\(\s*\d(?:\s*\+\s*\d)*(?:\s+[a-z ]+)?\s*\)/gi,"")
    .replace(/\([^)]*\b(?:1|2|3|4|5|6)\s*\)/gi,"")
    .replace(/^\s*(?:OR|Accept:)\s*/i,"")
    .trim();
}
/**
 * Alternatives a point allows. " / " and " or " separate whole alternatives;
 * an unspaced slash between words offers word choices within one statement
 * ("melting/freezing point" = "melting point" or "freezing point"), never a
 * bare one-word alternative. Slashes in units or arithmetic ("1/time",
 * "g/mol", "4.90/98") are not alternatives.
 */
function alternatives(point){
  // "e.g. salt - high blood pressure; MSG - headaches; ..." lists examples:
  // any one of them is the point.
  const examples=strip(point).match(/^\s*(?:e\.g\.?|for example)\s*,?\s*(.+)$/i);
  // Upper-case OR and a spaced slash separate whole answers. A lower-case
  // "or" between two words offers word alternatives inside one statement:
  // "does not blur or absorb the light" = "does not blur the light" or "does
  // not absorb the light", never a bare fragment "absorb the light".
  const whole=(examples?examples[1].split(/\s*;\s*/):strip(point).split(/\s+OR\s+|\s+\/\s+/))
    .flatMap(v=>{
      const pair=v.match(/\b([A-Za-z-]+)\s+or\s+([A-Za-z-]+)\b/);
      return pair?[v.replace(pair[0],pair[1]),v.replace(pair[0],pair[2])]:[v];
    })
    .map(v=>v.trim()).filter(Boolean);
  const out=[];
  for(const alt of whole){
    const slash=alt.match(/(?<![\d/])\b([A-Za-z][A-Za-z-]*)(?:\/[A-Za-z][A-Za-z-]*)+\b(?![\d/])/);
    if(!slash||/^(?:mol|dm|cm|g|s|min|kg|m)\b/i.test(slash[0].split("/")[1]))out.push(alt);
    else for(const option of slash[0].split("/"))out.push(alt.replace(slash[0],option));
  }
  return out.filter(Boolean);
}
const compact=value=>clean(value).replace(/\s+/g,"");
// The compact written form of a symbol, as a whole token: "Q" is not found
// inside "ZXQJ", nor "O2" inside "CO2". A leading coefficient ("2H2O") is
// allowed before a symbol that starts with a letter.
function symbolPresent(response,reference){
  const ref=compact(reference);
  if(!ref)return false;
  const body=[...ref].map(ch=>ch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("\\s*");
  const before=/^[0-9.]/.test(ref)?"(?<![a-z0-9.])":"(?<![a-z])";
  return new RegExp(before+body+"(?![a-z0-9])").test(clean(response));
}
// "a form of energy", "a type of", "a kind of" are filler: "Heat is energy"
// states "Heat is a form of energy".
const pointTokens=value=>tokens(String(value).replace(/\b(?:form|type|kind)\s+of\s+/gi,""))
  .filter(t=>!/^(mark|marks|one|two|three|four|five|six|any)$/.test(t));
function textMatch(response,reference,siblings=[]){
  // A symbolic point ("Q = It", "C₃H₇OH") has no word tokens to compare;
  // compare the compact written form instead.
  if(!tokens(reference).filter(t=>!/^(mark|marks|one|two|three|four|five|six|any)$/.test(t)).some(t=>/[a-z]{2}/.test(t)&&!/\d/.test(t)))
    return symbolPresent(response,reference);
  const found=matchScienceWrittenEvidence(response,reference,{tokens:pointTokens,tokenPresent});
  if(!found.matched)return false;
  // The sentence credited must be about this point, not a sibling point
  // sharing most of its words: "CO2 diffuses into the alveoli, so exhaled
  // air has less of them" is not "oxygen diffuses into the blood, so
  // exhaled air has less oxygen". It needs half the terms only this point has.
  const distinctive=[...new Set(pointTokens(reference))]
    .filter(t=>!siblings.some(other=>tokenPresent(other,t)));
  return distinctive.filter(t=>tokenPresent(found.evidence,t)).length>=Math.ceil(distinctive.length/2);
}
function numbers(value){
  return [...String(value||"").matchAll(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*[x×*]\s*10\s*\^?\s*[+-]?\d+)?/gi)]
    .map(m=>Number(m[0].replace(/[x×*]\s*10\s*\^?\s*/i,"e").replace(/\s+/g,"")))
    .filter(Number.isFinite);
}
function numericExpected(point){
  const whole=strip(point);
  // In "80 °C: liquid particles ..." the number is the label, not the answer:
  // only a value on the right of "=" or ":" is a target.
  const p=/[=:]/.test(whole)?whole.split(/[=:]/).pop():whole;
  // Do not treat incidental counts or chemical subscripts as target answers.
  if(/\b(?:question|figure|diagram|marks?|steps?|examples?)\b/i.test(p)||
    /\b(?:[A-Z][a-z]?\d+[A-Z][A-Za-z\d]*|[A-Z]{2}\d+)\b/.test(p))return [];
  if(/[a-z]{3,}/i.test(p.replace(/\b(?:mol|dm|cm|kg|mg|g|s|min|kj|j|pa|kpa|°c|k|ml|l|per|water|solution)\b/gi,"")))return [];
  const values=numbers(p);
  const bareNumeric=/^\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*(?:%|°c|g|kg|mg|mol|mmol|ml|l|cm\^?[23]?|dm\^?[23]?|s|k|pa|j|kj))?\s*$/i.test(p);
  const namedQuantity=/\b(?:mass|moles?|volume|concentration|temperature|pressure|time|rate|ph|density|percentage|titre|yield|value|answer)\b/i.test(p);
  // A number in descriptive text is not automatically a numerical answer.
  return values.length===1&&(bareNumeric||namedQuantity||/[=:]/.test(whole))?values:[];
}
// An explicitly labelled final result outranks earlier working. A student
// who gives mutually competing numeric finals has not supplied one result.
// This extractor is used for calculation points AND numeric table entries.
export function chemistryFinalNumericEvidence(response){
  const source=String(response??"");
  const declarations=[...source.matchAll(/\b(?:final\s+answer|answer|ans)\s*(?:is\s+|[:=]\s*)([^\n;]+)/gi)];
  if(declarations.length>1)return {values:[],ambiguous:true,declared:true};
  const selected=declarations.length?declarations[0][1]:source;
  // "25 or 30" and "either 25 or 30" are competing, not one answer.
  if(/[-+]?(?:\d+(?:\.\d*)?|\.\d+)\s+(?:or|versus|vs\.?)\s+[-+]?(?:\d+(?:\.\d*)?|\.\d+)/i.test(selected))
    return {values:[],ambiguous:true,declared:Boolean(declarations.length)};
  const values=numbers(selected);
  return {values,ambiguous:Boolean(declarations.length)&&values.length!==1,
    declared:Boolean(declarations.length)};
}
// "Protons = 12" names its quantity. The value must be stated for that
// label, in the same segment, not merely appear somewhere in the answer;
// otherwise one "12" would satisfy protons, neutrons and electrons at once.
function pointLabel(reference){
  const m=strip(reference).match(/^(.*[a-z][^=:]*?)\s*[=:]\s*[^=:]+$/i);
  return m?clean(m[1]):"";
}
function labelledValues(response,label){
  const words=label.split(" ").filter(w=>/[a-z]/.test(w));
  // Segment the written answer before normalising, so the full stops that
  // separate working lines still separate them.
  const segments=String(response??"").split(/[;,\n]|(?<!\d)\.(?!\d)/).map(clean).filter(Boolean);
  return segments.flatMap(segment=>{
    let at=segment.indexOf(label),from=at>=0?at+label.length:-1;
    if(from<0&&words.length&&words.every(w=>segment.split(" ").some(t=>t===w||t.startsWith(w+"=")))){
      const last=words[words.length-1];from=segment.indexOf(last)+last.length;
    }
    if(from<0)return [];
    // Only the value(s) stated for this label, up to the next labelled quantity.
    const rest=segment.slice(from);
    const next=rest.slice(1).search(/[a-z]{2,}[a-z0-9() ]*=/);
    return numbers(next>=0?rest.slice(0,next+1):rest);
  });
}
function numericMatch(response,expected,reference){
  const label=pointLabel(reference);
  const evidence=chemistryFinalNumericEvidence(response);
  const got=label?labelledValues(response,label):evidence.ambiguous?[]:evidence.values;
  const printed=strip(reference).match(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*[x×*]\s*10\s*\^?\s*[+-]?\d+)?/i)?.[0]||"";
  const mantissa=printed.split(/\s*[x×*]\s*10/i)[0];
  const decimals=(mantissa.split(".")[1]||"").length;
  const exponent=Number(printed.match(/\s*[x×*]\s*10\s*\^?\s*([+-]?\d+)/i)?.[1]||0);
  const tolerance=Math.max(1e-12,0.5*10**(exponent-decimals)+1e-12);
  return got.some(a=>expected.some(b=>Math.abs(a-b)<=tolerance));
}

// A point's own mark value: "(2)", "(1+1 explanation)", or several "(1)"
// annotations inside one point ("Use a lid (1) and/or better insulation (1)").
// Points without an annotation are worth one mark.
export function chemistryPointMarks(point){
  const annotations=[...String(point||"").matchAll(/\(\s*(\d(?:\s*\+\s*\d)*)(?:\s+[a-z ]+)?\s*\)/gi)];
  if(!annotations.length)return 1;
  return annotations.reduce((sum,m)=>sum+m[1].split("+").reduce((n,v)=>n+Number(v),0),0);
}
/** "Use a lid (1) and/or better insulation (1)" -> two one-mark points. */
export function chemistrySubPoints(point){
  const text=String(point||"");
  const parts=[...text.matchAll(/((?:[^()]|\((?!\s*\d\s*\))[^()]*\))*?)\(\s*(\d)\s*\)/g)].map(m=>[m[1],Number(m[2])]);
  if(parts.length<2)return [text];
  return parts.map(([body,marks])=>body.replace(/^\s*(?:and\/or|and|or|,|;)\s*/i,"").trim()+` (${marks})`);
}

// ---------------------------------------------------------------------------
// balanced chemical equations
// ---------------------------------------------------------------------------
const SUB="₀₁₂₃₄₅₆₇₈₉",SUP="⁰¹²³⁴⁵⁶⁷⁸⁹";
function equationText(value){
  return String(value??"")
    .replace(/[₀-₉]/g,ch=>String(SUB.indexOf(ch)))
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+[⁺⁻]|[⁺⁻]/g,ch=>"^"+ch.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,d=>String(SUP.indexOf(d))).replace("⁺","+").replace("⁻","-"))
    .replace(/\^(\d*)([+-])/g,"^$1$2")
    .replace(/\s*(?:→|⟶|⇌|-+>|=+>|=)\s*/g," → ")
    .replace(/^[^→]*?\b(?:equation|answer)\b[^:→]*:\s*/i,"");
}
function parseSpecies(raw){
  // Electrons in a half-equation: "2e⁻", "2 e-".
  const electron=String(raw).trim().match(/^(\d+)?\s*e\s*\^?\s*-$/);
  if(electron)return {coefficient:Number(electron[1]||1),formula:"e-",state:null};
  // The formula is matched lazily so a trailing state symbol "(s)" is read
  // as the state, not as part of the formula.
  const m=String(raw).trim().match(/^(\d+)?\s*([A-Z][A-Za-z0-9()]*?(?:\^\d*[+-])?)\s*(?:\((s|l|g|aq)\))?$/);
  return m?{coefficient:Number(m[1]||1),formula:m[2],state:m[3]||null}:null;
}
function parseSide(text){
  // "+" separates species unless it closes a charge ("Cu^2+").
  const pieces=String(text).split(/(?<!\^\d*)\s*\+\s*(?![^(]*\))/).map(s=>s.trim()).filter(Boolean);
  const species=pieces.map(parseSpecies);
  return species.every(Boolean)?species:null;
}
export function parseChemicalEquation(value){
  // Conditions after the equation ("(light, chlorophyll)") are not species.
  const sides=equationText(value).replace(/\s*\((?:[a-z][a-z ,]*)\)\s*\.?\s*$/i,"").split(" → ");
  if(sides.length!==2)return null;
  const left=parseSide(sides[0]),right=parseSide(sides[1]);
  return left&&right&&left.length&&right.length?{left,right}:null;
}
const sameMultiset=(a,b)=>a.length===b.length&&[...a].sort().join("|")===[...b].sort().join("|");
/**
 * CXC equation marking: one mark for the correct formulae of every reactant
 * and product, one for correct balancing (coefficients in the same ratio,
 * and matching state symbols when the question asks for them).
 */
export function markChemicalEquation(response,expectedText,{marks=2,stateSymbols=false}={}){
  const expected=parseChemicalEquation(expectedText);
  if(!expected)return null;
  const lines=String(response??"").split(/\n|;/).map(parseChemicalEquation).filter(Boolean);
  if(lines.length>1)return {formulae:false,balanced:false,score:0,parsed:true,competing:true};
  const got=lines[0];
  if(!got)return {formulae:false,balanced:false,score:0,parsed:false};
  const formulae=sameMultiset(got.left.map(s=>s.formula),expected.left.map(s=>s.formula))&&
    sameMultiset(got.right.map(s=>s.formula),expected.right.map(s=>s.formula));
  let balanced=false;
  if(formulae){
    const all=s=>[...s.left.map(x=>["L",x]),...s.right.map(x=>["R",x])];
    const key=([side,x])=>side+x.formula;
    const want=new Map(all(expected).map(e=>[key(e),e[1]]));
    const pairs=all(got).map(e=>[e[1],want.get(key(e))]);
    const ratio=pairs[0][0].coefficient/pairs[0][1].coefficient;
    balanced=pairs.every(([g,w])=>Math.abs(g.coefficient/w.coefficient-ratio)<1e-9)&&
      (!stateSymbols||pairs.every(([g,w])=>g.state===w.state));
  }
  const score=Math.min(marks,(formulae?1:0)+(balanced?Math.max(1,marks-1):0));
  return {formulae,balanced,score,parsed:true};
}

/**
 * A working step such as "moles = 4.90/98" or "= 100 × 4.18 × 10.8": the
 * arithmetic set-up the examiner credits. It is shown when one segment of the
 * response contains every operand, or when the response reaches its value.
 */
function expressionStep(point){
  // "label = expression" or a chain "label = expression = value".
  const pieces=strip(point).split(/[=:]/).map(x=>x.trim()).filter(Boolean);
  const arithmetic=x=>/^[\d.\s+\-×x*/÷()]+$/.test(x)&&numbers(x.replace(/[×x*/÷+()]/g," ")).length>=2;
  const rhs=pieces.find(arithmetic);
  if(!rhs)return null;
  const operands=numbers(rhs.replace(/[×x*/÷+()]/g," "));
  let value=null;
  const stated=pieces.slice(pieces.indexOf(rhs)+1).map(x=>numbers(x)).find(v=>v.length===1);
  if(stated)value=stated[0];
  else try{value=Function(`"use strict";return (${rhs.replace(/[×x]/g,"*").replace(/÷/g,"/")})`)();}catch{value=null;}
  return {operands,value:Number.isFinite(value)?value:null};
}
/** "mole ratio HCl:NaOH = 1:1": a stated ratio, compared as a ratio. */
function ratioPoint(point){
  const m=strip(point).match(/=\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)\s*$/);
  return m?{a:Number(m[1]),b:Number(m[2])}:null;
}
function ratioShown(response,ratio){
  const stated=[...String(response??"").matchAll(/(?<![\d.])(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)(?!\d|\.\d)/g)]
    .map(m=>[Number(m[1]),Number(m[2])]).filter(([a,b])=>a>0&&b>0);
  // Two different ratios offered is a competing answer.
  const distinct=new Set(stated.map(([a,b])=>(a/b).toFixed(9)));
  return distinct.size===1&&Math.abs(stated[0][0]*ratio.b-stated[0][1]*ratio.a)<1e-9;
}
/** Points decided by values and arithmetic, not by wording. */
export function chemistryPointIsNumeric(point){
  return Boolean(ratioPoint(point))||Boolean(expressionStep(point))||numericExpected(point).length>0;
}
/**
 * The step is shown when the operands appear together in one written
 * arithmetic expression ("2.0 × 2", "4.90/98"), or when its value is stated
 * as a result ("= 0.0500", "0.0500 mol") rather than merely occurring among
 * other numbers (a coordinate list, a date, a reading).
 */
function expressionShown(response,step){
  const text=String(response??"").replace(/(\d),(?=\d{3}\b)/g,"$1");
  const near=(a,b)=>Math.abs(a-b)<=Math.max(1e-9,Math.abs(b)*0.005);
  const expressions=[...text.matchAll(/[-+]?\d+(?:\.\d+)?(?:\s*[×x*\/÷+\-−]\s*\(?\s*[-+]?\d+(?:\.\d+)?\s*\)?)+/g)]
    .map(m=>numbers(m[0].replace(/[×x*\/÷+()]/g," ")));
  if(expressions.some(got=>step.operands.every(o=>got.some(g=>near(g,o)))))return true;
  if(step.value===null)return false;
  const results=[...text.matchAll(/=\s*\$?\s*([-+]?\d+(?:\.\d+)?)/g)].map(m=>Number(m[1]));
  return results.some(v=>near(v,step.value));
}

/**
 * The marked points of a written science item. Sub-points marked inside one
 * scheme point are separated; where the scheme allocates more marks than its
 * points carry, a compound point ("A, so B", "A; B") is read as one mark per
 * claim, as an examiner reads a two-mark hypothesis or explanation.
 */
export function scienceMarkedPoints(item){
  let points=(item?.markScheme?.points||[]).filter(Boolean).flatMap(chemistrySubPoints);
  const marks=Number(item?.marks||0);
  const total=list=>list.reduce((n,p)=>n+chemistryPointMarks(p),0);
  if(total(points)<marks){
    const split=points.flatMap(p=>/\(\s*\d/.test(p)?[p]:
      String(p).split(/,\s+so\s+|;\s+(?=[a-z])/i).map(x=>x.trim()).filter(Boolean));
    if(split.length>points.length&&total(split)<=marks)points=split;
  }
  return points;
}

/**
 * Point-by-point marking of a written science item against its scheme:
 * worded points, labelled values, ratios, arithmetic steps, equations and
 * graph-reading estimates. Shared by Chemistry and Integrated Science.
 */
export function gradeSciencePointLines(base,item,response){
  return lineResult(base,item,response);
}

/** A single-point item whose answer is a chemical equation. */
// A scheme line that only explains the allocation ("1 mark for correct
// species; 1 mark for balanced charge"), not a separate marking point.
const allocationNote=point=>/^\s*\d\s*marks?\s+(?:for|reactants)/i.test(String(point||""));
// Reaction conditions written after an equation ("(light, chlorophyll)").
const withoutConditions=text=>String(text).replace(/\s*\((?:[a-z][a-z ,]*)\)\s*$/i,"").trim();
export function chemistryEquationPoint(item){
  const points=(item?.markScheme?.points||[]).filter(Boolean).filter(p=>!allocationNote(p));
  if(points.length!==1||!/→|⟶|⇌/.test(points[0]))return null;
  const text=withoutConditions(strip(points[0]));
  return parseChemicalEquation(text)?text:null;
}

// ---------------------------------------------------------------------------
// word equations
// ---------------------------------------------------------------------------
/**
 * "Glucose + oxygen → carbon dioxide + water + energy". Each species may name
 * an accepted synonym in brackets ("ethanol (alcohol)"); "energy" is
 * conventional and optional. One mark for the reactants, one for the products.
 */
function wordSpecies(side){
  return String(side).split(/\s+\+\s+|\s+and\s+/).map(s=>s.trim().toLowerCase()).filter(Boolean)
    .filter(s=>!/^(?:\d+\s*)?energy$|^(?:heat|light)\s+energy$/.test(s))
    .map(s=>{
      const names=[s.replace(/\s*\([^)]*\)\s*/g," ").trim(),...[...s.matchAll(/\(([^)]+)\)/g)].map(m=>m[1].trim())];
      return names.map(n=>n.replace(/\s+/g," ").replace(/\b(?:the|some)\s+/g,"")).filter(Boolean);
    });
}
export function wordEquationPoint(item){
  const points=(item?.markScheme?.points||[]).filter(Boolean).filter(p=>!allocationNote(p));
  if(points.length!==1||Number(item?.marks)<2)return null;
  const text=withoutConditions(strip(points[0]));
  const sides=text.split(/\s*(?:→|⟶|->)\s*/);
  if(sides.length!==2||parseChemicalEquation(text)||!/[a-z]{3}/i.test(sides[0]))return null;
  const left=wordSpecies(sides[0]),right=wordSpecies(sides[1]);
  return left.length&&right.length?{left,right}:null;
}
export function markWordEquation(response,spec){
  const lines=String(response??"").split(/\n|;/).filter(l=>/→|⟶|->|=|gives|produces/i.test(l));
  if(lines.length!==1)return {parsed:lines.length===0?false:true,left:false,right:false,competing:lines.length>1};
  const [l,r]=lines[0].split(/\s*(?:→|⟶|->|=|\bgives\b|\bproduces\b)\s*/i);
  const side=(written,want)=>{
    const got=wordSpecies(written||"").map(n=>n[0]);
    const named=want.every(names=>got.some(g=>names.some(n=>g===n||g===n+"s"||g+"s"===n)));
    return named&&got.length===want.length;
  };
  return {parsed:true,left:side(l,spec.left),right:side(r,spec.right)};
}
/**
 * "About 89-92 g per 100 g water (2)" / "Approximately 0.19 g (2)", usually
 * with "a value consistent with the student's graph earns credit". Inside the
 * stated range is certain credit; outside it may still follow through from
 * the student's own graph, which this item cannot see.
 */
export function chemistryEstimatePoint(item){
  const points=(item?.markScheme?.points||[]).filter(Boolean);
  const head=strip(points[0]||"");
  const m=head.match(/^(?:about|approximately|approx\.?|roughly)\s+([\d.]+)(?:\s*[-–]\s*([\d.]+))?/i);
  if(!m)return null;
  const a=Number(m[1]),b=m[2]?Number(m[2]):null;
  const decimals=(m[1].split(".")[1]||"").length;
  const pad=b===null?Math.max(0.5*10**-decimals,Math.abs(a)*0.05):0;
  return {low:b===null?a-pad:Math.min(a,b),high:b===null?a+pad:Math.max(a,b),
    followThrough:points.some(p=>/consistent with/i.test(p))};
}

function lineResult(base,item,response){
  const estimate=chemistryEstimatePoint(item);
  if(estimate){
    const maxMarks=Math.max(0,Number(item.marks||0));
    const evidence=chemistryFinalNumericEvidence(response);
    // The stated estimate is the first value; "per 100 g water" is its unit.
    const inRange=!evidence.ambiguous&&evidence.values.length>0&&
      evidence.values[0]>=estimate.low-1e-9&&evidence.values[0]<=estimate.high+1e-9;
    const answered=String(response||"").trim()!=="";
    return {score:inRange?maxMarks:0,maxMarks,unassessedMarks:0,estimate,
      confidence:inRange||!answered?"high":"low",
      provisional:answered&&!inRange&&estimate.followThrough,
      criteria:[{id:`${base}:estimate`,label:`Value between ${estimate.low} and ${estimate.high}`,
        marks:inRange?maxMarks:0,maxMarks,earned:inRange,evidence:response}]};
  }
  const words=wordEquationPoint(item);
  if(words){
    const maxMarks=Math.max(0,Number(item.marks||0));
    const r=markWordEquation(response,words);
    const score=Math.min(maxMarks,(r.left?1:0)+(r.right?Math.max(1,maxMarks-1):0));
    return {score,maxMarks,unassessedMarks:0,wordEquation:r,
      confidence:r.parsed?"high":"low",provisional:!r.parsed&&String(response||"").trim()!=="",
      criteria:[
        {id:`${base}:reactants`,label:"Reactants named correctly",marks:r.left?1:0,maxMarks:1,earned:r.left,evidence:response},
        {id:`${base}:products`,label:"Products named correctly",marks:r.right?Math.max(1,maxMarks-1):0,maxMarks:Math.max(1,maxMarks-1),earned:r.right,evidence:response},
      ]};
  }
  const equation=chemistryEquationPoint(item);
  if(equation){
    const maxMarks=Math.max(0,Number(item.marks||0));
    const r=markChemicalEquation(response,equation,{marks:maxMarks,
      stateSymbols:/state symbols/i.test(item.prompt||"")});
    const balanceMarks=Math.max(0,maxMarks-1);
    return {score:r.score,maxMarks,confidence:r.parsed?"high":"low",
      provisional:!r.parsed&&String(response||"").trim()!=="",unassessedMarks:0,equation:r,
      criteria:[
        {id:`${base}:formulae`,label:"Correct formulae of all reactants and products",marks:r.formulae?1:0,maxMarks:1,earned:r.formulae,evidence:response},
        ...(balanceMarks?[{id:`${base}:balanced`,label:"Correctly balanced"+(/state symbols/i.test(item.prompt||"")?" with state symbols":""),
          marks:r.balanced?balanceMarks:0,maxMarks:balanceMarks,earned:r.balanced,evidence:response}]:[]),
      ]};
  }
  const points=scienceMarkedPoints(item);
  const maxMarks=Math.max(0,Number(item.marks||0));
  const seen=new Set();
  const criteria=points.map((point,index)=>{
    // "e.g. 1.0 N × 40 cm = 40 N cm" illustrates an acceptable answer: it is
    // matched as an example, not as a required calculation.
    const example=/^\s*(?:e\.g\.?|for example)\b/i.test(String(point));
    const ratio=example?null:ratioPoint(point);
    const step=ratio||example?null:expressionStep(point);
    const refs=step||ratio?[strip(point)]:alternatives(point);
    const expectedNums=step||ratio||example?[]:numericExpected(point);
    const numeric=expectedNums.length>0;
    const selected=refs.find(ref=>ratio
      ?ratioShown(response,ratio)
      :step
      ?expressionShown(response,step)
      :numeric
      ?numericMatch(response,expectedNums,point)
      :textMatch(response,ref,points.filter((_,i)=>i!==index).map(strip)));
    const signature=selected?clean(strip(point)):"";
    const earned=Boolean(selected)&&!seen.has(signature);
    if(earned)seen.add(signature);
    const value=chemistryPointMarks(point);
    return {id:`${base}:p${index+1}`,label:strip(point),marks:earned?value:0,
      maxMarks:value,earned,evidence:earned?response:""};
  });
  // One authored point does not justify inventing several independent marks.
  // Any missing mark allocation requires a more detailed source rubric.
  const score=Math.min(maxMarks,criteria.reduce((sum,row)=>sum+row.marks,0));
  const available=points.reduce((sum,point)=>sum+chemistryPointMarks(point),0);
  const unresolved=String(response||"").trim()
    ?Math.max(0,maxMarks-Math.min(maxMarks,available)):0;
  return {score,maxMarks,criteria,confidence:"medium",provisional:true,
    unassessedMarks:unresolved,
    ...(unresolved?{reason:"Additional marks need separate verified marking criteria."}:{})};
}

function tableResult(base,item,responses){
  const table=item.response?.table||{};
  const answers=Array.isArray(table.answers)?table.answers:[];
  const blanks=[];
  (table.rows||[]).forEach((row,r)=>row.forEach((cell,c)=>{
    if(String(cell??"")==="")blanks.push(`${base}:r${r}c${c}`);
  }));
  const maxMarks=Number(item.marks||0);
  const marksPerCell=blanks.length ? maxMarks/blanks.length : 0;
  const isKeyed=index=>index<answers.length &&
    (Array.isArray(answers[index]) ? answers[index].length>0 : String(answers[index]??"").trim()!=="");
  const fullyKeyed=blanks.length>0 && blanks.every((_,i)=>isKeyed(i));
  const criteria=blanks.map((key,index)=>{
    const response=String(responses[key]??"");
    const expected=Array.isArray(answers[index])?answers[index]:isKeyed(index)?[answers[index]]:[];
    const earned=expected.some(v=>{
      const target=String(v).trim();
      const numeric=target!==""&&Number.isFinite(Number(target));
      if(!numeric)return textMatch(response,target);
      // Half of the final shown decimal place is the permitted rounding error.
      // Avoid the general numeric tolerance of 0.005 for small rates, e.g. 0.012.
      const decimals=(target.split(".")[1]||"").length;
      const tolerance=decimals ? 0.5*10**(-decimals)+1e-12 : 0.5+1e-12;
      // "0.012 or 0.020" in one cell offers two answers and earns nothing.
      const evidence=chemistryFinalNumericEvidence(response);
      const given=evidence.ambiguous?[]:evidence.values;
      return given.some(value=>Math.abs(value-Number(target))<=tolerance);
    });
    return {
      id:key,label:expected.join(" / ")||"Answer key needed",
      marks:earned?marksPerCell:0,maxMarks:marksPerCell,
      earned,evidence:response,provisional:!isKeyed(index)
    };
  });
  const groups=Array.isArray(table.markGroups)?table.markGroups:[];
  const orderedIndices=groups.flatMap(group=>Array.isArray(group)?group:[]);
  const groupsValid=groups.length>0 &&
    groups.every(group=>Array.isArray(group)&&group.length>0) &&
    orderedIndices.length===blanks.length &&
    new Set(orderedIndices).size===blanks.length &&
    orderedIndices.every(index=>Number.isInteger(index)&&index>=0&&index<blanks.length);
  const groupedCriteria=groupsValid?groups.map((group,index)=>{
    const complete=group.every(cellIndex=>criteria[cellIndex].earned);
    const keyed=group.every(cellIndex=>isKeyed(cellIndex));
    const marksForGroup=maxMarks/groups.length;
    return {
      id:`${base}:group${index+1}`,
      label:`Correct table entries ${group.map(cellIndex=>cellIndex+1).join(" and ")}`,
      marks:complete?marksForGroup:0,maxMarks:marksForGroup,
      earned:complete,evidence:group.map(cellIndex=>criteria[cellIndex].evidence).join(" | "),
      provisional:!keyed
    };
  }):null;
  const markedCriteria=groupedCriteria||criteria;
  const score=Math.min(maxMarks,markedCriteria.reduce((sum,row)=>sum+row.marks,0));
  const unassessedMarks=groupsValid
    ?groups.reduce((sum,group)=>sum+(group.some(index=>!isKeyed(index))?maxMarks/groups.length:0),0)
    :blanks.reduce((sum,_,i)=>sum+(isKeyed(i)?0:marksPerCell),0);
  return {
    score,maxMarks,criteria:markedCriteria,confidence:fullyKeyed?"high":"low",
    provisional:!fullyKeyed,unassessedMarks,
    ...(fullyKeyed?{}:{reason:"One or more table cells have no verified answer key and require review."})
  };
}

export function chemistryGraphAxisLabelMatches(actual,expected){
  const entry=String(actual||"").trim().toLowerCase();
  const target=String(expected||"").trim().toLowerCase();
  if(!entry)return false;
  if(!target)return true;
  const terms=["concentration","temperature","solubility","pressure","volume","energy","current","length","mass","rate","time"];
  const topic=terms.find(term=>new RegExp(`\\b${term}\\b`).test(target));
  if(topic&&!new RegExp(`\\b${topic}\\b`).test(entry))return false;
  const units=[
    {source:/°c|celsius/,provided:/°c|celsius|degrees?\s*c/},
    {source:/\bminutes?\b|\bmin\b/,provided:/\bminutes?\b|\bmin\b/},
    {source:/s⁻¹|s\^-?1|s-1/,provided:/s⁻¹|s\^-?1|s-1|per second/},
    {source:/\bg\b|\bgrams?\b/,provided:/\bg\b|\bgrams?\b/}
  ];
  return units.every(unit=>!unit.source.test(target)||unit.provided.test(entry));
}

/**
 * A scale earns its mark when both axes are valid linear scales (graphAxis:
 * uniform step, 1-20 intervals), every source point lies on the grid, and the
 * data spans at least half of each axis ("using most of the grid").
 */
export function chemistryGraphScale(graph,expected){
  const x=graphAxis(graph?.x),y=graphAxis(graph?.y);
  if(!x||!y||!expected.length)return {suitable:false,evidence:"invalid or missing axis scale"};
  const xs=expected.map(p=>Number(p.x)),ys=expected.map(p=>Number(p.y));
  const inside=xs.every(v=>v>=x.min-1e-9&&v<=x.max+1e-9)&&ys.every(v=>v>=y.min-1e-9&&v<=y.max+1e-9);
  const xCover=(Math.max(...xs)-Math.min(...xs))/(x.max-x.min);
  const yCover=(Math.max(...ys)-Math.min(...ys))/(y.max-y.min);
  const suitable=inside&&xCover>=0.5&&yCover>=0.5;
  return {suitable,evidence:`x ${x.min}-${x.max} step ${x.step}; y ${y.min}-${y.max} step ${y.step}; cover ${xCover.toFixed(2)}/${yCover.toFixed(2)}`};
}

function graphResult(base,item,responses){
  const expected=Array.isArray(item.response?.points)?item.response.points:[];
  const graph=readScienceGraph(responses[`${base}:graph`]) || null;
  const plotted=graph
    ? (graph.series || []).flatMap(series => graphPoints(series.points,graph.kind).filter(Boolean))
    : [];
  const rawPointCount=(graph?.series||[]).reduce((sum,series)=>
    sum+String(series.points||"").split(/\n|;/).filter(row=>row.trim()).length,0);
  // Identical coordinates are legitimate when two different series intersect.
  // Duplicates within the same series are still invalid.
  const validPoints=Boolean(graph)&&rawPointCount===plotted.length&&
    (graph.series||[]).every(series=>{
      const points=graphPoints(series.points,graph.kind).filter(Boolean);
      return new Set(points.map(p=>`${p.x},${p.y}`)).size===points.length;
    });

  const xLabel=String(responses[`${base}:xLabel`] || "").trim();
  const yLabel=String(responses[`${base}:yLabel`] || "").trim();
  const labelsOk=chemistryGraphAxisLabelMatches(xLabel,item.response?.x) &&
    chemistryGraphAxisLabelMatches(yLabel,item.response?.y);

  const xValues=expected.map(point=>Number(point.x)).filter(Number.isFinite);
  const yValues=expected.map(point=>Number(point.y)).filter(Number.isFinite);
  const xRange=xValues.length?Math.max(...xValues)-Math.min(...xValues):0;
  const yRange=yValues.length?Math.max(...yValues)-Math.min(...yValues):0;
  // Use the scale of the actual dataset, not a fixed 0.01 tolerance that
  // wrongly accepts substantially misplaced points on small-rate graphs.
  const xTolerance=Math.max(1e-7,xRange*0.015);
  const yTolerance=Math.max(1e-7,yRange*0.015);
  // Each student-plotted point can satisfy only one expected observation.
  // Otherwise a single mark near repeated/close targets inflates graph credit.
  const unused=new Set(plotted.map((_,index)=>index));
  let matched=0;
  if(validPoints && plotted.length<=expected.length)expected.forEach(target=>{
    const index=[...unused].find(i=>
      Math.abs(Number(plotted[i].x)-Number(target.x))<=xTolerance &&
      Math.abs(Number(plotted[i].y)-Number(target.y))<=yTolerance
    );
    if(index!==undefined){unused.delete(index);matched+=1;}
  });

  const max=Number(item.marks||0);
  const criteria=[];
  if(max>=1){
    criteria.push({
      id:`${base}:axes`,
      label:"Axes labelled with the required quantities and units",
      marks:labelsOk?1:0,maxMarks:1,earned:labelsOk,
      evidence:`${xLabel}; ${yLabel}`,
    });
  }

  // Schemes that award a separate scale mark ("suitable linear scales using
  // most of the grid") are marked 1+1+1+1: axes, scale, points, line.
  const schemeText=(item.markScheme?.points||[]).join(" ").toLowerCase();
  const scaleMark=max>=4&&/\bscales?\b/.test(schemeText);
  if(scaleMark){
    const scale=chemistryGraphScale(graph,expected);
    criteria.push({
      id:`${base}:scale`,label:"Suitable linear scales using most of the grid",
      marks:scale.suitable?1:0,maxMarks:1,earned:scale.suitable,evidence:scale.evidence,
    });
  }
  if(max>=2){
    const available=scaleMark?1:Math.min(2,Math.max(0,max-1));
    const plotMarks=expected.length&&matched===expected.length
      ? available
      : expected.length&&matched>=Math.ceil(expected.length*0.6)
        ? Math.min(1,available)
        : 0;
    criteria.push({
      id:`${base}:points`,
      label:"Required data points plotted accurately",
      marks:plotMarks,maxMarks:available,earned:plotMarks===available,
      evidence:`${matched}/${expected.length} matched`,
    });
  }

  const used=criteria.reduce((sum,row)=>sum+row.maxMarks,0);
  if(used<max){
    const source=`${item.prompt||""} ${(item.markScheme?.points||[]).join(" ")}`.toLowerCase();
    // The editor's "best-fit" is a straight line of best fit. Any requested
    // curve ("smooth best-fit curve", "best-fit curve") is a smooth curve.
    const wanted=/\bcurve\b|\bsmooth\b/.test(source)
      ? "smooth"
      : source.includes("line of best fit")||source.includes("best-fit")
        ? "best-fit"
        : null;
    const connection=String(graph?.connection || "");
    // Selecting a line style without plotting a graph is not evidence of a drawn fit.
    const styleOk=validPoints && plotted.length<=expected.length && matched>=2 &&
      (wanted ? connection===wanted : Boolean(connection && connection!=="none"));
    criteria.push({
      id:`${base}:fit`,
      label:wanted==="best-fit"?"Line of best fit selected":wanted==="smooth"?"Smooth best-fit curve selected":"Suitable line or curve selected",
      marks:styleOk?1:0,maxMarks:1,earned:styleOk,evidence:connection,
    });
  }

  const score=Math.min(max,criteria.reduce((sum,row)=>sum+row.marks,0));
  const assessed=criteria.reduce((sum,row)=>sum+row.maxMarks,0);
  // Every mark is decided from the structured graph (labels, axis scales,
  // plotted coordinates, selected line) against the source data: certain.
  const fullyAssessed=assessed===max&&expected.length>0;
  return {
    score,maxMarks:max,criteria,confidence:fullyAssessed?"high":"medium",
    provisional:!fullyAssessed,visualEvidenceRequired:!fullyAssessed,
    unassessedMarks:Math.max(0,max-assessed),
    reason:max>assessed?"Remaining graph presentation marks need visual examiner judgement.":undefined,
    visualEvidence:{plottedPoints:plotted.length,expectedPoints:expected.length,matchedPoints:matched,validPoints,connection:graph?.connection||null},
  };
}

function drawingResult(base,item,responses){
  let strokes=[];
  try{strokes=JSON.parse(responses[`${base}:strokes`]||"[]");}catch{}
  const note=responses[base]||"";
  const written=lineResult(base,item,note);
  const hasDrawing=Array.isArray(strokes)&&strokes.some(stroke=>Array.isArray(stroke)&&stroke.length>1);
  const score=hasDrawing?written.score:Math.min(written.score,Math.max(0,Number(item.marks||0)-1));
  return {...written,score,visualEvidenceRequired:true,confidence:"low",provisional:true,
    unassessedMarks:Math.max(0,Number(item.marks||0)-score),reason:"A labelled chemical drawing needs visual examiner review."};
}

export function gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses={}){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const type=item.response?.type||"lines";
  if(type==="table") return tableResult(base,item,responses);
  if(type==="graph") return graphResult(base,item,responses);
  if(type==="drawing") return drawingResult(base,item,responses);
  return lineResult(base,item,responses[base]||"");
}

export function gradeChemistryPaper2(paper,responses={}){
  const questions=(paper?.questions||paper||[]).map(question=>{
    const items=[];
    (question.parts||[]).forEach((part,partIndex)=>(part.items||[]).forEach((item,itemIndex)=>{
      items.push({questionId:question.id,partIndex,itemIndex,label:`${part.label||""} ${item.label||""}`.trim(),prompt:item.prompt,
        ...gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses)});
    }));
    const score=Math.min(Number(question.totalMarks||0),items.reduce((sum,row)=>sum+row.score,0));
    return {question,score,maxMarks:Number(question.totalMarks||0),items};
  });
  const score=questions.reduce((sum,row)=>sum+row.score,0);
  const maxScore=questions.reduce((sum,row)=>sum+row.maxMarks,0);
  const unassessedMarks=questions.reduce((sum,q)=>sum+q.items.reduce((n,item)=>n+(item.unassessedMarks||0),0),0);
  return {score,maxScore,percent:maxScore?Math.round(score/maxScore*100):0,questions,
    provisional:questions.some(q=>q.items.some(item=>item.provisional)),unassessedMarks,
    maxPossibleScore:Math.min(maxScore,score+unassessedMarks),
    graderVersion:CHEMISTRY_P2_GRADER_VERSION,
    note:"SPARK marks this practice paper against the authored Chemistry mark schemes. Free-response and drawing marks are estimates where examiner judgement is required."};
}
