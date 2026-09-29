begin;

insert into public.spark_subject_topics(subject_id,topic_id,section_id,title,description,sort_order,enabled,metadata)
values(
'integrated-science','m3-t4-6-simple-machines','module-3-environment','3.4.6 Functions of Simple Machines',
'Explain how levers, pulleys, inclined planes, screws, gears and related machines change force, distance or direction.',803,true,
'{
 "syllabus":{"module":3,"topic":"Forces","objective":"3.4.6","source":"CXC 23/G/SYLL 23, amended 2026"},
 "lesson":{
  "objectives":["Explain how simple machines make work easier without creating energy.","Distinguish first-, second- and third-class levers.","Identify fulcrum, load and effort.","Explain the human forearm as a third-class lever.","Explain the function of fixed and movable pulley systems.","Explain inclined planes and screws.","Recognise gears as simple-machine components."],
  "introduction":"Simple machines change the size or direction of forces and trade force against distance. They make tasks easier but do not remove the need to do work.",
  "sections":[
   {"title":"Lever parts","paragraphs":["A lever turns about a fixed point called the fulcrum or pivot.","The effort is the applied force and the load is the resistance being moved."]},
   {"title":"First-class levers","paragraphs":["The fulcrum is between effort and load.","A see-saw and scissors are examples."]},
   {"title":"Second-class levers","paragraphs":["The load is between fulcrum and effort.","A wheelbarrow and bottle opener are examples.","Second-class levers act as force multipliers and have ideal mechanical advantage greater than 1."]},
   {"title":"Third-class levers","paragraphs":["The effort is between fulcrum and load.","Tweezers and the human forearm are examples.","The elbow acts as the fulcrum, the biceps provides effort and the load may be in the hand."]},
   {"title":"Pulleys","paragraphs":["A single fixed pulley mainly changes the direction of effort and has ideal mechanical advantage 1.","In an ideal pulley system, mechanical advantage is approximately the number of rope segments supporting the moving load."]},
   {"title":"Inclined planes","paragraphs":["A ramp allows a smaller force to raise a load over a longer distance.","Ideal mechanical advantage equals slope length ÷ vertical height."]},
   {"title":"Screws","paragraphs":["A screw is an inclined plane wrapped around a cylinder.","A screw jack turns a long rotational movement into a short lifting movement with greater force."]},
   {"title":"Gears and bicycles","paragraphs":["Bicycle gears help trade pedalling force against speed and cadence.","The bicycle also combines wheels, axles, levers and other simple-machine ideas."]}
  ],
  "interactiveModels":[{"id":"m3-t4-6-simple-machines","type":"simple-machines","title":"Simple machines explorer"}],
  "keyPoints":["First class: fulcrum in the middle.","Second class: load in the middle.","Third class: effort in the middle.","The forearm is a third-class lever.","A fixed pulley changes force direction.","Inclined planes trade force for distance.","A screw is a wrapped inclined plane.","Gears are simple-machine components."],
  "workedExample":{"title":"Identify a lever class","prompt":"In a wheelbarrow, the wheel is the fulcrum, the load sits in the tray and effort is applied at the handles. What class is it?","steps":["The load lies between fulcrum and effort.","That arrangement defines a second-class lever."],"answer":"Second-class lever."},
  "checks":[
   {"prompt":"Which class of lever has the effort between fulcrum and load?","answer":"Third-class.","explanation":"Tweezers and the forearm are examples."},
   {"prompt":"What does a single fixed pulley mainly do?","answer":"Changes the direction of the effort.","explanation":"Its ideal mechanical advantage is 1."},
   {"prompt":"What simple machine is a ramp?","answer":"An inclined plane.","explanation":"It reduces required force by increasing distance."}
  ],
  "summary":"Simple machines change force, distance or direction but do not create energy."
 }
}'::jsonb)
on conflict(subject_id,topic_id) do update set section_id=excluded.section_id,title=excluded.title,description=excluded.description,sort_order=excluded.sort_order,enabled=excluded.enabled,metadata=excluded.metadata,updated_at=now();

update public.spark_subjects set stats=coalesce(stats,'{}'::jsonb)||'{"topicsBuilt":96,"objectivesBuilt":96}'::jsonb,updated_at=now() where id='integrated-science';
commit;