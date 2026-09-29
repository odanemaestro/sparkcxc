begin;

-- CSEC Integrated Science objective 1.1.2
insert into public.spark_subject_topics(
 subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
 'integrated-science','m1-t1-2-plant-animal-cells','module-1-organisms-life-processes',
 '1.1.2 Plant and Animal Cells',
 'Examine plant and animal cells, identify major structures and relate cell structure to function.',
 20,true,
 '{
  "syllabus":{"module":1,"topic":"Units of Life","objective":"1.1.2","source":"CXC 23/G/SYLL 23, amended 2026"},
  "lesson":{
   "objectives":[
    "Identify structures found in both plant and animal cells.",
    "Identify structures characteristic of plant cells.",
    "State the functions of the nucleus, cytoplasm, cell membrane, mitochondria and ribosomes.",
    "State the functions of the cell wall, chloroplast and large permanent vacuole.",
    "Explain why active cells such as muscle cells contain many mitochondria.",
    "Explain why root hair and onion bulb cells may lack chloroplasts.",
    "Use a light microscope to observe prepared cells."
   ],
   "introduction":"Plant and animal cells share several basic structures, but plant cells also have structures linked to support, storage and photosynthesis. Cell structure is closely related to cell function.",
   "sections":[
    {"title":"Structures found in both plant and animal cells","paragraphs":[
     "Both plant and animal cells have a cell membrane, cytoplasm, a nucleus in most living cells, mitochondria and ribosomes.",
     "The cell membrane controls movement of substances into and out of the cell.",
     "The cytoplasm is the site of many chemical reactions.",
     "The nucleus contains genetic material and controls cell activities.",
     "Mitochondria are the main sites of aerobic respiration.",
     "Ribosomes are the sites of protein synthesis."
    ]},
    {"title":"Structures characteristic of plant cells","paragraphs":[
     "Plant cells have a cellulose cell wall outside the cell membrane. The wall provides support and helps maintain shape.",
     "Many plant cells contain chloroplasts with chlorophyll for photosynthesis.",
     "A large permanent vacuole contains cell sap and helps keep the cell firm when water enters by osmosis."
    ]},
    {"title":"Animal cells","paragraphs":[
     "Animal cells do not have a cellulose cell wall or chloroplasts.",
     "Their outer boundary is the cell membrane, so their shape is generally less fixed than that of plant cells."
    ]},
    {"title":"Specialised cells and organelle number","paragraphs":[
     "Muscle cells require large amounts of energy and therefore contain many mitochondria.",
     "Red blood cells in mammals lose their nucleus and most organelles as they mature, leaving more space for haemoglobin."
    ]},
    {"title":"Cells without chloroplasts","paragraphs":[
     "Not every plant cell contains chloroplasts.",
     "Root hair cells are underground and receive little or no light, so chloroplasts would not support photosynthesis there.",
     "Onion bulb cells are underground storage cells and usually lack chloroplasts."
    ]},
    {"title":"Using a light microscope","paragraphs":[
     "Cells are too small to examine clearly with the unaided eye, so a light microscope is used.",
     "A prepared specimen is placed on the stage and viewed first with a low-power objective.",
     "The coarse and fine focus controls are used to sharpen the image."
    ]},
    {"title":"Comparing plant and animal cells","paragraphs":[
     "Cell wall, chloroplasts and a large permanent vacuole are characteristic plant-cell structures.",
     "Cell membrane, cytoplasm, nucleus, mitochondria and ribosomes occur in typical cells of both groups."
    ]}
   ],
   "interactiveDiagrams":[
    {
     "id":"m1-t1-2-plant-cell",
     "template":"plant-cell",
     "title":"Label a plant cell",
     "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"cell-wall","text":"Cell wall","hint":"Look for the thick outer boundary.","explanation":"The cellulose cell wall supports the plant cell and helps maintain its shape."},
      {"id":"cell-membrane","text":"Cell membrane","hint":"Look just inside the cell wall.","explanation":"The cell membrane controls movement of substances into and out of the cell."},
      {"id":"nucleus","text":"Nucleus","hint":"Look for the large round control centre.","explanation":"The nucleus contains genetic material and controls cell activities."},
      {"id":"vacuole","text":"Large vacuole","hint":"Look for the large central fluid-filled space.","explanation":"The vacuole contains cell sap and helps maintain turgor."},
      {"id":"chloroplast","text":"Chloroplast","hint":"Look for an oval photosynthetic organelle.","explanation":"Chloroplasts contain chlorophyll and are the site of photosynthesis."},
      {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for an oval organelle with an internal folded line.","explanation":"Mitochondria are sites of aerobic respiration."}
     ],
     "targets":[
      {"id":"pc-wall","labelId":"cell-wall","boxX":20,"boxY":65,"anchorX":250,"anchorY":280,"side":"left"},
      {"id":"pc-membrane","labelId":"cell-membrane","boxX":20,"boxY":145,"anchorX":270,"anchorY":320,"side":"left"},
      {"id":"pc-nucleus","labelId":"nucleus","boxX":20,"boxY":225,"anchorX":405,"anchorY":285,"side":"left"},
      {"id":"pc-vacuole","labelId":"vacuole","boxX":790,"boxY":80,"anchorX":525,"anchorY":305,"side":"right"},
      {"id":"pc-chloroplast","labelId":"chloroplast","boxX":790,"boxY":160,"anchorX":650,"anchorY":190,"side":"right"},
      {"id":"pc-mito","labelId":"mitochondrion","boxX":790,"boxY":240,"anchorX":655,"anchorY":335,"side":"right"}
     ]
    },
    {
     "id":"m1-t1-2-animal-cell",
     "template":"animal-cell",
     "title":"Label an animal cell",
     "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"cell-membrane","text":"Cell membrane","hint":"Look for the outer boundary of the cell.","explanation":"The membrane controls movement into and out of the cell."},
      {"id":"cytoplasm","text":"Cytoplasm","hint":"Look for the jelly-like interior around the organelles.","explanation":"Many cell reactions occur in the cytoplasm."},
      {"id":"nucleus","text":"Nucleus","hint":"Look for the large central round structure.","explanation":"The nucleus contains genetic material and controls cell activities."},
      {"id":"mitochondrion","text":"Mitochondrion","hint":"Look for an oval organelle with an internal folded line.","explanation":"Mitochondria release usable energy during aerobic respiration."},
      {"id":"ribosome","text":"Ribosome","hint":"Look for a very small dot in the cytoplasm.","explanation":"Ribosomes are sites of protein synthesis."},
      {"id":"small-vacuole","text":"Small vacuole","hint":"Look for the small oval storage region.","explanation":"Small vacuoles may store water or dissolved substances in animal cells."}
     ],
     "targets":[
      {"id":"ac-membrane","labelId":"cell-membrane","boxX":20,"boxY":65,"anchorX":285,"anchorY":305,"side":"left"},
      {"id":"ac-cytoplasm","labelId":"cytoplasm","boxX":20,"boxY":145,"anchorX":350,"anchorY":210,"side":"left"},
      {"id":"ac-nucleus","labelId":"nucleus","boxX":20,"boxY":225,"anchorX":460,"anchorY":300,"side":"left"},
      {"id":"ac-mito","labelId":"mitochondrion","boxX":790,"boxY":80,"anchorX":610,"anchorY":350,"side":"right"},
      {"id":"ac-ribosome","labelId":"ribosome","boxX":790,"boxY":160,"anchorX":345,"anchorY":190,"side":"right"},
      {"id":"ac-vacuole","labelId":"small-vacuole","boxX":790,"boxY":240,"anchorX":590,"anchorY":245,"side":"right"}
     ]
    },
    {
     "id":"m1-t1-2-light-microscope",
     "template":"light-microscope",
     "title":"Label a light microscope",
     "instructions":"Drag each label to the correct microscope part. On a phone or tablet, tap a label and then tap the numbered target.",
     "labels":[
      {"id":"eyepiece","text":"Eyepiece","hint":"Look at the top where the observer looks through.","explanation":"The eyepiece contains the ocular lens."},
      {"id":"objective","text":"Objective lens","hint":"Look above the stage for a short lens.","explanation":"Objective lenses provide the main magnification."},
      {"id":"stage","text":"Stage","hint":"Look for the flat platform holding the slide.","explanation":"The slide is placed on the stage."},
      {"id":"light","text":"Light source","hint":"Look below the stage.","explanation":"The light source illuminates the specimen."},
      {"id":"focus","text":"Focus control","hint":"Look for a side knob.","explanation":"Focus controls sharpen the image."},
      {"id":"base","text":"Base","hint":"Look at the broad bottom support.","explanation":"The base supports the microscope."}
     ],
     "targets":[
      {"id":"mic-eye","labelId":"eyepiece","boxX":20,"boxY":65,"anchorX":440,"anchorY":85,"side":"left"},
      {"id":"mic-objective","labelId":"objective","boxX":20,"boxY":145,"anchorX":480,"anchorY":285,"side":"left"},
      {"id":"mic-stage","labelId":"stage","boxX":20,"boxY":225,"anchorX":470,"anchorY":355,"side":"left"},
      {"id":"mic-light","labelId":"light","boxX":790,"boxY":80,"anchorX":470,"anchorY":430,"side":"right"},
      {"id":"mic-focus","labelId":"focus","boxX":790,"boxY":160,"anchorX":590,"anchorY":260,"side":"right"},
      {"id":"mic-base","labelId":"base","boxX":790,"boxY":240,"anchorX":510,"anchorY":505,"side":"right"}
     ]
    }
   ],
   "keyPoints":[
    "Plant and animal cells both contain a cell membrane, cytoplasm, mitochondria and ribosomes.",
    "The nucleus contains genetic material and controls cell activities.",
    "Plant cells have a cellulose cell wall and may contain chloroplasts and a large permanent vacuole.",
    "Ribosomes make proteins.",
    "Mitochondria are sites of aerobic respiration.",
    "Muscle cells contain many mitochondria because they have a high energy demand.",
    "Root hair and onion bulb cells usually lack chloroplasts because they are not exposed to enough light for photosynthesis."
   ],
   "workedExample":{
    "title":"Identifying a cell",
    "prompt":"A cell contains a nucleus, cytoplasm, cell membrane and many mitochondria but no cell wall. What type of cell is it likely to be?",
    "steps":[
     "No cell wall indicates it is not a typical plant cell.",
     "Many mitochondria suggest a high demand for energy.",
     "Muscle cells are active animal cells that require large amounts of energy."
    ],
    "answer":"It is most likely a muscle cell."
   },
   "checks":[
    {"prompt":"Which two structures are characteristic of plant cells but not animal cells?","answer":"Cell wall and chloroplasts.","explanation":"Plant cells also usually have a large permanent vacuole."},
    {"prompt":"Where are proteins made?","answer":"At ribosomes.","explanation":"Ribosomes are the sites of protein synthesis."},
    {"prompt":"Why do muscle cells contain many mitochondria?","answer":"They need large amounts of energy from aerobic respiration.","explanation":"Mitochondria support high energy demand."},
    {"prompt":"Why do onion bulb cells usually lack chloroplasts?","answer":"They grow underground and do not receive enough light for photosynthesis.","explanation":"Chloroplasts are unnecessary in non-photosynthetic storage tissue."}
   ],
   "summary":"Plant and animal cells share essential structures, but plant cells have additional structures associated with support, storage and photosynthesis."
  }
 }'::jsonb
)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":114,"objectivesBuilt":114}'::jsonb,updated_at=now() where id='integrated-science';
commit;
