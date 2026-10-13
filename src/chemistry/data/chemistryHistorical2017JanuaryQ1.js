// Source: scanned CSEC_Chemistry_P2_2017_JAN.pdf pp4–8 (printed pp4–8).
// Original Figure 1 meniscus readings provisional until independent high-resolution scale review.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marks; not official CXC marking. Burette readings and any numerical follow-through require examiner verification."},explanation});
export const CHEMISTRY_2017_JAN_Q1_DATA=Object.freeze({
 hydratedMass:3.16,permanganateM:0.010,aliquotCm3:25,solutionCm3:250,
 tentativeFinalBurettes:[25.55,26.30,24.45],initialBurettes:[1.00,2.05,0.15],
 tentativeVolumes:[24.55,24.25,24.30],tentativeMean:24.275
});
export const CHEMISTRY_2017_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q1",sourceId:"CHEM-P2-2017-JAN",
 sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",pdfPages:[4,5,6,7,8],printedPages:[4,5,6,7,8],
 originalQuestionNumber:1,totalMarks:25,kind:"data-analysis",
 title:"Iron(II) sulfate hydrate by permanganate titration and ion testing",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; not an official CXC marking scheme",
 diagramStatus:"Figure 1 three source burettes and source Table 3 require independently validated source-exact SVG and table layout.",
 sourceIssues:[
 "Visual-read source final menisci are tentative 25.55, 26.30, 24.45cm³; initial readings are printed 1.00,2.05,0.15cm³. The second and third titre estimates ~24.25 and24.30cm³ agree; independent high-resolution reading must establish correct tenths before publication.",
 "A provisional nonrough mean 24.275cm³ gives Fe²⁺ 0.0121375mol in 250cm³, anhydrous FeSO₄ mass 1.8449g and approximately 6 waters per FeSO₄ unit after comparing with 3.16g hydrated mass; allow candidate follow-through.",
 "MnO₄⁻:Fe²⁺ molar ratio 1:5 is printed in source. Use acidic permanganate endpoint pale persistent pink, not an additional indicator.",
 "Table 3 Fe²⁺ with NaOH forms pale-green Fe(OH)₂ insoluble in excess, turning brown as oxidised Fe(III) hydroxide on exposure to air; Ba(NO₃)₂ tests SO₄²⁻ as white BaSO₄ precipitate insoluble in HNO₃."
 ],
 context:"A 3.16g sample of hydrated FeSO₄·nH₂O is dissolved in acid and made up to 250cm³. Three 25.0cm³ aliquots are titrated against 0.010mol dm⁻³ KMnO₄. Acidic redox equation: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O.",
 parts:[
 {label:"(a)",items:[
 item("","Define standard solution.",1,["A solution whose concentration is accurately known."],"A standard solution has a precisely known solute concentration.")
 ]},
 {label:"(b)",items:[
 item("","Calculate the mass of hydrated iron(II) sulfate used: beaker and sample 17.11g, empty beaker 13.95g.",1,["17.11 − 13.95 = 3.16g."],"Subtract the empty beaker mass to obtain hydrated salt mass.")
 ]},
 {label:"(c)",items:[
 item("(i)","Read the final burette volume for all THREE titrations from Figure 1.",3,["T1 approximately 25.55cm³ (provisional).","T2 approximately 26.30cm³ (provisional).","T3 approximately 24.45cm³ (provisional)."],"Read downward-increasing burette scale at the bottom of each meniscus; all three provisional values need second-pass scan confirmation.",{type:"table",table:{headers:["Titration","Final volume (cm³)"],rows:[["1",""],["2",""],["3",""]],answers:["25.55","26.30","24.45"]}}),
 item("(ii)","Using initial readings 1.00, 2.05 and 0.15cm³, calculate three volumes used.",3,["T1: 25.55−1.00 =24.55cm³.","T2:26.30−2.05=24.25cm³.","T3:24.45−0.15=24.30cm³."],"Volume delivered is final minus initial burette volume; values provisional.",{type:"table",table:{headers:["Trial","Volume used (cm³)"],rows:[["1",""],["2",""],["3",""]],answers:["24.55","24.25","24.30"]}}),
 item("(iii)","Determine average volume of permanganate in concordant titrations.",1,["Mean of T2 and T3: (24.25+24.30)/2=24.275≈24.28cm³ (conditional)."],"Exclude a discordant rough value and average concordant readings, according to examiner tolerance."),
 item("(iv)","Calculate moles of KMnO₄ in the chosen average titre.",1,["0.010×24.275/1000 = 2.4275×10⁻⁴mol (conditional)."],"Convert cm³ to dm³ and multiply by molarity.")
 ]},
 {label:"(d)",items:[
 item("(i)","Use MnO₄⁻:Fe²⁺=1:5 to calculate moles Fe²⁺ in the aliquot.",1,["5×2.4275×10⁻⁴ = 0.00121375mol (conditional)."],"Every mole permanganate oxidises five moles Fe²⁺ in acid."),
 item("(ii)","Determine the moles Fe²⁺ in the 250cm³ flask.",1,["0.00121375×(250/25)=0.0121375mol (conditional)."],"The original whole solution is ten times the 25cm³ aliquot.")
 ]},
 {label:"(e)",items:[
 item("","Find mass of anhydrous FeSO₄ if relative formula mass is 152.",1,["0.0121375×152≈1.8449g (conditional)."],"One mole FeSO₄ gives one mole Fe²⁺.")
 ]},
 {label:"(f)",items:[
 item("","Find mass of crystallisation water in the hydrated sample.",1,["3.16−1.8449≈1.3151g (conditional)."],"Water of crystallisation mass is hydrated mass minus anhydrous salt mass.")
 ]},
 {label:"(g)",items:[
 item("","Calculate moles of crystallisation water (H₂O=18).",1,["1.3151/18≈0.07306mol (conditional)."],"Divide water mass by molar mass.")
 ]},
 {label:"(h)",items:[
 item("","Determine n in FeSO₄·nH₂O.",1,["0.07306/0.0121375≈6.02, so n≈6 (conditional)."],"Divide water moles by FeSO₄ moles to get the number of waters per formula unit.")
 ]},
 {label:"(i)",items:[
 item("","Describe the colour change at KMnO₄ titration endpoint.",2,["Initially acidic Fe²⁺ sample loses purple KMnO₄ colour as the oxidant reacts.","The first persistent pale pink colour marks a slight excess MnO₄⁻ at endpoint."],"Permanganate is reduced from purple MnO₄⁻ to near-colourless Mn²⁺ until Fe²⁺ is consumed.")
 ]},
 {label:"(j)",items:[
 item("","Explain why no added indicator is required.",1,["Permanganate acts as its own indicator by its strong purple/pink colour."],"The first permanent pale pink excess identifies the endpoint.")
 ]},
 {label:"(k)",items:[
 item("(i)","State observations when dilute NaOH is added to pale blue solution X containing Fe²⁺, first dropwise and then in excess.",2,["A pale-green precipitate of Fe(OH)₂ forms.","Precipitate remains insoluble in excess NaOH."],"Fe²⁺ +2OH⁻ → Fe(OH)₂(s), which is green and insoluble in excess hydroxide.",{type:"table",table:{headers:["NaOH test","Observation"],rows:[["Dropwise",""],["Excess",""]],answers:["pale green precipitate","insoluble precipitate"]}}),
 item("(ii)","Describe what happens to the precipitate from (i) when left in air.",2,["Green Fe(OH)₂ precipitate gradually turns brown.","Atmospheric oxygen oxidises Fe²⁺ to Fe³⁺ and forms brown Fe(III) hydroxide."],"Iron(II) hydroxide is oxidised when exposed to air."),
 item("(iii)","Give two observations with Ba(NO₃)₂, followed by dilute HNO₃, on sulfate-containing solution X.",2,["White BaSO₄ precipitate forms upon adding barium nitrate.","Precipitate remains insoluble upon addition of dilute nitric acid."],"SO₄²⁻ + Ba²⁺ → BaSO₄(s) is the sulfate ion test.")
 ]}
 ]
});