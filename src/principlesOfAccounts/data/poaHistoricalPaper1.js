import { POA_HISTORICAL_PAPER1_WORKED_KEYS } from './poaHistoricalPaper1Keys';
import { POA_HISTORICAL_PAPER1_MORE_KEYS } from './poaHistoricalPaper1MoreKeys';
import { POA_HISTORICAL_PAPER1_RECENT_KEYS } from './poaHistoricalPaper1RecentKeys';
import { POA_HISTORICAL_PAPER1_EARLY_KEYS } from './poaHistoricalPaper1EarlyKeys';

const workedKeys = { ...POA_HISTORICAL_PAPER1_WORKED_KEYS, ...POA_HISTORICAL_PAPER1_MORE_KEYS, ...POA_HISTORICAL_PAPER1_RECENT_KEYS, ...POA_HISTORICAL_PAPER1_EARLY_KEYS };

// Paper images remain the source of truth for wording, choices and diagrams.
// Page numbers below are one-based PDF pages, not printed page labels.
// A worked key is advisory practice feedback. It is never an official key or a
// calibrated/authoritative grade. Unreviewed and missing questions stay unscored.
const SOURCE_RECORDS = [
  {
    "id": "poa-1-2002-mj",
    "year": 2002,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2002_MJ.pdf",
    "sourceSha256": "eff1b0fa8a9642e2b7f7b7f2e630d501cc65233f42190e3ef919712f3009a2b0",
    "sourcePages": 10,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  },
  {
    "id": "poa-1-2003-mj",
    "year": 2003,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2003_MJ.pdf",
    "sourceSha256": "c1ecb03e948870cbec74054806767628ac64c2b1aac3af95f69e59cb4ac715b0",
    "sourcePages": 10,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  },
  {
    "id": "poa-1-2004-mj",
    "year": 2004,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2004_MJ.pdf",
    "sourceSha256": "b6d08844616dae82679310997632e37d189ed2a518196f8b0bef022831b705a4",
    "sourcePages": 9,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  },
  {
    "id": "poa-1-2005-mj",
    "year": 2005,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2005_MJ.pdf",
    "sourceSha256": "53ca0f58c7c69ae62295d0b0ddc1df439edfb5ec730e30db93cc0ede98be11cf",
    "sourcePages": 14,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2006-mj",
    "year": 2006,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2006_MJ.pdf",
    "sourceSha256": "7974ffe99cf620fb113c39e0b89b7362a5bf2ecaac452263a68595a101a1cfbb",
    "sourcePages": 10,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  },
  {
    "id": "poa-1-2007-mj",
    "year": 2007,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2007_MJ.pdf",
    "sourceSha256": "3a870102b3a8258cdb164b1148988295988c02d9e6dc197819a1fc682db69336",
    "sourcePages": 10,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  },
  {
    "id": "poa-1-2008-mj",
    "year": 2008,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2008_MJ.pdf",
    "sourceSha256": "051c55e33bf7f8a40a2eb66f57e6055a38de9e54b03e97577d3b9b8d5edf8069",
    "sourcePages": 11,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2009-mj",
    "year": 2009,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2009_MJ.pdf",
    "sourceSha256": "b16ad53a96928ec05c54b7169257ba23a1f58a0879896cf14eb547c370b917fd",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2012-mj",
    "year": 2012,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2012_MJ.pdf",
    "sourceSha256": "39445b09d79b9b41b80356121ced4551fefbcd5fb19fc848f43c88a09614847e",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The cover header and form identify May/June 2012, while the oval exam-date line prints 16 May 2011. Identity follows the header, form and supplied filename; the conflicting date is retained in the source."
    ]
  },
  {
    "id": "poa-1-2013-mj",
    "year": 2013,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2013_MJ.pdf",
    "sourceSha256": "877421f5baa145cc2a20ad5d9d19a701086971e88dfabeefd869f84626d5f6c8",
    "sourcePages": 13,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2014-mj",
    "year": 2014,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2014_MJ.pdf",
    "sourceSha256": "3daa009d34f0e1b4d8755e61f5df2178e9d32d7588a99ad04e8cbcff52c6521c",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2015-mj",
    "year": 2015,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2015_MJ.pdf",
    "sourceSha256": "9d38f6cde1a5abc9d8111e9a7d4214a30b64f9a6c94b07f8bfdc22d27789ac1c",
    "sourcePages": 14,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2016-mj",
    "year": 2016,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2016_MJ.pdf",
    "sourceSha256": "fd4d1bc2aec7d913bc3444f095af06c6269affa8fe30e800b7cfbc36112e8bbd",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2017-jan",
    "year": 2017,
    "sitting": "JAN",
    "filename": "CSEC_Principles_of_Accounts_P1_2017_JAN.pdf",
    "sourceSha256": "e272be74088a575b0ecf7a20acc678640d7fb58bd3737fba8fe4ae418498a921",
    "sourcePages": 11,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "missing-final-questions",
    "availableQuestionCount": 57,
    "missingQuestionNumbers": [
      58,
      59,
      60
    ],
    "sourceWarnings": [
      "The supplied PDF ends at printed page 11, question 57. Questions 58–60 and the final page are absent. No substitute questions or answers have been invented.",
      "Question 23 gives a lower-of-cost-and-market inventory total of $23,400, which matches none of the printed choices. It remains unscored.",
      "The shared information for questions 43–44 names the partners Jane and Mary but prints Salary: Joan. Both questions remain unscored pending source review; the conditional working is explained in practice feedback."
    ]
  },
  {
    "id": "poa-1-2017-mj",
    "year": 2017,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2017_MJ.pdf",
    "sourceSha256": "998d78cd813ba70ce8c58a11894266118af5c759932837c3074b8159d2e80b2d",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2018-mj",
    "year": 2018,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2018_MJ.pdf",
    "sourceSha256": "e78615f6a10ff20cc4d7610c36da97087dac1f0a5ddf230dd0aa817af9b7e238",
    "sourcePages": 14,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2019-mj",
    "year": 2019,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2019_MJ.pdf",
    "sourceSha256": "a63b77ab4afa691d49cb79cceeb6da5e7cc3d707b229ab71e32b4ddada6cd9e0",
    "sourcePages": 10,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2020-jan",
    "year": 2020,
    "sitting": "JAN",
    "filename": "CSEC_Principles_of_Accounts_P1_2020_JAN.pdf",
    "sourceSha256": "ccf8b8a83e62d60ee1177616e684dd014a4a6cdd1151b785e19a8a1cffcc1576",
    "sourcePages": 13,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "Question 32 asks for a 2018 balance using a table dated 6 March 2019. Worked feedback uses the provided table and flags the date conflict.",
      "Questions 49 and 53 require subject review of the non-profit terminology and the unspecified partnership capital method. They remain unscored."
    ]
  },
  {
    "id": "poa-1-2020-mj",
    "year": 2020,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2020_MJ.pdf",
    "sourceSha256": "1b04dc2b2cfe16d35a7acc00f1fb0862a411beca1c6aa65435a5cdadef2da6b7",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2021-mj",
    "year": 2021,
    "sitting": "MJ",
    "filename": "CSEC_Principles_of_Accounts_P1_2021_MJ.pdf",
    "sourceSha256": "ac1a9a9cd512e8de94dcad5b6e85e736c2910390da93e3b47fb8aab7b14593a0",
    "sourcePages": 12,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2022-jan",
    "year": 2022,
    "sitting": "JAN",
    "filename": "CSEC_Principles_of_Accounts_P1_2022_JAN.pdf",
    "sourceSha256": "7742f669b3778c99636122b25d4f0271bac18ccff2dbecf02a9a9dff6d58fd51",
    "sourcePages": 13,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "source-cover",
    "coverVerification": {
      "method": "visual-page-image",
      "page": 1,
      "status": "verified"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": []
  },
  {
    "id": "poa-1-2025-jan",
    "year": 2025,
    "sitting": "JAN",
    "filename": "CSEC_Principles_of_Accounts_P1_2025_JAN.pdf",
    "sourceSha256": "4b2b86efb050d6963036658a35a546d8ade10f809b193f14cb435d45a941d63a",
    "sourcePages": 13,
    "questionCount": 60,
    "maxMarks": 60,
    "durationMinutes": 90,
    "durationEvidence": "course-format-default",
    "coverVerification": {
      "method": "visual-page-image",
      "page": null,
      "status": "cover-missing"
    },
    "sourceCompleteness": "not-yet-page-audited",
    "availableQuestionCount": 60,
    "missingQuestionNumbers": [],
    "sourceWarnings": [
      "The supplied PDF starts with question 1; the original instruction cover is absent. The 90-minute practice timer is the course-format default, not a duration verified on this source cover."
    ]
  }
];

