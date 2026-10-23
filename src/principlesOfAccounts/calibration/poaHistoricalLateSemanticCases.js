/**
 * Independent source replay for historical semantic/entry/presentation points.
 * Claims below were written from the supplied question and independently worked
 * guidance, without importing marking policies, proof strings or grader output.
 * Some coherent scripts cover several related source facts; each map binding
 * names the one target point to assess. These are SPARK policy calibration
 * cases, not an assertion that an official historical scheme was supplied.
 */
const cases = {};
const prose = (text) => text.replace(/(?<=[A-Za-z])(?=[\d$])/g, " ").replace(/(?<=\d)(?=[A-Za-z])/g, " ");
function bind(year, sitting, questionNumber, ids, correct, alternative, wrong, sourceNote) {
  const paperId = `poa-2-${year}-${sitting}`;
  for (const pointId of ids.split(/\s+/).filter(Boolean)) {
    const key = `${paperId}|${questionNumber}|${pointId}`;
    if (cases[key]) throw new Error(`Duplicate independent semantic fixture: ${key}`);
    cases[key] = { correct: prose(correct), alternative: prose(alternative), wrong: prose(wrong), authority: "independent-source-replay", sourceNote: `${paperId} question ${questionNumber}: ${sourceNote}` };
  }
}

bind(2015, "mj", 1, "a-1 a-2 a-3 a-4 a-5 a-6 a-7 a-8 a-9 a-10",
  "Debit Bank7800 and credit Capital7800 for the owner's introduction. The credit purchase after10% trade discount is debit Purchases1620, credit Yazmin1620. The owner's goods withdrawal is debit Drawings60, credit Purchases60. Equipment acquired on credit: debit Equipment3500, credit Equipo3500. Supplier return after trade discount: debit Yazmin144, credit Returns Outwards144.",
  "Bank is debited$7800; Capital is credited$7800. Purchases is debited$1620 and supplier Yazmin credited$1620. Drawings is debited$60 with Purchases credited$60. Equipment debit$3500 has Equipo credit$3500. Return to Yazmin: Yazmin debit$144; Returns Outwards credit$144.",
  "Credit Bank7800 and debit Capital7800. Credit Purchases1620 and debit Yazmin1620. Credit Drawings60 and debit Purchases60. Credit Equipment3500 and debit Equipo3500. Credit Yazmin144 and debit Returns Outwards144.",
  "April transactions:1800 less10%=1620; return160 less10%=144; supplied capital/equipment/drawings figures.");
bind(2015, "mj", 2, "a-1 a-2 b-1 b-2",
  "A partnership has two or more owners who agree to share profits or losses. Barney's credit current balance2500 is an amount owed to Barney by the firm. Swiper's debit current balance600 means Swiper owes the partnership after excess withdrawals or charges.",
  "At least two people jointly own the business and divide its results under their agreement. The firm owes Barney2500 on his current account; Swiper must repay600 because his current account is overdrawn.",
  "A partnership has exactly one owner who keeps every profit alone. Barney's credit current balance means he owes the firm2500. Swiper's debit600 is money the partnership owes Swiper.",
  "Distinguishing partnership features and printed opening current-account sides.");
bind(2015, "mj", 3, "c-3 c-4 d-1 d-2",
  "Support the bank loan using the current ratio33690/14310=2.35:1: current assets cover short-term liabilities more than twice. A computer makes transaction processing and reports faster, but equipment, software and staff training cost money and data must be backed up.",
  "On the current-ratio evidence the loan may be approved, since liquidating the recorded current assets would cover current debts about2.35times. Computerized accounts save processing time; buying the system and protecting its records are disadvantages to budget for.",
  "Reject the loan because a2.35:1 current ratio proves that current assets are below current liabilities. Computers eliminate every possible accounting error, cost nothing and never need backups.",
  "33690/14310 supports a qualified approval; the guidance also permits a justified acid-test rejection.");
bind(2015, "mj", 4, "b-2 b-3 b-5 c-i-4 c-i-5 c-ii-4",
  "From the updated cash-book overdraft subtract the uncredited deposit500 and add the unpresented cheque180. These are timing differences and are not posted into the updated cash book again. Credit purchases from Up Top, Harry and Sealey belong in the Purchases Day Book. Reuse each customer's ledger folio consistently on sales and returns. The Returns Outwards Day Book has no transactions and totals nil.",
  "Deduct500 deposited but not yet credited; add180 of cheques not yet presented when reconciling cash book to statement. Keep both timing items out of cash-book adjustment. Record suppliers' credit invoices in the purchases journal, carry the same personal-account reference across related entries, and leave purchases returns at zero because none occurred.",
  "Add the uncredited deposit500 and subtract the unpresented cheque180, then post both into the cash book for a second time. Put supplier invoices in the Sales Day Book. Change a customer's ledger folio on each return. Invent a purchase return so the Returns Outwards Day Book has a positive total.",
  "October reconciliation and April day-book transactions; no supplier return is supplied.");
