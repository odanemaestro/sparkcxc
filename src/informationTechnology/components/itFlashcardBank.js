import course from "../course/itCourseData.json";
import objectiveCoverage from "../course/itObjectiveCoverage.json";

function objectiveKey(item) {
  return `${item.section}.${item.objective}`;
}

export const IT_OBJECTIVE_QUESTIONS = Object.freeze({
  "Explain Information Technology": "What is Information Technology, and what does it involve?",
  "Explain major hardware components": "What are the major hardware components of a computer system, and what does each one do?",
  "Explain how hardware components interrelate": "How do the main hardware components work together when a computer processes data?",
  "Explain the role of software": "What role does software play in a computer system?",
  "Explain basic network components": "What are the basic components of a computer network, and what is the function of each one?",
  "Explain Web technology concepts": "What key Web technology concepts should you understand when using the Internet and the World Wide Web?",
  "Explain spreadsheet purpose": "What is the purpose of a spreadsheet, and when is it useful?",
  "Explain database concepts": "What are the main concepts used in a database?",
  "Explain algorithms": "What is an algorithm, and how does it help to solve a problem?",
  "Distinguish major computer-system types": "What are the differences between the major types of computer systems?",
  "Distinguish data and information": "What is the difference between data and information?",
  "Distinguish types of networks": "What are the differences between the main types of computer networks?",
  "Distinguish variables and constants": "What is the difference between a variable and a constant?",
  "Distinguish language levels": "What are the differences between the main levels of programming languages?",
  "Evaluate cloud and local storage": "How do cloud storage and local storage compare, and what are the advantages and disadvantages of each?",
  "Evaluate computer suitability": "What factors should be considered when deciding whether a computer system is suitable for a particular task?",
  "Evaluate online information": "How can you judge whether information found online is reliable and suitable for use?",
  "Evaluate a website": "What should you examine when evaluating the quality and effectiveness of a website?",
  "Select input and output devices": "How do you decide which input and output devices are most suitable for a particular task?",
  "Select file organisation and access": "How do you choose a suitable file organisation and access method for a given situation?",
  "Discuss user-interface types": "What are the main types of user interfaces, and what are the advantages and disadvantages of each?",
  "Troubleshoot basic hardware problems": "How would you identify and deal with common hardware problems?",
  "Differentiate validation and verification": "What is the difference between validation and verification?",
  "Choose validation and verification checks": "Which validation and verification checks are suitable for different types of data?",
  "Assess mobile communication": "What are the benefits and limitations of mobile communication?",
  "Assess the impact of computer misuse": "What effects can computer misuse have on individuals and organisations?",
  "Assess automation and job security": "How can automation affect employment and job security?",
  "Assess ICT in major fields": "How is ICT used in major fields, and what impact does it have in those areas?",
  "Outline computer security and misuse": "What are the main computer security threats and forms of computer misuse?",
  "Outline problem-solving steps": "What are the main steps used to solve a problem using a computer?",
  "Describe security countermeasures": "What security measures can be used to protect computer systems and data?",
  "Describe computer-related careers": "What are some computer-related careers, and what work is carried out in those careers?",
  "Describe program implementation": "What happens during the program implementation stage of problem solving?",
  "Create documents from different sources": "How would you create a document using information from different sources?",
  "Create fillable forms": "How would you create a fillable form in a word-processing application?",
  "Create simple web pages": "How would you create a simple web page that is clear, functional and easy to navigate?",
  "Create arithmetic formulae": "How would you create arithmetic formulae in a spreadsheet?",
  "Create and relate database tables": "How would you create database tables and establish the correct relationships between them?",
  "Use document formatting": "How would you format a document so that it is clear, consistent and appropriate for its purpose?",
  "Use review features": "How would you use review features to check and improve a document?",
  "Use mail merge": "How would you use mail merge to produce personalised documents?",
  "Use spreadsheet terminology": "What spreadsheet terms should you know, and what does each one mean?",
  "Use predefined functions": "How would you use predefined spreadsheet functions to perform calculations?",
  "Use multiple worksheets": "How would you work with and link data across multiple worksheets?",
  "Use database terminology": "What database terms should you know, and what does each one mean?",
  "Use divide and conquer": "How would you use the divide-and-conquer approach to solve a large problem?",
  "Edit and organise documents": "How would you edit and organise a document efficiently?",
  "Protect documents": "How would you protect a document from unauthorised access or unwanted changes?",
  "Generate a table of contents": "How would you generate an automatic table of contents in a document?",
  "Plan a website": "What should you decide and organise before building a website?",
  "Insert hyperlinks": "How would you insert and test hyperlinks on a web page?",
  "Copy formulae correctly": "How do relative, absolute and mixed references affect a formula when it is copied?",
  "Manipulate rows and columns": "How would you insert, delete, resize or otherwise manipulate rows and columns in a spreadsheet?",
  "Manipulate spreadsheet data": "How would you sort, filter and otherwise manipulate data in a spreadsheet?",
  "Manipulate database data": "How would you add, edit, delete, sort or filter records in a database?",
  "Perform charting operations": "How would you create and format a suitable chart from spreadsheet data?",
  "Define a problem using IPO": "How would you define a problem using an Input-Process-Output chart?",
  "Represent algorithms": "How can an algorithm be represented before it is translated into program code?",
  "Test algorithms": "How would you test an algorithm to make sure that it produces the expected results?",
  "Test and debug programs": "How would you test and debug a program to find and correct errors?",
  "Declare variables and constants": "How are variables and constants declared and used in a program?",
  "Translate algorithms into code": "How would you translate an algorithm into a high-level programming language?",
  "Document programs effectively": "How would you document a program so that it is easier to understand, use and maintain?"
});

