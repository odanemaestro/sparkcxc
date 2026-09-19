export const IT_SBA_COMPONENTS = [
  {
    id: "database",
    short: "DB",
    title: "Database Management",
    marks: 20,
    description: "Plan related tables, keys, relationships, queries, a form with a subform, and a report.",
  },
  {
    id: "spreadsheet",
    short: "SS",
    title: "Spreadsheet",
    marks: 20,
    description: "Use functions, formulas, references, formatting, sorting, filtering, summaries, charts and linked sheets.",
  },
  {
    id: "word",
    short: "WP",
    title: "Word Processing",
    marks: 20,
    description: "Produce well-formatted documents and complete two advanced word-processing features.",
  },
  {
    id: "web",
    short: "WEB",
    title: "Web Page Design",
    marks: 10,
    description: "Design one clear web page for the intended audience with suitable text, graphics and hyperlinks.",
  },
  {
    id: "programming",
    short: "PSP",
    title: "Problem-Solving and Programming",
    marks: 15,
    description: "Define the problem, design an algorithm, trace test data, implement a working program and document it.",
  },
];

export const IT_SBA_MARKS = [
  { label: "Word Processing", marks: "20 raw" },
  { label: "Web Page Design", marks: "10 raw" },
  { label: "Spreadsheet", marks: "20 raw" },
  { label: "Database", marks: "20 raw" },
  { label: "Problem-Solving and Programming", marks: "15" },
];

export const IT_SBA_CURRENT_LIMITS = [
  {
    id: "word",
    title: "Word Processing",
    text: "Use the required document formatting and page layout. The marking scheme allows choice, including TWO advanced features from mail merge, table of contents and fillable forms. A fillable form should use no more than four controls.",
  },
  {
    id: "web",
    title: "Web Page Design",
    text: "Use one web page for the SBA assignment. Include a project logo, clear navigation and content areas, and at least two suitable hyperlink types.",
  },
  {
    id: "spreadsheet",
    title: "Spreadsheet",
    text: "Use one workbook with two or more worksheets. Keep the assignment to a maximum of TWO major tasks, with no more than THREE requirements in each task, and no more than TWO chart types.",
  },
  {
    id: "database",
    title: "Database Management",
    text: "Use no more than THREE tables, TWO queries, ONE calculation within queries, ONE form with a main form and subform, and ONE grouped and sorted report.",
  },
  {
    id: "programming",
    title: "Problem-Solving and Programming",
    text: "Use the programming language selected by your centre. Keep the coded solution to input, output, conditional branching and iteration. Submit the problem-solving evidence as a PDF with the required project evidence.",
  },
];

export const IT_SBA_MARKING_GUIDE = {
  word: [
    { label: "Document formatting", marks: 4 },
    { label: "Page layout", marks: 2 },
    { label: "Two selected standard features", marks: 4 },
    { label: "Two selected advanced features", marks: 10 },
  ],
  web: [
    { label: "Design features with text and graphics", marks: 3 },
    { label: "Layout for the intended audience", marks: 2 },
    { label: "Information consistent with the project", marks: 3 },
    { label: "Two suitable hyperlinks", marks: 2 },
  ],
  spreadsheet: [
    { label: "Three different functions", marks: 3 },
    { label: "Three different arithmetic formulas", marks: 3 },
    { label: "Formula replication and absolute references or range names", marks: 2 },
    { label: "Spreadsheet formatting", marks: 4 },
    { label: "Sorting", marks: 1 },
    { label: "Filtering or data extraction", marks: 2 },
    { label: "Pivot table", marks: 1 },
    { label: "Charting", marks: 3 },
    { label: "Linking cells between sheets", marks: 1 },
  ],
  database: [
    { label: "Create and populate the database", marks: 5 },
    { label: "Relationships between tables", marks: 2 },
    { label: "Queries including the calculated field", marks: 5 },
    { label: "Main form and subform", marks: 2 },
    { label: "Sorting", marks: 1 },
    { label: "Grouped report with summary and correct title", marks: 5 },
  ],
  programming: [
    { label: "Flowchart or pseudocode", marks: 6 },
    { label: "Trace table with suitable test data", marks: 4 },
    { label: "Working program execution", marks: 1 },
    { label: "Programming-language features and working solution", marks: 3 },
    { label: "Program documentation", marks: 1 },
  ],
};

