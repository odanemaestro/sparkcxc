begin;

-- CSEC Integrated Science objective 3.3.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-3-water-uses',
  'module-3-environment',
  '3.3.3 Uses of Water',
  'Explain biological, domestic, agricultural, industrial and energy uses of water and apply simple water-use and conservation calculations.',
  770,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain roles of water in transport, digestion and excretion in the human body.",
        "Calculate household water use over time.",
        "Identify important household uses and water-conservation measures.",
        "Distinguish aquaculture, mariculture and hydroponics.",
        "Explain the use of water in hydroelectric power generation.",
        "Explain industrial use of water to produce steam.",
        "Explain why water is useful as a coolant.",
        "Explain why water can extinguish many ordinary fires and recognise important exceptions.",
        "Relate precipitation in the water cycle to freshwater supply."
      ],
      "introduction":"Water is essential in living organisms and is used throughout homes, agriculture, industry and energy production. Its usefulness comes from properties such as solvent action, high specific heat capacity and its ability to move through natural and engineered systems.",
      "sections":[
        {"title":"Water in the human body","paragraphs":[
          "Blood plasma contains water that transports dissolved nutrients, hormones, mineral ions and wastes.",
          "Digestive enzymes work in aqueous fluids, and water participates in hydrolysis reactions used to break large food molecules into smaller ones.",
          "Water carries urea, excess salts and other wastes in urine."
        ]},
        {"title":"Household use","paragraphs":[
          "Water is used for drinking, cooking, bathing, flushing toilets, laundry, cleaning and gardening.",
          "Bathing and toilet flushing commonly account for much more household water use than drinking or cooking."
        ]},
        {"title":"Calculating water use","paragraphs":[
          "Total water use = daily use × number of days.",
          "A family using 150 litres each day for 30 days uses 150 × 30 = 4 500 litres.",
          "A family using 0.4 m³ each day for 30 days uses 0.4 × 30 = 12 m³.",
          "One cubic metre equals 1 000 litres."
        ]},
        {"title":"Conserving water at home","paragraphs":[
          "Fix leaking pipes and toilets because small continuous leaks can waste large quantities over time.",
          "Turn taps off when water is not needed, use controlled-flow washing methods and avoid watering gardens during the hottest part of the day."
        ]},
        {"title":"Aquaculture and mariculture","paragraphs":[
          "Aquaculture is the farming of aquatic organisms in water environments such as ponds, tanks and cages.",
          "Mariculture is aquaculture carried out in marine or coastal water, for example oyster, seaweed or marine-fish farming."
        ]},
        {"title":"Hydroponics","paragraphs":[
          "Hydroponics is the cultivation of plants without soil.",
          "Plant roots receive water containing dissolved mineral nutrients."
        ]},
        {"title":"Hydroelectric power","paragraphs":[
          "In a hydroelectric system, stored water has gravitational potential energy.",
          "As water flows or falls, it gains kinetic energy and turns turbines connected to generators, producing electrical energy."
        ]},
        {"title":"Industrial steam","paragraphs":[
          "Industries and power stations heat water to produce steam.",
          "High-pressure steam can drive turbines or transfer heat during processing."
        ]},
        {"title":"Cooling","paragraphs":[
          "Water has a high specific heat capacity, so it can absorb a large quantity of heat for a relatively small temperature rise.",
          "This makes water useful in cooling systems, including vehicle engines and industrial equipment."
        ]},
        {"title":"Firefighting","paragraphs":[
          "Water extinguishes many ordinary fires by absorbing heat and cooling burning material below the temperature needed to sustain combustion.",
          "Water is not suitable for every fire. It should not be used on live electrical equipment or burning cooking oil because it can create additional danger."
        ]},
        {"title":"The water cycle and supply","paragraphs":[
          "Evaporation moves water into the atmosphere, condensation forms clouds and precipitation returns water to the surface.",
          "Run-off and infiltration help replenish rivers, reservoirs and groundwater that can later be used by people and ecosystems."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-3-water-uses","type":"water-uses","title":"Water use, conservation and calculation explorer"}],
      "keyPoints":[
        "Water transports dissolved materials in the body.",
        "Water is needed for digestion and excretion.",
        "150 L per day for 30 days = 4 500 L.",
        "0.4 m³ per day for 30 days = 12 m³.",
        "Fixing leaks conserves water.",
        "Aquaculture farms aquatic organisms.",
        "Mariculture is marine aquaculture.",
        "Hydroponics grows plants in nutrient solution without soil.",
        "Hydroelectricity uses moving water to turn turbines.",
        "Water is a useful coolant because of its high specific heat capacity."
      ],
      "workedExample":{
        "title":"Monthly household water use",
        "prompt":"A household uses 0.4 m³ of water each day. Calculate the amount used in 30 days.",
        "steps":[
          "Total use = daily use × number of days.",
          "Total use = 0.4 m³ × 30.",
          "Total use = 12 m³."
        ],
        "answer":"12 m³."
      },
      "checks":[
        {"prompt":"What is aquaculture?","answer":"The farming of aquatic organisms.","explanation":"It may occur in ponds, tanks, cages or other controlled aquatic environments."},
        {"prompt":"What is mariculture?","answer":"The farming of marine organisms in sea or coastal water.","explanation":"It is a specialised form of aquaculture."},
        {"prompt":"What is hydroponics?","answer":"Growing plants without soil using nutrient-containing water.","explanation":"Water carries dissolved mineral nutrients to the roots."},
        {"prompt":"Why is water useful as a coolant?","answer":"It has a high specific heat capacity.","explanation":"It absorbs a large amount of heat for a relatively small temperature rise."},
        {"prompt":"What household action directly reduces avoidable water loss?","answer":"Fix leaking pipes or toilets.","explanation":"Continuous leaks waste water even when no useful activity is taking place."}
      ],
      "summary":"Water supports life, agriculture, industry, energy production and household activities. Efficient use and conservation protect limited freshwater supplies."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":77,"objectivesBuilt":77}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
