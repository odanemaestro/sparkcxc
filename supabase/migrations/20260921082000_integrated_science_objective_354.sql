begin;

-- CSEC Integrated Science objective 3.5.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t5-4-alloys',
  'module-3-environment',
  '3.5.4 Benefits of Alloys',
  'Discuss why alloys are used for household items and relate alloy structure to hardness, strength, corrosion resistance and melting behaviour.',
  840,
  true,
  '{
    "syllabus":{"module":3,"topic":"Materials","objective":"3.5.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define an alloy.",
        "State the compositions of brass, bronze and steel.",
        "Explain why many alloys are harder than pure metals.",
        "Explain why stainless steel is suitable for household items.",
        "Explain why brass is suitable for handles and locks.",
        "Explain why solder is useful for joining metal parts.",
        "Distinguish alloying from electroplating."
      ],
      "introduction":"An alloy is a mixture containing a metal and one or more other elements. Alloying changes the arrangement of atoms and can improve hardness, strength, corrosion resistance or melting behaviour.",
      "sections":[
        {"title":"What is an alloy?","paragraphs":[
          "An alloy is a mixture of a metal with one or more other elements.",
          "Alloys are made to obtain properties that are more useful than those of a pure metal alone."
        ]},
        {"title":"Why many alloys are harder","paragraphs":[
          "Pure metals have regular layers of similar-sized atoms that can slide over each other.",
          "In an alloy, atoms of different sizes disturb this regular arrangement.",
          "The distorted layers cannot slide as easily, so many alloys are harder than the pure metals from which they are made."
        ]},
        {"title":"Brass","paragraphs":[
          "Brass is an alloy of copper and zinc.",
          "It is hard, attractive and resists corrosion, making it suitable for door handles, locks and decorative fittings."
        ]},
        {"title":"Bronze","paragraphs":[
          "Bronze is an alloy of copper and tin.",
          "It is hard and corrosion resistant and is used for medals, statues and some bearings."
        ]},
        {"title":"Steel","paragraphs":[
          "Steel is primarily an alloy of iron and carbon.",
          "Adding carbon makes the material harder and stronger than pure iron."
        ]},
        {"title":"Stainless steel","paragraphs":[
          "Stainless steel is an iron-based alloy containing chromium and usually other elements.",
          "Chromium helps form a protective surface layer that gives strong corrosion resistance.",
          "Its hardness and corrosion resistance make it useful for cutlery, sinks and cookware."
        ]},
        {"title":"Solder","paragraphs":[
          "The syllabus example describes solder as a tin-lead alloy.",
          "Its useful property is a relatively low melting point, so it can melt and form a joint without melting the main metal parts."
        ]},
        {"title":"Alloying and electroplating","paragraphs":[
          "Alloying changes the composition of the material throughout the object.",
          "Electroplating deposits only a thin surface layer of another metal using electricity.",
          "Silver-plating a steel spoon improves its appearance and surface corrosion resistance without turning the steel into an alloy with silver."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t5-4-alloys","type":"alloys","title":"Alloys, structure and household uses explorer"}],
      "keyPoints":[
        "An alloy is a mixture containing a metal and other elements.",
        "Brass = copper + zinc.",
        "Bronze = copper + tin.",
        "Steel = iron + carbon.",
        "Different-sized atoms hinder layer sliding, so many alloys are harder.",
        "Stainless steel is hard and corrosion resistant.",
        "Traditional syllabus solder has a low melting point.",
        "Electroplating coats the surface; alloying changes the bulk material."
      ],
      "workedExample":{
        "title":"Why stainless steel is used for cutlery",
        "prompt":"Explain why stainless steel is more suitable for cutlery than pure iron.",
        "steps":[
          "Cutlery must be hard enough to keep its shape during use.",
          "It is repeatedly exposed to water and food.",
          "Stainless steel contains chromium, which gives strong corrosion resistance.",
          "The alloy is therefore more durable and rust resistant than pure iron."
        ],
        "answer":"Stainless steel is hard and corrosion resistant, so it withstands repeated use and washing."
      },
      "checks":[
        {"prompt":"What is brass made from?","answer":"Copper and zinc.","explanation":"Brass is a copper-zinc alloy."},
        {"prompt":"What is bronze made from?","answer":"Copper and tin.","explanation":"Bronze is a copper-tin alloy."},
        {"prompt":"Why are many alloys harder than pure metals?","answer":"Different-sized atoms disrupt the layers and make sliding more difficult.","explanation":"The irregular arrangement resists deformation."},
        {"prompt":"Why is stainless steel used for cutlery?","answer":"It is hard and strongly resists corrosion.","explanation":"Chromium helps create a protective surface layer."},
        {"prompt":"What property makes solder useful for joining metals?","answer":"A relatively low melting point.","explanation":"It can melt to form a joint without melting the main parts."}
      ],
      "summary":"Alloying changes the structure and properties of metals so household products can be harder, stronger, more corrosion resistant or easier to join."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":84,"objectivesBuilt":84}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
