// SPARK's independently worked guidance for supplied historical papers.
// The source PDFs provide question/part caps, not official marking schemes.
const text = (id, label, maxMarks, sourcePages) => ({ id, label, kind: "text", maxMarks, sourcePages });
const table = (id, label, maxMarks, sourcePages, columns, rows, instructions) => ({ id, label, kind: "table", maxMarks, sourcePages, columns, rows, instructions });
const calc = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Calculation", "Working", "Answer"], rows);
const statement = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Line", "Details / working", "Amount $", "Subtotal $"], rows);
const ledger = (id, label, maxMarks, sourcePages, rows) => table(id, label, maxMarks, sourcePages, ["Line", "Debit date / details", "Debit $", "Credit date / details", "Credit $"], rows);
const cashColumns = ["Line", "Debit date / details", "Discount allowed $", "Cash debit $", "Bank debit $", "Credit date / details", "Discount received $", "Cash credit $", "Bank credit $"];
const point = (id, label, expected, responseCell, working, sourcePages, extra = {}) => ({ id, label, expected, responseCell, working, sourcePages, tolerance: 0.005, status: "independently-worked", scoringUse: "practice-feedback-only", ...extra });

export const POA_HISTORICAL_PAPER2_MORE_DETAILS = {
  "poa-2-2025-jan": {
    1: {
      title: "House of Razzle Dazzle: journals and cash book", verificationStatus: "independently-worked", partMarkCapsUnavailable: true,
      answerSections: [
        table("1daybooks", "1 Credit-trade journals", null, [2, 3, 4], ["Transaction", "Journal name", "Party / details", "Net amount $"], ["October 3", "October 12", "October 18", "October 25"], "The printed 20 marks cover the whole question. No separate marks are printed for the individual journals."),
        table("1general", "1 General journal", null, [2, 3], ["Line", "Date / account / narrative", "Debit $", "Credit $"], ["October 14 debit", "October 14 credit", "October 14 narrative", "October 19 debit", "October 19 credit", "October 19 narrative"]),
        table("1cash", "1 Three-column cash book", null, [2, 5], cashColumns, ["October 6", "October 7", "October 8 contra", "October 27", "October 29", "Totals", "Balances carried down", "November balances brought down"]),
      ],
      modelSolution: [
        "Credit-trade journals: October 3 purchases from Z-Fashion House $6,000 less 25% = $4,500; October 12 returns outwards to Z-Fashion $1,800 less 25% = $1,350; October 18 sales to Queen Bee $3,600 less 15% = $3,060; October 25 returns inwards from Queen Bee $460 less 15% = $391. Trade discounts reduce the amounts recorded; they are not separately posted as cash discounts.",
        "General journal: October 14 debit Shelves/Shop Fixtures $4,790 and credit Display House $4,790, with a narrative for fixtures bought on credit. October 19 debit Display House $1,200 and credit Shelves/Shop Fixtures $1,200, with a return narrative. These are assets for business use rather than goods bought for resale. The return row says purchased on 14 March although the transaction list is for October and the purchase is listed on October 14; the worked entry follows the matching purchase in this list.",
        "Cash book: debit Cash $13,954 sales; credit Cash $2,600 advertising. The $10,000 bank deposit is a contra: credit Cash and debit Bank. Z-Fashion amount owed is $4,500 − $1,350 = $3,150. Cash discount received = 2% × $3,150 = $63; credit Bank $3,087. Queen Bee owes $3,060 − $391 = $2,669; allow $175 discount and debit Bank $2,494. No opening balances are supplied, so the listed transactions give closing cash $1,354 and bank $9,407. Bring both down as debits. Discount allowed totals $175; discount received totals $63.",
      ],
      numericCheckpoints: [
        point("25j1-purchase", "Net credit purchase", 4500, "1daybooks:0:3", "6,000 × 75%", [2]),
        point("25j1-preturn", "Net purchase return", 1350, "1daybooks:1:3", "1,800 × 75%", [2]),
        point("25j1-sale", "Net credit sale", 3060, "1daybooks:2:3", "3,600 × 85%", [2]),
        point("25j1-sreturn", "Net sales return", 391, "1daybooks:3:3", "460 × 85%", [2]),
        point("25j1-supplier", "Supplier cheque", 3087, "1cash:3:8", "(4,500 − 1,350) × 98%", [2]),
        point("25j1-discount", "Discount received", 63, "1cash:3:6", "3,150 × 2%", [2]),
        point("25j1-customer", "Customer cheque", 2494, "1cash:4:4", "3,060 − 391 − 175", [2]),
        point("25j1-cash", "Closing cash debit", 1354, "1cash:7:3", "13,954 − 2,600 − 10,000", [2]),
        point("25j1-bank", "Closing bank debit", 9407, "1cash:7:4", "10,000 − 3,087 + 2,494", [2]),
      ],
      sourceNotes: ["October 19 return refers to a 14 March purchase; the matching supplied fixture purchase is dated October 14."],
    },
    2: {
      title: "Brown Leggy Ltd: payroll systems and accounting principles", verificationStatus: "independently-worked",
      answerSections: [
        table("2a", "2(a) Pay systems", 5, [6], ["Pay system", "Definition"], ["Fixed rate", "Hourly rate", "Piece rate", "Commission", "Bonus"]),
        table("2b", "2(b) Journal postings", 6, [7], ["Journal", "Debit account", "Debit ledger", "Credit account", "Credit ledger"], ["Sales", "Returns outwards"]),
        table("2c", "2(c) Principles", 4, [8], ["Situation", "Letter / principle", "Reason (working)"], ["Depreciation over useful life", "Verifiable invoices and cheques", "Sales paid in advance", "Accurate performance reports"]),
        table("2d", "2(d) Reasons for ratio changes", 4, [9], ["Ratio", "Reason 1", "Reason 2"], ["Receivable collection: 45 to 35 days", "Payable payment: 30 to 40 days"]),
        text("2e", "2(e) Inadequate working capital", 1, [9]),
      ],
      modelSolution: [
        "2(a) Fixed-rate pay is an agreed amount for a period; hourly pay is hours worked × hourly rate; piece pay is units completed × rate per unit; commission is pay linked to sales, usually a percentage; a bonus is additional pay for a target, performance or another agreed condition.",
        "2(b) Sales journal: debit the customer/receivables account in the sales ledger (or receivables control in the general ledger), and credit Sales in the general ledger. Returns outwards: debit supplier/payables in the purchases ledger (or payables control in the general ledger), and credit Returns Outwards in the general ledger. Observe both the account and ledger requested.",
        "2(c) The useful-life depreciation situation is most directly associated with going concern, D: the business is expected to continue using its assets. Verifiable records illustrate objectivity, C. Not recognizing sales merely because cash is received in advance illustrates accruals, E. Accurate reports illustrate true and fair view, B. This is an independently reasoned matching key rather than an official scheme.",
        "2(d) Collection falling from 45 to 35 days may result from stronger credit control or incentives for prompt payment. Payment rising from 30 to 40 days may result from negotiated longer supplier credit or cash shortages delaying settlement. Give two possible reasons for each change, rather than merely repeating that days changed. (e) Insufficient working capital may prevent the business from paying suppliers when due, interrupting supplies or operations.",
      ], numericCheckpoints: [],
    },
    3: {
      title: "Callies Manufacturing Company: depreciation and unit costs", verificationStatus: "independently-worked",
      answerSections: [
        text("3a", "3(a) Depreciation", 1, [10]),
        table("3b", "3(b) Depreciation methods", 5, [10], ["Year", "Straight-line working", "Straight-line charge $", "Reducing-balance working", "Reducing-balance charge $"], ["2023", "2024"]),
        statement("3c", "3(c) Manufacturing account", 7, [11], ["Opening raw materials", "Purchases", "Closing raw materials", "Materials used", "Direct labour", "Prime cost", "Factory overheads", "Cost before WIP", "Opening WIP", "Closing WIP", "Production cost"]),
        calc("3d", "3(d) Unit production cost", 2, [12], ["Production cost ÷ units"]),
        calc("3e", "3(e) Unit selling price", 2, [12], ["Unit cost plus 60% mark-up"]),
        calc("3f", "3(f) Operating expenses", 3, [12], ["Sales revenue", "20% operating expenses"]),
      ],
      modelSolution: [
        "3(a) Depreciation allocates a non-current asset's depreciable cost over its useful life. (b) Straight-line charge = ($50,000 − $10,000 residual value) ÷ 5 = $8,000 in both 2023 and 2024. Reducing-balance charge: 2023 $50,000 × 25% = $12,500; 2024 ($50,000 − $12,500) × 25% = $9,375.",
        "3(c) Materials used = $47,500 + $142,500 − $60,000 = $130,000. Add direct labour $197,500 to get prime cost $327,500. Add factory overheads $141,250 to get $468,750. Add opening WIP $20,000 and subtract closing WIP $18,750: production cost $470,000.",
        "3(d) Unit cost = $470,000 ÷ 22,500 = $20.888888…, or $20.89 to cents. (e) Carrying unrounded cost, selling price = $20.888888… × 1.60 = $33.422222…, or $33.42 to cents. (f) Carrying full precision, revenue is $752,000 and expenses 20% × $752,000 = $150,400. If a rounded $33.42 selling price is consistently used, revenue $751,950 gives expenses $150,390. The question gives no rounding rule; preserve the working rather than treating a consistent rounding difference as a conceptual error.",
      ],
      numericCheckpoints: [
        point("25j3-sl2023", "Straight-line 2023", 8000, "3b:0:2", "(50,000 − 10,000) / 5", [10]),
        point("25j3-sl2024", "Straight-line 2024", 8000, "3b:1:2", "Same annual straight-line charge", [10]),
        point("25j3-rb2023", "Reducing balance 2023", 12500, "3b:0:4", "50,000 × 25%", [10]),
        point("25j3-rb2024", "Reducing balance 2024", 9375, "3b:1:4", "37,500 × 25%", [10]),
        point("25j3-materials", "Materials used", 130000, "3c:3:3", "47,500 + 142,500 − 60,000", [11]),
        point("25j3-prime", "Prime cost", 327500, "3c:5:3", "130,000 + 197,500", [11]),
        point("25j3-production", "Production cost", 470000, "3c:10:3", "327,500 + 141,250 + 20,000 − 18,750", [11]),
        point("25j3-unit", "Unit cost", 20.8888888889, "3d:0:2", "470,000 / 22,500", [12]),
        point("25j3-price", "Unit selling price", 33.4222222222, "3e:0:2", "(470,000 / 22,500) × 1.6", [12]),
      ],
      reviewNotes: ["Part 3(f) has rounding alternatives; no single final-expense numeric checkpoint is asserted."],
    },
    4: {
      title: "Ray's Appliances: moving-average inventory", verificationStatus: "independently-worked-partial",
      answerSections: [
        text("4a-i", "4(a)(i) Another valuation method", 1, [13]),
        text("4a-ii", "4(a)(ii) Explain that method", 1, [13]),
        table("4b", "4(b) AVCO inventory", 8, [13, 14], ["Date", "Cost in $", "Cost out $", "Units remaining", "Average-cost working", "Value remaining $"], ["December 1", "December 6", "December 13", "December 19", "December 23", "December 29", "December 30"], "The source asks for calculations rounded to the nearest dollar. State how you carry average-cost precision between rows."),
        calc("4c", "4(c) December purchase cost", 2, [15], ["Total purchases during December"]),
        calc("4d", "4(d) Sales revenue", 2, [15], ["Units sold", "Revenue"]),
        statement("4e", "4(e) Income statement", 6, [16], ["Sales", "Opening inventory", "Purchases", "Goods available", "Closing inventory", "Cost of sales", "Gross income"]),
      ],
      modelSolution: [
        "4(a) FIFO is an alternative: issue the oldest cost layers first. LIFO, issuing the most recent layers first, is another alternative under this examination's inventory-method context.",
        "4(b) Quantities remaining after each event are 502, 627, 370, 545, 223, 423 and 13 units. Purchase costs are $28,750, $42,875 and $52,000. Opening value is $100,400. Recalculate weighted average after each purchase, rather than taking an unweighted average of the quoted unit prices.",
        "Rounding the unit average to whole dollars at each purchase gives displayed averages $206, $219 and $238. Valuing the final 13 units at $238 gives $3,094. This repeated unit rounding can produce small differences between accumulated issue costs and the opening-plus-purchases-minus-closing control. Carrying full precision internally and rounding displayed monetary results gives closing inventory about $3,096 instead. The source's instruction to round all calculations does not explain whether rounded unit averages must be carried into later rows; the worked guidance identifies both precision treatments rather than silently treating them as identical.",
        "4(c) December purchases = 125 × $230 + 175 × $245 + 200 × $260 = $123,625. (d) Units sold = 257 + 322 + 410 = 989; revenue = 989 × $650 = $642,850. (e) Using the whole-dollar-average closing inventory $3,094, cost of sales = $100,400 + $123,625 − $3,094 = $220,931 and gross income $421,919. Using closing $3,096 instead gives cost of sales $220,929 and gross income $421,921. Retain the AVCO working and rounding policy alongside the statement.",
      ],
      numericCheckpoints: [
        point("25j4-endunits", "Closing inventory units", 13, "4b:6:3", "502 + 125 + 175 + 200 − 257 − 322 − 410", [13]),
        point("25j4-purchases", "December purchases", 123625, "4c:0:2", "125 × 230 + 175 × 245 + 200 × 260", [13, 15]),
        point("25j4-sold", "Units sold", 989, "4d:0:2", "257 + 322 + 410", [13, 15]),
        point("25j4-revenue", "Sales revenue", 642850, "4d:1:2", "989 × 650", [15]),
      ], unresolvedParts: ["4(b), 4(e): confirm whether rounded unit averages or full internal precision are carried forward"],
    },
    5: {
      title: "COSTCO Sports Centre: correcting errors", verificationStatus: "independently-worked",
      answerSections: [
        ledger("5a", "5(a) Suspense account", 6, [17], ["Opening trial-balance difference", "Purchases error", "Petty cash omitted", "Stationery omitted", "Totals / closed balance"]),
        table("5b", "5(b) Other correcting journal entries", 8, [17, 18], ["Line", "Date / account / narrative", "Debit $", "Credit $"], ["Error 2 debit", "Error 2 credit", "Error 2 narrative", "Error 4 debit", "Error 4 credit", "Error 4 narrative", "Error 5 debit", "Error 5 credit", "Error 5 narrative"]),
        statement("5c", "5(c) Revised profit", 6, [19], ["Draft net profit", "Purchases correction", "Repairs correction", "Stationery correction", "Revised net profit"]),
      ],
      modelSolution: [
        "5(a) The debit side was short, so Suspense begins with debit $368. Correct undercast purchases by debiting Purchases $18 and crediting Suspense $18. Restore the omitted petty cash trial-balance debit $200 against Suspense, and debit Stationery $150 against Suspense. Suspense credits total $18 + $200 + $150 = $368, so the account closes. Omission from the trial balance alone must not create a duplicate petty-cash balance in an already correct ledger.",
        "5(b) Error 2: debit DDE Ltd $1,500 and credit DEC Ltd $1,500, to transfer the receipt to the correct customer. Error 4: debit Repairs $293 and credit Motor Vehicles $293, to remove a revenue cost from the asset. Error 5: debit Fixtures $6,000 and credit TS Supplies $6,000; the original $3,000 entry was completely reversed, so correcting it requires twice that amount. Include suitable narratives for each entry.",
        "5(c) Profit-affecting corrections are additional purchases $18, repairs $293 and stationery $150, all reducing profit. Revised profit = $13,000 − $18 − $293 − $150 = $12,539. The wrong customer, omitted petty cash trial-balance item and reversed fixtures/payable entry do not themselves alter this profit.",
      ],
      numericCheckpoints: [
        point("25j5-opening", "Suspense opening debit", 368, "5a:0:2", "Debit side trial-balance shortage", [17]),
        point("25j5-purchases", "Suspense purchases credit", 18, "5a:1:4", "6,842 − 6,824", [17]),
        point("25j5-petty", "Suspense petty-cash credit", 200, "5a:2:4", "Omitted debit 200", [17]),
        point("25j5-stationery", "Suspense stationery credit", 150, "5a:3:4", "Omitted expense debit 150", [17]),
        point("25j5-fixtures", "Fixtures correction debit", 6000, "5b:6:2", "Reverse 3,000 and post correct 3,000", [17, 18]),
        point("25j5-profit", "Revised profit", 12539, "5c:4:3", "13,000 − 18 − 293 − 150", [17, 19]),
      ],
    },
  },
};
