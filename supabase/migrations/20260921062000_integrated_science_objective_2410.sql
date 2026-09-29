begin;

-- CSEC Integrated Science objective 2.4.10
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-10-protective-gear',
  'module-2-energy',
  '2.4.10 Protective Gear and Wear',
  'Explain the appropriate use of conventional protective gear for electrical, chemical, welding, grinding, construction, chainsaw, pesticide, laboratory and noise hazards.',
  650,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.10",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Match common protective equipment to the hazard it controls.",
        "Explain why welding requires filtered eye and face protection.",
        "Explain why ordinary rubber gloves are not a substitute for voltage-rated electrical PPE.",
        "Explain why hard hats and protective footwear are used where impact hazards exist.",
        "Explain why grinding requires impact-rated eye protection.",
        "Explain why pesticide PPE must follow the product label.",
        "Explain why hearing protection is used around hazardous noise.",
        "Explain why chainsaw work requires broader protection than gloves and goggles alone.",
        "Explain that PPE is the final layer after elimination, isolation and engineering controls where possible."
      ],
      "introduction":"Personal protective equipment reduces exposure when a hazard cannot be completely removed or isolated. The correct PPE depends on the hazard, not simply the job title. Protective gear must be suitable, correctly fitted, maintained and used within its limitations.",
      "sections":[
        {
          "title":"Welding",
          "paragraphs":[
            "Welding produces intense visible light, ultraviolet and infrared radiation as well as sparks and hot metal.",
            "A welding helmet or shield must use a filter shade suitable for the welding process and intensity. Suitable safety glasses or goggles may also be required beneath the helmet for impact protection.",
            "Ordinary sunglasses are not welding eye protection."
          ]
        },
        {
          "title":"Electrical work",
          "paragraphs":[
            "Electrical equipment should be de-energized and verified safe before work whenever possible.",
            "Only qualified persons should work on exposed energized parts. Energized work requires special procedures, insulated tools and PPE selected for the voltage and arc hazard.",
            "The CSEC bank describes rubber gloves and rubber-soled boots as insulating protection. In real electrical work, insulating gloves and sleeves must be voltage-rated, inspected and tested. Ordinary household rubber gloves are not equivalent."
          ]
        },
        {
          "title":"Construction and falling objects",
          "paragraphs":[
            "Hard hats or safety helmets protect the head from falling or flying objects and impact hazards.",
            "Protective footwear with suitable toe protection reduces crushing injury from heavy objects falling on the feet."
          ]
        },
        {
          "title":"Grinding and laboratory eye protection",
          "paragraphs":[
            "Grinding can eject high-speed particles and sparks. Impact-rated safety glasses or goggles are needed, with a face shield where the risk assessment requires additional face protection.",
            "In school laboratories, safety goggles protect the eyes from chemical splashes, broken glass and hot material when heating or handling chemicals."
          ]
        },
        {
          "title":"Chemical handling",
          "paragraphs":[
            "Chemical-resistant gloves protect the skin only when the glove material is suitable for the chemical involved.",
            "For bleach and other cleaning chemicals, follow the product label or safety data sheet for gloves, eye protection and other required controls."
          ]
        },
        {
          "title":"Pesticide application",
          "paragraphs":[
            "Pesticide handlers must follow the product label for PPE. Requirements can include chemical-resistant gloves, protective clothing, eye protection and respiratory protection.",
            "If a respirator is required, it must be the correct type and must be fitted, used and maintained according to the relevant safety requirements.",
            "A generic dust mask should not be substituted for a label-required respirator."
          ]
        },
        {
          "title":"Chainsaw use",
          "paragraphs":[
            "Chainsaws create cutting, flying-debris, noise, head and foot hazards.",
            "The bank lists goggles, ear muffs and gloves. Real chainsaw PPE can also include cut-resistant leg protection, protective footwear, head protection and face protection according to the task and site."
          ]
        },
        {
          "title":"Noise",
          "paragraphs":[
            "Hazardous noise can permanently damage hearing.",
            "Ear muffs or ear plugs are used when noise cannot be reduced adequately by quieter equipment, enclosure or other engineering controls."
          ]
        },
        {
          "title":"PPE is not the first control",
          "paragraphs":[
            "Hazards should first be eliminated, substituted or isolated where reasonably possible.",
            "Engineering and administrative controls reduce exposure before PPE becomes necessary.",
            "PPE remains important because it provides a final personal barrier when some hazard remains."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-10-protective-gear",
          "type":"protective-gear",
          "title":"Protective gear and hazard-matching explorer"
        }
      ],
      "keyPoints":[
        "Match PPE to the hazard rather than the job title.",
        "Welders need properly filtered eye and face protection.",
        "Electrical work should be de-energized whenever possible.",
        "Energized electrical work requires qualified workers and voltage-rated protective equipment.",
        "Hard hats protect against falling or flying objects.",
        "Grinding requires impact-rated eye protection.",
        "Pesticide PPE must follow the product label.",
        "Hazardous noise requires suitable hearing protection.",
        "Chainsaw protection includes more than gloves and goggles.",
        "PPE is a final protective layer, not a replacement for eliminating or controlling hazards."
      ],
      "workedExample":{
        "title":"Choosing PPE for pesticide spraying",
        "prompt":"A pesticide label requires chemical-resistant gloves, protective eyewear, long clothing and a respirator. Which protective items should the applicator use?",
        "steps":[
          "Read the label before handling the pesticide.",
          "Use the specified chemical-resistant glove material.",
          "Wear the required protective clothing and eye protection.",
          "Use the specified respirator with correct fit and training."
        ],
        "answer":"Use every item required by the pesticide label. Do not substitute ordinary gloves or a generic dust mask for specified PPE."
      },
      "checks":[
        {
          "prompt":"Why does a welder need a welding helmet or shield with a suitable filter?",
          "answer":"To protect the eyes and face from intense radiant energy, sparks and hot material.",
          "explanation":"The filter shade must suit the welding process."
        },
        {
          "prompt":"Why is it inaccurate to say any rubber glove is suitable for live electrical work?",
          "answer":"Electrical protective gloves must be voltage-rated, inspected and used by qualified workers under appropriate procedures.",
          "explanation":"Ordinary household rubber gloves are not equivalent to tested insulating PPE."
        },
        {
          "prompt":"What protects a grinder operator from flying particles?",
          "answer":"Impact-rated safety glasses or goggles, with additional face protection when required.",
          "explanation":"Grinding produces high-speed fragments and sparks."
        },
        {
          "prompt":"How should pesticide PPE be selected?",
          "answer":"Follow the product label and use the exact protective equipment specified.",
          "explanation":"Different pesticide formulations require different glove, clothing, eye and respiratory protection."
        },
        {
          "prompt":"What extra protection can chainsaw work require beyond the bank''s goggles, ear muffs and gloves?",
          "answer":"Cut-resistant leg protection, protective footwear, head protection and face protection as required by the task.",
          "explanation":"Chainsaws create several severe hazards at the same time."
        }
      ],
      "summary":"Protective gear works only when it is matched to the hazard, properly rated, fitted, inspected and used. Eliminate or isolate hazards first, then use PPE for the exposure that remains."
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
  || '{"topicsBuilt":65,"objectivesBuilt":65}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
