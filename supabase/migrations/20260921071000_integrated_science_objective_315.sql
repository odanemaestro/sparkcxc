begin;

-- CSEC Integrated Science objective 3.1.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t1-5-space-exploration',
  'module-3-environment',
  '3.1.5 Human Exploration of the Universe',
  'Discuss human space exploration, spacecraft types, space telescopes, the International Space Station, astronaut safety and benefits of space technology.',
  700,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Universe and Our Solar System","objective":"3.1.5","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Compare flybys, orbiters, landers and rovers.",
        "Describe the International Space Station as an orbiting research laboratory.",
        "Explain why astronauts appear weightless in orbit.",
        "Explain why long-duration microgravity affects muscles and bones.",
        "Explain why astronauts need pressurised space suits.",
        "Compare Hubble and James Webb as space observatories.",
        "Explain why telescopes are placed above Earth''s atmosphere.",
        "Identify benefits of space exploration to people on Earth.",
        "Explain why Mars is an important target for exploration."
      ],
      "introduction":"Humans explore space using robotic spacecraft, orbiting observatories and crewed laboratories. Each mission design is chosen according to the target, the measurements needed and the risks of operating beyond Earth.",
      "sections":[
        {"title":"Spacecraft mission types","paragraphs":[
          "A flyby passes close to a target without entering orbit or landing.",
          "An orbiter enters orbit and can observe a world repeatedly over a long period.",
          "A lander touches down and studies one location. A rover lands and then drives across the surface, allowing observations at several sites."
        ]},
        {"title":"The International Space Station","paragraphs":[
          "The International Space Station is a crewed research laboratory in low Earth orbit.",
          "Its altitude varies with time and is typically about 370 to 460 km above Earth.",
          "Astronauts live and work aboard the station while conducting experiments in microgravity."
        ]},
        {"title":"Why astronauts float","paragraphs":[
          "Gravity is still strong at the altitude of the International Space Station.",
          "Astronauts appear to float because the station, the crew and objects inside it are all in continuous free fall around Earth.",
          "This orbital free-fall condition produces microgravity."
        ]},
        {"title":"Effects of microgravity","paragraphs":[
          "In microgravity, muscles do less work against body weight and can lose mass and strength.",
          "Weight-bearing bones also lose density if countermeasures are not used.",
          "Astronauts therefore perform regular resistance and aerobic exercise during long missions."
        ]},
        {"title":"Space suits","paragraphs":[
          "Space is almost a vacuum and has no breathable atmosphere.",
          "A space suit provides pressure and oxygen, removes carbon dioxide and helps control temperature.",
          "Suit layers also provide limited protection against radiation and tiny high-speed particles."
        ]},
        {"title":"Hubble Space Telescope","paragraphs":[
          "Hubble orbits above Earth''s atmosphere.",
          "The atmosphere distorts incoming light and blocks some wavelengths. Hubble therefore obtains sharper images than comparable ground observations and can study wavelengths including ultraviolet that are difficult to observe from the ground."
        ]},
        {"title":"James Webb Space Telescope","paragraphs":[
          "The James Webb Space Telescope is designed mainly for infrared astronomy.",
          "Infrared observations allow astronomers to study very distant galaxies, cool objects and regions hidden behind some dust clouds.",
          "Infrared light can pass through some dust more effectively than visible light."
        ]},
        {"title":"Benefits on Earth","paragraphs":[
          "Space systems support weather forecasting, hurricane tracking, communications, navigation and Earth observation.",
          "Space missions also drive development in sensors, robotics, materials and remote operations."
        ]},
        {"title":"Why explore Mars?","paragraphs":[
          "Mars preserves evidence that liquid water existed on its surface in the past.",
          "Rovers and orbiters investigate its geology, climate and whether environments may once have been suitable for life.",
          "The search for signs of past or present life is one important reason Mars remains a major exploration target."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t1-5-space-exploration","type":"space-exploration","title":"Space missions, observatories and human spaceflight explorer"}],
      "keyPoints":[
        "A rover moves across a planetary surface after landing.",
        "A flyby passes a target without entering orbit.",
        "An orbiter studies a target repeatedly from orbit.",
        "The ISS is an orbiting research laboratory.",
        "Astronauts float because they and the spacecraft are in orbital free fall.",
        "Microgravity can weaken muscles and bones.",
        "Space suits provide pressure, oxygen and environmental protection.",
        "Hubble avoids atmospheric blurring.",
        "Webb studies the universe mainly in infrared light.",
        "Weather satellites help track hurricanes."
      ],
      "workedExample":{
        "title":"Choosing a Mars mission",
        "prompt":"Scientists want to drive between several rock outcrops on Mars, take images and analyse samples. Which spacecraft type is most suitable?",
        "steps":[
          "A flyby cannot remain at Mars long enough for surface work.",
          "An orbiter does not operate directly on the surface.",
          "A fixed lander studies only one landing area.",
          "A rover can travel between several surface sites and carry scientific instruments."
        ],
        "answer":"A rover."
      },
      "checks":[
        {"prompt":"Why do astronauts appear to float on the ISS?","answer":"The astronauts and station are falling freely around Earth together.","explanation":"Microgravity is an orbital free-fall condition, not the absence of gravity."},
        {"prompt":"Why are space suits pressurised?","answer":"Space is almost a vacuum and the body needs external pressure and breathable oxygen.","explanation":"Without suitable pressure, normal breathing and body-fluid behaviour cannot be maintained."},
        {"prompt":"Why can Hubble produce clearer astronomical observations than many ground telescopes?","answer":"It operates above the atmosphere, avoiding atmospheric blurring and gaining access to some blocked wavelengths.","explanation":"Earth''s atmosphere distorts incoming light and absorbs parts of the spectrum."},
        {"prompt":"Why is Webb useful for observing dusty regions?","answer":"Its infrared instruments can detect radiation that passes through some dust more effectively than visible light.","explanation":"Infrared astronomy reveals objects hidden at visible wavelengths."},
        {"prompt":"Give one benefit of space exploration to people on Earth.","answer":"Examples include hurricane tracking, weather forecasting, communications, navigation or Earth observation.","explanation":"Satellites provide practical services as well as scientific information."}
      ],
      "summary":"Space exploration combines different spacecraft, observatories and human systems to study the universe and provide practical services on Earth."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":70,"objectivesBuilt":70}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
