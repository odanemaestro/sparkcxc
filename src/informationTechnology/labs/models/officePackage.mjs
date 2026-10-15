/**
 * Write a small ZIP archive using the STORE method. Office Open XML is a ZIP
 * package; this module intentionally has no network or third-party dependency.
 */
function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i=0;i<8;i++) crc = crc & 1 ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1;
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function u16(buffer, offset, value) { buffer[offset]=value&255;buffer[offset+1]=(value>>>8)&255; }
function u32(buffer, offset, value) { u16(buffer,offset,value>>>0);u16(buffer,offset+2,value>>>16); }
function join(chunks) {
  const size = chunks.reduce((sum,chunk)=>sum+chunk.length,0);
  const out = new Uint8Array(size);
  let offset=0;
  for (const chunk of chunks) {out.set(chunk,offset);offset+=chunk.length;}
  return out;
}
export function createOfficePackage(entries) {
  const names = Object.keys(entries || {});
  if (!names.length || names.length > 100) throw new Error("Invalid package entries.");
  const encoder = new TextEncoder();
  const local=[],central=[];
  let offset=0,totalBytes=0;
  for (const name of names) {
    if (!/^[A-Za-z0-9_\-./\[\]]+$/.test(name) || name.startsWith("/") || name.split("/").includes("..")) throw new Error("Invalid ZIP member path.");
    const nameBytes=encoder.encode(name);
    const value=entries[name];
    const content=value instanceof Uint8Array?value:encoder.encode(String(value));
    if (content.length > 4000000 || (totalBytes+=content.length)>8000000) throw new Error("Office document is too large.");
    const sum=crc32(content);
    const header=new Uint8Array(30);
    u32(header,0,0x04034b50);u16(header,4,20);u16(header,6,0x0800);u16(header,8,0);
    u32(header,14,sum);u32(header,18,content.length);u32(header,22,content.length);u16(header,26,nameBytes.length);
    local.push(header,nameBytes,content);
    const directory=new Uint8Array(46);
    u32(directory,0,0x02014b50);u16(directory,4,20);u16(directory,6,20);u16(directory,8,0x0800);u16(directory,10,0);
    u32(directory,16,sum);u32(directory,20,content.length);u32(directory,24,content.length);u16(directory,28,nameBytes.length);
    u32(directory,42,offset);
    central.push(directory,nameBytes);
    offset+=header.length+nameBytes.length+content.length;
  }
  const centralData=join(central);
  const end=new Uint8Array(22);
  u32(end,0,0x06054b50);u16(end,8,names.length);u16(end,10,names.length);
  u32(end,12,centralData.length);u32(end,16,offset);
  return join([...local,centralData,end]);
}
export function xmlEscape(value) {
  return String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
}
