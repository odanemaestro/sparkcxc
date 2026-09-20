begin;

-- CSEC Integrated Science objective 2.2.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-7-gaseous-exchange',
  'module-2-energy',
  '2.2.7 Gaseous Exchange in Organisms',
  'Explain the importance of gaseous exchange and compare efficient exchange surfaces in humans, fish, plants and insects.',
  520,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain why gaseous exchange is important to organisms.",
        "Identify the common features of efficient gaseous exchange surfaces.",
        "Explain oxygen and carbon dioxide diffusion across human alveoli.",
        "Explain how fish gills are adapted for gaseous exchange.",
        "Explain why fish gills function poorly out of water.",
        "Explain gas movement through stomata in leaves.",
        "Describe gaseous exchange through spiracles, tracheae and tracheoles in insects."
      ],
      "introduction":"Gaseous exchange supplies gases needed by living cells and removes gases produced by metabolism. Diffusion moves gases across specialised surfaces. Efficient exchange surfaces provide a large area, a short diffusion distance and conditions that maintain concentration gradients.",
      "sections":[
        {
          "title":"Why gaseous exchange is important",
          "paragraphs":[
            "In animals, oxygen is needed for aerobic respiration and carbon dioxide produced by respiration must be removed.",
            "Plants also respire, but green tissues carry out photosynthesis in light. During bright daylight, photosynthesis can proceed faster than respiration, so a green plant can release more oxygen than it takes in."
          ]
        },
        {
          "title":"Features of efficient exchange surfaces",
          "paragraphs":[
            "Efficient gaseous exchange surfaces have a large surface area and a thin barrier, which increases the amount of gas that can diffuse and shortens the diffusion distance.",
            "The surface is moist because gases such as oxygen and carbon dioxide dissolve before diffusing across cell membranes.",
            "Ventilation, blood flow or continual cellular use and production of gases help maintain steep concentration gradients."
          ]
        },
        {
          "title":"Human alveoli",
          "paragraphs":[
            "Alveoli provide a very large total surface area inside the lungs. Their thin walls lie close to capillaries and are kept moist.",
            "Oxygen diffuses from alveolar air, where its concentration is higher, into the blood, where its concentration is lower.",
            "Carbon dioxide diffuses in the opposite direction, from blood into the alveoli, before being exhaled."
          ]
        },
        {
          "title":"Fish gills",
          "paragraphs":[
            "Fish exchange gases across gill filaments. The filaments provide a large, thin, moist surface supplied with many blood capillaries.",
            "Water supports and separates the delicate gill filaments. When a fish is removed from water, the filaments collapse and stick together, reducing the surface area available for diffusion."
          ]
        },
        {
          "title":"Plant leaves and stomata",
          "paragraphs":[
            "Stomata are pores in the leaf epidermis surrounded by guard cells. Carbon dioxide enters through stomata and diffuses through internal air spaces to photosynthesising cells.",
            "Oxygen produced during photosynthesis can diffuse out through stomata. Water vapour also leaves through stomata.",
            "In many terrestrial leaves, more stomata occur on the lower surface. This surface is usually cooler and less exposed to direct air movement, helping reduce water loss."
          ]
        },
        {
          "title":"Insect tracheal system",
          "paragraphs":[
            "Insects take in air through openings called spiracles. Air passes through larger tubes called tracheae and then into fine tracheoles.",
            "The fine tracheoles carry oxygen close to body cells, creating a short diffusion distance. Carbon dioxide moves in the opposite direction towards the spiracles."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-7-gaseous-exchange",
          "type":"gaseous-exchange",
          "title":"Gaseous exchange surfaces explorer"
        }
      ],
      "keyPoints":[
        "Gaseous exchange supplies oxygen for aerobic respiration and removes carbon dioxide in animals.",
        "Efficient exchange surfaces are large, thin and moist.",
        "Good ventilation or blood flow helps maintain concentration gradients.",
        "Oxygen crosses the alveolar surface by diffusion.",
        "Gill filaments provide a large exchange surface in fish.",
        "Fish gill filaments collapse out of water, reducing exchange area.",
        "Stomata are pores controlled by guard cells.",
        "Carbon dioxide enters leaves through stomata for photosynthesis.",
        "Insects use spiracles, tracheae and tracheoles for gaseous exchange."
      ],
      "workedExample":{
        "title":"Explaining why a fish suffocates out of water",
        "prompt":"A fish has plenty of oxygen in the surrounding air but still dies after its gills dry and collapse. Explain why.",
        "steps":[
          "Gill filaments are normally supported and separated by water.",
          "Out of water the filaments collapse and stick together.",
          "The effective surface area for gaseous exchange falls greatly.",
          "The moist exchange surface also begins to dry.",
          "Oxygen diffusion into the blood becomes insufficient."
        ],
        "answer":"The gill filaments collapse together and lose much of their large moist exchange surface, so oxygen diffusion into the blood becomes inadequate."
      },
      "checks":[
        {
          "prompt":"Name three features of a good gaseous exchange surface.",
          "answer":"A large surface area, a thin barrier and a moist surface.",
          "explanation":"A maintained concentration gradient is also important for rapid diffusion."
        },
        {
          "prompt":"How does oxygen move from an alveolus into the blood?",
          "answer":"By diffusion down its concentration gradient.",
          "explanation":"The thin alveolar-capillary barrier gives a short diffusion distance."
        },
        {
          "prompt":"Why must gaseous exchange surfaces be moist?",
          "answer":"Gases must dissolve before they can diffuse across cell membranes.",
          "explanation":"Moisture therefore supports movement across the exchange surface."
        },
        {
          "prompt":"Which cells control the opening of a stoma?",
          "answer":"Guard cells.",
          "explanation":"The pore between the guard cells is the stoma."
        },
        {
          "prompt":"How does air enter the insect tracheal system?",
          "answer":"Through spiracles.",
          "explanation":"Air then travels through tracheae and fine tracheoles."
        }
      ],
      "summary":"Different organisms use different structures, but efficient gaseous exchange follows the same diffusion principles: maximise surface area, minimise diffusion distance, keep the surface suitable for gases to dissolve, and maintain concentration gradients."
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
  || '{"topicsBuilt":52,"objectivesBuilt":52}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
