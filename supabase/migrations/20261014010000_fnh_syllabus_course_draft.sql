begin;
-- Food, Nutrition and Health CSEC (Home Economics Option C).
-- Syllabus: CXC 11/G/SYLL 15, 2015 revision effective May/June 2017.
-- Phase 1 is intentionally draft and disabled. Do not publish until
-- Paper 01/Paper 02 original and historical banks, marking and reporting pass QA.
insert into public.spark_subjects
(id,name,short_name,qualification,mark,description,enabled,status,sort_order,implementation,study_view,capabilities,routes,stats,learning_config,manifest_version)
values ('food-nutrition-and-health','CSEC Food, Nutrition and Health',
'Food, Nutrition and Health','CSEC','FH',
'Study all seven CSEC Food, Nutrition and Health sections through clear Caribbean-centred lessons and interactive activities.',
false,'draft',47,'generic','study',
'{"study":true,"practice":false,"flashcards":true,"progress":true,"paper1":false,"paper2":false,"adaptive":false,"structured":false,"labs":true,"sba":true}'::jsonb,
'{"study":"/study/food-nutrition-and-health","practice":"/practice/food-nutrition-and-health","flashcards":"/dashboard/flashcards/food-nutrition-and-health","progress":"/dashboard/progress"}'::jsonb,
'{"sections":7,"topics":25,"objectives":87,"flashcards":87,"approvedPaper1Historical":0,"approvedPaper2Historical":0}'::jsonb,
'{"syllabusCode":"CXC 11/G/SYLL 15","syllabusEdition":"2015 edition effective May/June 2017","qualification":"Technical Proficiency","paper01":{"items":60,"minutes":90,"marks":60,"weightPercent":30},"paper02":{"questions":6,"marksPerQuestion":16,"totalMarks":96,"minutes":150,"weightPercent":40},"paper03":{"component":"School-Based Assessment","weightPercent":30},"releaseStage":"syllabus-lessons-review"}'::jsonb,1)
on conflict(id) do update set
name=excluded.name,short_name=excluded.short_name,description=excluded.description,
enabled=false,status='draft',sort_order=excluded.sort_order,
implementation=excluded.implementation,study_view=excluded.study_view,
capabilities=excluded.capabilities,routes=excluded.routes,
stats=excluded.stats,learning_config=excluded.learning_config,
manifest_version=greatest(public.spark_subjects.manifest_version,excluded.manifest_version),
updated_at=now();

