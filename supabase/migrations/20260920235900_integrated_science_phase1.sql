begin;

-- ============================================================================
-- SPARK CSEC Integrated Science Phase 1
-- Source of truth: CXC 23/G/SYLL 23, amended 2026 for examinations from 2027.
-- The subject remains Draft until its learner content and QA are approved.
-- ============================================================================

insert into public.spark_subjects(
  id,
  name,
  short_name,
  qualification,
  mark,
  description,
  enabled,
  status,
  sort_order,
  implementation,
  study_view,
  capabilities,
  routes,
  stats,
  learning_config,
  manifest_version
)
values (
  'integrated-science',
  'CSEC Integrated Science',
  'Integrated Science',
  'CSEC',
  'IS',
  'Study CSEC Integrated Science through syllabus-linked lessons, diagrams, investigations and exam-style practice across organisms and life processes, energy and our planet.',
  true,
  'draft',
  50,
  'generic',
  'study',
  '{
    "study":true,
    "practice":false,
    "flashcards":false,
    "progress":true,
    "paper1":false,
    "paper2":false,
    "adaptive":false,
    "structured":false,
    "labs":false,
    "sba":false
  }'::jsonb,
  '{
    "study":"/study/integrated-science",
    "practice":"/practice/integrated-science",
    "flashcards":"/dashboard/flashcards/integrated-science",
    "progress":"/dashboard/progress"
  }'::jsonb,
  '{
    "sections":1,
    "topics":2,
    "objectives":2,
    "interactiveDiagrams":2
  }'::jsonb,
  '{
    "syllabusCode":"CXC 23/G/SYLL 23",
    "syllabusRevision":"Amended 2026",
    "examFrom":2027,
    "modules":[
      "Organisms and Life Processes",
      "Energy",
      "Our Planet"
    ],
    "exam":{
      "paper1":{"items":60,"minutes":75,"itemsPerModule":20},
      "paper2":{"questions":6,"minutes":150,"questionsPerModule":2},
      "paper3":"SBA 031 or practical alternative 032"
    }
  }'::jsonb,
  1
)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  qualification = excluded.qualification,
  mark = excluded.mark,
  description = excluded.description,
  sort_order = excluded.sort_order,
  implementation = excluded.implementation,
  study_view = excluded.study_view,
  capabilities = case
    when public.spark_subjects.status = 'draft' then excluded.capabilities
    else public.spark_subjects.capabilities
  end,
  routes = excluded.routes,
  stats = excluded.stats,
  learning_config = excluded.learning_config,
  manifest_version = greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
  updated_at = now();


insert into public.spark_subject_sections(
  subject_id,
  section_id,
  title,
  description,
  sort_order,
  enabled,
  metadata
)
values (
  'integrated-science',
  'module-1-organisms-life-processes',
  'Module 1: Organisms and Life Processes',
  'Study cells and the movement of substances, reproduction, transport, excretion, coordination and health using biological knowledge, practical investigation and everyday Caribbean contexts.',
  10,
  true,
  '{
    "module":1,
    "minimumHours":45,
    "skills":["Knowledge and Comprehension","Use of Knowledge","Experimental Skills"]
  }'::jsonb
)
on conflict (subject_id,section_id) do update set
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order,
  enabled = excluded.enabled,
  metadata = excluded.metadata,
  updated_at = now();


