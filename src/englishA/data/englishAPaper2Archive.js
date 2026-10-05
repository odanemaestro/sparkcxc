// Audit manifest for the user-supplied English A Paper 2 archive.
// Source files remain user-provided reference material. This manifest is used
// for format/style QA and to track which papers still need visual transcription.

export const englishAPaper2Archive = Object.freeze([
  ["2002","MJ",6,"text"],["2003","MJ",6,"text"],["2004","MJ",6,"text"],["2005","MJ",7,"text"],
  ["2006","MJ",7,"text"],["2007","MJ",6,"text"],["2008","MJ",9,"text"],["2009","MJ",6,"text"],
  ["2010","MJ",9,"text"],["2011","MJ",8,"text"],["2012","MJ",9,"text"],["2013","MJ",7,"text"],
  ["2014","MJ",10,"text"],["2015","MJ",23,"text"],["2016","MJ",23,"text"],["2017","MJ",23,"text"],
  ["2018","JAN",32,"scan"],["2018","MJ",20,"text"],["2019","JAN",24,"scan"],["2020","JAN",28,"scan"],
  ["2021","JAN",20,"scan"],["2021","MJ",21,"scan"],["2022","JAN",19,"text"],["2022","MJ",22,"scan"],
  ["2023","JAN",11,"scan"],["2023","MJ",22,"scan"],["2024","JAN",28,"scan"],["2024","MJ",22,"scan"],
  ["2025","JAN",7,"scan"],["2026","JAN",8,"text"],
].map(([year,sitting,pages,extraction]) => Object.freeze({
  year:Number(year),
  sitting,
  file:`CSEC_English_A_P2_${year}_${sitting}.pdf`,
  pages,
  extraction,
  paper:"02",
  usableForPatternReview:true,
})));

export const englishAPaper2ArchiveSummary = Object.freeze({
  suppliedFiles:englishAPaper2Archive.length,
  textFiles:englishAPaper2Archive.filter(item => item.extraction === "text").length,
  scanFiles:englishAPaper2Archive.filter(item => item.extraction === "scan").length,
  years:[2002,2026],
  notes:[
    "The archive spans multiple historical English A Paper 02 formats, so old papers are used for language, task and stimulus-pattern review rather than copied into the revised 2027 structure.",
    "Scanned papers require visual transcription before any exact historical question bank is published.",
    "The 2026 paper still follows the pre-2027 four-section structure; SPARK original practice is rebuilt to CXC 01/G/SYLL 25.",
  ],
});

export const englishAPaper2PatternNotes = Object.freeze([
  {
    era:"pre-2027",
    pattern:"Summary, transactional writing, creative writing and argumentative writing appear repeatedly across the historical archive.",
  },
  {
    era:"2015 example",
    pattern:"Historical papers commonly use a 120-word summary, formal communication task, 400-450 word creative response, and 250-300 word argument.",
  },
  {
    era:"2026 example",
    pattern:"The January 2026 paper uses a 120-word summary, formal letter, one short-story choice and one argumentative essay.",
  },
  {
    era:"2027 revised",
    pattern:"SPARK maps those authentic task habits into the new three-module Paper 02 structure: two questions per module, 40 marks per module, 120 marks total.",
  },
]);
