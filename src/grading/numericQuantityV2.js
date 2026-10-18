/**
 * Conservative dimensional quantity parser for CSEC numeric criteria.
 * Only explicitly supported units are accepted; no guesswork about units.
 * All results are advisory until server verification.
 */
const unitTable=Object.freeze({
 m:{dimension:"length",factor:1},cm:{dimension:"length",factor:0.01},
 mm:{dimension:"length",factor:0.001},km:{dimension:"length",factor:1000},
 kg:{dimension:"mass",factor:1},g:{dimension:"mass",factor:0.001},
 s:{dimension:"time",factor:1},min:{dimension:"time",factor:60},
 h:{dimension:"time",factor:3600},j:{dimension:"energy",factor:1},
 kj:{dimension:"energy",factor:1000},v:{dimension:"voltage",factor:1},
 a:{dimension:"current",factor:1}
});
const numeric=/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(?:\s*([a-zA-Z]+))?$/i;
export function parseGradingQuantity(value){
 if(typeof value!=="string"&&typeof value!=="number")return null;
 const text=String(value).trim();
 const match=numeric.exec(text);
 if(!match)return null;
 const n=Number(match[1]);
 if(!Number.isFinite(n))return null;
 const unit=match[2]?.toLowerCase()??null;
 if(unit&&!Object.hasOwn(unitTable,unit))return null;
 return {value:n,unit,dimension:unit?unitTable[unit].dimension:null,
  canonical:n*(unit?unitTable[unit].factor:1)};
}
export function compareGradingQuantity({response,expected,unit=null,tolerance=0}={}){
 const actual=parseGradingQuantity(response);
 if(!actual||typeof expected!=="number"||!Number.isFinite(expected)||
    typeof tolerance!=="number"||!Number.isFinite(tolerance)||tolerance<0)
  return {status:"unresolved",reason:"invalid-quantity"};
 const expectedUnit=unit===null?null:String(unit).toLowerCase();
 if(expectedUnit!==null&&!Object.hasOwn(unitTable,expectedUnit))
  return {status:"unresolved",reason:"unsupported-unit"};
 if(expectedUnit===null&&actual.unit!==null)
  return {status:"unresolved",reason:"unexpected-unit"};
 if(expectedUnit!==null&&actual.unit===null)
  return {status:"unresolved",reason:"missing-unit"};
 if(expectedUnit!==null&&actual.dimension!==unitTable[expectedUnit].dimension)
  return {status:"unresolved",reason:"dimension-mismatch"};
 const adjusted=expectedUnit===null?actual.value:actual.canonical/unitTable[expectedUnit].factor;
 return {status:Math.abs(adjusted-expected)<=tolerance?"match":"mismatch",
  reason:"numeric-comparison"};
}
