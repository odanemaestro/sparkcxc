begin;

-- CSEC Integrated Science objective 2.3.1
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t3-1-fossil-fuels',
  'module-2-energy',
  '2.3.1 Fossil Fuels',
  'Assess fossil fuels as energy sources, including their formation, products, power-generation conversions, advantages, exhaustibility and environmental effects.',
  540,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Fossil Fuels",
      "objective":"2.3.1",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify coal, petroleum and natural gas as fossil fuels.",
        "Explain why fossil fuels are non-renewable.",
        "Relate fossil fuels to ancient organic material transformed over geological time.",
        "Identify common products obtained from crude oil.",
        "Trace energy conversion in a fuel-fired power station.",
        "Evaluate selected advantages and disadvantages of fossil-fuel use.",
        "Explain how carbon dioxide contributes to climate warming.",
        "Explain how sulfur dioxide and nitrogen oxides contribute to acid deposition.",
        "Relate fossil-fuel use to Caribbean examples including Trinidad and Tobago."
      ],
      "introduction":"Coal, petroleum and natural gas are fossil fuels formed from ancient organic material over geological timescales. Their concentrated chemical energy and established infrastructure made them major energy sources, but they are exhaustible and their extraction and combustion create important environmental costs.",
      "sections":[
        {
          "title":"Formation of fossil fuels",
          "paragraphs":[
            "Fossil fuels formed when organic material from ancient organisms was buried by sediments and altered by heat and pressure over millions of years.",
            "Coal formed mainly from ancient plant material. Petroleum and natural gas formed largely from buried organic matter associated with ancient aquatic environments.",
            "Because formation takes millions of years while humans consume the fuels rapidly, fossil fuels are non-renewable on human timescales."
          ]
        },
        {
          "title":"Coal, petroleum and natural gas",
          "paragraphs":[
            "Coal is a solid fossil fuel. Crude oil, also called petroleum, is a mixture that is separated and processed into useful products.",
            "Petroleum products include gasoline, kerosene, diesel and fuel oil. Natural gas consists mainly of methane."
          ]
        },
        {
          "title":"Power generation from fuel oil",
          "paragraphs":[
            "In a conventional thermal power station, the chemical energy of fuel is released by combustion as heat.",
            "Heat produces high-pressure steam, whose kinetic energy turns a turbine. The turbine drives a generator, producing electrical energy.",
            "The main sequence is chemical → heat → kinetic → electrical energy."
          ]
        },
        {
          "title":"Advantages and limitations",
          "paragraphs":[
            "Fossil fuels have high energy density and can be stored and transported. Existing power, transport and industrial systems also make them convenient and dispatchable.",
            "Their disadvantages include limited reserves, carbon dioxide emissions, air pollutants, environmental damage from extraction and transport, and dependence on fuel markets."
          ]
        },
        {
          "title":"Greenhouse effect and climate warming",
          "paragraphs":[
            "Carbon dioxide is a greenhouse gas. It absorbs some outgoing infrared radiation and slows the loss of heat to space.",
            "The natural greenhouse effect keeps Earth warm enough for life, but human activities including fossil-fuel combustion have increased greenhouse-gas concentrations and strengthened warming.",
            "Small islands are vulnerable to effects including sea-level rise, coastal flooding and heat stress on coral reefs."
          ]
        },
        {
          "title":"Acid deposition",
          "paragraphs":[
            "Burning sulfur-containing fuels can release sulfur dioxide, while high-temperature combustion can produce nitrogen oxides.",
            "Sulfur dioxide and nitrogen oxides react in the atmosphere to form acidic compounds. These can return to Earth in rain, fog, particles or dry deposition and can damage sensitive lakes, soils, vegetation and materials."
          ]
        },
        {
          "title":"Other pollutants",
          "paragraphs":[
            "Fossil-fuel combustion can also release fine particles and other harmful pollutants.",
            "Older vehicles that used leaded gasoline released lead compounds. Lead is toxic to the nervous system, especially during childhood. This is a historical pollution example because modern road gasoline in many countries is unleaded."
          ]
        },
        {
          "title":"Caribbean context",
          "paragraphs":[
            "Trinidad and Tobago has had an oil and natural-gas industry for more than a century and remains the largest oil and natural-gas producer in the Caribbean according to its Ministry of Energy and Energy Industries.",
            "The regional example shows both the economic importance of hydrocarbon resources and the need to consider long-term environmental and energy-security costs."
          ]
        },
        {
          "title":"Methane beyond natural gas",
          "paragraphs":[
            "Methane is the main component of natural gas and is also a greenhouse gas.",
            "Human-related methane emissions also arise from sources such as landfills and ruminant livestock. These sources should not be confused with fossil-fuel combustion, although fossil-fuel production and distribution can also release methane."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t3-1-fossil-fuels",
          "type":"fossil-fuels",
          "title":"Fossil-fuel formation, use and impact explorer"
        }
      ],
      "keyPoints":[
        "Coal, petroleum and natural gas are fossil fuels.",
        "Fossil fuels form over millions of years and are non-renewable on human timescales.",
        "Kerosene, gasoline, diesel and fuel oil are petroleum products.",
        "Natural gas consists mainly of methane.",
        "Fuel-fired electricity generation follows chemical → heat → kinetic → electrical energy.",
        "Fossil fuels are energy-dense and easy to store and transport, but they are exhaustible.",
        "Carbon dioxide from fossil-fuel combustion strengthens climate warming.",
        "Sulfur dioxide and nitrogen oxides contribute to acid deposition.",
        "Trinidad and Tobago has a major oil and natural-gas industry."
      ],
      "workedExample":{
        "title":"Tracing energy in a fuel-oil power station",
        "prompt":"State the main energy changes from fuel oil to electricity in a thermal power station.",
        "steps":[
          "Fuel oil stores chemical energy.",
          "Combustion converts chemical energy mainly to heat.",
          "Heat produces moving steam, giving the steam kinetic energy.",
          "The moving steam turns a turbine.",
          "The generator converts mechanical rotation into electrical energy."
        ],
        "answer":"Chemical energy → heat energy → kinetic energy → electrical energy."
      },
      "checks":[
        {
          "prompt":"Why are fossil fuels described as non-renewable?",
          "answer":"They take millions of years to form and are used much faster than they are naturally replaced.",
          "explanation":"Their natural replacement rate is negligible on a human timescale."
        },
        {
          "prompt":"Name two products obtained from petroleum.",
          "answer":"Examples include kerosene, gasoline, diesel and fuel oil.",
          "explanation":"Crude oil is separated and processed into useful fractions and products."
        },
        {
          "prompt":"Which gases are most directly associated with acid deposition from fossil-fuel combustion?",
          "answer":"Sulfur dioxide and nitrogen oxides.",
          "explanation":"They form sulfuric and nitric acidic compounds in the atmosphere."
        },
        {
          "prompt":"How does increased carbon dioxide strengthen the greenhouse effect?",
          "answer":"Carbon dioxide absorbs outgoing infrared radiation and reduces the rate at which heat escapes to space.",
          "explanation":"This changes Earth''s energy balance and contributes to warming."
        },
        {
          "prompt":"What is the main component of natural gas?",
          "answer":"Methane.",
          "explanation":"Natural gas is a mixture, but methane is the dominant component."
        }
      ],
      "summary":"Fossil fuels provide concentrated chemical energy but form too slowly to replace present consumption. Evaluate them by considering both their useful energy properties and their climate, pollution and resource costs."
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
  || '{"topicsBuilt":54,"objectivesBuilt":54}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
