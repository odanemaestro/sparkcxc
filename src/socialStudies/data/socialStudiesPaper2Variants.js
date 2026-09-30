const freeze=value=>Object.freeze(value);

const part=(label,prompt,marks,guide,marking)=>freeze({
  label,prompt,marks,guide:freeze(guide),marking:freeze(marking),
});

const listMark=(maxPoints,points,profile="KC")=>freeze({
  type:"list",maxPoints,maxMarks:maxPoints,marksPerPoint:1,profile,points:freeze(points),
});

const developedMark=(maxPoints,points,profile="UK")=>freeze({
  type:"developed_points",maxPoints,maxMarks:maxPoints*2,profile,points:freeze(points),
});

const definitionMark=(groups,maxMarks=2,profile="KC")=>freeze({
  type:"definition",groups:freeze(groups),maxMarks,profile,
});

const criteriaMark=(criteria,maxMarks,profile="KC")=>freeze({
  type:"criteria",criteria:freeze(criteria),maxMarks,profile,
});

const linkedDevelopedMark=(maxPoints,followFromPartIndex,links,profile="UK")=>freeze({
  type:"linked_development",maxPoints,maxMarks:maxPoints*2,followFromPartIndex,profile,links:freeze(links),
});

const essay=(id,number,syllabusSection,title,context,tasks,guide)=>freeze({
  id,number,type:"essay",section:"B",syllabusSection,
  heading:syllabusSection.startsWith("A")
    ? "INDIVIDUAL, FAMILY AND SOCIETY"
    : "SUSTAINABLE DEVELOPMENT AND USE OF RESOURCES",
  title,context,totalMarks:22,contentMarks:18,organizationMarks:4,
  tasks:freeze(tasks),guide:freeze(guide),
});

