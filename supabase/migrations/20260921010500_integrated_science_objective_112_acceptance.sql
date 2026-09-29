begin;

-- ============================================================================
-- SPARK CSEC Integrated Science Objective 1.1.2 acceptance audit
-- Preserve the approved plant cell, animal cell and microscope interactives
-- while strengthening learner explanation, application and practical context.
-- ============================================================================

update public.spark_subject_topics
set
  title = '1.1.2 Animal and Plant Cells',
  description = 'Examine animal and plant cells, relate visible and microscopic structures to their functions, compare the two cell types and produce clear biological drawings.',
  metadata = jsonb_set(
    jsonb_set(metadata,'{syllabus,objective}','"1.1.2"'::jsonb,true),
    '{lesson}',
    coalesce(metadata #> '{lesson}','{}'::jsonb)
      || '{
        "objectives":[
          "Identify the main structures in unspecialised animal and plant cells.",
          "Relate the cell wall, cell membrane, nucleus, cytoplasm, ribosomes, mitochondria, vacuoles and chloroplasts to their functions.",
          "Compare typical animal and plant cells and explain why some specialised plant cells do not contain chloroplasts.",
          "Examine prepared plant and animal cells using a light microscope and make clear annotated biological drawings."
        ],
        "introduction":"Cells are the basic units of living organisms. Their structures are linked to the work they carry out. A useful cell diagram therefore shows more than names. It helps you connect each structure with its function and recognise why different cells do not always look identical.",
        "sections":[
          {
            "title":"Structures found in both plant and animal cells",
            "bullets":[
              "Cell membrane: controls movement of substances into and out of the cell.",
              "Cytoplasm: contains enzymes and is where many chemical reactions take place.",
              "Nucleus: contains genetic information and helps control cell activities.",
              "Ribosomes: sites of protein production.",
              "Mitochondria: sites where energy is released during aerobic respiration.",
              "Vacuoles: contain water and dissolved substances. Plant cells usually have a much larger permanent vacuole."
            ]
          },
          {
            "title":"Structures associated with plant cells",
            "bullets":[
              "Cell wall: made mainly of cellulose. It supports the cell and helps it keep a fixed shape.",
              "Chloroplasts: contain chlorophyll and absorb light for photosynthesis.",
              "Large permanent vacuole: contains cell sap and helps maintain turgor."
            ]
          },
          {
            "title":"Cell structure depends on function",
            "paragraphs":[
              "Not every plant cell contains chloroplasts. Root hair cells and cells from an onion bulb usually develop where little or no light reaches them, so chloroplasts would not help them carry out photosynthesis.",
              "Cells that require large amounts of energy often contain many mitochondria. Muscle cells are a useful example because contraction requires a continuous supply of energy from respiration."
            ]
          },
          {
            "title":"Using a light microscope",
            "paragraphs":[
              "Cells are too small to examine clearly with the unaided eye. A light microscope enlarges the image of a prepared specimen so that visible structures can be examined.",
              "Begin with the lower-power objective lens. Place the slide on the stage, centre the specimen over the light, use the coarse focus to obtain an image, then use the fine focus to sharpen it. Higher power should be used only after the specimen is clearly located."
            ],
            "bullets":[
              "Eyepiece lens: the lens closest to the eye.",
              "Objective lenses: provide different magnifications.",
              "Stage: supports the prepared slide.",
              "Coarse focus: makes larger focusing adjustments.",
              "Fine focus: sharpens the image using small adjustments.",
              "Light source: directs light through the specimen."
            ]
          },
          {
            "title":"Biological drawing",
            "paragraphs":[
              "Draw what is visible rather than every structure shown in a textbook diagram. A prepared onion epidermis, for example, may show cell walls, cytoplasm, a nucleus and a vacuole, but chloroplasts should not be added if they are not visible.",
              "Make the drawing large. Use clear single lines, do not shade, use ruled label lines that do not cross, and place labels outside the drawing. Include an appropriate title."
            ]
          },
          {
            "title":"Comparing plant and animal cells",
            "bullets":[
              "Both contain a cell membrane, cytoplasm, nucleus, ribosomes and mitochondria.",
              "Plant cells have a cellulose cell wall; animal cells do not.",
              "Photosynthetic plant cells contain chloroplasts; animal cells do not.",
              "Plant cells usually have a large permanent vacuole; animal-cell vacuoles are much smaller when present.",
              "The cell wall gives many plant cells a more regular fixed shape."
            ]
          }
        ],
        "keyPoints":[
          "Cell structure and cell function must be learned together.",
          "Plant and animal cells share several organelles, but plant cells also have a cell wall and may contain chloroplasts.",
          "Specialised cells do not always contain every structure shown in a typical textbook cell.",
          "A light microscope supports direct examination of prepared cells.",
          "Good biological drawings show only visible structures using clear lines and accurate labels."
        ],
        "workedExample":{
          "title":"Recognising a plant cell from a diagram",
          "prompt":"A cell diagram shows a cell wall, chloroplasts, a nucleus and a large vacuole. State two features which identify it as a plant cell.",
          "steps":[
            "Look for structures that animal cells do not have.",
            "A cell wall is a plant-cell feature.",
            "Chloroplasts are also plant-cell structures in photosynthetic tissue.",
            "A large permanent vacuole supports the identification but two correct distinguishing features are enough."
          ],
          "answer":"The cell wall and chloroplasts identify the cell as a plant cell. A large permanent vacuole is another acceptable feature."
        },
        "checks":[
          {
            "prompt":"Which structure is the site of protein production?",
            "answer":"Ribosomes.",
            "explanation":"Ribosomes assemble proteins needed by the cell."
          },
          {
            "prompt":"Why would a root hair cell usually lack chloroplasts?",
            "answer":"It develops underground where there is little or no light for photosynthesis.",
            "explanation":"Chloroplasts would not provide an advantage in tissue that does not receive enough light to photosynthesise."
          },
          {
            "prompt":"Why are many mitochondria found in active cells such as muscle cells?",
            "answer":"They need a large supply of energy from aerobic respiration.",
            "explanation":"Mitochondria are the main sites where energy is released during aerobic respiration."
          },
          {
            "prompt":"When examining a prepared slide, why should you begin with the lower-power objective lens?",
            "answer":"It gives a wider field of view and makes the specimen easier to locate and focus.",
            "explanation":"Once the specimen is centred and focused, a higher-power objective can be used for more detail."
          }
        ],
        "summary":"When you examine a cell, identify its visible structures, link each structure to its function, decide which features distinguish plant from animal cells and remember that specialised cells may not contain every organelle shown in a typical diagram."
      }'::jsonb,
    true
  ),
  updated_at = now()
where subject_id = 'integrated-science'
  and topic_id = 'm1-t1-2-animal-and-plant-cells';

commit;
