begin;

-- CSEC Integrated Science objective 3.3.4
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-4-local-fishing-methods',
  'module-3-environment',
  '3.3.4 Local Fishing Methods',
  'Describe common local fishing methods and relate gear choice, bycatch, mesh size, closed seasons and destructive fishing to sustainable fish stocks.',
  771,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.4","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Describe hand-line, fish-pot, long-line, seine and trawl fishing.",
        "Explain why hand-line fishing generally produces low bycatch.",
        "Explain how larger mesh sizes allow juvenile fish to escape.",
        "Explain how closed seasons protect breeding fish.",
        "Explain environmental impacts of bottom trawling and dynamite fishing.",
        "Discuss why some jurisdictions restrict scuba-assisted spearfishing.",
        "Explain how well-managed aquaculture can reduce pressure on wild stocks."
      ],
      "introduction":"Fishing methods differ in the number and type of fish they catch, the habitats they affect and the amount of unwanted catch they produce. Sustainable fishing aims to harvest food while allowing fish populations and habitats to recover.",
      "sections":[
        {"title":"Hand-line fishing","paragraphs":[
          "Hand-line fishing uses a line and hook to catch fish one at a time.",
          "Because the fisher can choose hook size, bait and fishing location, this method can be relatively selective and usually produces less bycatch than large mobile nets."
        ]},
        {"title":"Fish pots","paragraphs":[
          "Fish pots are traps made from materials such as wire mesh or woven material and normally have a funnel-shaped entrance.",
          "Fish swim into the trap and have difficulty finding the exit.",
          "Suitable mesh and escape openings can help reduce capture of very small fish."
        ]},
        {"title":"Long-lining","paragraphs":[
          "Long-line fishing uses a long main line carrying many baited hooks.",
          "It is commonly used for large pelagic fish such as tuna and marlin.",
          "Hook type, bait, depth and location influence the amount of unwanted catch."
        ]},
        {"title":"Seine nets","paragraphs":[
          "A seine net is used to surround a school of fish, often near shore, before the net is drawn in.",
          "Mesh size and fishing location affect which sizes and species are retained."
        ]},
        {"title":"Trawling","paragraphs":[
          "Trawling uses a large cone-shaped net towed behind a vessel.",
          "Bottom trawling can damage seabed habitats such as coral and seagrass and may catch many non-target organisms."
        ]},
        {"title":"Mesh size","paragraphs":[
          "Larger mesh openings can allow young fish to escape.",
          "This gives juveniles a chance to grow and reproduce before they are harvested."
        ]},
        {"title":"Closed seasons","paragraphs":[
          "Closed seasons temporarily stop or restrict fishing during important breeding or recruitment periods.",
          "This protects spawning adults and young stages and can help maintain future stocks."
        ]},
        {"title":"Destructive fishing","paragraphs":[
          "Dynamite fishing is destructive and indiscriminate because explosions kill many organisms and damage reef habitat.",
          "Scuba-assisted spearfishing is restricted in some places because divers can efficiently remove large breeding reef fish."
        ]},
        {"title":"Aquaculture","paragraphs":[
          "Aquaculture can supply fish without removing the same quantity from wild stocks.",
          "It is not automatically impact-free, however, and farms must manage waste, disease, feed and habitat effects."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-4-local-fishing-methods","type":"fishing-methods","title":"Local fishing methods and sustainability explorer"}],
      "keyPoints":[
        "Trawling uses a large net towed by a vessel.",
        "Fish pots are traps with funnel-shaped entrances.",
        "Long-lines carry many baited hooks.",
        "Seine nets encircle schools of fish.",
        "Hand-line fishing is relatively selective.",
        "Larger mesh helps juveniles escape.",
        "Closed seasons protect breeding fish.",
        "Bottom trawling can damage seabed habitat.",
        "Dynamite fishing is destructive and indiscriminate."
      ],
      "workedExample":{
        "title":"Choosing a conservation measure",
        "prompt":"A fishing area is catching many juvenile fish before they reproduce. Which simple gear change could help?",
        "steps":[
          "The problem is that very small fish are being retained.",
          "Increasing net mesh size allows smaller fish to pass through.",
          "More juveniles can then survive to adulthood and reproduce."
        ],
        "answer":"Use a larger mesh size."
      },
      "checks":[
        {"prompt":"Which method uses a long line with many baited hooks?","answer":"Long-line fishing.","explanation":"It is commonly used for large fish such as tuna and marlin."},
        {"prompt":"Why can bottom trawling damage the environment?","answer":"It can disturb the seabed and catch non-target organisms.","explanation":"Heavy gear can damage benthic habitats and generate bycatch."},
        {"prompt":"Why are larger mesh sizes recommended?","answer":"They allow more young fish to escape.","explanation":"Juveniles can then grow and reproduce."},
        {"prompt":"How does a closed season help fish stocks?","answer":"It protects fish during breeding or vulnerable periods.","explanation":"Reduced fishing pressure allows reproduction and recruitment."}
      ],
      "summary":"Fishing gear should be matched to target species while limiting juvenile catch, bycatch and habitat damage."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
