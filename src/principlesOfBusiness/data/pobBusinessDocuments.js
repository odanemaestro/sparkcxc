// Educational sales-document arithmetic. Currency amounts are illustrative JMD.
// Monetary arithmetic works in cents to avoid floating-point display drift.
const cents=n=>Math.round(Math.max(0,Number(n)||0)*100);
const quantity=n=>Number.isFinite(Number(n))?Math.max(0,Math.floor(Number(n))):0;
export function calculatePobInvoice({items=[],discountPercent=0,taxPercent=0,amountPaid=0}={}){
 const lines=items.map((item,index)=>{
   const qty=quantity(item.quantity),unitCents=cents(item.unitPrice);
   return {index,description:String(item.description||"").trim(),quantity:qty,unitCents,
     totalCents:qty*unitCents};
 });
 const subtotalCents=lines.reduce((sum,line)=>sum+line.totalCents,0);
 const discountRate=Math.min(100,Math.max(0,Number(discountPercent)||0));
 const taxRate=Math.min(100,Math.max(0,Number(taxPercent)||0));
 const discountCents=Math.round(subtotalCents*discountRate/100);
 const taxableCents=subtotalCents-discountCents;
 const taxCents=Math.round(taxableCents*taxRate/100);
 const totalCents=taxableCents+taxCents;
 const paidCents=cents(amountPaid);
 return {lines,subtotalCents,discountCents,taxableCents,taxCents,totalCents,
   paidCents,balanceCents:Math.max(0,totalCents-paidCents),changeCents:Math.max(0,paidCents-totalCents),
   valid:lines.length>0&&lines.every(l=>l.description&&l.quantity>0)};
}
export const pobCurrency=centsValue=>"J$"+(centsValue/100).toLocaleString("en-JM",{minimumFractionDigits:2,maximumFractionDigits:2});
