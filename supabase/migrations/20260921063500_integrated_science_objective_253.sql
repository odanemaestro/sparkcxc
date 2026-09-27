begin;

-- CSEC Integrated Science objective 2.5.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t5-3-thermometers',
  'module-2-energy',
  '2.5.3 Types of Thermometers',
  'Compare laboratory, clinical and digital thermometers, their ranges, working principles, liquids and safety considerations.',
  630,
  true,
  '{
    "syllabus":{"module":2,"topic":"Temperature Control and Ventilation","objective":"2.5.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define temperature and state its SI unit.",
        "Explain how a liquid-in-glass thermometer works.",
        "Compare laboratory and clinical thermometer ranges.",
        "Explain the purpose of the constriction in a traditional clinical thermometer.",
        "Compare mercury, alcohol and digital thermometers.",
        "Explain why alcohol is suitable for lower temperatures.",
        "Read a thermometer scale correctly."
      ],
      "introduction":"Temperature describes how hot or cold an object is. Thermometers measure temperature by using a property that changes predictably with temperature.",
      "sections":[
        {"title":"Temperature and units","paragraphs":[
          "Temperature is a measure of how hot or cold an object is. It is not the same as total thermal energy.",
          "The SI unit of temperature is the kelvin, K. Degrees Celsius, °C, are widely used in daily and laboratory measurements."
        ]},
        {"title":"Liquid-in-glass thermometers","paragraphs":[
          "A liquid-in-glass thermometer works because the liquid expands when heated and contracts when cooled.",
          "The narrow bore makes a small change in liquid volume produce a visible movement along the scale."
        ]},
        {"title":"Laboratory thermometer","paragraphs":[
          "A laboratory thermometer commonly has a range of about -10 °C to 110 °C.",
          "It has no constriction, so the liquid column changes continuously with temperature and should be read while the bulb is still at the temperature being measured."
        ]},
        {"title":"Clinical thermometer","paragraphs":[
          "A traditional clinical thermometer has a narrow range around human body temperature, about 35 °C to 42 °C.",
          "A constriction near the bulb prevents the mercury column from returning immediately after the thermometer is removed.",
          "The thermometer is shaken before reuse to force the liquid back past the constriction."
        ]},
        {"title":"Mercury and alcohol","paragraphs":[
          "Mercury expands fairly uniformly, is easy to see and does not wet glass, but it is toxic if released.",
          "Alcohol freezes at a much lower temperature, about -115 °C, compared with mercury near -39 °C, so alcohol is better for very low temperatures.",
          "Alcohol is usually coloured to make the liquid column easier to see."
        ]},
        {"title":"Digital thermometers","paragraphs":[
          "Digital thermometers use an electronic sensor and provide a quick, easy-to-read display.",
          "They avoid the toxic mercury hazard of older mercury thermometers, although they require electronic power."
        ]},
        {"title":"Reading a thermometer","paragraphs":[
          "Read the liquid level at eye height to reduce parallax error.",
          "First determine the value of the smallest scale division. Then match the end of the liquid column with the scale.",
          "The bank diagram shows a reading of 37 °C."
        ]}
      ],
      "interactiveModels":[{"id":"m2-t5-3-thermometers","type":"thermometer-types","title":"Thermometer types and reading explorer"}],
      "keyPoints":[
        "Temperature measures hotness, not total thermal energy.",
        "The SI unit is the kelvin.",
        "Liquid-in-glass thermometers use thermal expansion.",
        "Laboratory thermometer range is about -10 °C to 110 °C.",
        "Clinical thermometer range is about 35 °C to 42 °C.",
        "A clinical constriction holds the maximum reading.",
        "Alcohol is suitable for lower temperatures because it freezes at a lower temperature than mercury.",
        "Mercury is toxic.",
        "Digital thermometers are quick and easy to read."
      ],
      "workedExample":{
        "title":"Reading a thermometer scale",
        "prompt":"A thermometer scale is marked every 1 °C. The liquid column ends at the seventh small division above 30 °C. What is the reading?",
        "steps":["Each small division represents 1 °C.","Seven divisions above 30 °C gives 30 + 7.","The reading is 37 °C."],
        "answer":"37 °C."
      },
      "checks":[
        {"prompt":"What is the SI unit of temperature?","answer":"Kelvin, K.","explanation":"Degrees Celsius are commonly used but kelvin is the SI unit."},
        {"prompt":"Why does the liquid rise in a liquid-in-glass thermometer?","answer":"The liquid expands when heated.","explanation":"Expansion pushes the liquid farther along the narrow bore."},
        {"prompt":"What is the approximate range of a clinical thermometer?","answer":"35 °C to 42 °C.","explanation":"It only needs to cover temperatures near normal body temperature."},
        {"prompt":"Why is alcohol useful for very low temperatures?","answer":"It has a much lower freezing point than mercury.","explanation":"Alcohol remains liquid at temperatures where mercury would freeze."},
        {"prompt":"Why is mercury a disadvantage in thermometers?","answer":"It is toxic if released.","explanation":"Broken mercury thermometers create a hazardous spill."}
      ],
      "summary":"Choose a thermometer by range, response, safety and intended use. Understand the scale and working principle before taking a reading."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":63,"objectivesBuilt":63}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
