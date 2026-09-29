export const SOCIAL_STUDIES_PAST_PAPER_ARCHIVE = Object.freeze([
  {year:2012,files:["Social Studies 2012 P1 (with answers)","Social Studies paper 02 MAY 2012"],paper1:true,paper2:true,paper032:false,format:"legacy"},
  {year:2013,files:["Social Studies paper 02 MAY 2013"],paper1:false,paper2:true,paper032:false,format:"legacy"},
  {year:2014,files:["Social Studies June 2014 (with answers)","Social Studies June 2014 P1"],paper1:true,paper2:true,paper032:false,format:"legacy"},
  {year:2015,files:["Social Studies June 2015 (with answers)"],paper1:true,paper2:true,paper032:false,format:"legacy"},
  {year:2016,files:["Social Studies paper 02 JAN 2016","CXC-CSEC-Social-Studies-2016-June-P1"],paper1:true,paper2:true,paper032:false,format:"legacy"},
  {year:2017,files:["Social Studies June 2017 P1 (with answers)","Social Studies Paper 02 MAY 2017","Social Studies paper 032 JAN 2017"],paper1:true,paper2:true,paper032:true,format:"legacy"},
  {year:2018,files:["Social Studies P1 June 2018","Social Studies Paper 02 JAN 2018","Social Studies Paper 032 JAN 2018"],paper1:true,paper2:true,paper032:true,format:"legacy"},
  {year:2019,files:["Social Studies Paper 02 JAN 2019","Social Studies Paper 032 JAN 2019","Social_Studies_Paper_02_MAY_2019"],paper1:false,paper2:true,paper032:true,format:"legacy"},
  {year:2020,files:["Social Studies Paper 032 JAN 2020"],paper1:false,paper2:false,paper032:true,format:"legacy"},
  {year:2021,files:["Social Studies Paper 02 MAY 2021"],paper1:false,paper2:true,paper032:false,format:"legacy"},
  {year:2022,files:["Social Studies 2022 P1"],paper1:true,paper2:false,paper032:false,format:"legacy"},
  {year:2023,files:["Social Studies paper 1 2023","CSEC Social Studies_June2023"],paper1:true,paper2:true,paper032:false,format:"legacy"},
  {year:2024,files:["CSEC Social Studies May 2024"],paper1:false,paper2:true,paper032:false,format:"legacy"},
  {year:2025,files:["Social Studies P1 2025"],paper1:true,paper2:false,paper032:false,format:"current"},
  {year:2026,files:["Social Studies P2 2026","Social studies May2026P2"],paper1:false,paper2:true,paper032:false,format:"current"},
]);

export const SOCIAL_STUDIES_FORMAT_ERAS = Object.freeze({
  legacy:Object.freeze({
    years:"2012–2024 in the supplied archive",
    purpose:"Use for recurring topics, command words, Caribbean scenarios, data-response styles and distractor design. Do not copy the retired optional-paper structure into current simulations.",
    features:Object.freeze([
      "Paper 02 used choice and optional-area structures that changed across the period.",
      "Explain, suggest, propose and reason questions consistently required developed responses.",
      "Family, governance, population, resources, development and regional integration recur across the historical papers.",
      "Tables, maps, family relationships, election data and research skills appear repeatedly as stimulus types.",
    ]),
  }),
  current:Object.freeze({
    years:"May–June 2025 examinations onward",
    purpose:"Use for live SPARK Paper 01 and Paper 02 structure.",
    features:Object.freeze([
      "Paper 01 contains 60 multiple-choice items in 1 hour 15 minutes.",
      "Paper 02 contains four compulsory structured questions and two compulsory essays.",
      "Paper 02 allows 2 hours 40 minutes and totals 100 marks.",
      "The two essays each carry 18 content marks and 4 marks for organisation and development.",
      "Structured questions award partial credit when a relevant response is present but not fully developed.",
    ]),
  }),
});

