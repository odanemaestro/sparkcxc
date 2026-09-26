begin;

-- CSEC Integrated Science objective 3.6.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-1-household-chemicals',
  'module-3-environment',
  '3.6.1 Uses of Common Household Chemicals',
  'Discuss common household chemicals, their uses, hazard symbols, safe storage, dangerous mixtures and economical use.',
  870,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Identify common household solvents, cleaners and other chemicals.",
        "Explain the uses of bleach, acetone, turpentine, ammonia solution, methylated spirit, antacids and baking powder.",
        "Recognise common hazard symbols.",
        "Explain why bleach must not be mixed with ammonia-based cleaners.",
        "Explain safe storage of household chemicals.",
        "Explain why household chemicals should not be stored in drink bottles.",
        "Discuss economical and environmentally responsible use.",
        "Identify alcohol as the active ingredient in many hand sanitisers."
      ],
      "introduction":"Household chemicals are useful because their chemical properties suit particular tasks. Safe use requires reading labels, recognising hazard symbols, avoiding dangerous mixtures and storing products correctly.",
      "sections":[
        {"title":"Water as a household solvent","paragraphs":[
          "Water is the most common solvent used in the home.",
          "It dissolves many salts, sugars and water-soluble cleaning residues."
        ]},
        {"title":"Bleach","paragraphs":[
          "Household bleach commonly contains sodium hypochlorite.",
          "It is used as a disinfectant and stain remover."
        ]},
        {"title":"Acetone and paint solvents","paragraphs":[
          "Acetone is used in many nail-polish removers because it dissolves nail-polish resins.",
          "Turpentine and similar non-aqueous paint solvents can dissolve oil-based paint from brushes."
        ]},
        {"title":"Ammonia solution and methylated spirit","paragraphs":[
          "Ammonia solution is used for cleaning glass and some hard surfaces because it helps remove grease.",
          "Methylated spirit is an alcohol-based solvent used for cleaning glass and removing some ink or grease stains."
        ]},
        {"title":"Antacids and baking powder","paragraphs":[
          "Antacids contain basic substances that neutralise excess stomach acid and relieve acid indigestion.",
          "Baking powder releases carbon dioxide during baking, causing bubbles to expand and helping cakes rise."
        ]},
        {"title":"Hazard symbols","paragraphs":[
          "The flame pictogram indicates flammable substances.",
          "The corrosion pictogram warns of corrosive substances that can damage skin, eyes or materials.",
          "The skull-and-crossbones pictogram indicates acute toxicity.",
          "The exploding-bomb pictogram warns of explosive hazards.",
          "The exclamation-mark pictogram is used for several harmful or irritant hazards."
        ]},
        {"title":"Never mix bleach and ammonia","paragraphs":[
          "Bleach must never be mixed with ammonia-based cleaners.",
          "The reaction can produce toxic chloramine gases.",
          "Household cleaners should be used only as directed on their labels."
        ]},
        {"title":"Safe storage","paragraphs":[
          "Keep household chemicals in their original labelled containers.",
          "Never store cleaners, solvents or pesticides in soft-drink or water bottles because someone may drink them by mistake.",
          "Keep hazardous products securely closed and away from children, pets, heat and flames as appropriate."
        ]},
        {"title":"Economical use","paragraphs":[
          "Use the recommended amount rather than assuming more product will work better.",
          "Buying suitable products in economical quantities can reduce cost and packaging waste when they can be stored safely and used before deterioration."
        ]},
        {"title":"Environmental choices","paragraphs":[
          "Where suitable, biodegradable products with lower toxicity can reduce environmental impact.",
          "Correct dosing also reduces unnecessary release of chemicals into drains and natural waters."
        ]},
        {"title":"Hand sanitisers","paragraphs":[
          "Many hand sanitisers use alcohol as the active antimicrobial ingredient.",
          "Alcohol-based sanitisers are flammable and should be kept away from flames and high heat."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-1-household-chemicals","type":"household-chemicals","title":"Household chemical uses and safety explorer"}],
      "keyPoints":[
        "Water is the most common household solvent.",
        "Bleach disinfects and removes stains.",
        "Acetone removes nail polish.",
        "Turpentine or similar solvents remove oil-based paint.",
        "Ammonia solution can clean glass and greasy surfaces.",
        "Antacids neutralise excess stomach acid.",
        "Bleach and ammonia-based cleaners must never be mixed.",
        "Hazard symbols communicate chemical risks.",
        "Household chemicals should stay in original labelled containers.",
        "Alcohol-based hand sanitisers are flammable."
      ],
      "workedExample":{
        "title":"Choosing a solvent",
        "prompt":"A paint brush contains oil-based paint that does not wash out with water. Which household solvent from this lesson is suitable?",
        "steps":[
          "Water does not dissolve the oil-based paint effectively.",
          "A non-aqueous solvent is required.",
          "Turpentine or a suitable paint solvent dissolves oil-based paint."
        ],
        "answer":"Turpentine or an appropriate paint solvent."
      },
      "checks":[
        {"prompt":"What is the most common household solvent?","answer":"Water.","explanation":"It dissolves many common substances."},
        {"prompt":"What is bleach commonly used for?","answer":"Disinfection and stain removal.","explanation":"Household bleach commonly contains sodium hypochlorite."},
        {"prompt":"Why must bleach never be mixed with ammonia-based cleaners?","answer":"Toxic chloramine gases can form.","explanation":"The products should be used separately as directed."},
        {"prompt":"Why should chemicals not be stored in soft-drink bottles?","answer":"Someone may mistake them for a drink and swallow them.","explanation":"Original labelled containers reduce accidental poisoning risk."},
        {"prompt":"What does the flame hazard symbol mean?","answer":"Flammable.","explanation":"The substance can catch fire easily."}
      ],
      "summary":"Household chemicals are useful only when selected for the correct task and handled according to their labels and hazard warnings."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":87,"objectivesBuilt":87}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
