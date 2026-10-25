/**
 * SPARK-authored worked examples for its ORIGINAL POB Paper 2.
 * Each answer addresses every allocated source rubric point. The old short
 * feedback descriptions are NOT complete responses and cannot prove full marks.
 * These are not official CXC answers and do not calibrate paraphrases.
 */
export const POB_ORIGINAL_FULL_EVIDENCE = Object.freeze({
 "Q1:a": "An entrepreneur identifies a business opportunity, organises people and other resources to produce goods or services and takes the financial risks of the business.",
 "Q1:b": "Investigate customer demand and competing sauce businesses. Estimate start-up and running costs and identify available finance. Check food-handling permits, business registration requirements and reliable suppliers.",
 "Q1:c": "A partnership pools money and skills so the friends can finance operations and benefit from one another's expertise. Partners can share workloads and management responsibilities. Disagreements can delay decisions. Partners also need to consider possible personal liability for debts and how a partner leaving would affect continuity.",
 "Q1:d": "A business plan estimates likely demand, start-up costs and operating expenses to test whether the sauce venture is financially viable. The plan also explains the owners' experience, projected cash flow, loan repayments and risks so a lender can judge whether the loan is realistic.",
 "Q1:e": "I recommend registering a limited company for a sauce business with plans to supply supermarkets. Limited liability normally separates shareholder obligations from company debts, unlike the risk of personal liability in an ordinary partnership. A company can raise additional share capital and borrow for equipment, although company administration costs more. The three founders can agree their share ownership, appoint directors and plan to expand supply to more shops.",
 "Q2:a": "Planning sets organisational objectives and the actions needed to achieve them. Organising allocates people, tasks and resources to carry out the plan.",
 "Q2:b": "The purchase order must identify the buyer and seller and their contact details. It must state the quantities and descriptions of the catering goods or services. It must include agreed prices and the date and place for delivery.",
 "Q2:c": "Unclear responsibilities may cause the new manager to give conflicting instructions, so the team should meet and agree written job duties. An unfair workload can create further conflict among staff, so the manager should hear both sides and negotiate a fair allocation of work.",
 "Q2:d": "An offer exists when the caterer offers specified food and decorations for an agreed price and wedding date. Acceptance occurs when the customer clearly agrees to those terms. Consideration is the exchange of the catering and decoration services for the customer's agreed payment.",
 "Q2:e": "First, contact the wedding customer promptly, explain the delay and agree a suitable lawful replacement or remedy to protect the relationship. Second, review the contract, delivery terms, correspondence and supplier records to document the breach and establish the parties' obligations. Third, introduce clear delivery schedules, supplier performance checks and backup suppliers to reduce future delays.",
 "Q3:a": "Labour productivity measures output produced per unit of labour input, such as bottles made per labour hour. The company produces 300 bottles in 10 labour hours, so 300 divided by 10 equals 30 bottles per labour hour.",
 "Q3:b": "Product, meaning the goods offered to customers, and promotion, meaning communication to encourage customers to buy, are two distinct marketing mix elements other than price.",
 "Q3:c": "The selling price is J$250 per bottle and the variable cost is J$130 per bottle. Contribution per bottle equals 250 minus 130, which gives J$120. The J$120 contributes towards fixed costs first and then profit.",
 "Q3:d": "Expansion can spread fixed operating costs across more bottles and may improve purchasing power through bulk discounts. Expansion also risks poorer quality if new workers lack training and can strain cash flow through greater stock and equipment costs.",
 "Q3:e": "Target commuters who want convenient fruit drinks. Offer hygienic, clearly labelled bottles in sizes that commuters can carry, which suits their daily journeys. Price the drinks above the J$130 variable cost while considering the J$250 selling price, fixed costs and competing drinks, so sales contribute to profit. Place the product in commuter shops and transport hubs and run truthful product sampling promotions to reach the target market.",
 "Q4:a": "Logistics involves planning, coordinating and controlling the movement, handling, storage and delivery of goods and relevant shipment information from suppliers to customers.",
 "Q4:b": "Use a bill of lading to record the sea shipment, a packing list to identify the chilled dairy items and quantities, and a delivery note that the receiving retailer signs to acknowledge delivery.",
 "Q4:c": "Shipping delays can leave retailers without chilled stock, causing missed sales and dissatisfied customers. Poor or unsafe transport may spoil or damage dairy products, resulting in wasted inventory, replacement costs and compensation claims.",
 "Q4:d": "Plan alternative suppliers and shipping routes, assigning responsibilities for storm disruption, so deliveries can be redirected. Use insulated packaging, refrigeration and temperature monitoring to protect the cold chain and prevent dairy spoilage. Keep accurate stock and delivery tracking records to forecast shortages and schedule replacement deliveries.",
 "Q4:e": "GPS and digital delivery records provide the current location of shipments and help retailers receive accurate arrival updates. Computerised inventory and temperature sensors detect low stock or unsafe temperatures and prevent waste and shortages. The distributor must also address unreliable internet, cybersecurity, system costs and staff training through secure backups, suitable connectivity and trained workers.",
 "Q5:a": "Gross profit is revenue minus cost of sales. Revenue is J$850,000 and cost of sales is J$470,000. Gross profit equals 850000 minus 470000, which is J$380,000.",
 "Q5:b": "Start with gross profit of J$380,000. Subtract operating expenses of J$260,000. Net profit equals 380000 minus 260000, which is J$120,000.",
 "Q5:c": "Saving means retaining money for future use, such as keeping an emergency cash reserve in the company's bank account. Investment means spending money on an asset or opportunity expected to generate returns, such as buying a new production machine to make more products.",
 "Q5:d": "Exports bring foreign-exchange earnings into Jamaica when overseas customers pay for locally produced goods. Expanding production for export can also create local employment, increase tax revenue and encourage Jamaican business growth.",
 "Q5:e": "Computerised records update stock quantities quickly and accurately, helping the business reorder on time. Better inventory tracking reduces stockouts and spoilage and supports purchasing decisions. The business also faces data loss, security threats and training costs, so management should make regular backups, restrict access and train employees."
});
export function completePobSourceAnswer(paperId,partId,response){
 if(paperId!=="pob-original-paper2-01"||typeof response!=="string")return false;
 const expected=POB_ORIGINAL_FULL_EVIDENCE[partId];
 if(!expected)return false;
 const normalize=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
 return normalize(expected)===normalize(response);
}

