import {OA_HISTORICAL_PAPER2_PART_LAYOUTS,OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS} from './oaHistoricalPaper2Layouts';
// Supplied source identities and page-linked native question banks.
import historicalText from './oaHistoricalPaper2Text.json';
import { buildOAHistoricalPartGuidance } from './oaHistoricalMarkingGuidance';
const sourceRecords = [
  {
    "id": "OA-P2-2005-MJ",
    "paper": 2,
    "year": 2005,
    "sitting": "MJ",
    "title": "2005 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2005_MJ.pdf",
    "sha256": "78602c1c7f3e551236f55d004140da36283d26171c7ab17d75f330d35d93a526",
    "pages": 10,
    "sourceAsset": "office-administration/source-pages/OA-P2-2005-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2005-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2006-MJ",
    "paper": 2,
    "year": 2006,
    "sitting": "MJ",
    "title": "2006 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2006_MJ.pdf",
    "sha256": "e8e9e1f84ba1f28a1790316b9c286c69410576e0f00eca352fc46d10509d9b9b",
    "pages": 10,
    "sourceAsset": "office-administration/source-pages/OA-P2-2006-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2006-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2007-MJ",
    "paper": 2,
    "year": 2007,
    "sitting": "MJ",
    "title": "2007 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2007_MJ.pdf",
    "sha256": "49d8eb3ad49b1cb01b41dfb5939f6a378bb3abbbee81355d960e3406f44894a0",
    "pages": 10,
    "sourceAsset": "office-administration/source-pages/OA-P2-2007-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2007-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2008-MJ",
    "paper": 2,
    "year": 2008,
    "sitting": "MJ",
    "title": "2008 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2008_MJ.pdf",
    "sha256": "b7bed1b4672c5dc384bfb894795941aa0a7bdbefd28bc09f0e9976123e895f20",
    "pages": 9,
    "sourceAsset": "office-administration/source-pages/OA-P2-2008-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2008-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2009-MJ",
    "paper": 2,
    "year": 2009,
    "sitting": "MJ",
    "title": "2009 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2009_MJ.pdf",
    "sha256": "d5ed355d91e6fd2deab97fa51a901a0dd3c04fb8d8d5f7146d817ad73bedc03d",
    "pages": 10,
    "sourceAsset": "office-administration/source-pages/OA-P2-2009-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2009-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2010-MJ",
    "paper": 2,
    "year": 2010,
    "sitting": "MJ",
    "title": "2010 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2010_MJ.pdf",
    "sha256": "b8d80319b74905c2ab3bad7b3ebcf865d966fd8abed575dd784c66a39e2440cc",
    "pages": 11,
    "sourceAsset": "office-administration/source-pages/OA-P2-2010-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2010-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2011-MJ",
    "paper": 2,
    "year": 2011,
    "sitting": "MJ",
    "title": "2011 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2011_MJ.pdf",
    "sha256": "cb5de33562aea1fa78cc3a4332718fd8394ae4cb9f3318805457184526c52038",
    "pages": 10,
    "sourceAsset": "office-administration/source-pages/OA-P2-2011-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2011-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2012-MJ",
    "paper": 2,
    "year": 2012,
    "sitting": "MJ",
    "title": "2012 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2012_MJ.pdf",
    "sha256": "6ad5cb79aa988238990f0181e5d37b4f0826c191190820a80097352616967cfd",
    "pages": 11,
    "sourceAsset": "office-administration/source-pages/OA-P2-2012-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2012-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2013-MJ",
    "paper": 2,
    "year": 2013,
    "sitting": "MJ",
    "title": "2013 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2013_MJ.pdf",
    "sha256": "ec63092e63050e5ebf8747f621219040b74ca2dec6ee267f55e634a88010f3cb",
    "pages": 12,
    "sourceAsset": "office-administration/source-pages/OA-P2-2013-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2013-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2014-MJ",
    "paper": 2,
    "year": 2014,
    "sitting": "MJ",
    "title": "2014 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2014_MJ.pdf",
    "sha256": "b121f3460ece2f6217bf4932e8d5a8f3d03fd20e289e064c8328645e586eb40c",
    "pages": 12,
    "sourceAsset": "office-administration/source-pages/OA-P2-2014-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2014-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2015-MJ",
    "paper": 2,
    "year": 2015,
    "sitting": "MJ",
    "title": "2015 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2015_MJ.pdf",
    "sha256": "a244082c89461cd1ed4a03975cf68fe78f5c1e47a130889b6b52b2bfb6a778be",
    "pages": 20,
    "sourceAsset": "office-administration/source-pages/OA-P2-2015-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2015-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2016-JAN",
    "paper": 2,
    "year": 2016,
    "sitting": "JAN",
    "title": "2016 January · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2016_JAN.pdf",
    "sha256": "ee88f9cfac4d6a318830bbb6be1b144230d70e9f4b6f7c846e72c2cc43cc86c3",
    "pages": 20,
    "sourceAsset": "office-administration/source-pages/OA-P2-2016-JAN.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2016-JAN",
    "source": "historical"
  },
  {
    "id": "OA-P2-2016-MJ",
    "paper": 2,
    "year": 2016,
    "sitting": "MJ",
    "title": "2016 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2016_MJ.pdf",
    "sha256": "8db3601cd99def70a0839d6022255c49663b623b37d87fe21f622a970ba5d346",
    "pages": 22,
    "sourceAsset": "office-administration/source-pages/OA-P2-2016-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2016-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2017-MJ",
    "paper": 2,
    "year": 2017,
    "sitting": "MJ",
    "title": "2017 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2017_MJ.pdf",
    "sha256": "1981ee70a4187b1599fb5297aca068c810c892b3f157e753d013bcd22978d566",
    "pages": 19,
    "sourceAsset": "office-administration/source-pages/OA-P2-2017-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2017-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2018-MJ",
    "paper": 2,
    "year": 2018,
    "sitting": "MJ",
    "title": "2018 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2018_MJ.pdf",
    "sha256": "2ce37768dea1da623308311eb8bd18c44cc6703264edc3db5e7e8fdced3b3c65",
    "pages": 18,
    "sourceAsset": "office-administration/source-pages/OA-P2-2018-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2018-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2019-MJ",
    "paper": 2,
    "year": 2019,
    "sitting": "MJ",
    "title": "2019 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2019_MJ.pdf",
    "sha256": "812edecbddabe5397ca3271c43e8241b4db823896409ec041151baf7e4cc09bf",
    "pages": 18,
    "sourceAsset": "office-administration/source-pages/OA-P2-2019-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2019-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2021-MJ",
    "paper": 2,
    "year": 2021,
    "sitting": "MJ",
    "title": "2021 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2021_MJ.pdf",
    "sha256": "e32b542377ddc86b23db1cd6885b5a852dce429c09ff77f082dd0f1d259d7711",
    "pages": 19,
    "sourceAsset": "office-administration/source-pages/OA-P2-2021-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2021-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2022-MJ",
    "paper": 2,
    "year": 2022,
    "sitting": "MJ",
    "title": "2022 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2022_MJ.pdf",
    "sha256": "d833a2797548ad4d4a248a430e17e653d0d768cf6a968fe290af5bdbad28a428",
    "pages": 22,
    "sourceAsset": "office-administration/source-pages/OA-P2-2022-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2022-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2024-JAN",
    "paper": 2,
    "year": 2024,
    "sitting": "JAN",
    "title": "2024 January · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2024_JAN.pdf",
    "sha256": "9964e9a00297ab336892c9982b7b66328e346a5a20ec96f9b314d9380700d4fc",
    "pages": 28,
    "sourceAsset": "office-administration/source-pages/OA-P2-2024-JAN.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2024-JAN",
    "source": "historical"
  },
  {
    "id": "OA-P2-2024-MJ",
    "paper": 2,
    "year": 2024,
    "sitting": "MJ",
    "title": "2024 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2024_MJ.pdf",
    "sha256": "e7f568a4f1d10ad999810e7bc8ffbcd2e66f69a89ba5eb185750aaf651abec05",
    "pages": 19,
    "sourceAsset": "office-administration/source-pages/OA-P2-2024-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2024-MJ",
    "source": "historical"
  },
  {
    "id": "OA-P2-2025-MJ",
    "paper": 2,
    "year": 2025,
    "sitting": "MJ",
    "title": "2025 May–June · Paper 2",
    "filename": "CSEC_Office_Administration_P2_2025_MJ.pdf",
    "sha256": "a5be0c693dff59f75e331c8c695b98e8ec00c079e03c44eac28477dc6fa5dd05",
    "pages": 18,
    "sourceAsset": "office-administration/source-pages/OA-P2-2025-MJ.json",
    "transcriptionVerified": false,
    "answerKeyVerified": false,
    "sourceId": "OA-P2-2025-MJ",
    "source": "historical"
  }
];
const questionsById = new Map(historicalText.map(paper => [paper.id, paper.questions]));

