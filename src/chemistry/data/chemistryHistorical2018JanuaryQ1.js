// Source scan: CSEC_Chemistry_P2_2018_JAN.pdf, original PDF pp4–9.
// Nine source burette readings estimated visually; exact meniscus tenths need independent verification.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4},extra={})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; source burette/graph figures and official examiner tolerances pending approval."},explanation,...extra});
export const CHEMISTRY_2018_JAN_Q1_DATA=Object.freeze({
 finalReadings:[25.70,38.35,40.50],initialReadings:[0.15,13.30,15.50],
 tentativeVolumes:[25.55,25.05,25.00],concordantMean:25.025,
 temperatures:[19,40,48,53,55,55,55],times:[0,1.5,2,2.5,3,5,7]
});
export const CHEMISTRY_2018_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q1",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",
 pdfPages:[4,5,6,7,8,9],printedPages:[4,5,6,7,8,9],originalQuestionNumber:1,totalMarks:25,
 kind:"data-analysis",title:"Hydrochloric acid–sodium hydroxide titration and stearic acid heating curve",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC marking key unavailable",
 diagramStatus:"Source Figure 1 three pairs of original burette scales, and Figure 2 0–8 min by 0–80°C gridded graph with preplotted (7,55) need source-exact SVG overlays.",
 sourceIssues:[
 "Source Figure 1 final/initial readings have been visually estimated at final [25.70,38.35,40.50] and initial [0.15,13.30,15.50]cm³, giving volumes [25.55,25.05,25.00]. The second/third concordant pair mean 25.025cm³; independent scan reading at source resolution is mandatory.",
 "Source claims purified stearic acid has heating plateau 55°C; chemically pure stearic acid commonly melts at about 69–70°C. Treat experimental 55°C as printed data, not a verified general melting point for pure stearic acid.",
 "The original graph already has a preplotted point at time 7.0min, temperature 55°C; do not erase it or assume all points are blank.",
 "The original burette scale has increasing numbers DOWNWARDS; correct meniscus is bottom of curve."
 ],
 context:"Solution M is aqueous HCl at 3.6g dm⁻³, titrated against 25.0cm³ of solution N (NaOH). Source Figure 1 shows three pairs of burette menisci. In a separate heating study of stearic acid, times [0,1.5,2,2.5,3,5,7] minutes correspond to temperatures [19,40,48,53,55,55,55]°C.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Complete the 3×3 burette table with each final reading, initial reading and volume of acid used.",9,
 ["T1 final 25.70cm³ (provisional).","T2 final 38.35cm³ (provisional).","T3 final 40.50cm³ (provisional).","T1 initial 0.15cm³ (provisional).","T2 initial 13.30cm³ (provisional).","T3 initial 15.50cm³ (provisional).","T1 volume 25.55cm³ (provisional).","T2 volume 25.05cm³ (provisional).","T3 volume 25.00cm³ (provisional)."],
 "Read from bottom of each source meniscus; delivered volume is final minus initial; provisional readings require second source approval.",
 {type:"table",table:{headers:["Burette reading (cm³)","Titration 1 (rough)","Titration 2","Titration 3"],rows:[["Final","","",""],["Initial","","",""],["Volume used","","",""]],answers:["25.70","38.35","40.50","0.15","13.30","15.50","25.55","25.05","25.00"]}}),
 item("(ii)","Calculate the mean volume of solution M used.",1,["(25.05+25.00)/2 = 25.025cm³, about 25.03cm³ (conditional)."],"Exclude the rough first trial; average the two concordant trials."),
 item("(iii)","Calculate molar concentration of HCl in solution M, relative atomic masses H=1,Cl=35.5.",2,
 ["M(HCl)=1+35.5=36.5g mol⁻¹.","c=3.6/36.5≈0.09863mol dm⁻³."],
 "Convert mass concentration to molarity using molecular mass."),
 item("(iv)","Calculate the moles of HCl used.",1,["0.09863×0.025025≈0.002468mol (conditional)."],"n(HCl)=cV, using dm³ for volume."),
 item("(v)","Write balanced neutralisation equation.",1,["HCl + NaOH → NaCl + H₂O."],"One mole of hydrochloric acid reacts with one mole sodium hydroxide."),
 item("(vi)","Determine moles of sodium hydroxide in 25cm³ of N.",2,
 ["HCl:NaOH mole ratio is 1:1.","n(NaOH)=0.002468mol in 25.0cm³ (conditional)."],
 "NaOH moles equal HCl moles at complete neutralisation."),
 item("(vii)","Calculate concentration of sodium hydroxide in g dm⁻³; M(NaOH)=40.",2,
 ["c(NaOH)=0.002468/0.025≈0.0987mol dm⁻³.","Mass concentration=0.0987×40≈3.95g dm⁻³ (conditional)."],
 "Divide moles by 0.025dm³ and multiply by 40g mol⁻¹.")
 ]},
 {label:"(b)",items:[
 item("(i)","Identify the forces in a molecular solid such as stearic acid.",1,
 ["Intermolecular forces between molecules (including London dispersion and relevant hydrogen bonding)."],
 "Molecular crystals have attraction between intact covalently bonded molecules."),
 item("(ii)","Explain why sodium chloride has a higher melting/boiling point than stearic acid.",2,
 ["NaCl forms a giant ionic lattice of oppositely charged Na⁺ and Cl⁻.","Strong electrostatic attractions need more energy to overcome than the weaker intermolecular attractions between stearic-acid molecules."],
 "Heating NaCl disrupts its ionic lattice, whereas melting stearic acid separates molecules without breaking internal covalent bonds."),
 item("(iii)","Plot temperature against time using Table 2 and draw a best-fit curve.",4,
 ["Label time x-axis in minutes and temperature y-axis in °C.","Plot early readings (0,19),(1.5,40),(2,48),(2.5,53) accurately.","Include the 3min and 5min points at55°C, preserving the preplotted (7,55) source point.","Draw the rising heating curve levelling off at 55°C as the source experiment describes."],
 "The printed sample heats and eventually stabilises at 55°C. The plateau is the source's experimental result, not a generic pure stearic acid reference value.",
 {type:"graph",x:"Time (min)",y:"Temperature (°C)",points:[{x:0,y:19},{x:1.5,y:40},{x:2,y:48},{x:2.5,y:53},{x:3,y:55},{x:5,y:55},{x:7,y:55}]})
 ]}
 ]
});