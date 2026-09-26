begin;

-- CSEC Integrated Science objective 3.1.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t1-3-solar-system',
  'module-3-environment',
  '3.1.3 The Solar System',
  'Describe the eight planets of the Solar System, their order, broad groups, orbital paths and key distinguishing features.',
  680,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Universe and Our Solar System","objective":"3.1.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "State that the Solar System has eight major planets.",
        "List the planets in order from the Sun.",
        "Identify Mercury as the closest planet and Earth as the third.",
        "Identify Jupiter as the largest planet.",
        "Explain why Mars is called the Red Planet.",
        "Identify Saturn by its prominent rings.",
        "State that Mercury and Venus have no moons.",
        "Distinguish inner rocky planets, gas giants and ice giants.",
        "State that planetary orbits are elliptical."
      ],
      "introduction":"The Solar System consists of the Sun and all the bodies held in orbit by its gravity. The eight major planets can be identified by their order, composition and key physical features.",
      "sections":[
        {"title":"The eight planets","paragraphs":[
          "Starting from the Sun, the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.",
          "Mercury is closest to the Sun. Earth is the third planet."
        ]},
        {"title":"Inner rocky planets","paragraphs":[
          "Mercury, Venus, Earth and Mars are the four inner rocky planets.",
          "They are relatively small and dense and have solid rocky surfaces."
        ]},
        {"title":"Jupiter and Saturn","paragraphs":[
          "Jupiter is the largest planet in the Solar System.",
          "Jupiter and Saturn are gas giants composed mainly of hydrogen and helium.",
          "Saturn is especially well known for its broad visible system of rings made mainly of ice and rock particles."
        ]},
        {"title":"Uranus and Neptune","paragraphs":[
          "Uranus and Neptune are usually classified as ice giants.",
          "They contain hydrogen and helium but have a larger proportion of water-, ammonia- and methane-rich material than Jupiter and Saturn."
        ]},
        {"title":"Mars, the Red Planet","paragraphs":[
          "Mars appears reddish because iron-bearing minerals in its surface material have oxidised.",
          "This iron oxide gives the planet its familiar red colour."
        ]},
        {"title":"Moons","paragraphs":[
          "Mercury and Venus are the only two major planets with no natural satellites.",
          "Earth has one Moon, while the outer giant planets have many moons."
        ]},
        {"title":"Planetary orbits","paragraphs":[
          "All eight planets orbit the Sun in elliptical paths.",
          "Mercury has the shortest orbital period because it is closest to the Sun and travels a shorter orbit at a higher orbital speed."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t1-3-solar-system","type":"solar-system","title":"Solar System order and planet features explorer"}],
      "keyPoints":[
        "There are eight major planets.",
        "Order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
        "Earth is the third planet from the Sun.",
        "Jupiter is the largest planet.",
        "Mars is red because of iron oxide.",
        "Saturn has the most visually prominent ring system.",
        "Mercury and Venus have no moons.",
        "Planetary orbits are elliptical."
      ],
      "workedExample":{
        "title":"Identify a planet from clues",
        "prompt":"A planet is the fifth from the Sun and is the largest planet in the Solar System. Identify it.",
        "steps":[
          "Count outward from the Sun: Mercury, Venus, Earth, Mars, Jupiter.",
          "The fifth planet is Jupiter.",
          "Jupiter is also the largest planet."
        ],
        "answer":"Jupiter."
      },
      "checks":[
        {"prompt":"How many major planets are in the Solar System?","answer":"Eight.","explanation":"Pluto is classified as a dwarf planet."},
        {"prompt":"Which planet is closest to the Sun?","answer":"Mercury.","explanation":"It is the innermost planet."},
        {"prompt":"Which planet is the largest?","answer":"Jupiter.","explanation":"It is the largest planet by both mass and diameter."},
        {"prompt":"Why is Mars called the Red Planet?","answer":"Iron oxides in its surface material give it a reddish colour.","explanation":"The oxidised iron produces the red appearance."},
        {"prompt":"Which two planets have no moons?","answer":"Mercury and Venus.","explanation":"All the other major planets have at least one natural satellite."}
      ],
      "summary":"Know the eight planets in order and connect each major planet group with its defining features."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":68,"objectivesBuilt":68}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
