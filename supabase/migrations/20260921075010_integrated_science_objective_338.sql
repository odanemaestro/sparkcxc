begin;

-- CSEC Integrated Science objective 3.3.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-8-navigation-at-sea',
  'module-3-environment',
  '3.3.8 Navigation at Sea',
  'Explain how GPS, radar, sonar, magnetic compasses, sextants and lighthouses support navigation and safety at sea.',
  775,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.8","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain how GPS determines a vessel''s position using satellite signals.",
        "Explain how radar uses reflected radio waves.",
        "Explain how sonar uses sound echoes to measure depth and locate fish.",
        "Use echo time to calculate water depth.",
        "Explain how a magnetic compass aligns with Earth''s magnetic field.",
        "Explain the use of a sextant in celestial navigation.",
        "Explain the role of lighthouses in coastal navigation.",
        "Identify basic safety equipment carried on small vessels."
      ],
      "introduction":"Safe navigation at sea uses several different physical principles. GPS provides position, radar detects objects, sonar examines the underwater environment, and compasses and visual aids provide direction and reference.",
      "sections":[
        {"title":"Global Positioning System","paragraphs":[
          "A GPS receiver determines position from radio signals transmitted by satellites.",
          "Fishermen can use GPS to return to known fishing grounds, reefs, channels or harbour entrances."
        ]},
        {"title":"Radar","paragraphs":[
          "Radar transmits radio waves and detects echoes reflected from other vessels, land and some hazards.",
          "It is useful when visual conditions are poor, including darkness, rain or fog."
        ]},
        {"title":"Sonar","paragraphs":[
          "Sonar sends sound pulses through water and measures returning echoes.",
          "It can locate the seabed, underwater objects and schools of fish.",
          "Depth = speed of sound × round-trip time ÷ 2."
        ]},
        {"title":"Sonar calculation","paragraphs":[
          "If a sonar pulse returns after 0.4 s and sound travels through water at 1 500 m/s, the sound travels 1 500 × 0.4 = 600 m in total.",
          "The pulse travels down and back, so the water depth is 600 ÷ 2 = 300 m."
        ]},
        {"title":"Magnetic compass","paragraphs":[
          "A magnetised compass needle aligns approximately with Earth''s magnetic field.",
          "Its north-seeking end points toward magnetic north."
        ]},
        {"title":"Sextant","paragraphs":[
          "A sextant measures the angle between a celestial body such as the Sun or a star and the horizon.",
          "Before modern satellite navigation, such measurements were widely used in celestial navigation."
        ]},
        {"title":"Lighthouses","paragraphs":[
          "Lighthouses provide visible navigation marks, warn of dangerous coastlines or rocks and help mariners identify harbour approaches.",
          "Characteristic light patterns help distinguish one lighthouse from another."
        ]},
        {"title":"Safety equipment","paragraphs":[
          "Navigation must be supported by appropriate safety equipment.",
          "Small fishing vessels commonly carry life jackets, distress-signalling equipment and reliable two-way communication."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-8-navigation-at-sea","type":"marine-navigation","title":"Marine navigation and sonar explorer"}],
      "keyPoints":[
        "GPS uses satellite signals.",
        "Radar uses radio waves.",
        "Sonar uses sound waves and echoes.",
        "A compass aligns with Earth''s magnetic field.",
        "A sextant measures angles to the Sun or stars.",
        "Lighthouses provide visual coastal guidance.",
        "Sonar depth = speed × round-trip time ÷ 2.",
        "A 0.4 s return at 1 500 m/s gives a depth of 300 m."
      ],
      "workedExample":{
        "title":"Calculating depth with sonar",
        "prompt":"A sonar pulse returns from the seabed in 0.4 s. The speed of sound in water is 1 500 m/s. Calculate the depth.",
        "steps":[
          "Total sound distance = speed × time.",
          "Total distance = 1 500 × 0.4 = 600 m.",
          "The pulse travels down and back.",
          "Depth = 600 ÷ 2 = 300 m."
        ],
        "answer":"300 m."
      },
      "checks":[
        {"prompt":"Which device uses satellites to determine position?","answer":"GPS.","explanation":"A receiver calculates its position from satellite signals."},
        {"prompt":"Which device uses radio waves to detect ships and land?","answer":"Radar.","explanation":"Radar detects reflected radio waves."},
        {"prompt":"Which device uses sound echoes underwater?","answer":"Sonar.","explanation":"Sonar is useful for depth finding and locating underwater targets."},
        {"prompt":"Why is sonar distance divided by two when calculating depth?","answer":"The pulse travels from the boat to the seabed and then back again.","explanation":"The measured time covers the round trip."}
      ],
      "summary":"Modern navigation combines satellite, radio, acoustic, magnetic and visual information so mariners can determine position, depth and nearby hazards."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
