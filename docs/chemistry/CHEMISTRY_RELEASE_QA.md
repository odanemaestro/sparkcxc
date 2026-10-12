# CSEC Chemistry release gate and source QA

This document is a release gate, not a completion certificate. Keep `main` unchanged until all source items and integration checks below are complete.

## Source ledger

- Source: user-supplied `CSEC CHEMISTRY.zip`, 28 Paper 02 PDFs, 568 scanned pages.
- Syllabus: user-supplied `CSEC-Chemistry-Syllabus (1).pdf`, CXC 21/G/SYLL 13, labelled effective for examinations from May–June 2015.
- Source paper inventory and page counts: `src/chemistry/data/chemistryPaper2SourceAudit.js`.
- Historical source-index status: 28/28 inventoried. The OCR/search index is not authoritative for chemistry symbols or graphical measurements.
- Draft learner transcriptions: 72 questions across TWELVE complete historical Paper 02 draft sets: 2010–2019 May/June, plus 2025 January and 2025 May/June. Each has six questions totalling 100 marks. There are 167 expected questions across 28 supplied PDFs; 95 questions are not yet drafted. All historical drafts remain quarantined for independent verification.
- Historical questions cleared for students: **0**. The draft bank is deliberately kept separate from learner-facing simulations.
- Original SPARK simulations: six 6-question, 100-mark practice sets. These are *original SPARK content* and must not be labelled historical CXC papers.

## Exact historical-paper requirements

For **every question of every supplied paper**, record:

1. Paper/session/year, question number, original printed page, source PDF page and number of marks.
2. Visually verified question text, part labels, scientific constants, formulae, ion charges, units, tables, numerical values and spelling.
3. Independently calculated correct answers. Show every intermediate calculation, units, significant figures, exceptions and legitimate alternatives.
4. A point-by-point *SPARK-authored* mark scheme. Do not describe schemes as official CXC schemes unless an official scheme is supplied and checked.
5. Each figure graph / chart / chemical structure as accessible, genuine SVG. Compare geometry, labels, scales, dashed/solid marks, tick values, position and required arrows against the PDF at full resolution.
6. Answer editor appropriate to the question: text, calculation, table, graph or labelled drawing. Preserve question-level and item-level marks exactly.
7. Marking tests for correct, partly correct, empty, equivalent and demonstrably incorrect answers. Automatically scored free text remains provisional.
8. Desktop, phone, tablet, iPad, light and dark theme review.
9. Reviewer identity and approval date for **transcription**, **chemistry**, **mark scheme** and **diagram**. Do not promote a record with any missing approval.

## Implemented controls on the current integration branch

- Historical drafts are explicitly `learnerFacing: false`. No source scan is shown as an independently verified question.
- Original SPARK Paper 02 simulations retain 2 h 30 min, six compulsory questions and 100 marks.
- Rate-of-reaction table now has six keyed answers. Three integer marks follow three explicit two-cell groups rather than awarding three marks for any three cells.
- Tables without verified reference answers cannot award automatic marks.
- Numerical table matching respects displayed precision. For example, `0.016` does not meet the `0.012` key.
- Chemical formula Unicode subscript, superscript and ionic-charge variants are normalised.
- Graph plot tolerance scales with source data; axis quantity and units are required for the axis-label mark.
- Automated tests assert question item marks sum to the parent question total and check source QA boundaries.

## Still blocked for release

- Source-by-source review for every remaining historical question in the 28 PDFs, including all of the 2014 May/June paper apart from drafted Question 1.
- Second-pass review of all seventy-two drafted questions across twelve complete historical draft papers (2010 through 2019, plus 2025). The 2014 Figure 1 graph and Figures 2-3 apparatus need exact SVG redrawing and overlay checking. January 2025 source figures need syringe, graph, ester and periodic-table overlay checks, and all new structural model answers need independent chemistry review.\n- Pixel-level comparison of the 2025 draft Figure 1 SVG. The four model SVG chemical structures and one oxygen-preparation apparatus drawing also need visual checks.\n- Resolve examiner-interpretation/source-quality flags in the 2025 paper: Question 2 gives an implausible pH for 0.05 M phosphoric acid, Question 3 uses ambiguous wording about complete methane bromination, and Question 5 links a monohydric C4H10O compound to polyester formation.
- Independent scientific review of all 119 mapped syllabus objectives, all numerical answers and the practical models.
- PR #49 supplementary study explanations are now reconciled into this branch for all 21 topics while retaining the 119-objective guide and original Chemistry labs. Scientifically review the expanded lessons, then retire the redundant PR #49 to avoid duplicate merges.
- End-to-end checks for submissions, progress reports, parent/student notifications, saving, restored timers, navigation and permissions.
- Full build, test, accessibility and mobile/tablet/desktop checks on the final commit.
- Explicit user review and approval before a merge.

