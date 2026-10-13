// January 2017 Chemistry Paper 02 Q3, source PDF pp11–13.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional scheme; official CXC marking not supplied."},explanation});
export const CHEMISTRY_2017_JAN_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q3",sourceId:"CHEM-P2-2017-JAN",sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",
 pdfPages:[11,12,13],printedPages:[11,12,13],originalQuestionNumber:3,totalMarks:15,
 kind:"structured",title:"Butane substitution, butene addition polymer and polyester links",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; no official CXC mark scheme",
 diagramStatus:"Original Q3(a)(iv) blank drawing box and Q3(c) schematic HO–R–COOH polyester chain require source-specific SVG redrawing with valid fully displayed chlorobutane model.",
 sourceIssues:["Source compound B formula C₃H₆ appears to be printed as C₃H₆ (propene), not C₄H₈. Do not confuse it with compound A C₄H₁₀; this answer uses propene and poly(propene). A second reviewer must visually check source formula and chain.","Source Q3(c) hydroxycarboxylic acid HO–R–COOH is a bifunctional monomer. Repeated esterification eliminates water to form polyester, not polyamide."],
 context:"Compound A is C₄H₁₀ (butane). Compound B is C₃H₆ (propene) according to source formula. Source Q3(c) shows a hydroxycarboxylic acid HO–R–COOH and a polymer chain containing –O–R–C(=O)– repeats.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Classify Compound A as alkane or alkene.",1,["Alkane."],"Butane C₄H₁₀ is saturated and matches CₙH₂ₙ₊₂."),
 item("(ii)","State ONE use of Compound A.",1,["Fuel (e.g. bottled gas/LPG, lighter fuel)."],"Butane burns readily and serves as a fuel."),
 item("(iii)","Give ONE condition for butane to react with chlorine gas.",1,["Ultraviolet light, sunlight or sufficient radiation to initiate radical substitution."],"Photochemical Cl₂ cleavage starts radical substitution."),
 item("(iv)","Draw a FULLY DISPLAYED monochlorination product of A reacting with one Cl₂ molecule.",2,
 ["A four-carbon saturated product C₄H₉Cl with one chlorine replacing hydrogen.","Correctly bonded fully displayed example 1-chlorobutane or 2-chlorobutane, each carbon valence four."],
 "C₄H₁₀ + Cl₂ → C₄H₉Cl + HCl under UV light. Either 1- or 2-chlorobutane is a valid distinct product.",{type:"drawing"}),
 item("(v)","Describe a chemical test for the gaseous by-product.",1,["Hydrogen chloride turns damp blue litmus paper red (or gives white fumes with ammonia)."],"Substitution produces HCl gas.")
 ]},
 {label:"(b)",items:[
 item("(i)","Define polymer.",2,["Very large molecule (macromolecule).","Formed by many smaller monomer units chemically bonded together."],"Polymer chains contain repeating structural units."),
 item("(ii) Type","State the type of polymerisation of compound B.",1,["Addition polymerisation."],"An alkene double bond opens to link repeating units without eliminating another molecule."),
 item("(ii) Name","Name the resulting polymer.",1,["Poly(propene), polypropylene."],"Propene (C₃H₆) polymerises to poly(propene)."),
 item("(ii) Use","State ONE use of the polymer.",1,["Food containers, packaging, ropes, reusable plastic storage boxes or fibres."],"Poly(propene) is a durable thermoplastic.")
 ]},
 {label:"(c)",items:[
 item("(i)","Name the linkage present in the polymer formed from HO–R–COOH.",1,["Ester linkage, –COO–."],"Hydroxy and carboxylic acid groups link to give ester bonds."),
 item("(ii) Type","Name the polymerisation reaction.",1,["Condensation polymerisation."],"Repeating esterification removes small water molecules."),
 item("(ii) Use","Give ONE use of such polymers.",1,["Polyester fibres/clothing, plastic bottles or biodegradable polyester packaging."],"Polyesters have uses in fabrics and packaging."),
 item("(iii)","Name the by-product formed in condensation polymerisation.",1,["Water (H₂O)."],"Carboxyl and hydroxyl groups eliminate water to form an ester link.")
 ]}
 ]
});