import {calculatePobInvoice,pobCurrency} from "./pobBusinessDocuments";
const items=[{description:"Exercise books",quantity:12,unitPrice:180},{description:"Pens",quantity:10,unitPrice:75}];
test("calculates subtotal, discount and payment balance in cents",()=>{
 const r=calculatePobInvoice({items,discountPercent:10,taxPercent:15,amountPaid:2000});
 expect(r.subtotalCents).toBe(291000);
 expect(r.discountCents).toBe(29100);
 expect(r.taxCents).toBe(39285);
 expect(r.totalCents).toBe(301185);
 expect(r.balanceCents).toBe(101185);
 expect(r.changeCents).toBe(0);
});
test("tracks overpayment separately from the invoice balance",()=>{
 const r=calculatePobInvoice({items,amountPaid:3000});
 expect(r.balanceCents).toBe(0);
 expect(r.changeCents).toBe(9000);
});
test("validates missing item information and clamps negative amounts",()=>{
 const r=calculatePobInvoice({items:[{description:"",quantity:-3,unitPrice:-10}],discountPercent:500,taxPercent:-2});
 expect(r.valid).toBe(false);
 expect(r.totalCents).toBe(0);
});
test("formats cents in Jamaican dollars",()=>expect(pobCurrency(12050)).toMatch(/J\$120\.50/));
