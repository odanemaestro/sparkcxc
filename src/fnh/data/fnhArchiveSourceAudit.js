// Source quality audit using PyMuPDF on the exact PDFs in the supplied FNH.zip.
// Counts are text-layer characters and pages, NOT verified questions or marks.
// A low text count indicates a scanned PDF requiring page-by-page visual reading.
// All historical answer keys and diagram-bearing source questions require manual QA.
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
export const FNH_ARCHIVE_SOURCE_AUDIT = Object.freeze([{"id":"FNH-P1-2003-MJ","paper":1,"year":2003,"pages":6,"extractedCharacters":10947},{"id":"FNH-P1-2004-MJ","paper":1,"year":2004,"pages":8,"extractedCharacters":10711},{"id":"FNH-P1-2005-MJ","paper":1,"year":2005,"pages":7,"extractedCharacters":11150},{"id":"FNH-P1-2006-MJ","paper":1,"year":2006,"pages":8,"extractedCharacters":7773},{"id":"FNH-P1-2007-MJ","paper":1,"year":2007,"pages":8,"extractedCharacters":12162},{"id":"FNH-P1-2008-MJ","paper":1,"year":2008,"pages":7,"extractedCharacters":10524},{"id":"FNH-P1-2009-MJ","paper":1,"year":2009,"pages":9,"extractedCharacters":13087},{"id":"FNH-P1-2014-MJ","paper":1,"year":2014,"pages":8,"extractedCharacters":0},{"id":"FNH-P1-2015-MJ","paper":1,"year":2015,"pages":8,"extractedCharacters":0},{"id":"FNH-P1-2016-MJ","paper":1,"year":2016,"pages":9,"extractedCharacters":0},{"id":"FNH-P1-2017-MJ","paper":1,"year":2017,"pages":9,"extractedCharacters":0},{"id":"FNH-P1-2018-MJ","paper":1,"year":2018,"pages":9,"extractedCharacters":198},{"id":"FNH-P1-2019-MJ","paper":1,"year":2019,"pages":9,"extractedCharacters":0},{"id":"FNH-P1-2020-MJ","paper":1,"year":2020,"pages":9,"extractedCharacters":0},{"id":"FNH-P1-2021-MJ","paper":1,"year":2021,"pages":4,"extractedCharacters":0},{"id":"FNH-P1-2026-MJ","paper":1,"year":2026,"pages":10,"extractedCharacters":0},{"id":"FNH-P2-2005-MJ","paper":2,"year":2005,"pages":5,"extractedCharacters":5661},{"id":"FNH-P2-2006-MJ","paper":2,"year":2006,"pages":5,"extractedCharacters":6109},{"id":"FNH-P2-2008-MJ","paper":2,"year":2008,"pages":6,"extractedCharacters":7902},{"id":"FNH-P2-2009-MJ","paper":2,"year":2009,"pages":7,"extractedCharacters":7849},{"id":"FNH-P2-2010-MJ","paper":2,"year":2010,"pages":6,"extractedCharacters":7427},{"id":"FNH-P2-2011-MJ","paper":2,"year":2011,"pages":8,"extractedCharacters":0},{"id":"FNH-P2-2012-MJ","paper":2,"year":2012,"pages":6,"extractedCharacters":0},{"id":"FNH-P2-2013-MJ","paper":2,"year":2013,"pages":6,"extractedCharacters":0},{"id":"FNH-P2-2014-MJ","paper":2,"year":2014,"pages":7,"extractedCharacters":8223},{"id":"FNH-P2-2015-MJ","paper":2,"year":2015,"pages":7,"extractedCharacters":7135},{"id":"FNH-P2-2016-MJ","paper":2,"year":2016,"pages":7,"extractedCharacters":6232},{"id":"FNH-P2-2017-MJ","paper":2,"year":2017,"pages":15,"extractedCharacters":8440},{"id":"FNH-P2-2018-MJ","paper":2,"year":2018,"pages":24,"extractedCharacters":0},{"id":"FNH-P2-2019-MJ","paper":2,"year":2019,"pages":18,"extractedCharacters":0},{"id":"FNH-P2-2021-MJ","paper":2,"year":2021,"pages":19,"extractedCharacters":0},{"id":"FNH-P2-2022-MJ","paper":2,"year":2022,"pages":16,"extractedCharacters":0},{"id":"FNH-P2-2024-MJ","paper":2,"year":2024,"pages":20,"extractedCharacters":0},{"id":"FNH-P2-2026-MJ","paper":2,"year":2026,"pages":20,"extractedCharacters":0}]);
export function fnhArchiveAuditSummary(){
  const papers=FNH_ARCHIVE_SOURCE_AUDIT;
  const details=papers.map(row=>{
    const archive=FNH_SUPPLIED_ARCHIVE.find(p=>p.id===row.id);
    return {...row,hasUsableTextLayer:row.extractedCharacters>1000,
      requiresVisualTranscription:row.extractedCharacters<=1000,
      simulatorReady:Boolean(archive?.simulatorReady),
      status:archive?.reviewStatus||"missing",
      verifiedQuestionCount:archive?.verifiedQuestionCount||0};
  });
  return {total:details.length,
    textLayer:details.filter(row=>row.hasUsableTextLayer).length,
    visualOnly:details.filter(row=>row.requiresVisualTranscription).length,
    released:details.filter(row=>row.simulatorReady).length,
    notReleased:details.filter(row=>!row.simulatorReady).length,
    details};
}
