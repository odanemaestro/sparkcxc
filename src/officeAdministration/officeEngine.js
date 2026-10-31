export function money(value){return Math.round((Number(value)+Number.EPSILON)*100)/100;}
const nonnegative=value=>value!==''&&value!==null&&Number.isFinite(Number(value))&&Number(value)>=0;
export function payroll({hours,rate,overtimeHours=0,multiplier=1.5,deductions=0}){
 if(![hours,rate,overtimeHours,multiplier,deductions].every(nonnegative))return {error:"Enter zero or a positive number in each field."};
 const basic=money(Number(hours)*Number(rate)),overtime=money(Number(overtimeHours)*Number(rate)*Number(multiplier));
 const gross=money(basic+overtime),net=money(gross-Number(deductions));
 if(net<0)return {error:"Deductions cannot exceed gross pay in this exercise."};
 return {basic,overtime,gross,deductions:money(deductions),net};
}
export function stockBalance(opening,entries=[]){
 if(!Number.isInteger(Number(opening))||Number(opening)<0)return {error:"Opening stock must be a whole number of units."};
 let balance=Number(opening);const rows=[];
 for(const entry of entries){
  if(!Number.isInteger(Number(entry.quantity))||Number(entry.quantity)<=0)return {error:"Enter a positive whole number of units."};
  if(!['receipt','issue'].includes(entry.type))return {error:"Choose receipt or issue."};
  balance+=entry.type==='receipt'?Number(entry.quantity):-Number(entry.quantity);
  if(balance<0)return {error:"The issue is larger than the stock available. Check the quantity or enter the missing receipt."};
  rows.push({...entry,balance});
 }
 return {balance,rows};
}
export function appointmentProblem(candidate,entries=[]){
 if(!candidate.date||!candidate.start||!candidate.end||!candidate.name?.trim())return "Add the visitor, date, start time and end time.";
 if(!/^\d{4}-\d{2}-\d{2}$/.test(candidate.date)||![candidate.start,candidate.end].every(t=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t)))return "Use a valid date and time.";
 if(candidate.end<=candidate.start)return "The end time must be after the start time.";
 if(entries.some(row=>row.date===candidate.date&&row.start<candidate.end&&candidate.start<row.end))return "This appointment overlaps an existing booking. Choose another time or resolve the clash.";
 return null;
}
export const FILING_NAMES=Object.freeze(['Clarke, Denise','Brown, Marcia','Browne, Martin','Brown, Michael','Campbell, Alan','Brown, Mark']);
export const FILING_ORDER=Object.freeze([...FILING_NAMES].sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'})));
export function messageFeedback(message){
 const gaps=[];for(const [key,label]of [['caller','caller’s name'],['recipient','person to receive the message'],['number','callback number'],['message','message']])if(!message[key]?.trim())gaps.push(label);
 if(gaps.length)return {complete:false,text:'Add the '+gaps.join(', ')+'.'};
 if(!/davis/i.test(message.caller)||!/stationery/i.test(message.caller)||!/brown/i.test(message.recipient))return {complete:false,text:'Check the caller, organisation and intended recipient against the telephone conversation.'};
 if(message.number.replace(/\D/g,'')!=='8765550147')return {complete:false,text:'Check the callback number: the caller gave 876-555-0147.'};
 if(!/417/.test(message.message)||!/(?:before|by)\s+(?:3\s*(?:p\.?m\.?|:00)|15:00)/i.test(message.message)||/\b(?:after|not before|not by)\b/i.test(message.message))return {complete:false,text:'Preserve both the purchase order reference (417) and the requested callback time (3 p.m.). Those details make the message usable.'};
 return {complete:true,text:'The message includes who called, whom it is for, how to return the call, the order reference and the requested time. Confirm names and numbers with the caller before ending a real call.'};
}
