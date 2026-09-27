begin;

-- CSEC Integrated Science objective 3.3.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-1-water-properties',
  'module-3-environment',
  '3.3.1 Properties of Water',
  'Explain important physical and chemical properties of water and relate them to fresh water, sea water, living organisms and aquatic environments.',
  750,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "State the freezing and boiling points of pure water at normal atmospheric pressure.",
        "Explain why ice floats on liquid water.",
        "Compare the density and phase-change temperatures of fresh water and sea water.",
        "Explain the importance of water''s high specific heat capacity.",
        "Explain why water is an important solvent and transport medium.",
        "Explain surface tension.",
        "Relate temperature and movement to dissolved oxygen in water.",
        "Identify sodium chloride as the main dissolved salt in sea water.",
        "Explain osmosis problems when freshwater and marine fish are placed in unsuitable water.",
        "Explain why reef-building corals require warm, clear, shallow water with adequate light."
      ],
      "introduction":"Water has unusual physical and chemical properties that make it essential for life and strongly influence aquatic environments. These properties affect temperature stability, transport, density, gas content and the survival of organisms in fresh and marine water.",
      "sections":[
        {"title":"Freezing and boiling","paragraphs":[
          "At normal atmospheric pressure, pure water freezes at about 0 °C and boils at about 100 °C.",
          "Evaporation can occur below the boiling point when water molecules at the surface gain enough energy to escape into the air."
        ]},
        {"title":"Expansion on freezing","paragraphs":[
          "Water expands when it freezes because the molecules form a more open structure in ice.",
          "Ice is therefore less dense than liquid water and floats.",
          "The expansion of freezing water can exert enough pressure to burst pipes in very cold conditions."
        ]},
        {"title":"Fresh water and sea water","paragraphs":[
          "Dissolved salts make sea water denser than fresh water.",
          "Sea water freezes below 0 °C and boils slightly above 100 °C because dissolved salts change its phase-change temperatures.",
          "The main dissolved salt in sea water is sodium chloride."
        ]},
        {"title":"High specific heat capacity","paragraphs":[
          "Water has a high specific heat capacity, so a relatively large amount of energy is needed to change its temperature.",
          "Large bodies of water therefore warm and cool slowly, helping to reduce rapid temperature changes in aquatic habitats.",
          "This property is also useful when water is used as a coolant."
        ]},
        {"title":"Water as a solvent","paragraphs":[
          "Water dissolves many ionic and polar substances and is often described as a universal solvent.",
          "The term does not mean that water dissolves everything.",
          "Because many substances dissolve in water, blood plasma, plant sap and natural waters can transport nutrients, mineral ions, gases and wastes."
        ]},
        {"title":"Surface tension","paragraphs":[
          "Water molecules attract each other strongly.",
          "At the surface, these cohesive forces create surface tension, which makes the surface behave somewhat like an elastic skin.",
          "Small insects can use this surface without breaking through it."
        ]},
        {"title":"Dissolved oxygen","paragraphs":[
          "Gases are generally more soluble in colder water than in warmer water.",
          "Movement and wave action mix air into water.",
          "Cold, moving water therefore tends to contain more dissolved oxygen than warm, still water."
        ]},
        {"title":"Osmosis and fish","paragraphs":[
          "Sea water is more concentrated than the body fluids of a freshwater fish. If a freshwater fish is placed in sea water, water tends to leave its cells by osmosis.",
          "Fresh water is more dilute than the body fluids of a marine fish. If a marine fish is placed in fresh water, water tends to enter its cells by osmosis.",
          "Fish are adapted to regulate water and salts in their normal environment, so sudden transfer between very different salinities can be harmful or fatal."
        ]},
        {"title":"Coral reefs","paragraphs":[
          "Many reef-building corals contain photosynthetic algae living in their tissues.",
          "These algae require light, so healthy coral reefs are commonly found in warm, shallow, clear tropical water where sunlight can penetrate."
        ]},
        {"title":"Water quality","paragraphs":[
          "Oil on the water surface can reduce gas exchange with the atmosphere.",
          "Sewage can increase microbial respiration, lowering dissolved oxygen and making conditions unsuitable for many aquatic organisms."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-1-water-properties","type":"water-properties","title":"Water properties and aquatic-environment explorer"}],
      "keyPoints":[
        "Pure water freezes near 0 °C and boils near 100 °C at normal atmospheric pressure.",
        "Water expands on freezing, so ice is less dense and floats.",
        "Sea water is denser than fresh water.",
        "Water has a high specific heat capacity.",
        "Water dissolves many substances but not everything.",
        "Surface tension results from cohesion between water molecules.",
        "Cold moving water generally contains more dissolved oxygen.",
        "Sodium chloride is the main dissolved salt in sea water.",
        "Osmosis can harm fish transferred between fresh and salt water.",
        "Reef-building corals need warm, clear, well-lit tropical water."
      ],
      "workedExample":{
        "title":"Freshwater fish placed in sea water",
        "prompt":"Explain why a freshwater fish may die if it is suddenly placed in sea water.",
        "steps":[
          "Sea water has a higher concentration of dissolved salts than the fish''s body fluids.",
          "The external solution therefore has a lower water concentration.",
          "Water moves out of the fish''s cells by osmosis.",
          "The fish loses water and its normal water-and-salt balance is disrupted."
        ],
        "answer":"Water leaves the fish''s cells by osmosis because sea water is more concentrated, disrupting the fish''s internal water balance."
      },
      "checks":[
        {"prompt":"Why does ice float on water?","answer":"Ice is less dense than liquid water.","explanation":"Water expands when it freezes."},
        {"prompt":"Why do aquatic habitats change temperature more slowly than land?","answer":"Water has a high specific heat capacity.","explanation":"A large amount of energy is needed to change water temperature."},
        {"prompt":"Which contains more dissolved oxygen: cold moving water or warm still water?","answer":"Cold moving water.","explanation":"Cold water holds more gas and movement mixes air into the water."},
        {"prompt":"What is the main dissolved salt in sea water?","answer":"Sodium chloride.","explanation":"Sodium and chloride ions make up most of the dissolved salts."},
        {"prompt":"Why do many corals grow in shallow clear water?","answer":"Photosynthetic algae living in the corals require light.","explanation":"Clear shallow water allows strong sunlight to reach the algae."}
      ],
      "summary":"Water''s density behaviour, heat capacity, solvent action, surface tension and ability to carry dissolved gases and salts explain many features of fresh-water and marine environments."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":75,"objectivesBuilt":75}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
