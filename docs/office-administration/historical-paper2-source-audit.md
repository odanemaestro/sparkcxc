# Historical Office Administration Paper 2 source audit

The bank imports 21 supplied historical Paper 2 PDFs into the native question interface. The source inventory contains 148 numbered questions and 454 separately allocated response parts. Every question retains its original number, question text, printed total of 15 marks, source identity, SHA-256 and PDF page references. Source metadata and positioned page assets remain available through each paper's `sourceAsset`.

| Papers | Available questions | Compulsory questions | Choice | Attempt |
| --- | ---: | --- | --- | --- |
| 2005-2013 May/June | 8 | 1-4 | Choose 2 of 5-8 | 6 questions, 90 marks, 120 minutes |
| 2014-2016 May/June and 2016 January | 7 | 1-3 | Choose 3 of 4-7 | 6 questions, 90 marks, 120 minutes |
| 2017-2019, 2021-2022, 2024 January/May/June and 2025 May/June | 6 | 1-6 | All compulsory | 6 questions, 90 marks, 120 minutes |

The bank deliberately omits years/sittings for which no PDF was supplied. `availableQuestionMarks` describes all printed questions; `totalMarks` describes the six-question attempt. The `selectionRules` object preserves the changing historical instructions so that the practice interface can require the correct choice before timing starts.

## Transcription and provenance

Question and response-part provenance links to the supplied examination PDF. Response parts currently use their containing question's page range (`attributionScope: 'question-pages'`), which can include a continuation page. This avoids claiming an exact line or crop for a part when the transcription was extracted across pages.

Native PDF text and Windows OCR were used for transcription. The supplied page layout remains authoritative, especially for forms, tables, organization charts and image material. Unreviewed papers retain `transcriptionVerified: false`: their complete historical transcription has not received a character-by-character comparison. Verified question inventories and reconciled printed part allocations do not imply verified OCR spelling or table layout.

Detached answer forms printed after the end-of-test notice in the 2005-2010 papers are attributed to the questions that use them. Their source field labels are included in the relevant response prompt, and their PDF page is included in question/part provenance. Unrelated appendix forms are removed from the final question transcription.

The following extraction repairs are retained in `tools/refine-oa-paper2-banks.py`:

- 2006 questions 3 and 7: OCR `(h)` corrected to the original second-part label `(b)`.
- 2006 question 4: an inline OCR `+ (b)` split into the original three parts, allocated 3, 4 and 8 marks.
- 2010: recovered question 5 boundary and reconciled question-part allocations against the scan.
- 2016 January: PDF page 5 duplicates page 4; the duplicate is excluded from question 2's transcribed page range.
- 2017 question 5: restored the petty cash table's headings and transaction data.
- 2018 question 6(c): restored the three-mark destination-sheet task from image-only PDF page 18.
- 2022 question 6: restored the destination-sheet headings from the positioned form.
- 2024 and 2025: restored OCR question/part boundaries and retained source-visual metadata for 2024 question 6(b)'s four safety symbols and 2025 question 4(c)'s safety equipment.

## Answer guidance

No official historical Paper 2 answer keys or marking schemes were supplied. All 21 papers therefore declare `officialKeyAvailable: false`, `answerKeyVerified: false` and `officialMarkSchemeAvailable: false`.

Every response part has a SPARK-authored approach note, with its author, non-official status, printed maximum marks and source provenance recorded separately from the examination text. There are 54 worked examples across 2024 January, 2024 May/June and 2025 May/June. The remaining 400 parts have task approach guidance, rather than a worked answer. The interface must preserve this distinction and must not present these notes as official rubrics or use their existence as proof of an official answer key.

The official syllabus specimen Paper 2 and its official marking scheme are separate source material and are audited/imported independently of this historical collection.

## Verification

`src/officeAdministration/data/oaHistoricalPaper2.test.js` checks the complete supplied inventory; original question/part labels; all part totals; every permitted historical six-question selection; paper, question, part and guidance provenance; source-visual bounds; explicit absence of official schemes; and the named repaired source boundaries.
## Native 2025 text review — 27 October 2026

All 2025 May/June Paper 2 question pages (PDF pages 2–18) have now been compared visually with the supplied scan. `oaHistoricalPaper2Layouts.js` overrides all 19 response prompts with checked native wording, preserves the advertisement as text, and supplies editable CV, index-card, email, payroll and purchase-requisition layouts. The safety items are the only required images in that paper’s native question view. The payroll retains printed basic pay and union dues; students fill the remaining cells. This paper now has `transcriptionVerified: true`; the later 2024 May–June and 2022 reviews are recorded below; other papers retain their individual review state. This wording/layout review does not create an official answer scheme or enable historical final-score publication.

## 2024 May–June native review — 28 October 2026

All six questions and 17 parts were visually checked against supplied PDF pages 3–17. Native forms retain printed fixed values and editable blanks for franking postage, a job description, meeting action sheet, resource classification, cheque/counterfoil, corporate communication suggestions and a memorandum. The invoice retains quantity discount 5% and trade discount 10%. Only the four safety symbols use an image crop. The original printed signatures and cheque number remain fixed. No source answer key is inferred.

The detached 2007 accident report address was checked directly: the printed value is **62 Harper Valley**. Both generator and data now retain that value.

## 2022 May–June native review — 29 October 2026

All 22 supplied pages were inspected, including the cover (two hours), blank pages and sideways forms. Six questions / 19 response parts have checked native wording and exact PDF page provenance. The indexing form retains the supplied Allay / Marie / Rose example. The meeting notes and attendance register, previously omitted by extraction, are native text. Both travel itineraries retain the printed JV/VJ flight codes, times, services and costs without inventing schedules.

The statement of account preserves Mega Stores’ full address, telephone number and terms, together with the separate discount wording in the question; its balances are blank. Invoice #900 retains five EC1 chairs at $670, one PS5 shredder at $450, 15% VAT and empty totals. The destination sheet retains the printed dates 5 May / 6 May 2022 as fixed cells, three blank delivery rows and a supervisor field. No travel recommendation, statement total or delivery answer is supplied in the question. No historical scoring or official key is introduced. The subsequent 2021 review is recorded below.

## 2021 May–June native review — 29 October 2026

All 19 supplied PDF pages and all six questions / 17 response parts were compared visually. Mail-room equipment, the received message and printed interview-candidate X selections, email, travel document/purpose pairs, cheque, memorandum, skills-benefit table and delivery note are native text/forms. Fixed source text stays read-only; answer blanks are editable without prefilled recommendations, interview times or calculated totals.

The cheque deliberately retains Susanne in the question and Susanna on the cheque, 28 December 2000, $500.00 against “five thousand and fifty”, and the blank signature. Those discrepancies are part of the task. The delivery note retains R 1256., B12 / H24 / W32, unit prices 150.00 / 392.00 / 1.10, trade discount 5% and VAT 10%, without adding a totals row absent from the source. The exam uses the existing two-hour limit confirmed on the cover. Four historical Paper 2 papers are fully checked; 17 remain under review.
