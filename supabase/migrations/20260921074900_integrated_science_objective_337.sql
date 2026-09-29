begin;

-- CSEC Integrated Science objective 3.3.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-7-flotation',
  'module-3-environment',
  '3.3.7 Flotation',
  'Determine the conditions for flotation using density, upthrust, Archimedes'' principle, displacement, safe loading and water density.',
  774,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.7","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define upthrust.",
        "State Archimedes'' principle.",
        "Calculate density from mass and volume.",
        "Predict whether an object will float or sink from its density.",
        "Calculate upthrust from apparent weight loss.",
        "Explain why hollow steel ships float.",
        "Explain why a ship floats lower in fresh water than in sea water.",
        "Explain why salt water provides greater upthrust.",
        "Explain the danger of overloading a fishing boat.",
        "Explain the purpose of a Plimsoll or load line."
      ],
      "introduction":"An object in a fluid experiences an upward buoyant force called upthrust. Floating depends on the relationship between weight, displaced fluid and average density.",
      "sections":[
        {"title":"Upthrust","paragraphs":[
          "Upthrust is the upward force a fluid exerts on an object placed in it.",
          "An immersed object appears to weigh less because upthrust acts opposite to its weight."
        ]},
        {"title":"Archimedes'' principle","paragraphs":[
          "Archimedes'' principle states that the upthrust on an immersed object is equal to the weight of the fluid displaced by the object.",
          "If a stone weighs 5.0 N in air and has an apparent weight of 3.0 N in water, the upthrust is 5.0 - 3.0 = 2.0 N.",
          "The displaced water therefore weighs 2.0 N."
        ]},
        {"title":"Density and floating","paragraphs":[
          "Density = mass ÷ volume.",
          "A 60 g block with a volume of 100 cm³ has a density of 0.6 g/cm³ and floats in fresh water.",
          "An object with density 1.25 g/cm³ sinks in fresh water because it is denser than the water."
        ]},
        {"title":"Why ships float","paragraphs":[
          "Steel itself is denser than water, but a ship is hollow and encloses a large volume of air.",
          "The average density of the whole ship can therefore be less than the surrounding water.",
          "The ship settles until it displaces enough water for the upthrust to balance its weight."
        ]},
        {"title":"Sea water and fresh water","paragraphs":[
          "Sea water is denser than fresh water because it contains dissolved salts.",
          "For the same submerged volume, denser sea water provides a greater upthrust.",
          "A loaded ship therefore floats slightly higher in sea water and sinks slightly lower when it enters fresh water."
        ]},
        {"title":"Salt-water egg","paragraphs":[
          "Adding salt increases the density of water.",
          "An egg that sinks in fresh water may float in a sufficiently concentrated salt solution because the denser liquid provides enough upthrust."
        ]},
        {"title":"Overloading boats","paragraphs":[
          "Adding too much load makes a boat sit lower in the water and reduces its freeboard.",
          "Low freeboard means waves can more easily enter the boat and stability can be reduced, increasing the risk of swamping or capsize."
        ]},
        {"title":"Plimsoll line","paragraphs":[
          "A Plimsoll or load line marks the maximum safe loading depth of a ship.",
          "Safe loading limits vary with water density and operating conditions."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-7-flotation","type":"flotation","title":"Density, upthrust and ship-loading explorer"}],
      "keyPoints":[
        "Upthrust acts upward on objects in fluids.",
        "Archimedes'' principle: upthrust equals the weight of fluid displaced.",
        "Density = mass ÷ volume.",
        "Objects less dense than water can float.",
        "A hollow ship has a lower average density than solid steel.",
        "Sea water is denser than fresh water.",
        "Ships float lower in fresh water.",
        "Upthrust can be found from loss of apparent weight.",
        "Overloading reduces freeboard and safety.",
        "The Plimsoll line shows safe loading limits."
      ],
      "workedExample":{
        "title":"Calculating density and predicting flotation",
        "prompt":"A block has a mass of 60 g and a volume of 100 cm³. Will it float in fresh water?",
        "steps":[
          "Density = mass ÷ volume.",
          "Density = 60 ÷ 100.",
          "Density = 0.6 g/cm³.",
          "Fresh water has density about 1.0 g/cm³.",
          "The block is less dense than the water."
        ],
        "answer":"Yes. It floats because its density is 0.6 g/cm³, less than fresh water."
      },
      "checks":[
        {"prompt":"What is upthrust?","answer":"The upward force exerted by a fluid on an object in it.","explanation":"It is also called buoyant force."},
        {"prompt":"What does Archimedes'' principle state?","answer":"Upthrust equals the weight of fluid displaced.","explanation":"This links buoyancy to displacement."},
        {"prompt":"Why does a ship float lower in fresh water than in sea water?","answer":"Fresh water is less dense, so the ship must displace more water to obtain the same upthrust.","explanation":"Greater displacement means the hull sits deeper."},
        {"prompt":"Why is overloading dangerous?","answer":"It lowers freeboard and can reduce stability, increasing swamping or capsize risk.","explanation":"The vessel sits too low in the water."}
      ],
      "summary":"Flotation is controlled by density, displacement and the balance between weight and upthrust."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
