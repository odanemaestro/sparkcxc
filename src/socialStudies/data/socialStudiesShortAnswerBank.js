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
  id,sectionId,lessonId,command,prompt,marks,marking,
  modelPoints:freeze(modelPoints || []),
});

export const SOCIAL_STUDIES_SHORT_ANSWER_BANK=freeze([
  item("ss-sa-a1-01","A1","a1-family-foundations","identify",
    "Identify TWO functions performed by the family.",
    2,
    listScheme(2,[
      {id:"socialisation",label:"Socialisation",concepts:["family_socialisation"]},
      {id:"economic",label:"Economic support",concepts:["family_economic_support"]},
      {id:"emotional",label:"Emotional support",concepts:["family_emotional_support"]},
      {id:"protection",label:"Protection",concepts:["family_protection"]},
      {id:"reproduction",label:"Reproduction",concepts:["family_reproduction"]},
      {id:"education",label:"Education",concepts:["family_education"]},
      {id:"recreation",label:"Recreation",concepts:["family_recreation"]},
    ]),
    ["Socialisation","Economic support","Emotional support","Protection","Reproduction","Education","Recreation"]),

  item("ss-sa-a1-02","A1","a1-family-types-unions","state",
    "State TWO types of family found in Caribbean society.",
    2,
    listScheme(2,[
      {id:"nuclear",label:"Nuclear family",concepts:["nuclear_family"]},
      {id:"extended",label:"Extended family",concepts:["extended_family"]},
      {id:"single",label:"Single-parent family",concepts:["single_parent_family"]},
      {id:"sibling",label:"Sibling household",concepts:["sibling_household"]},
      {id:"blended",label:"Blended or reconstituted family",concepts:["blended_family"]},
    ]),
    ["Nuclear","Extended","Single-parent","Sibling household","Blended/reconstituted"]),

  item("ss-sa-a1-03","A1","a1-family-types-unions","distinguish",
    "Distinguish between a visiting union and a common-law union.",
    2,
    criteriaScheme([
      {id:"visiting",label:"Visiting partners maintain separate households",anyConcepts:["visiting_union"],anyPhrases:["live separately","separate households","separate homes","do not share a permanent home"],marks:1},
      {id:"common-law",label:"Common-law partners live together without formal marriage",anyConcepts:["common_law_union"],anyPhrases:["living together without marriage","live together without being married","live together without being legally married","cohabit without marriage"],marks:1},
    ],2),
    ["Visiting partners live in separate households.","Common-law partners cohabit without formal legal marriage."]),

  item("ss-sa-a1-04","A1","a1-roles-changing-family","explain",
    "Explain TWO factors that have contributed to changing family roles in the Caribbean.",
    4,
    developedScheme(2,[
      {id:"employment",label:"More women in paid employment",concepts:["women_employment"],developmentConcepts:["role_sharing","economic_pressure"],allowGeneralDevelopment:true},
      {id:"education",label:"Expanded educational opportunities for women",concepts:["women_education"],developmentConcepts:["role_sharing","changing_gender_norms"],allowGeneralDevelopment:true},
      {id:"attitudes",label:"Changing attitudes to gender roles",concepts:["changing_gender_norms"],developmentConcepts:["role_sharing"],allowGeneralDevelopment:true},
      {id:"economy",label:"Economic pressure and need for two incomes",concepts:["economic_pressure"],developmentConcepts:["role_sharing","women_employment"],allowGeneralDevelopment:true},
      {id:"technology",label:"Technology and flexible work",concepts:["technology_remote_work"],developmentConcepts:["role_sharing"],allowGeneralDevelopment:true},
      {id:"migration",label:"Migration changes who performs household duties",concepts:["migration_family_change"],developmentConcepts:["role_sharing"],allowGeneralDevelopment:true},
    ]),
    ["Employment","Education","Changing gender expectations","Economic pressure","Technology","Migration"]),

  item("ss-sa-a1-05","A1","a1-parenthood-research","suggest",
    "Suggest TWO ways parents could improve financial management in the home.",
    4,
    developedScheme(2,[
      {id:"budget",label:"Prepare and follow a household budget",concepts:["budgeting"],developmentConcepts:["improved_money_control","expense_tracking","savings_plan"],allowGeneralDevelopment:true},
      {id:"track",label:"Track household spending",concepts:["expense_tracking"],developmentConcepts:["improved_money_control","budgeting"],allowGeneralDevelopment:true},
      {id:"save",label:"Create a savings or emergency plan",concepts:["savings_plan"],developmentConcepts:["reduced_financial_stress","improved_money_control"],allowGeneralDevelopment:true},
      {id:"counselling",label:"Use financial-literacy or budgeting support",concepts:["financial_counselling"],developmentConcepts:["budgeting","improved_money_control"],allowGeneralDevelopment:true},
    ]),
    ["Budget","Track spending","Save regularly","Use financial-literacy support"]),

  item("ss-sa-a1-06","A1","a1-family-social-issues","suggest",
    "Suggest TWO measures that could help persons affected by domestic violence.",
    4,
    developedScheme(2,[
      {id:"report",label:"Provide safe reporting channels",concepts:["abuse_reporting"],developmentConcepts:["legal_protection","shelters_support"],allowGeneralDevelopment:true},
      {id:"shelter",label:"Provide shelters or safe houses",concepts:["shelters_support"],developmentConcepts:["family_protection","legal_protection"],allowGeneralDevelopment:true},
      {id:"counselling",label:"Provide counselling and support services",concepts:["counselling_services"],developmentConcepts:["improved_family_relationships"],allowGeneralDevelopment:true},
      {id:"education",label:"Run public-education campaigns",concepts:["public_education_abuse"],developmentConcepts:["abuse_reporting","legal_protection"],allowGeneralDevelopment:true},
      {id:"law",label:"Strengthen legal protection and enforcement",concepts:["legal_protection"],developmentConcepts:["family_protection"],allowGeneralDevelopment:true},
    ]),
    ["Safe reporting","Shelters","Counselling","Public education","Legal protection"]),

  item("ss-sa-a1-07","A1","a1-cultural-transmission","identify",
    "Identify TWO agents of cultural transmission.",
    2,
    listScheme(2,[
      {id:"family",label:"Family",concepts:["family_agent"]},
      {id:"media",label:"Media",concepts:["media_agent"]},
      {id:"school",label:"Education",concepts:["education_agent"]},
      {id:"religion",label:"Religion",concepts:["religion_agent"]},
      {id:"artists",label:"Artistes and cultural groups",concepts:["artistes_agent"]},
      {id:"diaspora",label:"Emigrants and the diaspora",concepts:["emigrants_agent"]},
    ]),
    ["Family","Media","Education","Religion","Artistes","Diaspora"]),

  item("ss-sa-a1-08","A1","a1-cultural-transmission","explain",
    "Explain TWO ways cultural transmission can strengthen Caribbean identity.",
    4,
    developedScheme(2,[
      {id:"identity",label:"Builds a shared sense of Caribbean identity",concepts:["cultural_identity"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
      {id:"preserve",label:"Keeps traditions and heritage alive",concepts:["preserve_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"promote",label:"Promotes Caribbean culture across generations and places",concepts:["promote_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"diversity",label:"Builds appreciation of Caribbean cultural diversity",concepts:["cultural_diversity"],developmentConcepts:["cultural_identity"],allowGeneralDevelopment:true},
    ]),
    ["Shared identity","Preserves heritage","Promotes culture","Builds appreciation of diversity"]),

  item("ss-sa-a1-09","A1","a1-family-foundations","define",
    "Define the term socialisation in the context of the family.",
    2,
    definitionScheme([
      {id:"learning",label:"Learning or teaching values, norms or behaviour",phrases:["teach values","teaches values","learn values","learn norms","teach norms","acceptable behaviour","acceptable behavior"],marks:1},
      {id:"society",label:"Prepares children or members to function in society",phrases:["prepare children for society","function in society","acceptable behaviour","acceptable behavior"],marks:1},
    ]),
    ["Learning values and norms","Preparation for participation in society"]),

  item("ss-sa-a1-10","A1","a1-caribbean-culture-world","suggest",
    "Suggest TWO ways Caribbean cultural organisations could preserve and promote cultural heritage.",
    4,
    developedScheme(2,[
      {id:"preserve",label:"Document and preserve cultural practices",concepts:["preserve_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"promote",label:"Use festivals, media or campaigns to promote culture",concepts:["promote_culture","media_agent"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"school",label:"Teach cultural heritage through schools",concepts:["education_agent"],developmentConcepts:["cultural_transmission","cultural_identity"],allowGeneralDevelopment:true},
      {id:"diaspora",label:"Use diaspora networks to share Caribbean culture",concepts:["emigrants_agent"],developmentConcepts:["promote_culture","cultural_identity"],allowGeneralDevelopment:true},
    ]),
    ["Documentation","Festivals and media","School programmes","Diaspora networks"]),

  item("ss-sa-a2-01","A2","a2-social-groups","distinguish",
    "Distinguish between a primary group and a secondary group.",
    2,
    criteriaScheme([
      {id:"primary",label:"Primary groups have close personal relationships",anyConcepts:["primary_group"],anyPhrases:["close personal","intimate group","strong personal relationships","close relationships"],marks:1},
      {id:"secondary",label:"Secondary groups are more formal or goal-oriented",anyConcepts:["secondary_group"],anyPhrases:["formal","goal oriented","goal-oriented","impersonal","less personal"],marks:1},
    ],2),
    ["Primary groups are close and personal.","Secondary groups are more formal and goal-oriented."]),

  item("ss-sa-a2-02","A2","a2-cohesion-control-interaction","explain",
    "Explain TWO factors that can strengthen group cohesion.",
    4,
    developedScheme(2,[
      {id:"goals",label:"Shared goals",concepts:["shared_goals"],developmentConcepts:["group_cohesion","cooperation"],allowGeneralDevelopment:true},
      {id:"leadership",label:"Effective leadership",concepts:["effective_leadership"],developmentConcepts:["group_cohesion","cooperation"],allowGeneralDevelopment:true},
      {id:"communication",label:"Good communication",concepts:["communication_group"],developmentConcepts:["group_cohesion","cooperation"],allowGeneralDevelopment:true},
      {id:"cooperation",label:"Cooperation",concepts:["cooperation"],developmentConcepts:["group_cohesion","commitment"],allowGeneralDevelopment:true},
      {id:"commitment",label:"Commitment and loyalty",concepts:["commitment"],developmentConcepts:["group_cohesion"],allowGeneralDevelopment:true},
    ]),
    ["Shared goals","Effective leadership","Communication","Cooperation","Commitment"]),

  item("ss-sa-a2-03","A2","a2-cohesion-control-interaction","identify",
    "Identify ONE positive sanction and ONE negative sanction that a school may use.",
    2,
    criteriaScheme([
      {id:"positive",label:"Positive sanction",anyPhrases:["reward","praise","recognition","award"],marks:1},
      {id:"negative",label:"Negative sanction",anyPhrases:["punishment","detention","fine","penalty","disciplinary action"],marks:1},
    ],2),
    ["Praise or reward","Detention or another penalty"]),

  item("ss-sa-a2-04","A2","a2-social-institutions","identify",
    "Identify TWO characteristics of a social institution.",
    2,
    listScheme(2,[
      {id:"enduring",label:"Endures over time",concepts:["institution_enduring"]},
      {id:"norms",label:"Has norms and values",concepts:["institution_norms"]},
      {id:"structure",label:"Has roles or structure",concepts:["institution_structure"]},
      {id:"function",label:"Performs recognised social functions",concepts:["institution_function"]},
      {id:"interdependence",label:"Interacts with other institutions",concepts:["interdependence"]},
    ]),
    ["Enduring","Norms and values","Structure","Recognised functions","Interdependence"]),

  item("ss-sa-a2-05","A2","a2-government-systems","distinguish",
    "Distinguish between a constitutional monarchy and a republic.",
    2,
    criteriaScheme([
      {id:"monarchy",label:"Constitutional monarchy has a monarch as head of state",anyConcepts:["constitutional_monarchy"],anyPhrases:["monarch as head of state","king as head of state","queen as head of state"],marks:1},
      {id:"republic",label:"Republic has a non-monarchical head of state",anyConcepts:["republic"],anyPhrases:["president as head of state","non monarchical head of state","non-monarchical head of state","no monarch as head of state"],marks:1},
    ],2),
    ["Monarch as head of state","Non-monarchical head of state"]),

  item("ss-sa-a2-06","A2","a2-government-structure","state",
    "State ONE function of EACH arm of government: legislature, executive and judiciary.",
    3,
    listScheme(3,[
      {id:"legislature",label:"Legislature makes laws",concepts:["legislature"]},
      {id:"executive",label:"Executive implements laws and policy",concepts:["executive"]},
      {id:"judiciary",label:"Judiciary interprets and applies laws",concepts:["judiciary"]},
    ]),
    ["Legislature makes laws","Executive implements laws","Judiciary interprets laws"]),

  item("ss-sa-a2-07","A2","a2-electoral-systems","define",
    "Define the first-past-the-post electoral system.",
    2,
    definitionScheme([
      {id:"constituency",label:"Election is contested by constituency or seat",concepts:["constituency"],marks:1},
      {id:"plurality",label:"Candidate with the largest number of votes wins",concepts:["largest_votes_wins"],marks:1},
    ]),
    ["Constituency-based system","Candidate with most votes wins the seat"]),

  item("ss-sa-a2-08","A2","a2-parties-information-decisions","distinguish",
    "Distinguish between a fact and an opinion when evaluating political information.",
    2,
    criteriaScheme([
      {id:"fact",label:"Fact is verifiable or supported by evidence",anyConcepts:["fact"],anyPhrases:["verifiable","can be checked","supported by evidence","proved with evidence"],marks:1},
      {id:"opinion",label:"Opinion is a personal judgement or view",anyConcepts:["opinion"],anyPhrases:["personal view","personal judgement","personal judgment","belief","cannot be proven as fact"],marks:1},
    ],2),
    ["Fact can be verified.","Opinion expresses a judgement or view."]),

  item("ss-sa-a2-09","A2","a2-governance-citizenship","identify",
    "Identify TWO characteristics of good governance.",
    2,
    listScheme(2,[
      {id:"transparency",label:"Transparency",concepts:["transparency"]},
      {id:"accountability",label:"Accountability",concepts:["accountability"]},
      {id:"law",label:"Rule of law",concepts:["rule_of_law"]},
      {id:"rights",label:"Respect for rights and freedoms",concepts:["rights_freedoms"]},
      {id:"powers",label:"Separation of powers",concepts:["separation_of_powers"]},
      {id:"elections",label:"Free and fair elections",concepts:["free_fair_elections"]},
    ]),
    ["Transparency","Accountability","Rule of law","Rights","Separation of powers","Free and fair elections"]),

  item("ss-sa-a2-10","A2","a2-election-outcomes-data","suggest",
    "Suggest TWO measures that could encourage young adults to participate in elections.",
    4,
    developedScheme(2,[
      {id:"education",label:"Civic or voter education",concepts:["civic_education"],developmentConcepts:["increased_awareness","increased_participation"],allowGeneralDevelopment:true},
      {id:"social",label:"Youth-focused social-media campaigns",concepts:["youth_social_media"],developmentConcepts:["increased_awareness","increased_participation"],allowGeneralDevelopment:true},
      {id:"registration",label:"Voter-registration drives",concepts:["voter_registration_drive"],developmentConcepts:["reduced_access_barriers","increased_participation"],allowGeneralDevelopment:true},
      {id:"access",label:"Improve access to polling",concepts:["polling_access"],developmentConcepts:["reduced_access_barriers","increased_participation"],allowGeneralDevelopment:true},
      {id:"outreach",label:"Youth forums or community outreach",concepts:["community_outreach"],developmentConcepts:["increased_awareness","increased_participation"],allowGeneralDevelopment:true},
    ]),
    ["Civic education","Social media","Registration drives","Polling access","Community outreach"]),

  item("ss-sa-b1-01","B1","b1-population-foundations","identify",
    "Identify TWO reliable sources of population data.",
    2,
    listScheme(2,[
      {id:"census",label:"Population census",concepts:["census"]},
      {id:"registration",label:"Civil or vital registration",concepts:["vital_registration"]},
      {id:"survey",label:"Official survey or questionnaire",concepts:["questionnaire","reliable_source"]},
    ]),
    ["Census","Vital/civil registration","Official survey"]),

  item("ss-sa-b1-02","B1","b1-density-distribution","define",
    "Define population density.",
    2,
    definitionScheme([
      {id:"people",label:"Number of people living in an area",phrases:["number of people","population living in an area","people living in an area"],marks:1},
      {id:"area",label:"Expressed relative to land area, usually per square kilometre",phrases:["per square kilometre","per square kilometer","divided by area","per unit area","relative to land area"],marks:1},
    ]),
    ["Population relative to land area","Usually people per square kilometre"]),

  item("ss-sa-b1-03","B1","b1-population-data","describe",
    "Describe TWO features suggested by a population pyramid with a broad base.",
    2,
    listScheme(2,[
      {id:"young",label:"Large young population",concepts:["broad_pyramid_base"]},
      {id:"birth",label:"Relatively high birth rate",concepts:["birth_rate","broad_pyramid_base"]},
      {id:"dependency",label:"High child dependency",concepts:["dependency_ratio","broad_pyramid_base"]},
    ]),
    ["Large proportion of children","Relatively high birth rate","High child dependency"]),

  item("ss-sa-b1-04","B1","b1-migration","distinguish",
    "Distinguish between immigration and emigration.",
    2,
    criteriaScheme([
      {id:"immigration",label:"Immigration is movement into a country to live",anyConcepts:["immigration"],anyPhrases:["move into country","movement into a country","enter country to live","people arriving to live"],marks:1},
      {id:"emigration",label:"Emigration is movement out of a country to live elsewhere",anyConcepts:["emigration"],anyPhrases:["leave the country","movement out of a country","move overseas","migrate abroad","leave to live abroad"],marks:1},
    ],2),
    ["Immigration is movement in.","Emigration is movement out."]),

  item("ss-sa-b1-05","B1","b1-migration","explain",
    "Explain TWO push factors that may cause Caribbean workers to migrate.",
    4,
    developedScheme(2,[
      {id:"jobs",label:"Unemployment or underemployment",concepts:["unemployment","underemployment"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
      {id:"pay",label:"Low wages",concepts:["low_wages"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
      {id:"conditions",label:"Poor working conditions",concepts:["poor_working_conditions"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
      {id:"career",label:"Limited career opportunities",concepts:["limited_career_growth"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
      {id:"crime",label:"Crime or insecurity",concepts:["insecurity_crime"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
      {id:"services",label:"Poor quality of life or weak services",concepts:["low_standard_living"],developmentConcepts:["emigration"],allowGeneralDevelopment:true},
    ]),
    ["Unemployment","Low wages","Poor conditions","Limited advancement","Crime","Low quality of life"]),

  item("ss-sa-b1-06","B1","b1-human-resource-development","identify",
    "Identify TWO investments that contribute to human-resource development.",
    2,
    listScheme(2,[
      {id:"training",label:"Education and training",concepts:["education_training","human_resource_development"]},
      {id:"health",label:"Health care",concepts:["health_investment","human_resource_development"]},
      {id:"lifelong",label:"Lifelong learning and reskilling",concepts:["lifelong_learning"]},
    ]),
    ["Education and training","Health care","Lifelong learning"]),

  item("ss-sa-b1-07","B1","b1-employment","distinguish",
    "Distinguish between unemployment and underemployment.",
    2,
    criteriaScheme([
      {id:"unemployment",label:"Unemployment means being without a job while seeking work",anyConcepts:["unemployment"],anyPhrases:["without a job","no job","cannot find work","seeking work"],marks:1},
      {id:"underemployment",label:"Underemployment means insufficient hours or work below productive capacity",anyConcepts:["underemployment"],anyPhrases:["insufficient hours","too few hours","below skill level","below productive capacity","part time when full time wanted"],marks:1},
    ],2),
    ["No job while seeking work","Too few hours or work below capacity"]),

  item("ss-sa-b1-08","B1","b1-natural-resources","distinguish",
    "Distinguish between renewable and non-renewable natural resources.",
    2,
    criteriaScheme([
      {id:"renewable",label:"Renewable resources can regenerate or be replenished",anyConcepts:["renewable_resource"],anyPhrases:["can regenerate","can be replenished","replenishable"],marks:1},
      {id:"nonrenewable",label:"Non-renewable resources are finite or regenerate too slowly",anyConcepts:["nonrenewable_resource"],anyPhrases:["finite","cannot quickly regenerate","cannot be replaced quickly","will run out"],marks:1},
    ],2),
    ["Renewable resources regenerate.","Non-renewable resources are finite."]),

  item("ss-sa-b1-09","B1","b1-environmental-practices","identify",
    "Identify TWO practices that could reduce soil erosion on sloping land.",
    2,
    listScheme(2,[
      {id:"contour",label:"Contour farming",concepts:["contour_farming"]},
      {id:"terrace",label:"Terracing",concepts:["terracing"]},
      {id:"forest",label:"Maintain or restore vegetation cover",concepts:["reforestation","conservation"]},
    ]),
    ["Contour farming","Terracing","Vegetation or forest cover"]),

  item("ss-sa-b1-10","B1","b1-climate-change","distinguish",
    "Distinguish between climate-change mitigation and adaptation.",
    2,
    criteriaScheme([
      {id:"mitigation",label:"Mitigation reduces causes or greenhouse-gas emissions",anyConcepts:["mitigation"],anyPhrases:["reduce emissions","lower greenhouse gases","reduce causes","less carbon dioxide"],marks:1},
      {id:"adaptation",label:"Adaptation adjusts to impacts or reduces vulnerability",anyConcepts:["adaptation"],anyPhrases:["adjust to impacts","cope with climate change","reduce vulnerability","adapt to effects"],marks:1},
    ],2),
    ["Mitigation reduces causes/emissions.","Adaptation adjusts to effects."]),

  item("ss-sa-b2-01","B2","b2-caribbean-location","identify",
    "Identify TWO major territorial groupings used to describe the Caribbean.",
    2,
    listScheme(2,[
      {id:"greater",label:"Greater Antilles",concepts:["greater_antilles"]},
      {id:"lesser",label:"Lesser Antilles",concepts:["lesser_antilles"]},
      {id:"mainland",label:"Mainland Caribbean territories",concepts:["mainland_caribbean"]},
    ]),
    ["Greater Antilles","Lesser Antilles","Mainland Caribbean"]),

  item("ss-sa-b2-02","B2","b2-measuring-development","identify",
    "Identify ONE economic indicator and ONE social indicator of development.",
    2,
    criteriaScheme([
      {id:"economic",label:"Economic indicator",anyConcepts:["gdp","gross_national_income","per_capita_income"],marks:1},
      {id:"social",label:"Social indicator",anyConcepts:["life_expectancy","literacy","infant_mortality","school_enrolment"],marks:1},
    ],2),
    ["GDP/GNI/per-capita income","Life expectancy/literacy/infant mortality/school enrolment"]),

  item("ss-sa-b2-03","B2","b2-industries-ict","explain",
    "Explain TWO ways industries can contribute to Caribbean development.",
    4,
    developedScheme(2,[
      {id:"jobs",label:"Creates employment",concepts:["employment","job_creation"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
      {id:"foreign",label:"Earns foreign exchange",concepts:["foreign_exchange"],developmentConcepts:["gdp","gross_national_income"],allowGeneralDevelopment:true},
      {id:"value",label:"Adds value to local resources",concepts:["value_added"],developmentConcepts:["gdp","employment"],allowGeneralDevelopment:true},
      {id:"entrepreneur",label:"Supports entrepreneurship and business activity",concepts:["entrepreneurship"],developmentConcepts:["employment","value_added"],allowGeneralDevelopment:true},
      {id:"diversify",label:"Diversifies the economy",concepts:["economic_diversification"],developmentConcepts:["resilience","employment"],allowGeneralDevelopment:true},
    ]),
    ["Employment","Foreign exchange","Value added","Entrepreneurship","Diversification"]),

  item("ss-sa-b2-04","B2","b2-development-challenges","identify",
    "Identify TWO challenges that may slow Caribbean development.",
    2,
    listScheme(2,[
      {id:"market",label:"Small domestic markets",concepts:["small_market"]},
      {id:"transport",label:"High transport costs",concepts:["high_transport_cost"]},
      {id:"hazards",label:"Natural hazards",concepts:["natural_hazards"]},
      {id:"debt",label:"High public debt",concepts:["debt_burden"]},
      {id:"resources",label:"Limited natural or financial resources",concepts:["limited_resources"]},
      {id:"trade",label:"Trade barriers",concepts:["trade_barriers"]},
    ]),
    ["Small markets","Transport costs","Natural hazards","Debt","Limited resources","Trade barriers"]),

  item("ss-sa-b2-05","B2","b2-integration-roots","explain",
    "Explain TWO reasons Caribbean countries pursue regional integration.",
    4,
    developedScheme(2,[
      {id:"market",label:"Access to a larger market",concepts:["larger_market"],developmentConcepts:["economies_scale","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"resources",label:"Pool scarce resources and expertise",concepts:["pooled_resources"],developmentConcepts:["resilience","lower_trade_costs"],allowGeneralDevelopment:true},
      {id:"bargain",label:"Increase bargaining power",concepts:["bargaining_power"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
      {id:"movement",label:"Facilitate movement of goods, services, labour or capital",concepts:["free_movement"],developmentConcepts:["more_regional_trade","regional_integration"],allowGeneralDevelopment:true},
      {id:"resilience",label:"Cooperate on shared problems and shocks",concepts:["resilience","regional_integration"],developmentConcepts:["pooled_resources"],allowGeneralDevelopment:true},
    ]),
    ["Larger market","Pooled resources","Bargaining power","Free movement","Shared resilience"]),

  item("ss-sa-b2-06","B2","b2-regional-organisations","identify",
    "Identify TWO regional institutions or arrangements associated with Caribbean integration.",
    2,
    listScheme(2,[
      {id:"caricom",label:"CARICOM",concepts:["caricom"]},
      {id:"csme",label:"CSME",concepts:["csme"]},
      {id:"oecs",label:"OECS",concepts:["oecs"]},
      {id:"ccj",label:"CCJ",concepts:["ccj"]},
      {id:"carifta",label:"CARIFTA",concepts:["carifta"]},
      {id:"federation",label:"West Indies Federation",concepts:["west_indies_federation"]},
    ]),
    ["CARICOM","CSME","OECS","CCJ","CARIFTA","West Indies Federation"]),

  item("ss-sa-b2-07","B2","b2-integration-benefits-challenges","explain",
    "Explain TWO benefits Caribbean producers may receive from regional integration.",
    4,
    developedScheme(2,[
      {id:"market",label:"Larger regional market",concepts:["larger_market"],developmentConcepts:["more_regional_trade","economies_scale"],allowGeneralDevelopment:true},
      {id:"scale",label:"Economies of scale",concepts:["economies_scale"],developmentConcepts:["lower_trade_costs","larger_market"],allowGeneralDevelopment:true},
      {id:"movement",label:"Easier regional movement and market access",concepts:["free_movement"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
      {id:"supply",label:"Regional supply chains",concepts:["regional_supply_chains"],developmentConcepts:["resilience","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"resources",label:"Shared resources and expertise",concepts:["pooled_resources"],developmentConcepts:["resilience","lower_trade_costs"],allowGeneralDevelopment:true},
    ]),
    ["Larger market","Economies of scale","Free movement","Regional supply chains","Pooled resources"]),

  item("ss-sa-b2-08","B2","b2-integration-benefits-challenges","suggest",
    "Suggest TWO measures Caribbean governments could use to increase intra-regional trade.",
    4,
    developedScheme(2,[
      {id:"transport",label:"Improve regional transport",concepts:["improve_transport_links"],developmentConcepts:["lower_trade_costs","faster_trade","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"barriers",label:"Reduce trade barriers",concepts:["remove_trade_barriers"],developmentConcepts:["lower_trade_costs","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"customs",label:"Harmonise customs procedures",concepts:["harmonise_customs"],developmentConcepts:["faster_trade","lower_trade_costs"],allowGeneralDevelopment:true},
      {id:"standards",label:"Use common standards",concepts:["common_standards"],developmentConcepts:["faster_trade","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"finance",label:"Provide trade finance",concepts:["trade_finance"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
      {id:"digital",label:"Develop digital trade systems",concepts:["digital_trade"],developmentConcepts:["faster_trade","lower_trade_costs"],allowGeneralDevelopment:true},
    ]),
    ["Transport","Fewer barriers","Harmonised customs","Common standards","Trade finance","Digital trade"]),

  item("ss-sa-b2-09","B2","b2-tourism-integration","explain",
    "Explain TWO ways stronger tourism linkages can contribute to Caribbean development.",
    4,
    developedScheme(2,[
      {id:"local",label:"Hotels and attractions buy from local producers",concepts:["tourism_linkage"],developmentConcepts:["employment","value_added","foreign_exchange"],allowGeneralDevelopment:true},
      {id:"jobs",label:"Tourism linkages create employment",concepts:["employment","job_creation"],developmentConcepts:["tourism_linkage"],allowGeneralDevelopment:true},
      {id:"value",label:"Local processing and services retain more value",concepts:["value_added"],developmentConcepts:["tourism_linkage","gdp"],allowGeneralDevelopment:true},
      {id:"foreign",label:"Tourism earns foreign exchange",concepts:["foreign_exchange"],developmentConcepts:["gdp","gross_national_income"],allowGeneralDevelopment:true},
    ]),
    ["Local purchasing","Employment","Value added","Foreign exchange"]),

  item("ss-sa-b2-10","B2","b2-integration-citizens","suggest",
    "Suggest TWO actions businesses or citizens could take to support regional integration.",
    4,
    developedScheme(2,[
      {id:"supply",label:"Use or build regional supply chains",concepts:["regional_supply_chains"],developmentConcepts:["more_regional_trade","resilience"],allowGeneralDevelopment:true},
      {id:"trade",label:"Buy and sell more Caribbean goods and services",concepts:["more_regional_trade"],developmentConcepts:["larger_market","regional_integration"],allowGeneralDevelopment:true},
      {id:"digital",label:"Use digital platforms to reach regional customers",concepts:["digital_trade"],developmentConcepts:["more_regional_trade","larger_market"],allowGeneralDevelopment:true},
      {id:"standards",label:"Meet common regional standards",concepts:["common_standards"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
      {id:"cooperate",label:"Participate in regional partnerships and cooperation",concepts:["regional_integration","pooled_resources"],developmentConcepts:["resilience","more_regional_trade"],allowGeneralDevelopment:true},
    ]),
    ["Regional sourcing","Buy and sell Caribbean","Digital trade","Common standards","Regional partnerships"]),

  item("ss-sa-a1-11","A1","a1-family-types-unions","describe",
    "Describe TWO types of family unions found in the Caribbean.",
    4,
    developedScheme(2,[
      {id:"visiting",label:"Visiting union",concepts:["visiting_union"],developmentConcepts:["union_separate_households"]},
      {id:"common-law",label:"Common-law union",concepts:["common_law_union"],developmentConcepts:["union_cohabit_unmarried"]},
      {id:"marriage",label:"Legal marriage",concepts:["legal_marriage"],developmentConcepts:["union_legal_formal"]},
    ],"KC"),
    ["Visiting union with separate households","Common-law union with partners cohabiting without legal marriage","Legal marriage recognised by law"]),

  item("ss-sa-a1-12","A1","a1-family-social-issues","suggest",
    "Suggest TWO actions a government agency could take to reduce the incidence of domestic abuse.",
    4,
    developedScheme(2,[
      {id:"law",label:"Strengthen legal protection and enforcement",concepts:["legal_protection"],developmentConcepts:["family_protection","abuse_reporting"],allowGeneralDevelopment:true},
      {id:"report",label:"Provide confidential reporting channels",concepts:["abuse_reporting"],developmentConcepts:["legal_protection","shelters_support"],allowGeneralDevelopment:true},
      {id:"shelter",label:"Provide shelters and victim-support services",concepts:["shelters_support"],developmentConcepts:["family_protection","counselling_services"],allowGeneralDevelopment:true},
      {id:"counselling",label:"Provide counselling and intervention services",concepts:["counselling_services"],developmentConcepts:["improved_family_relationships"],allowGeneralDevelopment:true},
      {id:"education",label:"Run public-awareness programmes",concepts:["public_education_abuse"],developmentConcepts:["abuse_reporting","legal_protection"],allowGeneralDevelopment:true},
    ]),
    ["Legal protection","Safe reporting","Shelters","Counselling","Public education"]),

  item("ss-sa-a2-11","A2","a2-electoral-systems","outline",
    "Outline how a government is elected using the first-past-the-post electoral system.",
    2,
    criteriaScheme([
      {id:"constituency",label:"Candidates contest constituencies or seats",anyConcepts:["constituency"],marks:1},
      {id:"plurality",label:"The candidate with the most votes wins each constituency seat",anyConcepts:["largest_votes_wins"],marks:1},
    ],2),
    ["Candidates contest constituencies.","The candidate with the highest number of votes wins each seat."]),

  item("ss-sa-a2-12","A2","a2-parties-information-decisions","distinguish",
    "Outline ONE difference between a fact and propaganda in an electoral campaign.",
    2,
    criteriaScheme([
      {id:"fact",label:"Fact is verifiable and supported by evidence",anyConcepts:["fact"],anyPhrases:["verifiable","can be checked","supported by evidence","proved with evidence"],marks:1},
      {id:"propaganda",label:"Propaganda is persuasive or one-sided information intended to influence",anyConcepts:["propaganda"],anyPhrases:["one sided","one-sided","biased message","persuasive information","intended to influence"],marks:1},
    ],2),
    ["A fact can be checked against evidence.","Propaganda is one-sided persuasive information intended to influence people."]),

  item("ss-sa-b1-11","B1","b1-climate-change","define",
    "Define the term global warming.",
    2,
    definitionScheme([
      {id:"increase",label:"Shows an increase or rise",phrases:["increase","rise","rising"],marks:1},
      {id:"temperature",label:"Refers to the Earth's average or global temperature",phrases:["average global temperature","earth's average temperature","earth average temperature","global temperature","earth's temperature"],marks:1},
    ]),
    ["An increase","in the Earth's average global temperature"]),

  item("ss-sa-b1-12","B1","b1-climate-change","suggest",
    "Suggest TWO actions individuals could take to help reduce global warming.",
    4,
    developedScheme(2,[
      {id:"renewable",label:"Use renewable energy",concepts:["renewable_energy"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
      {id:"efficiency",label:"Reduce energy use or improve efficiency",concepts:["energy_efficiency"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
      {id:"transport",label:"Use public transport or reduce private vehicle use",concepts:["public_transport"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
      {id:"trees",label:"Plant or protect trees",concepts:["reforestation"],developmentConcepts:["lower_emissions","protect_environment"],allowGeneralDevelopment:true},
      {id:"waste",label:"Reduce, reuse or recycle waste",concepts:["waste_reduction"],developmentConcepts:["lower_emissions","protect_environment"],allowGeneralDevelopment:true},
    ]),
    ["Renewable energy","Energy efficiency","Public transport","Tree planting","Waste reduction"]),

  item("ss-sa-b2-11","B2","b2-measuring-development","define",
    "Define the term gross domestic product.",
    2,
    definitionScheme([
      {id:"value",label:"Total or monetary value of goods and services produced",phrases:["value of goods and services","total value of goods and services","monetary value of goods and services"],marks:1},
      {id:"place-time",label:"Produced within a country during a stated period",phrases:["within a country","in a country","within the country","during a year","in one year","during a period"],marks:1},
    ]),
    ["Value of goods and services produced","within a country during a given period"]),

  item("ss-sa-b2-12","B2","b2-development-challenges","outline",
    "Outline ONE way a high level of public debt may negatively affect sustainable development in the Caribbean.",
    2,
    developedScheme(1,[
      {id:"services",label:"Debt limits money available for public services or development",concepts:["debt_burden"],developmentConcepts:["public_services","public_investment","infrastructure"],allowGeneralDevelopment:true},
      {id:"tax",label:"Debt may increase pressure for taxes or spending cuts",concepts:["debt_burden"],developmentPhrases:["higher taxes","increase taxes","cut government spending","reduce public spending"],allowGeneralDevelopment:true},
      {id:"investment",label:"Debt servicing may crowd out investment in development",concepts:["debt_burden"],developmentConcepts:["public_investment","human_resource_development"],allowGeneralDevelopment:true},
    ],"KC"),
    ["Debt servicing leaves less money for services and infrastructure.","Debt can lead to higher taxes or spending cuts.","Debt may reduce investment in development."]),
  item("ss-sa-a1-13","A1","a1-family-law","identify",
    "Identify TWO legal responsibilities parents have towards their children.",
    2,
    listScheme(2,[
      {id:"maintenance",label:"Provide financial maintenance",concepts:["child_maintenance"]},
      {id:"education",label:"Ensure education and school attendance",concepts:["child_education_duty"]},
      {id:"protection",label:"Protect children from harm",concepts:["child_protection_duty"]},
      {id:"general",label:"Exercise parental responsibility for child welfare",concepts:["parental_responsibility"]},
    ]),
    ["Financial maintenance","Education","Protection from harm","General parental responsibility"]),

  item("ss-sa-a1-14","A1","a1-parenthood-research","explain",
    "Explain TWO practices that contribute to responsible parenthood.",
    4,
    developedScheme(2,[
      {id:"guidance",label:"Provide guidance and advice",concepts:["parental_guidance"],developmentConcepts:["informed_parenting","clear_communication"],allowGeneralDevelopment:true},
      {id:"supervision",label:"Supervise and monitor children appropriately",concepts:["parental_supervision"],developmentConcepts:["family_protection"],allowGeneralDevelopment:true},
      {id:"discipline",label:"Use fair and consistent discipline",concepts:["discipline_consistent"],developmentConcepts:["family_socialisation"],allowGeneralDevelopment:true},
      {id:"example",label:"Set a positive example",concepts:["parental_role_model"],developmentConcepts:["family_socialisation"],allowGeneralDevelopment:true},
      {id:"communication",label:"Maintain open communication",concepts:["clear_communication","active_listening"],developmentConcepts:["improved_family_relationships"],allowGeneralDevelopment:true},
    ]),
    ["Guidance","Supervision","Consistent discipline","Positive role modelling","Open communication"]),

  item("ss-sa-a1-15","A1","a1-family-social-issues","explain",
    "Explain TWO causes of conflict within families.",
    4,
    developedScheme(2,[
      {id:"communication",label:"Poor communication",concepts:["poor_communication"],developmentConcepts:["family_conflict"],allowGeneralDevelopment:true},
      {id:"money",label:"Financial problems",concepts:["financial_conflict"],developmentConcepts:["family_conflict","reduced_financial_stress"],allowGeneralDevelopment:true},
      {id:"duties",label:"Unequal household responsibilities",concepts:["unequal_duties"],developmentConcepts:["family_conflict","role_sharing"],allowGeneralDevelopment:true},
      {id:"parenting",label:"Disagreement over parenting or discipline",phrases:["different parenting styles","disagreement over discipline","parenting disagreement"],developmentConcepts:["family_conflict"],allowGeneralDevelopment:true},
      {id:"stress",label:"Stress from work or unemployment",concepts:["unemployment","economic_pressure"],developmentConcepts:["family_conflict"],allowGeneralDevelopment:true},
    ]),
    ["Poor communication","Financial pressure","Unequal duties","Parenting disagreements","Work or unemployment stress"]),

  item("ss-sa-a1-16","A1","a1-family-social-issues","suggest",
    "Suggest TWO ways family members could resolve conflict constructively.",
    4,
    developedScheme(2,[
      {id:"talk",label:"Use open and respectful communication",concepts:["clear_communication","active_listening"],developmentConcepts:["conflict_resolution","improved_family_relationships"],allowGeneralDevelopment:true},
      {id:"compromise",label:"Compromise",concepts:["family_compromise","compromise"],developmentConcepts:["conflict_resolution"],allowGeneralDevelopment:true},
      {id:"mediation",label:"Use mediation or counselling",concepts:["family_mediation","communication_counselling"],developmentConcepts:["conflict_resolution"],allowGeneralDevelopment:true},
      {id:"meeting",label:"Hold a family meeting",concepts:["family_meetings"],developmentConcepts:["clear_communication","conflict_resolution"],allowGeneralDevelopment:true},
    ]),
    ["Open communication","Compromise","Mediation or counselling","Family meetings"]),

  item("ss-sa-a1-17","A1","a1-cultural-diversity","identify",
    "Identify TWO historical or social factors that contributed to cultural diversity in the Caribbean.",
    2,
    listScheme(2,[
      {id:"african",label:"African heritage through enslavement",concepts:["african_heritage","slavery_culture"]},
      {id:"european",label:"European colonisation",concepts:["european_heritage","colonisation_culture"]},
      {id:"indian",label:"Indian indentureship and migration",concepts:["indian_heritage","indentureship_culture"]},
      {id:"indigenous",label:"Indigenous heritage",concepts:["indigenous_heritage"]},
      {id:"chinese",label:"Chinese migration",concepts:["chinese_heritage"]},
      {id:"migration",label:"Migration from several regions",concepts:["migration_culture"]},
    ]),
    ["African heritage and slavery","European colonisation","Indian indentureship","Indigenous heritage","Chinese migration","Migration"]),

  item("ss-sa-a1-18","A1","a1-cultural-diversity","identify",
    "Identify THREE cultural forms found in the Caribbean.",
    3,
    listScheme(3,[
      {id:"music",label:"Music",concepts:["cultural_form_music"]},
      {id:"dance",label:"Dance",concepts:["cultural_form_dance"]},
      {id:"food",label:"Food and cuisine",concepts:["cultural_form_food"]},
      {id:"festival",label:"Festivals",concepts:["cultural_form_festival"]},
      {id:"language",label:"Language and dialect",concepts:["cultural_form_language"]},
      {id:"religion",label:"Religious practices",concepts:["cultural_form_religion"]},
      {id:"art",label:"Art and craft",concepts:["cultural_form_art"]},
    ]),
    ["Music","Dance","Food","Festivals","Language","Religion","Art and craft"]),

  item("ss-sa-a1-19","A1","a1-caribbean-culture-world","explain",
    "Explain TWO ways Caribbean culture has influenced audiences outside the region.",
    4,
    developedScheme(2,[
      {id:"music",label:"Caribbean music influences international music and audiences",concepts:["music_global_impact"],developmentConcepts:["global_cultural_reach"],allowGeneralDevelopment:true},
      {id:"food",label:"Caribbean food and cuisine have spread internationally",concepts:["food_global_impact"],developmentConcepts:["global_cultural_reach"],allowGeneralDevelopment:true},
      {id:"diaspora",label:"The diaspora shares Caribbean traditions overseas",concepts:["diaspora_cultural_spread"],developmentConcepts:["global_cultural_reach","cultural_transmission"],allowGeneralDevelopment:true},
      {id:"tourism",label:"Cultural festivals and heritage attract overseas visitors",concepts:["cultural_tourism"],developmentConcepts:["promote_culture","global_cultural_reach"],allowGeneralDevelopment:true},
    ]),
    ["Music","Food","Diaspora transmission","Cultural tourism and festivals"]),

  item("ss-sa-a1-20","A1","a1-parenthood-research","justify",
    "Justify the use of a questionnaire when studying parenting practices in a community.",
    2,
    developedScheme(1,[
      {id:"questionnaire",label:"A questionnaire collects comparable information from several respondents",concepts:["questionnaire"],developmentPhrases:["many respondents","several respondents","same questions","compare responses","collect data quickly","anonymous responses"],allowGeneralDevelopment:true},
    ],"UK"),
    ["It can collect the same information from several respondents efficiently and support comparison."]),

  item("ss-sa-a2-13","A2","a2-government-systems","distinguish",
    "Distinguish between democracy and autocracy.",
    2,
    criteriaScheme([
      {id:"democracy",label:"Democracy allows citizens meaningful political participation or electoral choice",anyConcepts:["democracy","democratic_participation"],marks:1},
      {id:"autocracy",label:"Autocracy concentrates power and limits political participation",anyConcepts:["autocracy"],marks:1},
    ],2),
    ["Democracy involves citizen participation and electoral choice.","Autocracy concentrates power and limits participation."]),

  item("ss-sa-a2-14","A2","a2-government-functions-rights","identify",
    "Identify THREE functions performed by government.",
    3,
    listScheme(3,[
      {id:"services",label:"Provide social services",concepts:["government_social_services"]},
      {id:"law",label:"Maintain law and order",concepts:["government_law_order"]},
      {id:"economy",label:"Manage or support the economy",concepts:["government_economic_management"]},
      {id:"relations",label:"Conduct foreign relations",concepts:["government_foreign_relations"]},
      {id:"infrastructure",label:"Provide infrastructure",concepts:["infrastructure"]},
      {id:"tax",label:"Collect taxes",concepts:["taxation"]},
    ]),
    ["Social services","Law and order","Economic management","Foreign relations","Infrastructure","Taxation"]),

  item("ss-sa-a2-15","A2","a2-government-functions-rights","identify",
    "Identify TWO rights and TWO responsibilities of citizens.",
    4,
    listScheme(4,[
      {id:"vote",label:"Right to vote",concepts:["citizen_vote"]},
      {id:"expression",label:"Freedom of expression",concepts:["citizen_free_expression"]},
      {id:"association",label:"Freedom of association",concepts:["citizen_association"]},
      {id:"law",label:"Responsibility to obey the law",concepts:["citizen_obey_law"]},
      {id:"tax",label:"Responsibility to pay taxes",concepts:["citizen_pay_taxes"]},
      {id:"service",label:"Responsibility to contribute to the community",concepts:["citizen_community_service"]},
    ]),
    ["Vote","Freedom of expression","Freedom of association","Obey laws","Pay taxes","Community service"]),

  item("ss-sa-a2-16","A2","a2-parties-information-decisions","identify",
    "Identify THREE functions or activities of political parties during the electoral process.",
    3,
    listScheme(3,[
      {id:"candidates",label:"Select or nominate candidates",concepts:["party_candidates"]},
      {id:"manifesto",label:"Prepare a manifesto or programme",concepts:["party_manifesto"]},
      {id:"campaign",label:"Campaign and canvass voters",concepts:["party_campaign"]},
      {id:"govern",label:"Contest elections to form government",concepts:["party_government"]},
    ]),
    ["Select candidates","Prepare a manifesto","Campaign","Contest elections to form government"]),

  item("ss-sa-a2-17","A2","a2-parties-information-decisions","suggest",
    "Suggest TWO ways a voter could check whether political information is reliable.",
    4,
    developedScheme(2,[
      {id:"verify",label:"Fact-check claims using more than one source",concepts:["verify_information"],developmentConcepts:["source_reliability"],allowGeneralDevelopment:true},
      {id:"official",label:"Check recognised official or credible sources",concepts:["official_information","source_reliability"],developmentConcepts:["verify_information"],allowGeneralDevelopment:true},
      {id:"evidence",label:"Look for supporting evidence rather than emotional claims",concepts:["fact"],developmentConcepts:["propaganda_emotion","bias"],allowGeneralDevelopment:true},
    ]),
    ["Cross-check multiple sources","Use official or credible sources","Look for evidence and identify emotional or biased claims"]),

  item("ss-sa-a2-18","A2","a2-cohesion-control-interaction","distinguish",
    "Distinguish between negotiation and mediation as methods of resolving conflict.",
    2,
    criteriaScheme([
      {id:"negotiation",label:"Negotiation involves the parties discussing the issue directly to reach agreement",anyConcepts:["negotiation"],marks:1},
      {id:"mediation",label:"Mediation involves a neutral third party helping the parties reach agreement",anyConcepts:["mediation"],marks:1},
    ],2),
    ["Negotiation is direct discussion between the parties.","Mediation uses a neutral third party."]),

  item("ss-sa-a2-19","A2","a2-social-institutions","explain",
    "Explain TWO ways social institutions contribute to the functioning of society.",
    4,
    developedScheme(2,[
      {id:"control",label:"Help maintain social order through rules and norms",concepts:["social_control","institution_norms"],developmentConcepts:["institution_function"],allowGeneralDevelopment:true},
      {id:"education",label:"Develop knowledge and skills",concepts:["institution_education","education_training"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
      {id:"economy",label:"Provide goods, services and economic organisation",concepts:["institution_economy"],developmentConcepts:["institution_function"],allowGeneralDevelopment:true},
      {id:"religion",label:"Support moral or spiritual development",concepts:["institution_religion"],developmentPhrases:["moral guidance","spiritual wellbeing","spiritual well-being"],allowGeneralDevelopment:true},
      {id:"government",label:"Make and implement laws and policies",concepts:["institution_government","legislature","executive"],developmentConcepts:["government_law_order"],allowGeneralDevelopment:true},
    ]),
    ["Social control","Education","Economic organisation","Moral or spiritual support","Government and law"]),

  item("ss-sa-a2-20","A2","a2-governance-citizenship","explain",
    "Explain TWO ways transparency and accountability may improve governance.",
    4,
    developedScheme(2,[
      {id:"transparency",label:"Transparency makes information and decisions open to public scrutiny",concepts:["transparency"],developmentConcepts:["accountability","rights_freedoms"],allowGeneralDevelopment:true},
      {id:"accountability",label:"Accountability makes officials answerable for decisions and use of resources",concepts:["accountability"],developmentConcepts:["transparency","rule_of_law"],allowGeneralDevelopment:true},
      {id:"corruption",label:"Open scrutiny can discourage misuse of public resources",phrases:["reduce corruption","discourage corruption","prevent misuse of funds","reduce misuse of public money"],developmentConcepts:["transparency","accountability"],allowGeneralDevelopment:true},
    ]),
    ["Public scrutiny","Officials answer for decisions","Reduced misuse of public resources"]),

  item("ss-sa-b1-13","B1","b1-population-change-rates","define",
    "Define natural increase in population.",
    2,
    definitionScheme([
      {id:"difference",label:"It is the difference between births and deaths",phrases:["birth rate minus death rate","births minus deaths","difference between births and deaths"],marks:1},
      {id:"positive",label:"Population grows naturally when births exceed deaths",concepts:["natural_increase"],phrases:["births exceed deaths","more births than deaths"],marks:1},
    ]),
    ["Births minus deaths","Population increases when births exceed deaths"]),

  item("ss-sa-b1-14","B1","b1-population-foundations","explain",
    "Explain TWO ways population statistics are useful to governments.",
    4,
    developedScheme(2,[
      {id:"services",label:"Plan public services such as schools and hospitals",concepts:["population_planning"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
      {id:"resources",label:"Allocate resources to areas of greatest need",concepts:["population_resource_allocation"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
      {id:"forecast",label:"Project future population needs",concepts:["population_projection"],developmentConcepts:["population_planning"],allowGeneralDevelopment:true},
      {id:"infrastructure",label:"Plan housing and infrastructure",concepts:["population_planning","infrastructure"],developmentConcepts:["population_resource_allocation"],allowGeneralDevelopment:true},
    ]),
    ["Plan services","Allocate resources","Forecast future needs","Plan housing and infrastructure"]),

  item("ss-sa-b1-15","B1","b1-migration","explain",
    "Explain ONE push factor and ONE pull factor that may encourage rural-to-urban migration.",
    4,
    developedScheme(2,[
      {id:"push-jobs",label:"Few rural employment opportunities",concepts:["push_rural_jobs"],developmentConcepts:["rural_urban_migration"],allowGeneralDevelopment:true},
      {id:"push-services",label:"Limited rural services",concepts:["push_rural_services"],developmentConcepts:["rural_urban_migration"],allowGeneralDevelopment:true},
      {id:"pull-jobs",label:"More urban employment opportunities",concepts:["pull_urban_jobs"],developmentConcepts:["rural_urban_migration"],allowGeneralDevelopment:true},
      {id:"pull-services",label:"Better services in urban areas",concepts:["pull_urban_services"],developmentConcepts:["rural_urban_migration"],allowGeneralDevelopment:true},
    ]),
    ["Few rural jobs","Limited rural services","More urban jobs","Better urban services"]),

  item("ss-sa-b1-16","B1","b1-migration","explain",
    "Explain TWO effects of migration on Caribbean countries of origin.",
    4,
    developedScheme(2,[
      {id:"brain",label:"Loss of skilled workers",concepts:["brain_drain","labour_shortage"],developmentConcepts:["retain_workers"],allowGeneralDevelopment:true},
      {id:"remit",label:"Remittances support households and foreign-exchange earnings",concepts:["remittance_benefit","remittances"],developmentConcepts:["foreign_exchange"],allowGeneralDevelopment:true},
      {id:"family",label:"Families may be separated",concepts:["family_separation"],developmentConcepts:["migration_family_change"],allowGeneralDevelopment:true},
      {id:"age",label:"Loss of working-age adults can change population structure",concepts:["population_ageing_migration"],developmentConcepts:["ageing_population"],allowGeneralDevelopment:true},
    ]),
    ["Brain drain","Remittances","Family separation","Changes to population structure"]),

  item("ss-sa-b1-17","B1","b1-employment","distinguish",
    "Distinguish between seasonal unemployment and structural unemployment.",
    2,
    criteriaScheme([
      {id:"seasonal",label:"Seasonal unemployment occurs because work is available only at certain times of year",anyConcepts:["seasonal_unemployment"],marks:1},
      {id:"structural",label:"Structural unemployment occurs when workers' skills do not match available jobs",anyConcepts:["structural_unemployment"],marks:1},
    ],2),
    ["Seasonal unemployment follows seasonal demand.","Structural unemployment results from a skills or job-structure mismatch."]),

  item("ss-sa-b1-18","B1","b1-human-resource-development","suggest",
    "Suggest TWO measures a government could use to strengthen human-resource development.",
    4,
    developedScheme(2,[
      {id:"training",label:"Expand technical, vocational and skills training",concepts:["skill_training","education_training"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
      {id:"scholarship",label:"Provide scholarships or education grants",concepts:["scholarships"],developmentConcepts:["education_training","human_resource_development"],allowGeneralDevelopment:true},
      {id:"apprentice",label:"Expand apprenticeships and workplace training",concepts:["apprenticeships"],developmentConcepts:["skill_training","employment"],allowGeneralDevelopment:true},
      {id:"health",label:"Invest in health and preventive care",concepts:["preventive_health","health_investment"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
      {id:"lifelong",label:"Support lifelong learning and reskilling",concepts:["lifelong_learning"],developmentConcepts:["human_resource_development","employment"],allowGeneralDevelopment:true},
    ]),
    ["Skills training","Scholarships","Apprenticeships","Health investment","Lifelong learning"]),

  item("ss-sa-b1-19","B1","b1-environmental-practices","suggest",
    "Suggest TWO measures that could support the sustainable use of natural resources.",
    4,
    developedScheme(2,[
      {id:"forest",label:"Protect and restore forests",concepts:["reforestation","conservation"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
      {id:"watershed",label:"Protect watersheds and water sources",concepts:["watershed_protection"],developmentConcepts:["conservation","protect_environment"],allowGeneralDevelopment:true},
      {id:"marine",label:"Protect marine ecosystems and fish stocks",concepts:["marine_conservation","fishing_limits"],developmentConcepts:["conservation"],allowGeneralDevelopment:true},
      {id:"mining",label:"Regulate mining and rehabilitate mined land",concepts:["mining_regulation"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
      {id:"law",label:"Enforce environmental laws and pollution controls",concepts:["environmental_law","pollution_control"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
    ]),
    ["Forest protection","Watershed protection","Marine conservation","Mining regulation","Environmental law"]),

  item("ss-sa-b1-20","B1","b1-climate-change","explain",
    "Explain TWO likely effects of climate change on Caribbean countries.",
    4,
    developedScheme(2,[
      {id:"sea",label:"Sea-level rise threatens low-lying coasts",concepts:["sea_level_rise"],developmentConcepts:["coastal_erosion"],allowGeneralDevelopment:true},
      {id:"storm",label:"More intense storms can damage homes and infrastructure",concepts:["stronger_storms"],developmentConcepts:["disaster_disruption","infrastructure"],allowGeneralDevelopment:true},
      {id:"drought",label:"Drought can reduce water supply and agricultural production",concepts:["drought"],developmentConcepts:["agriculture_impact"],allowGeneralDevelopment:true},
      {id:"flood",label:"Flooding can damage communities and services",concepts:["flooding"],developmentConcepts:["disaster_disruption"],allowGeneralDevelopment:true},
      {id:"health",label:"Higher temperatures may increase health risks",concepts:["temperature_rise","health_impact"],developmentConcepts:["public_services"],allowGeneralDevelopment:true},
    ]),
    ["Sea-level rise","Stronger storms","Drought","Flooding","Health impacts"]),

  item("ss-sa-b2-13","B2","b2-measuring-development","explain",
    "Explain TWO reasons development should be measured using both economic and social indicators.",
    4,
    developedScheme(2,[
      {id:"income",label:"Economic indicators show production or income",concepts:["gdp","gross_national_income","per_capita_income"],developmentPhrases:["economic performance","income level","production level"],allowGeneralDevelopment:true},
      {id:"quality",label:"Social indicators show quality-of-life outcomes",concepts:["life_expectancy","literacy","infant_mortality","school_enrolment"],developmentPhrases:["quality of life","health and education","social wellbeing","social well-being"],allowGeneralDevelopment:true},
      {id:"complete",label:"Using both gives a broader picture of development",concepts:["hdi"],developmentPhrases:["broader picture","more complete picture","not income alone","multidimensional"],allowGeneralDevelopment:true},
    ]),
    ["Economic indicators show production or income.","Social indicators show health, education and living outcomes.","Together they give a fuller picture."]),

  item("ss-sa-b2-14","B2","b2-integration-benefits-challenges","identify",
    "Identify THREE factors that may hinder Caribbean regional integration.",
    3,
    listScheme(3,[
      {id:"nationalism",label:"Strong nationalism or competing national interests",concepts:["integration_barrier_nationalism"]},
      {id:"cost",label:"Cost of implementing regional arrangements",concepts:["integration_barrier_cost"]},
      {id:"movement",label:"Restrictions on movement",concepts:["integration_barrier_movement"]},
      {id:"trade",label:"Trade restrictions and customs delays",concepts:["integration_barrier_trade","trade_barriers"]},
      {id:"transport",label:"Weak or expensive regional transport",concepts:["high_transport_cost"]},
    ]),
    ["National interests","Implementation costs","Movement restrictions","Trade barriers","Weak transport links"]),

  item("ss-sa-b2-15","B2","b2-regional-organisations","state",
    "State ONE function of EACH of the following: CARICOM, CSME, OECS and CCJ.",
    4,
    listScheme(4,[
      {id:"caricom",label:"CARICOM coordinates regional cooperation and integration",concepts:["caricom_function"]},
      {id:"csme",label:"CSME supports a single regional market and agreed movement",concepts:["csme_function"]},
      {id:"oecs",label:"OECS supports close Eastern Caribbean cooperation",concepts:["oecs_function"]},
      {id:"ccj",label:"CCJ performs regional judicial functions",concepts:["ccj_function"]},
    ]),
    ["CARICOM regional cooperation","CSME single market","OECS Eastern Caribbean cooperation","CCJ regional court"]),

  item("ss-sa-b2-16","B2","b2-integration-roots","outline",
    "Outline TWO historical stages in the development of Caribbean regional integration.",
    4,
    developedScheme(2,[
      {id:"federation",label:"West Indies Federation",concepts:["federation_history"],developmentPhrases:["political union","1958","federation of territories"],allowGeneralDevelopment:true},
      {id:"carifta",label:"CARIFTA",concepts:["carifta_history"],developmentPhrases:["free trade","reduce tariffs","regional trade"],allowGeneralDevelopment:true},
      {id:"caricom",label:"CARICOM",concepts:["caricom"],developmentConcepts:["caricom_function"],allowGeneralDevelopment:true},
      {id:"csme",label:"CSME",concepts:["csme"],developmentConcepts:["csme_function"],allowGeneralDevelopment:true},
    ],"KC"),
    ["West Indies Federation","CARIFTA","CARICOM","CSME"]),

  item("ss-sa-b2-17","B2","b2-industries-ict","explain",
    "Explain TWO ways information and communication technology may contribute to Caribbean development.",
    4,
    developedScheme(2,[
      {id:"services",label:"Supports remote and exportable services",concepts:["ict_remote_services"],developmentConcepts:["employment","foreign_exchange"],allowGeneralDevelopment:true},
      {id:"commerce",label:"Expands e-commerce and market access",concepts:["ict_ecommerce"],developmentConcepts:["larger_market","more_regional_trade"],allowGeneralDevelopment:true},
      {id:"education",label:"Expands access to education and training",concepts:["ict_education"],developmentConcepts:["human_resource_development"],allowGeneralDevelopment:true},
      {id:"efficiency",label:"Improves communication and business efficiency",concepts:["ict_efficiency"],developmentConcepts:["value_added"],allowGeneralDevelopment:true},
    ]),
    ["Remote services","E-commerce","Education","Efficiency and communication"]),

  item("ss-sa-b2-18","B2","b2-tourism-integration","explain",
    "Explain ONE benefit and ONE challenge of tourism for Caribbean development.",
    4,
    developedScheme(2,[
      {id:"fx",label:"Tourism earns foreign exchange",concepts:["tourism_foreign_exchange","foreign_exchange"],developmentConcepts:["gdp"],allowGeneralDevelopment:true},
      {id:"jobs",label:"Tourism creates employment",concepts:["tourism_employment","employment"],developmentConcepts:["job_creation"],allowGeneralDevelopment:true},
      {id:"leak",label:"Tourism leakage reduces the amount of income retained locally",concepts:["tourism_leakage"],developmentConcepts:["foreign_exchange"],allowGeneralDevelopment:true},
      {id:"season",label:"Seasonality can make employment and income unstable",concepts:["tourism_seasonality"],developmentConcepts:["seasonal_unemployment"],allowGeneralDevelopment:true},
      {id:"environment",label:"Tourism can place pressure on fragile environments",concepts:["tourism_environment_pressure"],developmentConcepts:["protect_environment"],allowGeneralDevelopment:true},
    ]),
    ["Foreign exchange","Employment","Leakage","Seasonality","Environmental pressure"]),

  item("ss-sa-b2-19","B2","b2-tourism-integration","suggest",
    "Suggest TWO ways governments or tourism businesses could strengthen linkages between tourism and local industries.",
    4,
    developedScheme(2,[
      {id:"local",label:"Purchase more food, craft and services from local suppliers",concepts:["local_linkages","tourism_linkage"],developmentConcepts:["employment","value_added"],allowGeneralDevelopment:true},
      {id:"contracts",label:"Create supplier programmes linking hotels with farmers and small businesses",phrases:["supplier programme","supplier program","hotel farmer partnership","local supplier contract"],developmentConcepts:["local_linkages","job_creation"],allowGeneralDevelopment:true},
      {id:"marketing",label:"Promote local cultural products and experiences",concepts:["cultural_tourism","promote_culture"],developmentConcepts:["value_added","tourism_linkage"],allowGeneralDevelopment:true},
    ]),
    ["Buy from local suppliers","Hotel-farmer and small-business partnerships","Promote local cultural products"]),

  item("ss-sa-b2-20","B2","b2-development-challenges","explain",
    "Explain TWO ways a high public-debt burden may limit development.",
    4,
    developedScheme(2,[
      {id:"service",label:"Debt-service payments reduce money available for public services",concepts:["debt_service","debt_burden"],developmentConcepts:["fiscal_space","public_services"],allowGeneralDevelopment:true},
      {id:"investment",label:"Debt can reduce public investment in infrastructure and human development",concepts:["debt_burden"],developmentConcepts:["public_investment","infrastructure","human_resource_development"],allowGeneralDevelopment:true},
      {id:"tax",label:"Debt may lead to higher taxes or spending cuts",concepts:["debt_burden"],developmentPhrases:["higher taxes","cut government spending","reduce public spending"],allowGeneralDevelopment:true},
    ]),
    ["Less money for services","Reduced public investment","Higher taxes or spending cuts"]),
]);

export const SOCIAL_STUDIES_SHORT_ANSWER_BY_SECTION=freeze(
  ["A1","A2","B1","B2"].reduce((output,sectionId)=>{
    output[sectionId]=freeze(SOCIAL_STUDIES_SHORT_ANSWER_BANK.filter(item=>item.sectionId===sectionId));
    return output;
  },{})
);

export function socialStudiesShortAnswerStats(){
  return freeze({
    questions:SOCIAL_STUDIES_SHORT_ANSWER_BANK.length,
    bySection:Object.fromEntries(
      ["A1","A2","B1","B2"].map(sectionId=>[
        sectionId,
        SOCIAL_STUDIES_SHORT_ANSWER_BANK.filter(item=>item.sectionId===sectionId).length,
      ])
    ),
    marks:SOCIAL_STUDIES_SHORT_ANSWER_BANK.reduce((sum,item)=>sum+item.marks,0),
  });
}
