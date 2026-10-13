// January 2017 Chemistry Paper 02 Q2: source PDF pp9–10 (printed pp9–10).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored scheme; not official CXC."},explanation});
export const CHEMISTRY_2017_JAN_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q2",sourceId:"CHEM-P2-2017-JAN",sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",pdfPages:[9,10],printedPages:[9,10],originalQuestionNumber:2,totalMarks:15,
 title:"Electrolysis, industrial applications and molten lead(II) bromide",
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional; official CXC mark scheme unavailable",
 diagramStatus:"The original Q2(b)(i) is a blank drawing area. An original labelled graphite-electrode electrolysis SVG needs exact source answer-box geometry and examiner review.",
 sourceIssues:["Lead bromide molten electrolysis requires heat above its melting temperature and a fume hood because toxic lead and bromine fumes are hazardous. The SPARK lab apparatus is a teaching diagram, not an instruction for learners to perform this hazardous setup unaided."],
 context:"A learner sets up apparatus to electrolyse molten lead(II) bromide, PbBr₂, using inert electrodes.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Define electrolysis.",2,["Decomposition of an ionic substance (electrolyte).","Caused by passing an electric current through molten electrolyte or an electrolyte solution."],"Electrical energy drives a chemical change by reduction at cathode and oxidation at anode."),
 item("(ii)","Define electroplating.",2,["A thin layer of one metal is deposited onto the surface of another conducting object.","Electrolysis of a suitable solution carries out the deposition."],"Metal cations gain electrons at the object acting as the cathode."),
 item("(iii)","List THREE applications of electrolysis other than electroplating.",3,
 ["Electrolytic extraction of aluminium from molten alumina.","Electrolytic purification of copper.","Manufacture of chlorine and sodium hydroxide by electrolysis of concentrated brine (or hydrogen from water)."],
 "Electrolysis supports metal production, refining and industrial chemical manufacture.")
 ]},
 {label:"(b)",items:[
 item("(i)","Draw and label the electrolysis apparatus for molten PbBr₂ and state electrode material.",4,
 ["Crucible containing molten lead(II) bromide with heating support.","Two electrodes immersed but not touching, connected to a DC power source.","Positive anode and negative cathode clearly labelled.","Suitable inert electrodes such as graphite/carbon are specified."],
 "A DC circuit drives ion migration through molten PbBr₂. Graphite electrodes permit bromide oxidation and lead ion reduction.",{type:"drawing"}),
 item("(ii)","Write balanced half-equations for reactions at EACH electrode.",4,
 ["Anode: 2Br⁻ → Br₂ + 2e⁻.","Correct balancing of bromine and electron loss (oxidation).","Cathode: Pb²⁺ + 2e⁻ → Pb.","Correct balance and gain of electrons (reduction)."],
 "Bromide ions lose electrons at the anode while Pb²⁺ ions gain electrons to form metallic lead.")
 ]}
 ]
});