insert into public.spark_subject_topics(
  subject_id,
  topic_id,
  section_id,
  title,
  description,
  sort_order,
  enabled,
  metadata
)
values
(
  'integrated-science',
  'm1-t1-1-diffusion-osmosis-active-transport',
  'module-1-organisms-life-processes',
  '1.1 Diffusion, Osmosis and Active Transport',
  'Analyse how diffusion, osmosis and active transport move substances in living organisms and relate each process to particle movement, concentration gradients and cell membranes.',
  10,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Units of Life",
      "objective":"1.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain diffusion, osmosis and active transport using the movement of particles and concentration gradients.",
        "Explain how these processes move substances into and out of cells and from one cell to another.",
        "Explain why the cell membrane is described as selectively permeable.",
        "Apply diffusion to natural and human-made examples such as volcanic ash, smog and smoke."
      ],
      "introduction":"Cells are always exchanging substances with their surroundings. Water, oxygen, mineral ions and other particles do not all move in the same way. To understand how a cell stays alive, you need to know what moves, where it moves and whether energy is needed.",
      "sections":[
        {
          "title":"Start with concentration",
          "paragraphs":[
            "Concentration tells us how much of a substance is present in a given space. A concentration gradient exists when one region has a higher concentration than another.",
            "Particles move continuously. The direction of their net movement helps us distinguish diffusion, osmosis and active transport."
          ]
        },
        {
          "title":"Diffusion",
          "paragraphs":[
            "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration. The particles move down the concentration gradient and no cellular energy is required."
          ],
          "bullets":[
            "Oxygen can diffuse from the air spaces in the lungs into the blood.",
            "Carbon dioxide can diffuse from cells into the blood.",
            "Outside living organisms, particles from smoke, smog and volcanic ash spread through the air by diffusion."
          ]
        },
        {
          "title":"Osmosis",
          "paragraphs":[
            "Osmosis is the movement of water molecules through a selectively permeable membrane from a region with a higher concentration of water molecules to a region with a lower concentration of water molecules.",
            "The membrane allows some substances to pass more easily than others. This is why the cell membrane is described as selectively permeable."
          ]
        },
        {
          "title":"Active transport",
          "paragraphs":[
            "Active transport moves particles from a region of lower concentration to a region of higher concentration. This is against the concentration gradient, so the cell must supply energy.",
            "Root hair cells use active transport when mineral ions must be taken up from soil even when the concentration of those ions is already higher inside the cell."
          ]
        },
        {
          "title":"Practical focus",
          "paragraphs":[
            "You should be able to interpret simple investigations that demonstrate diffusion and osmosis. Pay attention to the variable changed, what was observed, and how the observation provides evidence for particle movement."
          ]
        }
      ],
      "keyPoints":[
        "Diffusion moves particles down a concentration gradient.",
        "Osmosis involves water moving through a selectively permeable membrane.",
        "Active transport moves particles against a concentration gradient and requires energy.",
        "The cell membrane controls the movement of substances into and out of the cell."
      ],
      "summary":"Always identify the particle, the concentration gradient, the membrane if one is involved, and whether energy is required. Those four checks usually tell you which transport process is taking place."
    }
  }'::jsonb
),
(
  'integrated-science',
  'm1-t1-2-animal-and-plant-cells',
  'module-1-organisms-life-processes',
  '1.2 Animal and Plant Cells',
  'Examine animal and plant cells, identify the main cell structures, relate each structure to its function and draw simple annotated cell diagrams.',
  20,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Units of Life",
      "objective":"1.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main structures in unspecialised animal and plant cells.",
        "Explain the functions of the cell wall, cell membrane, nucleus, cytoplasm, ribosomes, mitochondria, vacuoles and chloroplasts.",
        "Compare a typical animal cell with a typical plant cell.",
        "Draw and annotate simple cell diagrams suitable for CSEC Integrated Science."
      ],
      "introduction":"The cell is the basic unit of life. A cell is small, but it is organised. Different structures carry out different jobs, and together they keep the cell functioning.",
      "sections":[
        {
          "title":"Structures found in both plant and animal cells",
          "bullets":[
            "Cell membrane: controls movement of substances into and out of the cell.",
            "Cytoplasm: the material where many chemical reactions take place.",
            "Nucleus: contains genetic information and helps control cell activities, including cell division and protein production.",
            "Ribosomes: sites of protein production.",
            "Mitochondria: sites where energy is released during aerobic respiration.",
            "Vacuoles: contain cell sap or other materials. Plant cells usually have a much larger permanent vacuole."
          ]
        },
        {
          "title":"Structures associated with plant cells",
          "bullets":[
            "Cell wall: gives support and helps the cell keep its shape.",
            "Chloroplasts: contain chlorophyll and are associated with photosynthesis."
          ]
        },
        {
          "title":"What a good cell diagram should show",
          "paragraphs":[
            "CSEC requires simple annotated diagrams. Keep the drawing large, use clear single lines, avoid shading and place labels neatly outside the diagram with straight label lines.",
            "The interactive diagrams below are schematic study diagrams. When examining prepared slides under a light microscope, only structures that are visible should be drawn."
          ]
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t1-2-plant-cell",
          "template":"plant-cell",
          "title":"Label the plant cell",
          "instructions":"Drag each label to the correct target. On a phone or tablet, tap a label and then tap the target.",
          "labels":[
            {"id":"cell-wall","text":"Cell wall","hint":"Look for the rigid outer boundary.","explanation":"The cell wall supports the plant cell and helps it keep its shape."},
            {"id":"cell-membrane","text":"Cell membrane","hint":"This thin boundary lies just inside the cell wall.","explanation":"The cell membrane controls movement of substances into and out of the cell."},
            {"id":"cytoplasm","text":"Cytoplasm","hint":"This is the material filling much of the cell around the organelles.","explanation":"Many chemical reactions take place in the cytoplasm."},
            {"id":"nucleus","text":"Nucleus","hint":"Look for the prominent round structure inside the cell.","explanation":"The nucleus contains genetic information and helps control cell activities."},
            {"id":"vacuole","text":"Vacuole","hint":"A plant cell usually has one large central space.","explanation":"The large plant-cell vacuole contains cell sap and helps maintain cell pressure."},
            {"id":"chloroplast","text":"Chloroplast","hint":"Look for one of the small green oval structures.","explanation":"Chloroplasts contain chlorophyll and are associated with photosynthesis."},
            {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for a small oval structure with an inner folded line.","explanation":"Mitochondria release energy during aerobic respiration."},
            {"id":"ribosomes","text":"Ribosomes","hint":"Look for the tiny dots in the cytoplasm.","explanation":"Ribosomes are the sites of protein production."}
          ],
          "targets":[
            {"id":"plant-wall-target","labelId":"cell-wall","boxX":20,"boxY":80,"anchorX":250,"anchorY":105,"side":"left"},
            {"id":"plant-membrane-target","labelId":"cell-membrane","boxX":20,"boxY":155,"anchorX":276,"anchorY":160,"side":"left"},
            {"id":"plant-cytoplasm-target","labelId":"cytoplasm","boxX":20,"boxY":230,"anchorX":325,"anchorY":218,"side":"left"},
            {"id":"plant-nucleus-target","labelId":"nucleus","boxX":20,"boxY":305,"anchorX":405,"anchorY":285,"side":"left"},
            {"id":"plant-vacuole-target","labelId":"vacuole","boxX":790,"boxY":80,"anchorX":555,"anchorY":305,"side":"right"},
            {"id":"plant-chloroplast-target","labelId":"chloroplast","boxX":790,"boxY":155,"anchorX":650,"anchorY":190,"side":"right"},
            {"id":"plant-mitochondrion-target","labelId":"mitochondrion","boxX":790,"boxY":230,"anchorX":655,"anchorY":335,"side":"right"},
            {"id":"plant-ribosome-target","labelId":"ribosomes","boxX":790,"boxY":305,"anchorX":540,"anchorY":405,"side":"right"}
          ]
        },
        {
          "id":"m1-t1-2-animal-cell",
          "template":"animal-cell",
          "title":"Label the animal cell",
          "instructions":"Place each label on the correct structure, then check your answers.",
          "labels":[
            {"id":"cell-membrane","text":"Cell membrane","hint":"Look for the outer boundary of the animal cell.","explanation":"The cell membrane controls movement of substances into and out of the cell."},
            {"id":"cytoplasm","text":"Cytoplasm","hint":"This fills most of the cell around the organelles.","explanation":"Many chemical reactions take place in the cytoplasm."},
            {"id":"nucleus","text":"Nucleus","hint":"Look for the large round structure inside the cell.","explanation":"The nucleus contains genetic information and helps control cell activities."},
            {"id":"vacuole","text":"Vacuole","hint":"Animal-cell vacuoles are usually smaller than the large plant-cell vacuole.","explanation":"Vacuoles contain water and dissolved substances."},
            {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for an oval structure with an internal folded line.","explanation":"Mitochondria release energy during aerobic respiration."},
            {"id":"ribosomes","text":"Ribosomes","hint":"Look for the tiny dots in the cytoplasm.","explanation":"Ribosomes are the sites of protein production."}
          ],
          "targets":[
            {"id":"animal-membrane-target","labelId":"cell-membrane","boxX":20,"boxY":105,"anchorX":300,"anchorY":285,"side":"left"},
            {"id":"animal-cytoplasm-target","labelId":"cytoplasm","boxX":20,"boxY":190,"anchorX":350,"anchorY":205,"side":"left"},
            {"id":"animal-nucleus-target","labelId":"nucleus","boxX":20,"boxY":275,"anchorX":460,"anchorY":300,"side":"left"},
            {"id":"animal-vacuole-target","labelId":"vacuole","boxX":790,"boxY":105,"anchorX":590,"anchorY":245,"side":"right"},
            {"id":"animal-mitochondrion-target","labelId":"mitochondrion","boxX":790,"boxY":190,"anchorX":610,"anchorY":350,"side":"right"},
            {"id":"animal-ribosome-target","labelId":"ribosomes","boxX":790,"boxY":275,"anchorX":575,"anchorY":285,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Plant and animal cells share several basic structures, including a cell membrane, cytoplasm and nucleus.",
        "Plant cells also have a cell wall and chloroplasts.",
        "A plant cell usually has a larger permanent vacuole than an animal cell.",
        "Cell structure questions often test both identification and function."
      ],
      "summary":"Do not memorise a cell diagram as a picture alone. Link every structure to a function. If you know what each part does, comparison and application questions become much easier."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id = excluded.section_id,
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order,
  enabled = excluded.enabled,
  metadata = excluded.metadata,
  updated_at = now();


insert into public.spark_subject_activity_catalog(
  subject_id,
  activity_key,
  activity_type,
  section_id,
  topic_id,
  title,
  route,
  evidence_weight,
  enabled,
  metadata
)
values
(
  'integrated-science',
  'diagram:m1-t1-2-plant-cell',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t1-2-animal-and-plant-cells',
  'Label the plant cell',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t1-2-animal-and-plant-cells',
  0.35,
  true,
  '{"syllabusObjective":"1.2","mode":"drag-drop-label"}'::jsonb
),
(
  'integrated-science',
  'diagram:m1-t1-2-animal-cell',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t1-2-animal-and-plant-cells',
  'Label the animal cell',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t1-2-animal-and-plant-cells',
  0.35,
  true,
  '{"syllabusObjective":"1.2","mode":"drag-drop-label"}'::jsonb
)
on conflict (subject_id,activity_key) do update set
  activity_type = excluded.activity_type,
  section_id = excluded.section_id,
  topic_id = excluded.topic_id,
  title = excluded.title,
  route = excluded.route,
  evidence_weight = excluded.evidence_weight,
  enabled = excluded.enabled,
  metadata = excluded.metadata,
  updated_at = now();

commit;