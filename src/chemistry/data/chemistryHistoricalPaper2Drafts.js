import {CHEMISTRY_2014_MJ_Q4_DRAFT} from "./chemistryHistorical2014Q4";
import {CHEMISTRY_2014_MJ_Q5_DRAFT} from "./chemistryHistorical2014Q5";
import {CHEMISTRY_2014_MJ_Q6_DRAFT} from "./chemistryHistorical2014Q6";
import {CHEMISTRY_2014_MJ_Q3_DRAFT} from "./chemistryHistorical2014Q3";
import {CHEMISTRY_2014_MJ_Q2_DRAFT} from "./chemistryHistorical2014Q2";
import {CHEMISTRY_2025_JAN_Q5_DRAFT} from "./chemistryHistorical2025JanuaryQ5";
import {CHEMISTRY_2025_JAN_Q6_DRAFT} from "./chemistryHistorical2025JanuaryQ6";
import {CHEMISTRY_2025_JAN_Q4_DRAFT} from "./chemistryHistorical2025JanuaryQ4";
import {CHEMISTRY_2025_JAN_Q3_DRAFT} from "./chemistryHistorical2025JanuaryQ3";
import {CHEMISTRY_2025_JAN_Q1_DRAFT} from "./chemistryHistorical2025JanuaryQ1";
import {CHEMISTRY_2025_JAN_Q2_DRAFT} from "./chemistryHistorical2025JanuaryDraft";
import {CHEMISTRY_2014_MJ_Q1_DRAFT} from "./chemistryHistorical2014Draft";
import { CHEMISTRY_HISTORICAL_2025_MJ_REMAINDER } from "./chemistryHistorical2025Remainder";
import { CHEMISTRY_2025_MJ_Q1_GRAPH_SVG } from "./chemistryHistoricalGraphSvg";

// Draft transcription from the user-supplied 2025 May/June CSEC Chemistry Paper 02.
// Source: CSEC_Chemistry_P2_2025_MJ.pdf, PDF pages 2-6 (printed pages 5-9).
// This is an authored study/review record, NOT an official CXC marking scheme.
// A second source comparison and exact SVG overlay are required before publication.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
  label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK scheme. Check the original response and award equivalent correct chemistry."},explanation
});

