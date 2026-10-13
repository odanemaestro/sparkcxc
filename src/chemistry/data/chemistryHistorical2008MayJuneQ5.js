// Scanned May/June 2008 Chemistry Paper 02, Question 5, PDF pages 14–15.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking. Official CXC mark scheme not supplied."},explanation});
export const CHEMISTRY_2008_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q5",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",
 pdfPages:[14,15],printedPages:[14,15],originalQuestionNumber:5,totalMarks:15,
 title:"Saturated hydrocarbons, Haber equilibrium, nitrogen cycle and nitrate thermal decomposition",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"not-applicable",
 sourceVerificationNote:"Assistant first-pass visual comparison against scanned PDF printed pages 14–15: question prompts and allocations checked; independent examiner approval pending.",
 sourceIssues:[
  "Source compounds A=C₄H₈, B=C₃H₇CO₂H, C=C₄H₁₀ and D=C₃H₇CH₂OH. Choose A (alkene) and C (alkane) for clear general formulae. B and D are also saturated in the sense of lacking carbon-carbon multiple bonds, but belong to different homologous series.",
  "For Group I nitrate decomposition, LiNO₃ is an important exception, decomposing with brown nitrogen dioxide like many Group II salts; source generic conclusion assumes Na/K nitrates."
 ],
 context:"The source provides A C₄H₈, B C₃H₇CO₂H, C C₄H₁₀ and D C₃H₇CH₂OH. The Haber equilibrium N₂+3H₂⇌2NH₃ has ΔH=−92kJ mol⁻¹ and reported operating 200–300 atm and 400–500°C.",
 parts:[
  {label:"(a)",items:[
    item("(i)","From the compounds A to D above, select ONE compound which is saturated and ONE compound which is unsaturated.",2,
     ["Saturated C: C₄H₁₀, butane.","Unsaturated A: C₄H₈, an alkene (e.g., butene)."],
     "A C₄H₈ can have a C=C bond and C C₄H₁₀ has only single C–C bonds."),
    item("(ii)","Name AND give the general formula for the homologous series to which EACH of the two compounds selected in (a)(i) above belongs.",4,
     ["Compound C belongs to the alkanes.","Alkane general formula CₙH₂ₙ₊₂.","Compound A belongs to the alkenes, given the intended alkene interpretation.","Alkene general formula CₙH₂ₙ."],
     "Alkanes are saturated open-chain hydrocarbons; alkenes are unsaturated molecules with a C=C double bond.")
  ]},
  {label:"(b)",items:[
    item("","The pressure used in ammonia plants today is about 200–300 atmospheres and the temperature about 400–500°C. Suggest reasons for using these reaction conditions. Explain your answer in terms of N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ mol⁻¹.",3,
     ["High pressure shifts the equilibrium to the right because four gaseous molecules become two.","The forward reaction is exothermic, so lower temperature favours equilibrium ammonia yield.","About 400–500°C is a compromise that provides a commercially useful reaction rate, with pressure cost and safety limitations."],
     "The reaction N₂+3H₂⇌2NH₃ makes fewer moles of gas and releases heat; pressure favours NH₃, but temperature balances speed and yield.")
  ]},
  {label:"(c)",items:[
    item("(i)","Name ONE process by which nitrogen in the atmosphere can be converted into nitrates.",1,
     ["Nitrogen fixation by bacteria, or atmospheric fixation by lightning followed by nitrate formation."],
     "Nitrogen-fixing bacteria or lightning make reactive nitrogen; later nitrification forms nitrate."),
    item("(ii)","Name ONE process by which nitrogen in the nitrates in soil is released back into the atmosphere.",1,
     ["Denitrification by anaerobic bacteria."],
     "Denitrifying microbes reduce nitrate to nitrogen gas under oxygen-poor conditions.")
  ]},
  {label:"(d)",items:[
    item("(i) Group I","Two metal nitrates, P and Q, are separately heated. P gives off a colourless gas which rekindles a glowing splint. Q gives off a brown gas. Which of these two metal nitrates, P or Q, possibly contains a Group 1 metal?",1,
     ["P, a typical sodium or potassium nitrate; lithium nitrate is an exception."],
     "Sodium/potassium nitrates produce nitrite and oxygen when heated."),
    item("(i) Group II","Which of these two metal nitrates, P or Q, possibly contains a Group 2 metal?",1,
     ["Q, a Group II metal nitrate releasing brown nitrogen dioxide and oxygen."],
     "Group II nitrates commonly decompose into metal oxides, NO₂ and O₂."),
    item("(ii)","Write a chemical equation to show the reaction taking place when Q is heated.",2,
     ["2Ca(NO₃)₂(s) → 2CaO(s)+4NO₂(g)+O₂(g).","Correct balanced products: metal oxide, brown NO₂ and oxygen."],
     "Calcium nitrate gives calcium oxide, nitrogen dioxide and oxygen on heating.")
  ]}
 ]
});