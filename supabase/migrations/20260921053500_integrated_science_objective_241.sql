begin;

-- CSEC Integrated Science objective 2.4.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-1-electrical-conductors',
  'module-2-energy',
  '2.4.1 Electrical Conductors',
  'Examine electrical conductors, insulators and semiconductors and relate their properties to wiring, tools, overhead cables and water conductivity.',
  560,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish conductors, insulators and semiconductors.",
        "Identify metals such as copper, aluminium and iron as electrical conductors.",
        "Identify graphite as a conducting non-metal.",
        "Explain why plastic and rubber are used as electrical insulators.",
        "Describe silicon as a semiconductor.",
        "Explain why aluminium is used for long overhead power cables.",
        "Explain why tap water conducts electricity better than pure water.",
        "Interpret a simple circuit test for conductivity."
      ],
      "introduction":"Materials differ greatly in how readily electric charge moves through them. Conductors allow current to flow easily, insulators strongly restrict current, and semiconductors have electrical properties between these groups that can be controlled in electronic devices.",
      "sections":[
        {
          "title":"Conductors",
          "paragraphs":[
            "Metals such as copper, aluminium and iron are good conductors because electric charge can move readily through them.",
            "Copper is widely used in electrical wiring because it conducts well and can be formed into flexible wires.",
            "Graphite is an important exception to the simple statement that non-metals are insulators. Graphite is a non-metal that conducts electricity."
          ]
        },
        {
          "title":"Insulators",
          "paragraphs":[
            "Dry rubber, plastic, glass and dry wood are poor electrical conductors and are used as insulators.",
            "Electrical wires are commonly made with a conducting metal core covered by plastic insulation. The insulation helps prevent electric shock and unwanted contact between conductors.",
            "Electricians'' screwdrivers and other insulated tools use appropriate insulating handles to reduce the risk of current passing through the user."
          ]
        },
        {
          "title":"Semiconductors",
          "paragraphs":[
            "A semiconductor conducts electricity better than an insulator but less freely than a typical metal.",
            "Silicon and germanium are examples. Their conductivity can be controlled by composition, temperature and applied electrical conditions, making them useful in diodes, transistors and computer chips."
          ]
        },
        {
          "title":"Testing conductivity",
          "paragraphs":[
            "A simple test circuit contains a cell, lamp, wires and a gap. The test material is placed across the gap.",
            "If the material completes a sufficiently conducting path, current flows and the lamp lights. A plastic ruler or rubber band leaves the lamp off, while an iron nail, aluminium foil, copper or graphite allows current to flow."
          ]
        },
        {
          "title":"Why aluminium is used overhead",
          "paragraphs":[
            "Aluminium is a good conductor and has a much lower density than copper.",
            "Its lower mass is useful for long overhead cable spans because support structures carry less weight."
          ]
        },
        {
          "title":"Water and dissolved ions",
          "paragraphs":[
            "Very pure water is a poor electrical conductor because it contains very few ions.",
            "Tap water and natural water contain dissolved salts and other ionic substances. These dissolved ions move through the water and carry electric charge.",
            "This is one reason electricity should be kept away from wet hands and wet environments unless equipment is specifically designed and protected for those conditions."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-1-electrical-conductors",
          "type":"electrical-conductors",
          "title":"Electrical materials and conductivity explorer"
        }
      ],
      "keyPoints":[
        "Copper, aluminium and iron are electrical conductors.",
        "Graphite is a conducting non-metal.",
        "Plastic and dry rubber are electrical insulators.",
        "Silicon is a semiconductor.",
        "Copper conducts well and plastic insulation protects users.",
        "Aluminium is useful for overhead power cables because it conducts and has low density.",
        "Pure water is a poor conductor, while dissolved ions make tap water conduct more readily."
      ],
      "workedExample":{
        "title":"Testing an unknown material",
        "prompt":"A student places an unknown strip across the gap in a cell-and-lamp circuit. The lamp lights. What conclusion can be drawn?",
        "steps":[
          "The lamp only lights if the circuit has a continuous conducting path.",
          "The unknown strip is completing the path.",
          "Electric current is therefore passing through the strip."
        ],
        "answer":"The strip conducts electricity under the conditions of the test."
      },
      "checks":[
        {
          "prompt":"Why is copper used in electrical wires?",
          "answer":"It is a good electrical conductor.",
          "explanation":"Mobile charge carriers allow current to flow readily."
        },
        {
          "prompt":"Why are electrical wires covered with plastic?",
          "answer":"Plastic is an electrical insulator.",
          "explanation":"It helps prevent electric shock and short circuits."
        },
        {
          "prompt":"Why is graphite important when classifying conductors?",
          "answer":"It is a non-metal that conducts electricity.",
          "explanation":"Not every conductor is a metal."
        },
        {
          "prompt":"What is a semiconductor?",
          "answer":"A material that conducts electricity better than an insulator but less freely than a typical metal, with conductivity that can be controlled.",
          "explanation":"Silicon is a common example."
        },
        {
          "prompt":"Why does tap water conduct better than pure water?",
          "answer":"Tap water contains dissolved ions that carry electric charge.",
          "explanation":"Pure water contains very few charge-carrying ions."
        }
      ],
      "summary":"Choose electrical materials by function. Conducting cores carry current, insulating covers restrict unwanted current, and semiconductors provide controllable conduction for electronic devices."
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
  || '{"topicsBuilt":56,"objectivesBuilt":56}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
