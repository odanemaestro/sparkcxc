begin;

-- ============================================================================
-- SPARK CSEC Integrated Science acceptance audit V1
-- Objective mapping and learner progression corrections.
-- Objective 1.1.1 lesson strengthened using the canonical v1.2 question bank.
-- ============================================================================

update public.spark_subjects
set learning_config = coalesce(learning_config,'{}'::jsonb)
  || '{
    "progression":"sequential",
    "lessonNavigation":"mathematics-style",
    "directRouteProtection":true
  }'::jsonb,
updated_at = now()
where id = 'integrated-science';

update public.spark_subject_topics
set
  title = '1.1.1 Diffusion, Osmosis and Active Transport',
  description = 'Analyse diffusion, osmosis and active transport and apply each process to living cells, everyday examples and practical investigations.',
  metadata = jsonb_set(
    jsonb_set(
      metadata,
      '{syllabus,objective}',
      '"1.1.1"'::jsonb,
      true
    ),
    '{lesson}',
    '{
      "objectives":[
        "Analyse diffusion, osmosis and active transport using concentration gradients, membranes and cellular energy.",
        "Explain how diffusion, osmosis and active transport move substances into and out of cells.",
        "Explain why the cell membrane is described as selectively permeable.",
        "Apply the processes to living examples, environmental examples and practical investigations."
      ],
      "introduction":"Living cells constantly exchange substances with their surroundings. Oxygen, water, glucose and mineral ions do not all cross cell boundaries in the same way. The key is to identify what is moving, the direction of the concentration gradient, whether a membrane is involved and whether the cell must supply energy.",
      "sections":[
        {
          "title":"Concentration and net movement",
          "paragraphs":[
            "Concentration describes how much of a substance is present in a given space. A concentration gradient exists when one region has a higher concentration than another.",
            "Particles move randomly all the time. When more particles move in one direction than the other, there is a net movement. The direction of that net movement helps distinguish diffusion, osmosis and active transport."
          ]
        },
        {
          "title":"Diffusion",
          "paragraphs":[
            "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration. The particles move down the concentration gradient and the cell does not supply energy for the process.",
            "A steeper concentration gradient increases the rate of diffusion because there is a larger difference in concentration between the two regions."
          ],
          "bullets":[
            "Oxygen diffuses from the alveoli into the blood when the oxygen concentration is higher in the alveoli.",
            "Carbon dioxide diffuses from respiring cells into the blood when its concentration is higher in the cells.",
            "Perfume, smoke, smog and fine volcanic ash spread from regions where their particles are more concentrated to regions where they are less concentrated."
          ]
        },
        {
          "title":"Osmosis",
          "paragraphs":[
            "Osmosis is the net movement of water molecules through a selectively permeable membrane from a region of higher water concentration to a region of lower water concentration.",
            "A selectively permeable membrane allows some particles to pass more easily than others. This property is important because cells must control what enters and leaves."
          ],
          "bullets":[
            "A plant cell in pure water takes in water and becomes turgid. The cell wall resists further expansion, so the cell does not burst.",
            "A plant cell in a concentrated solution loses water and becomes flaccid because the vacuole and cytoplasm lose water.",
            "An animal cell in distilled water may swell and burst because it has no cell wall to resist the pressure.",
            "Dried raisins swell in water because water enters the cells by osmosis."
          ]
        },
        {
          "title":"Active transport",
          "paragraphs":[
            "Active transport moves particles from a region of lower concentration to a region of higher concentration. This is against the concentration gradient and requires energy released by respiration.",
            "Carrier proteins in cell membranes help move the particles."
          ],
          "bullets":[
            "Root hair cells absorb mineral ions from the soil even when the concentration of those ions is lower in the soil than inside the cell.",
            "Cells lining the small intestine can absorb glucose even when the glucose concentration in the gut is lower than in the cells."
          ]
        },
        {
          "title":"How to identify the process",
          "bullets":[
            "Diffusion: particles move down a concentration gradient. No cellular energy is required.",
            "Osmosis: water moves through a selectively permeable membrane down its water concentration gradient.",
            "Active transport: particles move against a concentration gradient and the cell supplies energy."
          ]
        },
        {
          "title":"Practical focus",
          "paragraphs":[
            "CSEC questions often use an osmometer, potato strips or Visking tubing to test your understanding. Do not memorise the apparatus alone. Identify the variable changed, what was measured, what should be kept constant, the observation and the conclusion supported by the evidence.",
            "For potato-strip investigations, the concentration that produces little or no change in length is close to the concentration of the cell sap because there is no net movement of water."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t1-1-membrane-transport-model",
          "type":"membrane-transport",
          "title":"Movement of substances across cells"
        },
        {
          "id":"m1-t1-1-transport-investigations",
          "type":"transport-investigations",
          "title":"Investigating movement across membranes"
        }
      ],
      "keyPoints":[
        "Diffusion moves particles down a concentration gradient.",
        "Osmosis is the net movement of water through a selectively permeable membrane.",
        "Active transport moves particles against a concentration gradient and requires cellular energy.",
        "Plant and animal cells respond differently to water gain because plant cells have a cell wall.",
        "Practical questions require you to connect variables, observations and conclusions."
      ],
      "workedExample":{
        "title":"Explaining a potato-strip result",
        "prompt":"A potato strip becomes shorter after one hour in a concentrated sugar solution. Explain the change.",
        "steps":[
          "Identify the moving substance: water.",
          "Compare the concentrations: the external solution is more concentrated than the cell sap, so it has a lower water concentration.",
          "State the direction: water moves out of the potato cells through selectively permeable cell membranes.",
          "Name the process and effect: osmosis causes the cells to lose turgor, so the strip becomes shorter and softer."
        ],
        "answer":"Water leaves the potato cells by osmosis because the surrounding solution has a lower water concentration than the cell sap. The cells lose turgor, so the strip becomes shorter and softer."
      },
      "checks":[
        {
          "prompt":"Perfume is opened at the front of a classroom and is later smelled at the back. Which process explains the spread?",
          "answer":"Diffusion.",
          "explanation":"Perfume particles move from the region of higher concentration near the bottle to regions of lower concentration."
        },
        {
          "prompt":"Why can a root hair cell absorb mineral ions when their concentration is lower in the soil than inside the cell?",
          "answer":"The ions are absorbed by active transport.",
          "explanation":"The ions move against their concentration gradient, so the cell must supply energy."
        },
        {
          "prompt":"What happens to a red blood cell placed in distilled water, and why?",
          "answer":"It swells and may burst.",
          "explanation":"Water enters by osmosis. The cell has no cell wall to resist the increase in pressure."
        },
        {
          "prompt":"In a Visking-tubing investigation, iodine enters the tubing but starch remains inside. What does this show?",
          "answer":"The membrane is selectively permeable.",
          "explanation":"Smaller iodine molecules pass through more easily while the larger starch molecules do not."
        }
      ],
      "summary":"To analyse a transport problem, identify the substance, compare concentrations, decide whether a selectively permeable membrane is involved, state the direction of net movement and decide whether cellular energy is required."
    }'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-1-diffusion-osmosis-active-transport';

update public.spark_subject_topics
set
  title = '1.1.2 Animal and Plant Cells',
  metadata = jsonb_set(metadata,'{syllabus,objective}','"1.1.2"'::jsonb,true),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

update public.spark_subject_activity_catalog
set metadata = jsonb_set(coalesce(metadata,'{}'::jsonb),'{syllabusObjective}','"1.1.2"'::jsonb,true),
    updated_at = now()
where subject_id = 'integrated-science'
  and activity_key in (
    'diagram:m1-t1-2-plant-cell',
    'diagram:m1-t1-2-animal-cell',
    'diagram:m1-t1-2-light-microscope'
  );

commit;
