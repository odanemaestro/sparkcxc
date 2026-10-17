// Owner-supplied CSEC POB January 2026 original six-page scanned Paper 02.
// Original cover: 08 JANUARY 2026 (p.m.), TWO HOURS, ALL FIVE questions.
// All five printed question pages were visually read; all 32 original subparts,
// 100 marks, source page and individual partial-credit criteria have SPARK
// internally authored model answers. These are NOT official CXC schemes.
// A passing STRUCTURAL audit is NOT proof of grading calibration.
// Do not publish, score student attempts or call this a CXC examiner scheme.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {validatePobHistoricalP2Selection} from "./pobHistoricalScoringBatches";
const ROWS=Object.freeze([
 [1,"a","List three business careers.","Accountant, marketing manager and financial analyst are three suitable careers. Other acceptable careers include business analyst, entrepreneur, human-resource manager, banker, economist, auditor and procurement officer.",["1:Names one genuine career in business, not simply a business department","1:Names a different recognised business career","1:Names a third distinct business career"]],
 [1,"b","List three stakeholders involved in business activities.","Customers, employees and suppliers are three stakeholders; owners, lenders, shareholders, government and communities are also correct distinct examples.",["1:First genuine business stakeholder","1:Second distinct stakeholder","1:Third distinct stakeholder"]],
 [1,"c.i","Describe the production function of a business.","The production department combines inputs such as labour and materials to create goods or deliver services; it schedules operations and monitors product quality.",["1:Recognises conversion of inputs into goods or services","1:Describes a real operational function such as scheduling production or quality control"]],
 [1,"c.ii","Describe research and development (R&D).","Research and development tests and improves products, production methods and new ideas. It investigates consumer or technical needs and develops new or improved designs.",["1:Describes investigation or research into product/process needs","1:Describes developing or improving products, processes or technology"]],
 [1,"d","Define a code of ethics.","A code of ethics is a documented set of principles and standards that guides acceptable and responsible business decisions and employee conduct.",["1:Identifies formal written principles/standards","1:Explains purpose of guiding ethical workplace or business behaviour"]],
 [1,"e.i","State two legal or ethical business practices.","Employers should maintain legally safe working conditions and advertise products truthfully. Other valid distinct duties include honest tax reporting, non-discrimination, privacy protection, lawful disposal of waste and proper payment of workers.",["1:First actual legal or ethical practice expected of business owners","1:Second different valid practice"]],
 [1,"e.ii","Explain one negative effect of failing each practice stated in 1(e)(i).","Unsafe premises may injure a worker, causing lost working time, legal compensation and costly penalties. Misleading advertising may trick consumers, resulting in complaints and reputational damage, refunds or regulatory action. The two effects must correspond to the two practices actually stated in part (i).",["1:Connects FIRST practice from 1(e)(i) to specific non-compliance","1:Explains FIRST real adverse stakeholder/business effect","1:Develops credible consequence of FIRST effect","1:Connects SECOND DISTINCT practice from 1(e)(i) to non-compliance","1:Explains SECOND corresponding adverse effect","1:Develops actual legal, financial or reputational consequence of SECOND effect"]],
 [2,"a.i","Define collateral.","Collateral is an asset or property a borrower pledges to secure a loan, allowing the lender lawful recourse to the security if the borrower defaults.",["1:Identifies owned asset/property pledged","1:Connects security to borrowing and default protection"]],
 [2,"a.ii","List three examples of collateral.","Land or a building, an owned motor vehicle, and a savings deposit or acceptable shares/bonds can be pledged, subject to lender criteria.",["1:First realistic asset accepted by a lender as security","1:Second different collateral asset","1:Third distinct collateral asset"]],
 [2,"b","List three elements of a business plan.","Executive summary, marketing plan and financial plan are three common elements. Production/operations plan, organisational/staffing plan and business description also qualify.",["1:First actual section of a business plan","1:Second distinct section","1:Third distinct section"]],
 [2,"c.i","Outline two reasons Juan should conduct a feasibility study for a proposed fast-food business.","A market study estimates customer demand and competing restaurants to avoid launching where customers are insufficient. A cost and cash-flow assessment evaluates whether expected revenue covers ingredients, rent and staff costs, helping Juan avoid an unprofitable investment.",["1:Identifies first appropriate feasibility-study purpose","1:Outlines how FIRST consideration informs fast-food launch viability","1:Identifies SECOND distinct purpose such as financial or technical feasibility","1:Outlines how SECOND consideration reduces the risk of failed investment"]],
 [2,"c.ii","Identify one primary and one secondary information source for Juan.","Primary: Juan personally interviews potential customers or conducts his own questionnaire. Secondary: published population or household-spending statistics from a government statistical office, an industry report, or an existing business directory. Do not mark an existing report as first-hand primary data.",["1:Correct original first-hand primary information source","1:Correct already-published pre-existing secondary information source"]],
 [2,"d","Explain two location factors for Juan's fast-food business.","A location near schools, offices or a busy road gives access to target customers and enough footfall for sales. Affordable rent with reliable road access and nearby food suppliers limits delivery costs and allows ingredients to arrive fresh. Local competition, zoning, safety and parking are other defensible distinct factors when developed.",["1:Identifies first legitimate site-selection factor","1:Explains its practical relationship to customer demand or operating costs","1:Shows likely business outcome for Juan","1:Identifies SECOND independent site-selection factor","1:Explains how it affects fast-food operation, access or demand","1:Connects SECOND factor to costs, quality or revenue"]],
 [3,"a.i","Identify two factors of production.","Land/natural resources and labour are two factors. Capital and enterprise/entrepreneurship are equally acceptable distinct alternatives.",["1:First genuine factor of production","1:Second distinct factor"]],
 [3,"a.ii","Identify two major Caribbean natural resources.","Bauxite and petroleum/natural gas are important Caribbean resources. Limestone, forests, fish and agricultural land are also acceptable.",["1:First plausible natural resource found in the Caribbean","1:Second distinct regional natural resource"]],
 [3,"a.iii","Name one industry arising from each resource in 3(a)(ii).","Bauxite supports mining and alumina refining; petroleum supports oil extraction and refining. For different named resources, credit correctly linked industries, such as limestone to cement, forest to lumber, fish to fisheries or processing, and fertile land to farming.",["1:Industry correctly linked to FIRST resource actually supplied in 3(a)(ii)","1:Different or appropriately matched industry for SECOND resource named in 3(a)(ii)"]],
 [3,"b.i","Define subsistence-level production and give an example.","Subsistence production makes just enough for a producer or household's own needs, rather than primarily for sale. Example: growing vegetables in a home garden to feed one's family.",["1:Defines own household basic-needs production","1:Gives realistic own-consumption example matched to the definition"]],
 [3,"b.ii","Define domestic-consumption level of production and give an example.","Domestic consumption means producing goods and services for use or sale within the home country rather than export. Example: a local bakery supplying bread to nearby supermarkets and households.",["1:Correct level for goods produced for the domestic national market","1:Valid example supplying customers within the producing country"]],
 [3,"c","Differentiate production from productivity.","Production is the total output of goods/services in a specified period, such as 1,000 blocks per day. Productivity measures that output relative to inputs, such as 10 blocks per worker-hour; total output can rise while efficiency declines if inputs grow faster.",["1:Correct total output concept for production","1:Demonstrates aggregate level or production example","1:Correct output-per-unit-of-input concept for productivity","1:Explains or demonstrates the distinction with an efficiency ratio or comparison"]],
 [3,"d","Explain two factors causing a shortage of construction workers in Cocoa Island during a building boom.","A rapid surge in construction projects raises demand for masons, carpenters and electricians faster than the available trained workforce can grow, causing vacancies. Skilled tradespeople may emigrate for higher pay or more secure jobs overseas, reducing the local supply of experienced workers. Insufficient apprenticeships or poor conditions are other valid independent mechanisms.",["1:Identifies first real labour-supply/demand shortage mechanism","1:Explains why it affects construction workers in the boom scenario","1:Develops consequence for available trained-worker supply or unfilled demand","1:Identifies second DISTINCT cause such as migration, training or working conditions","1:Explains how second cause limits recruitment/retention in construction","1:Connects second cause to continued building-labour shortage"]],
 [4,"a.i","Define marketing.","Marketing identifies consumer needs and develops, prices, promotes and distributes products to satisfy those needs while meeting organisational goals.",["1:Identifying/anticipating customer wants and needs","1:Process of satisfying those needs through product, price, promotion or distribution"]],
 [4,"a.ii","List four elements of the traditional marketing mix.","Product, price, place (distribution) and promotion are the four traditional Ps.",["1:Product","1:Price","1:Place/distribution","1:Promotion"]],
 [4,"b.i","Describe branding.","Branding creates a distinctive identity for a product or company, often through names, logos and design, so buyers recognise the offering and distinguish it from competitors.",["1:Establishing recognisable identity for a good/business","1:Explains differentiation or brand recognition/customer trust"]],
 [4,"b.ii","Identify two branding components other than colour.","Brand name and logo/symbol are components other than colour. Typography, slogan/tagline and identifiable packaging design are also acceptable distinct options.",["1:First valid recognisable brand component excluding colour","1:Second different brand component excluding colour"]],
 [4,"c.i","Outline two factors when choosing packaging for a fruit-based non-dairy ice cream.","The tub must be freezer-safe and food-grade, with a tight seal to protect the ice cream from contamination and temperature damage. Packaging size and unit cost should match consumer demand and the firm's price, and clear dairy-free ingredient/allergen labelling can support safe purchases.",["1:First relevant ice-cream packaging consideration","1:Explains direct effect on protection, safety, freshness or handling","1:Second DISTINCT consideration such as cost, convenience, environment, size or labelling","1:Outlines how second factor suits the non-dairy frozen dessert and target customers"]],
 [4,"c.ii","Explain two factors influencing consumers' response to the new ice cream.","Taste and perceived quality influence repeat purchase: attractive flavours and texture encourage trial and loyalty, but a poor taste reduces sales. Price and affordability relative to competing frozen desserts affect willingness to buy; shoppers may choose the new product when its value seems attractive. Diet, lactose intolerance, vegan preferences and promotion may also be valid independent explanations.",["1:Identifies first real product or consumer-response influence","1:Explains its particular effect on new fruit-based non-dairy ice cream","1:Develops logical effect on trial, repeat demand or substitution","1:Identifies second DISTINCT factor such as price, diet, health, culture or promotion","1:Explains second influence with appropriate customer reasoning","1:Develops its independent effect on sales or willingness to buy"]],
 [5,"a.i","Define business technology.","Business technology is the application of digital tools, equipment, software or technical systems to perform business activities and improve efficiency, communication or service delivery.",["1:Identifies tools/systems or technological processes used by a firm","1:Links their application to actual business operations or service"]],
 [5,"a.ii","Name two technologies and state how each has affected commercial-bank services.","Automated teller machines (ATMs) use electronic self-service terminals to give customers cash and balance access beyond staffed counters. Mobile/internet banking apps let customers check balances, transfer funds and pay bills remotely at any hour. Debit cards, secure core-banking systems and electronic fund transfers are other appropriate distinct technology–benefit pairs.",["1:Names first genuine banking technology/form","1:Describes a specific way FIRST technology changed a commercial bank's customer service","1:Names second DISTINCT banking technology/form","1:Describes a service improvement directly arising from SECOND technology"]],
 [5,"b","List four business productivity tools or specialist ICT applications.","Word-processing software, spreadsheet software, database software and accounting applications are four examples. Also credit distinct presentation software, customer relationship management (CRM), point-of-sale software, enterprise resource planning (ERP), CAD, inventory-management tools and design software.",["1:First valid business productivity tool or specialist ICT application","1:Second distinct tool/application","1:Third distinct tool/application","1:Fourth distinct tool/application"]],
 [5,"c.i","Define e-commerce.","E-commerce is the buying, selling and payment for goods or services using electronic networks, especially websites and mobile applications over the internet.",["1:Identifies online/electronic commercial transactions","1:Describes buying/selling goods or services via electronic networks"]],
 [5,"c.ii","Define e-business.","E-business uses digital networks and technology throughout business operations, such as procurement, customer service, inventory, internal communication and online selling; e-commerce is one part of the broader concept.",["1:Use of information/communications technology to run enterprise activities","1:Recognises wider operations beyond only electronic purchase and sale"]],
 [5,"d","Explain one advantage and one disadvantage of online shopping for Caribbean consumers or economies.","Online shopping expands choice and lets Caribbean consumers compare prices and order goods from home, saving travel time and reaching products unavailable locally. A drawback is extra overseas shipping, import taxes and delivery delays, which may eliminate the advertised price advantage; online fraud and data misuse, or pressure on local shops and jobs, are also relevant distinct disadvantages when properly explained.",["1:Identifies one genuine advantage for a Caribbean consumer or economy","1:Explains how shopping online creates the advantage","1:Develops actual consumer or Caribbean business/economic outcome","1:Identifies one genuine disadvantage, not simply a restatement of advantage","1:Explains how the drawback affects online buyers or local enterprise","1:Develops plausible financial, logistical, security or employment consequence"]],
]);
export const POB_2026_JAN_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2026-JAN",paper:2,year:2026,sitting:"JAN",
 originalPrintedExamDate:"2026-01-08",printedTestCode:null,printedTestCodeVisuallyPresent:false,
 sourceFilename:"CSEC_Principles_of_Business_P2_2026_JAN.pdf",
 sourceSha256:"0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581",
 sourcePages:6,originalPdfPagesReviewed:Object.freeze([1,2,3,4,5,6]),
 originalPdfTextLayerPresent:false,sourceQuestionsVisuallyReviewed:true,
 questionSetCompleteness:"five-compulsory",
 timeLimitMinutes:120,questionsToAnswer:5,questionsOffered:5,
 maximumCandidateMarks:100,marksOffered:100,
 origin:"SPARK-internally-authored-not-published-CXC",
 publishedCxcExaminerSchemeSupplied:false,
 independentSourceOptionVerificationComplete:false,
 semanticScoringCalibrated:false,liveScoringApproved:false,
 questions:Object.freeze([1,2,3,4,5].map(number=>Object.freeze({
  number,marks:20,
  parts:Object.freeze(ROWS.filter(r=>r[0]===number).map(([,id,sourceQuestion,modelAnswer,rawRules])=>Object.freeze({
   id,sourceQuestion,sourcePdfPage:number+1,
   originalQuestionVisualRead:true,modelAnswer,
   marks:rawRules.reduce((sum,t)=>sum+Number(t.slice(0,t.indexOf(":"))),0),
   criteria:Object.freeze(rawRules.map(s=>{
    const at=s.indexOf(":");
    return Object.freeze({marks:Number(s.slice(0,at)),rule:s.slice(at+1),
     acceptedEquivalentIdeas:true,sourceSchemeVerified:false,authoredBySpark:true});
   }))
  })))
 })))
});
export function verifyPob2026JanP2AuthoredScheme(paper=POB_2026_JAN_P2_AUTHORED_SCHEME){
 const issues=[],seen=new Set();let offered=0,parts=0,criterionMarks=0;
 const trusted=POB_SUPPLIED_ARCHIVE.find(p=>p.id==="POB-P2-2026-JAN");
 if(!trusted||paper?.id!==trusted.id||trusted.paper!==2||
    paper.sourceSha256!==trusted.sourceSha256||paper.sourceFilename!==trusted.filename||
    paper.sourcePages!==trusted.pages)
  issues.push("The six-page original source identity or SHA-256 has changed.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==5)
  issues.push("All five compulsory questions required.");
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>5||seen.has(q.number))
   issues.push("Duplicate or absent original question number.");
  seen.add(q.number);
  const ids=new Set();let marks=0;
  for(const p of q.parts||[]){
   parts++;marks+=p.marks;
   if(typeof p.id!=="string"||!p.id||ids.has(p.id))issues.push("Repeated or invalid subpart.");
   ids.add(p.id);
   if(p.sourcePdfPage!==q.number+1||p.originalQuestionVisualRead!==true||
      typeof p.sourceQuestion!=="string"||p.sourceQuestion.length<12)
    issues.push("Printed source question absent or mismapped: "+q.number+":"+p.id);
   if(typeof p.modelAnswer!=="string"||p.modelAnswer.length<75)
    issues.push("Answer underdeveloped: "+q.number+":"+p.id);
   if(!Number.isInteger(p.marks)||p.marks<1||!Array.isArray(p.criteria)||
       p.criteria.length===0||p.criteria.reduce((n,c)=>n+c.marks,0)!==p.marks)
    issues.push("Inconsistent subpart grading maximum: "+q.number+":"+p.id);
   if(p.criteria?.some(c=>!Number.isInteger(c.marks)||c.marks<1||
      !c.rule||c.sourceSchemeVerified!==false||c.authoredBySpark!==true))
    issues.push("Incomplete SPARK-owned criterion or untrue source attribution.");
   criterionMarks+=p.criteria?.reduce((n,c)=>n+c.marks,0)||0;
  }
  if(marks!==20||q.marks!==20)issues.push("Original question does not total 20 marks: "+q.number);
  offered+=marks;
 }
 if(parts!==32||offered!==100||criterionMarks!==100||paper?.maximumCandidateMarks!==100)
  issues.push("Incorrect 32-part 100-mark historical source total.");
 if(!validatePobHistoricalP2Selection(paper?.id,[1,2,3,4,5]).valid)
  issues.push("Original 2026 five-compulsory selection rules are unavailable.");
 if(paper?.liveScoringApproved!==false||paper?.publishedCxcExaminerSchemeSupplied!==false||
    paper?.semanticScoringCalibrated!==false)
  issues.push("Internally authored responses cannot be passed off as official live student grades.");
 return {valid:issues.length===0,issues,offeredMarks:offered,partCount:parts,
  criterionMarks,liveApproved:false};
}
