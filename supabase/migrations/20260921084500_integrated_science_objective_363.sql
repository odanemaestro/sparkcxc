begin;

-- CSEC Integrated Science objective 3.6.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-3-states-matter',
  'module-3-environment',
  '3.6.3 States of Matter',
  'Differentiate among solids, liquids, gases and plasma using particle arrangement, movement, compressibility and changes of state.',
  890,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Compare particle arrangement and movement in solids, liquids and gases.",
        "Relate particle arrangement to fixed shape and volume.",
        "Explain why gases are easily compressed.",
        "Define melting, freezing, evaporation, boiling and condensation.",
        "Define sublimation and deposition.",
        "Explain evaporation from wet clothes.",
        "Explain condensation on cold surfaces.",
        "Identify plasma in lightning and the Sun.",
        "Explain constant temperature during a change of state."
      ],
      "introduction":"The particle model explains why solids, liquids and gases behave differently. State changes occur when particles gain or lose energy and their arrangement and movement change.",
      "sections":[
        {"title":"Solids","paragraphs":[
          "Solid particles are closely packed in a regular arrangement.",
          "They vibrate about fixed positions rather than moving freely through the substance.",
          "A solid therefore has a fixed shape and fixed volume."
        ]},
        {"title":"Liquids","paragraphs":[
          "Liquid particles are close together but can move past each other.",
          "A liquid has a fixed volume but no fixed shape, so it takes the shape of its container."
        ]},
        {"title":"Gases","paragraphs":[
          "Gas particles are far apart and move rapidly in random directions.",
          "A gas has no fixed shape and no fixed volume and spreads to fill its container.",
          "Gases are easily compressed because there are large spaces between particles."
        ]},
        {"title":"Forces between particles","paragraphs":[
          "Attractive forces are strongest in solids in the simple particle model because particles are held close to fixed positions.",
          "These forces are weaker in liquids and much less effective at holding gas particles together."
        ]},
        {"title":"Melting, freezing, evaporation and condensation","paragraphs":[
          "Melting changes a solid to a liquid and freezing changes a liquid to a solid.",
          "Evaporation changes liquid particles at the surface into gas and can occur below the boiling point.",
          "Boiling occurs throughout a liquid at its boiling point.",
          "Condensation changes a gas to a liquid."
        ]},
        {"title":"Sublimation and deposition","paragraphs":[
          "Sublimation is the direct change from solid to gas without becoming liquid first.",
          "Some solid air fresheners become smaller because material sublimes.",
          "Deposition is the direct change from gas to solid and is the reverse of sublimation."
        ]},
        {"title":"Wind and evaporation","paragraphs":[
          "Wet clothes dry faster in moving air because the wind removes water vapour from around the fabric.",
          "This keeps the surrounding air less humid and allows evaporation to continue more rapidly."
        ]},
        {"title":"Condensation on a cold glass","paragraphs":[
          "Water droplets on the outside of an iced glass come from water vapour in the surrounding air.",
          "The vapour cools at the glass surface and condenses into liquid water."
        ]},
        {"title":"Plasma","paragraphs":[
          "Plasma is a high-energy state containing free charged particles.",
          "Lightning and the Sun are familiar examples of matter in the plasma state."
        ]},
        {"title":"Heating curves and phase changes","paragraphs":[
          "During melting or boiling, temperature can remain constant even while heat is supplied.",
          "The energy is used to overcome attractive forces between particles rather than immediately increase particle kinetic energy.",
          "For water at normal atmospheric pressure, melting occurs around 0 °C and boiling around 100 °C."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-3-states-matter","type":"states-matter","title":"Particle model and changes-of-state explorer"}],
      "keyPoints":[
        "Solid particles are closely packed and vibrate about fixed positions.",
        "Liquid particles are close together but can move past each other.",
        "Gas particles are far apart and spread to fill a container.",
        "Gases are easily compressed.",
        "Sublimation is solid → gas.",
        "Deposition is gas → solid.",
        "Wind speeds evaporation by removing water vapour.",
        "Condensation produces water droplets on cold surfaces.",
        "Lightning and the Sun contain plasma.",
        "Temperature can remain constant during a phase change."
      ],
      "workedExample":{
        "title":"Water droplets on a cold glass",
        "prompt":"Explain why water appears on the outside of a glass containing an iced drink.",
        "steps":[
          "Air around the glass contains water vapour.",
          "The cold glass cools the nearby air.",
          "Water vapour loses energy.",
          "The vapour condenses into liquid droplets on the outside surface."
        ],
        "answer":"Water vapour from the air condenses on the cold glass."
      },
      "checks":[
        {"prompt":"Why can a gas be compressed easily?","answer":"Its particles are far apart with large spaces between them.","explanation":"Compression reduces those spaces."},
        {"prompt":"What is sublimation?","answer":"The direct change from solid to gas.","explanation":"No liquid stage occurs."},
        {"prompt":"What is deposition?","answer":"The direct change from gas to solid.","explanation":"It is the reverse of sublimation."},
        {"prompt":"Why do clothes dry faster on a windy day?","answer":"Moving air removes water vapour and increases the rate of evaporation.","explanation":"The air next to the clothes stays less humid."},
        {"prompt":"Why can temperature stay constant while a substance melts?","answer":"Supplied energy is used to overcome attractive forces between particles.","explanation":"It is not immediately used to raise temperature."}
      ],
      "summary":"Particle arrangement, spacing and energy explain the observable differences between states of matter and how substances change from one state to another."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":89,"objectivesBuilt":89}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