const PAGE_RANGES = {
  'poa-1-2002-mj': [[1, 1, 7], [2, 8, 10], [3, 11, 19], [4, 20, 25], [5, 26, 32], [6, 33, 40], [7, 41, 47], [8, 48, 50], [9, 51, 57], [10, 58, 60]],
  'poa-1-2003-mj': [[1, 1, 7], [2, 8, 13], [3, 14, 16], [4, 17, 22], [5, 23, 27], [6, 28, 32], [7, 33, 39], [8, 40, 44], [9, 45, 53], [10, 54, 60]],
  'poa-1-2004-mj': [[1, 1, 8], [2, 9, 14], [3, 15, 21], [4, 22, 27], [5, 28, 34], [6, 35, 40], [7, 41, 46], [8, 47, 54], [9, 55, 60]],
  'poa-1-2005-mj': [[2, 1, 7], [3, 8, 12], [4, 13, 14], [5, 15, 17], [6, 18, 22], [7, 23, 26], [8, 27, 34], [9, 35, 41], [10, 42, 43], [11, 44, 48], [12, 49, 51], [13, 52, 58], [14, 59, 60]],
  'poa-1-2006-mj': [[1, 1, 7], [2, 8, 14], [3, 15, 18], [4, 19, 26], [5, 27, 33], [6, 34, 40], [7, 41, 47], [8, 48, 51], [9, 52, 58], [10, 59, 60]],
  'poa-1-2007-mj': [[1, 1, 9], [2, 10, 16], [3, 17, 24], [4, 25, 31], [5, 32, 37], [6, 38, 39], [7, 40, 44], [8, 45, 52], [9, 53, 55], [10, 56, 60]],
  'poa-1-2008-mj': [[2, 1, 8], [3, 9, 17], [4, 18, 24], [5, 25, 30], [6, 31, 35], [7, 36, 40], [8, 41, 45], [9, 46, 52], [10, 53, 54], [11, 55, 60]],
  'poa-1-2009-mj': [[2, 1, 7], [3, 8, 14], [4, 15, 18], [5, 19, 25], [6, 26, 29], [7, 30, 36], [8, 37, 39], [9, 40, 44], [10, 45, 52], [11, 53, 55], [12, 56, 60]],
  'poa-1-2012-mj': [[2, 1, 9], [3, 10, 17], [4, 18, 21], [5, 22, 26], [6, 27, 31], [7, 32, 38], [8, 39, 45], [9, 46, 51], [10, 52, 53], [11, 54, 57], [12, 58, 60]],
  'poa-1-2013-mj': [[2, 1, 5], [3, 6, 11], [4, 12, 15], [5, 16, 22], [6, 23, 26], [7, 27, 32], [8, 33, 37], [9, 38, 42], [10, 43, 47], [11, 48, 53], [12, 54, 58], [13, 59, 60]],
  'poa-1-2014-mj': [[2, 1, 6], [3, 7, 13], [4, 14, 19], [5, 20, 25], [6, 26, 31], [7, 32, 40], [8, 41, 48], [9, 49, 53], [10, 54, 56], [11, 57, 58], [12, 59, 60]],
  'poa-1-2015-mj': [[2, 1, 5], [3, 6, 9], [4, 10, 16], [5, 17, 22], [6, 23, 28], [7, 29, 34], [8, 35, 38], [9, 39, 43], [10, 44, 49], [11, 50, 52], [12, 53, 54], [13, 55, 57], [14, 58, 60]],
  'poa-1-2016-mj': [[2, 1, 6], [3, 7, 13], [4, 14, 21], [5, 22, 25], [6, 26, 29], [7, 30, 35], [8, 36, 40], [9, 41, 46], [10, 47, 52], [11, 53, 58], [12, 59, 60]],
  'poa-1-2017-mj': [[2, 1, 8], [3, 9, 17], [4, 18, 23], [5, 24, 27], [6, 28, 34], [7, 35, 39], [8, 40, 43], [9, 44, 49], [10, 50, 52], [11, 53, 55], [12, 56, 60]],
  'poa-1-2018-mj': [[2, 1, 6], [3, 7, 10], [4, 11, 13], [5, 14, 21], [6, 22, 24], [7, 25, 26], [8, 27, 32], [9, 33, 36], [10, 37, 41], [11, 42, 48], [12, 49, 53], [13, 54, 56], [14, 57, 60]],
  'poa-1-2019-mj': [[2, 1, 9], [3, 10, 16], [4, 17, 23], [5, 24, 28], [6, 29, 36], [7, 37, 43], [8, 44, 49], [9, 50, 53], [10, 54, 60]],
  'poa-1-2020-mj': [[2, 1, 7], [3, 8, 15], [4, 16, 22], [5, 23, 24], [6, 25, 29], [7, 30, 34], [8, 35, 38], [9, 39, 44], [10, 45, 51], [11, 52, 56], [12, 57, 60]],
  'poa-1-2021-mj': [[2, 1, 6], [3, 7, 10], [4, 11, 14], [5, 15, 21], [6, 22, 28], [7, 29, 33], [8, 34, 38], [9, 39, 46], [10, 47, 51], [11, 52, 55], [12, 56, 60]],
  'poa-1-2025-jan': [[1, 1, 9], [2, 10, 18], [3, 19, 20], [4, 21, 25], [5, 26, 29], [6, 30, 31], [7, 32, 35], [8, 36, 38], [9, 39, 42], [10, 43, 46], [11, 47, 50], [12, 51, 55], [13, 56, 60]],
  'poa-1-2022-jan': [[2, 1, 7], [3, 8, 15], [4, 16, 21], [5, 22, 28], [6, 29, 32], [7, 33, 35], [8, 36, 40], [9, 41, 47], [10, 48, 52], [11, 53, 54], [12, 55, 59], [13, 60, 60]],
  'poa-1-2020-jan': [[2, 1, 7], [3, 8, 14], [4, 15, 18], [5, 19, 22], [6, 23, 26], [7, 27, 29], [8, 30, 35], [9, 36, 39], [10, 40, 46], [11, 47, 53], [12, 54, 55], [13, 56, 60]],
  'poa-1-2017-jan': [[2, 1, 5], [3, 6, 8], [4, 9, 16], [5, 17, 22], [6, 23, 29], [7, 30, 35], [8, 36, 40], [9, 41, 45], [10, 46, 52], [11, 53, 57]],
};

