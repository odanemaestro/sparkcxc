// Source: CSEC_Chemistry_P2_2009_MJ.pdf pp3–8, first compulsory question (25 marks).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored criteria, not official CXC marking. Source thermometer readings need independent verification."},explanation});
export const CHEMISTRY_2009_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q1",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",
 pdfPages:[3,4,5,6,7,8],printedPages:[3,4,5,6,7,8],originalQuestionNumber:1,totalMarks:25,
 title:"Zinc-copper displacement temperature graph, qualitative salt R, and acid identification",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original zinc-in-polystyrene-cup apparatus, five fine-gradation thermometer stems, plotted-source graph grid and source Table 2 require pixel-level SVG comparison.",
 sourceIssues:[
 "Source Figure 2 thermometer final readings at masses 0.4,0.8,1.2,1.6,2.0g are provisionally 30.7,34.5,36.9,37.9,37.9°C; second visual examiner must verify individual tenths before student release.",
 "Source Table 1 explicitly gives Experiment 5 final 37.9°C and ΔT 9.9°C at initial 28°C.",
 "Source Zn:CuSO₄ mole ratio 1:1 and 100cm³ of 0.20 mol dm⁻³ CuSO₄ mean limiting salt is 0.020 mol and zinc stoichiometric minimum = 0.020×65 = 1.30g. Experiments 4 and 5 at 1.6g,2.0g zinc therefore plateau.",
 "Source Q1(b)(i) ammonia evolution with NaOH on heating and moist red litmus turning blue supports NH₄⁺; white AgCl precipitate dissolving in aqueous ammonia after silver nitrate supports Cl⁻, hence candidate salt NH₄Cl.",
 "For white-label muriatic acid vs vinegar, both are acids and both turn blue litmus red. Use pH/concentration-controlled conductivity or metal/carbonate reaction rates; no unique identification via litmus alone."
 ],
 context:"Zn(s)+CuSO₄(aq)→ZnSO₄(aq)+Cu(s). Five zinc masses 0.4,0.8,1.2,1.6,2.0g are added to identical 100cm³ samples of 0.20mol dm⁻³ CuSO₄ at an initial temperature of 28°C. Source Figure 2 contains five final thermometer stems. Table 2 then gives qualitative observations for an unknown salt R.",
 parts:[
 {label:"(a)",items:[
 item("(i) a","Describe TWO observations when zinc is added to aqueous CuSO₄.",2,["Blue CuSO₄ solution fades as Cu²⁺ ions are used up.","Reddish-brown copper metal coats the zinc surface."],"Zinc displaces copper from solution because zinc is higher in the reactivity series."),
 item("(i) b","Use observations to compare zinc and copper reactivity.",1,["Zinc is more reactive than copper."],"A more reactive metal displaces a less reactive metal from its aqueous salt."),
 item("(i) c","Distinguish endothermic and exothermic reactions.",2,["Exothermic reactions release heat to the surroundings.","Endothermic reactions absorb heat from the surroundings."],"The displacement warms solution, showing energy transfer to water."),
 item("(ii) a","Use Figure 2 to complete five final thermometer readings and temperature changes.",2,["Provisional final readings: 30.7,34.5,36.9,37.9,37.9°C.","Subtract 28°C to get provisional ΔT: 2.7,6.5,8.9,9.9,9.9°C."],"Read each stem against its printed 0.1°C graduations; preserve a follow-through marking tolerance.",{type:"table",table:{headers:["Zinc (g)","Final (°C)","ΔT (°C)"],rows:[["0.4","",""],["0.8","",""],["1.2","",""],["1.6","",""],["2.0","37.9","9.9"]],answers:["30.7","2.7","34.5","6.5","36.9","8.9","37.9","9.9"]}}),
 item("(ii) b","Plot ΔT against mass zinc on source grid.",3,["Correct x-axis mass zinc (g) and y-axis ΔT (°C).","Plot five experimental points accurately, with suitable scales.","Show increase followed by plateau near ΔT=9.9°C."],"Heat output rises as more Zn reacts until copper sulfate is exhausted, then levels off.",{type:"graph",x:"Mass of zinc added (g)",y:"Temperature change (°C)",points:[{x:0.4,y:2.7},{x:0.8,y:6.5},{x:1.2,y:8.9},{x:1.6,y:9.9},{x:2.0,y:9.9}]}),
 item("(ii) c","Use the graph to estimate temperature change at 1.0g zinc.",1,["Approximately 7–8°C depending on a valid student best-fit curve."],"Interpolate between 0.8g and 1.2g; about 7.7°C on straight-line interpolation."),
 item("(ii) iii","Calculate minimum mass Zn for complete reaction with 100cm³ of 0.20M CuSO₄, Ar Zn=65.",2,["Moles CuSO₄=0.20×0.100=0.020mol.","Moles Zn=0.020mol, mass=0.020×65=1.30g."],"The displacement requires one mole zinc per mole Cu²⁺."),
 item("(ii) iv","Explain why 1.6g and 2.0g zinc gave nearly identical temperature change.",1,["CuSO₄ is limiting; extra Zn remains unreacted after available Cu²⁺ is used up."],"More zinc adds no extra reaction heat once the electrolyte is exhausted."),
 item("(ii) v","Explain no temperature change if silver rather than zinc is used.",2,["Silver is less reactive than copper.","Silver cannot displace Cu²⁺ from solution, so no exothermic displacement occurs."],"Silver lies below copper in the reactivity series.")
 ]},
 {label:"(b)",items:[
 item("(i) Test 1","From NaOH warming and pungent gas turning moist red litmus blue, give inference and ionic equation.",2,["NH₄⁺ ions present.","NH₄⁺(aq)+OH⁻(aq)→NH₃(g)+H₂O(l)."],"Warming ammonium salt with alkali releases ammonia gas."),
 item("(i) Test 2","From white precipitate after AgNO₃ which dissolves in ammonia, give inference and ionic equation.",2,["Cl⁻ ions present.","Ag⁺(aq)+Cl⁻(aq)→AgCl(s)."],"Silver chloride is a white solid and dissolves in aqueous ammonia."),
 item("(ii)","Identify salt R.",1,["Ammonium chloride NH₄Cl."],"Both ammonium and chloride ions are identified.")
 ]},
 {label:"(c)",items:[
 item("(i)","Design experiment distinguishing hydrochloric acid bottle from vinegar.",2,["Take equal volumes of solutions of comparable concentration and use universal indicator or pH meter.","The strong acid HCl has lower pH than weak ethanoic acid at equal molar concentration."],"Litmus alone establishes acidity but not relative strength; concentration control is required."),
 item("(ii)","List materials required.",1,["Labelled samples, clean test tubes/beakers and universal indicator/pH meter."],"Use clean separate containers to avoid contamination."),
 item("(iii)","State observation identifying acids.",1,["Lower pH sample is HCl, higher pH sample is ethanoic acid (at controlled equal concentrations)."],"Strong HCl ionises fully while ethanoic acid is weak and partially dissociated.")
 ]}
 ]});