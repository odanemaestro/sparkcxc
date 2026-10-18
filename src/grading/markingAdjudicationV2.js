/**
 * Batch 3: strict, advisory-only adjudication of grading evidence.
 * Do not expose this module as a final-grade authority. Server-signed
 * provenance and independent grader identity remain future requirements.
 */
import {reconcileMarkingCriteria} from "./markingReconciliationV2";

const finite=n=>typeof n==="number"&&Number.isFinite(n);
const str=s=>typeof s==="string"?s.trim():"";
const known=new Set(["award","deny","unresolved"]);
export function auditAdjudicationEvidence({criteria=[], evidence=[]}={}){
  const issues=[];
  if(!Array.isArray(criteria)||!Array.isArray(evidence))
    return {pass:false,issues:["invalid-input"],accepted:[]};
  const registry=new Map();
  for(const c of criteria){
    if(!str(c?.id)||registry.has(c.id)||!finite(c?.maxMarks)||c.maxMarks<=0){
      issues.push("invalid-or-duplicate-criterion");continue;
    }
    registry.set(c.id,c.maxMarks);
  }
  const seen=new Set(),accepted=[];
  for(const e of evidence){
    const max=registry.get(e?.criterionId);
    if(max===undefined){issues.push("unknown-criterion");continue;}
    if(!known.has(e?.decision)||!finite(e?.marks)||e.marks<0||e.marks>max||
      ((e.decision==="deny"||e.decision==="unresolved")&&e.marks!==0)){
      issues.push("invalid-evidence-mark");continue;
    }
    if(!str(e?.method)||!Array.isArray(e?.evidenceRefs)||
      e.evidenceRefs.length===0||e.evidenceRefs.some(ref=>!str(ref))){
      issues.push("missing-evidence-provenance");continue;
    }
    if(e.authority==="trusted-rule" && !str(e?.graderRunId)){
      issues.push("missing-grader-run");continue;
    }
    // A method must not emit contradictory decisions for the same criterion/run.
    const key=[e.criterionId,e.method,e.graderRunId??""].join("|");
    if(seen.has(key)){issues.push("duplicate-method-decision");continue;}
    seen.add(key);
    accepted.push(e);
  }
  return {pass:issues.length===0&&registry.size===criteria.length,
    issues:[...new Set(issues)],accepted};
}
export function adjudicateMarkingEvidence({criteria=[],evidence=[]}={}){
  const audit=auditAdjudicationEvidence({criteria,evidence});
  if(!audit.pass)return {
    status:"invalid-evidence",canPublish:false,issues:audit.issues,
    reconciliation:null,reviewQueue:[]
  };
  // Every trusted rule must be independently produced. Merely changing the
  // name of a grader method is insufficient proof of independence.
  const claims=new Map();
  for(const e of audit.accepted.filter(x=>x.authority==="trusted-rule")){
    const key=e.criterionId+"|"+e.graderRunId;
    if(!claims.has(key))claims.set(key,new Set());
    claims.get(key).add(e.method);
  }
  const duplicateRuns=[...claims.values()].some(s=>s.size>1);
  if(duplicateRuns)return {status:"invalid-evidence",canPublish:false,
    issues:["reused-grader-run"],reconciliation:null,reviewQueue:[]};
  const reconciliation=reconcileMarkingCriteria({criteria,evidence:audit.accepted});
  return {
    status:reconciliation.unresolvedMarks===0?"locally-reconciled":"requires-review",
    canPublish:false,
    issues:[],
    reconciliation,
    reviewQueue:reconciliation.parts.filter(p=>p.status!=="verified").map(p=>({
      criterionId:p.id,maximum:p.maxMarks,reason:p.reason
    }))
  };
}
