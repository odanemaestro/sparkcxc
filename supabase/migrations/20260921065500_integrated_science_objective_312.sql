begin;

-- CSEC Integrated Science objective 3.1.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t1-2-orbital-motion',
  'module-3-environment',
  '3.1.2 Bodies in Orbit',
  'Explain how gravity, forward motion and orbital period keep planets and satellites in orbit.',
  670,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Universe and Our Solar System","objective":"3.1.2","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain that gravity provides the centripetal force for an orbit.",
        "Explain what happens if the gravitational force suddenly disappears.",
        "Distinguish natural from artificial satellites.",
        "Explain geostationary orbit.",
        "Explain why outer planets take longer to complete an orbit.",
        "State that planetary orbits are elliptical.",
        "Explain synchronous rotation of the Moon."
      ],
      "introduction":"An orbit occurs when a body has forward motion while gravity continuously pulls it toward the body being orbited. Gravity changes the direction of motion, providing the centripetal force required for curved orbital motion.",
      "sections":[
        {"title":"Gravity and centripetal force","paragraphs":[
          "The Sun''s gravitational pull provides the centripetal force that keeps planets in orbit.",
          "Earth''s gravity similarly keeps the Moon and artificial satellites in orbit."
        ]},
        {"title":"What if gravity disappeared?","paragraphs":[
          "An orbiting object has an instantaneous velocity tangent to its path.",
          "If gravity suddenly disappeared, there would be no centre-seeking force, so the object would continue in a straight line tangent to the orbit."
        ]},
        {"title":"Natural and artificial satellites","paragraphs":[
          "The Moon is Earth''s natural satellite.",
          "An artificial satellite is a human-made object placed in orbit for purposes such as communication, weather observation, navigation, Earth observation or science."
        ]},
        {"title":"Geostationary satellites","paragraphs":[
          "A geostationary satellite orbits above the equator in the same direction as Earth''s rotation.",
          "Its orbital period matches Earth''s rotation period, about 24 hours, so it appears to remain above the same point on Earth''s surface.",
          "This is useful for communication because ground antennas can remain pointed in one direction."
        ]},
        {"title":"Orbital paths and periods","paragraphs":[
          "Planetary orbits are ellipses rather than perfect circles.",
          "Planets farther from the Sun generally have longer orbital paths and lower orbital speeds, so they take longer to complete one orbit.",
          "Mercury completes an orbit in about 88 days, while distant planets take many years."
        ]},
        {"title":"Synchronous rotation of the Moon","paragraphs":[
          "The Moon takes about the same time to rotate once on its axis as it takes to orbit Earth.",
          "Because these periods match, the same lunar hemisphere generally faces Earth."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t1-2-orbit-motion","type":"orbit-motion","title":"Gravity and orbital-motion explorer"}],
      "keyPoints":[
        "Gravity provides the centripetal force for orbit.",
        "Without gravity, an orbiting body would move in a straight tangent line.",
        "The Moon is Earth''s natural satellite.",
        "Artificial satellites are human-made objects placed in orbit.",
        "A geostationary satellite has an orbital period of about 24 hours above the equator.",
        "Planetary orbits are elliptical.",
        "Outer planets take longer to orbit the Sun.",
        "The Moon shows synchronous rotation."
      ],
      "workedExample":{
        "title":"Satellite with no gravity",
        "prompt":"A satellite is moving in orbit around Earth. Predict its motion if Earth''s gravitational pull suddenly disappeared.",
        "steps":[
          "The satellite already has a forward velocity.",
          "Gravity is the force bending that motion toward Earth.",
          "Without gravity there is no centripetal force.",
          "The satellite continues in a straight line tangent to the orbit."
        ],
        "answer":"It moves off in a straight line tangent to its former orbit."
      },
      "checks":[
        {"prompt":"What force keeps planets in orbit around the Sun?","answer":"Gravity.","explanation":"Gravity provides the centripetal force."},
        {"prompt":"What is a natural satellite of Earth?","answer":"The Moon.","explanation":"It orbits Earth naturally."},
        {"prompt":"Why does a geostationary satellite appear fixed above one point?","answer":"Its orbital period and direction match Earth''s rotation while it orbits above the equator.","explanation":"It turns around Earth at the same angular rate as Earth rotates."},
        {"prompt":"What shape is a planetary orbit?","answer":"Elliptical.","explanation":"Planetary orbits are slightly oval rather than perfectly circular."},
        {"prompt":"Why do we generally see the same side of the Moon?","answer":"Its rotation period matches its orbital period around Earth.","explanation":"This is synchronous rotation."}
      ],
      "summary":"Orbiting bodies are still under gravity. Their forward motion and the continuous gravitational pull together produce curved orbital paths."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":67,"objectivesBuilt":67}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
