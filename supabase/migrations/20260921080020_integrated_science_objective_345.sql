begin;

insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values(
'integrated-science','m3-t4-5-momentum','module-3-environment','3.4.5 Conservation of Momentum',
'Calculate momentum and apply conservation of momentum to collisions, recoil, propulsion and safety.',802,true,
'{
 "syllabus":{"module":3,"topic":"Forces","objective":"3.4.5","source":"CXC 23/G/SYLL 23, amended 2026"},
 "lesson":{
  "objectives":["Calculate momentum using p = mv.","State the unit kg m/s.","Apply conservation of momentum to collisions.","Explain momentum transfer in equal-mass balls.","Explain rocket propulsion and skater recoil using momentum.","Relate stopping time to collision force."],
  "introduction":"Momentum is the product of mass and velocity. When external impulse is negligible, total momentum of a system remains constant.",
  "sections":[
   {"title":"Momentum","paragraphs":["Momentum p = mass × velocity.","The SI unit is kg m/s.","A 1 000 kg car travelling at 20 m/s has momentum 20 000 kg m/s.","A 60 kg sprinter at 10 m/s has momentum 600 kg m/s."]},
   {"title":"Conservation of momentum","paragraphs":["In a collision or interaction with negligible external impulse, total momentum before equals total momentum after.","Momentum is a vector, so opposite directions must be treated with opposite signs."]},
   {"title":"Equal balls","paragraphs":["If a moving ball strikes an equal stationary ball directly and the first stops, the second can move away with the original speed.","The original momentum has been transferred to the second ball."]},
   {"title":"Two trolleys","paragraphs":["A 2 kg trolley moving at 3 m/s has 6 kg m/s of momentum.","If it sticks to a stationary 1 kg trolley, the combined mass is 3 kg and their speed is 6 ÷ 3 = 2 m/s."]},
   {"title":"Rocket propulsion","paragraphs":["A rocket expels gases backward at high speed.","The gases gain backward momentum while the rocket gains forward momentum, conserving total momentum when external effects are neglected."]},
   {"title":"Skaters","paragraphs":["Two skaters initially at rest have total momentum zero.","When they push apart, they move in opposite directions with equal and opposite momenta so total momentum remains zero."]},
   {"title":"Seat belts and stopping time","paragraphs":["A passenger's momentum must change during a collision.","For the same change in momentum, increasing the stopping time reduces the average force.","Seat belts and crumple zones help increase stopping time while controlling the passenger's motion."]}
  ],
  "interactiveModels":[{"id":"m3-t4-5-momentum","type":"momentum-conservation","title":"Momentum and collision explorer"}],
  "keyPoints":["p = mv.","Momentum unit is kg m/s.","Total momentum is conserved when external impulse is negligible.","1 000 kg at 20 m/s gives 20 000 kg m/s.","60 kg at 10 m/s gives 600 kg m/s.","A 2 kg ball at 4 m/s transfers 8 kg m/s.","A longer stopping time reduces average collision force."],
  "workedExample":{"title":"Trolleys stick together","prompt":"A 2 kg trolley at 3 m/s hits a stationary 1 kg trolley and they stick. Find their speed.","steps":["Initial momentum = 2 × 3 = 6 kg m/s.","Combined mass = 3 kg.","Final speed = 6 ÷ 3 = 2 m/s."],"answer":"2 m/s."},
  "checks":[
   {"prompt":"What is the momentum of a 1 000 kg car at 20 m/s?","answer":"20 000 kg m/s.","explanation":"p = mv."},
   {"prompt":"What is conserved in an isolated collision?","answer":"Total momentum.","explanation":"Total before equals total after."},
   {"prompt":"Why do seat belts reduce average force?","answer":"They help increase the time over which the passenger's momentum changes.","explanation":"Force depends on rate of change of momentum."}
  ],
  "summary":"Momentum conservation explains collisions, recoil and propulsion."
 }
}'::jsonb)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now() where id='integrated-science';
commit;