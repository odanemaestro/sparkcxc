begin;

-- CSEC Integrated Science objective 2.4.2
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t4-2-electric-circuits',
  'module-2-energy',
  '2.4.2 Electric Circuits and Current Flow',
  'Examine electric current in circuits using standard symbols, series and parallel connections, measuring instruments, resistance, electrical power and transformers.',
  570,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Electricity and Lighting",
      "objective":"2.4.2",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Recognise standard circuit symbols for a cell, lamp, resistor, fuse, switch, ammeter, voltmeter and transformer.",
        "State the units used for current, potential difference, resistance and power.",
        "Connect an ammeter in series and a voltmeter in parallel.",
        "Compare current and component behaviour in series and parallel circuits.",
        "Use V = IR to calculate voltage, current or resistance.",
        "Use P = IV to calculate electrical power.",
        "Add resistances in series and add branch currents in parallel.",
        "Explain the purpose of a transformer in an alternating-current system."
      ],
      "introduction":"Electric current flows when there is a complete conducting path and a source of potential difference. Circuit diagrams use standard symbols to show how components are connected. The arrangement of components determines how current and voltage behave.",
      "sections":[
        {
          "title":"Circuit symbols",
          "paragraphs":[
            "A cell is shown by one long line and one shorter line. A lamp is shown as a circle containing a cross, while a resistor is represented by a rectangle.",
            "A fuse is shown as a small rectangle with a line through it. An open switch shows a break in the circuit.",
            "An ammeter is a circle containing A, while a voltmeter is a circle containing V.",
            "A transformer is represented by two coils separated by an iron core."
          ]
        },
        {
          "title":"Current, voltage, resistance and power",
          "paragraphs":[
            "Electric current is measured in amperes, A. Potential difference is measured in volts, V. Resistance is measured in ohms, Ω. Power is measured in watts, W.",
            "One watt is one joule of energy transferred per second."
          ]
        },
        {
          "title":"Using meters correctly",
          "paragraphs":[
            "An ammeter measures current and must be connected in series with the component or path being measured so the same current flows through the meter.",
            "A voltmeter measures potential difference and must be connected in parallel across the component."
          ]
        },
        {
          "title":"Series circuits",
          "paragraphs":[
            "A series circuit has one path for current. The current is therefore the same at every point in the series path.",
            "Series resistances add. For example, 2 Ω and 4 Ω in series give a total resistance of 6 Ω.",
            "Adding another lamp in series increases total resistance and usually reduces current, making the lamps dimmer.",
            "If one component breaks the only path, current stops throughout the circuit."
          ]
        },
        {
          "title":"Parallel circuits",
          "paragraphs":[
            "A parallel circuit has two or more branches. Each branch is connected across the supply.",
            "At a junction, the total current entering equals the total current leaving. A main current of 0.5 A could therefore divide into branch currents of 0.3 A and 0.2 A.",
            "If one lamp fails in one branch, another lamp on a separate complete branch can remain lit.",
            "Household lamps are connected in parallel so each appliance receives the supply voltage and can be switched independently."
          ]
        },
        {
          "title":"Ohm''s law calculations",
          "paragraphs":[
            "For an ohmic resistor under constant physical conditions, potential difference, current and resistance are related by V = IR.",
            "If 2 A flows through a 6 Ω resistor, V = 2 × 6 = 12 V.",
            "If a lamp draws 0.5 A from 6 V, R = V ÷ I = 6 ÷ 0.5 = 12 Ω."
          ]
        },
        {
          "title":"Electrical power",
          "paragraphs":[
            "Electrical power is the rate of energy transfer. It can be calculated using P = IV.",
            "A kettle connected to 240 V and drawing 10 A has a power of 2 400 W.",
            "A 60 W lamp on a 120 V supply draws I = P ÷ V = 60 ÷ 120 = 0.5 A."
          ]
        },
        {
          "title":"Transformers",
          "paragraphs":[
            "A transformer changes the voltage of an alternating-current supply.",
            "Transformers can step voltage up or down. They do not store electricity and are not current-measuring instruments."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t4-2-electric-circuits",
          "type":"electric-circuit-flow",
          "title":"Electric circuits, meters and calculations explorer"
        }
      ],
      "keyPoints":[
        "Current is measured in amperes using an ammeter in series.",
        "Potential difference is measured in volts using a voltmeter in parallel.",
        "Resistance is measured in ohms.",
        "Power is measured in watts.",
        "Current is the same throughout a series circuit.",
        "Series resistances add.",
        "In parallel, main current equals the sum of branch currents.",
        "Parallel branches operate independently.",
        "V = IR.",
        "P = IV.",
        "A transformer changes a.c. voltage."
      ],
      "workedExample":{
        "title":"Solving a series circuit",
        "prompt":"Two resistors, 2 Ω and 4 Ω, are connected in series to a 12 V supply. Calculate the total resistance, circuit current and voltage across the 4 Ω resistor.",
        "steps":[
          "Total resistance = 2 + 4 = 6 Ω.",
          "Use I = V ÷ R = 12 ÷ 6 = 2 A.",
          "The same 2 A flows through each series resistor.",
          "Voltage across the 4 Ω resistor = IR = 2 × 4 = 8 V."
        ],
        "answer":"Total resistance = 6 Ω, current = 2 A and voltage across the 4 Ω resistor = 8 V."
      },
      "checks":[
        {
          "prompt":"Where must an ammeter be connected?",
          "answer":"In series with the component or path being measured.",
          "explanation":"The circuit current must pass through the ammeter."
        },
        {
          "prompt":"Where must a voltmeter be connected?",
          "answer":"In parallel across the component.",
          "explanation":"It measures the potential difference between two points."
        },
        {
          "prompt":"What happens if one lamp breaks in a simple series circuit?",
          "answer":"Current stops throughout the circuit and the other lamp goes out.",
          "explanation":"There is only one conducting path."
        },
        {
          "prompt":"A 1 200 W iron is connected to 120 V. What current does it draw?",
          "answer":"10 A.",
          "explanation":"I = P ÷ V = 1 200 ÷ 120 = 10 A."
        },
        {
          "prompt":"What is the purpose of a transformer?",
          "answer":"To change the voltage of an alternating-current supply.",
          "explanation":"A transformer can step a.c. voltage up or down."
        }
      ],
      "summary":"Read circuit structure before calculating. Series circuits have one current path, while parallel circuits split into branches. Use correct meter placement, V = IR and P = IV to analyse the circuit."
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
  || '{"topicsBuilt":57,"objectivesBuilt":57}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
