// May/June 2009 Paper 02 optional Section C Question 6, PDF p19.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional marking, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2009_MJ_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q6",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[19],printedPages:[19],originalQuestionNumber:6,totalMarks:15,
 title:"Clay pottery, cement hydration and concrete curing",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",diagramStatus:"not-applicable",
 sourceIssues:["Paper says SECTION C answer ONE question, Q6 OR Q7, each 15 marks. Source bank must preserve both historical options, but a generated exam must use exactly ONE of the two and calculate 100 total marks, not 115.","Ceramic clay 'hardening' by firing differs from hydraulic cement setting through hydration; wetting fired clay as though it were cement is not an appropriate curing method."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Define plasticity, porosity and vitrification in pottery.",3,["Plasticity: moist clay changes shape without cracking and retains moulded shape.","Porosity: tiny pores allow air/water to enter or pass through clay.","Vitrification: high firing temperatures partially fuse clay to a dense glasslike, less porous ceramic."],"Plasticity makes clay mouldable; porosity describes pores; vitrification densifies fired clay."),
 item("(ii)","Explain why plasticity and porosity make clay useful for pottery.",2,["Plasticity permits shaping vessels before firing.","Controlled porosity permits moisture to escape during drying, reducing trapped water and steam damage."],"Unfired clay must be shaped and dried before firing.")
 ]},
 {label:"(b)",items:[
 item("(i)","Name one component of cement.",1,["Calcium silicates (e.g. tricalcium silicate) or calcium aluminate; limestone and clay are raw materials."],"Portland cement is primarily a mixture of calcium silicate and aluminate phases."),
 item("(ii)","Name two other ingredients for concrete apart from cement.",2,["Water.","Sand and/or gravel aggregate (two among water, sand, crushed stone/gravel)."],"Concrete uses cement, water and aggregates."),
 item("(iii)","Explain dampening a concrete floor during hardening and consequence of failure.",4,["Cement hardens by hydration reactions requiring water.","Keeping concrete moist sustains hydration and strength development.","Premature surface drying slows or halts hydration.","This can cause weaker concrete, dusting or cracking."],"Curing holds moisture so hydration continues; drying too quickly damages strength and durability.")
 ]},
 {label:"(c)",items:[
 item("","Should clay be dampened like concrete while hardening? Give reasons.",3,["No; pottery clay requires controlled drying then firing, not hydraulic cement-style wet curing.","Clay shape must dry before kiln firing to avoid trapped water rapidly forming steam.","Repeated wetting delays drying and may cause deformation/cracking during firing."],"Clay pottery reaches ceramic hardness through high-temperature firing; concrete hardens by cement hydration.")
 ]}
]});