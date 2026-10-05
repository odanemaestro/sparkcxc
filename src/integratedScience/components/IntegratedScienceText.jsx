import React from "react";

const MOJIBAKE_REPLACEMENTS=Object.freeze([
  ["â€™","’"],["â€˜","‘"],["â€œ","“"],["â€","”"],["â€“","–"],["â€”","—"],
  ["â€¦","…"],["Â°","°"],["Âµ","µ"],["Â",""],["Ã—","×"],["Ã·","÷"],
  ["Î”","Δ"],["Î©","Ω"],["â†’","→"],["â‰¤","≤"],["â‰¥","≥"],["â‰ ","≠"],
]);

export function normalizeIntegratedScienceText(value=""){
  let text=String(value ?? "");
  for(const [broken,fixed] of MOJIBAKE_REPLACEMENTS) text=text.split(broken).join(fixed);
  return text
    .replace(/\u00a0/g," ")
    .replace(/[\u200B-\u200D\uFEFF]/g,"")
    .normalize("NFC");
}

function chemicalParts(token){
  const chargeMatch=token.match(/^(.*?)(\d*)([+-])$/);
  const base=chargeMatch ? chargeMatch[1] : token;
  const terminalCharge=chargeMatch ? `${chargeMatch[2] || ""}${chargeMatch[3]}` : "";
  const parts=[];
  let cursor=0;
  const rx=/([A-Z][a-z]?)(\d*)/g;
  let match;
  while((match=rx.exec(base))){
    if(match.index!==cursor) return null;
    parts.push({element:match[1],count:match[2]});
    cursor=rx.lastIndex;
  }
  if(cursor!==base.length || parts.length<1) return null;
  return {parts,terminalCharge};
}

function isChemicalFormula(token){
  if(!/^[A-Z][A-Za-z0-9+-]*$/.test(token)) return false;
  const parsed=chemicalParts(token);
  if(!parsed) return false;
  return parsed.parts.length>=2 || parsed.parts.some(part=>part.count);
}

function renderChemical(token,key){
  const parsed=chemicalParts(token);
  if(!parsed) return token;
  return (
    <span className="is-science-formula" key={key}>
      {parsed.parts.map((part,index)=>(
        <React.Fragment key={`${part.element}-${index}`}>
          {part.element}{part.count ? <sub>{part.count}</sub> : null}
        </React.Fragment>
      ))}
      {parsed.terminalCharge ? <sup>{parsed.terminalCharge}</sup> : null}
    </span>
  );
}

function renderUnitPower(token,key){
  const match=token.match(/^(mm|cm|dm|m|km|µm|nm)(?:\^?)([23])$/i);
  if(!match) return null;
  return <span className="is-science-formula" key={key}>{match[1]}<sup>{match[2]}</sup></span>;
}

function renderCaretExpression(token,key){
  if(!token.includes("^")) return null;
  const match=token.match(/^(.+?)\^\{?(-?\d+)\}?$/);
  if(!match) return null;
  return <span className="is-science-formula" key={key}>{match[1]}<sup>{match[2]}</sup></span>;
}

function renderToken(token,key){
  const power=renderUnitPower(token,key);
  if(power) return power;
  const caret=renderCaretExpression(token,key);
  if(caret) return caret;
  if(isChemicalFormula(token)) return renderChemical(token,key);
  return token;
}

export function IntegratedScienceText({children,as:Tag="span",className=""}){
  const text=normalizeIntegratedScienceText(children);
  // Preserve whitespace while isolating common scientific notation tokens.
  const tokens=text.split(/(\s+|(?<=[,;:()])|(?=[,;:()]))/);
  return (
    <Tag className={`is-science-text ${className}`.trim()}>
      {tokens.map((token,index)=>renderToken(token,`is-science-token-${index}`))}
    </Tag>
  );
}

export default IntegratedScienceText;
