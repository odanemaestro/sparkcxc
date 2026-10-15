import { addRecord } from "./databaseModel.mjs";
const HEADER=["CustomerID","Name","Parish","AmountOwed"];
export function parseCustomerCsv(csv, existing = []) {
  const input=String(csv||"");
  if(input.length>200000) return {records:existing,added:0,errors:["CSV file is too large."]};
  const rows=[];let row=[],cell="",quoted=false;
  for(let i=0;i<input.length;i++){
    const ch=input[i];
    if(ch==='"'){if(quoted&&input[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(ch===','&&!quoted){row.push(cell);cell="";}
    else if((ch==='\n'||ch==='\r')&&!quoted){
      if(ch==='\r'&&input[i+1]==='\n')i++;
      row.push(cell);rows.push(row);row=[];cell="";
    }else cell+=ch;
  }
  if(quoted)return {records:existing,added:0,errors:["CSV file contains an unclosed quoted field."]};
  if(cell||row.length){row.push(cell);rows.push(row);}
  if(rows.length<2||rows[0].some((name,i)=>name.trim()!==HEADER[i])||rows[0].length!==4)
    return {records:existing,added:0,errors:["Expected columns: "+HEADER.join(", ")]};
  if(rows.length>501)return {records:existing,added:0,errors:["Import supports up to 500 customer records."]};
  let records=[...existing],added=0;const errors=[];
  for(const [index,fields] of rows.slice(1).entries()){
    if(fields.length!==4){errors.push("Row "+(index+2)+": expected four values.");continue;}
    const result=addRecord(records,Object.fromEntries(HEADER.map((name,i)=>[name,fields[i]])));
    if(result.errors.length)errors.push("Row "+(index+2)+": "+result.errors.join(" "));
    else{records=result.records;added++;}
  }
  return {records,added,errors};
}
export function exportCustomerCsv(records) {
  const quote=value=>{
    let text=String(value??"");
    if(/^[=+\-@]/.test(text))text="'"+text;
    return '"'+text.replace(/"/g,'""')+'"';
  };
  return [HEADER.join(","),...(records||[]).map(row=>HEADER.map(name=>quote(row[name])).join(","))].join("\r\n");
}
