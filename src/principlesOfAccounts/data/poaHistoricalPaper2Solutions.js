// Independently worked SPARK study guidance, not an official CXC marking scheme.
// Numeric checkpoints give practice feedback; they do not allocate examination marks.
// The supplied PDF remains the question. These editable tables are answer workspaces.
const text = (id, label, maxMarks, sourcePages, instructions) => ({ id, label, kind: "text", maxMarks, sourcePages, instructions });
const table = (id, label, maxMarks, sourcePages, columns, rows, instructions) => ({ id, label, kind: "table", maxMarks, sourcePages, columns, rows, instructions });
const calc = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Calculation", "Working", "Answer"], rows);
const statement = (id, label, maxMarks, sourcePages, rows, unit = "$") => table(id, label, maxMarks, sourcePages, ["Line", "Details / working", `Amount ${unit}`, `Subtotal ${unit}`], rows);
const ledger = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Line", "Debit date / details", "Debit $", "Credit date / details", "Credit $"], rows);
// Keys follow the actual answer-sheet component: section:row:column, zero based.
// Debit/credit columns contain positive amounts. An overdraft is shown on the credit side.
const responseCells = {
  "1b-unit": "1b:0:2", "1c-spent": "1c:5:3", "1c-balance": "1c:7:2", "1c-replenish": "1c:8:2", "1d-markup": "1d:2:2",
  "2a-subscriptions": "2a:1:2", "2a-opening": "2a:0:2", "2a-receipts": "2a:8:2", "2a-payments": "2a:9:4", "2a-closing": "2a:11:2", "2b-updated": "2b:5:2", "2c-statement": "2c:4:2",
  "3c-basic": "3c-i:0:2", "3c-overtime": "3c-i:2:2", "3c-gross": "3c-i:3:2", "3c-pension": "3c-ii:0:2", "3c-taxable": "3c-ii:3:2", "3c-tax": "3c-ii:4:2", "3c-net": "3c-iii:2:2",
  "4d-nca": "4d-i:2:3", "4d-ca": "4d-i:6:3", "4d-cl": "4d-i:9:3", "4d-net": "4d-i:11:3", "4d-jennie": "4d-i:12:2", "4d-lance": "4d-i:13:2", "4d-profit": "4d-ii:1:2", "4d-return": "4d-ii:2:2",
  "5b-membership": "5b-i:0:2", "5b-income": "5b-i:2:3", "5b-dep": "5b-i:9:2", "5b-expenses": "5b-i:10:3", "5b-surplus": "5b-i:11:3",
  "1a-i": "1a:0:2", "1a-ii": "1a:1:2", "1a-iii": "1a:2:2", "1a-iv": "1a:3:2", "1b-discount": "1b-i:8:2", "1b-banked": "1b-i:7:4", "1b-cash": "1b-i:9:3", "1b-bank": "1b-i:9:8", "1d-balance": "1d:6:2",
  "2a-gross": "2a:2:3", "2a-audit": "2a:5:2", "2a-wages": "2a:7:2", "2a-dep": "2a:8:2", "2a-interest": "2a:9:2", "2a-profit": "2a:11:3", "2b-preference": "2b:6:2", "2b-retained": "2b:8:3",
  "3-dep": "3:2:2", "3-vehicles": "3:3:3", "3-nca": "3:4:3", "3-ca": "3:8:3", "3-interest": "3:11:2",
  "4a-average": "4a:1:2", "4b-interest": "4b:5:2", "4c-payout": "4c:2:2", "4d-roi": "4d:0:2", "4g-inflow": "4g:3:1",
  "5c-receipts": "5c:7:2", "5c-payments": "5c:8:4", "5c-closing": "5c:10:4", "5d-error": "5d:3:2",
};
const checkpoint = (id, label, expected, working, sourcePages, tolerance = 0.005) => ({ id, label, expected, working, sourcePages, tolerance, responseCell: responseCells[id], status: "independently-worked", scoringUse: "practice-feedback-only" });