bind(2015, "mj", 5, "a-ii-4 b-9",
  "Debit Payables Control for payments194400, discount received3560 and purchases returns1740. Sedeno's trading account shows sales355950 less cost of sales237300, giving gross profit118650; all completed production was sold, so cost of production becomes cost of sales.",
  "Amounts paid to suppliers, cash discount received and returns to suppliers reduce the control account on its debit side. Present the trading statement as revenue355950 minus the237300 production cost sold, leaving118650 gross profit.",
  "Credit Payables Control with payments194400, discount received3560 and purchases returns1740. The trading account adds cost of sales to revenue and describes the result as net profit; assume unsupplied finished goods remain unsold.",
  "Payables control reductions and the explicit100%-of-completed-goods-sold condition.");
bind(2015, "mj", 6, "a-ii-4 a-ii-5 a-ii-6 a-ii-7 b-1 b-2 b-3 b-4",
  "Subscriptions Account: debit opening arrears8000; credit opening advances22000. Carry closing arrears12000 down on the credit side and closing advances19600 down on the debit side; next opening arrears are debit and advances credit. The ID-card machine is capital expenditure in the balance sheet. Manifesto printing and rally advertising are revenue expenditure in Income and Expenditure. The bus deposit and headquarters extension are capital expenditure in the balance sheet.",
  "Opening unpaid subscriptions8000 enter the debit side; opening prepaid subscriptions22000 enter credit. Closing arrears12000 are c/d credit then b/d debit; closing prepayments19600 are c/d debit then b/d credit. Capitalize the machine, bus and building improvement as assets; expense the convention printing and advertising in the income/expenditure statement.",
  "Credit opening arrears8000 and debit opening advances22000. Close arrears12000 on debit and advances19600 on credit, then reverse those opening sides next year. Expense the ID machine, bus deposit and building extension as revenue costs; capitalize annual printing and advertising as permanent balance-sheet assets.",
  "Subscription-account sides from the source opening/closing arrears and advances; listed expenditure purposes.");
bind(2015, "mj", 7, "a-11 b-i-3",
  "The appropriation account credits current surplus65000 and brought-forward surplus125000, and debits dividends, education transfer, disaster transfer, patronage refunds and surplus carried forward; both sides total190000. In members' funds show Members' Welfare Fund40000 and Flood Relief Fund95000 separately as restricted funds.",
  "Surplus available190000 is appropriated among dividend50000, education38000, disaster57000, patronage17500 and retained27500, with the account balanced. Welfare40000 and flood relief95000 are designated members' reserves, rather than amounts added to outside liabilities.",
  "Put distributions on the credit side and brought-forward surplus on debit, leaving the appropriation account unbalanced. Treat Welfare40000 and Flood Relief95000 as loans payable to outsiders or as current-year operating expenses.",
  "Cooperative appropriation and separate named restricted funds in the capital extract.");

bind(2016, "mj", 1, "a-1 a-2 b-1 d-7 d-8",
  "The agreement may specify capital contributions and management duties. With no agreed profit-sharing ratio, profits and losses are shared equally. The printed48576 current-liability line conflicts with the separate41000 loan: literal liabilities give net assets148424, not partners' funds189424. Only under the explicit assumption that48576 includes the loan may current liabilities be7576 and the balance sheet reconcile.",
  "Partners can agree who invests what and how responsibilities are divided. Silence on profit sharing gives a1:1 division in this exercise. Show the source classification discrepancy rather than force balance; the reconciling interpretation expressly reclassifies the41000 loan out of aggregate liabilities48576.",
  "Partnership agreements cannot mention capital or management. In the absence of a ratio one partner keeps all profit. All printed liabilities reconcile without assumptions, so add an invented41000 asset and silently change liabilities to make the balance sheet balance.",
  "Partnership features and the source's contradictory current-liability/loan classification.");