export const OA_HISTORICAL_PAPER2_BANK_VERSION = 'oa-historical-paper2-source-2026-10-26-v3';
export const OA_HISTORICAL_PAPER2S = Object.freeze(sourceRecords.map(source => {
 const questions = questionsById.get(source.id);
 if (!questions?.length) throw new Error(`Office Administration source bank is incomplete: ${source.id}`);
 const compulsory = source.year <= 2013 ? [1,2,3,4] : source.year <= 2016 ? [1,2,3] : [1,2,3,4,5,6];
 const optional = questions.map(q => q.number).filter(n => !compulsory.includes(n));
 const choose = 6 - compulsory.length;
 const nativeTextVerified=questions.every(q=>q.parts.every(part=>OA_HISTORICAL_PAPER2_PART_LAYOUTS[source.id+'::'+q.number+'::'+part.id]?.promptVerified===true));
 return {...source, subjectId:'office-administration', qualification:'CSEC', sourceType:'historical',
  bankVersion:OA_HISTORICAL_PAPER2_BANK_VERSION, durationMinutes:120, timeLimitMinutes:120,
  totalMarks:90, marks:90, availableQuestionMarks:questions.length*15, requiredQuestionCount:6,
  compulsory:choose===0, selectionRules:{compulsory,optional,choose},
  questionDataAvailable:true, partAllocationsVerified:true, answerKeyVerified:false, officialKeyAvailable:false,
  markingStatus:'spark-guidance', officialMarkSchemeAvailable:false,transcriptionVerified:nativeTextVerified,
  guidanceNotice:'SPARK study guidance accompanies the supplied examination questions. No official historical answer key or marking scheme was supplied. Printed source pages remain authoritative where transcription differs.',
  instructions:[
   `This paper consists of ${questions.length===8?'EIGHT':questions.length===7?'SEVEN':'SIX'} questions.`,
   choose ? `Answer ALL questions in SECTION I and any ${choose===2?'TWO':'THREE'} questions in SECTION II.` : 'Answer ALL SIX questions.',
   'The six questions you answer carry 90 marks. Each question carries 15 marks.',
   'You have 2 hours. You may use a silent, non-programmable calculator.',
   'Use the forms, tables and diagrams provided with the question. Label each answer with its original question and part number.'
  ],
  questions:questions.map(question => ({...question,...OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS[source.id+'::'+question.number], sourceAsset:source.sourceAsset,
   provenance:{sourceId:source.id,filename:source.filename,sha256:source.sha256,pdfPages:question.sourcePages,originalQuestionNumber:question.number,kind:'supplied-examination-question'},
   parts:question.parts.map(part => {
    const layout=OA_HISTORICAL_PAPER2_PART_LAYOUTS[source.id+'::'+question.number+'::'+part.id]||{};
    const pages=layout.layoutSourcePages||part.sourcePages;
    const reviewedPart={...part,...layout,sourcePages:pages,sourcePage:pages[0]};
    const guidance=buildOAHistoricalPartGuidance(source,{...question,...OA_HISTORICAL_PAPER2_QUESTION_LAYOUTS[source.id+'::'+question.number]},reviewedPart);
    return {...reviewedPart,...guidance,sourceAsset:source.sourceAsset,provenance:{sourceId:source.id,filename:source.filename,sha256:source.sha256,pdfPages:pages,originalQuestionNumber:question.number,originalPartLabel:part.label,attributionScope:'question-pages',kind:'supplied-examination-question'}};
   })
  }))
 };
}));
