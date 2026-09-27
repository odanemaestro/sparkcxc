begin;

-- CSEC Integrated Science objective 3.4.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t4-3-centre-gravity-stability',
  'module-3-environment',
  '3.4.3 Centre of Gravity and Stability',
  'Explain centre of gravity and apply stability principles to vehicles, regular and irregular shapes, loading and safe transport.',
  800,
  true,
  '{
    "syllabus":{"module":3,"topic":"Forces","objective":"3.4.3","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Define centre of gravity.",
        "Explain why a low centre of gravity improves stability.",
        "Explain why a wide base improves stability.",
        "Apply stability principles to trucks, buses and racing cars.",
        "Locate the centre of gravity of regular uniform shapes.",
        "Find the centre of gravity of an irregular lamina using plumb lines.",
        "Define vehicle tare.",
        "Explain why maximum loading limits are needed."
      ],
      "introduction":"The centre of gravity is the point through which the whole weight of an object may be considered to act. Stability depends strongly on the height of this point and the width of the base of support.",
      "sections":[
        {"title":"Centre of gravity","paragraphs":[
          "The centre of gravity is the point where the whole weight of an object appears to act.",
          "For many regular uniform shapes, it lies at the geometric centre."
        ]},
        {"title":"Stable objects","paragraphs":[
          "An object is generally more stable when its centre of gravity is low and its base is wide.",
          "Toppling begins when the vertical line through the centre of gravity falls outside the base of support."
        ]},
        {"title":"Truck loading","paragraphs":[
          "Heavy goods should be loaded as low as practical, preferably on the floor rather than high on the roof.",
          "Keeping heavy mass low reduces the height of the combined centre of gravity and lowers the risk of overturning."
        ]},
        {"title":"Racing cars","paragraphs":[
          "Racing cars are built low and wide to improve stability.",
          "The low body lowers the centre of gravity and the wide wheel track increases the support base."
        ]},
        {"title":"Double-deck buses","paragraphs":[
          "Loading more passengers or heavy items high in a vehicle raises its centre of gravity.",
          "A heavily loaded upper deck with an empty lower deck is therefore less stable than keeping more mass lower down."
        ]},
        {"title":"Regular shapes","paragraphs":[
          "The centre of gravity of a uniform circular disc is at its centre.",
          "For a uniform rectangle, the centre of gravity is where the diagonals intersect."
        ]},
        {"title":"Irregular lamina","paragraphs":[
          "Suspend the irregular flat object freely from one point and draw a vertical plumb line.",
          "Repeat from a second suspension point.",
          "The two plumb lines intersect at the centre of gravity because the centre of gravity hangs directly below the suspension point each time."
        ]},
        {"title":"Tare","paragraphs":[
          "The tare of a vehicle is its mass when empty, before cargo or passengers are added.",
          "Gross mass includes the vehicle plus its load."
        ]},
        {"title":"Maximum loading limits","paragraphs":[
          "Loading limits protect vehicle stability and help prevent excessive stress on brakes, tyres, suspension and road surfaces.",
          "Overloading can raise the centre of gravity, lengthen stopping distance and make control more difficult."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t4-3-centre-gravity-stability","type":"stability-centre-gravity","title":"Centre of gravity and stability explorer"}],
      "keyPoints":[
        "Centre of gravity is the point through which weight may be considered to act.",
        "A lower centre of gravity increases stability.",
        "A wider base increases stability.",
        "Heavy loads should be kept low.",
        "Racing cars are low and wide for stability.",
        "The centre of a uniform disc is its centre of gravity.",
        "The centre of gravity of a rectangle lies where its diagonals cross.",
        "Plumb lines can locate the centre of gravity of an irregular lamina.",
        "Tare is the empty mass of a vehicle.",
        "Loading limits protect stability and road safety."
      ],
      "workedExample":{
        "title":"Comparing stability",
        "prompt":"Two containers have the same mass. X is short and wide while Y is tall and narrow. Which is more stable?",
        "steps":[
          "X has a wider base.",
          "X also has a lower centre of gravity.",
          "Its weight line can move farther before falling outside the base.",
          "X is therefore more difficult to topple."
        ],
        "answer":"Container X is more stable."
      },
      "checks":[
        {"prompt":"What is the centre of gravity?","answer":"The point through which the whole weight of an object may be considered to act.","explanation":"For regular uniform shapes it often coincides with the geometric centre."},
        {"prompt":"Why should heavy goods be loaded on the floor of a truck?","answer":"To keep the combined centre of gravity low and improve stability.","explanation":"A high centre of gravity increases overturning risk."},
        {"prompt":"How can the centre of gravity of an irregular lamina be found?","answer":"Suspend it from different points and draw plumb lines; their intersection is the centre of gravity.","explanation":"The centre of gravity hangs vertically below each suspension point."},
        {"prompt":"What is vehicle tare?","answer":"The mass of the empty vehicle.","explanation":"It excludes cargo and passengers."},
        {"prompt":"Why are maximum loading limits used?","answer":"To protect vehicle stability, braking, tyres, suspension and roads.","explanation":"Excess loading creates several safety and mechanical problems."}
      ],
      "summary":"Stability improves with a low centre of gravity and wide base. These principles guide safe design, loading and operation of vehicles and other objects."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":80,"objectivesBuilt":80}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
