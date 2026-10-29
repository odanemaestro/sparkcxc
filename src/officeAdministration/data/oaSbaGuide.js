export const OA_SBA_THEMES=Object.freeze([
 {year:2025,sections:[4,7],theme:'Meetings and Human Resources Management'},
 {year:2026,sections:[2,8],theme:'Reception and Hospitality and Accounts and Financial Services'},
 {year:2027,sections:[1,3,9],theme:'Office Orientation, Communication and Procurement and Inventory Management'},
 {year:2028,sections:[5,11],theme:'Travel Arrangements and Operations, Dispatch and Transport Services'},
 {year:2029,sections:[6,10],theme:'Records and Information Management and Sales, Marketing and Customer Service'},
 {year:2030,sections:[4,9],theme:'Meetings and Procurement and Inventory Management'},
 {year:2031,sections:[1,7],theme:'Office Orientation and Human Resources Management'},
 {year:2032,sections:[2,3,5],theme:'Reception and Hospitality, Communication and Travel Arrangements'}
]);
export const OA_SBA_GUIDE=Object.freeze({
 marks:50,weightPercent:25,maximumWords:1000,reportWords:{minimum:500,maximum:750},recommendedMaximumGroupSize:6,
 sourcePdfPage:72,themePdfPage:73,criteriaPdfPages:[76,77,78,79],
 introduction:'Investigate a focused question about work carried out by entry-level office personnel. Use a real or virtual office, collect relevant evidence and explain what your findings show. Your project should answer its aims, not simply describe an organisation.',
 assessmentNote:'SPARK helps you plan and improve your work. The official SBA follows CXC’s monitored research and assessment arrangements; keep the evidence of your own investigation and follow your school’s instructions.',
 criteria:[
 {name:'Preparation',marks:13,items:['Cover page with the required candidate, school, subject and project details.','A table of contents with topics and accurate page numbers.','A clear, relevant project title.','Two clear aims linked to the investigation.','Two functions of the department being studied.','Your own business letter requesting permission to carry out the investigation.']},
 {name:'Gathering data',marks:15,items:['Identify your research instrument, explain why you selected it and how you used it, and include a specimen.','Include the exact wording of five clear questions from the instrument, linked to the project’s aims.','Keep at least 12 relevant activities in sequence in a schedule headed Date, Activity and Comment.','Reference one applicable piece of legislation by name and year, explain how you became aware of it, and record one observed health-and-safety practice and one staff rule you followed.']},
 {name:'Presentation',marks:22,items:['Write a 500–750-word report discussing relevant findings, limitations, recommendations for improving office efficiency through technology, and a conclusion. Refer to primary and secondary sources and use relevant charts.','Record four documents in a table headed Date, Document used and Purpose of document; explain their purpose and suitability.','Acknowledge your sources in an alphabetical APA-style bibliography. Include appropriate interview, publication and website details.','Present ideas in a logical order with careful grammar, spelling and appropriate graphics, and include every required component.']}
 ],
 components:['Cover page','Table of contents','Project title','A separator for each section','Two aims','Two departmental functions','Permission correspondence','Methodology and a specimen instrument','Five questions from the instrument','Schedule of activities','Regulations, health and safety, and staff rules','Report supported by relevant charts','Table of documents used','Bibliography','Appendix'],
 planningStages:[
 ['Choose the focus','Match an entry-level office problem to the examination-year theme. Keep the problem small enough to investigate.'],
 ['Write two aims','Use aims that the available evidence can answer, rather than promising to investigate every part of the business.'],
 ['Arrange access','Write your own permission request and agree what can be observed or discussed.'],
 ['Select methods','Decide whether an interview, questionnaire, observation or a combination suits each aim.'],
 ['Prepare the instrument','Write five relevant, clear questions and check that the wording does not suggest the desired answer.'],
 ['Check the plan','Use feedback to improve the scope, instrument and practical arrangements before gathering evidence.'],
 ['Gather evidence','Carry out the agreed activity and record when, how and from whom information was obtained.'],
 ['Record working practices','Note the applicable legislation, a health-and-safety practice and a staff rule actually relevant to the investigation.'],
 ['Organise documents','Record four relevant documents and their purposes. Obtain permission and remove private details from copies.'],
 ['Analyse the findings','Compare the evidence with the two aims; prepare a useful chart or table and identify limitations.'],
 ['Draft the report','Discuss the findings, realistic technology recommendations and a conclusion; keep the report within its word range.'],
 ['Review and assemble','Check the bibliography, appendix, schedule, component list, word limits and the school’s submission arrangements.']
 ],
 examples:{
  2026:{title:'How appointment information passes from reception to the accounts office in a small service business',aims:['To identify how reception records and passes payment-related visitor enquiries to accounts.','To examine two causes of delay or error in that handover and suggest a practical improvement.'],questions:['What details does reception record when a visitor asks about a payment?','How is that information passed to accounts?','How is the visitor’s identity or account reference checked?','What problems can delay a response?','What system or procedure helps staff follow up an unanswered enquiry?']},
  2027:{title:'How a small office communicates and records requests for stationery',aims:['To trace a stationery request from the requesting officer to the purchasing record.','To examine how communication and records help prevent duplicate or incorrect orders.'],questions:['How does a member of staff request stationery?','Who checks and authorises that request?','How is the approved request passed to purchasing?','What record is used to check whether the goods arrived?','What happens when an order is duplicated, late or incorrect?']}
 },
 evidenceAdvice:'Use only evidence you collected or sources you can identify. A planned interview is not a completed interview, and an example answer is not a finding. The dates and comments in your activity schedule should record what actually happened, including changes and follow-up.',
 wordAdvice:'The whole project should not exceed 1,000 words. The report within it should be 500–750 words. Keep the report focused so the aims, methods and other written components fit the overall limit. Check your school’s guidance on counting labels and supporting material.'
});
export function oaSbaTheme(year){return OA_SBA_THEMES.find(t=>t.year===Number(year))||null;}
export function oaSuggestedSbaYear(date=new Date()){const n=date.getFullYear()+(date.getMonth()>=6?1:0);return oaSbaTheme(n)?n:null;}
