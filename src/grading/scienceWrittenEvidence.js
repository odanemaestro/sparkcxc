// Shared evidence checks for deterministic Chemistry and Integrated Science Paper 2.
// This is a conservative string-evidence check, not semantic understanding.
// Unmatched alternative wording must remain provisional, never certified wrong.
// Negative claims often retain the same keywords as valid evidence.
// Normalise apostrophes, and detect inability or failure before awarding marks.
const NEGATION=/\b(?:not|no|never|cannot|can't|couldn't|won't|without|doesn'?t|isn'?t|don'?t|didn'?t|neither|nor|fails?\s+to|unable\s+to|false\s+that|is\s+false\b|incorrect\s+to\s+say)\b/i;
const normalisePolarity=value=>String(value??"").replace(/[’‘]/g,"'");

export function scienceResponseClauses(value){
  // A full stop after a number still ends a sentence when a capital follows.
  return String(value??"").split(/(?:[;\n]+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|(?<=\d)\.\s+(?=[A-Z])|\s+\b(?:however|whereas|but|although|yet|nevertheless)\b\s+)/i)
    .map(part=>part.trim()).filter(Boolean);
}

// Opposites that keyword overlap cannot tell apart: "very insoluble" shares
// every other word with "very soluble". A clause that states the opposite of
// a required term, without the term itself, is not evidence for it.
const CONTRASTS=[["soluble","insoluble"],["more","less"],["increase","decrease"],["increases","decreases"],
  ["increased","decreased"],["increasing","decreasing"],["higher","lower"],["high","low"],["faster","slower"],
  ["fast","slow"],["gain","lose"],["gains","loses"],["gained","lost"],["oxidised","reduced"],["oxidized","reduced"],
  ["oxidation","reduction"],["exothermic","endothermic"],["acidic","alkaline"],["acidic","basic"],
  ["positive","negative"],["anode","cathode"],["conductor","insulator"],["saturated","unsaturated"],
  ["reactive","unreactive"],["strong","weak"],["concentrated","dilute"],["larger","smaller"],["large","small"],
  ["rises","falls"],["rise","fall"],["expand","contract"],["expands","contracts"],["ionic","covalent"],
  ["absorbs","releases"],["absorbed","released"],["heated","cooled"],["denser","lighter"],["above","below"],
  ["metal","non-metal"],["metallic","non-metallic"],["polar","non-polar"],["permeable","impermeable"],
  ["aerobic","anaerobic"],["renewable","non-renewable"],["visible","invisible"],["able","unable"]];
const words=value=>normalisePolarity(value).toLowerCase().split(/[^a-z-]+/).filter(Boolean);
function contrastedTerms(clause,reference){
  const said=new Set(words(clause)),wanted=new Set(words(reference));
  return CONTRASTS.some(([a,b])=>(wanted.has(a)&&!said.has(a)&&said.has(b))||(wanted.has(b)&&!said.has(b)&&said.has(a)));
}

/**
 * A response clause states the opposite of a term the reference requires
 * ("decrease the current" against "increase the current"), without the
 * required term itself.
 */
export function statesOppositeOf(response,reference){
  const wanted=new Set(words(reference));
  // A pair whose two terms both appear in the reference ("large angles …
  // a small nucleus") cannot tell a reversed claim apart.
  const pairs=CONTRASTS.filter(([a,b])=>wanted.has(a)!==wanted.has(b));
  return scienceResponseClauses(response).some(clause=>{
    const said=new Set(words(clause));
    return pairs.some(([a,b])=>wanted.has(a)?!said.has(a)&&said.has(b):!said.has(b)&&said.has(a));
  });
}

export function matchScienceWrittenEvidence(response,reference,{tokens,tokenPresent,strict=false}){
  const terms=[...new Set(tokens(reference))];
  if(!terms.length)return {matched:false,evidence:"",contradicted:false};
  const hasNegation=value=>NEGATION.test(normalisePolarity(value));
  const negativeReference=hasNegation(reference);
  const minimum=strict?terms.length:terms.length<=3?terms.length:Math.ceil(terms.length*.75);
  // A reference that itself contains "but"/"however" must be compared with
  // whole sentences, not with the halves of a split response clause.
  const joined=/\b(?:however|whereas|but|although|yet|nevertheless)\b|;/i.test(reference);
  const clauses=[...scienceResponseClauses(response),
    ...(joined?String(response??"").split(/\n+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|(?<=\d)\.\s+(?=[A-Z])/).map(s=>s.trim()).filter(Boolean):[])];
  // Values in a reference are exact requirements: "2 mol e⁻" is not "4 mol e⁻".
  // Read from the raw text: tokenizers drop single-digit numbers.
  const required=[...String(reference).matchAll(/(?<![\d.])\d+(?:\.\d+)?(?![\d.])/g)].map(m=>m[0]);
  // "Day 14." states 14: a full stop continues a number only before a digit.
  const stated=(clause,n)=>new RegExp(`(?<![\\d.])${n.replace(".","\\.")}(?!\\d|\\.\\d)`).test(String(clause));
  const hits=clause=>contrastedTerms(clause,reference)||!required.every(n=>stated(clause,n))
    ?0:terms.filter(term=>tokenPresent(clause,term)).length;
  // Opposite claims containing the same core facts make the response ambiguous.
  // Do not award marks from a later positive assertion after an explicit denial.
  // "It is false that ..." denies whatever follows, including a statement that
  // is itself negative ("... ions cannot move"), so it always contradicts.
  const denial=clause=>/^\s*(?:it\s+is\s+(?:false|incorrect|not\s+true|untrue)\s+(?:that|to\s+say)|it'?s\s+not\s+true\s+that)\b/i.test(normalisePolarity(clause));
  // When the reference is itself a denial, a matching denial agrees with it.
  const referenceDenies=denial(reference);
  // A conditional clause ("If the power cannot be switched off, ...") states
  // a circumstance, not a denial of the point.
  const conditional=clause=>/^\s*(?:if|unless|when|whenever|in\s+case)\b/i.test(clause);
  const contradicted=clauses.some(clause=>!conditional(clause)&&
    ((denial(clause)&&!referenceDenies)||hasNegation(clause)!==negativeReference) && hits(clause)>=minimum);
  if(contradicted)return {matched:false,evidence:"",contradicted:true};
  const evidence=clauses.find(clause=>
    hasNegation(clause)===negativeReference && hits(clause)>=minimum);
  return {matched:Boolean(evidence),evidence:evidence||"",contradicted:false};
}
