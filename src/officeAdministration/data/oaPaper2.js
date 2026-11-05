// SPARK-authored practice, aligned to CXC 27/O/SYLL24. These are not historical CXC papers.
export const OA_PAPER2_BANK_VERSION='oa-paper2-original-2026-10-26-v1';
export const OA_PAPER2_RUBRIC_VERSION='oa-source-rubric-v2-2026-10-26';
const point=(model,alternatives=[])=>({model,alternatives});
const field=(label,expected,alternatives=[],labelAliases=[])=>({kind:'field',label,expected,alternatives,labelAliases,model:`${label}: ${expected}`});
const numeric=(label,expected,unit='J$',labelAliases=[])=>({kind:'numeric',label,expected,unit,tolerance:.005,labelAliases,model:`${label}: ${/[$€£]/.test(unit)?unit:''}${expected.toLocaleString('en-US',{maximumFractionDigits:2})}${unit&&!/[$€£]/.test(unit)?' '+unit.trim():''}`});
function part(q,label,prompt,marks,points,{profile='Knowledge and comprehension',choice=false,answerType='written',guidance=''}={}){
 const bank=points.map(p=>typeof p==='string'?point(p):p);
 if(bank.length<marks||(!choice&&bank.length!==marks))throw new Error('Office Administration point allocation mismatch');
 return {id:`q${q}-${label}`,label,prompt,marks,answerType,profile,guidance,
  modelAnswer:bank.slice(0,marks).map(p=>p.model).join('\n'),
  criteria:bank.slice(0,marks).map((p,i)=>({id:`q${q}-${label}-c${i+1}`,marks:1,
   rule:choice?`One distinct correct point (${i+1} of ${marks}); accept the alternatives in the source answer bank.`:p.model,
   ...p})),...(choice?{choiceBank:bank}:{}),
  ...(bank.some(p=>p.kind==='field'||p.kind==='numeric')?{fields:bank.map(p=>({label:p.label,kind:p.kind,unit:p.unit}))}:{})};
}
const knowledge=(q,label,prompt,marks,points)=>part(q,label,prompt,marks,points,{choice:true});
const application=(q,label,prompt,points,extra={})=>part(q,label,prompt,points.length,points,{profile:'Application',...extra});
function question(number,title,syllabusSections,stem,parts){return {id:`q${number}`,number,title,section:number<=3?'I':'II',syllabusSections,stem,marks:15,parts};}
function paper(n,title,questions){return {id:`OA-ORIGINAL-02-${String(n).padStart(2,'0')}`,title,subjectId:'office-administration',paper:2,sourceType:'original',qualification:'CSEC',syllabus:'CXC 27/O/SYLL24',durationMinutes:120,timeLimitMinutes:120,totalMarks:90,marks:90,compulsory:true,
 instructions:['Answer all SIX questions.','Section I contains Questions 1–3. Section II contains Questions 4–6.','Each question is worth 15 marks. The whole paper is worth 90 marks.','Write in complete sentences when an explanation is required. Use the labels provided for forms and calculations.','You may use a silent, non-programmable calculator.'],questions};}
