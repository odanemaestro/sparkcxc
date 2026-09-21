begin;

-- CSEC Integrated Science objective 3.6.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-2-acids-bases-salts',
  'module-3-environment',
  '3.6.2 Acids, Bases and Salts',
  'Examine acids, bases, alkalis and salts using pH, indicators, neutralisation and common household applications.',
  880,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Use the pH scale to classify acidic, neutral and alkaline solutions.",
        "Use litmus and universal indicator.",
        "Distinguish a base from an alkali.",
        "Identify table salt as a salt.",
        "Write the general neutralisation equation.",
        "Explain practical uses of neutralisation in health, agriculture, sanitation and cooking.",
        "State the products of an acid-carbonate reaction.",
        "Relate acidic pollution to limestone damage.",
        "Correct the outdated vinegar/bicarbonate sting-treatment idea while preserving the acid-base exam concept."
      ],
      "introduction":"Acids and bases have contrasting properties that can be investigated using indicators and the pH scale. Neutralisation and acid reactions have important household, agricultural and environmental applications.",
      "sections":[
        {"title":"The pH scale","paragraphs":[
          "Solutions with pH below 7 are acidic, pH 7 is neutral and solutions with pH above 7 are alkaline.",
          "A solution at pH 2 is strongly acidic in terms of pH.",
          "This does not by itself tell us whether the pure acid is chemically classified as a strong or weak acid, because acid strength and solution concentration are different ideas."
        ]},
        {"title":"Indicators","paragraphs":[
          "Blue litmus turns red in acid.",
          "Red litmus turns blue in an alkali.",
          "Universal indicator is green around pH 7, becomes red-orange-yellow in acidic conditions and blue-purple in increasingly alkaline conditions."
        ]},
        {"title":"Bases and alkalis","paragraphs":[
          "A base is a substance that reacts with and neutralises an acid.",
          "An alkali is a base that dissolves in water.",
          "Baking-soda solution is mildly alkaline, while products such as some oven cleaners are strongly alkaline."
        ]},
        {"title":"Salts","paragraphs":[
          "A salt is an ionic compound formed when the hydrogen of an acid is replaced by a metal ion or another positive ion.",
          "Sodium chloride, common table salt, is a familiar example."
        ]},
        {"title":"Neutralisation","paragraphs":[
          "The general school-level word equation is acid + base → salt + water.",
          "Neutralisation can be used to reduce excessive acidity or alkalinity."
        ]},
        {"title":"Health application","paragraphs":[
          "Antacids contain basic substances that neutralise some excess stomach acid.",
          "This reduces the acidity associated with acid indigestion."
        ]},
        {"title":"Agricultural and sanitation applications","paragraphs":[
          "Farmers may add lime to soil that is too acidic.",
          "Lime raises the pH by neutralising acids in the soil.",
          "Wastewater treatment can also use lime to neutralise acidic waste streams."
        ]},
        {"title":"Cooking application","paragraphs":[
          "Baking soda is a weak base.",
          "Small amounts can neutralise some food acids and reduce sourness in suitable recipes."
        ]},
        {"title":"Acids and carbonates","paragraphs":[
          "The general word equation is acid + carbonate → salt + water + carbon dioxide.",
          "Limestone contains calcium carbonate, so acidic rain or pollution can gradually attack limestone buildings and monuments."
        ]},
        {"title":"Wasp-sting exam note","paragraphs":[
          "Some older school questions use the idea that an alkaline wasp sting could be neutralised with vinegar.",
          "This is useful only as an abstract acid-base example and should not be taught as real first aid.",
          "Current NHS guidance advises against traditional home remedies such as vinegar or bicarbonate of soda for insect stings because they are unlikely to help.",
          "For real bites or stings, follow recognised first-aid guidance rather than attempting kitchen-chemical neutralisation."
        ]},
        {"title":"Household examples","paragraphs":[
          "Vinegar and citrus juice are acidic.",
          "Baking-soda solution is mildly alkaline.",
          "Many oven cleaners are strongly alkaline products.",
          "Toothpaste is often mildly alkaline and helps neutralise acids in the mouth.",
          "Table salt is a salt."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-2-acids-bases-salts","type":"acids-bases-salts","title":"pH, indicators and neutralisation explorer"}],
      "keyPoints":[
        "pH below 7 is acidic; pH 7 is neutral; pH above 7 is alkaline.",
        "Blue litmus turns red in acids.",
        "An alkali is a soluble base.",
        "Acid + base → salt + water.",
        "Acid + carbonate → salt + water + carbon dioxide.",
        "Antacids neutralise excess stomach acid.",
        "Lime can neutralise acidic soil or wastewater.",
        "Sodium chloride is a salt.",
        "Do not teach vinegar or bicarbonate as modern insect-sting first aid."
      ],
      "workedExample":{
        "title":"Classifying an unknown solution",
        "prompt":"Universal indicator turns purple in a household liquid. What does this suggest?",
        "steps":[
          "Purple universal-indicator colour corresponds to a high pH.",
          "A high pH means the solution is alkaline.",
          "Among common household examples, an oven cleaner is a plausible strongly alkaline product."
        ],
        "answer":"The liquid is strongly alkaline."
      },
      "checks":[
        {"prompt":"What pH is neutral?","answer":"pH 7.","explanation":"Universal indicator is green around pH 7."},
        {"prompt":"What is an alkali?","answer":"A base that dissolves in water.","explanation":"All alkalis are bases, but not all bases are soluble."},
        {"prompt":"What are the products of acid reacting with a base?","answer":"A salt and water.","explanation":"This is neutralisation."},
        {"prompt":"What gas is produced when an acid reacts with a carbonate?","answer":"Carbon dioxide.","explanation":"The other products are a salt and water."},
        {"prompt":"Should vinegar be recommended as modern first aid for a wasp sting?","answer":"No.","explanation":"Current first-aid guidance does not recommend vinegar or bicarbonate home remedies for insect stings."}
      ],
      "summary":"Use pH, indicators and reaction patterns to classify household chemicals, while keeping exam examples scientifically and medically up to date."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":88,"objectivesBuilt":88}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
