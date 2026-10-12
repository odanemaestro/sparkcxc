// CSEC Chemistry Paper 02 bank and current-format practice generators.
// Current format follows CXC 21/G/SYLL 13: 150 minutes, 100 marks,
// one data-analysis question, two structured questions and three extended-response questions.

export const CHEMISTRY_PAPER2_FORMAT = Object.freeze({
  durationMinutes:150,
  totalMarks:100,
  questions:6,
  composition:Object.freeze({
    dataAnalysis:1,
    structured:2,
    extendedResponse:3,
  }),
  profileMarks:Object.freeze({ KC:35, UK:55, XS:10 }),
});

const item=(label,prompt,marks,answer,explanation,options={})=>({
  label,prompt,marks,
  objective:options.objective||null,
  profile:options.profile||{},
  response:options.response||{type:"lines",lines:Math.max(2,Math.min(10,marks+1))},
  markScheme:{
    points:Array.isArray(answer)?answer:[answer],
    guidance:options.guidance||`${marks} mark${marks===1?"":"s"} available. Award credit for chemically equivalent wording and correct working.`,
    alternatives:options.alternatives||null,
  },
  explanation,
});

const part=(label,context,items,options={})=>({
  label,context,items,
  svg:options.svg||null,
  figure:options.figure||null,
  table:options.table||null,
});

const question=(id,kind,title,totalMarks,parts,objectives=[])=>({
  id,kind,title,totalMarks,parts,objectives,
});

const svgFrame=inner=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320" width="560" height="320" role="img" font-family="'Times New Roman',Times,serif" font-size="14"><rect width="560" height="320" fill="#fff"/><g fill="none" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;

export const CHEMISTRY_SVGS = Object.freeze({
  titration:svgFrame(`
    <path d="M155 32h48v155h-48z"/><path d="M179 187v30"/><path d="M168 217h22l-5 12h-12z"/>
    <path d="M143 38h72"/><path d="M156 58h46"/><path d="M156 78h46"/><path d="M156 98h46"/><path d="M156 118h46"/><path d="M156 138h46"/><path d="M156 158h46"/>
    <path d="M179 229v18"/><path d="M130 282h100"/><path d="M145 282l15-55h40l15 55z"/>
    <path d="M162 250h36" stroke-dasharray="3 3"/>
    <text x="228" y="55" fill="#000" stroke="none">burette containing acid</text>
    <line x1="205" y1="52" x2="305" y2="52"/>
    <text x="228" y="246" fill="#000" stroke="none">conical flask</text>
    <line x1="208" y1="242" x2="310" y2="242"/>
    <text x="228" y="267" fill="#000" stroke="none">alkali + indicator</text>
  `),
  electrolysis:svgFrame(`
    <rect x="110" y="115" width="330" height="150" rx="8"/>
    <path d="M112 164h326" stroke-dasharray="4 3"/>
    <rect x="165" y="70" width="22" height="145"/><rect x="363" y="70" width="22" height="145"/>
    <path d="M176 70V36H274"/><path d="M374 70V36H306"/>
    <rect x="274" y="24" width="32" height="24"/><text x="290" y="42" text-anchor="middle" fill="#000" stroke="none">dc</text>
    <text x="150" y="286" fill="#000" stroke="none">electrolyte</text>
    <line x1="190" y1="278" x2="250" y2="225"/>
    <text x="115" y="62" fill="#000" stroke="none">copper electrode</text>
    <text x="360" y="62" fill="#000" stroke="none">copper electrode</text>
    <text x="167" y="235" fill="#000" stroke="none">−</text><text x="369" y="235" fill="#000" stroke="none">+</text>
  `),
  energyProfile:svgFrame(`
    <line x1="70" y1="260" x2="510" y2="260"/><line x1="70" y1="260" x2="70" y2="40"/>
    <path d="M95 205 C170 205 180 70 285 70 C380 70 390 145 485 145"/>
    <path d="M95 205 C180 205 215 125 285 125 C360 125 395 145 485 145" stroke-dasharray="6 4"/>
    <text x="300" y="304" fill="#000" stroke="none" text-anchor="middle">Reaction progress</text>
    <text x="20" y="155" fill="#000" stroke="none" transform="rotate(-90 20 155)" text-anchor="middle">Energy</text>
    <text x="104" y="195" fill="#000" stroke="none">reactants</text>
    <text x="430" y="136" fill="#000" stroke="none">products</text>
  `),
  periodic:svgFrame(`
    <rect x="70" y="54" width="420" height="190"/>
    ${Array.from({length:7},(_,i)=>`<line x1="${70+i*60}" y1="54" x2="${70+i*60}" y2="244"/>`).join("")}
    ${Array.from({length:5},(_,i)=>`<line x1="70" y1="${54+i*47.5}" x2="490" y2="${54+i*47.5}"/>`).join("")}
    <text x="100" y="88" fill="#000" stroke="none" text-anchor="middle">X</text>
    <text x="400" y="136" fill="#000" stroke="none" text-anchor="middle">Y</text>
    <text x="460" y="183" fill="#000" stroke="none" text-anchor="middle">Z</text>
    <text x="280" y="286" fill="#000" stroke="none" text-anchor="middle">Simplified positions in the periodic table</text>
  `),
  gasPrep:svgFrame(`
    <rect x="70" y="170" width="115" height="70" rx="8"/>
    <path d="M85 170v-48h85v48"/><path d="M128 122V76"/>
    <path d="M128 76h164v86"/>
    <rect x="275" y="162" width="70" height="95"/>
    <path d="M290 162v-50h40v50"/>
    <path d="M345 257h130"/><path d="M475 257V130"/>
    <rect x="385" y="125" width="55" height="115"/>
    <text x="74" y="270" fill="#000" stroke="none">reaction flask</text>
    <text x="285" y="284" fill="#000" stroke="none">drying tube</text>
    <text x="385" y="284" fill="#000" stroke="none">gas jar</text>
  `),
  organic:svgFrame(`
    <text x="70" y="88" fill="#000" stroke="none">A</text>
    <text x="115" y="88" fill="#000" stroke="none">CH₃—CH₂—CH=CH₂</text>
    <text x="70" y="155" fill="#000" stroke="none">B</text>
    <text x="115" y="155" fill="#000" stroke="none">CH₃—CH₂—CH₂—OH</text>
    <text x="70" y="222" fill="#000" stroke="none">C</text>
    <text x="115" y="222" fill="#000" stroke="none">CH₃—CH₂—COOH</text>
  `),
});

