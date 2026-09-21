begin;

-- CSEC Integrated Science objective 3.5.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-3-aluminium-utensils',
  'module-3-environment',
  '3.5.3 Aluminium for Cooking and Canning',
  'Discuss the advantages and disadvantages of aluminium cooking and canning utensils using its physical and chemical properties.',
  830,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain why aluminium heats food efficiently.",
        "Relate aluminium''s low density to easy handling and transport.",
        "Explain the protective effect of aluminium oxide.",
        "Discuss aluminium''s suitability for cans and foil.",
        "Explain why prolonged contact with acidic foods is undesirable in uncoated aluminium.",
        "Explain why repeated aggressive scouring is poor practice.",
        "Discuss denting and scratching as disadvantages of plain aluminium.",
        "Recognise recyclability as an advantage."
      ],
      "introduction":"Aluminium is widely used for cookware, foil and cans because it conducts heat well, is light and easy to shape, and protects itself with a thin oxide coating. These same properties also create limitations that should be considered.",
      "sections":[
        {"title":"Good heat conductor","paragraphs":[
          "Aluminium conducts heat well.",
          "Aluminium pots therefore heat quickly and can spread heat efficiently to food."
        ]},
        {"title":"Low density","paragraphs":[
          "Aluminium has a relatively low density compared with many other common metals.",
          "This makes cookware easier to handle and keeps beverage cans light during transport."
        ]},
        {"title":"Protective oxide layer","paragraphs":[
          "Fresh aluminium reacts rapidly with oxygen and forms a very thin aluminium oxide coating.",
          "This oxide layer is strongly attached to the surface and helps prevent further rapid corrosion.",
          "Aluminium therefore does not rust in the way iron does."
        ]},
        {"title":"Aluminium cans","paragraphs":[
          "Aluminium is suitable for cans because it is light, corrosion resistant, easy to shape and recyclable.",
          "Its low mass also reduces transport weight."
        ]},
        {"title":"Aluminium foil","paragraphs":[
          "Aluminium is malleable and can be rolled into very thin sheets.",
          "Foil is lightweight, easy to shape around food and has a reflective surface that can reduce radiative heat transfer in some uses."
        ]},
        {"title":"Acidic foods","paragraphs":[
          "Acidic foods such as tomatoes can attack the protective oxide surface of uncoated aluminium.",
          "Long cooking or storage of acidic foods can therefore increase the amount of aluminium transferred from the utensil into the food.",
          "This is why prolonged storage of acidic foods in plain uncoated aluminium is discouraged."
        ]},
        {"title":"Cleaning and surface care","paragraphs":[
          "Repeated aggressive scouring with steel wool can remove or damage the protective surface layer.",
          "The oxide coating reforms in air, but harsh abrasion repeatedly exposes fresh metal and damages the utensil finish.",
          "Gentler cleaning is better for preserving the surface."
        ]},
        {"title":"Softness and denting","paragraphs":[
          "Plain aluminium is relatively soft.",
          "Cooking utensils and cans can therefore scratch, bend or dent more easily than harder materials."
        ]},
        {"title":"Recycling","paragraphs":[
          "Aluminium can be melted and reused.",
          "Recycling used cans and other aluminium products reduces the amount of new raw material needed."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-3-aluminium-utensils","type":"aluminium-utensils","title":"Aluminium cookware, foil and cans explorer"}],
      "keyPoints":[
        "Aluminium is a good conductor of heat.",
        "Aluminium has low density.",
        "A thin oxide layer protects aluminium from rapid corrosion.",
        "Aluminium cans are light, formable and recyclable.",
        "Aluminium foil is malleable and reflective.",
        "Acidic foods can attack uncoated aluminium surfaces.",
        "Aggressive scouring damages the protective surface.",
        "Plain aluminium can dent and scratch relatively easily."
      ],
      "workedExample":{
        "title":"Cooking acidic food",
        "prompt":"A student wants to simmer tomato sauce for a long time and then store it overnight in a plain uncoated aluminium pot. Explain why this is not ideal.",
        "steps":[
          "Tomatoes are acidic.",
          "Acid can attack the protective aluminium oxide surface.",
          "Prolonged contact can increase reaction between the food and aluminium.",
          "A less reactive or properly coated food-contact surface is preferable for long acidic-food contact."
        ],
        "answer":"Prolonged contact with acidic food can attack the aluminium surface, so the sauce should not be stored for a long period in plain uncoated aluminium."
      },
      "checks":[
        {"prompt":"Why do aluminium pots heat quickly?","answer":"Aluminium is a good conductor of heat.","explanation":"Thermal energy passes readily through the metal."},
        {"prompt":"Why does aluminium resist corrosion in air?","answer":"It forms a protective aluminium oxide layer.","explanation":"The thin oxide coating slows further reaction."},
        {"prompt":"Why should acidic foods not be stored for long in plain aluminium?","answer":"Acid can attack the protective surface and increase aluminium transfer into the food.","explanation":"The reaction is greater during prolonged contact."},
        {"prompt":"Why is aluminium useful for cans?","answer":"It is light, corrosion resistant, easy to shape and recyclable.","explanation":"These properties suit packaging and transport."},
        {"prompt":"What is one disadvantage of plain aluminium utensils?","answer":"They can dent or scratch relatively easily.","explanation":"Aluminium is a comparatively soft metal."}
      ],
      "summary":"Aluminium is useful because it is light, conducts heat well, is formable and protects itself with oxide. Its softness and reaction with some foods must also be considered."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":83,"objectivesBuilt":83}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
