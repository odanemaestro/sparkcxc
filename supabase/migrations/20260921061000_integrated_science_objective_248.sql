begin;

-- CSEC Integrated Science objective 2.4.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-8-electrical-hazards',
  'module-2-energy',
  '2.4.8 Electrical Hazards',
  'Discuss electrical hazards associated with power lines, water, damaged cords, overloads, stored charge, microwave use, power surges and thunderstorms.',
  630,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.8",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain the danger of kites, poles and tall objects near overhead power lines.",
        "Explain why illegal electricity connections can cause shock and fire.",
        "Explain why some electronic components can remain charged after equipment is switched off.",
        "Explain why wet hands and bathrooms increase electrical risk.",
        "Explain why frayed cords and overloaded sockets are dangerous.",
        "Describe safe microwave-container practice.",
        "Explain the purpose and limits of surge protectors.",
        "Describe safer behaviour during thunderstorms.",
        "Describe safer practice when changing a light bulb."
      ],
      "introduction":"Electrical hazards occur when people or objects create an unintended conducting path, when insulation fails, when wiring carries excessive current or when high voltages reach equipment and people through power lines or lightning.",
      "sections":[
        {
          "title":"Overhead power lines",
          "paragraphs":[
            "Kites should never be flown near overhead power lines. Damp string or string containing conducting material can provide a path for dangerous current.",
            "Long metal poles, ladders and tools used for picking fruit or construction can touch or approach live lines. Keep them well away and never attempt to retrieve an object caught on a power line."
          ]
        },
        {
          "title":"Illegal electrical connections",
          "paragraphs":[
            "Illegal or improvised connections can bypass correct fuses, breakers, insulation, earthing and safe installation practice.",
            "These connections increase the risk of electrocution, overheating and electrical fires and should never be attempted."
          ]
        },
        {
          "title":"Stored charge inside equipment",
          "paragraphs":[
            "Some electronic equipment contains capacitors that can retain electric charge after the external power has been switched off or the equipment has been unplugged.",
            "This is why untrained persons should not remove the backs of televisions, power supplies and similar equipment to attempt internal repairs."
          ]
        },
        {
          "title":"Water and electricity",
          "paragraphs":[
            "Wet skin has lower resistance than dry skin, and ordinary water contains dissolved ions that can conduct current.",
            "Do not use mains electrical appliances with wet hands or close to baths, sinks, pools and showers unless the equipment is specifically designed and protected for that environment.",
            "Hair dryers and other portable mains appliances should be kept away from bath water and wet surfaces."
          ]
        },
        {
          "title":"Frayed cords and overloaded sockets",
          "paragraphs":[
            "A frayed cord can expose live conductors. Damaged cords should be taken out of use and repaired or replaced correctly.",
            "Overloaded outlets, power strips or extension leads can carry excessive current and overheat, damaging insulation and increasing fire risk."
          ]
        },
        {
          "title":"Microwave ovens",
          "paragraphs":[
            "Microwaves are reflected by metal. Ordinary metal pans and aluminium foil generally should not be placed in a microwave because they can cause uneven heating, arcing or oven damage.",
            "Use glass, ceramic or other containers marked or approved as microwave-safe. Follow the oven manufacturer''s instructions because some specific metal racks or packaging are designed for approved microwave use."
          ]
        },
        {
          "title":"Surge protection",
          "paragraphs":[
            "A surge protector is designed to reduce the effect of some short voltage spikes on connected electronic equipment.",
            "It does not guarantee protection from a direct lightning strike and it does not replace correct wiring, earthing or safe electrical behaviour."
          ]
        },
        {
          "title":"Thunderstorms",
          "paragraphs":[
            "When thunder is heard, move into a substantial enclosed building or an enclosed hard-topped vehicle.",
            "Do not shelter under an isolated tall tree, stand in an open field or remain in water.",
            "When indoors during a thunderstorm, avoid corded phones, plugged-in electrical equipment and plumbing because lightning can travel through wiring and pipes.",
            "Do not handle plugs or try to unplug equipment while the storm is already occurring."
          ]
        },
        {
          "title":"Changing a light bulb",
          "paragraphs":[
            "Switch off the lamp circuit before changing a bulb. Use dry hands and a stable ladder or working platform.",
            "Allow a hot bulb to cool before handling it."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-8-electrical-hazards",
          "type":"electrical-hazards",
          "title":"Electrical hazards and safe-practice explorer"
        }
      ],
      "keyPoints":[
        "Keep kites, metal poles and ladders away from power lines.",
        "Illegal connections can cause electrocution and fires.",
        "Capacitors can retain dangerous charge after equipment is switched off.",
        "Wet skin and water increase electric-shock risk.",
        "Frayed cords can expose live conductors.",
        "Overloaded sockets can overheat and cause fires.",
        "Ordinary metal containers should not be used in a microwave unless specifically approved by the manufacturer.",
        "Surge protectors reduce some voltage spikes but do not guarantee lightning protection.",
        "During thunderstorms, stay indoors and avoid corded electrical equipment and plumbing."
      ],
      "workedExample":{
        "title":"Identifying the hazard",
        "prompt":"A person uses a long metal pole to pick mangoes beside an overhead power line. Explain the danger.",
        "steps":[
          "Metal is a good electrical conductor.",
          "If the pole touches or gets dangerously close to an energised line, current can enter the pole.",
          "The person may then provide a path for current to earth.",
          "The result can be severe electric shock or electrocution."
        ],
        "answer":"The conducting pole can contact the live line and carry dangerous current through the person to earth."
      },
      "checks":[
        {
          "prompt":"Why should a television cover not be removed by an untrained person even when unplugged?",
          "answer":"Some internal capacitors can retain dangerous electrical charge.",
          "explanation":"Switched off does not always mean electrically discharged."
        },
        {
          "prompt":"Why are wet hands dangerous around mains appliances?",
          "answer":"Wet skin has lower resistance and ordinary water can conduct because it contains dissolved ions.",
          "explanation":"More current can then pass through the body."
        },
        {
          "prompt":"What does a surge protector do?",
          "answer":"It reduces the effect of some short voltage spikes on connected equipment.",
          "explanation":"It is not a guarantee against a direct lightning strike."
        },
        {
          "prompt":"What should you do when a thunderstorm starts?",
          "answer":"Move into a substantial enclosed building or hard-topped vehicle and avoid electrical equipment and plumbing.",
          "explanation":"Lightning can travel through wires and pipes."
        },
        {
          "prompt":"Why should ordinary metal containers generally not be placed in a microwave oven?",
          "answer":"Metal reflects microwaves and can cause arcing, uneven heating or oven damage.",
          "explanation":"Use only containers approved by the microwave manufacturer."
        }
      ],
      "summary":"Electrical hazards are best controlled before contact occurs. Keep distance from high-voltage sources, maintain insulation, prevent overloads, keep electricity away from water and follow equipment and storm-safety instructions."
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
  || '{"topicsBuilt":63,"objectivesBuilt":63}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
