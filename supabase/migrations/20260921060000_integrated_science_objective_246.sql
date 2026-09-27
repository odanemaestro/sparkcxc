begin;

-- CSEC Integrated Science objective 2.4.6
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-6-artificial-light',
  'module-2-energy',
  '2.4.6 Artificial Sources of Light',
  'Compare common artificial light sources in terms of efficiency, heat production, shadows, colour, dimming, materials, lifetime cost and disposal.',
  610,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.6",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Compare filament, fluorescent, compact fluorescent and LED lamps.",
        "Explain why filament lamps are less energy efficient.",
        "Explain why an extended light source produces softer shadows.",
        "Identify a daylight fluorescent tube as the bank answer most similar to daylight.",
        "Explain why filament lamps are easy to dim with a simple compatible dimmer.",
        "Identify tungsten as the filament material in an incandescent lamp.",
        "Explain why fluorescent tubes and CFLs need careful disposal.",
        "Compare purchase cost with long-term running cost."
      ],
      "introduction":"Artificial light sources differ in how efficiently they convert electrical energy into useful visible light. They also differ in source size, colour appearance, control, heat output, useful life and disposal requirements.",
      "sections":[
        {
          "title":"Filament lamps",
          "paragraphs":[
            "A filament lamp passes current through a thin tungsten filament. Tungsten is used because it withstands very high temperature before melting.",
            "The filament becomes white hot and emits light. Most of the electrical input becomes heat rather than useful visible light.",
            "CSEC questions often use the simplified statement that only about 10% becomes useful light."
          ]
        },
        {
          "title":"Fluorescent tubes and CFLs",
          "paragraphs":[
            "Fluorescent lamps produce light using an electrical discharge and a phosphor coating. They use less electrical power than filament lamps for similar useful illumination.",
            "A fluorescent tube is an extended source rather than a point source. Different parts of the long tube illuminate the object from different directions, producing a wider penumbra and softer shadow edges.",
            "Compact fluorescent lamps, CFLs, use the same general fluorescent-light principle in a compact shape."
          ]
        },
        {
          "title":"LED lamps",
          "paragraphs":[
            "LED lamps use light-emitting semiconductors and are generally the most energy-efficient household option among filament, CFL and LED lamps.",
            "LEDs require much less electrical power than filament lamps for the same useful illumination and usually last much longer.",
            "Although the purchase price may be higher, lower electricity use and longer service life can make LEDs cheaper over time."
          ]
        },
        {
          "title":"Dimming",
          "paragraphs":[
            "Traditional filament lamps respond smoothly to a simple compatible dimmer because reducing electrical input reduces filament temperature and brightness.",
            "Fluorescent lamps require suitable electronic control gear for dimming. Only dimmable CFLs or LEDs should be used with compatible dimmer controls."
          ]
        },
        {
          "title":"Light colour",
          "paragraphs":[
            "A candle or warm filament lamp produces a warm yellow-red appearance.",
            "A daylight fluorescent tube is designed to appear closer to natural daylight and is the bank answer when compared with candlelight, a normal filament lamp and a sodium street lamp.",
            "Modern LED lamps are available in a wide range of colour temperatures, including warm white and daylight white."
          ]
        },
        {
          "title":"Mercury and disposal",
          "paragraphs":[
            "Fluorescent tubes and CFLs contain a small amount of mercury. Mercury is toxic, so these lamps should be handled and disposed of carefully.",
            "They should not be deliberately broken. Where suitable lamp-recycling or hazardous-waste collection is available, it should be used.",
            "LED lamps do not require mercury to produce light, although their electronic materials should still be recovered through appropriate waste systems where available."
          ]
        },
        {
          "title":"Shadows",
          "paragraphs":[
            "A point source produces a sharp shadow because light effectively travels from one small position.",
            "An extended source such as a fluorescent tube produces a penumbra because some parts of the source remain visible around the edges of the object.",
            "This is why long fluorescent tubes generally produce fewer sharp shadows than a small filament source."
          ]
        },
        {
          "title":"Efficiency and lifetime cost",
          "paragraphs":[
            "Efficiency comparisons should be based on the useful light needed, not simply on whether one lamp appears brighter in isolation.",
            "A lower-wattage lamp that provides the same useful illumination consumes less electrical energy.",
            "Long-term cost includes purchase price, electricity use and replacement frequency."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-6-artificial-light",
          "type":"artificial-lighting",
          "title":"Artificial lighting comparison explorer"
        }
      ],
      "keyPoints":[
        "Filament lamps are the least energy-efficient source in the bank comparison.",
        "Most filament-lamp input becomes heat.",
        "Tungsten is used for incandescent filaments.",
        "Fluorescent tubes are extended sources and produce softer shadows.",
        "A point source produces a sharper shadow.",
        "A daylight fluorescent tube is the bank answer most similar to natural daylight.",
        "Fluorescent tubes and CFLs contain a small amount of mercury.",
        "LEDs use less electrical power than filament lamps for similar useful light.",
        "LEDs often cost less over their lifetime despite a higher purchase price."
      ],
      "workedExample":{
        "title":"Comparing running cost",
        "prompt":"A 60 W filament lamp and a 9 W LED provide similar useful lighting. Both operate for 1000 hours. Which uses less electrical energy?",
        "steps":[
          "Filament energy = 0.060 kW × 1000 h = 60 kWh.",
          "LED energy = 0.009 kW × 1000 h = 9 kWh.",
          "Energy saved = 60 - 9 = 51 kWh."
        ],
        "answer":"The LED uses less electrical energy, saving 51 kWh over 1000 hours in this example."
      },
      "checks":[
        {
          "prompt":"Which common source is least efficient in the bank comparison?",
          "answer":"A filament lamp.",
          "explanation":"Most of its electrical energy becomes heat."
        },
        {
          "prompt":"Why does a fluorescent tube give a softer shadow than a point source?",
          "answer":"It is an extended source, so some light reaches the edge of the shadow from different parts of the tube, creating a penumbra.",
          "explanation":"A point source produces a sharper boundary."
        },
        {
          "prompt":"What metal is used for the filament of an incandescent lamp?",
          "answer":"Tungsten.",
          "explanation":"Tungsten has a very high melting point."
        },
        {
          "prompt":"Why must CFLs and fluorescent tubes be disposed of carefully?",
          "answer":"They contain a small amount of toxic mercury.",
          "explanation":"They should be routed through suitable collection where available."
        },
        {
          "prompt":"Why can an LED be cheaper in the long run even if it costs more to buy?",
          "answer":"It uses less electrical energy and generally lasts much longer.",
          "explanation":"Running and replacement costs matter as well as purchase price."
        }
      ],
      "summary":"Choose artificial lighting by considering useful light, power, heat, colour, control, shadow quality, lifetime and disposal. LEDs generally provide the best energy efficiency among the household sources compared here."
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
  || '{"topicsBuilt":61,"objectivesBuilt":61}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
