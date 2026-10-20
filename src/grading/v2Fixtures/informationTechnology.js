/**
 * Source-bound Information Technology Paper 2 verification fixtures.
 *
 * Expected marks follow the registered mark scheme for each rule family, not
 * the behaviour of the grader. Where the scheme leaves an allocation open
 * ("1–2 marks", "any two ... 3 marks") the expectation is a range, and the
 * examiner must either commit inside it or abstain.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const A=answer=>({answer});

const RULES={
 router:()=>[
  F("full",A("router; connects different networks and forwards data between them"),2),
  F("equivalent",A("A router, because it routes data packets between the LAN and other networks."),2),
  F("equivalent",A("Router - it links the local networks to the internet."),2,"the Internet is another network"),
  F("equivalent",A("A router. It forwards packets from one network to another network."),2),
  F("partial",A("router"),1,"device only"),
  F("partial",A("It connects different networks together."),1,"function only, no device"),
  F("incorrect",A("switch"),0),
  F("incorrect",A("A hub connects the computers in one LAN."),0),
  F("incorrect",A("modem"),0),
  F("contradiction",A("router; it does not connect different networks"),{min:0,max:1}),
  F("competing",A("router or switch"),0),
  F("keyword-list",A("router networks forwards data connects packets"),{min:1,max:2}),
 ],
 "intranet-extranet":()=>[
  F("full",A("An intranet is a private internal network for an organisation. An extranet gives controlled access to authorised external users."),3),
  F("equivalent",A("An intranet is private to the organisation and only its internal staff can use it, whereas an extranet lets selected outsiders such as suppliers have controlled access."),3),
  F("partial",A("An intranet is a private internal network used by the organisation's staff."),1),
  F("partial",A("An intranet is private to an organisation."),1),
  F("partial",A("An extranet gives controlled access to authorised external users such as suppliers."),1),
  F("incorrect",A("An intranet is the public Internet and an extranet is a type of cable."),0),
  F("contradiction",A("An intranet is private to an organisation. An extranet does not give access to authorised external users."),{min:0,max:1}),
  F("keyword-list",A("intranet private internal extranet external users authorised controlled"),{min:0,max:3}),
 ],
 media:()=>[
  F("full",A("twisted pair; fibre-optic cable; satellite"),3),
  F("equivalent",A("coaxial cable, microwave, infrared"),3),
  F("equivalent",A("UTP cable; fiber optic; satellite link"),3),
  F("partial",A("twisted pair; fibre optic"),2),
  F("partial",A("satellite"),1),
  F("incorrect",A("router; switch; hub"),0),
  F("competing",A("twisted pair; fibre optic; satellite; satellite"),3,"repeated medium earns once"),
 ],
 "cloud-factors":()=>[
  F("full",A("security; accessibility"),2),
  F("equivalent",A("Whether the files will be secure from unauthorised access, and whether the internet connection is reliable."),2),
  F("partial",A("security"),1),
  F("incorrect",A("the colour of the files; the font used"),0),
  F("incorrect",A("cost"),0,"excluded by the question"),
 ],
 "validation-verification":()=>[
  F("full",A("Validation checks whether data follows specified rules. Verification checks whether data was entered accurately. They address different kinds of data-entry error."),3),
  F("equivalent",A("Validation checks that the data is in an acceptable format or within an allowed range, while verification checks that it was entered correctly from the source document, so each catches a different kind of error."),3),
  F("partial",A("Validation checks that data follows specified rules."),1),
  F("partial",A("Verification checks that data was entered accurately."),1),
  F("incorrect",A("Both make the computer run faster."),0),
  F("contradiction",A("Validation checks whether data follows specified rules. Verification does not check whether data was entered accurately."),{min:0,max:1}),
 ],
 phishing:()=>[
  F("full",A("phishing; verify the sender/domain; do not follow suspicious links"),5),
  F("equivalent",A("This is a phishing attack. Staff should check the sender's email domain and should never share their password through an email link."),5),
  F("equivalent",A("It is social engineering. Do not click the suspicious link, and report the message to the IT administrator."),5),
  F("partial",A("phishing"),1),
  F("partial",A("phishing; verify the sender"),3),
  F("partial",A("Do not click suspicious link; report the message"),4),
  F("incorrect",A("a virus; restart the computer"),0),
  F("competing",A("phishing; check the sender; check the sender"),3,"one precaution stated twice"),
 ],
 "data-information":()=>[
  F("full",A("Data is raw facts or values. Information is processed data with meaning, for example the spreadsheet total calculated from the quantity and price."),3),
  F("equivalent",A("Data is unprocessed facts such as the quantities typed into the spreadsheet cells; information is organised data that has meaning, such as the total cost the formula produces."),3),
  F("partial",A("Data is raw facts."),1),
  F("partial",A("Data is raw facts and information is processed data with meaning."),2),
  F("incorrect",A("Data and information mean exactly the same thing."),0),
  F("contradiction",A("Data is raw facts. Information is not processed data."),{min:0,max:1}),
 ],
 reliability:()=>[
  F("full",A("authenticity; currency"),2),
  F("equivalent",A("Whether the author is a credible source, and whether the information is up to date."),2),
  F("equivalent",A("relevance and bias"),2),
  F("partial",A("currency"),1),
  F("incorrect",A("how colourful the website is; how many pictures it has"),0),
 ],
 "software-examples":()=>[
  F("full",A("operating system; utility software; word processor application software"),3),
  F("equivalent",A("Windows and Linux are system software; Microsoft Excel spreadsheet is application software."),3,"two distinct operating systems are two examples"),
  F("equivalent",A("System software: antivirus utility, operating system. Application software: payroll package."),3),
  F("partial",A("operating system; word processor"),2),
  F("partial",A("operating system"),1),
  F("incorrect",A("keyboard; monitor; printer"),0),
 ],
 "ram-storage":()=>[
  F("full",A("RAM is temporary volatile working memory. Secondary storage is long-term non-volatile storage, so the two are used for different purposes."),3),
  F("equivalent",A("RAM is volatile memory that holds currently used data while programs run, but secondary storage such as a hard disk keeps data permanently even when the power is off."),3),
  F("partial",A("RAM is temporary volatile memory."),1),
  F("incorrect",A("RAM is a type of printer."),0),
  F("contradiction",A("RAM is not volatile. Secondary storage is long-term non-volatile storage."),{min:0,max:1}),
 ],
 "ipos-stages":()=>[
  F("full",A("Input; Processing; Output; Storage"),4),
  F("equivalent",A("data is input, then processed, then output, and saved to storage"),4),
  F("partial",A("input, output"),2),
  F("partial",A("input; processing; output"),3),
  F("incorrect",A("monitor; keyboard; mouse; printer"),0),
  F("competing",A("input; input; input; input"),1,"one stage repeated"),
 ],
 "formula-d2-total":()=>formula("=B2*C2",2,["=C2*B2","=PRODUCT(B2,C2)","= b2 * c2","=(B2*C2)"],["=B2+C2","=B2*C3","=SUM(B2:C2)"]),
 "formula-revenue":()=>formula("=B2*C2",2,["=C2*B2","=PRODUCT(B2,C2)","=b2*c2"],["=B2+C2","=B3*C3"]),
 "sum-d4":()=>formula("=SUM(D2:D3)",3,["=D2+D3","=SUM(D2,D3)","=sum(d2:d3)","=SUM(D3:D2)"],["=SUM(D2:D4)","=D2*D3","=AVERAGE(D2:D3)"]),
 "sum-revenue":()=>formula("=SUM(D2:D3)",2,["=D2+D3","=SUM(D2,D3)","=sum(d2:d3)"],["=SUM(D2:D4)","=D2-D3"]),
 "formula-tax":()=>formula("=D2*$F$2",3,["=$F$2*D2","=d2*$f$2","=PRODUCT(D2,$F$2)"],["=D2*F2","=D2*F$2x","=D2+$F$2"]),
 query:()=>[
  F("full",A("Parish='Kingston' AND Status='Active'"),3),
  F("equivalent",A("Status = \"Active\" AND Parish = \"Kingston\""),3),
  F("equivalent",A("parish='Kingston' and status='Active'"),3),
  F("incorrect",A("Parish='Kingston' OR Status='Active'"),0),
  F("incorrect",A("Parish='Kingston'"),0),
  F("competing",A("Parish='Kingston' AND Status='Inactive'"),0),
  F("partial",A("Parish='Kingston' AND Status='Active' AND Name='X'"),0,"an extra condition selects different records"),
 ],
 "database-form":()=>[
  F("full",A("Form. It provides easier and more controlled data entry."),3),
  F("equivalent",A("A form, because it gives a clearer interface for entering one record at a time and reduces entry errors."),3),
  F("partial",A("form"),1),
  F("incorrect",A("report"),0),
  F("incorrect",A("A query, because it gives information about the data."),0,"'information' must not count as 'form'"),
  F("competing",A("form or report"),{min:0,max:1}),
 ],
 "report-features":()=>[
  F("full",A("sorting; grouping; SUM"),4),
  F("equivalent",A("Records can be grouped by parish, sorted by date, and an average amount shown in the report footer."),4),
  F("partial",A("sorting"),{min:1,max:2}),
  F("incorrect",A("a password; a virus scan"),0),
 ],
 "primary-importance":()=>[
  F("full",A("A primary key uniquely identifies each record, helps prevent duplicate/ambiguous records and supports relationships and retrieval."),4),
  F("equivalent",A("It is a unique identifier for every record, so duplicates are prevented and it links tables together in relationships."),4),
  F("partial",A("It uniquely identifies each record."),2),
  F("incorrect",A("It makes the table look neat."),0),
  F("contradiction",A("A primary key does not uniquely identify each record."),0),
 ],
 "algorithm-characteristics":()=>[
  F("full",A("finite, so the algorithm must eventually terminate; unambiguous, so every step is clear"),4),
  F("equivalent",A("It must be precise and it must be finite, which means it stops after a finite number of steps."),4),
  F("partial",A("finite; precise"),2,"two characteristics, no explanation"),
  F("partial",A("finite"),1),
  F("incorrect",A("It must be written in Python; it must be long."),0),
 ],
 "trace-table":()=>[
  F("full",A("Choose selected test data, step through each pass of the algorithm recording the changing variable values, follow each decision, and compare the actual result with the expected result to identify logic errors."),4),
  F("equivalent",A("Pick sample input values, then dry run the algorithm line by line, writing down the value of each variable as it changes and following which branch is taken; if the final output differs from the expected output there is a logic error."),4),
  F("partial",A("Use a dry run to step through each pass of the algorithm, record the changing variable values and check the logic to identify errors."),3,"no test data selected"),
  F("partial",A("Record the variable values step by step."),1),
  F("incorrect",A("Compile the program and print it."),0),
 ],
 "syntax-logic":()=>[
  F("full",A("A syntax error breaks the rules of the programming language. A logic error allows the program to run but produces the wrong result."),3),
  F("equivalent",A("A syntax error is a statement that violates the language rules so the program will not translate; a logic error means the program still runs but gives an incorrect result."),3),
  F("partial",A("A syntax error breaks the rules of the language."),{min:1,max:2}),
  F("incorrect",A("A syntax error is a hardware fault and a logic error is a virus."),0),
  F("contradiction",A("A syntax error breaks the language rules. A logic error does not let the program run."),{min:0,max:2}),
 ],
 documentation:()=>[
  F("full",A("meaningful variable names; useful comments; indentation"),3),
  F("equivalent",A("descriptive variable names, comments explaining each section, and white space between blocks"),3),
  F("partial",A("comments"),1),
  F("incorrect",A("a user manual; a printed help guide; a video"),0),
 ],
 references:()=>[
  F("full",A("A relative reference changes when copied, while an absolute reference such as $F$2 remains fixed."),3),
  F("equivalent",A("When a formula is copied a relative reference like A1 adjusts when copied, whereas an absolute reference like $A$1 stays fixed."),3),
  F("partial",A("A relative reference changes when copied."),1),
  F("incorrect",A("A relative reference is in another workbook."),0),
  F("contradiction",A("A relative reference changes when copied. An absolute reference also changes when copied."),{min:0,max:1}),
 ],
 "filter-sort":()=>[
  F("full",A("Filter displays only matching records; Sort arranges the records into the required order."),3),
  F("equivalent",A("Use the filter feature to show only the matching rows, then use sorting to put them in order."),3),
  F("partial",A("filter"),{min:1,max:2}),
  F("incorrect",A("pivot chart; mail merge"),0),
 ],
 pivot:()=>[
  F("full",A("Pivot table. It creates a quick grouped summary and reorganises a large dataset without rewriting the source data."),4),
  F("equivalent",A("A pivot table, because it quickly summarises large data by month and branch."),4),
  F("partial",A("pivot table"),2),
  F("incorrect",A("bar chart"),0),
 ],
 "line-chart":()=>[
  F("full",A("Line graph, because it shows change or trend over time."),4),
  F("equivalent",A("A line chart, since it shows how revenue changes over time from month to month."),4),
  F("partial",A("line graph"),2),
  F("incorrect",A("pie chart, because it shows parts of a whole"),0),
 ],
 "linked-worksheets":()=>[
  F("full",A("Linked values update when source data changes, avoiding retyping and reducing duplication/errors."),4),
  F("equivalent",A("The summary automatically updates whenever the source data changes, and it avoids retyping so there are fewer transcription errors."),4),
  F("partial",A("Linked values update when source data changes."),2),
  F("partial",A("It avoids retyping the totals, which reduces errors."),2),
  F("incorrect",A("It makes the worksheet colourful."),0),
  F("contradiction",A("Linked values do not update when source data changes."),0),
 ],
 "website-planning":()=>[
  F("full",A("purpose; intended audience"),2),
  F("equivalent",A("the layout of the pages and the content to include"),2),
  F("partial",A("purpose"),1),
  F("incorrect",A("which printer to buy; the colour of the router"),0),
 ],
 hyperlinks:()=>[
  F("full",A("link to another page; email address"),2),
  F("equivalent",A("a link to a bookmark on the same page, and a mailto link"),2),
  F("partial",A("email link"),1),
  F("incorrect",A("bold text; italics"),0),
 ],
 "website-test":()=>[
  F("full",A("correct and test the broken Registration link; retest navigation with a test audience"),3),
  F("equivalent",A("Repair the link so it points to the correct page, then test all links and check the content displays correctly before publishing."),3),
  F("partial",A("fix the broken link"),{min:1,max:2}),
  F("incorrect",A("delete the website"),0),
 ],
 "mail-merge":()=>[
  F("full",A("Mail merge uses a main/primary document together with a data source or recipient list."),3),
  F("equivalent",A("Mail merge: the standard letter is merged with a list of recipients."),3),
  F("partial",A("mail merge"),2),
  F("incorrect",A("track changes"),0),
 ],
 "content-controls":()=>[
  F("full",A("text box; date picker"),3),
  F("equivalent",A("a drop-down list and a check box"),3),
  F("partial",A("text box"),{min:1,max:2}),
  F("incorrect",A("bold; underline"),0),
 ],
 "review-features":()=>[
  F("full",A("spelling and grammar check; comments; track changes"),4),
  F("equivalent",A("use the thesaurus, insert comments and turn on track changes"),4),
  F("partial",A("spell check"),{min:1,max:2}),
  F("incorrect",A("print preview; save as PDF; close"),0),
 ],
 toc:()=>[
  F("full",A("Apply heading styles/levels, then generate or update the automatic table of contents from those headings."),4),
  F("equivalent",A("Format each title with heading styles such as Heading 1 and Heading 2, then insert an automatic table of contents, which is generated from the headings."),4),
  F("partial",A("Apply heading styles to the titles."),2),
  F("incorrect",A("Type the page numbers by hand."),0),
 ],
 "document-protection":()=>[
  F("full",A("automatic save; backup copy"),4),
  F("equivalent",A("keep a backup on a flash drive and add password protection"),4),
  F("partial",A("backup"),2),
  F("incorrect",A("print it; change the font"),0),
 ],
 "database-relationship":()=>[
  F("full",A("one-to-many; one parent record can be linked to several child records"),3),
  F("equivalent",A("It is a one to many relationship: one record in the first table is linked to many records in the second."),3),
  F("partial",A("one-to-many"),2),
  F("incorrect",A("one-to-one"),0),
  F("incorrect",A("many-to-many"),0),
  F("competing",A("one-to-many or one-to-one"),0),
 ],
};

function formula(model,marks,equivalents,wrong){
 return [
  F("full",A(model),marks),
  ...equivalents.map(x=>F("equivalent",A(x),marks)),
  ...wrong.map(x=>F("incorrect",A(x),0)),
  F("competing",A(model+" or "+wrong[0]),0),
  F("partial",A(model.slice(1)),{min:0,max:marks},"missing '=' is an examiner judgement"),
 ];
}

const MACHINE={
 supercomputer:{full:"high processing capacity; handles very large datasets",
  equivalent:"It has very fast processing using parallel processing, and it can carry out complex calculations on large data volumes.",
  partial:"high processing power",incorrect:"It is small and portable; it has a keyboard."},
 mainframe:{full:"supports many concurrent users; handles a large transaction volume",
  equivalent:"It supports multiple users at the same time and it is reliable with high availability.",
  partial:"many users",incorrect:"It fits in a pocket; it has a touch screen."},
 embedded:{full:"built into another device for a specific control task; can provide real-time control",
  equivalent:"It is embedded in the irrigation equipment and is dedicated to one specific task, using low power.",
  partial:"real-time control",incorrect:"It supports thousands of users; it prints reports."},
};

/** Paper-specific families that need the source question to build fixtures. */
function variantFixtures(rule,question,part){
 if(rule==="machine-characteristics"){
  const kind=/supercomputer/i.test(part.prompt)?"supercomputer":/mainframe/i.test(part.prompt)?"mainframe":"embedded";
  const m=MACHINE[kind];
  return [F("full",A(m.full),2),F("equivalent",A(m.equivalent),2),F("partial",A(m.partial),1),F("incorrect",A(m.incorrect),0)];
 }
 const tables=question.visual?.tables||[];
 const pk=tables[0]?.fields?.find(([,t])=>t==="PK")?.[0];
 const fk=tables[1]?.fields?.find(([,t])=>t==="FK")?.[0];
 const childPk=tables[1]?.fields?.find(([,t])=>t==="PK")?.[0];
 if(rule==="database-primary-field")return [
  F("full",A(pk),2),F("equivalent",A(`The ${pk} field`),2),
  F("equivalent",A(pk.replace(/ID$/," ID")),2),
  F("incorrect",A("Name"),0),F("incorrect",A(childPk),0),
  F("competing",A(`${pk} or Name`),0),
 ];
 if(rule==="database-foreign-field")return [
  F("full",A(fk),2),F("equivalent",A(`${fk} field`),2),
  F("incorrect",A(childPk),0),F("incorrect",A("Date"),0),
  F("competing",A(`${fk} or ${childPk}`),0),
 ];
 if(rule==="database-types")return [
  F("full",{table:{Date:"Date/Time",Amount:"Currency"}},4),
  F("equivalent",{table:{Date:"Date",Amount:"Number"}},4),
  F("equivalent",{table:{Date:"date/time",Amount:"decimal"}},4),
  F("partial",{table:{Date:"Date/Time",Amount:"Text"}},2),
  F("partial",{table:{Date:"Text",Amount:"Currency"}},2),
  F("incorrect",{table:{Date:"Text",Amount:"Text"}},0),
  F("competing",{table:{Date:"Date/Time or Text",Amount:"Currency"}},{min:2,max:2}),
 ];
 const vars=part.responseSpec?.variables||[];
 const [a,b,c]=vars;
 if(rule==="ipo")return [
  F("full",{ipo:{input:vars.join(", "),process:"calculate SCORE and compare with the threshold",output:"ACCEPT or REVIEW"}},3),
  F("equivalent",{ipo:{input:`${c}; ${a}; ${b}`,process:`SCORE = ${a} + ${b} + ${c}; compare SCORE with the threshold`,output:"display ACCEPT, otherwise display REVIEW"}},3),
  F("partial",{ipo:{input:vars.join(", "),process:"",output:""}},1),
  F("partial",{ipo:{input:`${a}, ${b}`,process:"calculate SCORE and compare with the threshold",output:"ACCEPT or REVIEW"}},2),
  F("incorrect",{ipo:{input:"name",process:"print",output:"report"}},0),
 ];
 if(rule==="pseudocode"){
  const t=part.responseSpec?.threshold;
  return [
   F("full",{pseudocode:`INPUT ${a}, ${b}, ${c}\nSCORE = ${a} + ${b} + ${c}\nIF SCORE >= ${t} THEN\n  DISPLAY ACCEPT\nELSE\n  DISPLAY REVIEW\nENDIF`},8),
   F("equivalent",{pseudocode:`READ ${a}\nREAD ${b}\nREAD ${c}\nSCORE ← ${c} + ${a} + ${b}\nIF SCORE >= ${t} THEN\n  PRINT "ACCEPT"\nELSE\n  PRINT "REVIEW"\nEND IF`},8),
   F("equivalent",{pseudocode:`START\nINPUT ${a}, ${b}, ${c}\nSCORE = (${a} + ${b} + ${c})\nIF ${t} <= SCORE THEN\n  OUTPUT ACCEPT\nOTHERWISE\n  OUTPUT REVIEW\nENDIF\nSTOP`},8),
   F("partial",{pseudocode:`INPUT ${a}, ${b}, ${c}\nSCORE = ${a} + ${b} + ${c}\nIF SCORE > ${t} THEN\n  DISPLAY ACCEPT\nELSE\n  DISPLAY REVIEW\nENDIF`},7,"strict > is the wrong threshold condition"),
   F("partial",{pseudocode:`INPUT ${a}, ${b}, ${c}\nSCORE = ${a} + ${b} + ${c}\nIF SCORE >= ${t} THEN\n  DISPLAY ACCEPT\nENDIF`},6,"no ELSE branch"),
   F("partial",{pseudocode:`INPUT ${a}, ${b}\nSCORE = ${a} + ${b}\nIF SCORE >= ${t} THEN\n  DISPLAY ACCEPT\nELSE\n  DISPLAY REVIEW\nENDIF`},{min:4,max:5},"two of three inputs; SCORE omits one value"),
   F("incorrect",{pseudocode:`DISPLAY "HELLO"`},0),
   F("contradiction",{pseudocode:`INPUT ${a}, ${b}, ${c}\nSCORE = ${a} + ${b} + ${c}\nSCORE = 0\nIF SCORE >= ${t} THEN\n  DISPLAY REVIEW\nELSE\n  DISPLAY ACCEPT\nENDIF`},{min:0,max:4},"SCORE overwritten; branches reversed"),
  ];
 }
 return null;
}

