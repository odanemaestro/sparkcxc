begin;

-- CSEC Integrated Science objective 2.1.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t1-3-photosynthesis-energy',
  'module-2-energy',
  '2.1.3 Photosynthesis and Energy Conversion',
  'Examine photosynthesis as a light-to-chemical energy conversion, including equations, chlorophyll, starch testing, experimental evidence and limiting factors.',
  440,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Conservation of Energy",
      "objective":"2.1.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "State the word and balanced chemical equations for photosynthesis.",
        "Explain that light energy is converted to chemical energy stored in glucose.",
        "Identify carbon dioxide and water as raw materials, and oxygen and glucose as products.",
        "Explain the role of chlorophyll in absorbing light energy.",
        "Carry out and interpret the starch test safely.",
        "Interpret variegated-leaf, covered-leaf and pondweed evidence for photosynthesis.",
        "Explain why glucose is converted to starch for storage.",
        "Interpret a simple graph showing a limiting factor."
      ],
      "introduction":"Photosynthesis captures light energy and stores it as chemical energy in glucose. The process takes place mainly in green leaves because chloroplasts contain chlorophyll, the pigment that absorbs light.",
      "sections":[
        {
          "title":"The photosynthesis equations",
          "paragraphs":[
            "The word equation is carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll.",
            "The balanced chemical equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂."
          ]
        },
        {
          "title":"Energy conversion",
          "paragraphs":[
            "During photosynthesis, light energy is converted to chemical energy stored in glucose.",
            "Plants can use glucose in respiration, convert it to cellulose, combine it with nitrates to make amino acids and proteins, or convert it to starch for storage."
          ]
        },
        {
          "title":"Why plants store starch",
          "paragraphs":[
            "Starch is insoluble. This allows plants to store large amounts without strongly affecting osmosis in the cells.",
            "The presence of starch in a leaf after suitable controls provides evidence that photosynthesis has occurred."
          ]
        },
        {
          "title":"Testing a leaf for starch",
          "paragraphs":[
            "A plant is often destarched before an investigation by keeping it in darkness long enough for stored starch in the leaves to be used.",
            "After the treatment, the leaf is boiled in water, then heated in ethanol using a water bath to remove chlorophyll. Ethanol is flammable and must not be heated directly over a flame.",
            "The leaf is rinsed and iodine solution is added. A blue-black colour shows starch is present, while iodine remains brown or yellow-brown when starch is absent."
          ]
        },
        {
          "title":"Evidence for chlorophyll and light",
          "paragraphs":[
            "In a variegated leaf, only the green regions contain chlorophyll. If only the green regions turn blue-black after iodine testing, the result supports the conclusion that chlorophyll is required for photosynthesis.",
            "If part of a destarched leaf is covered from light, then only the uncovered region later forms starch. This provides evidence that light is required."
          ]
        },
        {
          "title":"Evidence for oxygen production",
          "paragraphs":[
            "Illuminated pondweed produces bubbles of gas. If the collected gas relights a glowing splint, the gas is oxygen.",
            "Oxygen is therefore a product of photosynthesis, not a raw material required for the process."
          ]
        },
        {
          "title":"Limiting factors",
          "paragraphs":[
            "Increasing light intensity can increase the rate of photosynthesis while light is limiting.",
            "When the rate stops increasing even though light intensity continues to rise, another factor such as carbon dioxide concentration or temperature is limiting the rate."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t1-3-photosynthesis-energy",
          "type":"photosynthesis-energy",
          "title":"Photosynthesis energy and investigation explorer"
        }
      ],
      "keyPoints":[
        "Photosynthesis converts light energy to chemical energy.",
        "Carbon dioxide and water are raw materials.",
        "Glucose and oxygen are products.",
        "Chlorophyll absorbs light energy.",
        "Iodine turns blue-black when starch is present.",
        "Ethanol removes chlorophyll and must be heated in a water bath because it is flammable.",
        "Destarching removes stored starch before a controlled investigation.",
        "A plateau in a rate graph shows that another factor has become limiting."
      ],
      "workedExample":{
        "title":"Interpreting a variegated leaf starch test",
        "prompt":"A variegated leaf has green and white regions. After exposure to light, only the green regions turn blue-black with iodine. Explain the result.",
        "steps":[
          "The green regions contain chlorophyll.",
          "The white regions lack chlorophyll.",
          "Only the green regions make starch in the light.",
          "The blue-black iodine result therefore shows that chlorophyll is needed for photosynthesis."
        ],
        "answer":"Only the green regions photosynthesised and produced starch because only those regions contained chlorophyll."
      },
      "checks":[
        {
          "prompt":"State the word equation for photosynthesis.",
          "answer":"Carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll.",
          "explanation":"Carbon dioxide and water are raw materials, while glucose and oxygen are products."
        },
        {
          "prompt":"What energy conversion takes place during photosynthesis?",
          "answer":"Light energy is converted to chemical energy.",
          "explanation":"The chemical energy becomes stored in glucose."
        },
        {
          "prompt":"Why is ethanol heated in a water bath during the starch test?",
          "answer":"Ethanol is flammable.",
          "explanation":"A direct flame could ignite the ethanol or its vapour."
        },
        {
          "prompt":"What gas from pondweed relights a glowing splint?",
          "answer":"Oxygen.",
          "explanation":"Oxygen is produced during photosynthesis."
        },
        {
          "prompt":"Why does a photosynthesis rate graph level off at high light intensity?",
          "answer":"Another factor such as carbon dioxide concentration or temperature has become limiting.",
          "explanation":"Increasing light further cannot raise the rate when another required factor is in short supply or outside its optimum range."
        }
      ],
      "summary":"Photosynthesis is an energy-conversion process. Light energy absorbed by chlorophyll becomes chemical energy in glucose. Controlled starch tests and gas tests provide evidence for the requirements and products of the process."
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
  || '{"topicsBuilt":44,"objectivesBuilt":44}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
