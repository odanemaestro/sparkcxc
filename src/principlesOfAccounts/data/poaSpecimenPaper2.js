// Transformed from the owner's supplied CXC syllabus PDF, checked against rendered
// question pages 76–93 and official key pages 99–108. Page numbers are PDF indices.
// The official key gives subpart totals, not B/A/OF codes or per-step allocations.
// Evidence below is SPARK's unweighted description of what the printed answer shows.
const text = (id, label, maxMarks, sourcePages) => ({ id, label, kind: "text", maxMarks, sourcePages });
const table = (id, label, maxMarks, sourcePages, columns, rows) => ({ id, label, kind: "table", maxMarks, sourcePages, columns, rows });
const calc = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Calculation", "Working", "Answer"], rows);
const statement = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Line", "Details / working", "Amount $", "Subtotal $"], rows);
const ledger = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Line", "Debit details", "Debit $", "Credit details", "Credit $"], rows);
const part = (id, label, maxMarks, questionPages, schemePages, evidenceRequirements, extra = {}) => ({
  id, partId: id, label, maxMarks, sourceQuestionPages: questionPages, sourceSchemePages: schemePages,
  markAllocationSource: "official-subpart-total", criterionWeights: null,
  evidenceRequirements, evidenceDescriptionSource: "spark-unweighted-from-official-key",
  methodCodes: null, ownFigureRules: null,
  scoringPolicy: "Reconcile the complete response, its method and presentation within the printed subpart cap. A matching number alone does not earn the whole cap.",
  ...extra,
});
const value = (id, label, expected, responseCell, sourcePages, schemePages, working, extra = {}) => ({
  id, label, expected, responseCell, sourcePages, sourceSchemePages: schemePages, working,
  tolerance: 0.005, status: "official-key-checked", scoringUse: "practice-feedback-only", ...extra,
});

export const POA_SPECIMEN_PAPER2_SOURCE_ISSUES = [
  {
    id: "specimen-5c-revenue-scale", affectedPartIds: ["5c"], sourceQuestionPages: [92], sourceSchemePages: [107], affectedMarks: 7,
    severity: "scoring-conflict", unresolved: true,
    description: "The question and key both give a $3,000 unit price. The key's revenue row is 9,000; 12,000; 21,000; 24,000; 66,000, without a $'000 heading. Multiplying the supplied units by $3,000 gives 9,000,000; 12,000,000; 21,000,000; 24,000,000; 66,000,000.",
    resolution: "Keep the source unchanged. Show the arithmetically correct dollar budget in study feedback, label the discrepancy, and leave this subpart unresolved for final score publication until an explicit versioned erratum policy is calibrated.",
    printedSchemeRevenue: [9000, 12000, 21000, 24000, 66000], recomputedDollarRevenue: [9000000, 12000000, 21000000, 24000000, 66000000],
  },
  {
    id: "specimen-4c-debenture-rate", affectedPartIds: ["4c"], sourceQuestionPages: [89], sourceSchemePages: [105], affectedMarks: 0,
    severity: "key-label-difference", unresolved: false,
    description: "The key labels the debentures 7%; the question supplies only 500 debentures of $100. No interest rate is needed to record the $50,000 issue.",
    resolution: "Accept the Debentures account without requiring the unsupported 7% label.",
  },
  {
    id: "specimen-3a-overhead-label", affectedPartIds: ["3a"], sourceQuestionPages: [85, 86], sourceSchemePages: [103], affectedMarks: 0,
    severity: "key-label-difference", unresolved: false,
    description: "The key labels $410,000 total manufacturing overheads. It comprises prime cost $343,000 plus factory overheads $67,000, so it is manufacturing cost before work-in-progress adjustments.",
    resolution: "Use the accurate description for $410,000 and keep $67,000 as factory overheads. Do not require the mistaken label.",
  },
  {
    id: "specimen-1-name", affectedPartIds: ["1b-i"], sourceQuestionPages: [77], sourceSchemePages: [99], affectedMarks: 0,
    severity: "key-label-difference", unresolved: false,
    description: "The question names R. Pierre; the key's balance sheet heading says C. Pierre.",
    resolution: "Use R. Pierre from the question. A change of initial does not change any accounting figure.",
  },
  {
    id: "specimen-generalized-legal-examples", affectedPartIds: ["5b", "5e"], sourceQuestionPages: [91, 93], sourceSchemePages: [107, 108], affectedMarks: 0,
    severity: "context-dependent-example", unresolved: false,
    description: "The key includes private pension among statutory deductions and a broad cooperative tax-exemption statement. Those examples depend on local legal rules; the source does not name a jurisdiction.",
    resolution: "Use required-by-law versus employee-requested as the deduction distinction, and accept unambiguous member-ownership/governance features. Do not generalize the context-dependent examples into present-day legal rules.",
  },
];

