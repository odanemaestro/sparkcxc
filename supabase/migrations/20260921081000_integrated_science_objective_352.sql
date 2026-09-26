begin;

-- CSEC Integrated Science objective 3.5.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-2-metal-reactivity',
  'module-3-environment',
  '3.5.2 Reactivity of Metals',
  'Compare the reactivity of metals using the reactivity series, reactions with dilute acids, displacement reactions and protective oxide layers.',
  820,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Use a simplified metal reactivity series.",
        "Compare aluminium, zinc, iron, tin, copper, silver and gold.",
        "State that potassium is highly reactive.",
        "Explain why zinc and iron react with dilute hydrochloric acid.",
        "Write word equations for metal-acid reactions.",
        "Explain why copper and silver do not release hydrogen from dilute hydrochloric acid.",
        "Explain displacement reactions using relative reactivity.",
        "Explain why gold and silver can occur uncombined in nature.",
        "Explain why aluminium may react slowly at first despite being reactive."
      ],
      "introduction":"Metals differ in how readily they react. The reactivity series provides a useful order for predicting reactions with acids and whether one metal can displace another from a compound.",
      "sections":[
        {"title":"The reactivity series","paragraphs":[
          "A simplified order from more reactive to less reactive is potassium, calcium, magnesium, aluminium, zinc, iron, tin, lead, hydrogen, copper, silver and gold.",
          "Hydrogen is included as a reference point even though it is not a metal."
        ]},
        {"title":"Comparing selected metals","paragraphs":[
          "For the metals emphasised in the question bank, the decreasing order is aluminium > zinc > iron > tin > copper > silver.",
          "Gold is even less reactive than silver, while potassium is near the top of the reactivity series."
        ]},
        {"title":"Metals and dilute acids","paragraphs":[
          "A metal above hydrogen in the reactivity series can usually react with a dilute acid to form a salt and hydrogen gas.",
          "The general word equation is metal + acid → salt + hydrogen."
        ]},
        {"title":"Zinc and hydrochloric acid","paragraphs":[
          "Zinc reacts with dilute hydrochloric acid and releases hydrogen gas.",
          "The word equation is zinc + hydrochloric acid → zinc chloride + hydrogen.",
          "Zinc reacts more vigorously than iron with dilute hydrochloric acid in the bank comparison."
        ]},
        {"title":"Iron and hydrochloric acid","paragraphs":[
          "Iron is above hydrogen and reacts with dilute hydrochloric acid.",
          "The word equation is iron + hydrochloric acid → iron chloride + hydrogen."
        ]},
        {"title":"Copper and silver","paragraphs":[
          "Copper and silver are below hydrogen in the simplified reactivity series.",
          "They do not displace hydrogen from dilute hydrochloric acid under normal classroom conditions."
        ]},
        {"title":"Zinc and sulphuric acid","paragraphs":[
          "Zinc also reacts with dilute sulphuric acid.",
          "The word equation is zinc + sulphuric acid → zinc sulphate + hydrogen."
        ]},
        {"title":"Displacement","paragraphs":[
          "A more reactive metal can displace a less reactive metal from a solution of its compound.",
          "Iron is more reactive than copper, so an iron nail placed in copper(II) sulfate solution becomes coated with copper."
        ]},
        {"title":"Gold and silver in nature","paragraphs":[
          "Very unreactive metals do not form compounds readily.",
          "Gold and, less commonly, silver can therefore occur in the native, uncombined state."
        ]},
        {"title":"Aluminium and its oxide layer","paragraphs":[
          "Aluminium is high in the reactivity series but quickly forms a thin, tough aluminium oxide coating in air.",
          "This protective layer reduces further reaction and can make aluminium appear less reactive than it really is.",
          "If the oxide layer is removed, the underlying aluminium can react more readily."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-2-metal-reactivity","type":"metal-reactivity","title":"Metal reactivity and displacement explorer"}],
      "keyPoints":[
        "Potassium is very reactive.",
        "Aluminium > zinc > iron > tin > copper > silver.",
        "Metals above hydrogen can usually release hydrogen from dilute acids.",
        "Zinc + hydrochloric acid → zinc chloride + hydrogen.",
        "Iron + hydrochloric acid → iron chloride + hydrogen.",
        "Zinc + sulphuric acid → zinc sulphate + hydrogen.",
        "Copper and silver do not react with dilute hydrochloric acid in the standard classroom comparison.",
        "Iron displaces copper from copper(II) sulfate solution.",
        "Gold and silver are relatively unreactive.",
        "Aluminium is protected by an oxide layer."
      ],
      "workedExample":{
        "title":"Predicting a displacement reaction",
        "prompt":"An iron nail is placed in copper(II) sulfate solution. Explain what happens.",
        "steps":[
          "Iron is above copper in the reactivity series.",
          "Iron is therefore more reactive than copper.",
          "The iron atoms form ions while copper ions gain electrons and form copper metal.",
          "Copper deposits on the nail."
        ],
        "answer":"Iron displaces copper from the solution because iron is more reactive than copper."
      },
      "checks":[
        {"prompt":"What gas is produced when zinc reacts with dilute hydrochloric acid?","answer":"Hydrogen.","explanation":"The products are zinc chloride and hydrogen."},
        {"prompt":"Which is less reactive: zinc or silver?","answer":"Silver.","explanation":"Silver is much lower in the reactivity series."},
        {"prompt":"Why does copper not produce hydrogen with dilute hydrochloric acid?","answer":"Copper is below hydrogen in the reactivity series.","explanation":"It cannot displace hydrogen from the acid."},
        {"prompt":"Why can gold occur uncombined in nature?","answer":"Gold is very unreactive.","explanation":"It does not readily form compounds."},
        {"prompt":"Why can aluminium initially appear unreactive?","answer":"A protective aluminium oxide layer covers the surface.","explanation":"The layer prevents rapid attack of the underlying metal."}
      ],
      "summary":"Use the reactivity series to predict acid reactions and displacement. Remember that surface coatings, especially aluminium oxide, can affect how quickly a reaction appears to begin."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":82,"objectivesBuilt":82}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