## Workflow

1. Finish each historical source paper and independently verify every question.
2. Promote only fully approved questions into the live question bank.
3. Run CI and cross-device QA; resolve all failures.
4. Present the complete Chemistry review branch.
5. Merge to `main` **only after explicit approval**.

## Automated historical publication guard

A historical question is eligible for publication only after checks pass in `src/chemistry/data/chemistryHistoricalReleaseGate.js`. The checks require sourced question text, full points and explanations, an exact mark total, no unresolved diagram or source issues, and five recorded reviewer approvals: transcription, chemistry, mark scheme, figure SVG and exam interaction. Every current draft fails this publication gate by design.

## October 12 historical batch, January 2025

Drafted all six questions from the source 20-page PDF, preserving the original January paper's 25 + 15 + 15 + 15 + 15 + 15 mark allocation. Added data-analysis readings (Q1), graph references, quantitative calculations, isotope table (Q2), propyl ethanoate hydrolysis (Q3), periodic-table extract (Q4), alkene isomer and polymer questions (Q5), and ammonia preparation/environmental questions (Q6). The original paper has 100 marks. The newer SVG drawings include internal valence checks where relevant, but the diagrams do not yet have pixel-level source approval.

Source-issue log: Q1 gas-syringe readings need second visual comparison; Q4 places neon on a visually inconsistent row of the printed periodic-table fragment; Q5's condensed alkene formulae appear to omit the C=C bond notation. Preserve the scan text separately from teacher interpretations and avoid auto-marking these interpretations as official.

## October 12 historical batch, May/June 2014

Drafted all six questions and preserved the supplied 25 + 15 + 15 + 15 + 15 + 15 mark structure. Question 1 covers neutralisation, collision theory and sulfite analysis. Question 2 covers group trends, ionic bonding and calcium nitrate decomposition. Question 3 covers hydrocarbon structures, butane isomers and propan-2-ol. Question 4 covers ionic versus molecular oxide melting points, conductivity and corrected electrical test apparatus. Question 5 covers silver/zinc copper sulfate displacement, corrosion and duralumin. Question 6 covers plant nutrient deficiencies, soil acidity, manure, lime and ammonium-fertiliser chemistry.

Source-issue log: original Q1 figures are still waiting for exact source SVG comparisons; Q3 prints atypical reaction conditions for propene hydration; Q4 describes sulfur's oxide using SO₂ melting-point data and requires careful wording about pure versus aqueous conductivity; Q5 aluminium oxide surface passivation needs qualified explanation; Q6 'lime' can refer to multiple chemical forms. None is approved for student use until these questions are independently checked.

The derived historical coverage ledger is `src/chemistry/data/chemistryHistoricalCoverage.js`. It reports question numbers missing for each paper, draft counts, approvals, and hard failures for any duplicate or orphan question. The release count remains zero.

## October 12 historical batch, May/June 2015

Source: `CSEC_Chemistry_P2_2015_MJ.pdf`, 21 pages. Added six questions: the 25-mark calorimetry, ion-test and scale-reading question plus five 15-mark questions on states/bonding, hydrocarbons/polymers, salt preparation/water hardness, sugar processing/fermentation/distillation and hard-water detergent pollution/green chemistry. Every question has an authored point-by-point scheme and a teacher-style explanation. Native SVGs provide the candle apparatus, six measuring scales, molecular structures, bonding models, sugar-processing flow diagram and laboratory distillation model. This paper is a draft: original graph/scale coordinates and source figure dimensions need an independent visual overlay check.

