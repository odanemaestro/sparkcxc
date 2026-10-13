// May/June 2024 Chemistry Paper 02 Q1, PDF pp2–6, printed pp4–8.
// All five thermometer readings need independent exact SVG overlay and examiner check.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional grading; not official CXC mark scheme."},explanation});
export const CHEMISTRY_2024_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q1",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[2,3,4,5,6],printedPages:[4,5,6,7,8],
 originalQuestionNumber:1,totalMarks:25,kind:"data-analysis",
 title:"Sodium thiosulfate and hydrochloric acid reaction: temperature, rate, sulfur dioxide",
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Figure 1 five source thermometers and Figure 2 preprinted graph grid need exact original SVG overlay.",
 sourceIssues:["Source thermometer reading for 20–21°C is tentatively 20.5°C and for 35–36°C 35.5°C; verify original fine tick intervals independently.","Table 1 gives times [59,50,40,24,15,11,10]s and two known temperatures [5,10]°C; source figure covers the other five. Provisional temperatures [14,20.5,27,33,35.5]°C.","Source Figure 2 scale x=0–45°C and y=0–0.105s⁻¹ must be retained in SVG."],
 context:"Sodium thiosulfate (Na₂S₂O₃) reacts with dilute HCl forming NaCl, SO₂, elemental sulfur and water. Seven mixtures with identical concentrations and volumes were reacted at different temperatures.",
 parts:[
 {label:"(a)",items:[
 item("","Define rate of reaction.",1,["Change of amount/concentration of reactant or product per unit time."],"Rate measures how quickly reactants disappear or products appear.")
 ]},
 {label:"(b)",items:[
 item("(i)","Write a balanced equation for sodium thiosulfate reacting with dilute hydrochloric acid.",2,
 ["Na₂S₂O₃ + 2HCl → 2NaCl + SO₂ + S + H₂O.","Correct balanced reactants and all products."],"The acid decomposes thiosulfate, forming an insoluble sulfur precipitate and sulfur dioxide."),
 item("(ii)","Describe a test and observation for sulfur dioxide.",2,
 ["Bubble gas through acidified potassium manganate(VII) solution.","Purple solution becomes colourless (alternatively acidified dichromate orange→green)."],
 "Sulfur dioxide is a reducing gas and decolourises acidified permanganate."),
 item("(iii)","Calculate mass of SO₂ obtained from 50cm³ gas at STP; one mole occupies 22400cm³.",3,
 ["Moles SO₂=50/22400≈0.002232 mol.","Molar mass SO₂=32+2(16)=64g/mol.","Mass=0.002232×64≈0.143g."],
 "Use the source's stated STP molar volume 22,400 cm³ mol⁻¹.")
 ]},
 {label:"(c)",items:[
 item("(i)","Read the temperatures for experiments 3–7 from Figure 1 and record in Table 1.",5,
 ["Experiment 3 ≈14°C.","Experiment 4 ≈20.5°C.","Experiment 5 ≈27°C.","Experiment 6 ≈33°C.","Experiment 7 ≈35.5°C."],
 "Read each source thermometer to its graduation. A second independent source comparison is required.",
 {type:"table",table:{headers:["Trial","Temperature (°C)","Time (s)"],rows:[["1","5","59"],["2","10","50"],["3","","40"],["4","","24"],["5","","15"],["6","","11"],["7","","10"]],answers:["14","20.5","27","33","35.5"]}})
 ,item("(ii)","Calculate rate = 1/time to three decimal places for experiments 3–7.",5,
 ["1/40=0.025 s⁻¹.","1/24=0.042 s⁻¹.","1/15=0.067 s⁻¹.","1/11=0.091 s⁻¹.","1/10=0.100 s⁻¹."],
 "Known experiments 1 and 2 give 0.017 and 0.020s⁻¹. Other values are reciprocals of the recorded seconds.",
 {type:"table",table:{headers:["Trial","Rate (s⁻¹)"],rows:[["1","0.017"],["2","0.020"],["3",""],["4",""],["5",""],["6",""],["7",""]],answers:["0.025","0.042","0.067","0.091","0.100"]}})
 ]},
 {label:"(d)",items:[
 item("(i)","Plot reaction rate against temperature on Figure 2 and draw a smooth curve through experiments 1–7.",5,
 ["Temperature on x-axis with °C.","Reaction rate on y-axis with s⁻¹.","Accurate plots at temperatures 5,10 and14°C.","Accurate plots at temperatures 20.5,27,33 and 35.5°C.","Smooth increasing curve through the points."],
 "The reaction runs faster at higher temperatures. Axes must reflect the printed 0–45°C and 0–0.105s⁻¹ source scale.",
 {type:"graph",x:"Temperature (°C)",y:"Rate of reaction (s⁻¹)",points:[{x:5,y:0.017},{x:10,y:0.020},{x:14,y:0.025},{x:20.5,y:0.042},{x:27,y:0.067},{x:33,y:0.091},{x:35.5,y:0.100}]})
 ,item("(ii)","Explain how raising temperature affects reaction rate.",2,
 ["The rate increases as temperature increases.","Particles have more kinetic energy and more frequent effective collisions exceeding activation energy."],
 "Higher temperature increases collision frequency and the proportion of collisions energetic enough to react.")
 ]}
 ]
});