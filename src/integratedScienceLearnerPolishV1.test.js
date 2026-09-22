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
    expect(migration).toContain("'Ã—','×'");
    expect(migration).toContain("'Â²','²'");
    expect(migration).toContain("'Â³','³'");
    expect(migration).toContain("'Â°','°'");
    expect(migration).toContain("do $$");
    expect(migration).toContain("end\n$$;");
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

    const transportStructures = fs.readFileSync(
      path.join(__dirname,"subjects","components","TransportStructuresExplorer.jsx"),
      "utf8"
    );
    expect(transportStructures).toContain("ts-anatomical-heart");
    expect(transportStructures).toContain("ts-heart-ra");
    expect(transportStructures).toContain("ts-heart-lv");
    expect(transportStructures).toContain("ts-heart-valve");

    const skeleton = fs.readFileSync(
      path.join(__dirname,"subjects","components","HumanSkeletonExplorer.jsx"),
      "utf8"
    );
    expect(skeleton).toContain("hs-anatomical");
    expect(skeleton).toContain("hs-skull");
    expect(skeleton).toContain("hs-ribs");
    expect(skeleton).toContain("hs-pelvis");
    expect(skeleton).toContain("hs-femur");
    expect(skeleton).toContain("aria-pressed");

    const eyeFunction = fs.readFileSync(
      path.join(__dirname,"subjects","components","EyeFunctionExplorer.jsx"),
      "utf8"
    );
    expect(eyeFunction).toContain("ef-anatomical-eye");
    expect(eyeFunction).toContain("ef-optic-nerve");
    expect(eyeFunction).toContain("ef-aqueous");

    const muscleMovement = fs.readFileSync(
      path.join(__dirname,"subjects","components","SkeletalMuscleMovementExplorer.jsx"),
      "utf8"
    );
    expect(muscleMovement).toContain("sm-scapula");
    expect(muscleMovement).toContain("sm-bone radius");
    expect(muscleMovement).toContain("spark-knee-svg");
    expect(muscleMovement).toContain("sm-patella");

    const nervous = fs.readFileSync(
      path.join(__dirname,"subjects","components","NervousSystemExplorer.jsx"),
      "utf8"
    );
    expect(nervous).toContain("ns-brain cerebrum");
    expect(nervous).toContain("ns-brain cerebellum");
    expect(nervous).toContain("ns-nerve fine");
    expect(nervous).toContain("ns-silhouette");
    expect(nervous).toContain("ns-spinal-roots");
    expect(nervous).toContain("ns-pns upper");
    expect(nervous).toContain("Central nervous system (CNS)");
    expect(nervous).toContain("Peripheral nervous system (PNS)");

    const gasExchange = fs.readFileSync(
      path.join(__dirname,"subjects","components","GaseousExchangeExplorer.jsx"),
      "utf8"
    );
    expect(gasExchange).toContain("gx-alveolar-cluster");
    expect(gasExchange).toContain("gx-capillary-network");
    expect(gasExchange).toContain("gx-exchange-barrier");
    expect(gasExchange).toContain("thin exchange barrier");
    expect(gasExchange).toContain("deoxygenated blood enters");
    expect(gasExchange).toContain("oxygenated blood leaves");
    expect(gasExchange).toContain("walls one cell thick");

    const breathing = fs.readFileSync(
      path.join(__dirname,"subjects","components","BreathingMechanismExplorer.jsx"),
      "utf8"
    );
    expect(breathing).toContain("bm-trachea");
    expect(breathing).toContain("bm-bronchioles");
    expect(breathing).toContain("bm-rib-arrow");

    expect(diagram).toContain("eye-vitreous");
    expect(diagram).toContain("eye-aqueous");
    expect(diagram).toContain("ear-vestibule");
    expect(diagram).toContain('className="malleus"');
    expect(diagram).toContain("heart-semilunar");

    expect(diagram).toContain("spark-reference-refined");
    expect(diagram).toContain("heart-left-wall-inner");
    expect(diagram).toContain("heart-chordae");
    expect(diagram).toContain("kidney-columns");
    expect(diagram).toContain("kidney-vessel branch artery");
    expect(diagram).toContain("eye-retinal-vessels");
    expect(diagram).toContain("ear-bone");
    expect(diagram).toContain("ear-oval-window");
    expect(diagram).toContain("female-myometrium");
    expect(diagram).toContain("female-follicle");
    expect(diagram).toContain("male-erectile-tissue");
    expect(diagram).toContain("rough-er");
    expect(diagram).toContain("smooth-er");
    expect(diagram).toContain("golgi");
    expect(diagram).toContain("lysosomes");
    expect(diagram).toContain("centrosome");
    expect(diagram).toContain("cytoskeleton");
    expect(diagram).toContain("plant-peroxisomes");
    expect(diagram).toContain("plasmodesmata");
    expect(diagram).toContain("plant-central-vacuole");
    expect(diagram).toContain("plant-golgi");
    expect(diagram).toContain("golgi-vesicle");
    expect(diagram).toContain("pregnancy-myometrium");
    expect(diagram).toContain("pregnancy-placental-villi");
    expect(diagram).toContain("pregnancy-umbilical-inner");

    const pregnancy = fs.readFileSync(
      path.join(__dirname,"subjects","components","PregnancyStagesExplorer.jsx"),
      "utf8"
    );
    expect(pregnancy).toContain("ps-amniotic-sac");
    expect(pregnancy).toContain("ps-amniotic-fluid");
    expect(pregnancy).toContain("ps-foetus-head");
    expect(pregnancy).toContain("ps-placental-villi");
    expect(pregnancy).toContain("ps-umbilical-inner artery");
    expect(pregnancy).toContain("maternal and foetal blood do not normally mix directly");
    expect(diagram).toContain("foetus-head");
    expect(diagram).toContain("foetus-torso");
    expect(diagram).toContain("digestive-duodenum");
    expect(diagram).toContain("digestive-appendix");

    const digestion = fs.readFileSync(
      path.join(__dirname,"subjects","components","HumanDigestionExplorer.jsx"),
      "utf8"
    );
    expect(digestion).toContain("spark-digestion-system-svg");
    expect(digestion).toContain("dg-oesophagus");
    expect(digestion).toContain("dg-stomach");
    expect(digestion).toContain("dg-liver");
    expect(digestion).toContain("dg-pancreas");
    expect(digestion).toContain("dg-duodenum");
    expect(digestion).toContain("dg-small");
    expect(digestion).toContain("dg-large");
    expect(digestion).toContain("dg-route");
    expect(diagram).toContain("tooth-root-canal");
    expect(diagram).toContain("tooth-periodontal");

    const teeth = fs.readFileSync(
      path.join(__dirname,"subjects","components","TeethFunctionExplorer.jsx"),
      "utf8"
    );
    expect(teeth).toContain("function ToothShape");
    expect(teeth).toContain("Incisor tooth with chisel-shaped crown");
    expect(teeth).toContain("Canine tooth with pointed crown");
    expect(teeth).toContain("Premolar tooth with two cusps");
    expect(teeth).toContain("Molar tooth with broad multi-cusped crown");
    expect(teeth).toContain("spark-tooth-shape");
    expect(diagram).toContain("resp-tracheal-ring");
    expect(diagram).toContain("resp-alveoli");
    expect(diagram).toContain("brain-corpus-callosum");
    expect(diagram).toContain("brain-cerebellum-fold");
    expect(diagram).toContain("brain-pons");
    expect(diagram).toContain("endo-trachea");
    expect(diagram).toContain("endo-pancreatic-duct");

    const excretion = fs.readFileSync(
      path.join(__dirname,"subjects","components","HumanExcretionMechanismsExplorer.jsx"),
      "utf8"
    );
    expect(excretion).toContain("KidneyAndNephron-v4_Antares42.svg");
    expect(excretion).toContain("Kidney and nephron reference");
    expect(excretion).toContain("Antares42");
    expect(excretion).toContain("CC BY-SA 3.0");
    expect(excretion).toContain("glomerulus");
    expect(excretion).toContain("Bowman’s capsule");
    expect(excretion).toContain("Skin_Cross-Section_%28NIH_BioArt_677%29.png");
    expect(excretion).toContain("NIH NIAID BioArt");
    expect(excretion).toContain("Public domain");
    expect(excretion).toContain("subcutaneous fat");

    expect(skeleton).toContain("hs-frontal");
    expect(skeleton).toContain("hs-temporal");
    expect(skeleton).toContain("hs-nasal");
    expect(skeleton).toContain("hs-zygoma");
    expect(skeleton).toContain("hs-maxilla");
    expect(skeleton).toContain("hs-teeth");
  });
});
