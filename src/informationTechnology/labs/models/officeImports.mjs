/**
 * Small bounded ZIP reader for Office Open XML files.
 * Supports stored and deflate-raw members in browsers with DecompressionStream.
 * Rejects oversized or malformed archives before reading XML.
 */
function U16(a,i){return a[i]|(a[i+1]<<8);}
function U32(a,i){return (a[i]|(a[i+1]<<8)|(a[i+2]<<16)|(a[i+3]<<24))>>>0;}
export async function readOfficeEntries(buffer) {
  const decoder = new TextDecoder();
  const a=new Uint8Array(buffer);
  if(a.length>10000000)throw new Error("Office file must be smaller than 10 MB.");
  let eocd=-1;
  for(let i=a.length-22;i>=Math.max(0,a.length-65557);i--){if(U32(a,i)===0x06054b50){eocd=i;break;}}
  if(eocd<0)throw new Error("This is not a valid Office ZIP package.");
  const count=U16(a,eocd+10),offset=U32(a,eocd+16),entries={};
  if(count>150||offset>=a.length)throw new Error("Too many files in the Office package.");
  let p=offset,total=0;
  for(let i=0;i<count;i++){
    if(U32(a,p)!==0x02014b50)throw new Error("Invalid ZIP directory.");
    const compression=U16(a,p+10),size=U32(a,p+20),expanded=U32(a,p+24);
    const nameSize=U16(a,p+28),extra=U16(a,p+30),comment=U16(a,p+32),local=U32(a,p+42);
    const name=decoder.decode(a.slice(p+46,p+46+nameSize));
    p+=46+nameSize+extra+comment;
    if(name.includes("..")||name.startsWith("/")||!nameSize)throw new Error("Unsafe archive path.");
    if(expanded>5000000||(total+=expanded)>8000000)throw new Error("Office content exceeds the safety limit.");
    if(U32(a,local)!==0x04034b50)throw new Error("Invalid Office package member.");
    const dataStart=local+30+U16(a,local+26)+U16(a,local+28);
    if(dataStart+size>a.length)throw new Error("Incomplete ZIP file.");
    const bytes=a.slice(dataStart,dataStart+size);
    let uncompressed;
    if(compression===0)uncompressed=bytes;
    else if(compression===8){
      if(typeof DecompressionStream==="undefined")throw new Error("This browser cannot decompress Office documents.");
      const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      uncompressed=new Uint8Array(await new Response(stream).arrayBuffer());
    }else throw new Error("Unsupported Office ZIP compression.");
    if(uncompressed.length!==expanded)throw new Error("Office package member has the wrong size.");
    entries[name]=decoder.decode(uncompressed);
  }
  return entries;
}
function xml(string) {
  if(/<!DOCTYPE|<!ENTITY/i.test(string||""))throw new Error("Unsafe Office XML.");
  const parsed=new DOMParser().parseFromString(string,"application/xml");
  if(parsed.querySelector("parsererror"))throw new Error("Invalid Office XML.");
  return parsed;
}
function text(node,local) {
  return [...node.getElementsByTagName("*")].filter(x=>x.localName===local).map(x=>x.textContent).join("");
}
export async function importBasicDocx(buffer) {
  const parts=await readOfficeEntries(buffer);
  const content=parts["word/document.xml"];
  if(!content)throw new Error("DOCX document.xml was not found.");
  const doc=xml(content);
  const root=doc.documentElement;
  const paragraphs=[...root.getElementsByTagName("*")].filter(x=>x.localName==="p");
  return paragraphs.map(p=>text(p,"t")).join("\n");
}
export async function importBasicXlsx(buffer) {
  const parts=await readOfficeEntries(buffer);
  if(!parts["xl/workbook.xml"])throw new Error("XLSX workbook.xml was not found.");
  const wb=xml(parts["xl/workbook.xml"]);
  const names=[...wb.getElementsByTagName("*")].filter(x=>x.localName==="sheet").map(x=>x.getAttribute("name"));
  const shared=parts["xl/sharedStrings.xml"] ? [...xml(parts["xl/sharedStrings.xml"]).getElementsByTagName("*")].filter(x=>x.localName==="si").map(x=>text(x,"t")) : [];
  const out={};
  names.slice(0,20).forEach((name,index)=>{
    const file=parts["xl/worksheets/sheet"+(index+1)+".xml"];
    if(!file)return;
    const doc=xml(file),cells={};
    for(const cell of [...doc.getElementsByTagName("*")].filter(x=>x.localName==="c")){
      const address=cell.getAttribute("r");
      if(!/^[A-Z]+[1-9]\d*$/.test(address||""))continue;
      const type=cell.getAttribute("t");
      const formula=[...cell.childNodes].find(x=>x.localName==="f");
      const value=[...cell.childNodes].find(x=>x.localName==="v");
      if(formula)cells[address]="="+formula.textContent;
      else if(type==="inlineStr")cells[address]=text(cell,"t");
      else if(type==="s")cells[address]=shared[Number(value?.textContent)]||"";
      else if(type==="b")cells[address]=value?.textContent==="1";
      else if(value)cells[address]=Number.isFinite(Number(value.textContent))?Number(value.textContent):value.textContent;
    }
    out[name||("Sheet"+(index+1))]=cells;
  });
  if(!Object.keys(out).length)throw new Error("No worksheets were found.");
  return out;
}


export async function importBasicPptx(buffer) {
  const entries=await readOfficeEntries(buffer);
  const keys=Object.keys(entries).filter(name=>/^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a,b)=>Number(a.match(/slide(\d+)/)[1])-Number(b.match(/slide(\d+)/)[1]));
  if(!keys.length)throw new Error("No presentation slides were found.");
  return keys.slice(0,80).map((name,index)=>{
    const doc=xml(entries[name]);
    const shapes=[...doc.getElementsByTagName("*")].filter(node=>node.localName==="sp");
    let title="",body="";
    for(const shape of shapes){
      const meta=[...shape.getElementsByTagName("*")].find(node=>node.localName==="cNvPr");
      const paragraphs=[...shape.getElementsByTagName("*")].filter(node=>node.localName==="p" && node.namespaceURI==="http://schemas.openxmlformats.org/drawingml/2006/main");
      const value=paragraphs.map(p=>text(p,"t")).join("\n");
      if(/title/i.test(meta?.getAttribute("name")||""))title=value;
      else if(/content/i.test(meta?.getAttribute("name")||""))body=value;
    }
    return {id:index+1,title:title||"Slide "+(index+1),body,layout:"Title and Content",bullets:false,graphic:false,transition:"",notes:""};
  });
}
