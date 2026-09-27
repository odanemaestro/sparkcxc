begin;

-- CSEC Integrated Science objective 3.6.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-6-cleaning-agent-effects',
  'module-3-environment',
  '3.6.6 Effects of Cleaning Agents on Household Surfaces',
  'Explain how abrasive, acidic, alkaline, oxidising and detergent cleaning agents affect household appliances, utensils, fabrics and coatings.',
  920,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.6","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain abrasive cleaning action.",
        "Explain why abrasives should be avoided on non-stick and polished surfaces.",
        "Explain how weak acids remove calcium-carbonate scale.",
        "Explain how strong alkalis remove grease.",
        "Explain why strong alkalis damage aluminium.",
        "Explain how bleach can affect fabrics and metals.",
        "Explain why acid cleaners damage galvanised zinc coatings.",
        "Discuss rust removers and surface compatibility.",
        "Select cleaning agents according to both soil and surface."
      ],
      "introduction":"Cleaning agents work by different mechanisms, including abrasion, dissolution, oxidation, neutralisation and reaction with fats. A chemical that cleans one surface well can damage another.",
      "sections":[
        {"title":"Abrasive cleaners","paragraphs":[
          "Scouring powders contain abrasive particles that remove dirt by rubbing and scraping the surface.",
          "This mechanical action can remove stubborn stains."
        ]},
        {"title":"Abrasives and delicate surfaces","paragraphs":[
          "Harsh scouring powders should not be used on non-stick pans because they can scratch or remove the non-stick coating.",
          "They should also be avoided on polished silver and other easily scratched surfaces."
        ]},
        {"title":"Removing lime scale","paragraphs":[
          "Lime scale in kettles contains calcium carbonate.",
          "Weak acids such as vinegar can react with calcium carbonate and dissolve the scale.",
          "The reaction produces a calcium salt, water and carbon dioxide."
        ]},
        {"title":"Strong oven cleaners","paragraphs":[
          "Some oven cleaners contain strong alkalis such as sodium hydroxide.",
          "These alkalis react with fats and grease and can convert them into soap-like products that are easier to remove."
        ]},
        {"title":"Aluminium and strong alkalis","paragraphs":[
          "Strong alkalis react with aluminium.",
          "An oven cleaner that is suitable for a compatible oven surface can therefore corrode an aluminium utensil."
        ]},
        {"title":"Bleach on fabrics","paragraphs":[
          "Bleach is a strong oxidising cleaner.",
          "It can remove coloured stains and kill microorganisms, but it can also remove dyes and weaken some textile fibres if used incorrectly."
        ]},
        {"title":"Bleach on metals","paragraphs":[
          "Bleach can attack metals including silver and aluminium.",
          "Silver jewellery can tarnish or corrode, and aluminium surfaces can also be damaged."
        ]},
        {"title":"Acids and galvanised surfaces","paragraphs":[
          "Galvanised metal is protected by a zinc coating.",
          "Acid-based cleaners can react with and dissolve zinc, removing the protective coating and exposing the iron or steel underneath."
        ]},
        {"title":"Rust removers","paragraphs":[
          "Many rust removers contain acids because acids can dissolve iron oxides.",
          "The product must be used according to its instructions because excessive acid exposure can also attack the underlying metal."
        ]},
        {"title":"Choosing a cleaner","paragraphs":[
          "First identify the type of soil, such as grease, mineral scale, rust or food residue.",
          "Then identify the surface material and coating.",
          "Use only cleaners approved for that surface and follow the label for concentration, contact time, ventilation and protective equipment."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-6-cleaning-agent-effects","type":"cleaning-agent-effects","title":"Cleaning agents and household surfaces explorer"}],
      "keyPoints":[
        "Scouring powder cleans by abrasion.",
        "Abrasives can scratch non-stick coatings and polished surfaces.",
        "Vinegar can dissolve calcium-carbonate scale.",
        "Strong oven-cleaner alkalis react with fats.",
        "Strong alkalis corrode aluminium.",
        "Bleach can remove colour and weaken fibres.",
        "Bleach can attack silver and aluminium.",
        "Acids can dissolve galvanised zinc coatings.",
        "Cleaner choice must match both the dirt and the surface."
      ],
      "workedExample":{
        "title":"Choosing a kettle descaler",
        "prompt":"A kettle contains a white calcium-carbonate scale. Explain why vinegar can remove it.",
        "steps":[
          "The scale contains calcium carbonate.",
          "Vinegar is acidic.",
          "Acid reacts with carbonate.",
          "The scale is converted into soluble products while carbon dioxide is released."
        ],
        "answer":"Vinegar removes the scale because its acid reacts with calcium carbonate."
      },
      "checks":[
        {"prompt":"How does scouring powder remove stains?","answer":"By abrasive rubbing action.","explanation":"Hard particles mechanically scrape dirt from the surface."},
        {"prompt":"Why should scouring powder be avoided on non-stick pans?","answer":"It can scratch and remove the coating.","explanation":"The abrasive action damages the surface."},
        {"prompt":"Why does vinegar remove kettle scale?","answer":"It is acidic and reacts with calcium carbonate.","explanation":"The scale is chemically dissolved."},
        {"prompt":"Why should strong oven cleaner not be used on aluminium?","answer":"The strong alkali reacts with and corrodes aluminium.","explanation":"Surface compatibility matters."},
        {"prompt":"Why can bleach damage coloured fabric?","answer":"Its oxidising action can destroy dyes and weaken fibres.","explanation":"The same chemistry that removes stains can damage the material."}
      ],
      "summary":"The safest and most effective cleaner is the one whose chemical or physical action matches the soil without damaging the surface."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":92,"objectivesBuilt":92}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
