begin;

-- CSEC Integrated Science objective 1.3.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t3-8-human-population-control',
  'module-1-organisms-life-processes',
  '1.3.8 Human Population Growth and Control',
  'Discuss why rapid population growth can place pressure on food, water, housing, employment and natural resources, and evaluate voluntary approaches to population planning.',
  170,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Reproduction and Growth in Animals",
      "objective":"1.3.8",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Explain how birth rate, death rate, immigration and emigration affect population size.",
        "Interpret a population-growth graph and calculate change over time.",
        "Explain how rapid population growth can affect food, water, housing, jobs, waste management and natural resources.",
        "Explain how teenage pregnancy and early childbearing can increase population growth.",
        "Assess voluntary approaches such as family-planning education, access to contraception and education of girls and women.",
        "Explain why population planning should respect individual rights and informed choice."
      ],
      "introduction":"Human populations change when births, deaths and migration change. Rapid growth can improve the size of the labour force and increase demand for goods and services, but it can also place heavy pressure on resources and public services when growth is faster than a country can plan for.",
      "sections":[
        {
          "title":"How population size changes",
          "paragraphs":[
            "A population increases when births and immigration are greater than deaths and emigration. It decreases when deaths and emigration are greater than births and immigration.",
            "The natural increase of a population is the difference between births and deaths. Migration also changes the total number of people living in a country."
          ],
          "bullets":[
            "A high birth rate increases population size.",
            "A falling death rate can increase population growth if the birth rate remains high.",
            "Immigration adds people to a population.",
            "Emigration removes people from a population."
          ]
        },
        {
          "title":"Reading the SPARK CSEC population graph",
          "paragraphs":[
            "The practice graph shows a population rising from about 4 million in 1960 to about 28 million in 2020.",
            "Between 1980 and 2020, the population rises from about 8 million to 28 million. The increase is therefore about 20 million.",
            "The curve becomes steeper over time, showing that the absolute increase per decade becomes larger in the later part of the graph."
          ]
        },
        {
          "title":"Pressure on food and water",
          "paragraphs":[
            "More people require more food and clean water. If agricultural production, storage and distribution do not keep pace, food shortages and higher prices can occur.",
            "Greater water demand can place pressure on rivers, reservoirs and groundwater supplies. Poor water infrastructure may increase the risk of shortages and contamination."
          ]
        },
        {
          "title":"Housing, jobs and public services",
          "paragraphs":[
            "Rapid population growth increases demand for housing, schools, health services, transport, electricity and employment.",
            "When housing supply grows too slowly, overcrowding and informal settlements may increase. When job creation is too slow, unemployment and underemployment can rise."
          ]
        },
        {
          "title":"Waste and environmental pressure",
          "paragraphs":[
            "A larger population produces more sewage and solid waste. Without adequate collection and treatment, pollution and disease risk can increase.",
            "Growing demand for land, food, timber and energy can contribute to deforestation, habitat loss, soil degradation, overfishing and pressure on fresh water."
          ]
        },
        {
          "title":"Teenage pregnancy and population growth",
          "paragraphs":[
            "When childbearing begins at a younger age, the time between generations becomes shorter. If a person also has more reproductive years remaining, the number of children over a lifetime may be greater.",
            "For this reason, high rates of teenage pregnancy can contribute to faster population growth in a community or country."
          ]
        },
        {
          "title":"Voluntary family planning",
          "paragraphs":[
            "Family-planning education helps people understand reproduction, contraception, birth spacing and the health and economic effects of family size.",
            "Voluntary access to safe and suitable contraceptive methods allows people to decide whether and when to have children. These decisions should be informed and free from coercion."
          ]
        },
        {
          "title":"Education and opportunity",
          "paragraphs":[
            "Continued education for girls and women is associated with wider employment opportunities, later average age at first birth and greater ability to make informed reproductive decisions.",
            "Education of both males and females is important because decisions about relationships, contraception, parenting and family size involve shared responsibility."
          ]
        },
        {
          "title":"Population planning and human rights",
          "paragraphs":[
            "Governments need population information to plan schools, hospitals, housing, water systems, food supply, transport and waste management.",
            "Population programmes should support voluntary, informed decisions and respect individual rights. Coercive population policies can cause serious ethical and social harm."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t3-8-population-growth",
          "type":"population-growth",
          "title":"Population growth and resource pressure"
        }
      ],
      "keyPoints":[
        "Population change depends on births, deaths, immigration and emigration.",
        "The SPARK practice graph increases from about 8 million in 1980 to 28 million in 2020, an increase of about 20 million.",
        "Rapid population growth can increase demand for food, water, housing, jobs, schools, health care and waste services.",
        "Population growth can increase pressure on forests, habitats, fresh water and other natural resources.",
        "Early childbearing shortens generation time and can contribute to faster population growth.",
        "Family-planning education and voluntary access to contraception support informed birth spacing and family-size decisions.",
        "Population planning should respect human rights and informed choice."
      ],
      "workedExample":{
        "title":"Calculating population increase",
        "prompt":"A graph shows a population of 8 million in 1980 and 28 million in 2020. Calculate the increase and state one likely pressure caused by this growth.",
        "steps":[
          "Read the two population values from the graph.",
          "Subtract the earlier population from the later population.",
          "28 million - 8 million = 20 million.",
          "Link the increase to a resource or service that more people require."
        ],
        "answer":"The population increased by about 20 million. One likely pressure is greater demand for housing, food, clean water or jobs."
      },
      "checks":[
        {
          "prompt":"When does a population increase naturally?",
          "answer":"When the number of births is greater than the number of deaths.",
          "explanation":"Migration also changes total population size, but natural increase refers to births minus deaths."
        },
        {
          "prompt":"Why can better health care increase population growth?",
          "answer":"If health care lowers the death rate while the birth rate remains high, more people survive and the population grows.",
          "explanation":"Population growth depends on the balance between births and deaths."
        },
        {
          "prompt":"How can teenage pregnancy contribute to rapid population growth?",
          "answer":"Earlier childbearing shortens the time between generations and may increase the number of children a person has over a lifetime.",
          "explanation":"Shorter generation intervals can increase the rate at which a population grows."
        },
        {
          "prompt":"State two voluntary measures that can help reduce rapid population growth.",
          "answer":"Examples include family-planning education, access to contraception, sex education and continued education of girls and women.",
          "explanation":"These approaches support informed decisions rather than coercion."
        }
      ],
      "summary":"Population growth must be understood through data and resource demand. Compare births and deaths, include migration, calculate changes from graphs and connect rapid growth to food, water, housing, employment, public services and environmental pressure."
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
  || '{"topicsBuilt":17,"objectivesBuilt":17}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
