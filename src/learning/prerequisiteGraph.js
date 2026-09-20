const clean = value => String(value || "").trim().toLowerCase();

export const PREREQUISITE_RULES = Object.freeze([
  // Mathematics
  { subjectId:"mathematics", match:["percentage","percent","consumer","interest","profit","discount"], requires:["fraction","decimal","ratio"] },
  { subjectId:"mathematics", match:["linear equation","rearrang","formula","algebra"], requires:["number","fraction","negative"] },
  { subjectId:"mathematics", match:["quadratic"], requires:["algebra","linear equation","factor"] },
  { subjectId:"mathematics", match:["gradient","straight line","graph","coordinate"], requires:["algebra","linear equation"] },
  { subjectId:"mathematics", match:["trigon","sine","cosine","tangent","bearing"], requires:["ratio","geometry","pythag"] },
  { subjectId:"mathematics", match:["vector"], requires:["coordinate","geometry","algebra"] },

  // Physics. Mathematics prerequisites are deliberately explicit so SPARK can
  // explain when the obstacle is mathematical rather than purely physical.
  { subjectId:"physics", match:["a2","vector","resultant"], requires:["vector","algebra"] },
  { subjectId:"physics", match:["a3","static","moment","equilibrium"], requires:["vector","ratio","algebra"] },
  { subjectId:"physics", match:["a4","kinematic","motion","acceleration"], requires:["gradient","graph","algebra"] },
  { subjectId:"physics", match:["a5","energy","work","power"], requires:["algebra","ratio"] },
  { subjectId:"physics", match:["b2","expansion","temperature"], requires:["ratio","algebra"] },
  { subjectId:"physics", match:["b3","heat transfer","conduction","convection","radiation"], requires:["temperature"] },
  { subjectId:"physics", match:["wave","frequency","wavelength"], requires:["graph","algebra","ratio"] },
  { subjectId:"physics", match:["electric","current","voltage","resistance"], requires:["algebra","ratio"] },
  { subjectId:"physics", match:["radioactive","half-life"], requires:["ratio","graph"] },

  // Information Technology
  { subjectId:"information-technology", match:["spreadsheet","formula"], requires:["data entry","cell reference"] },
  { subjectId:"information-technology", match:["absolute reference","vlookup","lookup","if function"], requires:["spreadsheet","formula","cell reference"] },
  { subjectId:"information-technology", match:["database","table"], requires:["data type","field","record"] },
  { subjectId:"information-technology", match:["relationship","foreign key","primary key"], requires:["database","table"] },
  { subjectId:"information-technology", match:["query"], requires:["database","relationship","criteria"] },
  { subjectId:"information-technology", match:["form","report"], requires:["database","query"] },
  { subjectId:"information-technology", match:["algorithm","pseudocode"], requires:["problem definition","input","process","output"] },
  { subjectId:"information-technology", match:["selection","if statement"], requires:["algorithm","sequence"] },
  { subjectId:"information-technology", match:["repetition","loop"], requires:["algorithm","selection"] },
  { subjectId:"information-technology", match:["trace","test data"], requires:["algorithm","selection","repetition"] },
  { subjectId:"information-technology", match:["programming","pascal"], requires:["algorithm","trace","test data"] },
]);

export function normalizeLearningSkill(value) {
  return clean(value).replace(/\s+/g, " ");
}

export function prerequisiteTermsForSkill(subjectId, skill) {
  const subject = clean(subjectId);
  const target = normalizeLearningSkill(skill);
  const terms = [];
  for (const rule of PREREQUISITE_RULES) {
    if (rule.subjectId !== subject) continue;
    if (!rule.match.some(term => target.includes(clean(term)))) continue;
    for (const requirement of rule.requires) {
      if (!terms.includes(requirement)) terms.push(requirement);
    }
  }
  return terms;
}

function stateScore(row) {
  const raw = Number(row?.effectiveMastery ?? row?.effective_mastery ?? row?.mastery ?? row?.mastery_probability);
  if (!Number.isFinite(raw)) return null;
  return raw <= 1 ? raw * 100 : raw;
}

export function findPrerequisiteState(states = [], term) {
  const needle = clean(term);
  return (states || [])
    .filter(row => normalizeLearningSkill(row?.skill || row?.rawSkill).includes(needle))
    .sort((a,b)=>(stateScore(a) ?? 100) - (stateScore(b) ?? 100))[0] || null;
}

export function prerequisiteRiskForSkill({ subjectId, skill, states = [] } = {}) {
  const terms = prerequisiteTermsForSkill(subjectId, skill);
  if (!terms.length) return { risk:0, terms:[], weak:[] };
  const weak = [];
  for (const term of terms) {
    const row = findPrerequisiteState(states, term);
    const score = stateScore(row);
    if (score == null) continue;
    if (score < 70) weak.push({ term, score:Math.round(score), state:row });
  }
  if (!weak.length) return { risk:0, terms, weak:[] };
  const gap = weak.reduce((sum,item)=>sum + (70-item.score)/70,0) / weak.length;
  return { risk:Math.max(0,Math.min(1,gap)), terms, weak };
}

export function applyPrerequisiteRisk(states = []) {
  return (states || []).map(state => {
    const result = prerequisiteRiskForSkill({
      subjectId: state.subjectId || state.subject_id,
      skill: state.skill,
      states,
    });
    return {
      ...state,
      prerequisiteRisk: result.risk,
      prerequisiteWeaknesses: result.weak,
    };
  });
}
