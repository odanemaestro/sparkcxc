begin;

-- CSEC Integrated Science objective 1.2.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t2-2-asexual-reproduction-plants',
  'module-1-organisms-life-processes',
  '1.2.2 Asexual Reproduction in Plants',
  'Examine natural and artificial methods of asexual reproduction in plants and relate each method to structure, crop examples and agricultural use.',
  40,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Plants",
      "objective":"1.2.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify natural methods of vegetative propagation and give suitable plant examples.",
        "Describe artificial methods such as cuttings, grafting, budding, layering and tissue culture.",
        "Explain how vegetative propagation produces genetically identical offspring.",
        "Relate propagation methods to crop production and survival through unfavourable conditions."
      ],
      "introduction":"Plants can reproduce asexually from stems, roots, leaves or small pieces of tissue. No gametes fuse, so the new plants are clones of the parent. Some methods occur naturally. Others are carried out by growers to multiply crops with useful qualities.",
      "sections":[
        {
          "title":"Natural vegetative propagation",
          "paragraphs":[
            "Natural vegetative propagation uses modified plant structures that store food, spread to new locations or survive unfavourable conditions. These structures contain buds that can grow into new shoots."
          ],
          "bullets":[
            "Bulb, onion: fleshy storage leaves surround a short stem. Buds develop into new shoots.",
            "Corm, dasheen or eddoe: a swollen solid underground stem stores food and produces new shoots from buds.",
            "Rhizome, ginger or canna lily: a horizontal underground stem grows through the soil and produces roots and shoots at nodes.",
            "Runner or stolon, strawberry and some grasses: a horizontal stem grows along the soil surface and forms new plants at nodes.",
            "Tuber, Irish potato: a swollen underground stem stores food. The eyes are buds that can grow into new shoots."
          ]
        },
        {
          "title":"Perennating organs",
          "paragraphs":[
            "Bulbs, corms, rhizomes and tubers are also perennating organs. Their stored food allows the plant to remain alive through an unfavourable period such as a dry season and then regrow when conditions improve."
          ]
        },
        {
          "title":"Stem cuttings",
          "paragraphs":[
            "A piece of stem containing at least one healthy bud is cut from the parent and planted in suitable conditions. New roots and shoots develop from the cutting.",
            "Sugar cane is commonly planted from pieces of stem called setts. Cuttings keep the inherited qualities of the parent plant."
          ]
        },
        {
          "title":"Grafting and budding",
          "paragraphs":[
            "Grafting joins a shoot called a scion from a desired variety to a rooted plant called the rootstock. The cut surfaces are fitted so that the cambium layers are in contact, then the join is tied and sealed until the tissues grow together.",
            "Budding is similar, but a single bud from the desired variety is inserted into the rootstock. Citrus plants are commonly propagated in this way."
          ],
          "bullets":[
            "The rootstock may provide strong roots or resistance to difficult soil conditions.",
            "The scion or bud provides the desired fruit quality."
          ]
        },
        {
          "title":"Layering",
          "paragraphs":[
            "In layering, a low branch remains attached to the parent while part of it is bent to the ground and covered with soil. Roots form on the buried section. Once rooted, the new plant is cut away from the parent."
          ]
        },
        {
          "title":"Tissue culture",
          "paragraphs":[
            "Tissue culture starts with a small piece of plant tissue grown under sterile conditions on a nutrient medium containing the substances needed for growth.",
            "The cells divide and form many small plantlets. The plantlets are genetically identical to the parent plant when produced from the same tissue."
          ],
          "bullets":[
            "Large numbers of plants can be produced quickly.",
            "Plantlets can be produced in a small space throughout the year.",
            "Careful sterile technique can provide disease-free planting material.",
            "Bananas are commonly multiplied by tissue culture."
          ]
        },
        {
          "title":"Why farmers use artificial propagation",
          "paragraphs":[
            "Artificial propagation helps growers multiply plants that already have useful characteristics. Because the offspring are clones, fruit quality, yield and other inherited characteristics can be retained.",
            "The same lack of variation is also a risk. A large genetically identical crop may be vulnerable if a new disease affects the parent variety."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t2-2-vegetative-propagation",
          "type":"vegetative-propagation",
          "title":"Natural and artificial vegetative propagation"
        }
      ],
      "keyPoints":[
        "Natural vegetative propagation includes bulbs, corms, rhizomes, runners and tubers.",
        "Bulbs, corms, rhizomes and tubers also store food and help plants survive unfavourable conditions.",
        "Artificial methods include cuttings, grafting, budding, layering and tissue culture.",
        "Vegetative propagation produces clones, so useful inherited qualities are retained.",
        "Tissue culture can produce large numbers of identical, disease-free plantlets when carried out under sterile conditions."
      ],
      "workedExample":{
        "title":"Describing grafting",
        "prompt":"A citrus grower wants strong roots and fruit from a high-quality variety. Describe how grafting can be used.",
        "steps":[
          "Choose a rooted plant to act as the rootstock.",
          "Cut a shoot called the scion from the variety with the desired fruit.",
          "Fit the cut surfaces together so that their cambium layers touch.",
          "Tie and seal the join until the tissues grow together."
        ],
        "answer":"A scion from the desired citrus variety is fitted to a suitable rootstock with the cambium layers in contact. The join is tied and sealed until the two parts grow together."
      },
      "checks":[
        {
          "prompt":"Which natural vegetative structure is used by onion?",
          "answer":"A bulb.",
          "explanation":"An onion bulb has fleshy storage leaves around a short stem."
        },
        {
          "prompt":"What is the natural propagation structure of ginger?",
          "answer":"A rhizome.",
          "explanation":"A rhizome is a horizontal underground stem that produces roots and shoots at nodes."
        },
        {
          "prompt":"Why is tissue culture useful for banana production?",
          "answer":"It can produce many identical plantlets quickly, including disease-free planting material when sterile technique is used.",
          "explanation":"A small amount of parent tissue can be multiplied repeatedly on a nutrient medium."
        },
        {
          "prompt":"What is the difference between the scion and the rootstock in grafting?",
          "answer":"The scion is the shoot from the desired variety, while the rootstock is the rooted plant onto which it is joined.",
          "explanation":"The scion provides the desired shoot and fruit characteristics, while the rootstock supplies the established root system."
        }
      ],
      "summary":"When identifying a propagation method, look at the plant structure or procedure, decide whether it is natural or artificial, name a matching crop example and explain why the method is useful to the plant or grower."
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
  || '{"topicsBuilt":4,"objectivesBuilt":4}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
