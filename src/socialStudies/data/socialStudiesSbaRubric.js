const freeze=value=>Object.freeze(value);

export const SOCIAL_STUDIES_SBA_TRANSITION=freeze({
  announced:"2026-07",
  schoolCandidates2027:"Schools may choose either the SBA route or Paper 032 for CSEC candidates in 2027.",
  from2028:"CSEC candidates transition fully to Paper 032 from May-June 2028.",
  currentProjectMaxMarks:40,
  weightingPercent:20,
  source:"https://www.cxc.org/holding-to-the-standard/",
});

export const SOCIAL_STUDIES_SBA_RUBRIC=freeze([
  freeze({
    id:"problem",
    number:1,
    label:"Statement of Problem",
    maxMarks:2,
    help:"State a clear research question or problem and identify the issue and target population.",
  }),
  freeze({
    id:"reason",
    number:2,
    label:"Reason for Selecting the Area of Research",
    maxMarks:2,
    help:"Give a clear, relevant reason for choosing the problem or issue.",
  }),
  freeze({
    id:"method",
    number:3,
    label:"Method of Investigation",
    maxMarks:4,
    help:"Identify and justify the research method, then identify and describe the sampling procedure.",
  }),
  freeze({
    id:"instrument",
    number:4,
    label:"Data Collection Instrument",
    maxMarks:4,
    help:"Use clear, well-sequenced items that address the variables in the research problem.",
  }),
  freeze({
    id:"presentation",
    number:5,
    label:"Presentation of Data",
    maxMarks:6,
    help:"Present data in three different appropriate forms. Give charts, graphs or tables clear titles and labels and check accuracy.",
  }),
  freeze({
    id:"analysis",
    number:6,
    label:"Analysis and Interpretation of Data",
    maxMarks:8,
    help:"Analyse the data in relation to the research question, use supporting data, make comparisons or connections and refer to sources.",
  }),
  freeze({
    id:"findings",
    number:7,
    label:"Statement of Findings",
    maxMarks:3,
    help:"State three findings supported by the data presented.",
  }),
  freeze({
    id:"recommendations",
    number:8,
    label:"Recommendations and Implementation Strategy",
    maxMarks:3,
    help:"Give two recommendations based on the findings and explain how one recommendation would be implemented.",
  }),
  freeze({
    id:"writing",
    number:9,
    label:"Writing Skills",
    maxMarks:4,
    help:"Use organised paragraphs, clear language, correct spelling and sound grammar.",
  }),
  freeze({
    id:"overall",
    number:10,
    label:"Overall Presentation",
    maxMarks:4,
    help:"Use an appropriate project layout with supporting elements such as a cover page, table of contents, acknowledgements, bibliography or appendices.",
  }),
]);

export const SOCIAL_STUDIES_SBA_GUIDE=freeze({
  maxMarks:40,
  weightingPercent:20,
  recommendedMaximumWords:1000,
  tasks:freeze([
    "State the research problem.",
    "Explain why the problem or issue was selected.",
    "Select and justify an appropriate investigation method.",
    "Design a simple data-collection instrument.",
    "Describe the data-collection procedure and sampling.",
    "Present data in at least three different appropriate forms.",
    "Analyse and interpret the data in relation to the research question.",
    "State three findings based on the data.",
    "Give two recommendations and outline how one would be implemented.",
  ]),
  methods:freeze(["questionnaire","interview","observation","documentary search"]),
  presentationTypes:freeze(["table","bar graph","pie chart","line graph","map","diagram","photograph","prose"]),
});
