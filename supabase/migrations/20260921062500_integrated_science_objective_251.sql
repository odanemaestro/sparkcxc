begin;

-- CSEC Integrated Science objective 2.5.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t5-1-heat-transfer',
  'module-2-energy',
  '2.5.1 Applications of Heat Transfer',
  'Examine conduction, convection and radiation and apply them to cookware, buildings, air conditioning, coastal breezes, hot-air balloons and vacuum flasks.',
  660,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Temperature Control and Ventilation",
      "objective":"2.5.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish conduction, convection and radiation.",
        "Explain heat conduction through solids and metals.",
        "Explain convection in liquids and gases using density changes.",
        "Explain why radiation can transfer energy through a vacuum.",
        "Explain sea breezes by day and land breezes by night.",
        "Relate thermal conductivity to cookware and handles.",
        "Explain the use of light colours and high-mounted air conditioners in Caribbean buildings.",
        "Explain why hot-air balloons rise.",
        "Explain how vacuum flasks reduce heat transfer."
      ],
      "introduction":"Thermal energy moves from hotter regions to cooler regions by conduction, convection and radiation. Everyday systems are designed either to increase useful heat transfer or to reduce unwanted heat transfer.",
      "sections":[
        {
          "title":"Conduction",
          "paragraphs":[
            "Conduction transfers thermal energy through matter without bulk movement of the material.",
            "In a solid, particles at the hotter end vibrate more strongly and transfer energy to neighbouring particles.",
            "Metals conduct heat especially well because mobile electrons also carry energy rapidly through the structure.",
            "Heat therefore moves along a metal spoon from the hot end to the cooler handle by conduction."
          ]
        },
        {
          "title":"Convection",
          "paragraphs":[
            "Convection occurs in liquids and gases because these fluids can move.",
            "When a region of a fluid is heated it expands, becomes less dense and rises. Cooler, denser fluid moves in to replace it.",
            "This circulation forms a convection current."
          ]
        },
        {
          "title":"Radiation",
          "paragraphs":[
            "Thermal radiation is electromagnetic radiation and does not require particles to transfer energy.",
            "Energy from the Sun reaches Earth by radiation through the vacuum of space.",
            "Dull black surfaces are good absorbers and emitters of thermal radiation, while light and shiny surfaces reflect more radiant energy."
          ]
        },
        {
          "title":"Sea breeze during the day",
          "paragraphs":[
            "During the day, land usually heats faster than the sea.",
            "Air above the warmer land heats, expands and rises. Cooler air from over the sea moves towards the land to replace it.",
            "This creates a sea breeze at the surface."
          ]
        },
        {
          "title":"Land breeze at night",
          "paragraphs":[
            "At night, land usually cools faster than the sea.",
            "The sea therefore remains warmer for longer. Air above the sea rises and cooler air from the land moves seaward to replace it.",
            "This creates a land breeze at the surface."
          ]
        },
        {
          "title":"Cookware and handles",
          "paragraphs":[
            "Aluminium and copper are good thermal conductors, so they transfer heat efficiently into food.",
            "Plastic and other poor thermal conductors are used for handles because they reduce the rate of heat transfer to the hand.",
            "Copper-bottomed cookware spreads heat rapidly and can help provide more even heating."
          ]
        },
        {
          "title":"Caribbean buildings and air conditioning",
          "paragraphs":[
            "White and light-coloured surfaces reflect more incoming solar radiation than dull dark surfaces and therefore absorb less radiant heat.",
            "This is one reason light-coloured roofs and walls can help reduce heat gain in hot climates.",
            "Air-conditioning outlets are often placed high because cool dense air sinks while warmer air rises, helping establish convection circulation through the room."
          ]
        },
        {
          "title":"Hot-air balloons",
          "paragraphs":[
            "Heating the air inside a hot-air balloon causes the air to expand and become less dense than the surrounding cooler air.",
            "The resulting buoyant force can lift the balloon."
          ]
        },
        {
          "title":"Vacuum flasks",
          "paragraphs":[
            "The vacuum between the flask walls contains essentially no particles, so it greatly reduces conduction and prevents convection through the gap.",
            "Silvered shiny surfaces reduce heat transfer by radiation because they reflect infrared radiation.",
            "An insulating stopper reduces conduction and limits convection through the opening."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t5-1-heat-transfer",
          "type":"heat-transfer-applications",
          "title":"Heat transfer and applications explorer"
        }
      ],
      "keyPoints":[
        "Conduction is the main heat-transfer method through solids.",
        "Metals are good thermal conductors.",
        "Convection occurs in liquids and gases.",
        "Warm fluids expand, become less dense and rise.",
        "Radiation can travel through a vacuum.",
        "Dull black surfaces absorb and emit radiation well.",
        "Light and shiny surfaces reflect more radiation.",
        "Sea breezes form by day because land heats faster than sea.",
        "Land breezes form at night because land cools faster than sea.",
        "A vacuum reduces conduction and convection in a flask.",
        "Silvered flask surfaces reduce radiation."
      ],
      "workedExample":{
        "title":"Explaining a sea breeze",
        "prompt":"Explain why air moves from the sea towards the land during a sunny day.",
        "steps":[
          "The land heats faster than the sea.",
          "Air above the land becomes warmer.",
          "The warm air expands, becomes less dense and rises.",
          "Cooler denser air over the sea moves towards the land to replace it."
        ],
        "answer":"Unequal heating creates a convection current. Warm air rises over the land and cooler air moves in from the sea."
      },
      "checks":[
        {
          "prompt":"How does heat move through a metal spoon?",
          "answer":"By conduction.",
          "explanation":"Energy passes through the solid by particle interactions and mobile electrons."
        },
        {
          "prompt":"Why can radiation travel from the Sun to Earth?",
          "answer":"Radiation does not require a material medium.",
          "explanation":"It is electromagnetic energy and can cross a vacuum."
        },
        {
          "prompt":"Why are plastic handles used on metal cooking pots?",
          "answer":"Plastic is a poor thermal conductor and reduces heat transfer to the hand.",
          "explanation":"The metal body conducts heat to the food while the handle should remain safer to hold."
        },
        {
          "prompt":"Which surface is the best absorber of thermal radiation: dull black or shiny silver?",
          "answer":"Dull black.",
          "explanation":"Dull dark surfaces are good absorbers and emitters, while shiny surfaces are good reflectors."
        },
        {
          "prompt":"How does the vacuum in a vacuum flask reduce heat loss?",
          "answer":"It greatly reduces conduction and prevents convection through the gap.",
          "explanation":"There are essentially no particles in the vacuum to conduct heat or form convection currents."
        }
      ],
      "summary":"Use conduction for heat transfer through solids, convection for bulk movement in fluids and radiation for electromagnetic transfer. Real designs combine these principles to control heating and cooling."
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
  || '{"topicsBuilt":66,"objectivesBuilt":66}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
