begin;

-- CSEC Integrated Science objective 2.4.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-4-electrical-safety',
  'module-2-energy',
  '2.4.4 Electrical Safety',
  'Discuss the safety features of electrical devices, including plug wiring, fuses, circuit breakers, earthing, cable thickness, overloads and damaged insulation.',
  590,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the live, neutral and earth wires in a three-pin plug.",
        "State the colour of each plug wire.",
        "Explain why the fuse is connected in the live wire.",
        "Select a suitable fuse rating using appliance current.",
        "Explain the protective role of the earth wire.",
        "Compare a fuse with a resettable circuit breaker.",
        "Explain why overloading sockets and damaged flexes are dangerous.",
        "Explain why heavy-duty appliances and transmission cables require appropriately thick conductors."
      ],
      "introduction":"Electrical safety depends on correct wiring, suitable protective devices and intact insulation. The aim is to stop dangerous current quickly and prevent exposed metal parts or damaged cables from remaining live.",
      "sections":[
        {
          "title":"Three-pin plug wiring",
          "paragraphs":[
            "In the CSEC plug convention, brown is live, blue is neutral and green/yellow is earth.",
            "The live wire carries the alternating supply to the appliance. The neutral wire completes the normal circuit back to the supply.",
            "The earth wire is a protective conductor connected to exposed metal parts of appliances that require earthing."
          ]
        },
        {
          "title":"Why the fuse is in the live wire",
          "paragraphs":[
            "A fuse is connected in the live wire so that when excessive current melts the fuse element, the live connection is broken.",
            "Breaking the live connection disconnects the appliance from the dangerous supply potential."
          ]
        },
        {
          "title":"Selecting a fuse",
          "paragraphs":[
            "Calculate the normal appliance current using I = P ÷ V.",
            "A 690 W blender on 230 V draws 690 ÷ 230 = 3 A. The bank chooses a 5 A fuse because the protective rating should be just above the normal current rather than far above it.",
            "A 3 kW heater on 240 V draws 3000 ÷ 240 = 12.5 A, so a 13 A fuse is suitable."
          ]
        },
        {
          "title":"Fuses and circuit breakers",
          "paragraphs":[
            "A fuse contains a conductor designed to heat and melt when current exceeds its rating. Once it melts, the circuit is broken and the fuse must be replaced.",
            "A circuit breaker also disconnects a circuit when excessive current or another specified fault is detected. Many breakers can be reset after the fault is corrected."
          ]
        },
        {
          "title":"Earthing metal cases",
          "paragraphs":[
            "If a fault causes a live conductor to touch a metal case, the earth wire provides a low-resistance path for a large fault current.",
            "The protective device then disconnects the circuit, reducing the chance that a person touching the case becomes the path to earth."
          ]
        },
        {
          "title":"Overloading and damaged insulation",
          "paragraphs":[
            "Plugging too many appliances into one socket can draw a large current. Large current heats conductors and can damage or melt insulation, increasing fire risk.",
            "A frayed flex is dangerous because damaged insulation can expose live conductors and cause electric shock or fire."
          ]
        },
        {
          "title":"Cable thickness",
          "paragraphs":[
            "For the same material and length, a thicker conductor has lower resistance than a thinner one.",
            "Heavy-duty appliances such as electric stoves use appropriately sized cables so large current does not produce excessive resistive heating.",
            "Power-transmission cables are also designed with low enough resistance to limit heating and energy loss."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-4-electrical-safety",
          "type":"household-electrical-safety",
          "title":"Plug wiring, fuses and electrical-safety explorer"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m2-t4-4-three-pin-plug",
          "template":"three-pin-plug",
          "title":"Label a correctly wired three-pin plug",
          "instructions":"Drag each label to the correct part of the plug. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"earth","text":"Earth wire","hint":"Look for the green/yellow conductor leading to the large top pin.","explanation":"The earth wire provides a low-resistance fault path and is coloured green/yellow."},
            {"id":"neutral","text":"Neutral wire","hint":"Look for the blue conductor.","explanation":"The neutral wire is blue and completes the normal circuit."},
            {"id":"live","text":"Live wire","hint":"Look for the brown conductor beside the fuse.","explanation":"The live wire is brown and supplies the appliance."},
            {"id":"fuse","text":"Fuse","hint":"Look for the protective device connected in the live side.","explanation":"The fuse melts on excessive current and breaks the live connection."},
            {"id":"grip","text":"Cable grip","hint":"Look for the clamp holding the outer flex.","explanation":"The cable grip prevents pulls on the flex from transferring directly to the internal wire terminals."}
          ],
          "targets":[
            {"id":"plug-earth-target","labelId":"earth","boxX":20,"boxY":70,"anchorX":500,"anchorY":220,"side":"left"},
            {"id":"plug-neutral-target","labelId":"neutral","boxX":20,"boxY":170,"anchorX":350,"anchorY":360,"side":"left"},
            {"id":"plug-live-target","labelId":"live","boxX":790,"boxY":70,"anchorX":660,"anchorY":360,"side":"right"},
            {"id":"plug-fuse-target","labelId":"fuse","boxX":790,"boxY":170,"anchorX":660,"anchorY":310,"side":"right"},
            {"id":"plug-grip-target","labelId":"grip","boxX":790,"boxY":270,"anchorX":500,"anchorY":430,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "Brown is live, blue is neutral and green/yellow is earth.",
        "The fuse is placed in the live wire.",
        "A fuse melts when current exceeds its rating.",
        "Choose the smallest suitable standard fuse rating above normal operating current.",
        "A circuit breaker can usually be reset after the fault is corrected.",
        "The earth wire provides a safe low-resistance fault path for metal cases.",
        "Overloading can overheat wiring and start a fire.",
        "Frayed insulation can expose live conductors.",
        "Thicker conductors have lower resistance for the same material and length."
      ],
      "workedExample":{
        "title":"Selecting a fuse",
        "prompt":"A 690 W blender is connected to a 230 V supply. Which fuse should be used from 1 A, 3 A, 5 A and 13 A?",
        "steps":[
          "Calculate normal current: I = P ÷ V.",
          "I = 690 ÷ 230 = 3 A.",
          "The protective fuse should be rated just above normal current.",
          "The next suitable standard value is 5 A."
        ],
        "answer":"Use a 5 A fuse."
      },
      "checks":[
        {
          "prompt":"Why is a plug fuse connected in the live wire?",
          "answer":"So that when it melts it breaks the live connection to the appliance.",
          "explanation":"The appliance is then disconnected from the dangerous supply potential."
        },
        {
          "prompt":"What colour is the neutral wire in the CSEC plug convention?",
          "answer":"Blue.",
          "explanation":"Brown is live and green/yellow is earth."
        },
        {
          "prompt":"What current does a 3 kW heater draw from 240 V?",
          "answer":"12.5 A.",
          "explanation":"I = 3000 ÷ 240 = 12.5 A, so a 13 A fuse is suitable."
        },
        {
          "prompt":"Why is overloading one socket dangerous?",
          "answer":"The large current can overheat wires and insulation and cause a fire.",
          "explanation":"Heating increases with current in resistive conductors."
        },
        {
          "prompt":"Why are thick conductors used for heavy-duty appliances?",
          "answer":"For the same material and length, thicker conductors have lower resistance and therefore less heating for a given large current.",
          "explanation":"Cable size must still be chosen for the specific current and installation."
        }
      ],
      "summary":"Electrical protection works by keeping live conductors enclosed and disconnecting abnormal current quickly. Correct plug wiring, suitable fuse or breaker ratings, earthing and appropriate cable size all reduce risk."
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

insert into public.spark_subject_activity_catalog(
  subject_id,activity_key,activity_type,section_id,topic_id,title,route,evidence_weight,enabled,metadata
)
values (
  'integrated-science',
  'diagram:m2-t4-4-three-pin-plug',
  'diagram',
  'module-2-energy',
  'm2-t4-4-electrical-safety',
  'Label a correctly wired three-pin plug',
  '/study/integrated-science?section=module-2-energy&topic=m2-t4-4-electrical-safety',
  0.35,
  true,
  '{"syllabusObjective":"2.4.4","mode":"drag-drop-label"}'::jsonb
)
on conflict (subject_id,activity_key) do update set
  activity_type=excluded.activity_type,
  section_id=excluded.section_id,
  topic_id=excluded.topic_id,
  title=excluded.title,
  route=excluded.route,
  evidence_weight=excluded.evidence_weight,
  enabled=excluded.enabled,
  metadata=excluded.metadata,
  updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)
  || '{"topicsBuilt":59,"objectivesBuilt":59}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
