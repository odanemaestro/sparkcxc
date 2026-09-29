begin;

-- CSEC Integrated Science objective 2.5.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t5-5-ventilation',
  'module-2-energy',
  '2.5.5 Ventilation',
  'Explain the need for proper ventilation and compare natural and mechanical ventilation in homes, schools and other occupied spaces.',
  650,
  true,
  '{
    "syllabus":{"module":2,"topic":"Temperature Control and Ventilation","objective":"2.5.5","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain why occupied buildings need ventilation.",
        "Explain natural ventilation using wind and convection.",
        "Explain cross-ventilation using openings on opposite sides.",
        "Explain why high vents help remove warm air.",
        "Describe the usefulness of louvre windows in Caribbean buildings.",
        "Distinguish natural from mechanical ventilation.",
        "Explain how exhaust fans remove heat, steam and smoke.",
        "Explain why crowded poorly ventilated rooms accumulate carbon dioxide, heat and humidity.",
        "Explain carbon-monoxide hazards from combustion appliances and generators."
      ],
      "introduction":"Ventilation replaces stale indoor air with fresh outdoor air and removes excess heat, moisture, odours and pollutants. Good ventilation improves comfort and indoor air quality.",
      "sections":[
        {"title":"Why ventilation is needed","paragraphs":[
          "People release carbon dioxide, water vapour and heat into a room. Cooking, cleaning and other activities can also add moisture, odours and pollutants.",
          "Ventilation removes stale air and supplies fresh outdoor air."
        ]},
        {"title":"Natural ventilation","paragraphs":[
          "Natural ventilation uses wind and convection rather than powered fans.",
          "Opening windows and doors allows fresh air to enter and stale air to leave."
        ]},
        {"title":"Cross-ventilation","paragraphs":[
          "Openings on opposite walls allow air to move through a room instead of entering and leaving at the same point.",
          "Cross-ventilation is especially effective when wind creates a pressure difference between the two sides of the building."
        ]},
        {"title":"High vents and convection","paragraphs":[
          "Warm air is less dense than cooler air and tends to rise.",
          "Vents placed high on walls provide an escape path for warm stale air while cooler replacement air enters through lower openings."
        ]},
        {"title":"Louvre windows","paragraphs":[
          "Louvre windows are common in Caribbean buildings because adjustable slats allow air to pass while helping to keep out rain.",
          "Their angle can be changed to control airflow and privacy."
        ]},
        {"title":"Mechanical ventilation","paragraphs":[
          "Mechanical ventilation uses powered equipment to move air.",
          "Exhaust fans remove air from kitchens and bathrooms, carrying away smoke, steam, heat and odours.",
          "Air-conditioning systems cool and often dehumidify indoor air. Some systems also introduce outdoor air, while others mainly recirculate indoor air."
        ]},
        {"title":"Crowded rooms","paragraphs":[
          "In a crowded poorly ventilated classroom, carbon dioxide, heat and humidity can increase.",
          "Students may feel tired, uncomfortable or develop headaches, and concentration can suffer."
        ]},
        {"title":"Carbon monoxide hazards","paragraphs":[
          "Incomplete combustion can produce carbon monoxide, an odourless poisonous gas.",
          "Burning charcoal in a closed room or running a gasoline generator in a garage is dangerous because carbon monoxide can build up rapidly.",
          "Gas stoves also require correct installation, maintenance and adequate ventilation."
        ]},
        {"title":"Fans and fresh air","paragraphs":[
          "A ceiling fan increases air movement and improves convective and evaporative cooling around people.",
          "A fan alone does not necessarily replace stale indoor air with fresh outdoor air. True ventilation requires air exchange with outdoors."
        ]}
      ],
      "interactiveModels":[{"id":"m2-t5-5-ventilation","type":"ventilation","title":"Natural and mechanical ventilation explorer"}],
      "keyPoints":[
        "Ventilation supplies fresh air and removes stale air.",
        "Natural ventilation uses wind and convection.",
        "Openings on opposite walls promote cross-ventilation.",
        "Warm air rises and can escape through high vents.",
        "Louvre windows allow airflow while helping keep out rain.",
        "Exhaust fans and air conditioners are mechanical systems.",
        "Crowded poorly ventilated rooms accumulate carbon dioxide, heat and humidity.",
        "Carbon monoxide from incomplete combustion is poisonous.",
        "Generators must not be operated in closed garages or occupied indoor spaces."
      ],
      "workedExample":{
        "title":"Explaining cross-ventilation",
        "prompt":"A classroom has open windows on opposite walls. Explain why this arrangement improves ventilation.",
        "steps":[
          "Wind creates pressure differences around the building.",
          "Fresh air enters through openings on one side.",
          "Air moves across the room.",
          "Warm stale air leaves through openings on the opposite side.",
          "Heat, moisture and carbon dioxide are removed more effectively."
        ],
        "answer":"Opposite openings create a through-flow of air, allowing fresh air to enter while warm stale air leaves."
      },
      "checks":[
        {"prompt":"Why is ventilation important in a crowded classroom?","answer":"It removes heat, humidity and carbon dioxide and supplies fresh air.","explanation":"Occupants continuously add heat, moisture and carbon dioxide."},
        {"prompt":"What building arrangement promotes cross-ventilation?","answer":"Openings such as windows on opposite walls.","explanation":"This allows air to flow through the room."},
        {"prompt":"Why are high vents useful?","answer":"Warm air rises and can escape through them.","explanation":"Convection carries warm stale air upward."},
        {"prompt":"What does a kitchen exhaust fan remove?","answer":"Smoke, steam, heat and odours.","explanation":"It extracts contaminated moist air near the source."},
        {"prompt":"Why is a generator dangerous in a closed garage?","answer":"Carbon monoxide can accumulate to poisonous levels.","explanation":"Generator exhaust contains carbon monoxide from combustion."}
      ],
      "summary":"Good ventilation combines air exchange, sensible building openings and suitable mechanical systems to remove heat, moisture and pollutants while bringing in cleaner outdoor air."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":65,"objectivesBuilt":65}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
