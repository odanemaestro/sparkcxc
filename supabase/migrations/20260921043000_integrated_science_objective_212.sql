begin;

-- CSEC Integrated Science objective 2.1.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t1-2-energy-conversion-conservation',
  'module-2-energy',
  '2.1.2 Energy Conversion and Conservation',
  'Discuss energy inter-conversion and the conservation of mass-energy using common devices, efficiency, nuclear processes and vehicle-energy examples.',
  430,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Conservation of Energy",
      "objective":"2.1.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "State the law of conservation of energy.",
        "Trace energy conversions in an electric fan, torch, hydroelectric station, loudspeaker, braking car and internal-combustion engine.",
        "Calculate wasted energy and percentage efficiency from simple input-output data.",
        "Distinguish nuclear fusion from nuclear fission.",
        "Explain how selected driving practices affect fuel use.",
        "Describe selected harmful vehicle emissions and ways their effects can be reduced."
      ],
      "introduction":"Energy is not used up or destroyed when a device operates. It is transferred and converted from one form to another. Some output is useful and some is transferred to the surroundings, usually as heat or sound.",
      "sections":[
        {
          "title":"The law of conservation of energy",
          "paragraphs":[
            "Energy can neither be created nor destroyed, but it can be converted from one form to another or transferred between a system and its surroundings.",
            "When a useful output seems smaller than the input, the missing energy has not disappeared. It has been transferred in forms that are less useful for the intended purpose."
          ]
        },
        {
          "title":"Common energy conversions",
          "paragraphs":[
            "An electric fan converts electrical energy mainly to kinetic energy of the blades and moving air, with some heat and sound.",
            "A torch converts chemical energy in its cells to electrical energy, then mainly to light with some heat.",
            "In a hydroelectric station, water stored at a height has gravitational potential energy. As it falls this becomes kinetic energy, which turns turbines and generators to produce electrical energy.",
            "A loudspeaker converts electrical energy mainly to sound, while friction in car brakes converts kinetic energy mainly to heat."
          ]
        },
        {
          "title":"Efficiency",
          "paragraphs":[
            "Efficiency compares useful output energy with total input energy. Percentage efficiency = useful energy output ÷ total energy input × 100.",
            "If a lamp receives 100 J of electrical energy and gives 10 J of useful light, 90 J is transferred mainly as heat and the lamp is 10% efficient."
          ]
        },
        {
          "title":"Nuclear energy and mass-energy",
          "paragraphs":[
            "The Sun releases energy mainly by nuclear fusion, in which light nuclei combine to form heavier nuclei. A small change in mass is associated with a large energy release.",
            "In a nuclear power station, heavy nuclei such as uranium undergo fission, in which they split into smaller nuclei and release energy."
          ]
        },
        {
          "title":"Fuel use in vehicles",
          "paragraphs":[
            "The chemical energy stored in fuel is converted mainly to heat in the engine and partly to kinetic energy of the vehicle.",
            "Keeping tyres properly inflated reduces rolling resistance. Avoiding unnecessary idling, sharp acceleration and repeated heavy braking also reduces unnecessary fuel use."
          ]
        },
        {
          "title":"Vehicle emissions and environmental effects",
          "paragraphs":[
            "Internal-combustion engines release pollutants such as carbon monoxide, nitrogen oxides and unburnt hydrocarbons. Carbon monoxide is especially dangerous because it binds strongly to haemoglobin and reduces the blood''s ability to transport oxygen.",
            "Catalytic converters change selected harmful exhaust gases into less harmful products. Public transport and car-pooling reduce the number of vehicles needed to move the same number of people.",
            "Electric vehicles produce no tailpipe exhaust while driving. Their total environmental impact still depends on factors such as electricity generation and manufacturing."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t1-2-energy-conversion",
          "type":"energy-conversion",
          "title":"Energy conversion, efficiency and conservation explorer"
        }
      ],
      "keyPoints":[
        "Energy can neither be created nor destroyed.",
        "Devices convert energy from one form to another.",
        "Electrical energy becomes kinetic energy in an electric fan.",
        "A torch follows chemical to electrical to light energy.",
        "Hydroelectric generation follows gravitational potential to kinetic to electrical energy.",
        "Efficiency = useful output ÷ total input × 100%.",
        "Fusion joins light nuclei and fission splits heavy nuclei.",
        "Proper tyre pressure and smoother driving reduce unnecessary fuel use."
      ],
      "workedExample":{
        "title":"Calculating lamp efficiency",
        "prompt":"A lamp receives 100 J of electrical energy and produces 10 J of useful light. Calculate the energy transferred as heat and the percentage efficiency.",
        "steps":[
          "Input energy = 100 J.",
          "Useful light output = 10 J.",
          "Energy transferred as heat = 100 J - 10 J = 90 J.",
          "Efficiency = 10 ÷ 100 × 100 = 10%."
        ],
        "answer":"The lamp transfers 90 J mainly as heat and is 10% efficient."
      },
      "checks":[
        {
          "prompt":"State the law of conservation of energy.",
          "answer":"Energy can neither be created nor destroyed, but it can be converted from one form to another.",
          "explanation":"The total energy remains accounted for."
        },
        {
          "prompt":"State the main conversion in an electric fan.",
          "answer":"Electrical energy to kinetic energy.",
          "explanation":"Some energy is also transferred as heat and sound."
        },
        {
          "prompt":"What is the main energy sequence in a hydroelectric station?",
          "answer":"Gravitational potential energy to kinetic energy to electrical energy.",
          "explanation":"Falling water turns turbines connected to generators."
        },
        {
          "prompt":"How is fusion different from fission?",
          "answer":"Fusion joins light nuclei while fission splits heavy nuclei.",
          "explanation":"The Sun is powered mainly by fusion, while nuclear power stations use fission."
        },
        {
          "prompt":"Why does correct tyre pressure help reduce fuel consumption?",
          "answer":"It reduces rolling resistance.",
          "explanation":"Less fuel energy is then required to overcome resistance."
        }
      ],
      "summary":"Track every input and output. Energy never disappears, even when part of the output is less useful. Use conservation to account for wasted energy, and use efficiency to compare useful output with total input."
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
  || '{"topicsBuilt":43,"objectivesBuilt":43}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
