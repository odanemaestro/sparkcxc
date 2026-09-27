begin;

-- CSEC Integrated Science objective 1.7.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-1-selected-microbes',
  'module-1-organisms-life-processes',
  '1.7.1 Selected Microbes',
  'Discuss selected viruses, bacteria and fungi, including their structural differences, useful activities and harmful effects.',
  300,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish viruses, bacteria and fungi.",
        "Explain why viruses can reproduce only inside living host cells.",
        "Describe useful activities of selected bacteria and fungi.",
        "Describe harmful effects of selected microbes.",
        "Explain the role of decomposer microorganisms in nutrient recycling.",
        "Explain why antibiotics do not treat viral infections."
      ],
      "introduction":"Microorganisms include many forms that are too small to see clearly without magnification. Some are useful in food production, agriculture and nutrient recycling, while others cause disease or spoil food. Viruses differ from cellular microorganisms because they reproduce only inside living host cells.",
      "sections":[
        {
          "title":"Bacteria",
          "paragraphs":[
            "Bacteria are single-celled microorganisms. They occur in soil, water, food and living organisms.",
            "Many bacteria are harmless or useful. Selected bacteria ferment milk to produce foods such as yoghurt, while nitrogen-fixing bacteria in the root nodules of legumes convert nitrogen gas into nitrogen compounds that plants can use.",
            "Some bacteria cause disease. Tuberculosis is a bacterial disease."
          ]
        },
        {
          "title":"Viruses",
          "paragraphs":[
            "Viruses are much smaller than typical cells and are not cellular organisms. A virus contains genetic material enclosed by a protein coat, and some viruses also have an outer envelope.",
            "Viruses do not carry out all life processes independently and can reproduce only after entering a living host cell.",
            "The common cold and influenza are examples of viral infections."
          ]
        },
        {
          "title":"Fungi",
          "paragraphs":[
            "Fungi include yeasts, moulds and larger forms such as mushrooms. Many fungi feed by releasing digestive enzymes onto organic material and absorbing the soluble products.",
            "Some fungi are useful in decomposition and food production. Yeast is used in bread making and fermentation.",
            "Other fungi cause disease. Ringworm and athlete''s foot are fungal infections."
          ]
        },
        {
          "title":"Decomposers and nutrient recycling",
          "paragraphs":[
            "Decomposer bacteria and fungi break down dead organisms and organic wastes.",
            "Their activity releases mineral nutrients back into the environment, where plants can absorb them again. Decomposition therefore helps recycle matter through ecosystems."
          ]
        },
        {
          "title":"Microbes in food production",
          "paragraphs":[
            "Microorganisms are used intentionally in several food processes. Bacteria are used to ferment milk during yoghurt and some cheese production.",
            "Yeast ferments sugars and produces carbon dioxide and ethanol. Carbon dioxide helps bread dough rise."
          ]
        },
        {
          "title":"Penicillin and antibiotics",
          "paragraphs":[
            "Penicillin was originally obtained from the mould Penicillium. It became an important antibiotic used against susceptible bacterial infections.",
            "Antibiotics act on structures or processes found in bacteria. Viruses do not have the same cellular machinery, so antibiotics do not kill viruses and should not be used to treat viral illnesses such as influenza."
          ]
        },
        {
          "title":"Useful and harmful are not fixed labels",
          "paragraphs":[
            "It is incorrect to say that all bacteria or all fungi are harmful. The effect depends on the species and the situation.",
            "Some microorganisms are essential to ecosystems and useful to people, while others cause disease, food spoilage or other harm."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-1-microbes",
          "type":"microbes",
          "title":"Selected microbes"
        }
      ],
      "keyPoints":[
        "Bacteria are single-celled microorganisms and can be useful or harmful.",
        "Viruses are not cells and reproduce only inside living host cells.",
        "Fungi include yeasts and moulds.",
        "Bacteria are used in yoghurt production and nitrogen fixation.",
        "Decomposer bacteria and fungi recycle mineral nutrients.",
        "Ringworm and athlete''s foot are fungal infections.",
        "Tuberculosis is bacterial, while influenza is viral.",
        "Antibiotics act against bacteria, not viruses."
      ],
      "workedExample":{
        "title":"Identifying the microbe and treatment",
        "prompt":"A student says that influenza should be treated with an antibiotic because antibiotics kill microorganisms. Explain why this statement is incorrect.",
        "steps":[
          "Identify the type of pathogen that causes influenza.",
          "Influenza is caused by a virus.",
          "Antibiotics target bacterial structures or processes.",
          "Viruses do not have the same cellular targets."
        ],
        "answer":"Influenza is caused by a virus, not a bacterium. Antibiotics act on bacterial structures or processes and do not kill influenza viruses."
      },
      "checks":[
        {
          "prompt":"Why is a virus different from a bacterium?",
          "answer":"A virus is not a cell and can reproduce only inside a living host cell.",
          "explanation":"A bacterium is a living single cell that carries out its own cellular processes."
        },
        {
          "prompt":"State one useful activity of bacteria.",
          "answer":"Examples include making yoghurt or fixing nitrogen in legume root nodules.",
          "explanation":"Not all bacteria are harmful."
        },
        {
          "prompt":"Why are decomposer bacteria and fungi important?",
          "answer":"They break down dead material and return mineral nutrients to the environment.",
          "explanation":"This supports nutrient recycling in ecosystems."
        },
        {
          "prompt":"Name two fungal diseases mentioned in this lesson.",
          "answer":"Ringworm and athlete''s foot.",
          "explanation":"Both are caused by fungi."
        }
      ],
      "summary":"Compare microbes by structure and activity rather than treating them as one group. Bacteria, viruses and fungi differ in how they live and reproduce, and each group includes examples important to health, food production or ecosystems."
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
  || '{"topicsBuilt":30,"objectivesBuilt":30}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
