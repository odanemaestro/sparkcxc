// Printed specimen questions from the supplied syllabus, PDF pages 77–93.
// Preserve the question's wording and figures; solutions and source errata live separately.
const p = (text) => ({ type: "paragraph", text });
const t = (caption, columns, rows) => ({ type: "table", caption, columns, rows });
const part = (label, text, marks) => ({ type: "part", label, text, marks });
const blank = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(""));
export const POA_SPECIMEN_PAPER2_TEXT = {
  "poa-specimen-2-2017": [
    { number: 1, sourcePages: [77, 78, 79, 80], transcriptionStatus: "visually-checked", blocks: [
      p("R. Pierre is in the process of preparing her final accounts. The following information was made available on 31 March 2017."),
      t("", ["", "$"], [["Total non-current assets", "106 800"], ["Trade payables", "17 600"], ["Net sales", "260 000"], ["Closing inventory", "12 000"], ["Capital (1 April 2016)", "76 200"], ["Cost of sales", "86 000"], ["General expenses", "90 800"], ["Accounts receivable", "9 550"], ["Cash at bank", "35 000"], ["Cash in hand", "7 650"], ["Drawings", "6 000"]]),
      part("(a)", "Determine the following for R. Pierre (show working):"),
      part("(i)", "Net profit", 2),
      t("", ["", ""], blank(6, 2)),
      part("(ii)", "Gross profit percentage", 2),
      part("(b) (i)", "Prepare R. Pierre’s classified balance sheet (vertical format ONLY) and show working capital.", 9),
      part("(ii)", "Calculate current ratio.", 2),
      part("(c)", "Based on the current ratio in (c) (ii) above, briefly explain to Ms. Pierre’s her current financial position.", 5),
    ] },
    { number: 2, sourcePages: [81, 82, 83, 84], transcriptionStatus: "visually-checked", blocks: [
      p("Michelle Martin maintains both a three-column cash book and a petty cash book. The petty cash float is $300 every month. All payments for stationery and cleaning expenses are recorded in the petty cash book."),
      p("The balances at 1 December 2016 were as follows:"),
      t("", ["", "$"], [["Cash", "900"], ["Bank", "5 300"], ["Petty cash", "55"]]),
      p("During the month of December, the following transactions were recorded in the books:"),
      t("", ["Date", "Transactions"], [["December 1", "Restored imprest by cash to the petty cash book"], ["8", "Paid $500 rent by cheque $500"], ["9", "Received $900 cash from S. Smith in full settlement of his account for $1 000"], ["10", "Purchased office stationery for $15, and cleaning supplies for $25.95"], ["12", "Bought office stationery for $52.50"], ["13", "Purchased printing paper for $9.95"], ["15", "Deposited $400 cash into bank"], ["16", "P. Kan paid his account of $800 by cheque, less 5% discount"], ["19", "Owner withdrew $200 cash for private use"], ["21", "Purchased heavy duty stapler for $39.75"], ["25", "Paid cheque to L. Lamb for amount owing, $800 receiving 2% discount"], ["28", "Paid cleaning wages for $75"]]),
      part("(a)", "Draw up a three-column cash book for Michelle Martin for the month of December 2016.", 8),
      part("(b)", "Draw up a petty cash book for Michelle Martin for the month of December 2016.", 7),
      t("Michelle Martin — Petty Cash Book", ["Amount $", "Date", "Details", "Total $", "Stationery $", "Cleaning $"], blank(12, 6)),
      part("(c)", "What is the significance of the balances in the cash books?", 5),
    ] },
    { number: 3, sourcePages: [85, 86, 87], transcriptionStatus: "visually-checked", blocks: [
      p("Jollibee Limited manufactures antique furniture. The following is a list of accounts for the year ended December 31, 2016."),
      t("", ["", "$"], [["Raw materials inventory    1/1/2016", "150 000"], ["Finished goods inventory    1/1/2016", "50 000"], ["Work in progress    1/1/2016", "10 000"], ["Purchase of raw materials during the year", "200 000"], ["Factory workers wages", "40 000"], ["Office staff wages", "10 000"], ["Factory equipment at cost", "300 000"], ["Factory repairs", "5 000"], ["Carriage inwards on raw materials", "3 000"], ["Factory electricity", "2 000"]]),
      p("The following additional information was also provided at December 31, 2016:"),
      t("", ["", "$"], [["Raw materials inventory (31/12/2016)", "50 000"], ["Finished goods inventory (on hand 31/12/2016)", "30 000"], ["Work in progress inventory (31/12/2016)", "20 000"], ["Depreciation of Factory equipment", "20%"]]),
      part("(a)", "Prepare the manufacturing account for the year ended December 31, 2016, showing clearly", 11),
      p("(i) Cost of raw materials used\n(ii) Prime costs\n(iii) Production costs"),
      part("(b)", "During the year ended December 31, 2016 Jollibee Limited manufactures a total of 50 000 antique furniture. Calculate the unit cost of production for the year.", 2),
      part("(c)", "List the methods of inventory valuation.", 3),
      part("(d)", "Identify TWO types of payment Jollibee Limited may use for goods purchased.", 2),
      part("(e)", "Identify TWO skills needed for a career in the field of accounting.", 2),
    ] },
    { number: 4, sourcePages: [88, 89, 90], transcriptionStatus: "visually-checked", blocks: [
      part("(a)", "Outline TWO advantages of starting a limited liability company rather than a partnership type company.", 2),
      part("(b)", "List FOUR ethical issues encountered in accounting.", 4),
      p("Robert More Company Limited issued the following to shareholders"),
      p("200 000 ordinary $2 shares are par\n100 000 10% preference $5 shares at par\n500 $100 debentures"),
      part("(c)", "Prepare the journal entry, using the form provided below, to show the issue of shares and debentures for the above company (narrative required).", 10),
      t("", ["Date", "Details", "Ref", "Debit $", "Credit $"], blank(7, 5)),
      p("Jamrock Charity Club lists the following balances for the period ended December 31, 2016."),
      t("", ["", "$"], [["Subscriptions received", "20 000"], ["Bar takings", "15 000"], ["Bar purchases", "10 000"], ["Purchased equipment", "10 000"], ["Depreciation expense for the year", "2 000"]]),
      part("(d)", "Prepare a Receipts and Payments Account for the Jamrock Charity Club for the period ended December 31, 2016.", 4),
      t("", ["", "$", "", "$"], blank(8, 4)),
    ] },
    { number: 5, sourcePages: [91, 92, 93], transcriptionStatus: "visually-checked", blocks: [
      part("(a)", "List TWO accounting software programmes used for payroll.", 2),
      part("(b)", "State TWO differences between statutory deductions and voluntary deductions.", 4),
      t("", ["Statutory Deductions", "Voluntary Deductions"], blank(12, 2)),
      p("Quick Fix Electronics produces and sells a new model of computers. The computers sell for $3 000 per unit. As a result of the intense competition Quick Fix faces, management budget sales quarterly, the projections for the first 4 quarters for 2016 are as follows:"),
      t("UNIT SALES", ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"], [["3 000", "4 000", "7 000", "8 000"]]),
      p("No anticipated changes in the selling price"),
      part("(c)", "Prepare a sales budget for each quarter showing the following:", 7),
      p("(i) the unit selling price\n(ii) the expected sales\n(iii) the total"),
      t("", ["Details", "Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4", "Year as a whole"], blank(4, 6)),
      part("(d)", "List FOUR main sections of a business plan.", 4),
      part("(e)", "Identify THREE essential features of a Co-operative.", 3),
    ] },
  ],
};
