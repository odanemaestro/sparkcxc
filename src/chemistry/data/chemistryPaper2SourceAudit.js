// Source-control audit for the 28 user-supplied CSEC Chemistry Paper 02 scans.
// This file deliberately separates "source accounted for" from "learner-facing
// transcription verified". OCR is used for search/indexing only. Chemical
// formulae, charges, values, diagrams and wording must be checked visually
// against the scanned page before a historical item is published.

const source = row => Object.freeze({
  ...row,
  paper:"02",
  extraction:"scan",
  identityStatus:"verified",
  pageCountStatus:"verified",
  rawOcrStatus:"complete",
  questionTranscriptionStatus:"visual-qa-required",
  markingStatus:"authoring-and-visual-qa-required",
  diagramStatus:"redraw-as-svg-before-publish",
  learnerFacing:false,
});

export const CHEMISTRY_PAPER2_SOURCE_AUDIT = Object.freeze([
  {
    "id": "CHEM-P2-2005-MJ",
    "code": "2005-MJ",
    "year": 2005,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2005_MJ.pdf",
    "pages": 16,
    "questionCount": 5,
    "ocrStartPage": 1,
    "ocrEndPage": 16
  },
  {
    "id": "CHEM-P2-2006-MJ",
    "code": "2006-MJ",
    "year": 2006,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2006_MJ.pdf",
    "pages": 13,
    "questionCount": 5,
    "ocrStartPage": 17,
    "ocrEndPage": 29
  },
  {
    "id": "CHEM-P2-2007-MJ",
    "code": "2007-MJ",
    "year": 2007,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2007_MJ.pdf",
    "pages": 12,
    "questionCount": 5,
    "ocrStartPage": 30,
    "ocrEndPage": 41
  },
  {
    "id": "CHEM-P2-2008-MJ",
    "code": "2008-MJ",
    "year": 2008,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2008_MJ.pdf",
    "pages": 17,
    "questionCount": 7,
    "ocrStartPage": 42,
    "ocrEndPage": 58
  },
  {
    "id": "CHEM-P2-2009-MJ",
    "code": "2009-MJ",
    "year": 2009,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2009_MJ.pdf",
    "pages": 23,
    "questionCount": 7,
    "ocrStartPage": 59,
    "ocrEndPage": 81
  },
  {
    "id": "CHEM-P2-2010-MJ",
    "code": "2010-MJ",
    "year": 2010,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2010_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 82,
    "ocrEndPage": 101
  },
  {
    "id": "CHEM-P2-2011-MJ",
    "code": "2011-MJ",
    "year": 2011,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2011_MJ.pdf",
    "pages": 22,
    "questionCount": 6,
    "ocrStartPage": 102,
    "ocrEndPage": 123
  },
  {
    "id": "CHEM-P2-2012-MJ",
    "code": "2012-MJ",
    "year": 2012,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2012_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 124,
    "ocrEndPage": 143
  },
  {
    "id": "CHEM-P2-2013-MJ",
    "code": "2013-MJ",
    "year": 2013,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2013_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 144,
    "ocrEndPage": 163
  },
  {
    "id": "CHEM-P2-2014-MJ",
    "code": "2014-MJ",
    "year": 2014,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2014_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 164,
    "ocrEndPage": 183
  },
  {
    "id": "CHEM-P2-2015-MJ",
    "code": "2015-MJ",
    "year": 2015,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2015_MJ.pdf",
    "pages": 21,
    "questionCount": 6,
    "ocrStartPage": 184,
    "ocrEndPage": 204
  },
  {
    "id": "CHEM-P2-2016-MJ",
    "code": "2016-MJ",
    "year": 2016,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2016_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 205,
    "ocrEndPage": 224
  },
  {
    "id": "CHEM-P2-2017-JAN",
    "code": "2017-JAN",
    "year": 2017,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2017_JAN.pdf",
    "pages": 24,
    "questionCount": 6,
    "ocrStartPage": 225,
    "ocrEndPage": 248
  },
  {
    "id": "CHEM-P2-2017-MJ",
    "code": "2017-MJ",
    "year": 2017,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2017_MJ.pdf",
    "pages": 18,
    "questionCount": 6,
    "ocrStartPage": 249,
    "ocrEndPage": 266
  },
  {
    "id": "CHEM-P2-2018-JAN",
    "code": "2018-JAN",
    "year": 2018,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2018_JAN.pdf",
    "pages": 24,
    "questionCount": 6,
    "ocrStartPage": 267,
    "ocrEndPage": 290
  },
  {
    "id": "CHEM-P2-2018-MJ",
    "code": "2018-MJ",
    "year": 2018,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2018_MJ.pdf",
    "pages": 19,
    "questionCount": 6,
    "ocrStartPage": 291,
    "ocrEndPage": 309
  },
  {
    "id": "CHEM-P2-2019-JAN",
    "code": "2019-JAN",
    "year": 2019,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2019_JAN.pdf",
    "pages": 28,
    "questionCount": 6,
    "ocrStartPage": 310,
    "ocrEndPage": 337
  },
  {
    "id": "CHEM-P2-2019-MJ",
    "code": "2019-MJ",
    "year": 2019,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2019_MJ.pdf",
    "pages": 22,
    "questionCount": 6,
    "ocrStartPage": 338,
    "ocrEndPage": 359
  },
  {
    "id": "CHEM-P2-2020-JAN",
    "code": "2020-JAN",
    "year": 2020,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2020_JAN.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 360,
    "ocrEndPage": 379
  },
  {
    "id": "CHEM-P2-2021-JAN",
    "code": "2021-JAN",
    "year": 2021,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2021_JAN.pdf",
    "pages": 24,
    "questionCount": 6,
    "ocrStartPage": 380,
    "ocrEndPage": 403
  },
  {
    "id": "CHEM-P2-2021-MJ",
    "code": "2021-MJ",
    "year": 2021,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2021_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 404,
    "ocrEndPage": 423
  },
  {
    "id": "CHEM-P2-2022-MJ",
    "code": "2022-MJ",
    "year": 2022,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2022_MJ.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 424,
    "ocrEndPage": 443
  },
  {
    "id": "CHEM-P2-2023-JAN",
    "code": "2023-JAN",
    "year": 2023,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2023_JAN.pdf",
    "pages": 23,
    "questionCount": 6,
    "ocrStartPage": 444,
    "ocrEndPage": 466
  },
  {
    "id": "CHEM-P2-2023-MJ",
    "code": "2023-MJ",
    "year": 2023,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2023_MJ.pdf",
    "pages": 22,
    "questionCount": 6,
    "ocrStartPage": 467,
    "ocrEndPage": 488
  },
  {
    "id": "CHEM-P2-2024-JAN",
    "code": "2024-JAN",
    "year": 2024,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2024_JAN.pdf",
    "pages": 21,
    "questionCount": 6,
    "ocrStartPage": 489,
    "ocrEndPage": 509
  },
  {
    "id": "CHEM-P2-2024-MJ",
    "code": "2024-MJ",
    "year": 2024,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2024_MJ.pdf",
    "pages": 21,
    "questionCount": 6,
    "ocrStartPage": 510,
    "ocrEndPage": 530
  },
  {
    "id": "CHEM-P2-2025-JAN",
    "code": "2025-JAN",
    "year": 2025,
    "session": "January",
    "file": "CSEC_Chemistry_P2_2025_JAN.pdf",
    "pages": 20,
    "questionCount": 6,
    "ocrStartPage": 531,
    "ocrEndPage": 550
  },
  {
    "id": "CHEM-P2-2025-MJ",
    "code": "2025-MJ",
    "year": 2025,
    "session": "May/June",
    "file": "CSEC_Chemistry_P2_2025_MJ.pdf",
    "pages": 18,
    "questionCount": 6,
    "ocrStartPage": 551,
    "ocrEndPage": 568
  }
].map(source));

