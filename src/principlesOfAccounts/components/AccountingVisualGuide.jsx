import React from "react";
import "./accountingWorkspace.css";
const cycle = [
  ["Transaction", "Something changes in the business."],
  ["Source document", "Keep evidence: invoice, receipt or voucher."],
  ["Original-entry book", "Group similar transactions."],
  ["Ledger", "Post the debit and credit effects."],
  ["Trial balance", "Check the account balances agree."],
  ["Adjustments", "Recognise the correct period’s costs and income."],
  ["Financial statements", "Explain profit and financial position."],
  ["Closing entries", "Close temporary accounts and carry forward balances."],
];
export default function AccountingVisualGuide({ section }) {
  if (section === 2)
    return (
      <section
        className="poa-workspace"
        aria-label="Accounting cycle visual guide"
      >
        <h3>Examples and visual guides</h3>
        <h4>Follow one transaction through the accounting cycle</h4>
        <ol className="poa-cycle">
          {cycle.map(([title, body], i) => (
            <li key={title}>
              <span>{i + 1}</span>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p>
          A $2,000 credit sale begins with an invoice. The sales day book groups
          it with other credit sales. Posting debits the customer and credits
          sales. The ledger balances contribute to the trial balance and
          financial statements. Later collection settles the customer’s debt; it
          is not another sale.
        </p>
      </section>
    );
  if (section === 4)
    return (
      <section
        className="poa-workspace"
        aria-label="Debit and credit visual guide"
      >
        <h3>Examples and visual guides</h3>
        <div
          className="poa-table-scroll"
          tabIndex="0"
          role="region"
          aria-label="Debit and credit rules"
        >
          <table>
            <caption>
              Debit is left. Credit is right. The account type determines the
              effect.
            </caption>
            <thead>
              <tr>
                <th scope="col">Account type</th>
                <th scope="col">Increase</th>
                <th scope="col">Decrease</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Assets", "Debit", "Credit"],
                ["Expenses", "Debit", "Credit"],
                ["Drawings", "Debit", "Credit"],
                ["Liabilities", "Credit", "Debit"],
                ["Capital", "Credit", "Debit"],
                ["Income", "Credit", "Debit"],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4>
          Bank account: opening investment of $10,000, then rent paid $2,000
        </h4>
        <div className="poa-t-account">
          <div>
            <strong>Debit · left</strong>
            <p>Capital: $10,000</p>
          </div>
          <div>
            <strong>Credit · right</strong>
            <p>Rent: $2,000</p>
            <p>Balance c/d: $8,000</p>
          </div>
        </div>
        <p>
          Both sides total $10,000 after balance c/d is entered. Next period
          bring down $8,000 on the debit side: it is money available in the
          business bank.
        </p>
      </section>
    );
  return null;
}
