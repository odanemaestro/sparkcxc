import {analyzeTeachingProgram} from "./programDiagnostics.mjs";
import {PROGRAMMING_TEMPLATES} from "./programmingModel.mjs";
describe("SPARK teaching compiler diagnostics",()=>{
  test.each(["C","Pascal","Visual Basic"])("%s accepts a valid selection teaching template",language=>{
    expect(analyzeTeachingProgram({language,exercise:"selection",code:PROGRAMMING_TEMPLATES[language].selection,input:49})).toMatchObject({ok:true,errors:[],executionSample:"FAIL"});
  });
  test("shows an exact line issue for missing End If",()=>{
    const code=PROGRAMMING_TEMPLATES["Visual Basic"].selection.replace(/End If/,"");
    const result=analyzeTeachingProgram({language:"Visual Basic",exercise:"selection",code});
    expect(result.ok).toBe(false);
    expect(result.errors.some(x=>x.message.includes("End If")&&x.line>0)).toBe(true);
  });
  test("reports unbalanced C braces and refuses unsupported exercise types",()=>{
    const broken=PROGRAMMING_TEMPLATES.C.selection.slice(0,-1);
    expect(analyzeTeachingProgram({language:"C",exercise:"selection",code:broken}).errors.some(x=>/braces/i.test(x.message))).toBe(true);
    expect(analyzeTeachingProgram({language:"C",exercise:"arbitrary",code:"int x=1;"}).supported).toBe(false);
  });
  test("detects a semantic tax bug even when source structure runs",()=>{
    const d=analyzeTeachingProgram({language:"Pascal",exercise:"debug",code:PROGRAMMING_TEMPLATES.Pascal.debug,input:100});
    expect(d.ok).toBe(true);
    expect(d.warnings.some(x=>/tax result differs/i.test(x.message))).toBe(true);
  });
  test("rejects excessive code instead of executing it",()=>{
    const d=analyzeTeachingProgram({language:"C",exercise:"selection",code:"x".repeat(30001)});
    expect(d.ok).toBe(false);
  });
});
