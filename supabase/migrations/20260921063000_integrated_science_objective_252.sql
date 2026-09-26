begin;

-- CSEC Integrated Science objective 2.5.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t5-2-thermostats',
  'module-2-energy',
  '2.5.2 Thermostats in Household Appliances',
  'Explain the use of thermostats and bimetallic strips in controlling the temperature of irons, refrigerators, ovens, water heaters and air conditioners.',
  670,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Temperature Control and Ventilation",
      "objective":"2.5.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Define a thermostat as an automatic temperature-control device.",
        "Explain how a bimetallic strip works.",
        "Explain thermostat action in an electric iron.",
        "Explain how a higher iron setting changes the switch-off temperature.",
        "Explain thermostat use in refrigerators, electric water heaters and air conditioners.",
        "Describe temperature control in a gas oven.",
        "Explain how thermostat cycling saves energy."
      ],
      "introduction":"A thermostat keeps temperature near a selected value by sensing temperature and controlling heating, cooling or fuel flow. A thermostat is therefore a control device, not simply a thermometer.",
      "sections":[
        {
          "title":"What a thermostat does",
          "paragraphs":[
            "A thermostat automatically controls an appliance so temperature stays close to a selected set value.",
            "It senses temperature and turns heating or cooling on or off, or regulates fuel flow."
          ]
        },
        {
          "title":"Bimetallic strips",
          "paragraphs":[
            "A bimetallic strip consists of two different metals joined together.",
            "The metals are chosen because they expand by different amounts when heated.",
            "In the common brass-and-iron example, brass expands more than iron, so the joined strip bends when temperature rises."
          ]
        },
        {
          "title":"Electric iron",
          "paragraphs":[
            "When an electric iron is below the selected temperature, the thermostat contacts are closed and current flows through the heating element.",
            "As the iron heats, the bimetallic strip bends. When the selected temperature is reached, the strip moves away from the contact and breaks the circuit.",
            "As the iron cools, the strip returns towards its original shape and closes the contact, switching the heater on again."
          ]
        },
        {
          "title":"Changing the iron setting",
          "paragraphs":[
            "Turning the control knob to a higher setting changes the contact position.",
            "The strip must then bend farther before the contact opens, so the iron reaches a higher temperature before switching off."
          ]
        },
        {
          "title":"Refrigerators and air conditioners",
          "paragraphs":[
            "In a refrigerator, the thermostat switches the compressor on when the inside temperature rises above the control range and switches cooling off after the cabinet becomes cold enough.",
            "In an air conditioner, the thermostat senses room temperature and cycles cooling to maintain the selected set point."
          ]
        },
        {
          "title":"Water heaters and ovens",
          "paragraphs":[
            "An electric water heater uses a thermostat to switch its heating element on and off so stored water remains near the selected temperature.",
            "In gas ovens, a temperature-sensing mechanism regulates or cycles gas flow to the burner. Traditional systems may use expansion of a fluid in a sensing bulb and capillary system, while modern ovens may use electronic sensors and valves."
          ]
        },
        {
          "title":"Energy conservation",
          "paragraphs":[
            "A thermostat saves energy because the heater, compressor or burner does not operate continuously once the selected temperature has been reached.",
            "The control cycles energy input only when temperature moves away from the desired range."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t5-2-thermostats",
          "type":"thermostat-control",
          "title":"Thermostat and bimetallic-strip explorer"
        }
      ],
      "keyPoints":[
        "A thermostat maintains temperature near a set value.",
        "A bimetallic strip contains two different metals joined together.",
        "Unequal thermal expansion makes the strip bend.",
        "Brass expands more than iron in the bank example.",
        "When an iron reaches its set temperature, the thermostat breaks the heater circuit.",
        "A higher iron setting requires more bending before switch-off.",
        "Refrigerator and air-conditioner thermostats control compressor operation.",
        "Thermostat cycling avoids continuous energy use."
      ],
      "workedExample":{
        "title":"Explaining an iron thermostat",
        "prompt":"Explain why an electric iron switches off automatically after reaching the selected temperature.",
        "steps":[
          "Current heats the soleplate while the thermostat contacts are closed.",
          "The two metals in the bimetallic strip expand by different amounts.",
          "The strip bends as temperature rises.",
          "At the selected temperature the strip moves away from the contact.",
          "The circuit opens and current stops flowing through the heater."
        ],
        "answer":"Unequal expansion bends the bimetallic strip until it opens the contact and switches off the heating element."
      },
      "checks":[
        {
          "prompt":"What is a thermostat?",
          "answer":"A device that automatically controls temperature near a selected value.",
          "explanation":"It switches or regulates heating or cooling in response to temperature."
        },
        {
          "prompt":"Why does a bimetallic strip bend when heated?",
          "answer":"Its two joined metals expand by different amounts.",
          "explanation":"The unequal expansion forces the strip to curve."
        },
        {
          "prompt":"What happens in an electric iron when the selected temperature is reached?",
          "answer":"The bimetallic strip bends enough to open the contact and break the heater circuit.",
          "explanation":"The heating element then switches off."
        },
        {
          "prompt":"When does a refrigerator compressor switch on?",
          "answer":"When the inside temperature rises above the thermostat control range.",
          "explanation":"The compressor then removes heat until the cabinet is cold enough."
        },
        {
          "prompt":"How does a thermostat save energy?",
          "answer":"It switches heating or cooling off when the required temperature has been reached instead of running continuously.",
          "explanation":"Energy input is cycled only as needed."
        }
      ],
      "summary":"Thermostats use temperature feedback to control energy input. Mechanical bimetallic thermostats rely on unequal expansion, while many modern appliances use electronic sensors to perform the same control function."
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
  || '{"topicsBuilt":67,"objectivesBuilt":67}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