export const CHEMISTRY_HISTORICAL_PAPERS = Object.freeze([
  ["2005-MJ",2005,"May/June",5,["rates","qualitative-analysis","organic","energetics","periodicity"]],
  ["2006-MJ",2006,"May/June",5,["solubility","qualitative-analysis","bonding","organic","gases"]],
  ["2007-MJ",2007,"May/June",5,["titration","qualitative-analysis","mole-concept","organic","metals"]],
  ["2008-MJ",2008,"May/June",7,["acid-base","periodicity","halogens","organic","glass","soil"]],
  ["2009-MJ",2009,"May/June",7,["energetics","qualitative-analysis","states-of-matter","petroleum","ammonia"]],
  ["2010-MJ",2010,"May/June",6,["rates","periodicity","organic","redox","iron-extraction"]],
  ["2011-MJ",2011,"May/June",6,["electrolysis","solubility","bonding","salts","reactivity"]],
  ["2012-MJ",2012,"May/June",6,["rates","qualitative-analysis","electrolysis","periodicity","organic","corrosion"]],
  ["2013-MJ",2013,"May/June",6,["solubility","separation","cracking","bonding","electrolysis"]],
  ["2014-MJ",2014,"May/June",6,["rates","periodicity","isomerism","acids-bases","gases"]],
  ["2015-MJ",2015,"May/June",6,["combustion-calorimetry","qualitative-analysis","organic","salts","gas-preparation"]],
  ["2016-MJ",2016,"May/June",6,["melting-point","particles","qualitative-analysis","organic","metals"]],
  ["2017-JAN",2017,"January",6,["water-of-crystallisation","titration","qualitative-analysis","isotopes","water"]],
  ["2017-MJ",2017,"May/June",6,["rates","catalysts","aspirin","moles","energetics"]],
  ["2018-JAN",2018,"January",6,["titration","cooling-curve","organic","apparatus","metals"]],
  ["2018-MJ",2018,"May/June",6,["rates","conductivity","electrochemistry","fats-soaps","metals"]],
  ["2019-JAN",2019,"January",6,["titration","percentage-composition","organic","atomic-structure","periodicity"]],
  ["2019-MJ",2019,"May/June",6,["rates","period-3","organic","reactivity","qualitative-analysis"]],
  ["2020-JAN",2020,"January",6,["gas-volume-rates","conductivity","corrosion","organic","electrochemistry"]],
  ["2021-JAN",2021,"January",6,["bonding","states-of-matter","acids-bases","organic","mole-concept"]],
  ["2021-MJ",2021,"May/June",6,["electrolysis","acids-salts","isotopes","periodicity","organic"]],
  ["2022-MJ",2022,"May/June",6,["energetics","reactivity","qualitative-analysis","organic","electrolysis"]],
  ["2023-JAN",2023,"January",6,["titration","concentration","qualitative-analysis","organic","rates"]],
  ["2023-MJ",2023,"May/June",6,["rates","bonding","organic","moles","gases"]],
  ["2024-JAN",2024,"January",6,["solubility","experimental-design","mixtures","acids-bases","organic"]],
  ["2024-MJ",2024,"May/June",6,["rates","bonding","gas-preparation","organic","qualitative-analysis"]],
  ["2025-JAN",2025,"January",6,["rates","isotopes","esters","periodicity","qualitative-analysis"]],
  ["2025-MJ",2025,"May/June",6,["electrolysis","faraday","acids-salts","organic","gas-preparation"]],
].map(([code,year,session,questionCount,topics])=>({
  id:`CHEM-P2-${code}`,
  year,session,questionCount,topics,
  source:"User-supplied CSEC Chemistry Paper 02 scan",
  sourceFile:`CSEC_Chemistry_P2_${code.replace("-","_")}.pdf`,
  imported:true,
})));

