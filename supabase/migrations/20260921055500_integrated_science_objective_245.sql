begin;

-- CSEC Integrated Science objective 2.4.5
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-5-energy-conservation',
  'module-2-energy',
  '2.4.5 Energy Conservation Measures',
  'Discuss practical energy-conservation measures for homes, schools, cooling, cooking, lighting and transport.',
  600,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.5",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define energy conservation as reducing unnecessary energy use and waste.",
        "Explain how switching off unused appliances and lights saves energy.",
        "Explain how occupancy sensors reduce lighting waste.",
        "Explain why LEDs conserve more energy than filament lamps.",
        "Explain how refrigerator operation and damaged door seals affect energy use.",
        "Describe energy-saving practices for air conditioning and cooking.",
        "Explain how light-coloured roofs reduce cooling demand.",
        "Relate appliance efficiency ratings to lower wasted energy.",
        "Explain how car-pooling and active or shared transport reduce fuel use per person."
      ],
      "introduction":"Energy conservation means reducing unnecessary energy use and waste while still providing the required service. Conservation saves money and resources because less energy must be generated, transmitted or supplied as fuel.",
      "sections":[
        {
          "title":"Switch off unused equipment",
          "paragraphs":[
            "Lights, computers and other equipment should be switched off when they are not needed.",
            "Some appliances continue to draw standby power even when they are not actively being used. Switching them fully off or unplugging suitable devices reduces this unnecessary consumption."
          ]
        },
        {
          "title":"Efficient lighting",
          "paragraphs":[
            "LED lamps produce useful light with much lower electrical power than traditional filament lamps for the same general lighting task.",
            "Filament lamps waste a large fraction of their electrical input as heat.",
            "Occupancy sensors conserve energy by switching lights off automatically when a room is empty."
          ]
        },
        {
          "title":"Refrigerators",
          "paragraphs":[
            "A refrigerator door should be kept closed as much as possible so warm room air does not enter unnecessarily.",
            "A broken door seal allows warm air to leak in continuously. The compressor then runs longer to keep the interior cold, increasing electrical energy use."
          ]
        },
        {
          "title":"Air conditioning and building heat gain",
          "paragraphs":[
            "Doors and windows should be kept closed while air conditioning is operating so warm outdoor air does not continually enter the cooled space.",
            "White and other light-coloured roof surfaces reflect more incoming solar radiation than dark surfaces. This reduces heat gain and can reduce the amount of air-conditioning energy required."
          ]
        },
        {
          "title":"Kitchen energy conservation",
          "paragraphs":[
            "Covering pots while cooking reduces heat loss by convection and evaporation.",
            "Only the amount of water needed should be heated. Boiling excess water wastes energy.",
            "A pot should be matched reasonably to the burner size so less heat escapes around the sides."
          ]
        },
        {
          "title":"Laundry and household appliances",
          "paragraphs":[
            "Drying clothes on a line in suitable weather can replace electricity that would otherwise be used by a clothes dryer.",
            "A high energy-efficiency rating indicates that an appliance provides the required useful service with less wasted input energy."
          ]
        },
        {
          "title":"Energy conservation at school",
          "paragraphs":[
            "Schools can reduce energy use by switching off lights, fans, air conditioners, computers and monitors when spaces are not in use.",
            "Computer laboratories should be shut down at the end of the day rather than leaving unused machines operating unnecessarily.",
            "Maintenance also matters because faulty cooling equipment, damaged seals and poorly controlled lighting increase consumption."
          ]
        },
        {
          "title":"Transport",
          "paragraphs":[
            "Car-pooling reduces fuel used per person because one vehicle carries several people who might otherwise travel separately.",
            "Public transport, walking and cycling can also reduce fuel use per traveller when routes, distance and safety conditions make them suitable."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-5-energy-conservation",
          "type":"energy-conservation-measures",
          "title":"Energy conservation measures explorer"
        }
      ],
      "keyPoints":[
        "Energy conservation reduces energy waste.",
        "Switch off lights and equipment when they are not needed.",
        "Occupancy sensors can switch lights off automatically in empty rooms.",
        "LED lamps waste less energy as heat than filament lamps.",
        "A damaged refrigerator door seal makes the compressor run longer.",
        "Keep doors and windows closed while air conditioning is operating.",
        "White roofs reflect more solar radiation and reduce heat gain.",
        "Cover pots while cooking and avoid boiling more water than needed.",
        "High-efficiency appliances waste less input energy.",
        "Car-pooling reduces fuel used per person."
      ],
      "workedExample":{
        "title":"Estimating lighting savings",
        "prompt":"Ten 60 W lamps are replaced by 9 W LED lamps. The lamps are used for 5 hours each day. Calculate the daily energy saving.",
        "steps":[
          "Old total power = 10 × 60 = 600 W.",
          "New total power = 10 × 9 = 90 W.",
          "Power saved = 600 - 90 = 510 W = 0.51 kW.",
          "Daily energy saved = 0.51 × 5 = 2.55 kWh."
        ],
        "answer":"The replacement saves 2.55 kWh per day."
      },
      "checks":[
        {
          "prompt":"Why does an occupancy sensor save energy?",
          "answer":"It switches lighting off automatically when the room is empty.",
          "explanation":"This reduces unnecessary operating time."
        },
        {
          "prompt":"Why does a damaged refrigerator door seal waste energy?",
          "answer":"Warm air leaks in, so the compressor must run longer to maintain the low temperature.",
          "explanation":"The refrigerator must remove the extra heat entering the cabinet."
        },
        {
          "prompt":"Why does a white roof reduce cooling demand?",
          "answer":"It reflects more incoming solar radiation and absorbs less heat.",
          "explanation":"Lower heat gain reduces the cooling load."
        },
        {
          "prompt":"Why should pots be covered while cooking?",
          "answer":"A cover reduces heat loss by convection and evaporation.",
          "explanation":"More of the supplied heat remains available for cooking."
        },
        {
          "prompt":"How does car-pooling conserve energy?",
          "answer":"It reduces the amount of fuel used per person by carrying several people in one vehicle.",
          "explanation":"Fewer separate vehicle trips are needed."
        }
      ],
      "summary":"Energy conservation combines efficient equipment with good operating habits. Reduce unnecessary run time, heat loss, cooling load and fuel use while still meeting the required need."
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
  || '{"topicsBuilt":60,"objectivesBuilt":60}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
