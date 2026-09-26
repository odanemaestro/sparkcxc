begin;

-- CSEC Integrated Science objective 1.2.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-1-asexual-sexual-reproduction',
  'module-1-organisms-life-processes',
  '1.2.1 Asexual and Sexual Reproduction',
  'Distinguish between asexual and sexual reproduction and relate each type to cell division, inheritance, variation and crop production.',
  30,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish between asexual and sexual reproduction.",
        "Relate asexual reproduction to mitosis and genetically identical offspring.",
        "Relate sexual reproduction to meiosis, gametes, fertilisation and genetic variation.",
        "Compare advantages and disadvantages of asexual and sexual reproduction in crop production."
      ],
      "introduction":"Reproduction produces new organisms, but the genetic result depends on how the new organism is formed. Asexual reproduction keeps the parent combination of genes almost unchanged, while sexual reproduction combines genetic material and produces variation.",
      "sections":[
        {
          "title":"Asexual reproduction",
          "paragraphs":[
            "Asexual reproduction involves one parent and no fusion of male and female gametes. Cell division by mitosis produces genetically identical cells, so the offspring are clones of the parent unless a mutation occurs."
          ],
          "bullets":[
            "One parent is required.",
            "No fertilisation occurs.",
            "Mitosis produces genetically identical cells.",
            "Offspring usually keep the same inherited qualities as the parent.",
            "Many offspring can be produced quickly."
          ]
        },
        {
          "title":"Asexual reproduction in crop production",
          "paragraphs":[
            "A farmer can reproduce a crop with useful qualities such as good fruit size, taste or yield and expect the offspring to keep those qualities. Pineapples grown from suckers are one example.",
            "Low genetic variation is also a risk. If a field contains genetically identical plants and the parent type is susceptible to a disease, the disease may affect the whole crop."
          ]
        },
        {
          "title":"Sexual reproduction",
          "paragraphs":[
            "Sexual reproduction involves the fusion of a male gamete and a female gamete during fertilisation. Gametes are produced by meiosis, which reduces the chromosome number. Fertilisation restores the full chromosome number in the zygote."
          ],
          "bullets":[
            "Gametes are produced by meiosis.",
            "Male and female gametes fuse during fertilisation.",
            "The fertilised cell is called a zygote.",
            "Offspring are genetically different from one another and from their parents."
          ]
        },
        {
          "title":"Why variation matters",
          "paragraphs":[
            "Variation means that individuals in a population are not genetically identical. If disease, climate or another environmental condition changes, some individuals may have characteristics that improve their chance of survival.",
            "Plant breeders use variation from sexual reproduction when selecting new varieties, including plants with improved resistance to disease."
          ]
        },
        {
          "title":"Comparing the two methods",
          "bullets":[
            "Asexual reproduction is usually faster and needs only one parent, but it produces little genetic variation.",
            "Sexual reproduction usually takes more time and energy and involves gametes, but it produces variation.",
            "Asexual reproduction is useful for keeping desired crop qualities unchanged.",
            "Sexual reproduction creates new combinations of genes from which useful traits can be selected."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-1-reproduction-comparison",
          "type":"reproduction-comparison",
          "title":"Asexual and sexual reproduction"
        }
      ],
      "keyPoints":[
        "Asexual reproduction involves one parent, no fusion of gametes and usually mitosis.",
        "Asexual offspring are genetically identical clones, so useful traits are retained but variation is low.",
        "Sexual reproduction involves gametes produced by meiosis and their fusion at fertilisation.",
        "Sexual reproduction produces variation, which supports adaptation and selective breeding."
      ],
      "workedExample":{
        "title":"Choosing a reproduction method",
        "prompt":"A farmer wants to reproduce a pineapple plant with excellent fruit quality. Explain why using suckers is useful, then state one risk.",
        "steps":[
          "Suckers reproduce the plant asexually.",
          "Mitosis produces offspring with the same inherited qualities as the parent plant.",
          "The excellent fruit quality is therefore retained.",
          "Because the plants are genetically alike, one disease may affect many or all of them."
        ],
        "answer":"Using suckers produces genetically identical plants with the desired fruit quality, but the lack of variation can make the crop vulnerable to the same disease."
      },
      "checks":[
        {
          "prompt":"Which type of cell division is linked with asexual reproduction?",
          "answer":"Mitosis.",
          "explanation":"Mitosis produces genetically identical cells and supports asexual reproduction."
        },
        {
          "prompt":"Which type of cell division produces gametes?",
          "answer":"Meiosis.",
          "explanation":"Meiosis reduces the chromosome number before fertilisation."
        },
        {
          "prompt":"Why can one disease destroy a field of genetically identical banana plants?",
          "answer":"The plants have little or no genetic variation in disease resistance.",
          "explanation":"If the clone used for the crop is susceptible, the same susceptibility is present throughout the field."
        },
        {
          "prompt":"Why can sexual reproduction help breeders develop a disease-resistant crop variety?",
          "answer":"It produces genetic variation.",
          "explanation":"Variation creates different combinations of traits from which resistant individuals can be selected."
        }
      ],
      "summary":"To distinguish the methods, ask how many parents are involved, whether gametes fuse, which cell division is involved and whether the offspring are genetically identical or show variation."
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
  || '{"topicsBuilt":3,"objectivesBuilt":3}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
