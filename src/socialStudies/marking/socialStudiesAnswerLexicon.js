import { FAMILY_CONCEPTS } from "./familyLexicon";
import { GOVERNANCE_CONCEPTS } from "./governanceLexicon";
import { DEVELOPMENT_CONCEPTS } from "./developmentLexicon";
import { REGIONAL_RESEARCH_CONCEPTS } from "./regionalResearchLexicon";
import { SOCIETY_POPULATION_CONCEPTS } from "./societyPopulationLexicon";
import { EXTENDED_SOCIAL_STUDIES_CONCEPTS } from "./extendedLexicon";

export const SOCIAL_STUDIES_CONCEPTS = Object.freeze({
  ...FAMILY_CONCEPTS,
  ...GOVERNANCE_CONCEPTS,
  ...DEVELOPMENT_CONCEPTS,
  ...REGIONAL_RESEARCH_CONCEPTS,
  ...SOCIETY_POPULATION_CONCEPTS,
  ...EXTENDED_SOCIAL_STUDIES_CONCEPTS,
});

const NORMALISATIONS = Object.freeze([
  ["organisation","organization"],
  ["organisations","organizations"],
  ["programme","program"],
  ["programmes","programs"],
  ["labour","labor"],
  ["behaviour","behavior"],
  ["centre","center"],
  ["counselling","counseling"],
  ["prioritise","prioritize"],
  ["harmonise","harmonize"],
  ["standardise","standardize"],
  ["caribbean community and common market","caricom"],
]);

export function normalizeSocialStudiesText(value){
  let text=String(value ?? "")
    .toLowerCase()
    .replace(/[’‘]/g,"'")
    .replace(/[–—−]/g,"-")
    .replace(/[^a-z0-9%$&\/+'\-\s.,;:()]/g," ")
    .replace(/\s+/g," ")
    .trim();

  NORMALISATIONS.forEach(([from,to])=>{
    text=text.split(from).join(to);
  });
  return text;
}

function editDistance(a,b,cap=2){
  if(Math.abs(a.length-b.length)>cap) return cap+1;
  let previous=Array.from({length:b.length+1},(_,index)=>index);
  for(let i=1;i<=a.length;i+=1){
    const row=[i];
    let best=i;
    for(let j=1;j<=b.length;j+=1){
      const cost=a[i-1]===b[j-1]?0:1;
      row[j]=Math.min(previous[j]+1,row[j-1]+1,previous[j-1]+cost);
      best=Math.min(best,row[j]);
    }
    if(best>cap) return cap+1;
    previous=row;
  }
  return previous[b.length];
}

function tokenTolerance(token){
  if(token.length>=10) return 2;
  if(token.length>=6) return 1;
  return 0;
}

function fuzzyPhraseMatch(text,wanted){
  const textTokens=text.split(/\s+/).filter(Boolean);
  const wantedTokens=wanted.split(/\s+/).filter(Boolean);
  if(wantedTokens.length<2 || textTokens.length<wantedTokens.length) return false;

  for(let start=0;start<=textTokens.length-wantedTokens.length;start+=1){
    let totalDistance=0;
    let valid=true;
    for(let index=0;index<wantedTokens.length;index+=1){
      const expected=wantedTokens[index];
      const actual=textTokens[start+index];
      const tolerance=tokenTolerance(expected);
      const distance=editDistance(actual,expected,tolerance);
      if(distance>tolerance){
        valid=false;
        break;
      }
      totalDistance+=distance;
    }
    if(valid && totalDistance<=2) return true;
  }
  return false;
}

export function mentionsSocialStudiesPhrase(value,phrase){
  const text=normalizeSocialStudiesText(value);
  const wanted=normalizeSocialStudiesText(phrase);
  if(!text || !wanted) return false;

  const padded=" "+text+" ";
  if(padded.includes(" "+wanted+" ") || text.includes(wanted)) return true;
  if(wanted.includes(" ")) return fuzzyPhraseMatch(text,wanted);

  const tolerance=wanted.length>=9?2:wanted.length>=6?1:0;
  if(!tolerance) return false;

  return text
    .split(/\s+/)
    .filter(Boolean)
    .some(token=>editDistance(token,wanted,tolerance)<=tolerance);
}

export function mentionsSocialStudiesConcept(value,conceptId){
  const aliases=SOCIAL_STUDIES_CONCEPTS[conceptId] || [];
  return aliases.some(alias=>mentionsSocialStudiesPhrase(value,alias));
}

export function matchedSocialStudiesConcepts(value,conceptIds=[]){
  return conceptIds.filter(conceptId=>mentionsSocialStudiesConcept(value,conceptId));
}

export function socialStudiesLexiconStats(){
  const concepts=Object.keys(SOCIAL_STUDIES_CONCEPTS);
  return Object.freeze({
    concepts:concepts.length,
    aliases:concepts.reduce((total,id)=>total+(SOCIAL_STUDIES_CONCEPTS[id] || []).length,0),
  });
}