export const CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY = Object.freeze({
  suppliedPapers:CHEMISTRY_PAPER2_SOURCE_AUDIT.length,
  suppliedPages:CHEMISTRY_PAPER2_SOURCE_AUDIT.reduce((sum,row)=>sum+row.pages,0),
  januaryPapers:CHEMISTRY_PAPER2_SOURCE_AUDIT.filter(row=>row.session==="January").length,
  mayJunePapers:CHEMISTRY_PAPER2_SOURCE_AUDIT.filter(row=>row.session==="May/June").length,
  firstYear:Math.min(...CHEMISTRY_PAPER2_SOURCE_AUDIT.map(row=>row.year)),
  lastYear:Math.max(...CHEMISTRY_PAPER2_SOURCE_AUDIT.map(row=>row.year)),
  principle:"A source scan is not promoted to the learner question bank until wording, values, marks and every required figure have been checked against the page image.",
});


export const CHEMISTRY_PAPER2_FORMAT_ERAS = Object.freeze([
  Object.freeze({
    id:"five-question-compulsory",
    years:"2005-2007",
    sourcePapers:3,
    notes:[
      "The supplied papers contain five compulsory questions and use the older shorter Paper 02 format.",
      "Question language and chemistry content remain useful for the historical bank, but this structure is not copied into current SPARK simulations.",
    ],
  }),
  Object.freeze({
    id:"seven-question-choice",
    years:"2008-2009",
    sourcePapers:2,
    notes:[
      "The supplied papers contain seven questions in three sections with compulsory work and section choice.",
      "SPARK keeps the question styles and source content while treating the retired choice structure as historical only.",
    ],
  }),
  Object.freeze({
    id:"six-question-modern",
    years:"2010-2025",
    sourcePapers:23,
    notes:[
      "The supplied papers use six-question Paper 02 structures, with all six questions compulsory in the later format.",
      "Current SPARK simulations follow the syllabus requirement of one data-analysis question, two structured questions and three extended-response questions.",
    ],
  }),
]);
