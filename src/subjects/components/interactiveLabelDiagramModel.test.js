import {
  correctDiagramPlacements,
  nextDiagramHintTarget,
  normalizeInteractiveLabelActivity,
  scoreDiagramPlacements,
} from "./interactiveLabelDiagramModel";

const activity = {
  id:"plant-cell-test",
  template:"plant-cell",
  labels:[
    {id:"nucleus",text:"Nucleus"},
    {id:"cell-wall",text:"Cell wall"},
  ],
  targets:[
    {id:"t1",labelId:"nucleus",boxX:1,boxY:2,anchorX:3,anchorY:4},
    {id:"t2",labelId:"cell-wall",boxX:5,boxY:6,anchorX:7,anchorY:8},
  ],
};

describe("SPARK interactive label diagram model", () => {
  test("normalizes valid labels and targets", () => {
    const result = normalizeInteractiveLabelActivity(activity);
    expect(result.labels).toHaveLength(2);
    expect(result.targets).toHaveLength(2);
  });

  test("builds the correct placement map", () => {
    expect(correctDiagramPlacements(activity)).toEqual({
      t1:"nucleus",
      t2:"cell-wall",
    });
  });

  test("scores placements without partial-credit ambiguity", () => {
    expect(scoreDiagramPlacements(activity,{t1:"nucleus",t2:"nucleus"}))
      .toMatchObject({correct:1,total:2,percent:50,complete:false});
    expect(scoreDiagramPlacements(activity,correctDiagramPlacements(activity)))
      .toMatchObject({correct:2,total:2,percent:100,complete:true});
  });

  test("returns the next incorrect target for hints", () => {
    expect(nextDiagramHintTarget(activity,{t1:"nucleus"})?.id).toBe("t2");
  });
});