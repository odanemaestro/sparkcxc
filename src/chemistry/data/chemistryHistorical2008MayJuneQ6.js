// Scanned May/June 2008 Chemistry Paper 02, optional Section C Question 6, PDF page 16.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking. Official CXC mark scheme not supplied."},explanation});
export const CHEMISTRY_2008_MJ_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q6",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",
 pdfPages:[16],printedPages:[16],originalQuestionNumber:6,totalMarks:15,
 title:"Soda-lime, lead and borosilicate glass; amorphous bonding and recycling",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"not-applicable",
 sourceIssues:[
  "Source Section C directs learners to answer Question 6 OR Question 7. Preserve both in the historical question bank but count only one 15-mark answer in a generated 100-mark examination.",
  "Source describes 'SiO₄ tetrahedra not all of the same strength'; glass softens over a range of temperature because its amorphous network offers a range of local environments and relaxation energies, not because a single ideal Si–O bond is arbitrarily strong or weak."
 ],
 parts:[
  {label:"(a)",items:[
    item("(i)","State two benefits of adding sodium and calcium carbonates to silica during glass manufacture.",2,
     ["Sodium carbonate provides sodium oxide, reducing melting/working temperature and production energy.","Calcium carbonate provides calcium oxide, increasing durability and water resistance of the glass."],
     "Soda acts as a flux to make silica easier to melt; lime helps stabilise the soda–silica network."),
    item("(ii)","Explain composition changes needed to make lead–potassium glass and borosilicate glass.",4,
     ["Replace much of sodium oxide with potassium oxide for lead–potassium glass.","Add lead(II) oxide, PbO, giving a dense, refractive lead glass.","For borosilicate glass add boron(III) oxide, B₂O₃, to silica glass.","Adjust alkali/lime proportions to make a low-expansion, heat-resistant borosilicate product."],
     "Lead–potassium glass uses potash and lead oxide; borosilicate glass incorporates boron oxide into the silicate network.")
  ]},
  {label:"(b)",items:[
    item("(i)","Explain why glass must remain noncrystalline during cooling.",2,
     ["A noncrystalline, uniform structure preserves glass transparency.","Crystallisation/devitrification can scatter light and make the product cloudy or less uniform."],
     "Random amorphous structure avoids crystals that disrupt transparency."),
    item("(ii)","Explain glass softening over a range of temperatures and why this helps moulding.",3,
     ["Amorphous silicate glass contains a range of local bond environments and network relaxation energies.","As temperature rises its viscosity gradually decreases rather than melting at one sharp crystalline temperature.","This working interval allows glass to be blown, stretched and shaped while viscous."],
     "Glass softens progressively, enabling workers to shape a thick liquid instead of handling an abrupt liquid transition."),
    item("(iii)","Give two reasons to recycle glass despite widely available raw materials.",2,
     ["Recycling reduces energy demand and associated emissions during glass melting.","Recycling reduces landfill volume and use of fresh sand/carbonate raw materials."],
     "Using cullet typically lowers the energy needed to produce new glass."),
    item("(iv)","Give one advantage and one disadvantage of glass in building construction.",2,
     ["Advantage: transparent windows admit daylight, reducing daytime lighting needs.","Disadvantage: untreated glass can break/shatter and transmit substantial heat; safe glazing/insulation is needed."],
     "Glass offers visibility and light, but requires glazing design for breakage and thermal performance.")
  ]}
 ]
});