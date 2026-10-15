// Deterministic debugger for SPARK's supported educational-language exercises.
// Execution comes only from the bounded, source-validated programmingModel trace.
// This does not run arbitrary VB, Pascal or C source or invoke a native compiler.
export function createDebugSession(run, breakpoints = [], conditions = {}) {
  const trace = run?.ok && Array.isArray(run.trace) ? run.trace : [];
  const lines = new Set(breakpoints.filter(n => Number.isInteger(n) && n > 0));
  return { trace, cursor: -1, breakpoints: [...lines].sort((a,b)=>a-b), conditions: { ...conditions }, phase: trace.length ? "paused" : "unavailable" };
}
export function debugStep(session) {
  if (!session.trace.length || session.phase === "complete") return session;
  const next = session.cursor + 1;
  return { ...session, cursor: Math.min(next,session.trace.length-1), phase: next >= session.trace.length - 1 ? "complete" : "paused" };
}
export function debugContinue(session) {
  if (!session.trace.length || session.phase === "complete") return session;
  const stops = new Set(session.breakpoints);
  let cursor = session.cursor;
  while(cursor + 1 < session.trace.length) {
    cursor += 1;
    if (stops.has(session.trace[cursor].line) && breakpointMatches(session.conditions?.[session.trace[cursor].line], session.trace[cursor].variables)) {
      // Do not repeatedly stop at the same source line for consecutive trace steps.
      if (cursor === session.cursor + 1 || session.trace[cursor-1]?.line !== session.trace[cursor].line) {
        return { ...session, cursor, phase:"paused" };
      }
    }
  }
  return { ...session, cursor, phase:"complete" };
}
export function debugVariables(session) {
  if (session.cursor < 0) return {};
  return { ...(session.trace[session.cursor]?.variables || {}) };
}
export function toggleBreakpoint(session, line, sourceLineCount) {
  if (!Number.isInteger(line) || line < 1 || line > sourceLineCount) return session;
  const lines=new Set(session.breakpoints);
  if(lines.has(line))lines.delete(line);else lines.add(line);
  return {...session,breakpoints:[...lines].sort((a,b)=>a-b)};
}

export function breakpointMatches(condition, variables = {}) {
  if (!String(condition||"").trim()) return true;
  const match=/^\s*([A-Za-z_]\w*)\s*(===|==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?|true|false)\s*$/i.exec(condition);
  if (!match || !Object.prototype.hasOwnProperty.call(variables,match[1])) return false;
  const left=variables[match[1]];
  const right=/^(true|false)$/i.test(match[3]) ? match[3].toLowerCase()==="true" : Number(match[3]);
  const [op]=[match[2]];
  return ({ "===":left===right,"==":left===right,"!=":left!==right,">=":left>=right,"<=":left<=right,">":left>right,"<":left<right })[op]||false;
}
export function setBreakpointCondition(session, line, condition) {
  if (!session.breakpoints.includes(line)) return session;
  return {...session,conditions:{...session.conditions,[line]:String(condition||"").slice(0,100)}};
}
