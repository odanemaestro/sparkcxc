begin;

-- CSEC Integrated Science objective 2.4.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-7-electrical-first-aid',
  'module-2-energy',
  '2.4.7 First Aid for Electrical Accidents',
  'Discuss first aid for electrical accidents, including rescuer safety, power isolation, CPR and AED use, recovery position, burn care and hidden internal injury.',
  620,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "currentGuidance":{
      "reviewed":"2026-09",
      "references":[
        "2025 American Heart Association CPR and ECC Guidelines",
        "2024 American Heart Association and American Red Cross Guidelines for First Aid",
        "NHS burns and scalds first-aid guidance"
      ]
    },
    "lesson":{
      "objectives":[
        "Explain why rescuer safety and power isolation come first in an electrical accident.",
        "Describe a safe response when low-voltage power cannot immediately be isolated.",
        "Recognise when CPR and an AED are required after electrical injury.",
        "Use current lay-rescuer assessment based on responsiveness and normal breathing.",
        "Explain when a recovery position is appropriate.",
        "Describe first aid for a minor external burn after the electrical source is made safe.",
        "Explain why electrical injury can be more serious than the visible skin burn suggests.",
        "Recognise that electrical injury should receive medical assessment."
      ],
      "introduction":"Electrical first aid begins with scene safety. A rescuer must not touch a casualty who is still connected to a live source because the rescuer can become part of the circuit. Electrical current can also cause hidden injury to the heart, nerves, muscles and deeper tissues.",
      "sections":[
        {
          "title":"Make the scene safe",
          "paragraphs":[
            "Do not touch a person who is still in contact with live electricity.",
            "Switch off the power at the mains or at the source if this can be done safely.",
            "For a low-voltage source that cannot immediately be isolated, a dry non-conducting object made of material such as dry wood, cardboard or plastic can be used to move the source away without touching the casualty directly.",
            "Do not approach high-voltage or fallen power lines. These situations require the electricity provider or emergency services to make the area safe."
          ]
        },
        {
          "title":"Activate emergency help",
          "paragraphs":[
            "Electrical injuries can cause cardiac arrest, dangerous heart rhythms, respiratory arrest and deep tissue damage even when the skin injury looks small.",
            "Emergency help should be activated for serious electrical injury, loss of consciousness, abnormal breathing, significant burns or high-voltage exposure.",
            "A person injured by electrical current should receive medical assessment because internal damage may not be visible."
          ]
        },
        {
          "title":"Assess responsiveness and breathing",
          "paragraphs":[
            "Once the electrical danger has been removed, check whether the casualty responds and whether breathing is normal.",
            "If the person is unresponsive and is not breathing normally or is only gasping, begin CPR and use an automated external defibrillator, AED, as soon as one is available.",
            "Current lay-rescuer guidance does not require delaying CPR to search for a pulse. Trained healthcare providers follow the pulse-check steps in their own resuscitation protocol."
          ]
        },
        {
          "title":"CSEC pulse wording",
          "paragraphs":[
            "Some older CSEC-style bank items use the phrase check breathing and a pulse after separation from the supply. Among the options in those items, this identifies the need to assess life-threatening problems.",
            "For real-world lay first aid, use current guidance: check responsiveness and normal breathing, activate emergency help, and start CPR when normal breathing is absent."
          ]
        },
        {
          "title":"CPR and AED",
          "paragraphs":[
            "For an adult in cardiac arrest, current AHA guidance uses chest compressions at about 100 to 120 per minute.",
            "Use an AED as soon as one is available and follow its spoken or visual prompts.",
            "Continue CPR until the person shows signs of life, trained rescuers take over or the scene becomes unsafe."
          ]
        },
        {
          "title":"Recovery position",
          "paragraphs":[
            "A person with reduced alertness who is breathing normally can reasonably be placed in a side-lying recovery position when major neck, back, hip or pelvic injury is not suspected.",
            "The recovery position helps maintain an open airway and allows fluids to drain from the mouth.",
            "If breathing becomes absent or abnormal, place the person on the back and begin CPR."
          ]
        },
        {
          "title":"Minor external burns",
          "paragraphs":[
            "After the electricity has been safely disconnected, cool a minor external burn under cool or lukewarm running water for about 20 minutes.",
            "After cooling, cover the burn loosely with a clean, non-fluffy dressing or other suitable clean covering.",
            "Do not apply butter, toothpaste, oil or ice and do not deliberately burst blisters."
          ]
        },
        {
          "title":"Hidden electrical injury",
          "paragraphs":[
            "Electrical current can damage tissues along its internal path. Entry and exit burns can underestimate the severity of internal injury.",
            "The heart can develop dangerous abnormal rhythms, and muscles, nerves and other organs can also be injured.",
            "Keep the person monitored and protected from getting cold while waiting for medical care."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-7-electrical-first-aid",
          "type":"electrical-accident-first-aid",
          "title":"Electrical accident first-aid explorer"
        }
      ],
      "keyPoints":[
        "Do not touch a casualty while the electrical source is live.",
        "Disconnect the power first whenever this can be done safely.",
        "For low-voltage sources, a dry non-conducting object can separate the source if power cannot immediately be isolated.",
        "Do not approach high-voltage or fallen power lines.",
        "Check responsiveness and normal breathing after the scene is safe.",
        "Start CPR if the person is unresponsive and not breathing normally.",
        "Use an AED as soon as available.",
        "Current lay-rescuer guidance does not require a pulse check before CPR.",
        "Use the recovery position only when breathing is normal and major trauma is not suspected.",
        "Cool a minor external burn under cool running water for about 20 minutes.",
        "Electrical injury can be deeper than the visible burn."
      ],
      "workedExample":{
        "title":"Responding to an electric shock",
        "prompt":"A person is unconscious while still touching a faulty household appliance. What should a rescuer do first?",
        "steps":[
          "Do not touch the person while the electrical source is live.",
          "Switch off the power at the mains or source if this can be done safely.",
          "Once the electrical danger is removed, call emergency help and assess responsiveness and normal breathing.",
          "If normal breathing is absent, begin CPR and use an AED when available."
        ],
        "answer":"The first action is to make the scene electrically safe by disconnecting the power before touching the casualty."
      },
      "checks":[
        {
          "prompt":"What is the first action if a person is still in contact with a live household electrical source?",
          "answer":"Disconnect the power safely before touching the casualty.",
          "explanation":"The rescuer must avoid becoming part of the circuit."
        },
        {
          "prompt":"What type of object can be used to move a low-voltage source when it cannot immediately be switched off?",
          "answer":"A dry non-conducting object such as dry wood, cardboard or plastic.",
          "explanation":"Metal and wet materials may conduct current."
        },
        {
          "prompt":"What should a lay rescuer do if the casualty is unresponsive and not breathing normally?",
          "answer":"Activate emergency help, start CPR and use an AED as soon as it is available.",
          "explanation":"Current lay-rescuer guidance focuses on responsiveness and normal breathing rather than delaying CPR for a pulse check."
        },
        {
          "prompt":"How should a minor external burn be cooled?",
          "answer":"Under cool or lukewarm running water for about 20 minutes.",
          "explanation":"Do not use ice, butter or toothpaste."
        },
        {
          "prompt":"Why should an electrical injury receive medical assessment even if the skin burn is small?",
          "answer":"Electrical current can cause hidden injury to the heart and deeper tissues.",
          "explanation":"The visible burn does not show the full path or severity of current through the body."
        }
      ],
      "summary":"First protect the rescuer by making the electrical source safe. Then assess responsiveness and normal breathing, start CPR and use an AED when needed, treat visible burns appropriately and recognise the possibility of hidden internal injury."
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
  || '{"topicsBuilt":62,"objectivesBuilt":62}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
