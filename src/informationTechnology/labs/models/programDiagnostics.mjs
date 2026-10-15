import {runSelectionProgram,runLoopProgram,runTaxProgram} from "./programmingModel.mjs";
// Diagnostic adapter for SPARK's bounded educational program formats.
// The adapter never evaluates arbitrary JavaScript or invokes a native compiler.
export function analyzeTeachingProgram({language,exercise,code,input=72}) {
  const source=String(code||"");
  const lines=source.split(/\r?\n/);
  const notes=[];
  if(!source.trim()) return {ok:false,errors:[{line:1,severity:"error",message:"Enter program source before checking it."}],warnings:[],supported:true};
  if(source.length>30000)return {ok:false,errors:[{line:1,severity:"error",message:"This teaching editor supports programs up to 30,000 characters."}],warnings:[],supported:true};
  if(!["Visual Basic","Pascal","C"].includes(language))return {ok:false,errors:[{line:1,severity:"error",message:"This language is not supported by SPARK's current teaching interpreter."}],warnings:[],supported:false};
  if(!["selection","loop","debug"].includes(exercise))return {ok:false,errors:[{line:1,severity:"error",message:"Choose a supported exercise."}],warnings:[],supported:false};
  // Catch obvious structural errors before exercise-specific interpretation.
  if(language==="C"){
    const opens=(source.match(/\{/g)||[]).length;
    const closes=(source.match(/\}/g)||[]).length;
    if(opens!==closes)notes.push({line:Math.max(1,lines.findIndex(line=>line.includes("{"))+1),severity:"error",message:"Unbalanced braces: check that every opening { has a matching }."});
  }
  if(language==="Visual Basic"&&/\bIf\b/i.test(source)&&!/\bEnd\s+If\b/i.test(source))notes.push({line:Math.max(1,lines.findIndex(line=>/\bIf\b/i.test(line))+1),severity:"error",message:"Missing End If statement."});
  if(language==="Pascal"&&/\bbegin\b/i.test(source)&&!/\bend\s*\./i.test(source))notes.push({line:Math.max(1,lines.findIndex(line=>/\bbegin\b/i.test(line))+1),severity:"error",message:"Missing final end. statement."});
  let run;
  if(exercise==="selection")run=runSelectionProgram({language,code:source,input});
  else if(exercise==="loop")run=runLoopProgram({language,code:source});
  else run=runTaxProgram({language,code:source,input});
  const errors=[...notes,...(run.errors||[]).map(issue=>({line:issue.line||1,severity:"error",message:issue.message}))];
  const unique=errors.filter((item,index)=>errors.findIndex(other=>other.line===item.line&&other.message===item.message)===index);
  const warnings=[];
  if(run.ok&&exercise==="debug"&&run.output!== (Number(input)*.15).toFixed(2))warnings.push({line:lines.findIndex(line=>/tax\s*[:=]+\s*price/i.test(line))+1||1,severity:"warning",message:"Program runs, but the tax result differs from 15%. Check the multiplier."});
  return {ok:unique.length===0,errors:unique,warnings,supported:true,executionSample:run.ok?run.output:null};
}
