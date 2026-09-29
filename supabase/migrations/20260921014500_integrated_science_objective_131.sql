begin;

-- CSEC Integrated Science objective 1.3.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-1-asexual-reproduction-animals',
  'module-1-organisms-life-processes',
  '1.3.1 Asexual Reproduction in Animals',
  'Outline binary fission, budding, fragmentation and parthenogenesis and compare the speed and genetic consequences of asexual reproduction.',
  100,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "State the main features of asexual reproduction.",
        "Outline binary fission, budding, fragmentation and parthenogenesis using suitable examples.",
        "Distinguish the four methods from one another by how the new individual forms.",
        "Explain one advantage and one disadvantage of asexual reproduction."
      ],
      "introduction":"Asexual reproduction produces new individuals without the fusion of male and female gametes. Only one parent is required. Because the genetic material comes from one parent, the offspring are usually genetically very similar to the parent and to one another.",
      "sections":[
        {
          "title":"Binary fission",
          "paragraphs":[
            "In binary fission, one parent cell copies its genetic material and divides into two daughter cells. Amoeba and Paramecium are common syllabus examples of organisms that reproduce this way.",
            "Amoeba and Paramecium are unicellular protists rather than animals, but the process is useful for understanding how a single cell can reproduce asexually. Many bacteria also reproduce by binary fission."
          ]
        },
        {
          "title":"Budding",
          "paragraphs":[
            "In budding, a small outgrowth develops on the parent. The bud grows by cell division and may later separate to live as an independent individual.",
            "Hydra is a common animal example. Budding also occurs in yeast, which is a fungus."
          ]
        },
        {
          "title":"Fragmentation and regeneration",
          "paragraphs":[
            "Fragmentation occurs when part of a parent organism separates and the fragment develops into a new individual by regenerating missing structures.",
            "Planarian flatworms can reproduce from suitable fragments. Some echinoderms can also regenerate from fragments when the fragment contains the tissues needed to form a complete new individual."
          ]
        },
        {
          "title":"Parthenogenesis",
          "paragraphs":[
            "Parthenogenesis is the development of a new individual from an unfertilised egg. Fertilisation does not occur.",
            "Examples include some aphids and male honeybees. In honeybees, drone males develop from unfertilised eggs."
          ]
        },
        {
          "title":"Advantages and disadvantages",
          "paragraphs":[
            "Asexual reproduction can be rapid because a mate is not required. A successful organism can produce many offspring with the same useful features.",
            "The main disadvantage is low genetic variation. If the environment changes or a new disease affects the parent type, many genetically similar offspring may be affected in the same way."
          ]
        },
        {
          "title":"How to identify the method",
          "bullets":[
            "A single cell splitting into two suggests binary fission.",
            "A small outgrowth growing from the parent suggests budding.",
            "A body piece developing into a complete individual suggests fragmentation with regeneration.",
            "An unfertilised egg developing into an individual indicates parthenogenesis."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-1-animal-asexual-reproduction",
          "type":"animal-asexual-reproduction",
          "title":"Methods of asexual reproduction"
        }
      ],
      "keyPoints":[
        "Asexual reproduction requires one parent and no fusion of gametes.",
        "Binary fission produces two daughter cells from one parent cell.",
        "Budding produces a new individual as an outgrowth from the parent.",
        "Fragmentation produces new individuals from suitable pieces of a parent organism.",
        "Parthenogenesis is development from an unfertilised egg.",
        "Asexual reproduction is efficient but usually produces little genetic variation."
      ],
      "workedExample":{
        "title":"Identifying an asexual method",
        "prompt":"A small outgrowth develops on the body of a Hydra. It grows, develops tentacles and later separates from the parent. Name the method and explain your answer.",
        "steps":[
          "Look for the feature that identifies the method.",
          "The new individual begins as an outgrowth attached to the parent.",
          "An attached outgrowth is characteristic of budding."
        ],
        "answer":"The method is budding because the new Hydra develops as an outgrowth on the parent before separating."
      },
      "checks":[
        {
          "prompt":"What is binary fission?",
          "answer":"One parent cell divides to form two daughter cells.",
          "explanation":"The genetic material is copied before the cell divides."
        },
        {
          "prompt":"How does fragmentation differ from budding?",
          "answer":"In fragmentation, a separated piece of the parent regenerates into a new individual. In budding, a new outgrowth develops on the parent.",
          "explanation":"The starting structure of the new individual is different in the two methods."
        },
        {
          "prompt":"What is parthenogenesis?",
          "answer":"The development of an individual from an unfertilised egg.",
          "explanation":"No fusion of male and female gametes occurs."
        },
        {
          "prompt":"Why can low genetic variation be a disadvantage?",
          "answer":"A disease or environmental change that affects one genetic type may affect many of the genetically similar offspring.",
          "explanation":"Variation increases the chance that some individuals will survive a new challenge."
        }
      ],
      "summary":"Identify the method by the way the offspring begins. Splitting gives binary fission, an attached outgrowth gives budding, a separated piece that regrows gives fragmentation, and development from an unfertilised egg gives parthenogenesis."
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
  || '{"topicsBuilt":10,"objectivesBuilt":10}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
