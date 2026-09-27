begin;

-- CSEC Integrated Science objective 3.5.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-1-material-properties',
  'module-3-environment',
  '3.5.1 Properties and Uses of Materials',
  'Relate the physical properties of metals, non-metals and other common materials to their practical uses.',
  810,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Compare broad physical properties of metals and non-metals.",
        "Define ductility, malleability, elasticity and tensile strength.",
        "Relate conductivity to electrical wiring and cooking utensils.",
        "Relate low thermal conductivity to pan handles.",
        "Relate low density and corrosion resistance to aircraft use.",
        "Relate strength and low mass to carbon-fibre bicycle frames.",
        "Relate hardness and durability to ceramic tiles.",
        "Relate elasticity to racket strings.",
        "Relate rot resistance and strength to nylon fishing nets."
      ],
      "introduction":"Materials are chosen because their properties suit particular jobs. Metals, non-metals, polymers, ceramics, wood and composites each offer different combinations of strength, conductivity, density, elasticity, hardness and durability.",
      "sections":[
        {"title":"Metals and non-metals","paragraphs":[
          "Most metals conduct heat and electricity well, are malleable and can often be drawn into wires.",
          "Most non-metals are poor conductors of heat and electricity, and many solid non-metals are brittle.",
          "These are broad trends rather than absolute rules. Graphite, for example, conducts electricity even though carbon is a non-metal."
        ]},
        {"title":"Ductility and malleability","paragraphs":[
          "Ductility is the ability of a material to be drawn into wires.",
          "Malleability is the ability to be hammered or rolled into sheets.",
          "Copper is ductile and therefore useful for electrical wiring, while aluminium is malleable and can be made into foil."
        ]},
        {"title":"Conductivity","paragraphs":[
          "Copper is used for electrical wiring because it is a good electrical conductor and can be drawn into wires.",
          "Cooking pots are made from good thermal conductors so heat can pass quickly to the food.",
          "Wood and many plastics are poor thermal conductors, so they are suitable for pan handles."
        ]},
        {"title":"Density and corrosion resistance","paragraphs":[
          "Aluminium has a relatively low density and forms a protective oxide layer in air.",
          "These properties make it useful for aircraft structures where low mass and corrosion resistance are important."
        ]},
        {"title":"Tensile strength and elasticity","paragraphs":[
          "Tensile strength is the ability of a material to resist being pulled apart.",
          "Elasticity is the ability to return toward the original shape after a deforming force is removed.",
          "Carbon-fibre composites combine high tensile strength and stiffness with low mass, while nylon and gut can provide elastic racket strings."
        ]},
        {"title":"Ceramics and wood","paragraphs":[
          "Ceramic tiles are hard, durable and easy to clean, making them suitable for kitchen floors.",
          "Willow is used for cricket bats because it is relatively light, strong and able to absorb impact."
        ]},
        {"title":"Synthetic fibres","paragraphs":[
          "Nylon is strong and resists rotting in water.",
          "These properties make it suitable for fishing nets, ropes and some sporting applications."
        ]},
        {"title":"Copper pipes","paragraphs":[
          "Copper can be bent and shaped and has good resistance to corrosion in many water-supply conditions.",
          "These properties make it useful for plumbing."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-1-material-properties","type":"material-properties","title":"Material properties and uses explorer"}],
      "keyPoints":[
        "Copper conducts electricity and is ductile.",
        "Metals generally conduct heat well.",
        "Wood and plastic are poor heat conductors.",
        "Ductility means drawing into wires.",
        "Malleability means shaping into sheets.",
        "Elasticity means returning toward the original shape.",
        "Tensile strength is resistance to being pulled apart.",
        "Aluminium is useful where low density and corrosion resistance matter.",
        "Ceramics are hard and durable.",
        "Nylon is strong and resists rotting in water."
      ],
      "workedExample":{
        "title":"Choosing a frying-pan handle",
        "prompt":"Which is more suitable for the handle of a frying pan: copper or heat-resistant plastic?",
        "steps":[
          "The pan body becomes hot during cooking.",
          "A handle should reduce heat transfer to the hand.",
          "Copper is a good conductor of heat.",
          "Heat-resistant plastic is a poor conductor."
        ],
        "answer":"Heat-resistant plastic is more suitable because it reduces heat transfer to the hand."
      },
      "checks":[
        {"prompt":"Why is copper used for electrical wiring?","answer":"It is a good electrical conductor and is ductile.","explanation":"It carries current well and can be drawn into wires."},
        {"prompt":"What is malleability?","answer":"The ability to be hammered or rolled into sheets.","explanation":"It differs from ductility, which is drawing into wires."},
        {"prompt":"Why is aluminium useful for aircraft bodies?","answer":"It has low density and good corrosion resistance.","explanation":"Its oxide layer helps protect it from further corrosion."},
        {"prompt":"Why are ceramic tiles suitable for kitchen floors?","answer":"They are hard, durable and easy to clean.","explanation":"Glazed ceramics also resist water penetration."},
        {"prompt":"What does tensile strength describe?","answer":"A material''s ability to resist being pulled apart.","explanation":"Materials such as steel cables and carbon-fibre composites can have high tensile strength."}
      ],
      "summary":"Choose materials by matching measurable properties to the demands of the job rather than by material name alone."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":81,"objectivesBuilt":81}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
