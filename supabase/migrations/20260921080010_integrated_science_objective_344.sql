begin;

insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values(
'integrated-science','m3-t4-4-equilibrium','module-3-environment','3.4.4 Equilibrium',
'Explain moments, mechanical equilibrium and examples of stable, unstable, neutral, biological and chemical equilibrium.',801,true,
'{
 "syllabus":{"module":3,"topic":"Forces","objective":"3.4.4","source":"CXC 23/G/SYLL 23, amended 2026"},
 "lesson":{
  "objectives":[
   "Calculate moments using force × perpendicular distance.",
   "Apply the principle of moments to balanced systems.",
   "State the conditions for equilibrium under parallel forces.",
   "Distinguish stable, unstable and neutral equilibrium.",
   "Relate homeostasis to biological equilibrium.",
   "Describe dynamic chemical equilibrium."
  ],
  "introduction":"Equilibrium occurs when competing effects balance. In mechanics this means both forces and turning effects are balanced.",
  "sections":[
   {"title":"Moment of a force","paragraphs":["Moment = force × perpendicular distance from the pivot.","The unit is newton metre, N m.","A 20 N force acting 0.3 m from a pivot produces a moment of 6 N m."]},
   {"title":"Principle of moments","paragraphs":["For rotational equilibrium, total clockwise moment equals total anticlockwise moment.","A 400 N boy sitting 1.5 m from a pivot produces 600 N m, so a 300 N girl must sit 2.0 m from the pivot to balance."]},
   {"title":"Complete mechanical equilibrium","paragraphs":["For an object to remain in equilibrium under parallel forces, upward forces must balance downward forces as well as clockwise moments balancing anticlockwise moments."]},
   {"title":"Stable equilibrium","paragraphs":["A small displacement produces a tendency to return to the original position.","A cone resting on its base is a common example."]},
   {"title":"Unstable equilibrium","paragraphs":["A small displacement causes the object to move farther from its original position.","A cone balanced on its point is an example."]},
   {"title":"Neutral equilibrium","paragraphs":["After a small displacement, the object remains in its new position.","A ball on a flat horizontal surface is a common example."]},
   {"title":"Homeostasis","paragraphs":["Biological equilibrium includes maintenance of internal conditions such as body temperature and blood glucose within suitable limits.","This regulation is called homeostasis."]},
   {"title":"Chemical equilibrium","paragraphs":["In a reversible reaction at dynamic equilibrium, forward and reverse reactions continue at equal rates.","Macroscopic concentrations then remain constant even though reactions continue."]}
  ],
  "interactiveModels":[{"id":"m3-t4-4-equilibrium","type":"equilibrium-moments","title":"Moments and equilibrium explorer"}],
  "keyPoints":["Moment = force × perpendicular distance.","Unit of moment is N m.","Clockwise moments equal anticlockwise moments at rotational equilibrium.","Stable equilibrium returns after displacement.","Unstable equilibrium moves farther away.","Neutral equilibrium remains in its new position.","Homeostasis maintains internal conditions.","Dynamic chemical equilibrium has equal forward and reverse rates."],
  "workedExample":{"title":"Balancing a see-saw","prompt":"A 400 N boy sits 1.5 m from a pivot. Where should a 300 N girl sit to balance?","steps":["Boy moment = 400 × 1.5 = 600 N m.","Set girl moment equal to 600 N m.","Distance = 600 ÷ 300 = 2.0 m."],"answer":"2.0 m from the pivot."},
  "checks":[
   {"prompt":"What is the moment of a 20 N force acting 0.3 m from a pivot?","answer":"6 N m.","explanation":"20 × 0.3 = 6."},
   {"prompt":"What condition applies to clockwise and anticlockwise moments at equilibrium?","answer":"They are equal.","explanation":"Their turning effects balance."},
   {"prompt":"What type of equilibrium describes a ball on a flat table?","answer":"Neutral equilibrium.","explanation":"It stays in its new position after displacement."}
  ],
  "summary":"Mechanical equilibrium requires balanced forces and balanced moments."
 }
}'::jsonb)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now() where id='integrated-science';
commit;