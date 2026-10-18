/**
 * Source-linked deterministic FNH Paper 2 calibration.
 * Alternate phrasings are explicit teaching-domain equivalents rather than
 * general semantic guesses. Unmatched evidence remains unresolved.
 */
export const FNH_P2_RUBRIC_CALIBRATION_VERSION="fnh-p2-source-calibration-v1";

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
  {source:/increased thirst|polydipsia/i,accept:/\b(?:very thirsty|increased thirst|excessive thirst|polydipsia)\b/i},
  {source:/frequent urination|polyuria/i,accept:/\b(?:frequent urination|passing urine often|urinating frequently|polyuria)\b/i},
  {source:/unusual tiredness|fatigue/i,accept:/\b(?:tiredness|fatigue|extreme tiredness|always tired)\b/i},
  {source:/blurred vision/i,accept:/\b(?:blurred vision|blurry sight|blurred eyesight)\b/i},
  {source:/iron.deficiency an[ae]mia/i,accept:/\b(?:iron deficiency|iron.deficiency an[ae]mia|low iron|lack of iron)\b/i},
  {source:/constipation|bowel movement/i,accept:/\b(?:constipation|regular bowel movements?|prevent constipation|softer stools?)\b/i},
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

const negation=/\b(?:not|never|no|cannot|can't|doesn't|don't|isn't|without|lack of|absence of)\b/i;
const split=value=>String(value??"").split(/[;\n]+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)/)
  .map(v=>v.trim()).filter(Boolean);
const words=value=>String(value??"").toLowerCase().replace(/[’‘]/g,"'")
  .match(/[a-z]+|\d+(?:\.\d+)?/g)||[];
const canonical=w=>canonicalWords[w]||w.replace(/(?<=\w{4})s$/,"");
const keyTerms=value=>[...new Set(words(value).filter(w=>w.length>2&&!stop.has(w)).map(canonical))];
const isInstruction=value=>/^\s*(?:award|give|accept|credit|any\s+(?:two|three|four)|up\s+to|one\s+mark|do not award|the source.year)\b/i.test(value);
const numbers=value=>String(value??"").match(/(?<!\w)[+-]?\d+(?:\.\d+)?(?!\w)/g)||[];

export function matchFnhCriterionEvidence(model,answer,{usedEvidence=[]}={}){
  const reference=String(model||"").trim();
  const source=keyTerms(reference);
  if(isInstruction(reference)||source.length<1)return {confirmed:false,evidence:"",reason:"unverifiable-model-point"};
  const statements=split(answer);
  const aliases=preciseAlternatives.filter(entry=>entry.source.test(reference));
  const expectedNumbers=numbers(reference);
  let found=null;
  for(let i=0;i<statements.length;i++){
    const statement=statements[i];
    const value=keyTerms(statement);
    const overlap=source.filter(term=>value.includes(term)).length;
    const threshold=Math.max(3,Math.ceil(source.length*.8));
    const alternative=aliases.some(alt=>alt.accept.test(statement));
    const numberOk=expectedNumbers.every(n=>numbers(statement).includes(n));
    const negativeOk=negation.test(reference)===negation.test(statement);
    const support=alternative||source.length>=3&&overlap>=threshold;
    if(!support||!numberOk||!negativeOk)continue;
    // A later contradiction cannot earn an extra positive mark.
    const contradicted=statements.some(other=>
      negation.test(other)!==negation.test(reference) &&
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