function objectivePrompt(item) {
  const title = String(item.title || "").trim();
  return IT_OBJECTIVE_QUESTIONS[title] || title;
}

export function buildInformationTechnologyObjectiveFlashcards() {
  return (objectiveCoverage || []).map(item => ({
    id: `it-objective-${item.section}-${item.objective}`,
    kind: "objective",
    sectionId: item.section,
    objectiveId: item.objective,
    objectiveKey: objectiveKey(item),
    topicId: item.topicId,
    title: item.title,
    front: objectivePrompt(item),
    answerPoints: Array.isArray(item.points) ? item.points : [],
    examFocus: "Use the correct Information Technology terms. Where a scenario is given, apply the points to that situation instead of giving an unrelated list.",
  }));
}

export function buildInformationTechnologyRecallFlashcards() {
  const sectionMap = new Map((course.sections || []).map(section => [String(section.id), section]));
  return (course.topics || []).flatMap(topic => {
    const questions = Array.isArray(topic.quick) ? topic.quick : [];
    const answers = Array.isArray(topic.quickAnswers) ? topic.quickAnswers : [];
    return questions.map((front, index) => ({
      id: `it-recall-${topic.id}-${index + 1}`,
      kind: "recall",
      sectionId: topic.section,
      sectionTitle: sectionMap.get(String(topic.section))?.title || `Section ${topic.section}`,
      topicId: topic.id,
      topicTitle: topic.title,
      objectives: topic.objectives,
      front,
      back: answers[index] || "Review the lesson notes for this topic.",
    }));
  });
}

export const INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS = buildInformationTechnologyObjectiveFlashcards();
export const INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS = buildInformationTechnologyRecallFlashcards();
export const INFORMATION_TECHNOLOGY_FLASHCARD_COUNTS = Object.freeze({
  objectives: INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS.length,
  recall: INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS.length,
  total: INFORMATION_TECHNOLOGY_OBJECTIVE_FLASHCARDS.length + INFORMATION_TECHNOLOGY_RECALL_FLASHCARDS.length,
});
