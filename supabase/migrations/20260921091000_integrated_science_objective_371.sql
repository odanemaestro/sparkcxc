begin;

-- CSEC Integrated Science objective 3.7.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t7-1-air-pollution',
  'module-3-environment',
  '3.7.1 Effects of Air Pollution',
  'Discuss major air pollutants, their sources, health effects, effects on plants and materials, acid deposition and ways to reduce pollution.',
  940,
  true,
  '{
    "syllabus":{"module":3,"topic":"Environmental Health and Pollution","objective":"3.7.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Identify common gaseous and particulate air pollutants.",
        "Explain how sulfur dioxide and nitrogen oxides contribute to acid deposition.",
        "Explain how dust can reduce plant growth.",
        "Discuss respiratory effects of smoke, dust and other pollutants.",
        "Explain why carbon monoxide is poisonous.",
        "Discuss the effects of pollen and dust on allergies.",
        "Explain why open garbage burning is harmful.",
        "Relate increased atmospheric carbon dioxide to global warming.",
        "Suggest practical ways to reduce air pollution."
      ],
      "introduction":"Air pollution occurs when gases or particles are present in the atmosphere at concentrations that harm health, ecosystems, materials or quality of life. Sources include vehicles, industry, open burning, dust-generating activities and combustion.",
      "sections":[
        {"title":"Common air pollutants","paragraphs":[
          "Important air pollutants include smoke and fine particles, carbon monoxide, sulfur dioxide, nitrogen oxides and excessive dust.",
          "Pollen is a natural airborne particle rather than a human-made pollutant, but it can still trigger allergies and asthma in sensitive people."
        ]},
        {"title":"Acid deposition","paragraphs":[
          "Sulfur dioxide and nitrogen oxides can undergo atmospheric reactions that form acidic compounds.",
          "These acids can return to the surface in rain, fog or dry deposition.",
          "Carbon monoxide is poisonous but is not a principal acid-rain gas."
        ]},
        {"title":"Effects of acid deposition","paragraphs":[
          "Acidification can leach useful mineral ions from soils and change nutrient availability.",
          "Acidic deposition can damage leaves and stress vegetation.",
          "Acids also react with calcium carbonate in limestone buildings and monuments."
        ]},
        {"title":"Quarry and construction dust","paragraphs":[
          "Dust settling on leaves can reduce the amount of light reaching photosynthetic tissue.",
          "Heavy deposits can also interfere with stomata and gas exchange.",
          "These effects can reduce photosynthesis and plant growth near major dust sources."
        ]},
        {"title":"Asthma, allergies and breathing problems","paragraphs":[
          "Smoke, particulate matter, sulfur dioxide, nitrogen dioxide and other irritants can worsen asthma and respiratory symptoms.",
          "Pollen and dust can trigger allergic reactions such as hay fever and asthma in sensitive people."
        ]},
        {"title":"Carbon monoxide","paragraphs":[
          "Carbon monoxide is produced by incomplete combustion.",
          "It binds strongly to haemoglobin and reduces the blood''s ability to transport oxygen.",
          "It is especially dangerous in enclosed or poorly ventilated spaces where fuel is burning."
        ]},
        {"title":"Open burning","paragraphs":[
          "Open burning of garbage releases smoke, fine particles, carbon monoxide and other harmful gases and vapours.",
          "The exact toxic products depend on the materials being burned and the burning conditions.",
          "Mixed waste containing plastics or treated materials can produce additional hazardous organic compounds, so uncontrolled garbage burning should be avoided."
        ]},
        {"title":"Carbon dioxide and climate","paragraphs":[
          "Carbon dioxide is a greenhouse gas.",
          "Increasing atmospheric carbon dioxide strengthens the greenhouse effect and contributes to global warming and climate change."
        ]},
        {"title":"Reducing air pollution","paragraphs":[
          "Reducing unnecessary vehicle use, improving public transport and maintaining engines can reduce exhaust emissions.",
          "Proper waste collection prevents neighbourhood exposure from garbage burning.",
          "Industrial emission controls, cleaner fuels and monitoring reduce pollutants at source.",
          "Trees and green spaces can capture some particles and provide local benefits, but they do not replace emission reduction."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t7-1-air-pollution","type":"air-pollution","title":"Air pollutant sources and effects explorer"}],
      "keyPoints":[
        "Sulfur dioxide and nitrogen oxides contribute to acid rain.",
        "Carbon monoxide is poisonous but is not a principal acid-rain gas.",
        "Dust can block light and interfere with stomata.",
        "Air pollution can worsen asthma and respiratory disease.",
        "Pollen and dust can trigger allergies.",
        "Open waste burning produces harmful smoke and gases.",
        "Carbon dioxide contributes to global warming.",
        "Reducing emissions at source is more effective than relying only on vegetation."
      ],
      "workedExample":{
        "title":"Dust near a quarry",
        "prompt":"Plants near a quarry show reduced growth and their leaves are covered in dust. Explain one way the dust can reduce photosynthesis.",
        "steps":[
          "Dust settles on the leaf surface.",
          "The dust can block some incoming light.",
          "Less light reaches chlorophyll-containing cells.",
          "The rate of photosynthesis can therefore decrease."
        ],
        "answer":"The dust blocks light reaching the leaf and can also interfere with stomata, reducing photosynthesis."
      },
      "checks":[
        {"prompt":"Which two common gases contribute to acid rain?","answer":"Sulfur dioxide and nitrogen oxides.","explanation":"They form acidic compounds in the atmosphere."},
        {"prompt":"Why can quarry dust reduce plant growth?","answer":"It can reduce light reaching leaves and interfere with stomata.","explanation":"Both effects can reduce photosynthesis."},
        {"prompt":"Why is carbon monoxide dangerous?","answer":"It binds strongly to haemoglobin and reduces oxygen transport.","explanation":"This can deprive tissues of oxygen."},
        {"prompt":"Why is open garbage burning harmful?","answer":"It releases smoke, particles and harmful gases or vapours.","explanation":"The exact pollutants depend on the material and burning conditions."},
        {"prompt":"Give one way a city can reduce air pollution.","answer":"Examples include better public transport, reduced open burning, cleaner fuels or industrial emission controls.","explanation":"These actions reduce pollutants at their sources."}
      ],
      "summary":"Air pollution affects lungs, plants, soils, buildings and climate. Identify the pollutant, its source and its specific effect rather than treating all pollution as the same."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":94,"objectivesBuilt":94}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