function dataQuestion(seed){
  const mode=seed%6;
  if(mode===0){
    const rows=[[20,82],[25,61],[30,45],[35,32],[40,23],[45,17]];
    return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Rate of reaction",20,[
      part("(a)","A student investigated how temperature affects the reaction between sodium thiosulfate solution and dilute hydrochloric acid. The time taken for a marked cross beneath the flask to disappear was recorded.",[
        item("(i)","State the dependent variable in this investigation.",1,"Time taken for the cross to disappear / reaction time.","The measurement that changes in response to temperature is the time until the cross can no longer be seen.",{objective:"A10.2",profile:{XS:1}}),
        item("(ii)","State TWO variables that should be controlled.",2,["Concentration and volume of sodium thiosulfate solution (1)","Concentration and volume of hydrochloric acid / same total volume / same flask and cross (any one) (1)"],"A fair test changes temperature only. Other factors that affect collision frequency must remain constant.",{objective:"A10.2",profile:{XS:2}}),
        item("(iii)","Complete the rate column by calculating 1/time for each temperature, to three decimal places.",3,["20 °C: 0.012 s⁻¹","25 °C: 0.016 s⁻¹","30 °C: 0.022 s⁻¹","35 °C: 0.031 s⁻¹","40 °C: 0.043 s⁻¹","45 °C: 0.059 s⁻¹"],"For this clock-reaction style experiment, reciprocal time is used as a relative measure of rate.",{objective:"A10.3",profile:{UK:3},response:{type:"table",table:{title:"RESULTS",headers:["Temperature / °C","Time / s","1/time / s⁻¹"],rows:rows.map(r=>[r[0],r[1],""])}}}),
        item("(iv)","Plot a graph of rate, 1/time, against temperature. Draw a smooth best-fit curve.",4,["Axes correctly labelled with units (1)","Suitable linear scales using most of the grid (1)","Points plotted accurately (1)","Smooth best-fit curve (1)"],"A correctly plotted curve rises as temperature increases.",{objective:"A10.4",profile:{XS:4},response:{type:"graph",x:"Temperature / °C",y:"Rate, 1/time / s⁻¹",points:rows.map(([x,t])=>({x,y:Number((1/t).toFixed(4))}))}}),
        item("(v)","Use the pattern in the data to predict the effect of increasing temperature on reaction rate.",2,["Rate increases as temperature increases (1)","The increase is not linear / becomes progressively larger over this range (1)"],"The reciprocal-time values increase more rapidly at higher temperature.",{objective:"A10.3",profile:{UK:2}}),
        item("(vi)","Explain the trend using collision theory.",4,["Particles have greater kinetic energy at higher temperature (1)","particles move faster / collide more frequently (1)","a greater fraction of collisions have energy at least equal to activation energy (1)","therefore more successful collisions occur per unit time (1)"],"Temperature affects both collision frequency and the fraction of collisions energetic enough to react.",{objective:"A10.2",profile:{UK:4}}),
        item("(vii)","Suggest TWO ways to improve the reliability of the experiment.",4,["Repeat each temperature and calculate a mean (1)","identify/repeat anomalous results (1)","use a thermostatically controlled water bath / measure temperature accurately (1)","use the same observer or a colorimeter/light sensor to make the end point more objective (1)"],"Reliability improves with repeats, averaging and a more consistent end-point method.",{objective:"A10.2",profile:{XS:4}})
      ],{table:{title:"TABLE 1: EXPERIMENTAL RESULTS",headers:["Temperature / °C","Time / s"],rows}})
    ],["A10.2","A10.3","A10.4"]);
  }
  if(mode===1){
    const rows=[[20,31],[30,45],[40,61],[50,79],[60,101],[70,128]];
    return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Solubility of potassium nitrate",20,[
      part("(a)","A student determined the maximum mass of potassium nitrate that dissolves in 100 g of water at different temperatures.",[
        item("(i)","State what is meant by a saturated solution.",2,["A solution containing the maximum amount of solute that can dissolve (1)","at the stated temperature (1)"],"Saturation depends on temperature, so the temperature condition matters.",{objective:"A2.4",profile:{KC:2}}),
        item("(ii)","Plot a graph of solubility against temperature and draw a smooth curve.",4,["Axes and units correct (1)","suitable scales (1)","accurate plotting (1)","smooth curve (1)"],"Solubility increases strongly with temperature for potassium nitrate.",{objective:"A2.4",profile:{XS:4},response:{type:"graph",x:"Temperature / °C",y:"Solubility / g per 100 g water",points:rows.map(([x,y])=>({x,y}))}}),
        item("(iii)","Use the graph to estimate the solubility at 55 °C.",2,["About 89-92 g per 100 g water (2)","A value consistent with the student's correctly drawn graph earns credit."],"The point lies between the 50 °C and 60 °C values.",{objective:"A2.4",profile:{UK:2}}),
        item("(iv)","A saturated solution contains 101 g KNO₃ in 100 g water at 60 °C. It is cooled to 30 °C. Calculate the mass of crystals expected.",3,["Solubility at 30 °C = 45 g (1)","mass crystallised = 101 - 45 (1)","= 56 g (1)"],"Cooling lowers the amount that stays dissolved, so the excess crystallises.",{objective:"A2.4",profile:{UK:3},response:{type:"calculation",lines:5}}),
        item("(v)","Outline a suitable laboratory method for obtaining pure dry crystals from the cooled mixture.",4,["Cool to allow crystallisation (1)","filter the crystals (1)","wash with a small amount of cold distilled water (1)","dry between filter papers / in a warm place (1)"],"Cold wash water removes soluble impurities while limiting loss of product.",{objective:"A2.5",profile:{XS:4}}),
        item("(vi)","Explain why evaporation to complete dryness is not preferred when preparing crystals.",2,["The solute may decompose on strong heating (1)","crystallisation gives purer/well-formed crystals and avoids overheating (1)"],"Crystallisation is gentler and gives a better solid product.",{objective:"A2.5",profile:{UK:2}}),
        item("(vii)","State THREE pieces of apparatus needed to determine solubility at a chosen temperature.",3,["Balance (1)","thermometer (1)","beaker/boiling tube/measuring cylinder as appropriate (1)"],"The investigation needs mass, temperature and a vessel for dissolving the solute.",{objective:"A2.4",profile:{XS:3}})
      ],{table:{title:"TABLE 1: SOLUBILITY RESULTS",headers:["Temperature / °C","Solubility / g per 100 g water"],rows}})
    ],["A2.4","A2.5"]);
  }
  if(mode===2){
    const rows=[[0,24.0],[2,27.6],[4,30.5],[6,32.7],[8,34.1],[10,34.8]];
    return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Energy change during neutralisation",20,[
      part("(a)","Equal measured volumes of dilute hydrochloric acid and sodium hydroxide were mixed in a polystyrene cup. Temperature was recorded every two minutes.",[
        item("(i)","State why a polystyrene cup is used instead of a glass beaker.",1,"It reduces heat exchange with the surroundings / provides better thermal insulation.","Better insulation makes the measured temperature change closer to the true heat released.",{objective:"A11.3",profile:{XS:1}}),
        item("(ii)","Plot temperature against time.",4,["Axes and units correct (1)","suitable scales (1)","points plotted accurately (1)","best-fit curve (1)"],"The temperature rises and then approaches a maximum.",{objective:"A11.3",profile:{XS:4},response:{type:"graph",x:"Time / min",y:"Temperature / °C",points:rows.map(([x,y])=>({x,y}))}}),
        item("(iii)","Determine the temperature change using the highest measured temperature.",2,["ΔT = 34.8 - 24.0 (1)","= 10.8 °C (1)"],"Use final minus initial temperature.",{objective:"A11.3",profile:{UK:2},response:{type:"calculation"}}),
        item("(iv)","State whether the reaction is exothermic or endothermic and give a reason.",2,["Exothermic (1)","temperature of the surroundings/solution increased (1)"],"An increase in solution temperature means the reaction transferred heat to the surroundings.",{objective:"A11.1",profile:{UK:2}}),
        item("(v)","Calculate q for 100 g of solution using c = 4.18 J g⁻¹ °C⁻¹.",3,["q = mcΔT (1)","= 100 × 4.18 × 10.8 (1)","= 4514 J or 4.51 kJ (1)"],"The heat gained by the solution is estimated from its mass, heat capacity and temperature change.",{objective:"A11.3",profile:{UK:3},response:{type:"calculation"}}),
        item("(vi)","Explain TWO assumptions made in this calculation.",4,["Density of solution is taken as 1.00 g cm⁻³ so volume can estimate mass (1+1 explanation)","specific heat capacity is taken as that of water, 4.18 J g⁻¹ °C⁻¹ (1)","heat loss to cup/air is assumed negligible (1)"],"Simple school calorimetry treats the dilute solution like water and usually ignores heat absorbed by apparatus.",{objective:"A11.3",profile:{UK:4}}),
        item("(vii)","Suggest TWO changes that would improve the accuracy.",4,["Use a lid (1) and/or better insulation (1)","use a temperature probe/data logger (1)","extrapolate cooling data to mixing time / stir consistently (1)"],"Accuracy improves when heat loss and reading uncertainty are reduced.",{objective:"A11.3",profile:{XS:4}})
      ],{table:{title:"TABLE 1: TEMPERATURE RESULTS",headers:["Time / min","Temperature / °C"],rows}})
    ],["A11.1","A11.3"]);
  }
  if(mode===3){
    const rows=[[0,0],[5,0.031],[10,0.064],[15,0.095],[20,0.127],[25,0.158]];
    return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Copper deposited during electrolysis",20,[
      part("(a)","Copper(II) sulfate solution was electrolysed using copper electrodes at constant current. The mass of copper deposited on the cathode was measured.",[
        item("(i)","Define electrolysis.",2,["Chemical decomposition of an electrolyte (1)","by passage of an electric current / electrical energy (1)"],"Electrolysis uses electrical energy to cause a non-spontaneous chemical change.",{objective:"A9.4",profile:{KC:2}}),
        item("(ii)","Plot mass deposited against time and draw a line of best fit.",4,["Axes and units correct (1)","suitable scales (1)","points accurate (1)","straight best-fit line (1)"],"At constant current, deposited mass should be proportional to charge and therefore to time.",{objective:"A9.10",profile:{XS:4},response:{type:"graph",x:"Time / min",y:"Mass of Cu / g",points:rows.map(([x,y])=>({x,y}))}}),
        item("(iii)","Use the data to estimate the mass deposited after 30 minutes.",2,["Approximately 0.19 g (2)","A value consistent with the line of best fit earns credit."],"The trend is close to linear, so extrapolate carefully.",{objective:"A9.10",profile:{UK:2}}),
        item("(iv)","Write the half-equation at the cathode.",2,["Cu²⁺ + 2e⁻ → Cu (2)","1 mark for correct species; 1 mark for balanced charge/electrons."],"Copper(II) ions gain electrons, so reduction occurs at the cathode.",{objective:"A9.8",profile:{KC:2}}),
        item("(v)","A current of 0.50 A flows for 20 minutes. Calculate the charge passed.",2,["Q = It (1)","= 0.50 × 1200 = 600 C (1)"],"Time must be converted to seconds because amperes are coulombs per second.",{objective:"A9.10",profile:{UK:2},response:{type:"calculation"}}),
        item("(vi)","Using F = 96 500 C mol⁻¹, calculate the theoretical mass of copper deposited. Ar(Cu)=63.5.",4,["moles e⁻ = 600/96500 = 0.00622 mol (1)","Cu²⁺ needs 2 mol e⁻ per mol Cu (1)","moles Cu = 0.00311 mol (1)","mass = 0.00311 × 63.5 = 0.197 g (1)"],"Charge gives moles of electrons. The half-equation supplies the electron-to-copper ratio.",{objective:"A9.10",profile:{UK:4},response:{type:"calculation"}}),
        item("(vii)","State TWO reasons why an experimental mass may differ from the theoretical mass.",4,["Cathode not dried completely / solution left on it (1)","copper lost during washing or handling (1)","current not constant / timing error (1)","side reactions / impure electrodes (1)"],"Experimental yield can be affected by measurement, handling and electrical losses.",{objective:"A9.8",profile:{XS:4}})
      ],{table:{title:"TABLE 1: ELECTROLYSIS RESULTS",headers:["Time / min","Mass of Cu deposited / g"],rows},svg:CHEMISTRY_SVGS.electrolysis,figure:"Figure 1. Electrolysis using copper electrodes"})
    ],["A9.4","A9.8","A9.10"]);
  }
  if(mode===4){
    const rows=[[0,81],[2,74],[4,69],[6,65],[8,65],[10,65],[12,61],[14,56]];
    return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Cooling curve and melting point",20,[
      part("(a)","A molten pure substance was allowed to cool. Temperature was recorded every two minutes.",[
        item("(i)","Plot temperature against time and draw a smooth curve.",4,["Axes and units correct (1)","suitable scales (1)","points accurate (1)","smooth curve including plateau (1)"],"A pure substance shows a constant-temperature region while it changes state.",{objective:"A1.3",profile:{XS:4},response:{type:"graph",x:"Time / min",y:"Temperature / °C",points:rows.map(([x,y])=>({x,y}))}}),
        item("(ii)","State the melting/freezing point of the substance.",1,"65 °C","The plateau occurs at the phase-change temperature.",{objective:"A1.3",profile:{UK:1}}),
        item("(iii)","Explain why the temperature remains constant between 6 and 10 minutes.",3,["The substance is changing state / freezing (1)","energy is being released as particles form stronger attractions (1)","the energy change occurs without lowering average kinetic energy/temperature until freezing is complete (1)"],"During a phase change, energy is associated with particle attractions rather than temperature change.",{objective:"A1.3",profile:{UK:3}}),
        item("(iv)","Describe particle arrangement and movement at 80 °C and at 55 °C.",4,["80 °C: liquid particles close together but able to move past each other (2)","55 °C: solid particles closely packed in fixed positions and vibrating (2)"],"The temperatures lie above and below the freezing plateau.",{objective:"A1.2",profile:{KC:4}}),
        item("(v)","State TWO observations that would suggest the sample is impure.",2,["Melts/freezes over a range rather than at a sharp temperature (1)","melting/freezing point differs from the pure value / plateau not flat (1)"],"Impurities usually broaden and shift the phase-change temperature.",{objective:"A2.1",profile:{UK:2}}),
        item("(vi)","Suggest TWO improvements to the procedure.",3,["Stir gently for uniform temperature (1)","use a digital temperature probe/data logger (1)","insulate/use same sample mass and repeat (1)"],"The improvements reduce temperature gradients and reading uncertainty.",{objective:"A1.3",profile:{XS:3}}),
        item("(vii)","Explain why the cooling curve becomes steep again after solidification is complete.",3,["No further latent heat is being released by freezing (1)","the solid continues to lose thermal energy (1)","its particle kinetic/vibrational energy decreases so temperature falls (1)"],"Once the phase change is finished, heat loss again lowers temperature directly.",{objective:"A1.3",profile:{UK:3}})
      ],{table:{title:"TABLE 1: COOLING RESULTS",headers:["Time / min","Temperature / °C"],rows}})
    ],["A1.2","A1.3","A2.1"]);
  }
  const rows=[[0,10.0],[5,13.4],[10,16.7],[15,20.0],[20,23.3],[25,26.6]];
  return question(`CHEM-G${seed+1}-Q1`,"data-analysis","Acid-base titration data",20,[
    part("(a)","A student titrated 25.0 cm³ portions of sodium hydroxide solution with 0.100 mol dm⁻³ hydrochloric acid. Concordant titres were obtained.",[
      item("(i)","Name the apparatus used to measure 25.0 cm³ of sodium hydroxide accurately.",1,"25.0 cm³ volumetric pipette.","A volumetric pipette delivers a fixed volume more accurately than a measuring cylinder.",{objective:"A7.11",profile:{XS:1}}),
      item("(ii)","State TWO precautions for using a burette accurately.",2,["Read the bottom of the meniscus at eye level (1)","remove funnel before taking readings / ensure jet contains no air bubbles / rinse with titrant (any one) (1)"],"Good burette technique reduces parallax, dilution and volume errors.",{objective:"A7.11",profile:{XS:2}}),
      item("(iii)","The titres were 20.10, 19.95 and 20.00 cm³. Calculate the mean concordant titre.",2,["Use concordant values, for example 20.10, 19.95 and 20.00 if accepted within the chosen tolerance (1)","mean = 20.02 cm³, or 20.0 cm³ to appropriate precision (1)"],"Average only titres close enough to agree.",{objective:"A7.11",profile:{UK:2},response:{type:"calculation"}}),
      item("(iv)","Write the balanced equation for the reaction.",2,["HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) (2)","1 mark reactants/products; 1 mark balanced with state symbols."],"The acid and alkali react in a 1:1 mole ratio.",{objective:"A7.10",profile:{KC:2}}),
      item("(v)","Calculate the concentration of NaOH if the mean titre is 20.00 cm³.",4,["moles HCl = 0.100 × 0.02000 = 0.00200 mol (1)","mole ratio HCl:NaOH = 1:1 (1)","moles NaOH = 0.00200 mol (1)","concentration = 0.00200/0.0250 = 0.0800 mol dm⁻³ (1)"],"Convert volumes to dm³, use the equation ratio, then divide moles by the pipetted volume.",{objective:"A7.11",profile:{UK:4},response:{type:"calculation"}}),
      item("(vi)","Explain why distilled water added to wash down the inside wall of the conical flask does not change the titre.",3,["Water changes total volume but not moles of NaOH present (1)","the same number of moles of HCl is still needed for neutralisation (1)","therefore the equivalence volume from the burette is unchanged (1)"],"Dilution changes concentration in the flask but not the amount of alkali originally pipetted.",{objective:"A7.11",profile:{UK:3}}),
      item("(vii)","State the colour change expected with phenolphthalein when acid is added to sodium hydroxide.",2,["Pink in alkali (1)","to colourless at/after endpoint (1)"],"Phenolphthalein is pink in alkaline solution and colourless in acidic solution.",{objective:"A7.10",profile:{KC:2}}),
      item("(viii)","Suggest TWO reasons for repeating the titration.",4,["To identify anomalous titres (1)","to obtain concordant results (1)","to calculate a reliable mean (1)","to improve reliability/precision (1)"],"Repeated titration supports a defensible mean rather than relying on one reading.",{objective:"A7.11",profile:{XS:4}})
    ],{svg:CHEMISTRY_SVGS.titration,figure:"Figure 1. Typical titration arrangement"})
  ],["A7.10","A7.11"]);
}