const COMMON_MISTAKES = {
  database: [
    "Using one large table instead of separating repeated information into related tables.",
    "Choosing a field as a primary key even though the value can repeat.",
    "Creating queries that display the correct fields but do not apply the required criteria.",
    "Making a report look attractive but forgetting grouping, sorting, summary values or the required title.",
  ],
  spreadsheet: [
    "Typing answers into cells instead of using formulas.",
    "Hard-coding a value that should be stored once and referenced.",
    "Copying formulas without checking relative and absolute references.",
    "Creating a chart before checking that the source range and labels are correct.",
  ],
  word: [
    "Formatting the document first and leaving the required advanced feature until the end.",
    "Using mail merge fields that do not match the data source.",
    "Adding form controls without clear labels or instructions.",
    "Using too many fonts, colours or decorative features that reduce readability.",
  ],
  web: [
    "Building several pages when the current CXC syllabus task is limited to one web page.",
    "Using large images without resizing them for the layout.",
    "Adding links without testing them.",
    "Writing content that does not suit the intended audience.",
  ],
  programming: [
    "Writing code before defining the problem, inputs, processes and outputs.",
    "Using test data that only proves the normal case.",
    "Creating a trace table that does not follow the algorithm line by line.",
    "Submitting screenshots without showing the input and the result produced.",
  ],
};

