import { gradeSocialStudiesShortAnswer } from "./socialStudiesShortAnswerGrader";
import { normalizeSocialStudiesText } from "./socialStudiesAnswerLexicon";

const freeze=value=>Object.freeze(value);

const list=(maxPoints,points)=>freeze({
  type:"list",maxPoints,maxMarks:maxPoints,marksPerPoint:1,profile:"KC",points:freeze(points),
});

const developed=(maxPoints,points,profile="UK")=>freeze({
  type:"developed_points",maxPoints,maxMarks:maxPoints*2,profile,points:freeze(points),
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
  if(wordCount<20){
    return {
      marks:0,maxMarks:4,band:0,
      feedback:"No clear essay organisation is demonstrated.",
      paragraphCount:paragraphs(value).length,
      linkingCount:0,
      introduction:false,
    };
  }

  const blocks=paragraphs(value);
  const linkingCount=LINKING_PHRASES.reduce((sum,phrase)=>sum+(text.includes(phrase)?1:0),0);
  const introduction=introductionPresent(value,scheme);

  let marks=1;
  if(blocks.length>=2) marks=2;
  if(introduction && blocks.length>=3 && linkingCount>=2) marks=3;
  if(introduction && blocks.length>=4 && linkingCount>=4) marks=4;

  const feedback={
    4:"Excellent organisation. The response uses an essay format with coherent paragraphs and effective links.",
    3:"Good organisation. The response has a clear introduction and coherent paragraphs.",
    2:"Some organisation is evident, but the essay needs stronger cohesion and paragraphing.",
    1:"Essay organisation is weak. Build clear paragraphs and connect the points.",
  }[marks];

  return {
    marks,maxMarks:4,band:marks,feedback,
    paragraphCount:blocks.length,
    linkingCount,
    introduction,
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
