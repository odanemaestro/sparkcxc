// Inventory of the user's POB.zip historical sources, not question transcriptions.
// A file listed here is NOT available for playback or grading in the web app.
const p1=[[2002,"MJ",9],[2003,"MJ",8],[2004,"MJ",8],[2005,"MJ",10],[2006,"MJ",8],
  [2007,"MJ",8],[2008,"MJ",8],[2011,"MJ",8],[2012,"MJ",9],[2014,"MJ",9],
  [2015,"MJ",9],[2016,"MJ",8],[2017,"MJ",10],[2018,"MJ",9],[2019,"MJ",15],
  [2020,"JAN",8],[2020,"MJ",9],[2021,"MJ",11],[2022,"JAN",9],[2023,"JAN",9],[2024,"MJ",11]];
const p2=[[2005,"MJ",5],[2006,"MJ",6],[2007,"MJ",6],[2008,"MJ",4],[2009,"MJ",4],
  [2010,"MJ",4],[2011,"MJ",4],[2012,"MJ",5],[2013,"MJ",5],[2014,"MJ",5],
  [2015,"MJ",16],[2016,"MJ",18],[2017,"MJ",16],[2018,"MJ",14],
  [2019,"JAN",14],[2019,"MJ",15],[2021,"MJ",16],[2022,"JAN",20],
  [2022,"MJ",13],[2023,"JAN",24],[2023,"MJ",17],
  [2024,"JAN",2],[2024,"MJ",16],[2025,"JAN",20],[2026,"JAN",6]];
const item=(paper,[year,sitting,pages])=>{
 const sourcePaperMismatch=paper===1&&year===2019&&sitting==="MJ";
 return Object.freeze({
  id:"POB-P"+paper+"-"+year+"-"+sitting,
  paper,year,sitting,pages,
  filename:"CSEC_Principles_of_Business_P"+paper+"_"+year+"_"+sitting+".pdf",
  historical:true,origin:"user-supplied",
  sourcePaperMismatch,
  coverPaperNumber:sourcePaperMismatch?2:null,
  coverTestCode:sourcePaperMismatch?"01240020":null,
  transcriptionStatus:"not-verified",answerKeyStatus:"not-verified",
  simulatorReady:false,
  syllabusEra:year>=2019?"2019-syllabus-era":"historical-earlier-format",
  note:sourcePaperMismatch
    ?"MISLABELLED: file is named P1 2019 MJ, but rendered PDF cover is Paper 02 (test code 01240020). Not a Paper 1 source."
    :"Source PDF supplied in POB.zip. Questions and answers are not published until accurately transcribed and independently cross-checked against authoritative keys."
 });
};
export const POB_SUPPLIED_ARCHIVE=Object.freeze([
  ...p1.map(row=>item(1,row)),...p2.map(row=>item(2,row))
]);
export const POB_SOURCE_INVENTORY=Object.freeze({
  paper1:p1.length,paper2:p2.length,total:POB_SUPPLIED_ARCHIVE.length,
  mislabeledPaper1Sources:1,
  pagesPaper1:p1.reduce((sum,x)=>sum+x[2],0),
  pagesPaper2:p2.reduce((sum,x)=>sum+x[2],0),
  syllabusFilename:"CSEC-Principles-of-Business-Syllabus-.pdf",
  origin:"POB.zip"
});
export const pobReleasedHistoricalPapers=()=>POB_SUPPLIED_ARCHIVE.filter(p=>p.simulatorReady&&!p.sourcePaperMismatch);
