// Original SPARK CSEC Chemistry Paper 02 simulations.
// Language, mark distribution and task types are modelled on the uploaded historical papers
// and CXC 21/G/SYLL 13. These are original practice questions, not CXC questions.

const line=(label,prompt,marks,points,explanation,objective)=>({
  label,prompt,marks,objective,response:{type:"lines",lines:Math.max(2,Math.min(10,marks*2))},
  markScheme:{points,guidance:`${marks} mark${marks===1?"":"s"}`,explanation}
});
const calc=(label,prompt,marks,points,explanation,objective)=>({
  label,prompt,marks,objective,response:{type:"calculation",lines:Math.max(4,marks+2)},
  markScheme:{points,guidance:"Award method marks where correct working is shown.",explanation}
});
const table=(label,prompt,marks,headers,rows,points,explanation,objective)=>({
  label,prompt,marks,objective,response:{type:"table",table:{headers,rows}},
  markScheme:{points,guidance:"Award marks for correct entries and units where required.",explanation}
});
const graph=(label,prompt,marks,points,explanation,objective,x,y)=>({
  label,prompt,marks,objective,response:{type:"graph",height:320,x,y},
  markScheme:{points,guidance:"Award marks for plotting, labels, scale and line/curve as specified.",explanation}
});

const paper=(id,title,questions)=>({id,title,durationMinutes:150,totalMarks:100,questions});