const GENERIC_IRRELEVANT=A("The weather in Kingston was sunny on Sunday afternoon.");

/**
 * Fixtures for one IT criterion. `rule`, `question` and `part` come from the
 * source-checked archive, exactly as the examiner rehydrates them.
 */
export function informationTechnologyFixtures({rule,question,part,maxMarks}){
 const curated=variantFixtures(rule,question,part)??RULES[rule]?.();
 if(!curated)return null;
 const full=curated.find(f=>f.cls==="full");
 const exact=["formula-d2-total","formula-revenue","sum-d4","sum-revenue","formula-tax","query",
  "database-primary-field","database-foreign-field","database-types","pseudocode","ipo"].includes(rule);
 const fullText=full.response.answer;
 const generated=[
  F("blank",A(""),0),
  F("irrelevant",GENERIC_IRRELEVANT,0),
  // Overloading an answer must never take it past the criterion maximum.
  F("ceiling",full.response.answer!==undefined?A(fullText+"\n"+fullText):full.response,{min:0,max:maxMarks}),
 ];
 if(!exact&&typeof fullText==="string"){
  if(!curated.some(f=>f.cls==="contradiction"))
   generated.push(F("contradiction",A(fullText+"\nIt is false that "+fullText),{min:0,max:maxMarks}));
  if(!curated.some(f=>f.cls==="keyword-list")){
   const words=[...new Set(fullText.toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/)
    .filter(w=>w.length>3&&!/^(?:that|with|from|they|when|then|this|which|because|whether|should)$/.test(w)))];
   generated.push(F("keyword-list",A(words.join(" ")),{min:0,max:maxMarks}));
  }
 }
 const kind=rule==="pseudocode"||rule==="ipo"?"program":exact?"structured":"written";
 // Formulas, query criteria and key-field names are marked all-or-nothing
 // by their schemes ("=B2*C2 or equivalent. 2 marks").
 const allOrNothing=["formula-d2-total","formula-revenue","sum-d4","sum-revenue","formula-tax","query",
  "database-primary-field","database-foreign-field"].includes(rule);
 return {kind,allOrNothing,sourceAnswer:full.response,
  alternatives:curated.filter(f=>f.cls==="equivalent").map(f=>f.response),
  fixtures:[...curated,...generated]};
}
