begin;

-- CSEC Integrated Science objective 3.1.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t1-4-earth-moon-effects',
  'module-3-environment',
  '3.1.4 Effects of Other Bodies on Earth',
  'Explain day and night, Earth''s year, Moon phases, shadows and solar and lunar eclipses using the relative motions of the Sun, Earth and Moon.',
  690,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Universe and Our Solar System","objective":"3.1.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain day and night using Earth''s rotation.",
        "State that Earth takes about 365¼ days to revolve around the Sun.",
        "Explain that the Moon shines by reflecting sunlight.",
        "Describe the main Moon phases.",
        "State that the lunar phase cycle is about 29½ days.",
        "Explain solar and lunar eclipses.",
        "Explain umbra and penumbra using straight-line light."
      ],
      "introduction":"The changing positions and motions of Earth and the Moon relative to the Sun produce day and night, Moon phases, eclipses and changing illumination patterns.",
      "sections":[
        {"title":"Day and night","paragraphs":[
          "Earth rotates on its axis once in about 24 hours.",
          "At any moment, roughly half of Earth faces the Sun and experiences daylight while the opposite side is in darkness.",
          "As Earth rotates, places such as Jamaica move into and out of the illuminated half."
        ]},
        {"title":"Earth''s revolution","paragraphs":[
          "Earth revolves around the Sun once in about 365¼ days.",
          "This orbital period defines one year."
        ]},
        {"title":"Why the Moon shines","paragraphs":[
          "The Moon does not produce its own visible light.",
          "It appears bright because its surface reflects sunlight."
        ]},
        {"title":"Moon phases","paragraphs":[
          "Moon phases are caused by the changing positions of the Sun, Earth and Moon and by the fraction of the Moon''s sunlit half visible from Earth.",
          "At new moon, the Moon is between Earth and the Sun and its illuminated half faces mostly away from Earth.",
          "At full moon, Earth lies roughly between the Sun and Moon and the illuminated half faces Earth.",
          "The time from one full moon to the next is about 29½ days."
        ]},
        {"title":"Solar eclipse","paragraphs":[
          "A solar eclipse can occur at new moon when the Moon passes between the Sun and Earth.",
          "The Moon blocks some sunlight and its shadow falls on Earth.",
          "Observers within the darkest central shadow, the umbra, can see a total solar eclipse."
        ]},
        {"title":"Lunar eclipse","paragraphs":[
          "A lunar eclipse can occur at full moon when Earth lies between the Sun and Moon.",
          "Earth''s shadow then falls on the Moon."
        ]},
        {"title":"Shadows","paragraphs":[
          "Shadows form because light travels approximately in straight lines and opaque objects block the rays.",
          "A small point-like source produces a sharp umbra with little penumbra.",
          "A larger extended source produces a wider penumbra and a softer shadow edge."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t1-4-earth-moon-effects","type":"earth-moon-effects","title":"Earth, Sun and Moon motion explorer"}],
      "keyPoints":[
        "Day and night are caused by Earth''s rotation.",
        "Earth takes about 365¼ days to orbit the Sun.",
        "The Moon reflects sunlight.",
        "The lunar phase cycle is about 29½ days.",
        "Solar eclipses occur at new moon.",
        "Lunar eclipses occur at full moon.",
        "Umbra is the darkest part of a shadow.",
        "A point source gives a sharper shadow than an extended source."
      ],
      "workedExample":{
        "title":"Identify an eclipse",
        "prompt":"The Sun, Earth and Moon are aligned with Earth between the Sun and Moon. Which eclipse may occur?",
        "steps":[
          "Earth is between the Sun and Moon.",
          "Earth blocks some sunlight from reaching the Moon.",
          "Earth''s shadow falls on the Moon.",
          "This arrangement produces a lunar eclipse."
        ],
        "answer":"A lunar eclipse."
      },
      "checks":[
        {"prompt":"What causes day and night?","answer":"Earth''s rotation on its axis.","explanation":"Different parts of Earth face the Sun as Earth rotates."},
        {"prompt":"How long does Earth take to revolve around the Sun?","answer":"About 365¼ days.","explanation":"This is one year."},
        {"prompt":"Why does the Moon appear bright?","answer":"It reflects sunlight.","explanation":"The Moon is not self-luminous."},
        {"prompt":"When can a solar eclipse occur?","answer":"At new moon.","explanation":"The Moon must pass between the Sun and Earth."},
        {"prompt":"When can a lunar eclipse occur?","answer":"At full moon.","explanation":"Earth must lie between the Sun and Moon."}
      ],
      "summary":"Use the relative positions and motions of the Sun, Earth and Moon to explain daily and monthly sky patterns and eclipse events."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":69,"objectivesBuilt":69}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
