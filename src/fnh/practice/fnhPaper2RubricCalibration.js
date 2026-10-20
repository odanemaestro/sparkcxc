/**
 * Source-linked deterministic FNH Paper 2 calibration.
 * Alternate phrasings are explicit teaching-domain equivalents rather than
 * general semantic guesses. Unmatched evidence remains unresolved.
 */
export const FNH_P2_RUBRIC_CALIBRATION_VERSION="fnh-p2-source-calibration-v2";

const canonicalWords={
  foods:"food",drinks:"drink",beverages:"drink",eating:"eat",consumed:"consume",
  consumption:"consume",nutrients:"nutrient",nutritional:"nutrition",healthier:"healthy",
  carbohydrates:"carbohydrate",carbs:"carbohydrate",starches:"starch",
  proteins:"protein",fats:"fat",lipids:"fat",vitamins:"vitamin",minerals:"mineral",
  vegetables:"vegetable",fruits:"fruit",legumes:"legume",beans:"legume",peas:"legume",
  lentils:"legume",greens:"vegetable",leafy:"leaf",calories:"energy",
  kilojoules:"energy",children:"child",infants:"infant",babies:"infant",
  older:"elderly",seniors:"elderly",adolescents:"teenager",teens:"teenager",
  cooking:"cook",cooked:"cook",boiling:"boil",boiled:"boil",
  bacteria:"bacterium",bacterial:"bacterium",germs:"bacterium",
  contamination:"contaminate",contaminated:"contaminate",
  illnesses:"illness",diseases:"disease",deficiencies:"deficiency",
  haemoglobin:"hemoglobin",haem:"heme",anaemia:"anemia",anaemic:"anemia",
  urinating:"urination",urinate:"urination",urinating:"urination",
  polydipsia:"thirst",thirsty:"thirst",polyuria:"urination",peeing:"urination",
  constipation:"constipation",bowels:"bowel",movements:"movement",
  fibre:"fiber",fibres:"fiber",dietary:"diet",digestion:"digest",
  absorbed:"absorb",absorption:"absorb",absorbing:"absorb",
  cholesterol:"cholesterol",bloodstream:"blood",
  glucose:"sugar",sugary:"sugar",sweetened:"sugar",sugars:"sugar",
  hypertension:"pressure",hydration:"water",dehydration:"dehydrate",
  inexpensive:"affordable",cheap:"affordable",lowcost:"affordable",
  economical:"affordable",expenditure:"cost",prices:"cost",price:"cost",
  income:"money",finances:"money",purchasing:"buy",
  exercising:"exercise",activities:"activity",vigorous:"intense",
  iron:"iron",calcium:"calcium",folate:"folate",folic:"folate",
  vitamin:"vitamin",ascorbic:"vitamin",riboflavin:"vitamin",
  safe:"safe",safely:"safe",safety:"safe",sterilise:"sterilize",
  pasteurisation:"pasteurize",pasteurization:"pasteurize",
  refrigeration:"refrigerate",refrigerated:"refrigerate",
  freezing:"freeze",frozen:"freeze",thawing:"thaw",
  preserving:"preserve",preservation:"preserve",storage:"store",
};
const stop=new Set("a an the and or of at in on for to by from with is are was were be being been it its that this these those such also may can could would should will must a person people one's another some into during through between each any who which as use used useful provides provide include includes including involving means mean needed need needs how why where when while about over more less than one two three four five six food".split(" "));
// Explicit references accepted as short, complete alternatives for common FNH
// facts in historical and original source banks. They are never universal
// stand-alone evidence for unrelated model points.
const preciseAlternatives=[
  // These acronyms are valid named organisations in the actual 2018
  // community-nutrition question. Do not require students to write full names.
  {source:/Caribbean Public Health Agency\s*\(CARPHA\)/i,accept:/\b(?:CARPHA|Caribbean Public Health Agency)\b/i},
  {source:/Caribbean Food and Nutrition Institute\s*\(CFNI\)/i,accept:/\b(?:CFNI|Caribbean Food and Nutrition Institute)\b/i},
  {source:/Ministry of Health and Wellness|public-health nutrition departments/i,
    accept:/\b(?:Ministry of Health(?: and Wellness)?|MOHW|public.health nutrition department)\b/i},
  {source:/partners such as PAHO or UNICEF/i,accept:/\b(?:PAHO|UNICEF|Pan American Health Organization)\b/i},
  {source:/increased thirst|polydipsia/i,accept:/\b(?:very thirsty|increased thirst|excessive thirst|polydipsia)\b/i},
  {source:/frequent urination|polyuria/i,accept:/\b(?:frequent urination|passing urine often|urinating frequently|polyuria)\b/i},
  {source:/unusual tiredness|fatigue/i,accept:/\b(?:tiredness|fatigue|extreme tiredness|always tired)\b/i},
  {source:/blurred vision/i,accept:/\b(?:blurred vision|blurry sight|blurred eyesight)\b/i},
  {source:/iron.deficiency an[ae]mia/i,accept:/\b(?:iron deficiency|iron.deficiency an[ae]mia|low iron|lack of iron)\b/i},
  {source:/constipation|bowel movement/i,accept:/\b(?:(?:prevent|prevents|preventing|reduce|reduces|relieve|relieves|avoid|avoids|ease|eases)\s+(?:\w+\s+){0,3}constipation|constipation\s+(?:prevention|relief)|regular\s+bowel\s+movements?|soft(?:er)?\s+stools?)\b/i},
  {source:/lower (?:ldl )?cholesterol/i,accept:/\b(?:reduce|lower|decrease)\s+(?:(?:bad|ldl)\s+)?cholesterol\b/i},
  {source:/liver contains dietary iron/i,accept:/\b(?:liver|organ meat).{0,42}\b(?:iron|hemoglobin|haemoglobin)\b/i},
  {source:/vitamin c.*absorp|absorp.*vitamin c/i,accept:/\bvitamin\s*c\b.{0,65}\b(?:iron|absorb|absorption)\b/i},
  {source:/(?:orange juice|citrus).*(?:vitamin c)/i,accept:/\b(?:orange|citrus|guava|lime).{0,38}\bvitamin\s*c\b/i},
  {source:/carbohydrates?\./i,accept:/\b(?:carbohydrates?|carbs?|starches?)\b/i},
  {source:/proteins?\./i,accept:/\b(?:proteins?)\b/i},
  {source:/fats? or lipids?/i,accept:/\b(?:fats?|lipids?)\b/i},
  {source:/high blood pressure|hypertension/i,accept:/\b(?:hypertension|high blood pressure)\b/i},
  {source:/diabetes mellitus/i,accept:/\b(?:diabetes|diabetes mellitus)\b/i},
  {source:/water.*(?:added )?sugar/i,accept:/\bwater\b.{0,55}\b(?:sugar|sweet|calori|energy)\w*\b/i},
  {source:/financial|household income|available money/i,accept:/\b(?:budget|income|affordability|household money|family income|cost)\b/i},
];

