begin;

-- CSEC Integrated Science objective 1.4.3
insert into public.spark_subject_topics(
  subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata
)
values (
  'integrated-science',
  'm1-t4-3-blood-groups',
  'module-1-organisms-life-processes',
  '1.4.3 Blood Groups',
  'Distinguish ABO and Rhesus blood groups using red-cell antigens, plasma antibodies, agglutination tests, inheritance and transfusion compatibility.',
  200,
  true,
  '{
    "syllabus":{
      "module":1,
      "topic":"Transport Systems",
      "objective":"1.4.3",
      "source":"CXC 23/G/SYLL 23, amended 2026"
    },
    "lesson":{
      "objectives":[
        "Distinguish blood groups A, B, AB and O by their red-cell antigens and plasma antibodies.",
        "Interpret blood-typing tests using anti-A and anti-B sera.",
        "Explain agglutination and why incompatible red-cell transfusions are dangerous.",
        "Use an ABO compatibility table while recognising that clinical transfusion also requires Rh typing and cross-matching.",
        "Explain how ABO blood group is inherited.",
        "Explain Rhesus incompatibility in pregnancy and the purpose of anti-D immunoglobulin.",
        "State basic safety precautions when handling blood."
      ],
      "introduction":"Blood groups are determined by antigens on the surface of red blood cells. In the ABO system, the important antigens are A and B. Plasma can contain antibodies against whichever ABO antigen is absent. If a matching antibody meets its antigen on transfused red cells, agglutination can occur.",
      "sections":[
        {
          "title":"Blood group A",
          "paragraphs":[
            "Group A red blood cells carry antigen A. The plasma contains anti-B antibodies.",
            "In an ABO typing test, group A blood clumps with anti-A serum but does not clump with anti-B serum."
          ]
        },
        {
          "title":"Blood group B",
          "paragraphs":[
            "Group B red blood cells carry antigen B. The plasma contains anti-A antibodies.",
            "In an ABO typing test, group B blood does not clump with anti-A serum but clumps with anti-B serum."
          ]
        },
        {
          "title":"Blood group AB",
          "paragraphs":[
            "Group AB red blood cells carry both antigen A and antigen B. The plasma normally contains neither anti-A nor anti-B antibodies.",
            "In an ABO typing test, group AB blood clumps with both anti-A and anti-B sera."
          ]
        },
        {
          "title":"Blood group O",
          "paragraphs":[
            "Group O red blood cells carry neither antigen A nor antigen B. The plasma contains both anti-A and anti-B antibodies.",
            "In an ABO typing test, group O blood does not clump with either anti-A or anti-B serum."
          ]
        },
        {
          "title":"Agglutination",
          "paragraphs":[
            "Agglutination is the clumping of red blood cells when antibodies bind to matching antigens on their surfaces.",
            "For example, anti-A antibodies react with red cells carrying antigen A. In an incompatible transfusion, widespread agglutination and destruction of red cells can obstruct small vessels and cause a dangerous transfusion reaction."
          ]
        },
        {
          "title":"Reading the W, X, Y and Z blood test",
          "paragraphs":[
            "The SPARK question-bank table shows sample W clumping with anti-A only, so W is group A. Sample X clumps with anti-B only, so X is group B.",
            "Sample Y clumps with both sera, so Y is group AB. Sample Z does not clump with either serum, so Z is group O."
          ]
        },
        {
          "title":"ABO red-cell compatibility",
          "paragraphs":[
            "For ABO red-cell transfusion, donor red-cell antigens must not react with antibodies in the recipient plasma.",
            "Group A can receive ABO red cells from A or O. Group B can receive from B or O. Group AB can receive from A, B, AB or O in the ABO system. Group O can receive ABO red cells only from O."
          ],
          "bullets":[
            "Group O red cells have no A or B antigens. This is why school questions often describe group O as the universal donor in the ABO system.",
            "Group AB plasma has no anti-A or anti-B antibodies. This is why school questions often describe group AB as the universal recipient in the ABO system.",
            "In real transfusion practice, Rh type and other red-cell antigens also matter. O negative red cells are used when a broadly compatible emergency red-cell type is required, and compatibility testing remains essential."
          ]
        },
        {
          "title":"Cross-matching",
          "paragraphs":[
            "Before a planned transfusion, laboratory staff determine blood groups and cross-match donor red cells with recipient plasma to look for harmful reactions.",
            "Cross-matching reduces the risk of agglutination caused by ABO, Rh or other clinically important blood-group antigens."
          ]
        },
        {
          "title":"Inheritance of ABO blood group",
          "paragraphs":[
            "ABO blood group is inherited through genes from both parents. The A and B alleles are codominant, while the O allele is recessive to both A and B.",
            "A person with group A may carry A and A or A and O alleles. A person with group B may carry B and B or B and O. Group AB has one A and one B allele, while group O has two O alleles.",
            "Because group A and group B parents may each carry an O allele, some A-by-B parental combinations can produce children with group A, B, AB or O."
          ]
        },
        {
          "title":"The Rhesus factor",
          "paragraphs":[
            "The Rhesus, or Rh, system is separate from the ABO system. A person whose red cells carry the D antigen is described as Rh positive. A person without the D antigen is Rh negative.",
            "Rh type must be considered in transfusion compatibility as well as ABO type."
          ]
        },
        {
          "title":"Rhesus incompatibility in pregnancy",
          "paragraphs":[
            "An Rh-negative mother carrying an Rh-positive foetus can be exposed to small numbers of foetal Rh-positive red cells, especially around delivery. This exposure can sensitise her immune system to the D antigen.",
            "After sensitisation, maternal anti-D antibodies can cross the placenta during a later Rh-positive pregnancy and destroy foetal red blood cells. This can cause haemolytic disease of the foetus and newborn."
          ]
        },
        {
          "title":"Why anti-D is given",
          "paragraphs":[
            "Anti-D immunoglobulin is given to eligible Rh-negative pregnant women at recommended times and after events where Rh-positive foetal cells may enter the maternal circulation.",
            "The anti-D removes or neutralises Rh-positive foetal red cells before the mother develops her own long-lasting immune response, reducing the risk of sensitisation and protecting future Rh-positive pregnancies."
          ]
        },
        {
          "title":"Handling blood safely",
          "paragraphs":[
            "Blood must be treated as potentially infectious. Health workers use gloves and other infection-control procedures to reduce exposure to blood-borne pathogens such as HIV and hepatitis viruses.",
            "Gloves do not prevent agglutination. Their purpose is to reduce contact between blood and the worker."
          ]
        }
      ],
      "interactiveModels":[
        {
          "id":"m1-t4-3-blood-groups",
          "type":"blood-groups",
          "title":"ABO and Rhesus blood groups"
        }
      ],
      "keyPoints":[
        "Group A has antigen A and anti-B antibodies.",
        "Group B has antigen B and anti-A antibodies.",
        "Group AB has both A and B antigens and neither anti-A nor anti-B antibodies.",
        "Group O has neither A nor B antigen and has both anti-A and anti-B antibodies.",
        "Agglutination occurs when an antibody reacts with its matching antigen on red cells.",
        "ABO typing uses anti-A and anti-B sera. Clumping shows that the corresponding antigen is present.",
        "ABO-only compatibility is a simplified school model. Rh type, other antigens and cross-matching are also important in real transfusion practice.",
        "Anti-D immunoglobulin helps prevent sensitisation of an Rh-negative mother to Rh-positive foetal red cells."
      ],
      "workedExample":{
        "title":"Identifying a blood sample",
        "prompt":"A blood sample clumps when mixed with anti-A serum but shows no clumping with anti-B serum. Identify the ABO blood group and explain your answer.",
        "steps":[
          "Clumping with anti-A means antigen A is present on the red blood cells.",
          "No clumping with anti-B means antigen B is absent.",
          "Red cells with antigen A but not antigen B are group A."
        ],
        "answer":"The sample is blood group A because its red cells carry antigen A but not antigen B."
      },
      "checks":[
        {
          "prompt":"Why does incompatible blood agglutinate?",
          "answer":"Antibodies in the plasma bind to matching antigens on red blood cells, linking the cells together into clumps.",
          "explanation":"This antigen-antibody reaction is the basis of both blood typing and dangerous incompatible transfusion reactions."
        },
        {
          "prompt":"A sample clumps with both anti-A and anti-B serum. What is its ABO group?",
          "answer":"AB.",
          "explanation":"Both antigen A and antigen B are present on the red cells."
        },
        {
          "prompt":"Why is group O called a universal donor in simplified ABO questions?",
          "answer":"Group O red cells have neither A nor B antigens, so recipient anti-A or anti-B antibodies do not react with those ABO antigens.",
          "explanation":"This statement applies to the simplified ABO red-cell model. Rh type and cross-matching are also required in clinical transfusion."
        },
        {
          "prompt":"Why may an Rh-negative mother be given anti-D immunoglobulin?",
          "answer":"To reduce the chance that she becomes sensitised to Rh-positive foetal red cells and forms long-lasting anti-D antibodies.",
          "explanation":"Preventing sensitisation lowers the risk to a later Rh-positive foetus."
        }
      ],
      "summary":"Identify ABO groups from antigens and antibodies, use agglutination to interpret blood tests, and apply compatibility rules carefully. Then add the Rhesus factor and cross-matching to understand why real transfusion safety is more detailed than the simplified ABO table."
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
  || '{"topicsBuilt":20,"objectivesBuilt":20}'::jsonb,
updated_at=now()
where id='integrated-science';

commit;