const officeFunctions=[
 point('The office collects information from customers, staff and suppliers.',['The office receives business information.']),
 point('The office records information so that transactions and decisions can be traced.',['The office captures details in its records.']),
 point('The office processes information into useful business documents and reports.',['The office turns raw data into useful information.']),
 point('The office communicates information to people who need it.',['The office distributes information.']),
 point('The office stores records securely for later retrieval.'),
 point('The office safeguards business assets and confidential information.'),
];
const barriers=[
 point('Background noise can prevent a message from being heard clearly.'),
 point('Unfamiliar jargon can prevent the receiver from understanding the message.'),
 point('An unreliable internet connection can interrupt an online conversation.'),
 point('A language difference can cause a message to be misunderstood.'),
 point('Poor listening can cause important details to be missed.'),
 point('An unclear or incomplete message can confuse the receiver.'),
];
const paymentControls=[
 point('An authorised officer should approve a payment before it is released.'),
 point('The purchase order, goods received note and supplier invoice should agree before payment.'),
 point('Different people should authorise a payment and record the transaction.'),
 point('Paid invoices should be marked as paid to prevent duplicate payments.'),
 point('The payee and bank details should be checked against an approved supplier record.'),
];
const meetingDocuments=[
 point('A notice tells members when and where a meeting will take place.'),
 point('An agenda lists the items to be considered at the meeting.'),
 point('Minutes record the decisions and proceedings of a meeting.'),
 point('An attendance register records the people present at the meeting.'),
 point('Supporting papers provide information needed to discuss an agenda item.'),
];
const originals=[];
originals.push(paper(1,'Harbour View Services — Office Administration Paper 2',[
 question(1,'The modern office and a telephone message',[1,2],
  'Harbour View Services is a small company in Kingston. Its receptionist, Alana Grant, is taking a call for the purchasing officer, Mr Leon Brown. At 10:20 a.m. on 18 May 2027, Ms Keisha Cole of Coral Stationery calls from 876-555-0147. She says that order 417 will arrive on 19 May, rather than 18 May. She asks Mr Brown to telephone her by 3:00 p.m. Alana confirms the details with the caller.',[
   knowledge(1,'a','State FOUR functions of a business office.',4,officeFunctions),
   knowledge(1,'b','State TWO advantages and TWO disadvantages of allowing an employee to work from home. Give a different point in each case.',4,[
    'An advantage is that the employee can avoid the time and cost of travelling to work.',
    'An advantage is that the organisation may need less office space.',
    'A disadvantage is that an unreliable home internet connection can interrupt work.',
    'A disadvantage is that face-to-face supervision and teamwork can be more difficult.',
    'An advantage is that flexible scheduling can help the employee organise work and personal responsibilities.',
    'A disadvantage is that inadequate separation between home and work can cause distractions.'
   ]),
   application(1,'c','Prepare a telephone message for Mr Brown. Use these SEVEN labels: Date and time; To; Caller; Organisation; Telephone; Message; Action required.',[
    field('Date and time','18 May 2027, 10:20 a.m.',['18 May 2027 10:20 am']),
    field('To','Mr Leon Brown',['Leon Brown','Mr Brown']),
    field('Caller','Ms Keisha Cole',['Keisha Cole','Ms Cole']),
    field('Organisation','Coral Stationery'),
    field('Telephone','876-555-0147',['8765550147']),
    field('Message','Order 417 will arrive on 19 May instead of 18 May.',['Order 417 delivery changed from 18 May to 19 May.']),
    field('Action required','Telephone Ms Cole by 3:00 p.m.',['Call Keisha Cole by 3 pm.','Call Ms Cole by 15:00.'])
   ],{answerType:'document',guidance:'Keep the order number and the change of delivery date. Do not add a promise that the caller did not make.'})
  ]),
 question(2,'Communication and meeting preparation',[3,4],
  'The Harbour View staff welfare committee will meet on 24 May 2027 at 2:00 p.m. in the Training Room. The chair is Ms Dana Reid. Members must approve the previous minutes, review the sports-day budget and decide how to allocate volunteer duties. The secretary is preparing the meeting papers.',[
   knowledge(2,'a','Identify THREE barriers to effective communication.',3,barriers),
   knowledge(2,'b','State the purpose of EACH of FOUR documents used to prepare for or record a meeting.',4,meetingDocuments),
   application(2,'c','Prepare a short agenda for the committee meeting. Use these EIGHT labels: Committee; Date; Time; Venue; Opening; Previous minutes; Budget; Volunteer duties. Under Opening include apologies for absence.',[
    field('Committee','Harbour View staff welfare committee',['Staff welfare committee']),
    field('Date','24 May 2027'),
    field('Time','2:00 p.m.',['2 pm','14:00']),
    field('Venue','Training Room'),
    field('Opening','Welcome and apologies for absence',['Welcome; apologies for absence']),
    field('Previous minutes','Read and approve the previous minutes',['Approval of the previous minutes']),
    field('Budget','Review the sports-day budget',['Sports-day budget review']),
    field('Volunteer duties','Decide how to allocate volunteer duties',['Allocate volunteer duties'])
   ],{answerType:'document'})
  ]),
 question(3,'Travel and the life of a record',[5,6],
  'Ms Paula James will attend an inventory workshop in Bridgetown. Her confirmed itinerary shows flight CJ204 leaving Kingston on 6 June 2027 at 8:00 a.m. and arriving in Bridgetown at 11:15 a.m., with all times stated as local times. She is booked into Palm Court Hotel for two nights. The workshop is at the Trade Centre on 7 June, 9:00 a.m.–4:00 p.m. Her return flight is CJ205 on 8 June at 12 noon. A car is booked to collect her at the Bridgetown airport. Her office stores the booking confirmations in the travel file.',[
   knowledge(3,'a','Identify THREE documents that may be needed for international business travel and state a different document in each case.',3,[
    'A valid passport may be required to establish identity and nationality.',
    'A visa may be required for permission to enter the destination country.',
    'A travel insurance document provides details of the insurance cover.',
    'An airline ticket or booking confirmation provides the flight details.',
    'A health certificate may be required by the destination country.'
   ]),
   knowledge(3,'b','Outline FOUR stages in the life cycle of a business record.',4,[
    'A record is created or received when the business activity takes place.',
    'The record is classified and stored so that it can be found.',
    'The record is used and maintained while it is needed for business purposes.',
    'The record is retained, archived or securely disposed of according to the retention schedule.'
   ]),
   application(3,'c','Prepare the itinerary using these EIGHT labels: Traveller; Outward flight; Arrival; Hotel; Airport transfer; Workshop date and place; Workshop time; Return flight.',[
    field('Traveller','Ms Paula James',['Paula James']),
    field('Outward flight','CJ204, Kingston, 6 June 2027, 8:00 a.m.',['CJ204 from Kingston on 6 June 2027 at 8 am']),
    field('Arrival','Bridgetown, 6 June 2027, 11:15 a.m.',['Bridgetown on 6 June 2027 at 11:15 am']),
    field('Hotel','Palm Court Hotel, two nights',['Palm Court Hotel for 2 nights']),
    field('Airport transfer','Car collection at Bridgetown airport',['Car booked at Bridgetown airport']),
    field('Workshop date and place','7 June 2027, Trade Centre',['Trade Centre on 7 June 2027']),
    field('Workshop time','9:00 a.m.–4:00 p.m.',['9 am to 4 pm','09:00 to 16:00']),
    field('Return flight','CJ205, 8 June 2027, 12 noon',['CJ205 on 8 June 2027 at noon','CJ205 8 June 2027 12:00 pm'])
   ],{answerType:'document',guidance:'Use the local times supplied. Do not add a time-zone conversion to an itinerary that already states local times.'})
  ]),
 question(4,'Recruitment and an appointment letter',[7],
  'Harbour View Services has selected Ms Mia Lewis for the post of records clerk. She will report to Mr Andre Smith, the office manager, at the Kingston office. Her start date is 5 July 2027. Her hours are Monday to Friday, 8:30 a.m.–4:30 p.m., and her basic monthly salary is J$95,000. Her employment is subject to a three-month probation period. She must return a signed acceptance by 25 June 2027.',[
   knowledge(4,'a','Identify THREE activities in the recruitment and selection process.',3,[
    'The organisation prepares a job description and person specification.',
    'The vacancy is advertised to suitable applicants.',
    'Applications are screened against the stated selection criteria.',
    'Shortlisted applicants are interviewed or tested.',
    'References are checked before a final appointment is confirmed.'
   ]),
   knowledge(4,'b','State THREE benefits of an induction programme for a new employee.',3,[
    'Induction helps the new employee understand the duties of the job.',
    'Induction explains the organisation’s rules and safety procedures.',
    'Induction introduces the employee to colleagues and reporting relationships.',
    'Induction can reduce uncertainty and help the employee settle into the organisation.'
   ]),
   application(4,'c','Prepare the main information for the appointment letter. Use these NINE labels: Employee; Post; Supervisor; Workplace; Start date; Working hours; Monthly salary; Probation; Acceptance deadline.',[
    field('Employee','Ms Mia Lewis',['Mia Lewis']),field('Post','Records clerk'),
    field('Supervisor','Mr Andre Smith, office manager',['Andre Smith, office manager']),field('Workplace','Kingston office'),
    field('Start date','5 July 2027'),field('Working hours','Monday to Friday, 8:30 a.m.–4:30 p.m.',['Monday–Friday 08:30–16:30','Monday to Friday 8:30 am to 4:30 pm']),
    numeric('Monthly salary',95000),field('Probation','Three months',['3 months']),field('Acceptance deadline','25 June 2027')
   ],{answerType:'document'})
  ]),
 question(5,'Payment controls and payroll',[8,9],
  'A weekly paid employee works 40 ordinary hours at J$120 per hour and 5 overtime hours at one-and-a-half times the ordinary rate. The deductions are income tax J$420, pension J$250 and other authorised deductions J$230. In this practice calculation use ONLY these deductions; no tax rate needs to be researched.',[
   knowledge(5,'a','State the purpose of a purchase requisition, a purchase order and a supplier invoice.',3,[
    'A purchase requisition asks the purchasing department to obtain goods needed by another department.',
    'A purchase order tells a supplier which goods the business agrees to purchase.',
    'A supplier invoice requests payment for goods supplied and shows the amount due.'
   ]),
   knowledge(5,'b','Outline THREE controls that help prevent incorrect or unauthorised payments.',3,paymentControls),
   application(5,'c','Complete the payroll calculation. Use these NINE labels: Ordinary pay; Overtime hourly rate; Overtime pay; Gross pay; Income tax; Pension; Other deductions; Total deductions; Net pay. Show your working.',[
    numeric('Ordinary pay',4800,'J$',['Basic pay']),numeric('Overtime hourly rate',180),numeric('Overtime pay',900),
    numeric('Gross pay',5700),numeric('Income tax',420),numeric('Pension',250),numeric('Other deductions',230),numeric('Total deductions',900),numeric('Net pay',4800)
   ],{answerType:'document',guidance:'Ordinary pay is 40 × 120. The overtime hourly rate is 120 × 1.5. Net pay is gross pay less the total stated deductions.'})
  ]),
 question(6,'Customer service and dispatch',[9,10,11],
  'Coral Stationery supplies Harbour View Services. Order 417 was for 12 boxes of A4 paper. On 19 May 2027 the delivery driver brings only 10 boxes. Delivery note DN086 shows 12 boxes. Mr Leon Brown checks the delivery, records the difference and contacts the supplier. The company’s approved delivery location is 24 Harbour Road, Kingston. The receiving clerk is Ms Ann Blake.',[
   knowledge(6,'a','State THREE actions that help a customer service clerk handle a complaint professionally.',3,[
    'The clerk listens carefully without interrupting the customer.',
    'The clerk confirms the facts and records the complaint accurately.',
    'The clerk explains a realistic next step or refers the matter to an authorised officer.',
    'The clerk remains courteous and avoids blaming the customer.',
    'The clerk follows up to check whether the agreed action has been completed.'
   ]),
   knowledge(6,'b','State the purpose of a delivery note, a goods received note and a consignment note.',3,[
    'A delivery note lists the goods sent by the supplier with the delivery.',
    'A goods received note records the goods actually received and checked by the buyer.',
    'A consignment note gives the carrier details of goods accepted for transport.'
   ]),
   application(6,'c','Prepare the goods received record using these NINE labels: Date; Supplier; Purchase order; Delivery note; Item; Quantity ordered; Quantity received; Difference and action; Checked by.',[
    field('Date','19 May 2027'),field('Supplier','Coral Stationery'),field('Purchase order','417',['Order 417','PO417']),
    field('Delivery note','DN086'),field('Item','Boxes of A4 paper',['A4 paper boxes']),numeric('Quantity ordered',12,'',[]),numeric('Quantity received',10,'',[]),
    field('Difference and action','2 boxes short; record the shortage and notify the supplier.',['Shortage of 2 boxes; contact Coral Stationery.']),
    field('Checked by','Ms Ann Blake',['Ann Blake'])
   ],{answerType:'document',guidance:'Record what was actually received. Signing for 12 boxes when only 10 arrived would make the record unreliable.'})
  ])
]));
originals.push(paper(2,'Mangrove Health Supplies — Office Administration Paper 2',[
 question(1,'Workplace safety and reception',[1,2],
  'Mangrove Health Supplies employs a receptionist, a storekeeper and three sales clerks. The reception area has trailing electrical cables, a fire exit partly blocked by cartons and a computer screen that reflects strong sunlight. At 9:15 a.m. on 16 August 2027, Mr Noel Clarke of Island Clinics arrives for his confirmed 9:30 a.m. appointment with Ms Eva Grant. He has come to discuss the renewal of the supply contract. The receptionist checks his photo identification, issues visitor badge V12 and asks him to wait in Reception while Ms Grant is informed.',[
   knowledge(1,'a','Identify FOUR practices that help employees work safely and comfortably at a computer workstation.',4,[
    'The chair should support the lower back and allow the feet to rest comfortably.',
    'The screen should be positioned to reduce glare and allow a comfortable viewing distance.',
    'Electrical cables should be secured to prevent a trip hazard.',
    'The keyboard and mouse should be positioned to avoid unnecessary strain on the wrists.',
    'Employees should take suitable breaks from continuous screen work.',
    'Lighting should allow the employee to read without strain.'
   ]),
   knowledge(1,'b','Outline FOUR responsibilities of a receptionist when receiving a visitor.',4,[
    'The receptionist greets the visitor courteously and asks the purpose of the visit.',
    'The receptionist checks the appointment and contacts the person being visited.',
    'The receptionist records the visitor’s details according to the security procedure.',
    'The receptionist directs the visitor to a suitable waiting area or authorised colleague.',
    'The receptionist protects confidential information while dealing with the visitor.'
   ]),
   application(1,'c','Complete the visitor register entry using these SEVEN labels: Date; Arrival time; Visitor; Organisation; Host and appointment; Purpose; Badge and waiting area.',[
    field('Date','16 August 2027'),field('Arrival time','9:15 a.m.',['9:15 am','09:15']),field('Visitor','Mr Noel Clarke',['Noel Clarke']),field('Organisation','Island Clinics'),
    field('Host and appointment','Ms Eva Grant, 9:30 a.m.',['Eva Grant at 9:30 am','Eva Grant 09:30']),field('Purpose','Renewal of the supply contract',['Discuss supply contract renewal']),field('Badge and waiting area','V12, Reception',['Badge V12; wait in Reception'])
   ],{answerType:'document'})
  ]),
 question(2,'A written message and effective meetings',[3,4],
  'A stock-review meeting is planned for 23 August 2027 at 10:00 a.m. in Conference Room B. Ms Eva Grant will chair it. The notice must ask department supervisors to bring a list of items that reached their reorder level during August. The purpose is to agree an urgent purchasing list. Mr Noel Clarke will attend online using the link already sent separately.',[
   knowledge(2,'a','Identify THREE factors to consider when choosing a method of business communication.',3,[
    'The urgency of the message affects how quickly the method must deliver it.',
    'The need for a written record affects whether the method should produce a traceable document.',
    'The confidentiality of the information affects how securely the method should deliver it.',
    'The ability of the recipient to access the method should be considered.',
    'The cost and available resources should be considered.'
   ]),
   knowledge(2,'b','State FOUR duties of the meeting secretary before a meeting begins.',4,[
    'The secretary arranges a suitable venue or online meeting facility.',
    'The secretary prepares and circulates the notice of meeting.',
    'The secretary prepares the agenda with the chair.',
    'The secretary distributes relevant papers to members in time to prepare.',
    'The secretary checks that the necessary equipment and seating are ready.'
   ]),
   application(2,'c','Prepare an internal meeting notice. Use these EIGHT labels: To; Meeting; Date; Time; Venue; Chair; Purpose; Preparation.',[
    field('To','Department supervisors'),field('Meeting','Stock-review meeting',['Stock review meeting']),field('Date','23 August 2027'),field('Time','10:00 a.m.',['10 am','10:00']),
    field('Venue','Conference Room B'),field('Chair','Ms Eva Grant',['Eva Grant']),field('Purpose','Agree an urgent purchasing list',['Agree the urgent purchase list']),
    field('Preparation','Bring a list of items that reached their reorder level during August.',['Bring the August list of items at their reorder level.'])
   ],{answerType:'document'})
  ]),
 question(3,'Records, confidentiality and travel',[5,6],
  'The accounts supervisor is attending a training course at Sea View Conference Centre in Castries on 12 October 2027. Finance has a digital travel folder containing booking confirmations and a passport scan. Only the traveller, the authorised travel clerk and the finance supervisor should have access. Paper invoices must be kept for the period in the organisation’s approved retention schedule; no retention period is given in this question.',[
   knowledge(3,'a','Identify THREE details to confirm before making a business hotel reservation.',3,[
    'The arrival and departure dates should be confirmed.',
    'The required type of room and number of guests should be confirmed.',
    'The room rate and what it includes should be confirmed.',
    'The cancellation conditions and payment method should be confirmed.',
    'The location should be checked against the traveller’s business venue.'
   ]),
   knowledge(3,'b','Outline FOUR controls that help protect confidential digital records.',4,[
    'Access rights should be limited to authorised employees.',
    'Each user should use a secure individual account rather than sharing passwords.',
    'Records should be backed up securely and recovery should be tested.',
    'Sensitive records should be encrypted when stored or transmitted where appropriate.',
    'Access should be reviewed when an employee changes duties or leaves.'
   ]),
   application(3,'c','Prepare a record-control note using these EIGHT labels: Folder; Access group; Account rule; Sharing rule; Backup; Paper invoices; Review trigger; Disposal.',[
    field('Folder','Digital travel folder'),field('Access group','Traveller, authorised travel clerk and finance supervisor',['The traveller; authorised travel clerk; finance supervisor']),
    field('Account rule','Use individual secure accounts; do not share passwords.',['Individual accounts with no password sharing.']),
    field('Sharing rule','Do not send the passport scan to unauthorised people.',['Share the passport scan only with authorised recipients.']),
    field('Backup','Keep a secure backup and test recovery.',['Secure backup with a recovery test.']),
    field('Paper invoices','Keep for the period in the approved retention schedule.',['Retain paper invoices according to the approved retention schedule.']),
    field('Review trigger','Review access when duties change or an employee leaves.',['Review access after a role change or departure.']),
    field('Disposal','Securely destroy records only when authorised after retention requirements are met.',['Use authorised secure disposal after the retention period.'])
   ],{answerType:'document',guidance:'Do not invent a legal retention period. Use the organisation’s approved schedule and check any applicable legal hold before disposal.'})
  ]),
 question(4,'Personnel records and staff development',[7],
  'Ms Imani Ross is the new inventory clerk at Mangrove Health Supplies. The personnel officer records her employee number E027, department Stores, supervisor Mr Joel Francis and start date 1 September 2027. She is enrolled in training on the stock system for 6 September, 9:00 a.m.–12 noon, in Computer Room A. The trainer is Ms Eva Grant. Imani must bring her staff identification card.',[
   knowledge(4,'a','Identify THREE items normally kept in an employee’s personnel record.',3,[
    'The record normally includes the employee’s contact details.',
    'The record normally includes the employment contract or appointment letter.',
    'The record normally includes the employee’s qualifications and training history.',
    'The record normally includes authorised leave and attendance information.',
    'The record normally includes relevant performance appraisal records.'
   ]),
   knowledge(4,'b','State THREE benefits of staff training to the organisation.',3,[
    'Training can improve the accuracy and quality of employees’ work.',
    'Training can help employees use new equipment or systems effectively.',
    'Training can improve productivity and reduce avoidable errors.',
    'Training can prepare employees for additional responsibilities.',
    'Training can improve awareness of safe working procedures.'
   ]),
   application(4,'c','Prepare the training attendance record using these NINE labels: Employee; Employee number; Department; Supervisor; Course; Date; Time; Venue; Trainer and item to bring.',[
    field('Employee','Ms Imani Ross',['Imani Ross']),field('Employee number','E027'),field('Department','Stores'),field('Supervisor','Mr Joel Francis',['Joel Francis']),
    field('Course','Stock system training',['Training on the stock system']),field('Date','6 September 2027'),field('Time','9:00 a.m.–12 noon',['9 am to noon','09:00–12:00']),field('Venue','Computer Room A'),
    field('Trainer and item to bring','Ms Eva Grant; staff identification card.',['Eva Grant; staff ID card'])
   ],{answerType:'document'})
  ]),
 question(5,'Supplier accounts and an invoice calculation',[8,9],
  'Mangrove orders 150 packs of labels at J$180 per pack. The supplier allows a 10% trade discount on the goods value. Delivery costs J$1,800 after discount. No tax applies in this exercise. Mangrove has paid J$20,000 as a deposit. Calculate only from this information.',[
   knowledge(5,'a','Identify THREE sources of information used to check a supplier’s invoice.',3,[
    'The purchase order provides the authorised quantities and agreed prices.',
    'The goods received note provides the quantities actually received and checked.',
    'The supplier’s quotation or contract provides the agreed terms and discount.',
    'An authorised delivery note can help confirm the goods supplied.'
   ]),
   knowledge(5,'b','Distinguish between a trade discount, a cash discount and a credit note.',3,[
    'A trade discount reduces the list price of goods before the invoice total is calculated.',
    'A cash discount is a reduction offered for payment within the stated period.',
    'A credit note reduces the amount owed on a customer or supplier account.'
   ]),
   application(5,'c','Complete the invoice calculation using these NINE labels: Quantity; Unit price; Goods value; Trade discount; Goods after discount; Delivery; Invoice total; Deposit; Balance due. Show your working.',[
    numeric('Quantity',150,''),numeric('Unit price',180),numeric('Goods value',27000),numeric('Trade discount',2700),numeric('Goods after discount',24300),numeric('Delivery',1800),numeric('Invoice total',26100),numeric('Deposit',20000),numeric('Balance due',6100)
   ],{answerType:'document',guidance:'Trade discount is 10% of J$27,000. Add delivery after deducting the trade discount, then subtract the deposit from the invoice total.'})
  ]),
 question(6,'Stock control and customer follow-up',[9,10,11],
  'The stock card for item L150, label packs, shows an opening balance of 140 packs on 1 August. On 3 August, 80 packs are received. On 5 August, 60 packs are issued. On 8 August, 40 packs are issued. On 10 August, 40 packs are received. The reorder level is 130 packs. Record a reorder alert whenever the closing balance falls below this level. The supplier lead time is four days.',[
   knowledge(6,'a','Explain the meaning of stock balance, reorder level and lead time.',3,[
    'The stock balance is the quantity of an item held after receipts and issues are recorded.',
    'The reorder level is the stock quantity that triggers action to order more stock.',
    'Lead time is the time between placing an order and receiving the goods.'
   ]),
   knowledge(6,'b','State THREE actions that help ensure a customer receives an order correctly.',3,[
    'The dispatch clerk checks the item and quantity against the authorised order.',
    'The goods are packed and labelled suitably for the destination and transport method.',
    'The delivery address and carrier details are checked before dispatch.',
    'The dispatch documents are completed and a delivery or collection record is retained.',
    'The customer is told about a confirmed delay or shortage promptly.'
   ]),
   application(6,'c','Complete the stock-control record using these NINE labels: Item; Opening balance; Balance 3 August; Balance 5 August; Balance 8 August; Balance 10 August; Reorder alert date; Reorder level; Lead time.',[
    field('Item','L150, label packs',['Label packs L150']),numeric('Opening balance',140,''),numeric('Balance 3 August',220,''),numeric('Balance 5 August',160,''),numeric('Balance 8 August',120,''),numeric('Balance 10 August',160,''),field('Reorder alert date','8 August',['8 August 2027']),numeric('Reorder level',130,''),numeric('Lead time',4,' days')
   ],{answerType:'document',guidance:'Add receipts and subtract issues in date order. The 8 August balance is below the reorder level; the later receipt does not erase the earlier alert.'})
  ])
]));
originals.push(paper(3,'Windward Learning Cooperative — Office Administration Paper 2',[
 question(1,'Organisation and professional conduct',[1,2],
  'Windward Learning Cooperative is introducing shared online calendars. Its office assistant, Ms Sara King, takes a telephone message for Mr David Bell. At 11:40 a.m. on 4 November 2027, Mr Peter Hall of Eastern Printing calls on 758-555-0186. He needs approval of brochure proof B62 by 2:00 p.m. today so that printing can start tomorrow. He asks Mr Bell to reply by telephone. Sara reads back the reference and deadline to confirm them.',[
   knowledge(1,'a','State FOUR characteristics of a professional office employee.',4,[
    'The employee arrives on time and meets agreed work deadlines.',
    'The employee handles confidential information responsibly.',
    'The employee communicates courteously with colleagues and customers.',
    'The employee takes responsibility for accurate work and corrects errors honestly.',
    'The employee follows lawful organisational rules and procedures.',
    'The employee cooperates with others and treats them respectfully.'
   ]),
   knowledge(1,'b','State FOUR benefits of an organisation chart to an office employee.',4,[
    'The chart shows the reporting relationship between employees and supervisors.',
    'The chart shows the departments or sections within the organisation.',
    'The chart helps the employee identify the proper line of communication.',
    'The chart shows levels of authority and responsibility.',
    'The chart helps the employee identify colleagues with relevant responsibilities.'
   ]),
   application(1,'c','Prepare the telephone message using these SEVEN labels: Date and time; To; Caller; Organisation; Telephone; Message; Action required.',[
    field('Date and time','4 November 2027, 11:40 a.m.',['4 November 2027 11:40 am']),field('To','Mr David Bell',['David Bell','Mr Bell']),field('Caller','Mr Peter Hall',['Peter Hall']),field('Organisation','Eastern Printing'),field('Telephone','758-555-0186',['7585550186']),
    field('Message','Brochure proof B62 needs approval so printing can start tomorrow.',['Approval is needed for brochure proof B62 before printing tomorrow.']),
    field('Action required','Telephone Mr Hall by 2:00 p.m. today.',['Call Peter Hall by 2 pm on 4 November 2027.','Call Mr Hall by 14:00 today.'])
   ],{answerType:'document'})
  ]),
 question(2,'Meeting procedure and action minutes',[3,4],
  'At the training committee meeting on 8 November 2027, chaired by Ms Leila Henry in Room 2, members approved the previous minutes without amendment. They agreed to hold a customer-service workshop on 26 November. Mr David Bell will obtain two venue quotations by 12 November. Ms Sara King will circulate the registration form by 15 November. The next meeting was set for 18 November at 10:00 a.m. The secretary must record decisions and responsibilities rather than a word-for-word transcript.',[
   knowledge(2,'a','Explain the meaning of a quorum, a motion and a resolution.',3,[
    'A quorum is the minimum number of eligible members required for a valid meeting.',
    'A motion is a formal proposal put to a meeting for consideration.',
    'A resolution is a decision formally adopted by a meeting.'
   ]),
   knowledge(2,'b','State FOUR duties of a chairperson during a meeting.',4,[
    'The chairperson follows the agenda and keeps discussion relevant.',
    'The chairperson gives eligible members a fair opportunity to contribute.',
    'The chairperson maintains order and applies the meeting rules.',
    'The chairperson clarifies motions and announces the result of decisions.',
    'The chairperson manages the available meeting time.'
   ]),
   application(2,'c','Prepare the action minutes using these EIGHT labels: Committee; Date and venue; Chair; Previous minutes; Workshop decision; Venue quotations; Registration form; Next meeting.',[
    field('Committee','Training committee'),field('Date and venue','8 November 2027, Room 2',['Room 2, 8 November 2027']),field('Chair','Ms Leila Henry',['Leila Henry']),field('Previous minutes','Approved without amendment',['Previous minutes approved with no changes']),
    field('Workshop decision','Customer-service workshop on 26 November 2027',['Hold a customer service workshop on 26 November 2027']),
    field('Venue quotations','Mr David Bell to obtain two quotations by 12 November.',['David Bell: obtain 2 venue quotations by 12 November 2027.']),
    field('Registration form','Ms Sara King to circulate it by 15 November.',['Sara King: circulate registration form by 15 November 2027.']),
    field('Next meeting','18 November 2027, 10:00 a.m.',['18 November 2027 at 10 am','18 November 2027 10:00'])
   ],{answerType:'document'})
  ]),
 question(3,'Filing and travel preparation',[5,6],
  'The cooperative’s alphabetical correspondence file contains these names exactly as indexed: Brown, Alice; Browne, Carl; Brown, Aaron; Clarke, Denise. The filing rule is surname first, then first name, letter by letter. Mr David Bell will travel for a workshop. His passport must be checked against the destination’s entry requirements and his hotel reservation must be confirmed in writing.',[
   knowledge(3,'a','State THREE advantages of keeping an up-to-date business travel itinerary.',3,[
    'An itinerary gives the traveller the sequence and timing of the planned journey.',
    'An itinerary helps the office contact the traveller or locate the relevant booking.',
    'An itinerary helps identify gaps or clashes between travel and business appointments.',
    'An itinerary provides a record for checking reservations and making agreed changes.'
   ]),
   knowledge(3,'b','Identify FOUR features of an effective filing system.',4,[
    'The system should allow authorised users to retrieve records quickly.',
    'The classification and indexing rules should be clear and consistent.',
    'The system should protect records against unauthorised access or loss.',
    'The system should be capable of expanding as the number of records grows.',
    'The system should suit the types of records and the needs of users.'
   ]),
   application(3,'c','Complete the filing and travel checklist using these EIGHT labels: First file; Second file; Third file; Fourth file; Passport check; Hotel confirmation; Itinerary copy; Change control.',[
    field('First file','Brown, Aaron'),field('Second file','Brown, Alice'),field('Third file','Browne, Carl'),field('Fourth file','Clarke, Denise'),
    field('Passport check','Check passport validity against the destination’s entry requirements.',['Check passport validity and destination entry requirements.']),
    field('Hotel confirmation','Obtain written confirmation of the hotel reservation.',['Confirm the hotel booking in writing.']),
    field('Itinerary copy','Give the traveller and the authorised office contact the current itinerary.',['Provide the current itinerary to the traveller and authorised office contact.']),
    field('Change control','Update the itinerary and notify the traveller and relevant office contact after an agreed change.',['Record agreed changes and send the updated itinerary to the traveller and office contact.'])
   ],{answerType:'document'})
  ]),
 question(4,'Human resources and an incident record',[7],
  'At 2:10 p.m. on 10 November 2027, office assistant Joel Reed trips over a loose cable beside the printer in Room 3. He reports pain in his left ankle. Ms Sara King witnesses the incident, calls the designated first-aider and informs the supervisor, Ms Leila Henry. The area is isolated to prevent another fall. A maintenance request is raised to secure the cable. Record observed facts; do not invent a medical diagnosis.',[
   knowledge(4,'a','State THREE reasons for keeping accurate attendance and leave records.',3,[
    'The records support correct pay and authorised leave calculations.',
    'The records help the organisation plan staffing and cover absences.',
    'The records provide evidence when attendance patterns need to be discussed.',
    'The records support fair and consistent application of leave procedures.'
   ]),
   knowledge(4,'b','Outline THREE appropriate actions when an employee is injured at work.',3,[
    'The employee should receive appropriate help from the designated first-aider or emergency services.',
    'The supervisor should be informed and the incident should be recorded promptly.',
    'The immediate hazard should be made safe without creating further danger.',
    'The organisation should investigate the cause and arrange appropriate corrective action.'
   ]),
   application(4,'c','Prepare the incident record using these NINE labels: Employee; Date; Time; Location; What happened; Reported injury; Witness; Immediate action; Follow-up.',[
    field('Employee','Joel Reed'),field('Date','10 November 2027'),field('Time','2:10 p.m.',['2:10 pm','14:10']),field('Location','Beside the printer in Room 3',['Room 3, beside the printer']),
    field('What happened','Tripped over a loose cable',['Joel Reed tripped over a loose cable.']),field('Reported injury','Pain in the left ankle',['Left ankle pain']),field('Witness','Ms Sara King',['Sara King']),
    field('Immediate action','Called the designated first-aider, informed Ms Henry and isolated the area.',['First-aider called; supervisor Ms Leila Henry informed; area isolated.']),field('Follow-up','Maintenance request raised to secure the cable.',['Arrange for maintenance to secure the loose cable.'])
   ],{answerType:'document',guidance:'“Left ankle pain” is the reported symptom. “Broken ankle” would add an unsupported diagnosis.'})
  ]),
 question(5,'Accounts and a workshop budget',[8,9],
  'The cooperative budgets for a workshop attended by 40 paying participants. Each participant will pay J$2,500. Room hire is J$25,000, printing is J$8,000 and the trainer’s fee is J$20,000. Refreshments cost J$700 per participant. Actual income is J$95,000 and actual total expenditure is J$84,000. No other income, costs or taxes apply.',[
   knowledge(5,'a','Explain the purpose of a budget, a receipt and a petty-cash voucher.',3,[
    'A budget sets out planned income and expenditure for a future period or activity.',
    'A receipt acknowledges that a payment has been received.',
    'A petty-cash voucher records and supports an authorised small cash payment.'
   ]),
   knowledge(5,'b','Outline THREE considerations when comparing suppliers before placing an order.',3,[
    'The quoted price and any additional delivery costs should be compared.',
    'The quality and suitability of the goods should be checked against the requirement.',
    'The delivery time and reliability of the supplier should be considered.',
    'The payment and discount terms should be compared.',
    'Relevant warranty or after-sales support should be considered.'
   ]),
   application(5,'c','Complete the budget comparison using these NINE labels: Budgeted income; Refreshments; Fixed costs; Total budgeted costs; Budgeted surplus; Actual income; Actual expenditure; Actual surplus; Surplus variance. State the variance as an amount adverse to the budget. Show working.',[
    numeric('Budgeted income',100000),numeric('Refreshments',28000),numeric('Fixed costs',53000),numeric('Total budgeted costs',81000),numeric('Budgeted surplus',19000),numeric('Actual income',95000),numeric('Actual expenditure',84000),numeric('Actual surplus',11000),{...numeric('Surplus variance',8000),qualifier:'adverse',model:'Surplus variance: J$8,000 adverse'}
   ],{answerType:'document',guidance:'Planned income is 40 × J$2,500. Fixed costs total J$53,000. The actual surplus is J$8,000 lower than the budgeted surplus, so the variance is adverse.'})
  ]),
 question(6,'Sales communication and transport records',[10,11],
  'On 15 November 2027, client Horizon Tutors reports that 6 of the 40 workshop folders delivered under order W208 have damaged covers. The complaint reference is C031. The sales supervisor authorises replacement of the six damaged folders, free of charge, for delivery on 17 November to 8 Market Street, Castries. Ms Sara King must acknowledge the complaint politely and confirm only the authorised remedy.',[
   knowledge(6,'a','Identify THREE ways in which good customer service can benefit an organisation.',3,[
    'Good service can encourage satisfied customers to return.',
    'Good service can encourage favourable recommendations to other customers.',
    'Good service can help preserve the organisation’s reputation.',
    'Good service can reduce unresolved complaints and the costs of correcting avoidable errors.'
   ]),
   knowledge(6,'b','State THREE factors to consider when selecting a method of transporting goods.',3,[
    'The urgency of the delivery and the expected journey time should be considered.',
    'The size, weight and nature of the goods should be considered.',
    'The cost of the transport service should be considered.',
    'The destination, route and availability of a reliable carrier should be considered.',
    'The need for special handling, security or insurance should be considered.'
   ]),
   application(6,'c','Prepare the complaint response record using these NINE labels: Date; To; Order; Complaint reference; Acknowledgement; Problem; Remedy; Delivery date and address; Sender.',[
    field('Date','15 November 2027'),field('To','Horizon Tutors'),field('Order','W208'),field('Complaint reference','C031'),
    field('Acknowledgement','Thank you for reporting the problem; we are sorry the folders arrived damaged.',['We acknowledge your complaint and apologise for the damaged folders.']),
    field('Problem','6 of the 40 folders have damaged covers.',['Six of forty folders have damaged covers.']),
    field('Remedy','Replace the six damaged folders free of charge.',['Six replacement folders at no charge.']),
    field('Delivery date and address','17 November 2027, 8 Market Street, Castries',['8 Market Street, Castries on 17 November 2027']),field('Sender','Ms Sara King',['Sara King'])
   ],{answerType:'document',guidance:'An unauthorised refund or replacement of all 40 folders would change the remedy. Keep the response courteous and specific.'})
  ])
]));
originals[0].questions[0].parts[1].choiceRequirements={advantage:2,disadvantage:2};
export const OA_PAPER2S=Object.freeze(originals);
export const OA_PAPER2=OA_PAPER2S[0];
export function getOaPaper2(id=OA_PAPER2.id){return OA_PAPER2S.find(p=>p.id===id)||null;}
export function oaPaper2Criteria(paperId=OA_PAPER2.id){
 const source=getOaPaper2(paperId);if(!source)throw new Error('Unknown Office Administration Paper 2');
 return source.questions.flatMap(q=>q.parts.map(p=>({id:`${source.id}-Q${q.number}::${p.id}`,maxMarks:p.marks,kind:'structured',sourceFormat:'oa-original-paper2',
  sourcePaperId:source.id,sourceQuestion:q.number,sourcePartId:p.id,sourceVersion:OA_PAPER2_BANK_VERSION,sourceMarking:{criteria:p.criteria,...(p.choiceBank?{choiceBank:p.choiceBank}:{}),...(p.choiceRequirements?{choiceRequirements:p.choiceRequirements}:{})},
  prompt:p.prompt,expectedAnswer:p.modelAnswer,rubricVersion:OA_PAPER2_RUBRIC_VERSION})));
}
export function validateOaPaper2(source){
 const issues=[];if(!source||!Array.isArray(source.questions))return {valid:false,issues:['Missing paper.']};
 if(source.durationMinutes!==120||source.totalMarks!==90||source.questions.length!==6)issues.push('Expected six compulsory questions, 90 marks and 120 minutes.');
 const ids=new Set();let allMarks=0,knowledgeMarks=0,applicationMarks=0;
 for(const [i,q]of source.questions.entries()){
  if(q.number!==i+1||q.marks!==15||q.section!==(i<3?'I':'II'))issues.push('Incorrect question structure.');
  if(q.parts.reduce((n,p)=>n+p.marks,0)!==15)issues.push('Question '+q.number+' must total 15 marks.');
  for(const p of q.parts){if(ids.has(p.id))issues.push('Duplicate part '+p.id);ids.add(p.id);
   if(!p.prompt||!p.modelAnswer||p.criteria.reduce((n,c)=>n+c.marks,0)!==p.marks)issues.push('Incomplete part '+p.id);
   if(p.profile==='Application')applicationMarks+=p.marks;else knowledgeMarks+=p.marks;
   if(p.criteria.some(c=>c.marks!==1||!c.model))issues.push('Invalid source criterion in '+p.id);
   allMarks+=p.marks;
  }
 }
 if(allMarks!==90||knowledgeMarks!==40||applicationMarks!==50)issues.push('Paper must contain 40 knowledge/comprehension marks and 50 application marks.');
 return {valid:issues.length===0,issues,totalMarks:allMarks,knowledgeMarks,applicationMarks};
}
