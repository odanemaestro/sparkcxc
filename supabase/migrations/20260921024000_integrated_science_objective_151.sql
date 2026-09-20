begin;

-- CSEC Integrated Science objective 1.5.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t5-1-excretion-egestion',
  'module-1-organisms-life-processes',
  '1.5.1 Excretion and Egestion',
  'Distinguish excretion from egestion by tracing the origin of removed materials and relating metabolic wastes to the organs that remove them.',
  210,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Excretion",
      "objective":"1.5.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define excretion and egestion.",
        "Distinguish metabolic waste from undigested or unabsorbed food.",
        "Identify carbon dioxide, urea, excess water and salts as excretory products.",
        "Relate common human excretory products to their origins and routes out of the body.",
        "Explain why faeces are mainly associated with egestion while some substances within faeces, such as bile pigments, are excretory products."
      ],
      "introduction":"Excretion and egestion both remove material from the body, but they are not the same process. The distinction depends on where the material came from. Excretion removes waste products formed by metabolism inside the body, while egestion removes undigested or unabsorbed material from the alimentary canal.",
      "sections":[
        {
          "title":"What is excretion?",
          "paragraphs":[
            "Excretion is the removal from the body of waste products produced by metabolism, together with substances present in excess.",
            "These materials have been produced by body cells or are part of the internal body environment. If they accumulate, they can disturb normal cell function."
          ]
        },
        {
          "title":"What is egestion?",
          "paragraphs":[
            "Egestion is the removal of undigested or unabsorbed food from the alimentary canal.",
            "This material was never absorbed into the internal body environment and never became part of body cells. It passes through the digestive tract and leaves through the anus."
          ]
        },
        {
          "title":"Carbon dioxide",
          "paragraphs":[
            "Carbon dioxide is produced by aerobic respiration in body cells. Because it is a metabolic waste product, its removal is excretion.",
            "Carbon dioxide is transported in the blood to the lungs and leaves the body in exhaled air. Water vapour is also lost through the lungs."
          ]
        },
        {
          "title":"Urea",
          "paragraphs":[
            "Proteins are digested to amino acids. The body cannot store large quantities of excess amino acids.",
            "In the liver, excess amino acids are deaminated. The nitrogen-containing part is converted to urea. Urea is carried in the blood to the kidneys and removed mainly in urine.",
            "Urea is therefore an excretory product because it is formed by metabolism inside the body."
          ]
        },
        {
          "title":"Water and mineral salts",
          "paragraphs":[
            "Water and mineral salts are essential to the body, but amounts above what is needed must be regulated.",
            "The kidneys remove excess water and salts in urine. Sweat glands in the skin also remove water, salts and a small amount of urea in sweat."
          ]
        },
        {
          "title":"Bile pigments",
          "paragraphs":[
            "Old red blood cells are broken down and haemoglobin is processed. Pigments formed from this breakdown are handled by the liver and released in bile into the gut.",
            "These pigments eventually leave the body in faeces. Although they leave through the alimentary canal, they are excretory products because they originated from metabolism inside the body."
          ]
        },
        {
          "title":"Why faeces are not simply an excretory product",
          "paragraphs":[
            "Faeces contain a mixture of substances. Much of the solid material is undigested food, especially fibre, plus bacteria and other material from the gut.",
            "The removal of undigested food is egestion because the food was never absorbed into body cells. This is different from excretory substances such as bile pigments that are released into the gut after being produced inside the body."
          ]
        },
        {
          "title":"Excretory organs and products",
          "bullets":[
            "Lungs: carbon dioxide and water vapour.",
            "Kidneys: urea, excess water and excess mineral salts.",
            "Skin: water, mineral salts and a small amount of urea in sweat.",
            "Liver: forms urea from excess amino acids and releases bile pigments into bile.",
            "Anus: route by which egested undigested material leaves the alimentary canal."
          ]
        },
        {
          "title":"A reliable way to distinguish the two",
          "paragraphs":[
            "Ask whether the material was produced by metabolism or entered the internal body environment. If it is a metabolic waste or an excess internal substance being removed, the process is excretion.",
            "If the material is undigested or unabsorbed food that stayed within the alimentary canal, its removal is egestion."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t5-1-excretion-egestion",
          "type":"excretion-egestion",
          "title":"Excretion or egestion?"
        }
      ],
      "keyPoints":[
        "Excretion removes metabolic wastes and excess substances from the internal body environment.",
        "Egestion removes undigested or unabsorbed food from the alimentary canal.",
        "Carbon dioxide is an excretory product of respiration.",
        "Urea is produced in the liver from the breakdown of excess amino acids.",
        "The skin excretes water, salts and a small amount of urea in sweat.",
        "Faeces are mainly associated with egestion, but bile pigments in faeces are excretory products."
      ],
      "workedExample":{
        "title":"Classifying carbon dioxide and fibre",
        "prompt":"A student says that breathing out carbon dioxide and passing out undigested fibre are both examples of excretion because both remove unwanted material. Explain why the statement is incorrect.",
        "steps":[
          "Identify the origin of carbon dioxide.",
          "Carbon dioxide is produced by respiration in body cells.",
          "Identify the origin of undigested fibre.",
          "Fibre remains in the alimentary canal and is not digested and absorbed into body cells.",
          "Classify each process according to origin."
        ],
        "answer":"Breathing out carbon dioxide is excretion because carbon dioxide is a metabolic waste produced by respiration. Passing out undigested fibre is egestion because the fibre was never absorbed into body cells."
      },
      "checks":[
        {
          "prompt":"What is excretion?",
          "answer":"The removal from the body of waste products produced by metabolism and substances present in excess.",
          "explanation":"Examples include carbon dioxide, urea and excess water and salts."
        },
        {
          "prompt":"Why is passing out faeces usually described as egestion?",
          "answer":"Much of the material is undigested or unabsorbed food that never entered body cells.",
          "explanation":"Egestion concerns material remaining in the alimentary canal rather than metabolic wastes from cells."
        },
        {
          "prompt":"Why is urea an excretory product?",
          "answer":"It is formed in the liver from the breakdown of excess amino acids.",
          "explanation":"Because it is produced by metabolism inside the body, its removal is excretion."
        },
        {
          "prompt":"Bile pigments leave the body in faeces. Why are they still described as excretory products?",
          "answer":"They originate from the breakdown of substances inside the body, including haemoglobin from old red blood cells.",
          "explanation":"Classification depends on the origin of the material, not only the route by which it leaves."
        }
      ],
      "summary":"To distinguish excretion from egestion, trace the material back to its origin. Metabolic waste from inside the body is excreted. Undigested or unabsorbed food that stayed in the alimentary canal is egested."
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
  || '{"topicsBuilt":21,"objectivesBuilt":21}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
