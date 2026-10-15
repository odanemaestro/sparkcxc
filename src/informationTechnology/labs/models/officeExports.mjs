import { createOfficePackage, xmlEscape } from "./officePackage.mjs";
import { evaluateCell } from "./workbookModel.mjs";

const REL_NS="http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const DOC_NS="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const SS_NS="http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const ROOT_RELS='<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="'+REL_NS+'/officeDocument" Target="';
const END_RELS='"/></Relationships>';

export function makeDocx(documentData = {}) {
  const title=String(documentData.title || "SPARK Document");
  const lines=[title,...(documentData.header ? [documentData.header] : []),...String(documentData.body||"").split(/\r?\n/),...(documentData.footer ? [documentData.footer] : [])];
  const paragraph=(line,heading=false) => '<w:p><w:pPr>'+(heading?'<w:pStyle w:val="Heading1"/>':'')+'</w:pPr><w:r><w:t xml:space="preserve">'+xmlEscape(line)+'</w:t></w:r></w:p>';
  const body=lines.map((line,i)=>paragraph(line,i===0)).join("");
  const landscape=documentData.orientation==="landscape";
  const size=landscape?' w:w="16838" w:h="11906" w:orient="landscape"':' w:w="11906" w:h="16838"';
  const word='<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="'+DOC_NS+'"><w:body>'+body+'<w:sectPr><w:pgSz'+size+'/></w:sectPr></w:body></w:document>';
  const types='<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  return createOfficePackage({
    "[Content_Types].xml":types,
    "_rels/.rels":ROOT_RELS+'word/document.xml'+END_RELS,
    "word/document.xml":word
  });
}

export function makeXlsx(workbook = {}) {
  const sheets=Object.entries(workbook).filter(([name,values])=>name.length>0 && name.length<=31 && values && typeof values==="object" && !Array.isArray(values)).slice(0,20);
  if (!sheets.length) throw new Error("A workbook must contain a sheet.");
  const types=['<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'];
  const rels=['<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'];
  const entries={
    "_rels/.rels": ROOT_RELS+"xl/workbook.xml"+END_RELS
  };
  const xmlSheets=[];
  sheets.forEach(([name,values],index)=>{
    const id=index+1;
    types.push('<Override PartName="/xl/worksheets/sheet'+id+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>');
    rels.push('<Relationship Id="rId'+id+'" Type="'+REL_NS+'/worksheet" Target="worksheets/sheet'+id+'.xml"/>');
    xmlSheets.push('<sheet name="'+xmlEscape(name)+'" sheetId="'+id+'" r:id="rId'+id+'"/>');
    const rows=new Map();
    for(const [address,raw] of Object.entries(values)){
      const match=/^([A-Z]+)([1-9]\d*)$/.exec(address);
      if(!match)continue;
      const row=Number(match[2]);
      if(!rows.has(row))rows.set(row,[]);
      let cell;
      if(typeof raw==="string" && raw.startsWith("=")){
        const result=evaluateCell(workbook,name,address);
        const number=typeof result.value==="number"&&Number.isFinite(result.value);
        cell='<c r="'+address+'"'+(number?'':' t="str"')+'><f>'+xmlEscape(raw.slice(1))+'</f><v>'+xmlEscape(result.error?"":result.value)+'</v></c>';
      }else if(typeof raw==="number" && Number.isFinite(raw)){
        cell='<c r="'+address+'"><v>'+raw+'</v></c>';
      }else if(typeof raw==="boolean"){
        cell='<c r="'+address+'" t="b"><v>'+(raw?1:0)+'</v></c>';
      }else{
        cell='<c r="'+address+'" t="inlineStr"><is><t xml:space="preserve">'+xmlEscape(raw)+'</t></is></c>';
      }
      rows.get(row).push({column:match[1],cell});
    }
    const data=[...rows.entries()].sort((a,b)=>a[0]-b[0]).map(([row,cells])=>
      '<row r="'+row+'">'+cells.sort((a,b)=>a.column.length-b.column.length || a.column.localeCompare(b.column)).map(x=>x.cell).join("")+'</row>'
    ).join("");
    entries["xl/worksheets/sheet"+id+".xml"]='<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="'+SS_NS+'"><sheetData>'+data+'</sheetData></worksheet>';
  });
  types.push("</Types>");rels.push("</Relationships>");
  entries["[Content_Types].xml"]=types.join("");
  entries["xl/_rels/workbook.xml.rels"]=rels.join("");
  entries["xl/workbook.xml"]='<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="'+SS_NS+'" xmlns:r="'+REL_NS+'"><sheets>'+xmlSheets.join("")+'</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>';
  return createOfficePackage(entries);
}