Instrument readings for the calorimetry experiment are provisionally recorded as flask 125 g, flask plus water 326 g, starting/final temperature 27/39 °C, and starting/final candle/watch-glass 97.5/96 g. The dependent calculation gives 11,421.9 J absorbed and 7,614.6 J g⁻¹, pending independent confirmation of the readings. Do not release this numerical marking key to students before verifying the scales.

The 2015 source includes a mixture of sulfate/chloride qualitative tests, ionic/covalent bonding diagrams, and a sugar processing figure with labels for Process P and Process Q. Specific wording and acceptable alternative answers need second-pass examiner review. Any original SPARK diagrams that demonstrate candidate answers must be distinguished from diagrams printed on the source page.

Review status: 24 draft questions, 4 complete *draft* papers, 0 fully approved historical questions; 143 still require initial transcription.

## October 12 historical batch, May/June 2013

Source: `CSEC_Chemistry_P2_2013_MJ.pdf` (20 pages). Added six questions covering KI solubility, fractional crystallisation, lead-ion testing, periodic trends, phosphorus halide bonding, cracking, starch and peptide hydrolysis, reaction rates, duralumin, membrane-cell chlorine production, copper electrorefining and Caribbean environmental problems. Mark allocation is 25 + 15 + 15 + 15 + 15 + 15, total 100. Native SVGs include the original blank solubility graph, periodic-table fragment, protein polymer diagrams, CO₂ rate graph and brine membrane cell.

Scientific blockers: In Question 1, calculating molarity from 100 cm³ *water* rather than 100 cm³ *solution* involves an unsupported approximation; the intended 10.8 mol dm⁻³ result needs examiner qualification. Fractional crystallisation of two water-soluble sodium salts requires purity checks. In Question 2, acceptable physical similarities between Ca-like and Br-like elements need checking. In Question 3, generic R peptide chain is not a specified amino acid and the three-glucose chain must depict correct glycosidic stereochemistry. Question 4 uses a source-graph final CO₂ volume near 124 cm³, which requires an independent reading. All figures and model answers need visual overlay/chemistry review.

Historical progress: five complete *draft* papers, 30 questions drafted, 137 absent, zero historical questions cleared for student use.

## October 12–13 historical batch, May/June 2012

Source: `CSEC_Chemistry_P2_2012_MJ.pdf`, 20 pages. The complete six-question draft covers 100 marks: calcium-carbonate particle-size reaction rates, nitrate reaction and qualitative iron-ion testing; CuSO4 electrolysis with platinum electrodes and copper purification; propene/butane substitution/addition and ethanoic acid esters; radioisotope uses and ionic dot-cross structures; iron/aluminium corrosion; water properties, hard water and Caribbean household environmental practices. Question 1 is 25 marks and Questions 2–6 are 15 marks each. Scientific answers include the theoretical CO2 volume 432 cm³ versus printed graph plateau 370 cm³, and about 2.98 g copper deposited at 5 A for 30 minutes. Source-based native SVG schematics cover the incomplete gas-collection apparatus, powder graph with original marble marker points, electrolysis cell and organic reaction scheme.

Important unresolved source-image discrepancy: 2012 page 3 Figure 2 seems to print a bold marble-chip marker around 20 s / 100 cm³ while page 2 Table 1 gives 20 s / 125 cm³. The page 3 drawing needs independent high-resolution rechecking; numerical marking must use the original table and accept the discrepancy. The historical source has an incomplete lab setup and student-drawing boxes. SVGs are schematics only, not independently approved facsimiles. The qualitative analysis, oxidation half-equations, chlorine substitution products and all wording/marks need independent second-pass review. All six new questions remain `learnerFacing:false`.

Status after this batch: six fully drafted historical papers, 36/167 questions drafted, 131 questions not yet transcribed, 0 published, 0 source-verified questions approved.

## October 12–13 historical batch, May/June 2011