function qAtomic(seed){
  const atomic=seed%2===0
    ? {symbol:"Mg",z:12,a:24,ion:"Mg²⁺",e:10,group:"II",period:3}
    : {symbol:"Cl",z:17,a:35,ion:"Cl⁻",e:18,group:"VII",period:3};
  return question(`CHEM-G${seed+1}-Q2`,"structured","Atomic structure, periodicity and bonding",15,[
    part("(a)",`Consider the atom ${atomic.a}${atomic.symbol}, atomic number ${atomic.z}.`,[
      item("(i)","State the numbers of protons, neutrons and electrons in the neutral atom.",3,[`Protons = ${atomic.z} (1)`,`Neutrons = ${atomic.a-atomic.z} (1)`,`Electrons = ${atomic.z} (1)`],"Atomic number gives proton number. Neutrons are mass number minus atomic number. A neutral atom has equal protons and electrons.",{objective:"A3.1",profile:{KC:3}}),
      item("(ii)",`State the number of electrons in ${atomic.ion}.`,1,`${atomic.e} electrons.`,"Use the ionic charge to decide whether electrons were lost or gained.",{objective:"A3.5",profile:{UK:1}}),
      item("(iii)","State the period and group of the element and explain EACH answer from electron arrangement.",4,[`Period ${atomic.period}: ${atomic.period} occupied electron shells (2)`,`Group ${atomic.group}: outer-shell electron pattern places it in that group (2)`],"Period follows occupied shells. Main-group position follows valence electrons.",{objective:"A4.1",profile:{UK:4}})
    ]),
    part("(b)","Use structure and bonding to answer the following.",[
      item("(i)","Explain why solid sodium chloride does not conduct electricity but molten sodium chloride does.",3,["In the solid, ions are fixed in lattice positions and cannot move (1)","when molten the lattice is broken (1)","ions are mobile and carry charge (1)"],"Electrical conduction needs mobile charged particles.",{objective:"A5.6",profile:{UK:3}}),
      item("(ii)","Explain why graphite conducts electricity but diamond does not.",4,["Graphite has each carbon bonded to three others (1)","leaving delocalised/mobile electrons (1)","which carry charge (1)","diamond has all four outer electrons used in covalent bonds, so no mobile charge carriers (1)"],"Both are carbon allotropes, but their bonding networks leave different numbers of mobile electrons.",{objective:"A5.7",profile:{UK:4}})
    ])
  ],["A3.1","A3.5","A4.1","A5.6","A5.7"]);
}

