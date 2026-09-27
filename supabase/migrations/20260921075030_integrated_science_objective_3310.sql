begin;

-- CSEC Integrated Science objective 3.3.10
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm3-t3-10-diving-effects',
  'module-3-environment',
  '3.3.10 Effects of Diving on the Human Body',
  'Explain how pressure changes during diving affect dissolved gases, ears, lungs, the nervous system and decompression safety.',
  777,
  true,
  '{
    "syllabus":{"module":3,"topic":"Water and the Aquatic Environment","objective":"3.3.10","source":"CXC 23/G/SYLL 23, amended 2026"},
    "lesson":{
      "objectives":[
        "Explain why pressure increases with depth.",
        "Explain decompression sickness using dissolved nitrogen and pressure reduction.",
        "Explain why divers ascend in a controlled way and may make decompression or safety stops.",
        "Explain the use of hyperbaric treatment for decompression illness.",
        "Explain ear barotrauma and pressure equalisation.",
        "Explain why scuba divers must not hold their breath while ascending.",
        "Define arterial gas embolism.",
        "Explain nitrogen narcosis.",
        "Explain breath-hold blackout risk.",
        "Explain why flying too soon after diving increases decompression stress.",
        "Explain why weight belts are used."
      ],
      "introduction":"Diving exposes the body to higher pressure. Changes in pressure affect gas spaces in the ears and lungs and the amount of inert gas dissolved in tissues, so safe diving requires controlled ascent and appropriate decompression planning.",
      "sections":[
        {"title":"Pressure and depth","paragraphs":[
          "Water pressure increases with depth because the diver supports the weight of more water above.",
          "A useful CSEC approximation is that seawater adds about one atmosphere of pressure for every 10 m of depth."
        ]},
        {"title":"Decompression sickness","paragraphs":[
          "At greater pressure, more inert gas such as nitrogen dissolves in body tissues.",
          "If pressure is reduced too quickly after sufficient gas loading, nitrogen can form bubbles in tissues and blood.",
          "These bubbles can produce decompression sickness, commonly called the bends."
        ]},
        {"title":"Controlled ascent","paragraphs":[
          "A controlled ascent allows dissolved inert gas to leave the body more gradually.",
          "Divers follow recognised dive tables or dive computers and any required stops for the actual depth, time and breathing gas used.",
          "There is no single decompression-stop rule that applies safely to every dive."
        ]},
        {"title":"Hyperbaric treatment","paragraphs":[
          "Serious decompression illness is a medical emergency.",
          "Treatment commonly includes high-concentration oxygen and recompression in a hyperbaric chamber, followed by controlled pressure reduction."
        ]},
        {"title":"Ear barotrauma","paragraphs":[
          "As a diver descends, pressure outside the eardrum rises.",
          "If middle-ear pressure is not equalised, the pressure difference can cause pain and tissue injury called barotrauma."
        ]},
        {"title":"Breath-holding on ascent","paragraphs":[
          "As a scuba diver ascends, ambient pressure falls and gas in the lungs expands.",
          "Holding the breath can allow expanding gas to damage lung tissue and may contribute to arterial gas embolism.",
          "Divers are trained to breathe normally during ascent."
        ]},
        {"title":"Arterial gas embolism","paragraphs":[
          "An arterial gas embolism occurs when gas bubbles enter the arterial circulation and obstruct blood flow.",
          "It is a serious emergency that can affect the brain and other organs."
        ]},
        {"title":"Nitrogen narcosis","paragraphs":[
          "At greater depth, increased nitrogen partial pressure can impair judgement, coordination and thinking.",
          "The effect may resemble intoxication and is called nitrogen narcosis."
        ]},
        {"title":"Breath-hold blackout","paragraphs":[
          "Free-divers can lose consciousness if blood oxygen falls too low.",
          "This can occur near the surface during ascent and is dangerous because unconsciousness in water can lead to drowning."
        ]},
        {"title":"Weight belts","paragraphs":[
          "Divers may use weights to offset buoyancy from the body, exposure suit and equipment.",
          "Correct weighting helps the diver descend and maintain controlled neutral buoyancy."
        ]},
        {"title":"Flying after diving","paragraphs":[
          "Aircraft cabin pressure is lower than sea-level atmospheric pressure.",
          "Flying or travelling to altitude too soon after diving can therefore add decompression stress and increase decompression-sickness risk.",
          "Recommended waiting intervals vary with the dive profile, so divers should follow current recognised dive-safety and training guidance."
        ]}
      ],
      "interactiveModels":[{"id":"m3-t3-10-diving-effects","type":"diving-effects","title":"Diving pressure and human-body effects explorer"}],
      "keyPoints":[
        "Pressure increases with depth.",
        "Nitrogen can form bubbles if pressure falls too quickly after gas loading.",
        "Controlled ascent reduces decompression stress.",
        "Hyperbaric oxygen is used to treat serious decompression illness.",
        "Unequal ear pressure causes barotrauma.",
        "Scuba divers must not hold their breath during ascent.",
        "Arterial gas embolism is a gas bubble blocking arterial blood flow.",
        "Nitrogen narcosis can impair judgement at depth.",
        "Breath-hold divers can black out from low oxygen.",
        "Flying too soon after diving increases decompression stress."
      ],
      "workedExample":{
        "title":"Why ascent must be controlled",
        "prompt":"Explain why a scuba diver should not rush directly to the surface after a dive with significant nitrogen uptake.",
        "steps":[
          "Higher pressure at depth allows more nitrogen to dissolve in tissues.",
          "As the diver ascends, ambient pressure decreases.",
          "A rapid decrease can allow dissolved nitrogen to form bubbles.",
          "A controlled ascent allows gas to leave tissues more gradually."
        ],
        "answer":"The diver ascends in a controlled way to reduce the chance of nitrogen bubbles forming and causing decompression sickness."
      },
      "checks":[
        {"prompt":"What causes decompression sickness?","answer":"Inert-gas bubbles, usually nitrogen, forming in tissues or blood during excessive pressure reduction.","explanation":"Greater pressure at depth increases gas uptake."},
        {"prompt":"Why can a diver feel ear pain while descending?","answer":"Pressure outside the eardrum becomes greater than middle-ear pressure if the ear is not equalised.","explanation":"The pressure difference can cause barotrauma."},
        {"prompt":"Why must a scuba diver not hold their breath while ascending?","answer":"Gas in the lungs expands as pressure falls and can injure the lungs.","explanation":"Lung overexpansion can also contribute to arterial gas embolism."},
        {"prompt":"Why can flying soon after diving be risky?","answer":"Lower cabin pressure adds further decompression stress.","explanation":"The additional pressure reduction can increase decompression-sickness risk."}
      ],
      "summary":"Diving safety depends on understanding pressure, breathing normally, equalising air spaces and controlling decompression according to the actual dive profile."
    }
  }'::jsonb
)
on conflict (subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects
set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now()
where id='integrated-science';

commit;
