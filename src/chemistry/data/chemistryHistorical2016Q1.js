// CSEC Chemistry Paper 02, May/June 2016, Question 1.
// Source PDF pages 2–8; printed pages 4–10. Question = 25 marks.
// The source thermometer diagrams on PDF p3 are original and their six
// readings are reconstructed from a high-resolution visual inspection.
// All mark schemes are original SPARK drafts, NOT official CXC material.
import {CHEMISTRY_2016_MJ_Q1_APPARATUS_SVG,CHEMISTRY_2016_MJ_Q1_THERMOMETERS_SVG,
 CHEMISTRY_2016_MJ_Q1_COOLING_GRAPH_SVG,CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE,
 CHEMISTRY_2016_MJ_Q1_PARTICLES_SOURCE_SVG,CHEMISTRY_2016_MJ_Q1_PARTICLES_MODEL_SVG} from "./chemistryHistorical2016Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional rubric, not the official CXC marking scheme. Examiner approval and source overlay required."},
 explanation,...extra
});
export const CHEMISTRY_2016_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2016-MJ-Q1",sourceId:"CHEM-P2-2016-MJ",
 sourceFile:"CSEC_Chemistry_P2_2016_MJ.pdf",pdfPages:[2,3,4,5,6,7,8],
 printedPages:[4,5,6,7,8,9,10],originalQuestionNumber:1,
 title:"Cooling curve, melting point and qualitative analysis of an unknown solid",
 kind:"data-analysis",totalMarks:25,
 objectives:["A1.1","A1.2","A1.3","A2.2","C6.1","C6.2"],
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Thermometer readings and five preplotted graph points redrawn in native SVG; require independent pixel-level source comparison",
 sourceIssues:[
  "The six thermometer readings were visually interpreted as 73, 68, 65, 60, 55, 50 °C at 1, 2, 5, 7, 8, 9 minutes. Verify every source graduation before using the key in student auto-marking.",
  "Cooling plateau is 65 °C at 3–5 min, with 64 °C recorded at 6 min; accept reasonable source reading tolerance and distinguish pure substance from experimental cooling lag.",
  "The source Figure 4 deliberately contains blank candidate particle-drawing boxes; an explanatory SPARK SVG must not be labelled as preprinted source.",
  "The qualitative observations indicate Pb²⁺ from white hydroxide soluble in excess NaOH, insoluble with NH₃ and yellow PbI₂ with iodide, alongside nitrate inference from brown NO₂."
 ],
 parts:[
  {label:"(a)",context:"A substance A in a boiling tube is heated in water to 80 °C. The burner is turned off, and temperature is recorded every minute for 10 minutes.",
   svg:CHEMISTRY_2016_MJ_Q1_APPARATUS_SVG,figure:"Figure 1. Water-bath experiment",
   table:{title:"TABLE 1: EXPERIMENT RESULTS",headers:["Time (min)","Temperature (°C)"],
      rows:CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE.map((temperature,time)=>[time,[1,2,5,7,8,9].includes(time)?"":temperature])},
   items:[
    item("(i)","Complete Table 1 by inserting the thermometer readings from Figure 2 (page 5) at the appropriate times.",4,
     ["At 1 and 2 minutes: about 73 °C and 68 °C, read from source scales.","At 5 and 7 minutes: about 65 °C and 60 °C.","At 8 and 9 minutes: about 55 °C and 50 °C.","Place the six readings in their correct time rows (source rubric gives 4 marks overall; grouped credit is provisional)."],
     "Read each thermometer relative to the printed ten-degree graduations. The cooling data are approximately 80, 73, 68, 65, 65, 65, 64, 60, 55, 50 and 48 °C.",
     {type:"table",table:{title:"TABLE 1: SIX MISSING THERMOMETER TEMPERATURES",
      headers:["Time (min)","Temperature (°C)"],rows:[["1",""],["2",""],["5",""],["7",""],["8",""],["9",""]],
      answers:["73","68","65","60","55","50"],markGroups:[[0,1],[2,3],[4],[5]]}},
     {figureSvg:CHEMISTRY_2016_MJ_Q1_THERMOMETERS_SVG,figureRole:"source-thermometer-reference"}),
    item("(ii)","Using Table 1, plot temperature against time on Figure 3 on page 7. Five points have already been plotted. Draw a smooth curve through points to complete the cooling curve.",5,
     ["Use correct time axis (0–10 min) and temperature axis in °C.","Accurately plot all six missing temperature readings, consistent with the original table.","Preserve the five pre-plotted printed source points rather than changing them.","Draw a smooth cooling curve with a flat region at about 65 °C.","Show the change from liquid cooling to the plateau and then to solid cooling."],
     "The curve drops from 80 °C at t=0 to 65 °C at t=3, remains around 65 °C until about t=5, then decreases to 48 °C at t=10.",
     {type:"graph",x:"Time (min)",y:"Temperature (°C)",
      points:CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE.map((v,i)=>({x:i,y:v}))},
     {figureSvg:CHEMISTRY_2016_MJ_Q1_COOLING_GRAPH_SVG,figureRole:"source-preplotted-five-points"}),
    item("(iii)","List the THREE states of matter.",1,
     ["Solid, liquid and gas (all three for the one mark)."],
     "These are the three common classical physical states."),
    item("(iv)","Define the term 'melting point'.",2,
     ["Temperature at which a solid changes into liquid at a specified pressure.","For a pure material, solid and liquid coexist in equilibrium at this temperature."],
     "Melting and freezing occur at the same characteristic temperature for a pure substance under the same pressure."),
    item("(v)","Based on the completed graph, state the melting point of A.",1,
     ["About 65 °C from the horizontal region of the cooling curve."],
     "The flat cooling-curve region represents a phase change, so 65 °C is the melting/freezing point."),
    item("(vi)","From the graph, identify the time range during which a mixture of liquid and solid should exist in the boiling tube.",1,
     ["Approximately 3–5 minutes (around the 65 °C plateau)."],
     "Freezing releases latent heat while liquid and solid coexist; once freezing ends the solid cools again."),
    item("(vii)","State ONE precaution other than wearing safety apparel that avoids injury to face or hands during the experiment.",1,
     ["Use test-tube holders/tongs and direct the open end of the hot boiling tube away from people; allow apparatus to cool before touching."],
     "Hot glass may burn skin and heated liquids can splash. Tongs and safe tube orientation help prevent injury."),
    item("(viii)","Complete Figure 4 by drawing arrangements of particles of A at 0 min and 10 min. Use one dot for each particle.",2,
     ["At 0 min (80 °C, liquid), dots are close together but irregularly arranged, with no rigid fixed lattice.","At 10 min (48 °C, solid), dots are closely packed in an orderly repeating pattern, showing fixed positions."],
     "A begins above its melting point as liquid, and finishes well below it as solid; particle spacing stays relatively close in both states but solid ordering differs.",
     {type:"drawing",height:360},
     {sourceFigureSvg:CHEMISTRY_2016_MJ_Q1_PARTICLES_SOURCE_SVG,modelAnswerSvgs:[CHEMISTRY_2016_MJ_Q1_PARTICLES_MODEL_SVG]})
   ]},
  {label:"(b)",context:"An unknown solid B releases a reddish-brown gas on heating. Its solution gives white precipitates with NaOH and aqueous ammonia, and a yellow precipitate with potassium iodide.",
   items:[
    item("(i)","Infer the gas or anion indicated by the reddish-brown gas evolved when B is heated strongly.",1,
     ["A nitrate is indicated; NO₂ (nitrogen dioxide) is the reddish-brown gas."],
     "Many metal nitrates decompose with heating to release reddish-brown nitrogen dioxide."),
    item("(iii) NaOH","Infer the white precipitate with NaOH and why it dissolves in excess.",2,
     ["White Pb(OH)₂ forms with Pb²⁺ (also amphoteric hydroxides may initially behave similarly).","Lead(II) hydroxide is amphoteric and dissolves in excess strong alkali to form a soluble plumbite/hydroxoplumbate species."],
     "Lead(II) ions form white Pb(OH)₂, which dissolves in excess NaOH due to amphoteric behaviour."),
    item("(iv) Ammonia","State the inferences from the white precipitate formed with NH₃(aq) that is insoluble in excess.",2,
     ["A metal ion forming a white hydroxide is present.","Pb²⁺ is consistent because the white Pb(OH)₂ precipitate remains insoluble in excess ammonia, unlike Zn²⁺ which dissolves."],
     "The combined sodium hydroxide, ammonia and iodide results support lead(II)."),
    item("(v) Iodide","Identify the yellow precipitate with KI and give a balanced ionic equation.",3,
     ["Yellow lead(II) iodide, PbI₂(s), is formed.","Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s).","Atoms, ionic charges, correct 1:2 ratio and solid product state are preserved."],
     "Pb²⁺ reacts with iodide to form a bright-yellow insoluble salt.")
   ]}
 ]
});
