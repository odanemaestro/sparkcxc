begin;

-- CSEC Integrated Science objective 3.5.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-5-rusting-conditions',
  'module-3-environment',
  '3.5.5 Conditions for Rusting',
  'Examine the conditions required for rusting and explain how salt, warmth, humidity and acidic pollution affect corrosion.',
  850,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.5","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "State that both oxygen and water are required for rusting.",
        "Write the word equation for rusting.",
        "Explain rusting as oxidation.",
        "Explain why salt speeds rusting.",
        "Explain why warm humid coastal conditions increase corrosion.",
        "Explain how acidic industrial gases can increase corrosion.",
        "Interpret a rusting test-tube experiment.",
        "Explain why an iron nail can gain mass as rust forms.",
        "Distinguish rusting from silver tarnishing."
      ],
      "introduction":"Rusting is the corrosion of iron and steel. It requires both oxygen and water. Salt is not required, but it increases the rate, making coastal and humid tropical environments especially important.",
      "sections":[
        {"title":"Conditions required","paragraphs":[
          "Iron rusts only when both oxygen and water are available.",
          "If oxygen is excluded, rusting is greatly reduced. If water is excluded, rusting is also greatly reduced."
        ]},
        {"title":"Rust equation","paragraphs":[
          "The word equation is iron + oxygen + water → hydrated iron(III) oxide, rust.",
          "Rusting is described as oxidation because iron combines with oxygen."
        ]},
        {"title":"Rusting experiment","paragraphs":[
          "A nail in ordinary water exposed to air rusts because both oxygen and water are present.",
          "A nail in boiled water covered with oil shows little or no rust because boiling removes dissolved oxygen and the oil layer prevents oxygen from re-entering.",
          "A nail kept in dry air shows little or no rust because water is absent.",
          "Together these controls show that rusting requires both oxygen and water."
        ]},
        {"title":"Effect of salt","paragraphs":[
          "Salt water speeds rusting because dissolved ions make the surface moisture a better electrical conductor.",
          "This accelerates the electrochemical reactions involved in corrosion.",
          "The nail in salt water exposed to air therefore rusts faster than a similar nail in fresh water."
        ]},
        {"title":"Warmth and humidity","paragraphs":[
          "Warm conditions generally increase reaction rates.",
          "High humidity keeps a thin layer of moisture on metal surfaces.",
          "Warm humid air therefore favours faster rusting than cold dry conditions."
        ]},
        {"title":"Caribbean coastal conditions","paragraphs":[
          "The Caribbean combines warm temperatures, humidity, rainfall and extensive coastal exposure.",
          "Sea spray deposits salts on vehicles, burglar bars, roofs and other iron or steel objects, accelerating corrosion."
        ]},
        {"title":"Industrial pollution","paragraphs":[
          "Some industrial emissions contain acidic gases such as sulfur dioxide.",
          "When these gases dissolve in atmospheric moisture, the surface water can become more acidic and corrosion can increase."
        ]},
        {"title":"Why the nail can gain mass","paragraphs":[
          "As rust forms, oxygen and water become chemically associated with the iron corrosion products.",
          "The total mass of the nail and attached rust can therefore increase."
        ]},
        {"title":"Rusting and tarnishing","paragraphs":[
          "Rust is the corrosion product of iron.",
          "Silver tarnish is a different chemical process in which silver reacts with sulfur-containing substances in air to form a dark silver sulfide surface."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-5-rusting-conditions","type":"rusting-conditions","title":"Rusting conditions and corrosion-rate explorer"}],
      "keyPoints":[
        "Rusting requires both oxygen and water.",
        "Iron + oxygen + water → hydrated iron(III) oxide.",
        "Rusting is an oxidation process.",
        "Salt speeds rusting.",
        "Warm humid conditions increase corrosion rate.",
        "Sea spray accelerates rusting in coastal areas.",
        "Boiled water covered with oil excludes oxygen.",
        "Dry air lacks the water needed for rusting.",
        "Silver tarnish is not rust."
      ],
      "workedExample":{
        "title":"Interpreting rusting controls",
        "prompt":"One nail is in boiled water covered with oil and another is in dry air. Neither rusts. What do the two results show together?",
        "steps":[
          "The boiled-water tube contains water but effectively excludes oxygen.",
          "The dry-air tube contains oxygen but excludes water.",
          "Neither tube produces normal rusting.",
          "Therefore both oxygen and water are required."
        ],
        "answer":"Rusting requires both oxygen and water."
      },
      "checks":[
        {"prompt":"What two conditions are necessary for iron to rust?","answer":"Oxygen and water.","explanation":"Removing either greatly reduces rusting."},
        {"prompt":"Why does salt water speed rusting?","answer":"Dissolved ions make the water more electrically conductive and accelerate corrosion reactions.","explanation":"Salt is an accelerator, not a required reactant."},
        {"prompt":"Why does a nail in boiled water covered with oil not rust normally?","answer":"Boiling removes dissolved oxygen and the oil prevents oxygen from returning.","explanation":"Water is present but oxygen is effectively excluded."},
        {"prompt":"Why are coastal Caribbean conditions severe for iron and steel?","answer":"Warm humid air and salt from sea spray accelerate corrosion.","explanation":"Moisture and dissolved salts create favourable conditions for rusting."},
        {"prompt":"Why can an iron nail gain mass when it rusts?","answer":"Oxygen and water become incorporated into corrosion products attached to the iron.","explanation":"Material is added chemically to the iron."}
      ],
      "summary":"Rusting needs oxygen and water. Salt, warmth, humidity and acidic conditions make corrosion faster, which is why protection is especially important in tropical coastal environments."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":85,"objectivesBuilt":85}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
