import reviewed2021MJ from './oaHistoricalPaper2Reviewed2021MJ.json';
import reviewed2022MJ from './oaHistoricalPaper2Reviewed2022MJ.json';
import reviewed2024MJ from './oaHistoricalPaper2Reviewed2024MJ.json';
const fields=labels=>labels.map(label=>({label,kind:'text'}));
const blankGrid=(title,columns,rows,numeric=false)=>({title,columns,rows:Array.from({length:rows},()=>columns.map(()=>'')),editable:Array.from({length:rows},(_,r)=>columns.map((_,c)=>[r,c])).flat(),numeric});
// Source-checked native forms. These are question data, never answer keys.
export const OA_HISTORICAL_PAPER2_PART_LAYOUTS={
 'OA-P2-2025-MJ::1::q1-c':{
  prompt:'Ms Adrian Peters of Summer Drive, St Johns, is interested in applying for the position of marketing assistant as advertised in Figure 1. Ms Peters is 19 years old and attended the All-Girls Secondary School (AGSS) for 5 years (2019–2024). She gained employment with Excel Stores Ltd as a junior marketing clerk from June 2024 to present. Ms Peters’ email address is adrPet@Peters.com.\n\nAssume you are Ms Adrian Peters. Use the information in Figure 1 to complete the Curriculum Vitae (CV). Limit the skills the candidate should possess and the references to TWO.',
  table:{title:'Figure 1. Advertisement for marketing assistant — G and D Group of Companies',columns:['Requirements'],rows:[['1 Year experience in basic marketing'],['Ability to create brochures'],['Manage customer and organization documents'],['Compose manual and electronic documents'],['Proficiency in Microsoft Word, Excel, and Powerpoint'],['Provide two reputable references']],details:['How to apply: Apply in writing to GANDDgroup@home.org.']},
  documentTitle:'Curriculum Vitae',fieldLayout:'stacked',fields:fields(['Personal Data','Education','Skills 1','Skills 2','Work Experience','References 1','References 2']),layoutSourcePages:[3,4],layoutVerified:true
 },
 'OA-P2-2025-MJ::2::q2-c':{
  prompt:'AXY Corporation employed a new records management clerk to help with the alphabetical filing system in the general office. As part of the orientation exercise, the recruit was asked to index the relevant information from the records listed below.\n\n• Letter referenced 0234 was received from Jones and Brain Associates Ltd on 14 April 2024 concerning outstanding payments. This correspondence is in the pending folder and needs to be filed.\n• Dr Ariel C. P. Peters recently got married and now signs Joseph instead of Peters.\n• The 9th Street Theatre Club invoices were received three weeks ago and needs to be filed.\n• The law firm Mathews and Johnson Associates’ letter of contract with the company is released by management for filing.\n\nUse the information to complete the index card below.',
  responseTables:[blankGrid('Index card',['Unit 1','Unit 2','Unit 3','Unit 4'],4)],layoutSourcePages:[6],layoutVerified:true
 },
 'OA-P2-2025-MJ::4::q4-b':{documentTitle:'EMAIL',fields:fields(['To','From','Date','Subject','Message']),layoutSourcePages:[13],layoutVerified:true},
 'OA-P2-2025-MJ::4::q4-c':{
  prompt:'The presence and proper use of personal protective equipment and safety tools are essential for protecting workers and the integrity of a construction project.\n\nIn the table below, suggest ONE reason why it is important to use the following displayed items in the operations department.',
  sourceVisual:{page:14,description:'The three safety items in the printed question, in row order.',region:[288,440,455,910]},
  responseTables:[{title:'Safety items',columns:['Safety item','Importance of use'],rows:[['Item 1',''],['Item 2',''],['Item 3','']],editable:[[0,1],[1,1],[2,1]]}],layoutSourcePages:[14],layoutVerified:true
 },
 'OA-P2-2025-MJ::5::q5-c':{
  prompt:'Employees at PQR Enterprise Limited are paid weekly. Regular overtime is paid to employees at the rate of $10 per hour. Work done on public holidays is paid at double the overtime rate. National insurance (NIS) is deducted at 2% of basic pay and union dues are $12 per week.\n\nDuring the week ending 25 April 2025, overtime hours were as follows.\n\nUse the information given to complete the payroll sheet for week ending 25 April 2025.',
  table:{title:'Overtime hours',columns:['Employees','Regular Overtime Hours','Public Holiday Hours'],rows:[['Joseph Sawyers','8','0'],['Charles Lopez','6','2']],details:[]},
  responseTables:[{title:'PAYROLL',columns:['Names of Employees','Basic Pay ($)','Overtime Pay ($)','Gross Pay ($)','NIS ($)','Union Fees ($)','Total Deductions ($)','Net Pay ($)'],rows:[['Joseph Sawyers','300','','','','12','',''],['Charles Lopez','200','','','','12','',''],['Total Net Pay','','','','','','','']],editable:[...[0,1].flatMap(r=>[2,3,4,6,7].map(c=>[r,c])),[2,7]],rowLabels:['Joseph Sawyers','Charles Lopez','Total Net Pay'],merges:[{row:2,col:0,colSpan:7,align:'right'}],numeric:true}],layoutSourcePages:[16],layoutVerified:true
 },
 'OA-P2-2025-MJ::6::q6-c':{
  prompt:'On Thursday 8 May, Mrs Janice Raven was asked to send Purchase Requisition #PS005 to the purchasing officer. Authorization was given for 30 reams of A4 copy paper, 18 reams of legal size paper and one laminator.\n\nSince the items are needed by the first business day of the next week, the stores supervisor, Mr Jonas Brown, had to authorize the requisition the following day. Carib Stationeries is the company’s supplier for all stationery and office equipment. Supplies Ltd provides all other equipment.\n\nUse the purchase requisition below to enter the relevant information.',
  documentTitle:'Purchase Requisition',fields:[...fields(['To','Req. No.','Date']),...fields(['Date Required','Requested by','Authorized by','Date Authorized']).map(f=>({...f,position:'after'}))],responseTables:[blankGrid('Please supply the following items.',['Quantity','Description','Supplier'],3)],layoutSourcePages:[18],layoutVerified:true
 }
};
export const OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS={};
// Full 2025 wording checked against the supplied page images on 27 October 2026.
const reviewed2025=(question,label,prompt,pages)=>{
 const key=`OA-P2-2025-MJ::${question}::q${question}-${label}`;
 OA_HISTORICAL_PAPER2_PART_LAYOUTS[key]={...OA_HISTORICAL_PAPER2_PART_LAYOUTS[key],prompt,layoutSourcePages:pages,layoutVerified:true,promptVerified:true};
};
reviewed2025(1,'a','(i) State the difference between horizontal communication and vertical communication.\n\n(ii) State TWO benefits of a horizontal communication flow.',[2]);
reviewed2025(1,'b','Outline TWO advantages of using video conferencing rather than the traditional in-person meetings as a method of hosting international business meetings.',[2]);
reviewed2025(2,'a','State THREE reasons why possessing effective communication skills is important to an individual seeking employment in today’s competitive job market.',[5]);
reviewed2025(2,'b','One of the duties of an information records clerk is to manage a company’s records.\n\nOutline TWO ways in which the use of technology can help the clerk to complete this duty efficiently.',[5]);
reviewed2025(2,'d','A large international corporation that has operations across multiple continents handles various documents, including invoices, shipping documents and correspondence, all related to different countries and regions. The records management clerk is considering changing from an alphabetical filing system to a geographical filing system.\n\nOutline TWO reasons why changing to a geographical filing system would benefit the corporation.',[7]);
reviewed2025(3,'a','(i) State TWO types of informal meetings that may be held in a business organization.\n\n(ii) State THREE advantages of preparing minutes for a meeting.',[8]);
reviewed2025(3,'b','The Human Resources Manager (HRM) of Lately Fries Ltd has made some critical changes to the employment policies. The changes, which relate to staff salaries and how they are calculated (a complicated process for some staff), must be shared with the employees in your department. The HRM is deciding how best to communicate the information and has narrowed it down to the monthly bulletin or a meeting with the staff.\n\n(i) Outline TWO reasons why the HRM should convene a face-to-face meeting to share the information instead of using the monthly bulletin.\n\n(ii) State TWO activities that should take place in preparation for the meeting.',[9]);
reviewed2025(3,'c','The management team at Lately Fries Ltd has started the preparation for the company’s annual general meeting (AGM). The record indicated that some important committee members who agreed with their plans for expansion would not be available in person but were willing to vote by proxy. They decided to move a motion to allow proxy voting.\n\nExplain TWO reasons why the management team decided to move a motion to allow proxy voting.',[10]);
reviewed2025(4,'a','Mr Allan Forbes, marketing manager of Helen International, will be travelling overseas on a business trip next month.\n\n(i) Suggest FOUR pieces of information which should be included in an email about hotel reservations made on his behalf.\n\n(ii) State TWO benefits of paying for Mr Forbes’ hotel accommodation by credit card.',[11]);
reviewed2025(4,'b','The workers of Dews Manufacturing Corporation have raised numerous concerns about the poor and unsafe conditions they work in daily. However, nothing has been done by management to address their concerns. The workers eventually called a meeting with their union representatives, where it was reported that workers have had numerous discussions with the human resource manager regarding the company’s violations of the OSHA Act. One of the violations of the Act that has affected workers severely is working with hazardous and malfunctioning equipment to complete tasks.\n\nAssuming you are the union representative, Ms Pat James (pjames@unionrep.com), write an email to Mr Tony Greene (tgreen@edewscorp.com), human resource manager of Dews Corporation. Include the following in your email.\n\n• A statement on the meeting held with workers and union representatives.\n• An outline of ONE way in which the identified violation can affect workers’ safety and well-being.\n• An outline of ONE measure to address the problem in accordance with OSHA standards.',[12,13]);
reviewed2025(5,'a','Identify TWO duties of a clerk in the accounts office.',[15]);
reviewed2025(5,'b','Outline the procedure for making payments through the bank using EACH of the following methods.\n\n(i) Standing order\n\n(ii) Credit transfer',[15]);
reviewed2025(6,'a','You were recently employed as a clerk in the purchasing department at ABC Company. Other than preparing or processing purchase requisitions, state TWO duties that you are required to perform.',[17]);
reviewed2025(6,'b','Outline TWO functions of the marketing office.',[17]);
for(const [key,layout] of Object.entries(OA_HISTORICAL_PAPER2_PART_LAYOUTS))if(key.startsWith('OA-P2-2025-MJ::')&&layout.prompt){layout.promptVerified=true;layout.layoutReviewDate='2026-10-27';}
OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS['OA-P2-2025-MJ::5']={stem:'All business organizations must have an internal accounting department or outsource the accounting service.',layoutVerified:true,layoutSourcePages:[15]};

Object.assign(OA_HISTORICAL_PAPER2_PART_LAYOUTS,reviewed2024MJ.parts);
Object.assign(OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS,reviewed2024MJ.questions);

Object.assign(OA_HISTORICAL_PAPER2_PART_LAYOUTS,reviewed2022MJ.parts);
Object.assign(OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS,reviewed2022MJ.questions);

Object.assign(OA_HISTORICAL_PAPER2_PART_LAYOUTS,reviewed2021MJ.parts);
Object.assign(OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS,reviewed2021MJ.questions);
