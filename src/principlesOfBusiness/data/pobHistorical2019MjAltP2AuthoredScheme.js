// Actual user-supplied May/June 2019 POB Paper 02 source.
// Original misleading ZIP filename starts P1, but CXC cover explicitly says
// Paper 02, test code 01240020, FIVE compulsory questions, 2 hours.
// The 15 scanned images (printed pp. 3–17) were compared directly.
// Marking criteria are SPARK-authored learning models, NOT CXC examiner scheme.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
const AUTHORED=Object.freeze([
 [1,"a.i","Stakeholder is an individual or group that can affect or be affected by a firm's activities.",["1:Defines person, group or body with an interest in the business","1:Explains their stake, influence, or exposure to business effects"]],
 [1,"a.ii","Employees and customers are two business stakeholders. Owners, suppliers, government, creditors and communities also qualify.",["1:Names one genuine stakeholder","1:Names a different legitimate stakeholder"]],
 [1,"b","Employees provide labour to operate the business; customers purchase its offerings and give feedback.",["2:Describes the real function of FIRST named stakeholder, with a relevant business outcome","2:Describes an accurate and distinct function of SECOND named stakeholder from a.ii"]],
 [1,"c.i","The marketing department researches buyer needs, runs advertisements and chooses promotion and distribution methods.",["1:Identifies a genuine marketing activity","1:Describes how that activity reaches or serves customers"]],
 [1,"c.ii","The finance department prepares budgets and manages cash flow, payments and sources of business funding.",["1:Identifies genuine finance activity","1:Describes how money, capital or financial reporting is handled"]],
 [1,"c.iii","The HR department hires employees, provides training and handles recruitment, development and employee relations.",["1:Identifies genuine HR activity","1:Describes how recruitment, training or employee relations work"]],
 [1,"d","A food seller should comply with product-safety regulations by ensuring meals are stored hygienically and labelled accurately. It should also conduct business honestly, such as avoiding misleading advertisements that promise unsupported health claims.",["1:First distinct valid ethical or legal principle","1:Explains how the FIRST principle should guide business decisions","1:Gives a practical valid example of FIRST principle","1:Second distinct principle","1:Explains compliance or ethical behaviour for SECOND principle","1:Gives relevant example of SECOND principle"]],
 [2,"a.i","Planning and controlling are recognised management functions. Organising, staffing and leading also qualify.",["1:First genuine management function","1:Different genuine management function"]],
 [2,"a.ii","Planning sets goals and chooses means to reach them; controlling checks actual results against targets and corrects deviations.",["2:Accurately describes activities and purpose of FIRST function selected in a.i","2:Accurately describes SECOND distinct named function selected in a.i"]],
 [2,"b.i","Management should pay workers fairly and on time, and maintain safe working conditions under labour law.",["1:First genuine employer responsibility to employees","1:Second distinct responsibility to employees"]],
 [2,"b.ii","Management should pay taxes lawfully owed and comply with licensing, regulatory and reporting requirements.",["1:First genuine business obligation to government","1:Second distinct government obligation"]],
 [2,"c.i","Teamwork is coordinated work by two or more people who combine efforts to achieve a shared objective.",["1:Identifies collective effort of two or more people","1:Identifies a shared organisational goal or coordinated result"]],
 [2,"c.ii","Teamwork combines diverse skills for better solutions, but coordination and disagreement can consume time.",["1:Valid teamwork advantage","1:Valid distinct teamwork disadvantage"]],
 [2,"d","Regular two-way staff meetings allow managers to explain policies and answer questions, preventing misunderstandings. A confidential employee feedback and grievance channel with documented responses lets workers raise issues safely and see how management has acted.",["1:Identifies first workable communication improvement strategy","1:Explains how the first strategy would operate within ABC Plastic Co.","1:Explains expected communication outcome","1:Identifies SECOND distinct strategy","1:Explains its working process","1:Links strategy to improved trust or employee-manager understanding"]],
 [3,"a.i","Production is the creation of goods and delivery of services by combining inputs through an economic process.",["1:Identifies creating goods or services","1:Describes combining productive resources or inputs"]],
 [3,"a.ii","Labour and land are two production factors other than capital. Enterprise/entrepreneurship is another acceptable factor.",["1:Correct first non-capital factor","1:Different correct non-capital factor"]],
 [3,"b.i","Capital is man-made wealth and productive assets, such as machinery, used to produce further goods and services.",["1:Defines man-made productive resources","1:Explains their use in further production"]],
 [3,"b.ii","Fixed capital is long-lived productive property such as a bottling machine; working capital funds circulating inventory and daily costs such as stock and cash.",["1:Explains meaning of fixed long-term productive capital","1:Provides appropriate fixed-capital example","1:Explains meaning of working capital used in daily production or short-term operations","1:Provides a fitting working-capital example"]],
 [3,"c.i","Growth can give customers a wider range of products or improved service because the company can afford new outlets and equipment.",["1:Identifies real customer benefit of company growth","1:Explains practical improvement for consumers"]],
 [3,"c.ii","Successful growth can support higher dividends and a stronger share price for shareholders, although returns are not guaranteed.",["1:Identifies genuine potential shareholder benefit","1:Explains the link between business expansion and shareholder return"]],
 [3,"d","Higher productivity lowers labour cost per unit, allowing more competitive prices or better profit margins. More output from the same workforce also improves ability to fill orders promptly, raising revenue or market share.",["1:First legitimate productivity gain","1:Explains how gains arise, e.g. output per worker or cost per unit","1:Links to a competitive or financial advantage","1:Second distinct productivity advantage","1:Explains the mechanism of output gain","1:Explains expected business performance result"]],
 [4,"a","Consumer associations educate buyers about rights and safe products and investigate complaints or advocate fair treatment and remedies.",["2:First accurate consumer organisation function with practical purpose","2:Second different accurate consumer organisation function developed"]],
 [4,"b","Prompt complaint handling strengthens customer loyalty and repeat purchases. Helpful assistance and accurate answers enhance reputation, encouraging positive referrals.",["2:First different developed benefit of good customer service","2:Second different developed benefit"]],
 [4,"c.i","A warranty is the manufacturer's or seller's promise to repair, replace or otherwise remedy covered defects under agreed conditions during a stated period.",["1:Identifies product quality or defect promise subject to agreed period/terms","1:Explains repair, replacement or other covered remedy"]],
 [4,"c.ii","A toll-free support number allows customers to contact a company without paying the call charge in the covered scheme, obtaining advice or assistance from a call centre.",["1:Describes no-charge customer phone contact under the toll-free service","1:Explains response to customer enquiries, complaints or assistance"]],
 [4,"c.iii","A customer suggestion box lets clients submit comments and improvement ideas for staff to review, helping the firm enhance service.",["1:Identifies collection of customer feedback and ideas","1:Explains how comments help improve business service or quality"]],
 [4,"d","Trademarks distinguish a firm's goods from competing brands, making its products recognisable and supporting repeat purchases. Trademark rights also help a firm challenge confusing imitation of its name or logo, protecting reputation and marketing investment.",["1:First correct trademark benefit","1:Explains mechanism such as distinct identification or customer trust","1:Links to commercial outcome such as loyalty","1:Second distinct trademark benefit","1:Explains rights or anti-imitation mechanism","1:Connects to a practical protection of business sales, goodwill or brand"]],
 [5,"a","ICT comprises digital and telecommunications tools used to collect, process, store and communicate information.",["1:Correctly identifies information-processing technology","1:Explains communication or data transmission use"]],
 [5,"b","Computer-aided design enables architects or manufacturers to create and alter accurate digital product plans before manufacturing, reducing redesign costs.",["1:Identifies relevant CAD use for designing products, prototypes or patterns","1:Explains accuracy, change speed or business benefit"]],
 [5,"c","A retail firm may offer customers nearby ATMs for convenient cash withdrawals, increasing visits; use an ATM to deposit cash or check balances where the banking service allows; and give customers extended self-service access to banking outside branch hours, lowering queues and transaction time.",["1:First genuine ATM/ABM use","1:Explains how it assists the business or its customers","1:Second distinct ATM/ABM use","1:Explains second effect or efficiency gain","1:Third distinct ATM/ABM benefit","1:Outlines commercial convenience, speed or access effect"]],
 [5,"d","Online sales allow firms to serve customers beyond their immediate town, increasing potential revenue. Automated websites can accept orders outside opening hours and reduce reliance on expensive physical shopfronts.",["2:First distinct e-commerce performance benefit and mechanism","2:Second distinct e-commerce benefit and mechanism"]],
 [5,"e","A business should ask permission and secure customers' personal information with access controls and safe retention, preventing privacy breaches. It should also use properly licensed software and respect copyright and intellectual property rights rather than copying protected material unlawfully.",["1:First genuine ICT ethics principle","1:Explains specific implementation of the first principle","1:Links to lawful/fair outcome or prevention of harms","1:Second distinct ICT ethics principle","1:Explains practical compliance with the second principle","1:Shows business and social consequences or benefit"]],
]);
export const POB_2019_MJ_ALT_P2_AUTHORED_SCHEME=Object.freeze({
 id:"POB-P2-2019-MJ-ALT",year:2019,sitting:"MJ",paper:2,
 sourceFilename:"CSEC_Principles_of_Business_P1_2019_MJ.pdf",
 sourceSha256:"5b95df8eaf522bad7684b01bad41b367f8652967715b3983f8c836c5ec93b4bc",
 originalFilenamePaper:1,actualCoverPaper:2,printedTestCode:"01240020",
 scannedSourcePages:15,printedPageRange:"3–17",timeLimitMinutes:120,
 questionsOffered:5,questionsToAnswer:5,candidateMaxMarks:100,
 rubricOrigin:"SPARK-internally-authored-not-CXC-official",
 officialCxcMarkingSchemeAvailable:false,visualOriginalRead:true,
 endToEndRubricCalibrationPassed:false,liveScoringApproved:false,
 questions:Object.freeze([1,2,3,4,5].map(number=>Object.freeze({
  number,maxMarks:20,
  parts:Object.freeze(AUTHORED.filter(row=>row[0]===number).map(([,id,modelAnswer,rawRules])=>Object.freeze({
   id,modelAnswer,
   marks:rawRules.reduce((sum,rule)=>sum+Number(rule.slice(0,rule.indexOf(":"))),0),
   criteria:Object.freeze(rawRules.map(rule=>{
    const colon=rule.indexOf(":");
    return Object.freeze({
     marks:Number(rule.slice(0,colon)),rule:rule.slice(colon+1),
     sourceSchemeVerified:false,authoredBySpark:true
    });
   }))
  })))
 })))
});
export function verifyPob2019MjAltP2AuthoredScheme(paper=POB_2019_MJ_ALT_P2_AUTHORED_SCHEME){
 const issues=[],seen=new Set();let total=0,parts=0;
 const original=POB_SUPPLIED_ARCHIVE.find(s=>s.id===paper?.id);
 if(!original||original.paper!==2||original.reclassifiedFromPaper1!==true||
    paper?.sourceSha256!==original.sourceSha256||
    paper.sourceFilename!==original.filename||
    paper.printedTestCode!=="01240020")
  issues.push("Original Paper 02 cover, filename and SHA-256 mismatch.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==5)
  issues.push("Five compulsory historical P2 questions required.");
 for(const q of paper?.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>5||seen.has(q.number))
   issues.push("Invalid/repeated question number.");
  seen.add(q.number);
  const ids=new Set();let qm=0;
  for(const item of q.parts||[]){
   parts++;
   if(!item.id||ids.has(item.id))issues.push("Duplicate part ID.");
   ids.add(item.id);
   if(typeof item.modelAnswer!=="string"||item.modelAnswer.length<35)
    issues.push("Missing developed academic answer.");
   if(!Array.isArray(item.criteria)||item.criteria.length===0||
      item.criteria.reduce((sum,c)=>sum+c.marks,0)!==item.marks)
    issues.push("Incomplete or misallocated part marks.");
   if(item.criteria?.some(c=>!Number.isInteger(c.marks)||c.marks<1||
      typeof c.rule!=="string"||!c.rule.trim()||c.sourceSchemeVerified!==false))
    issues.push("Invalid rubric or falsely certified examiner provenance.");
   qm+=item.marks||0;
  }
  if(qm!==20)issues.push("Question mark total is not 20.");
  total+=qm;
 }
 if(total!==100||paper?.candidateMaxMarks!==100)issues.push("Incorrect candidate maximum.");
 if(paper?.liveScoringApproved!==false||paper?.officialCxcMarkingSchemeAvailable!==false||
   paper?.endToEndRubricCalibrationPassed!==false)
  issues.push("Uncalibrated/unauthorised paper cannot be graded or called official.");
 return {valid:issues.length===0,issues,marks:total,parts};
}