function qOrganic(seed){
  const alcohol=seed%2===0?"propan-1-ol":"ethanol";
  return question(`CHEM-G${seed+1}-Q3`,"structured","Organic chemistry",15,[
    part("(a)","Figure 2 shows three organic compounds.",[
      item("(i)","State the homologous series to which A, B and C belong.",3,["A - alkene (1)","B - alcohol (1)","C - alkanoic/carboxylic acid (1)"],"Identify the functional group: C=C, -OH and -COOH.",{objective:"B2.5",profile:{KC:3}}),
      item("(ii)","State a chemical test that distinguishes A from an alkane, including the observation.",2,["Add bromine water / acidified potassium manganate(VII) (1)","alkene decolourises bromine water (orange/brown to colourless) / decolourises permanganate (1)"],"A chemical test for unsaturation depends on the C=C bond.",{objective:"B3.3",profile:{UK:2}}),
      item("(iii)",`Write the molecular formula of ${alcohol}.`,1,alcohol==="ethanol"?"C₂H₅OH / C₂H₆O":"C₃H₇OH / C₃H₈O","Alcohols contain an -OH functional group attached to a carbon chain.",{objective:"B2.4",profile:{KC:1}})
    ],{svg:CHEMISTRY_SVGS.organic,figure:"Figure 2. Three organic compounds"}),
    part("(b)","Ethanol can be prepared biologically and can also undergo oxidation.",[
      item("(i)","State TWO conditions needed for fermentation of glucose to ethanol.",2,["Yeast / zymase enzymes (1)","warm temperature about 30-40 °C and anaerobic conditions (any one) (1)"],"Yeast enzymes work best in warm conditions and ethanol fermentation occurs without oxygen.",{objective:"B3.8",profile:{KC:2}}),
      item("(ii)","Write a balanced equation for fermentation of glucose.",2,"C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂","One glucose molecule produces two ethanol and two carbon dioxide molecules.",{objective:"B3.8",profile:{UK:2}}),
      item("(iii)","Name the organic product formed when ethanol is fully oxidised.",1,"Ethanoic acid.","Primary alcohol oxidation can produce a carboxylic acid.",{objective:"B3.7",profile:{KC:1}}),
      item("(iv)","Ethanol reacts with ethanoic acid. Name the reaction and state the products.",2,["Esterification (1)","ethyl ethanoate and water (1)"],"An alcohol plus a carboxylic acid forms an ester and water.",{objective:"B3.9",profile:{UK:2}}),
      item("(v)","Explain why addition polymerisation occurs with ethene but not ethane.",2,["Ethene contains a C=C double bond which can open and form new C-C links (1)","ethane is saturated and has no C=C bond to open (1)"],"Addition polymers need unsaturated monomers.",{objective:"B4.2",profile:{UK:2}})
    ])
  ],["B2.4","B2.5","B3.3","B3.7","B3.8","B3.9","B4.2"]);
}

