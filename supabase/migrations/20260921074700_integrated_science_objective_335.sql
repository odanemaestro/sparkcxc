begin;

-- CSEC Integrated Science objective 3.3.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-5-water-pollution',
  'module-3-environment',
  '3.3.5 Water Pollution and Aquatic Life',
  'Evaluate how nutrients, sewage, oil, pesticides, heat and sediment affect aquatic organisms, dissolved oxygen, coral reefs and mangroves.',
  772,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.5","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain eutrophication and oxygen depletion.",
        "Explain the effects of oil spills on seabirds.",
        "Explain how sewage adds nutrients and pathogens.",
        "Explain how some pesticides accumulate in food chains.",
        "Explain thermal pollution and dissolved oxygen loss.",
        "Explain how sediment damages coral reefs.",
        "Explain the importance of mangroves as nursery habitats.",
        "Interpret changes in dissolved oxygen downstream from a sewage input."
      ],
      "introduction":"Water pollution can harm aquatic life by reducing dissolved oxygen, introducing toxic substances or pathogens, changing temperature and damaging habitats.",
      "sections":[
        {"title":"Eutrophication","paragraphs":[
          "Fertiliser runoff and sewage can add nitrates and phosphates to rivers, ponds and coastal water.",
          "The extra nutrients can cause rapid algal growth.",
          "When large amounts of algae die, decomposer microorganisms break them down and use oxygen during respiration.",
          "Dissolved oxygen may fall so low that fish and other aerobic organisms die."
        ]},
        {"title":"Oil spills","paragraphs":[
          "Oil can coat seabird feathers and reduce their waterproofing and insulation.",
          "Birds may lose body heat, have difficulty flying and ingest oil while preening."
        ]},
        {"title":"Sewage","paragraphs":[
          "Raw sewage contains organic matter, nutrients and disease-causing microorganisms.",
          "Nutrient enrichment can contribute to algal blooms, while bacterial decomposition can reduce dissolved oxygen."
        ]},
        {"title":"Pesticides","paragraphs":[
          "Some pesticides entering water can persist in organisms and become more concentrated through food chains.",
          "Predators at higher trophic levels may therefore receive larger doses."
        ]},
        {"title":"Thermal pollution","paragraphs":[
          "Water discharged at a higher temperature can reduce dissolved oxygen because warm water holds less oxygen than cool water.",
          "Sudden temperature change can also stress organisms directly."
        ]},
        {"title":"Sediment and coral reefs","paragraphs":[
          "Soil erosion can carry silt into coastal water.",
          "Suspended sediment blocks light, while settled sediment can smother coral surfaces.",
          "Reduced light also affects the photosynthetic algae associated with reef-building corals."
        ]},
        {"title":"Mangroves","paragraphs":[
          "Mangrove roots provide shelter and nursery habitat for juvenile fish and other organisms.",
          "Mangroves also trap sediment and help reduce coastal erosion and wave energy.",
          "Destroying mangrove habitat can reduce fish recruitment and weaken coastal protection."
        ]},
        {"title":"Coral reefs and parrotfish","paragraphs":[
          "Healthy reefs are damaged by pollution, sediment and unusually high temperature.",
          "Parrotfish are natural reef organisms and help graze algae that might otherwise overgrow coral."
        ]},
        {"title":"Dissolved oxygen downstream","paragraphs":[
          "Near a major sewage input, microorganisms may use large amounts of oxygen while decomposing organic waste.",
          "Farther downstream, after much of the waste has been broken down and the river mixes with air, dissolved oxygen may recover."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-5-water-pollution","type":"water-pollution","title":"Water pollution and aquatic-life explorer"}],
      "keyPoints":[
        "Eutrophication begins with excess nutrients.",
        "Decomposition of algal material can deplete dissolved oxygen.",
        "Oil damages seabird feather function.",
        "Raw sewage adds nutrients and pathogens.",
        "Some pesticides can accumulate through food chains.",
        "Warm water holds less dissolved oxygen.",
        "Sediment can block light and smother coral.",
        "Mangroves are important nursery habitats.",
        "Parrotfish are part of healthy reef ecosystems."
      ],
      "workedExample":{
        "title":"Explaining a fish kill",
        "prompt":"A fertilised field drains into a pond. A large algal bloom forms and later many fish die. Explain the sequence.",
        "steps":[
          "Fertiliser adds nitrate and phosphate nutrients.",
          "Algae grow rapidly.",
          "Many algae later die.",
          "Decomposer microorganisms break down the dead material.",
          "Their respiration uses dissolved oxygen.",
          "Fish may suffocate when oxygen becomes too low."
        ],
        "answer":"The fish die because eutrophication leads to decomposition that removes dissolved oxygen from the water."
      },
      "checks":[
        {"prompt":"What is eutrophication?","answer":"Nutrient enrichment that causes excessive algal or plant growth and can lead to oxygen depletion.","explanation":"Nitrates and phosphates commonly drive the process."},
        {"prompt":"Why can warm industrial discharge kill fish?","answer":"Warm water holds less dissolved oxygen and can stress organisms.","explanation":"Thermal pollution changes both oxygen availability and temperature."},
        {"prompt":"How does silt damage coral reefs?","answer":"It blocks light and can settle on and smother coral.","explanation":"Coral-associated algae need light for photosynthesis."},
        {"prompt":"Why are mangroves important to fisheries?","answer":"They provide breeding and nursery habitat for many young fish.","explanation":"Juveniles shelter among the roots."}
      ],
      "summary":"Aquatic pollution affects oxygen, food webs, animal health and habitat. Protecting water quality and coastal ecosystems supports fisheries and biodiversity."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
