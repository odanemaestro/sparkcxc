begin;

-- CSEC Integrated Science objective 3.2.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t2-2-caribbean-weather',
  'module-3-environment',
  '3.2.2 Caribbean Weather Patterns',
  'Examine Caribbean wet and dry seasons, tropical-cyclone development, hurricane structure, storm intensity, hazards and preparedness.',
  720,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Terrestrial Environment","objective":"3.2.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Describe the broad Caribbean wet and dry seasons.",
        "State the official Atlantic hurricane season dates.",
        "Distinguish tropical depressions, tropical storms and hurricanes by sustained wind speed.",
        "Explain how hurricanes obtain energy from warm tropical oceans.",
        "Identify the eye and eyewall.",
        "Explain why hurricanes weaken over land.",
        "Define storm surge.",
        "Relate lower central pressure to greater storm intensity in a changing system.",
        "Identify practical hurricane-preparedness measures."
      ],
      "introduction":"Caribbean weather is strongly influenced by warm tropical oceans, trade winds, pressure systems and seasonal changes in rainfall. Tropical cyclones are among the region''s most important weather hazards.",
      "sections":[
        {"title":"Wet and dry seasons","paragraphs":[
          "In much of the Caribbean, the wetter part of the year occurs broadly from June to November, while December to May is generally drier.",
          "The timing and amount of rainfall vary among islands because of latitude, elevation, exposure to trade winds and local weather systems."
        ]},
        {"title":"Atlantic hurricane season","paragraphs":[
          "The official Atlantic hurricane season runs from June 1 to November 30.",
          "Tropical cyclones can occasionally occur outside these dates, but the official season covers the period of highest climatological activity."
        ]},
        {"title":"Tropical-cyclone classification","paragraphs":[
          "A tropical depression has maximum sustained winds below 63 km/h.",
          "A tropical storm has maximum sustained winds from about 63 to 118 km/h.",
          "A hurricane has maximum sustained winds of at least 119 km/h.",
          "The normal development sequence is tropical depression → tropical storm → hurricane as wind speeds increase."
        ]},
        {"title":"How hurricanes are powered","paragraphs":[
          "Warm tropical ocean water supports strong evaporation and supplies moist air.",
          "As moist air rises and condenses, latent heat is released and helps drive deep convection.",
          "A hurricane requires a favourable atmospheric environment as well as warm ocean water."
        ]},
        {"title":"Eye and eyewall","paragraphs":[
          "The eye is the relatively calm central region of a mature hurricane and has very low surface pressure.",
          "The eyewall surrounds the eye and contains the strongest winds and some of the most intense rainfall."
        ]},
        {"title":"Why hurricanes weaken over land","paragraphs":[
          "Over land, the storm loses direct access to the warm ocean source of moisture and heat.",
          "Greater surface friction and interaction with terrain can also disrupt the circulation."
        ]},
        {"title":"Storm surge","paragraphs":[
          "Storm surge is an abnormal rise of sea level caused mainly by strong storm winds pushing water toward the coast, with lower pressure also contributing.",
          "Storm surge can produce severe and life-threatening coastal flooding."
        ]},
        {"title":"Pressure and storm intensity","paragraphs":[
          "Tropical cyclones are low-pressure systems.",
          "When tracking the same storm, a falling central pressure usually indicates strengthening.",
          "In the bank example, a central pressure of 965 mb represents a more intense stage than days with higher central pressure."
        ]},
        {"title":"Hurricane preparation","paragraphs":[
          "Preparation should begin before tropical-storm-force winds arrive.",
          "Families should store safe drinking water, medicines and essential food, secure loose outdoor objects, protect openings, charge communications devices and follow official alerts and evacuation instructions."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t2-2-caribbean-weather","type":"caribbean-weather","title":"Caribbean seasons and tropical-cyclone explorer"}],
      "keyPoints":[
        "The Caribbean is generally wetter from about June to November and drier from December to May.",
        "Atlantic hurricane season runs June 1 to November 30.",
        "Tropical depression: below 63 km/h.",
        "Tropical storm: about 63 to 118 km/h.",
        "Hurricane: at least 119 km/h.",
        "Warm ocean water and condensation provide energy to tropical cyclones.",
        "The eye is relatively calm and the eyewall has the strongest winds.",
        "Hurricanes weaken over land because the warm-ocean energy supply is cut off and friction increases.",
        "Storm surge is a dangerous rise of sea level at the coast."
      ],
      "workedExample":{
        "title":"Classifying a tropical cyclone",
        "prompt":"A tropical cyclone has maximum sustained winds of 125 km/h. How should it be classified?",
        "steps":[
          "A tropical depression is below 63 km/h.",
          "A tropical storm is about 63 to 118 km/h.",
          "Hurricane strength begins at 119 km/h.",
          "125 km/h is above the hurricane threshold."
        ],
        "answer":"It is a hurricane."
      },
      "checks":[
        {"prompt":"When is the official Atlantic hurricane season?","answer":"June 1 to November 30.","explanation":"This is the official NHC season for the Atlantic basin."},
        {"prompt":"At what sustained wind speed does a tropical cyclone become a hurricane?","answer":"At least 119 km/h.","explanation":"This is equivalent to 74 mph or 64 knots."},
        {"prompt":"What is the calm centre of a hurricane called?","answer":"The eye.","explanation":"The strongest winds occur in the surrounding eyewall."},
        {"prompt":"Why does a hurricane usually weaken over land?","answer":"It loses the warm-ocean moisture and heat supply and experiences greater friction.","explanation":"Both factors weaken the storm circulation."},
        {"prompt":"What is storm surge?","answer":"An abnormal rise of sea level pushed toward the coast by a storm, especially by strong winds.","explanation":"Storm surge causes dangerous coastal flooding."}
      ],
      "summary":"Understand both the seasonal pattern and the tropical-cyclone process. Hurricane risk comes from more than wind alone, so preparation must also account for rainfall, flooding and storm surge."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":72,"objectivesBuilt":72}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
