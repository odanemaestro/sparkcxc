// January 2018 Paper 02 Q6, PDF pages 20–21.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional criteria; official CXC scheme not supplied."},explanation});
export const CHEMISTRY_2018_JAN_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q6",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",pdfPages:[20,21],originalQuestionNumber:6,totalMarks:15,
 title:"Water properties, water vapour testing, hard water and acidified water electrolysis",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"not-applicable",sourceIssues:["The term 'ions to anode' includes anions SO₄²⁻ and OH⁻, but sulfate normally remains a spectator in dilute sulfuric acid; oxygen evolves from water oxidation. Distinguish ion migration from discharge."],
 parts:[
 {label:"(a)",items:[
 item("","List FOUR unique properties of water relevant to the human body.",4,["High specific heat capacity stabilises body temperature.","High latent heat of vaporisation enables evaporative cooling by sweat.","Polar solvent dissolves and transports nutrients/ions.","High cohesion or surface tension supports fluid movement; liquid state over broad biological temperatures also acceptable."],"Water's heat capacity, vaporisation, polarity and cohesion contribute to physiological processes.")
 ]},
 {label:"(b)",items:[
 item("","Describe a laboratory test for water vapour.",2,["Expose vapour to dry blue cobalt(II) chloride paper.","Paper turns pink in the presence of water (or white anhydrous copper sulfate turns blue)."],"Hydrated cobalt(II) chloride indicator changes from blue to pink.")
 ]},
 {label:"(c)",items:[
 item("","Write balanced equation including states for removal of temporary hardness by Na₂CO₃.",3,["Ca(HCO₃)₂(aq)+Na₂CO₃(aq)→CaCO₃(s)+2NaHCO₃(aq).","Correct precipitate calcium carbonate.","Balanced stoichiometry and states."],"Sodium carbonate precipitates Ca²⁺ as insoluble calcium carbonate.")
 ]},
 {label:"(d)",items:[
 item("Anode","Identify ions moving towards the anode in dilute sulfuric acid electrolysis.",2,["SO₄²⁻ and OH⁻ (anions migrate towards positive anode).","Water/OH⁻ is oxidised to oxygen; sulfate remains a spectator."],"Anions migrate toward the anode but only species capable of oxidation discharge."),
 item("Cathode","Identify ions moving towards the cathode.",2,["H⁺(aq) moves to the negative cathode.","2H⁺(aq)+2e⁻→H₂(g) (hydrogen produced)."],"Hydrogen ions are reduced at the cathode."),
 item("Equation","Write balanced equation with states for electrolysis of acidified water.",2,["2H₂O(l)→2H₂(g)+O₂(g).","Correct hydrogen and oxygen product coefficients and state symbols."],"Water decomposes into hydrogen and oxygen. Dilute sulfuric acid improves conductivity.")
 ]}
 ]});