const negation=/\b(?:not|never|no|cannot|can't|couldn't|won't|doesn'?t|don'?t|isn'?t|didn'?t|without|lack of|absence of|fails?\s+to|unable\s+to|false\s+that|is\s+false|incorrect\s+to\s+say)\b/i;
const isNegative=value=>negation.test(String(value??"").replace(/[’‘]/g,"'"));
// A full stop ends a sentence unless it is a decimal point; after a number
// ("... J$2,500. Use ...") it still ends one when a capital letter follows.
const split=value=>String(value??"").split(/[;\n]+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|(?<=\d)\.\s+(?=[A-Z])/)
  .map(v=>v.trim()).filter(Boolean);
const words=value=>String(value??"").toLowerCase().replace(/[’‘]/g,"'")
  .match(/[a-z]+|\d+(?:\.\d+)?/g)||[];
const canonical=w=>canonicalWords[w]||w.replace(/(?<=\w{4})s$/,"");
const keyTerms=value=>[...new Set(words(value).filter(w=>w.length>2&&!stop.has(w)).map(canonical))];
const isInstruction=value=>/^\s*(?:award|give|accept|credit|any\s+(?:two|three|four)|up\s+to|one\s+mark|do not award|the source.year)\b/i.test(value);
const numbers=value=>String(value??"").match(/(?<!\w)[+-]?\d+(?:\.\d+)?(?!\w)/g)||[];

/**
 * The faithful forms of one model point:
 *  - as written;
 *  - with illustrative examples ("such as ...", "e.g. ...", "for example ...")
 *    made optional: they show acceptable answers, they are not all required;
 *  - "Label: a, b, c or d" as the label with any ONE listed item
 *    ("Iron: red meat, fish ... or dark leafy greens" -> "Iron red meat").
 */
export function fnhReferenceForms(reference){
  const forms=[reference];
  const withoutExamples=reference
    .replace(/,?\s*\b(?:such as|e\.g\.|for example|including|like)\b[^;.]*?(?=(?:\s+and\s+[a-z]+\s)|[;.]|$)/gi,"")
    .replace(/\s{2,}/g," ").trim();
  if(withoutExamples&&withoutExamples!==reference)forms.push(withoutExamples);
  // "cooked/ready-to-eat foods" offers either word, not both.
  const slash=reference.match(/(?<![\d/])\b([A-Za-z][A-Za-z-]*)(?:\/[A-Za-z][A-Za-z-]*)+\b(?![\d/])/);
  if(slash)for(const option of slash[0].split("/"))forms.push(reference.replace(slash[0],option));
  const labelled=reference.match(/^([^:;]{2,40}):\s*(.+?)\.?$/);
  if(labelled&&/,|\bor\b/.test(labelled[2]))
    for(const option of labelled[2].split(/,\s*|\s+or\s+/).map(x=>x.trim()).filter(Boolean))
      forms.push(labelled[1]+" "+option);
  return forms;
}
// Responses are compared clause by clause and as whole sentences, so a model
// point that itself joins two ideas with ";" can still be stated in full.
const sentences=value=>String(value??"").split(/[\n]+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|(?<=\d)\.\s+(?=[A-Z])/)
  .map(v=>v.trim()).filter(Boolean);

export function matchFnhCriterionEvidence(model,answer,{usedEvidence=[]}={}){
  const reference=String(model||"").trim();
  const source=keyTerms(reference);
  // An instruction-style point that lists its acceptable content ("Give two
  // ... justifications, such as protein, fibre, vitamins or safe chilling")
  // is satisfied by any one of those examples.
  const examples=isInstruction(reference)?reference.match(/\bsuch as\b(.+?)\.?$/i):null;
  if(examples){
    const options=examples[1].split(/,\s*|\s+or\s+/).map(x=>keyTerms(x)).filter(t=>t.length);
    // A requested justification or explanation needs more than the example
    // word: "a protein source" names protein but justifies nothing.
    const reasoned=/justif|explain|reason/i.test(reference);
    const cue=/\b(?:because|for|so|so that|helps?|supports?|to|prevents?|reduces?|keeps?|which)\b/i;
    const statement=split(answer).find(s=>!isNegative(s)&&(!reasoned||cue.test(s))&&
      options.some(t=>t.every(term=>keyTerms(s).includes(term))));
    if(statement&&!usedEvidence.some(hit=>hit.signature===source.join("|")))
      return {confirmed:true,evidence:statement,sourceIndex:split(answer).indexOf(statement),
        evidenceKey:source.join("|"),terms:source};
    return {confirmed:false,evidence:"",reason:"alternative-or-unsupported"};
  }
  if(isInstruction(reference)||source.length<1)return {confirmed:false,evidence:"",reason:"unverifiable-model-point"};
  const clauses=split(answer);
  const statements=[...clauses,...sentences(answer).filter(s=>!clauses.includes(s))];
  const aliases=preciseAlternatives.filter(entry=>entry.source.test(reference));
  const expectedNumbers=numbers(reference);
  const forms=fnhReferenceForms(reference).map(text=>({text,terms:keyTerms(text)}))
    .filter(f=>f.terms.length>0);
  // A short point ("Appearance and presentation", "Refrigeration or freezing")
  // must be stated in full; "or" offers either side.
  const shortForms=source.length<3?reference.replace(/\.$/,"").split(/\s+or\s+|\s*\/\s*/i)
    .map(text=>keyTerms(text)).filter(t=>t.length>0):[];
  let found=null;
  for(let i=0;i<statements.length;i++){
    const statement=statements[i];
    const value=keyTerms(statement);
    const formOk=forms.some((f,k)=>{
      const overlap=f.terms.filter(term=>value.includes(term)).length;
      // A label + one item form ("Iron red meat") must be stated in full.
      const threshold=k>1&&f.terms.length<3?f.terms.length:Math.max(Math.min(3,f.terms.length),Math.ceil(f.terms.length*.8));
      return (f.terms.length>=3||k>1)&&overlap>=threshold;
    })||shortForms.some(terms=>terms.every(term=>value.includes(term)));
    const alternative=aliases.some(alt=>alt.accept.test(statement));
    const numberOk=expectedNumbers.every(n=>numbers(statement).includes(n));
    const negativeOk=isNegative(reference)===isNegative(statement);
    const support=alternative||formOk;
    if(!support||!numberOk||!negativeOk)continue;
    const threshold=Math.max(3,Math.ceil(source.length*.8));
    // A later contradiction cannot earn an extra positive mark. An explicit
    // denial ("It is false that ...") of the point, or of either half of a
    // point joined by ";", contradicts it whatever its own polarity.
    const halves=reference.split(/;\s*/).map(h=>keyTerms(h)).filter(t=>t.length>=2);
    const denies=other=>/^\s*it\s+is\s+(?:false|incorrect|not\s+true|untrue)\s+(?:that|to\s+say)\b/i.test(other)&&
      !/^\s*it\s+is\s+(?:false|incorrect)/i.test(reference)&&
      [source,...halves].some(t=>t.filter(term=>keyTerms(other).includes(term)).length>=Math.max(Math.min(3,t.length),Math.ceil(t.length*.75)));
    const contradicted=statements.some(other=>denies(other)||
      isNegative(other)!==isNegative(reference) &&
      (aliases.some(alt=>alt.accept.test(other))||
      source.filter(term=>keyTerms(other).includes(term)).length>=threshold));
    if(contradicted)continue;
    // If the same line was already used, require independent model concepts,
    // not simply a second marking point that paraphrases the first.
    const signature=source.join("|");
    if(usedEvidence.some(hit=>hit.index===i &&
      (hit.signature===signature ||
        source.filter(term=>hit.terms.includes(term)).length>=Math.min(source.length,hit.terms.length)*.75)))continue;
    found={index:i,statement,signature,terms:source};break;
  }
  return found?{confirmed:true,evidence:found.statement,sourceIndex:found.index,
    evidenceKey:found.signature,terms:found.terms}
    :{confirmed:false,evidence:"",reason:"alternative-or-unsupported"};
}

export function fnhCalibrationDiagnostics(part,response){
  const points=part?.modelPoints||[];
  const result=points.map((point,i)=>({
    id:String(i),point,
    ...matchFnhCriterionEvidence(point,response)
  }));
  return {criteria:result,verified:result.filter(r=>r.confirmed).length,
    sourcePoints:points.length,maxMarks:Number(part?.marks)||0};
}
