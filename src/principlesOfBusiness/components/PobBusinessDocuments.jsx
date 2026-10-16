import React,{useMemo,useState} from "react";
import {calculatePobInvoice,pobCurrency} from "../data/pobBusinessDocuments";
import "./pobBusinessDocuments.css";

export default function PobBusinessDocuments(){
 const [seller,setSeller]=useState("Kingston School Supplies");
 const [buyer,setBuyer]=useState("Community Learning Centre");
 const [reference,setReference]=useState("INV-001");
 const [date,setDate]=useState("2026-10-16");
 const [lines,setLines]=useState([
  {id:1,description:"Exercise books",quantity:12,unitPrice:180},
  {id:2,description:"Pens",quantity:10,unitPrice:75}
 ]);
 const [discount,setDiscount]=useState(0),[tax,setTax]=useState(0),[paid,setPaid]=useState(0);
 const result=useMemo(()=>calculatePobInvoice({items:lines,discountPercent:discount,taxPercent:tax,amountPaid:paid}),[lines,discount,tax,paid]);
 const update=(id,key,value)=>setLines(old=>old.map(line=>line.id===id?{...line,[key]:value}:line));
 return <section className="pob-doc-lab" aria-label="Business invoice and receipt laboratory">
  <header><span>Section 4: Legal aspects of business and business documents</span>
   <h3>Prepare an invoice and check a receipt</h3>
   <p>An invoice requests payment for a sale. A receipt records payment received. Edit the example below and observe how each amount changes.</p></header>
  <div className="pob-doc-grid">
   <label>Seller<input value={seller} maxLength={100} onChange={e=>setSeller(e.target.value)}/></label>
   <label>Buyer<input value={buyer} maxLength={100} onChange={e=>setBuyer(e.target.value)}/></label>
   <label>Invoice reference<input value={reference} maxLength={40} onChange={e=>setReference(e.target.value)}/></label>
   <label>Issue date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
  </div>
  <div className="pob-doc-scroll"><table><caption>Goods sold</caption><thead><tr><th>Description</th><th>Quantity</th><th>Unit price, J$</th><th>Line total</th><th>Action</th></tr></thead>
   <tbody>{lines.map((line,index)=><tr key={line.id}>
     <td><input aria-label={"Item "+(index+1)+" description"} value={line.description} onChange={e=>update(line.id,"description",e.target.value)} maxLength={100}/></td>
     <td><input aria-label={"Item "+(index+1)+" quantity"} type="number" min="0" step="1" value={line.quantity} onChange={e=>update(line.id,"quantity",e.target.value)}/></td>
     <td><input aria-label={"Item "+(index+1)+" unit price"} type="number" min="0" step=".01" value={line.unitPrice} onChange={e=>update(line.id,"unitPrice",e.target.value)}/></td>
     <td>{pobCurrency(result.lines[index].totalCents)}</td>
     <td><button type="button" disabled={lines.length===1} onClick={()=>setLines(old=>old.filter(item=>item.id!==line.id))}>Remove</button></td>
    </tr>)}</tbody></table></div>
  <button type="button" onClick={()=>setLines(old=>[...old,{id:Math.max(0,...old.map(x=>x.id))+1,description:"New item",quantity:1,unitPrice:100}])}>Add an item</button>
  <div className="pob-doc-grid">
    <label>Discount (%)<input type="number" min="0" max="100" step=".1" value={discount} onChange={e=>setDiscount(e.target.value)}/></label>
    <label>Example sales tax rate (%)<input type="number" min="0" max="100" step=".1" value={tax} onChange={e=>setTax(e.target.value)}/></label>
    <label>Payment received (J$)<input type="number" min="0" step=".01" value={paid} onChange={e=>setPaid(e.target.value)}/></label>
  </div>
  <dl className="pob-doc-totals" aria-live="polite">
    <div><dt>Subtotal</dt><dd>{pobCurrency(result.subtotalCents)}</dd></div>
    <div><dt>Discount</dt><dd>{pobCurrency(result.discountCents)}</dd></div>
    <div><dt>Tax in this example</dt><dd>{pobCurrency(result.taxCents)}</dd></div>
    <div><dt>Invoice total</dt><dd>{pobCurrency(result.totalCents)}</dd></div>
    <div><dt>Amount paid</dt><dd>{pobCurrency(result.paidCents)}</dd></div>
    <div><dt>Balance outstanding</dt><dd>{pobCurrency(result.balanceCents)}</dd></div>
    <div><dt>Change or overpayment</dt><dd>{pobCurrency(result.changeCents)}</dd></div>
  </dl>
  <div className="pob-doc-summary" role="status"><strong>{result.valid?"Document entries complete":"Complete every item description and enter a positive quantity."}</strong>
   <p>{paid>0?"Receipt example: "+seller+" received "+pobCurrency(result.paidCents)+" from "+buyer+" against "+reference+".":"No receipt is issued until a payment is received."}</p>
  </div>
  <p className="pob-doc-note">Try changing the quantity of exercise books from 12 to 20. Explain how the invoice total and amount outstanding change. A discount reduces the price before the illustrative tax calculation. Actual Jamaican GCT applicability and rates depend on the goods, business and current rules. This tool is a classroom simulation and does not issue tax invoices or official receipts.</p>
 </section>;
}