export const CHEMISTRY_HISTORICAL_DRAFT_ITEMS = Object.freeze([
  Object.freeze({
    id:"CHEM-P2-2025-MJ-Q1",
    sourceId:"CHEM-P2-2025-MJ",
    sourceFile:"CSEC_Chemistry_P2_2025_MJ.pdf",
    pdfPages:[2,3,4,5,6],
    printedPages:[5,6,7,8,9],
    originalQuestionNumber:1,
    status:"draft-needs-second-source-review",
    answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
    diagramStatus:"source graph grid still requires exact SVG overlay comparison",
    learnerFacing:false,
    kind:"data-analysis",totalMarks:25,
    title:"Electrolysis of aqueous copper(II) sulfate",
    objectives:["A9.3","A9.5","A9.8","A9.10","C6.1","C6.2"],
    context:"A group of students conducted an investigation to determine the products of electrolysis when dilute aqueous copper(II) sulfate solution was electrolyzed using copper electrodes. The copper cathode was washed, dried and weighed, then connected to a suitable circuit. A current of 0.2 A was passed through the solution. Every five minutes, the cathode was removed, rinsed, dried and weighed, for a total of five readings.",
    parts:[
      {
        label:"(a)",
        items:[
          item("(i)","Define the term 'electrolysis'.",2,["Chemical decomposition of an electrolyte","by passing an electric current through its molten or aqueous form"],"A direct current drives a non-spontaneous chemical change in an electrolyte."),
          item("(ii)","State ONE difference between the 'anode' and the 'cathode'.",1,["Oxidation occurs at the anode and reduction occurs at the cathode; alternatively, in this electrolytic cell the anode is positive and the cathode is negative."],"Electrons are lost at the anode and gained at the cathode."),
          item("(iii)","Complete Table 1 by recording the mass of the cathode after 10 minutes and 20 minutes and the mass of copper deposited after 15 and 25 minutes.",4,
            ["10 min: 11.85 g","15 min: 0.07 g copper deposited","20 min: 11.89 g","25 min: 0.11 g copper deposited"],
            "Subtract the original cathode mass, 11.80 g, to obtain each deposited mass. Add the deposited mass to 11.80 g to recover a missing cathode mass.",
            {type:"table",table:{title:"TABLE 1: EXPERIMENTAL RESULTS",headers:["Time (min)","Mass of Cathode (g)","Actual Mass of Copper Deposited (g)"],
              rows:[["0","11.80","—"],["5","11.83","0.03"],["10","","0.05"],["15","11.87",""],["20","","0.09"],["25","11.91",""]],
              answers:["11.85","0.07","11.89","0.11"]}}),
          {...item("(iv)","Plot a graph of actual mass of copper deposited versus time, using the axes in Figure 1 on page 7. Draw a line of best fit through the points.",4,
            ["Plot the six source data points correctly","Use the original labelled axes and scales","Draw an appropriate line of best fit","Show the increasing trend"],
            "The deposited mass increases approximately linearly with time at steady current. The supplied graph grid starts at 0 and uses an axis break before 0.03 g.",
            {type:"graph",x:"Time (minutes)",y:"Actual mass of copper deposited (g)",points:[{x:0,y:0},{x:5,y:.03},{x:10,y:.05},{x:15,y:.07},{x:20,y:.09},{x:25,y:.11}]}),svg:CHEMISTRY_2025_MJ_Q1_GRAPH_SVG},
          item("(v)","Use the graph to predict the mass of copper that would be deposited after 28 minutes. [Use dotted lines on the graph to show how you obtained your answer.]",2,
            ["Approximately 0.12 g, according to the drawn line of best fit","Construction/dotted lines at 28 minutes shown on the graph"],
            "Extrapolate from 25 to 28 minutes, allowing reasonable differences from the candidate's best-fit line."),
          item("(vi)","Write an ionic equation to represent the reaction at the cathode.",2,
            ["Cu²⁺(aq) + 2e⁻ → Cu(s)","Correctly balanced atoms and charge; aqueous Cu²⁺ is reduced to copper metal"],
            "Cu²⁺ accepts two electrons and forms copper metal at the negative electrode."),
          item("(vii)","Calculate the quantity of electricity that passed through the copper sulfate solution when 0.2 A of current flowed for 20 minutes. (Given that quantity of electricity = current × time)",2,
            ["Convert 20 minutes to 1200 seconds","Q = 0.2 A × 1200 s = 240 C"],"Charge Q = I × t. Time must be in seconds.",{type:"calculation",lines:5}),
          item("(viii)","Calculate the number of moles of copper that would be formed. (Given that 1 F = 96 500 C)",2,
            ["Each mole of Cu requires 2 moles of electrons, or 193 000 C","n(Cu) = 240 / (2 × 96 500) = 0.00124 mol"],
            "The cathode half-equation has two electrons for each copper atom.",{type:"calculation",lines:5}),
          item("(ix)","Calculate the mass of copper that would be formed. (Relative atomic mass of copper = 64)",1,
            ["m = 0.0012435 × 64 = 0.0796 g (approximately 0.080 g)"],
            "Mass equals amount in moles multiplied by molar mass.",{type:"calculation",lines:4}),
          item("(x)","Suggest a reason for the difference between the mass of copper obtained in (ix) and the mass of copper recorded in Table 1.",1,
            ["The cathode might not have been dried completely before weighing; retained water increases the observed mass. Accept other defensible experimental errors."],
            "The calculated mass at 20 min is about 0.080 g while the recorded gain is 0.09 g.")
        ]
      },
      {
        label:"(b)",
        context:"Complete Table 2 by writing the observations for each test carried out on Salt S.",
        items:[
          item("TABLE 2","Record TWO observations when dry Salt S is heated and moist red and blue litmus is held at the mouth of the test tube, and TWO observations when sodium hydroxide is added to a solution of Salt S until in excess.",4,
            ["Brown fumes of nitrogen dioxide evolved on strong heating","The moist blue litmus paper turns red (acidic gas)","A white precipitate forms with aqueous NaOH","The precipitate dissolves in excess NaOH to give a colourless solution"],
            "Thermal decomposition of a nitrate can produce acidic nitrogen dioxide. Zn²⁺ forms amphoteric zinc hydroxide, which dissolves in excess hydroxide.",
            {type:"table",table:{title:"TABLE 2: OBSERVATIONS FOR TESTS ON SALT S",headers:["Test","Observation","Inference"],rows:[
              ["Heat dry Salt S strongly and hold moist red and blue litmus at the mouth of the test tube","","An acidic gas is produced"],
              ["Observation of heated sample","","Nitrate ions are present"],
              ["Add aqueous NaOH gradually","","Zn²⁺ ions are present"],
              ["Continue adding excess aqueous NaOH","","Zn²⁺ ions are present"]
            ],answers:["Moist blue litmus turns red","Brown nitrogen dioxide fumes produced","White precipitate forms","White precipitate dissolves in excess, leaving colourless solution"]}})
        ]
      }
    ]
  }),
  Object.freeze({
    id:"CHEM-P2-2025-MJ-Q2",
    sourceId:"CHEM-P2-2025-MJ",
    sourceFile:"CSEC_Chemistry_P2_2025_MJ.pdf",
    pdfPages:[7,8],printedPages:[10,11],originalQuestionNumber:2,
    status:"draft-needs-second-source-review",
    answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
    diagramStatus:"no figure in this source question",
    learnerFacing:false,kind:"structured",totalMarks:15,
    title:"Phosphoric acid, salts and neutralisation",
    sourceIssues:["The source states 0.05 M phosphoric acid has pH 4. A simple first-dissociation calculation (Ka1 ≈ 7.1 × 10⁻³) predicts pH around 1.8, so this numeric premise needs chemistry review. Answer part (d) from the explicitly GIVEN pH values, without teaching pH 4 as a typical measured value."],
    objectives:["A7.1","A7.3","A7.5","A7.7","A7.9"],
    context:"Phosphoric acid, H₃PO₄, is a common additive in most soft drinks. It reacts with sodium hydroxide, an alkali, to form both normal and acid salts.",
    parts:[
      {label:"(a)",context:"Define EACH of the following terms.",items:[
        item("(i) Acid","Define 'acid'.",1,["A substance that produces H⁺(aq) ions when dissolved in water."],
          "Hydrogen ions are responsible for the characteristic reactions of aqueous acids."),
        item("(ii) Alkali","Define 'alkali'.",1,["A water-soluble base that produces OH⁻(aq) ions in water."],
          "All alkalis are bases, but not all bases dissolve in water."),
        item("(iii) Normal salt","Define 'normal salt'.",2,
          ["All replaceable hydrogen ions from the parent acid have been replaced by metal or ammonium ions","The resulting salt has no ionisable hydrogen from the parent acid; Na₃PO₄ is an example"],
          "The distinction is how many acidic hydrogens have been replaced.")
      ]},
      {label:"(b)",items:[
        item("(i)","Write a balanced equation, including state symbols, to show the formation of the normal salt formed from the reaction between phosphoric acid and sodium hydroxide.",3,
          ["Correct reactant and normal-salt formulae H₃PO₄, NaOH, Na₃PO₄, H₂O","Correct coefficients 1 : 3 : 1 : 3","Appropriate states: H₃PO₄(aq) + 3NaOH(aq) → Na₃PO₄(aq) + 3H₂O(l)"],
          "Three moles of alkali neutralise all three replaceable hydrogen ions in one mole of phosphoric acid.",{type:"calculation",lines:5})
      ]},
      {label:"(c)",items:[
        item("(i)","State the molecular formula for an acid salt formed from the reaction between phosphoric acid and sodium hydroxide.",1,
          ["NaH₂PO₄ or Na₂HPO₄"],"An acid salt retains one or more replaceable hydrogen ions."),
        item("(ii)","Write a balanced equation to show the formation of the acid salt stated in (c)(i).",2,
          ["For NaH₂PO₄: H₃PO₄ + NaOH → NaH₂PO₄ + H₂O","For Na₂HPO₄: H₃PO₄ + 2NaOH → Na₂HPO₄ + 2H₂O; the equation must agree with the chosen salt"],
          "Partial neutralisation forms an acid salt. One or two moles of sodium hydroxide are needed depending on the salt named.")
      ]},
      {label:"(d)",context:"A solution of 0.05 M phosphoric acid has a pH of 4 while a solution of 0.05 M sulfuric acid has a pH of 1.",items:[
        item("(i)","State which of the two acids is stronger.",1,["Sulfuric acid (the solution stated to have pH 1)."],
          "At the same stated concentration, the solution with the lower pH has the higher hydrogen ion concentration. Use the pH values given in this question.")
      ]},
      {label:"(e)",context:"Jeffrey complains of pains due to excess stomach acid after consuming too much orange juice.",items:[
        item("(i)","Name TWO acids present in orange juice.",2,
          ["Citric acid","Ascorbic acid (vitamin C)"],"Citrus fruits contain citric acid and vitamin C, known chemically as ascorbic acid."),
        item("(ii)","State the type of chemical reaction that takes place in the treatment of excess stomach acid.",1,
          ["Neutralisation (acid-base reaction)."],"An antacid reacts with excess stomach acid."),
        item("(iii)","State the chemical name or formula of ONE compound that can be used to treat excess stomach acid.",1,
          ["Magnesium hydroxide, Mg(OH)₂; calcium carbonate, CaCO₃; or sodium hydrogen carbonate, NaHCO₃."],
          "A suitable antacid reacts with hydrochloric acid in the stomach.")
      ]}
    ]
  }),
  ...CHEMISTRY_HISTORICAL_2025_MJ_REMAINDER,
  CHEMISTRY_2014_MJ_Q1_DRAFT,
  CHEMISTRY_2014_MJ_Q2_DRAFT,
  CHEMISTRY_2014_MJ_Q3_DRAFT,
  CHEMISTRY_2014_MJ_Q4_DRAFT,
  CHEMISTRY_2014_MJ_Q5_DRAFT,
  CHEMISTRY_2014_MJ_Q6_DRAFT,
  CHEMISTRY_2025_JAN_Q1_DRAFT,
  CHEMISTRY_2025_JAN_Q2_DRAFT,
  CHEMISTRY_2025_JAN_Q3_DRAFT,
  CHEMISTRY_2025_JAN_Q4_DRAFT,
  CHEMISTRY_2025_JAN_Q5_DRAFT,
  CHEMISTRY_2025_JAN_Q6_DRAFT
]);

export const CHEMISTRY_HISTORICAL_DRAFT_SUMMARY = Object.freeze({
  paperCount:28,transcribedDraftQuestions:CHEMISTRY_HISTORICAL_DRAFT_ITEMS.length,
  fullyVerifiedHistoricalQuestions:0,
  releaseRequirement:"Second visual transcription check, independent solution review, and exact SVG figure comparison"
});
