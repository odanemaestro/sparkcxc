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
      detail: "Ke