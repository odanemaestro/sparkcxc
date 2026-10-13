import {CHEMISTRY_2012_Q3_FULLY_DISPLAYED} from "./chemistryHistorical2012OrganicSvgs";
// Transcribed from supplied May/June 2012 Chemistry Paper 02 pp.7–10.
// All solutions are SPARK-authored, not official CXC marking guidance.
// Figures are schematic vectors requiring comparison against the source scan.
import {CHEMISTRY_2012_Q2_ELECTROLYSIS_SVG,CHEMISTRY_2012_Q3_HYDROCARBON_SVG,
 CHEMISTRY_2012_Q3_REACTION_SVG} from "./chemistryHistorical2012Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK guide; confirm source equation and accept scientifically correct equivalent answers."},
 explanation,...extra
});
const common=n=>({
 id:"CHEM-P2-2012-MJ-Q"+n,sourceId:"CHEM-P2-2012-MJ",
 sourceFile:"CSEC_Chemistry_P2_2012_MJ.pdf",originalQuestionNumber:n,
 totalMarks:15,kind:"structured",status:"draft-needs-second-source-review",
 learnerFacing:false,answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied"
});
export const CHEMISTRY_2012_MJ_Q2_DRAFT=Object.freeze({
 ...common(2),pdfPages:[7,8],printedPages:[7,8],
 title:"Electrolysis of aqueous copper(II) sulfate using platinum",
 objectives:["A4.5","A9.1","A9.3","A9.5","A9.8","A9.9"],
 diagramStatus:"Page 7 platinum-electrode cell reconstructed as SVG; source-image overlay requires second reviewer",
 sourceIssues:[
  "The prompt states hydroxide ions are discharged at the anode. Aqueous anode half-equations may equivalently be written using water, depending on solution pH; award correctly balanced equivalents.",
  "Aqueous copper sulfate using inert platinum differs from electrolytic copper purification with a copper anode; do not conflate the products or electrolyte changes."
 ],
 parts:[
  {label:"Question 2",context:"Figure 3 shows the electrolysis of CuSO₄(aq) with inert platinum anode and cathode.",
   svg:CHEMISTRY_2012_Q2_ELECTROLYSIS_SVG,figure:"Figure 3. Electrolysis of CuSO₄(aq)",
   items:[
    item("(a)","Deduce the oxidation state of sulfur in copper(II) sulfate, CuSO₄.",1,
      ["+6."],
      "In SO₄²⁻, sulfur's oxidation state x satisfies x + 4(−2) = −2, so x = +6."),
    item("(b)","At the anode, hydroxide ions are discharged instead of sulfate ions. State a reason.",1,
      ["SO₄²⁻ is not preferentially oxidised in water; hydroxide/water is more readily oxidised to oxygen under the stated conditions."],
      "The more readily discharged species is oxidised at the positive anode; sulfate remains a spectator ion."),
    item("(c)","Write a balanced half-equation for the reaction at the anode.",2,
      ["4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e⁻.","Correct conservation of oxygen, hydrogen and charge; equivalent 2H₂O → O₂ + 4H⁺ + 4e⁻ accepted."],
      "Oxidation releases oxygen gas and electrons from hydroxide ions or water."),
    item("(d) Reaction","State whether the anode reaction is oxidation or reduction.",1,
      ["Oxidation."],
      "Electrons appear on the product side of the anode equation."),
    item("(d) Explanation","Explain the answer to (d).",1,
      ["Oxidation means loss of electrons; the discharged species releases electrons at the anode."],
      "The anode reaction is oxidation in both electrolytic and galvanic cells."),
    item("(e)","State TWO changes that occur in the electrolyte during electrolysis.",2,
      ["The blue colour becomes paler because Cu²⁺ is removed as copper metal at the cathode.","The solution becomes more acidic / H⁺ concentration increases from water oxidation, while sulfate remains in solution."],
      "The cathode plates out copper, and the inert anode generates oxygen; overall aqueous CuSO₄ is progressively transformed toward sulfuric acid."),
    item("(f)","Determine the mass of copper deposited if 5 A of current flows for 30 minutes. (RAM Cu=64, 1 F=96 500 C.)",4,
      ["Time = 30×60 = 1800 s.","Q = I×t = 5×1800 = 9000 C.","n(Cu) = 9000/(2×96 500) ≈ 0.04663 mol from Cu²⁺ + 2e⁻ → Cu.","m(Cu) = 0.04663×64 ≈ 2.98 g."],
      "Two moles of electrons are required to deposit each mole of Cu, so divide the charge by twice the Faraday constant.",
      {type:"calculation",lines:7}),
    item("(g) Anode","State how to modify the anode to purify copper electrolytically.",1,
      ["Replace platinum anode with the impure copper to be refined."],
      "The impure copper anode dissolves, and noble-metal impurities may collect as anode sludge."),
    item("(g) Cathode","State how to modify the cathode for electrolytic copper refining.",1,
      ["Replace platinum cathode with a thin sheet of pure copper."],
      "Cu²⁺ deposits as pure copper on the clean cathode."),
    item("(g) Electrolyte","State whether the CuSO₄ electrolyte must be changed for refining.",1,
      ["No modification required: acidified aqueous CuSO₄ is suitable."],
      "Soluble copper sulfate provides Cu²⁺ ions and conducts current.")
   ]}
  ]
});
export const CHEMISTRY_2012_MJ_Q3_DRAFT=Object.freeze({
 ...common(3),pdfPages:[9,10],printedPages:[9,10],
 title:"Chlorination of propene and butane, alcohol oxidation and esters",
 objectives:["B1.1","B1.2","B2.1","B2.2","B3.1","B3.2"],
 diagramStatus:"Original fully displayed A/B hydrocarbon structures and page 10 reaction scheme represented in SVG; exact all-atom source geometry still needs review",
 sourceIssues:[
  "Compound A's page 9 drawing is CH₃–CH=CH₂ (propene), B is CH₃–CH₂–CH₂–CH₃ (butane); source drawings must be reproduced fully displayed, rather than relying only on condensed SVG captions.",
  "Photochemical substitution of butane with chlorine can yield 1- and 2-chlorobutane as well as mixtures; do not require a single unique monochlorinated constitutional isomer without context.",
  "The oxidation scheme converts unspecified Alcohol D into ethanoic acid E; the ester J is methyl ethanoate, implying methanol reagent G."
 ],
 parts:[
  {label:"(a)",context:"The printed fully displayed structures show compound A as propene, CH₃–CH=CH₂, and compound B as butane, CH₃–CH₂–CH₂–CH₃.",
   svg:CHEMISTRY_2012_Q3_HYDROCARBON_SVG,
   sourceFullyDisplayedSvgs:[CHEMISTRY_2012_Q3_FULLY_DISPLAYED.propene,CHEMISTRY_2012_Q3_FULLY_DISPLAYED.butane],
   figure:"Source Figure: compounds A and B, redrawn schematically",
   items:[
    item("(i)","Name the homologous series for A and for B.",2,
      ["A: alkenes.","B: alkanes."],
      "Propene has one C=C double bond and is an alkene. Butane has only C–C single bonds and is an alkane."),
    item("(ii)","Write the general formula for the homologous series of A and B.",2,
      ["A (acyclic monoalkenes): CₙH₂ₙ.","B (acyclic alkanes): CₙH₂ₙ₊₂."],
      "The alkene series has two fewer hydrogen atoms than an alkane with the same number of carbons."),
    item("(iii)(a)","State ONE necessary condition for compound B to react with chlorine.",1,
      ["Ultraviolet light or sunlight; suitable radical-initiating light/heat conditions."],
      "Alkanes undergo a free-radical substitution reaction with chlorine under ultraviolet irradiation."),
    item("(iii)(b)","Draw fully displayed structures of the organic products of A and B when each reacts with chlorine.",4,
      ["A: the C=C in propene reacts by addition to make CH₃–CHCl–CH₂Cl.","A: all three carbon atoms, all hydrogens, the two chlorine atoms and their bonds are correctly fully displayed.","B: a butane hydrogen is substituted by chlorine to make a monochlorobutane, e.g. CH₃–CH₂–CH₂–CH₂Cl or CH₃–CHCl–CH₂–CH₃.","B: the fully displayed product has C₄H₉Cl with all single bonds and correct valences."],
      "Cl₂ adds across propene's double bond giving 1,2-dichloropropane, while UV chlorinates butane by substitution.",
      {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2012_Q3_FULLY_DISPLAYED.dichloropropane,CHEMISTRY_2012_Q3_FULLY_DISPLAYED.chlorobutane]})
   ]},
  {label:"(b)",context:"Reaction scheme: Alcohol D is oxidised by K₂Cr₂O₇ to compound E, displayed as CH₃COOH, then converted using G to compound J, displayed as CH₃COOCH₃.",
   svg:CHEMISTRY_2012_Q3_REACTION_SVG,figure:"Source reaction scheme for D, E and J",
   items:[
    item("(i)","State the role of potassium dichromate(VI), K₂Cr₂O₇, in converting Alcohol D to E.",1,
      ["Oxidising agent."],
      "Acidified dichromate(VI) oxidises a primary alcohol through an aldehyde to a carboxylic acid under suitable conditions."),
    item("(ii)","Write a balanced equation for compound E reacting with magnesium oxide.",2,
      ["2CH₃COOH + MgO → Mg(CH₃COO)₂ + H₂O.","The coefficient and formulae are balanced for an acid and basic oxide."],
      "Two ethanoic-acid molecules neutralise one magnesium oxide formula unit, forming magnesium ethanoate and water."),
    item("(iii)","Describe a test and observation for the gas produced when E reacts with solid calcium carbonate.",2,
      ["Bubble the evolved gas through clear limewater, aqueous Ca(OH)₂.","A positive CO₂ result is limewater turning milky/cloudy as CaCO₃ precipitates."],
      "Acid + carbonate gives a salt, CO₂ and water. CO₂ causes calcium carbonate turbidity in limewater."),
    item("(iv)","Name the homologous series to which compound J belongs.",1,
      ["Esters."],
      "Methyl ethanoate contains the carboxylate ester group –C(=O)–O– between two carbon groups.")
   ]}
  ]
});
