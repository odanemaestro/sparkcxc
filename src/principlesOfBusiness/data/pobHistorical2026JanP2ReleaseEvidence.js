// Offline release-readiness assessment, deliberately separate from publishing.
// A successful structural CI run does not qualify as semantic calibration.
export const POB_JAN_2026_P2_RELEASE_POLICY=Object.freeze({
 paperId:"POB-P2-2026-JAN",
 minimumBenchmarkCases:20,
 minimumCoveredParts:32,
 requiredMarksCovered:100,
 maximumDisputed:0,
 maximumFailures:0
});
export function assessPobJan2026ReleaseEvidence({
 report,coverage,authenticatedWorkerVerified=false,serverBankRegistered=false,
 productionGatesVerified=false,approvedByAdmin=false
}={}){
 const blockers=[],policy=POB_JAN_2026_P2_RELEASE_POLICY;
 if(!report||report.paper!==policy.paperId||
    !Array.isArray(report.results)||report.results.length<policy.minimumBenchmarkCases)
  blockers.push("No complete provider-executed semantic calibration report.");
 else{
  if(!report.model||!report.generatedAt)blockers.push("Calibration provider/model provenance is absent.");
  if(report.results.some(r=>r.result!=="pass"&&r.result!=="blank"))
   blockers.push("Calibration has failed, disputed or unexecuted cases.");
  if(report.failures!==0||report.disputed!==0)
   blockers.push("Calibration failures or disagreements remain.");
  if(report.results.some(r=>r.result==="blank"&&!r.id))
   blockers.push("Anonymous blank-script result.");
 }
 if(!coverage||coverage.uniqueParts!==policy.minimumCoveredParts||
    coverage.criterionMarks!==policy.requiredMarksCovered||
    coverage.semanticBenchmarkedParts!==policy.minimumCoveredParts)
  blockers.push("Every historical part and mark criterion needs semantic benchmark coverage.");
 if(authenticatedWorkerVerified!==true)blockers.push("Authenticated worker end-to-end proof missing.");
 if(serverBankRegistered!==true)blockers.push("Exact source-controlled historical bank not registered on server.");
 if(productionGatesVerified!==true)blockers.push("Production security and feature gates not verified.");
 if(approvedByAdmin!==true)blockers.push("Explicit administrator release approval missing.");
 return Object.freeze({paper:policy.paperId,eligible:blockers.length===0,blockers,
  // This assessor NEVER toggles any production feature or exposes a numeric grade.
  publicationPerformed:false});
}
