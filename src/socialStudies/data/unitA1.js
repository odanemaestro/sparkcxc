import { makeLesson, term, question, VISUAL_SOURCES } from "./courseHelpers";

export const UNIT_A1_LESSONS = Object.freeze([
  makeLesson({
    id:"a1-family-foundations",
    sectionId:"A1",
    title:"What makes a family?",
    objectiveCodes:["1","2"],
    objectives:[
      "Explain the family as a social institution and identify its main functions.",
      "Judge whether information about family life is accurate, relevant and trustworthy."
    ],
    introduction:"A family is more than a group of people living under one roof. It is a social institution built around relationships, care, responsibility and belonging. Caribbean families differ in size, structure and living arrangements, but they all meet important human needs. In this lesson, you will also learn how a Social Studies student checks information before accepting it as fact.",
    noteSections:[
      {
        title:"The family as a social institution",
        paragraphs:[
          "A social institution is an established part of society that helps meet important needs. The family is usually the first institution a child experiences. It is where many people first learn language, values, rules, customs and ways of relating to others.",
          "A household and a family are not always the same thing. A household refers to people who live together and share living arrangements. A family is based mainly on kinship, marriage, adoption or recognised caring relationships. One household can contain one family, several relatives, or even people who are not related."
        ],
        bullets:[
          "Procreation and reproduction: families help continue society from one generation to the next.",
          "Socialisation: children learn acceptable behaviour, values, language and customs.",
          "Economic support: members share money, food, housing and other resources.",
          "Emotional support: family members can provide love, security, advice and encouragement.",
          "Protection and care: families care for children, older relatives and members who need support."
        ]
      },
      {
        title:"Family functions can be shared",
        paragraphs:[
          "No single family member has to perform every function. In many Caribbean homes, grandparents help with childcare, an older sibling may help a younger child with homework, and several adults may contribute to household expenses.",
          "Governments and community institutions also support families. Schools assist with education, health centres support health and development, and social protection programmes may help households facing financial hardship. This does not replace the family, but it shows that families operate within a wider society."
        ]
      },
      {
        title:"Check the evidence before you believe it",
        paragraphs:[
          "Social Studies is not about repeating every claim you hear. A good student asks who produced the information, why it was produced, whether the evidence can be checked and whether it is relevant to the question being studied.",
          "For example, a national census or a carefully designed household survey is usually stronger evidence about family patterns than a viral social-media post based on one person's experience. Personal stories still matter, but they should not automatically be treated as proof of what happens in every Caribbean family."
        ]
      }
    ],
    examples:[
      "A grandmother in St Lucia cares for her grandchildren after school while their parents work. She is helping the family perform its care and socialisation functions.",
      "Three university students share a rented apartment in Kingston. They form one household, but they are not automatically one family.",
      "A post says that 'most Caribbean children live with grandparents' but gives no source. A careful student would look for census or survey evidence before accepting the claim."
    ],
    vocabulary:[
      term("family","A social group linked by kinship, marriage, adoption or recognised caring relationships."),
      term("household","A person or group of people who live together and share living arrangements."),
      term("socialisation","The process through which people learn the norms, values and behaviour expected in society."),
      term("kinship","Relationships based on blood, marriage, adoption or recognised family ties."),
      term("social institution","An organised and lasting pattern in society that helps meet important social needs."),
      term("reliable source","A source whose information can be checked and is supported by credible evidence.")
    ],
    keyPoints:[
      "Families perform social, economic, emotional, protective and reproductive functions.",
      "A household is a living arrangement; a family is a social relationship.",
      "Reliable Social Studies conclusions come from evidence, not assumptions."
    ],
    interactive:{
      type:"source-check",
      title:"Can you trust the source?",
      prompt:"A student is researching changing family patterns in the Caribbean. Which source would give the strongest evidence for a national trend?",
      items:[
        {label:"A national census table showing household composition",good:true,reason:"It uses systematic national data and clearly identifies what was measured."},
        {label:"One anonymous social-media comment",good:false,reason:"It may be useful as a personal viewpoint, but it cannot show a national pattern."},
        {label:"A friend's experience in one household",good:false,reason:"It is real experience, but one case is too limited to represent an entire country."}
      ]
    },
    practice:[
      question("Which is mainly a function of the family?",["Providing emotional support","Setting national interest rates","Running the court system","Issuing passports"],0,"Families commonly provide care, emotional security and socialisation."),
      question("Which source is most suitable for estimating national household patterns?",["A census report","One neighbour's story","A meme","A private text message"],0,"A census is designed to collect systematic population and household information.")
    ],
    exam:{
      marks:6,
      prompt:"Explain TWO functions of the family in Caribbean society and give ONE example of how another institution may assist the family with one of these functions.",
      guide:[
        "Name and explain two distinct family functions.",
        "Use a clear Caribbean example for at least one function.",
        "Identify another institution and show exactly how it assists the family."
      ]
    }
  }),

  makeLesson({
    id:"a1-family-types-unions",
    sectionId:"A1",
    title:"Family types, relationships, unions and marriage",
    objectiveCodes:["3a","3b"],
    objectives:[
      "Compare common family types, family relationships, unions and forms of marriage.",
      "Show respect and tolerance when discussing families that differ from your own."
    ],
    introduction:"Caribbean families do not all look the same. A student may live with two parents, one parent, grandparents, siblings, other relatives or a guardian. Social Studies requires you to understand these patterns without treating one structure as automatically superior to another.",
    noteSections:[
      {
        title:"Common family types",
        paragraphs:[
          "A nuclear family usually consists of parent or parents and their children. An extended family includes relatives beyond the parent-child unit, such as grandparents, aunts, uncles or cousins. A single-parent family has one parent carrying the main day-to-day parenting role. A sibling household is one in which siblings form the central household group, sometimes because parents live elsewhere.",
          "Family types can change over time. A child may spend part of childhood in an extended household and later live in a nuclear or single-parent household. Migration, employment, housing, relationship changes and caregiving needs can all influence family structure."
        ]
      },
      {
        title:"Unions and marriage",
        paragraphs:[
          "A legal marriage is a union recognised under the law. A common-law or consensual union involves partners living together in a marriage-like relationship without a formal marriage ceremony. A visiting relationship describes partners who maintain an intimate relationship but live in separate households.",
          "Marriage patterns also include monogamy, where a person has one spouse at a time, and forms of polygamy recognised in some societies outside the Caribbean. Social Studies asks students to understand the concepts accurately, even where a practice is uncommon or not legally recognised in their own country."
        ]
      },
      {
        title:"Respect matters",
        paragraphs:[
          "A family structure does not by itself tell you whether a household is loving, stable, financially secure or well organised. Strong families can exist in different forms. Likewise, any family type can face conflict or hardship.",
          "When discussing family life, use neutral language. Focus on responsibilities, relationships and outcomes rather than insulting labels or stereotypes."
        ]
      }
    ],
    examples:[
      "A child in Barbados lives with her mother and grandmother. The household has features of a single-parent and extended family.",
      "A Jamaican father works overseas while his children remain with relatives at home. Migration can change who performs daily family roles even though family ties remain.",
      "Two partners maintain separate homes but have a continuing relationship. This may be described as a visiting relationship."
    ],
    vocabulary:[
      term("nuclear family","A family unit centred on parent or parents and their children."),
      term("extended family","A family network that includes relatives beyond the parent-child unit."),
      term("single-parent family","A family in which one parent has the main day-to-day parenting responsibility."),
      term("sibling household","A household in which siblings form the central family group."),
      term("common-law union","Partners living together in a marriage-like relationship without formal legal marriage."),
      term("visiting relationship","Partners in a continuing relationship who maintain separate households."),
      term("monogamy","Marriage or partnership with one spouse at a time.")
    ],
    keyPoints:[
      "Caribbean family life includes several legitimate family structures and living arrangements.",
      "Family type describes structure, not the quality of relationships within the family.",
      "Social Studies discussion should be accurate, respectful and free from stereotypes."
    ],
    visual:VISUAL_SOURCES.familyTree,
    interactive:{
      type:"family-tree",
      title:"Read a family tree",
      prompt:"Use the family-tree visual to identify generations and kinship relationships. Then answer the relationship questions.",
      items:[
        {label:"A parent's parent is a...",answer:"grandparent"},
        {label:"Children who share at least one parent are...",answer:"siblings"},
        {label:"Your parent's sibling is your...",answer:"aunt or uncle"}
      ]
    },
    practice:[
      question("Which description best fits an extended family?",["Parents, children and other relatives forming a wider family network","Only one married couple","People who work in the same office","Students in the same class"],0,"An extended family includes relatives beyond the immediate parent-child unit."),
      question("Why should family type not be used by itself to judge family quality?",["Different structures can provide strong care and support","Only nuclear families have rules","Household size determines love","All extended families are wealthy"],0,"Structure does not automatically determine the quality of care, relationships or stability.")
    ],
    exam:{
      marks:8,
      prompt:"Compare a nuclear family and an extended family. Give TWO differences and explain ONE possible advantage of an extended family in a Caribbean context.",
      guide:[
        "State clear structural differences.",
        "Explain the advantage instead of simply naming it.",
        "Use a realistic Caribbean household example."
      ]
    }
  }),

  makeLesson({
    id:"a1-roles-changing-family",
    sectionId:"A1",
    title:"Family roles, responsibilities and changing expectations",
    objectiveCodes:["4","5a","5b"],
    objectives:[
      "Explain the roles and responsibilities of family members.",
      "Analyse why family roles change and the effects of these changes.",
      "Formulate a clear research question about changing family roles."
    ],
    introduction:"A role is the part a person is expected to play in a group, while a responsibility is a duty attached to that role. Caribbean family roles have changed as education, employment, technology, migration and ideas about gender have changed.",
    noteSections:[
      {
        title:"Roles are connected to responsibilities",
        paragraphs:[
          "Parents and guardians may provide income, guidance, discipline, emotional support and protection. Children and siblings also have responsibilities suited to their age, such as respecting household rules, helping with reasonable chores, caring for shared spaces and supporting one another.",
          "Healthy family life depends on cooperation. A role should not become an excuse for unfair treatment. Responsibilities can be shared according to time, ability, employment demands and the needs of the household."
        ]
      },
      {
        title:"Why roles change",
        paragraphs:[
          "Greater educational and employment opportunities for women have changed expectations about paid work and domestic work. More men also participate actively in childcare and household tasks. Labour migration may cause grandparents or other relatives to take on parenting duties. Technology can reduce the time required for some household tasks, while remote work can blur the boundary between employment and family life.",
          "Changes can bring benefits such as greater independence, shared income and more flexible responsibilities. They can also create role conflict when the demands of work, school and family compete for the same person's time."
        ]
      },
      {
        title:"Turn a broad topic into a research question",
        paragraphs:[
          "A good research question is focused, answerable and linked to evidence. 'Family roles' is too broad. A stronger question might be: 'How has full-time employment among parents affected the sharing of household chores in selected households in my community?'",
          "Avoid questions that assume the answer before research begins. Instead of asking 'Why are fathers refusing to help at home?', ask a neutral question such as 'How are household responsibilities shared among adults in selected families?'"
        ]
      }
    ],
    examples:[
      "In a Trinidad and Tobago household where both adults work shifts, cooking and school pickups may be shared according to work schedules.",
      "A grandparent in Guyana may take on daily caregiving while a parent works in another country.",
      "A student researching chores could compare responses from households instead of assuming that all homes divide work in the same way."
    ],
    vocabulary:[
      term("role","The behaviour or function expected from a person who occupies a particular status."),
      term("responsibility","A duty or obligation connected to a role."),
      term("role conflict","A situation in which the demands of two or more roles compete."),
      term("gender role","A social expectation about behaviour associated with gender."),
      term("research question","A focused question that guides an investigation and can be answered with evidence.")
    ],
    keyPoints:[
      "Roles describe expected behaviour; responsibilities are the duties attached to those roles.",
      "Family roles change with economic, technological, demographic and social changes.",
      "A research question should be neutral, focused and answerable."
    ],
    interactive:{
      type:"research-question",
      title:"Build a better research question",
      prompt:"Choose the strongest question for a small school research project on changing family roles.",
      items:[
        {label:"How are household chores shared among adults in 20 selected households in my community?",good:true,reason:"It identifies what will be studied, a manageable group and a neutral focus."},
        {label:"Why are modern families bad at sharing chores?",good:false,reason:"It assumes a negative conclusion before evidence is collected."},
        {label:"Families?",good:false,reason:"It is too broad to guide a useful investigation."}
      ]
    },
    practice:[
      question("Which situation is the best example of role conflict?",["A parent must attend a work meeting at the same time as a child's school event","A child washes dishes after dinner","Two siblings watch television","A family celebrates a birthday"],0,"Role conflict occurs when two role demands compete at the same time."),
      question("Which research question is most neutral?",["How are childcare duties shared in selected households?","Why do lazy parents avoid childcare?","Why is one family type best?","Why are modern families worse?"],0,"A neutral question does not build a judgement into the wording.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE factors that have contributed to changing family roles in the Caribbean and describe ONE possible effect of these changes on family life.",
      guide:[
        "Use three distinct factors such as education, employment, migration or technology.",
        "Show the link between each factor and the role change.",
        "Explain one effect, positive or negative, with a concrete example."
      ]
    }
  }),

  makeLesson({
    id:"a1-parenthood-research",
    sectionId:"A1",
    title:"Preparing for parenthood and researching parenting",
    objectiveCodes:["6","7","8"],
    objectives:[
      "Explain physical, economic, emotional and psychological readiness for parenthood.",
      "Design fair and useful questionnaire items.",
      "Evaluate characteristics of effective parenting."
    ],
    introduction:"Parenthood affects the parent, child, household and wider community. Responsible preparation means thinking beyond the idea of simply wanting a child. It involves health, money, emotional maturity, support systems and the ability to make long-term decisions.",
    noteSections:[
      {
        title:"Four areas of readiness",
        paragraphs:[
          "Physical readiness includes health, access to health care and the ability to meet pregnancy and childcare needs. Economic readiness means planning for food, housing, clothing, health care, education and unexpected costs. Emotional readiness includes patience, empathy and the ability to cope with stress. Psychological readiness includes maturity, realistic expectations and willingness to accept long-term responsibility.",
          "No family is perfectly prepared for every challenge. The main idea is responsible decision-making and planning."
        ]
      },
      {
        title:"Effective parenting",
        paragraphs:[
          "Effective parenting combines warmth with guidance. Children need affection and security, but they also need boundaries, consistent rules and age-appropriate consequences. Communication matters because children are more likely to understand expectations when adults explain them clearly.",
          "Other useful skills include budgeting, conflict resolution, knowledge of nutrition, time management and recognising when professional or community support is needed."
        ]
      },
      {
        title:"Questionnaires should collect useful evidence",
        paragraphs:[
          "A questionnaire should use clear wording, avoid leading questions and collect only information relevant to the research question. Closed questions are easy to count and graph. Open questions allow respondents to explain their views in more depth.",
          "Respect privacy. Do not ask for a person's name when the research does not require it, and avoid questions that could embarrass or endanger respondents."
        ]
      }
    ],
    examples:[
      "A young couple creates a monthly budget before deciding whether they can manage childcare costs.",
      "A parent in Antigua listens to a child's explanation, sets a clear consequence and later discusses how to avoid the same problem.",
      "A questionnaire asks, 'How often do adults in your household discuss schoolwork with you?' instead of 'Don't good parents always help with homework?'"
    ],
    vocabulary:[
      term("physical readiness","Health-related preparation for pregnancy, childbirth and childcare."),
      term("economic readiness","Ability to plan and provide for the financial needs connected to raising a child."),
      term("emotional readiness","Ability to manage feelings, stress and relationships in a caring way."),
      term("closed question","A questionnaire item with a limited set of response choices."),
      term("open question","A question that allows the respondent to answer in their own words."),
      term("leading question","A question worded in a way that pushes respondents toward a particular answer.")
    ],
    keyPoints:[
      "Responsible parenthood involves physical, economic, emotional and psychological preparation.",
      "Effective parenting combines care, communication, guidance and practical management skills.",
      "Good questionnaires are clear, neutral, relevant and respectful."
    ],
    interactive:{
      type:"questionnaire-builder",
      title:"Fix the questionnaire",
      prompt:"Select the questionnaire item that would produce the fairest evidence about parent-child communication.",
      items:[
        {label:"How often do you discuss important decisions with a parent or guardian? Never / Sometimes / Often / Very often",good:true,reason:"It is neutral, specific and gives usable response categories."},
        {label:"Your parents communicate well with you, don't they?",good:false,reason:"This wording encourages agreement."},
        {label:"Tell me everything private about your family.",good:false,reason:"It is too broad and unnecessarily intrusive."}
      ]
    },
    practice:[
      question("Which is an example of economic preparation for parenthood?",["Preparing a realistic household budget","Choosing a baby's favourite colour","Avoiding all health checks","Ignoring childcare costs"],0,"Economic readiness includes planning for regular and unexpected expenses."),
      question("Why should a questionnaire avoid leading questions?",["They may bias the respondent's answer","They always require graphs","They are too short","They cannot use words"],0,"Leading wording can distort the evidence collected.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE characteristics of effective parenting and design ONE suitable questionnaire item to investigate parenting practices among selected households.",
      guide:[
        "Explain each parenting characteristic, not just list it.",
        "The questionnaire item should be neutral and relevant.",
        "State suitable response options if using a closed question."
      ]
    }
  }),

  makeLesson({
    id:"a1-family-social-issues",
    sectionId:"A1",
    title:"Social issues that affect Caribbean families",
    objectiveCodes:["9a","9b","9c","9d"],
    objectives:[
      "Explain causes and effects of selected social issues affecting families.",
      "Propose practical strategies for addressing social issues.",
      "Identify agencies and community responses.",
      "Design an interview schedule for collecting evidence."
    ],
    introduction:"Families can be affected by poverty, substance misuse, child abuse, domestic violence, juvenile offending, trafficking, neglect, health challenges and other social issues. The purpose of Social Studies is not to blame families. It is to understand causes, effects and realistic responses.",
    noteSections:[
      {
        title:"Think in chains of cause and effect",
        paragraphs:[
          "A social issue rarely has one cause. For example, juvenile offending may be connected to weak supervision, peer pressure, school disengagement, poverty, substance misuse or community violence. These factors can interact.",
          "Effects can also spread. Substance misuse may affect health, household income, relationships, school attendance and community safety. Strong answers show these connections rather than writing one-word lists."
        ]
      },
      {
        title:"Strategies work at different levels",
        paragraphs:[
          "Individual and family strategies include counselling, communication, budgeting, supervision and seeking help early. Community strategies include youth programmes, shelters, mentorship, rehabilitation and public education. Government and non-governmental agencies may provide legal protection, health care, social work, policing, education and specialised support.",
          "A good solution matches the cause. If school disengagement is part of the problem, an education or mentorship response may help. If a person faces violence, immediate safety and legal protection are more urgent."
        ]
      },
      {
        title:"Interview schedules",
        paragraphs:[
          "An interview schedule is a planned list of questions used to guide an interview. Questions should move logically from simple background questions to the main issue. Sensitive questions should be handled carefully and only when ethically appropriate.",
          "For school research, students should avoid investigating situations that could place a participant at risk. It is usually safer to interview professionals, community workers or adults about services and general patterns rather than asking vulnerable persons to describe traumatic experiences."
        ]
      }
    ],
    examples:[
      "A youth club in a Jamaican community combines homework support, sports and mentorship to reduce unsupervised time after school.",
      "A family affected by substance misuse may need both treatment for the individual and counselling or financial support for the household.",
      "A student investigating elder care could interview a community nurse about common needs rather than asking an older person to reveal private medical details."
    ],
    vocabulary:[
      term("social issue","A problem that affects individuals or groups and has wider consequences for society."),
      term("juvenile delinquency","Illegal or seriously antisocial behaviour by a young person."),
      term("domestic violence","Abusive behaviour within an intimate or family relationship."),
      term("trafficking in persons","Recruiting, transporting or controlling people for exploitation."),
      term("rehabilitation","Support aimed at helping a person recover and return to healthy social functioning."),
      term("interview schedule","A prepared set of questions used to guide an interview.")
    ],
    keyPoints:[
      "Social issues usually have several connected causes and effects.",
      "Effective strategies must match the causes and involve the right level of support.",
      "Research on sensitive issues must protect privacy, dignity and safety."
    ],
    interactive:{
      type:"case-choice",
      title:"Match the response to the problem",
      prompt:"A 15-year-old has stopped attending school, spends most days unsupervised and has begun getting into minor trouble. Which first response is most constructive?",
      items:[
        {label:"Identify why attendance has fallen and connect the student with family, school and youth support",good:true,reason:"It looks for causes and coordinates support rather than treating the behaviour in isolation."},
        {label:"Publicly shame the student online",good:false,reason:"Shaming does not address the causes and can make the situation worse."},
        {label:"Ignore the situation until it becomes serious",good:false,reason:"Early support is usually more useful than waiting for problems to grow."}
      ]
    },
    practice:[
      question("Which response best demonstrates a cause-and-effect explanation?",["Unemployment may reduce household income, which can increase financial stress","Poverty is bad","Crime exists","Families have problems"],0,"A strong explanation shows how one factor produces another effect."),
      question("What is the main purpose of an interview schedule?",["To guide an interview with planned questions","To calculate a birth rate","To register voters","To draw a map"],0,"An interview schedule keeps questions focused and consistent.")
    ],
    exam:{
      marks:12,
      prompt:"Choose ONE social issue affecting Caribbean families. Explain TWO causes, TWO effects and TWO strategies that could help address the issue.",
      guide:[
        "Use connected explanations rather than isolated words.",
        "Make each strategy realistic and link it to a cause or effect.",
        "Keep the tone respectful and avoid blaming victims."
      ]
    }
  }),

  makeLesson({
    id:"a1-family-law",
    sectionId:"A1",
    title:"Why families need legal protection",
    objectiveCodes:["10"],
    objectives:[
      "Explain why laws are needed in family-related situations.",
      "Apply the idea of rights and responsibilities to inheritance, care, separation, divorce and violence."
    ],
    introduction:"Family relationships are personal, but some disagreements affect rights, safety, property and the welfare of children. Laws provide rules and procedures so that serious disputes do not depend only on whoever has more power in the household.",
    noteSections:[
      {
        title:"What family law tries to protect",
        paragraphs:[
          "Family-related laws can regulate care and maintenance of children, inheritance, marriage breakdown, legal separation, divorce, adoption and protection from violence. Exact laws differ from one Caribbean country to another, so students should distinguish the general purpose of legal protection from the specific wording of a national law.",
          "A central idea is fairness. Children should not lose basic rights because adults disagree. A person facing abuse should have access to protection. Property and inheritance disputes need recognised procedures."
        ]
      },
      {
        title:"Law and responsibility",
        paragraphs:[
          "Rights are connected to responsibilities. Parents and guardians have responsibilities toward children. Courts can make orders about maintenance, care or protection when voluntary arrangements fail.",
          "The law cannot guarantee that every family relationship will be happy. It can, however, set minimum standards, provide remedies and create a formal process for resolving serious disputes."
        ]
      }
    ],
    examples:[
      "After parents separate, a court may help settle maintenance or care arrangements when adults cannot agree.",
      "Inheritance rules provide a legal process for distributing property after a person dies.",
      "Protective orders and related legal measures can help a person facing domestic violence, although procedures differ by country."
    ],
    vocabulary:[
      term("inheritance","Property, money or rights passed to others after a person's death."),
      term("maintenance","Financial support legally required for a person such as a child or dependant."),
      term("legal separation","A legally recognised arrangement in which spouses live apart while remaining married."),
      term("divorce","The legal ending of a marriage."),
      term("protective order","A court order intended to protect a person from specified harmful conduct.")
    ],
    keyPoints:[
      "Family law protects rights, safety and fair procedures.",
      "Specific family laws differ across Caribbean jurisdictions.",
      "Legal remedies are especially important when informal agreement fails."
    ],
    interactive:{
      type:"case-choice",
      title:"Which need does the law address?",
      prompt:"A parent refuses to contribute to a child's basic expenses after separation. Which legal issue is most directly involved?",
      items:[
        {label:"Maintenance and child support",good:true,reason:"The dispute concerns financial responsibility for a child."},
        {label:"Electoral registration",good:false,reason:"That belongs to elections, not family law."},
        {label:"Trade policy",good:false,reason:"Trade policy does not resolve a child's maintenance needs."}
      ]
    },
    practice:[
      question("Why are family laws important?",["They provide enforceable rules and remedies when rights or safety are at risk","They remove every family disagreement","They make all families identical","They replace parenting"],0,"Law sets standards and procedures; it cannot remove every personal conflict."),
      question("Which issue is most closely connected to inheritance law?",["Distribution of a deceased person's property","Selection of a political candidate","School timetables","Weather forecasting"],0,"Inheritance law concerns property and rights after death.")
    ],
    exam:{
      marks:8,
      prompt:"Explain TWO reasons why laws are needed to protect family members and illustrate each reason with a family situation.",
      guide:[
        "Identify two different purposes, such as safety, child welfare or fair property arrangements.",
        "Explain how the law helps in each situation.",
        "Do not assume the exact legal procedure is identical in every Caribbean territory."
      ]
    }
  }),

  makeLesson({
    id:"a1-cultural-diversity",
    sectionId:"A1",
    title:"How the Caribbean became culturally diverse",
    objectiveCodes:["11"],
    objectives:[
      "Explain why Caribbean societies are culturally diverse.",
      "Recognise how history, migration and interaction shaped Caribbean identity."
    ],
    introduction:"Caribbean culture is not one single tradition. It developed through the interaction of Indigenous peoples, Africans, Europeans, Indians, Chinese, Middle Eastern communities and later migrants, along with ideas arriving from the wider world. This mixture is visible in language, religion, food, music, festivals, family life and everyday customs.",
    noteSections:[
      {
        title:"Historical roots",
        paragraphs:[
          "Colonisation, enslavement, indentureship, trade and migration brought different peoples into the region under very unequal conditions. Despite oppression, communities preserved and adapted languages, beliefs, music, foodways, craft traditions and social practices.",
          "Over time, cultural forms blended. Caribbean culture therefore includes retention, adaptation and innovation. A food, rhythm or festival may have roots in more than one tradition."
        ]
      },
      {
        title:"Diversity within and between territories",
        paragraphs:[
          "Each Caribbean territory has its own mixture and history. Jamaica, Trinidad and Tobago, Guyana, Belize, Barbados and the Eastern Caribbean do not have identical cultural patterns. Even within one country, communities may differ by religion, ethnicity, language, class, location or migration history.",
          "Diversity can strengthen a society by widening its knowledge, creativity and perspectives. It can also create tension when prejudice or discrimination develops. Respect does not require everyone to practise the same customs; it requires recognising the dignity and rights of others."
        ]
      }
    ],
    examples:[
      "Trinidad and Tobago's Divali celebrations reflect the influence of Indo-Caribbean religious and cultural traditions.",
      "Reggae, calypso, soca, chutney and dancehall developed in different social and cultural settings but all contribute to the region's musical identity.",
      "Creole languages and dialects often show the historical mixing of African, European and other linguistic influences."
    ],
    vocabulary:[
      term("culture","The shared ways of life, beliefs, customs, values and creative expressions of a group."),
      term("cultural diversity","The presence of different cultural traditions and identities within a society or region."),
      term("cultural retention","The preservation of cultural practices across generations."),
      term("cultural fusion","The blending of elements from different cultural traditions."),
      term("prejudice","A judgement or attitude formed about a group without fair consideration of evidence.")
    ],
    keyPoints:[
      "Caribbean culture developed through history, migration, resistance, adaptation and interaction.",
      "The region is culturally diverse both between and within countries.",
      "Diversity can be a source of creativity and strength when supported by respect and equal treatment."
    ],
    interactive:{
      type:"sorter",
      title:"Culture: retention, fusion or innovation?",
      prompt:"Classify each example by the idea it illustrates best.",
      categories:["Retention","Fusion","Innovation"],
      items:[
        {label:"A community continues a traditional religious festival across generations",category:"Retention"},
        {label:"A musical style combines rhythmic and instrumental influences from several traditions",category:"Fusion"},
        {label:"Young artists create a new digital form of Caribbean storytelling",category:"Innovation"}
      ]
    },
    practice:[
      question("Which best explains Caribbean cultural diversity?",["Long-term interaction among peoples shaped by migration, colonisation and adaptation","One culture replaced every other culture","All territories had the same history","Culture stopped changing after independence"],0,"Caribbean cultural diversity reflects several historical movements and continuing interaction."),
      question("What is cultural fusion?",["Blending elements from different cultural traditions","Refusing all cultural change","A population census","A voting system"],0,"Fusion occurs when cultural elements combine and produce shared or new forms.")
    ],
    exam:{
      marks:10,
      prompt:"Explain THREE historical or social factors that have contributed to cultural diversity in the Caribbean and give ONE example of cultural fusion.",
      guide:[
        "Use factors such as migration, enslavement, indentureship, colonisation or modern communication.",
        "Explain the effect of each factor on culture.",
        "Choose a clear example where influences have combined."
      ]
    }
  }),

  makeLesson({
    id:"a1-cultural-transmission",
    sectionId:"A1",
    title:"Passing culture from one generation to the next",
    objectiveCodes:["12"],
    objectives:[
      "Explain how cultural heritage is transmitted, preserved and changed.",
      "Evaluate the roles of family, school, religion, media and community organisations."
    ],
    introduction:"Culture survives because people teach, practise, record and adapt it. A recipe learned from a grandparent, a national festival, a school heritage project, a church tradition, a dance group and a social-media creator can all transmit culture in different ways.",
    noteSections:[
      {
        title:"Agents of cultural transmission",
        paragraphs:[
          "The family is often the first place where language, food, beliefs, manners and celebrations are learned. Schools teach national history, literature and civic traditions. Religious institutions pass on beliefs and rituals. Community groups teach music, dance, craft and oral traditions.",
          "Media and technology have become powerful cultural agents. Television, streaming, podcasts and social media can expose young people to local traditions and to global influences at the same time."
        ]
      },
      {
        title:"Preservation does not mean freezing culture",
        paragraphs:[
          "A living culture changes. A traditional festival may use new technology, a folk story may become an animation, or a traditional rhythm may be sampled in a new song. Change does not automatically mean cultural loss.",
          "The key question is whether people understand, respect and can access the cultural heritage being adapted. Documentation, museums, archives, cultural education and support for artists can help preserve knowledge while allowing creativity."
        ]
      }
    ],
    examples:[
      "A school in Grenada invites community elders to explain traditional stories and then students create a digital archive.",
      "A steelpan group teaches younger players while using online videos to reach a wider audience.",
      "A family prepares a traditional dish for a festival and explains the history of the ingredients to children."
    ],
    vocabulary:[
      term("cultural transmission","The passing of cultural knowledge and practices from one person or generation to another."),
      term("heritage","Cultural traditions, places, knowledge and expressions inherited from the past."),
      term("oral tradition","Knowledge, stories or history passed mainly through speaking and performance."),
      term("preservation","Actions taken to protect cultural knowledge, objects or practices from being lost."),
      term("adaptation","Changing a cultural practice or expression to suit new conditions.")
    ],
    keyPoints:[
      "Family, school, religion, community organisations and media all transmit culture.",
      "Technology can preserve culture and also introduce powerful outside influences.",
      "Cultural preservation can include careful adaptation rather than simple repetition."
    ],
    interactive:{
      type:"case-choice",
      title:"Protect it without freezing it",
      prompt:"A community dance is becoming less popular among teenagers. Which response best combines preservation and adaptation?",
      items:[
        {label:"Teach the traditional form and let young dancers create respectful new performances using its core techniques",good:true,reason:"Students learn the original practice while also keeping it relevant."},
        {label:"Stop young people from changing anything at all",good:false,reason:"Rigid control can make transmission harder and ignores that living culture changes."},
        {label:"Remove the history and use only the name",good:false,reason:"That risks losing the meaning of the tradition."}
      ]
    },
    practice:[
      question("Which is an agent of cultural transmission?",["Family","Rainfall","Currency exchange rate","A mountain"],0,"Families pass on language, values, customs and traditions."),
      question("Why can technology both help and challenge cultural preservation?",["It can document local culture while also increasing exposure to outside influences","It prevents all cultural change","It removes the need for families","It makes history irrelevant"],0,"Digital media can preserve and spread local traditions while also bringing strong global influences.")
    ],
    exam:{
      marks:8,
      prompt:"Explain TWO ways culture is transmitted in Caribbean society and discuss ONE way technology can support cultural preservation.",
      guide:[
        "Name the agent and explain how transmission occurs.",
        "Give a Caribbean example.",
        "For technology, show a clear preservation use such as recording, archiving or wider access."
      ]
    }
  }),

  makeLesson({
    id:"a1-caribbean-culture-world",
    sectionId:"A1",
    title:"Caribbean culture on the world stage",
    objectiveCodes:["13"],
    objectives:[
      "Explain how Caribbean culture reaches international audiences.",
      "Assess benefits and possible challenges of the global spread and commercial use of culture."
    ],
    introduction:"Caribbean music, food, sport, festivals, language and creative industries have travelled far beyond the region. Global visibility can create pride and economic opportunity, but it also raises questions about ownership, fair payment, stereotyping and whether cultural meaning is being respected.",
    noteSections:[
      {
        title:"How culture travels",
        paragraphs:[
          "Migration creates Caribbean communities abroad that continue and adapt regional traditions. Tourism introduces visitors to local food, music, festivals and heritage. International sport and entertainment give Caribbean performers and athletes large audiences. Digital media allows a song, dance, recipe or phrase to circulate globally within hours.",
          "The Caribbean diaspora also sends ideas back to the region. Cultural exchange therefore works in more than one direction."
        ]
      },
      {
        title:"Benefits and challenges",
        paragraphs:[
          "Global demand can support musicians, designers, chefs, filmmakers, craft producers and tourism businesses. It can strengthen recognition of the region and encourage young people to value local creativity.",
          "Commercialisation can become a problem if outsiders profit from cultural expressions without fair credit or payment, or if complex traditions are reduced to stereotypes for visitors. A strong cultural industry therefore needs creativity, education, intellectual-property awareness and fair business practices."
        ]
      }
    ],
    examples:[
      "Caribbean carnival traditions are celebrated in diaspora communities in cities such as Toronto and London.",
      "Reggae and dancehall have influenced music outside Jamaica, while soca and calypso have international audiences.",
      "A craft producer who explains the history of a design and protects the brand can add value while preserving cultural meaning."
    ],
    vocabulary:[
      term("diaspora","People from a country or region who live outside it while maintaining connections to their place of origin."),
      term("commercialisation","Turning a product, practice or idea into something sold for profit."),
      term("creative industries","Economic activities based on culture, creativity, design, media, performance and intellectual property."),
      term("cultural appropriation","Use of cultural elements in ways that may ignore their meaning, context or the people who created them."),
      term("cultural export","A cultural product or expression that reaches audiences outside its place of origin.")
    ],
    keyPoints:[
      "Migration, tourism, sport, entertainment and digital media help Caribbean culture travel globally.",
      "Global visibility can create economic opportunity and cultural pride.",
      "Fair credit, cultural meaning and benefit to creators matter when culture is commercialised."
    ],
    interactive:{
      type:"case-choice",
      title:"Who benefits from culture?",
      prompt:"A foreign company copies a Caribbean craft design, sells it internationally and gives no credit or payment to the community that created it. What is the main concern?",
      items:[
        {label:"Unfair commercial use and lack of recognition for cultural creators",good:true,reason:"The issue is not cultural exchange itself, but unequal benefit and lack of credit."},
        {label:"The design travelled internationally",good:false,reason:"International reach can be positive when creators are respected and benefit fairly."},
        {label:"The product was sold online",good:false,reason:"The platform is not the main issue; fairness and cultural ownership are."}
      ]
    },
    practice:[
      question("Which factor has helped Caribbean culture reach global audiences quickly?",["Digital media","Reduced communication","Complete isolation","Lower literacy"],0,"Digital platforms allow cultural content to circulate internationally very quickly."),
      question("What is one potential benefit of cultural commercialisation?",["Income and employment for creators","Automatic loss of all traditions","Removal of cultural identity","End of tourism"],0,"Commercial demand can create jobs and income when creators benefit fairly.")
    ],
    exam:{
      marks:10,
      prompt:"Discuss TWO benefits and TWO challenges that may result from the global spread of Caribbean culture.",
      guide:[
        "Use balanced analysis, not a one-sided answer.",
        "Explain economic and cultural effects.",
        "Support points with examples from music, festivals, food, sport, craft or media."
      ]
    }
  })
]);
