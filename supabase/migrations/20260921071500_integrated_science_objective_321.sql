begin;

-- CSEC Integrated Science objective 3.2.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t2-1-air-masses',
  'module-3-environment',
  '3.2.1 Air Masses in the Caribbean',
  'Examine Caribbean air masses, weather fronts, front symbols and the transport of Saharan dust and volcanic ash.',
  710,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Terrestrial Environment","objective":"3.2.1","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define an air mass and a front.",
        "Classify maritime tropical, continental tropical, maritime polar and continental polar air masses.",
        "Relate maritime and continental source regions to moisture.",
        "Relate tropical and polar source regions to temperature.",
        "Recognise cold, warm, occluded and stationary front symbols.",
        "Compare weather associated with cold and warm fronts.",
        "Explain how an occluded front forms.",
        "Explain how Saharan dust and volcanic ash can be transported across the Caribbean."
      ],
      "introduction":"An air mass is a large body of air with broadly similar temperature and humidity. Air masses take on the properties of the regions where they form and can change Caribbean weather and air quality as they move.",
      "sections":[
        {"title":"Classifying air masses","paragraphs":[
          "Maritime air masses form over the sea and are moist. Continental air masses form over land and are generally drier.",
          "Tropical air masses are warm, while polar air masses are cold.",
          "A maritime tropical air mass is therefore warm and moist. A continental polar air mass is cold and dry, while a maritime polar air mass is cold and moist."
        ]},
        {"title":"Caribbean maritime tropical air","paragraphs":[
          "Warm Atlantic waters are an important source region for maritime tropical air affecting the Caribbean.",
          "This air is warm and humid and can support cloud formation and rainfall when it is lifted."
        ]},
        {"title":"Weather fronts","paragraphs":[
          "A front is the boundary between two air masses with different temperature or moisture characteristics.",
          "A cold front is shown on weather maps by triangles on one side of a line.",
          "A warm front is shown by semicircles on one side of a line."
        ]},
        {"title":"Cold fronts","paragraphs":[
          "At a cold front, denser cold air pushes under warmer air and forces it upward rapidly.",
          "The passage of a cold front can bring heavy showers, thunderstorms, gusty winds and a fall in temperature."
        ]},
        {"title":"Warm fronts","paragraphs":[
          "At a warm front, warm air rises more gradually over colder air.",
          "Warm fronts can produce layered cloud, longer periods of light or steady rain and rising temperature after the front passes."
        ]},
        {"title":"Occluded and stationary fronts","paragraphs":[
          "An occluded front forms when a cold front catches up with a warm front and lifts the warm air away from the surface.",
          "On a weather map, an occluded front uses alternating triangles and semicircles on the same side of the line.",
          "A stationary front is moving very slowly or not moving because neither air mass is strongly advancing. It can produce persistent unsettled weather."
        ]},
        {"title":"Saharan dust","paragraphs":[
          "Air masses and winds can carry Saharan dust westward across the Atlantic to the Caribbean.",
          "Fine dust reduces visibility and may worsen asthma and allergies in sensitive people."
        ]},
        {"title":"Volcanic ash","paragraphs":[
          "Winds can also transport volcanic ash from Caribbean eruptions over long distances.",
          "For example, ash from Montserrat can be carried toward other islands depending on wind direction and altitude."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t2-1-air-masses","type":"air-mass-fronts","title":"Caribbean air masses and weather fronts explorer"}],
      "keyPoints":[
        "An air mass is a large body of air with similar temperature and humidity.",
        "A front is the boundary between different air masses.",
        "Maritime tropical air is warm and moist.",
        "Continental polar air is cold and dry.",
        "Maritime polar air is cold and moist.",
        "Cold fronts use triangles.",
        "Warm fronts use semicircles.",
        "Cold fronts can bring heavy showers and falling temperature.",
        "Warm fronts often bring steadier rain and rising temperature.",
        "Saharan dust and volcanic ash can be transported by winds."
      ],
      "workedExample":{
        "title":"Classifying an air mass",
        "prompt":"An air mass forms over a warm tropical ocean. Classify it and describe its temperature and moisture.",
        "steps":[
          "Formation over ocean means maritime.",
          "Formation in the tropics means tropical.",
          "Maritime air is moist.",
          "Tropical air is warm."
        ],
        "answer":"It is a maritime tropical air mass, so it is warm and moist."
      },
      "checks":[
        {"prompt":"What is a front?","answer":"The boundary between two air masses with different properties.","explanation":"The air masses may differ in temperature and humidity."},
        {"prompt":"How is a cold front shown on a weather map?","answer":"By triangles on one side of a line.","explanation":"The triangles point in the direction the cold front is moving."},
        {"prompt":"What weather often follows the passage of a cold front?","answer":"Heavy showers or thunderstorms and a fall in temperature.","explanation":"Cold air lifts warm air rapidly."},
        {"prompt":"How does an occluded front form?","answer":"A cold front catches up with a warm front.","explanation":"The warm air is lifted away from the surface."},
        {"prompt":"How can Saharan dust reach the Caribbean?","answer":"It is carried westward by air masses and winds across the Atlantic.","explanation":"Atmospheric circulation can transport fine particles over thousands of kilometres."}
      ],
      "summary":"Air masses bring the temperature and moisture characteristics of their source regions. Fronts mark boundaries between air masses and help explain changes in Caribbean weather."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":71,"objectivesBuilt":71}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
