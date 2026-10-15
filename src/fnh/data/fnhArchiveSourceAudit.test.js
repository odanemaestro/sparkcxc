import {FNH_ARCHIVE_SOURCE_AUDIT,fnhArchiveAuditSummary} from "./fnhArchiveSourceAudit";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
describe("Exact FNH.zip source quality and release inventory",()=>{
  test("every unique PDF has a source quality audit row",()=>{
    expect(FNH_ARCHIVE_SOURCE_AUDIT).toHaveLength(34);
    expect(new Set(FNH_ARCHIVE_SOURCE_AUDIT.map(x=>x.id)).size).toBe(34);
    expect(FNH_ARCHIVE_SOURCE_AUDIT.map(x=>x.id).sort())
      .toEqual(FNH_SUPPLIED_ARCHIVE.map(x=>x.id).sort());
  });
  test("original PDFs separate text extraction from visually scanned source material",()=>{
    const report=fnhArchiveAuditSummary();
    expect(report).toMatchObject({total:34,textLayer:16,visualOnly:18});
    expect(report.released+report.notReleased).toBe(34);
    expect(report.details.filter(row=>row.requiresVisualTranscription)).toHaveLength(18);
  });
  test("the archive audit does not interpret text presence as question verification",()=>{
    fnhArchiveAuditSummary().details.forEach(row=>{
      expect(row.pages).toBeGreaterThan(0);
      expect(row.extractedCharacters).toBeGreaterThanOrEqual(0);
      if(row.simulatorReady)expect(row.verifiedQuestionCount).toBeGreaterThan(0);
      else expect(row.status).not.toBe("approved");
    });
  });
});