/** Authored, deliberately incomplete answers with source-specific submark credit.
 * Every unlisted/ambiguous response stays provisional. These are training cases,
 * not an assertion that all equivalent student phrasing has been captured.
 */
export const POB_ORIGINAL_PARTIAL_EVIDENCE = Object.freeze({
 "Q1:a": {answer:"An entrepreneur identifies opportunities and organises resources.",credit:[1]},
 "Q1:b": {answer:"Research customer demand and estimate startup costs.",credit:[1,1,0]},
 "Q1:c": {answer:"Partners pool capital and skills and share duties but might disagree about decisions.",credit:[1,1,1,0]},
 "Q1:d": {answer:"The business plan estimates demand and running costs to test commercial viability.",credit:[2,0]},
 "Q1:e": {answer:"I recommend a limited company because shareholders normally have limited liability and it can raise capital for expansion.",credit:[1,2,2,0]},
 "Q2:a": {answer:"Planning is a function of management.",credit:[1,0]},
 "Q2:b": {answer:"The order must name the buyer and seller and describe the goods and quantity.",credit:[1,1,0]},
 "Q2:c": {answer:"Unclear duties cause disputes, so hold a meeting and define each worker's responsibilities.",credit:[1,1,0,0]},
 "Q2:d": {answer:"The caterer offered decorations for a stated price and date and the customer accepted the quote.",credit:[2,1,0]},
 "Q2:e": {answer:"Contact the customer and arrange a lawful remedy; review supplier and delivery records to document the breach.",credit:[2,2,0]},
 "Q3:a": {answer:"Labour productivity is output per labour input. Divide 300 by 10.",credit:[1,1,0]},
 "Q3:b": {answer:"Product is an element of the marketing mix.",credit:[1,0]},
 "Q3:c": {answer:"The price is J$250 and variable cost is J$130, so contribution is J$120.",credit:[1,1,1,0]},
 "Q3:d": {answer:"Growth spreads fixed costs, but extra production may strain cash flow.",credit:[1,0,1,0]},
 "Q3:e": {answer:"Target commuters using convenient labelled bottles appropriate to their daily journeys.",credit:[1,2,0,0]},
 "Q4:a": {answer:"Logistics plans and coordinates the transport of goods.",credit:[1]},
 "Q4:b": {answer:"Use a bill of lading and a delivery note.",credit:[1,1,0]},
 "Q4:c": {answer:"Shipping delays reduce sales and leave customers dissatisfied.",credit:[2,0]},
 "Q4:d": {answer:"Plan backup delivery routes and monitor refrigerated storage temperatures.",credit:[2,2,0]},
 "Q4:e": {answer:"Use GPS for delivery tracking and digital inventory to prevent stockouts.",credit:[2,2,0]},
 "Q5:a": {answer:"Gross profit starts with J$850,000 of revenue less J$470,000 cost of sales.",credit:[1,1,0]},
 "Q5:b": {answer:"Gross profit is J$380,000 and operating expenses are J$260,000.",credit:[1,1,0]},
 "Q5:c": {answer:"Saving means retaining money for later use. Investment means using resources to earn returns.",credit:[1,1,0,0]},
 "Q5:d": {answer:"Exports earn foreign exchange for the Jamaican economy.",credit:[2,0]},
 "Q5:e": {answer:"Digital inventory improves stock monitoring and lowers the risk of stockouts.",credit:[2,2,0]}
});

const normaliseResponse=s=>String(s).toLowerCase().replace(/[’‘]/g,"'")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");

/** Resolve only exact, independently source-reviewed complete/partial/blank
 * examples. Otherwise no trusted mark is determined.
 */
export function calibratedPobOriginalResponse(paperId,partId,response,criteria){
 if(paperId!=="pob-original-paper2-01"||typeof response!=="string"||
    !Array.isArray(criteria)||!criteria.length)return null;
 const full=POB_ORIGINAL_FULL_EVIDENCE[partId];
 const partial=POB_ORIGINAL_PARTIAL_EVIDENCE[partId];
 const answer=normaliseResponse(response);
 if(!answer)return null;
 if(full && normaliseResponse(full)===answer)
  return {credit:criteria.map(c=>c.marks),kind:"full"};
 if(partial && normaliseResponse(partial.answer)===answer &&
    partial.credit.length===criteria.length &&
    partial.credit.every((marks,i)=>Number.isInteger(marks)&&marks>=0&&marks<=criteria[i].marks) &&
    partial.credit.reduce((n,m)=>n+m,0)>0 &&
    partial.credit.reduce((n,m)=>n+m,0)<criteria.reduce((n,c)=>n+c.marks,0))
  return {credit:partial.credit,kind:"partial"};
 // An explicit admission of having no answer is an unambiguous incorrect
 // response. An actual alternative substantive answer is never inferred wrong.
 if(new Set(["i do not know","i have no answer","no idea","i am not sure"]).has(answer))
  return {credit:criteria.map(()=>0),kind:"incorrect"};
 return null;
}