function qAcids(seed){
  const acid=seed%2===0?"sulfuric acid":"hydrochloric acid";
  return question(`CHEM-G${seed+1}-Q4`,"extended","Acids, bases, salts and the mole",17,[
    part("(a)","A student prepares a soluble salt in the laboratory.",[
      item("(i)","Explain how to prepare pure dry copper(II) sulfate crystals from dilute sulfuric acid and copper(II) oxide.",6,["Warm dilute sulfuric acid (1)","add copper(II) oxide in small portions until some remains unreacted / acid is neutralised (1)","filter to remove excess CuO (1)","gently evaporate filtrate to near saturation (1)","cool to crystallise (1)","filter, wash with a little cold distilled water and dry crystals (1)"],"An excess insoluble base ensures all acid is used. Filtration removes excess solid before crystallisation.",{objective:"A7.7",profile:{UK:6}}),
      item("(ii)","Write the balanced equation with state symbols.",2,"CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)","This is acid + metal oxide → salt + water.",{objective:"A7.4",profile:{KC:2}})
    ]),
    part("(b)",`A solution contains 4.90 g of ${acid==="sulfuric acid"?"H₂SO₄":"HCl"} in 500 cm³ of solution.`,[
      item("(i)","Calculate the amount, in moles, of acid present.",3,acid==="sulfuric acid"?["Mr(H₂SO₄)=98 (1)","moles=4.90/98 (1)","=0.0500 mol (1)"]:["Mr(HCl)=36.5 (1)","moles=4.90/36.5 (1)","=0.134 mol (1)"],"Moles equal mass divided by molar mass.",{objective:"A6.2",profile:{UK:3},response:{type:"calculation"}}),
      item("(ii)","Calculate the molar concentration of the acid.",3,acid==="sulfuric acid"?["500 cm³ = 0.500 dm³ (1)","c=n/V=0.0500/0.500 (1)","=0.100 mol dm⁻³ (1)"]:["500 cm³ = 0.500 dm³ (1)","c=0.134/0.500 (1)","=0.268 mol dm⁻³ (1)"],"Convert volume to dm³ before using concentration = moles/volume.",{objective:"A6.7",profile:{UK:3},response:{type:"calculation"}}),
      item("(iii)","Distinguish between a strong acid and a concentrated acid.",3,["Strong refers to high/complete degree of ionisation in water (1)","concentrated refers to a large amount of acid per unit volume (1)","a strong acid can be dilute and a weak acid can be concentrated (1)"],"Strength and concentration describe different properties.",{objective:"A7.3",profile:{UK:3}})
    ])
  ],["A6.2","A6.7","A7.3","A7.4","A7.7"]);
}

