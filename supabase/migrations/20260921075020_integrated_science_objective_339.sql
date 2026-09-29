begin;

-- CSEC Integrated Science objective 3.3.9
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-9-water-safety',
  'module-3-environment',
  '3.3.9 Water Safety Devices',
  'Explain how life jackets, ring buoys, life rafts, signalling devices and beach warnings improve flotation, survival and rescue.',
  776,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.9","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain how life jackets increase flotation.",
        "Explain why life jackets use bright colours and reflective features.",
        "Describe the purpose of a ring buoy.",
        "Explain the role of a life raft.",
        "Identify life jackets, flares and a two-way radio as important vessel safety equipment.",
        "Explain the purpose of distress flares.",
        "Relate beach flags and official warnings to swimmer safety.",
        "Explain how low-density materials and trapped air increase buoyancy."
      ],
      "introduction":"Water-safety devices improve survival by keeping people afloat, making them easier to see and helping them communicate distress. Equipment must be suitable, serviceable and used correctly.",
      "sections":[
        {"title":"Life jackets","paragraphs":[
          "A life jacket contains buoyant foam or trapped air that adds volume with little mass.",
          "This lowers the average density of the person and flotation device together and helps the body displace enough water for upthrust to support it.",
          "Correct fit and condition are important."
        ]},
        {"title":"Visibility","paragraphs":[
          "Life jackets are commonly made in bright colours such as orange or yellow so rescuers can see wearers more easily.",
          "Reflective patches, lights and whistles can further improve detection and signalling."
        ]},
        {"title":"Ring buoys","paragraphs":[
          "A ring buoy is a buoyant ring that can be thrown to a person in the water.",
          "It helps the person stay afloat and may be attached to a line so rescuers can pull the person toward safety."
        ]},
        {"title":"Life rafts","paragraphs":[
          "A life raft is an inflatable survival craft used when a vessel must be abandoned.",
          "It keeps people together and out of the water and may provide shelter and emergency equipment."
        ]},
        {"title":"Safety equipment on small boats","paragraphs":[
          "Small fishing boats should carry appropriate flotation, signalling and communication equipment.",
          "The CSEC bank identifies life jackets, flares and a two-way radio as key examples."
        ]},
        {"title":"Flares","paragraphs":[
          "A distress flare produces a bright emergency signal that can attract rescuers from a distance.",
          "Flares should be stored, handled and used according to the manufacturer and maritime safety requirements."
        ]},
        {"title":"Beach warning flags","paragraphs":[
          "In the CSEC bank, a red beach flag represents dangerous conditions and indicates that swimming should not take place.",
          "In practice, beach-flag systems can vary, so swimmers should always follow the posted local meanings, lifeguards and official instructions."
        ]},
        {"title":"Children and flotation aids","paragraphs":[
          "Inflatable arm bands can add buoyancy for a child in supervised shallow water.",
          "They do not replace close adult supervision or an approved life jacket when one is required."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-9-water-safety","type":"water-safety","title":"Water-safety devices and buoyancy explorer"}],
      "keyPoints":[
        "Life jackets increase flotation using low-density material or trapped air.",
        "Bright colours help rescuers see the wearer.",
        "Ring buoys provide emergency flotation.",
        "Life rafts support survival after abandoning a vessel.",
        "Flares attract attention in distress.",
        "Two-way radios allow emergency communication.",
        "Beach warning flags should be obeyed.",
        "Flotation aids do not replace supervision."
      ],
      "workedExample":{
        "title":"Why a life jacket helps",
        "prompt":"Explain why a foam life jacket helps a person float.",
        "steps":[
          "Foam has low density and adds volume without adding much mass.",
          "The combined person and jacket have a lower average density.",
          "More water can be displaced while the person''s head remains higher.",
          "The resulting upthrust helps support the person."
        ],
        "answer":"The low-density jacket increases buoyant volume and helps enough water be displaced to support the person."
      },
      "checks":[
        {"prompt":"Why are life jackets brightly coloured?","answer":"So rescuers can see the wearer more easily.","explanation":"Visibility improves the chance of rescue."},
        {"prompt":"What is the purpose of a ring buoy?","answer":"To provide flotation to a person in the water.","explanation":"It can be thrown from a vessel or shore."},
        {"prompt":"Why is a two-way radio useful on a fishing boat?","answer":"It allows the crew to call for assistance and communicate during an emergency.","explanation":"Communication is essential when help is needed."},
        {"prompt":"What should swimmers do when a beach warning indicates dangerous conditions?","answer":"Stay out of the water and follow local lifeguard or official instructions.","explanation":"Local warning systems should always be obeyed."}
      ],
      "summary":"Water safety combines buoyancy, visibility, signalling and communication. Equipment is most effective when it is correctly chosen and used before an emergency becomes critical."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
