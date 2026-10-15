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
  const rows=Array.isArray(documentData.tableRows)?documentData.tableRows.slice(0,100):[];
  const tableXml=rows.length ? '<w:tbl>'+[['Activity','Day','Time'],...rows].map(row=>'<w:tr>'+row.map(value=>'<w:tc>'+paragraph(value)+'</w:tc>').join('')+'</w:tr>').join('')+'</w:tbl>' : '';
  const body=lines.map((line,i)=>paragraph(line,i===0)).join("")+tableXml;
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


export function makePptx(slides, theme = "", footer = "") {
  const items = Array.isArray(slides) ? slides.slice(0,80) : [];
  if (!items.length) throw new Error("Add a slide before exporting.");
  const P="http://schemas.openxmlformats.org/presentationml/2006/main";
  const A="http://schemas.openxmlformats.org/drawingml/2006/main";
  const PR="http://schemas.openxmlformats.org/package/2006/relationships";
  const CT="http://schemas.openxmlformats.org/package/2006/content-types";
  const name="SPARK Presentation";
  const dark=theme==="Ocean"||theme==="Slate";
  const bg=theme==="Ocean"?"12345C":theme==="Slate"?"25354B":"FFFFFF";
  const fg=dark?"FFFFFF":"14243C";
  const types=['<?xml version="1.0" encoding="UTF-8"?><Types xmlns="'+CT+'"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>'];
  const slideIds=[],rels=[];
  const entries={ "_rels/.rels":ROOT_RELS+"ppt/presentation.xml"+END_RELS };
  const base='<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/>';
  function shape(id,shapeName,value,x,y,w,h,fontSize) {
    const paragraphs=String(value||"").split(/\r?\n/).map(line=>
      '<a:p><a:r><a:rPr lang="en-US" sz="'+fontSize+'"><a:solidFill><a:srgbClr val="'+fg+'"/></a:solidFill></a:rPr><a:t>'+xmlEscape(line)+'</a:t></a:r><a:endParaRPr lang="en-US"/></a:p>'
    ).join("");
    return '<p:sp><p:nvSpPr><p:cNvPr id="'+id+'" name="'+xmlEscape(shapeName)+'"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'+
      '<p:spPr><a:xfrm><a:off x="'+x+'" y="'+y+'"/><a:ext cx="'+w+'" cy="'+h+'"/></a:xfrm></p:spPr>'+
      '<p:txBody><a:bodyPr wrap="square"/><a:lstStyle/>'+paragraphs+'</p:txBody></p:sp>';
  }
  items.forEach((slide,i)=>{
    const n=i+1;
    types.push('<Override PartName="/ppt/slides/slide'+n+'.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>');
    rels.push('<Relationship Id="rId'+n+'" Type="'+REL_NS+'/slide" Target="slides/slide'+n+'.xml"/>');
    slideIds.push('<p:sldId id="'+(255+n)+'" r:id="rId'+n+'"/>');
    let inner=base;
    if(slide.layout!=="Blank"){
      inner+=shape(2,"Slide Title",slide.title,600000,500000,11000000,1200000,3000);
      if(slide.layout!=="Title Only")inner+=shape(3,"Slide Content",slide.body,900000,2050000,10200000,3400000,2000);
      if(footer)inner+=shape(4,"Footer",footer,800000,6050000,10500000,400000,1050);
    }
    const body='<?xml version="1.0" encoding="UTF-8"?><p:sld xmlns:a="'+A+'" xmlns:p="'+P+'" xmlns:r="'+REL_NS+'"><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="'+bg+'"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree>'+inner+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>';
    entries["ppt/slides/slide"+n+".xml"]=body;
  });
  types.push("</Types>");
  entries["[Content_Types].xml"]=types.join("");
  entries["ppt/_rels/presentation.xml.rels"]='<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="'+PR+'">'+rels.join("")+'</Relationships>';
  entries["ppt/presentation.xml"]='<?xml version="1.0" encoding="UTF-8"?><p:presentation xmlns:a="'+A+'" xmlns:r="'+REL_NS+'" xmlns:p="'+P+'"><p:sldIdLst>'+slideIds.join("")+'</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>';
  return createOfficePackage(entries);
}
