begin;

-- CSEC Integrated Science objective 2.1.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t1-4-energy-environment',
  'module-2-energy',
  '2.1.4 Energy Transfer in the Environment',
  'Analyse energy transfer in ecosystems using food chains, trophic levels, decomposers, ecological pyramids and the effects of changes in populations.',
  450,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Conservation of Energy",
      "objective":"2.1.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how energy enters and moves through food chains.",
        "Identify producers, primary consumers, secondary consumers and tertiary consumers.",
        "Use trophic levels correctly.",
        "Explain the role of decomposers.",
        "Distinguish population, community, habitat and ecosystem.",
        "Explain why energy decreases at successive trophic levels.",
        "Interpret pyramids of energy and pyramids of numbers.",
        "Predict how changes in one population can affect other populations in a food web."
      ],
      "introduction":"Energy enters most ecosystems as light from the Sun. Producers capture some of this light energy during photosynthesis, and the stored chemical energy then passes through feeding relationships. Food-chain arrows show the direction of this energy transfer.",
      "sections":[
        {
          "title":"Food chains and trophic levels",
          "paragraphs":[
            "A producer makes organic food from simple substances, usually by photosynthesis. Green plants and phytoplankton are common producers.",
            "A primary consumer feeds directly on producers. A secondary consumer feeds on primary consumers, while a tertiary consumer feeds at the next trophic level.",
            "For the food chain grass → grasshopper → lizard → hawk, grass is the producer, grasshopper is the primary consumer, lizard is the secondary consumer and hawk is the tertiary consumer.",
            "Producers occupy trophic level 1, so primary consumers occupy trophic level 2."
          ]
        },
        {
          "title":"Energy flow",
          "paragraphs":[
            "Food-chain arrows point from the organism being eaten to the organism that eats it. They show the direction in which chemical energy is transferred.",
            "Only a small fraction of the energy at one trophic level becomes available to the next. A value of about 10% is often used as an approximation in simple ecological calculations."
          ]
        },
        {
          "title":"Why less energy reaches higher trophic levels",
          "paragraphs":[
            "Organisms use energy for respiration and other life processes. Much of this energy is eventually transferred to the surroundings as heat.",
            "Some material is not eaten, and some ingested material leaves the body as waste. Energy stored in this material is therefore not transferred directly to the next consumer.",
            "Because less energy is available at higher trophic levels, top carnivore populations are usually smaller."
          ]
        },
        {
          "title":"Decomposers",
          "paragraphs":[
            "Bacteria and fungi that break down dead organisms and organic waste are decomposers.",
            "Decomposition releases mineral nutrients back into the environment. Matter is recycled, while energy continues to flow through the ecosystem and is ultimately transferred to the surroundings."
          ]
        },
        {
          "title":"Ecology terms",
          "paragraphs":[
            "A population is a group of organisms of the same species living in the same area at the same time.",
            "A community includes all the populations of different species living in an area at the same time.",
            "A habitat is the place where an organism lives.",
            "An ecosystem consists of a community of organisms together with the non-living environment."
          ]
        },
        {
          "title":"Ecological pyramids",
          "paragraphs":[
            "A pyramid of energy shows the amount of energy available at each trophic level. It is always widest at the producer level because energy decreases as it passes through the food chain.",
            "A pyramid of numbers shows the number of organisms at each trophic level. It can be irregular or inverted. One large mango tree can support many caterpillars, which may support fewer birds."
          ]
        },
        {
          "title":"Marine food chains",
          "paragraphs":[
            "Many marine food chains begin with phytoplankton. These microscopic producers capture light energy by photosynthesis.",
            "A simple marine chain is phytoplankton → zooplankton → small fish → shark."
          ]
        },
        {
          "title":"Changes in food webs",
          "paragraphs":[
            "Removing predators can increase prey numbers at first. For example, if shark numbers fall because of overfishing, the small fish they eat may initially increase.",
            "If pesticides kill many zooplankton, phytoplankton may increase because less is being eaten, while small fish may decrease because their food supply has fallen.",
            "If a disease removes a major prey species such as frogs, predator populations such as snakes may decrease because less food is available."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t1-4-environment-energy",
          "type":"environment-energy",
          "title":"Environmental energy-transfer explorer"
        }
      ],
      "keyPoints":[
        "Food-chain arrows show the direction of energy transfer.",
        "Producers occupy trophic level 1.",
        "Primary consumers occupy trophic level 2.",
        "Only a small fraction of energy, often approximated as 10%, passes to the next trophic level.",
        "Much energy is transferred to the surroundings as heat during respiration.",
        "Bacteria and fungi act as decomposers.",
        "A pyramid of energy is always widest at its base.",
        "A pyramid of numbers can be inverted or irregular.",
        "Phytoplankton are major producers in marine ecosystems."
      ],
      "workedExample":{
        "title":"Predicting a food-chain disturbance",
        "prompt":"Pesticide pollution kills many zooplankton in the chain phytoplankton → zooplankton → small fish. Predict the first changes in phytoplankton and small-fish populations.",
        "steps":[
          "Zooplankton numbers fall.",
          "Less phytoplankton is eaten.",
          "Phytoplankton numbers therefore increase at first.",
          "Small fish have less zooplankton available as food.",
          "Small-fish numbers therefore decrease."
        ],
        "answer":"Phytoplankton increase at first because grazing decreases, while small fish decrease because their food supply falls."
      },
      "checks":[
        {
          "prompt":"What do arrows in a food chain show?",
          "answer":"The direction of energy transfer.",
          "explanation":"The arrow points from the organism eaten to the organism that obtains energy from it."
        },
        {
          "prompt":"What is the role of decomposers?",
          "answer":"They break down dead organisms and organic waste and return mineral nutrients to the environment.",
          "explanation":"Bacteria and fungi are common decomposers."
        },
        {
          "prompt":"Why is a pyramid of energy always widest at the base?",
          "answer":"Less energy is available at each successive trophic level.",
          "explanation":"Energy is transferred to the surroundings and remains in material not passed to the next consumer."
        },
        {
          "prompt":"Why can a pyramid of numbers have a narrow producer level?",
          "answer":"One large producer can support many smaller consumers.",
          "explanation":"A single mango tree can support many caterpillars."
        },
        {
          "prompt":"What is the difference between a population and a community?",
          "answer":"A population contains organisms of one species, while a community contains populations of different species living in the same area.",
          "explanation":"Both terms refer to organisms living in a defined area."
        }
      ],
      "summary":"Energy enters ecosystems through producers and moves through trophic levels. Less energy is available at each higher level, while decomposers recycle nutrients from dead material. Changes in one population can alter several connected feeding relationships."
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
  || '{"topicsBuilt":45,"objectivesBuilt":45}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
