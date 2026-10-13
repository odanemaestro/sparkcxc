// Source: January 2018 Paper 02 Question 2, PDF pages 10–11 (printed 10–11).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not the official CXC mark scheme."},explanation});
export const CHEMISTRY_2018_JAN_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q2",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",pdfPages:[10,11],printedPages:[10,11],originalQuestionNumber:2,totalMarks:15,
 title:"Phosphoric acid, normal and acid salts, antacids",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional key, not official CXC",diagramStatus:"not-applicable",
 sourceIssues:["Source comparison of 0.05 M H₃PO₄ at pH 4 versus 0.05 M H₂SO₄ at pH 1 is a hypothetical stated observation; use lower pH as source basis but do not generalise the asserted pH values to real solutions."],
 parts:[
 {label:"(a)",items:[
 item("(i) Acid","Define acid.",1,["Substance that produces hydrogen ions H⁺(aq) in aqueous solution."],"Acids increase the hydrogen-ion concentration of water."),
 item("(i) Alkali","Define alkali.",1,["A soluble base that produces OH⁻(aq) in water."],"An alkali is a water-soluble base."),
 item("(ii) Acid salt","Define acid salt.",1,["Salt formed by partial replacement of ionisable hydrogen atoms of a polyprotic acid."],"An acid salt retains replaceable acidic hydrogen."),
 item("(ii) Normal salt","Define normal salt.",1,["Salt formed when all ionisable acid hydrogen atoms are replaced by metal or ammonium ions."],"A normal salt contains no remaining replaceable acidic hydrogens."),
 item("(iii)","Give molecular formula of the normal salt from phosphoric acid and NaOH.",1,["Na₃PO₄."],"Complete neutralisation of three acidic hydrogen atoms gives sodium phosphate."),
 item("(iv)","Write balanced equation for normal salt in (iii).",2,["H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O.","Correct three-to-one NaOH:H₃PO₄ ratio."],"Three moles of NaOH fully neutralise one mole of phosphoric acid."),
 item("(v)","Give molecular formula of an acid salt from phosphoric acid and NaOH.",1,["NaH₂PO₄ or Na₂HPO₄."],"Partial neutralisation leaves at least one acidic hydrogen."),
 item("(vi)","Write balanced equation for formation of acid salt in (v).",2,["H₃PO₄ + NaOH → NaH₂PO₄ + H₂O, OR H₃PO₄ + 2NaOH → Na₂HPO₄ + 2H₂O.","Equation agrees with acid salt chosen in (v)."],"One or two equivalents of sodium hydroxide yield a partial neutralisation product.")
 ]},
 {label:"(b)",items:[
 item("","Given equal 0.05 M acid concentrations with pH 4 for H₃PO₄ and pH 1 for H₂SO₄, identify stronger acid.",1,["Sulfuric acid."],"The lower reported pH indicates a greater hydrogen ion concentration for the stated solutions.")
 ]},
 {label:"(c)",items:[
 item("(i)","Name two acids found in orange juice.",2,["Citric acid.","Ascorbic acid (vitamin C)."],"Orange juice contains citric acid and ascorbic acid."),
 item("(ii)","Name the chemical reaction used to treat excess stomach acid.",1,["Neutralisation."],"Antacids react with stomach hydrochloric acid."),
 item("(iii)","Name one substance used to treat excess stomach acid.",1,["Magnesium hydroxide, calcium carbonate or sodium hydrogen carbonate."],"A suitable antacid neutralises excess stomach acid.")
 ]}
 ]});