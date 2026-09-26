begin;

-- CSEC Integrated Science objective 2.4.9
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-9-fire-extinguishing',
  'module-2-energy',
  '2.4.9 Methods of Extinguishing Fires',
  'Discuss fire-extinguishing methods using the fire triangle, appropriate extinguishing agents, fire blankets, fuel isolation and firebreaks.',
  640,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.9",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Use the fire triangle to explain how fires are extinguished.",
        "Explain how water cools ordinary combustible fires.",
        "Explain why water must not be used on energized electrical equipment.",
        "Explain why water must not be poured onto burning cooking oil.",
        "Explain how carbon dioxide, foam, fire blankets and suitable dry chemical extinguishers work.",
        "Explain how a firebreak removes fuel.",
        "Explain how shutting off a gas supply removes fuel.",
        "Recognise that real extinguisher labels and local fire classes must guide actual use."
      ],
      "introduction":"A fire continues only while enough heat, fuel and oxygen are available. Fire-control methods work by removing one or more of these requirements. The correct method depends on what is burning and whether electrical equipment is energized.",
      "sections":[
        {
          "title":"The fire triangle",
          "paragraphs":[
            "The three requirements for sustained fire are heat, fuel and oxygen.",
            "Removing enough heat, fuel or oxygen stops the combustion process."
          ]
        },
        {
          "title":"Cooling with water",
          "paragraphs":[
            "Water is suitable for many ordinary combustible fires involving materials such as wood or paper because it absorbs heat and cools the fuel below the temperature needed to continue burning.",
            "Water should not be used on energized electrical equipment because it can conduct electricity and expose the user to electric shock."
          ]
        },
        {
          "title":"Flammable-liquid fires",
          "paragraphs":[
            "Water can spread a burning flammable liquid and should not be used on gasoline, oil or similar liquid fires.",
            "CSEC questions commonly give foam for a gasoline or oil fire because a suitable foam layer covers the surface, suppresses vapour and reduces oxygen contact.",
            "In real use, select an extinguisher whose label specifically covers the fire class."
          ]
        },
        {
          "title":"Cooking-oil fires",
          "paragraphs":[
            "Never pour water onto burning cooking oil. Rapid steam formation and splashing can spread burning oil violently.",
            "For a small pan fire, turn off the heat if this can be done safely and smother the fire by sliding a lid over the pan or by using a suitable fire blanket.",
            "Commercial cooking areas use appropriately rated cooking-oil extinguishers, commonly identified as Class K in North American systems."
          ]
        },
        {
          "title":"Carbon dioxide and electrical equipment",
          "paragraphs":[
            "Carbon dioxide extinguishers are commonly used on suitable flammable-liquid and energized-electrical fires because the discharge does not conduct electricity.",
            "Carbon dioxide reduces the oxygen concentration around the flame and does not leave a powder residue.",
            "If possible, electrical equipment should still be de-energized safely."
          ]
        },
        {
          "title":"Dry chemical or dry powder",
          "paragraphs":[
            "Some dry chemical or dry powder extinguishers are rated for several fire classes, including flammable liquids and energized electrical equipment.",
            "Always read the extinguisher label because ratings and terminology differ between jurisdictions."
          ]
        },
        {
          "title":"Fire blankets and smothering",
          "paragraphs":[
            "A suitable fire blanket can smother a small pan or clothing fire by restricting oxygen.",
            "Some older bank items describe a damp cloth over a pan. The examination principle is oxygen removal, but current home guidance favours a lid or suitable fire blanket rather than improvising with a wet cloth."
          ]
        },
        {
          "title":"Removing fuel",
          "paragraphs":[
            "Turning off a gas supply, when this can be done safely, removes the fuel and stops the flame.",
            "A firebreak is a wide strip cleared of vegetation ahead of a bush or grass fire. It interrupts the fuel path so the fire has less material to burn."
          ]
        },
        {
          "title":"When not to fight the fire",
          "paragraphs":[
            "Only attempt to extinguish a small fire when you have the correct equipment, know how to use it and have a clear escape route.",
            "If the fire is spreading, producing heavy smoke or you are unsure, leave the area and call emergency services."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-9-fire-extinguishing",
          "type":"fire-extinguishing",
          "title":"Fire triangle and extinguisher-selection explorer"
        }
      ],
      "keyPoints":[
        "Fire requires heat, fuel and oxygen.",
        "Water cools many ordinary combustible fires.",
        "Do not use water on energized electrical equipment.",
        "Do not use water on burning cooking oil or gasoline.",
        "A fire blanket or pan lid removes oxygen from a small pan fire.",
        "A firebreak removes fuel.",
        "Turning off a gas supply removes fuel.",
        "CO₂ and suitably rated dry chemical extinguishers are used for some electrical hazards.",
        "Check the extinguisher label because fire-class systems and ratings vary."
      ],
      "workedExample":{
        "title":"Explaining a firebreak",
        "prompt":"Firefighters clear a wide strip of vegetation ahead of a bush fire. Which part of the fire triangle is being removed?",
        "steps":[
          "The burning vegetation is the fuel.",
          "The cleared strip contains little or no burnable vegetation.",
          "When the fire reaches the strip, the continuous fuel path is broken."
        ],
        "answer":"The firebreak removes fuel."
      },
      "checks":[
        {
          "prompt":"Why does water extinguish a wood fire?",
          "answer":"It removes heat by cooling the fuel below the temperature needed to keep burning.",
          "explanation":"This removes the heat part of the fire triangle."
        },
        {
          "prompt":"Why must water not be used on an energized electrical fire?",
          "answer":"Water can conduct electricity and cause electric shock.",
          "explanation":"Use an extinguisher rated for energized electrical equipment."
        },
        {
          "prompt":"Why should water not be poured onto burning cooking oil?",
          "answer":"It can cause violent splashing and spread the burning oil.",
          "explanation":"Smother a small pan fire with a lid or suitable fire blanket instead."
        },
        {
          "prompt":"How does a fire blanket work?",
          "answer":"It reduces the fire''s supply of oxygen.",
          "explanation":"This is the smothering method."
        },
        {
          "prompt":"How does turning off a gas supply extinguish a gas flame?",
          "answer":"It removes the fuel.",
          "explanation":"Without fuel the combustion cannot continue."
        }
      ],
      "summary":"Match the extinguishing method to the fire. Remove heat, oxygen or fuel, but never use an agent that creates an electrical, chemical or splashing hazard."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,
  title=excluded.title,
  description=excluded.description,
  sort_order=excluded.sort_order,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)
  || '{"topicsBuilt":64,"objectivesBuilt":64}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
