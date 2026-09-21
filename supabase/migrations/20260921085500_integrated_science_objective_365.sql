begin;

-- CSEC Integrated Science objective 3.6.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t6-5-separation-techniques',
  'module-3-environment',
  '3.6.5 Separation Techniques',
  'Determine suitable separation techniques by using differences in solubility, particle size, boiling point, density and movement.',
  910,
  true,
  '{
    "syllabus":{"module":3,"topic":"Household Chemicals","objective":"3.6.5","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Choose filtration for insoluble solid-liquid mixtures.",
        "Choose evaporation to recover a dissolved solid.",
        "Use crystallisation to obtain crystals from solution.",
        "Use distillation to recover a solvent or separate liquids with different boiling points.",
        "Use chromatography to separate dissolved coloured substances.",
        "Use a separating funnel for immiscible liquids.",
        "Separate a sand-salt mixture in the correct sequence.",
        "Explain household and Caribbean examples of each technique."
      ],
      "introduction":"Mixtures are separated by exploiting physical differences between their components. The correct technique depends on properties such as solubility, particle size, boiling point and whether liquids mix.",
      "sections":[
        {"title":"Filtration","paragraphs":[
          "Filtration separates an insoluble solid from a liquid.",
          "The liquid passes through the filter as the filtrate while the solid remains as residue.",
          "Straining rice or pasta is a familiar large-scale example of the same basic principle."
        ]},
        {"title":"Evaporation","paragraphs":[
          "Evaporation is useful when a dissolved solid is required and the solvent does not need to be collected.",
          "Salt is obtained from sea water in salt ponds when water evaporates and leaves the dissolved salts behind."
        ]},
        {"title":"Crystallisation","paragraphs":[
          "Crystallisation is used to obtain crystals from a solution.",
          "The solution is heated to remove some solvent and make it more concentrated, then allowed to cool slowly.",
          "Slow cooling allows crystals to form rather than boiling the solution completely dry."
        ]},
        {"title":"Distillation","paragraphs":[
          "Distillation involves boiling a component, carrying the vapour away and condensing it back to liquid.",
          "It can recover pure water from a solution such as ink by leaving non-volatile dyes behind.",
          "Distillation is also used in rum production because ethanol-rich vapour forms at a lower temperature than water-rich vapour, allowing separation by volatility."
        ]},
        {"title":"Chromatography","paragraphs":[
          "Chromatography separates dissolved substances because they move at different rates through a stationary material while carried by a mobile solvent.",
          "It can separate and compare dyes in food colouring or ink.",
          "Spots at the same height under the same conditions can suggest the same dye is present."
        ]},
        {"title":"Separating funnel","paragraphs":[
          "A separating funnel is used for immiscible liquids such as oil and water.",
          "The liquids form layers and the denser lower layer can be drained through the tap."
        ]},
        {"title":"Separating sand and salt","paragraphs":[
          "First add water and stir so the salt dissolves but the sand does not.",
          "Filter the mixture to remove the sand.",
          "Then evaporate or crystallise the filtrate to recover the salt."
        ]},
        {"title":"Solvents and stains","paragraphs":[
          "Some stains require a solvent that can dissolve them.",
          "Oil-based paint can be removed with turpentine or a suitable paint solvent rather than water."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t6-5-separation-techniques","type":"separation-techniques","title":"Mixture separation technique explorer"}],
      "keyPoints":[
        "Filtration separates an insoluble solid from a liquid.",
        "Evaporation can recover salt from salt water.",
        "Crystallisation forms crystals from a concentrated solution.",
        "Distillation recovers a liquid by vaporising and condensing it.",
        "Chromatography separates dissolved substances.",
        "A separating funnel separates immiscible liquids.",
        "Sand + salt: dissolve, filter, then evaporate or crystallise.",
        "Oil paint can require a non-aqueous solvent."
      ],
      "workedExample":{
        "title":"Separating sand and salt",
        "prompt":"Describe how to separate a mixture of sand and salt and recover both substances.",
        "steps":[
          "Add water and stir so the salt dissolves.",
          "Filter the mixture. Sand remains as residue.",
          "Wash and dry the sand if required.",
          "Evaporate some water from the filtrate and crystallise or evaporate to recover the salt."
        ],
        "answer":"Dissolve the salt in water, filter off the sand, then remove the water from the filtrate to recover salt."
      },
      "checks":[
        {"prompt":"How can salt be obtained from salt water if the water is not needed?","answer":"Evaporation.","explanation":"Water evaporates and salt remains."},
        {"prompt":"Which technique separates oil and water?","answer":"A separating funnel.","explanation":"The immiscible liquids form separate layers."},
        {"prompt":"Which technique separates dyes in food colouring?","answer":"Chromatography.","explanation":"The dyes move at different rates."},
        {"prompt":"How can pure water be recovered from ink?","answer":"Distillation.","explanation":"Water vaporises and condenses while the dyes remain behind."},
        {"prompt":"How should crystals be obtained from a solution?","answer":"Concentrate the solution, then cool it slowly.","explanation":"Slow cooling promotes crystal formation."}
      ],
      "summary":"Choose a separation method from the physical property that differs between components: size, solubility, boiling point, immiscibility or movement through a stationary phase."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":91,"objectivesBuilt":91}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
