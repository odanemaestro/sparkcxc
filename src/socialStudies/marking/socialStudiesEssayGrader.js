import { gradeSocialStudiesShortAnswer } from "./socialStudiesShortAnswerGrader";
import { normalizeSocialStudiesText } from "./socialStudiesAnswerLexicon";

const freeze=value=>Object.freeze(value);

const list=(maxPoints,points)=>freeze({
  type:"list",maxPoints,maxMarks:maxPoints,marksPerPoint:1,profile:"KC",points:freeze(points),
});

const developed=(maxPoints,points,profile="UK")=>freeze({
  type:"developed_points",maxPoints,maxMarks:maxPoints*2,profile,points:freeze(points),
});

const definition=(groups,maxMarks=2)=>freeze({
  type:"definition",groups:freeze(groups),maxMarks,profile:"KC",
});

const component=(id,label,maxMarks,scheme)=>freeze({id,label,maxMarks,scheme});

export const SOCIAL_STUDIES_ESSAY_SCHEMES=freeze({
  "ss-p2-q5":freeze({
    topicPhrases:freeze(["caribbean culture","culture and identity","cultural identity","caribbean cultural"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("agents","Identifies TWO agents that transmit Caribbean culture",2,
        list(2,[
          {id:"family",label:"Family",concepts:["family_agent"]},
          {id:"media",label:"Media",concepts:["media_agent"]},
          {id:"education",label:"Education",concepts:["education_agent"]},
          {id:"religion",label:"Religion",concepts:["religion_agent"]},
          {id:"artistes",label:"Artistes and cultural groups",concepts:["artistes_agent"]},
          {id:"diaspora",label:"Caribbean diaspora",concepts:["emigrants_agent"]},
        ])),
      component("examples","States TWO Caribbean cultural forms with reach beyond the region",2,
        list(2,[
          {id:"music",label:"Music such as reggae, calypso, soca or dancehall",concepts:["cultural_form_music","music_global_impact"]},
          {id:"food",label:"Caribbean food and cuisine",concepts:["cultural_form_food","food_global_impact"]},
          {id:"festival",label:"Festivals and carnival traditions",concepts:["cultural_form_festival","cultural_tourism"]},
          {id:"dance",label:"Caribbean dance",concepts:["cultural_form_dance"]},
          {id:"language",label:"Language and dialect",concepts:["cultural_form_language"]},
          {id:"art",label:"Art and craft",concepts:["cultural_form_art"]},
        ])),
      component("identity","Explains TWO ways cultural transmission may strengthen Caribbean identity",4,
        developed(2,[
          {id:"identity",label:"Builds a shared sense of Caribbean identity",concepts:["cultural_identity"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
          {id:"preserve",label:"Preserves traditions and heritage",concepts:["preserve_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
          {id:"diversity",label:"Builds appreciation of Caribbean cultural diversity",concepts:["cultural_diversity"],developmentConcepts:["cultural_identity"],allowGeneralDevelopment:true},
          {id:"diaspora",label:"Connects Caribbean people at home and abroad",concepts:["diaspora_cultural_spread"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
        ])),
      component("strategies","Suggests THREE strategies to preserve and promote Caribbean cultural forms",6,
        developed(3,[
          {id:"document",label:"Document and archive cultural forms",concepts:["preserve_culture"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
          {id:"schools",label:"Teach cultural heritage through schools",concepts:["education_agent"],developmentConcepts:["cultural_transmission","cultural_identity"],allowGeneralDevelopment:true},
          {id:"festivals",label:"Use festivals, exhibitions and performances",concepts:["promote_culture","cultural_form_festival"],developmentConcepts:["global_cultural_reach","cultural_identity"],allowGeneralDevelopment:true},
          {id:"media",label:"Use traditional and digital media campaigns",concepts:["media_agent"],developmentConcepts:["promote_culture","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"diaspora",label:"Work with diaspora organisations",concepts:["emigrants_agent"],developmentConcepts:["diaspora_cultural_spread","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"tourism",label:"Link heritage to cultural tourism",concepts:["cultural_tourism"],developmentConcepts:["promote_culture","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"fund",label:"Provide grants or support for artistes and cultural groups",phrases:["fund artistes","fund artists","cultural grants","grants for artistes","support cultural groups","support local artists"],developmentConcepts:["promote_culture","preserve_culture"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO preservation or promotion strategies are likely to succeed",4,
        developed(2,[
          {id:"reach",label:"The strategy reaches wider or younger audiences",concepts:["global_cultural_reach"],developmentConcepts:["promote_culture","media_agent","education_agent"],allowGeneralDevelopment:true},
          {id:"transmission",label:"The strategy passes knowledge and practices to another generation",concepts:["cultural_transmission"],developmentConcepts:["preserve_culture","education_agent"],allowGeneralDevelopment:true},
          {id:"identity",label:"The strategy strengthens cultural identity and belonging",concepts:["cultural_identity"],developmentConcepts:["promote_culture","preserve_culture"],allowGeneralDevelopment:true},
          {id:"tourism",label:"The strategy attracts visitors and public interest",concepts:["cultural_tourism"],developmentConcepts:["promote_culture","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"diaspora",label:"The strategy uses overseas Caribbean communities to widen exposure",concepts:["diaspora_cultural_spread"],developmentConcepts:["global_cultural_reach"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),

  "ss-p2-q6":freeze({
    topicPhrases:freeze(["regional cooperation","regional integration","caribbean development","caribbean cooperation"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("reasons","States TWO reasons Caribbean countries pursue regional integration",2,
        list(2,[
          {id:"market",label:"Access to a larger market",concepts:["larger_market"]},
          {id:"resources",label:"Pool resources and expertise",concepts:["pooled_resources"]},
          {id:"bargaining",label:"Increase bargaining power",concepts:["bargaining_power"]},
          {id:"movement",label:"Facilitate movement of goods, services, labour or capital",concepts:["free_movement"]},
          {id:"resilience",label:"Cooperate on shared challenges",concepts:["resilience","regional_integration"]},
        ])),
      component("institutions","Identifies TWO regional institutions or arrangements",2,
        list(2,[
          {id:"caricom",label:"CARICOM",concepts:["caricom"]},
          {id:"csme",label:"CSME",concepts:["csme"]},
          {id:"oecs",label:"OECS",concepts:["oecs"]},
          {id:"ccj",label:"CCJ",concepts:["ccj"]},
          {id:"carifta",label:"CARIFTA",concepts:["carifta"]},
        ])),
      component("benefits","Explains TWO benefits regional integration may bring to Caribbean development",4,
        developed(2,[
          {id:"market",label:"Provides access to a larger regional market",concepts:["larger_market"],developmentConcepts:["economies_scale","more_regional_trade"],allowGeneralDevelopment:true},
          {id:"resources",label:"Allows countries to pool resources and expertise",concepts:["pooled_resources"],developmentConcepts:["resilience","lower_trade_costs"],allowGeneralDevelopment:true},
          {id:"movement",label:"Makes agreed regional movement and market access easier",concepts:["free_movement"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"bargaining",label:"Strengthens collective bargaining power",concepts:["bargaining_power"],developmentConcepts:["regional_integration"],allowGeneralDevelopment:true},
          {id:"supply",label:"Supports regional supply chains",concepts:["regional_supply_chains"],developmentConcepts:["resilience","more_regional_trade"],allowGeneralDevelopment:true},
        ])),
      component("actions","Suggests THREE actions to strengthen regional cooperation",6,
        developed(3,[
          {id:"transport",label:"Improve regional transport and logistics",concepts:["improve_transport_links"],developmentConcepts:["lower_trade_costs","faster_trade","more_regional_trade"],allowGeneralDevelopment:true},
          {id:"barriers",label:"Reduce regional trade barriers",concepts:["remove_trade_barriers"],developmentConcepts:["lower_trade_costs","more_regional_trade"],allowGeneralDevelopment:true},
          {id:"customs",label:"Harmonise customs procedures",concepts:["harmonise_customs"],developmentConcepts:["faster_trade","lower_trade_costs"],allowGeneralDevelopment:true},
          {id:"standards",label:"Use common regional standards",concepts:["common_standards"],developmentConcepts:["faster_trade","more_regional_trade"],allowGeneralDevelopment:true},
          {id:"finance",label:"Expand regional trade finance",concepts:["trade_finance"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"digital",label:"Use digital systems for regional trade",concepts:["digital_trade"],developmentConcepts:["faster_trade","lower_trade_costs"],allowGeneralDevelopment:true},
          {id:"supply",label:"Build regional supply partnerships",concepts:["regional_supply_chains"],developmentConcepts:["more_regional_trade","resilience"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO regional-cooperation actions are likely to succeed",4,
        developed(2,[
          {id:"cost",label:"Reduces the cost of regional trade",concepts:["lower_trade_costs"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"speed",label:"Reduces delays and moves goods or services faster",concepts:["faster_trade"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
          {id:"trade",label:"Creates more opportunities for intra-regional trade",concepts:["more_regional_trade"],developmentConcepts:["larger_market"],allowGeneralDevelopment:true},
          {id:"resilience",label:"Makes regional production and supply more resilient",concepts:["resilience"],developmentConcepts:["regional_supply_chains","pooled_resources"],allowGeneralDevelopment:true},
          {id:"market",label:"Makes regional market access easier",concepts:["larger_market","free_movement"],developmentConcepts:["more_regional_trade"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),

  "ss-p2-b-q5":freeze({
    topicPhrases:freeze(["cultural diversity","caribbean culture","celebrating cultural diversity"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("forms","States TWO cultural forms found in the Caribbean",2,
        list(2,[
          {id:"music",label:"Music",concepts:["cultural_form_music"]},
          {id:"dance",label:"Dance",concepts:["cultural_form_dance"]},
          {id:"food",label:"Food and cuisine",concepts:["cultural_form_food"]},
          {id:"festival",label:"Festivals",concepts:["cultural_form_festival"]},
          {id:"language",label:"Language and dialect",concepts:["cultural_form_language"]},
          {id:"religion",label:"Religious practices",concepts:["cultural_form_religion"]},
          {id:"art",label:"Art and craft",concepts:["cultural_form_art"]},
        ])),
      component("reasons","Explains TWO reasons for cultural diversity in the Caribbean",4,
        developed(2,[
          {id:"african",label:"African heritage and enslavement",concepts:["african_heritage","slavery_culture"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"european",label:"European colonisation",concepts:["european_heritage","colonisation_culture"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"indian",label:"Indian indentureship and migration",concepts:["indian_heritage","indentureship_culture"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"indigenous",label:"Indigenous heritage",concepts:["indigenous_heritage"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"migration",label:"Migration from different regions",concepts:["migration_culture"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
        ])),
      component("benefit","Outlines ONE benefit of cultural diversity",2,
        developed(1,[
          {id:"identity",label:"Strengthens cultural identity and belonging",concepts:["cultural_identity"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"tourism",label:"Supports cultural tourism and economic activity",concepts:["cultural_tourism"],developmentConcepts:["employment","foreign_exchange"],allowGeneralDevelopment:true},
          {id:"respect",label:"Builds respect for cultural differences",phrases:["respect different cultures","tolerance","appreciate differences","respect cultural differences"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
          {id:"creativity",label:"Encourages cultural exchange and creative expression",phrases:["cultural exchange","creative expression","new cultural forms","mix of traditions"],developmentConcepts:["cultural_diversity"],allowGeneralDevelopment:true},
        ])),
      component("actions","Suggests THREE actions community groups may take to recognise cultural diversity",6,
        developed(3,[
          {id:"events",label:"Stage festivals, exhibitions or cultural fairs",concepts:["cultural_form_festival","promote_culture"],developmentConcepts:["cultural_identity","cultural_transmission"],allowGeneralDevelopment:true},
          {id:"education",label:"Run school or community heritage workshops",concepts:["education_agent"],developmentConcepts:["cultural_transmission","cultural_identity"],allowGeneralDevelopment:true},
          {id:"media",label:"Use media to showcase different cultural groups",concepts:["media_agent"],developmentConcepts:["promote_culture","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"artists",label:"Include artistes and cultural organisations",concepts:["artistes_agent"],developmentConcepts:["promote_culture","cultural_transmission"],allowGeneralDevelopment:true},
          {id:"diaspora",label:"Work with Caribbean diaspora groups",concepts:["emigrants_agent"],developmentConcepts:["diaspora_cultural_spread","global_cultural_reach"],allowGeneralDevelopment:true},
          {id:"archive",label:"Document and preserve cultural practices",concepts:["preserve_culture"],developmentConcepts:["cultural_transmission"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO cultural-diversity actions are likely to succeed",4,
        developed(2,[
          {id:"reach",label:"Reaches more people and raises cultural awareness",concepts:["global_cultural_reach"],developmentConcepts:["media_agent","promote_culture"],allowGeneralDevelopment:true},
          {id:"transmission",label:"Passes cultural knowledge to younger generations",concepts:["cultural_transmission"],developmentConcepts:["education_agent","preserve_culture"],allowGeneralDevelopment:true},
          {id:"identity",label:"Strengthens belonging and appreciation",concepts:["cultural_identity"],developmentConcepts:["cultural_diversity","promote_culture"],allowGeneralDevelopment:true},
          {id:"participation",label:"Encourages community participation through cultural events",concepts:["cultural_form_festival"],developmentConcepts:["cultural_identity","promote_culture"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),

  "ss-p2-b-q6":freeze({
    topicPhrases:freeze(["sustainable development","future generations","protecting resources","climate change"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("definition","Defines sustainable development",2,
        definition([
          {id:"present",label:"Meets present needs",phrases:["meet present needs","meets present needs","needs of the present"],marks:1},
          {id:"future",label:"Protects the ability of future generations to meet their needs",concepts:["sustainable_development"],phrases:["future generations","without harming future generations","without compromising future generations"],marks:1},
        ])),
      component("resources","Identifies TWO natural resources to conserve",2,
        list(2,[
          {id:"forest",label:"Forests",concepts:["forest_resource"]},
          {id:"water",label:"Water resources",concepts:["water_resource"]},
          {id:"minerals",label:"Mineral resources",concepts:["mineral_resource"]},
          {id:"fish",label:"Fisheries and marine resources",concepts:["fisheries"]},
        ])),
      component("farmland","Explains TWO ways agricultural land may be conserved",4,
        developed(2,[
          {id:"contour",label:"Use contour farming",concepts:["contour_farming"],developmentConcepts:["soil_erosion"],allowGeneralDevelopment:true},
          {id:"terrace",label:"Use terracing on slopes",concepts:["terracing"],developmentConcepts:["soil_erosion"],allowGeneralDevelopment:true},
          {id:"vegetation",label:"Maintain vegetation or tree cover",concepts:["reforestation"],developmentConcepts:["soil_erosion","conservation"],allowGeneralDevelopment:true},
          {id:"grazing",label:"Prevent overgrazing",concepts:["overgrazing"],developmentConcepts:["soil_erosion"],allowGeneralDevelopment:true},
        ])),
      component("actions","Suggests THREE government actions to reduce causes of climate change",6,
        developed(3,[
          {id:"renewable",label:"Expand renewable energy",concepts:["renewable_policy","renewable_energy"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"transport",label:"Improve public transport and reduce vehicle emissions",concepts:["public_transport","emissions_standard"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"efficiency",label:"Promote energy efficiency",concepts:["energy_efficiency"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
          {id:"forest",label:"Protect and restore forests",concepts:["reforestation"],developmentConcepts:["lower_emissions","protect_environment"],allowGeneralDevelopment:true},
          {id:"industry",label:"Enforce industrial emission standards",concepts:["emissions_standard"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO climate actions are likely to succeed",4,
        developed(2,[
          {id:"emissions",label:"Reduces greenhouse-gas emissions",concepts:["lower_emissions"],developmentConcepts:["climate_change"],allowGeneralDevelopment:true},
          {id:"forest",label:"Protects or increases natural carbon absorption",concepts:["reforestation"],developmentConcepts:["lower_emissions","protect_environment"],allowGeneralDevelopment:true},
          {id:"energy",label:"Reduces dependence on fossil fuels",concepts:["renewable_energy","energy_efficiency"],developmentConcepts:["fossil_fuels","lower_emissions"],allowGeneralDevelopment:true},
          {id:"transport",label:"Reduces emissions from private vehicles",concepts:["public_transport"],developmentConcepts:["lower_emissions"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),

  "ss-p2-c-q5":freeze({
    topicPhrases:freeze(["government","elections","social services","democratic government"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("definition","Defines democracy",2,
        definition([
          {id:"people",label:"Government involves citizens or their elected representatives",concepts:["democracy","democratic_participation"],phrases:["government by the people","citizens choose representatives"],marks:1},
          {id:"elections",label:"Political leaders are chosen through elections or meaningful participation",concepts:["free_fair_elections","citizen_vote"],phrases:["elected by citizens","chosen in elections"],marks:1},
        ])),
      component("function","Outlines ONE government function other than providing social services",2,
        developed(1,[
          {id:"order",label:"Maintain law and order",concepts:["government_law_order"],developmentConcepts:["rule_of_law"],allowGeneralDevelopment:true},
          {id:"economy",label:"Manage or support the economy",concepts:["government_economic_management"],developmentConcepts:["economic_growth","employment"],allowGeneralDevelopment:true},
          {id:"relations",label:"Conduct foreign relations",concepts:["government_foreign_relations"],developmentConcepts:["bargaining_power"],allowGeneralDevelopment:true},
          {id:"infrastructure",label:"Provide infrastructure",concepts:["infrastructure"],developmentConcepts:["public_investment"],allowGeneralDevelopment:true},
        ],"KC")),
      component("party","Describes TWO ways political parties prepare for elections",4,
        developed(2,[
          {id:"candidates",label:"Select and prepare candidates",concepts:["party_candidates"],developmentConcepts:["party_campaign"],allowGeneralDevelopment:true},
          {id:"manifesto",label:"Prepare and publish a manifesto",concepts:["party_manifesto"],developmentConcepts:["party_campaign"],allowGeneralDevelopment:true},
          {id:"campaign",label:"Organise campaigns, rallies and canvassing",concepts:["party_campaign"],developmentConcepts:["increased_awareness","increased_participation"],allowGeneralDevelopment:true},
        ],"KC")),
      component("strategies","Suggests THREE strategies government may use to maintain adequate social services",6,
        developed(3,[
          {id:"revenue",label:"Strengthen fair and effective revenue collection",concepts:["taxation","government_revenue"],developmentConcepts:["government_social_services","public_services"],allowGeneralDevelopment:true},
          {id:"spending",label:"Prioritise and improve efficiency of public spending",concepts:["efficient_spending"],developmentConcepts:["fiscal_space","government_social_services"],allowGeneralDevelopment:true},
          {id:"growth",label:"Promote economic growth and employment",concepts:["economic_growth","job_creation"],developmentConcepts:["government_revenue","public_services"],allowGeneralDevelopment:true},
          {id:"partnership",label:"Use suitable public-private partnerships",concepts:["public_private_partnership"],developmentConcepts:["public_investment","public_services"],allowGeneralDevelopment:true},
          {id:"debt",label:"Manage debt to protect fiscal space",concepts:["debt_burden","debt_service"],developmentConcepts:["fiscal_space","public_services"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO social-service strategies are likely to succeed",4,
        developed(2,[
          {id:"revenue",label:"Increases reliable government revenue for services",concepts:["government_revenue"],developmentConcepts:["government_social_services","public_services"],allowGeneralDevelopment:true},
          {id:"efficiency",label:"Reduces waste and directs more funds to priority services",concepts:["efficient_spending"],developmentConcepts:["fiscal_space","public_services"],allowGeneralDevelopment:true},
          {id:"growth",label:"Economic growth expands employment and the revenue base",concepts:["economic_growth"],developmentConcepts:["government_revenue","employment"],allowGeneralDevelopment:true},
          {id:"space",label:"Lower debt pressure leaves more fiscal space for services",concepts:["fiscal_space"],developmentConcepts:["public_services","debt_service"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),

  "ss-p2-c-q6":freeze({
    topicPhrases:freeze(["climate resilience","climate change","caribbean communities","adaptation"]),
    contentMarks:18,
    organizationMarks:4,
    components:freeze([
      component("definition","Defines climate-change adaptation",2,
        definition([
          {id:"adjust",label:"Adjusts to actual or expected climate impacts",concepts:["adaptation"],phrases:["adjust to climate impacts","cope with climate change","adapt to effects"],marks:1},
          {id:"risk",label:"Reduces vulnerability or harm from those impacts",phrases:["reduce vulnerability","reduce climate risk","reduce damage","limit harm"],marks:1},
        ])),
      component("effects","Identifies TWO effects of climate change",2,
        list(2,[
          {id:"sea",label:"Sea-level rise",concepts:["sea_level_rise"]},
          {id:"storm",label:"Stronger storms",concepts:["stronger_storms"]},
          {id:"drought",label:"Drought",concepts:["drought"]},
          {id:"flood",label:"Flooding",concepts:["flooding"]},
          {id:"health",label:"Health impacts",concepts:["health_impact"]},
          {id:"agriculture",label:"Agricultural impacts",concepts:["agriculture_impact"]},
        ])),
      component("community","Explains TWO ways households or communities may adapt",4,
        developed(2,[
          {id:"water",label:"Harvest and store rainwater",concepts:["rainwater_harvesting"],developmentConcepts:["drought"],allowGeneralDevelopment:true},
          {id:"crops",label:"Use drought-resistant crops and climate-smart farming",concepts:["drought_resistant_crops"],developmentConcepts:["agriculture_impact"],allowGeneralDevelopment:true},
          {id:"coast",label:"Protect coasts and restore mangroves",concepts:["coastal_protection"],developmentConcepts:["sea_level_rise","coastal_erosion"],allowGeneralDevelopment:true},
          {id:"prepared",label:"Prepare evacuation and disaster plans",concepts:["disaster_preparedness"],developmentConcepts:["stronger_storms","flooding"],allowGeneralDevelopment:true},
        ])),
      component("government","Suggests THREE government measures to strengthen climate resilience",6,
        developed(3,[
          {id:"infrastructure",label:"Invest in climate-resilient infrastructure",concepts:["climate_resilient_infrastructure"],developmentConcepts:["flooding","stronger_storms"],allowGeneralDevelopment:true},
          {id:"warning",label:"Strengthen early-warning systems",concepts:["early_warning"],developmentConcepts:["disaster_preparedness"],allowGeneralDevelopment:true},
          {id:"coast",label:"Protect vulnerable coasts",concepts:["coastal_protection"],developmentConcepts:["sea_level_rise","coastal_erosion"],allowGeneralDevelopment:true},
          {id:"water",label:"Expand water-conservation and storage systems",concepts:["rainwater_harvesting","watershed_protection"],developmentConcepts:["drought"],allowGeneralDevelopment:true},
          {id:"planning",label:"Strengthen disaster preparedness and land-use planning",concepts:["disaster_preparedness"],developmentConcepts:["flooding","stronger_storms"],allowGeneralDevelopment:true},
        ])),
      component("success","Explains why TWO resilience measures are likely to succeed",4,
        developed(2,[
          {id:"damage",label:"Reduces physical damage and service disruption",concepts:["climate_resilient_infrastructure"],developmentConcepts:["disaster_disruption"],allowGeneralDevelopment:true},
          {id:"warning",label:"Early warnings give people time to prepare or evacuate",concepts:["early_warning"],developmentConcepts:["disaster_preparedness"],allowGeneralDevelopment:true},
          {id:"coast",label:"Coastal protection reduces erosion and storm-surge exposure",concepts:["coastal_protection"],developmentConcepts:["coastal_erosion","sea_level_rise"],allowGeneralDevelopment:true},
          {id:"water",label:"Water storage reduces vulnerability during drought",concepts:["rainwater_harvesting"],developmentConcepts:["drought"],allowGeneralDevelopment:true},
        ])),
    ]),
  }),
});

const LINKING_PHRASES=freeze([
  "because","therefore","as a result","for example","for instance","in addition",
  "another","also","this means","which means","consequently","thus","first",
  "second","finally","on the other hand","in contrast","so that"
]);

function paragraphs(value){
  return String(value || "")
    .split(/\n\s*\n|\n(?=\s{0,4}[A-Z])/)
    .map(item=>item.trim())
    .filter(Boolean);
}

function introductionPresent(value,scheme){
  const text=normalizeSocialStudiesText(value);
  const first=text.split(/\s+/).slice(0,80).join(" ");
  return (scheme.topicPhrases || []).some(phrase=>first.includes(normalizeSocialStudiesText(phrase)));
}

function organizationGrade(value,scheme){
  const text=normalizeSocialStudiesText(value);
  const wordCount=text.split(/\s+/).filter(Boolean).length;
  const blocks=paragraphs(value);
  const paragraphWordCounts=blocks.map(block=>normalizeSocialStudiesText(block).split(/\s+/).filter(Boolean).length);
  const developedParagraphCount=paragraphWordCounts.filter(count=>count>=20).length;
  const sentenceCount=String(value || "").split(/[.!?]+/).map(item=>item.trim()).filter(Boolean).length;

  if(wordCount<20){
    return {
      marks:0,maxMarks:4,band:0,
      feedback:"No clear essay organisation is demonstrated.",
      paragraphCount:blocks.length,
      developedParagraphCount,
      paragraphWordCounts,
      sentenceCount,
      linkingCount:0,
      introduction:false,
      strengths:[],
      weaknesses:["The response is too short to demonstrate an essay structure."],
      nextStep:"Write an introduction and develop the response in connected paragraphs.",
    };
  }

  const linkingSignals=LINKING_PHRASES.filter(phrase=>text.includes(phrase));
  const linkingCount=linkingSignals.length;
  const introduction=introductionPresent(value,scheme);

  let marks=1;
  if(blocks.length>=2 && developedParagraphCount>=1) marks=2;
  if(introduction && blocks.length>=3 && developedParagraphCount>=2 && linkingCount>=2) marks=3;
  if(introduction && blocks.length>=4 && developedParagraphCount>=3 && linkingCount>=4 && sentenceCount>=8) marks=4;

  const strengths=[];
  const weaknesses=[];
  if(introduction) strengths.push("The opening establishes the essay topic.");
  else weaknesses.push("The opening does not clearly establish the essay topic.");
  if(developedParagraphCount>=3) strengths.push("Several paragraphs develop complete points.");
  else weaknesses.push("More paragraphs need developed points rather than short statements.");
  if(linkingCount>=4) strengths.push("The essay uses effective linking language.");
  else if(linkingCount>=2) strengths.push("Some useful linking language is present.");
  else weaknesses.push("The essay needs clearer links between ideas.");
  if(blocks.length>=4) strengths.push("The response uses a clear multi-paragraph essay format.");
  else weaknesses.push("Use clearer paragraphing to separate the major parts of the response.");

  const feedback={
    4:"Excellent organisation. The response uses an essay format with coherent presentation of points, effective linkages, a clear introduction and developed paragraphs.",
    3:"Good organisation. The response has a clear introduction and coherent paragraphs, but its linkages or development are not consistently strong.",
    2:"Organisation is evident, but the essay is not consistently cohesive and some paragraphing or development is weak.",
    1:"Essay organisation is weak. The response shows limited essay structure and little effective paragraph development.",
  }[marks];

  const nextStep=marks===4
    ? "Maintain this structure while checking that every paragraph directly answers the task."
    : !introduction
      ? "Open with a brief introduction that establishes the topic and direction of the essay."
      : developedParagraphCount<3
        ? "Develop each major point in its own paragraph with explanation and relevant support."
        : linkingCount<4
          ? "Use clearer transitions to show how one developed point connects to the next."
          : "Strengthen the essay structure and keep each paragraph focused on one developed point.";

  return {
    marks,maxMarks:4,band:marks,feedback,
    paragraphCount:blocks.length,
    developedParagraphCount,
    paragraphWordCounts,
    sentenceCount,
    linkingCount,
    linkingSignals,
    introduction,
    strengths,
    weaknesses,
    nextStep,
  };
}

export function gradeSocialStudiesEssay(value,questionId){
  const scheme=SOCIAL_STUDIES_ESSAY_SCHEMES[questionId];
  if(!scheme){
    return {
      status:"unavailable",
      contentMarks:0,
      organizationMarks:0,
      marks:0,
      maxMarks:22,
      components:[],
      organization:null,
      reviewSuggested:true,
    };
  }

  const components=scheme.components.map(entry=>{
    const result=gradeSocialStudiesShortAnswer(value,entry.scheme);
    return {
      id:entry.id,
      label:entry.label,
      maxMarks:entry.maxMarks,
      ...result,
    };
  });

  const contentMarks=Math.min(
    scheme.contentMarks,
    components.reduce((sum,entry)=>sum+entry.marks,0)
  );
  const organization=organizationGrade(value,scheme);
  const marks=contentMarks+organization.marks;
  const normalized=normalizeSocialStudiesText(value);
  const words=normalized.split(/\s+/).filter(Boolean).length;

  return {
    status:marks>=20 ? "strong" : marks>=14 ? "developing" : "needs-work",
    contentMarks,
    organizationMarks:organization.marks,
    marks,
    maxMarks:scheme.contentMarks+scheme.organizationMarks,
    components,
    organization,
    wordCount:words,
    reviewSuggested:words>=120 && contentMarks<scheme.contentMarks,
  };
}

export function gradeSocialStudiesEssays(responses={},questions=[]){
  const essays=questions.filter(question=>question.type==="essay");
  const perQuestion={};
  let score=0;
  let maxScore=0;

  essays.forEach(question=>{
    const result=gradeSocialStudiesEssay(responses[question.id] || "",question.id);
    perQuestion[question.id]=result;
    score+=result.marks;
    maxScore+=result.maxMarks;
  });

  return freeze({
    score,
    maxScore,
    percent:maxScore?Math.round(score/maxScore*100):0,
    perQuestion,
  });
}
