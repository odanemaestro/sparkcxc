const freeze=value=>Object.freeze(value);

const listScheme=(maxPoints,points,profile="KC")=>freeze({
  type:"list",maxPoints,maxMarks:maxPoints,marksPerPoint:1,profile,points:freeze(points),
});
const developedScheme=(maxPoints,points,profile="UK")=>freeze({
  type:"developed_points",maxPoints,maxMarks:maxPoints*2,profile,points:freeze(points),
});
const definitionScheme=(groups,maxMarks=2,profile="KC")=>freeze({
  type:"definition",groups:freeze(groups),maxMarks,profile,
});
const criteriaScheme=(criteria,maxMarks,profile="KC")=>freeze({
  type:"criteria",criteria:freeze(criteria),maxMarks,profile,
});
const item=(id,sectionId,lessonId,command,prompt,marks,marking,modelPoints)=>freeze({
  id,sectionId,lessonId,command,prompt,marks,marking,modelPoints:freeze(modelPoints || []),
});

export const SOCIAL_STUDIES_SHORT_ANSWER_EXPANSION_2=freeze([
  item("ss-sa-a1-26","A1","a1-parenthood-research","distinguish",
    "Distinguish between a need and a want when a family is making financial decisions.",
    2,
    criteriaScheme([
      {id:"need",label:"A need is necessary for basic living or well-being",anyPhrases:["necessary for living","essential for living","basic necessity","needed for survival","needed for well-being","needed for wellbeing"],marks:1},
      {id:"want",label:"A want is desirable but not essential",anyPhrases:["not essential","not necessary","desirable item","would like to have","can live without"],marks:1},
    ],2),
    ["A need is essential for living or well-being.","A want is desirable but not essential."]),

  item("ss-sa-a1-27","A1","a1-parenthood-research","explain",
    "Explain TWO benefits of preparing and following a household budget.",
    4,
    developedScheme(2,[
      {id:"control",label:"A budget helps control household spending",concepts:["budgeting"],developmentConcepts:["improved_money_control","expense_tracking"],allowGeneralDevelopment:true},
      {id:"needs",label:"A budget helps families prioritise needs",concepts:["budgeting","prioritise_needs"],developmentConcepts:["family_needs","needs_vs_wants"],allowGeneralDevelopment:true},
      {id:"saving",label:"A budget makes planned saving easier",concepts:["budgeting","savings_plan"],developmentConcepts:["reduced_financial_stress","improved_money_control"],allowGeneralDevelopment:true},
      {id:"debt",label:"A budget may reduce unnecessary borrowing or debt",concepts:["budgeting"],developmentPhrases:["avoid debt","reduce debt","borrow less","avoid unnecessary borrowing"],allowGeneralDevelopment:true},
    ]),
    ["Control spending","Prioritise needs","Support saving","Reduce unnecessary borrowing"]),

  item("ss-sa-a1-28","A1","a1-family-social-issues","explain",
    "Explain TWO ways unemployment of a parent may affect a family.",
    4,
    developedScheme(2,[
      {id:"income",label:"Household income may fall",concepts:["unemployment","economic_pressure"],developmentConcepts:["financial_conflict","family_needs"],allowGeneralDevelopment:true},
      {id:"stress",label:"Financial stress may increase family conflict",concepts:["unemployment","financial_conflict"],developmentConcepts:["family_conflict","reduced_financial_stress"],allowGeneralDevelopment:true},
      {id:"needs",label:"The family may struggle to meet basic needs",concepts:["unemployment","family_needs"],developmentConcepts:["economic_pressure"],allowGeneralDevelopment:true},
      {id:"roles",label:"Family roles may change as members seek income or share duties",concepts:["unemployment","role_sharing"],developmentConcepts:["changing_gender_norms","economic_pressure"],allowGeneralDevelopment:true},
    ]),
    ["Reduced income","Financial stress and conflict","Difficulty meeting needs","Changing family roles"]),

  item("ss-sa-a1-29","A1","a1-parenthood-research","suggest",
    "Suggest TWO practices families could use to manage limited household resources responsibly.",
    4,
    developedScheme(2,[
      {id:"budget",label:"Prepare and follow a budget",concepts:["budgeting"],developmentConcepts:["improved_money_control","prioritise_needs"],allowGeneralDevelopment:true},
      {id:"needs",label:"Prioritise needs before wants",concepts:["prioritise_needs","needs_vs_wants"],developmentConcepts:["family_needs","improved_money_control"],allowGeneralDevelopment:true},
      {id:"save",label:"Save part of household income",concepts:["savings_plan"],developmentConcepts:["reduced_financial_stress","improved_money_control"],allowGeneralDevelopment:true},
      {id:"compare",label:"Compare prices and reduce unnecessary spending",phrases:["compare prices","shop around","avoid unnecessary spending","cut unnecessary expenses"],developmentConcepts:["improved_money_control"],allowGeneralDevelopment:true},
    ]),
    ["Budget","Prioritise needs","Save","Compare prices and reduce unnecessary spending"]),

  item("ss-sa-a1-30","A1","a1-family-foundations","identify",
    "Identify THREE ways a family may provide emotional support to its members.",
    3,
    listScheme(3,[
      {id:"listen",label:"Listening to family members",concepts:["active_listening"],phrases:["listen to each other"]},
      {id:"care",label:"Showing care and affection",concepts:["family_emotional_support"],phrases:["show affection","show love","give emotional support"]},
      {id:"encourage",label:"Giving encouragement",phrases:["encourage family members","give encouragement","offer reassurance"]},
      {id:"time",label:"Spending supportive time together",concepts:["family_recreation"],phrases:["spend time together"]},
      {id:"counsel",label:"Giving advice or guidance",concepts:["parental_guidance"],phrases:["give advice"]},
    ]),
    ["Listen","Show care and affection","Encourage","Spend time together","Give guidance"]),

  item("ss-sa-a1-31","A1","a1-family-types-unions","explain",
    "Explain TWO ways an extended family may support a household.",
    4,
    developedScheme(2,[
      {id:"care",label:"Relatives may help with childcare or elder care",concepts:["family_support_network"],developmentPhrases:["child care","childcare","care for children","care for elderly","elder care"],allowGeneralDevelopment:true},
      {id:"money",label:"Relatives may provide financial or material support",concepts:["family_support_network","family_economic_support"],developmentConcepts:["family_needs"],allowGeneralDevelopment:true},
      {id:"advice",label:"Relatives may provide guidance and emotional support",concepts:["family_support_network","family_emotional_support"],developmentConcepts:["parental_guidance"],allowGeneralDevelopment:true},
      {id:"duties",label:"Relatives may share household duties",concepts:["family_support_network","role_sharing"],developmentConcepts:["cooperation"],allowGeneralDevelopment:true},
    ]),
    ["Care support","Financial support","Guidance and emotional support","Shared duties"]),

  item("ss-sa-a1-32","A1","a1-family-types-unions","distinguish",
    "Distinguish between a nuclear family and an extended family.",
    2,
    criteriaScheme([
      {id:"nuclear",label:"A nuclear family centres on parent or parents and their children",anyConcepts:["nuclear_family"],anyPhrases:["parents and children","parent and children"],marks:1},
      {id:"extended",label:"An extended family includes relatives beyond parents and children",anyConcepts:["extended_family"],anyPhrases:["includes grandparents","includes other relatives","relatives beyond parents and children"],marks:1},
    ],2),
    ["Nuclear family includes parent or parents and children.","Extended family includes other relatives such as grandparents, aunts or uncles."]),

  item("ss-sa-a1-33","A1","a1-roles-changing-family","explain",
    "Explain TWO ways migration may change family relationships or responsibilities.",
    4,
    developedScheme(2,[
      {id:"separation",label:"Migration may separate family members",concepts:["family_separation","migration_family_change"],developmentConcepts:["family_emotional_support"],allowGeneralDevelopment:true},
      {id:"care",label:"Other relatives may take over childcare or household duties",concepts:["migration_family_change","family_support_network"],developmentConcepts:["role_sharing"],allowGeneralDevelopment:true},
      {id:"money",label:"Migrants may send remittances to support the household",concepts:["remittance_benefit"],developmentConcepts:["family_economic_support"],allowGeneralDevelopment:true},
      {id:"decisions",label:"Long-distance families may need new ways to make decisions and communicate",concepts:["migration_family_change","clear_communication"],developmentConcepts:["family_decision_making"],allowGeneralDevelopment:true},
    ]),
    ["Family separation","Relatives assume duties","Remittances","Changed communication and decision-making"]),

  item("ss-sa-a1-34","A1","a1-cultural-diversity","identify",
    "Identify THREE factors that may cause culture to change over time.",
    3,
    listScheme(3,[
      {id:"migration",label:"Migration",concepts:["migration_culture"]},
      {id:"media",label:"Mass media and digital media",concepts:["media_agent"]},
      {id:"technology",label:"Technology",concepts:["technology_remote_work"],phrases:["new technology","technology"]},
      {id:"tourism",label:"Tourism and contact with visitors",concepts:["cultural_tourism"]},
      {id:"global",label:"Contact with other cultures or global influences",concepts:["global_cultural_reach"],phrases:["globalisation","globalization","contact with other cultures"]},
    ]),
    ["Migration","Media","Technology","Tourism","Contact with other cultures"]),

  item("ss-sa-a1-35","A1","a1-cultural-transmission","explain",
    "Explain TWO ways mass media may influence Caribbean culture.",
    4,
    developedScheme(2,[
      {id:"promote",label:"Media can promote Caribbean music, language, food and traditions",concepts:["media_agent","promote_culture"],developmentConcepts:["global_cultural_reach","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"outside",label:"Media can expose people to outside cultural influences",concepts:["media_agent","global_cultural_reach"],developmentPhrases:["adopt foreign culture","outside influences","foreign cultural practices"],allowGeneralDevelopment:true},
      {id:"identity",label:"Media can strengthen awareness of Caribbean identity",concepts:["media_agent","cultural_identity"],developmentConcepts:["promote_culture"],allowGeneralDevelopment:true},
      {id:"change",label:"Repeated media exposure can change tastes, language or behaviour",concepts:["media_agent"],developmentPhrases:["change tastes","change behaviour","change behavior","change language","influence lifestyle"],allowGeneralDevelopment:true},
    ]),
    ["Promotes Caribbean culture","Introduces outside influences","Strengthens identity","Changes tastes or behaviour"]),

  item("ss-sa-a1-36","A1","a1-caribbean-culture-world","suggest",
    "Suggest TWO actions communities could take to preserve local language, traditions or heritage.",
    4,
    developedScheme(2,[
      {id:"document",label:"Record and archive traditions, stories and language",concepts:["preserve_culture","heritage_preservation"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
      {id:"teach",label:"Teach heritage through schools and community programmes",concepts:["education_agent"],developmentConcepts:["cultural_transmission","preserve_culture"],allowGeneralDevelopment:true},
      {id:"events",label:"Stage festivals, workshops or cultural events",concepts:["cultural_form_festival","promote_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"elders",label:"Involve elders and cultural practitioners in teaching younger people",phrases:["involve elders","elders teach youth","cultural practitioners","traditional knowledge holders"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
    ]),
    ["Document traditions","Teach heritage","Stage cultural events","Involve elders and practitioners"]),

  item("ss-sa-a1-37","A1","a1-parenthood-research","identify",
    "Identify THREE features of a good research question.",
    3,
    listScheme(3,[
      {id:"clear",label:"Clear and specific",phrases:["clear","specific","clearly stated"]},
      {id:"focused",label:"Focused on a manageable issue or variables",concepts:["research_question"],phrases:["focused","manageable","limited variables"]},
      {id:"researchable",label:"Answerable using evidence or data",phrases:["researchable","can collect data","answer using data","can be investigated"]},
      {id:"population",label:"Identifies the target group or setting where appropriate",concepts:["research_population"],phrases:["target population","target group"]},
    ]),
    ["Clear and specific","Focused and manageable","Researchable using data","Identifies the relevant population or setting"]),

  item("ss-sa-a1-38","A1","a1-parenthood-research","distinguish",
    "Distinguish between an open-ended question and a closed-ended question in a questionnaire.",
    2,
    criteriaScheme([
      {id:"open",label:"Open-ended questions allow respondents to answer in their own words",anyConcepts:["open_question"],marks:1},
      {id:"closed",label:"Closed-ended questions provide fixed response choices",anyConcepts:["closed_question"],marks:1},
    ],2),
    ["Open-ended questions allow free responses.","Closed-ended questions provide fixed choices."]),

  item("ss-sa-a2-26","A2","a2-social-groups","define",
    "Define the term social group.",
    2,
    definitionScheme([
      {id:"people",label:"Consists of two or more people",phrases:["two or more people","group of people","people together"],marks:1},
      {id:"interaction",label:"Members interact and share a relationship, goal, interest or identity",concepts:["group_cohesion","shared_goals"],phrases:["interact with each other","share common goals","common interest","shared identity"],marks:1},
    ]),
    ["Two or more people","who interact and share a relationship, goal, interest or identity"]),

  item("ss-sa-a2-27","A2","a2-social-groups","explain",
    "Explain TWO reasons people form or join social groups.",
    4,
    developedScheme(2,[
      {id:"belonging",label:"Groups provide friendship, identity or a sense of belonging",concepts:["group_cohesion"],developmentPhrases:["sense of belonging","friendship","social support","shared identity"],allowGeneralDevelopment:true},
      {id:"goals",label:"People cooperate to achieve shared goals",concepts:["shared_goals","cooperation"],developmentConcepts:["group_cohesion"],allowGeneralDevelopment:true},
      {id:"support",label:"Groups provide practical or emotional support",concepts:["cooperation"],developmentPhrases:["support each other","help each other","emotional support"],allowGeneralDevelopment:true},
      {id:"interests",label:"Groups bring together people with common interests",phrases:["common interests","shared interests"],developmentConcepts:["group_cohesion"],allowGeneralDevelopment:true},
    ]),
    ["Belonging","Shared goals","Support","Common interests"]),

  item("ss-sa-a2-28","A2","a2-cohesion-control-interaction","distinguish",
    "Distinguish between formal social control and informal social control.",
    2,
    criteriaScheme([
      {id:"formal",label:"Formal control uses official rules, laws or authorised sanctions",anyPhrases:["laws and rules","official rules","police","courts","formal sanctions"],marks:1},
      {id:"informal",label:"Informal control comes through customs, family, peers or community pressure",anyPhrases:["family pressure","peer pressure","customs","social approval","community pressure","informal sanctions"],marks:1},
    ],2),
    ["Formal control uses official laws or rules.","Informal control relies on customs and social pressure."]),

  item("ss-sa-a2-29","A2","a2-social-institutions","explain",
    "Explain TWO ways the education system contributes to society.",
    4,
    developedScheme(2,[
      {id:"skills",label:"Education develops knowledge and skills",concepts:["education_agent","skill_training"],developmentConcepts:["human_resource_development","productivity"],allowGeneralDevelopment:true},
      {id:"values",label:"Schools transmit values, norms and expected behaviour",concepts:["education_agent","family_socialisation"],developmentPhrases:["teach values","teach norms","socialisation"],allowGeneralDevelopment:true},
      {id:"jobs",label:"Education prepares people for employment",concepts:["education_agent","skill_training"],developmentConcepts:["employment","career_development"],allowGeneralDevelopment:true},
      {id:"citizen",label:"Education may build civic awareness and participation",concepts:["education_agent","civic_education"],developmentConcepts:["civic_participation"],allowGeneralDevelopment:true},
    ]),
    ["Knowledge and skills","Values and socialisation","Employment preparation","Civic awareness"]),

  item("ss-sa-a2-30","A2","a2-social-institutions","explain",
    "Explain TWO ways religious institutions may contribute to community life.",
    4,
    developedScheme(2,[
      {id:"values",label:"Religious institutions may teach moral values and expected behaviour",concepts:["religion_agent"],developmentPhrases:["teach values","moral guidance","ethical behaviour","ethical behavior"],allowGeneralDevelopment:true},
      {id:"support",label:"They may provide charity or support to persons in need",concepts:["religion_agent"],developmentPhrases:["charity","food assistance","help poor","support vulnerable"],allowGeneralDevelopment:true},
      {id:"cohesion",label:"They may create social networks and community cohesion",concepts:["religion_agent","group_cohesion"],developmentConcepts:["cooperation"],allowGeneralDevelopment:true},
      {id:"counselling",label:"They may provide counselling or guidance",concepts:["religion_agent","counselling_services"],developmentConcepts:["family_emotional_support"],allowGeneralDevelopment:true},
    ]),
    ["Moral guidance","Charity and support","Community cohesion","Counselling"]),

  item("ss-sa-a2-31","A2","a2-government-structure","explain",
    "Explain TWO reasons the separation of powers is important in government.",
    4,
    developedScheme(2,[
      {id:"abuse",label:"It helps prevent one arm from controlling all state power",concepts:["separation_of_powers"],developmentPhrases:["prevent abuse of power","avoid concentration of power","checks power"],allowGeneralDevelopment:true},
      {id:"checks",label:"Different arms can check or review each other's actions",concepts:["separation_of_powers"],developmentConcepts:["accountability","rule_of_law"],allowGeneralDevelopment:true},
      {id:"independence",label:"It supports independent law-making, administration and judging",concepts:["separation_of_powers"],developmentPhrases:["independent judiciary","independent arms","independent decisions"],allowGeneralDevelopment:true},
    ]),
    ["Prevents concentration of power","Provides checks and balances","Supports independence of the arms"]),

  item("ss-sa-a2-32","A2","a2-governance-citizenship","explain",
    "Explain TWO ways the rule of law supports good governance.",
    4,
    developedScheme(2,[
      {id:"equal",label:"The law applies to citizens and officials",concepts:["rule_of_law"],developmentPhrases:["everyone is subject to the law","officials obey law","equal before the law"],allowGeneralDevelopment:true},
      {id:"rights",label:"Legal rules help protect rights and freedoms",concepts:["rule_of_law","rights_freedoms"],developmentPhrases:["protect rights","protect freedoms"],allowGeneralDevelopment:true},
      {id:"account",label:"Officials may be held accountable for unlawful actions",concepts:["rule_of_law","accountability"],developmentConcepts:["public_accountability"],allowGeneralDevelopment:true},
      {id:"certainty",label:"Predictable laws support fair and consistent decisions",concepts:["rule_of_law"],developmentPhrases:["fair decisions","consistent decisions","legal certainty"],allowGeneralDevelopment:true},
    ]),
    ["Law applies to everyone","Protects rights","Supports accountability","Promotes fair and consistent decisions"]),

  item("ss-sa-a2-33","A2","a2-government-functions-rights","distinguish",
    "Distinguish between a right and a responsibility of a citizen.",
    2,
    criteriaScheme([
      {id:"right",label:"A right is a freedom or entitlement protected for citizens",anyPhrases:["freedom or entitlement","entitlement","protected freedom","right to vote","freedom of expression"],marks:1},
      {id:"responsibility",label:"A responsibility is a duty citizens are expected to carry out",anyConcepts:["civic_responsibility"],anyPhrases:["duty of a citizen","expected duty","obligation"],marks:1},
    ],2),
    ["A right is a protected freedom or entitlement.","A responsibility is a duty or obligation of citizenship."]),

  item("ss-sa-a2-34","A2","a2-electoral-systems","explain",
    "Explain TWO reasons free and fair elections are important in a democracy.",
    4,
    developedScheme(2,[
      {id:"choice",label:"Citizens can choose representatives without improper interference",concepts:["free_fair_elections","democratic_participation"],developmentConcepts:["rights_freedoms"],allowGeneralDevelopment:true},
      {id:"legitimacy",label:"Fair elections give elected governments democratic legitimacy",concepts:["free_fair_elections"],developmentPhrases:["accepted result","legitimate government","public confidence in result"],allowGeneralDevelopment:true},
      {id:"account",label:"Elections allow citizens to hold leaders accountable",concepts:["free_fair_elections","accountability"],developmentConcepts:["public_accountability"],allowGeneralDevelopment:true},
      {id:"peace",label:"Trusted elections may support peaceful transfers of political power",concepts:["free_fair_elections"],developmentPhrases:["peaceful transfer of power","reduce election conflict"],allowGeneralDevelopment:true},
    ]),
    ["Citizen choice","Legitimacy","Accountability","Peaceful transfer of power"]),

  item("ss-sa-a2-35","A2","a2-election-outcomes-data","explain",
    "Explain TWO factors that may contribute to low voter turnout.",
    4,
    developedScheme(2,[
      {id:"apathy",label:"Political apathy or low interest may reduce participation",phrases:["voter apathy","political apathy","not interested in politics","lack of interest"],developmentConcepts:["increased_participation"],allowGeneralDevelopment:true},
      {id:"trust",label:"Low trust in parties or institutions may discourage voting",phrases:["lack of trust","distrust politicians","do not trust parties","loss of confidence"],developmentPhrases:["do not see point in voting","discourage voting"],allowGeneralDevelopment:true},
      {id:"access",label:"Registration, transport or polling barriers may reduce turnout",concepts:["reduced_access_barriers"],developmentPhrases:["far from polling station","registration difficulty","transport problem"],allowGeneralDevelopment:true},
      {id:"information",label:"Limited voter information may reduce awareness or motivation",concepts:["increased_awareness"],developmentPhrases:["do not know candidates","lack voter information"],allowGeneralDevelopment:true},
    ]),
    ["Apathy","Low trust","Access barriers","Limited voter information"]),

  item("ss-sa-a2-36","A2","a2-governance-citizenship","suggest",
    "Suggest TWO measures that could help reduce corruption in public administration.",
    4,
    developedScheme(2,[
      {id:"transparent",label:"Publish decisions, contracts and public spending information",concepts:["transparency","anti_corruption"],developmentConcepts:["public_accountability"],allowGeneralDevelopment:true},
      {id:"audit",label:"Strengthen independent audits and oversight",concepts:["anti_corruption"],developmentPhrases:["independent audit","audit public spending","oversight body"],allowGeneralDevelopment:true},
      {id:"law",label:"Enforce anti-corruption laws and penalties",concepts:["anti_corruption","rule_of_law"],developmentPhrases:["punish corruption","prosecute corruption","strong penalties"],allowGeneralDevelopment:true},
      {id:"report",label:"Protect confidential reporting and whistleblowing",concepts:["anti_corruption"],developmentPhrases:["report corruption","whistleblower","anonymous reporting"],allowGeneralDevelopment:true},
    ]),
    ["Transparency","Independent audits","Law enforcement","Protected reporting"]),

  item("ss-sa-a2-37","A2","a2-parties-information-decisions","explain",
    "Explain TWO functions of an opposition party in a parliamentary democracy.",
    4,
    developedScheme(2,[
      {id:"scrutinise",label:"The opposition scrutinises government decisions and spending",concepts:["party_opposition"],developmentConcepts:["public_accountability","transparency"],allowGeneralDevelopment:true},
      {id:"alternative",label:"It presents alternative policies or programmes",concepts:["party_opposition","party_manifesto"],developmentPhrases:["alternative policies","alternative government","different policy proposals"],allowGeneralDevelopment:true},
      {id:"debate",label:"It challenges government proposals through parliamentary debate",concepts:["party_opposition"],developmentPhrases:["debate bills","question ministers","challenge government"],allowGeneralDevelopment:true},
      {id:"represent",label:"It represents citizens who did not support the government",concepts:["party_opposition"],developmentPhrases:["represent minority views","represent other voters"],allowGeneralDevelopment:true},
    ]),
    ["Scrutinises government","Offers alternatives","Debates and questions government","Represents other voters"]),

  item("ss-sa-a2-38","A2","a2-electoral-systems","distinguish",
    "Distinguish between first-past-the-post and proportional representation.",
    2,
    criteriaScheme([
      {id:"fptp",label:"First-past-the-post awards a constituency seat to the candidate with the most votes",anyConcepts:["fptp","largest_votes_wins"],marks:1},
      {id:"pr",label:"Proportional representation allocates seats broadly according to parties' shares of the vote",anyPhrases:["seats according to share of votes","seats proportional to votes","party vote share determines seats","proportional representation"],marks:1},
    ],2),
    ["FPTP gives each constituency seat to the candidate with the most votes.","Proportional representation allocates seats according to vote share."]),

  item("ss-sa-b1-26","B1","b1-population-change-rates","define",
    "Define birth rate.",
    2,
    definitionScheme([
      {id:"births",label:"Measures live births in a population",phrases:["live births","number of births"],marks:1},
      {id:"rate",label:"Usually expressed per 1,000 population in a year",phrases:["per 1000 population","per 1,000 population","per thousand population","in a year","per year"],marks:1},
    ]),
    ["Number of live births","usually per 1,000 population in a year"]),

  item("ss-sa-b1-27","B1","b1-population-change-rates","define",
    "Define death rate.",
    2,
    definitionScheme([
      {id:"deaths",label:"Measures deaths in a population",phrases:["number of deaths","deaths in a population"],marks:1},
      {id:"rate",label:"Usually expressed per 1,000 population in a year",phrases:["per 1000 population","per 1,000 population","per thousand population","in a year","per year"],marks:1},
    ]),
    ["Number of deaths","usually per 1,000 population in a year"]),

  item("ss-sa-b1-28","B1","b1-population-change-rates","state",
    "State the relationship used to calculate natural increase.",
    2,
    criteriaScheme([
      {id:"birth",label:"Includes the birth rate",anyConcepts:["birth_rate"],anyPhrases:["birth rate","births"],marks:1},
      {id:"death",label:"Subtracts the death rate",anyConcepts:["death_rate"],anyPhrases:["minus death rate","subtract death rate","less deaths"],marks:1},
    ],2),
    ["Natural increase equals birth rate minus death rate."]),

  item("ss-sa-b1-29","B1","b1-population-data","explain",
    "Explain TWO factors that may contribute to population ageing.",
    4,
    developedScheme(2,[
      {id:"birth",label:"Lower birth rates reduce the proportion of children and young people",concepts:["birth_rate"],developmentConcepts:["population_ageing_migration"],developmentPhrases:["fewer young people","smaller young population"],allowGeneralDevelopment:true},
      {id:"life",label:"Longer life expectancy increases the number of older people",phrases:["longer life expectancy","people live longer","improved life expectancy"],developmentConcepts:["elderly_dependency"],allowGeneralDevelopment:true},
      {id:"migration",label:"Out-migration of young working-age adults may increase the older share",concepts:["population_ageing_migration","emigration"],developmentConcepts:["elderly_dependency"],allowGeneralDevelopment:true},
      {id:"death",label:"Lower mortality allows more people to survive to old age",concepts:["low_death_rate"],developmentConcepts:["elderly_dependency"],allowGeneralDevelopment:true},
    ]),
    ["Lower birth rates","Longer life expectancy","Youth emigration","Lower mortality"]),

  item("ss-sa-b1-30","B1","b1-population-data","explain",
    "Explain TWO challenges associated with an ageing population.",
    4,
    developedScheme(2,[
      {id:"health",label:"More older people increase demand for health and care services",concepts:["elderly_dependency"],developmentConcepts:["public_services","population_resource_allocation"],allowGeneralDevelopment:true},
      {id:"pension",label:"Pension and social-protection costs may rise",concepts:["elderly_dependency"],developmentPhrases:["higher pension costs","more pension spending","social security cost"],allowGeneralDevelopment:true},
      {id:"workers",label:"A smaller working-age population may support more dependants",concepts:["elderly_dependency","dependency_ratio"],developmentConcepts:["economic_pressure"],allowGeneralDevelopment:true},
      {id:"labour",label:"Some sectors may face labour shortages",concepts:["elderly_dependency","labour_shortage"],developmentConcepts:["productivity"],allowGeneralDevelopment:true},
    ]),
    ["Health and care demand","Pension costs","Higher dependency burden","Labour shortages"]),

  item("ss-sa-b1-31","B1","b1-migration","explain",
    "Explain TWO negative effects of brain drain on a Caribbean country.",
    4,
    developedScheme(2,[
      {id:"skills",label:"The country loses trained workers and professional skills",concepts:["brain_drain","labour_shortage"],developmentConcepts:["human_resource_development","public_services"],allowGeneralDevelopment:true},
      {id:"cost",label:"Public investment in education may benefit another country",concepts:["brain_drain"],developmentPhrases:["investment in training is lost","government paid for training","education investment lost"],allowGeneralDevelopment:true},
      {id:"services",label:"Shortages may reduce the quality or availability of essential services",concepts:["brain_drain","labour_shortage"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
      {id:"growth",label:"Loss of skilled workers may reduce productivity and development",concepts:["brain_drain"],developmentConcepts:["productivity","economic_development"],allowGeneralDevelopment:true},
    ]),
    ["Loss of skills","Loss of training investment","Pressure on services","Lower productivity and development"]),

  item("ss-sa-b1-32","B1","b1-migration","explain",
    "Explain TWO ways remittances may benefit families or Caribbean economies.",
    4,
    developedScheme(2,[
      {id:"family",label:"Remittances help households meet everyday needs",concepts:["remittance_benefit"],developmentConcepts:["family_economic_support","family_needs"],allowGeneralDevelopment:true},
      {id:"education",label:"Families may use remittances for education or health expenses",concepts:["remittance_benefit"],developmentConcepts:["human_resource_development"],developmentPhrases:["pay school fees","pay medical bills"],allowGeneralDevelopment:true},
      {id:"foreign",label:"Money sent from abroad contributes foreign exchange",concepts:["remittance_benefit","foreign_exchange"],developmentConcepts:["economic_development"],allowGeneralDevelopment:true},
      {id:"invest",label:"Households may save or invest part of remittances",concepts:["remittance_benefit"],developmentConcepts:["savings_plan","entrepreneurship"],allowGeneralDevelopment:true},
    ]),
    ["Household needs","Education and health","Foreign exchange","Saving and investment"]),

  item("ss-sa-b1-33","B1","b1-employment","identify",
    "Identify THREE types of unemployment.",
    3,
    listScheme(3,[
      {id:"seasonal",label:"Seasonal unemployment",concepts:["seasonal_unemployment"]},
      {id:"structural",label:"Structural unemployment",concepts:["structural_unemployment"]},
      {id:"frictional",label:"Frictional unemployment",concepts:["frictional_unemployment"]},
      {id:"cyclical",label:"Cyclical unemployment",concepts:["cyclical_unemployment"]},
    ]),
    ["Seasonal","Structural","Frictional","Cyclical"]),

  item("ss-sa-b1-34","B1","b1-human-resource-development","explain",
    "Explain TWO ways investment in education and health may improve human-resource development.",
    4,
    developedScheme(2,[
      {id:"skills",label:"Education and training increase workers' knowledge and skills",concepts:["human_resource_development","skill_training"],developmentConcepts:["productivity","employment"],allowGeneralDevelopment:true},
      {id:"health",label:"Better health helps people attend school and work more effectively",concepts:["preventive_health","human_resource_development"],developmentConcepts:["productivity"],allowGeneralDevelopment:true},
      {id:"jobs",label:"Qualifications improve access to skilled employment",concepts:["human_resource_development","skill_training"],developmentConcepts:["employment","career_development"],allowGeneralDevelopment:true},
      {id:"innovation",label:"A skilled and healthy workforce supports innovation and economic development",concepts:["human_resource_development"],developmentConcepts:["economic_development","productivity"],allowGeneralDevelopment:true},
    ]),
    ["Skills and knowledge","Health and productivity","Employment opportunities","Innovation and development"]),

  item("ss-sa-b1-35","B1","b1-natural-resources","identify",
    "Identify TWO renewable and TWO non-renewable natural resources.",
    4,
    listScheme(4,[
      {id:"solar",label:"Solar energy",concepts:["renewable_energy"],phrases:["solar"]},
      {id:"wind",label:"Wind energy",concepts:["renewable_energy"],phrases:["wind energy"]},
      {id:"water",label:"Water",concepts:["water_resource"]},
      {id:"forest",label:"Forests",concepts:["forest_resource"]},
      {id:"oil",label:"Oil or petroleum",concepts:["fossil_fuels"],phrases:["oil","petroleum"]},
      {id:"gas",label:"Natural gas",concepts:["fossil_fuels"],phrases:["natural gas"]},
      {id:"bauxite",label:"Bauxite or other mineral resources",concepts:["mineral_resource"],phrases:["bauxite","mineral"]},
    ]),
    ["Solar or wind","Water or forests","Oil or natural gas","Bauxite or other minerals"]),

  item("ss-sa-b1-36","B1","b1-natural-resources","explain",
    "Explain TWO possible effects of overfishing on a Caribbean community.",
    4,
    developedScheme(2,[
      {id:"stocks",label:"Fish stocks may decline",concepts:["fisheries"],developmentPhrases:["fewer fish","fish population falls","depleted fish stocks"],allowGeneralDevelopment:true},
      {id:"income",label:"Fishers may lose income or employment",concepts:["fisheries"],developmentConcepts:["employment","economic_pressure"],allowGeneralDevelopment:true},
      {id:"food",label:"Local food supply and food security may be reduced",concepts:["fisheries"],developmentConcepts:["family_needs"],developmentPhrases:["less food","food security"],allowGeneralDevelopment:true},
      {id:"ecosystem",label:"Marine ecosystems may be damaged",concepts:["fisheries","marine_conservation"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
    ]),
    ["Declining fish stocks","Loss of income or jobs","Reduced food supply","Marine ecosystem damage"]),

  item("ss-sa-b1-37","B1","b1-environmental-practices","suggest",
    "Suggest TWO measures households or communities could use to conserve water.",
    4,
    developedScheme(2,[
      {id:"harvest",label:"Collect rainwater",concepts:["rainwater_harvesting","water_conservation"],developmentConcepts:["conservation"],allowGeneralDevelopment:true},
      {id:"leaks",label:"Repair leaks and avoid unnecessary water loss",concepts:["water_conservation"],developmentPhrases:["fix leaks","repair leaks","reduce water waste"],allowGeneralDevelopment:true},
      {id:"efficient",label:"Use water-efficient fixtures or practices",concepts:["water_conservation"],developmentPhrases:["low flow","use less water","water efficient"],allowGeneralDevelopment:true},
      {id:"reuse",label:"Reuse suitable water for gardening or cleaning",concepts:["water_conservation"],developmentPhrases:["reuse water","grey water","reuse suitable water"],allowGeneralDevelopment:true},
    ]),
    ["Rainwater harvesting","Repair leaks","Efficient water use","Reuse suitable water"]),

  item("ss-sa-b1-38","B1","b1-climate-change","explain",
    "Explain TWO climate-change adaptation measures suitable for Caribbean communities.",
    4,
    developedScheme(2,[
      {id:"coast",label:"Coastal protection reduces exposure to erosion or storm surge",concepts:["coastal_protection","adaptation"],developmentConcepts:["resilience"],allowGeneralDevelopment:true},
      {id:"warning",label:"Early-warning systems help communities prepare for hazards",concepts:["early_warning","adaptation"],developmentConcepts:["disaster_preparedness","resilience"],allowGeneralDevelopment:true},
      {id:"water",label:"Rainwater storage helps communities cope with drought",concepts:["rainwater_harvesting","adaptation"],developmentConcepts:["resilience"],allowGeneralDevelopment:true},
      {id:"crops",label:"Drought-resistant crops help agriculture cope with changing rainfall",concepts:["drought_resistant_crops","adaptation"],developmentConcepts:["agriculture_impact","resilience"],allowGeneralDevelopment:true},
    ]),
    ["Coastal protection","Early-warning systems","Rainwater storage","Drought-resistant crops"]),

  item("ss-sa-b2-26","B2","b2-measuring-development","distinguish",
    "Distinguish between gross domestic product and gross national income.",
    2,
    criteriaScheme([
      {id:"gdp",label:"GDP measures output produced within a country's borders",anyConcepts:["gdp"],anyPhrases:["produced within a country","within the country's borders"],marks:1},
      {id:"gni",label:"GNI includes income received by the country's residents or nationals, including net income from abroad",anyConcepts:["gross_national_income"],anyPhrases:["income of residents","income earned by nationals","income from abroad"],marks:1},
    ],2),
    ["GDP focuses on production within the country.","GNI focuses on income received by residents or nationals, including net income from abroad."]),

  item("ss-sa-b2-27","B2","b2-measuring-development","explain",
    "Explain TWO reasons a social indicator is useful when measuring development.",
    4,
    developedScheme(2,[
      {id:"life",label:"Social indicators show changes in people's quality of life",concepts:["quality_of_life"],developmentConcepts:["economic_development"],allowGeneralDevelopment:true},
      {id:"services",label:"Indicators such as health and education show access to important services",concepts:["public_services","human_resource_development"],developmentConcepts:["quality_of_life"],allowGeneralDevelopment:true},
      {id:"unequal",label:"Social indicators may reveal problems hidden by national income averages",concepts:["quality_of_life"],developmentPhrases:["inequality","income average hides","not everyone benefits"],allowGeneralDevelopment:true},
      {id:"policy",label:"Governments can use social indicators to target development programmes",concepts:["population_resource_allocation"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
    ]),
    ["Quality of life","Access to services","Reveals problems hidden by income averages","Supports policy planning"]),

  item("ss-sa-b2-28","B2","b2-industries-ict","explain",
    "Explain TWO ways entrepreneurship may contribute to Caribbean development.",
    4,
    developedScheme(2,[
      {id:"jobs",label:"New businesses create employment",concepts:["entrepreneurship","job_creation"],developmentConcepts:["employment","economic_development"],allowGeneralDevelopment:true},
      {id:"innovation",label:"Entrepreneurs may introduce new products or services",concepts:["entrepreneurship"],developmentPhrases:["new products","new services","innovation"],allowGeneralDevelopment:true},
      {id:"local",label:"Local businesses may keep more income circulating within the economy",concepts:["entrepreneurship","local_ownership"],developmentConcepts:["value_added","economic_development"],allowGeneralDevelopment:true},
      {id:"export",label:"Businesses may expand exports and earn foreign exchange",concepts:["entrepreneurship","export_diversification"],developmentConcepts:["foreign_exchange"],allowGeneralDevelopment:true},
    ]),
    ["Employment","Innovation","Local economic activity","Exports and foreign exchange"]),

  item("ss-sa-b2-29","B2","b2-industries-ict","explain",
    "Explain ONE benefit and ONE possible challenge of foreign direct investment.",
    4,
    developedScheme(2,[
      {id:"benefit-jobs",label:"Foreign investment may create jobs",concepts:["foreign_direct_investment"],developmentConcepts:["employment","job_creation"],allowGeneralDevelopment:true},
      {id:"benefit-capital",label:"Foreign investment may provide capital, technology or skills",concepts:["foreign_direct_investment"],developmentPhrases:["bring capital","bring technology","transfer skills"],allowGeneralDevelopment:true},
      {id:"challenge-profit",label:"Some profits may leave the country",concepts:["foreign_direct_investment"],developmentPhrases:["profits sent abroad","profits leave country","profit repatriation"],allowGeneralDevelopment:true},
      {id:"challenge-control",label:"Heavy foreign ownership may reduce local control or local linkages",concepts:["foreign_direct_investment"],developmentConcepts:["local_ownership","local_linkages"],allowGeneralDevelopment:true},
    ]),
    ["Benefit: jobs or capital and technology","Challenge: profit outflow or limited local control"]),

  item("ss-sa-b2-30","B2","b2-industries-ict","explain",
    "Explain TWO ways e-government services may contribute to development.",
    4,
    developedScheme(2,[
      {id:"access",label:"Online services make government services easier to access",concepts:["e_government"],developmentConcepts:["public_services","ict_efficiency"],allowGeneralDevelopment:true},
      {id:"time",label:"Digital processes may reduce waiting time and transaction costs",concepts:["e_government","ict_efficiency"],developmentPhrases:["save time","reduce waiting","lower transaction cost"],allowGeneralDevelopment:true},
      {id:"transparent",label:"Digital records may improve transparency and tracking",concepts:["e_government","transparency"],developmentConcepts:["public_accountability"],allowGeneralDevelopment:true},
      {id:"remote",label:"People in remote areas may access some services without travelling",concepts:["e_government","ict_remote_services"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
    ]),
    ["Access","Efficiency","Transparency","Remote access"]),

  item("ss-sa-b2-31","B2","b2-integration-benefits-challenges","explain",
    "Explain TWO challenges that may hinder Caribbean regional integration.",
    4,
    developedScheme(2,[
      {id:"national",label:"Strong national interests may take priority over regional decisions",concepts:["integration_barrier_nationalism"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
      {id:"movement",label:"Restrictions on movement may limit regional labour mobility",concepts:["integration_barrier_movement"],developmentConcepts:["free_movement"],allowGeneralDevelopment:true},
      {id:"trade",label:"Trade barriers and customs delays may reduce intra-regional trade",concepts:["integration_barrier_trade"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
      {id:"cost",label:"The cost of implementing regional programmes may slow progress",concepts:["integration_barrier_cost"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
    ]),
    ["National interests","Movement restrictions","Trade barriers","Implementation costs"]),

  item("ss-sa-b2-32","B2","b2-regional-organisations","explain",
    "Explain TWO ways the CSME may support Caribbean development.",
    4,
    developedScheme(2,[
      {id:"market",label:"A wider regional market gives firms access to more customers",concepts:["csme","larger_market"],developmentConcepts:["more_regional_trade","economies_scale"],allowGeneralDevelopment:true},
      {id:"movement",label:"Agreed movement arrangements allow eligible workers or businesses greater regional mobility",concepts:["csme","free_movement"],developmentConcepts:["employment","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"capital",label:"Regional movement of capital and services may support investment",concepts:["csme"],developmentPhrases:["movement of capital","movement of services","regional investment"],allowGeneralDevelopment:true},
      {id:"trade",label:"Reduced barriers can increase intra-regional trade",concepts:["csme","remove_trade_barriers"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
    ]),
    ["Larger market","Free movement","Investment","More regional trade"]),

  item("ss-sa-b2-33","B2","b2-integration-roots","identify",
    "Identify THREE organisations or arrangements associated with the history of Caribbean integration.",
    3,
    listScheme(3,[
      {id:"federation",label:"West Indies Federation",concepts:["federation_history"]},
      {id:"carifta",label:"CARIFTA",concepts:["carifta","carifta_history"]},
      {id:"caricom",label:"CARICOM",concepts:["caricom"]},
      {id:"oecs",label:"OECS",concepts:["oecs"]},
      {id:"csme",label:"CSME",concepts:["csme"]},
    ]),
    ["West Indies Federation","CARIFTA","CARICOM","OECS","CSME"]),

  item("ss-sa-b2-34","B2","b2-regional-organisations","explain",
    "Explain TWO ways CARICOM promotes regional cooperation.",
    4,
    developedScheme(2,[
      {id:"policy",label:"CARICOM coordinates policies and regional action",concepts:["caricom","caricom_function"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
      {id:"trade",label:"CARICOM supports economic cooperation and regional trade",concepts:["caricom","caricom_function"],developmentConcepts:["more_regional_trade","larger_market"],allowGeneralDevelopment:true},
      {id:"issues",label:"Member states cooperate on shared regional problems",concepts:["caricom","pooled_resources"],developmentConcepts:["resilience"],allowGeneralDevelopment:true},
      {id:"voice",label:"Regional cooperation may strengthen the Caribbean's collective international voice",concepts:["caricom","bargaining_power"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
    ]),
    ["Policy coordination","Economic cooperation","Shared problems","Collective international voice"]),

  item("ss-sa-b2-35","B2","b2-integration-citizens","suggest",
    "Suggest TWO actions ordinary citizens could take to strengthen regional consciousness.",
    4,
    developedScheme(2,[
      {id:"buy",label:"Support goods and services from other Caribbean countries",concepts:["more_regional_trade"],developmentConcepts:["regional_integration"],developmentPhrases:["buy caribbean","support regional products"],allowGeneralDevelopment:true},
      {id:"culture",label:"Participate in regional cultural, sporting or educational activities",concepts:["cultural_transmission","regional_integration"],developmentPhrases:["regional events","caribbean events","regional exchange"],allowGeneralDevelopment:true},
      {id:"learn",label:"Learn about other Caribbean countries and regional institutions",concepts:["increased_awareness","regional_integration"],developmentPhrases:["learn about caribbean countries","regional awareness"],allowGeneralDevelopment:true},
      {id:"media",label:"Use media responsibly to share regional information and achievements",concepts:["media_agent","regional_integration"],developmentPhrases:["share regional information","promote regional achievements"],allowGeneralDevelopment:true},
    ]),
    ["Support Caribbean products","Regional activities","Learn about the region","Share regional information"]),

  item("ss-sa-b2-36","B2","b2-tourism-integration","distinguish",
    "Distinguish between ecotourism and community-based tourism.",
    2,
    criteriaScheme([
      {id:"eco",label:"Ecotourism focuses on responsible travel to natural areas and conservation",anyConcepts:["eco_tourism"],marks:1},
      {id:"community",label:"Community-based tourism places local communities at the centre of tourism ownership, activities or benefits",anyConcepts:["community_tourism"],marks:1},
    ],2),
    ["Ecotourism focuses on responsible nature-based travel.","Community-based tourism centres local communities and local benefits."]),

  item("ss-sa-b2-37","B2","b2-tourism-integration","explain",
    "Explain TWO ways tourism leakage may reduce the development benefits of tourism.",
    4,
    developedScheme(2,[
      {id:"profit",label:"Profits from foreign-owned tourism businesses may leave the country",concepts:["tourism_leakage"],developmentPhrases:["profits sent abroad","profits leave country"],allowGeneralDevelopment:true},
      {id:"imports",label:"Imported food, equipment or services send tourism spending abroad",concepts:["tourism_leakage","import_dependence"],developmentPhrases:["imports for hotels","imported goods","money spent on imports"],allowGeneralDevelopment:true},
      {id:"local",label:"Weak local linkages mean fewer benefits reach local producers",concepts:["tourism_leakage","local_linkages"],developmentConcepts:["tourism_multiplier","employment"],allowGeneralDevelopment:true},
      {id:"foreign",label:"Leakage reduces the amount of foreign exchange retained locally",concepts:["tourism_leakage","foreign_exchange"],developmentConcepts:["economic_development"],allowGeneralDevelopment:true},
    ]),
    ["Profit outflow","Imports","Weak local linkages","Less foreign exchange retained"]),

  item("ss-sa-b2-38","B2","b2-tourism-integration","suggest",
    "Suggest TWO measures a Caribbean destination could use to strengthen its tourism product.",
    4,
    developedScheme(2,[
      {id:"market",label:"Use effective destination marketing",concepts:["destination_marketing"],developmentPhrases:["attract visitors","reach new markets","promote destination"],allowGeneralDevelopment:true},
      {id:"train",label:"Improve hospitality and tourism training",concepts:["tourism_training"],developmentConcepts:["human_resource_development","quality_of_life"],allowGeneralDevelopment:true},
      {id:"infra",label:"Improve tourism-related infrastructure",concepts:["tourism_infrastructure"],developmentConcepts:["infrastructure"],allowGeneralDevelopment:true},
      {id:"safe",label:"Improve visitor safety and security",concepts:["visitor_safety"],developmentPhrases:["visitor confidence","tourists feel safe","safe destination"],allowGeneralDevelopment:true},
      {id:"heritage",label:"Protect and improve natural or cultural attractions",concepts:["heritage_preservation","sustainable_tourism"],developmentConcepts:["protect_environment","cultural_identity"],allowGeneralDevelopment:true},
    ]),
    ["Destination marketing","Tourism training","Infrastructure","Visitor safety","Protect attractions"]),
]);