Source: `CSEC_Chemistry_P2_2011_MJ.pdf`, 22 pages. Authored all six questions (25 + 15 + 15 + 15 + 15 + 15 marks) on copper-electrode electrolysis with a quantitative current/mass study, lattice structures and solubility graph, ester hydrolysis/fermentation and polymers, carbonate/zinc acid tests and iron rusting, duralumin/displacement/ammonia reduction of heated copper oxide, and protein/food chemistry with vitamin-C iodometric titration. Reused source data only where cross-checked. The historical marking scheme remains an independently authored *draft*, not an official CXC scheme.

Source science/visual issues: The printed Figure 2 potassium nitrate solubility curve differs markedly from the physical tabulated solubility of KNO₃; the graph can be used for this historical question only, never as general scientific reference. The source gives dilute HNO₃ + Zn, where nitrate can be reduced to nitrogen oxides and H₂ is not the usual product; published teaching content must include chemically valid conditioned equations. The 2011 Q1 original graph, the 2011 Q3 ethyl propanoate full bonding diagram, amino-acid location and all structural drawing answers still require source-exact SVG and examiner QA. Do not publish these drafts until the five approvals and all unresolved source issues are settled.

Coverage after this batch: seven complete draft historical papers, 42/167 questions drafted, 125 not yet transcribed, 0 historical questions published. The draft PR must remain unmerged pending explicit user review.

## October 12–13 historical batch, May/June 2010

