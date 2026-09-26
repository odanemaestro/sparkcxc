begin;

-- CSEC Integrated Science objective 2.5.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t5-4-body-temperature',
  'module-2-energy',
  '2.5.4 Temperature Regulation in Humans',
  'Explain human thermoregulation using hypothalamic control, sweating, evaporation, vasodilation, vasoconstriction, shivering and the effects of heat and cold.',
  640,
  true,
  '{
    "syllabus":{"module":2,"topic":"Temperature Control and Ventilation","objective":"2.5.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "State normal human core temperature as about 37 °C.",
        "Identify the hypothalamus as the main temperature-control centre.",
        "Explain cooling by sweating and evaporation.",
        "Explain why high humidity reduces evaporative cooling.",
        "Explain vasodilation and vasoconstriction.",
        "Explain how shivering increases heat production.",
        "Relate very high and very low body temperature to enzyme-controlled metabolism.",
        "Explain dehydration and heat-stroke risk during strenuous exercise."
      ],
      "introduction":"The body keeps core temperature within a narrow range because enzymes and cells work best under suitable conditions. The hypothalamus coordinates negative-feedback responses that increase heat loss when the body is too hot and conserve or generate heat when it is too cold.",
      "sections":[
        {"title":"Normal body temperature","paragraphs":[
          "Normal human core temperature is commonly taken as about 37 °C in CSEC questions, although body temperature varies naturally through the day and between individuals.",
          "The hypothalamus in the brain acts as the main temperature-control centre."
        ]},
        {"title":"Sweating and evaporation","paragraphs":[
          "When the body is too hot, sweat glands release sweat onto the skin.",
          "Evaporation requires latent heat of vaporisation. This energy is taken from the skin, so evaporation cools the body."
        ]},
        {"title":"Humidity and cooling","paragraphs":[
          "On a humid day, the surrounding air already contains a high amount of water vapour.",
          "Sweat therefore evaporates more slowly, so less latent heat is removed from the body and a person feels hotter."
        ]},
        {"title":"Vasodilation","paragraphs":[
          "When the body is too hot, arterioles supplying the skin dilate.",
          "More warm blood flows close to the body surface, increasing heat transfer to the surroundings by radiation, convection and conduction."
        ]},
        {"title":"Vasoconstriction","paragraphs":[
          "When the body is cold, skin arterioles constrict.",
          "Less warm blood reaches the surface, so heat loss to the surroundings decreases."
        ]},
        {"title":"Shivering","paragraphs":[
          "Shivering consists of rapid involuntary muscle contractions.",
          "The increased muscle activity raises respiration and releases more heat, helping warm the body."
        ]},
        {"title":"Heat stress and dehydration","paragraphs":[
          "During prolonged strenuous exercise in hot conditions, large amounts of water can be lost in sweat.",
          "If this water is not replaced, dehydration can reduce effective sweating and heat loss, allowing core temperature to rise dangerously.",
          "Heat stroke is a medical emergency associated with dangerously high body temperature and nervous-system dysfunction."
        ]},
        {"title":"Temperature and enzymes","paragraphs":[
          "Very high body temperature can damage proteins and disrupt enzyme-controlled reactions.",
          "If body temperature falls well below normal, enzyme-controlled reactions and metabolic rate slow because molecules move and collide less frequently."
        ]}
      ],
      "interactiveModels":[{"id":"m2-t5-4-body-temperature","type":"body-temperature-regulation","title":"Human thermoregulation explorer"}],
      "keyPoints":[
        "Normal core temperature is about 37 °C.",
        "The hypothalamus coordinates thermoregulation.",
        "Sweat cools by evaporation and latent heat transfer.",
        "High humidity slows sweat evaporation.",
        "Vasodilation increases heat loss.",
        "Vasoconstriction reduces heat loss.",
        "Shivering raises heat production through muscle activity.",
        "Dehydration increases heat-stroke risk.",
        "Very high temperature can disrupt proteins and enzymes.",
        "Low temperature slows enzyme-controlled reactions."
      ],
      "workedExample":{
        "title":"Why humidity makes heat feel worse",
        "prompt":"Explain why a person feels hotter on a humid day than on a dry day at the same air temperature.",
        "steps":[
          "Sweat must evaporate to provide effective cooling.",
          "Humid air already contains a high concentration of water vapour.",
          "The gradient for evaporation is smaller.",
          "Sweat evaporates more slowly.",
          "Less latent heat is removed from the skin."
        ],
        "answer":"High humidity slows sweat evaporation, so less latent heat is removed from the skin and cooling is less effective."
      },
      "checks":[
        {"prompt":"Which part of the brain controls body temperature?","answer":"The hypothalamus.","explanation":"It coordinates thermoregulatory responses."},
        {"prompt":"How does sweating cool the body?","answer":"Evaporation of sweat takes latent heat from the skin.","explanation":"Energy is needed to change liquid water into water vapour."},
        {"prompt":"What happens to skin blood vessels when the body is too hot?","answer":"They dilate.","explanation":"Vasodilation brings more warm blood near the surface."},
        {"prompt":"How does shivering warm the body?","answer":"Rapid muscle contractions increase respiration and heat production.","explanation":"Muscle activity releases more heat."},
        {"prompt":"Why can dehydration increase heat-stroke risk?","answer":"It can reduce effective sweating and evaporative cooling.","explanation":"Core temperature can then rise dangerously."}
      ],
      "summary":"Thermoregulation is a negative-feedback system controlled by the hypothalamus. The body adjusts sweat production, skin blood flow and muscle activity to keep core temperature near its normal range."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":64,"objectivesBuilt":64}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
