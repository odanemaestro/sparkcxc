// Source May/June 2009 Paper 02 Q3, PDF pp11–12.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored source-based criteria. Fully displayed structural drawings need independent chemistry and SVG review."},explanation});
export const CHEMISTRY_2009_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q3",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[11,12],printedPages:[11,12],originalQuestionNumber:3,totalMarks:15,
 kind:"structured",title:"Petroleum fractional distillation, cyclobutanol alkene reactions and polyamide hydrolysis",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original Compound A cyclobutane with OH and vinyl CH=CH₂ substituent, three-unit addition polymer response, and generic polyamide Structure B must be redrawn as validated SVG preserving bonds and ring geometry.",
 sourceIssues:["Compound A has a cyclobutane ring carrying OH and CH=CH₂ group at opposite vertices. Bromination is addition across exocyclic alkene only; sodium reacts with ring alcohol hydroxyl to form sodium alkoxide.","The depicted polyamide recurring fragment –NH–R–C(=O)– originates from a bifunctional amino acid H₂N–R–COOH. Acid hydrolysis gives protonated amino acid under strongly acidic medium. Depict a suitable neutralised monomer or salt with note on reaction conditions.","The phrase 'lightest fraction' may correspond to refinery gases (LPG) and 'heaviest fraction' to bitumen/residue in common school fractional distillation diagrams. An official scheme is needed for source-specific names and acceptable alternatives."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Name the property used to separate crude-oil fractions by fractional distillation.",1,["Differences in boiling points (volatility)."],"Fractions condense at different levels because their boiling ranges differ."),
 item("(ii)","Name lightest and heaviest fractions obtained.",2,["Refinery gas/petroleum gas (LPG) is the lightest fraction.","Bitumen or heavy residue is the heaviest fraction."],"Low-boiling gases collect at the top; heavy residue stays at the base."),
 item("(iii)","State one use for each fraction.",2,["Light refinery gas/LPG is used as cooking or heating fuel.","Heavy bitumen is used as road surfacing or waterproofing."],"Match each use to a correctly named source fraction.")
 ]},
 {label:"(b)",items:[
 item("(i) Bromine","Draw structural product of Compound A reacting with bromine.",2,["Add Br to both alkene carbons of its CH=CH₂ substituent.","Keep four-membered cyclobutane ring and OH substituent unchanged with correct valence."],"Bromine adds across the carbon double bond, giving ring–CHBr–CH₂Br.",{type:"drawing"}),
 item("(i) Sodium","Draw structural product of Compound A reacting with sodium.",2,["Replace the alcohol hydroxyl O–H with O⁻Na⁺ (sodium alkoxide).","Keep ring and alkene CH=CH₂ substituent intact; hydrogen gas is a by-product."],"Sodium metal reacts at O–H, releasing hydrogen and forming a sodium alkoxide.",{type:"drawing"}),
 item("(ii)","Draw a three-unit partial polymer structure formed by addition polymerisation of A.",2,["Three linked monomer units have a saturated C–C backbone after opening CH=CH₂.","Each repeating substituted carbon carries unchanged hydroxylated cyclobutane substituent, valences consistent."],"Polymerisation joins the three vinyl substituents while retaining their cyclobutanol pendant groups.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("(i)","Name polymerisation type forming polyamide Structure B.",1,["Condensation polymerisation."],"Amine and carboxyl groups condense to form amide (peptide) bonds."),
 item("(ii) a","Draw monomer recovered from acidic hydrolysis of –NH–R–C(=O)– polymer.",2,["Amino acid skeleton H₂N–R–COOH (or its protonated acid salt).","Correct separate amino and carboxyl functional groups and chemically valid bonds."],"Hydrolysis splits amide links. In strongly acidic medium amino groups are protonated to –NH₃⁺.",{type:"drawing"}),
 item("(ii) b","Give one difference between acid and enzyme hydrolysis conditions.",1,["Acid hydrolysis generally requires hot strong acid, often reflux, while enzyme hydrolysis proceeds at mild near-physiological temperature/pH."],"Proteases catalyse bond cleavage under much milder conditions.")
 ]}
 ]});