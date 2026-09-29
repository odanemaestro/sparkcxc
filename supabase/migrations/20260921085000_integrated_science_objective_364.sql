begin;

-- CSEC Integrated Science objective 3.6.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-4-mixtures',
  'module-3-environment',
  '3.6.4 Properties of Mixtures',
  'Examine solutions, suspensions and colloids using solute-solvent ideas, settling, filtration behaviour and light scattering.',
  900,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define solute, solvent and solution.",
        "Distinguish aqueous from non-aqueous solutions.",
        "Compare solutions, suspensions and colloids.",
        "Explain why suspension particles settle.",
        "Explain why some medicines must be shaken.",
        "Identify mayonnaise and milk as colloids.",
        "Explain the Tyndall effect.",
        "Classify familiar household mixtures."
      ],
      "introduction":"Mixtures differ according to particle size, whether components dissolve, whether particles settle and how the mixture interacts with light.",
      "sections":[
        {"title":"Solutions","paragraphs":[
          "A solution forms when a solute dissolves evenly in a solvent.",
          "Sugar is the solute in sugar solution and water is the solvent.",
          "A true solution is homogeneous and dissolved particles do not settle on standing."
        ]},
        {"title":"Aqueous and non-aqueous solutions","paragraphs":[
          "An aqueous solution uses water as the solvent.",
          "Salt water and sugar water are aqueous solutions.",
          "A non-aqueous solution uses a different solvent. Iodine dissolved in alcohol is an example."
        ]},
        {"title":"Suspensions","paragraphs":[
          "A suspension contains relatively large particles dispersed in a liquid.",
          "The particles are not dissolved, settle on standing and can usually be removed by filtration.",
          "Muddy water and chalk powder in water are suspensions."
        ]},
        {"title":"Medicines that require shaking","paragraphs":[
          "Some liquid medicines are suspensions.",
          "The solid particles settle during storage, so shaking redistributes them before a dose is measured."
        ]},
        {"title":"Colloids","paragraphs":[
          "A colloid contains dispersed particles that are larger than dissolved particles but small enough to remain suspended for long periods.",
          "Milk is a colloid containing dispersed fat droplets.",
          "Mayonnaise is an emulsion, a type of colloid, in which tiny droplets are stabilised in another liquid."
        ]},
        {"title":"Tyndall effect","paragraphs":[
          "Colloid particles scatter light.",
          "When a beam passes through a colloid, its path can become visible because of this scattering.",
          "This is called the Tyndall effect."
        ]},
        {"title":"Household examples","paragraphs":[
          "Vinegar is a solution.",
          "Muddy water is a suspension.",
          "Mayonnaise and milk are colloids.",
          "A medicine labelled ''shake well'' is often a suspension."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-4-mixtures","type":"mixtures","title":"Solutions, suspensions and colloids explorer"}],
      "keyPoints":[
        "Solute + solvent = solution.",
        "Aqueous means water is the solvent.",
        "Suspension particles settle and can be filtered.",
        "Colloid particles remain dispersed and scatter light.",
        "Mayonnaise and milk are colloids.",
        "Muddy water is a suspension.",
        "Vinegar is a solution.",
        "Some medicines must be shaken because particles settle."
      ],
      "workedExample":{
        "title":"Classifying muddy water",
        "prompt":"Explain why muddy water is a suspension rather than a true solution.",
        "steps":[
          "Mud particles do not dissolve in water.",
          "They are large enough to remain as separate solid particles.",
          "They settle if the mixture stands.",
          "They can be separated by filtration."
        ],
        "answer":"Muddy water is a suspension because the mud is not dissolved, settles on standing and can be filtered."
      },
      "checks":[
        {"prompt":"What is the solute in sugar water?","answer":"Sugar.","explanation":"The solute is the substance that dissolves."},
        {"prompt":"What does aqueous mean?","answer":"Water is the solvent.","explanation":"Aqueous solutions are water-based."},
        {"prompt":"Why must some medicines be shaken?","answer":"They are suspensions and the particles settle on standing.","explanation":"Shaking redistributes the particles."},
        {"prompt":"What is a colloid?","answer":"A mixture with very small dispersed particles that do not settle readily.","explanation":"The particles can scatter light."},
        {"prompt":"What causes the Tyndall effect?","answer":"Scattering of light by colloid particles.","explanation":"The scattered light makes the beam visible."}
      ],
      "summary":"Classify mixtures by whether particles dissolve, settle, filter out or scatter light. These differences determine both appearance and separation method."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":90,"objectivesBuilt":90}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
