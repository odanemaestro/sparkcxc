begin;

-- CSEC Integrated Science objective 2.2.8
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm2-t2-8-smoking-gaseous-exchange',
  'module-2-energy',
  '2.2.8 Smoking and Gaseous Exchange',
  'Explain how smoking and related inhaled exposures affect gaseous exchange through nicotine dependence, impaired airway clearance, carbon monoxide, emphysema, cancer risk and second-hand exposure.',
  530,
  true,
  '{
    "syllabus":{
      "module":2,
      "topic":"Energy in Life Processes",
      "objective":"2.2.8",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Identify nicotine as the main addictive drug in tobacco.",
        "Explain how carbon monoxide reduces oxygen transport by binding to haemoglobin.",
        "Explain how cigarette smoke damages airway clearance mechanisms.",
        "Explain how emphysema reduces the efficiency of gaseous exchange.",
        "Relate smoking to increased lung-cancer and COPD risk.",
        "Explain why second-hand tobacco smoke is harmful.",
        "Describe current health concerns associated with e-cigarette aerosol.",
        "Describe respiratory effects of smoked cannabis without overstating uncertain long-term disease links."
      ],
      "introduction":"Smoking affects gaseous exchange through several mechanisms. Tobacco smoke damages airways and alveoli, carbon monoxide reduces the oxygen-carrying capacity of blood, nicotine drives dependence, and carcinogens increase cancer risk.",
      "sections":[
        {
          "title":"Nicotine and dependence",
          "paragraphs":[
            "Nicotine is a highly addictive drug found in tobacco. Dependence makes repeated tobacco use difficult to stop and increases continued exposure to the harmful chemicals in smoke.",
            "Nicotine is not the main cause of smoking-related cancer, but its addictive effects help sustain exposure to the many carcinogens and toxic substances in tobacco smoke."
          ]
        },
        {
          "title":"Carbon monoxide and oxygen transport",
          "paragraphs":[
            "Carbon monoxide binds strongly to haemoglobin. When carbon monoxide occupies haemoglobin binding sites, less haemoglobin is available to carry oxygen.",
            "This reduces oxygen delivery to body tissues and can limit the oxygen available for aerobic respiration."
          ]
        },
        {
          "title":"Cilia, mucus and persistent cough",
          "paragraphs":[
            "Healthy airways use mucus to trap particles and microorganisms, while cilia move the mucus towards the throat.",
            "Cigarette smoke injures airway tissues, impairs ciliary clearance, increases inflammation and can increase mucus production.",
            "When mucus and trapped material are not cleared effectively, coughing becomes an important way of clearing the airways and respiratory infections become more likely."
          ]
        },
        {
          "title":"Emphysema and COPD",
          "paragraphs":[
            "Emphysema is a form of chronic obstructive pulmonary disease, COPD. In emphysema, walls between many alveoli are destroyed and elastic recoil is reduced.",
            "The loss of alveolar walls creates fewer, larger air spaces and reduces the total surface area available for gaseous exchange.",
            "Cigarette smoking is a major cause of COPD."
          ]
        },
        {
          "title":"Smoking and lung cancer",
          "paragraphs":[
            "Tobacco smoke contains many carcinogens that can damage DNA. Cigarette smoking is the leading risk factor for lung cancer.",
            "Risk rises with exposure, and stopping smoking reduces the risk over time."
          ]
        },
        {
          "title":"Second-hand smoke",
          "paragraphs":[
            "Second-hand tobacco smoke exposes people who do not smoke to harmful chemicals. There is no safe level of second-hand tobacco-smoke exposure.",
            "Second-hand smoke increases the risk of lung cancer and cardiovascular disease in adults and causes respiratory harm in children."
          ]
        },
        {
          "title":"Vaping",
          "paragraphs":[
            "E-cigarettes heat a liquid to form an aerosol, not harmless water vapour. Most e-cigarettes contain nicotine.",
            "E-cigarette aerosol can contain harmful or potentially harmful substances including fine particles, heavy metals, volatile organic compounds and cancer-causing chemicals.",
            "The long-term health effects of e-cigarette use are still being studied, so vaping should not be presented as harmless."
          ]
        },
        {
          "title":"Smoked cannabis",
          "paragraphs":[
            "Cannabis smoke contains many of the same toxins, irritants and carcinogens found in tobacco smoke and can damage lung tissue.",
            "Smoking cannabis is associated with cough, mucus production and bronchitis symptoms.",
            "Evidence is still developing for some longer-term outcomes such as lung cancer and emphysema, so those links should not be stated as established in the same way as cigarette smoking."
          ]
        },
        {
          "title":"Protecting shared air",
          "paragraphs":[
            "Smoke-free and aerosol-free indoor policies protect other people from involuntary exposure to tobacco smoke and e-cigarette aerosol.",
            "These policies are especially important in shared public spaces where people cannot easily avoid exposure."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m2-t2-8-smoking-gaseous-exchange",
          "type":"smoking-gaseous-exchange",
          "title":"Smoking and gaseous-exchange effects explorer"
        }
      ],
      "keyPoints":[
        "Nicotine is highly addictive.",
        "Carbon monoxide binds to haemoglobin and reduces oxygen transport.",
        "Smoke damages airway clearance and contributes to mucus build-up and persistent cough.",
        "Emphysema destroys alveolar walls and reduces gaseous-exchange surface area.",
        "Cigarette smoking is a major cause of COPD and the leading risk factor for lung cancer.",
        "There is no safe level of second-hand tobacco-smoke exposure.",
        "E-cigarette aerosol is not harmless water vapour and can contain nicotine and other harmful substances.",
        "Smoked cannabis can harm lung tissue and contains many toxins and irritants also found in tobacco smoke.",
        "Some long-term respiratory disease links for cannabis need more research."
      ],
      "workedExample":{
        "title":"Explaining the effect of carbon monoxide",
        "prompt":"Explain why carbon monoxide in cigarette smoke can reduce the amount of oxygen delivered to active muscles.",
        "steps":[
          "Carbon monoxide enters the blood through the lungs.",
          "It binds strongly to haemoglobin.",
          "Less haemoglobin remains available to transport oxygen.",
          "Less oxygen is delivered to muscle cells.",
          "Aerobic respiration can therefore be limited during high demand."
        ],
        "answer":"Carbon monoxide binds to haemoglobin and reduces the blood''s oxygen-carrying capacity, so less oxygen reaches muscle cells for aerobic respiration."
      },
      "checks":[
        {
          "prompt":"Which substance in tobacco is mainly responsible for addiction?",
          "answer":"Nicotine.",
          "explanation":"Nicotine dependence helps sustain repeated tobacco use."
        },
        {
          "prompt":"How does carbon monoxide reduce oxygen transport?",
          "answer":"It binds strongly to haemoglobin, leaving less haemoglobin available to carry oxygen.",
          "explanation":"The problem is oxygen transport in blood, not a lack of oxygen in the surrounding air."
        },
        {
          "prompt":"Why does emphysema reduce gaseous exchange?",
          "answer":"Destruction of alveolar walls reduces the total surface area available for diffusion.",
          "explanation":"Loss of elastic recoil also contributes to airflow limitation."
        },
        {
          "prompt":"Why is second-hand tobacco smoke harmful?",
          "answer":"It exposes people who do not smoke to toxic and cancer-causing substances and increases disease risk.",
          "explanation":"Even brief exposure can cause harmful effects."
        },
        {
          "prompt":"Why is it inaccurate to call e-cigarette aerosol harmless water vapour?",
          "answer":"The aerosol can contain nicotine, fine particles, metals, volatile organic compounds and other harmful substances.",
          "explanation":"An aerosol is a mixture of particles and chemicals suspended in air."
        }
      ],
      "summary":"Smoking interferes with gaseous exchange through airway damage, alveolar destruction and reduced oxygen transport. Tobacco smoke also causes cancer and exposes nearby people to harmful chemicals. Vape aerosol and other inhaled smoke exposures also require accurate health-risk wording."
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
  || '{"topicsBuilt":53,"objectivesBuilt":53}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
