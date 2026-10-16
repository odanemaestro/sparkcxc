// SPARK-authored structured questions for CSEC Principles of Business.
// This is an ORIGINAL practice set: not an official CXC past paper or its answer key.
// Human-readable award criteria support a future subject-aware marking implementation.
const part=(id,prompt,marks,criteria,modelAnswer,profile="application")=>({
  id,prompt,marks,criteria:criteria.map(([marks,rule,alternatives=[]])=>({marks,rule,alternatives})),modelAnswer,profile
});
const question=(number,title,sections,context,items)=>({
  id:"POB-SPARK-P2-ORIGINAL-01-Q"+number,number,title,sections,context,items,
  marks:items.reduce((sum,item)=>sum+item.marks,0),
  origin:"spark-original",markSchemeVersion:"v1-reviewed-pending-subject-calibration"
});
export const POB_PAPER2_ORIGINAL_01 = Object.freeze({
  id:"pob-original-paper2-01",title:"SPARK Original Principles of Business Paper 2",
  origin:"spark-original",timeLimitMinutes:120,marks:100,questionCount:5,compulsory:true,
  description:"Five compulsory structured questions, 20 marks each, matching the modern 2019-onwards syllabus.",
  questions:[
    question(1,"Choosing a Business Structure",[1,3],
      "Three friends in St Catherine plan to produce and sell bottled sauces. They must choose an ownership structure, source finance and sell to local supermarkets.",[
      part("a","Define the term entrepreneur.",2,[[2,"A person who identifies an opportunity, organises resources and accepts business risks.",["business organiser taking risk","person starting and operating a business"]]],"An entrepreneur organises production and bears risk.", "knowledge"),
      part("b","State THREE factors the friends should investigate before starting the business.",3,[[1,"Evidence of likely demand and competition."],[1,"Realistic costs and access to finance."],[1,"Health, registration, supplier or legal requirements."]],"They should study demand, start-up costs and the regulatory requirements.", "knowledge"),
      part("c","Explain TWO benefits and TWO limitations of operating as a partnership.",4,[[1,"Pooling finance and skills."],[1,"Sharing work, responsibilities and decisions."],[1,"Potential disagreement or slower decisions."],[1,"Possible personal liability or difficult ownership continuity, depending on legal form."]],"Partners can pool money and expertise, but decisions may cause disputes and liability must be understood."),
      part("d","Explain TWO reasons for preparing a business plan before applying for finance.",4,[[2,"A plan estimates demand and operating costs and shows whether the idea could be viable."],[2,"A plan sets out the team, repayment approach and risks for lenders or investors."]],"A plan helps the owners assess cash requirements and presents evidence to prospective lenders."),
      part("e","Recommend an ownership structure and justify your recommendation using THREE relevant factors.",7,[[1,"Names a legally plausible business structure."],[2,"Explains liability and ownership implications."],[2,"Explains the effect on access to finance or management."],[2,"Connects the choice to this sauce business's scale, partners and expansion plans."]],"A registered company may suit a growing venture seeking separation of personal and business obligations, but a partnership may be cheaper initially. Credit any well-justified alternative.")
    ]),
    question(2,"Managing Contracts and People",[2,4],
      "A small Caribbean events company agrees to provide catering and decorations for a wedding. A new manager causes confusion about responsibilities, and the supplier delivers late.",[
      part("a","State TWO functions of management.",2,[[1,"Any one valid management function: planning, organising, leading or controlling."],[1,"A second distinct valid management function."]],"Planning and organising are two management functions.", "knowledge"),
      part("b","Describe THREE pieces of information that should appear on a purchase order.",3,[[1,"Names and contact details of the parties."],[1,"Quantity and description of goods or services."],[1,"Agreed prices, reference details or delivery terms."]],"The order should identify parties, goods and prices and delivery instructions."),
      part("c","Explain TWO likely sources of conflict at the company and propose a response to each.",4,[[1,"Identifies unclear duties or conflicting instructions."],[1,"Offers role descriptions or a meeting to clarify responsibilities."],[1,"Identifies an additional genuine conflict cause, such as unfair workload."],[1,"Offers a fair resolution, such as negotiation or a grievance procedure."]],"Clear communication and fair conflict resolution can restore teamwork."),
      part("d","Explain how offer, acceptance and consideration could be shown by the catering agreement.",5,[[2,"Identifies an offer containing an agreed service, price and date."],[1,"Shows clear acceptance of the offer."],[2,"Identifies exchanged value, such as the agreed payment for catering services."]],"A priced catering quotation accepted by the customer may establish an enforceable agreement, provided other requirements are met."),
      part("e","Recommend THREE actions the business should take after the late delivery and explain why each helps.",6,[[2,"Communicate promptly with the customer and supplier and discuss an appropriate lawful remedy."],[2,"Review the delivery terms, evidence and documentation to establish obligations."],[2,"Create clearer schedules, supplier checks or backup arrangements to prevent recurrence."]],"The company should address the customer, document the breach and improve supplier controls.")
    ]),
    question(3,"Production and Marketing",[5,6],
      "A Jamaican fruit drink company makes 300 bottles in 10 labour hours. It sells a bottle for J$250 and pays J$130 in variable costs per bottle. It wants to grow.",[
      part("a","Define labour productivity and calculate bottles produced per labour hour.",3,[[1,"Defines labour productivity as output per unit of labour input."],[1,"Correctly divides 300 by 10."],[1,"States 30 bottles per labour hour with correct unit."]],"300 ÷ 10 = 30 bottles per labour hour."),
      part("b","Name TWO elements of the marketing mix other than price.",2,[[1,"Any one valid element other than price: product, place or promotion."],[1,"A second distinct valid element other than price."]],"Product and promotion are two elements of the four Ps.", "knowledge"),
      part("c","Calculate the contribution per bottle and explain its importance.",4,[[1,"Correctly identifies selling price as J$250."],[1,"Correctly identifies variable cost as J$130."],[1,"Calculates J$120 per bottle."],[1,"Explains contribution helps meet fixed costs before profit."]],"Contribution per bottle = J$250 - J$130 = J$120."),
      part("d","Explain TWO advantages and TWO possible problems associated with expanding production.",4,[[1,"An advantage such as spreading fixed costs or serving more customers."],[1,"A second distinct advantage such as better purchasing power."],[1,"A risk such as quality problems, cash shortages or extra management."],[1,"A second distinct risk connected to growth."]],"Growth may create economies of scale but can strain cash flow and quality."),
      part("e","Recommend a realistic marketing approach for the drink and justify THREE aspects of it.",7,[[1,"Defines a relevant target market."],[2,"Explains a suitable product or packaging decision."],[2,"Explains pricing based on costs and customer value."],[2,"Justifies suitable placement and truthful promotion methods."]],"For example, target commuters with clearly labelled convenient bottles, fair prices, safe retail placement and sample promotions.")
    ]),
    question(4,"Moving Goods Through the Caribbean",[6,7],
      "A distributor supplies chilled dairy products from a manufacturing plant to three islands. A storm delays shipping, and some retailers report damaged goods.",[
      part("a","Define the term logistics.",2,[[2,"Planning, controlling and coordinating movement or storage of goods and related information."]],"Logistics manages transport, handling, storage and delivery.","knowledge"),
      part("b","Name THREE documents or records relevant to the transport or delivery of these goods.",3,[[1,"One relevant transport or delivery document."],[1,"A second different relevant transport or delivery document."],[1,"A third different relevant transport or delivery document."]],"The distributor should use correct shipping and delivery paperwork.","knowledge"),
      part("c","Explain TWO ways unreliable transport can harm the distributor.",4,[[2,"Delays reduce product availability and may cause dissatisfied or lost customers."],[2,"Spoilage or damage increases waste, costs and potential claims."]],"Delayed or unsafe delivery affects sales, stock and reputation."),
      part("d","Explain THREE measures that could reduce future supply-chain risks.",5,[[2,"Backup supplier or route plans with clear responsibilities."],[2,"Suitable temperature monitoring, packaging and cold-chain equipment."],[1,"Realistic forecasting, stock records or delivery tracking."]],"Maintain a cold chain, prepare contingency routes and track perishable shipments."),
      part("e","Evaluate the importance of information technology to this firm's supply chain.",6,[[2,"Explains GPS and digital records for location and delivery tracking."],[2,"Explains inventory and temperature monitoring for avoiding shortages and spoilage."],[2,"Evaluates an implementation risk such as cost, security, connectivity or training."]],"ICT can improve visibility and customer service, but it needs reliable systems and proper controls.")
    ]),
    question(5,"Finance, Government and Technology",[8,9,10],
      "A small Jamaican manufacturer earns J$850,000 in revenue. Cost of sales is J$470,000 and operating expenses are J$260,000. It is considering export sales and a new computerised stock system.",[
      part("a","Calculate the business's gross profit.",3,[[1,"Identifies revenue J$850,000."],[1,"Identifies cost of sales J$470,000."],[1,"Subtracts correctly to obtain J$380,000."]],"Gross profit = J$850,000 - J$470,000 = J$380,000."),
      part("b","Calculate the simplified net profit after the stated operating expenses.",3,[[1,"Starts with gross profit J$380,000."],[1,"Deducts operating expenses J$260,000."],[1,"Obtains J$120,000 and labels it correctly."]],"Net profit = J$380,000 - J$260,000 = J$120,000."),
      part("c","Distinguish between saving and investment and give ONE business-related example of each.",4,[[1,"Saving prioritises holding funds for future use."],[1,"Investment uses funds to purchase an asset or opportunity for expected returns."],[1,"Example of liquid business savings."],[1,"Example of a productive investment such as new equipment."]],"Keeping an emergency bank balance is saving; buying production equipment is an investment."),
      part("d","Explain TWO economic reasons government might support this business's export plans.",4,[[2,"Exports can bring foreign-exchange earnings to the economy."],[2,"Business development can support local jobs, taxes, production or diversified markets."]],"Export growth may generate foreign exchange and additional economic opportunities."),
      part("e","Evaluate TWO likely benefits and ONE possible risk of computerising inventory records.",6,[[2,"More accurate or faster stock monitoring and reordering."],[2,"Better tracking can reduce stockouts or waste and support decisions."],[2,"Discusses a meaningful risk and control, such as data loss with backups or costs and training."]],"A stock system can improve efficiency but must have backups, data protection and trained users.")
    ])
  ]
});
export function validatePobPaper2(paper=POB_PAPER2_ORIGINAL_01){
 const issues=[];
 if(!paper||!Array.isArray(paper.questions))return {valid:false,issues:["Missing Paper 2 question list."]};
 if(paper.questions.length!==5)issues.push("Five compulsory questions are required.");
 if(paper.marks!==100)issues.push("Paper 2 must total 100 marks.");
 if(paper.timeLimitMinutes!==120)issues.push("Paper 2 must have a 120-minute time limit.");
 const ids=new Set();
 for(const [index,question] of paper.questions.entries()){
   if(!question||!Array.isArray(question.items)){issues.push("Question "+(index+1)+" has no valid parts.");continue;}
   if(!question.id||ids.has(question.id))issues.push("Question "+(index+1)+" has a missing or duplicate ID.");
   ids.add(question.id);
   if(question.number!==index+1)issues.push("Question numbering is not sequential at "+(index+1)+".");
   if(question.marks!==20)issues.push(question.id+" must total 20 marks.");
   const sum=question.items.reduce((n,p)=>n+(Number(p?.marks)||0),0);
   if(sum!==20)issues.push(question.id+" items must total 20 marks.");
   if(!String(question.context||"").trim())issues.push(question.id+" requires a business scenario.");
   const partIds=new Set();
   for(const item of question.items){
     if(!item){issues.push(question.id+" has a missing part.");continue;}
     if(!item.id||partIds.has(item.id))issues.push(question.id+" has a duplicate or missing part ID.");
     partIds.add(item.id);
     if(!String(item.prompt||"").trim()||!String(item.modelAnswer||"").trim())
       issues.push(question.id+"-"+item.id+" needs both question wording and a model answer.");
     if(!Number.isInteger(item.marks)||item.marks<=0)
       issues.push(question.id+"-"+item.id+" has invalid available marks.");
     if(!Array.isArray(item.criteria)||!item.criteria.length){
       issues.push(question.id+"-"+item.id+" needs marking criteria.");continue;
     }
     if(item.criteria.some(c=>!Number.isInteger(c?.marks)||c.marks<=0||!String(c.rule||"").trim()))
       issues.push(question.id+"-"+item.id+" has a malformed marking criterion.");
     if(item.criteria.reduce((n,c)=>n+(Number(c?.marks)||0),0)!==item.marks)
       issues.push(question.id+"-"+item.id+" rubric does not total its marks.");
   }
 }
 return {valid:issues.length===0,issues};
}
