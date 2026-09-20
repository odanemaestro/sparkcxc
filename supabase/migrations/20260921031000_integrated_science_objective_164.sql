begin;

-- CSEC Integrated Science objective 1.6.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t6-4-mammalian-ear',
  'module-1-organisms-life-processes',
  '1.6.4 Structure and Function of the Mammalian Ear',
  'Relate the structures of the mammalian ear to hearing, balance and pressure equalisation and interpret pitch, loudness and hearing safety.',
  270,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Sense Organs and Coordination",
      "objective":"1.6.4",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify the main structures of the mammalian ear.",
        "Trace the pathway of sound vibrations from the outer ear to the cochlea.",
        "Relate the pinna, ear canal, ear drum, ossicles, cochlea and auditory nerve to hearing.",
        "Explain how the semicircular canals contribute to balance.",
        "Explain how the Eustachian tube helps equalise air pressure.",
        "Relate frequency to pitch and amplitude to loudness.",
        "Explain why prolonged loud sound can damage hearing."
      ],
      "introduction":"The ear has three linked roles. It collects and transmits sound, converts vibrations into nerve impulses for hearing, and detects head movement for balance. Different structures of the outer, middle and inner ear perform these functions.",
      "sections":[
        {
          "title":"The outer ear",
          "paragraphs":[
            "The pinna is the visible flap of the outer ear. It collects sound waves and directs them into the ear canal.",
            "The ear canal carries the sound waves towards the ear drum."
          ]
        },
        {
          "title":"The ear drum and ossicles",
          "paragraphs":[
            "Sound waves make the ear drum, or tympanic membrane, vibrate.",
            "Three small bones in the middle ear transmit and amplify these vibrations. They are the hammer or malleus, anvil or incus, and stirrup or stapes.",
            "The stirrup transfers the vibrations into the inner ear."
          ]
        },
        {
          "title":"The cochlea and auditory nerve",
          "paragraphs":[
            "The cochlea is a coiled, fluid-filled structure in the inner ear. Vibrations entering the cochlea create waves in its fluid.",
            "These movements stimulate sensory hair cells. The receptor cells convert mechanical vibration into nerve impulses.",
            "The auditory nerve carries the impulses from the inner ear to the brain, where they are interpreted as sound."
          ]
        },
        {
          "title":"Pathway of sound",
          "paragraphs":[
            "A useful sequence is: pinna, ear canal, ear drum, ossicles, cochlea, auditory nerve and brain.",
            "The order matters. The ear drum vibrates before the ossicles, and the cochlea converts the mechanical vibration into nervous signals."
          ]
        },
        {
          "title":"Pitch and loudness",
          "paragraphs":[
            "Pitch depends mainly on frequency. A sound with a higher frequency has a higher pitch.",
            "Loudness depends mainly on amplitude. A larger-amplitude vibration produces a louder sound.",
            "The approximate frequency range heard by many young people with healthy hearing is about 20 Hz to 20 000 Hz. Hearing sensitivity varies among individuals and often changes with age and noise exposure."
          ]
        },
        {
          "title":"Balance",
          "paragraphs":[
            "The semicircular canals are part of the balance system in the inner ear. They contain fluid and sensory receptors that respond to movement of the head.",
            "When a person spins and then stops, fluid may continue moving briefly. The receptors still send movement signals, which can make the person feel dizzy."
          ]
        },
        {
          "title":"The Eustachian tube",
          "paragraphs":[
            "The Eustachian tube connects the middle ear with the throat region. It helps equalise air pressure on the two sides of the ear drum.",
            "During take-off in an aeroplane, outside air pressure changes. The pressure across the ear drum may become unequal until the Eustachian tube opens. Equalisation may be felt or heard as the ears popping."
          ]
        },
        {
          "title":"Protecting hearing",
          "paragraphs":[
            "Prolonged exposure to loud sound can damage sensory hair cells in the cochlea. The damage can lead to temporary or permanent hearing loss and tinnitus.",
            "Workers around loud machinery should use suitable hearing protection such as ear muffs or correctly fitted ear plugs and follow workplace noise-control procedures."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t6-4-ear-function",
          "type":"ear-function",
          "title":"Hearing, balance and pressure"
        }
      ],
      "interactiveDiagrams":[
        {
          "id":"m1-t6-4-mammalian-ear",
          "template":"mammalian-ear",
          "title":"Label the mammalian ear",
          "instructions":"Drag each label to the correct structure. On a phone or tablet, tap a label and then tap the numbered target.",
          "labels":[
            {"id":"pinna","text":"Pinna","hint":"Look for the external flap of the ear.","explanation":"The pinna collects sound waves and directs them into the ear canal."},
            {"id":"ear-canal","text":"Ear canal","hint":"Look for the passage leading inward from the pinna.","explanation":"The ear canal carries sound waves to the ear drum."},
            {"id":"ear-drum","text":"Ear drum","hint":"Look for the thin membrane at the end of the ear canal.","explanation":"The ear drum vibrates when sound waves reach it."},
            {"id":"ossicles","text":"Ossicles","hint":"Look for the three small bones of the middle ear.","explanation":"The hammer, anvil and stirrup transmit and amplify vibrations."},
            {"id":"cochlea","text":"Cochlea","hint":"Look for the coiled structure of the inner ear.","explanation":"Sensory cells in the cochlea convert vibrations into nerve impulses."},
            {"id":"semicircular-canals","text":"Semicircular canals","hint":"Look for the three curved loops above the cochlea.","explanation":"The semicircular canals detect head movement and contribute to balance."},
            {"id":"auditory-nerve","text":"Auditory nerve","hint":"Look for the nerve leaving the inner ear towards the brain.","explanation":"The auditory nerve carries impulses from the cochlea to the brain."},
            {"id":"eustachian-tube","text":"Eustachian tube","hint":"Look for the tube leading downward from the middle ear.","explanation":"The Eustachian tube helps equalise air pressure on both sides of the ear drum."}
          ],
          "targets":[
            {"id":"ear-pinna-target","labelId":"pinna","boxX":20,"boxY":45,"anchorX":125,"anchorY":245,"side":"left"},
            {"id":"ear-canal-target","labelId":"ear-canal","boxX":20,"boxY":115,"anchorX":280,"anchorY":292,"side":"left"},
            {"id":"ear-drum-target","labelId":"ear-drum","boxX":20,"boxY":185,"anchorX":360,"anchorY":295,"side":"left"},
            {"id":"ear-ossicles-target","labelId":"ossicles","boxX":20,"boxY":255,"anchorX":455,"anchorY":265,"side":"left"},
            {"id":"ear-cochlea-target","labelId":"cochlea","boxX":790,"boxY":45,"anchorX":700,"anchorY":350,"side":"right"},
            {"id":"ear-semicircular-target","labelId":"semicircular-canals","boxX":790,"boxY":115,"anchorX":620,"anchorY":160,"side":"right"},
            {"id":"ear-auditory-nerve-target","labelId":"auditory-nerve","boxX":790,"boxY":185,"anchorX":805,"anchorY":355,"side":"right"},
            {"id":"ear-eustachian-target","labelId":"eustachian-tube","boxX":790,"boxY":255,"anchorX":565,"anchorY":430,"side":"right"}
          ]
        }
      ],
      "keyPoints":[
        "The pinna collects sound waves and the ear canal directs them to the ear drum.",
        "The ear drum vibrates and the ossicles transmit and amplify the vibration.",
        "The cochlea contains sensory cells that convert vibration into nerve impulses.",
        "The auditory nerve carries impulses to the brain.",
        "Pitch depends on frequency and loudness depends mainly on amplitude.",
        "The semicircular canals detect head movement and help with balance.",
        "The Eustachian tube equalises pressure across the ear drum.",
        "Prolonged loud noise can damage cochlear sensory cells and cause hearing loss."
      ],
      "workedExample":{
        "title":"Explaining ears popping during take-off",
        "prompt":"A passenger notices that the ears feel blocked and then pop while an aeroplane is taking off. Explain what is happening.",
        "steps":[
          "Air pressure outside the ear changes during take-off.",
          "The pressure on the two sides of the ear drum temporarily becomes unequal.",
          "The Eustachian tube opens.",
          "Air moves between the middle ear and throat region.",
          "Pressure equalises across the ear drum, producing the popping sensation."
        ],
        "answer":"The ears pop when the Eustachian tube opens and equalises air pressure on the two sides of the ear drum."
      },
      "checks":[
        {
          "prompt":"State the correct pathway of sound from the ear canal to the sensory cells for hearing.",
          "answer":"Ear canal to ear drum to ossicles to cochlea.",
          "explanation":"The auditory nerve carries the nerve impulses onward after the cochlea converts vibration into signals."
        },
        {
          "prompt":"What determines the pitch of a sound?",
          "answer":"Its frequency.",
          "explanation":"Higher frequency corresponds to higher pitch."
        },
        {
          "prompt":"Why can a person feel dizzy after spinning?",
          "answer":"Fluid in the semicircular canals may continue moving after the person stops.",
          "explanation":"The moving fluid continues stimulating balance receptors briefly."
        },
        {
          "prompt":"Why should workers using loud machinery wear hearing protection?",
          "answer":"Prolonged loud sound can damage sensory hair cells in the cochlea and cause hearing loss.",
          "explanation":"Suitable hearing protection reduces the sound energy reaching the inner ear."
        }
      ],
      "summary":"Trace sound through the ear in order and link each structure to its role. The cochlea is responsible for hearing, the semicircular canals help with balance, and the Eustachian tube manages pressure across the ear drum."
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
  'diagram:m1-t6-4-mammalian-ear',
  'diagram',
  'module-1-organisms-life-processes',
  'm1-t6-4-mammalian-ear',
  'Label the mammalian ear',
  '/study/integrated-science?section=module-1-organisms-life-processes&topic=m1-t6-4-mammalian-ear',
  0.35,
  true,
  '{"syllabusObjective":"1.6.4","mode":"drag-drop-label"}'::jsonb
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
  || '{"topicsBuilt":27,"objectivesBuilt":27}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