export const SOCIAL_STUDIES_COMMAND_WORDS = Object.freeze([
  {word:"state",profile:"KC",marking:"Credit the required fact, term, example or item. Do not demand an explanation unless the question asks for one."},
  {word:"name",profile:"KC",marking:"Credit a correct name or label. Accept recognised abbreviations where unambiguous."},
  {word:"identify",profile:"KC",marking:"Credit a correct item selected from knowledge, data, a map, table, family tree or scenario."},
  {word:"define",profile:"KC",marking:"Credit the essential meaning. For a two-mark definition, award one mark for each essential idea."},
  {word:"outline",profile:"KC/UK",marking:"Award a base mark for a relevant factor or point and the second mark when the feature or link is made clear."},
  {word:"describe",profile:"KC/UK",marking:"Credit accurate features and sufficient detail. A label alone does not earn full development marks."},
  {word:"explain",profile:"UK",marking:"Award the point, then award development when the response shows how, why, cause, consequence or a relevant link."},
  {word:"suggest",profile:"UK",marking:"Credit a feasible action. Award the development mark when the action is made specific enough to address the situation."},
  {word:"propose",profile:"UK",marking:"Treat as a feasible solution or course of action linked to the stated problem."},
  {word:"justify",profile:"UK",marking:"Credit the decision or proposal plus a relevant reason showing why it is appropriate."},
  {word:"compare",profile:"UK",marking:"Require linked similarities or differences between the named items rather than two unrelated descriptions."},
  {word:"distinguish",profile:"UK",marking:"Require a clear difference using both concepts."},
  {word:"discuss",profile:"UK",marking:"Credit developed points from the dimensions requested and relevant Caribbean evidence where appropriate."},
  {word:"evaluate",profile:"UK",marking:"Credit evidence-based judgement against stated or implied criteria. Do not award a bare opinion."},
]);

export const SOCIAL_STUDIES_RECURRING_PATTERNS = Object.freeze([
  {
    id:"family-structure-functions",
    sections:["A1"],
    themes:["family types","family unions","family functions","family roles","parenting","family social issues"],
    commonTasks:["define or identify","outline factors","suggest actions","explain likely success"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"government-elections",
    sections:["A2"],
    themes:["government systems","arms of government","first-past-the-post","voter participation","good governance","rights and responsibilities"],
    commonTasks:["state or identify","read election data","explain","suggest strategies"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"population-migration",
    sections:["B1"],
    themes:["population measures","migration","brain drain","employment","human-resource development"],
    commonTasks:["define","calculate or interpret data","explain factors","suggest actions"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"environment-development",
    sections:["B1","B2"],
    themes:["natural resources","climate change","environmental protection","development challenges","technology and infrastructure"],
    commonTasks:["state causes or consequences","explain impacts","suggest actions","explain likely success"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"regional-integration",
    sections:["B2"],
    themes:["CARICOM","CSME","OECS","CCJ","benefits","barriers","citizen and government action"],
    commonTasks:["identify institutions","explain benefits or barriers","suggest strategies","justify likely success"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"culture",
    sections:["A1"],
    themes:["cultural diversity","cultural transmission","Caribbean identity","global influence of Caribbean culture"],
    commonTasks:["define","state agents or examples","explain impact","suggest promotion or preservation strategies"],
    recommendedPracticeWeight:"high",
  },
  {
    id:"research-data",
    sections:["A1","A2","B1"],
    themes:["questionnaires","interviews","sampling","source reliability","tables","graphs","research ethics"],
    commonTasks:["select method","identify sources","justify method","interpret findings"],
    recommendedPracticeWeight:"medium",
  },
]);

export const SOCIAL_STUDIES_PAST_PAPER_AUDIT = Object.freeze({
  source:"https://cxcpastpapers.org/csec-social-studies-past-papers/",
  archiveFiles:26,
  years:Object.freeze(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE.map(item=>item.year)),
  currentSyllabus:"CXC 14/G/SYLL 22",
  principle:"Historical papers guide topic recurrence, Caribbean wording, stimulus design and command-word practice. Current SPARK simulations follow the examination structure effective from May–June 2025.",
});
