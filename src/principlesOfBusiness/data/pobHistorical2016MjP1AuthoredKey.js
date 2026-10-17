// SPARK-authored response bank for the 2016 May/June scanned POB Paper 01.
// Source is EIGHT 100%-image-backed PDF pages, printed test 01240010,
// 60 four-option questions, 75-minute duration. Every question page (2-8)
// was read from the actual rendered source, not from an OCR guess.
// Critical Q47 has NO valid listed merchandise-trade balance (+$40m).
// All drafted responses remain uncalibrated; do not award live marks.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
export const POB_2016_MJ_P1_AUTHORED_KEY=Object.freeze({
 id:"POB-P1-2016-MJ",paper:1,year:2016,sitting:"MJ",
 sourceFilename:"CSEC_Principles_of_Business_P1_2016_MJ.pdf",
 sourceSha256:"26ef3d9eb2968abba44ab80738f7e5f421c213ac507fff54d0c60c76d6e025e7",
 sourcePages:8,printedTestCode:"01240010",durationMinutes:75,questionCount:60,
 scannedPagesReviewed:Object.freeze([1,2,3,4,5,6,7,8]),
 markingOrigin:"SPARK-internally-derived-not-CXC-key",
 originalCxcAnswerKeyAvailable:false,independentAnswerAdjudicationComplete:false,
 gradingCalibrationPassed:false,liveScoringApproved:false,
 entries:Object.freeze([
 Object.freeze({"number":1,"pdfPage":2,"proposedOption":"C","explanation":"Trade is commercial activity involving exchanges of goods and services, not immigration, share trading alone or collective bargaining.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":2,"pdfPage":2,"proposedOption":"B","explanation":"Commonwealth Caribbean systems are generally mixed economies, combining private enterprise and government services.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":3,"pdfPage":2,"proposedOption":"D","explanation":"An entrepreneur identifies new business opportunities, organises a venture and bears commercial risk.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":4,"pdfPage":2,"proposedOption":"D","explanation":"Company losses ultimately reduce shareholders' investment, with their liability ordinarily limited under incorporation rules.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":5,"pdfPage":2,"proposedOption":"C","explanation":"A command economy is characterised by government direction of central economic decisions.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":6,"pdfPage":2,"proposedOption":"D","explanation":"Delegating work or authority is chiefly an organising/directing function, not setting the goals of planning.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":7,"pdfPage":2,"proposedOption":"B","explanation":"Consulting employees through meetings before decisions is a democratic or participative leadership style.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":8,"pdfPage":2,"proposedOption":"A","explanation":"Selecting business objectives and procedures for achieving them is planning.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":9,"pdfPage":2,"proposedOption":"D","explanation":"Inspiring staff, delegating appropriately and making informed decisions are all positive leadership behaviours.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":10,"pdfPage":3,"proposedOption":"A","explanation":"Subsidised meals are fringe benefits over and above the employee's regular wage.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":11,"pdfPage":3,"proposedOption":"B","explanation":"Purchasing falls under procurement, while product presentation, advertising and distribution are marketing matters.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":12,"pdfPage":3,"proposedOption":"B","explanation":"A sole trader is most suited to an owner seeking direct and independent business control.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":13,"pdfPage":3,"proposedOption":"C","explanation":"Payment of National Insurance contributions is a statutory compliance obligation, making it a regulatory concern.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":14,"pdfPage":3,"proposedOption":"B","explanation":"Collateral gives the lender security that may be realised if the borrower defaults, subject to law and the loan agreement.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":15,"pdfPage":3,"proposedOption":"D","explanation":"Making a lawful and procedurally fair redundancy decision can be legitimate, whereas money laundering, tax evasion and deceptive marketing are unethical.","status":"academic-dispute","uncertainty":"retrenchment-and-employment-rights","sourceAnalysis":"Dismissal/retrenchment may be justified on performance grounds only when fair process and law are followed; otherwise the conduct itself may be unethical.","sourceVisualChecked":true}),
 Object.freeze({"number":16,"pdfPage":3,"proposedOption":"C","explanation":"Post-dated cheques bear an intended payment date in the future.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":17,"pdfPage":3,"proposedOption":"A","explanation":"Without consideration or genuine meeting of minds, a simple contract may fail to arise; writing is not universally required.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":18,"pdfPage":3,"proposedOption":"A","explanation":"Breach of agreed obligations can discharge a contract and create remedies such as damages.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":19,"pdfPage":3,"proposedOption":"B","explanation":"Public liability insurance protects a cinema against eligible injury claims by visitors.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":20,"pdfPage":4,"proposedOption":"A","explanation":"An open cheque may allow cash to be collected at a bank counter, subject to banking controls.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":21,"pdfPage":4,"proposedOption":"D","explanation":"Food processing transforms inputs into manufactured products, making it a manufacturing industry.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":22,"pdfPage":4,"proposedOption":"D","explanation":"Moving from Jamaica to the United States to live or work is external migration.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":23,"pdfPage":4,"proposedOption":"B","explanation":"A person departing Trinidad to settle in Barbados is an emigrant from Trinidad's perspective.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":24,"pdfPage":4,"proposedOption":"C","explanation":"Capital-intensive production relies heavily on machinery compared with workers.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":25,"pdfPage":4,"proposedOption":"D","explanation":"A production linkage exists when the output of one industry becomes the input of another.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":26,"pdfPage":4,"proposedOption":"A","explanation":"Expansion may increase capital and task specialisation without necessarily increasing output per worker.","status":"academic-dispute","uncertainty":"growth-does-not-prove-productivity","sourceAnalysis":"The listed organisational changes can all vary with growth; increasing productivity is not an automatic outcome.","sourceVisualChecked":true}),
 Object.freeze({"number":27,"pdfPage":4,"proposedOption":"A","explanation":"Cars are manufactured finished goods, unlike unprocessed mined gold or construction itself.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":28,"pdfPage":4,"proposedOption":"C","explanation":"A loss leader is offered at an unusually low price to attract shoppers.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":29,"pdfPage":5,"proposedOption":"A","explanation":"Trade discounts reward bulk purchasing or wholesale quantities rather than first-time visits.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":30,"pdfPage":5,"proposedOption":"C","explanation":"Shares are investment securities rather than payment terms for retail purchase; cash, credit and hire purchase are terms.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":31,"pdfPage":5,"proposedOption":"D","explanation":"Place of residence can affect buying, but the direct product-specific factors listed are price, quality and brand loyalty.","status":"academic-dispute","uncertainty":"consumer-place-of-residence","sourceAnalysis":"Where a consumer lives may strongly influence consumption; the question asks LEAST likely, not irrelevant.","sourceVisualChecked":true}),
 Object.freeze({"number":32,"pdfPage":5,"proposedOption":"A","explanation":"Unpaid favourable news coverage or editorial space is publicity, not paid advertising.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":33,"pdfPage":5,"proposedOption":"D","explanation":"A small supply available to many willing buyers tends to raise the market price.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":34,"pdfPage":5,"proposedOption":"C","explanation":"A territory with one electricity provider and no close competitor is a monopoly market.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":35,"pdfPage":5,"proposedOption":"B","explanation":"Share trading entails investment risks and possible returns or benefits.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":36,"pdfPage":5,"proposedOption":"D","explanation":"Holders of company shares may receive dividends if approved and declared.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":37,"pdfPage":5,"proposedOption":"C","explanation":"A standing order instructs a bank to make recurring fixed-amount payments.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":38,"pdfPage":5,"proposedOption":"A","explanation":"Central banks normally issue currency notes and coins or supervise national currency issuance.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":39,"pdfPage":6,"proposedOption":"C","explanation":"The intersection marked Z is the price-and-quantity equilibrium of supply and the original demand curve.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":40,"pdfPage":6,"proposedOption":"C","explanation":"At point Z the illustrated equilibrium price is four dollars.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":41,"pdfPage":6,"proposedOption":"B","explanation":"Price controls and subsidies can directly protect purchasers; customs duties mainly regulate imported trade.","status":"academic-dispute","uncertainty":"import-protection-versus-consumer-welfare","sourceAnalysis":"Custom duties can protect local consumer safety indirectly but usually raise prices, so price ceilings/subsidies are best.","sourceVisualChecked":true}),
 Object.freeze({"number":42,"pdfPage":6,"proposedOption":"A","explanation":"Lower taxes can raise disposable resources for households and businesses, stimulating spending or investment.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":43,"pdfPage":6,"proposedOption":"C","explanation":"Taxation does not normally dictate specific investment choices of state enterprises, unlike raising revenue and altering income/expenditure.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":44,"pdfPage":6,"proposedOption":"C","explanation":"Removing direct tax on low incomes can raise poor households' disposable income and material welfare.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":45,"pdfPage":6,"proposedOption":"D","explanation":"Progressive taxation and redistributive benefits can shift resources toward lower-income households.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":46,"pdfPage":7,"proposedOption":"B","explanation":"A proportional tax charges the same percentage of income at every income level.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":47,"pdfPage":7,"proposedOption":null,"explanation":"The printed table gives merchandise exports $160m and imports $120m, hence +$40m balance of goods trade, but no option provides +$40m. Option D is +$200m only if one incorrectly combines $300m-$140m of services with merchandise trade.","status":"academic-dispute","uncertainty":"balance-of-trade-no-valid-choice","sourceAnalysis":"The printed answer choices omit the true goods-trade surplus of +$40m and list +$200m from combining goods and services, which is not visible balance of trade.","sourceVisualChecked":true}),
 Object.freeze({"number":48,"pdfPage":7,"proposedOption":"C","explanation":"Depreciation is loss in capital stock value through wear, age or obsolescence.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":49,"pdfPage":7,"proposedOption":"D","explanation":"Credit and technical assistance for local firms can encourage production, enterprise growth and employment.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":50,"pdfPage":7,"proposedOption":"B","explanation":"Export licences help governments regulate the flow of goods exported.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":51,"pdfPage":7,"proposedOption":"D","explanation":"Import quotas limit the permissible quantity of specific foreign goods.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":52,"pdfPage":7,"proposedOption":"C","explanation":"An increase in population alone does not guarantee increased welfare per person.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":53,"pdfPage":8,"proposedOption":"C","explanation":"Customs duties are tariffs on imports; excise duty and consumption taxes may apply to domestic goods.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":54,"pdfPage":8,"proposedOption":"A","explanation":"Visible trade measures goods exports and goods imports, distinct from services.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":55,"pdfPage":8,"proposedOption":"D","explanation":"Economic dualism describes a modern technologically advanced sector alongside a less-developed traditional sector.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":56,"pdfPage":8,"proposedOption":"A","explanation":"CSME coordination can support a common trade policy within participating states.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":57,"pdfPage":8,"proposedOption":"B","explanation":"CARICOM promotes regional trade and shared services, though general state collaboration is also a genuine purpose.","status":"academic-dispute","uncertainty":"CARICOM-broad-vs-specific","sourceAnalysis":"General member collaboration is also a real CARICOM purpose, alongside the more specific regional trade and common services.","sourceVisualChecked":true}),
 Object.freeze({"number":58,"pdfPage":8,"proposedOption":"A","explanation":"The WTO operates a global framework for negotiating trade rules and settling trade disputes.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":59,"pdfPage":8,"proposedOption":"A","explanation":"Sole traders generally face fewer sources of new equity funding than larger partnerships or incorporated public firms.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 Object.freeze({"number":60,"pdfPage":8,"proposedOption":"B","explanation":"Domestic industrial development can replace some imported products and lower import spending.","status":"spark-authored-provisional","uncertainty":null,"sourceAnalysis":null,"sourceVisualChecked":true}),
 ])
});
export function verifyPob2016MjP1AuthoredKey(key=POB_2016_MJ_P1_AUTHORED_KEY){
 const issues=[],seen=new Set(),disputes=[];
 const src=POB_SUPPLIED_ARCHIVE.find(r=>r.id===key?.id);
 if(!src||src.paper!==1||key.sourceSha256!==src.sourceSha256||
   key.sourceFilename!==src.filename||key.printedTestCode!=="01240010")
  issues.push("2016 source original paper cover, type or digest mismatch.");
 if(!Array.isArray(key?.entries)||key.entries.length!==60)
  return {valid:false,issues:[...issues,"60 original questions required."],disputes};
 for(const item of key.entries){
  if(!Number.isInteger(item.number)||item.number<1||item.number>60||seen.has(item.number))
   issues.push("Question number repeated/out-of-range.");
  seen.add(item.number);
  if((item.proposedOption!==null&&!["A","B","C","D"].includes(item.proposedOption))||
    typeof item.explanation!=="string"||item.explanation.length<35)
   issues.push("Missing question explanation or invalid option Q"+item.number);
  if(!Number.isInteger(item.pdfPage)||item.pdfPage<2||item.pdfPage>8||
   item.sourceVisualChecked!==true)
   issues.push("No source-image proof of original Q"+item.number);
  if(item.status==="academic-dispute"){
   disputes.push(item.number);
   if(!item.uncertainty||!item.sourceAnalysis)
    issues.push("Dispute lacks description Q"+item.number);
  }else if(item.status!=="spark-authored-provisional"||item.proposedOption===null)
   issues.push("Answer not suitable for proposal Q"+item.number);
 }
 if(seen.size!==60)issues.push("Missing PDF original questions.");
 if(disputes.join(",")!=="15,26,31,41,47,57")
  issues.push("Unresolved 2016 academic issues were silently removed.");
 if(key.liveScoringApproved!==false||key.originalCxcAnswerKeyAvailable!==false||
  key.independentAnswerAdjudicationComplete!==false)
   issues.push("Source reading is not a license to release marks or claim official CXC authority.");
 return {valid:issues.length===0,issues,disputes};
}
