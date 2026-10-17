// SPARK internally authored 2011 May/June historical Paper 02 answers and rubric.
// 7 source questions; candidates answer Q1-3, one Q4/5 and one Q6/7.
// 140 marks are offered, but only 100 are attempted by one candidate.
// User-supplied source PDF is not a CXC-authenticated marking scheme.
const ROWS=Object.freeze([
 [1,"a.i","Democratic leaders consult staff and encourage participation before making decisions.",["2:Leader seeks workers' input or discusses decisions","2:Leader encourages participation, shared responsibility or two-way communication"]],
 [1,"a.ii","Autocratic leaders make decisions without consulting employees and rely on top-down instructions with close supervision.",["2:Decision-making is concentrated in leader without consultation","2:Top-down direction or close staff supervision explained"]],
 [1,"b","Good leaders are honest, communicate clearly and make fair decisions.",["2:First valid characteristic developed","2:Second different good-leadership characteristic developed","2:Third different characteristic developed"]],
 [1,"c","Poor honesty erodes staff trust and causes conflict. Poor communication creates errors and poor coordination, reducing organisational performance.",["3:First characteristic identified from b with developed harm from its absence","3:Second different characteristic from b with developed organisational harm"]],
 [2,"a","A feasibility study systematically evaluates a proposed venture to determine whether its market, technical and financial prospects make it practical.",["1:Describes deliberate investigation of a business proposal","1:Explains purpose of evaluating viability or practicality"]],
 [2,"b","Feasibility studies are useful before opening a firm, launching a new product and expanding into a different location or market.",["2:First distinct decision situation where feasibility analysis aids an investment","2:Second different valid decision situation explained","2:Third different situation explained"]],
 [2,"c","An entrepreneur identifies market opportunities, organises production resources and bears risks in pursuit of returns.",["2:First valid entrepreneurial role explained","2:Second different entrepreneurial role explained","2:Third different entrepreneurial role explained"]],
 [2,"d","Entrepreneurs create jobs and income while introducing goods, services and innovation, increasing local business activity and tax revenue.",["3:First developed national economic development contribution","3:Second distinct developed contribution"]],
 [3,"a.i","Savings are the portion of current income deliberately not spent, kept for future needs.",["1:Identifies money or income retained","1:Clarifies deferred consumption or future use"]],
 [3,"a.ii","Individuals can save through credit union savings accounts and commercial bank savings accounts.",["1:First legitimate distinct savings method","1:Second different legitimate savings method"]],
 [3,"b","Short-term finance includes a bank overdraft and trade credit. Long-term finance includes mortgage loans and equity share issues.",["1:First suitable short-term finance source","1:Second different short-term source","1:First suitable long-term finance source","1:Second different long-term source"]],
 [3,"c.i","The central bank advises government about inflation, interest rates, monetary trends and economic policy using financial data.",["1:Identifies policy or economic advisory role","1:Names relevant evidence or advice such as inflation or financial stability","1:Explains usefulness in government decisions"]],
 [3,"c.ii","When solvent commercial banks face severe temporary liquidity shortages, the central bank may provide emergency loans to stabilise the financial system.",["1:Identifies central-bank emergency lending role","1:Explains why commercial banks may require last-resort liquidity","1:Explains stabilisation of financial system or conditions for such lending"]],
 [3,"d","A cheque transfers funds when a payee deposits it for collection. An electronic bank transfer moves balances between accounts without handing over notes or coins.",["3:First noncash transaction identified and stages of how funds transfer","3:Second different noncash transaction identified and accurate process"]],
 [4,"a","A market is any arrangement where buyers and sellers exchange, while marketing consists of researching, pricing, promoting and distributing products to meet customer needs.",["2:Correctly explains buyers-and-sellers interaction forming a market","2:Correctly explains marketing as coordinated customer-facing business activities"]],
 [4,"b","Businesses research markets to learn customer preferences, estimate demand, understand competitors and assess suitable product prices.",["1:First different valid purpose for market research","1:Second different purpose","1:Third different purpose","1:Fourth different purpose"]],
 [4,"c.i","A monopoly is a market with a single seller of a product lacking close substitutes, with substantial entry barriers.",["1:Identifies one dominant or sole seller","1:Explains limited competition, close substitutes or entry barriers"]],
 [4,"c.ii","In monopolistic competition, many sellers offer similar but differentiated products and there is relatively free entry or exit.",["2:Explains many competing sellers or generally accessible market entry","2:Explains product differentiation, limited pricing power or competition through branding"]],
 [4,"d.i","Locally, poor road infrastructure or congestion can delay deliveries and spoil perishable goods, raising transport costs.",["1:Identifies an actual local distribution problem","1:Explains how the problem affects delivery time, condition or cost","1:Connects to business or consumer consequence"]],
 [4,"d.ii","Internationally, customs clearance delays or port disruption can hold up shipments and increase import costs.",["1:Identifies a genuine international distribution barrier","1:Explains mechanism such as border checks or shipping delay","1:Connects to higher costs, stock shortages or lost sales"]],
 [5,"a.i","Banks provide overdrafts allowing temporary account deficits and fixed-term loans repaid with interest.",["1:First correct form of bank-provided credit","1:Second different valid form"]],
 [5,"a.ii","An overdraft lets approved customers withdraw beyond the available current-account balance up to a limit, paying interest and fees. A loan provides a stated sum, repaid in instalments with interest.",["3:First credit method from a.i explained with process and terms","3:Second DIFFERENT method from a.i explained accurately"]],
 [5,"b","Trade documents record quantities, prices and ownership terms while supporting customs clearance and payment security.",["1:First genuine function of trade documents","1:Second different documentary purpose"]],
 [5,"c","A credit note records a seller's reduction of a customer's account balance, often for returned goods. A debit note records an amount charged or a requested adjustment increasing the relevant balance, depending on the transaction.",["2:Credit note accurately explained and correctly placed in an accounting context","2:Debit note accurately contrasted, including sender/recipient context; do not assume all debit notes mean the same effect without context"]],
 [5,"d","A pro forma invoice supplies an advance quote so a buyer can arrange funds or obtain import approval. It also confirms proposed price, quantity and shipping terms before a binding final commercial invoice is issued.",["3:First distinct use of pro forma invoice with trading explanation","3:Second different use with explanation"]],
 [6,"a","Government regulates business by setting and enforcing rules, for example product-safety standards and labour-protection legislation.",["1:Identifies role of setting enforceable rules for business","2:First proper example of actual business regulation and its effect","2:Second different regulation example and its effect"]],
 [6,"b","Taxes finance public schools, hospitals and roads; government also redistributes income through social benefits and changes spending/tax rates to influence economic activity.",["3:First valid taxation purpose linked to concrete government expenditure or action","3:Second distinct purpose and credible government use","3:Third distinct purpose and credible government use"]],
 [6,"c.i","Food and drug standards set safety, hygiene and labelling requirements for food and medicine, reducing consumer exposure to harmful or misleading products.",["1:Accurately identifies the function of food and drug regulations","1:Explains consumer safety or information benefit","1:Develops effect such as reducing contaminated goods or enabling enforcement"]],
 [6,"c.ii","Hire purchase laws require clear finance terms and regulate buyers' rights and seller repossession practices, helping consumers avoid hidden costs or unfair treatment.",["1:Explains relevant safeguards on instalment purchase agreements","1:Relates rule to fair information or borrower rights","1:Explains practical consumer protection outcome"]],
 [7,"a.i","The income method totals payments for productive factors, including wages, rent, interest and profit, while avoiding double counting.",["1:Defines national income by summing factor earnings","1:Gives valid income components or notes avoidance of double counting"]],
 [7,"a.ii","The expenditure method totals spending on final domestic output, typically consumption, investment, government purchases and net exports.",["1:Defines total final goods/services expenditure","1:Accurately names C+I+G+(X-M) or explains final spending components"]],
 [7,"a.iii","The output or value-added method sums production value added across industries, avoiding counting the same intermediate production twice.",["1:Describes value added by different producers","1:Explains summing industry value added or avoiding intermediate-input double count"]],
 [7,"b.i","The Caribbean Development Bank finances development projects and offers technical assistance to improve regional economic and social outcomes.",["1:Identifies CDB's regional development role","1:Provides a valid function such as loans or technical support"]],
 [7,"b.ii","The World Bank provides long-term development finance and advice for investment in infrastructure, education and poverty reduction.",["1:Identifies international development institution","1:Correctly states financing or technical support role"]],
 [7,"b.iii","The IMF supports international monetary stability by offering policy advice and conditional financial assistance to states facing balance-of-payments pressures.",["1:Correctly describes IMF monetary or financial stability remit","1:States valid role such as lending for external payment problems or surveillance"]],
 [7,"c","The Caribbean Single Market and Economy seeks closer regional economic integration, facilitating trade and approved movement of factors such as skilled labour and capital.",["1:Correctly expands Caribbean Single Market and Economy","1:Explains purpose of integrating participating CARICOM economies"]],
 [7,"d","The CSME expands the accessible regional market for Caribbean firms and supports qualifying workers and investment to move across participating economies, raising efficiency and opportunity.",["3:First developed economic-development mechanism from CSME","3:Second distinct developed mechanism with realistic consequence"]],
]);
export const POB_2011_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2011-MJ",paper:2,year:2011,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2011_MJ.pdf",
 sourceSha256:"d057339896f60e8f5d98fd25d3cd9cc82cb082e127509b73a109ed87cbb6c7b7",
 sourcePages:4,offeredQuestionCount:7,questionsToAnswer:5,maximumMarks:100,
 origin:"SPARK-authored-answer-bank-not-CXC-examiner-mark-scheme",
 officialSchemePresent:false,fullTranscriptionReviewed:false,
 semanticBenchmarkCalibrated:false,liveScoringApproved:false,
 questions:Object.freeze([1,2,3,4,5,6,7].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(ROWS.filter(row=>row[0]===number).map(([,id,modelAnswer,criteria])=>
   Object.freeze({
    id,modelAnswer,marks:criteria.reduce((sum,c)=>sum+Number(c.split(":")[0]),0),
    criteria:Object.freeze(criteria.map(s=>{
     const idx=s.indexOf(":");
     return Object.freeze({
      marks:Number(s.slice(0,idx)),rule:s.slice(idx+1),
      authoredBySpark:true,sourceSchemeVerified:false
     });
    }))
   }))
  )
 })))
});
export function verifyPob2011MjP2AuthoredScheme(paper=POB_2011_MJ_P2_AUTHORED_SCHEME){
 const issues=[],seen=new Set();let offered=0,partCount=0;
 if(paper.id!=="POB-P2-2011-MJ"||paper.sourceSha256!=="d057339896f60e8f5d98fd25d3cd9cc82cb082e127509b73a109ed87cbb6c7b7")
  issues.push("Incorrect approved 2011 source.");
 if(!Array.isArray(paper.questions)||paper.questions.length!==7)
  issues.push("Missing offered question.");
 for(const q of paper.questions||[]){
  if(seen.has(q.number))issues.push("Duplicate number.");seen.add(q.number);
  let marks=0;
  for(const p of q.parts||[]){
   partCount++;marks+=p.marks;
   if(!p.modelAnswer||p.modelAnswer.length<35)issues.push("Missing model answer.");
   if(!p.criteria?.length||p.criteria.reduce((sum,c)=>sum+c.marks,0)!==p.marks)
    issues.push("Missing or inconsistent rubric.");
   if(p.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false))
    issues.push("Unverified scheme claimed official.");
  }
  if(marks!==20)issues.push("Offered question not worth 20.");
  offered+=marks;
 }
 if(offered!==140||paper.maximumMarks!==100)issues.push("Wrong optional question arithmetic.");
 if(paper.liveScoringApproved!==false||paper.officialSchemePresent!==false)
  issues.push("Uncalibrated authored scheme improperly released.");
 return {valid:issues.length===0,issues,offeredMarks:offered,parts:partCount};
}
