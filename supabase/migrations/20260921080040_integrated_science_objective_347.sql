begin;

insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values(
'integrated-science','m3-t4-7-human-skeleton','module-3-environment','3.4.7 Structure and Functions of the Skeleton',
'Relate the major bones and regions of the human skeleton to support, protection, movement and breathing.',804,true,
'{
 "syllabus":{"module":3,"topic":"Forces","objective":"3.4.7","source":"CXC 23/G/SYLL 23, amended 2026"},
 "lesson":{
  "objectives":[
   "Identify the skull, clavicle, scapula, sternum, ribs, humerus, radius, ulna, pelvis, femur, tibia and fibula.",
   "State that the femur is the longest bone.",
   "Describe cervical, thoracic and lumbar regions of the vertebral column.",
   "Explain how the skull protects the brain.",
   "Explain how the vertebral column protects the spinal cord.",
   "Explain how ribs and sternum protect the heart and lungs and assist breathing.",
   "Explain functions of the pelvic girdle.",
   "Relate the skeleton to support and movement."
  ],
  "introduction":"The skeleton is a framework of bones and joints that supports the body, protects organs and works with muscles to produce movement.",
  "sections":[
   {"title":"Skull","paragraphs":["The cranium encloses and protects the brain.","The skull also supports structures of the face."]},
   {"title":"Shoulder girdle","paragraphs":["The clavicle is the collar bone.","The scapula is the shoulder blade and forms part of the shoulder joint."]},
   {"title":"Rib cage","paragraphs":["The sternum is the breastbone at the front of the chest.","The ribs and sternum protect the heart and lungs.","Movement of the ribs also contributes to ventilation."]},
   {"title":"Upper limb","paragraphs":["The humerus is the upper-arm bone.","The radius and ulna form the forearm."]},
   {"title":"Vertebral column","paragraphs":["The vertebral column protects the spinal cord and supports the trunk.","Its major regions include cervical vertebrae in the neck, thoracic vertebrae in the chest and lumbar vertebrae in the lower back, followed by the sacrum and coccyx."]},
   {"title":"Pelvic girdle","paragraphs":["The pelvic girdle bears and transfers the weight of the upper body.","It protects organs of the lower abdomen and pelvis and connects the lower limbs to the axial skeleton."]},
   {"title":"Lower limb","paragraphs":["The femur is the thigh bone and the longest bone in the human body.","The lower leg contains the tibia and fibula."]},
   {"title":"Support and movement","paragraphs":["Bones support soft tissues and provide attachment points for muscles.","Bones act as levers at joints when muscles contract."]}
  ],
  "interactiveModels":[{"id":"m3-t4-7-human-skeleton","type":"human-skeleton","title":"Human skeleton structure and function explorer"}],
  "keyPoints":[
   "The skull protects the brain.",
   "The vertebral column protects the spinal cord.",
   "The ribs and sternum protect the heart and lungs.",
   "The clavicle is the collar bone.",
   "The scapula is the shoulder blade.",
   "The humerus is the upper-arm bone.",
   "The femur is the longest bone.",
   "The lower leg contains the tibia and fibula.",
   "The pelvis supports the trunk and connects the legs to the backbone."
  ],
  "workedExample":{"title":"Identify a protective structure","prompt":"Which skeletal structure surrounds the spinal cord?","steps":["The spinal cord runs through the vertebral canal.","The canal is formed by the vertebrae of the vertebral column."],"answer":"The vertebral column."},
  "checks":[
   {"prompt":"Which bone is the collar bone?","answer":"The clavicle.","explanation":"It links the shoulder region to the sternum."},
   {"prompt":"What is the shoulder blade called?","answer":"The scapula.","explanation":"It forms part of the shoulder joint."},
   {"prompt":"Which bones form the lower leg?","answer":"The tibia and fibula.","explanation":"The tibia is the larger weight-bearing bone."},
   {"prompt":"What does the rib cage protect?","answer":"The heart and lungs.","explanation":"The ribs also move during breathing."}
  ],
  "summary":"Skeletal structure is closely related to support, protection and movement."
 }
}'::jsonb)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now() where id='integrated-science';
commit;