export const POA_HISTORICAL_PAPER2_DETAILS = {
  "poa-2-2026-jan": {
    1: {
      title: "Smart Kitchen Appliances: petty cash and mark-up",
      verificationStatus: "independently-worked",
      answerSections: [
        text("1a", "1(a) Source document", 3, [2], "Create and name the document. Include date, business, payee, purpose, amount and authorization details."),
        calc("1b", "1(b) Invoice and discount", 4, [3], ["(i) Cost of one samosa", "(ii) Discount type", "(iii) Reason for the discount"]),
        table("1c", "1(c) Petty cash book", 5, [2, 3], ["Line", "Date / details", "Received $", "Total paid $", "Cleaning $", "Snacks $", "Stationery $", "Supplies $"], ["Opening float", "Voucher 21", "Voucher 22", "Voucher 23", "Figure 1 payment", "Column totals", "Balance carried down", "April 1 balance brought down", "April 1 replenishment"], "Include the given entries. Balance the book before replenishing the fund."),
        calc("1d", "1(d) Mark-up", 3, [3], ["Cost of one drink and two samosas", "Profit", "Mark-up (%)"]),
        table("1e", "1(e) Reimbursement in the general ledger", 5, [4], ["Account", "Date / details", "Debit $", "Credit $"], ["Cleaning", "Snacks", "Stationery", "Supplies", "Bank / cash"]),
      ],
      modelSolution: [
        "1(a) One appropriate document is petty cash voucher 21, dated March 8, 2025, for Smart Kitchen Appliances: $55 paid to Chemical Company Ltd for disinfectant and bleach. Include authorization and recipient signature spaces. A receipt acknowledging the payment is another possible documentary form. The question excludes a cash invoice.",
        "1(b) Three dozen is 36 samosas, so cost per samosa = $54 ÷ 36 = $1.50. A discount recorded separately in a cash book is a cash discount received. A possible reason is prompt payment. Trade discount reduces the invoice price and is not posted separately in the cash book.",
        "1(c) Record the March 28 restaurant payment as $100 total and $100 Snacks. Analysis totals are Cleaning $55, Snacks $100, Stationery $130 and Supplies $205. Total payments = $490; balance carried down = $500 − $490 = $10. Bring down $10 on April 1 and receive $490 from bank/cash to restore the $500 imprest.",
        "1(d) Using the printed product costs, the items cost $2.50 + 2 × $1.50 = $5.50. Profit = $7.50 − $5.50 = $2.00. Mark-up = $2 ÷ $5.50 × 100 = 36.36%. The invoice does not allocate the $4 cash discount among individual products; this calculation uses its stated unit costs.",
        "1(e) Under the usual reimbursement posting, debit Cleaning $55, Snacks $100, Stationery $130 and Supplies $205; credit Bank/Cash $490. The expense debits equal the reimbursement. Do not charge the expenses again if they were already posted under another consistent petty cash control system.",
      ],
      numericCheckpoints: [
        checkpoint("1b-unit", "Cost per samosa", 1.5, "54 / (3 × 12)", [3]),
        checkpoint("1c-spent", "Petty cash payments", 490, "55 + 205 + 130 + 100", [2, 3]),
        checkpoint("1c-balance", "Closing petty cash", 10, "500 − 490", [2, 3]),
        checkpoint("1c-replenish", "Reimbursement", 490, "500 − 10", [3]),
        checkpoint("1d-markup", "Mark-up (%)", 36.3636363636, "(7.50 − 5.50) / 5.50 × 100", [3]),
      ],
    },
    2: {
      title: "Seagulls Water Sports Club: cash and reconciliation",
      verificationStatus: "independently-worked",
      answerSections: [
        ledger("2a", "2(a) Receipts and payments", 10, [4], ["Opening balance", "Subscriptions", "Social night", "Raffle", "Refreshment bar", "Bar wages", "Utilities", "Telecommunications", "Year's receipts total (working)", "Year's payments total (working)", "Totals and closing balance", "January 1 balance brought down"]),
        calc("2b", "2(b) Updated cash", 6, [5], ["Unadjusted balance", "Dishonoured cheque", "Insurance standing order", "Bank charges", "Direct subscriptions", "Updated balance"]),
        calc("2c", "2(c) Bank reconciliation", 4, [5], ["Updated cash balance", "Deposit not credited", "Unpresented utility cheque", "Unpresented telecommunications cheque", "Bank statement balance"]),
      ],
      modelSolution: [
        "2(a) Cash subscriptions = 98 × $150 + 5 × $75 = $15,075. Nine other members have paid nothing. Use cash received, rather than the $16,800 total annual subscriptions due. Opening available cash = $7,900 cash less $4,600 bank overdraft = $3,300.",
        "Receipts during the year are subscriptions $15,075, social tickets $3,000, raffle $2,800 and bar takings $19,300, total $40,175. Payments are social night $900, raffle prizes $700, bar purchases $5,400, wages $8,200, utilities $1,100 and telecommunications $1,800, total $18,100. Closing available cash = $3,300 + $40,175 − $18,100 = $25,375; bring it down on January 1, 2025.",
        "2(b) Updated cash = $25,375 − $150 dishonoured cheque − $2,500 insurance − $460 bank charges + 2 × $150 direct subscriptions = $22,565. Uncleared deposits and unpresented cheques are reconciliation items; do not post them twice.",
        "2(c) Starting with updated cash $22,565, subtract the deposit not yet credited $8,000 and add unpresented cheques $450 and $300. Favourable statement balance = $15,315. This follows the question's combined available-cash presentation; it does not invent an unprovided transfer between cash in hand and bank.",
      ],
      numericCheckpoints: [
        checkpoint("2a-subscriptions", "Subscriptions received", 15075, "98 × 150 + 5 × 75", [4]),
        checkpoint("2a-opening", "Opening available cash", 3300, "7,900 − 4,600", [4]),
        checkpoint("2a-receipts", "Year's receipts", 40175, "15,075 + 3,000 + 2,800 + 19,300", [4]),
        checkpoint("2a-payments", "Year's payments", 18100, "900 + 700 + 5,400 + 8,200 + 1,100 + 1,800", [4]),
        checkpoint("2a-closing", "Closing available cash", 25375, "3,300 + 40,175 − 18,100", [4]),
        checkpoint("2b-updated", "Updated cash", 22565, "25,375 − 150 − 2,500 − 460 + 300", [5]),
        checkpoint("2c-statement", "Favourable statement balance", 15315, "22,565 − 8,000 + 450 + 300", [5]),
      ],
    },
    3: {
      title: "John Wren: payroll",
      verificationStatus: "independently-worked",
      answerSections: [
        text("3a", "3(a) Two payroll source documents", 2, [6]),
        text("3b", "3(b) Payroll software", 1, [6]),
        calc("3c-i", "3(c)(i) Gross pay", 6, [6], ["Basic hours and pay", "Overtime hours", "Overtime rate and pay", "Gross pay"]),
        calc("3c-ii", "3(c)(ii) Income tax", 5, [6], ["Pension contribution", "Personal allowance", "National insurance", "Taxable pay", "Income tax"]),
        calc("3c-iii", "3(c)(iii) Net pay", 4, [6], ["Gross pay", "Actual deductions", "Net pay"]),
        text("3d", "3(d) Statutory and non-statutory deductions", 2, [6]),
      ],
      modelSolution: [
        "3(a) Examples include a time/clock card and an authorized employee wage-rate record. A job card or attendance record may also supply payroll evidence. (b) A suitable example is Sage Payroll or QuickBooks Payroll.",
        "3(c)(i) Basic pay = 40 × $80 = $3,200. Overtime hours = 60 − 40 = 20; overtime rate = 1.5 × $80 = $120. Overtime pay = $2,400. Gross pay = $5,600.",
        "3(c)(ii) Pension = 5% × $5,600 = $280. Taxable pay = $5,600 − $280 pension − $1,000 personal allowance − $150 national insurance = $4,170. Income tax = 10% × $4,170 = $417. Apply the exemptions printed in this exercise, rather than a particular country's tax rules.",
        "3(c)(iii) Actual deductions = $280 + $150 + $417 = $847. Net pay = $5,600 − $847 = $4,753. The personal allowance reduces taxable pay; it is not cash deducted from gross pay. (d) A statutory deduction is required by law. A non-statutory deduction is voluntary or separately authorized, such as a requested savings contribution.",
      ],
      numericCheckpoints: [
        checkpoint("3c-basic", "Basic pay", 3200, "40 × 80", [6]),
        checkpoint("3c-overtime", "Overtime pay", 2400, "20 × 80 × 1.5", [6]),
        checkpoint("3c-gross", "Gross pay", 5600, "3,200 + 2,400", [6]),
        checkpoint("3c-pension", "Pension", 280, "5,600 × 5%", [6]),
        checkpoint("3c-taxable", "Taxable pay", 4170, "5,600 − 280 − 1,000 − 150", [6]),
        checkpoint("3c-tax", "Income tax", 417, "4,170 × 10%", [6]),
        checkpoint("3c-net", "Net pay", 4753, "5,600 − 280 − 150 − 417", [6]),
      ],
    },
    4: {
      title: "JSR and the J and L Partnership",
      verificationStatus: "independently-worked",
      answerSections: [
        text("4a", "4(a) Accountant's duty", 1, [7]),
        table("4b", "4(b) Financial information users", 3, [7], ["Part", "User", "Reason where requested"], ["(i) Internal user", "(ii) and (iii) External user and reason"]),
        table("4c", "4(c) Statement classification", 4, [7], ["Transaction", "Income statement / financial position"], ["(i) Equipment installation", "(ii) Vehicle repairs", "(iii) Property purchase legal cost", "(iv) Six months' rent"]),
        statement("4d-i", "4(d)(i) Opening financial position", 7, [8], ["Equipment", "Vehicles", "Non-current assets total", "Inventory", "Receivables", "Bank", "Current assets total", "Payables", "Bank overdraft", "Current liabilities total", "Working capital", "Net assets", "Jennie's capital", "Lance's capital", "Total capital"]),
        calc("4d-ii", "4(d)(ii) Jennie's return", 5, [8], ["Capital-sharing ratio", "Jennie's profit share", "Return on capital (%)"]),
      ],
      modelSolution: [
        "4(a) An accountant may prepare and interpret financial statements. (b) A branch manager is an internal user. A bank is an external user that may assess loan repayment ability. Other well-matched users and reasons are possible. (c) Equipment installation and property-purchase legal costs are capitalized in financial position. Routine vehicle repairs and rent expense belong in the income statement.",
        "4(d)(i) Non-current assets: equipment $90,000 and vehicles $50,000, total $140,000. Current assets: inventory $58,000, receivables $37,000 and bank $50,000, total $145,000. Current liabilities: payables $30,000 and separate bank overdraft $5,000, total $35,000. Working capital = $110,000 and net assets = $250,000. Keep bank and overdraft separate unless offsetting is justified by information in the question.",
        "Jennie's capital = $90,000 + $28,000 + $12,000 + $50,000 − $30,000 = $150,000. Lance's capital = $50,000 + $30,000 + $25,000 − $5,000 = $100,000. Total capital agrees to net assets. (ii) Capital ratio = 3:2. Jennie's profit = 3/5 × $62,000 = $37,200. Her return = $37,200 ÷ $150,000 × 100 = 24.8%.",
      ],
      numericCheckpoints: [
        checkpoint("4d-nca", "Non-current assets", 140000, "90,000 + 50,000", [8]),
        checkpoint("4d-ca", "Current assets", 145000, "58,000 + 37,000 + 50,000", [8]),
        checkpoint("4d-cl", "Current liabilities", 35000, "30,000 + 5,000", [8]),
        checkpoint("4d-net", "Net assets", 250000, "140,000 + 145,000 − 35,000", [8]),
        checkpoint("4d-jennie", "Jennie's capital", 150000, "180,000 − 30,000", [8]),
        checkpoint("4d-lance", "Lance's capital", 100000, "105,000 − 5,000", [8]),
        checkpoint("4d-profit", "Jennie's profit share", 37200, "62,000 × 3/5", [8]),
        checkpoint("4d-return", "Jennie's return (%)", 24.8, "37,200 / 150,000 × 100", [8]),
      ],
    },
    5: {
      title: "Ownership and Grande Ravine Farmers' Cooperative",
      verificationStatus: "independently-worked-partial",
      answerSections: [
        table("5a", "5(a) Business types", 5, [9], ["Description", "Limited liability company", "Cooperative", "Non-profit organization"], ["(i)", "(ii)", "(iii)", "(iv)", "(v)", "(vi)", "(vii)", "(viii)"], "Use the eight descriptions in the source. A description may apply to more than one type."),
        statement("5b-i", "5(b)(i) Income and expenditure", 10, [10, 11], ["Membership fees", "Interest", "Income total", "Bank charges and interest", "AGM costs", "Auditor", "Vehicle running", "Office", "Equipment depreciation", "Vehicle depreciation", "Expenditure total", "Surplus"]),
        statement("5b-ii", "5(b)(ii) Appropriation", 5, [10, 11], ["Current surplus", "Opening undistributed surplus", "Available surplus", "Statutory reserve transfer", "Dividends", "Honorarium", "Closing undistributed surplus"]),
      ],
      modelSolution: [
        "5(a) Cooperatives normally follow one member, one vote and statutory reserve requirements; companies normally link votes to voting shares. Non-profit organizations pursue shared aims. Several descriptions allow multiple selections or depend on the organization's rules. A complete checked selection key is not claimed here; record reasons for choices that depend on the form of the organization.",
        "5(b)(i) Membership income = $576,000 + $24,000 due = $600,000. Add $21,000 interest: total income $621,000. Running costs = $89,000 + $11,000 = $100,000; office expense = $130,000 − $20,000 = $110,000. Equipment depreciation = 10% × $300,000 = $30,000. Vehicle depreciation = 20% × ($270,000 − $58,000) = $42,400.",
        "Expenses total $32,000 bank + $36,000 AGM + $30,000 auditor + $100,000 vehicle + $110,000 office + $30,000 equipment depreciation + $42,400 vehicle depreciation = $380,400. Surplus = $621,000 − $380,400 = $240,600.",
        "5(b)(ii) Interpreting the 20% transfer as based on current-year surplus gives reserve transfer $48,120. Opening undistributed surplus $120,000 plus current surplus $240,600 gives $360,600 available. Deduct reserve transfer $48,120, dividend $18,000 and board honorarium $15,000: closing undistributed surplus $279,480. The $80,000 reserve brought forward is a separate reserve balance, not income. Confirm the transfer base and honorarium treatment against an official scheme before publishing marks.",
      ],
      numericCheckpoints: [
        checkpoint("5b-membership", "Membership income", 600000, "576,000 + 24,000", [10, 11]),
        checkpoint("5b-income", "Total income", 621000, "600,000 + 21,000", [10, 11]),
        checkpoint("5b-dep", "Vehicle depreciation", 42400, "(270,000 − 58,000) × 20%", [10, 11]),
        checkpoint("5b-expenses", "Total expenditure", 380400, "32,000 + 36,000 + 30,000 + 100,000 + 110,000 + 30,000 + 42,400", [10, 11]),
        checkpoint("5b-surplus", "Surplus", 240600, "621,000 − 380,400", [10, 11]),
      ],
      unresolvedParts: ["5(a): complete multi-selection key", "5(b)(ii): confirm reserve base and honorarium treatment"],
    },
  },
  "poa-2-2025-mj": {
    1: {
      title: "Beharry: cash book and receivables",
      verificationStatus: "independently-worked",
      answerSections: [
        calc("1a", "1(a) Missing statement balances", 2, [2], ["(i) After invoice", "(ii) After credit note", "(iii) After cheque", "(iv) After discount"]),
        table("1b-i", "1(b)(i) Three-column cash book", 10, [3, 4], ["Line", "Debit date / details", "Discount allowed $", "Cash debit $", "Bank debit $", "Credit date / details", "Discount received $", "Cash credit $", "Bank credit $"], ["Opening balances", "August 9", "August 18", "August 24", "August 27 equipment", "August 27 repairs", "August 30", "August 31 contra", "Totals / balance carried down", "September 1 balance brought down"], "The scanned source shows opening cash $100 and opening bank overdraft $8,150. Separate equipment and repairs in the details."),
        text("1b-ii", "1(b)(ii) Meaning of bank balance", 1, [3]),
        text("1c", "1(c) Two electronic payment methods", 2, [5]),
        ledger("1d", "1(d) T. Mores receivable", 5, [2, 5], ["Opening balance", "Invoice", "Credit note", "Cheque", "Discount", "Totals / balance carried down", "September 1 balance brought down"]),
      ],
      modelSolution: [
        "1(a) $520 + $340 invoice = (i) $860; less $24 credit note = (ii) $836; less $663 cheque = (iii) $173; less $17 discount = (iv) $156.",
        "1(b)(i) Opening bank overdraft is $8,150, visually checked on the scanned page. Credit bank $462 for the dishonoured AD Supplies cheque and $64 for the wife's fuel, classified as drawings. T. Mores receives discount $680 × 2.5% = $17; debit bank $663 and enter $17 discount allowed. Credit bank $3,600 equipment and $400 repairs, or clearly distinguish both components of the $4,000 cheque.",
        "Debit cash $4,224 sales. Cash available = $100 + $4,224 = $4,324; retain $500 and transfer $3,824 from cash to bank with contra references. Closing signed bank balance = −$8,150 − $462 − $64 + $663 − $4,000 + $3,824 = −$8,189. Bring down cash $500 debit and bank overdraft $8,189 credit. Discount allowed total is $17; there is no discount received from the listed transactions.",
        "1(b)(ii) The business owes the bank $8,189. (c) Examples are an online bank transfer and a debit-card payment. (d) Debit T. Mores with opening balance $520 and Sales $340. Credit Sales Returns $24, Bank $663 and Discount Allowed $17. Balance carried down is $156 on the credit side; bring it down as a debit on September 1. Each ruled side totals $860.",
      ],
      numericCheckpoints: [
        checkpoint("1a-i", "Statement balance (i)", 860, "520 + 340", [2]),
        checkpoint("1a-ii", "Statement balance (ii)", 836, "860 − 24", [2]),
        checkpoint("1a-iii", "Statement balance (iii)", 173, "836 − 663", [2]),
        checkpoint("1a-iv", "Statement balance (iv)", 156, "173 − 17", [2]),
        checkpoint("1b-discount", "Discount allowed", 17, "680 × 2.5%", [3]),
        checkpoint("1b-banked", "Cash banked", 3824, "100 + 4,224 − 500", [3]),
        checkpoint("1b-cash", "Closing cash", 500, "100 + 4,224 − 3,824", [3]),
        checkpoint("1b-bank", "Closing bank credit balance (overdraft)", 8189, "Signed balance −8,189 is entered as positive 8,189 on the credit side", [3]),
        checkpoint("1d-balance", "T. Mores debit balance", 156, "520 + 340 − 24 − 663 − 17", [2, 3, 5]),
      ],
    },
    2: {
      title: "Amazona Company Ltd: income and appropriation",
      verificationStatus: "independently-worked",
      answerSections: [
        statement("2a", "2(a) Income statement", 11, [6, 7], ["Revenue", "Cost of sales", "Gross profit", "Rental income", "Operations", "Auditor", "Directors", "Wages", "Vehicle depreciation", "Debenture interest", "Expense total", "Profit"], "$'000"),
        statement("2b", "2(b) Appropriation", 9, [6, 8], ["Opening retained earnings", "Profit", "Profit available", "Interim ordinary dividend", "Final ordinary dividend", "Interim preference dividend", "Final preference dividend", "General reserve transfer", "Closing retained earnings"], "$'000"),
      ],
      modelSolution: [
        "Keep all figures in $'000, as printed. 2(a) Gross profit = 198,000 − 89,300 = 108,700. Add rental income 1,500 to give 110,200. Auditor = 3,600 + 5,000 accrued = 8,600. Wages = 20,100 − 2,000 prepaid = 18,100. Vehicle depreciation = 12% × 50,000 = 6,000. Annual debenture interest = 10% × 40,000 = 4,000; 200 paid leaves 3,800 accrued.",
        "Expenses = 2,900 operations + 8,600 auditor + 45,000 directors + 18,100 wages + 6,000 depreciation + 4,000 interest = 84,600. Profit = 110,200 − 84,600 = 25,600.",
        "2(b) Annual preference dividend = 8% × 10,000 nominal capital = 800; less interim 500 gives final 300. Ordinary dividends total 2,000 interim + 3,000 final = 5,000. Profit available = 13,500 opening earnings + 25,600 profit = 39,100. Closing retained earnings = 39,100 − 5,000 − 800 − 7,000 reserve transfer = 26,300. Closing general reserve = 15,000 + 7,000 = 22,000. Percentage preference dividends use nominal capital, rather than the number of shares.",
      ],
      numericCheckpoints: [
        checkpoint("2a-gross", "Gross profit ($'000)", 108700, "198,000 − 89,300", [6]),
        checkpoint("2a-audit", "Auditor ($'000)", 8600, "3,600 + 5,000", [6]),
        checkpoint("2a-wages", "Wages ($'000)", 18100, "20,100 − 2,000", [6]),
        checkpoint("2a-dep", "Depreciation ($'000)", 6000, "50,000 × 12%", [6]),
        checkpoint("2a-interest", "Annual interest ($'000)", 4000, "40,000 × 10%", [6]),
        checkpoint("2a-profit", "Profit ($'000)", 25600, "108,700 + 1,500 − 84,600", [6, 7]),
        checkpoint("2b-preference", "Final preference dividend ($'000)", 300, "10,000 × 8% − 500", [6, 8]),
        checkpoint("2b-retained", "Retained earnings ($'000)", 26300, "13,500 + 25,600 − 5,000 − 800 − 7,000", [6, 8]),
      ],
    },
    3: {
      title: "Amazona Company Ltd: financial position extract",
      verificationStatus: "independently-worked-partial",
      answerSections: [
        statement("3", "3 Statement of financial position extract", 20, [6, 9], ["Premises", "Vehicles at cost", "Accumulated depreciation", "Net vehicles", "Non-current assets total", "Receivables", "Bank", "Prepaid wages", "Current assets total", "Payables", "Accrued auditor", "Accrued interest", "Debentures: maturity classification", "Proposed dividends: stated treatment", "Current liabilities total", "Working capital", "Non-current liabilities where applicable", "Net assets"], "$'000"),
      ],
      modelSolution: [
        "Use $'000 throughout. Premises 175,000 plus net vehicles [50,000 − (20,000 + 6,000)] 24,000 gives non-current assets 199,000. Current assets supplied are receivables 18,600, bank 3,100 and prepaid wages 2,000, total 23,700. Liabilities supplied include payables 20,800, accrued audit 5,000 and accrued interest 4,000 − 200 = 3,800.",
        "The debentures are dated 2020 to 2025. Explain classification at December 31, 2024: if due within twelve months, the 40,000 is current. Do not invent a balancing inventory or another asset; the source is expressly a trial balance extract.",
        "Proposed final dividends require an explicit recognition convention. If the exercise recognizes final ordinary 3,000 plus final preference 300 as liabilities and treats the 2025 debentures as current, current liabilities are 72,900, working capital −49,200 and net assets 149,800. If proposed dividends are not liabilities at the reporting date, net assets differ by 3,300. The source does not state this convention. The complete net-assets figure is therefore excluded from automatic numeric feedback pending scheme confirmation.",
      ],
      numericCheckpoints: [
        checkpoint("3-dep", "Accumulated depreciation ($'000)", 26000, "20,000 + 6,000", [6, 9]),
        checkpoint("3-vehicles", "Net vehicles ($'000)", 24000, "50,000 − 26,000", [6, 9]),
        checkpoint("3-nca", "Non-current assets ($'000)", 199000, "175,000 + 24,000", [6, 9]),
        checkpoint("3-ca", "Current assets ($'000)", 23700, "18,600 + 3,100 + 2,000", [6, 9]),
        checkpoint("3-interest", "Accrued interest ($'000)", 3800, "40,000 × 10% − 200", [6, 9]),
      ],
      unresolvedParts: ["Confirm proposed-dividend recognition and debt maturity treatment before publishing marks"],
    },
    4: {
      title: "Simon's five-year investment",
      verificationStatus: "independently-worked",
      answerSections: [
        calc("4a", "4(a) Average annual rate", 3, [10], ["Total of annual rates", "Average annual rate (%)"]),
        calc("4b", "4(b) Total interest", 4, [10], ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Total interest"]),
        calc("4c", "4(c) Maturity payout", 3, [11], ["Principal", "Interest", "Payout"]),
        calc("4d", "4(d) Return on investment", 4, [11], ["Total five-year ROI (%)"]),
        text("4e", "4(e) Meaning of ROI", 2, [11]),
        text("4f", "4(f) Compare with the industry", 2, [12], "Use rates measured over the same period and the other-factors-equal comparison given."),
        table("4g", "4(g) Year 5 cash inflow", 2, [12], ["Cash inflow", "Amount $"], ["Cash sales", "Credit customer receipts", "Investment payout", "Total inflow"]),
      ],
      modelSolution: [
        "4(a) Rates sum to 2.50 + 2.75 + 3.00 + 3.25 + 3.50 = 15%; average annual rate = 15% ÷ 5 = 3%. Each year's interest is based on the original deposit, as expressly stated. Do not compound.",
        "4(b) Annual interest on $65,000 is $1,625; $1,787.50; $1,950; $2,112.50; and $2,275. Total interest = $9,750. (c) Principal $65,000 + interest $9,750 = maturity payout $74,750. (d) Five-year ROI = $9,750 ÷ $65,000 × 100 = 15%. (e) Each $100 originally invested earns $15 interest over the whole five years, while the principal is returned.",
        "4(f) Under the stated equal-other-factors comparison, 3% average annual interest exceeds the industry's 2% annual return by one percentage point. This supports the investment decision. Compare annual 3% with annual 2%, rather than five-year 15% with one year's 2%. (g) Year 5 cash inflow = $80,000 sales + $56,000 customer receipts + $74,750 maturity payout = $210,750. Include returned principal as cash received even though it is not interest income.",
      ],
      numericCheckpoints: [
        checkpoint("4a-average", "Average annual rate (%)", 3, "(2.5 + 2.75 + 3 + 3.25 + 3.5) / 5", [10]),
        checkpoint("4b-interest", "Total interest", 9750, "65,000 × 15%", [10]),
        checkpoint("4c-payout", "Maturity payout", 74750, "65,000 + 9,750", [11]),
        checkpoint("4d-roi", "Five-year ROI (%)", 15, "9,750 / 65,000 × 100", [11]),
        checkpoint("4g-inflow", "Year 5 cash inflow", 210750, "80,000 + 56,000 + 74,750", [12]),
      ],
    },
    5: {
      title: "Jam Block Club: expenditure and bank differences",
      verificationStatus: "independently-worked",
      answerSections: [
        text("5a", "5(a) Three sources of funds", 3, [13]),
        table("5b", "5(b) Expenditure classification", 5, [13], ["Expenditure", "Capital / revenue"], ["(i) Ink and paper", "(ii) New software", "(iii) Software installation", "(iv) Salaries", "(v) Grounds maintenance"]),
        ledger("5c", "5(c) Receipts and payments", 8, [14], ["Opening overdraft", "Refreshment bar", "Subscriptions", "Competition", "Donations", "Rent and insurance", "Shop assistant wages", "Year's receipts total (working)", "Year's payments total (working)", "Totals / balance carried down", "May 1 balance brought down"]),
        table("5d", "5(d) Reconciliation adjustments", 4, [15], ["Difference", "Receipts/payments overdraft + or −", "Amount $", "Bank statement overdraft + or −", "Amount $"], ["Uncleared deposit (example)", "Unpresented software cheque", "Dishonoured cheque", "Supplier cheque too low", "Direct subscriptions"], "Use positive overdraft amounts as in the source: plus increases the overdraft; minus reduces it."),
      ],
      modelSolution: [
        "5(a) Examples are donations, fundraising-event proceeds and refreshment-bar proceeds. Give three distinct sources other than subscriptions. (b) Ink/paper is revenue, new customized software and its directly attributable installation are capital, and salaries and routine grounds maintenance are revenue.",
        "5(c) Receipts = $210,000 bar + $60,200 subscriptions + $80,000 competition + $20,000 donations = $370,200. Payments = $142,000 bar purchases + $160,000 prizes + $40,000 rent/insurance + $39,000 wages = $381,000. Closing signed balance = −$2,600 opening overdraft + $370,200 − $381,000 = −$13,400. Place balance carried down $13,400 on the receipts/debit side when ruling the account, then bring down the overdraft on the payments/credit side on May 1.",
        "5(d) Under the source's positive-overdraft convention, the example is minus $10,000 to the bank statement overdraft. Add $2,759 unpresented software cheque to the bank statement overdraft. Add the $4,000 dishonoured cheque to the receipts/payments overdraft. The supplier payment is understated by $2,765 − $2,567 = $198: add $198 to that receipts/payments overdraft. Subtract $11,339 direct subscriptions from it. Leave the other record's adjustment columns blank for each item.",
      ],
      numericCheckpoints: [
        checkpoint("5c-receipts", "Total receipts", 370200, "210,000 + 60,200 + 80,000 + 20,000", [14]),
        checkpoint("5c-payments", "Total payments", 381000, "142,000 + 160,000 + 40,000 + 39,000", [14]),
        checkpoint("5c-closing", "Closing overdraft brought down on the credit side", 13400, "Signed balance −13,400 is entered as positive 13,400 on the credit side", [14]),
        checkpoint("5d-error", "Payment omitted from cash book", 198, "2,765 − 2,567", [15]),
      ],
    },
  },
};
