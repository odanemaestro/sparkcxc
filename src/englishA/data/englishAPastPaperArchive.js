// Audit manifest for the user-supplied English A Paper 1 archive.
// This file tracks source-ingestion QA separately from the original SPARK bank.
// "scan" means the supplied PDF has no useful embedded text and needs visual/OCR QA.
// The file named 2012_MJ identifies itself internally as a January 2021 Paper 032,
// so it is deliberately excluded from Paper 01 question extraction until corrected.

export const englishAPastPaperArchive = Object.freeze([
  {
    "year": 1999,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_1999_MJ.pdf",
    "pages": 15,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2000,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2000_MJ.pdf",
    "pages": 12,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2001,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2001_MJ.pdf",
    "pages": 16,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2003,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2003_MJ.pdf",
    "pages": 12,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2004,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2004_MJ.pdf",
    "pages": 14,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2005,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2005_MJ.pdf",
    "pages": 15,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2008,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2008_MJ.pdf",
    "pages": 14,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2010,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2010_MJ.pdf",
    "pages": 10,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2012,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2012_MJ.pdf",
    "pages": 5,
    "extraction": "text",
    "paper": null,
    "usableForPaper1": false,
    "note": "Filename says 2012 MJ Paper 1, but the document content identifies itself as January 2021 Paper 032."
  },
  {
    "year": 2013,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2013_MJ.pdf",
    "pages": 15,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2014,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2014_MJ.pdf",
    "pages": 12,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2015,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2015_MJ.pdf",
    "pages": 16,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2016,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2016_MJ.pdf",
    "pages": 15,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2017,
    "sitting": "JAN",
    "file": "CSEC_English_A_P1_2017_JAN.pdf",
    "pages": 14,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2017,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2017_MJ.pdf",
    "pages": 16,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2018,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2018_MJ.pdf",
    "pages": 14,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2019,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2019_MJ.pdf",
    "pages": 15,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2020,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2020_MJ.pdf",
    "pages": 15,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2021,
    "sitting": "JAN",
    "file": "CSEC_English_A_P1_2021_JAN.pdf",
    "pages": 16,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2021,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2021_MJ.pdf",
    "pages": 17,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2022,
    "sitting": "JAN",
    "file": "CSEC_English_A_P1_2022_JAN.pdf",
    "pages": 15,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2022,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2022_MJ.pdf",
    "pages": 17,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2023,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2023_MJ.pdf",
    "pages": 17,
    "extraction": "scan",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  },
  {
    "year": 2024,
    "sitting": "MJ",
    "file": "CSEC_English_A_P1_2024_MJ.pdf",
    "pages": 16,
    "extraction": "text",
    "paper": "01",
    "usableForPaper1": true,
    "note": null
  }
]);

export const englishAPastPaperArchiveSummary = Object.freeze({
  suppliedFiles:englishAPastPaperArchive.length,
  confirmedPaper1Files:englishAPastPaperArchive.filter(item => item.usableForPaper1).length,
  scanOnlyFiles:englishAPastPaperArchive.filter(item => item.extraction === "scan").length,
  textFiles:englishAPastPaperArchive.filter(item => item.extraction === "text").length,
  mismatches:englishAPastPaperArchive.filter(item => !item.usableForPaper1).length,
});