export const CHEMISTRY_PAPER2_PRACTICE_PAPERS = Object.freeze([
paper("CHEM-P2-SPARK-01","SPARK Chemistry Paper 02 Practice 1",[
  {
    id:"CHEM-P2-S1-Q1",number:1,title:"Rates of reaction investigation",kind:"data-analysis",totalMarks:25,objectives:["A10.1","A10.2","A10.3","A10.4","A6.5"],
    parts:[
      {label:"(a)",context:"A student investigated the effect of hydrochloric acid concentration on the rate of reaction with equal lengths of magnesium ribbon. In each experiment the time taken to collect 40 cm³ of hydrogen was measured.",table:{title:"TABLE 1: RATE INVESTIGATION",headers:["Experiment","HCl concentration / mol dm⁻³","Time / s","Rate, 1/time / s⁻¹"],rows:[["1","0.50","80",""],["2","0.75","54",""],["3","1.00","40",""],["4","1.25","32",""],["5","1.50","27",""]]},items:[
        table("(i)","Calculate the rate, 1/time, for Experiments 1–5 and record each value to 3 decimal places.",5,["Experiment","Rate / s⁻¹"],[["1",""],["2",""],["3",""],["4",""],["5",""]],["0.013","0.019","0.025","0.031","0.037"],"Use rate = 1 ÷ time. The values increase as concentration increases.","A10.1"),
        graph("(ii)","Plot a graph of rate against hydrochloric acid concentration. Draw the best straight line or smooth trend through the points.",5,["Points corresponding to (0.50,0.013), (0.75,0.019), (1.00,0.025), (1.25,0.031), (1.50,0.037)","Axes labelled with quantities and units","Suitable scale","Best-fit trend"],"A correct graph shows rate increasing approximately in proportion to concentration over this range.","A10.4","HCl concentration / mol dm⁻³","Rate / s⁻¹")
      ]},
      {label:"(b)",items:[
        line("(i)","State the relationship between hydrochloric acid concentration and reaction rate shown by the data.",2,["Rate increases as concentration increases","approximately direct/proportional trend over the data range"],"A higher concentration gives a faster reaction.","A10.3"),
        line("(ii)","Explain this relationship using collision theory.",3,["More acid particles per unit volume","collisions with magnesium occur more frequently","more successful collisions per second"],"Increasing concentration increases collision frequency, so the rate rises.","A10.2"),
        line("(iii)","State TWO variables that should be kept constant in this investigation.",2,["Temperature","mass/length/surface area of magnesium","volume of acid","same apparatus"],"Any two suitable controlled variables earn credit.","A10.2")
      ]},
      {label:"(c)",items:[
        line("(i)","Write a balanced chemical equation, including state symbols, for magnesium reacting with dilute hydrochloric acid.",2,["Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)"],"The equation must conserve atoms and show appropriate states.","A6.5"),
        line("(ii)","State ONE safety precaution for this experiment and explain why it is appropriate.",2,["Wear eye protection because acid may splash","keep away from flames because hydrogen is flammable","handle acid carefully"],"The precaution must be linked to the actual hazard.","A10.2"),
        line("(iii)","Suggest ONE improvement that would make the timing more reliable.",2,["Use a gas syringe/data logger","repeat each concentration and calculate a mean","start timing consistently when reactants contact"],"A valid improvement should reduce measurement or random error.","A10.3")
      ]},
      {label:"(d)",items:[
        calc("(i)","Calculate the number of moles in 0.120 g of magnesium. [Ar: Mg = 24.0]",2,["n = m/M","0.120 ÷ 24.0 = 0.00500 mol"],"Convert mass to amount using molar mass.","A6.2"),
        calc("(ii)","Calculate the maximum volume of hydrogen at RTP from 0.120 g magnesium. [Molar gas volume at RTP = 24.0 dm³ mol⁻¹]",2,["Mg:H₂ ratio = 1:1","0.00500 mol × 24.0 dm³ mol⁻¹ = 0.120 dm³ = 120 cm³"],"The balanced equation gives a 1:1 mole ratio.","A6.6")
      ]}
    ]
  },
  {
    id:"CHEM-P2-S1-Q2",number:2,title:"Atomic structure, periodicity and bonding",kind:"structured",totalMarks:15,objectives:["A3.1","A3.3","A3.6","A4.3","A5.1","A5.6"],parts:[
      {label:"(a)",context:"Element X has atomic number 17 and mass number 37.",items:[
        line("(i)","State the numbers of protons, neutrons and electrons in a neutral atom of X.",3,["17 protons","20 neutrons","17 electrons"],"Atomic number gives protons; neutrons = 37 − 17; a neutral atom has equal protons and electrons.","A3.3"),
        line("(ii)","Write the electron arrangement of X.",1,["2,8,7"],"Seventeen electrons fill shells as 2,8,7.","A3.1"),
        line("(iii)","X also exists with mass number 35. Explain why the two atoms are isotopes.",2,["same number of protons / same atomic number","different numbers of neutrons / different mass numbers"],"Isotopes are atoms of one element with the same proton number but different neutron numbers.","A3.6")
      ]},
      {label:"(b)",items:[
        line("(i)","Predict the formula of the compound formed between magnesium and X.",2,["Mg forms Mg²⁺","X forms X⁻","formula MgX₂ / MgCl₂ if X identified as chlorine"],"Two 1− ions are needed to balance one Mg²⁺ ion.","A5.3"),
        line("(ii)","Explain the formation of the ionic bond in this compound.",3,["magnesium transfers two electrons","each X atom gains one electron","electrostatic attraction between Mg²⁺ and X⁻ ions"],"Ionic bonding follows electron transfer and attraction between oppositely charged ions.","A5.1")
      ]},
      {label:"(c)",items:[
        line("(i)","State how the oxidising power changes down Group VII.",1,["decreases down the group"],"Halogens become less able to gain electrons down the group.","A4.3"),
        line("(ii)","Explain why solid magnesium chloride does not conduct electricity but molten magnesium chloride does.",3,["solid ions fixed in lattice","cannot move to carry charge","molten ions are mobile and carry charge"],"Ionic conduction requires mobile ions.","A5.6")
      ]}
    ]
  },
  {
    id:"CHEM-P2-S1-Q3",number:3,title:"Acids, salts and volumetric analysis",kind:"structured",totalMarks:15,objectives:["A7.1","A7.7","A7.10","A7.11"],parts:[
      {label:"(a)",items:[
        line("(i)","Define an acid in terms of proton transfer.",1,["proton/H⁺ donor"],"An acid donates a proton in a proton-transfer reaction.","A7.1"),
        line("(ii)","Distinguish between a strong acid and a weak acid.",2,["strong acid ionises almost completely in water","weak acid ionises only partially"],"Strength refers to degree of ionisation, not concentration.","A7.3")
      ]},
      {label:"(b)",context:"25.0 cm³ of sulfuric acid of concentration 0.0800 mol dm⁻³ neutralises 20.0 cm³ of sodium hydroxide solution.",items:[
        line("(i)","Write the balanced equation for the reaction.",2,["H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O"],"Two moles of NaOH neutralise one mole of H₂SO₄.","A6.5"),
        calc("(ii)","Calculate the number of moles of sulfuric acid used.",2,["n = cV","V = 0.0250 dm³","n = 0.0800 × 0.0250 = 0.00200 mol"],"Convert cm³ to dm³ before using n=cV.","A7.11"),
        calc("(iii)","Calculate the concentration of the sodium hydroxide solution.",3,["moles NaOH = 2 × 0.00200 = 0.00400 mol","V NaOH = 0.0200 dm³","c = 0.00400/0.0200 = 0.200 mol dm⁻³"],"Use the 1:2 mole ratio from the balanced equation.","A7.11")
      ]},
      {label:"(c)",items:[
        line("(i)","Describe how a pure dry sample of copper(II) sulfate crystals could be prepared from dilute sulfuric acid and excess copper(II) oxide.",4,["warm dilute sulfuric acid","add CuO until no more reacts / CuO in excess","filter to remove excess solid","concentrate filtrate and cool to crystallise","filter and dry crystals"],"An insoluble base is added in excess so all acid is neutralised; excess solid is filtered before crystallisation.","A7.7"),
        line("(ii)","Explain why titration is not necessary in this preparation.",1,["excess insoluble CuO can be removed by filtration"],"Because unreacted solid can be filtered off, exact reacting volumes are unnecessary.","A7.7")
      ]}
    ]
  },
  {
    id:"CHEM-P2-S1-Q4",number:4,title:"Organic compounds",kind:"extended-response",totalMarks:15,objectives:["B1.2","B2.4","B2.7","B3.1","B3.3","B3.8","B3.9"],parts:[
      {label:"(a)",items:[
        line("(i)","State the general formula of the alkenes.",1,["CnH₂n"],"A simple alkene with one C=C bond follows CnH2n.","B2.4"),
        line("(ii)","Define structural isomerism.",2,["same molecular formula","different structural formula / different connectivity"],"Structural isomers contain the same numbers of atoms but connect them differently.","B2.7"),
        line("(iii)","Draw or describe TWO structural isomers with molecular formula C₄H₁₀.",2,["CH₃CH₂CH₂CH₃","(CH₃)₃CH / 2-methylpropane"],"Butane and 2-methylpropane are the two C4H10 structural isomers.","B2.8")
      ]},
      {label:"(b)",items:[
        line("(i)","Describe a chemical test that distinguishes hexane from hexene, including the observation.",2,["add bromine water / bromine solution under suitable conditions","hexene decolourises bromine; hexane shows no rapid change"],"The C=C bond in hexene undergoes addition.","B3.3"),
        line("(ii)","State the type of reaction when bromine reacts with hexene.",1,["addition"],"Atoms add across the C=C double bond.","B3.2")
      ]},
      {label:"(c)",items:[
        line("(i)","State the conditions needed for fermentation of glucose to ethanol.",3,["yeast / suitable microorganisms or enzymes","warm temperature about 30–40 °C","little/no oxygen / anaerobic conditions"],"Fermentation requires suitable biological catalysts, warmth and anaerobic conditions.","B3.8"),
        line("(ii)","Write a word or balanced symbol equation for fermentation.",2,["C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"],"Glucose forms ethanol and carbon dioxide.","B3.8"),
        line("(iii)","Name the ester formed from ethanol and ethanoic acid and state one use of esters.",2,["ethyl ethanoate","fragrance/flavouring/solvent"],"Alcohol name gives the alkyl part and acid gives the alkanoate part.","B3.9")
      ]}
    ]
  },
  {
    id:"CHEM-P2-S1-Q5",number:5,title:"Redox and electrochemistry",kind:"extended-response",totalMarks:15,objectives:["A8.2","A8.5","A9.2","A9.8","A9.10","A9.11"],parts:[
      {label:"(a)",context:"Zinc metal is placed in copper(II) sulfate solution.",items:[
        line("(i)","Write the ionic equation for the reaction.",2,["Zn + Cu²⁺ → Zn²⁺ + Cu"],"Zinc displaces copper because zinc is more reactive.","A8.4"),
        line("(ii)","Identify the oxidising agent and the reducing agent.",2,["oxidising agent Cu²⁺","reducing agent Zn"],"Cu2+ gains electrons and is reduced; Zn loses electrons and is oxidised.","A8.5"),
        line("(iii)","State the oxidation-number change for zinc.",1,["0 to +2"],"Zinc is oxidised.","A8.3")
      ]},
      {label:"(b)",context:"Aqueous copper(II) sulfate is electrolysed using inert electrodes.",items:[
        line("(i)","State the product at the cathode and write the cathode half-equation.",2,["copper","Cu²⁺ + 2e⁻ → Cu"],"Copper(II) ions are reduced at the cathode.","A9.8"),
        line("(ii)","State what type of particles carry current through the solution.",1,["mobile ions / cations and anions"],"Electrolytic conduction is due to ions.","A9.2"),
        calc("(iii)","A current of 1.50 A flows for 1930 s. Calculate the charge passed.",2,["Q = It","Q = 1.50 × 1930 = 2895 C"],"Use amperes and seconds.","A9.10"),
        calc("(iv)","Calculate the number of moles of electrons represented by 2895 C. [F = 96 500 C mol⁻¹]",2,["n(e⁻)=Q/F","2895/96500 = 0.0300 mol"],"Faraday constant is charge per mole of electrons.","A9.10"),
        calc("(v)","Calculate the number of moles of copper deposited.",1,["Cu²⁺ + 2e⁻ → Cu","0.0300/2 = 0.0150 mol Cu"],"Two moles of electrons deposit one mole of copper.","A9.10")
      ]},
      {label:"(c)",items:[
        line("(i)","State TWO industrial applications of electrolysis.",2,["extraction of reactive metals","metal purification","electroplating","anodising"],"Any two syllabus applications earn credit.","A9.11")
      ]}
    ]
  },
  {
    id:"CHEM-P2-S1-Q6",number:6,title:"Metals, water and qualitative analysis",kind:"extended-response",totalMarks:15,objectives:["C2.3","C4.1","C5.8","C6.1","C6.2","C6.3"],parts:[
      {label:"(a)",items:[
        line("(i)","Explain why aluminium is extracted by electrolysis while iron can be extracted by chemical reduction with carbon monoxide.",3,["aluminium is very reactive / above carbon in reactivity series","its oxide is difficult to reduce chemically","iron is less reactive and iron oxide can be reduced by CO/carbon"],"Extraction method depends on metal reactivity.","C2.3"),
        line("(ii)","State TWO conditions necessary for iron to rust.",2,["oxygen","water"],"Both oxygen and water are required.","C4.1")
      ]},
      {label:"(b)",items:[
        line("(i)","State TWO processes used in treatment of water for domestic use and give the purpose of each.",4,["filtration removes suspended solids","chlorination kills harmful microorganisms","settling removes suspended material","softening removes hardness ions"],"A process and its correct purpose earn the mark pair.","C5.8")
      ]},
      {label:"(c)",context:"An unknown blue solution is tested.",items:[
        line("(i)","A light-blue precipitate forms with aqueous sodium hydroxide. With excess aqueous ammonia the precipitate dissolves to give a deep-blue solution. Identify the cation.",1,["Cu²⁺"],"The deep-blue ammonia complex confirms copper(II).","C6.1"),
        line("(ii)","Write the ionic equation for formation of the hydroxide precipitate.",2,["Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)"],"Copper(II) hydroxide is the light-blue precipitate.","C6.1"),
        line("(iii)","State the test and positive result for carbon dioxide gas.",2,["bubble through limewater","limewater turns milky/cloudy"],"Calcium carbonate precipitate causes the milky appearance.","C6.3"),
        line("(iv)","State a test for sulfate ions.",1,["acidify appropriately and add barium ions; white precipitate forms"],"A white barium sulfate precipitate indicates sulfate.","C6.2")
      ]}
    ]
  }
]),
paper("CHEM-P2-SPARK-02","SPARK Chemistry Paper 02 Practice 2",[
  {id:"CHEM-P2-S2-Q1",number:1,title:"Solubility investigation",kind:"data-analysis",totalMarks:25,objectives:["A2.4","A2.5","A10.4"],parts:[
    {label:"(a)",context:"A student determined the mass of potassium nitrate that dissolves in 100 g water at different temperatures.",table:{title:"TABLE 1: SOLUBILITY DATA",headers:["Temperature / °C","20","30","40","50","60"],rows:[["Solubility / g per 100 g water","32","46","64","85","110"]]},items:[
      graph("(i)","Plot a graph of solubility against temperature and draw a smooth curve through the points.",5,["Plot all five points accurately","axes labelled with units","suitable scale","smooth curve"],"The graph is a solubility curve.","A2.4","Temperature / °C","Solubility / g per 100 g water"),
      line("(ii)","Use the data to describe the effect of temperature on potassium nitrate solubility.",2,["solubility increases as temperature increases","increase becomes larger at higher temperatures / non-linear increase"],"KNO3 becomes much more soluble in hot water.","A2.4"),
      calc("(iii)","At 60 °C, 110 g KNO₃ dissolves in 100 g water. Estimate the mass that crystallises when a saturated solution containing 100 g water cools from 60 °C to 20 °C.",2,["110 - 32","78 g"],"The decrease in solubility gives the mass crystallised if water loss is neglected.","A2.4")
    ]},
    {label:"(b)",items:[
      line("(i)","Describe how you would obtain pure crystals from a hot saturated solution.",4,["allow solution to cool","crystals form","filter crystals","wash with small amount cold solvent","dry between filter papers / suitable drying"],"Cooling reduces solubility so crystals form; washing and drying improve purity.","A2.5"),
      line("(ii)","Explain why heating a solution to complete dryness is usually avoided when preparing crystals.",2,["may decompose solute","may produce powder/impure residue rather than good crystals"],"Controlled crystallisation is preferred.","A2.5"),
      line("(iii)","Distinguish a solution from a suspension.",2,["solution particles do not settle / pass filter","suspension particles may settle and can be filtered"],"Particle size and settling behaviour differ.","A2.2")
    ]},
    {label:"(c)",items:[
      line("(i)","Select a method for separating ethanol from water and explain the choice.",3,["fractional distillation","liquids are miscible","different but relatively close boiling points"],"Fractional distillation improves separation of miscible liquids with closer boiling points.","A2.5"),
      line("(ii)","Select a method for separating oil from water and explain the choice.",3,["separating funnel","liquids are immiscible","different densities form layers"],"A separating funnel drains the lower layer separately.","A2.5")
    ]},
    {label:"(d)",items:[
      line("(i)","State TWO experimental precautions that improve reliability when measuring solubility at a chosen temperature.",2,["maintain constant temperature","ensure solution is saturated/equilibrated","measure masses accurately","avoid evaporation before measurement"],"Any two relevant controls earn credit.","A2.4")
    ]}
  ]},
  {id:"CHEM-P2-S2-Q2",number:2,title:"Mole concept and energetics",kind:"structured",totalMarks:15,objectives:["A6.2","A6.6","A11.1","A11.3"],parts:[
    {label:"(a)",items:[
      calc("(i)","Calculate the molar mass of CaCO₃. [Ar: Ca=40, C=12, O=16]",1,["40+12+48=100 g mol⁻¹"],"Sum atomic masses.","A6.2"),
      calc("(ii)","Calculate moles in 5.00 g CaCO₃.",2,["n=5.00/100","0.0500 mol"],"Use n=m/M.","A6.2"),
      calc("(iii)","CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Calculate the volume of CO₂ at RTP from 5.00 g CaCO₃. [24.0 dm³ mol⁻¹]",3,["1:1 mole ratio","0.0500 mol CO₂","0.0500×24.0=1.20 dm³"],"One mole CaCO3 produces one mole CO2.","A6.6")
    ]},
    {label:"(b)",context:"In a neutralisation experiment, 50.0 g solution increases in temperature by 7.0 °C. Take c=4.2 J g⁻¹ K⁻¹.",items:[
      calc("(i)","Calculate the heat gained by the solution.",2,["q=mcΔT","50.0×4.2×7.0=1470 J"],"Use q=mcΔT.","A11.3"),
      line("(ii)","State whether the reaction is exothermic or endothermic and explain.",2,["exothermic","solution/surroundings warmed","reaction released heat"],"A temperature rise in surroundings indicates heat release by reaction.","A11.1"),
      line("(iii)","State TWO assumptions commonly made in this calculation.",2,["density of solution about 1 g cm⁻³","specific heat capacity same as water","negligible heat loss to surroundings/container"],"Any two valid assumptions.","A11.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Explain the effect of a catalyst on an energy-profile diagram.",3,["provides alternative pathway","lower activation energy peak","does not change reactant/product energies or ΔH"],"A catalyst changes activation energy, not overall enthalpy change.","A11.2")
    ]}
  ]},
  {id:"CHEM-P2-S2-Q3",number:3,title:"Periodic trends and metals",kind:"structured",totalMarks:15,objectives:["A4.2","C2.1","C3.1","C4.1"],parts:[
    {label:"(a)",items:[
      line("(i)","State the trend in reactivity down Group II.",1,["increases"],"Outer electrons are removed more easily down the group.","A4.2"),
      line("(ii)","Explain this trend using atomic structure.",3,["more electron shells","greater shielding / outer electrons farther from nucleus","weaker attraction to outer electrons / easier ionisation"],"Down Group II, increased shielding makes electron loss easier.","A4.2")
    ]},
    {label:"(b)",items:[
      line("(i)","Metal P displaces Q from QSO₄, but Q displaces R from RSO₄. Arrange P, Q and R in decreasing reactivity.",2,["P > Q > R"],"A metal that displaces another is more reactive.","C2.2"),
      line("(ii)","Explain why alloys are often harder than pure metals.",2,["different-sized atoms distort regular layers","layers cannot slide over one another as easily"],"Alloying disrupts the regular metallic lattice.","C3.1")
    ]},
    {label:"(c)",items:[
      line("(i)","Describe an experiment to show that both air and water are necessary for rusting.",5,["three comparable iron nails","ordinary water exposed to air","boiled water covered with oil to exclude oxygen","dry air with drying agent to exclude water","same time/temperature","rust only when both air and water present"],"A controlled comparison isolates oxygen and water.","C4.1"),
      line("(ii)","State ONE method of protecting iron from corrosion and explain how it works.",2,["painting/oiling prevents contact with air/water","galvanising supplies barrier and sacrificial zinc","sacrificial protection uses more reactive metal"],"Method must be linked to protection mechanism.","C4.1")
    ]}
  ]},
  {id:"CHEM-P2-S2-Q4",number:4,title:"Organic reactions and polymers",kind:"extended-response",totalMarks:15,objectives:["B3.1","B3.7","B3.10","B3.11","B4.2"],parts:[
    {label:"(a)",items:[
      line("(i)","Write a balanced equation for complete combustion of ethanol.",2,["C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O"],"Balance C, H then O.","B3.7"),
      line("(ii)","State the product formed when ethanol is oxidised fully under suitable conditions.",1,["ethanoic acid"],"Primary alcohol ethanol oxidises to ethanoic acid.","B3.7")
    ]},
    {label:"(b)",items:[
      line("(i)","Explain saponification.",3,["alkaline hydrolysis of fats/oils/esters","forms salts of fatty acids / soap","also forms alcohol/glycerol"],"Saponification is hydrolysis in alkali producing soap.","B3.10"),
      line("(ii)","Explain why soap is less effective in hard water.",2,["Ca²⁺/Mg²⁺ ions react with soap","insoluble scum forms / less soap available for lather"],"Hard-water ions form insoluble salts with soap.","B3.11")
    ]},
    {label:"(c)",items:[
      line("(i)","Distinguish addition from condensation polymerisation.",4,["addition uses unsaturated monomers","no small molecule eliminated","condensation uses monomers with suitable functional groups","small molecule such as water eliminated"],"The defining difference is how monomers join and whether a small molecule is lost.","B4.2"),
      line("(ii)","State one use of PVC and one use of a polyamide.",2,["PVC pipes/cable insulation","polyamide clothing/rope/engineering fibre"],"Named examples and suitable uses earn credit.","B4.3"),
      line("(iii)","State ONE environmental problem associated with persistent plastic waste.",1,["accumulates in landfill/ocean","harms wildlife","microplastic pollution","slow biodegradation"],"Any valid environmental consequence.","B4.3")
    ]}
  ]},
  {id:"CHEM-P2-S2-Q5",number:5,title:"Electrolysis and metal extraction",kind:"extended-response",totalMarks:15,objectives:["A9.8","A9.11","C2.3"],parts:[
    {label:"(a)",context:"Concentrated aqueous sodium chloride is electrolysed using inert electrodes.",items:[
      line("(i)","Name the gas produced at the anode.",1,["chlorine"],"Chloride ions are discharged at the anode in concentrated brine.","A9.8"),
      line("(ii)","Name the gas produced at the cathode.",1,["hydrogen"],"Water/H+ is reduced rather than Na+ in aqueous solution.","A9.8"),
      line("(iii)","Write a half-equation for the anode reaction.",2,["2Cl⁻ → Cl₂ + 2e⁻"],"Oxidation occurs at the anode.","A9.8")
    ]},
    {label:"(b)",items:[
      line("(i)","Describe electroplating and state ONE reason for electroplating an object.",4,["object to be plated is cathode","electrolyte contains ions of coating metal","coating metal may be anode or ions replenished suitably","metal ions reduced onto object","appearance/corrosion protection/wear resistance"],"The setup and purpose should both be clear.","A9.11"),
      line("(ii)","Explain why aluminium extraction requires electrolysis.",2,["aluminium is high in reactivity series","Al₂O₃ cannot be reduced economically by carbon under ordinary extraction conditions"],"Very reactive metals require electrical reduction.","C2.3")
    ]},
    {label:"(c)",items:[
      line("(i)","State the role of carbon monoxide in the blast furnace.",2,["reducing agent","reduces iron oxide to iron / CO is oxidised to CO₂"],"CO removes oxygen from iron oxide.","C2.3"),
      line("(ii)","State the role of limestone in the blast furnace.",3,["decomposes to CaO","CaO reacts with silica/acidic impurity","forms slag such as calcium silicate"],"Limestone helps remove acidic impurities as slag.","C2.3")
    ]}
  ]},
  {id:"CHEM-P2-S2-Q6",number:6,title:"Qualitative analysis and gases",kind:"extended-response",totalMarks:15,objectives:["C5.2","C5.3","C6.1","C6.2","C6.3"],parts:[
    {label:"(a)",items:[
      line("(i)","Describe the laboratory preparation and collection of hydrogen gas from a suitable metal and dilute acid.",4,["react zinc/magnesium with dilute acid","use flask with stopper and delivery tube","collect gas by displacement of water if appropriate","discard initial gas / avoid flames / test with lighted splint"],"Apparatus and collection should suit hydrogen.","C5.2"),
      line("(ii)","State the positive test for hydrogen.",1,["squeaky pop with a lighted splint"],"Hydrogen burns rapidly with the characteristic pop.","C6.3")
    ]},
    {label:"(b)",items:[
      line("(i)","An unknown solution gives a green precipitate with aqueous sodium hydroxide. Identify the likely cation.",1,["Fe²⁺"],"Iron(II) hydroxide is green.","C6.1"),
      line("(ii)","An acidified unknown solution gives a white precipitate with barium ions. Identify the likely anion.",1,["SO₄²⁻ / sulfate"],"Barium sulfate is a white insoluble precipitate.","C6.2"),
      line("(iii)","State how chloride, bromide and iodide ions can be distinguished using silver ions and aqueous ammonia.",5,["chloride gives white AgCl","AgCl dissolves in dilute ammonia","bromide gives cream AgBr","AgBr dissolves only in concentrated ammonia / less soluble","iodide gives yellow AgI","AgI insoluble in ammonia"],"Colour and ammonia solubility distinguish the silver halides.","C6.2")
    ]},
    {label:"(c)",items:[
      line("(i)","Explain why nitrogen is used to provide an inert atmosphere in some food packages.",2,["nitrogen is relatively unreactive","reduces oxidation/spoilage by displacing oxygen"],"The use follows from low reactivity.","C5.3"),
      line("(ii)","State ONE environmental effect of sulfur dioxide.",1,["acid rain/acid deposition","respiratory irritation"],"Either accepted environmental or health effect.","C5.5")
    ]}
  ]}
]),
paper("CHEM-P2-SPARK-03","SPARK Chemistry Paper 02 Practice 3",[
  {id:"CHEM-P2-S3-Q1",number:1,title:"Titration and data handling",kind:"data-analysis",totalMarks:25,objectives:["A7.10","A7.11","A10.4"],parts:[
    {label:"(a)",context:"A student titrated 25.0 cm³ sodium carbonate solution with 0.100 mol dm⁻³ hydrochloric acid. The burette readings are shown.",table:{title:"TABLE 1: TITRATION RESULTS",headers:["Titration","Initial / cm³","Final / cm³","Titre / cm³"],rows:[["Rough","0.00","24.80",""],["1","0.20","24.65",""],["2","1.10","25.50",""],["3","0.50","24.90",""]]},items:[
      table("(i)","Calculate and record each titre.",4,["Titration","Titre / cm³"],[["Rough",""],["1",""],["2",""],["3",""]],["24.80","24.45","24.40","24.40"],"Titre = final reading − initial reading.","A7.11"),
      calc("(ii)","Select the concordant titres and calculate the mean titre.",3,["24.45, 24.40 and 24.40 are concordant","mean = 24.42 cm³ approximately"],"Use close accurate titres, not the rough value.","A7.11")
    ]},
    {label:"(b)",items:[
      line("(i)","Write the balanced equation for Na₂CO₃ reacting with HCl.",2,["Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂"],"Carbonate plus acid forms salt, water and carbon dioxide.","A7.4"),
      calc("(ii)","Using a mean titre of 24.42 cm³, calculate moles HCl used.",2,["n=0.100×0.02442","0.002442 mol"],"Convert volume to dm³.","A7.11"),
      calc("(iii)","Calculate moles Na₂CO₃ in 25.0 cm³.",2,["2 mol HCl : 1 mol Na₂CO₃","0.002442/2 = 0.001221 mol"],"Use equation ratio.","A7.11"),
      calc("(iv)","Calculate concentration of Na₂CO₃ in mol dm⁻³.",2,["0.001221/0.0250","0.04884 mol dm⁻³"],"Divide moles by sample volume in dm³.","A7.11")
    ]},
    {label:"(c)",items:[
      line("(i)","State the purpose of rinsing a burette with the solution that will be placed in it.",2,["removes residual water/other solution","prevents dilution/contamination of titrant"],"Conditioning the burette preserves concentration.","A7.11"),
      line("(ii)","Explain why the funnel should be removed from the burette before titration.",2,["drops could enter burette after initial reading","would change volume/concentration reading and make titre inaccurate"],"No extra titrant should enter after initial reading.","A7.11"),
      line("(iii)","State TWO observations at a suitable acid-carbonate end point using an indicator.",2,["indicator colour changes at endpoint","no persistent extra acid/base colour beyond endpoint"],"Specific colour depends on the indicator named.","A7.10")
    ]},
    {label:"(d)",items:[
      line("(i)","State TWO ways of improving the reliability of a titration result.",2,["repeat to obtain concordant titres","read burette at eye level","use clean conditioned apparatus","add titrant dropwise near end point"],"Any two sound laboratory practices.","A7.11"),
      line("(ii)","Explain why a volumetric pipette is preferred to a measuring cylinder for the 25.0 cm³ sample.",2,["pipette has lower uncertainty / greater precision","delivers a fixed calibrated volume"],"Volumetric glassware gives more precise volume measurement.","A7.11")
    ]}
  ]},
  {id:"CHEM-P2-S3-Q2",number:2,title:"States, bonding and conductivity",kind:"structured",totalMarks:15,objectives:["A1.2","A1.3","A5.4","A5.6"],parts:[
    {label:"(a)",items:[
      line("(i)","Describe the arrangement and movement of particles in a liquid.",2,["particles close together","move/slide past one another randomly"],"Liquid particles remain close but are not fixed.","A1.2"),
      line("(ii)","Explain why temperature remains constant while a pure liquid boils.",2,["energy supplied overcomes intermolecular attractions","energy not increasing average kinetic energy during phase change"],"Latent heat changes arrangement rather than temperature.","A1.3")
    ]},
    {label:"(b)",items:[
      line("(i)","Explain metallic bonding.",3,["positive metal ions/cations in lattice","delocalised/mobile electrons","electrostatic attraction between ions and electrons"],"Metallic bonding is the attraction between cations and delocalised electrons.","A5.4"),
      line("(ii)","Explain why metals conduct electricity in the solid state.",2,["delocalised electrons are mobile","carry charge through lattice"],"Electron mobility provides conduction.","A5.4")
    ]},
    {label:"(c)",items:[
      line("(i)","Compare the melting points of sodium chloride and a simple molecular solid and explain the difference.",4,["NaCl high melting point","strong electrostatic attractions throughout giant ionic lattice","simple molecular solid lower melting point","only weaker intermolecular forces are overcome"],"The type and extent of attractive forces determine melting point.","A5.6"),
      line("(ii)","State why sodium chloride solution conducts electricity.",2,["ions are free/mobile in solution","ions carry charge"],"Dissolving releases mobile ions.","A5.6")
    ]}
  ]},
  {id:"CHEM-P2-S3-Q3",number:3,title:"Redox and halogens",kind:"structured",totalMarks:15,objectives:["A4.3","A8.2","A8.5","A8.6"],parts:[
    {label:"(a)",items:[
      line("(i)","Chlorine is added to potassium iodide solution. State the expected observation.",2,["iodine formed","brown solution / appropriate iodine colour"],"Chlorine oxidises iodide to iodine.","A4.3"),
      line("(ii)","Write the ionic equation.",2,["Cl₂ + 2I⁻ → 2Cl⁻ + I₂"],"Chlorine gains electrons and iodide loses electrons.","A8.4"),
      line("(iii)","Identify the oxidising agent.",1,["Cl₂ / chlorine"],"Chlorine is reduced, so it is the oxidising agent.","A8.5")
    ]},
    {label:"(b)",items:[
      line("(i)","Define oxidation in terms of oxidation number.",1,["increase in oxidation number"],"Oxidation raises oxidation state.","A8.2"),
      line("(ii)","Determine the oxidation number of sulfur in H₂SO₄.",2,["+6","2(+1)+S+4(-2)=0"],"Solve the sum of oxidation numbers.","A8.3"),
      line("(iii)","Determine the oxidation number of manganese in MnO₄⁻.",2,["+7","Mn+4(-2)=-1"],"Solve the ion charge balance.","A8.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Describe ONE chemical test for a reducing agent using an oxidising reagent and state a positive result.",3,["use acidified KMnO₄ or dichromate under suitable conditions","reducing agent causes characteristic colour change","KMnO₄ purple decolourises / dichromate orange to green"],"A reducing agent reduces the oxidising reagent.","A8.6"),
      line("(ii)","Explain why iodine is a weaker oxidising agent than chlorine.",2,["iodine lower in Group VII","greater shielding/larger atoms","less attraction for incoming electron"],"Oxidising power decreases down the group.","A4.3")
    ]}
  ]},
  {id:"CHEM-P2-S3-Q4",number:4,title:"Petroleum and organic chemistry",kind:"extended-response",totalMarks:15,objectives:["B1.2","B1.3","B2.6","B3.1","B3.4"],parts:[
    {label:"(a)",items:[
      line("(i)","Explain how fractional distillation separates crude petroleum.",4,["crude heated/vaporised","column has temperature gradient","fractions have different boiling ranges","vapours condense at different heights"],"Different boiling ranges allow physical separation.","B1.2"),
      line("(ii)","State ONE use of kerosene and ONE use of bitumen.",2,["kerosene aviation/domestic fuel","bitumen road surfacing/roofing"],"Uses must match the fraction.","B1.2")
    ]},
    {label:"(b)",items:[
      line("(i)","Explain cracking and state why it is useful.",3,["large hydrocarbons broken into smaller molecules","high temperature and/or catalyst","makes smaller fuels and alkenes in demand"],"Cracking changes molecular size and product distribution.","B1.3"),
      line("(ii)","State TWO products that may form when a long-chain alkane is cracked.",2,["shorter alkane","alkene"],"Cracking commonly produces a mixture including alkanes and alkenes.","B1.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Give the IUPAC name of CH₃CH₂CH=CH₂.",1,["but-1-ene / 1-butene"],"Four-carbon chain with double bond starting at carbon 1.","B2.6"),
      line("(ii)","State TWO reasons alkanes are useful as fuels.",2,["combust exothermically/release energy","readily available","some are easy to store/transport"],"Fuel usefulness follows from energy release and practical properties.","B3.4"),
      line("(iii)","State the main reaction type of alkenes.",1,["addition"],"The C=C bond opens during addition.","B3.2")
    ]}
  ]},
  {id:"CHEM-P2-S3-Q5",number:5,title:"Water and green chemistry",kind:"extended-response",totalMarks:15,objectives:["C5.6","C5.7","C5.8","C5.9","C5.10"],parts:[
    {label:"(a)",items:[
      line("(i)","Explain TWO ways in which water's properties are important in living systems.",4,["good solvent allows transport/reactions","high specific heat capacity buffers temperature","density behaviour supports aquatic life","appropriate link between property and function"],"Each point needs a property and its biological consequence.","C5.6"),
      line("(ii)","Distinguish temporary from permanent hardness.",2,["temporary hardness can be removed by boiling / often hydrogencarbonates","permanent hardness not removed by boiling / often sulfates"],"The key distinction is response to boiling and responsible ions.","C5.7")
    ]},
    {label:"(b)",items:[
      line("(i)","Describe THREE steps used in treatment of water for domestic supply.",3,["filtration/screening","sedimentation/coagulation where appropriate","chlorination/disinfection","softening when needed"],"Any three valid treatment stages.","C5.8"),
      line("(ii)","State ONE reason chlorine is used in water treatment.",1,["kills/inactivates harmful microorganisms"],"Chlorine is a disinfectant.","C5.8")
    ]},
    {label:"(c)",items:[
      line("(i)","Define Green Chemistry.",2,["design/manufacture/use of chemical products/processes","reduces or eliminates hazardous substances"],"Green Chemistry aims to prevent hazards at source.","C5.9"),
      line("(ii)","Outline THREE Green Chemistry ideas that could reduce environmental impact in a factory.",3,["prevent waste","safer chemicals/solvents","energy efficiency","renewable feedstocks","catalysis","design for degradation/recycling"],"Any three reasonable syllabus-level principles.","C5.10")
    ]}
  ]},
  {id:"CHEM-P2-S3-Q6",number:6,title:"Qualitative analysis challenge",kind:"extended-response",totalMarks:15,objectives:["C6.1","C6.2","C6.3"],parts:[
    {label:"(a)",context:"Three colourless solutions contain Zn²⁺, NH₄⁺ and Ca²⁺ separately.",items:[
      line("(i)","Describe a sequence of tests that could identify NH₄⁺.",3,["add aqueous NaOH","warm gently","ammonia evolved turns damp red litmus blue"],"Ammonium ion releases ammonia with alkali on warming.","C6.1"),
      line("(ii)","Describe how aqueous NaOH and aqueous ammonia can help distinguish Zn²⁺ from Ca²⁺.",4,["both may form white precipitates with NaOH","Zn(OH)₂ dissolves in excess NaOH","Zn precipitate dissolves in excess ammonia","calcium behaviour differs / does not show same amphoteric dissolution pattern"],"Use solubility in excess reagents as the discriminating evidence.","C6.1")
    ]},
    {label:"(b)",items:[
      line("(i)","State the test and positive result for nitrate ions.",3,["use accepted nitrate test such as adding NaOH and aluminium then warming under school method","ammonia gas evolved","confirm with damp red litmus turning blue"],"The full reagent sequence and ammonia confirmation are required.","C6.2"),
      line("(ii)","State the test for water using anhydrous copper(II) sulfate.",2,["white anhydrous CuSO₄","turns blue in presence of water"],"Hydration produces blue copper(II) sulfate.","C6.3"),
      line("(iii)","State the test and positive result for oxygen.",1,["glowing splint relights"],"Oxygen supports combustion.","C6.3"),
      line("(iv)","State the test and positive result for chlorine.",2,["damp litmus paper","bleached white after acidic colour change"],"Chlorine is acidic in moist conditions and has bleaching action.","C6.3")
    ]}
  ]}
]),
paper("CHEM-P2-SPARK-04","SPARK Chemistry Paper 02 Practice 4",[
  {id:"CHEM-P2-S4-Q1",number:1,title:"Electrolysis investigation",kind:"data-analysis",totalMarks:25,objectives:["A9.8","A9.9","A9.10","A10.4"],parts:[
    {label:"(a)",context:"A current was passed through an electrolyte for different times. The mass of copper deposited was measured.",table:{title:"TABLE 1: COPPER DEPOSITION",headers:["Time / s","300","600","900","1200","1500"],rows:[["Mass Cu / g","0.10","0.20","0.30","0.40","0.50"]]},items:[
      graph("(i)","Plot mass of copper deposited against time and draw the best straight line.",5,["all five points plotted","axes labelled with units","suitable scale","best-fit straight line"],"Mass deposited is directly proportional to charge when current is constant.","A9.10","Time / s","Mass Cu / g"),
      line("(ii)","State the relationship shown by the graph.",2,["mass deposited increases with time","direct proportionality / straight line through origin approximately"],"At constant current, Q=It, so charge and deposited mass both increase with time.","A9.10"),
      calc("(iii)","Use the data to calculate the deposition rate in g s⁻¹.",2,["0.50/1500","3.33×10⁻⁴ g s⁻¹"],"Use gradient or mass/time.","A10.1")
    ]},
    {label:"(b)",items:[
      calc("(i)","If the current is 1.00 A for 1500 s, calculate the charge passed.",2,["Q=It","1500 C"],"Use current in amperes and time in seconds.","A9.10"),
      calc("(ii)","Calculate moles of electrons in 1500 C. [F=96 500 C mol⁻¹]",2,["1500/96500","0.0155 mol e⁻"],"Faraday constant relates charge to moles electrons.","A9.9"),
      line("(iii)","Write the cathode half-equation for copper deposition.",2,["Cu²⁺ + 2e⁻ → Cu"],"Copper ions gain electrons at the cathode.","A9.8")
    ]},
    {label:"(c)",items:[
      line("(i)","State THREE factors that determine products during electrolysis of an aqueous electrolyte.",3,["ions present / electrochemical series","ion concentration","nature of electrode / inert or active"],"All three are syllabus factors.","A9.8"),
      line("(ii)","Explain why graphite is often used as an inert electrode.",2,["conducts electricity","relatively unreactive under many school electrolysis conditions"],"An inert electrode conducts without being intended as a reactant.","A9.8")
    ]},
    {label:"(d)",items:[
      line("(i)","State TWO sources of experimental error in measuring copper deposition.",2,["electrode not fully dry before weighing","copper lost during washing/drying","current fluctuates","timing error"],"Any two reasonable sources.","A9.10"),
      line("(ii)","Suggest ONE improvement for each error stated.",3,["dry to constant mass","wash/dry carefully","use regulated power supply/ammeter","electronic timing"],"Improvements should directly address the stated errors.","A9.10")
    ]}
  ]},
  {id:"CHEM-P2-S4-Q2",number:2,title:"Atom, ions and formulae",kind:"structured",totalMarks:15,objectives:["A3.5","A5.2","A5.3","A6.5"],parts:[
    {label:"(a)",items:[
      line("(i)","For ²⁷₁₃Al³⁺, state the numbers of protons, neutrons and electrons.",3,["13 protons","14 neutrons","10 electrons"],"A 3+ ion has lost three electrons.","A3.5"),
      line("(ii)","Write the electron arrangement of Al³⁺.",1,["2,8"],"Al has lost its three outer electrons.","A3.1")
    ]},
    {label:"(b)",items:[
      line("(i)","Predict whether aluminium chloride is more likely to be represented at CSEC level using ionic or covalent bonding ideas from the atoms involved, and justify using electron structure.",3,["Al tends to lose three electrons / form Al³⁺","Cl tends to gain one electron / form Cl⁻","charge balance gives AlCl₃; accept syllabus-level ionic prediction"],"Use outer-electron arrangements to justify the prediction.","A5.2"),
      line("(ii)","Write the formula of aluminium sulfate.",2,["Al³⁺ and SO₄²⁻","Al₂(SO₄)₃"],"Least common charge is 6.","A5.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Balance: Al + O₂ → Al₂O₃.",2,["4Al + 3O₂ → 2Al₂O₃"],"Balance oxygen then aluminium.","A6.5"),
      line("(ii)","Write the ionic equation for neutralisation of a strong acid by a strong alkali.",2,["H⁺(aq) + OH⁻(aq) → H₂O(l)"],"Spectator ions are omitted.","A6.5"),
      line("(iii)","State the law that is obeyed when a chemical equation is balanced.",2,["law of conservation of matter/mass","atoms are not created or destroyed in ordinary chemical reaction"],"Balanced equations reflect conservation.","A6.4")
    ]}
  ]},
  {id:"CHEM-P2-S4-Q3",number:3,title:"Acids, bases and salts in context",kind:"structured",totalMarks:15,objectives:["A7.1","A7.4","A7.6","A7.8","A7.9"],parts:[
    {label:"(a)",items:[
      line("(i)","Define an alkali.",1,["soluble base that produces OH⁻ ions in water"],"An alkali is a soluble base.","A7.1"),
      line("(ii)","Explain the term amphoteric oxide and give ONE example.",2,["oxide reacts with both acids and bases","Al₂O₃ or ZnO"],"Amphoteric substances show both acidic and basic behaviour.","A7.1")
    ]},
    {label:"(b)",items:[
      line("(i)","Write an equation for calcium carbonate reacting with hydrochloric acid.",2,["CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂"],"Carbonate plus acid gives salt, water and carbon dioxide.","A7.4"),
      line("(ii)","State the test for the gas produced.",1,["bubble through limewater; turns milky"],"The gas is carbon dioxide.","C6.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Describe the test for ammonium ions using a base.",3,["add aqueous NaOH","warm","ammonia gas produced turns damp red litmus blue"],"NH4+ + OH- gives NH3 and water.","A7.6"),
      line("(ii)","Distinguish an acid salt from a normal salt.",2,["acid salt retains replaceable hydrogen from polyprotic acid","normal salt has all replaceable acid hydrogen replaced"],"Acid salts result from partial neutralisation of a polybasic acid.","A7.9")
    ]},
    {label:"(d)",items:[
      line("(i)","State TWO useful applications of salts and ONE possible danger associated with excessive nitrate/nitrite exposure.",4,["food preservation such as NaCl/benzoate","medicine such as MgSO₄/CaSO₄ uses","cement manufacture with calcium compounds","excess nitrate/nitrite health concerns"],"Use syllabus examples and state a specific danger.","A7.8")
    ]}
  ]},
  {id:"CHEM-P2-S4-Q4",number:4,title:"Organic identification",kind:"extended-response",totalMarks:15,objectives:["B2.4","B3.3","B3.5","B3.6","B3.9"],parts:[
    {label:"(a)",items:[
      line("(i)","Identify the functional group in CH₃CH₂OH.",1,["hydroxyl / -OH / alcohol"],"The -OH group identifies an alcohol.","B3.5"),
      line("(ii)","Identify the functional group in CH₃COOH.",1,["carboxyl / -COOH / carboxylic acid"],"The -COOH group identifies a carboxylic acid.","B3.5"),
      line("(iii)","State the molecular formula of propene.",1,["C₃H₆"],"Alkenes follow CnH2n.","B2.4")
    ]},
    {label:"(b)",items:[
      line("(i)","Describe a test for unsaturation and the positive result.",2,["add bromine water","orange/brown bromine is decolourised"],"Addition across C=C removes bromine colour.","B3.3"),
      line("(ii)","Explain why an alkene is generally more reactive than the corresponding alkane.",2,["contains C=C double bond","π/bond region can open and undergo addition more readily"],"The double bond provides a reactive site.","B3.2")
    ]},
    {label:"(c)",items:[
      line("(i)","Write the products of ethanoic acid reacting with ethanol.",2,["ethyl ethanoate","water"],"This is esterification/condensation.","B3.9"),
      line("(ii)","State suitable conditions for esterification.",2,["warm/heat","concentrated sulfuric acid catalyst or suitable acid catalyst"],"Esterification is slow and acid catalysis is commonly used.","B3.9"),
      line("(iii)","State TWO uses of esters.",2,["fragrances/perfumes","flavourings","solvents"],"Any two suitable uses.","B3.9"),
      line("(iv)","Explain why ethanol mixes with water more readily than a comparable hydrocarbon.",2,["polar -OH group","hydrogen bonding/strong attraction with water"],"Functional group affects intermolecular forces and solubility.","B3.6")
    ]}
  ]},
  {id:"CHEM-P2-S4-Q5",number:5,title:"Metals and the environment",kind:"extended-response",totalMarks:15,objectives:["C3.2","C4.2","C4.3","C5.5"],parts:[
    {label:"(a)",items:[
      line("(i)","Give TWO properties of aluminium alloys that make them useful for transport structures.",2,["low density","good strength","corrosion resistance"],"Any two properly linked properties.","C3.2"),
      line("(ii)","State ONE reason lead has been used in batteries and ONE reason its use requires care.",2,["suitable electrochemical properties/dense stable material","lead is toxic"],"Useful properties must be balanced against toxicity.","C3.2")
    ]},
    {label:"(b)",items:[
      line("(i)","Explain the biological importance of magnesium and iron compounds.",4,["Mg in chlorophyll","needed for photosynthesis","Fe in haemoglobin","needed for oxygen transport"],"Each metal should be linked to its biological compound and function.","C4.2"),
      line("(ii)","Describe TWO harmful effects or pathways associated with heavy-metal pollution.",4,["toxic effects on nervous system/organs","bioaccumulation/biomagnification","contamination from batteries/industrial waste/mining","persistent contamination"],"Credit specific source/pathway and effect statements.","C4.3")
    ]},
    {label:"(c)",items:[
      line("(i)","Explain how sulfur dioxide emissions can affect the environment.",3,["forms acidic substances in atmosphere","acid deposition lowers pH of soil/water","damages plants/materials/aquatic life"],"Link atmospheric chemistry to environmental impact.","C5.5")
    ]}
  ]},
  {id:"CHEM-P2-S4-Q6",number:6,title:"Green chemistry and practical planning",kind:"extended-response",totalMarks:15,objectives:["C5.9","C5.10","XS-PD"],parts:[
    {label:"(a)",context:"A school wants to compare two methods for producing the same salt and decide which method is greener.",items:[
      line("(i)","State a suitable aim for the investigation.",1,["compare two methods of producing the same salt using measurable green-chemistry criteria"],"The aim should name the comparison and purpose.","XS"),
      line("(ii)","State TWO variables or measurements that could be used to compare the methods.",2,["mass/yield of product","mass of waste","energy/heating time","hazard of reagents","water/solvent use"],"Choose measurable or defensible green-chemistry criteria.","C5.10"),
      line("(iii)","State TWO variables that should be controlled for a fair comparison.",2,["same target amount/moles of salt","same purity criterion","same equipment scale","same starting stoichiometric basis"],"Controls make the method comparison meaningful.","XS")
    ]},
    {label:"(b)",items:[
      line("(i)","Outline a safe step-by-step plan for comparing the two methods without naming hazardous chemicals.",5,["prepare equal stoichiometric starting quantities","carry out each method with same scale","record energy/time/materials and waste","isolate/dry product consistently","measure yield/purity indicator","repeat where practical"],"A logical sequence with measurement and comparison earns credit.","XS"),
      line("(ii)","State TWO precautions that apply to school chemistry investigations.",2,["wear eye protection","use small quantities","avoid direct inhalation/contact","follow reagent-specific safety instructions"],"Precautions should be relevant and practical.","XS")
    ]},
    {label:"(c)",items:[
      line("(i)","Using Green Chemistry ideas, explain why preventing waste is usually better than treating waste after it forms.",3,["uses fewer resources","reduces exposure and disposal hazards","avoids energy/materials needed for treatment","prevents pollution at source"],"Prevention removes the problem earlier in the process.","C5.10")
    ]}
  ]}
])
]);

export const CHEMISTRY_PAPER2_PRACTICE_COUNT = CHEMISTRY_PAPER2_PRACTICE_PAPERS.length;
export function chemistryPracticePaper(id){return CHEMISTRY_PAPER2_PRACTICE_PAPERS.find(item=>item.id===id)||null;}
export default CHEMISTRY_PAPER2_PRACTICE_PAPERS;
