begin;

-- CSEC Integrated Science objective 3.4.9
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values(
  'integrated-science',
  'm3-t4-9-machine-efficiency',
  'module-3-environment',
  '3.4.9 Efficiency of Simple Machines',
  'Examine mechanical advantage, work, efficiency and the effects of friction in simple machines.',
  808,
  true,
  '{
    "syllabus":{"module":3,"topic":"Forces","objective":"3.4.9","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Calculate mechanical advantage using load divided by effort.",
        "Calculate work using force multiplied by distance.",
        "State the joule as the unit of work.",
        "Calculate machine efficiency from useful work output and work input.",
        "Explain why real machines are less than 100 per cent efficient.",
        "Relate friction, rust and lubrication to machine efficiency.",
        "Calculate ideal mechanical advantage for an inclined plane.",
        "Apply work and efficiency calculations to pulley and lifting systems."
      ],
      "introduction":"Simple machines can multiply force or change the direction of a force, but they do not create energy. Their performance can be described using mechanical advantage, work and efficiency.",
      "sections":[
        {"title":"Mechanical advantage","paragraphs":[
          "Mechanical advantage compares the load moved with the effort force applied.",
          "Mechanical advantage = load ÷ effort.",
          "If a machine lifts a 200 N load using an effort of 50 N, the mechanical advantage is 200 ÷ 50 = 4.",
          "A lever lifting 500 N with an effort of 125 N also has mechanical advantage 4."
        ]},
        {"title":"Work","paragraphs":[
          "Work is done when a force moves an object through a distance in the direction of the force.",
          "Work = force × distance.",
          "The SI unit of work is the joule, J. One joule equals one newton metre.",
          "A 30 N force moving a box 5 m does 30 × 5 = 150 J of work.",
          "A crane lifting 5 000 N through 12 m does 60 000 J of useful work."
        ]},
        {"title":"Efficiency","paragraphs":[
          "Efficiency = useful work output ÷ work input × 100%.",
          "If a machine gives 400 J of useful work from 500 J of input work, its efficiency is 400 ÷ 500 × 100 = 80%.",
          "Efficiency greater than 100% is impossible because energy is not created."
        ]},
        {"title":"Pulley-system example","paragraphs":[
          "A pulley lifts a 200 N load through 2 m, so useful work output is 200 × 2 = 400 J.",
          "An 80 N effort moves 6 m, so work input is 80 × 6 = 480 J.",
          "Efficiency = 400 ÷ 480 × 100 ≈ 83%."
        ]},
        {"title":"Why machines are not perfectly efficient","paragraphs":[
          "Friction between moving parts transfers some input energy to heat and sound.",
          "Deformation of parts and air resistance can also transfer energy into less useful forms.",
          "The total energy is conserved, but not all of it remains available as useful output work."
        ]},
        {"title":"Improving efficiency","paragraphs":[
          "Lubricating chains, gears and bearings reduces friction.",
          "Removing rust and maintaining moving parts also reduces resistive forces.",
          "Correct tyre inflation reduces unnecessary deformation and rolling resistance in bicycles."
        ]},
        {"title":"Inclined plane","paragraphs":[
          "For an ideal inclined plane, mechanical advantage = length of slope ÷ vertical height.",
          "A 4 m ramp used to raise a load by 1 m has an ideal mechanical advantage of 4.",
          "A real inclined plane has lower efficiency because friction increases the required effort."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t4-9-machine-efficiency","type":"machine-efficiency","title":"Mechanical advantage, work and efficiency explorer"}],
      "keyPoints":[
        "Mechanical advantage = load ÷ effort.",
        "200 N ÷ 50 N = mechanical advantage 4.",
        "Work = force × distance.",
        "The unit of work is the joule.",
        "30 N × 5 m = 150 J.",
        "Efficiency = useful work out ÷ work in × 100%.",
        "400 J out from 500 J in gives 80% efficiency.",
        "Friction reduces efficiency.",
        "Lubrication improves efficiency.",
        "Ideal inclined-plane MA = length ÷ height."
      ],
      "workedExample":{
        "title":"Pulley efficiency",
        "prompt":"A pulley lifts a 200 N load through 2 m while an 80 N effort moves 6 m. Calculate the efficiency.",
        "steps":[
          "Useful work out = 200 × 2 = 400 J.",
          "Work in = 80 × 6 = 480 J.",
          "Efficiency = 400 ÷ 480 × 100.",
          "Efficiency ≈ 83%."
        ],
        "answer":"Approximately 83%."
      },
      "checks":[
        {"prompt":"What is mechanical advantage?","answer":"Load divided by effort.","explanation":"MA compares output force with input effort force."},
        {"prompt":"What work is done by a 30 N force moving an object 5 m?","answer":"150 J.","explanation":"Work = 30 × 5."},
        {"prompt":"A machine gives 400 J useful work from 500 J input. What is its efficiency?","answer":"80%.","explanation":"400 ÷ 500 × 100 = 80%."},
        {"prompt":"Why can no real machine be 100% efficient?","answer":"Some input energy is transferred into less useful forms such as heat and sound.","explanation":"Friction and other resistive effects dissipate useful mechanical energy."},
        {"prompt":"How does oiling a bicycle chain improve efficiency?","answer":"It reduces friction.","explanation":"Less energy is dissipated as heat when moving surfaces are lubricated."}
      ],
      "summary":"Machine performance is described by mechanical advantage, work and efficiency. Friction reduces useful output, while good maintenance and lubrication improve efficiency."
    }
  }'::jsonb
)
on conflict(subject_id,topic_id) do update set
  section_id=excluded.section_id,title=excluded.title,description=excluded.description,
  sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
