begin;

-- CSEC Integrated Science objective 1.1.1
insert into public.spark_subject_topics(
 subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
 'integrated-science','m1-t1-1-cell-transport','module-1-organisms-life-processes',
 '1.1.1 Diffusion, Osmosis and Active Transport',
 'Analyse diffusion, osmosis and active transport and apply them to cells and simple investigations.',
 10,true,
 '{
  "syllabus":{"module":1,"topic":"Units of Life","objective":"1.1.1","source":"CXC 23/G/SYLL 23, amended 2026"},
  "lesson":{
   "objectives":[
    "Define diffusion as net particle movement down a concentration gradient.",
    "Define osmosis as water movement through a selectively permeable membrane from higher water concentration to lower water concentration.",
    "Explain active transport as movement against a concentration gradient using energy from respiration.",
    "Compare the energy and membrane requirements of the three processes.",
    "Apply osmosis to plant and animal cells.",
    "Explain mineral-ion uptake by root hair cells and glucose uptake by intestinal cells.",
    "Interpret osmometer, potato-strip and Visking-tubing investigations.",
    "Explain factors that increase diffusion rate."
   ],
   "introduction":"Cells constantly exchange substances with their surroundings. Diffusion, osmosis and active transport differ in what moves, the direction of movement and whether cellular energy is required.",
   "sections":[
    {"title":"Diffusion","paragraphs":[
     "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration.",
     "The particles move down a concentration gradient and no energy from the cell is required.",
     "A steeper concentration gradient increases the rate of diffusion. Higher temperature, larger surface area and shorter diffusion distance can also increase rate."
    ]},
    {"title":"Diffusion in living systems","paragraphs":[
     "Oxygen diffuses from alveoli into blood because oxygen concentration is higher in alveolar air than in deoxygenated blood.",
     "Carbon dioxide diffuses in the opposite direction where its concentration gradient favours movement."
    ]},
    {"title":"Osmosis","paragraphs":[
     "Osmosis is the net movement of water molecules through a selectively permeable membrane from a region of higher water concentration to a region of lower water concentration.",
     "It can also be described as movement of water from a more dilute solution to a more concentrated solution through a selectively permeable membrane.",
     "The membrane is essential because it allows water through while restricting some solute particles."
    ]},
    {"title":"Osmosis in plant cells","paragraphs":[
     "A plant cell in pure water gains water by osmosis and becomes turgid.",
     "The cellulose cell wall resists further expansion and prevents the cell from bursting.",
     "In a concentrated salt or sugar solution, water leaves the cell by osmosis, reducing turgor and causing tissues such as potato strips to become softer and smaller."
    ]},
    {"title":"Osmosis in animal cells","paragraphs":[
     "Animal cells have no cell wall.",
     "A red blood cell placed in distilled water gains water by osmosis, swells and may burst.",
     "A sufficiently concentrated external solution causes water to leave the cell."
    ]},
    {"title":"Active transport","paragraphs":[
     "Active transport moves substances from a region of lower concentration to a region of higher concentration, against the concentration gradient.",
     "It requires energy released by respiration and uses transport proteins in the cell membrane.",
     "Root hair cells can absorb mineral ions from dilute soil solution by active transport.",
     "Cells lining the small intestine can absorb glucose against a concentration gradient using active transport."
    ]},
    {"title":"Osmometer investigation","paragraphs":[
     "An osmometer containing concentrated sugar solution is separated from distilled water by a selectively permeable membrane.",
     "Water enters the sugar solution by osmosis, causing the liquid level in the capillary tube to rise."
    ]},
    {"title":"Potato-strip investigation","paragraphs":[
     "Equal potato strips are placed in solutions of different concentration and the change in length or mass is measured.",
     "A gain in size indicates net water entry. A loss indicates net water exit.",
     "Where there is little or no change, the external solution is close to the concentration of the cell sap."
    ]},
    {"title":"Visking-tubing investigation","paragraphs":[
     "Visking tubing acts as a model selectively permeable membrane.",
     "Small iodine molecules can pass through more readily than large starch molecules.",
     "If iodine surrounds starch inside the tubing, iodine enters and turns the starch blue-black while starch remains inside."
    ]}
   ],
   "interactiveModels":[
    {"id":"m1-t1-1-transport-processes","type":"membrane-transport","title":"Diffusion, osmosis and active transport explorer"},
    {"id":"m1-t1-1-transport-investigations","type":"transport-investigations","title":"Transport practical investigations"}
   ],
   "keyPoints":[
    "Diffusion moves particles down a concentration gradient.",
    "Osmosis is water movement through a selectively permeable membrane.",
    "Active transport moves substances against a concentration gradient and requires energy.",
    "Plant cells become turgid in dilute solutions because their walls resist expansion.",
    "Animal cells can burst in very dilute solutions because they lack a cell wall.",
    "Root hair cells use active transport to absorb mineral ions.",
    "Osmometers, potato strips and Visking tubing provide evidence for membrane transport."
   ],
   "workedExample":{
    "title":"Potato strip in concentrated solution",
    "prompt":"A potato strip becomes shorter after being placed in concentrated sugar solution. Explain the observation.",
    "steps":[
     "The sugar solution has a lower water concentration than the potato cell sap.",
     "Water moves out of the potato cells through their selectively permeable membranes.",
     "The cells lose turgor.",
     "The strip becomes shorter and softer."
    ],
    "answer":"Water leaves the potato cells by osmosis, so the cells lose turgor and the strip shrinks."
   },
   "checks":[
    {"prompt":"Which transport process requires energy from respiration?","answer":"Active transport.","explanation":"It moves substances against a concentration gradient."},
    {"prompt":"Why does a red blood cell swell in distilled water?","answer":"Water enters by osmosis.","explanation":"Distilled water has a higher water concentration than the cell contents."},
    {"prompt":"What happens to the liquid level in an osmometer containing concentrated sugar solution?","answer":"It rises.","explanation":"Water enters through the selectively permeable membrane by osmosis."},
    {"prompt":"Why can root hair cells take up mineral ions from a more dilute soil solution?","answer":"They use active transport.","explanation":"Energy is used to move ions against the concentration gradient."}
   ],
   "summary":"Diffusion and osmosis are passive processes moving down appropriate gradients. Active transport uses cellular energy to move substances against a concentration gradient."
  }
 }'::jsonb
)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":114,"objectivesBuilt":114}'::jsonb,updated_at=now() where id='integrated-science';
commit;
