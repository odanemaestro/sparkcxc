import {FNH_P1_2003_TRANSCRIPTION_DRAFT} from "./fnhHistorical2003Paper1Draft";
import {FNH_P1_2016_TRANSCRIPTION_DRAFT} from "./fnhHistorical2016Paper1Draft";
import {FNH_P1_2017_TRANSCRIPTION_DRAFT} from "./fnhHistorical2017Paper1Draft";
import {FNH_P1_2020_TRANSCRIPTION_DRAFT} from "./fnhHistorical2020Paper1Draft";
import {FNH_P1_2026_TRANSCRIPTION_DRAFT} from "./fnhHistorical2026Paper1Draft";

// Regression checks for high-confidence concepts, not CXC key authentication.
function selectedText(row) {
  return row.options["ABCD".indexOf(row.proposedAnswer)];
}
describe("FNH historical answer sanity checks", () => {
  test("2003 stays in 1–60 source-number order, regardless of insertion order", () => {
    expect(FNH_P1_2003_TRANSCRIPTION_DRAFT.map(q=>q.number))
      .toEqual(Array.from({length:60},(_,i)=>i+1));
    const actual=Object.fromEntries(FNH_P1_2003_TRANSCRIPTION_DRAFT.map(q=>[q.number,q.proposedAnswer]));
    // Independently compare by question number rather than by array index.
    const documentKey="BDDCCCCADADCCDDCBBDCDDDCACDBABCDDADCABBBACCBDAACAAACBDAAACDC".split("");
    expect(documentKey).toHaveLength(60);
    for(let n=1;n<=60;n++){
      if([4,5,6,33,41,46,59].includes(n))continue;
      expect(actual[n]).toBe(documentKey[n-1]);
    }
    expect(selectedText(FNH_P1_2003_TRANSCRIPTION_DRAFT[58])).toMatch(/hypertension/i);
  });

  test("2003 numbering maps to the intended concepts and choice text", () => {
    const expected = new Map([
      [12,"salt"],[22,"cellulose"],[25,"protein"],
      [29,"diabetes"],[37,"monosaccharides"],[59,"hypertension"],
    ]);
    for (const [number,word] of expected) {
      const row=FNH_P1_2003_TRANSCRIPTION_DRAFT.find(q=>q.number===number);
      expect(row).toBeDefined();
      expect(selectedText(row).toLowerCase()).toContain(word);
    }
    expect(new Set(FNH_P1_2003_TRANSCRIPTION_DRAFT.map(q=>q.number)).size).toBe(60);
  });
  test("tiered steamer is chosen when several foods use one heat source", () => {
    for(const [bank,number] of [
      [FNH_P1_2016_TRANSCRIPTION_DRAFT,50],
      [FNH_P1_2017_TRANSCRIPTION_DRAFT,55],
      [FNH_P1_2020_TRANSCRIPTION_DRAFT,56],
      [FNH_P1_2026_TRANSCRIPTION_DRAFT,53],
    ]) {
      const row=bank.find(q=>q.number===number);
      expect(selectedText(row)).toMatch(/tiered steamer/i);
      expect(row.officialKeyVerified).not.toBe(true);
    }
  });
});
