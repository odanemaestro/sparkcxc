begin;

-- CSEC Integrated Science objective 1.7.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t7-2-communicable-disease',
  'module-1-organisms-life-processes',
  '1.7.2 Communicable and Infectious Disease',
  'Discuss communicable diseases by linking pathogens to routes of transmission, selected STIs, vectors, prevention and treatment limits.',
  310,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Health",
      "objective":"1.7.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define communicable disease and pathogen.",
        "Identify common routes by which infectious diseases spread.",
        "Relate selected sexually transmitted infections to the type of pathogen that causes them.",
        "Explain selected symptoms, complications and treatment principles for common STIs.",
        "Explain how HIV affects the immune system and distinguish HIV infection from AIDS.",
        "Define a vector and explain dengue transmission by Aedes mosquitoes.",
        "Recommend practical methods for reducing the spread of communicable disease."
      ],
      "introduction":"A communicable disease is caused by a pathogen and can spread from one host to another. The route of transmission differs among diseases, so effective prevention depends on understanding how the pathogen moves between people, animals or the environment.",
      "sections":[
        {
          "title":"Pathogens and transmission",
          "paragraphs":[
            "A pathogen is a disease-causing microorganism or infectious agent. Pathogens include selected bacteria, viruses, fungi and other organisms.",
            "Communicable diseases may spread through respiratory droplets or aerosols, contaminated food or water, direct contact, sexual contact, infected blood or vectors.",
            "Breaking the route of transmission reduces the chance that a pathogen reaches a new host."
          ]
        },
        {
          "title":"Gonorrhoea, chlamydia and syphilis",
          "paragraphs":[
            "Gonorrhoea, chlamydia and syphilis are bacterial sexually transmitted infections.",
            "Gonorrhoea may cause painful urination and discharge, although many infected people, especially women, may have no symptoms. Chlamydia is also commonly asymptomatic. Untreated gonorrhoea or chlamydia can cause reproductive complications including infertility.",
            "Primary syphilis may produce a painless sore called a chancre at the site of infection.",
            "These bacterial STIs are generally curable with appropriate antibiotics. Antibiotic resistance is a serious concern for gonorrhoea, so treatment should follow current medical guidance."
          ]
        },
        {
          "title":"Genital herpes",
          "paragraphs":[
            "Genital herpes is caused by herpes simplex virus. It may cause painful blisters or sores, but some infected people have mild symptoms or no recognised symptoms.",
            "The virus remains in the body. Antiviral medicines can reduce symptoms and outbreaks but do not remove the virus completely."
          ]
        },
        {
          "title":"HIV and AIDS",
          "paragraphs":[
            "HIV is a virus that attacks important immune cells, especially CD4 helper T lymphocytes. Without effective treatment, progressive damage to the immune system can eventually lead to AIDS.",
            "AIDS is not a separate pathogen. It is an advanced stage of HIV infection in which immune function is severely weakened.",
            "Modern antiretroviral therapy can suppress HIV, protect the immune system and prevent progression to AIDS. People who maintain an undetectable viral load on effective treatment do not sexually transmit HIV."
          ]
        },
        {
          "title":"Hepatitis B",
          "paragraphs":[
            "Hepatitis B is caused by a virus and mainly affects the liver. It can spread through infected blood, sexual contact and from mother to child during birth.",
            "Vaccination provides effective prevention. Antiviral treatment is available for some people with chronic hepatitis B."
          ]
        },
        {
          "title":"Candida and sexual health",
          "paragraphs":[
            "Candida is a yeast, which is a fungus. Overgrowth can cause candidiasis or thrush, including genital symptoms.",
            "CSEC materials may group Candida with infections discussed in sexual-health lessons. Medically, candidiasis is not usually classified as a classic sexually transmitted infection because Candida can normally live on the body and overgrowth can occur without sexual transmission."
          ]
        },
        {
          "title":"Reducing STI transmission",
          "paragraphs":[
            "Abstinence from sexual activity prevents sexual transmission while it is maintained. Correct and consistent condom use greatly reduces the risk of HIV and several other STIs, although condoms provide less protection against infections spread through sores on skin not covered by the condom.",
            "Other prevention measures include not sharing needles, using screened blood for transfusion, testing when appropriate, receiving recommended vaccines such as hepatitis B vaccine, and receiving treatment when an infection is diagnosed.",
            "A mutually monogamous relationship in which both partners are uninfected reduces exposure to new sexually transmitted pathogens."
          ]
        },
        {
          "title":"Dengue and vectors",
          "paragraphs":[
            "A vector is an organism that carries a pathogen from one host to another. Dengue is caused by a virus transmitted to humans mainly through the bite of infected Aedes mosquitoes.",
            "Mosquito control should target the life cycle. Removing or covering water-holding containers reduces places where eggs and larvae develop. Appropriate control of adult mosquitoes and reducing mosquito bites can also lower transmission."
          ]
        },
        {
          "title":"Communicable disease prevention in a community",
          "paragraphs":[
            "Regular hand washing, safe food handling, clean water, covering coughs and sneezes, appropriate ventilation, vaccination and environmental sanitation all help interrupt different transmission routes.",
            "Improper waste disposal can create breeding sites for mosquitoes and attract flies, rats and other pests that may spread disease."
          ]
        },
        {
          "title":"Antibiotics and viral disease",
          "paragraphs":[
            "Antibiotics act against bacteria and do not treat viral infections such as dengue, influenza, herpes or HIV.",
            "Using an antibiotic when it is not needed does not cure a viral infection and contributes to antibiotic-resistance problems."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t7-2-infectious-disease",
          "type":"infectious-disease",
          "title":"Communicable disease and transmission"
        }
      ],
      "keyPoints":[
        "Communicable diseases are caused by pathogens and can spread between hosts.",
        "Gonorrhoea, chlamydia and syphilis are bacterial STIs.",
        "Genital herpes, HIV and hepatitis B are viral infections.",
        "Candida is a fungus and candidiasis is not usually classified medically as a classic STI.",
        "HIV attacks immune cells, while AIDS is an advanced stage of HIV infection.",
        "Antibiotics treat susceptible bacterial infections, not viral infections.",
        "A vector carries a pathogen between hosts. Aedes mosquitoes transmit dengue virus.",
        "Prevention should interrupt the route by which the pathogen spreads."
      ],
      "workedExample":{
        "title":"Choosing prevention for dengue",
        "prompt":"A community has many discarded tyres and open containers holding rainwater during a dengue outbreak. Explain why this increases disease risk and recommend two control measures.",
        "steps":[
          "Dengue virus is transmitted by Aedes mosquitoes.",
          "Standing water provides sites for mosquito eggs and larvae to develop.",
          "More adult mosquitoes increase the chance of bites and virus transmission.",
          "Remove, empty or cover containers that hold water.",
          "Use suitable measures to reduce adult mosquito bites or adult mosquito numbers."
        ],
        "answer":"Standing water increases mosquito breeding. The community should remove or cover water-holding containers and use appropriate adult mosquito or bite-control measures."
      },
      "checks":[
        {
          "prompt":"What is a communicable disease?",
          "answer":"A disease caused by a pathogen that can spread from one host to another.",
          "explanation":"Different communicable diseases use different routes of transmission."
        },
        {
          "prompt":"Which pathogen types cause gonorrhoea, genital herpes and candidiasis?",
          "answer":"Gonorrhoea is bacterial, genital herpes is viral, and candidiasis is fungal.",
          "explanation":"Correct pathogen identification helps explain treatment and prevention."
        },
        {
          "prompt":"Why do antibiotics not treat dengue fever?",
          "answer":"Dengue is caused by a virus, while antibiotics act against bacteria.",
          "explanation":"Viruses do not have the bacterial structures or processes targeted by antibiotics."
        },
        {
          "prompt":"State two ways to reduce HIV transmission.",
          "answer":"Examples include correct condom use, abstinence, not sharing needles, screened blood, effective HIV treatment and appropriate testing and prevention services.",
          "explanation":"These measures reduce exposure to infected sexual fluids or blood or reduce infectious virus."
        }
      ],
      "summary":"To discuss a communicable disease, identify the pathogen, route of transmission and suitable prevention. Do not assume every infection has symptoms, and do not treat bacterial and viral infections as if they respond to the same medicines."
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
  || '{"topicsBuilt":31,"objectivesBuilt":31}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