function qElectro(seed){
  return question(`CHEM-G${seed+1}-Q5`,"extended","Electrochemistry, redox and metals",17,[
    part("(a)","Figure 3 shows electrolysis of aqueous copper(II) sulfate using inert electrodes.",[
      item("(i)","State the ions present in the electrolyte.",3,["Cu²⁺ (1)","SO₄²⁻ (1)","H⁺ and OH⁻ from water (1)"],"Aqueous solutions contain solute ions plus ions from water.",{objective:"A9.5",profile:{KC:3}}),
      item("(ii)","State the product at the cathode and write the half-equation.",2,["Copper is deposited (1)","Cu²⁺ + 2e⁻ → Cu (1)"],"Copper(II) ions are reduced at the cathode.",{objective:"A9.8",profile:{UK:2}}),
      item("(iii)","State the gas at the anode and give a test for it.",2,["Oxygen (1)","relights a glowing splint (1)"],"With inert electrodes, oxygen is produced from hydroxide/water in this solution.",{objective:"A9.8",profile:{UK:2}})
    ],{svg:CHEMISTRY_SVGS.electrolysis,figure:"Figure 3. Electrolytic cell"}),
    part("(b)","A current of 1.50 A flows for 32.0 minutes.",[
      item("(i)","Calculate the quantity of electricity passed.",2,["time=32.0×60=1920 s (1)","Q=It=1.50×1920=2880 C (1)"],"Always use seconds in Q=It.",{objective:"A9.10",profile:{UK:2},response:{type:"calculation"}}),
      item("(ii)","Calculate the mass of copper deposited. F=96 500 C mol⁻¹; Ar(Cu)=63.5.",4,["moles e⁻=2880/96500=0.0298 mol (1)","moles Cu=0.0298/2=0.0149 mol (1)","mass=0.0149×63.5 (1)","=0.946 g (1)"],"Use the electron stoichiometry from Cu²⁺ + 2e⁻ → Cu.",{objective:"A9.10",profile:{UK:4},response:{type:"calculation"}})
    ]),
    part("(c)","Iron is more reactive than copper.",[
      item("(i)","Predict what happens when an iron nail is placed in copper(II) sulfate solution.",2,["Reddish-brown copper forms on the iron / blue solution fades or becomes pale green (1)","Fe displaces Cu²⁺ because iron is more reactive (1)"],"A more reactive metal displaces a less reactive metal from solution.",{objective:"C2.1",profile:{UK:2}}),
      item("(ii)","Write the ionic equation.",2,"Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)","Iron is oxidised while copper(II) ions are reduced.",{objective:"A8.4",profile:{UK:2}})
    ])
  ],["A8.4","A9.5","A9.8","A9.10","C2.1"]);
}