const GUIDE_STEPS = {
  database: [
    {
      title: "Identify the information to be stored",
      detail: "Read the project brief and underline the main groups of information. Each group is a possible table. Look for information that will repeat if everything is stored in one table.",
    },
    {
      title: "Plan at least two related tables",
      detail: "Give each table a clear purpose. List suitable field names and choose an appropriate data type for each field.",
    },
    {
      title: "Choose primary and foreign keys",
      detail: "A primary key must uniquely identify each record. Use matching foreign-key fields to connect related tables.",
    },
    {
      title: "Create and test relationships",
      detail: "Set the relationship that matches the real situation. Check whether it should be one-to-one or one-to-many before entering large amounts of data.",
    },
    {
      title: "Enter realistic records",
      detail: "Use believable data with enough variety to test your queries. Include different categories, dates, amounts and statuses.",
    },
    {
      title: "Create two queries and include one calculation",
      detail: "Keep within the current SBA limit. Use one query with criteria from one table and one query that uses related tables. Include one calculated field within the queries and check the returned records carefully.",
    },
    {
      title: "Create a form with a subform",
      detail: "Use the main form for the parent record and the subform for related records. Add suitable headings and make the form easy to use.",
    },
    {
      title: "Create a grouped report",
      detail: "Select useful fields, apply the required grouping and sorting, add a summary such as count, sum or average, and use the exact report title required by the brief.",
    },
  ],
  spreadsheet: [
    {
      title: "Import or enter the source data",
      detail: "Keep the source data in a clean rectangular list with one heading row. Do not place decorative headings inside the data range.",
    },
    {
      title: "Plan the workbook as two major tasks",
      detail: "Use two or more worksheets, but keep the assessed assignment within the current limit of TWO major tasks with no more than THREE requirements in each task. Group related calculations and analysis together.",
    },
    {
      title: "Use efficient formulas",
      detail: "Create formulas from cell references instead of typing values into the formula. Use one formula and fill it down where possible.",
    },
    {
      title: "Use at least three different functions",
      detail: "Choose functions that solve a real task in the project. SUM, AVERAGE, IF, COUNTIF, VLOOKUP and PMT are examples, but the brief should determine your choice.",
    },
    {
      title: "Show relative and absolute referencing",
      detail: "Use absolute references or named ranges when a rate, fee or lookup table must stay fixed while a formula is copied.",
    },
    {
      title: "Format the worksheet",
      detail: "Apply suitable number formats, alignment, fonts, borders and headings. Money should look like money and percentages should look like percentages.",
    },
    {
      title: "Sort and filter the data",
      detail: "Use the criteria stated in the project. Check that the displayed records match the requirement after the operation.",
    },
    {
      title: "Create a summary",
      detail: "Use a pivot table or another appropriate summary method to answer a useful question about the data.",
    },
    {
      title: "Create and label suitable charts",
      detail: "Choose chart types that match the data. Add useful titles and the required axes or data labels. The current SBA guidance limits the assignment to no more than TWO chart types.",
    },
    {
      title: "Link worksheets",
      detail: "Use a formula that refers to another worksheet so changes in the source data are reflected automatically.",
    },
  ],
  word: [
    {
      title: "Choose the two advanced features",
      detail: "The current marking scheme allows a choice of TWO advanced features from table of contents, mail merge and fillable forms. Your teacher may specify the pair. If you use a fillable form, keep it within the current control limit.",
    },
    {
      title: "Set up the document correctly",
      detail: "Set margins, orientation, header or footer and any required page numbering before the document becomes too large.",
    },
    {
      title: "Apply document formatting",
      detail: "Use clear fonts, suitable sizes, bold, underline or italics only where they help the reader. Keep the layout consistent.",
    },
    {
      title: "Insert useful content",
      detail: "Add a table, columns, chart or imported graphic only when it supports the task. Size imported items so they fit the page properly.",
    },
    {
      title: "Complete advanced feature one",
      detail: "For mail merge, check the data source, primary document, merge fields and final merged output. For a fillable form, use clearly labelled controls and no more than four controls in the assignment.",
    },
    {
      title: "Complete advanced feature two",
      detail: "If using a table of contents, use heading levels first and then generate the table automatically. If using another advanced feature, test every part.",
    },
    {
      title: "Proofread and test",
      detail: "Check spelling, names, numbers, merge output, form controls, page breaks and imported content.",
    },
    {
      title: "Save with a sensible filename",
      detail: "Use the exact filename requested by your teacher. Keep a backup copy before making final changes.",
    },
  ],
  web: [
    {
      title: "Identify the audience and purpose",
      detail: "Decide who will use the page and what information they need first.",
    },
    {
      title: "Plan one page",
      detail: "The current CXC syllabus limits this SBA task to one web page. Plan clear sections on the same page, including a project logo, a navigation area and a content area. Follow your teacher's current instructions if they provide additional requirements.",
    },
    {
      title: "Write the content",
      detail: "Use short headings and useful paragraphs. The information should match the project and be suitable for the intended audience.",
    },
    {
      title: "Add and size graphics",
      detail: "Use relevant images or graphics. Keep them clear, appropriately sized and positioned.",
    },
    {
      title: "Add at least two hyperlink types",
      detail: "Use at least two suitable hyperlink types from the current list, such as another web page, a location on the page, an email address or a user-created file. Test every link.",
    },
    {
      title: "Check consistency",
      detail: "Make sure names, fees, dates, services and contact details agree with the other SBA components.",
    },
    {
      title: "Test the final page",
      detail: "Open the page in a browser. Test every link, check the layout at more than one screen width and correct any missing content.",
    },
  ],
  programming: [
    {
      title: "Define the problem",
      detail: "State the part of the overall project that the program will solve. Keep the programmed task small enough to test properly.",
    },
    {
      title: "List inputs, processes and outputs",
      detail: "Write down what the user enters, what calculations or decisions are made, and what the program must display.",
    },
    {
      title: "Choose variables",
      detail: "Use clear variable names and identify the data each variable will store.",
    },
    {
      title: "Design the algorithm",
      detail: "Write pseudocode or draw a flowchart. Include prompts, input, processing, output, at least one selection and at least one loop.",
    },
    {
      title: "Create the trace table",
      detail: "Use test data that follows the algorithm. Show how important variable values change.",
    },
    {
      title: "Add boundary and invalid test data",
      detail: "Test values at decision boundaries and include at least one incorrect input where the project allows validation.",
    },
    {
      title: "Write the program",
      detail: "Translate the tested algorithm into the selected programming language. Keep the logic close to the pseudocode.",
    },
    {
      title: "Run and correct the program",
      detail: "Use the same test data from the trace table and compare the program output with the expected result.",
    },
    {
      title: "Capture evidence",
      detail: "Take clear screenshots showing data entry and results. Make sure each screenshot proves a specific test.",
    },
    {
      title: "Prepare the PDF documentation",
      detail: "Include the cover sheet, problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
    },
  ],
};

function makeProject(config) {
  return {
    ...config,
    components: {
      database: {
        title: "Database Management",
        produce: config.databaseProduce,
        steps: GUIDE_STEPS.database,
        completed: config.databaseCompleted,
        mistakes: COMMON_MISTAKES.database,
      },
      spreadsheet: {
        title: "Spreadsheet",
        produce: config.spreadsheetProduce,
        steps: GUIDE_STEPS.spreadsheet,
        completed: config.spreadsheetCompleted,
        mistakes: COMMON_MISTAKES.spreadsheet,
      },
      word: {
        title: "Word Processing",
        produce: config.wordProduce,
        steps: GUIDE_STEPS.word,
        completed: config.wordCompleted,
        mistakes: COMMON_MISTAKES.word,
      },
      web: {
        title: "Web Page Design",
        produce: config.webProduce,
        steps: GUIDE_STEPS.web,
        completed: config.webCompleted,
        mistakes: COMMON_MISTAKES.web,
      },
      programming: {
       