begin;

-- CSEC Integrated Science objective 1.3.7
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-7-growth-patterns-males-females',
  'module-1-organisms-life-processes',
  '1.3.7 Growth Patterns of Males and Females',
  'Compare average male and female growth patterns during childhood and adolescence using CSEC height and mass data and relate the differences to puberty.',
  160,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.7",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Interpret line graphs and tables showing average height and mass at different ages.",
        "Compare the timing of adolescent growth spurts in boys and girls.",
        "Calculate changes in height or mass over an age interval.",
        "Relate puberty to rapid growth and development of secondary sexual characteristics.",
        "Recognise that population averages do not predict the exact growth pattern of an individual."
      ],
      "introduction":"Human growth is not equally rapid at every age. Growth is fast during infancy, slows through much of childhood and increases again during the adolescent growth spurt. Boys and girls show overlapping patterns, but girls usually enter puberty and the adolescent growth spurt earlier on average.",
      "sections":[
        {
          "title":"Reading growth data",
          "paragraphs":[
            "A growth graph shows how a measurement such as height changes with age. A steeper line means a greater increase over that interval.",
            "Always read the axes and units before comparing the curves. A higher curve at one age shows a larger average measurement at that age, but it does not mean every individual in that group is taller or heavier."
          ]
        },
        {
          "title":"Height pattern in the SPARK CSEC dataset",
          "paragraphs":[
            "In the supplied practice dataset, boys and girls have similar average heights in the earlier years. The girls'' curve rises earlier during the first part of adolescence, reflecting the earlier average onset of puberty.",
            "The boys'' curve becomes steeper later and continues rising strongly through the mid-teen years. By the later teen years, the boys'' average height is greater in this dataset."
          ]
        },
        {
          "title":"Mass pattern in the SPARK CSEC dataset",
          "paragraphs":[
            "At age 12, the table gives an average mass of 40 kg for boys and 42 kg for girls. At age 14, boys average 51 kg and girls 50 kg.",
            "From age 12 to 14, boys increase by 11 kg, the largest two-year gain shown for boys in this dataset. After age 16, boys also gain more mass than girls in the table."
          ]
        },
        {
          "title":"Puberty and the growth spurt",
          "paragraphs":[
            "Puberty is the stage when reproductive maturity develops under the influence of hormones. It is associated with rapid growth and development of secondary sexual characteristics.",
            "Girls usually begin puberty earlier on average. Oestrogen contributes to features such as breast development and widening of the hips. Boys generally begin their major adolescent growth spurt later, and testosterone contributes to features such as deepening of the voice, facial hair and broader shoulders."
          ]
        },
        {
          "title":"Individual variation",
          "paragraphs":[
            "Growth charts describe averages and ranges, not a fixed timetable for every person. Genetics, nutrition, health, physical activity, hormones and other factors affect growth.",
            "A healthy individual may therefore grow earlier, later, faster or more slowly than the average curve."
          ]
        },
        {
          "title":"How to compare two growth curves",
          "bullets":[
            "Identify where one curve lies above the other.",
            "Look for the steepest section to locate the greatest rate of increase.",
            "Calculate a change by subtracting the earlier value from the later value.",
            "Use age intervals, units and numerical evidence in the comparison.",
            "Relate adolescent differences to the timing of puberty without treating averages as rules for individuals."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-7-human-growth",
          "type":"human-growth",
          "title":"Human growth data explorer"
        }
      ],
      "keyPoints":[
        "Human growth is especially rapid during infancy and puberty.",
        "Girls usually enter puberty and their adolescent growth spurt earlier on average than boys.",
        "Boys commonly have a later major adolescent growth spurt.",
        "The steepness of a graph shows how rapidly a measurement is changing.",
        "The SPARK practice dataset shows girls heavier than boys at age 12 and boys making their greatest two-year mass gain from ages 12 to 14.",
        "Growth data are averages and do not determine the growth of an individual."
      ],
      "workedExample":{
        "title":"Comparing mass gain",
        "prompt":"In the CSEC practice table, boys average 40 kg at age 12 and 51 kg at age 14. Girls average 42 kg at age 12 and 50 kg at age 14. Compare the mass gain of the two groups.",
        "steps":[
          "Boys: 51 kg - 40 kg = 11 kg.",
          "Girls: 50 kg - 42 kg = 8 kg.",
          "Compare the two changes.",
          "11 kg - 8 kg = 3 kg."
        ],
        "answer":"Between ages 12 and 14, boys gain 11 kg on average and girls gain 8 kg on average in this dataset. The boys'' average gain is 3 kg greater."
      },
      "checks":[
        {
          "prompt":"Why is the steepest section of a growth curve important?",
          "answer":"It shows the age interval with the greatest increase in the measured quantity.",
          "explanation":"A steep line represents a large change over a small age interval."
        },
        {
          "prompt":"At age 12 in the SPARK mass dataset, which group is heavier on average?",
          "answer":"Girls, at 42 kg compared with 40 kg for boys.",
          "explanation":"The values must be read directly from the table."
        },
        {
          "prompt":"Why do girls often appear to have an earlier adolescent growth spurt than boys?",
          "answer":"Girls usually enter puberty earlier on average.",
          "explanation":"The timing of puberty shifts the timing of rapid adolescent growth."
        },
        {
          "prompt":"Why should an average growth curve not be used to predict one student''s exact height?",
          "answer":"Individuals vary because growth is affected by genetics, nutrition, health, hormones and other factors.",
          "explanation":"Population averages describe groups, not fixed outcomes for each person."
        }
      ],
      "summary":"Use data to compare growth patterns. Read the axes, identify the steepest sections, calculate changes and relate the adolescent growth spurts to puberty while remembering that individual growth varies."
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
  || '{"topicsBuilt":16,"objectivesBuilt":16}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
