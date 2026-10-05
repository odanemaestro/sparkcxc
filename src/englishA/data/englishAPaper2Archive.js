// Historical source QA manifest for the user-supplied CSEC English A Paper 02 archive.
//
// Every file below has been checked against the document itself. Text PDFs were
// verified from extracted page text. Image-only PDFs were rendered and visually
// inspected page-by-page at representative section boundaries to confirm paper
// identity, sitting, section layout, task family and completeness.
//
// This is an audit/index layer. It does NOT republish CXC question wording.

const q = (year,sitting,pages,extraction,formatEra,details={}) => Object.freeze({
  year,
  sitting,
  file:`CSEC_English_A_P2_${year}_${sitting}.pdf`,
  pages,
  extraction,
  paper:"02",
  qaStatus:"verified",
  identityVerified:true,
  structureVerified:true,
  usableForPatternReview:true,
  ...details,
});

export const englishAPaper2Archive = Object.freeze([
  q(2002,"MJ",6,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"110 words",
  }),
  q(2003,"MJ",6,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2004,"MJ",6,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-500",
    argumentWordRange:"250-300",
    summaryLimit:"100 words",
  }),
  q(2005,"MJ",7,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-500",
    argumentWordRange:"250-300",
  }),
  q(2006,"MJ",7,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
  }),
  q(2007,"MJ",6,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
  }),
  q(2008,"MJ",9,"text","legacy-four-section",{
    sectionLabels:["ONE","TWO","THREE","FOUR"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),

  q(2009,"MJ",6,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2010,"MJ",9,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2011,"MJ",8,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2012,"MJ",9,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-500",
    argumentWordRange:"200-300",
  }),
  q(2013,"MJ",7,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2014,"MJ",10,"text","abcd-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
  }),
  q(2015,"MJ",23,"text","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:true,
  }),
  q(2016,"MJ",23,"text","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:true,
  }),
  q(2017,"MJ",23,"text","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:true,
  }),

  q(2018,"JAN",32,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; cover, instructions and all four section boundaries confirmed",
  }),
  q(2018,"MJ",20,"text","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:true,
  }),
  q(2019,"JAN",24,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; cover, summary, Section B, creative and argument sections confirmed",
  }),
  q(2020,"JAN",28,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; Section B transactional task, Section C creative task and Section D argument confirmed",
  }),
  q(2021,"JAN",20,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; four-section structure and candidate response pages confirmed",
  }),
  q(2021,"MJ",21,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; summary, transactional writing, short-story and argumentative sections confirmed",
  }),
  q(2022,"JAN",19,"text","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:true,
  }),
  q(2022,"MJ",22,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; all four sections and response pages confirmed",
  }),
  q(2023,"JAN",11,"visual","question-and-response-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; compact booklet still contains the standard four-section Paper 02 structure",
  }),
  q(2023,"MJ",22,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; summary, transactional, creative and argument sections confirmed",
  }),
  q(2024,"JAN",28,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; identity, section layout and response booklet verified",
  }),
  q(2024,"MJ",22,"visual","candidate-booklet-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:true,
    visualQa:"rendered source inspected; summary, transactional writing, short story and argumentative essay confirmed",
  }),
  q(2025,"JAN",7,"visual","question-only-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    answerBooklet:false,
    visualQa:"rendered source inspected; all four question sections are present, but supplied PDF omits the ruled answer booklet pages",
  }),
  q(2026,"JAN",8,"text","question-only-four-section",{
    sectionLabels:["A","B","C","D"],
    durationMinutes:160,
    creativeWordRange:"400-450",
    argumentWordRange:"250-300",
    summaryLimit:"120 words",
    answerBooklet:false,
    note:"This January 2026 paper still uses the pre-2027 four-section format. It is historical reference material, not a revised CXC 01/G/SYLL 25 paper.",
  }),
]);

export const englishAPaper2ArchiveSummary = Object.freeze({
  suppliedFiles:englishAPaper2Archive.length,
  verifiedFiles:englishAPaper2Archive.filter(item => item.qaStatus === "verified").length,
  textFiles:englishAPaper2Archive.filter(item => item.extraction === "text").length,
  visualFiles:englishAPaper2Archive.filter(item => item.extraction === "visual").length,
  mismatches:englishAPaper2Archive.filter(item => item.identityVerified !== true).length,
  structureFailures:englishAPaper2Archive.filter(item => item.structureVerified !== true).length,
  years:[2002,2026],
});

export const englishAPaper2FormatEras = Object.freeze([
  {
    id:"legacy-four-section",
    years:"2002-2008",
    notes:[
      "Papers use Sections ONE to FOUR.",
      "Summary/comprehension skills appear before creative and argumentative writing.",
      "Creative and argument word limits vary slightly across the early papers.",
    ],
  },
  {
    id:"abcd-four-section",
    years:"2009-2014",
    notes:[
      "The same broad four-part assessment is relabelled Sections A-D.",
      "The archive consistently uses summary, comprehension/response, creative writing and argument.",
      "From 2012 the printed duration in the supplied papers is 2 hours 40 minutes.",
    ],
  },
  {
    id:"candidate-booklet-four-section",
    years:"2015-2026",
    notes:[
      "Questions and ruled response spaces are commonly combined in a candidate booklet.",
      "Later papers consistently show Section A summary, Section B directed/transactional or response writing, Section C short story and Section D argumentative writing.",
      "The January 2025 supplied file is question-only; the other later files may contain the full answer booklet.",
    ],
  },
]);

export const englishAPaper2PatternNotes = Object.freeze([
  {
    era:"historical",
    pattern:"The archive repeatedly assesses concise summary, purposeful formal/transactional writing, imaginative short-story writing and reasoned argument.",
  },
  {
    era:"historical",
    pattern:"Common candidate instructions emphasise continuous prose, audience/purpose, organisation, Standard English, grammar, vocabulary, spelling and punctuation.",
  },
  {
    era:"historical",
    pattern:"Creative tasks frequently use a picture, an opening/closing sentence or a required situation; argumentative tasks ask candidates to support, oppose or give views on a statement.",
  },
  {
    era:"2027 revised",
    pattern:"Historical task language informs SPARK style, but original practice is rebuilt to CXC 01/G/SYLL 25: two questions per module, 40 marks per module, 120 marks total.",
  },
]);
