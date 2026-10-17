// SPARK-authored rubric for the 2024 January POB P2 user-supplied
// two-page typed QUESTION TRANSCRIPTION. Not an official CXC marking scheme.
// Original source booklet not authenticated; no live grade until server
// semantic calibration and verified source/question integration.
import {POB_HISTORICAL_P2_2024_JAN_DRAFT} from "./pobHistoricalP22024JanDraft";
const RULES=Object.freeze(Object.fromEntries([
 ["1:a.i",["Stakeholder is an interested individual or group","Business affects them or they influence its decisions"],"Stakeholders are people or groups with an interest in a business who can affect or be affected by its activities.",["owners","employees","customers","suppliers","investors","creditors","government","community"]],
 ["1:a.ii",["Names one valid stakeholder","Names a second DISTINCT valid stakeholder"],"Employees and customers.",["owners","employees","customers","suppliers","investors","creditors","government","community"]],
 ["1:a.iii",["Refers to one stakeholder chosen in a.ii","Accurately describes that stakeholder's role"],"Suppliers provide stock or materials to the business.",["workers produce goods","customers purchase goods","government regulates trade","owners supply finance and manage"]],
 ["1:b",["Identifies a valid first functional area","Describes its actual duties","Identifies a second DIFFERENT functional area","Describes its actual duties"],"Marketing promotes and sells products. Finance manages money, budgets and payments.",["production","marketing","finance","human resources","operations","purchasing","customer service"]],
 ["1:c",["First valid legal or ethical principle","Second DISTINCT principle","Third DISTINCT principle","Fourth DISTINCT principle"],"Advertise honestly, comply with employment law, follow environmental regulations and report taxes correctly.",["honest advertising","fair wages","no bribery","pay taxes","product safety","consumer rights","worker protection","environmental responsibility"]],
 ["1:d",["Identifies breach of FIRST earlier principle","Explains an actual immediate consequence","Links to a further effect on business or society","Identifies a DIFFERENT earlier principle","Explains its immediate consequence","Links to a further effect"],"Dishonest advertising can cause complaints, lawsuits and falling sales. Breaking labour laws can trigger fines, disputes and production delays.",["fines","loss of trust","customer injury","legal action","loss of licence","environmental damage"]],
 ["2:a.i",["Identifies a systematic investigation made before starting a venture","Explains its purpose is assessing likely practicality, costs, demand or viability"],"A feasibility study evaluates a business proposal before investment to judge whether it is workable and viable.",["market feasibility","financial feasibility","technical feasibility"]],
 ["2:a.ii",["First valid reason for conducting feasibility research","A second DIFFERENT valid reason"],"To measure customer demand and to estimate whether expected revenue will cover costs.",["identify risks","study rivals","resource needs","evaluate funding","avoid wasted investment"]],
 ["2:a.iii",["Gives a genuine PRIMARY first-hand research source","Gives a genuine SECONDARY already-published source","Gives another DISTINCT SECONDARY source"],"Primary source: interviews with possible buyers. Secondary sources: government census and industry reports.",["surveys","direct observation","focus groups","government statistics","newspaper archives","published research"]],
 ["2:b",["First valid planning purpose","Explains HOW first purpose supports success","Second DISTINCT planning purpose","Explains HOW second purpose helps"],"Planning sets measurable goals so progress can be checked. Cash budgeting anticipates expenses and helps prevent shortages.",["risk planning","resource allocation","coordination","time scheduling","financing","staffing"]],
 ["2:c",["Names first actual consumer-protection law or public measure","Second DISTINCT measure","Third DISTINCT measure"],"Consumer-protection legislation, product safety inspections and compulsory accurate product labelling.",["fair trading acts","competition laws","standards agency","weights and measures","consumer complaints authority","food standards"]],
 ["2:d",["First relevant barber-shop location factor","Explains its practical effect on a barber shop","Links effect to customer access, profitability or costs","Second DIFFERENT location factor","Explains the practical consequence","Connects to business outcome"],"Locate near target clients so visits and sales increase. Choose premises with affordable rent to control recurring costs.",["foot traffic","parking","water and electricity","security","competition","rent","transport links","customer demographics"]],
 ["3:a",["First distinct function of a consumer organisation","Second distinct function","Third distinct function","Fourth distinct function"],"Educate consumers, investigate complaints, seek redress and campaign for better consumer laws.",["advise rights","handle disputes","market surveillance","product-safety alerts","advocacy","price monitoring"]],
 ["3:b",["First customer-service role","Explains how the first role helps","Second DIFFERENT customer-service role","Explains how the second helps"],"Responding to questions helps customers choose correctly. Resolving complaints creates confidence and repeat purchases.",["answer questions","after-sales help","customer feedback","returns","product demonstrations"]],
 ["3:c.i",["Defines warranty as a seller or manufacturer promise for a stated period or terms","Explains repair, replacement, or other contractual or legal remedy for covered faults"],"A warranty promises support for a product's performance or defects, such as repair during its stated period.",["warranty period","defects","repair","replacement","consumer remedy"]],
 ["3:c.ii",["Identifies web or app messaging with a support service","Explains its use for answering questions or resolving issues promptly"],"Online chat lets customers contact support through a website and receive timely help.",["real-time messaging","in-app help","customer enquiry"]],
 ["3:c.iii",["Identifies help delivered AFTER purchase","Gives a relevant service such as repair, advice, installation or returns"],"After-sales service supports buyers after the sale, such as help with product installation and repairs.",["returns","repairs","maintenance","help desk","setup"]],
 ["3:d.i",["Correctly identifies trademark as protection for a distinctive brand indicator","Explains risk of competitors using a confusingly similar name or logo and legal protection","Explains effect on reputation, customer recognition or sales"],"A trademark helps Leon protect his skincare brand name and logo from confusing imitation. Customers identify genuine products and the business protects its reputation.",["brand source identifier","exclusive use","counterfeiting","customer trust","registration"]],
 ["3:d.ii",["Identifies copyright protection for original literary expression","Explains author's rights to control copying, distribution or licensing","Explains income, royalties or remedies against unauthorised copies"],"Copyright protects Vashti's original novel and controls its copying and licensed publication, supporting royalties and legal remedies.",["literary work","copying rights","publishing licences","royalties","piracy prevention"]],
 ["4:a",["First actual supply-chain operation","Second DIFFERENT supply-chain operation","Third DIFFERENT operation","Fourth DIFFERENT operation"],"Procure materials, store inventory, transport supplies and distribute products.",["sourcing","purchasing","processing","warehousing","inventory tracking","order fulfilment","returns"]],
 ["4:b.i",["Names first valid supply-chain advantage","Names a different advantage"],"Lower procurement costs and more reliable product delivery.",["reduced waste","availability","quality","stock accuracy","speed"]],
 ["4:b.ii",["Names first real supply-chain challenge","Names a different challenge"],"Supplier delays and increased shipping costs.",["stockouts","natural disasters","quality problems","forecast errors","late deliveries"]],
 ["4:c",["Names first supply-chain technology","Explains its supply-chain effect","Names second DIFFERENT technology","Explains its effect","Names third DIFFERENT technology","Explains its effect"],"Barcode scanners improve stock counts. GPS tracking shows where deliveries are. ERP software coordinates ordering and inventory.",["RFID","GPS","ERP","EDI","automated ordering","route optimisation","inventory scanners"]],
 ["4:d",["Names first realistic outsourced activity or benefit","Explains the cost, quality, capacity or skills mechanism","Links to competitive business effect","Names second DIFFERENT benefit or outsourced activity","Explains the second mechanism","Links to a distinct competitive outcome"],"Using a specialist shipping provider can cut transport costs and improve delivery reliability. Outsourced quality testing supplies expertise and makes product quality more consistent.",["specialist logistics","contract bottling","marketing services","call-centre support","quality assurance"]],
 ["5:a",["Names a genuine FIRST DIRECT tax","Names a second DIFFERENT DIRECT tax","Names a genuine FIRST INDIRECT tax","Names a second DIFFERENT INDIRECT tax"],"Direct taxes: personal income tax and corporation tax. Indirect taxes: GCT or VAT and customs duty.",["direct:income tax,corporation tax,property tax","indirect:general consumption tax,value added tax,excise duty,customs duty"]],
 ["5:b",["Names first government environmental measure","Explains how it changes people's conduct","Names second DIFFERENT environmental measure","Explains its effect","Names third DIFFERENT measure","Explains its effect"],"Supply recycling bins to encourage waste sorting. Teach environmental conservation in schools. Offer solar-energy incentives to reduce fossil-fuel use.",["recycling facilities","anti-litter fines","education","tree planting","plastic bans","renewable rebates","water conservation"]],
 ["5:c",["Names first government obligation","Names second DISTINCT government obligation","Names third DISTINCT obligation","Names fourth DISTINCT obligation"],"Provide public education, healthcare, law enforcement and roads.",["justice","security","public infrastructure","health","education","social security","defence","sanitation"]],
 ["5:d",["Identifies first concrete healthcare challenge","Recommends a solution matched to the first challenge","Explains resulting care improvement","Identifies second DIFFERENT healthcare challenge","Recommends a separate appropriate response","Explains its result"],"Train and retain more nurses to ease staff shortages and reduce queues. Open mobile rural clinics to reduce travel barriers and improve access.",["health worker shortage","rural access","underfunding","medicine shortages","obsolete equipment","long waiting times"]],
]));
export const POB_2024_JAN_P2_SPARK_MARKING=Object.freeze({
 id:"POB-P2-2024-JAN",subject:"principles-of-business",paper:2,
 sourceFilename:"CSEC_Principles_of_Business_P2_2024_JAN.pdf",
 sourceSha256:"1bab67360b3d83e7c22c39ccb24318dd2320b156d6347f75980cba0c8d4968f3",
 rubricProvenance:"spark-authored-not-CXC-official",
 sourceType:"two-page-typed-transcription",
 officialCxcMarkingSchemeSupplied:false,completeDraftRubric:true,
 semanticAssessmentCalibrated:false,liveScoringApproved:false,
 timeLimitMinutes:120,maximumMarks:100,
 questions:Object.freeze(POB_HISTORICAL_P2_2024_JAN_DRAFT.questions.map(q=>Object.freeze({
  number:q.number,marks:q.marks,
  parts:Object.freeze(q.parts.map(p=>{
   const s=RULES[q.number+":"+p.id];
   if(!s)throw new Error("Missing academic rubric for "+q.number+":"+p.id);
   const [criteria,modelAnswer,acceptedIllustrations]=s;
   return Object.freeze({
    id:p.id,prompt:p.prompt,marks:p.marks,
    modelAnswer,acceptedIllustrations:Object.freeze(acceptedIllustrations),
    criteria:Object.freeze(criteria.map(rule=>Object.freeze({
      marks:1,rule,sourceSchemeVerified:false,authoredBySpark:true
    })))
   });
  }))
 })))
});
export function verifyPob2024JanP2AuthoredRubric(paper=POB_2024_JAN_P2_SPARK_MARKING){
 const errors=[];
 if(paper.id!=="POB-P2-2024-JAN"||paper.sourceSha256!=="1bab67360b3d83e7c22c39ccb24318dd2320b156d6347f75980cba0c8d4968f3")
  errors.push("Incorrect source ID or original PDF fingerprint.");
 if(!Array.isArray(paper.questions)||paper.questions.length!==5)
  errors.push("Exactly five source questions required.");
 let total=0;let parts=0;
 for(const q of paper.questions||[]){
  if(q.marks!==20)errors.push("Incorrect 20-mark question "+q.number);
  let marks=0;
  for(const part of q.parts||[]){
   parts++;
   marks+=part.marks;
   if(!part.prompt||!part.modelAnswer||part.modelAnswer.length<35)errors.push("Incomplete answer for "+q.number+":"+part.id);
   if(!Array.isArray(part.criteria)||part.criteria.reduce((n,c)=>n+c.marks,0)!==part.marks)
    errors.push("Rubric mark mismatch at "+q.number+":"+part.id);
   if(part.criteria?.some(c=>!c.rule||c.sourceSchemeVerified!==false))
    errors.push("Invalid provenance at "+q.number+":"+part.id);
  }
  if(marks!==20)errors.push("Question total is not 20 for "+q.number);
  total+=marks;
 }
 if(total!==100||parts!==28)errors.push("Expected 28 parts worth 100 marks.");
 if(paper.officialCxcMarkingSchemeSupplied!==false||paper.liveScoringApproved!==false)
  errors.push("Cannot mislabel draft rubric as CXC official or live.");
 return {valid:errors.length===0,errors,parts,marks:total};
}
