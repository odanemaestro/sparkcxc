begin;

-- CSEC Integrated Science objective 3.2.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t2-3-tides',
  'module-3-environment',
  '3.2.3 Effects of Tides',
  'Explain ocean tides, spring and neap tides, tidal timing, coastal effects, tsunami distinction and coastal protection.',
  730,
  true,
  '{
    "syllabus":{"module":3,"topic":"The Terrestrial Environment","objective":"3.2.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain that tides are caused mainly by the Moon''s gravitational effect.",
        "Explain why many coasts experience about two high tides per lunar day.",
        "Compare spring and neap tides.",
        "State the approximate time between successive high tides.",
        "Explain how tides affect fishing and access to the shore.",
        "Explain coastal erosion by waves and tides.",
        "Distinguish a tsunami from a tide.",
        "Identify a natural tsunami warning sign.",
        "Describe ways to reduce coastal erosion."
      ],
      "introduction":"Tides are regular rises and falls of sea level caused mainly by the Moon''s gravitational effect on Earth''s oceans, with the Sun also contributing. They affect coastal ecosystems, fishing, navigation and erosion.",
      "sections":[
        {"title":"Why tides occur","paragraphs":[
          "The Moon''s gravity is the main cause of ocean tides.",
          "The tidal response of the oceans produces two broad high-tide bulges, one roughly toward the Moon and one on the opposite side of Earth.",
          "As Earth rotates through these bulges, many locations experience about two high tides and two low tides during a lunar day."
        ]},
        {"title":"Spring tides","paragraphs":[
          "Spring tides occur around new moon and full moon when the Sun, Earth and Moon are approximately aligned.",
          "The tidal effects of the Sun and Moon reinforce each other, producing the greatest tidal range: higher high tides and lower low tides."
        ]},
        {"title":"Neap tides","paragraphs":[
          "Neap tides occur around first and last quarter when the Sun and Moon pull at roughly right angles.",
          "Their tidal effects partly oppose each other, producing the smallest tidal range."
        ]},
        {"title":"Tidal timing","paragraphs":[
          "The time between successive high tides at many locations is about 12 hours 25 minutes.",
          "A lunar day is about 24 hours 50 minutes, so the timing of high and low tides shifts later from one solar day to the next."
        ]},
        {"title":"Effects on coastal activities","paragraphs":[
          "At low tide, a larger area of rocky shore, reef flat or mudflat may be exposed.",
          "This can make shellfish collection and some shore activities easier, while high tide may provide greater water depth for boats in shallow areas."
        ]},
        {"title":"Coastal erosion","paragraphs":[
          "Waves and tidal currents can remove, transport and redeposit sand and rock fragments.",
          "Repeated erosion can narrow beaches and undercut exposed coastlines."
        ]},
        {"title":"Coastal protection","paragraphs":[
          "Mangroves help trap sediment and reduce wave energy while also providing habitat.",
          "Sea walls can protect selected areas from direct wave attack, although poorly designed structures can redirect erosion to neighbouring shores."
        ]},
        {"title":"Tsunamis are different","paragraphs":[
          "A tsunami is a series of long sea waves produced by sudden displacement of a large volume of water.",
          "Undersea earthquakes, landslides and volcanic eruptions can trigger tsunamis.",
          "Tsunamis are not unusually large regular tides."
        ]},
        {"title":"Tsunami warning signs","paragraphs":[
          "After a strong or long coastal earthquake, unusual rapid sea withdrawal can be a natural warning sign that a tsunami is approaching.",
          "People should move immediately to higher ground or inland and follow official tsunami instructions rather than going to the shore to investigate."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t2-3-tides","type":"tides","title":"Tides, spring and neap alignment and tsunami explorer"}],
      "keyPoints":[
        "The Moon''s gravity is the main cause of tides.",
        "Many places have about two high tides each lunar day.",
        "Successive high tides are about 12 h 25 min apart.",
        "Spring tides have the greatest tidal range.",
        "Neap tides have the smallest tidal range.",
        "Low tide exposes more of the shore.",
        "Waves and tides contribute to coastal erosion.",
        "Mangroves and sea walls can reduce erosion.",
        "A tsunami is caused by sudden water displacement, not the regular tide cycle."
      ],
      "workedExample":{
        "title":"Identify a spring tide",
        "prompt":"The Sun, Earth and Moon are approximately in a straight line. What type of tide is expected?",
        "steps":[
          "The Sun and Moon are pulling along approximately the same line.",
          "Their tidal effects reinforce each other.",
          "The tidal range becomes larger than usual."
        ],
        "answer":"A spring tide."
      },
      "checks":[
        {"prompt":"What is the main cause of ocean tides?","answer":"The Moon''s gravitational pull on Earth''s oceans.","explanation":"The Sun also contributes but the Moon has the larger tidal effect."},
        {"prompt":"When do spring tides occur?","answer":"Around new moon and full moon.","explanation":"The Sun, Earth and Moon are approximately aligned."},
        {"prompt":"When do neap tides occur?","answer":"Around first and last quarter moon.","explanation":"The Sun and Moon pull at roughly right angles."},
        {"prompt":"How long is it approximately between successive high tides?","answer":"About 12 hours 25 minutes.","explanation":"This is half of the approximate lunar day."},
        {"prompt":"Why is low tide useful for collecting shellfish on rocky shores?","answer":"More of the shore is exposed.","explanation":"The lower sea level uncovers intertidal areas."}
      ],
      "summary":"Tides are predictable gravitational changes in sea level. Spring and neap tides depend on Sun-Moon geometry, while tsunamis come from sudden displacement of ocean water and require immediate safety action."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":73,"objectivesBuilt":73}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