function qQual(seed){
  const gas=seed%2===0?"ammonia":"carbon dioxide";
  return question(`CHEM-G${seed+1}-Q6`,"extended","Qualitative analysis and environmental chemistry",16,[
    part("(a)","An unknown solution gives a light blue precipitate with aqueous sodium hydroxide. With aqueous ammonia, a light blue precipitate first forms and dissolves in excess to give a deep blue solution.",[
      item("(i)","Identify the cation.",1,"Cu²⁺ / copper(II) ions.","The deep blue solution in excess ammonia is characteristic of copper(II).",{objective:"C6.1",profile:{UK:1}}),
      item("(ii)","State why observations should be recorded before an inference is made.",2,["Observation is the direct experimental evidence (1)","the inference/identity must be justified by that evidence and different ions can share some observations (1)"],"Qualitative analysis separates what you see from what you conclude.",{objective:"C6.1",profile:{XS:2}})
    ]),
    part("(b)",`A gas suspected to be ${gas} is produced in the laboratory.`,[
      item("(i)",`State a test and positive result for ${gas}.`,2,gas==="ammonia"?["Hold damp red litmus paper in the gas (1)","it turns blue (1)"]:["Bubble through limewater (1)","limewater turns milky/cloudy (1)"],"A gas test must name both the reagent/procedure and the positive observation.",{objective:"C6.3",profile:{KC:2}}),
      item("(ii)",`State ONE laboratory method for preparing ${gas}.`,2,gas==="ammonia"?["Warm an ammonium salt, for example NH₄Cl, with a strong alkali such as Ca(OH)₂/NaOH (2)"]:["React a carbonate, for example CaCO₃, with dilute acid such as HCl (2)"],"Choose a standard preparation that produces the gas cleanly.",{objective:"C5.2",profile:{KC:2}}),
      item("(iii)","Explain how a suitable collection method follows from the gas properties.",2,gas==="ammonia"?["Ammonia is very soluble in water so it cannot be collected over water (1)","it is less dense than air so use upward delivery / downward displacement of air (1)"]:["CO₂ is denser than air and fairly soluble in water (1)","collect by downward delivery / upward displacement of air (1)"],"Collection method depends mainly on water solubility and density relative to air.",{objective:"C5.2",profile:{UK:2}})
    ],{svg:CHEMISTRY_SVGS.gasPrep,figure:"Figure 4. General gas-preparation arrangement"}),
    part("(c)","A community is concerned about chemical pollution entering a river.",[
      item("(i)","Explain how excess nitrate and phosphate fertilisers can lead to fish deaths.",4,["Nutrients cause rapid algal growth / eutrophication (1)","algae block light and plants/algae die (1)","decomposers respire while breaking down dead material and use dissolved oxygen (1)","low dissolved oxygen causes fish/other aerobic organisms to die (1)"],"The key chain is nutrient enrichment → algal bloom → decomposition → oxygen depletion.",{objective:"C5.5",profile:{UK:4}}),
      item("(ii)","State ONE Green Chemistry approach that could reduce the impact of a chemical process.",1,"Prevent waste / use safer chemicals / improve energy efficiency / use renewable feedstocks / design less hazardous products (any one).","Green Chemistry tries to prevent hazards at the design stage.",{objective:"C5.10",profile:{KC:1}}),
      item("(iii)","Explain why preventing waste is usually better than treating waste after it is formed.",2,["Less hazardous material is produced in the first place (1)","reduces resources, energy and cost needed for treatment/disposal and lowers risk of release (1)"],"Prevention removes the problem earlier in the process.",{objective:"C5.9",profile:{UK:2}})
    ])
  ],["C5.2","C5.5","C5.9","C5.10","C6.1","C6.3"]);
}

export function buildChemistryPaper2Set(index=0){
  const seed=((Number(index)||0)%6+6)%6;
  const paper={
    id:`CHEM-P2-PRACTICE-${seed+1}`,
    title:`Chemistry Paper 02 Practice ${seed+1}`,
    durationMinutes:CHEMISTRY_PAPER2_FORMAT.durationMinutes,
    totalMarks:CHEMISTRY_PAPER2_FORMAT.totalMarks,
    sourceNote:"Original SPARK paper modelled on the wording, experimental emphasis and topic patterns of the supplied CSEC Chemistry Paper 02 archive.",
    questions:[dataQuestion(seed),qAtomic(seed),qOrganic(seed),qAcids(seed),qElectro(seed),qQual(seed)],
  };
  const total=paper.questions.reduce((sum,q)=>sum+q.totalMarks,0);
  if(total!==100) throw new Error(`Chemistry Paper 02 set ${seed+1} totals ${total}, expected 100.`);
  return paper;
}

export const CHEMISTRY_PAPER2_PRACTICE_SETS = Object.freeze(
  Array.from({length:6},(_,index)=>buildChemistryPaper2Set(index))
);

export const CHEMISTRY_PAPER2_QUESTION_BANK = Object.freeze(
  CHEMISTRY_PAPER2_PRACTICE_SETS.flatMap(paper=>paper.questions.map(q=>({...q,paperId:paper.id})))
);

export function chemistryPaper2BankStats(){
  return {
    historicalPapers:CHEMISTRY_HISTORICAL_PAPERS.length,
    generatedPracticeSets:CHEMISTRY_PAPER2_PRACTICE_SETS.length,
    generatedQuestions:CHEMISTRY_PAPER2_QUESTION_BANK.length,
    marksPerPaper:CHEMISTRY_PAPER2_FORMAT.totalMarks,
    minutes:CHEMISTRY_PAPER2_FORMAT.durationMinutes,
  };
}
