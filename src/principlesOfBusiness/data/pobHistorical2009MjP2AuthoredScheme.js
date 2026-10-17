// 2009 May/June CSEC Principles of Business Paper 02: SPARK-authored
// mark-by-mark learning rubric from the four-page supplied examination.
// Unlike an official CXC examiner's scheme, these answers are independent
// academic interpretations of the printed 20-mark questions.
// Seven questions appear, BUT a candidate must answer Q1-3, one of Q4/5,
// and one of Q6/7, for a 100-mark maximum. Preserve historical rules.
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
const SOURCE=Object.freeze([
 [1,"a",4,"A wish to earn profit and provide independent employment are reasons for starting a business.",["2:Profit motivation with an accurate business explanation","2:Self-employment, independence or another DISTINCT developed reason for establishing a venture"]],
 [1,"b",6,"A new enterprise can employ residents, buy local supplies and provide nearby goods and services.",["2:Local jobs with added household income","2:Use of local suppliers, multiplying earnings for residents","2:Improved access to goods or community tax and development benefits, with explanation"]],
 [1,"c",6,"A planned economy uses central decisions on what to produce, public ownership of major resources and administered prices. A free-market economy relies more on private decisions, ownership and supply and demand.",["2:Explains central versus decentralised allocation of resources","2:Distinguishes public from private ownership and decision-making","2:Distinguishes administered prices versus market supply-and-demand prices"]],
 [1,"d",4,"Converting a partnership to a private limited company generally gives its shareholders limited liability and gives the business a separate continuing legal identity.",["2:Shareholders have limited liability, protecting personal assets within law","2:Separate legal identity or continuity, or improved access to equity finance, appropriately explained"]],
 [2,"a",2,"Entrepreneurship is identifying an opportunity and organising resources to start a venture while bearing business risks.",["1:Identifies business opportunity and creation or organisation of a venture","1:Explains risk-taking or investment of resources"]],
 [2,"b",3,"Mrs Greenwood could arrange preventive maintenance or backup machinery and reschedule orders so the factory can meet customers' needs.",["1:Identifies entrepreneurial problem-solving or initiative","1:Gives a realistic equipment-repair, backup, leasing, outsourcing or staffing solution","1:Explains impact on output reliability and delivery commitments"]],
 [2,"c",6,"She might want personal independence, profit and the opportunity to serve unmet demand for bottled water.",["2:Develops a first valid distinct motivation","2:Develops a second distinct motivation","2:Develops a third distinct motivation"]],
 [2,"d",3,"Possible unethical actions include mislabelling water, giving false delivery promises and supplying unsafe or substandard bottles.",["1:First distinct plausible unethical conduct","1:Second distinct plausible unethical conduct","1:Third distinct plausible unethical conduct"]],
 [2,"e",6,"Unethical business practices may trigger enforcement penalties, reduce consumer trust and cause customer harm or lawsuits.",["2:First realistic consequence with business or social impact","2:Second DISTINCT realistic consequence with impact","2:Third DISTINCT realistic consequence with impact"]],
 [3,"a.i",2,"Market research is systematic collection and analysis of customer or market information used to support business decisions.",["1:Identifies deliberate collection or investigation of market information","1:Connects the information to consumers, demand, competition or decision-making"]],
 [3,"a.ii",6,"Businesses research markets to identify customers, measure demand and improve product or pricing decisions.",["2:Explains first distinct research purpose","2:Explains second distinct research purpose","2:Explains third distinct research purpose"]],
 [3,"b",4,"Hotels can offer off-season room discounts and special packages including meals, transport or attractions.",["2:First suitable off-season promotional tactic, such as a discounted rate","2:Second DISTINCT suitable promotional tactic, such as a package deal, loyalty incentive or special event"]],
 [3,"c",8,"A buyer may assess price relative to budget, desired phone features, the brand's reputation and how easily the device can be serviced.",["2:First consumer decision factor and how it affects choosing a phone","2:Second DISTINCT factor explained","2:Third DISTINCT factor explained","2:Fourth DISTINCT factor explained"]],
 [4,"a.i",2,"Migration is the movement of people from one geographic area or country to another for temporary or permanent settlement.",["1:Describes movement of persons between places","1:Clarifies relocation or change of place of residence"]],
 [4,"a.ii",2,"Labour supply is the number of people willing and able to work at prevailing wages and conditions in a given labour market.",["1:Identifies available people or working time offered","1:States willingness and ability to work at a given wage or period"]],
 [4,"b",4,"Population size, working-age structure, wage rates and migration patterns affect a country's labour supply.",["1:First genuine driver of labour supply","1:Second DISTINCT driver","1:Third DISTINCT driver","1:Fourth DISTINCT driver"]],
 [4,"c.i",4,"Emigration can reduce the origin country's available trained workers, creating vacancies and slowing production, although remittances might help households.",["2:First origin-country impact with supporting explanation","2:Second DISTINCT origin-country impact with supporting explanation"]],
 [4,"c.ii",4,"Immigration expands the destination's available workers and can fill skills gaps, although it may intensify competition for some jobs.",["2:First destination-country impact with explanation","2:Second DISTINCT destination-country impact with explanation"]],
 [4,"d",4,"Production measures total output created in a period, while productivity measures output relative to inputs, such as units per worker-hour.",["2:Correctly explains production as the quantity or value of goods and services produced","2:Correctly defines productivity as output per input and clearly distinguishes efficiency from total output"]],
 [5,"a",2,"Personal budgeting is planning and monitoring expected individual income, savings and expenditure over a stated period.",["1:Identifies planned allocation or tracking of personal money","1:Relates this plan to income and spending or saving over time"]],
 [5,"b",4,"A budget can prevent Mary-Jo from overspending her redundancy payment and help her prioritise essential bills while income is uncertain.",["2:First benefit developed in her job-loss context","2:Second DIFFERENT benefit developed in her job-loss context"]],
 [5,"c.i",4,"A credit union may pay competitive savings dividends and give members a voice, but withdrawals or products might be more restricted than at a large bank.",["2:Valid credit-union advantage specific to saving, properly explained","2:Valid credit-union disadvantage relevant to saving, properly explained"]],
 [5,"c.ii",4,"A commercial bank may offer broad access to ATMs and electronic banking, but some savings accounts have fees or low returns.",["2:Valid commercial-bank advantage for Mary-Jo explained","2:Valid commercial-bank disadvantage for Mary-Jo explained"]],
 [5,"d.i",2,"The stock market enables investors to buy and sell shares and other listed securities, providing liquidity and price discovery.",["1:Identifies an organised venue or system for trading securities","1:Explains investor access, liquidity, price discovery or capital allocation"]],
 [5,"d.ii",4,"Stocks may provide dividends and price growth but their values can fall. Alternatively, a house may provide accommodation or rental income but requires large capital and ongoing upkeep.",["2:One genuine advantage of the chosen SAME investment, explained","2:One genuine disadvantage of that SAME investment, explained"]],
 [6,"a",2,"Human resource development is improving a population's knowledge, skills, health and capabilities through education, training and related investments.",["1:Identifies improvement of people's skills, knowledge or abilities","1:Explains training, education or similar development for productive work"]],
 [6,"b",6,"Skills development raises worker productivity, encourages innovation and enables firms to compete for higher-value business, supporting jobs and national income.",["2:First development mechanism linking workforce improvement to economy","2:Second DISTINCT positive growth or development mechanism","2:Third DISTINCT positive mechanism"]],
 [6,"c.i",3,"Loss of skilled workers through emigration can cause shortages and lower production, although remittances and return migration may offset some effects.",["1:Identifies migration as inward or outward movement","1:Explains a credible economic effect on country of origin or destination","1:Develops consequence, such as a skills shortage or remittance inflow"]],
 [6,"c.ii",3,"Economic dualism is coexistence of a high-productivity modern sector and a low-productivity traditional sector, often widening income and opportunity gaps.",["1:Correctly characterises modern and traditional sectors side by side","1:Explains different productivity, technology or incomes","1:Connects disparity to uneven national growth, poverty or regional inequality"]],
 [6,"d",6,"The Caribbean Development Bank can lend for public infrastructure, fund education and technical training and offer expert project support, increasing regional capacity.",["2:First realistic CDB development support mechanism and likely effect","2:Second DISTINCT CDB support mechanism and impact","2:Third DISTINCT CDB support mechanism and impact"]],
 [7,"a.i",2,"The WTO provides a rules-based framework for international trade and a forum for negotiating rules and resolving trade disputes.",["1:Correctly identifies the WTO as a global trade-rules body","1:States a real function, such as negotiations, monitoring or dispute settlement"]],
 [7,"a.ii",2,"The European Union coordinates a common market and shared trade policies among its members.",["1:Correctly identifies EU regional integration or shared economic cooperation","1:States a real function, such as common-market access or trade-policy coordination"]],
 [7,"b",6,"CARICOM can expand regional markets, strengthen members' bargaining power and promote qualified movement of labour or shared regional institutions.",["2:First distinct genuine CARICOM membership benefit explained","2:Second distinct benefit explained","2:Third distinct benefit explained"]],
 [7,"c",4,"Manufacturing can replace some imports and earn foreign exchange through exports, while creating employment and value added.",["2:First realistic manufacturing contribution, such as jobs or higher output, explained","2:Second DISTINCT contribution, such as exports or import substitution, explained"]],
 [7,"d.i",2,"Foreign direct investment is a long-term investment by a foreign investor or enterprise to establish or obtain a significant controlling interest in business operations abroad.",["1:Identifies investment by an overseas individual or firm in the domestic economy","1:Explains lasting business ownership, influence or control rather than mere buying of tradable securities"]],
 [7,"d.ii",4,"Foreign direct investors can create local jobs and transfer finance, technology and management expertise to domestic industry.",["2:First FDI benefit and link to economic growth","2:Second distinct FDI benefit and link to growth"]],
]);
export const POB_2009_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2009-MJ",paper:2,year:2009,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2009_MJ.pdf",
 sourceSha256:"4bc6ceb120bb5e9d9080b079724afaa3e788bc555370efc81b37856ec8531038",
 sourcePages:4,sourceExamQuestions:7,questionsToAnswer:5,
 origin:"spark-independent-subject-specialist-rubric-not-CXC-official",
 sourceAuthenticity: "user-supplied-booklet",
 sourceQuestionTranscriptionFullyVerified:false,
 officialCxcMarkSchemeAvailable:false,semanticAssessmentCalibrated:false,
 liveScoringApproved:false,maximumCandidateMarks:100,
 questions:Object.freeze([1,2,3,4,5,6,7].map(number=>Object.freeze({
   number,maximumMarks:20,
   parts:Object.freeze(SOURCE.filter(row=>row[0]===number).map(([_,id,modelPrompt,modelAnswer,rawCriteria])=>
    Object.freeze({
      id,marks:rawCriteria.reduce((n,c)=>n+Number(c.slice(0,c.indexOf(":"))),0),
      sourcePromptSummary:modelPrompt,modelAnswer,
      criteria:Object.freeze(rawCriteria.map(raw=>{
       const split=raw.indexOf(":");
       return Object.freeze({
        marks:Number(raw.slice(0,split)),rule:raw.slice(split+1),
        sparkInternallyAuthored:true,sourceSchemeVerified:false
       });
      }))
    })
   ))
 })))
});
export function verifyPob2009MjP2AuthoredScheme(paper=POB_2009_MJ_P2_AUTHORED_SCHEME){
 const issues=[];
 if(paper.id!=="POB-P2-2009-MJ"||paper.sourceSha256!=="4bc6ceb120bb5e9d9080b079724afaa3e788bc555370efc81b37856ec8531038")
  issues.push("Unknown 2009 source or changed SHA-256.");
 if(!Array.isArray(paper.questions)||paper.questions.length!==7)
  issues.push("Exactly seven offered 2009 questions expected.");
 let offeredMarks=0,partCount=0;
 for(const q of paper.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>7)issues.push("Invalid question number.");
  const ids=new Set();
  let marks=0;
  for(const part of q.parts||[]){
   partCount++;
   if(ids.has(part.id))issues.push("Duplicate part "+part.id);
   ids.add(part.id);
   const ruleMarks=part.criteria?.reduce((n,r)=>n+r.marks,0);
   if(ruleMarks!==part.marks)issues.push("Criterion mismatch Q"+q.number+":"+part.id);
   if(!part.modelAnswer||part.modelAnswer.length<35)issues.push("Missing developed answer Q"+q.number+":"+part.id);
   if(part.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false))
    issues.push("Provenance mismatch Q"+q.number+":"+part.id);
   marks+=part.marks;
  }
  if(marks!==20)issues.push("Question "+q.number+" not 20 marks.");
  offeredMarks+=marks;
 }
 if(offeredMarks!==140)issues.push("Seven optional 20-mark questions should total 140 offered.");
 if(paper.maximumCandidateMarks!==100)issues.push("Candidate maximum must be 100, not 140.");
 if(paper.liveScoringApproved!==false||paper.officialCxcMarkSchemeAvailable!==false)
  issues.push("Uncalibrated rubric cannot be labeled official or live.");
 if(!validatePobHistoricalP2Selection(paper.id,[1,2,3,4,6]).valid)
  issues.push("Selection rule Q1-3 and optional pairs must hold.");
 return {valid:issues.length===0,issues,questions:paper.questions?.length||0,parts:partCount,offeredMarks};
}
