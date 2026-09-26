begin;

-- CSEC Integrated Science objective 3.5.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-6-corrosion-protection',
  'module-3-environment',
  '3.5.6 Preventing Rusting and Tarnishing',
  'Discuss barrier methods, galvanising, drying, lubrication, electroplating and storage methods used to reduce rusting and tarnishing.',
  860,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.6","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain how painting and plastic coating prevent rusting.",
        "Explain how oil and grease protect moving metal parts.",
        "Explain how silica gel reduces rusting during storage.",
        "Define galvanising.",
        "Explain sacrificial protection by zinc.",
        "Define electroplating.",
        "Explain why chromium, silver and tin coatings are useful.",
        "Explain how airtight storage reduces silver tarnish.",
        "Explain how clear lacquer reduces brass tarnish."
      ],
      "introduction":"Corrosion can be slowed by stopping oxygen and water from reaching a metal, keeping the environment dry, applying corrosion-resistant coatings or using a more reactive metal to protect iron sacrificially.",
      "sections":[
        {"title":"Barrier methods","paragraphs":[
          "Painting and plastic coating form physical barriers between iron or steel and the surrounding air and water.",
          "If the barrier is complete, the conditions needed for rusting cannot reach the metal surface.",
          "Scratches and chips should be repaired because exposed iron can rust."
        ]},
        {"title":"Oil and grease","paragraphs":[
          "Oil and grease form water-repelling barriers that help keep oxygen and moisture away from metal surfaces.",
          "On moving parts such as bicycle chains, they also reduce friction."
        ]},
        {"title":"Silica gel and dry storage","paragraphs":[
          "Silica gel is a desiccant that absorbs moisture from enclosed air.",
          "Keeping tools in a dry environment removes one of the conditions required for rusting."
        ]},
        {"title":"Galvanising","paragraphs":[
          "Galvanising is the coating of iron or steel with zinc.",
          "The zinc coating acts as a physical barrier to water and oxygen.",
          "Zinc is more reactive than iron, so if the coating is scratched the zinc can corrode preferentially and continue protecting nearby iron.",
          "This extra protection is called sacrificial protection."
        ]},
        {"title":"Electroplating","paragraphs":[
          "Electroplating uses an electric current to deposit a thin layer of another metal onto an object.",
          "The coating can improve appearance and corrosion resistance.",
          "Chromium-plated surfaces are shiny and corrosion resistant, while silver plating gives an attractive protective surface."
        ]},
        {"title":"Tin-coated steel","paragraphs":[
          "Food cans are commonly made from steel coated with a thin layer of tin.",
          "The tin layer separates the steel from moisture and the food contents while the coating remains intact."
        ]},
        {"title":"Silver tarnish prevention","paragraphs":[
          "Silver tarnish forms when silver reacts with sulfur-containing substances in air.",
          "Airtight bags or containers reduce contact with these substances and therefore slow tarnish formation."
        ]},
        {"title":"Brass tarnish prevention","paragraphs":[
          "Clear lacquer provides a transparent barrier over polished brass.",
          "The coating reduces exposure to air and moisture while preserving the visible finish."
        ]},
        {"title":"Choosing the correct method","paragraphs":[
          "Paint is suitable for gates and burglar bars, galvanising is useful for roofing sheets, and oil or grease suits moving parts such as bicycle chains.",
          "Silica gel is useful in enclosed storage, tin coating is used on food cans, and electroplating is useful when both appearance and surface protection matter."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-6-corrosion-protection","type":"corrosion-protection","title":"Rust and tarnish prevention explorer"}],
      "keyPoints":[
        "Paint and plastic coatings keep out air and water.",
        "Oil and grease protect against corrosion and reduce friction.",
        "Silica gel removes moisture.",
        "Galvanising means coating iron or steel with zinc.",
        "Zinc can give sacrificial protection even when scratched.",
        "Electroplating deposits a thin metal layer using electricity.",
        "Food cans use tin-coated steel.",
        "Airtight storage slows silver tarnish.",
        "Clear lacquer can reduce brass tarnish."
      ],
      "workedExample":{
        "title":"Why galvanising protects a scratched roof sheet",
        "prompt":"A galvanised iron roof sheet is scratched so a small area of iron is exposed. Explain why the iron may still be protected.",
        "steps":[
          "The roof sheet is coated with zinc.",
          "Zinc is more reactive than iron.",
          "Near the scratch, zinc corrodes preferentially.",
          "The zinc therefore protects the exposed iron sacrificially."
        ],
        "answer":"The zinc coating provides sacrificial protection because zinc is more reactive than iron."
      },
      "checks":[
        {"prompt":"Why does painting prevent rusting?","answer":"Paint blocks oxygen and water from reaching the iron.","explanation":"It is a barrier method."},
        {"prompt":"What is galvanising?","answer":"Coating iron or steel with zinc.","explanation":"The zinc acts as both a barrier and a sacrificial metal."},
        {"prompt":"What is electroplating?","answer":"Depositing a thin metal coating using electricity.","explanation":"The surface properties change without replacing the whole object."},
        {"prompt":"Why are bicycle chains oiled?","answer":"Oil keeps out water and oxygen and also reduces friction.","explanation":"It gives both corrosion protection and lubrication."},
        {"prompt":"How can silver cutlery be stored to reduce tarnishing?","answer":"In airtight bags or containers.","explanation":"This reduces contact with sulfur-containing substances in air."}
      ],
      "summary":"Corrosion prevention works by removing required conditions, adding barriers, applying resistant coatings or using sacrificial metals. The correct method depends on how and where the object is used."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":86,"objectivesBuilt":86}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
