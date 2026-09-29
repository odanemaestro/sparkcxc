begin;

-- CSEC Integrated Science objective 2.4.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-3-electricity-consumption',
  'module-2-energy',
  '2.4.3 Electricity Consumption',
  'Calculate electrical energy consumption and cost using appliance power, operating time, meter readings and electricity-bill information.',
  580,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define the kilowatt-hour as a unit of electrical energy.",
        "Use electrical energy = power × time.",
        "Convert watts to kilowatts before calculating energy in kWh.",
        "Calculate monthly appliance energy use.",
        "Calculate energy consumption from electricity-meter readings.",
        "Relate 1 kWh to 3.6 MJ.",
        "Calculate a simple electricity bill from fixed and usage charges.",
        "Interpret current Jamaican bill components without assuming a fixed monthly fuel rate."
      ],
      "introduction":"Electricity bills are based mainly on the electrical energy used. Appliance power tells how quickly electrical energy is transferred, while operating time determines how long that transfer continues. Electricity meters record energy in kilowatt-hours.",
      "sections":[
        {
          "title":"The kilowatt-hour",
          "paragraphs":[
            "One kilowatt-hour, kWh, is the electrical energy used when a 1 kW appliance operates for 1 hour.",
            "Electrical energy in kWh is calculated using energy = power in kW × time in hours.",
            "One kilowatt-hour is equal to 3.6 megajoules, MJ."
          ]
        },
        {
          "title":"Appliance energy use",
          "paragraphs":[
            "A 2 kW heater used for 3 hours consumes 2 × 3 = 6 kWh.",
            "If power is given in watts, divide by 1000 before multiplying by hours. For example, 1500 W = 1.5 kW."
          ]
        },
        {
          "title":"Monthly consumption",
          "paragraphs":[
            "A 1500 W appliance used for 2 hours each day for 30 days consumes 1.5 × 2 × 30 = 90 kWh.",
            "Both power rating and operating time affect total consumption. A lower-power device used for a long time can still use substantial energy."
          ]
        },
        {
          "title":"Reading an electricity meter",
          "paragraphs":[
            "Energy used during a billing period is found by subtracting the previous meter reading from the current meter reading.",
            "For example, if the current reading is 12 780 kWh and the previous reading was 12 450 kWh, the consumption is 330 kWh."
          ]
        },
        {
          "title":"Calculating a simple bill",
          "paragraphs":[
            "CSEC questions may provide a fixed charge and a rate per kilowatt-hour. Multiply the units used by the stated rate, then add the fixed charge.",
            "For example, a fixed charge of 1650 plus 25 kWh at 18 per kWh gives 1650 + 25 × 18 = 2100."
          ]
        },
        {
          "title":"Current Jamaican bill context",
          "paragraphs":[
            "Jamaica Public Service bills electricity consumption in kilowatt-hours and currently identifies components including Energy, Fuel, IPP and Customer charges, together with applicable adjustments and taxes.",
            "The Fuel Charge changes from month to month because fuel costs change. For a real bill, use the rates printed on that billing statement rather than memorising a temporary rate.",
            "Reducing kWh use lowers the consumption-based portions of a bill."
          ]
        },
        {
          "title":"Using electricity efficiently",
          "paragraphs":[
            "Efficient appliances provide the required service with less electrical energy.",
            "Lighting, air conditioning, water heating and refrigeration can account for substantial household consumption, so power rating, efficiency and operating time all matter."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-3-electricity-consumption",
          "type":"electricity-consumption",
          "title":"Electricity consumption and bill calculator"
        }
      ],
      "keyPoints":[
        "Energy in kWh = power in kW × time in hours.",
        "1000 W = 1 kW.",
        "1 kWh = 3.6 MJ.",
        "A 2 kW heater used for 3 h consumes 6 kWh.",
        "A 1500 W appliance used for 2 h per day for 30 days consumes 90 kWh.",
        "Meter consumption = current reading - previous reading.",
        "Use the tariff supplied in the question or printed on the bill.",
        "Fuel-related electricity charges can vary from month to month."
      ],
      "workedExample":{
        "title":"Calculating monthly appliance energy",
        "prompt":"A 1500 W heater is used for 2 hours each day for 30 days. Calculate its electrical energy consumption.",
        "steps":[
          "Convert 1500 W to kilowatts: 1500 ÷ 1000 = 1.5 kW.",
          "Daily energy = 1.5 × 2 = 3 kWh.",
          "Monthly energy = 3 × 30 = 90 kWh."
        ],
        "answer":"The heater consumes 90 kWh in 30 days."
      },
      "checks":[
        {
          "prompt":"What is one kilowatt-hour?",
          "answer":"The energy used by a 1 kW appliance operating for 1 hour.",
          "explanation":"It is a unit of energy, not power."
        },
        {
          "prompt":"How much energy does a 2 kW heater use in 3 hours?",
          "answer":"6 kWh.",
          "explanation":"Energy = 2 × 3 = 6 kWh."
        },
        {
          "prompt":"How many megajoules are in 1 kWh?",
          "answer":"3.6 MJ.",
          "explanation":"1 kW = 1000 J/s and 1 hour = 3600 s, giving 3.6 million joules."
        },
        {
          "prompt":"A meter changes from 12 450 kWh to 12 780 kWh. How much energy was used?",
          "answer":"330 kWh.",
          "explanation":"12 780 - 12 450 = 330."
        },
        {
          "prompt":"Why should a learner not memorise one JPS Fuel Charge rate?",
          "answer":"The Fuel Charge changes from month to month.",
          "explanation":"Use the value printed on the current bill or provided in the question."
        }
      ],
      "summary":"To calculate electricity consumption, convert power to kilowatts and multiply by hours of use. For bills, use meter readings and the rates supplied for the billing period."
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
  || '{"topicsBuilt":58,"objectivesBuilt":58}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