export const POA_SPECIMEN_PAPER2 = {
  id: "poa-specimen-2-2017", sourceId: "poa-syllabus", sourceType: "official-specimen",
  sourceSha256: "887519842e2bd13aca20f841303ed999f05ea962350c5c7207f63ca85c9aa55f",
  filename: "CSEC-PRINCIPLES-OF-ACCOUNTS-SYLLABUS-Revised-2017.pdf", pageCount: 131,
  year: 2017, sitting: "SPECIMEN", paper: "2", durationMinutes: 180, maxMarks: 100,
  questionCount: 5, requiredQuestionCount: 5, instructionPages: [76],
  examSourcePages: Array.from({ length: 18 }, (_, i) => 76 + i),
  schemePages: Array.from({ length: 10 }, (_, i) => 99 + i),
  choicePolicy: { type: "all", compulsory: [1, 2, 3, 4, 5], choose: 0, from: [] },
  verification: { cover: "visual", questionStarts: "visual-and-source-text", officialKey: "visual", pageNumbering: "one-based-pdf-pages" },
  officialSchemeAvailable: true, scoringStatus: "official-subpart-caps-with-source-errata",
  officialMethodCodesProvided: false, officialOwnFigureRulesProvided: false, officialPerStepAllocationProvided: false,
  sourceIssues: POA_SPECIMEN_PAPER2_SOURCE_ISSUES,
  sourceNotes: ["Specimen paper and key are contained in the syllabus PDF. This is not the historical May/June 2017 sitting.", "The official key provides subpart mark totals. SPARK evidence requirements have no invented official point weights.", "Question 5(c) contains a revenue-scale conflict between its data and the printed key."],
  questions: [
    {
      number: 1, maxMarks: 20, title: "R. Pierre: statements and liquidity", sourcePages: [77, 78, 79, 80], sourceSchemePages: [99, 100], verificationStatus: "official-key-checked",
      answerSections: [
        calc("1a-i", "1(a)(i) Net profit", 2, [77], ["Gross profit", "Net profit"]),
        calc("1a-ii", "1(a)(ii) Gross profit percentage", 2, [78], ["Gross profit percentage"]),
        statement("1b-i", "1(b)(i) Classified balance sheet", 9, [79], ["Non-current assets", "Inventory", "Receivables", "Bank", "Cash in hand", "Current assets total", "Payables", "Working capital", "Net assets", "Opening capital", "Net profit", "Drawings", "Closing capital"]),
        calc("1b-ii", "1(b)(ii) Current ratio", 2, [80], ["Current assets ÷ current liabilities"]),
        text("1c", "1(c) Explain the financial position", 5, [80]),
      ],
      rubricSections: [
        part("1a-i", "Net profit", 2, [77], [99], ["Deduct cost of sales from sales to obtain gross profit $174,000.", "Deduct general expenses $90,800 to obtain net profit $83,200; retain calculation evidence."]),
        part("1a-ii", "Gross profit percentage", 2, [78], [99], ["Use gross profit divided by sales, multiplied by 100.", "Obtain approximately 66.9%; do not substitute net profit or cost of sales as the denominator."]),
        part("1b-i", "Classified balance sheet", 9, [79], [99], ["Use the requested vertical format and appropriate asset/liability/capital categories.", "Current assets $64,200 and current liabilities $17,600 give working capital $46,600.", "Non-current assets $106,800 plus working capital give net assets $153,400.", "Opening capital $76,200 plus profit $83,200 less drawings $6,000 gives closing capital $153,400.", "All supplied asset and liability balances must be represented; agreement of one total alone is insufficient."]),
        part("1b-ii", "Current ratio", 2, [80], [100], ["Use $64,200 current assets divided by $17,600 current liabilities.", "State approximately 3.6:1; equivalent justified precision is acceptable."]),
        part("1c", "Liquidity explanation", 5, [80], [100], ["Explain ability to cover short-term liabilities when due.", "Interpret the relatively high ratio in this supplied case as possible idle cash or inefficient working-capital use, rather than assuming it proves good management.", "Suggest a relevant use for surplus cash, such as an interest-earning investment; preserve sufficient liquidity."]),
      ],
      numericCheckpoints: [
        value("s1-gross", "Gross profit", 174000, "1a-i:0:2", [77], [99], "260,000 − 86,000"),
        value("s1-profit", "Net profit", 83200, "1a-i:1:2", [77], [99], "174,000 − 90,800"),
        value("s1-grosspercentage", "Gross profit percentage", 66.9, "1a-ii:0:2", [78], [99], "174,000 / 260,000 × 100", { tolerance: 0.05 }),
        value("s1-ca", "Current assets", 64200, "1b-i:5:3", [79], [99], "12,000 + 9,550 + 35,000 + 7,650"),
        value("s1-workingcapital", "Working capital", 46600, "1b-i:7:3", [79], [99], "64,200 − 17,600"),
        value("s1-netassets", "Net assets", 153400, "1b-i:8:3", [79], [99], "106,800 + 46,600"),
        value("s1-capital", "Closing capital", 153400, "1b-i:12:3", [79], [99], "76,200 + 83,200 − 6,000"),
        value("s1-currentratio", "Current ratio before :1", 3.6, "1b-ii:0:2", [80], [100], "64,200 / 17,600", { tolerance: 0.05 }),
      ],
      modelSolution: [
        "Official key, PDF pages 99–100: gross profit $174,000; net profit $83,200; gross profit percentage about 66.9%. Current assets total $64,200, liabilities $17,600 and working capital $46,600. Add non-current assets $106,800 to get net assets $153,400. Capital agrees: $76,200 + $83,200 − $6,000 = $153,400.",
        "Current ratio = $64,200 ÷ $17,600, approximately 3.6:1. The case has enough current assets to cover short-term debts, but a relatively high ratio can indicate idle cash or weak working-capital management. The key suggests earning a return on surplus cash. Its 2:1 comparison is contextual guidance, rather than a rule that every business must have exactly that ratio.",
      ],
    },
    {
      number: 2, maxMarks: 20, title: "Michelle Martin: cash and petty cash", sourcePages: [81, 82, 83, 84], sourceSchemePages: [101, 102], verificationStatus: "official-key-checked",
      answerSections: [
        table("2a", "2(a) Three-column cash book", 8, [81, 82], ["Line", "Debit date / details", "Discount allowed $", "Cash debit $", "Bank debit $", "Credit date / details", "Discount received $", "Cash credit $", "Bank credit $"], ["Opening balances", "Restore petty cash", "Rent", "S. Smith", "Contra cash deposit", "P. Kan", "Drawings", "L. Lamb", "Column totals", "Balance carried down", "January 1 balance brought down"]),
        table("2b", "2(b) Petty cash book", 7, [81, 83], ["Line", "Received $", "Date / details", "Total paid $", "Stationery $", "Cleaning $"], ["Opening balance", "Cash reimbursement", "Restored float", "December 10 stationery", "December 10 cleaning", "December 12 stationery", "December 13 paper", "December 21 stapler", "December 28 wages", "Analysis totals", "Balance carried down", "January balance brought down"]),
        text("2c", "2(c) Meaning of balances", 5, [84]),
      ],
      rubricSections: [
        part("2a", "Cash book", 8, [81, 82], [101], ["Record the opening cash $900 and bank $5,300 and restore petty cash by paying $245 from cash.", "Show S. Smith cash $900 and discount allowed $100; P. Kan bank $760 and discount allowed $40.", "Show the $400 cash-to-bank contra entry on both sides with references, drawings $200 cash, rent $500 bank and L. Lamb bank $784 with discount received $16.", "Balance and bring down cash $955 and bank $5,176. Discount totals are allowed $140 and received $16; bank totals $6,460 and cash totals $1,800."]),
        part("2b", "Petty cash book", 7, [81, 83], [101], ["Show opening $55 plus cash reimbursement $245 to restore $300.", "Allocate stationery/paper/stapler $15, $52.50, $9.95 and $39.75 to stationery; cleaning supplies $25.95 and wages $75 to cleaning.", "Total payments $218.15, stationery $117.20 and cleaning $100.95; closing petty cash $81.85.", "Do not enter the petty-cash expense payments again in the main cash book."]),
        part("2c", "Meaning of balances", 5, [84], [102], ["Explain debit cash $955 and debit bank $5,176 as available current assets; the bank is not overdrawn.", "Cash in hand cannot have an ordinary credit balance because physical cash cannot be spent below zero.", "Explain petty cash $81.85 and next reimbursement $218.15 under the $300 imprest."]),
      ],
      numericCheckpoints: [
        value("s2-imprest", "Cash restoring imprest", 245, "2a:1:7", [81], [101], "300 − 55"),
        value("s2-smith-discount", "S. Smith discount allowed", 100, "2a:3:2", [81], [101], "1,000 − 900"),
        value("s2-kan-bank", "P. Kan cheque", 760, "2a:5:4", [81], [101], "800 × 95%"),
        value("s2-lamb-bank", "L. Lamb cheque", 784, "2a:7:8", [81], [101], "800 × 98%"),
        value("s2-cash", "Cash brought down", 955, "2a:10:3", [81, 82], [101], "900 + 900 − 245 − 400 − 200"),
        value("s2-bank", "Bank brought down", 5176, "2a:10:4", [81, 82], [101], "5,300 + 400 + 760 − 500 − 784"),
        value("s2-allowed", "Discount allowed total", 140, "2a:8:2", [81, 82], [101], "100 + 40"),
        value("s2-received", "Discount received total", 16, "2a:8:6", [81, 82], [101], "800 × 2%"),
        value("s2-pettytotal", "Petty cash payments", 218.15, "2b:9:3", [81, 83], [101], "15 + 25.95 + 52.50 + 9.95 + 39.75 + 75"),
        value("s2-stationery", "Stationery total", 117.2, "2b:9:4", [81, 83], [101], "15 + 52.50 + 9.95 + 39.75"),
        value("s2-cleaning", "Cleaning total", 100.95, "2b:9:5", [81, 83], [101], "25.95 + 75"),
        value("s2-pettybalance", "Petty cash carried down", 81.85, "2b:10:3", [81, 83], [101], "300 − 218.15"),
      ],
      modelSolution: [
        "Official key, PDF pages 101–102: reimburse petty cash $245 at the start. Main cash book: S. Smith pays $900 with $100 discount; P. Kan pays $760 with $40 discount. Transfer $400 from cash to bank. Rent is $500 bank, drawings $200 cash and L. Lamb receives $784 bank with $16 discount. Bring down cash $955 and bank $5,176. Discounts allowed total $140 and received total $16.",
        "Petty cash payments total $218.15, analyzed as stationery $117.20 and cleaning $100.95. Closing petty cash is $81.85. Restore $218.15 next month to return to $300. All three available balances are debits; the bank has no overdraft in this case.",
      ],
    },
    {
      number: 3, maxMarks: 20, title: "Jollibee Limited: manufacturing", sourcePages: [85, 86, 87], sourceSchemePages: [103, 104], verificationStatus: "official-key-checked",
      answerSections: [
        statement("3a", "3(a) Manufacturing account", 11, [85, 86], ["Opening raw materials", "Purchases", "Carriage inwards", "Net purchases", "Materials available", "Closing raw materials", "Materials used", "Factory wages", "Prime cost", "Factory repairs", "Factory electricity", "Equipment depreciation", "Factory overheads total", "Manufacturing cost before WIP", "Opening WIP", "Closing WIP", "Production cost"]),
        calc("3b", "3(b) Unit cost", 2, [87], ["Production cost ÷ units"]),
        text("3c", "3(c) Inventory valuation methods", 3, [87]),
        text("3d", "3(d) Two payment methods", 2, [87]),
        text("3e", "3(e) Two accounting skills", 2, [87]),
      ],
      rubricSections: [
        part("3a", "Manufacturing account", 11, [85, 86], [103], ["Include carriage on raw materials in net purchases $203,000 and materials used $303,000.", "Add direct factory wages $40,000 to obtain prime cost $343,000.", "Factory overheads comprise repairs $5,000, electricity $2,000 and depreciation $60,000, total $67,000.", "Add opening WIP $10,000 and subtract closing WIP $20,000 from cost before WIP $410,000 to obtain production cost $400,000.", "Exclude office wages and finished-goods inventory from this manufacturing account; classify and present the supplied items appropriately."]),
        part("3b", "Unit production cost", 2, [87], [103], ["Divide production cost $400,000 by 50,000 units.", "State $8 per unit and show the calculation."]),
        part("3c", "Inventory methods", 3, [87], [104], ["Identify FIFO, LIFO and average cost (AVCO), treating each as a distinct method."]),
        part("3d", "Payment methods", 2, [87], [104], ["Give two distinct appropriate payment methods. Key examples include cash, cheque, standing order, direct debit, electronic transfer/EFTPOS and PayPal."]),
        part("3e", "Accounting skills", 2, [87], [104], ["Give two distinct relevant skills. Key examples include numeracy, analysis, attention to detail, organization, accounting software, impartiality, communication and teamwork.", "The official key expressly allows other appropriate answers; do not require its exact wording."]),
      ],
      numericCheckpoints: [
        value("s3-netpurchases", "Net materials purchases", 203000, "3a:3:3", [85, 86], [103], "200,000 + 3,000"),
        value("s3-materials", "Materials used", 303000, "3a:6:3", [85, 86], [103], "150,000 + 203,000 − 50,000"),
        value("s3-prime", "Prime cost", 343000, "3a:8:3", [85, 86], [103], "303,000 + 40,000"),
        value("s3-dep", "Factory depreciation", 60000, "3a:11:2", [85, 86], [103], "300,000 × 20%"),
        value("s3-overheads", "Factory overheads", 67000, "3a:12:3", [85, 86], [103], "5,000 + 2,000 + 60,000"),
        value("s3-beforewip", "Manufacturing cost before WIP", 410000, "3a:13:3", [85, 86], [103], "343,000 + 67,000"),
        value("s3-production", "Production cost", 400000, "3a:16:3", [85, 86], [103], "410,000 + 10,000 − 20,000"),
        value("s3-unitcost", "Unit production cost", 8, "3b:0:2", [87], [103], "400,000 / 50,000"),
      ],
      modelSolution: [
        "Official key, PDF pages 103–104: net purchases $203,000; materials available $353,000; materials used $303,000; prime cost $343,000. Overheads are repairs $5,000, electricity $2,000 and equipment depreciation $60,000, total $67,000. Cost before WIP is $410,000; add $10,000 opening WIP and subtract $20,000 closing WIP to get production cost $400,000. Unit cost is $400,000 ÷ 50,000 = $8. The key's label for $410,000 is inaccurate: factory overheads themselves are $67,000.",
        "Inventory methods are FIFO, LIFO and AVCO. Examples of payment methods are cash and cheque, with other appropriate methods accepted. Relevant accounting skills include numeracy, analysis, attention to detail, software competence, organization and communication. Give the requested number of distinct answers.",
      ],
    },
    {
      number: 4, maxMarks: 20, title: "Companies, ethics and Jamrock Charity Club", sourcePages: [88, 89, 90], sourceSchemePages: [105, 106], verificationStatus: "official-key-checked",
      answerSections: [
        text("4a", "4(a) Two company advantages", 2, [88]),
        text("4b", "4(b) Four ethical issues", 4, [88]),
        table("4c", "4(c) Share and debenture issue journal", 10, [89], ["Line", "Date / details / narrative", "Debit $", "Credit $"], ["Cash / bank", "Ordinary shares", "Preference shares", "Debentures", "Narrative"]),
        ledger("4d", "4(d) Jamrock receipts and payments", 4, [90], ["Subscriptions", "Bar takings", "Bar purchases", "Equipment", "Depreciation treatment", "Totals", "Balance carried down", "Balance brought down"]),
      ],
      rubricSections: [
        part("4a", "Company advantages", 2, [88], [105], ["Outline two distinct advantages over a partnership, such as separate legal existence, limited liability, continuity or ability to raise more capital.", "Other appropriate advantages are allowed by the official key."]),
        part("4b", "Ethical issues", 4, [88], [105], ["Identify four distinct accounting ethical issues. Key examples concern omission of records, pressure, disclosure, greed, whistleblowing and fraudulent reporting."]),
        part("4c", "Issue journal", 10, [89], [105], ["Compute ordinary capital: 200,000 × $2 = $400,000; preference capital: 100,000 × $5 = $500,000; debentures: 500 × $100 = $50,000.", "Debit cash/bank $950,000 and credit the three appropriate capital/debt accounts with the computed amounts.", "Use journal presentation and a narrative describing the issue, as the question explicitly requires.", "Do not make the unsupported 7% debenture label a condition for credit."]),
        part("4d", "Receipts and payments", 4, [90], [106], ["Debit subscriptions $20,000 and bar takings $15,000; credit bar purchases $10,000 and equipment $10,000.", "Exclude the non-cash depreciation expense $2,000.", "Balance each side at $35,000 and bring down available cash $15,000 on the debit side."]),
      ],
      numericCheckpoints: [
        value("s4-cash", "Share/debenture cash receipt", 950000, "4c:0:2", [89], [105], "200,000 × 2 + 100,000 × 5 + 500 × 100"),
        value("s4-ordinary", "Ordinary capital credit", 400000, "4c:1:3", [89], [105], "200,000 × 2"),
        value("s4-preference", "Preference capital credit", 500000, "4c:2:3", [89], [105], "100,000 × 5"),
        value("s4-debentures", "Debenture credit", 50000, "4c:3:3", [89], [105], "500 × 100"),
        value("s4-receipts", "Receipts total", 35000, "4d:5:2", [90], [106], "20,000 + 15,000"),
        value("s4-balance", "Cash brought down", 15000, "4d:7:2", [90], [106], "35,000 − 10,000 − 10,000"),
      ],
      modelSolution: [
        "Official key, PDF pages 105–106: company advantages include separate legal personality, limited shareholder liability, continuity and access to more capital. Ethical issues may concern omitted records, pressure to misstate figures, disclosure, whistleblowing and fraudulent financial reporting. Distinguish the requested separate ideas.",
        "Journal: debit Cash/Bank $950,000; credit Ordinary Share Capital $400,000, 10% Preference Share Capital $500,000 and Debentures $50,000. Include a narrative explaining the capital and debenture issue. The key adds a 7% debenture rate absent from the question; it is not required for this entry.",
        "Jamrock receipts are subscriptions $20,000 and bar takings $15,000. Payments are bar purchases $10,000 and equipment $10,000. Depreciation is not a cash payment. Both ruled sides total $35,000; cash brought down is $15,000 debit.",
      ],
    },
    {
      number: 5, maxMarks: 20, title: "Payroll, budgets and cooperatives", sourcePages: [91, 92, 93], sourceSchemePages: [107, 108], verificationStatus: "official-key-with-arithmetic-conflict",
      answerSections: [
        text("5a", "5(a) Two payroll programs", 2, [91]),
        table("5b", "5(b) Two deduction differences", 4, [91], ["Difference", "Statutory", "Voluntary"], ["Basis", "Examples"]),
        table("5c", "5(c) Quarterly sales budget", 7, [92], ["Details", "Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4", "Year as a whole"], ["Unit selling price $", "Expected sales units", "Revenue $"]),
        text("5d", "5(d) Four business-plan sections", 4, [92]),
        text("5e", "5(e) Three cooperative features", 3, [93]),
      ],
      rubricSections: [
        part("5a", "Payroll software", 2, [91], [107], ["Name two distinct suitable payroll programs. Key examples include QuickBooks, Peachtree, Sage, Excel and AccountingEdge.", "The official key allows other appropriate answers."]),
        part("5b", "Deduction differences", 4, [91], [107], ["Contrast deductions required by law with deductions authorized or requested by the employee.", "Give appropriately contrasted examples; distinguish legal requirements from voluntary arrangements under the rules that apply.", "The source's particular pension/health examples are jurisdiction-dependent, so do not assert that a named scheme is statutory everywhere."]),
        part("5c", "Sales budget", 7, [92], [107], ["Use supplied quarterly units 3,000; 4,000; 7,000; 8,000, annual total 22,000.", "Keep the $3,000 unit price unchanged.", "Multiply each quantity by $3,000 and show quarterly and annual revenue, with consistent money units.", "The official key's revenue values conflict with its own price and quantity; preserve this as a flagged source issue rather than treating the smaller values as a correct dollar budget."], { sourceConflictId: "specimen-5c-revenue-scale", finalScoreUnresolved: true }),
        part("5d", "Business-plan sections", 4, [92], [108], ["Name four distinct appropriate sections, such as executive summary, company background, operations, marketing, finance and market analysis."]),
        part("5e", "Cooperative features", 3, [93], [108], ["Give three distinct essential cooperative features, such as member ownership, member participation as customers, an elected board, member-share contributions and benefit to members/community.", "Use unambiguous organizational features. The key's broad tax-exemption example depends on legal context."]),
      ],
      numericCheckpoints: [
        ...[3000, 4000, 7000, 8000, 22000].map((expected, i) => value(`s5-units-${i + 1}`, `Sales units ${i < 4 ? `quarter ${i + 1}` : "year"}`, expected, `5c:1:${i + 1}`, [92], [107], i < 4 ? "Supplied sales forecast" : "3,000 + 4,000 + 7,000 + 8,000")),
        ...[9000000, 12000000, 21000000, 24000000, 66000000].map((expected, i) => value(`s5-revenue-${i + 1}`, `Dollar revenue ${i < 4 ? `quarter ${i + 1}` : "year"}`, expected, `5c:2:${i + 1}`, [92], [107], "Units × $3,000; the printed scheme omits a factor of 1,000", { status: "independently-recomputed-source-error", sourceIssueId: "specimen-5c-revenue-scale" })),
      ],
      unresolvedParts: ["5(c): source key's revenue row conflicts with the supplied unit price"],
      modelSolution: [
        "Official key, PDF pages 107–108: examples of payroll software include QuickBooks, Sage, Peachtree, Excel and AccountingEdge, with other appropriate answers accepted. Statutory deductions are required by law; voluntary deductions follow employee requests. Support the distinction with suitable examples without assuming one pension arrangement is legally compulsory everywhere.",
        "Budget source discrepancy: units are 3,000; 4,000; 7,000; 8,000 and the source price is $3,000 per unit. Correct dollar revenues are $9,000,000; $12,000,000; $21,000,000; $24,000,000; annual $66,000,000 on 22,000 units. The printed key shows 9,000; 12,000; 21,000; 24,000; 66,000, without labeling them $'000. Those smaller values are a key arithmetic/scale conflict. SPARK preserves and flags the source rather than silently reproducing the error as dollar amounts.",
        "Business-plan sections include executive summary, company background, operations, marketing, finance and market analysis. Cooperative features include member ownership, member use of services, share contributions, elected governance and benefit to members and community. Give the requested number of distinct valid features.",
      ],
    },
  ],
};

export const POA_SPECIMEN_PAPER2_OFFICIAL_SUBPARTS = POA_SPECIMEN_PAPER2.questions.flatMap((question) => question.rubricSections.map((section) => ({ questionNumber: question.number, ...section })));
