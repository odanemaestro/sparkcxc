// SPARK authored, May/June 2010 historical POB P2 mark guide.
// PDF: CSEC_Principles_of_Business_P2_2010_MJ.pdf, original 4 pages.
// NOT CXC's published marking scheme. 7 offered questions, 5 to answer.
// Original instructions: Q1-3 compulsory, Q4 or 5, Q6 or 7 (100 max).
const RAW=Object.freeze([
 [1,"a","A business plan is a written document detailing business goals, operations and methods for achieving them.",["1:Identifies written business proposal or blueprint","1:Explains goals and steps or resources for implementing the venture"]],
 [1,"b.i","Business identification states the venture's name, location, ownership type and registration details.",["1:Names identifying details of the firm","1:Describes examples, such as trading name, address, ownership structure or contact details"]],
 [1,"b.ii","Product or service description outlines the offering, features, customers' needs and what differentiates it.",["1:Explains the goods or services offered","1:Describes their features, benefits or intended customer need"]],
 [1,"b.iii","Market strategy explains intended customers, promotion, pricing and how the business will reach buyers.",["1:Identifies plan for target customers or market position","1:Describes methods such as distribution, advertising, promotion or price setting"]],
 [1,"b.iv","Organisation or management describes roles, responsibilities, staffing and authority within the firm.",["1:Identifies company management or organisational arrangement","1:Describes personnel roles, reporting lines, recruitment or responsibilities"]],
 [1,"c","An executive summary should mention the business concept, customer market, financial highlights and funding or growth goals.",["1:First appropriate executive summary component","1:Second different component","1:Third different component","1:Fourth different component"]],
 [1,"d","A plan guides objectives, attracts investors or loan finance and anticipates costs, risks and needed resources.",["2:First distinct planning reason with business relevance","2:Second distinct reason developed","2:Third distinct reason developed"]],
 [2,"a","A simple contract is a legally binding agreement supported by the required elements such as offer, acceptance and consideration. A mere agreement lacks an element required for enforceability.",["2:Explains simple contract with legal enforceability and essential requirements","2:Explains a mere agreement may exist without legal intention, consideration or enforceability"]],
 [2,"b","A valid contract ordinarily involves offer, acceptance, consideration and intent to create legal relations, alongside capacity, legality and genuine consent.",["1:First valid contract requirement","1:Second different requirement","1:Third different requirement","1:Fourth different requirement"]],
 [2,"c.i","John and Albert agreed on transport for a specified price, with a deposit paid. This supports offer, acceptance and consideration in a commercial arrangement.",["1:Identifies mutual offer and acceptance of a specified service","1:Explains consideration or commercial intent demonstrated by the agreed price and deposit"]],
 [2,"c.ii","John's unilateral cancellation without telling Albert likely breached the contract because Albert turned up ready to carry out the agreed transport. Albert may seek provable damages, subject to applicable contract terms and mitigation.",["1:Concludes that a breach is likely, rather than assuming no contract","1:Explains John cancelled or failed to perform his obligation","1:Uses evidence that Albert provided or tendered the transport at the agreed time","1:Explains contractual consequence or realistic damages, without insisting the whole fare must always be paid"]],
 [2,"c.iii","A court may award monetary damages and, when appropriate, an equitable remedy such as an injunction or specific performance. Personal service contracts are seldom specifically enforced.",["1:Monetary damages for proven loss","1:Distinct valid remedy, such as an injunction or context-appropriate equitable restitution or specific performance"]],
 [2,"d","A contract may end by both parties agreeing to release their obligations and by full performance of its terms. Frustration or expiry can also discharge it.",["2:Explains first non-breach mode of discharge","2:Explains second different non-breach mode"]],
 [3,"a","Small businesses can adapt rapidly to customer needs and provide personalised services with lower fixed overhead.",["2:First developed small-business advantage","2:Second different developed advantage"]],
 [3,"b","Cottage industries are usually small-scale operations and often rely on limited capital or family labour, features shared by many small businesses.",["2:First accurate relationship, with explanation","2:Second distinct accurate relationship"]],
 [3,"c","Cottage operations can give families income, use local materials and allow home-based work without substantial investment.",["2:First distinct cottage-industry benefit explained","2:Second different benefit explained","2:Third different benefit explained"]],
 [3,"d","Small enterprises create local jobs and household income while supplying goods and services and encouraging entrepreneurial innovation.",["3:First developed contribution, including how jobs or production support economic activity","3:Second different developed contribution, such as taxes, enterprise or foreign-exchange earnings"]],
 [4,"a","Capital-intensive production relies heavily on expensive machinery, as in automated beverage bottling. Labour-intensive production relies on many workers, as in hand harvesting crops.",["2:Explains capital-intensive production relative to labour","1:Gives credible machine-heavy industry example","2:Explains labour-intensive production relative to machinery","1:Gives credible worker-heavy industry example"]],
 [4,"b","Modern employees need word processing, spreadsheet analysis, email or online communication and basic digital information security skills.",["1:First relevant digital competency","1:Second different digital competency","1:Third different digital competency","1:Fourth different digital competency"]],
 [4,"c","Modern technology can require costly equipment and training, and automation can displace employees.",["2:First genuine disadvantage, explained","2:Second different disadvantage, explained"]],
 [4,"d","Automation can process transactions quickly with fewer mistakes. Inventory systems can track stock accurately and reduce time wasted searching for items.",["3:First distinct technology efficiency improvement, mechanism and business result","3:Second distinct technology efficiency improvement, mechanism and result"]],
 [5,"a.i","Branding creates a distinctive name, sign or identity that customers associate with a company's product.",["1:Identifies product or enterprise identification through a name, symbol or design","1:Explains distinctiveness from competing brands"]],
 [5,"a.ii","Brand identity influences packaging by requiring consistent logos and colours and a recognisable appearance that communicates product quality.",["2:First developed link between brand identity and packaging design","2:Second different developed link between brand and packaging or customer recognition"]],
 [5,"b","Branding helps shoppers recognise the product, promoting repeat purchases. It also differentiates the item from competitors and supports a reputation for quality.",["3:First developed commercial benefit of branding","3:Second different developed benefit"]],
 [5,"c","Consumer behaviour may be influenced by price, income, culture and peer or family preferences.",["1:First genuine consumer-behaviour factor","1:Second different factor","1:Third different factor","1:Fourth different factor"]],
 [5,"d","Registering a patent for an eligible invention protects a new functional design, while trademark rights protect distinctive brand names or logos against confusing unauthorised use.",["2:First defensible IP measure, correct scope and expected protective effect","2:Second distinct protective legal or practical measure with correct scope"]],
 [6,"a","Growth indicators include an increase in real gross domestic product and a rise in real GDP per person.",["1:First valid economic-growth indicator, such as increasing real GDP","1:Second distinct growth indicator, such as real GDP per capita or output growth"]],
 [6,"b","Economic growth is an increase in real output, while development also concerns improvements in health, education, poverty and quality of life.",["1:Correctly defines economic growth as real output expansion","1:Correctly defines development as wider welfare or structural improvement","1:Clearly contrasts quantitative growth with broader qualitative development"]],
 [6,"c","Enforced safety laws reduce injury and protect buyers. Contract laws make commerce more predictable. Environmental rules reduce pollution and protect public resources.",["2:First government regulation benefit with causal explanation","2:Second distinct benefit developed","2:Third distinct benefit developed"]],
 [6,"d","Governments can invest in roads and reliable electricity to reduce business costs, support skills training to raise productivity, and encourage productive private investment to expand output and jobs.",["3:First credible strategy with explanation of how real output increases","3:Second distinct strategy and economic mechanism","3:Third distinct strategy and economic mechanism"]],
 [7,"a","International trade widens customers' markets, gives access to unavailable inputs and may generate foreign-exchange earnings from exports.",["2:First distinct trade benefit with explanation","2:Second different benefit with explanation","2:Third different benefit with explanation"]],
 [7,"b","Balance of trade is goods exports less goods imports: exports of 12m minus imports of 9m give a goods surplus of 3m. Balance of payments records residents' transactions with the rest of the world, including current, capital and financial flows. As a simplified net-flow illustration, 15m external receipts less 13m payments indicate a 2m net inflow before the matching financing or reserve entries.",["2:Accurately defines balance of trade as value of visible goods exports minus goods imports","2:Provides correct numerical goods-trade example and interpretation","2:Defines balance of payments as the wider record of international transactions, not merely merchandise trade","2:Illustrates simplified external inflows and outflows coherently and notes offsetting entries or financing/reserves, avoiding claims that the entire accounting identity stays unbalanced"]],
 [7,"c","Better education raises workers' skills and output per worker and makes it easier to adopt new technology, attracting higher-value investment and improving income.",["3:First distinct education-to-growth mechanism, effect and development outcome","3:Second different mechanism and effect"]],
]);
export const POB_2010_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2010-MJ",paper:2,year:2010,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2010_MJ.pdf",
 sourceSha256:"da79e8f4c4a794b28eb9dc4d5e4c52ffe0b9e9a9034b539a740c01abfb551544",
 sourcePages:4,offeredQuestionCount:7,questionsToAnswer:5,
 originalQuestionSelection:{compulsory:[1,2,3],choices:[[4,5],[6,7]]},
 origin:"spark-internally-authored-not-official-CXC",
 officialCxcSchemeAvailable:false,
 fullyVisuallyTranscribed:false,semanticCalibrationPassed:false,
 liveScoringApproved:false,maximumMarks:100,
 questions:Object.freeze([1,2,3,4,5,6,7].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(RAW.filter(row=>row[0]===number).map(([,id,modelAnswer,rawRules])=>Object.freeze({
   id,modelAnswer,
   marks:rawRules.reduce((a,s)=>a+Number(s.split(":")[0]),0),
   criteria:Object.freeze(rawRules.map(rule=>{
    const pos=rule.indexOf(":");
    return Object.freeze({
     marks:Number(rule.slice(0,pos)),rule:rule.slice(pos+1),
     authoredBySpark:true,sourceSchemeVerified:false
    });
   }))
  })))
 })))
});
export function verifyPob2010MjP2AuthoredScheme(paper=POB_2010_MJ_P2_AUTHORED_SCHEME){
 const issues=[],nums=new Set();let marks=0,parts=0;
 if(paper.id!=="POB-P2-2010-MJ"||paper.sourceSha256!=="da79e8f4c4a794b28eb9dc4d5e4c52ffe0b9e9a9034b539a740c01abfb551544")
  issues.push("Wrong source identity.");
 if(!Array.isArray(paper.questions)||paper.questions.length!==7)
  issues.push("Expected seven offered questions.");
 for(const q of paper.questions||[]){
  if(nums.has(q.number))issues.push("Repeated question.");nums.add(q.number);
  let subtotal=0;const ids=new Set();
  for(const p of q.parts||[]){
   parts++;subtotal+=p.marks;
   if(ids.has(p.id))issues.push("Repeated part.");ids.add(p.id);
   if(!p.modelAnswer||p.modelAnswer.length<30)issues.push("Missing model answer.");
   if(p.criteria?.reduce((a,c)=>a+c.marks,0)!==p.marks)
    issues.push("Part mark mismatch.");
   if(p.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false))issues.push("Unverified rule promoted.");
  }
  if(subtotal!==20)issues.push("Question subtotal not 20.");
  marks+=subtotal;
 }
 if(marks!==140||paper.maximumMarks!==100)issues.push("Incorrect offered/candidate marks.");
 if(paper.liveScoringApproved!==false||paper.officialCxcSchemeAvailable!==false)
  issues.push("Cannot publish uncalibrated internal draft as official scored.");
 return {valid:issues.length===0,issues,offeredMarks:marks,parts};
}
