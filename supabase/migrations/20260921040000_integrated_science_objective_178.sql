begin;

-- CSEC Integrated Science objective 1.7.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-8-pests-vectors',
  'module-1-organisms-life-processes',
  '1.7.8 Pests, Parasites and Vectors',
  'Discuss selected pests, parasites, pathogens and vectors and explain how household and environmental conditions can increase disease risk.',
  370,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.8",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish pathogen, vector, parasite and pest.",
        "Identify selected household pests, parasites and vectors.",
        "Explain how standing water provides breeding sites for mosquitoes.",
        "Explain how houseflies, Aedes mosquitoes, rodents and cockroaches contribute to disease risk.",
        "Relate uncovered food, poorly managed waste and standing water to household pest problems.",
        "Apply these ideas to Caribbean home and community situations."
      ],
      "introduction":"Pests, parasites and vectors are not the same thing. A pathogen is the disease-causing agent, while a vector carries a pathogen between hosts. Some organisms are parasites because they live in or on a host, while pests cause damage, contamination or nuisance. Correctly identifying each role helps explain how disease spreads.",
      "sections":[
        {
          "title":"Pathogen, vector, parasite and pest",
          "paragraphs":[
            "A pathogen is an agent that causes disease. Disease-causing bacteria, viruses, fungi and some parasites are examples.",
            "A vector is an organism that carries and transmits a pathogen from one host to another. Mosquitoes are important biological vectors.",
            "A parasite lives in or on a host and obtains nutrients or other resources at the host''s expense. Tapeworms and head lice are syllabus examples.",
            "A pest is an organism that causes harm, contamination, property damage or nuisance. Rats and cockroaches are common household examples."
          ]
        },
        {
          "title":"Mosquito breeding sites",
          "paragraphs":[
            "Many Aedes mosquitoes breed in small collections of water around homes. Old tyres, uncovered drums, buckets, tins, flower-pot saucers and other containers that collect rainwater can become breeding sites.",
            "The CSEC bank specifically identifies old tyres holding rainwater as a mosquito-breeding site. A dry yard or fast-flowing drain does not provide the same still-water habitat."
          ]
        },
        {
          "title":"Houseflies and contaminated food",
          "paragraphs":[
            "Houseflies may visit faeces, garbage and other contaminated material. Pathogens can be carried mechanically on their body parts and transferred to uncovered food and food-preparation surfaces.",
            "This contamination can contribute to intestinal disease, including gastroenteritis. The fly is the carrier, while the microorganism is the pathogen."
          ]
        },
        {
          "title":"Aedes mosquitoes and viral disease",
          "paragraphs":[
            "Aedes aegypti is an important mosquito vector in the Caribbean. It can transmit viruses that cause dengue, Zika and chikungunya.",
            "The mosquito does not create the virus. Transmission occurs when a competent mosquito acquires a virus from an infected host and later passes it to another person while feeding."
          ]
        },
        {
          "title":"Rodents and leptospirosis",
          "paragraphs":[
            "Leptospirosis is caused by Leptospira bacteria. Infected animals can shed the bacteria in urine, contaminating wet soil or water.",
            "Rodents are important reservoirs, but they are not the only animals that can carry Leptospira. Human infection can occur when contaminated water or soil contacts broken skin or mucous membranes."
          ]
        },
        {
          "title":"Cockroaches and household contamination",
          "paragraphs":[
            "Cockroaches move through waste, drains and food-storage areas. Microorganisms can be transferred from contaminated places to food, utensils and preparation surfaces.",
            "Uncovered food, food crumbs, moisture and poorly managed garbage help support cockroach populations."
          ]
        },
        {
          "title":"Waste, food and water around the home",
          "paragraphs":[
            "Improperly stored domestic waste can provide food and shelter for rats, flies and cockroaches. Discarded containers can also collect rainwater and support mosquito breeding.",
            "Pet food left outdoors can attract rodents. Outdoor water bowls and containers should also be checked because standing water can support mosquito development."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-8-pests-vectors",
          "type":"pest-vectors",
          "title":"Pests, parasites and vector explorer"
        }
      ],
      "keyPoints":[
        "A pathogen causes disease, while a vector carries a pathogen between hosts.",
        "Tapeworms and head lice are parasites.",
        "Old tyres and other containers holding still water can become mosquito breeding sites.",
        "Houseflies can mechanically transfer pathogens from contaminated material to food.",
        "Aedes aegypti can transmit dengue, Zika and chikungunya viruses.",
        "Leptospira bacteria can spread through urine from infected animals, including rodents.",
        "Uncovered food, poorly managed garbage and standing water increase household pest or vector risk."
      ],
      "workedExample":{
        "title":"Separating the vector from the pathogen",
        "prompt":"A community has many old tyres containing rainwater and several cases of dengue. Explain the role of the tyres, the mosquito and the dengue virus.",
        "steps":[
          "The tyres hold still water and provide mosquito breeding sites.",
          "The Aedes mosquito is the vector.",
          "The dengue virus is the pathogen.",
          "More breeding sites can increase the local mosquito population and opportunities for transmission."
        ],
        "answer":"The tyres provide breeding sites, the Aedes mosquito acts as the vector, and the dengue virus is the pathogen transmitted between people."
      },
      "checks":[
        {
          "prompt":"What is a vector?",
          "answer":"An organism that carries and transmits a pathogen from one host to another.",
          "explanation":"The vector and the pathogen are different. The vector carries the disease-causing agent."
        },
        {
          "prompt":"Why can old tyres increase mosquito numbers?",
          "answer":"They can collect rainwater and provide still-water breeding sites for mosquito development.",
          "explanation":"Container-breeding mosquitoes use small collections of water around homes."
        },
        {
          "prompt":"How can a housefly contaminate food?",
          "answer":"It can pick up pathogens from faeces, garbage or other contaminated material and mechanically transfer them to food or surfaces.",
          "explanation":"The housefly acts as a carrier while the microorganism causes the disease."
        },
        {
          "prompt":"How can infected rodents contribute to leptospirosis risk?",
          "answer":"They can shed Leptospira bacteria in urine, contaminating water or wet soil that later contacts people.",
          "explanation":"Rodents are important reservoirs, though other infected animals can also spread the bacteria."
        }
      ],
      "summary":"Identify the disease-causing pathogen separately from the pest, parasite or vector involved. Then trace the route by which food, waste, standing water or contaminated environments increase exposure."
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
  || '{"topicsBuilt":37,"objectivesBuilt":37}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
