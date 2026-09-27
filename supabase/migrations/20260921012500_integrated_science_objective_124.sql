begin;

-- CSEC Integrated Science objective 1.2.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-4-growth-patterns-plants',
  'module-1-organisms-life-processes',
  '1.2.4 Growth Patterns in Plants',
  'Analyse seed germination, seedling growth and changes in plant mass using experiments, tables and graphs.',
  60,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain the conditions needed for seed germination.",
        "Interpret tables and graphs showing changes in plant height and dry mass.",
        "Relate early seedling growth to the use of stored food and later growth to photosynthesis.",
        "Plan a simple investigation into the effect of one environmental factor on germination."
      ],
      "introduction":"Plant growth is measured as a permanent increase in size or dry mass. During germination and early seedling growth, the pattern changes as stored food is used, roots and shoots emerge and the first leaves begin to photosynthesise.",
      "sections":[
        {
          "title":"Conditions for germination",
          "paragraphs":[
            "Most seeds require water, oxygen and a suitable temperature. Light is not a general requirement because the embryo initially uses stored food."
          ],
          "bullets":[
            "Water softens the testa, rehydrates tissues and activates enzymes that break down stored food.",
            "Oxygen is needed for aerobic respiration, which releases energy for growth.",
            "A suitable temperature allows enzymes to work effectively. Temperatures that are too low slow enzyme activity, while excessive heat may damage enzymes."
          ]
        },
        {
          "title":"The first stages of growth",
          "paragraphs":[
            "The radicle normally emerges first and develops into the root. The plumule develops into the shoot. Before the first leaves are able to photosynthesise, the embryo depends on food stored in the cotyledons.",
            "Respiration uses some of this stored material, so the dry mass of the seedling may fall during the early days of germination."
          ]
        },
        {
          "title":"When dry mass begins to rise",
          "paragraphs":[
            "Once the first green leaves expand, photosynthesis begins to make new organic material. When the rate of photosynthesis produces material faster than respiration uses it, the dry mass starts to increase."
          ]
        },
        {
          "title":"Reading a growth curve",
          "paragraphs":[
            "A growth graph should be described from the evidence. State where growth is slow, where it becomes rapid and where it slows or levels off. Quote time intervals or values when they are available.",
            "If a graph shows a steady trend, interpolation estimates a value between measured points and extrapolation estimates a value beyond the measured range. Extrapolation is less reliable because the pattern may change."
          ]
        },
        {
          "title":"Annual plant growth",
          "paragraphs":[
            "An annual plant completes its life cycle in one growing season. It germinates, grows, flowers, forms seeds and dies within that period. Maize and beans are common examples."
          ]
        },
        {
          "title":"Planning a germination investigation",
          "paragraphs":[
            "To investigate temperature, place equal numbers of similar seeds on equal amounts of moist material and keep the dishes at different temperatures. Keep water, seed type, number of seeds and observation time constant.",
            "The manipulated variable is temperature. A suitable responding variable is the number or percentage of seeds germinated after a fixed time, or the time taken to germinate."
          ],
          "bullets":[
            "Use enough seeds in each group to reduce the effect of individual differences.",
            "Keep the cotton wool moist with equal volumes of water.",
            "Record results at the same time each day.",
            "Define germination clearly, for example when the radicle first appears."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-4-growth-investigation",
          "type":"plant-growth-investigation",
          "title":"Germination and growth patterns"
        }
      ],
      "keyPoints":[
        "Water, oxygen and a suitable temperature are the main requirements for germination.",
        "The radicle forms the first root and the plumule develops into the shoot.",
        "Dry mass may fall at first because stored food is used in respiration.",
        "Dry mass rises after photosynthesis begins to produce new organic material.",
        "Growth graphs should be described using the pattern and the data.",
        "A fair germination investigation changes one factor and keeps other important conditions constant."
      ],
      "workedExample":{
        "title":"Explaining a fall in seedling dry mass",
        "prompt":"The dry mass of a germinating seedling falls for the first six days, then begins to increase. Explain the pattern.",
        "steps":[
          "Before the first leaves photosynthesise, the embryo uses stored food.",
          "Stored organic food is broken down during respiration to release energy for growth.",
          "This reduces dry mass during the early days.",
          "When leaves begin photosynthesis, new organic material is produced and dry mass starts to rise."
        ],
        "answer":"Dry mass falls because stored food is being used in respiration before the leaves photosynthesise. It rises later when photosynthesis produces new organic material faster than respiration uses it."
      },
      "checks":[
        {
          "prompt":"State the three main conditions required for germination.",
          "answer":"Water, oxygen and a suitable temperature.",
          "explanation":"These conditions support enzyme activity and aerobic respiration during early growth."
        },
        {
          "prompt":"Why is light not usually required for a seed to begin germinating?",
          "answer":"The embryo initially uses stored food rather than photosynthesis.",
          "explanation":"Light becomes important after green leaves develop and photosynthesis begins."
        },
        {
          "prompt":"Why can dry mass decrease during the first days of germination?",
          "answer":"Stored food is broken down in respiration.",
          "explanation":"Respiration releases energy for growth but uses organic material, reducing dry mass."
        },
        {
          "prompt":"In an investigation of temperature and germination, identify the manipulated variable and one responding variable.",
          "answer":"Manipulated variable: temperature. Responding variable: number or percentage of seeds germinated, or time taken to germinate.",
          "explanation":"The investigation deliberately changes temperature and measures a germination outcome."
        }
      ],
      "summary":"Analyse plant growth by linking germination conditions to enzyme activity and respiration, early dry-mass loss to stored-food use, later mass gain to photosynthesis and graph shape to changing growth rate."
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
  || '{"topicsBuilt":6,"objectivesBuilt":6}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
