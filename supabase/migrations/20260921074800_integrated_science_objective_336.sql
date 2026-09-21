begin;

-- CSEC Integrated Science objective 3.3.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-6-water-purification',
  'module-3-environment',
  '3.3.6 Water Purification',
  'Investigate methods of purifying water including sedimentation, coagulation, filtration, chlorination, boiling, activated carbon, distillation and reverse osmosis.',
  773,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.6","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain sedimentation and filtration.",
        "Explain the role of alum in coagulation.",
        "Explain chlorination as controlled disinfection.",
        "Explain the use and limits of boiling.",
        "Explain the use and limits of activated carbon.",
        "Explain distillation and identify the condenser.",
        "Define desalination.",
        "Explain reverse osmosis as a desalination method.",
        "Arrange common river-water treatment stages in a sensible order."
      ],
      "introduction":"Water purification removes or controls different types of contaminants. Suspended particles, dissolved salts and microorganisms require different treatment methods, so safe water production normally uses more than one step.",
      "sections":[
        {"title":"Sedimentation","paragraphs":[
          "Sedimentation allows heavier suspended particles to settle out of water.",
          "It is often used before fine filtration."
        ]},
        {"title":"Coagulation with alum","paragraphs":[
          "Very small particles may remain suspended because they do not settle easily.",
          "Alum can be added to help these particles clump together into larger flocs that settle more readily."
        ]},
        {"title":"Filtration","paragraphs":[
          "Sand and other filter media trap suspended solid particles that remain after settling.",
          "Filtration does not by itself remove all dissolved salts or guarantee complete removal of pathogens."
        ]},
        {"title":"Chlorination","paragraphs":[
          "A controlled chlorine dose is used to disinfect water by killing or inactivating many disease-causing microorganisms.",
          "The dose must be controlled because excessive chlorine can produce unpleasant taste, odour or irritation."
        ]},
        {"title":"Boiling","paragraphs":[
          "Boiling is useful for emergency disinfection because high temperature kills many disease-causing microorganisms.",
          "Boiling does not remove dissolved salts, heavy metals or every chemical contaminant.",
          "Emergency users should follow current local public-health instructions for boiling and safe storage."
        ]},
        {"title":"Activated carbon","paragraphs":[
          "Activated carbon has a large surface area and adsorbs many organic compounds responsible for unpleasant tastes and odours.",
          "It is not a complete disinfection method and does not remove every dissolved contaminant."
        ]},
        {"title":"Distillation","paragraphs":[
          "Distillation heats water to produce vapour and then cools the vapour so it condenses.",
          "Dissolved non-volatile salts remain behind while the condensed water is collected.",
          "The condenser is the part of the apparatus where water vapour is cooled back to liquid."
        ]},
        {"title":"Desalination","paragraphs":[
          "Desalination is the removal of dissolved salts from sea water or brackish water to produce fresh water.",
          "Distillation and reverse osmosis are two desalination methods."
        ]},
        {"title":"Reverse osmosis","paragraphs":[
          "Reverse osmosis applies pressure to salty water and forces water molecules through a selective membrane.",
          "Most dissolved salts are retained on the high-salt side while lower-salt product water passes through."
        ]},
        {"title":"Treatment order","paragraphs":[
          "A simplified drinking-water sequence is sedimentation or coagulation, followed by filtration and then disinfection.",
          "Actual treatment plants may include additional stages according to the source water and required standard."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-6-water-purification","type":"water-purification","title":"Water purification and desalination explorer"}],
      "keyPoints":[
        "Alum helps fine suspended particles form larger flocs.",
        "Sedimentation removes settled particles.",
        "Filtration removes suspended solids.",
        "Chlorination disinfects water.",
        "Boiling kills many pathogens but does not remove dissolved salts.",
        "Activated carbon adsorbs many taste- and odour-causing compounds.",
        "Distillation leaves dissolved salts behind.",
        "Desalination removes salt from sea water.",
        "Reverse osmosis uses pressure and a selective membrane.",
        "A condenser cools vapour back to liquid."
      ],
      "workedExample":{
        "title":"Ordering treatment steps",
        "prompt":"River water contains suspended particles and microorganisms. Put sedimentation, filtration and chlorination in a sensible treatment order.",
        "steps":[
          "First allow larger particles to settle.",
          "Next filter out finer suspended material.",
          "Finally disinfect the clarified water."
        ],
        "answer":"Sedimentation → filtration → chlorination."
      },
      "checks":[
        {"prompt":"Why is alum added during treatment?","answer":"To make small suspended particles clump together into larger flocs.","explanation":"Larger flocs settle more readily."},
        {"prompt":"What does filtration remove?","answer":"Suspended solid particles.","explanation":"It does not remove all dissolved salts."},
        {"prompt":"What is desalination?","answer":"Removal of dissolved salts from sea water or brackish water.","explanation":"Distillation and reverse osmosis are examples."},
        {"prompt":"What does the condenser do in distillation?","answer":"It cools water vapour so it condenses to liquid.","explanation":"The collected liquid is the distillate."}
      ],
      "summary":"Safe drinking water is produced by matching treatment methods to the contaminants present and combining physical removal with effective disinfection."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
