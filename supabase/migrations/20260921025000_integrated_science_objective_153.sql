begin;

-- CSEC Integrated Science objective 1.5.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-3-excretion-flowering-plants',
  'module-1-organisms-life-processes',
  '1.5.3 Excretion in Flowering Plants',
  'Identify how flowering plants remove gaseous wastes, excess water and stored waste products through stomata and tissue shedding.',
  230,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify oxygen, carbon dioxide and water vapour as substances flowering plants may remove.",
        "Explain how stomata provide a route for gaseous wastes and excess water vapour.",
        "Compare gaseous outputs in bright light and darkness.",
        "Explain how waste substances stored in leaves or bark can be removed when those tissues are shed.",
        "Explain why flowering plants do not require specialised excretory organs like kidneys."
      ],
      "introduction":"Flowering plants do not have specialised excretory organs such as kidneys. They produce fewer toxic metabolic wastes than animals, can reuse some products, and remove other substances by diffusion, transpiration or storage in tissues that are later shed.",
      "sections":[
        {
          "title":"Gases leave through stomata",
          "paragraphs":[
            "Stomata are pores in the leaf epidermis controlled by guard cells. They provide a route for gas exchange between the leaf and the surrounding air.",
            "Excess oxygen produced during photosynthesis can diffuse out through stomata. Carbon dioxide produced by respiration can also diffuse out when it is not being used rapidly by photosynthesis."
          ]
        },
        {
          "title":"Water vapour",
          "paragraphs":[
            "Water evaporates from moist cell surfaces inside the leaf and diffuses out through stomata as water vapour. This loss of water vapour is part of transpiration.",
            "When water loss exceeds the amount needed by the plant, the excess water is therefore removed through the leaves."
          ]
        },
        {
          "title":"Bright light and darkness",
          "paragraphs":[
            "In bright light, photosynthesis usually occurs faster than respiration in green leaves. More oxygen is produced than the plant needs for respiration, so excess oxygen diffuses out.",
            "At night, photosynthesis stops because light is unavailable, but respiration continues. Carbon dioxide produced by respiration is therefore released."
          ]
        },
        {
          "title":"Storage in leaves and bark",
          "paragraphs":[
            "Some waste products are stored in plant tissues such as old leaves or bark. Examples include tannins and other compounds that the plant does not need to keep in active tissues.",
            "When old leaves fall or bark peels away, the stored waste leaves the plant with the shed tissue."
          ]
        },
        {
          "title":"Why no specialised excretory organs are needed",
          "paragraphs":[
            "Plants can reuse several metabolic products. Carbon dioxide from respiration can be used in photosynthesis, while oxygen from photosynthesis can be used in respiration.",
            "Many plant wastes are produced relatively slowly, can diffuse directly through stomata or can be isolated safely in tissues. This reduces the need for a specialised excretory system."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-3-plant-excretion",
          "type":"plant-excretion",
          "title":"Excretion in flowering plants"
        }
      ],
      "keyPoints":[
        "Excess oxygen from photosynthesis can diffuse out through stomata.",
        "Carbon dioxide from respiration is released when it is not being used by photosynthesis.",
        "Water vapour leaves mainly through stomata during transpiration.",
        "At night respiration continues while photosynthesis stops, so carbon dioxide is released.",
        "Some wastes are stored in leaves or bark and removed when those tissues are shed.",
        "Plants can reuse some metabolic products and therefore do not need kidney-like excretory organs."
      ],
      "workedExample":{
        "title":"Comparing a leaf in daylight and darkness",
        "prompt":"A green leaf is kept in bright sunlight and another similar leaf is kept in darkness. State the main gaseous waste expected from each and explain the difference.",
        "steps":[
          "In bright light, both photosynthesis and respiration occur.",
          "Photosynthesis is usually faster, so more oxygen is produced than is needed for respiration.",
          "In darkness, photosynthesis stops but respiration continues.",
          "Respiration produces carbon dioxide."
        ],
        "answer":"The leaf in bright light mainly releases excess oxygen, while the leaf in darkness releases carbon dioxide because respiration continues but photosynthesis stops."
      },
      "checks":[
        {
          "prompt":"Through which structures do leaves mainly lose excess water vapour?",
          "answer":"Through stomata.",
          "explanation":"Water vapour diffuses from internal leaf air spaces through the stomatal pores."
        },
        {
          "prompt":"Why can a green plant release carbon dioxide at night?",
          "answer":"Respiration continues at night while photosynthesis stops.",
          "explanation":"Without photosynthesis using the carbon dioxide, the gas diffuses out."
        },
        {
          "prompt":"How can a plant remove wastes stored in old leaves?",
          "answer":"The wastes leave the plant when the old leaves are shed.",
          "explanation":"Some waste compounds are isolated in tissues that are later discarded."
        },
        {
          "prompt":"Why do plants not need specialised excretory organs like kidneys?",
          "answer":"They produce fewer toxic wastes, reuse some metabolic products, and can remove other wastes by diffusion or tissue shedding.",
          "explanation":"Their waste-removal needs differ from those of animals."
        }
      ],
      "summary":"Flowering plants excrete by using existing structures rather than specialised organs. Stomata release gases and water vapour, while some wastes are stored in leaves or bark and removed when those tissues are shed."
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
  || '{"topicsBuilt":23,"objectivesBuilt":23}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
