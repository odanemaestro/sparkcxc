begin;

-- Create Module 3 before inserting its topics.
insert into public.spark_subject_sections(
  subject_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'module-3-environment',
  'Module 3: Our Planet',
  'Study the universe and Solar System, Caribbean weather and terrestrial processes, water and aquatic environments, forces, materials, household chemicals, pollution and environmental responsibility.',
  30,
  true,
  '{"module":3,"skills":["Knowledge and Comprehension","Use of Knowledge","Experimental Skills"]}'::jsonb
)
on conflict (subject_id,section_id) do update set
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

-- CSEC Integrated Science objective 3.1.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t1-1-universe-components',
  'module-3-environment',
  '3.1.1 Components of the Universe',
  'Identify major components of the universe and distinguish galaxies, stars, planets, dwarf planets, asteroids, comets, meteors and meteorites.',
  660,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Universe and Our Solar System","objective":"3.1.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Identify galaxies, stars, planets, dwarf planets, asteroids and comets.",
        "Distinguish a meteor from a meteorite.",
        "Identify the Milky Way as the galaxy containing the Solar System.",
        "Identify the Sun as the nearest star to Earth.",
        "Explain why comet tails point away from the Sun.",
        "Order common astronomical structures by increasing size.",
        "State that a light-year is a unit of distance."
      ],
      "introduction":"The universe contains an enormous range of structures, from small rocky bodies to galaxies containing huge numbers of stars. Correct terminology is important because several astronomical words refer to different objects or events.",
      "sections":[
        {"title":"Universe and galaxies","paragraphs":[
          "The universe includes all galaxies, stars, planets, matter and energy.",
          "A galaxy is a very large collection of stars, gas, dust and dark matter held together by gravity.",
          "The Milky Way is the spiral galaxy that contains our Solar System."
        ]},
        {"title":"Stars and planets","paragraphs":[
          "A star is a hot, self-luminous body that releases energy through nuclear fusion. The Sun is the nearest star to Earth.",
          "A planet orbits a star and does not produce its own visible light."
        ]},
        {"title":"Dwarf planets and Pluto","paragraphs":[
          "A dwarf planet orbits the Sun and is nearly round but has not cleared the region around its orbit.",
          "Pluto was reclassified as a dwarf planet in 2006."
        ]},
        {"title":"Asteroids","paragraphs":[
          "Asteroids are small rocky or metallic bodies that orbit the Sun.",
          "Many asteroids are found in the asteroid belt between Mars and Jupiter."
        ]},
        {"title":"Comets","paragraphs":[
          "Comets are made mainly of ice, dust and rock.",
          "Near the Sun, heating releases gas and dust, forming a coma and tails.",
          "Solar radiation pressure and the solar wind push the tails away from the Sun, so the tails do not simply trail behind the comet''s direction of motion."
        ]},
        {"title":"Meteoroids, meteors and meteorites","paragraphs":[
          "A meteoroid is a small natural body moving through space.",
          "A meteor is the streak of light seen when a meteoroid heats intensely while passing through the atmosphere.",
          "A meteorite is a piece that survives the atmospheric passage and reaches the ground."
        ]},
        {"title":"Scale in the universe","paragraphs":[
          "A simple increasing-size sequence is planet → star → galaxy → universe.",
          "For familiar objects, Moon < Earth < Sun < galaxy."
        ]},
        {"title":"Light-years","paragraphs":[
          "A light-year is a unit of distance, not time.",
          "It is the distance light travels in one year and is useful for expressing very large astronomical distances."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t1-1-universe-components","type":"universe-components","title":"Universe scale and astronomical-object explorer"}],
      "keyPoints":[
        "The Solar System is in the Milky Way galaxy.",
        "The Sun is the nearest star to Earth.",
        "Asteroids are concentrated mainly between Mars and Jupiter.",
        "Comets are rich in ice and dust.",
        "Comet tails point away from the Sun.",
        "A meteor is a streak of light in the atmosphere.",
        "A meteorite reaches Earth's surface.",
        "Pluto is a dwarf planet.",
        "A light-year measures distance."
      ],
      "workedExample":{
        "title":"Distinguishing meteor and meteorite",
        "prompt":"A small rocky body enters Earth's atmosphere, produces a bright streak and part of it lands on the ground. Name the bright streak and the landed fragment.",
        "steps":[
          "The atmospheric streak of light is called a meteor.",
          "The surviving fragment that reaches the surface is called a meteorite."
        ],
        "answer":"The streak is a meteor and the landed fragment is a meteorite."
      },
      "checks":[
        {"prompt":"Which galaxy contains the Solar System?","answer":"The Milky Way.","explanation":"It is a spiral galaxy."},
        {"prompt":"What is the nearest star to Earth?","answer":"The Sun.","explanation":"It is about 150 million km from Earth."},
        {"prompt":"What is the difference between a meteor and a meteorite?","answer":"A meteor is the atmospheric streak of light; a meteorite is material that reaches the ground.","explanation":"They describe different stages of the same incoming body."},
        {"prompt":"Why does a comet tail point away from the Sun?","answer":"Solar radiation pressure and the solar wind push gas and dust away from the Sun.","explanation":"The tail direction is controlled by the Sun, not simply by the comet's motion."},
        {"prompt":"What does a light-year measure?","answer":"Distance.","explanation":"It is the distance light travels in one year."}
      ],
      "summary":"Classify astronomical objects carefully and place the Solar System inside the Milky Way and the Milky Way inside the larger universe."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":66,"objectivesBuilt":66}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
