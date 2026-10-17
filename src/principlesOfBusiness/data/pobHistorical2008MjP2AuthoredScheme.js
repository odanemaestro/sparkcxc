// May/June 2008 source-bound Paper 02, seven source questions, 140 offered
// marks; FIVE questions attempted for a maximum of 100: Q1,2,3,
// one of Q4/Q5 and one of Q6/Q7. All four scanned pages read visually.
// Model answers/partial credit authored internally by SPARK, not CXC's
// official marking scheme. No calibrated or live grading.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
const ANSWERS=Object.freeze([
 [1,"a","A business may have marketing, human resources, production and finance departments.",["1:First genuine, distinct business department","1:Second distinct department","1:Third distinct department","1:Fourth distinct department"]],
 [1,"b","Marketing promotes products; production makes goods; finance manages money; human resources recruits and trains employees.",["1:Accurate function of first department chosen in a","1:Accurate different function matched to second department in a","1:Accurate third department duty matched to a","1:Accurate fourth department duty matched to a"]],
 [1,"c","At Christmas the marketing team plans promotion; production increases bottling output; purchasing orders more syrup and bottles; finance budgets for overtime and inventories.",["2:First legitimate department from Q1(a) named with explained response to seasonal soft-drink demand","2:Second distinct department and developed response","2:Third distinct department and developed response","2:Fourth distinct department and developed response"]],
 [1,"d","A clear internal grievance and mediation process allows both sides to be heard. Management can arrange a moderated discussion and agree on a corrective plan.",["2:First distinct credible conflict-resolution process and how it works","2:Second different conflict-resolution process, supported by practical description"]],
 [2,"a","Subsistence production is output primarily for the producer's own consumption. Commercial production is for sale to buyers; the difference is the purpose and intended market.",["1:Names a valid first level of production, such as subsistence","1:Names a distinct valid level, such as commercial/market production","2:Explains main difference in production destination/purpose, rather than simply naming them"]],
 [2,"b","Primary production takes materials from nature, such as cultivating sugar cane. Secondary production transforms them, as in making sugar or assembling furniture.",["2:Accurate primary classification, explained with primary industry example","2:Accurate contrasting secondary industry and manufacture/construction example"]],
 [2,"c","A cottage industry is small-scale and often home or family operated, creating local income. It commonly uses little capital and local hand skills, offering enterprise without high start-up investment.",["1:First correct cottage-industry characteristic","1:Second different cottage-industry characteristic","2:Explain development benefit that follows first characteristic","2:Explain a distinct development benefit following second characteristic"]],
 [2,"d","Cottage craft makers provide input goods and souvenirs to hotels and tour operators, keeping visitor spending locally. Agricultural processors buy crops from farmers, creating stable supplier demand, jobs and further economic activity.",["3:First credible Caribbean industry linkage and causal economic-development outcome","3:Second different linkage and developed jobs, income, export or import-substitution outcome"]],
 [3,"a","Consumer behaviour depends on disposable income, cultural preferences and price/quality relative to competing products.",["2:First factor and why it affects consumer choice","2:Second distinct factor with relevant explanation","2:Third different factor explained"]],
 [3,"b","In Jamaica, the Consumer Affairs Commission accepts consumer complaints; the Bureau of Standards Jamaica can address product quality and standards concerns.",["1:First genuine local consumer redress or protection body","1:Second different relevant consumer protection body"]],
 [3,"c","One channel is bakery/producer directly to consumers, such as home delivery. Another is bakery/producer to the shopping mart retailer, then consumers.",["2:Valid direct distribution route stated and described","2:Distinct valid retail intermediary route with correct participant order"]],
 [3,"d","Fresh flowers should travel by rapid refrigerated road delivery or air freight for distant markets to limit wilting. Cement can move in bulk by sea or heavy trucks due to weight and low perishability. Daily newspapers need rapid local road dispatch to remain timely. Physical cash may use secured armoured vehicles; electronic transfers are suitable for sending money without transporting cash.",["2:Appropriate first product transport with relevant time/perishability justification","2:Appropriate cement mode with weight/cost rationale","2:Appropriate newspaper mode with urgency/distribution reasoning","2:Appropriate secure money transport or transfer and safety/efficiency rationale"]],
 [4,"a","An individual may establish a venture for self-employment and personal independence, or for profits by satisfying market demand.",["2:First genuine entrepreneurial motive developed","2:Second distinct entrepreneurial motive outlined"]],
 [4,"b","Businesses provide local jobs, support local suppliers and sponsor skills, sport or community development.",["2:First distinct developed community contribution","2:Second different community-development contribution","2:Third distinct contribution with relevant effect"]],
 [4,"c","The public sector includes state-owned and government-controlled activity such as a public hospital. The private sector includes privately owned enterprises, such as a family grocery store.",["2:Public-sector definition accurately explained","1:Correct government organisation example","2:Private-sector definition accurately distinguished","1:Credible privately owned business example"]],
 [4,"d","Government may nationalise a utility to ensure an essential service is available affordably. It may also protect strategic infrastructure or rescue a critical failing enterprise.",["2:First realistic nationalisation motive with causal explanation","2:Second distinct and developed public-interest reason"]],
 [5,"a","A business plan summarises objectives and describes the financial, marketing and operating methods for achieving them.",["1:Identifies written roadmap of business objectives","1:Explains planning implementation or financing purpose"]],
 [5,"b","Marketing plans identify customers and promotions; finance plans forecast costs and cash flow; production plans describe output and materials; organisational plans allocate staffing and management duties.",["2:First legitimate business-plan element described correctly","2:Second different element and relevant details","2:Third different element developed","2:Fourth distinct element developed"]],
 [5,"c","Land and buildings, or an owned vehicle, may be acceptable assets pledged as security.",["1:First viable real collateral asset","1:Second different collateral asset"]],
 [5,"d","Collateral reduces lender risk because pledged assets can be realised following default. It can also support approval when a borrower has an uncertain credit history.",["2:First valid reason lenders demand collateral with explanation","2:Second distinct valid reason developed"]],
 [5,"e","Borrower misrepresentation can lead to refusal or recall of credit, making legitimate future loans harder. Fraud or dishonest loan records may also create contractual and legal penalties and harm the borrower's reputation.",["2:First borrower-focused impact of unethical business conduct explained","2:Second distinct realistic impact with consequence"]],
 [6,"a","Standard of living reflects material access to income, goods and services. Quality of life includes health, safety, personal liberty, environmental conditions and broader well-being.",["2:Correct material consumption/income concept of standard of living","2:Correct quality-of-life concept and meaningful contrast"]],
 [6,"b","A 2% increase in real GDP means the country's inflation-adjusted value or volume of final domestic output is 2% greater than in the preceding comparison period; it is not simply a 2% rise in prices.",["1:Real GDP concerns final domestic output adjusted for inflation","1:States magnitude is two percent growth compared with base period","1:Clarifies real output growth rather than nominal price inflation"]],
 [6,"c","Higher real wages and employment help households buy necessities; better access to education and medical services supports healthier, more productive lives; improved affordable housing enhances material well-being.",["2:First credible source of improved living standards with causal effect","2:Second distinct contributing factor developed","2:Third different factor explained"]],
 [6,"d","The income approach adds factor earnings, including wages, profits, rents and interest, plus appropriate net income from abroad for GNP. The expenditure approach adds final consumption, investment, government purchases and net exports, then adjusts from GDP to national output where needed.",["2:First national-product measurement method and workings, including national scope","2:Second distinct valid method described without double-counting"]],
 [6,"e","GDP may rise while growth benefits mostly a few wealthy owners; average gains may not reach households. Population growth or environmental degradation may also offset nominal output benefits.",["1:Identifies credible disparity between aggregate real GDP and welfare","1:Explains unequal distribution, population or environmental mechanism","1:Relates this to no actual improvement in people's living conditions"]],
 [7,"a.i","A CARICOM single market reduces barriers to trade and allows eligible factors of production to move under agreed regional rules, making participating economies function more like one market.",["1:Defines a coordinated integrated regional market","1:Explains reduction of barriers and shared access among members","1:Mentions agreed movement of goods, services, labour or capital appropriately"]],
 [7,"a.ii","CARICOM aims to strengthen regional trade, coordinate economic policies and promote members' social or functional cooperation.",["1:First genuine distinct CARICOM aim","1:Second distinct aim","1:Third different aim"]],
 [7,"b","Regional integration allows local firms to sell to a larger market, may reduce duplication and trading costs, and creates new opportunities for qualifying skilled Caribbean workers.",["2:First distinct developed single-market economic advantage","2:Second distinct advantage with plausible market mechanism","2:Third different developed advantage"]],
 [7,"c","High youth unemployment is a major Caribbean challenge. Paid apprenticeships linked to employer demand can improve workforce skills and placement into jobs, reducing unemployment.",["1:Identifies one genuine significant Caribbean economic problem","2:Details a credible actionable solution matched to that problem","1:Explains why the solution tackles the problem"]],
 [7,"d","Public education trains workers with literacy, technical and professional skills. A more capable labour force raises productivity and attracts investment, contributing to national development.",["1:Names an actual government social service, such as public education","2:Explains how the selected service improves workforce skills, productivity or welfare","1:Links the service to a specific development outcome"]],
]);
export const POB_2008_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2008-MJ",paper:2,year:2008,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2008_MJ.pdf",
 sourceSha256:"c1ef9a099b0edb2cf82fac344ebe011cfce418e26bf2caa05ecf9ebdc5a6531f",
 sourcePagesReviewed:Object.freeze([1,2,3,4]),printedCode:"01240020",
 timeLimitMinutes:120,questionsOffered:7,questionsToAnswer:5,
 requiredQuestions:Object.freeze([1,2,3]),
 optionalQuestionPairs:Object.freeze([[4,5],[6,7]]),
 offeredMarks:140,maximumCandidateMarks:100,
 rubricSource:"SPARK-authored-not-official-CXC",
 officialCxcMarkingSchemeSupplied:false,
 fullDigitalQuestionBankVerified:false,semanticCalibrationComplete:false,
 liveScoringApproved:false,
 questions:Object.freeze([1,2,3,4,5,6,7].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(ANSWERS.filter(row=>row[0]===number).map(([,partId,modelAnswer,rules])=>Object.freeze({
   id:partId,modelAnswer,
   marks:rules.reduce((sum,s)=>sum+Number(s.split(":")[0]),0),
   criteria:Object.freeze(rules.map(raw=>{
    const idx=raw.indexOf(":");
    return Object.freeze({
     marks:Number(raw.slice(0,idx)),rule:raw.slice(idx+1),
     sourceSchemeVerified:false,authoredBySpark:true
    });
   }))
  })))
 })))
});
export function validatePob2008MjP2Choices(numbers){
 if(!Array.isArray(numbers)||numbers.length!==5||
    numbers.some(n=>!Number.isInteger(n))||new Set(numbers).size!==5)
  return false;
 const s=new Set(numbers);
 return [1,2,3].every(n=>s.has(n))&&
   [4,5].filter(n=>s.has(n)).length===1&&
   [6,7].filter(n=>s.has(n)).length===1;
}
export function verifyPob2008MjP2AuthoredScheme(paper=POB_2008_MJ_P2_AUTHORED_SCHEME){
 const issues=[];
 const source=POB_SUPPLIED_ARCHIVE.find(x=>x.id===paper?.id);
 if(!source||source.sourceSha256!==paper.sourceSha256||source.paper!==2||
   source.filename!==paper.sourceFilename)
  issues.push("Source SHA-256, identity or paper type mismatch.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==7)
  issues.push("Seven source questions required.");
 let total=0,parts=0;const questionNumbers=new Set();
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>7||questionNumbers.has(q.number))
   issues.push("Invalid or duplicated question number.");
  questionNumbers.add(q.number);
  let partTotal=0;const ids=new Set();
  for(const p of q.parts||[]){
   parts++;partTotal+=p.marks;
   if(!p.id||ids.has(p.id))issues.push("Duplicate part "+p.id);
   ids.add(p.id);
   if(typeof p.modelAnswer!=="string"||p.modelAnswer.length<35)
    issues.push("Missing supported model answer for "+q.number+":"+p.id);
   if(!Number.isInteger(p.marks)||p.marks<1||
      p.criteria?.reduce((sum,x)=>sum+x.marks,0)!==p.marks)
    issues.push("Wrong part criterion max for "+q.number+":"+p.id);
   if(p.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false))
    issues.push("Rubric origin incorrectly marked official.");
  }
  if(partTotal!==20)issues.push("Incorrect 20-mark question total for "+q.number);
  total+=partTotal;
 }
 if(total!==140||paper.maximumCandidateMarks!==100)
  issues.push("Offered 140 versus attempted 100 mismatch.");
 if(!validatePob2008MjP2Choices([1,2,3,4,6])||
    validatePob2008MjP2Choices([1,2,3,4,5]))
  issues.push("Wrong historic optional-question selection.");
 if(paper.liveScoringApproved!==false||paper.officialCxcMarkingSchemeSupplied!==false)
  issues.push("Cannot publish SPARK academic draft as CXC official grade.");
 return {valid:issues.length===0,issues,offeredMarks:total,partCount:parts};
}
