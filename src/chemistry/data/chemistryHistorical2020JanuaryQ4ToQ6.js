// CSEC Chemistry Paper 02 January 2020, three 15-mark extended responses.
// Verified visually from user-supplied image-only original pages 14–20.
// Source diagram figure, exact marks and chemistry reviewed provisionally;
// never publish until independent science/examiner/graphic approval.
import {CHEMISTRY_2020_JAN_Q5_ESTER_SOURCE_SVG,
 CHEMISTRY_2020_JAN_Q5_HYDROLYSIS_SVG,CHEMISTRY_2020_JAN_Q6_CORROSION_SVG} from "./chemistryHistorical2020JanuarySvgs";
import {CHEMISTRY_2020_JAN_ORGANIC_MODELS} from "./chemistryHistorical2020JanuaryOrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK provisional point-based marking, NOT the official CXC marking scheme. Examiner/source and exact diagram checks pending."},explanation,...extra
});
const question=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2020-JAN-Q"+n,sourceId:"CHEM-P2-2020-JAN",sourceFile:"CSEC_Chemistry_P2_2020_JAN.pdf",
 pdfPages:pages,printedPages:pages,originalQuestionNumber:n,kind:"extended",totalMarks:15,
 status:"draft-needs-second-source-review",learnerFacing:false,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; original CXC scheme not supplied",
 diagramStatus:"SPARK original native SVG source references and model answers awaiting independent visual and chemical QA"
});
export const CHEMISTRY_2020_JAN_QUESTIONS_4_TO_6=Object.freeze([
 question(4,[14,15],"Brine electrolysis, ionic conduction and carbon allotrope uses",
 ["A5.1","A5.5","A9.1","A9.2","A9.4","A9.5"],[
  {label:"(a)",context:"Jack electrolyses CONCENTRATED aqueous sodium chloride solution (brine) using inert electrodes.",
   items:[
    item("(i)","Identify TWO ions in the electrolyte, including aqueous state symbols.",2,
     ["Na⁺(aq), sodium ions.","Cl⁻(aq), chloride ions. H⁺/H₃O⁺ and OH⁻ from water are also present and can be accepted as distinct ions with correct states."],
     "Brine contains dissolved sodium/chloride ions, alongside small concentrations of water's hydrogen/hydroxide ions."),
    item("(ii)","State TWO factors affecting which ion is discharged during electrolysis.",2,
     ["Relative ease of discharge/electrode potentials or position in electrochemical series.","Concentration of ions, electrode material or kinetic/overpotential effects (choose a distinct correct influence)."],
     "Concentration and electrode potential affect the products: high chloride concentration favours chlorine at a suitable anode."),
    item("(iii)","Which ions in aqueous brine are attracted to the anode?",2,
     ["Cl⁻(aq) (chloride, negative ions).","OH⁻(aq) (hydroxide, negative ions from water)."],
     "The positive anode attracts anions; which is discharged depends on concentration and electrode kinetics."),
    item("(iv)","Write the balanced anode half-equation for CONCENTRATED brine with inert electrodes.",2,
     ["2Cl⁻(aq) → Cl₂(g) + 2e⁻.","Correct electron direction (right, oxidation), charge and atom balance with state symbols."],
     "At a suitable anode, concentrated chloride is oxidised to chlorine gas; this is not water electrolysis with oxygen necessarily dominating.",
     {type:"calculation",lines:4}),
    item("(v)","Write the balanced cathode half-equation for aqueous brine.",2,
     ["2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq).","Water is reduced, not Na⁺, in aqueous solution; full charge balance and states are correct."],
     "Hydrogen gas forms at the cathode because water is reduced more readily than sodium ions. Sodium metal is not obtained from aqueous brine.",
     {type:"calculation",lines:4})
   ]},
  {label:"(b)",table:{title:"TABLE 2: CONDUCTOR OR NON-CONDUCTOR",headers:["Substance","Classification"],
    rows:[["Magnesium ribbon",""],["Plastic ruler",""],["Aqueous MgCl₂ solution",""]]},
   items:[item("","Classify each substance as an electrical conductor or non-conductor.",3,
    ["Magnesium ribbon: conductor, because delocalised electrons carry charge in the metal.","Plastic ruler: non-conductor/insulator, because it lacks mobile electric charge carriers.","Aqueous MgCl₂: conductor/electrolyte because mobile Mg²⁺ and Cl⁻ ions carry current."],
    "Metals conduct through electrons, soluble ionic compounds conduct through mobile aqueous ions, and plastics generally insulate.",
    {type:"table",table:{title:"TABLE 2",headers:["Substance","Classification"],
      rows:[["Magnesium ribbon",""],["Plastic ruler",""],["Aqueous MgCl₂ solution",""]],
      answers:["Conductor","Non-conductor","Conductor"]}})
   ]},
  {label:"(c)",items:[item("","State TWO uses of carbon.",2,
    ["Graphite is used for electrodes in electrolysis/electrical applications, pencil cores or lubricants.","Diamond is used for cutting/grinding tools, or activated carbon adsorbs contaminants in water/air filtration; give a distinct carbon form/use."],
    "Useful properties depend on carbon allotrope: conducting graphite, hard diamond, adsorbing activated charcoal.")
   ]}
 ],[
  "The two principal brine ions are Na⁺ and Cl⁻, but water contributes H⁺/H₃O⁺ and OH⁻. Part (a)(iii) specifically asks for anions attracted to anode: Cl⁻ and OH⁻.",
  "Toxic chlorine gas can be formed; do not propose carrying out brine electrolysis outside supervised facilities.",
  "Products depend on CONCENTRATED brine and suitable inert electrodes. Distinguish this from dilute NaCl where oxygen evolution may compete."
 ]),
 question(5,[16,17,18],"Methyl propanoate ester hydrolysis, ethanol oxidation and Caribbean fermentation",
 ["B3.1","B3.2","B3.3","C4.1"],[
  {label:"(a)",context:"Compound C is printed as CH₃–CH₂–C(=O)–O–CH₃, a sweet-smelling perfume/flavour molecule.",
   svg:CHEMISTRY_2020_JAN_Q5_ESTER_SOURCE_SVG,figure:"Source Compound C (methyl propanoate)",
   modelAnswerSvgs:[CHEMISTRY_2020_JAN_ORGANIC_MODELS.methylPropanoate],
   items:[
    item("(i)","Name Compound C and state its homologous series.",2,
     ["Compound C is methyl propanoate, with the alcohol-derived methyl part attached to the carboxylate oxygen.","Homologous series: esters (alkyl alkanoates)."],
     "The structure CH₃CH₂COOCH₃ contains the three-carbon propanoate acid part and one-carbon methyl alcohol part."),
    item("(ii)","Draw the FULLY DISPLAYED structural formulae of the TWO molecules from hydrolysis of C.",2,
     ["Propanoic acid, CH₃CH₂C(=O)OH, fully displayed with all H and O atoms.","Methanol, CH₃OH, fully displayed with each C–H and O–H bond; ester bond hydrolysis adds water across the ester."],
     "Methyl propanoate + water gives propanoic acid and methanol (not ethanoic acid plus ethanol).",
     {type:"drawing",height:420},
     {modelAnswerSvgs:[CHEMISTRY_2020_JAN_ORGANIC_MODELS.propanoicAcid,CHEMISTRY_2020_JAN_ORGANIC_MODELS.methanol],
      supportingSvg:CHEMISTRY_2020_JAN_Q5_HYDROLYSIS_SVG})
   ]},
  {label:"(b)",context:"Source Figure: ethanol CH₃CH₂OH is converted to Compound D, CH₃C(=O)OH.",
   items:[
    item("(i)","Name Compound D and identify oxidising reagent and conditions for ethanol → D.",3,
     ["Compound D is ethanoic acid (acetic acid).","Use acidified potassium dichromate(VI) or acidified KMnO₄ with sufficient oxidant.","Heat under reflux so the primary alcohol undergoes full oxidation rather than distilling off intermediate ethanal."],
     "Strong oxidation of a primary alcohol under reflux yields a carboxylic acid; the carbon count remains two."),
    item("(ii)","Explain how ethanol is made by fermenting sugar, including balanced glucose equation.",7,
     ["Start with fermentable sugar-containing feedstock such as glucose solution, cane juice or molasses.","If using sucrose, it must be hydrolysed to glucose and fructose before alcoholic fermentation.","Add yeast, whose enzymes catalyse fermentation of suitable monosaccharides.","Use warm conditions suitable for yeast, usually approximately 25–35 °C depending on strain.","Keep oxygen supply restricted / anaerobic conditions to favour ethanol production.","Write balanced equation C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.","Identify both products ethanol and carbon dioxide and note distillation can enrich the ethanol after fermentation."],
     "Caribbean rum manufacture can begin with sugarcane molasses. Yeast ferments fermentable sugars to ethanol and CO₂ in low oxygen, with heating controlled to avoid killing yeast.",
     {type:"calculation",lines:9}),
    item("(iii)","State ONE use of ethanol other than solvent in cosmetics and perfumes.",1,
     ["Fuel additive / bioethanol for engines, surface disinfectant (appropriately formulated), industrial ethanol solvent outside perfumes or alcoholic beverage ingredient."],
     "Ethanol has applications in fuels, disinfectants and chemical manufacturing beyond perfume solvents.")
   ]}
 ],[
  "Source ester C is CH3CH2COOCH3 (METHYL propanoate), NOT ethyl propanoate; its hydrolysis produces propanoic acid + METHANOL.",
  "The separate oxidation question shows ethanol converted to ETHANOIC acid, which is a different molecule from propanoic acid.",
  "Ethanol fermentation under warm low oxygen conditions needs viable yeast; heating above strain tolerance kills or denatures fermentation enzymes."
 ]),
 question(6,[19,20],"Rusting requirements, nails in controlled environments and protective aluminium oxide",
 ["A8.1","A8.3","C2.1","C5.5"],[
  {label:"(a)",context:"Source Figure 2: A has iron nail immersed in water with air above; B has nail in boiled water protected by oil from air; C has nail in DRY air.",
   svg:CHEMISTRY_2020_JAN_Q6_CORROSION_SVG,figure:"Source Figure 2. Iron nails under three controlled conditions",
   items:[
    item("(i)","State TWO environmental conditions necessary for ordinary rusting of iron.",2,
     ["Water / moisture is present.","Oxygen / air is present; both together are needed for ordinary atmospheric iron rusting."],
     "Rusting is iron oxidation involving both moisture and oxygen; without either, rusting is strongly suppressed."),
    item("(ii)","For EACH test tube A, B and C state whether rusting occurs and give ONE reason.",6,
     ["Test A: yes, rust forms.","A has both water and air/oxygen in contact with the iron nail.","Test B: no appreciable rust during the controlled test.","Boiling removes dissolved O₂ and the oil layer limits further oxygen reaching the water.","Test C: no appreciable rust during the controlled test.","The air is dry (moisture excluded), so essential water is absent."],
     "Tube A has water and oxygen. B has water but oxygen deliberately excluded; C has oxygen but no moisture."),
    item("(iii)","Why was boiled water in Tube B covered with oil?",1,
     ["To prevent fresh atmospheric O₂ from dissolving in the previously boiled oxygen-depleted water."],
     "Oil forms a surface barrier to air; boiling initially drives out much of the dissolved oxygen.")
   ]},
  {label:"(b)",context:"Aluminium forms a corrosion-resistant protective surface layer.",
   items:[
    item("(i)","Name ONE alloy of aluminium and state ONE use.",2,
     ["Duralumin or a correctly identified aluminium alloy (often containing copper and other additions).","Structural aircraft components or other use appropriately matched to the named alloy."],
     "Duralumin offers improved strength while retaining comparatively low density; exact aerospace grades vary."),
    item("(ii)","Explain why the oxidation/corrosion of aluminium can be beneficial.",2,
     ["Aluminium reacts rapidly with oxygen to form a thin, strongly adherent Al₂O₃ surface film.","The dense film blocks further oxygen/water attack and passivates/protects underlying aluminium, unlike flaky nonprotective iron rust."],
     "Aluminium is chemically reactive, but its self-limiting oxide film provides excellent practical corrosion resistance."),
    item("(iii)","Write a balanced equation for aluminium exposed to air forming protective oxide.",2,
     ["4Al(s) + 3O₂(g) → 2Al₂O₃(s).","Correct oxide formula Al₂O₃ and fully balanced Al and O atom counts with state symbols."],
     "Oxygen oxidises aluminium to its protective aluminium(III) oxide layer.",
     {type:"calculation",lines:5})
   ]}
 ],[
  "The printed experiment is specifically about RUSTING of iron; corrosion of some other metals can occur without precisely these same two conditions. Do not generalise 'oxygen+water always necessary' to every form of metal corrosion.",
  "A dry-air tube excludes moisture even though oxygen is available. Boiled water alone is insufficient if oxygen can re-enter, so source Tube B also uses an oil barrier.",
  "Aluminium oxide's protective film prevents extensive corrosion; some compositions/environments still permit pitting or galvanic corrosion. Do not teach absolute immunity."
 ])
]);
