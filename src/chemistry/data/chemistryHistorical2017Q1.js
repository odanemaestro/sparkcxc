// CSEC Chemistry Paper 02 May/June 2017, Q1, PDF pages 3–7.
// Printed question pages 5–9. ALL sources are the supplied original paper.
// This answer scheme is independently authored by SPARK, not CXC, and stays
// learnerFacing:false pending independent source/mark/figure exam review.
import {CHEMISTRY_2017_MJ_Q1_DATA,CHEMISTRY_2017_MJ_Q1_BALANCES_SVG,
 CHEMISTRY_2017_MJ_Q1_GRAPH_SVG,CHEMISTRY_2017_MJ_Q1_ENERGY_SVG,
 CHEMISTRY_2017_MJ_Q1_ENERGY_MODEL_SVG} from "./chemistryHistorical2017Svgs";
import {CHEMISTRY_2010_MJ_Q1_CATALYST_MODEL_SVG} from "./chemistryHistorical2010Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored marking, NOT an official CXC scheme. All measurements/partial credit/graph tolerances require second reviewer approval."},
 explanation,...extra
});
export const CHEMISTRY_2017_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-MJ-Q1",sourceId:"CHEM-P2-2017-MJ",
 sourceFile:"CSEC_Chemistry_P2_2017_MJ.pdf",pdfPages:[3,4,5,6,7],
 printedPages:[5,6,7,8,9],originalQuestionNumber:1,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"data-analysis",totalMarks:25,
 title:"Hydrogen peroxide rate experiment with different masses of MnO₂ catalyst",
 objectives:["A8.1","A10.1","A10.2","A10.3","A10.4","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored; official CXC marking scheme not supplied",
 diagramStatus:"Five original balance dials, blank graph, two-level energy diagram and separate candidate model apparatus represented as native SVG; overlay and examiner QA pending",
 sourceIssues:[
  "Five dial readings are visually interpreted as Expt 2=0.4 g, 3=1.6 g, 4=2.2 g, 5=3.6 g, 6=4.0 g. Confirm source tick positions and 0/2/4/6 scale calibration independently.",
  "Rate at 3.0 g of catalyst depends on student best-fit line, approximately 3.7–3.8 mL s⁻¹. Award a justified graph-reading range, and consistent 10-second volume follow-through.",
  "The original Figure 3 horizontal axis is labelled Time even though an energy reaction-profile plot ordinarily uses progress of reaction. Preserve printed label in SOURCE reference and explain scientific convention in model.",
  "More MnO₂ catalyst increases initial observed rate under these conditions, but does not increase theoretical product amount from an unchanged mass of H₂O₂."
 ],
 parts:[
  {label:"(a)",context:"For each experiment, MnO₂ is mixed with 50 cm³ of 0.8 mol dm⁻³ H₂O₂, while rate of O₂ production is measured. Original Figure 1 shows five balance dials.",
   svg:CHEMISTRY_2017_MJ_Q1_BALANCES_SVG,figure:"Figure 1. Masses of manganese(IV) oxide",
   table:{title:"TABLE 1: RATE OF REACTION BY MASS OF MnO₂",headers:["Experiment","Catalyst mass (g)","Rate (mL s⁻¹)"],
     rows:CHEMISTRY_2017_MJ_Q1_DATA.map(row=>[row.experiment,row.experiment===1?0:"",row.rate])},
   items:[
    item("","Use the five balances in Figure 1 to complete the missing masses in Table 1.",5,
     ["Experiment 2: 0.4 g.","Experiment 3: 1.6 g.","Experiment 4: 2.2 g.","Experiment 5: 3.6 g.","Experiment 6: 4.0 g."],
     "The printed dials read clockwise from 0 (top) to 2 (right), 4 (bottom) and 6 (left). Values are obtained from the dial pointers.",
     {type:"table",table:{title:"TABLE 1: FIVE MISSING MASSES",headers:["Experiment","Mass of MnO₂ (g)"],
      rows:[["2",""],["3",""],["4",""],["5",""],["6",""]],answers:["0.4","1.6","2.2","3.6","4.0"]}})
   ]},
  {label:"(b)",items:[item("","Define the term 'rate of reaction'.",1,
   ["The change in concentration/amount of a reactant consumed or product formed per unit time, or oxygen volume produced per second for this experiment."],
   "Rate describes how quickly a reaction proceeds, such as oxygen generated in mL each second.")
  ]},
  {label:"(c)",items:[item("","Write a balanced chemical equation for the decomposition of hydrogen peroxide.",2,
   ["2H₂O₂(aq) → 2H₂O(l) + O₂(g), with MnO₂ labelled as a catalyst.","Correct balancing and reaction products; the MnO₂ catalyst is not consumed."],
   "Hydrogen peroxide decomposes into water and oxygen. MnO₂ speeds the reaction.",
   {type:"calculation",lines:4})
  ]},
  {label:"(d)",context:"Figure 2 shows blank axes of rate versus MnO₂ mass. One source point has already been plotted.",
   svg:CHEMISTRY_2017_MJ_Q1_GRAPH_SVG,figure:"Figure 2. Rate of reaction versus mass of manganese(IV) oxide",
   items:[item("","Plot rate versus mass using Table 1, circle plotted points with ⊗, and draw a line of best fit.",5,
    ["Correct horizontal axis: MnO₂ mass 0–4 g, with units.","Correct vertical axis: rate of oxygen production in mL s⁻¹, with units.","Accurately plot the mass-rate coordinate pairs including (0.4,0.6), (1.6,1.8) and (2.2,2.7).","Accurately plot the remaining points (3.6,4.5), (4.0,5.0), retaining the source (0,0).","Circle source points as requested and draw a suitably increasing, approximately linear best-fit relationship."],
    "The rates rise from zero with catalyst mass; the ratio is approximately 1.2–1.3 mL s⁻¹ per gram over most of the supplied interval.",
    {type:"graph",x:"Mass of MnO₂ (g)",y:"Rate (mL s⁻¹)",
      points:CHEMISTRY_2017_MJ_Q1_DATA.map(row=>({x:row.mass,y:row.rate}))})
   ]},
  {label:"(e)",items:[
   item("(i)","Using the graph, describe the relationship between rate of reaction and mass of catalyst.",2,
    ["Reaction rate increases as the catalyst mass increases (positive association).","There is an approximately direct/linear relationship across these supplied values because more catalyst surface provides more active sites, with controlled peroxide volume/concentration."],
    "More catalyst particles present more active sites for H₂O₂ decomposition, increasing measured oxygen production per second."),
   item("(ii)","From the best-fit graph, estimate the rate with 3.0 g of catalyst.",1,
    ["Approximately 3.7–3.8 mL s⁻¹, subject to justified student best-fit graph tolerance."],
    "Read vertically at 3.0 g and project across to the rate axis."),
   item("(iii)","Calculate the oxygen gas volume produced after 10 s using (e)(ii).",1,
    ["Rate × time ≈ 3.7 mL s⁻¹ × 10 s = 37 mL; give credit for follow-through with candidate's graph value."],
    "Multiply mL/s by seconds to obtain mL, assuming that estimated rate applies over those first 10 s.")
  ]},
  {label:"(f)",context:"Original Figure 3 shows a reactant energy line above a product energy line, with room to draw pathways.",
   svg:CHEMISTRY_2017_MJ_Q1_ENERGY_SVG,figure:"Figure 3. Energy profile diagram (blank pathways)",
   items:[item("","Complete and label an energy profile showing how a catalyst changes reaction rate.",2,
    ["Draw a higher energy barrier for the uncatalysed reaction and a lower barrier for the catalysed pathway from the SAME initial reactant level.","Both pathways reach the same final product energy, with the two activation energies or pathways correctly distinguished/labelled."],
    "A catalyst supplies an alternative pathway with lower activation energy; it does not change the energy of reactants/products or the reaction enthalpy.",
    {type:"drawing",height:355},{modelAnswerSvgs:[CHEMISTRY_2017_MJ_Q1_ENERGY_MODEL_SVG]})
  ]},
  {label:"(g)",items:[item("","Draw and label the experimental apparatus, including reagents, used to collect the oxygen gas.",4,
   ["Show reaction flask containing hydrogen peroxide with MnO₂ catalyst.","Show correct reagent labels, including volume/concentration of H₂O₂ and catalyst mass.","Fit a gas-tight bung and delivery tube/connector, preventing oxygen loss.","Show measured collection in a calibrated gas syringe or inverted measuring cylinder over water, correctly connected."],
   "Oxygen is collected in a graduated measuring device through a sealed delivery path so volume/time can be recorded.",
   {type:"drawing",height:410},{modelAnswerSvgs:[CHEMISTRY_2010_MJ_Q1_CATALYST_MODEL_SVG]})
  ]},
  {label:"(h)",items:[item("","List TWO other factors that affect reaction rate.",2,
   ["Temperature (higher temperature usually increases the fraction of effective collisions).","Reactant concentration (for H₂O₂, more concentrated solutions usually react faster under otherwise controlled conditions); another distinct suitable factor accepted."],
   "Temperature and reactant concentration change collision conditions independently of catalyst mass.")
  ]}
 ]
});