function sourcePage(id, number) {
  return PAGE_RANGES[id]?.find(([, first, last]) => number >= first && number <= last)?.[0] ?? null;
}

export const POA_HISTORICAL_PAPER1 = SOURCE_RECORDS.map((source) => {
  const key = workedKeys[source.id] || [];
  const workedCount = key.filter(([answer]) => answer !== null).length;
  const questions = Array.from({ length: source.availableQuestionCount }, (_, index) => {
    const number = index + 1;
    const entry = key[index];
    const missing = source.missingQuestionNumbers.includes(number);
    return {
      number,
      page: sourcePage(source.id, number),
      available: !missing,
      answer: entry?.[0] ?? null,
      explanation: entry?.[1] ?? (missing ? 'This question is missing from the supplied PDF. No answer is available.' : 'This answer has not yet been independently worked and reviewed.'),
      verificationStatus: entry?.[0] ? 'independently-worked' : 'unresolved',
      unresolvedReason: entry?.[0] ? null : missing ? 'source-question-missing' : entry ? 'source-or-terminology-ambiguity' : 'not-yet-worked',
    };
  });
  return {
    ...source,
    expectedQuestionCount: source.questionCount,
    questionCount: source.availableQuestionCount,
    sourceNotes: source.sourceWarnings,
    sourceCompleteness: source.id === 'poa-1-2022-jan' || source.id === 'poa-1-2020-jan' ? 'all-questions-visually-verified' : source.missingQuestionNumbers.length ? source.sourceCompleteness : 'question-sequence-verified',
    pageMappingVerification: 'source-page-images-question-number-columns',
    questions,
    workedAnswerCount: workedCount,
    keyStatus: workedCount === source.questionCount ? 'complete-worked' : workedCount > 0 ? 'partial-worked' : 'awaiting-review',
    officialKey: false,
    authoritativeScoringEnabled: false,
    verification: {
      method: key.length ? 'independent-solution-from-source-page-images' : 'not-yet-worked',
      secondSubjectReview: 'pending',
      calibrationStatus: 'not-calibrated',
      usage: 'advisory-practice-feedback-only',
    },
  };
});

export const POA_HISTORICAL_PAPER1_BY_ID = Object.fromEntries(POA_HISTORICAL_PAPER1.map((paper) => [paper.id, paper]));

export function getPoaHistoricalPaper1(id) {
  return POA_HISTORICAL_PAPER1_BY_ID[id] || null;
}
