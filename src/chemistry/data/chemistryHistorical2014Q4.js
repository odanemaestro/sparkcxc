// 2014 May/June Chemistry Paper 02 Question 4, PDF page 12,
// with answer spaces continuing on pages 13-14. All marking is SPARK-authored.
import {CHEMISTRY_2014_Q4_SOURCE_CIRCUIT_SVG,CHEMISTRY_2014_Q4_CORRECTED_CIRCUIT_SVG} from "./chemistryHistorical2014ConductivitySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Draft SPARK scheme. Check interpretation, source and visually marked diagrams independently."},
 explanation,...extra
});
export const CHEMISTRY_2014_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q4",sourceId:"CHEM-P2-2014-MJ",
 sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[12,13,14],printedPages:[12,13,14],
 originalQuestionNumber:4,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Bonding, melting points and electrical conductivity",
 objectives:["A5.1","A5.5","A5.6","A5.7"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Source Figure 5 and model corrected circuit redrawn as SVG, awaiting visual and examiner QA",
 sourceIssues:[
  "The oxide of sulfur with melting point −72 °C is sulfur dioxide, SO₂. Sulfur has several oxides, so do not generalise about all oxides of sulfur.",
  "Pure SO₂ does not conduct, but aqueous dissolved SO₂ is an acidic solution and can show weak conductivity. Distinguish pure from aqueous conditions.",
  "The proposed source circuit has no bulb or ammeter to indicate current, and no illustrated vessel holding the tested solution."
 ],
 parts:[
  {label:"(a)",context:"Magnesium and sulfur are elements in the same period. Table 2 presents their oxides.",
   table:{title:"TABLE 2: PROPERTIES OF OXIDES",headers:["","Oxide of Magnesium","Oxide of Sulfur"],
     rows:[["Melting Point (°C)","2852","−72"],["State","Solid","Gas"]]},
   items:[
    item("(i)","With reference to bonding, account for the differences in states and melting points of the oxides of magnesium and sulfur.",6,
     ["Magnesium oxide is an ionic compound formed from Mg²⁺ and O²⁻ ions","It has a giant ionic lattice","Strong electrostatic forces between oppositely charged ions require a large amount of energy to overcome, giving a high melting point and a solid at room temperature",
      "The sulfur oxide with melting point −72 °C is molecular SO₂","Each SO₂ molecule has strong covalent bonds internally, but separate molecules are held together by weaker intermolecular forces","These intermolecular attractions need much less energy to overcome, giving low melting point and a gas at room temperature"],
     "Compare the forces broken on melting. Ionic MgO requires overcoming strong lattice attractions, but melting SO₂ overcomes only weaker attractions between covalent molecules."),
    item("(ii)","Explain whether the oxides will conduct electricity and, if so, under what conditions.",4,
     ["Solid MgO does not conduct because its ions cannot move through the fixed ionic lattice","Molten MgO conducts because mobile Mg²⁺ and O²⁻ ions transport charge","Pure SO₂ is a simple molecular substance and does not conduct as a gas or pure liquid","SO₂ has no mobile ions or delocalised electrons in its pure molecular state"],
     "Ionic compounds conduct when their ions are mobile, generally on melting or dissolving. Simple covalent substances such as pure SO₂ lack mobile charged particles.")
   ]},
  {label:"(b)",context:"A group of students proposed the circuit shown in Figure 5 to test aqueous lead(II) nitrate, ethanol and aqueous ammonia.",
   svg:CHEMISTRY_2014_Q4_SOURCE_CIRCUIT_SVG,
   figure:"Figure 5. Diagram of a circuit",
   items:[
    item("(i)","Why is the circuit as represented in Figure 5 not suitable to achieve the aim of the experiment?",1,
     ["There is no ammeter or light bulb to detect a conducting current; the test vessel and solution arrangement are also absent"],
     "A power source and two terminals alone do not show whether the liquid allows current to flow."),
    item("(ii)","Modify the diagram to produce a circuit that is suitable for achieving the aim of this experiment.",2,
     ["Add an ammeter or lamp in series to indicate current flow","Show two suitable electrodes immersed separately in a beaker of the test solution, forming a complete circuit"],
     "A conductivity tester uses a battery, indicator and two electrodes dipped into the sample without touching each other.",
     {type:"drawing",height:340},{modelAnswerSvgs:[CHEMISTRY_2014_Q4_CORRECTED_CIRCUIT_SVG]}),
    item("(iii)","Classify aqueous lead(II) nitrate, ethanol and aqueous ammonia EITHER as conductors OR non-conductors.",2,
     ["Aqueous lead(II) nitrate conducts strongly; aqueous ammonia conducts weakly because it forms a small concentration of NH₄⁺ and OH⁻","Ethanol is a non-conductor because its molecules do not produce mobile ions under these conditions"],
     "Lead(II) nitrate dissociates into ions. Ammonia is a weak base that reacts partly with water to form ions. Ethanol stays predominantly molecular.")
   ]}
 ]
});