bind(2016, "mj", 2, "a-3 a-4 c-5 d-8",
  "Goods withdrawn by the owner: debit Drawings900, credit Purchases900. The personal cash donation300 is also drawings, not a business expense. After coherent corrections the assets less liabilities95065 differ from owner funds96465 by1400; report this source disagreement rather than invent suspense or extra drawings.",
  "Record the proprietor's stock take as Drawings Dr900 and Purchases Cr900. Her private donation reduces drawings/cash, not operating profit. Disclose the1400 unexplained difference between net assets and capital rather than plug the statement.",
  "Credit Drawings900 and debit Purchases900 for goods taken. Charge the owner's private donation300 to business expenses. Hide the1400 source difference by inventing a liability or changing opening capital without evidence.",
  "Owner withdrawals, donation purpose and the recomputed1400 source mismatch.");
bind(2016, "mj", 3, "a-i-9 a-ii-2 a-ii-3 b-1 b-2 c-1 c-2 d-1 d-2 d-3",
  "Bring the2510 bank overdraft down credit. For reconciliation subtract the8000 uncredited deposits and add the5200 unpresented cheques. Bank charges100 and insurance900 reduce net income. An owner-manager is internal; a bank lender is external. Private housekeeper wages violate business entity, recognizing next year's anticipated gain violates realization/prudence, and unjustified annual depreciation-method changes violate consistency.",
  "A negative bank balance2510 is b/d on the credit side. Deduct deposits awaiting credit and add outstanding cheques to reach statement overdraft5310. Treat charges and the applicable insurance as expenses. Managers use accounts inside the firm; lenders use them outside. Keep the owner's wages separate, defer unearned disposal gains, and apply depreciation methods consistently.",
  "Bring an overdraft down debit. Add uncredited deposits8000 and deduct outstanding cheques5200. Bank charges and insurance increase profit. A lender is internal and the owner-manager external. Personal expenses belong in the business, next year's unrealized gain is earned now, and arbitrary annual method changes satisfy consistency.",
  "September bank update/reconciliation, income adjustments, user classification and three source concept scenarios.");
bind(2016, "mj", 5, "a-7 b-6 b-7",
  "Accumulated fund185100 is the club's members' capital; member loans are assets, with no unsupported maturity assumed. Closing subscription arrears1400 carry down credit and bring down debit. Closing advances2100 carry down debit and bring down credit.",
  "The excess of club assets over liabilities is the accumulated fund, not a business sales profit. Show unpaid closing subscriptions1400 as a next-year debit and prepaid subscriptions2100 as a next-year credit, with opposite c/d balancing sides.",
  "Classify accumulated fund as an outside liability and member loans as debts owed by the club. Closing arrears1400 are brought down credit and closing advances2100 debit, with the carried-down sides reversed.",
  "Club statement of affairs and subscription-account balancing from the independent source working.");
bind(2016, "mj", 6, "a-1 a-2 a-3 c-9",
  "Cooperative principles include voluntary open membership, democratic member control through one member one vote, and members' economic participation. Present the31 December2015 statement vertically, showing non-current assets, working capital and members' funds233400.",
  "Membership is open and voluntary; members govern democratically with equal votes and contribute economically. Use a vertical classified financial-position statement for31 December2015, reconciling net assets to cooperative funds233400.",
  "Membership is compulsory and permanently closed, voting power depends entirely on outside investors, and members make no economic contribution. Use an undated horizontal unclassified statement instead of the requested vertical balance sheet.",
  "Cooperative principles and the explicit vertical-style statement requirement.");
bind(2016, "mj", 7, "a-1 c-i-1 c-i-2 c-ii-1 c-ii-2 c-ii-3",
  "State the tax method: exempt the first2500 and apply progressive15% and30% slices to the remaining earnings. Statutory deductions are compulsory by law; non-statutory deductions require employee authorization. Payroll source records include time cards, attendance timesheets and authorized pay-rate/employment records.",
  "Use the declared progressive interpretation with the2500 allowance applied once. Legally mandatory deductions differ from employee-chosen deductions. Clock cards establish hours, attendance records establish days worked, and employment/pay-rate records establish authorized remuneration.",
  "Tax the exempt first2500 again and claim the source has only one possible interpretation. Statutory deductions are optional while voluntary deductions are compulsory by law. The only payroll source documents are sales invoices, credit notes and bank reconciliation statements.",
  "The fictional tax wording is ambiguous, so the independent replay explicitly declares a progressive interpretation; payroll definitions and source records are unambiguous.");

export const POA_HISTORICAL_LATE_SEMANTIC_CASES = cases;
