# 2003 FNH Paper 1: Numbered-source reconstruction audit

Status: **Question order corrected; academic source verification is still incomplete.**

## Root cause

The former comparison was incorrect because it compared two lists positionally rather than by the original printed question number. The SPARK data file formerly stored the questions in the order `1, 2, 3, 7, ... 40, 4, 5, 6, 41, ... 60`. The item numbers and working keys did **not** correspond to those array indices. In the scanned 2003 PDF's third page, the first question in the left column is misprinted as **27** although it is question **21** in sequence; the right column contains the actual question **27**. Two-column PDF text extraction must not be used to renumber items.

SPARK now sorts the source records by explicit `number` before exporting the 60-item bank. A test asserts the exact number sequence 1–60.

## Comparison keyed by actual question number

Source: the user's `FNH_Paper1_Answer_Key.docx` worked solution document (not an official CXC key).

- **53** nonempty SPARK answers agree with the user's worked key.
- **6** SPARK answers remain blank: **Q4, Q5, Q6, Q33, Q41, Q46**. Some have plausible candidate responses, but cannot be promoted without review of the question and original scan.
- **1** mismatch, **Q59**: document says **D**, but the actual source choices are C = hypertension, D = hypotension. High dietary sodium is associated with **hypertension**, so **SPARK's C is the correct option text** and the worked document's letter is erroneous.
- The examples Q12, Q22, Q25, Q29 and Q37 have the correct source-specific choices in SPARK.

## Remaining reviews

| Number | Why still under review |
|---|---|
| Q4 | Fruit shrinkage during dehydration; source-based textbook interpretation required |
| Q5 | Mixed illness, organism and symptom groups; review intended option |
| Q6 | Food contamination vs proliferation/food spoilage wording |
| Q33 | Corn oil vs groundnut oil as frying media; both can have suitable smoke points |
| Q41 | Historical cup-to-gram approximation of flour varies by measurement practice |
| Q46 | Combined factors shaping adolescent choices; source options do not present every plausible combination |

### Student release condition

Do not describe this year as CXC-officially marked. Independently review the six unresolved items and check the full 60-question source transcription, figure/question fidelity and explanations. Run the regression suite and confirm the paper's results/notification behaviour end-to-end before enabling grading.
