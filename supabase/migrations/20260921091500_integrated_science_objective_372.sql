begin;

-- CSEC Integrated Science objective 3.7.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t7-2-community-hygiene',
  'module-3-environment',
  '3.7.2 Community Hygiene',
  'Explain how waste management, sanitation, sewage treatment and community practices affect health, water quality, pests and the environment.',
  950,
  true,
  '{
    "syllabus":{"module":3,"topic":"Pollutants","objective":"3.7.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Distinguish biodegradable, electronic and medical or biological waste.",
        "Explain how improperly stored garbage encourages rats, flies and mosquitoes.",
        "Explain how landfill leachate can contaminate groundwater.",
        "Explain the purpose of septic systems and sewage treatment plants.",
        "Relate poor sanitation to typhoid, gastroenteritis and hookworm.",
        "Explain the benefits of composting organic waste.",
        "Explain how biogas can be produced from organic waste.",
        "Define repurposing and relate it to waste reduction.",
        "Apply reduce, reuse and recycle principles.",
        "Explain aesthetic and social benefits of clean communities."
      ],
      "introduction":"Community hygiene includes the safe handling of waste, sewage and water sources. Good hygiene reduces disease transmission, controls pests, protects groundwater and creates cleaner, more pleasant places to live.",
      "sections":[
        {"title":"Biodegradable waste","paragraphs":[
          "Biodegradable waste can be broken down by microorganisms.",
          "Food scraps, paper and grass cuttings are common examples.",
          "Many biodegradable household and garden materials can be composted instead of being sent to landfill."
        ]},
        {"title":"Electronic waste","paragraphs":[
          "Electronic waste, or e-waste, includes discarded phones, computers, batteries and other electronic devices.",
          "E-waste should be collected separately where appropriate because it can contain recoverable materials as well as substances that should not enter ordinary dumps or open fires."
        ]},
        {"title":"Medical and biological waste","paragraphs":[
          "Used syringes, contaminated bandages and some laboratory wastes may contain pathogens or sharp objects.",
          "These wastes require controlled handling, collection and treatment to protect workers and the public."
        ]},
        {"title":"Garbage and pests","paragraphs":[
          "Improperly stored garbage provides food and shelter for rats and flies.",
          "Discarded containers can collect rainwater and create mosquito breeding sites.",
          "Litter can also block drains, increasing stagnant water and local flooding."
        ]},
        {"title":"Landfill leachate","paragraphs":[
          "Rainwater moving through waste can dissolve chemicals and form a contaminated liquid called leachate.",
          "If landfill containment is inadequate, leachate can move through soil and contaminate groundwater used for drinking."
        ]},
        {"title":"Septic tanks","paragraphs":[
          "A septic system treats sewage from homes that are not connected to a sewer network.",
          "Solids settle in the tank and microorganisms break down part of the waste.",
          "The system must be correctly sited, maintained and kept an appropriate distance from wells and other water sources."
        ]},
        {"title":"Sewage treatment plants","paragraphs":[
          "Treatment plants remove solids, reduce biodegradable organic matter and pathogens, and may also reduce nutrients before water is released.",
          "Treated effluent is safer for people and aquatic ecosystems than untreated raw sewage."
        ]},
        {"title":"Poor sanitation and disease","paragraphs":[
          "Pit latrines, septic systems or sewage placed too close to wells can allow faecal contamination of groundwater.",
          "Contaminated water can spread typhoid and gastroenteritis.",
          "Hookworm larvae can infect people through bare skin when they walk on soil contaminated with infected faeces."
        ]},
        {"title":"Composting","paragraphs":[
          "Composting uses decomposers to break down suitable kitchen and garden waste in the presence of oxygen.",
          "The resulting humus-rich compost can improve soil while reducing the amount of organic waste sent for disposal."
        ]},
        {"title":"Biogas","paragraphs":[
          "Animal manure and food waste can be broken down by microorganisms under anaerobic conditions.",
          "This process can produce methane-rich biogas that can be collected and used as a fuel."
        ]},
        {"title":"Repurposing and the waste hierarchy","paragraphs":[
          "Repurposing means using an item for a different useful purpose instead of discarding it.",
          "Reducing waste at the source is usually preferable to managing it after it has been created.",
          "Reuse, repair, repurposing and recycling can further reduce the amount of garbage sent to landfill."
        ]},
        {"title":"Aesthetic benefits","paragraphs":[
          "Clean surroundings have fewer bad odours, less litter and fewer visible pests.",
          "Well-maintained communities are more pleasant for residents and visitors and can support tourism and local business."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t7-2-community-hygiene","type":"community-hygiene","title":"Community hygiene, waste and sanitation explorer"}],
      "keyPoints":[
        "Biodegradable waste can be broken down by microorganisms.",
        "Old phones and computers are e-waste.",
        "Medical waste may contain pathogens or sharps.",
        "Open garbage encourages rats, flies and mosquitoes.",
        "Landfill leachate can pollute groundwater.",
        "Septic tanks treat household sewage where no sewer connection exists.",
        "Sewage treatment reduces pathogens and organic pollution before discharge.",
        "Composting converts suitable organic waste into useful soil material.",
        "Biogas can be produced from manure and food waste.",
        "Repurposing uses an item for a different useful purpose.",
        "Clean communities provide health and aesthetic benefits."
      ],
      "workedExample":{
        "title":"Choosing a better waste option",
        "prompt":"A household produces vegetable peelings and dry leaves. Instead of sending them to landfill, what suitable treatment could be used and why?",
        "steps":[
          "Vegetable peelings and dry leaves are biodegradable organic materials.",
          "Microorganisms can break them down.",
          "They are suitable for composting when managed properly.",
          "Composting reduces waste and produces useful organic soil material."
        ],
        "answer":"Compost the waste because it is biodegradable and can be converted into useful soil material."
      },
      "checks":[
        {"prompt":"What is biodegradable waste?","answer":"Waste that microorganisms can break down.","explanation":"Food scraps and many plant materials are biodegradable."},
        {"prompt":"Why is e-waste collected separately?","answer":"It contains electronic components and may contain hazardous or recoverable materials.","explanation":"It should not simply be dumped or openly burned with ordinary household waste."},
        {"prompt":"How can a landfill pollute groundwater?","answer":"Leachate can seep through soil into groundwater.","explanation":"Leachate forms when water passes through waste and dissolves contaminants."},
        {"prompt":"What is the purpose of a septic tank?","answer":"To treat sewage from homes not connected to a sewer system.","explanation":"Solids settle and microorganisms break down part of the waste."},
        {"prompt":"How can poor sanitation spread hookworm?","answer":"People can be infected through bare skin contacting faecally contaminated soil.","explanation":"Hookworm larvae can penetrate the skin."}
      ],
      "summary":"Community hygiene depends on safe waste handling, protected water supplies and effective sewage treatment. Reducing waste and maintaining sanitation protect health and the environment."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":95,"objectivesBuilt":95}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
