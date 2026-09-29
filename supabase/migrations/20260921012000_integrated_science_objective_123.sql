begin;

-- CSEC Integrated Science objective 1.2.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-3-sexual-reproduction-plants',
  'module-1-organisms-life-processes',
  '1.2.3 Sexual Reproduction in Plants',
  'Examine flower structure, pollination, fertilisation, seed and fruit formation, seed structure and germination.',
  50,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main parts of a flower and relate each part to its function.",
        "Distinguish between self-pollination and cross-pollination and compare insect- and wind-pollinated flowers.",
        "Describe the sequence from pollination to fertilisation and the formation of seeds and fruits.",
        "Identify the main structures in a bean seed and state the conditions needed for germination."
      ],
      "introduction":"Sexual reproduction in flowering plants begins with the production and transfer of pollen and continues through fertilisation, seed formation and germination. Understanding the process requires you to connect the visible parts of a flower with the events taking place inside the ovary and ovule.",
      "sections":[
        {
          "title":"The reproductive parts of a flower",
          "bullets":[
            "Stamen: the male part of the flower. It consists of the anther and filament.",
            "Anther: produces pollen grains containing the male gametes.",
            "Filament: holds the anther in a position where pollen can be transferred.",
            "Carpel or pistil: the female part. It consists of the stigma, style and ovary.",
            "Stigma: receives pollen grains.",
            "Style: connects the stigma to the ovary and provides a route for the pollen tube.",
            "Ovary: contains one or more ovules and develops into the fruit after fertilisation.",
            "Ovule: contains the female gamete and develops into a seed after fertilisation.",
            "Petals: often attract animal pollinators.",
            "Sepals: protect the flower while it is in the bud stage.",
            "Receptacle: supports the flower parts."
          ]
        },
        {
          "title":"Pollination",
          "paragraphs":[
            "Pollination is the transfer of pollen from an anther to a stigma. Self-pollination occurs when pollen reaches a stigma on the same plant. Cross-pollination occurs when pollen is transferred to a flower on a different plant of the same species.",
            "Cross-pollination combines genetic material from different plants and therefore increases variation in the offspring."
          ]
        },
        {
          "title":"Insect and wind pollination",
          "bullets":[
            "Insect-pollinated flowers often have large or brightly coloured petals, scent and nectar. Their pollen is often sticky or spiky and produced in smaller quantities.",
            "Wind-pollinated flowers usually have small dull petals, exposed anthers and feathery stigmas. They produce large quantities of light, smooth pollen.",
            "A pollination feature is useful only if it improves the chance that pollen reaches a suitable stigma."
          ]
        },
        {
          "title":"From pollen grain to fertilisation",
          "paragraphs":[
            "A compatible pollen grain germinates on the stigma and grows a pollen tube down through the style. The male nucleus travels through the pollen tube towards an ovule.",
            "The pollen tube enters the ovule through the micropyle. The male nucleus then fuses with the female nucleus. This fusion is fertilisation and the fertilised cell is called a zygote."
          ]
        },
        {
          "title":"Seed and fruit formation",
          "paragraphs":[
            "After fertilisation, the ovule develops into a seed and the ovary develops into a fruit. The seed protects the young plant embryo and contains a food supply for early growth.",
            "A bean seed contains a testa, cotyledons, a plumule and a radicle. The testa protects the seed. Cotyledons store food. The plumule develops into the shoot and the radicle develops into the root."
          ]
        },
        {
          "title":"Germination",
          "paragraphs":[
            "Germination begins when a seed resumes growth. The main conditions required are water, oxygen and a suitable temperature.",
            "Water activates the seed and helps enzymes and stored food move through the tissues. Oxygen is required for aerobic respiration, which releases energy for growth. A suitable temperature allows enzymes to work effectively."
          ],
          "bullets":[
            "The radicle normally emerges first and grows downwards to form the root system.",
            "The plumule then develops into the shoot.",
            "Waterlogged soil can reduce germination because soil air spaces fill with water and the seed receives too little oxygen."
          ]
        },
        {
          "title":"Biological drawing and magnification",
          "paragraphs":[
            "A flower or seed drawing should be large, use clear single lines, contain no shading and include only structures that are visible. Ruled label lines should not cross.",
            "Magnification is calculated as drawing size divided by actual size. Use the same units for both measurements and include the multiplication sign in the final answer."
          ]
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t2-3-flower",
          "title":"Label a longitudinal section of a flower",
          "template":"flower-longitudinal",
          "mode":"drag-drop-label",
          "instructions":"Desktop: drag each label to its target. Phone or tablet: tap a label, then tap the numbered target.",
          "labels":[
            {"id":"petal","text":"Petal","hint":"Look for the large coloured structure.","explanation":"Petals often attract animal pollinators."},
            {"id":"sepal","text":"Sepal","hint":"Look at the green leaf-like structure beneath the petals.","explanation":"Sepals protect the flower while it is a bud."},
            {"id":"anther","text":"Anther","hint":"Find the pollen-producing structure at the tip of a stamen.","explanation":"Anthers produce pollen grains."},
            {"id":"filament","text":"Filament","hint":"Find the stalk supporting an anther.","explanation":"The filament supports the anther."},
            {"id":"stigma","text":"Stigma","hint":"Find the receptive surface at the top of the carpel.","explanation":"The stigma receives pollen grains."},
            {"id":"style","text":"Style","hint":"Find the narrow structure between stigma and ovary.","explanation":"The pollen tube grows down through the style."},
            {"id":"ovary","text":"Ovary","hint":"Find the swollen base of the carpel.","explanation":"The ovary contains ovules and develops into the fruit."},
            {"id":"ovule","text":"Ovule","hint":"Find one of the small structures inside the ovary.","explanation":"An ovule contains the female gamete and develops into a seed after fertilisation."},
            {"id":"receptacle","text":"Receptacle","hint":"Look at the base supporting the flower parts.","explanation":"The receptacle supports the parts of the flower."}
          ],
          "targets":[
            {"id":"flower-petal","labelId":"petal","boxX":20,"boxY":45,"anchorX":340,"anchorY":180,"side":"left"},
            {"id":"flower-sepal","labelId":"sepal","boxX":20,"boxY":135,"anchorX":350,"anchorY":315,"side":"left"},
            {"id":"flower-anther","labelId":"anther","boxX":20,"boxY":225,"anchorX":398,"anchorY":175,"side":"left"},
            {"id":"flower-filament","labelId":"filament","boxX":20,"boxY":315,"anchorX":415,"anchorY":250,"side":"left"},
            {"id":"flower-receptacle","labelId":"receptacle","boxX":20,"boxY":405,"anchorX":455,"anchorY":430,"side":"left"},
            {"id":"flower-stigma","labelId":"stigma","boxX":790,"boxY":55,"anchorX":500,"anchorY":125,"side":"right"},
            {"id":"flower-style","labelId":"style","boxX":790,"boxY":155,"anchorX":500,"anchorY":220,"side":"right"},
            {"id":"flower-ovary","labelId":"ovary","boxX":790,"boxY":275,"anchorX":555,"anchorY":360,"side":"right"},
            {"id":"flower-ovule","labelId":"ovule","boxX":790,"boxY":395,"anchorX":535,"anchorY":350,"side":"right"}
          ]
        },
        {
          "id":"m1-t2-3-bean-seed",
          "title":"Label an opened bean seed",
          "template":"bean-seed",
          "mode":"drag-drop-label",
          "instructions":"Place the four labels on the correct parts of the bean seed.",
          "labels":[
            {"id":"testa","text":"Testa","hint":"Look for the outer seed coat.","explanation":"The testa protects the seed."},
            {"id":"cotyledon","text":"Cotyledon","hint":"Look for the large food-storage seed leaf.","explanation":"The cotyledons store food for the embryo."},
            {"id":"plumule","text":"Plumule","hint":"Find the small embryonic shoot.","explanation":"The plumule develops into the shoot."},
            {"id":"radicle","text":"Radicle","hint":"Find the embryonic root.","explanation":"The radicle develops into the root and normally emerges first during germination."}
          ],
          "targets":[
            {"id":"seed-testa","labelId":"testa","boxX":30,"boxY":95,"anchorX":290,"anchorY":310,"side":"left"},
            {"id":"seed-cotyledon","labelId":"cotyledon","boxX":30,"boxY":315,"anchorX":400,"anchorY":315,"side":"left"},
            {"id":"seed-plumule","labelId":"plumule","boxX":780,"boxY":105,"anchorX":470,"anchorY":205,"side":"right"},
            {"id":"seed-radicle","labelId":"radicle","boxX":780,"boxY":330,"anchorX":490,"anchorY":415,"side":"right"}
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-3-flower-reproduction-process",
          "type":"flower-reproduction-process",
          "title":"From pollination to seed and fruit"
        }
      ],
      "keyPoints":[
        "The stamen is the male part and the carpel is the female part of a flower.",
        "Pollination transfers pollen from anther to stigma. Fertilisation is the fusion of male and female nuclei.",
        "Cross-pollination increases genetic variation.",
        "After fertilisation, the ovule develops into a seed and the ovary develops into a fruit.",
        "Bean seed structures include the testa, cotyledons, plumule and radicle.",
        "Water, oxygen and a suitable temperature are needed for germination."
      ],
      "workedExample":{
        "title":"Explaining fertilisation in a flower",
        "prompt":"Describe what happens from the time a pollen grain lands on a stigma until fertilisation occurs.",
        "steps":[
          "A compatible pollen grain germinates on the stigma.",
          "A pollen tube grows down through the style.",
          "The pollen tube enters an ovule through the micropyle.",
          "The male nucleus travels down the tube and fuses with the female nucleus to form a zygote."
        ],
        "answer":"The pollen grain grows a pollen tube through the style to an ovule. The male nucleus travels down the tube and fuses with the female nucleus in the ovule, forming a zygote."
      },
      "checks":[
        {
          "prompt":"Which flower structure produces pollen grains?",
          "answer":"The anther.",
          "explanation":"The anther is part of the stamen and produces pollen."
        },
        {
          "prompt":"What is the difference between pollination and fertilisation?",
          "answer":"Pollination is the transfer of pollen to a stigma. Fertilisation is the fusion of male and female nuclei.",
          "explanation":"Pollination must normally occur before a pollen tube grows and fertilisation takes place."
        },
        {
          "prompt":"What do the ovule and ovary become after fertilisation?",
          "answer":"The ovule becomes a seed and the ovary becomes a fruit.",
          "explanation":"These changes protect and help disperse the developing embryo."
        },
        {
          "prompt":"State the three main conditions required for germination.",
          "answer":"Water, oxygen and a suitable temperature.",
          "explanation":"Water activates the seed, oxygen supports aerobic respiration and suitable temperature supports enzyme activity."
        }
      ],
      "summary":"Follow the sequence in order: pollen is produced in the anther, pollination transfers it to the stigma, a pollen tube grows through the style, fertilisation occurs inside an ovule, the ovule becomes a seed and the ovary becomes a fruit."
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

insert into public.spark_subject_activity_catalog(
  subject_id,activity_key,activity_type,section_id,topic_id,title,route,evidence_weight,enabled,metadata
)
values
(
  'integrated-science',
  'diagram:m1-t2-3-flower',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t2-3-sexual-reproduction-plants',
  'Label a longitudinal section of a flower',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t2-3-sexual-reproduction-plants',
  0.35,
  true,
  '{"syllabusObjective":"1.2.3","mode":"drag-drop-label"}'::jsonb
),
(
  'integrated-science',
  'diagram:m1-t2-3-bean-seed',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t2-3-sexual-reproduction-plants',
  'Label an opened bean seed',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t2-3-sexual-reproduction-plants',
  0.35,
  true,
  '{"syllabusObjective":"1.2.3","mode":"drag-drop-label"}'::jsonb
)
on conflict (subject_id,activity_key) do update set
  activity_type=excluded.activity_type,
  section_id=excluded.section_id,
  topic_id=excluded.topic_id,
  title=excluded.title,
  route=excluded.route,
  evidence_weight=excluded.evidence_weight,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)
  || '{"topicsBuilt":5,"objectivesBuilt":5}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
