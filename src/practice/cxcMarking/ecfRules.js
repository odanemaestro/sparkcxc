// Curated error-carried-forward rules for the audited 100-template Paper 2 bank.
//
// These rules are intentionally limited to places where a later numerical
// answer genuinely depends on an earlier numerical answer. The formula is
// evaluated with the candidate's own earlier value, so a single arithmetic
// slip is not punished repeatedly. Rules are reviewed against the canonical
// bank at build/test time.

export const PAPER2_ECF_RULES = {
  // Q1: consumer arithmetic chains.
  "p2-q1-v1::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*1.4" },
  "p2-q1-v1::b3": { uses: ["b2"], variables: { x: "b2" }, formula: "(x-4500)/4500*100" },
  "p2-q1-v2::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*1.35" },
  "p2-q1-v2::b3": { uses: ["b2"], variables: { x: "b2" }, formula: "(x-5400)/5400*100" },
  "p2-q1-v3::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x+15*220" },
  "p2-q1-v3::b3": { uses: ["b2"], variables: { x: "b2" }, formula: "(x-3600)/3600*100" },
  "p2-q1-v4::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x+12*355" },
  "p2-q1-v4::b3": { uses: ["b2"], variables: { x: "b2" }, formula: "(x-4800)/4800*100" },
  "p2-q1-v5::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x+40*24" },
  "p2-q1-v6::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x+35*32" },
  "p2-q1-v7::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*1.02" },
  "p2-q1-v8::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*1.03" },
  "p2-q1-v9::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*0.5" },
  "p2-q1-v10::b2": { uses: ["b1"], variables: { x: "b1" }, formula: "x*0.4" },

  // Q3: area under an enlargement uses the candidate's area from part (b).
  "p2-q3-v4::c": { uses: ["b"], formula: "b*9" },
  "p2-q3-v5::c": { uses: ["b"], formula: "b*4" },
  "p2-q3-v6::c": { uses: ["b"], formula: "b*4" },

  // Q6: mensuration chains.
  "p2-q6-v1::b": { uses: ["a"], formula: "a*4" },
  "p2-q6-v1::d": { uses: ["b"], formula: "b/5.5" },
  "p2-q6-v2::b": { uses: ["a"], formula: "a*15" },
  "p2-q6-v2::d": { uses: ["b"], formula: "b/21" },
  "p2-q6-v3::b": { uses: ["a"], formula: "a*8" },
  "p2-q6-v3::d": { uses: ["b"], formula: "b/77" },
  "p2-q6-v4::c": { uses: ["a"], formula: "a+42" },
  "p2-q6-v5::c": { uses: ["a"], formula: "a+28" },
  "p2-q6-v6::c": { uses: ["a"], formula: "a+84" },
  "p2-q6-v7::b": { uses: ["a"], formula: "a*20" },
  "p2-q6-v7::d": { uses: ["a", "b"], formula: "2*a+b" },
  "p2-q6-v8::b": { uses: ["a"], formula: "a*25" },
  "p2-q6-v8::d": { uses: ["a", "b"], formula: "2*a+b" },
  "p2-q6-v9::c": { uses: ["a"], formula: "atan(a/68)" },
  "p2-q6-v10::c": { uses: ["a"], formula: "atan(a/50)" },

  // Q9: trigonometry and bearings.
  "p2-q9-v3::b": { uses: ["a"], formula: "acos((9^2+a^2-14^2)/(2*9*a))" },
  "p2-q9-v4::b": { uses: ["a"], formula: "acos((11^2+a^2-15^2)/(2*11*a))" },
  "p2-q9-v5::b": { uses: ["a"], formula: "acos((8^2+a^2-13^2)/(2*8*a))" },
  "p2-q9-v6::b": { uses: ["a"], formula: "180-a-61" },
  "p2-q9-v7::b": { uses: ["a"], formula: "180-a-58" },

  // Components are stored as positive magnitudes in the preceding parts. The
  // signs below reflect the compass directions stated in each question.
  "p2-q9-v8::c": { uses: ["a", "b"], formula: "sqrt((-a+80*cos(120))^2+(-b+80*sin(120))^2)" },
  "p2-q9-v8::d": { uses: ["a", "b"], formula: "bearing(-a+80*cos(120),-b+80*sin(120))" },
  "p2-q9-v9::c": { uses: ["a", "b"], formula: "sqrt((a+70*cos(50))^2+(-b+70*sin(50))^2)" },
  "p2-q9-v9::d": { uses: ["a", "b"], formula: "bearing(a+70*cos(50),-b+70*sin(50))" },
  "p2-q9-v10::c": { uses: ["a", "b"], formula: "sqrt((-a+50*cos(150))^2+(-b+50*sin(150))^2)" },
  "p2-q9-v10::d": { uses: ["a", "b"], formula: "bearing(-a+50*cos(150),-b+50*sin(150))" },
};

export function paper2EcfRule(questionId, partId) {
  return PAPER2_ECF_RULES[`${questionId}::${partId}`] || null;
}

export function paper2EcfRuleCount() {
  return Object.keys(PAPER2_ECF_RULES).length;
}
