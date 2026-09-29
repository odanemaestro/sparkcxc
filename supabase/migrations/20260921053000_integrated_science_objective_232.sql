begin;

-- CSEC Integrated Science objective 2.3.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t3-2-alternative-energy',
  'module-2-energy',
  '2.3.2 Alternative Energy Sources',
  'Assess alternative and renewable energy sources, their energy conversions, Caribbean applications, advantages, limitations and social and economic value.',
  550,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Fossil Fuels",
      "objective":"2.3.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Describe solar, wind, hydroelectric, geothermal, biomass, biogas and wave energy.",
        "Distinguish solar photovoltaic electricity from solar thermal heating.",
        "Explain how biogas is produced by anaerobic decomposition of organic waste.",
        "Identify ethanol from sugar cane as a biofuel.",
        "Explain how bagasse can be used as a boiler fuel.",
        "Evaluate energy sources by resource availability, reliability, cost and environmental effects.",
        "Relate renewable energy technologies to current Caribbean examples.",
        "Explain social and economic benefits of locally available renewable energy."
      ],
      "introduction":"Alternative energy sources reduce reliance on finite fossil fuels and can lower direct combustion emissions. No single source suits every place. A good energy decision matches the technology to local resources, electricity needs, cost, reliability and environmental conditions.",
      "sections":[
        {
          "title":"Solar photovoltaic energy",
          "paragraphs":[
            "A photovoltaic cell converts light energy directly into electrical energy.",
            "Solar PV is well suited to sunny locations, but output varies with cloud cover and time of day. Batteries, grid connections or other sources may be needed when sunlight is unavailable.",
            "A major limitation is the initial cost of panels, inverters, storage and installation."
          ]
        },
        {
          "title":"Solar thermal energy",
          "paragraphs":[
            "Solar water heaters use solar radiation to heat water. Dark collector surfaces absorb radiation well.",
            "An insulated storage tank reduces heat loss from the hot water.",
            "Solar cookers also use solar radiation as heat. Reflectors direct more sunlight into the cooker, dark surfaces absorb radiation and insulation reduces heat loss."
          ]
        },
        {
          "title":"Wind and wave energy",
          "paragraphs":[
            "Wind turbines convert kinetic energy of moving air into mechanical rotation and then electrical energy.",
            "Wind energy is best suited to locations with strong, dependable winds. It produces no direct greenhouse-gas emissions during normal operation, but output varies with wind speed.",
            "Wave-energy systems use the motion of sea waves to drive mechanical or electrical generation systems. Marine corrosion, storms and cost make wave systems technically demanding."
          ]
        },
        {
          "title":"Hydroelectric power",
          "paragraphs":[
            "Hydroelectric systems use water at height or flowing water to turn turbines connected to generators.",
            "Sites need suitable water flow and height difference. Dams and large hydro projects can alter river ecosystems and affect nearby communities.",
            "Guyana has operating mini-hydropower systems and is also pursuing larger hydropower development. Suriname''s Afobaka hydroelectric plant is a major part of its renewable electricity supply."
          ]
        },
        {
          "title":"Geothermal energy",
          "paragraphs":[
            "Geothermal energy uses heat from hot rocks and geothermal fluids beneath Earth''s surface. Steam or hot fluid can be used to generate electricity.",
            "Geothermal development is strongly location-dependent and exploration drilling is expensive.",
            "Dominica''s geothermal plant reached commercial operation on July 31, 2026. Saint Lucia is still carrying out the exploration and drilling stage to assess whether its geothermal resource is suitable for future electricity generation."
          ]
        },
        {
          "title":"Biomass, bagasse and biofuels",
          "paragraphs":[
            "Biomass contains chemical energy originally captured by photosynthesis. Biomass is renewable when the biological material is replaced at a sustainable rate.",
            "Bagasse is the fibrous residue left after sugar cane is crushed. It can be burned in boilers to produce steam and electricity.",
            "Ethanol made from sugar cane is a biofuel and can be blended with gasoline."
          ]
        },
        {
          "title":"Biogas",
          "paragraphs":[
            "Biogas is produced when microorganisms decompose animal manure, sewage or plant waste without oxygen.",
            "The resulting gas is rich in methane and can be burned as a fuel for heat or electricity.",
            "Biogas systems can treat organic waste while also recovering useful energy."
          ]
        },
        {
          "title":"Choosing an energy source",
          "paragraphs":[
            "A windy, flat island with no large rivers may be more suited to wind than hydroelectric power. A volcanic island with accessible geothermal resources may be suited to geothermal energy.",
            "Resource availability is only one factor. Reliability, installation cost, maintenance, storage, land and water effects and community acceptance also matter."
          ]
        },
        {
          "title":"Social and economic value",
          "paragraphs":[
            "Community-scale renewable electricity can improve access to reliable power for homes, schools, clinics and businesses.",
            "Using locally available renewable energy can reduce spending on imported fuel and reduce exposure to international fuel-price changes."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t3-2-alternative-energy",
          "type":"alternative-energy",
          "title":"Alternative energy and Caribbean applications explorer"
        }
      ],
      "keyPoints":[
        "Photovoltaic cells convert light directly to electricity.",
        "Solar water heaters convert solar radiation to thermal energy.",
        "Wind turbines convert wind kinetic energy to electrical energy.",
        "Hydroelectric systems require suitable water flow and height difference.",
        "Geothermal energy comes from heat beneath Earth''s surface.",
        "Biogas is produced by anaerobic decomposition of organic waste.",
        "Ethanol from sugar cane is a biofuel.",
        "Bagasse can fuel boilers to produce steam and electricity.",
        "Dominica has geothermal electricity in commercial operation as of July 31, 2026.",
        "Saint Lucia is still exploring its geothermal resource.",
        "Local renewable energy can reduce imported-fuel dependence."
      ],
      "workedExample":{
        "title":"Choosing energy for a windy island",
        "prompt":"A small flat island has strong trade winds, little river flow and no known geothermal resource. Which renewable source is most suitable and why?",
        "steps":[
          "Hydroelectric power is limited because there is little river flow or height difference.",
          "Geothermal power is not supported by a known geothermal resource.",
          "Strong reliable winds provide a useful local energy resource.",
          "Wind turbines can convert that kinetic energy to electricity."
        ],
        "answer":"Wind energy is the most suitable of the listed choices because the island has a strong local wind resource and lacks the water and geothermal conditions needed for the alternatives."
      },
      "checks":[
        {
          "prompt":"What energy conversion occurs in a photovoltaic cell?",
          "answer":"Light energy to electrical energy.",
          "explanation":"PV cells generate electricity directly from sunlight."
        },
        {
          "prompt":"How is biogas produced?",
          "answer":"By anaerobic decomposition of organic waste by microorganisms.",
          "explanation":"The gas produced is rich in methane."
        },
        {
          "prompt":"Why is biomass described as renewable?",
          "answer":"The biological material can be regrown or replaced.",
          "explanation":"Renewability still depends on using the resource sustainably."
        },
        {
          "prompt":"Why is the storage tank of a solar water heater insulated?",
          "answer":"To reduce heat loss from the hot water.",
          "explanation":"Insulation slows energy transfer to the surroundings."
        },
        {
          "prompt":"What is the current difference between Dominica and Saint Lucia in geothermal development?",
          "answer":"Dominica has a geothermal plant in commercial operation, while Saint Lucia is still assessing its resource through exploratory drilling.",
          "explanation":"This reflects the verified project status in 2026."
        }
      ],
      "summary":"Alternative energy planning starts with the local resource, then weighs reliability, cost, environmental effects and social value. Caribbean renewable projects range from mature hydropower to newly operating geothermal and active exploration."
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
  || '{"topicsBuilt":55,"objectivesBuilt":55}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
