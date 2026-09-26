const fs = require("fs");
const path = require("path");
const {
  adjacentGenericTopic,
  buildSequentialProgression,
  orderedGenericTopics,
  resolveSequentialTopic,
} = require("./subjects/genericSubjectProgression");

const structure = {
  sections:[
    {
      id:"module-1",
      topics:[
        {id:"m1-1",sectionId:"module-1"},
        {id:"m1-2",sectionId:"module-1"},
      ],
    },
    {
      id:"module-2",
      topics:[
        {id:"m2-1",sectionId:"module-2"},
        {id:"m2-2",sectionId:"module-2"},
      ],
    },
  ],
  topics:[],
  unassignedTopics:[],
};

describe("generic subject sequential lesson progression", () => {
  test("orders lessons across modules without skipping ahead", () => {
    expect(orderedGenericTopics(structure).map(topic => topic.id)).toEqual([
      "m1-1","m1-2","m2-1","m2-2",
    ]);
    expect(adjacentGenericTopic(structure,"m1-2",1)?.id).toBe("m2-1");
    expect(adjacentGenericTopic(structure,"m2-1",-1)?.id).toBe("m1-2");
  });

  test("only the current incomplete lesson and completed earlier lessons are unlocked", () => {
    const progress = buildSequentialProgression(structure,new Set(["m1-1"]));
    expect(progress.currentTopic?.id).toBe("m1-2");
    expect([...progress.unlockedIds]).toEqual(["m1-1","m1-2"]);
    expect(progress.isUnlocked("m2-1")).toBe(false);
  });

  test("a manually entered later route falls back to the current incomplete lesson", () => {
    const selected = resolveSequentialTopic({
      structure,
      completedIds:new Set(["m1-1"]),
      requestedTopicId:"m2-2",
      requestedSectionId:"module-2",
    });
    expect(selected?.id).toBe("m1-2");
  });

  test("completing the current lesson unlocks the next syllabus lesson", () => {
    const progress = buildSequentialProgression(
      structure,
      new Set(["m1-1","m1-2"])
    );
    expect(progress.currentTopic?.id).toBe("m2-1");
    expect(progress.isUnlocked("m2-1")).toBe(true);
    expect(progress.isUnlocked("m2-2")).toBe(false);
  });

  test("study view rewrites a future section route to the current unlocked lesson", () => {
    const source = fs.readFileSync(
      path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
      "utf8"
    );
    expect(source).toContain("routed.sectionId && routed.sectionId !== topic.sectionId");
    expect(source).toContain("next.sectionId && next.sectionId !== topic.sectionId");
    expect(source).toContain("{ replace:true }");
  });
});
