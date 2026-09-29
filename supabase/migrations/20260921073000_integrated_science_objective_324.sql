begin;

-- CSEC Integrated Science objective 3.2.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t2-4-volcanic-eruptions',
  'module-3-environment',
  '3.2.4 Volcanic Eruptions',
  'Explain the causes of different eruption styles and relate magma properties, volcano type, plate boundaries, monitoring and Caribbean volcanic examples.',
  740,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Terrestrial Environment","objective":"3.2.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Distinguish magma from lava.",
        "Explain how magma viscosity and trapped gases affect eruption style.",
        "Compare shield, composite and cinder-cone volcanoes.",
        "Identify the crater, main vent, cone and magma chamber.",
        "Relate earthquakes and volcanoes to tectonic plate boundaries.",
        "Identify Kick-''em-Jenny as a submarine Caribbean volcano.",
        "Describe impacts of the Soufrière Hills eruption in Montserrat.",
        "Explain a long-term benefit and short-term cost of volcanic activity.",
        "Explain the use of a seismograph and logarithmic earthquake magnitude.",
        "State an appropriate earthquake-safety response indoors."
      ],
      "introduction":"Volcanic eruptions occur when magma rises through Earth''s crust and reaches the surface. The style of eruption depends strongly on magma composition, viscosity, gas content and the tectonic setting.",
      "sections":[
        {"title":"Magma and lava","paragraphs":[
          "Molten rock below Earth''s surface is called magma.",
          "When magma reaches the surface, it is called lava."
        ]},
        {"title":"Why some eruptions are gentle","paragraphs":[
          "Low-viscosity magma flows relatively easily and allows dissolved gases to escape more readily.",
          "This favours mainly effusive eruptions in which runny lava travels away from the vent."
        ]},
        {"title":"Why some eruptions are explosive","paragraphs":[
          "High-viscosity magma resists flow and can trap expanding gases.",
          "Pressure builds inside the magma until gas escapes violently, producing ash, fragmented rock and explosive eruptions."
        ]},
        {"title":"Shield volcanoes","paragraphs":[
          "Shield volcanoes are broad with gentle slopes because fluid lava can travel long distances before cooling.",
          "They are built mainly by repeated low-viscosity lava flows."
        ]},
        {"title":"Composite volcanoes","paragraphs":[
          "Composite or stratovolcanoes are tall, steep-sided volcanoes built from alternating lava and pyroclastic deposits.",
          "Their more viscous magma can trap gases and produce powerful explosive eruptions."
        ]},
        {"title":"Cinder cones","paragraphs":[
          "Cinder cones are built mainly from fragments of lava, called cinders or scoria, thrown from a vent.",
          "The fragments fall around the vent and build a steep cone."
        ]},
        {"title":"Volcano structure","paragraphs":[
          "A magma chamber is a subsurface region where molten rock can collect.",
          "Magma rises through a main vent and may erupt from a crater at the summit.",
          "The volcanic cone is built from erupted lava and fragmented material."
        ]},
        {"title":"Plate boundaries, earthquakes and volcanoes","paragraphs":[
          "Earthquakes and volcanoes commonly occur near tectonic plate boundaries.",
          "Plate movement can fracture rock, generate earthquakes and create conditions that allow magma to form and rise."
        ]},
        {"title":"Kick-''em-Jenny","paragraphs":[
          "Kick-''em-Jenny, north of Grenada, is a live submarine volcano in the Eastern Caribbean.",
          "Because it is underwater, monitoring is important for marine and regional volcanic hazards."
        ]},
        {"title":"Soufrière Hills, Montserrat","paragraphs":[
          "The Soufrière Hills Volcano produced dome-forming and explosive activity during the 1995–2010 eruptive episode.",
          "Pyroclastic flows and ash caused severe destruction and Plymouth was abandoned."
        ]},
        {"title":"Costs and benefits","paragraphs":[
          "Short-term eruption effects include ash damage to crops, buildings, water supplies, transport and air quality.",
          "Over long periods, weathered volcanic material can form fertile soils, and volcanic regions may provide geothermal resources and tourism opportunities."
        ]},
        {"title":"Seismic monitoring and earthquake magnitude","paragraphs":[
          "A seismograph or seismometer detects and records vibrations of the ground.",
          "Volcano observatories use seismic activity as one of several indicators when monitoring volcanic unrest.",
          "On the original Richter scale, each whole-number increase corresponds to about ten times greater recorded wave amplitude."
        ]},
        {"title":"Earthquake safety","paragraphs":[
          "During strong shaking indoors, Drop, Cover and Hold On under sturdy furniture if possible.",
          "Stay away from windows and do not use elevators during the shaking."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t2-4-volcanic-eruptions","type":"volcano-eruptions","title":"Volcano type, eruption style and monitoring explorer"}],
      "keyPoints":[
        "Magma below the surface is called lava after it erupts.",
        "Low-viscosity magma usually produces more effusive eruptions.",
        "Viscous gas-rich magma can produce explosive eruptions.",
        "Shield volcanoes are broad and gentle.",
        "Composite volcanoes are steep and layered.",
        "Cinder cones are built from erupted fragments.",
        "Kick-''em-Jenny is a submarine volcano north of Grenada.",
        "Soufrière Hills devastated Plymouth, Montserrat.",
        "Seismographs record ground vibrations.",
        "Volcanoes and earthquakes commonly occur near plate boundaries."
      ],
      "workedExample":{
        "title":"Predicting eruption style",
        "prompt":"A volcano contains thick, sticky magma with a high gas content. Predict whether its eruption is more likely to be effusive or explosive.",
        "steps":[
          "Thick magma has high viscosity.",
          "High-viscosity magma resists flow.",
          "Gas bubbles cannot escape easily.",
          "Gas pressure builds inside the magma.",
          "Sudden pressure release can fragment the magma and produce an explosive eruption."
        ],
        "answer":"An explosive eruption is more likely."
      },
      "checks":[
        {"prompt":"What is magma called after it reaches Earth''s surface?","answer":"Lava.","explanation":"Magma is molten rock below the surface."},
        {"prompt":"Why do shield volcanoes have gentle slopes?","answer":"Their runny low-viscosity lava flows long distances.","explanation":"The lava spreads widely before cooling."},
        {"prompt":"Why can composite volcanoes erupt explosively?","answer":"Their viscous magma traps gases and allows pressure to build.","explanation":"Rapid gas expansion can fragment magma violently."},
        {"prompt":"What instrument records ground vibrations?","answer":"A seismograph or seismometer.","explanation":"It records seismic waves produced by earthquakes and volcanic activity."},
        {"prompt":"What should a person indoors do during strong earthquake shaking?","answer":"Drop, Cover and Hold On.","explanation":"This reduces injury from falling and moving objects."}
      ],
      "summary":"Eruption style reflects magma viscosity and gas behaviour. Volcano type, tectonic setting and monitoring evidence help explain both the hazards and the long-term effects of volcanism."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":74,"objectivesBuilt":74}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