Source: \`CSEC_Chemistry_P2_2010_MJ.pdf\`, 20 pages. Transcribed all six compulsory questions, 100 marks total (25 + 15 + 15 + 15 + 15 + 15), including individual original question sub-parts. Question 1 contains hydrogen-peroxide catalyst data (9 Jonathan results), Karen's pre-plotted curve, an activation-energy diagram, nitrate/iodide/lead-ion qualitative tests and a gas-collection experiment design. Source Figure 1 and Figure 2 have native SVG reconstructions and a separate gas-syringe model. Question 2 includes corrected electron configuration, magnesium reducing Zn²⁺ rather than oxidising it, sodium-23/24 isotopes, radioactive applications and ionic sodium oxide bonding. Question 3 includes C₄H₈ fully displayed isomer models, ethanol dehydration/oxidation and esterification. Questions 4–6 cover acidic permanganate redox chemistry, FeO neutralisation, alcoholic fermentation, iron blast-furnace extraction, haemoglobin/anaemia, and Caribbean home cooking/pressure-cooking and fruit vitamin C.

Unresolved independent-check issues: the 100 cm³ of 0.4/0.8 M H₂O₂ used is not consistent with the tiny final source graph oxygen volumes as stoichiometric *complete* yields, so the curves must be taught as experimental observations only. Karen's 45-second graph read is about 8 cm³ and should have a tolerant examiner range. The energy diagram uses A high activation barrier, B catalysed barrier, C reactant energy, D product energy. The original fully displayed organic structures and dot/cross sodium oxide need exact model SVGs, while Figure 1/2 require second-source overlay review. Iron blast furnace equations and the author-weighted eight-mark marking scheme must be examiner-checked. No part is approved for student practice.

Coverage: 48 of 167 questions drafted across 8 complete historical draft papers (800 marks); 119 questions remain untranscribed. Published/independently approved historical questions: zero. Draft PR stays separate from \`main\`.

## October 12 historical batch, May/June 2016

Source: \`CSEC_Chemistry_P2_2016_MJ.pdf\`, PDF pages 1–20 with the printed exam questions on pages 4–22. The six compulsory questions are now in the quarantined draft bank, 25 + 15 + 15 + 15 + 15 + 15 = 100 marks. Q1: thermometer readings, 65 °C cooling plateau, liquid/solid particles and Pb²⁺/nitrate inference (original water-bath, thermometers, pre-plotted graph and blank particle SVGs). Q2: acidified manganate(VII), iodide redox reactions and iron/silver displacement of copper. Q3: pent-1-ene and isomers, catalytic hydrogenation to C₅H₁₂ and pentan-2-ol identification. Q4: diamond versus graphite allotropes, metallic bonding and NaCl versus CaO ionic lattice. Q5: methane photochemical chlorination, C₄H₈ alkene, C₄H₈O₂ acid and distinguishing reaction tests. Q6: bauxite/Bayer/Hall-Héroult aluminium extraction, an Al–Mg alloy (school name magnalium), electricity costs and mercury environmental harm.

The six manually read Q1 thermometer temperatures are **1 min 73 °C, 2 min 68 °C, 5 min 65 °C, 7 min 60 °C, 8 min 55 °C, 9 min 50 °C**, and are stored only as provisional historical answers. The cooling plateau is around 65 °C at 3–5 min. **The original Figure 3 places temperature on the horizontal (top) axis and time increasing downward on the vertical axis**, an unusual orientation that was verified directly against the source scan and is now preserved in both the SVG and candidate plotting response. Five source pre-plotted points need final coordinate overlay verification before grading. The original PDF Figure 4 particle diagram is a blank answer area, not a preprinted worked answer. Image diagrams are approximate, native SVGs with no embedded bitmap, still pending second independent comparison against every thermometric graduation, bond, grid and source illustration.

Important scientific notes: Source Q2's unknown C can behave as a reducing agent with permanganate and an oxidising agent toward iodide; it cannot be assumed to have one fixed redox role without conditions. Multiple successive photochemical substitutions are required to convert CH₄ fully to CCl₄. The historical source refers to an aircraft aluminium-magnesium alloy: magnalium is a traditional school answer, but actual commercial aerospace alloy compositions vary. Mercury use and methylmercury bioaccumulation need distinct environmental explanations.

No original 2016 question has passed independent transcription, chemistry, mark-scheme, SVG source alignment and exam interaction approval. The historical bank now has **54 draft questions / 167 expected** across **9 complete draft papers**, 900 draft marks, and **113 questions remain to transcribe**. Published historical questions: zero. PR #48 must remain a draft and must not be merged to \`main\` until the user reviews and explicitly approves the finished course.


## October 12 historical batch, May/June 2017

Source: \`CSEC_Chemistry_P2_2017_MJ.pdf\`, 18 PDF pages, question 1 on printed pages 5–9 (PDF pages 3–7), questions 2–6 on printed pages 10–20. Six source questions cover 25 + 15 + 15 + 15 + 15 + 15 = 100 marks. The original first, third and sixth PDF pages contained image-only/partially extracted material that was rendered and inspected, rather than guessed from partial text. The complete first experiment now preserves catalyst balance readings 0.0, 0.4, 1.6, 2.2, 3.6 and 4.0 g and oxygen reaction rates 0.0, 0.6, 1.8, 2.7, 4.5 and 5.0 mL s⁻¹. The original mass dials, pre-plotted origin graph and blank energy profile are represented by native SVGs, with a separate labelled model apparatus and catalyst energy profile. The 3.0 g best-fit extrapolation is approximately 3.7–3.8 mL s⁻¹, implying roughly 37–38 mL after 10 s, with student follow-through marking. Source image overlay and best-fit tolerance need a second examiner.

Question 2 covers aspirin label data, mole calculations, aspirin hydrolysis and partial ethanoic acid ionisation. Important outcomes: 0.20 mol aspirin requires 36 g; Jared's 18 g is 0.100 mol; aspirin hydrolysis gives 6.00 g ethanoic acid assuming the printed 1:1 mole ratio. The original aspirin bottle lists a 140 °C boiling point which is not to be treated as a scientifically confirmed normal boiling point of aspirin because decomposition may precede boiling. Figure 5 has a schematic SPARK SVG, not an approved exact aromatic-structure redraw.

Question 3 covers C₅H₁₂ branched isomers, C₃H₆O₂ propanoic acid solubility, and bromination of CH₃CH=CHCH₃ to 2,3-dibromobutane. Added fully displayed C₄H₈Br₂ model with automated atom-valence and formula checks. Question 4 explains preparation of insoluble CaCO₃ by precipitation and pure soluble NaNO₃ by neutralisation/titration followed by crystallisation. Question 5 explains Caribbean molasses fermentation, school laboratory distillation and the classic acidified-dichromate Breathalyzer (not the modern fuel-cell/infrared devices). Question 6 concerns metals A⁺/B²⁺ and relative Fe reactivity, plus iron alloy applications.

Unresolved scientific issue in Q6: A is specified as a monovalent metal more reactive than Fe, which strongly suggests a metal with an important competing reaction with aqueous solution. The formal ionic displacement equation is 2A + Cu²⁺ → 2A⁺ + Cu, but its direct laboratory observation cannot safely be assumed without knowing A and water reactivity. The charge/reactivity data alone also do not uniquely identify the extraction route for the individual oxides, so sample answers state assumptions and conditional examples. Do not release a deceptively definite answer.

Status after this batch: TEN complete **draft** historical papers, 60/167 questions, 1000 draft marks, 107 historical questions remain undrafted. Zero historical questions have passed all source/science/marking/figure/interaction gates; all are still \`learnerFacing:false\`. PR #48 stays separate from \`main\` pending full QA and explicit user approval.


## October 12 historical batch, May/June 2018

Source: \`CSEC_Chemistry_P2_2018_MJ.pdf\`, 19 PDF pages, examined via \`pdftotext -layout\` plus source page images, especially the image-only stopwatch Figure 1 on printed page 4, empty plotted grid Figure 2 on printed page 7, circuit Figure 3 on printed page 13, triglyceride on page 17 and the structural drawings of polymers BB and CC on page 18. Added all six source-question drafts (25 + 15 + 15 + 15 + 15 + 15 marks = 100), with source page locations, detailed explanations and SPARK-authored independent answer schemes. Answer structures are new source-linked SVG drawings and models, not the original copyrighted scan.

Question 1 uses 1.0 g calcium carbonate chips and excess HCl at 18, 23, 28, 32, 37 and 43 °C, timing the collection of 50 cm³ CO₂ at each temperature. Correct theoretical gas volume from **complete** CaCO₃ reaction: 1/100 × 24,000 = 240 cm³ at RTP. Source prefilled time 51.5 s at 18 °C, reciprocal 0.019 s⁻¹. Provisional high-resolution source reading of remaining stopwatches: **31.5, 19, 13, 8, 5 s**, giving three-decimal reciprocal times **0.032, 0.053, 0.077, 0.125, 0.200 s⁻¹**. All stopwatch pointer tick readings, particularly 31.5 s, need independent two-person visual sign-off. **Graph warning:** original Figure 2 uses an axis break and a reciprocal-time y-scale beginning around 0.03 s⁻¹, whereas the lowest source point (18 °C, 0.019 s⁻¹) lies below the continuous plotted area. An exact graph figure/source examiner review must resolve the initial point and the intended break before student interaction is approved. At 40 °C, an appropriate source curve reading is roughly 0.16–0.17 s⁻¹; do not enforce a unique exact answer without examiner agreement.

Question 2: chlorine-35 and chlorine-37 isotope neutron calculations (18 vs 20 neutrons), radioisotope use, chlorine oxidation of potassium iodide to brown iodine, sulfur to SO₂ and magnesium sulfide. Question 3: butane C₄H₁₀, propene C₃H₆, fully displayed atoms/bonds, acid-catalysed propene hydration (propan-2-ol), and ethanol/ethanoic-acid esterification to ethyl ethanoate. A valence-checked, fully displayed C₃H₈O propan-2-ol model is included along with earlier certified butane/propene models. Question 4: ionic versus molecular versus metallic conduction in the original source electrical tester, followed by molten lead bromide at 6 A for 180 s. Cathode: Pb²⁺ + 2e⁻ → Pb(l); calculated Pb mass **1.16 g**. Question 5: yeast fermentation; alkali saponification of the printed generic triglyceride with R–CH₂ arms yields the corresponding R–CH₂–COO⁻ Na⁺ soap and glycerol; polymer BB amide/condensation versus polymer CC polypropene/addition, with propene monomer. Question 6: magnesium central to chlorophyll and tomato yields, alternative metal-ion deficiencies, historic leaded vehicle fuels and carbon/nitrogen oxides, as well as genuine prevention-based green chemistry interventions.

All 2018 figure SVGs are approximate reconstructions pending source overlay, and all 2018 learner-facing flags remain false until independent transcription, scientific, rubric, graphic and student-workflow review. Current draft coverage: **66/167 historical questions, 11 complete draft Paper 02s, 1,100 marks**, with **101 remaining untranscribed**. Zero source questions approved or published. Keep PR #48 draft and do not merge to \`main\` without explicit user approval.


## October 12 historical batch, May/June 2019

Source: \`CSEC_Chemistry_P2_2019_MJ.pdf\`, 22 PDF pages, question 1 pp.3–7 and questions 2–6 pp.8–22. Questions added: six (25 + 15 + 15 + 15 + 15 + 15 = 100 marks). The 2019 questions cover Zn granule radius vs rate of acid reaction; Period 3, sulfur allotropes and sulfur–chlorine covalent bonding; condensation polymerisation of a polyamide, ethanol + propanoic acid to ethyl propanoate; NaCl giant-ionic lattice, Group II magnesium/calcium/strontium trends; alkanes, but-1-ene and its 2 other alkene structural isomers plus hydrogenation; Al alloys, Cu/Fe/Zn/Pb displacement and lead toxicity.

Source page 5 **Figure 1** has six analog stopwatch dials, carefully rendered and reread at high resolution. Current provisional readings for experiments 1–6 are **11, 20, 32, 44, 52, 59 s**, giving reciprocals at 3 decimal places **0.091, 0.050, 0.031, 0.023, 0.019, 0.017 s⁻¹**. Only experiment 1 is prefilled on the original Table 1. The rate graph on printed page 7 is explicitly \`Rate (s⁻¹)\` against \`Time (s)\`, not zinc-granule grade/radius; this unusual choice must be preserved. The 6 zinc grades are 0.8,1.9,3.0,4.1,5.2,6.3 μm; all samples have 0.55 g zinc and react at 25 °C with excess 0.5 mol dm⁻³ sulfuric acid. The gas timed is 100 cm³, while the theoretical *total* H₂ from 0.55/65.4 × 24,000 ≈ **201.8 cm³** is a separate quantity. Source dials, reference graph and inferred clock tick readings all remain provisional pending a second independent visual review.

Printed Figure 2 shows a dicarboxylic acid HOOC–R–COOH and a diamine H₂N–R′–NH₂ forming a **polyamide by condensation**, with eliminated water. Printed Figure 3 has ethanol (Compound A) and propanoic acid (Compound B), giving **ethyl propanoate** (Compound C). Added a fully displayed C₅H₁₀O₂ ester structural answer diagram with automated C/H/O valence checking. The printed source provides a blank answer box rather than a prefilled ester; keep the model-answer SVG separate. Sulfur compound SCl₂ is a defensible example of S/Cl covalent bonding; S₂Cl₂ is also a real sulfur chloride. Draw only the dot/cross diagram matching the chosen formula.

Source Figure 4 places unknown X below calcium in Period 5/Group II, identifying **strontium**. X forms Sr(OH)₂ + H₂ with water and SrO with oxygen. The source Q4 asks for the **actual rock-salt UNIT CELL** of NaCl, not just a planar checkerboard. An fcc model now depicts eight chloride corners, six chloride face centres, twelve sodium edge centres and one body-centre sodium, giving 4 Na⁺ and 4 Cl⁻ per crystallographic unit cell. The 3D projection needs visual and crystal-structure QA and must not yet be marked fully approved. Source Q5 asks for three **structural** C₄H₈ alkene isomers: but-1-ene, but-2-ene and 2-methylpropene, rather than cis/trans alkene stereoisomers. The hydrogenation product is butane C₄H₁₀. Source Q6's observed series is Zn > Fe > Pb > Cu; the source table includes nominal \`PbSO₄(aq)\`/lead sulfate *solution*, despite PbSO₄ being only sparingly soluble. Source observations are retained but chemical viability flagged prominently; do not present the aqueous experiment as universally achievable. Lead exposure can cause nervous-system harm and renal or blood effects.

Marking is original SPARK provisional content, not an official CXC marking scheme. Every source figure and source reading needs independent transcription/graphic, scientist review and learner interaction testing; **all 72 historical drafts stay \`learnerFacing:false\`**. Current coverage: **72 of 167** expected questions, **12 complete draft 100-mark papers**, **1,200 marks**, **95 questions not yet transcribed**, **zero historically sourced questions published or approved**. Do not touch \`main\` or merge PR #48 without explicit user approval.