insert into public.spark_subject_sections(subject_id,section_id,title,description,sort_order,enabled,metadata)
values
('food-nutrition-and-health','section-1','Section 1: Diet and Health','Official Food, Nutrition and Health syllabus Section 1',100,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-2','Section 2: Nutrition and Health','Official Food, Nutrition and Health syllabus Section 2',200,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-3','Section 3: Meal Planning, Preparation and Dining','Official Food, Nutrition and Health syllabus Section 3',300,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-4','Section 4: Food Science and Technology','Official Food, Nutrition and Health syllabus Section 4',400,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-5','Section 5: Kitchen Design and Equipment Management','Official Food, Nutrition and Health syllabus Section 5',500,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-6','Section 6: Consumerism and Purchasing of Food','Official Food, Nutrition and Health syllabus Section 6',600,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb),
('food-nutrition-and-health','section-7','Section 7: Food Management, Preparation and Service','Official Food, Nutrition and Health syllabus Section 7',700,true,'{"syllabus":"CXC 11/G/SYLL 15"}'::jsonb)
on conflict(subject_id,section_id) do update set
title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,
enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values
('food-nutrition-and-health','diet-basics','section-1','Diet, Healthy Choices and Caribbean Guidelines','Specific objectives S1.1 to S1.4',101,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S1.1","S1.2","S1.3","S1.4"]}'::jsonb),
('food-nutrition-and-health','food-choices-lifecycle','section-1','Food Choices and Nutrition Through Life','Specific objectives S1.5 to S1.7',102,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S1.5","S1.6","S1.7"]}'::jsonb),
('food-nutrition-and-health','community-food-security','section-1','Community Nutrition and Food Security','Specific objectives S1.8 to S1.11',103,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S1.8","S1.9","S1.10","S1.11"]}'::jsonb),
('food-nutrition-and-health','nutrient-foundations','section-2','Nutrients and Nutrition Problems','Specific objectives S2.1 to S2.5',204,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S2.1","S2.2","S2.3","S2.4","S2.5"]}'::jsonb),
('food-nutrition-and-health','vitamins-minerals','section-2','Vitamins, Minerals and Absorption','Specific objectives S2.6 to S2.10',205,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S2.6","S2.7","S2.8","S2.9","S2.10"]}'::jsonb),
('food-nutrition-and-health','water-digestion-evidence','section-2','Water, Digestion and Reliable Nutrition Advice','Specific objectives S2.11 to S2.15',206,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S2.11","S2.12","S2.13","S2.14","S2.15"]}'::jsonb),
('food-nutrition-and-health','meal-planning-multimix','section-3','Meal Planning, Food Groups and Multi-mix Meals','Specific objectives S3.1 to S3.4',307,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S3.1","S3.2","S3.3","S3.4"]}'::jsonb),
('food-nutrition-and-health','menus-groups-vegetarian','section-3','Menus, Life Stages and Vegetarian Meals','Specific objectives S3.5 to S3.8',308,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S3.5","S3.6","S3.7","S3.8"]}'::jsonb),
('food-nutrition-and-health','budget-packed-dining','section-3','Healthy Budget Meals, Packed Lunches and Table Settings','Specific objectives S3.9 to S3.12',309,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S3.9","S3.10","S3.11","S3.12"]}'::jsonb),
('food-nutrition-and-health','production-spoilage','section-4','Food Production, Spoilage and Storage','Specific objectives S4.1 to S4.3',410,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S4.1","S4.2","S4.3"]}'::jsonb),
('food-nutrition-and-health','microbes-food-safety','section-4','Microorganisms and Food-borne Illness','Specific objectives S4.4 to S4.6',411,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S4.4","S4.5","S4.6"]}'::jsonb),
('food-nutrition-and-health','preservation-additives','section-4','Preservation Methods and Food Additives','Specific objectives S4.7 to S4.9',412,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S4.7","S4.8","S4.9"]}'::jsonb),
('food-nutrition-and-health','heat-raising','section-4','Heat, Cooking Changes and Raising Agents','Specific objectives S4.10 to S4.13',413,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S4.10","S4.11","S4.12","S4.13"]}'::jsonb),
('food-nutrition-and-health','kitchen-layout','section-5','Kitchen Design and Workflow','Specific objectives S5.1 to S5.2',514,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S5.1","S5.2"]}'::jsonb),
('food-nutrition-and-health','equipment','section-5','Hand Tools and Electrical Kitchen Equipment','Specific objectives S5.3 to S5.6',515,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S5.3","S5.4","S5.5","S5.6"]}'::jsonb),
('food-nutrition-and-health','efficiency-sinks','section-5','Efficiency, Energy and Sinks','Specific objectives S5.7 to S5.9',516,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S5.7","S5.8","S5.9"]}'::jsonb),
('food-nutrition-and-health','kitchen-first-aid','section-5','Kitchen Accidents and First Aid','Specific objectives S5.10 to S5.11',517,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S5.10","S5.11"]}'::jsonb),
('food-nutrition-and-health','consumer-rights','section-6','Consumer Rights and Responsible Purchasing','Specific objectives S6.1 to S6.3',618,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S6.1","S6.2","S6.3"]}'::jsonb),
('food-nutrition-and-health','shops-budgets','section-6','Shopping Choices and Food Budgets','Specific objectives S6.4 to S6.6',619,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S6.4","S6.5","S6.6"]}'::jsonb),
('food-nutrition-and-health','selection-storage','section-6','Selecting and Storing Food','Specific objectives S6.7 to S6.9',620,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S6.7","S6.8","S6.9"]}'::jsonb),
('food-nutrition-and-health','labels-claims','section-6','Food Labels, Nutrition Facts and Claims','Specific objectives S6.10 to S6.14',621,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S6.10","S6.11","S6.12","S6.13","S6.14"]}'::jsonb),
('food-nutrition-and-health','hygiene-cooking','section-7','Hygiene, Reasons for Cooking and Cooking Methods','Specific objectives S7.1 to S7.4',722,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S7.1","S7.2","S7.3","S7.4"]}'::jsonb),
('food-nutrition-and-health','preparation-service','section-7','Presentation, Preparation and Economical Ingredients','Specific objectives S7.5 to S7.7',723,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S7.5","S7.6","S7.7"]}'::jsonb),
('food-nutrition-and-health','beverages-evaluation','section-7','Beverages and Sensory Evaluation','Specific objectives S7.8 to S7.9',724,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S7.8","S7.9"]}'::jsonb),
('food-nutrition-and-health','caribbean-food-culture','section-7','World Influences and Caribbean National Dishes','Specific objectives S7.10 to S7.11',725,true,'{"syllabus":"CXC 11/G/SYLL 15","objectiveCodes":["S7.10","S7.11"]}'::jsonb)
on conflict(subject_id,topic_id) do update set
title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,
section_id=excluded.section_id,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

-- Deliberately no publication update here.
commit;