const SET_B=freeze([
  freeze({
    id:"ss-p2-b-q1",number:1,type:"structured",section:"A",syllabusSection:"A1",
    heading:"INDIVIDUAL, FAMILY AND SOCIETY",
    context:"A family-support centre reports that some parents need help understanding their legal responsibilities and managing conflict at home.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Identify TWO legal responsibilities parents have towards their children.",2,
        ["Accept responsibilities such as financial maintenance, education and protection."],
        listMark(2,[
          {id:"maintenance",label:"Provide financial maintenance",concepts:["child_maintenance"]},
          {id:"education",label:"Ensure education and school attendance",concepts:["child_education_duty"]},
          {id:"protection",label:"Protect children from harm",concepts:["child_protection_duty"]},
          {id:"welfare",label:"Exercise parental responsibility for child welfare",concepts:["parental_responsibility"]},
        ])),
      part("(b)","Explain TWO practices that contribute to responsible parenthood.",4,
        ["Award one mark for a relevant practice and the second mark for clear development."],
        developedMark(2,[
          {id:"guidance",label:"Provide guidance and advice",concepts:["parental_guidance"],developmentConcepts:["informed_parenting","clear_communication"],allowGeneralDevelopment:true},
          {id:"supervision",label:"Provide appropriate supervision",concepts:["parental_supervision"],developmentConcepts:["family_protection"],allowGeneralDevelopment:true},
          {id:"discipline",label:"Use fair and consistent discipline",concepts:["discipline_consistent"],developmentConcepts:["family_socialisation"],allowGeneralDevelopment:true},
          {id:"example",label:"Set a positive example",concepts:["parental_role_model"],developmentConcepts:["family_socialisation"],allowGeneralDevelopment:true},
          {id:"communication",label:"Communicate openly with children",concepts:["clear_communication","active_listening"],developmentConcepts:["improved_family_relationships"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO actions the family-support centre could use to help families manage conflict.",4,
        ["Strategies should be practical and directed at communication or conflict resolution."],
        developedMark(2,[
          {id:"counselling",label:"Provide family counselling or mediation",concepts:["communication_counselling","family_mediation"],developmentConcepts:["conflict_resolution"],allowGeneralDevelopment:true},
          {id:"meetings",label:"Teach families to hold structured family meetings",concepts:["family_meetings"],developmentConcepts:["clear_communication","conflict_resolution"],allowGeneralDevelopment:true},
          {id:"listening",label:"Teach active-listening and communication skills",concepts:["active_listening","clear_communication"],developmentConcepts:["conflict_resolution"],allowGeneralDevelopment:true},
          {id:"parenting",label:"Offer parenting workshops",concepts:["parenting_classes"],developmentConcepts:["informed_parenting","conflict_resolution"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH action suggested in (c) (i) is likely to be successful.",4,
        ["Link each earlier action to a likely improvement in family relationships or conflict management."],
        linkedDevelopedMark(2,2,[
          {id:"counselling",label:"Explains why counselling or mediation would help",triggerConcepts:["communication_counselling","family_mediation"],resultConcepts:["conflict_resolution","improved_family_relationships"]},
          {id:"meetings",label:"Explains why family meetings would help",triggerConcepts:["family_meetings"],resultConcepts:["clear_communication","active_listening","conflict_resolution"]},
          {id:"skills",label:"Explains why communication skills would help",triggerConcepts:["active_listening","clear_communication"],resultConcepts:["conflict_resolution","improved_family_relationships"]},
          {id:"parenting",label:"Explains why parenting support would help",triggerConcepts:["parenting_classes"],resultConcepts:["informed_parenting","improved_family_relationships"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-b-q2",number:2,type:"structured",section:"A",syllabusSection:"A2",
    heading:"INDIVIDUAL, FAMILY AND SOCIETY",
    context:"During an election campaign, young voters receive political messages through television, community meetings and social media. Some messages contain verifiable information while others use one-sided emotional claims.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Distinguish between a fact and propaganda.",2,
        ["A fact is verifiable. Propaganda is persuasive or one-sided information intended to influence."],
        criteriaMark([
          {id:"fact",label:"Fact is verifiable or supported by evidence",anyPhrases:["verifiable","can be checked","supported by evidence","proved with evidence"],marks:1},
          {id:"propaganda",label:"Propaganda is one-sided or persuasive information intended to influence",anyConcepts:["propaganda"],marks:1},
        ],2)),
      part("(b)","Explain TWO ways citizens can support good governance.",4,
        ["Develop two actions showing how citizen behaviour supports accountable democratic government."],
        developedMark(2,[
          {id:"vote",label:"Participate in elections",concepts:["citizen_vote","increased_participation"],developmentConcepts:["democratic_participation","accountability"],allowGeneralDevelopment:true},
          {id:"law",label:"Obey the law and support rule of law",concepts:["citizen_obey_law","rule_of_law"],developmentConcepts:["government_law_order"],allowGeneralDevelopment:true},
          {id:"tax",label:"Pay taxes that support public services",concepts:["citizen_pay_taxes"],developmentConcepts:["public_services","government_social_services"],allowGeneralDevelopment:true},
          {id:"service",label:"Participate in community or civic activity",concepts:["citizen_community_service","community_outreach"],developmentConcepts:["democratic_participation"],allowGeneralDevelopment:true},
          {id:"scrutiny",label:"Question public decisions and use reliable information",concepts:["verify_information","transparency"],developmentConcepts:["accountability"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO strategies an electoral office could use to help young voters identify reliable election information.",4,
        ["Strategies should improve access to accurate, non-partisan information."],
        developedMark(2,[
          {id:"official",label:"Publish clear information through official channels",concepts:["official_information"],developmentConcepts:["source_reliability","increased_awareness"],allowGeneralDevelopment:true},
          {id:"education",label:"Provide voter and media-literacy education",concepts:["civic_education","verify_information"],developmentConcepts:["increased_awareness"],allowGeneralDevelopment:true},
          {id:"factcheck",label:"Provide fact-checking or claim-verification resources",concepts:["verify_information"],developmentConcepts:["source_reliability"],allowGeneralDevelopment:true},
          {id:"outreach",label:"Use schools, youth forums and community outreach",concepts:["school_civics","community_outreach"],developmentConcepts:["increased_awareness"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH strategy suggested in (c) (i) is likely to be successful.",4,
        ["Show how the strategy helps voters distinguish reliable information from misleading claims."],
        linkedDevelopedMark(2,2,[
          {id:"official",label:"Explains why official information improves reliability",triggerConcepts:["official_information"],resultConcepts:["source_reliability","increased_awareness"]},
          {id:"education",label:"Explains why voter or media literacy improves judgement",triggerConcepts:["civic_education","verify_information"],resultConcepts:["increased_awareness","source_reliability"]},
          {id:"outreach",label:"Explains why youth outreach improves access to information",triggerConcepts:["school_civics","community_outreach"],resultConcepts:["increased_awareness"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-b-q3",number:3,type:"structured",section:"A",syllabusSection:"B1",
    heading:"SUSTAINABLE DEVELOPMENT AND USE OF RESOURCES",
    context:"A coastal Caribbean community has experienced higher temperatures, periods of drought and repeated flooding. Government planners are considering measures to reduce greenhouse-gas emissions.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Define the term ‘global warming’.",2,
        ["An increase in the Earth's average global temperature."],
        definitionMark([
          {id:"rise",label:"Shows an increase or rise",phrases:["increase","rise","rising"],marks:1},
          {id:"temperature",label:"Refers to average global or Earth temperature",phrases:["average global temperature","earth's average temperature","global temperature","earth's temperature"],marks:1},
        ])),
      part("(b)","Explain TWO likely effects of climate change on Caribbean communities.",4,
        ["Develop two effects such as sea-level rise, stronger storms, drought, flooding or health impacts."],
        developedMark(2,[
          {id:"sea",label:"Sea-level rise threatens low-lying coasts",concepts:["sea_level_rise"],developmentConcepts:["coastal_erosion"],allowGeneralDevelopment:true},
          {id:"storm",label:"More intense storms damage homes and infrastructure",concepts:["stronger_storms"],developmentConcepts:["disaster_disruption","infrastructure"],allowGeneralDevelopment:true},
          {id:"drought",label:"Drought reduces water supply and agricultural output",concepts:["drought"],developmentConcepts:["agriculture_impact"],allowGeneralDevelopment:true},
          {id:"flood",label:"Flooding damages communities and services",concepts:["flooding"],developmentConcepts:["disaster_disruption"],allowGeneralDevelopment:true},
          {id:"health",label:"Higher temperatures increase health risks",concepts:["temperature_rise","health_impact"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO actions government could take to reduce the causes of climate change.",4,
        ["Actions should reduce greenhouse-gas emissions or increase carbon absorption."],
        developedMark(2,[
          {id:"renewable",label:"Expand renewable energy",concepts:["renewable_policy","renewable_energy"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"transport",label:"Improve public transport and reduce vehicle emissions",concepts:["public_transport","emissions_standard"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"efficiency",label:"Promote energy efficiency",concepts:["energy_efficiency"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"forest",label:"Protect and restore forests",concepts:["reforestation"],developmentConcepts:["lower_emissions","protect_environment"],allowGeneralDevelopment:true},
          {id:"industry",label:"Set and enforce emission standards",concepts:["emissions_standard"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH action suggested in (c) (i) is likely to be successful.",4,
        ["Link each action to lower greenhouse-gas emissions or increased carbon absorption."],
        linkedDevelopedMark(2,2,[
          {id:"renewable",label:"Explains why renewable energy lowers emissions",triggerConcepts:["renewable_policy","renewable_energy"],resultConcepts:["lower_emissions"]},
          {id:"transport",label:"Explains why transport action lowers emissions",triggerConcepts:["public_transport","emissions_standard"],resultConcepts:["lower_emissions"]},
          {id:"efficiency",label:"Explains why energy efficiency lowers emissions",triggerConcepts:["energy_efficiency"],resultConcepts:["lower_emissions"]},
          {id:"forest",label:"Explains why forest protection helps address climate change",triggerConcepts:["reforestation"],resultConcepts:["lower_emissions","protect_environment"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-b-q4",number:4,type:"structured",section:"A",syllabusSection:"B2",
    heading:"SUSTAINABLE DEVELOPMENT AND USE OF RESOURCES",
    context:"A tourism ministry wants more visitor spending to remain in the local economy. It is encouraging hotels to buy more food, craft and services from Caribbean suppliers.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Identify TWO benefits tourism may bring to Caribbean development.",2,
        ["Any two valid benefits such as employment, foreign exchange or support for local business."],
        listMark(2,[
          {id:"jobs",label:"Employment",concepts:["tourism_employment","employment"]},
          {id:"fx",label:"Foreign exchange earnings",concepts:["tourism_foreign_exchange","foreign_exchange"]},
          {id:"local",label:"Support for local industries",concepts:["tourism_linkage","local_linkages"]},
        ])),
      part("(b)","Explain TWO challenges that may reduce the development benefits of tourism.",4,
        ["Develop two challenges such as leakage, seasonality or environmental pressure."],
        developedMark(2,[
          {id:"leakage",label:"Tourism leakage sends income outside the local economy",concepts:["tourism_leakage"],developmentConcepts:["foreign_exchange"],allowGeneralDevelopment:true},
          {id:"season",label:"Seasonality creates unstable employment and income",concepts:["tourism_seasonality"],developmentConcepts:["seasonal_unemployment"],allowGeneralDevelopment:true},
          {id:"environment",label:"Tourism can damage fragile environments",concepts:["tourism_environment_pressure"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
          {id:"imports",label:"Heavy dependence on imports weakens local linkages",phrases:["tourism imports","imported food for hotels","hotels import goods"],developmentConcepts:["tourism_leakage","local_linkages"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO strategies tourism businesses could use to strengthen linkages with local industries.",4,
        ["Strategies should increase local purchasing, production or participation."],
        developedMark(2,[
          {id:"buy",label:"Purchase more from local suppliers",concepts:["local_linkages","tourism_linkage"],developmentConcepts:["employment","value_added"],allowGeneralDevelopment:true},
          {id:"contracts",label:"Create supplier partnerships with farmers and small businesses",phrases:["supplier partnership","supplier programme","supplier program","local supplier contract","hotel farmer partnership"],developmentConcepts:["local_linkages","job_creation"],allowGeneralDevelopment:true},
          {id:"culture",label:"Promote local cultural products and experiences",concepts:["cultural_tourism","promote_culture"],developmentConcepts:["value_added","tourism_linkage"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH strategy suggested in (c) (i) is likely to be successful.",4,
        ["Link local purchasing or partnerships to jobs, value added or income retained in the Caribbean."],
        linkedDevelopedMark(2,2,[
          {id:"buy",label:"Explains why local purchasing strengthens development",triggerConcepts:["local_linkages","tourism_linkage"],resultConcepts:["employment","value_added"]},
          {id:"culture",label:"Explains why cultural-tourism links strengthen development",triggerConcepts:["cultural_tourism","promote_culture"],resultConcepts:["value_added","tourism_linkage","employment"]},
        ])),
    ]),
  }),
  essay(
    "ss-p2-b-q5",5,"A1","Celebrating Cultural Diversity",
    "A community organisation is preparing a public feature on the cultural diversity of the Caribbean.",
    [
      "State TWO cultural forms found in the Caribbean.",
      "Explain TWO reasons for cultural diversity in the Caribbean.",
      "Outline ONE benefit of cultural diversity.",
      "Suggest THREE actions community groups could take to recognise and promote Caribbean cultural diversity.",
      "Explain why any TWO of the suggested actions are likely to be successful.",
    ],
    [
      "Use essay format with a clear introduction and coherent paragraphs.",
      "Develop each explanation rather than listing points.",
      "Use relevant Caribbean examples.",
    ]
  ),
  essay(
    "ss-p2-b-q6",6,"B1","Protecting Resources for Future Generations",
    "An environmental club is preparing a speech on sustainable development and climate responsibility.",
    [
      "Define sustainable development.",
      "Identify TWO natural resources, other than agricultural land, that should be conserved.",
      "Explain TWO ways agricultural land may be conserved.",
      "Suggest THREE actions government could take to reduce the causes of climate change.",
      "Explain why any TWO of the suggested actions are likely to be successful.",
    ],
    [
      "Use essay format and organise the response around the required tasks.",
      "Connect environmental actions to their likely outcomes.",
      "Use Caribbean examples where appropriate.",
    ]
  ),
]);

const SET_C=freeze([
  freeze({
    id:"ss-p2-c-q1",number:1,type:"structured",section:"A",syllabusSection:"A1",
    heading:"INDIVIDUAL, FAMILY AND SOCIETY",
    context:"A secondary school is planning a Caribbean Heritage Week involving students, parents, artistes and members of the diaspora.",
    totalMarks:14,
    parts:freeze([
      part("(a)","State TWO types of family union found in the Caribbean.",2,
        ["Accept visiting union, common-law union and legal marriage."],
        listMark(2,[
          {id:"visiting",label:"Visiting union",concepts:["visiting_union"]},
          {id:"common",label:"Common-law union",concepts:["common_law_union"]},
          {id:"marriage",label:"Legal marriage",concepts:["legal_marriage"]},
        ])),
      part("(b)","Explain TWO ways cultural diversity may benefit Caribbean society.",4,
        ["Develop two benefits such as identity, creativity, tourism, tolerance or cultural exchange."],
        developedMark(2,[
          {id:"identity",label:"Strengthens appreciation of Caribbean identity",concepts:["cultural_identity","cultural_diversity"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
          {id:"tourism",label:"Creates cultural-tourism opportunities",concepts:["cultural_tourism"],developmentConcepts:["employment","foreign_exchange"],allowGeneralDevelopment:true},
          {id:"creativity",label:"Encourages cultural exchange and creativity",phrases:["cultural exchange","creative expression","new cultural forms","mix of traditions"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"tolerance",label:"Builds respect for different groups",phrases:["respect different cultures","tolerance","appreciate differences","respect cultural differences"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO actions the school could take to promote Caribbean culture during Heritage Week.",4,
        ["Actions should involve active cultural learning, performance, display or community participation."],
        developedMark(2,[
          {id:"festival",label:"Stage cultural performances, exhibitions or food fairs",concepts:["cultural_form_festival","promote_culture"],developmentConcepts:["cultural_transmission","cultural_identity"],allowGeneralDevelopment:true},
          {id:"school",label:"Teach cultural heritage through lessons and workshops",concepts:["education_agent"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
          {id:"artists",label:"Invite artistes and cultural groups",concepts:["artistes_agent"],developmentConcepts:["promote_culture","cultural_transmission"],allowGeneralDevelopment:true},
          {id:"diaspora",label:"Connect with members of the Caribbean diaspora",concepts:["emigrants_agent"],developmentConcepts:["diaspora_cultural_spread"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH action suggested in (c) (i) is likely to be successful.",4,
        ["Link each earlier action to student participation, cultural transmission or stronger identity."],
        linkedDevelopedMark(2,2,[
          {id:"festival",label:"Explains why performances or exhibitions would help",triggerConcepts:["cultural_form_festival","promote_culture"],resultConcepts:["cultural_transmission","cultural_identity"]},
          {id:"education",label:"Explains why school learning would help",triggerConcepts:["education_agent"],resultConcepts:["cultural_transmission","cultural_identity"]},
          {id:"artists",label:"Explains why artistes or diaspora participation would help",triggerConcepts:["artistes_agent","emigrants_agent"],resultConcepts:["promote_culture","diaspora_cultural_spread","cultural_transmission"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-c-q2",number:2,type:"structured",section:"A",syllabusSection:"A2",
    heading:"INDIVIDUAL, FAMILY AND SOCIETY",
    context:"A civic group is encouraging citizens to understand how government institutions work and how public officials should be held accountable.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Identify TWO types of social institution.",2,
        ["Any two recognised institutions such as family, education, religion, economy, government or recreation."],
        listMark(2,[
          {id:"family",label:"Family",concepts:["institution_family"]},
          {id:"education",label:"Education",concepts:["institution_education"]},
          {id:"religion",label:"Religion",concepts:["institution_religion"]},
          {id:"economy",label:"Economic institution",concepts:["institution_economy"]},
          {id:"government",label:"Political or government institution",concepts:["institution_government"]},
          {id:"recreation",label:"Recreation",concepts:["institution_recreation"]},
        ])),
      part("(b)","Explain TWO functions performed by government.",4,
        ["Develop any two valid functions."],
        developedMark(2,[
          {id:"services",label:"Provide social services",concepts:["government_social_services"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
          {id:"order",label:"Maintain law and order",concepts:["government_law_order"],developmentConcepts:["rule_of_law"],allowGeneralDevelopment:true},
          {id:"economy",label:"Manage and support the economy",concepts:["government_economic_management"],developmentConcepts:["gdp","employment"],allowGeneralDevelopment:true},
          {id:"relations",label:"Conduct foreign relations",concepts:["government_foreign_relations"],developmentConcepts:["bargaining_power"],allowGeneralDevelopment:true},
          {id:"infrastructure",label:"Provide infrastructure",concepts:["infrastructure"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO measures that could strengthen transparency and accountability in government.",4,
        ["Measures should make public decisions easier to scrutinise or officials more answerable."],
        developedMark(2,[
          {id:"publish",label:"Publish public spending and decision information",concepts:["transparency"],developmentConcepts:["accountability"],allowGeneralDevelopment:true},
          {id:"audit",label:"Use independent audits and oversight",phrases:["independent audit","public audit","auditor general","oversight body","independent oversight"],developmentConcepts:["accountability","transparency"],allowGeneralDevelopment:true},
          {id:"redress",label:"Strengthen complaint and redress mechanisms",concepts:["redress"],developmentConcepts:["accountability"],allowGeneralDevelopment:true},
          {id:"law",label:"Enforce laws against misuse of public resources",concepts:["rule_of_law"],developmentConcepts:["accountability"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH measure suggested in (c) (i) is likely to be successful.",4,
        ["Show how the measure increases scrutiny, responsibility or lawful behaviour."],
        linkedDevelopedMark(2,2,[
          {id:"publish",label:"Explains why public information improves scrutiny",triggerConcepts:["transparency"],resultConcepts:["accountability"]},
          {id:"redress",label:"Explains why redress makes officials answerable",triggerConcepts:["redress"],resultConcepts:["accountability","rule_of_law"]},
          {id:"law",label:"Explains why stronger enforcement supports accountability",triggerConcepts:["rule_of_law"],resultConcepts:["accountability"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-c-q3",number:3,type:"structured",section:"A",syllabusSection:"B1",
    heading:"SUSTAINABLE DEVELOPMENT AND USE OF RESOURCES",
    context:"A Caribbean government is reviewing population data after continued emigration by young professionals and changing demand for schools, housing and health services.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Define the term ‘natural increase’.",2,
        ["The difference between births and deaths, with population increasing when births exceed deaths."],
        definitionMark([
          {id:"difference",label:"Difference between births and deaths",phrases:["birth rate minus death rate","births minus deaths","difference between births and deaths"],marks:1},
          {id:"growth",label:"Births exceed deaths",concepts:["natural_increase"],phrases:["more births than deaths","births exceed deaths"],marks:1},
        ])),
      part("(b)","Explain TWO ways population statistics help governments plan for development.",4,
        ["Develop two uses such as planning services, allocating resources or projecting future needs."],
        developedMark(2,[
          {id:"services",label:"Plan schools, hospitals and other services",concepts:["population_planning"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
          {id:"resources",label:"Allocate resources to areas of greatest need",concepts:["population_resource_allocation"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
          {id:"forecast",label:"Project future population needs",concepts:["population_projection"],developmentConcepts:["population_planning"],allowGeneralDevelopment:true},
          {id:"infrastructure",label:"Plan housing and infrastructure",concepts:["population_planning","infrastructure"],developmentConcepts:["population_resource_allocation"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO actions government could take to encourage skilled workers to remain in the country.",4,
        ["Actions may address jobs, pay, working conditions, career development or quality of life."],
        developedMark(2,[
          {id:"jobs",label:"Create suitable skilled employment",concepts:["job_creation"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
          {id:"pay",label:"Improve salaries and compensation",concepts:["better_wages"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
          {id:"conditions",label:"Improve working conditions",concepts:["better_work_conditions"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
          {id:"career",label:"Expand professional development",concepts:["career_development"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
          {id:"services",label:"Improve public services and quality of life",concepts:["improve_social_services"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH action suggested in (c) (i) is likely to be successful.",4,
        ["Link each action to a reason skilled workers would be more willing to remain."],
        linkedDevelopedMark(2,2,[
          {id:"jobs",label:"Explains why suitable employment encourages retention",triggerConcepts:["job_creation"],resultConcepts:["retain_workers","employment"]},
          {id:"pay",label:"Explains why better pay encourages retention",triggerConcepts:["better_wages"],resultConcepts:["retain_workers"]},
          {id:"conditions",label:"Explains why better working conditions encourage retention",triggerConcepts:["better_work_conditions"],resultConcepts:["retain_workers"]},
          {id:"career",label:"Explains why career opportunities encourage retention",triggerConcepts:["career_development"],resultConcepts:["retain_workers"]},
          {id:"services",label:"Explains why quality-of-life improvements encourage retention",triggerConcepts:["improve_social_services"],resultConcepts:["retain_workers"]},
        ])),
    ]),
  }),
  freeze({
    id:"ss-p2-c-q4",number:4,type:"structured",section:"A",syllabusSection:"B2",
    heading:"SUSTAINABLE DEVELOPMENT AND USE OF RESOURCES",
    context:"Caribbean businesses increasingly use digital platforms to sell services and products across the region. Governments want to make cross-border digital trade easier.",
    totalMarks:14,
    parts:freeze([
      part("(a)","Identify TWO regional institutions or arrangements that support Caribbean cooperation.",2,
        ["Any two relevant institutions or arrangements."],
        listMark(2,[
          {id:"caricom",label:"CARICOM",concepts:["caricom"]},
          {id:"csme",label:"CSME",concepts:["csme"]},
          {id:"oecs",label:"OECS",concepts:["oecs"]},
          {id:"ccj",label:"CCJ",concepts:["ccj"]},
        ])),
      part("(b)","Explain TWO ways information and communication technology can contribute to Caribbean development.",4,
        ["Develop two valid contributions such as e-commerce, remote services, education or efficiency."],
        developedMark(2,[
          {id:"services",label:"Supports remote and exportable services",concepts:["ict_remote_services"],developmentConcepts:["employment","foreign_exchange"],allowGeneralDevelopment:true},
          {id:"commerce",label:"Expands e-commerce and market access",concepts:["ict_ecommerce"],developmentConcepts:["larger_market","more_regional_trade"],allowGeneralDevelopment:true},
          {id:"education",label:"Expands education and training access",concepts:["ict_education"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
          {id:"efficiency",label:"Improves communication and efficiency",concepts:["ict_efficiency"],developmentConcepts:["value_added"],allowGeneralDevelopment:true},
        ])),
      part("(c) (i)","Suggest TWO actions governments could take to strengthen digital trade within the Caribbean.",4,
        ["Actions should reduce cross-border barriers or improve regional digital market access."],
        developedMark(2,[
          {id:"customs",label:"Use electronic and harmonised customs procedures",concepts:["digital_trade","harmonise_customs"],developmentConcepts:["faster_trade","lower_trade_costs"],allowGeneralDevelopment:true},
          {id:"standards",label:"Adopt common regional standards for digital transactions",concepts:["common_standards"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"finance",label:"Improve payment and trade-finance access",concepts:["trade_finance"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"platform",label:"Support regional e-commerce platforms",concepts:["ict_ecommerce","digital_trade"],developmentConcepts:["larger_market","more_regional_trade"],allowGeneralDevelopment:true},
        ])),
      part("(c) (ii)","Explain why EACH action suggested in (c) (i) is likely to be successful.",4,
        ["Show how the action lowers cost, reduces delays or expands market access."],
        linkedDevelopedMark(2,2,[
          {id:"customs",label:"Explains why digital or harmonised customs helps trade",triggerConcepts:["digital_trade","harmonise_customs"],resultConcepts:["faster_trade","lower_trade_costs"]},
          {id:"standards",label:"Explains why common standards help trade",triggerConcepts:["common_standards"],resultConcepts:["more_regional_trade","faster_trade"]},
          {id:"finance",label:"Explains why finance or payment access helps trade",triggerConcepts:["trade_finance"],resultConcepts:["more_regional_trade"]},
          {id:"platform",label:"Explains why e-commerce platforms expand trade",triggerConcepts:["ict_ecommerce"],resultConcepts:["larger_market","more_regional_trade"]},
        ])),
    ]),
  }),
  essay(
    "ss-p2-c-q5",5,"A2","Government, Elections and Social Services",
    "A youth conference is examining how democratic government prepares for elections and provides services to citizens.",
    [
      "Define democracy.",
      "Outline ONE function of government other than providing social services.",
      "Describe TWO ways political parties prepare for elections.",
      "Suggest THREE strategies government could use to maintain adequate social services.",
      "Explain why any TWO of the suggested strategies are likely to be successful.",
    ],
    [
      "Use a clear essay structure.",
      "Keep political-party activities separate from government responsibilities.",
      "Develop each proposed strategy with a practical result.",
    ]
  ),
  essay(
    "ss-p2-c-q6",6,"B1","Building Climate Resilience",
    "A community organisation is preparing a public education article on responding to climate change in the Caribbean.",
    [
      "Define climate-change adaptation.",
      "Identify TWO effects of climate change on Caribbean communities.",
      "Explain TWO ways households or communities may adapt to climate impacts.",
      "Suggest THREE government measures that could strengthen climate resilience.",
      "Explain why any TWO of the suggested measures are likely to be successful.",
    ],
    [
      "Use essay format with coherent paragraphs.",
      "Distinguish adaptation from measures that reduce the causes of climate change.",
      "Use Caribbean examples where relevant.",
    ]
  ),
]);

export const SOCIAL_STUDIES_PAPER2_VARIANTS=freeze([
  freeze({id:"B",label:"Practice Paper B",questions:SET_B}),
  freeze({id:"C",label:"Practice Paper C",questions:SET_C}),
]);

export function socialStudiesPaper2VariantStats(){
  return freeze({
    sets:SOCIAL_STUDIES_PAPER2_VARIANTS.length,
    questions:SOCIAL_STUDIES_PAPER2_VARIANTS.reduce((sum,set)=>sum+set.questions.length,0),
    structured:SOCIAL_STUDIES_PAPER2_VARIANTS.reduce((sum,set)=>sum+set.questions.filter(item=>item.type==="structured").length,0),
    essays:SOCIAL_STUDIES_PAPER2_VARIANTS.reduce((sum,set)=>sum+set.questions.filter(item=>item.type==="essay").length,0),
  });
}
