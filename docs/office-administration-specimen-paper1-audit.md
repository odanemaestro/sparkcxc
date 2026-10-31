# CXC Office Administration specimen Paper 1 source audit

Reviewed 2026-10-26 against the supplied syllabus PDF: examination pages84–99, item text pages85–95 and printed master data sheet page100.

All 60 stems and four-option sets were checked. Fifty-nine items matched the digital column text after joining layout lines and split words. Item54 was checked visually against the full page94 stock card, including every row and all order references. The printed letters, profiles and complete specific-objective subcodes were compared with the page100 image.

Corrections made:

- Removed the page footer from item54 option D; its complete text is “10 January”.
- Restored the printed parenthesis subobjectives, such as I.2(b), II.3(a) and VIII.6(e).
- Joined the line-wrap in item33 “his/her”.
- Added missing spaces to worked explanations around amounts, dates and option letters.
- Kept the full item54 stock table and shared information for items45, 48 and49.
- Recorded 16 examination source pages; the printed key remains separately attributed to page100.

The printed key is preserved exactly:

```text
01–10 DCDCBBCBAC
11–20 CDACDCBADC
21–30 DDCABCDADB
31–40 CBBCCBABAB
41–50 BADADCADCA
51–60 BADBDABDAC
```

Item60 remains disputed and unscored: the printed answer is C (II and III), while the worked review supports A (I and II). The bank retains `officialAnswerIndex:2`, `workedAnswerIndex:0`, `answerIndex:null`, `correctIndex:null`, `keyStatus:"disputed"` and `scoringReady:false`. Its scored subset is therefore 59 marks out of the 60 printed examination marks.

The reason for review is that invoice and air-waybill requirements are supported by [the US International Trade Administration's common export documents guidance](https://www.trade.gov/common-export-documents) and [FedEx's international shipment document guidance](https://www.fedex.com/en-ca/contact-us/faq/send-packages/international-customs/international-documents.html), checked 2026-10-26. Inferring A from those sources is a worked interpretation, not an official CXC correction. Requirements depend on shipment circumstances; those sources do not establish a universal rule excluding every possible additional document.

Item56 retains the verified printed answer A. Its explanation now makes clear that the department allocation is the specimen's intended context: real sales departments can have different responsibilities. No universal exclusion of order-form completion is asserted.

`oaHistoricalPaper1Specimen.test.js` locks the printed letters and complete objective subcodes, checks the whole stock table, preserves shared context, excludes footer contamination and explicitly protects the item60 scoring exclusion.
