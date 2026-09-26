begin;

-- CSEC Integrated Science objective 3.3.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-2-hard-water',
  'module-3-environment',
  '3.3.2 Hard and Soft Water',
  'Explain water hardness, its causes, soap-lather testing, temporary and permanent hardness, scale formation and methods of softening water.',
  760,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define hard water using its behaviour with soap.",
        "Identify calcium and magnesium ions as the main causes of hardness.",
        "Distinguish temporary from permanent hardness.",
        "Explain why limestone groundwater can be hard.",
        "Explain how boiling removes temporary hardness.",
        "Explain scale formation in kettles and hot-water systems.",
        "Explain how washing soda removes permanent hardness.",
        "Explain how distillation softens water.",
        "Compare advantages and disadvantages of hard water.",
        "Interpret a soap-lather test."
      ],
      "introduction":"Hard water contains dissolved calcium and magnesium ions. These ions react with soap, reduce lather and can form deposits when water is heated. The treatment needed depends on the compounds causing the hardness.",
      "sections":[
        {"title":"Hard water and soap","paragraphs":[
          "Hard water does not lather easily with soap because calcium and magnesium ions react with soap to form insoluble scum.",
          "For equal volumes of water and equal amounts of soap, the sample producing the most lather is usually the softest."
        ]},
        {"title":"Temporary hardness","paragraphs":[
          "Temporary hardness is commonly caused by dissolved calcium hydrogencarbonate or magnesium hydrogencarbonate.",
          "It is called temporary because boiling can remove it."
        ]},
        {"title":"Permanent hardness","paragraphs":[
          "Permanent hardness is caused by dissolved calcium and magnesium compounds that do not break down simply by boiling, such as sulphates.",
          "Boiling alone therefore does not remove permanent hardness."
        ]},
        {"title":"Limestone areas","paragraphs":[
          "Rainwater absorbs carbon dioxide and becomes slightly acidic.",
          "As this water passes through limestone, it can dissolve calcium compounds.",
          "Groundwater in limestone regions, including parts of Jamaica and Barbados, is therefore often hard."
        ]},
        {"title":"Boiling temporary hard water","paragraphs":[
          "Boiling decomposes calcium hydrogencarbonate and produces insoluble calcium carbonate.",
          "The calcium carbonate precipitates from the water, reducing temporary hardness.",
          "The precipitate can form scale or fur inside kettles, boilers and hot-water pipes."
        ]},
        {"title":"Washing soda","paragraphs":[
          "Washing soda is sodium carbonate.",
          "Carbonate ions react with dissolved calcium and magnesium ions to form insoluble carbonates.",
          "The precipitated solids can then be removed, so washing soda can soften permanently hard water."
        ]},
        {"title":"Distillation","paragraphs":[
          "During distillation, water is boiled and the vapour is condensed separately.",
          "Dissolved calcium and magnesium salts remain behind because they are non-volatile.",
          "The distilled water collected is soft."
        ]},
        {"title":"Advantages of hard water","paragraphs":[
          "Hard water contains calcium and magnesium ions that contribute to dietary mineral intake.",
          "Calcium is important for bones and teeth."
        ]},
        {"title":"Disadvantages of hard water","paragraphs":[
          "Hard water wastes soap by forming scum.",
          "Scale reduces heat transfer in kettles and boilers and can narrow pipes."
        ]},
        {"title":"Soft water and corrosion","paragraphs":[
          "Very soft water can sometimes be more corrosive, especially if it is acidic or poorly buffered.",
          "In unsuitable plumbing systems, corrosive water may dissolve metals such as lead from pipes or fittings.",
          "This is a water-chemistry issue rather than a property of every soft-water supply."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-2-hard-water","type":"hard-water","title":"Hard-water testing and softening explorer"}],
      "keyPoints":[
        "Hard water does not lather easily with soap.",
        "Calcium and magnesium ions cause hardness.",
        "Temporary hardness can be removed by boiling.",
        "Permanent hardness cannot be removed by boiling alone.",
        "Calcium hydrogencarbonate causes temporary hardness.",
        "Washing soda removes permanent hardness.",
        "Distillation leaves dissolved salts behind.",
        "Boiling temporary hard water can produce calcium-carbonate scale.",
        "Limestone groundwater is often hard."
      ],
      "workedExample":{
        "title":"Ordering water samples by hardness",
        "prompt":"Equal soap is added to samples A, B and C. A gives the most lather, B gives less and C gives the least. Order the samples from softest to hardest.",
        "steps":[
          "More lather means fewer calcium and magnesium ions are interfering with soap.",
          "A produces the most lather, so A is the softest.",
          "B is intermediate.",
          "C produces the least lather, so C is the hardest."
        ],
        "answer":"A, B, C."
      },
      "checks":[
        {"prompt":"What causes hardness in water?","answer":"Dissolved calcium and magnesium compounds.","explanation":"The Ca²⁺ and Mg²⁺ ions react with soap."},
        {"prompt":"Which common compound causes temporary hardness?","answer":"Calcium hydrogencarbonate.","explanation":"It breaks down when water is boiled."},
        {"prompt":"How can permanent hardness be removed?","answer":"By adding washing soda or by distillation.","explanation":"Washing soda precipitates calcium and magnesium ions; distillation leaves dissolved salts behind."},
        {"prompt":"Why does scale form in a kettle containing temporary hard water?","answer":"Boiling forms insoluble calcium carbonate.","explanation":"The calcium carbonate deposits on the heated surfaces."},
        {"prompt":"Why is groundwater in limestone areas often hard?","answer":"Slightly acidic rainwater dissolves calcium compounds from limestone.","explanation":"The dissolved calcium ions enter the groundwater."}
      ],
      "summary":"Water hardness is caused mainly by dissolved calcium and magnesium ions. Temporary and permanent hardness require different treatments, so identify the cause before choosing a softening method."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":76,"objectivesBuilt":76}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
