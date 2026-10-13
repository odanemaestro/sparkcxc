// Uploaded CSEC_Chemistry_P2_2005_MJ.pdf pages 15–16, fictional element Q (15 source marks).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+2)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark criteria, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2005_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2005-MJ-Q5",sourceId:"CHEM-P2-2005-MJ",sourceFile:"CSEC_Chemistry_P2_2005_MJ.pdf",
 pdfPages:[15,16],printedPages:[15,16],originalQuestionNumber:5,totalMarks:15,
 title:"Hypothetical Group 2 metal Q: conduction, water, oxide, nitrate and sulfate",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",diagramStatus:"not-applicable",
 sourceVerificationNote:"Assistant first-pass direct source comparison with scanned 2005 PDF pages 15–16. Original question marks and intended responses reviewed; official examiner approval and source-exact diagram overlays outstanding.",
 sourceIssues:[
  "Q is a hypothetical element described as observed on Mars, with relative atomic mass 333, melting point 1280°C and two valence electrons. The question is not a factual description of a known spacecraft discovery.",
  "Two outer-shell electrons and high melting point suggest a Group 2-like metal, but its reaction rate with water and sulfate solubility cannot be determined uniquely from these properties alone. Use conditional model chemistry.",
  "Question (e) assumes a separable QSO₄ from nitrate Q(NO₃)₂; Group 2 sulfate solubility varies substantially (MgSO₄ soluble, BaSO₄ insoluble). Precipitation is only defensible if QSO₄ is insoluble. Examiner decision needed before auto-marking.",
  "Source Q5 total is 15 marks (2+3+2+4+4)."
 ],
 context:"Fictional element Q has relative atomic mass 333, melting point 1280°C and two valence electrons, suggesting an electropositive metal similar to Group 2 elements.",
 parts:[
  {label:"(a)",items:[
   item("","Would Q be electrically conducting or not? Give a reason for your answer.",2,
    ["Q is expected to conduct as a metallic solid.","Delocalised outer electrons move through the metal lattice and transfer charge."],
    "High melting point and two outer electrons support the provisional metallic-bonding model.")
  ]},
  {label:"(b)",items:[
   item("","State the expected reaction of Q with water. Include a chemical equation.",3,
    ["A sufficiently reactive Group 2-like metal produces an alkaline metal hydroxide and hydrogen.","Q(s)+2H₂O(l)→Q(OH)₂(aq/s)+H₂(g).","An observable reaction can include gas bubbles and warming; rate depends on the unknown metal and oxide coating."],
    "Group 2 metals are oxidised to Q²⁺; water hydrogen is reduced to H₂. The original problem supplies no experimental reaction rate.")
  ]},
  {label:"(c)",items:[
   item("","Further investigations reveal that on exposure to oxygen, the metal Q becomes chemically inert. State a possible reason for this.",2,
    ["Q may develop a compact adherent oxide coating QO on its surface.","The coating passivates the metal by preventing contact with oxygen or water."],
    "A protective oxide film makes the metal appear unreactive.")
  ]},
  {label:"(d)",items:[
   item("","How would the effect of heat on the metal nitrate of Q differ from that of sodium nitrate? Illustrate your answer by means of suitable chemical equations.",4,
    ["2NaNO₃(s)→2NaNO₂(s)+O₂(g) (sodium nitrate forms nitrite and oxygen).","Q(NO₃)₂ is expected to decompose like a typical Group 2 nitrate to oxide, brown NO₂ and O₂.","2Q(NO₃)₂(s)→2QO(s)+4NO₂(g)+O₂(g).","Explain brown nitrogen dioxide is observed for Q nitrate, unlike the sodium nitrate nitrite pathway."],
    "The standard Group 2 nitrate decomposition model produces metal oxide, nitrogen dioxide and oxygen.")
  ]},
  {label:"(e)",items:[
   item("","Briefly outline how a dry sample of the sulphate of Q can be prepared from a sample of the metal nitrate of Q. Include an ionic equation to illustrate your method.",4,
    ["Dissolve Q(NO₃)₂ in water and add a soluble sulfate solution such as Na₂SO₄(aq).","If QSO₄ is insoluble, a solid precipitate forms and can be filtered.","Wash the collected precipitate with distilled water and dry it safely.","Net ionic: Q²⁺(aq)+SO₄²⁻(aq)→QSO₄(s); if QSO₄ is soluble, this precipitation route does not work."],
    "The intended method is precipitation followed by filtration, washing and drying, but Q sulfate's solubility is unspecified and must be confirmed.")
  ]}
 ]
});