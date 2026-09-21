const fs = require("fs");
const path = require("path");
const { repairIntegratedScienceText } = require("./integratedScience/utils/repairIntegratedScienceText");
const { buildGenericSubjectStructure } = require("./subjects/genericSubjectCatalog");

describe("Integrated Science learner polish V1", () => {
  test("repairs common scientific-text mojibake", () => {
    expect(repairIntegratedScienceText("6 Ã— sideÂ² and sideÂ³ at 25Â°C"))
      .toBe("6 × side² and side³ at 25°C");
  });

  test("orders Integrated Science topics by syllabus objective before legacy sort order", () => {
    const structure = buildGenericSubjectStructure({
      sections:[{
        subject_id:"integrated-science",
        section_id:"module-1-organisms-life-processes",
        title:"Module 1",
        sort_order:10,
        enabled:true,
      }],
      topics:[
        {
          subject_id:"integrated-science",
          topic_id:"m1-t2-1",
          section_id:"module-1-organisms-life-processes",
          title:"1.2.1 Asexual and Sexual Reproduction",
          sort_order:1,
          enabled:true,
          metadata:{syllabus:{objective:"1.2.1"}},
        },
        {
          subject_id:"integrated-science",
          topic_id:"m1-t1-2",
          section_id:"module-1-organisms-life-processes",
          title:"1.1.2 Animal and Plant Cells",
          sort_order:200,
          enabled:true,
          metadata:{syllabus:{objective:"1.1.2"}},
        },
        {
          subject_id:"integrated-science",
          topic_id:"m1-t1-1",
          section_id:"module-1-organisms-life-processes",
          title:"1.1.1 Diffusion, Osmosis and Active Transport",
          sort_order:300,
          enabled:true,
          metadata:{syllabus:{objective:"1.1.1"}},
        },
      ],
    });

    expect(structure.topics.map(topic => topic.id)).toEqual([
      "m1-t1-1",
      "m1-t1-2",
      "m1-t2-1",
    ]);
  });

  test("post-acceptance migration normalises the first two canonical topics", () => {
    const migration = fs.readFileSync(
      path.join(__dirname,"..","supabase","migrations","20260921093000_integrated_science_post_acceptance_polish_v1.sql"),
      "utf8"
    );

    expect(migration).toContain("m1-t1-1-diffusion-osmosis-active-transport");
    expect(migration).toContain("m1-t1-2-animal-and-plant-cells");
    expect(migration).toContain("sort_order = 10");
    expect(migration).toContain("sort_order = 20");
  });

  test("cell and microscope templates include recognisable internal structures", () => {
    const diagram = fs.readFileSync(
      path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
      "utf8"
    );

    expect(diagram).toContain("chloroplast-grana");
    expect(diagram).toContain('className="cristae"');
    expect(diagram).toContain("microscope-stage-aperture");
    expect(diagram).toContain("microscope-condenser");
    expect(diagram).toContain("microscope-light-beam");

    const transport = fs.readFileSync(
      path.join(__dirname,"subjects","components","TransportProcessExplorer.jsx"),
      "utf8"
    );
    expect(transport).toContain("MembraneBilayer");
    expect(transport).toContain("net movement");
    expect(transport).toContain("from respiration");

    const transportNeed = fs.readFileSync(
      path.join(__dirname,"subjects","components","TransportSystemNeedExplorer.jsx"),
      "utf8"
    );
    expect(transportNeed).toContain("tn-undiffused-core");
    expect(transportNeed).toContain("Same diffusion time for all three cubes");
    expect(transportNeed).toContain("Diffusion time");
  });
});
