// SPARK Physics A4 Kinematics and Dynamics lesson content candidate.
// The lesson preserves the syllabus objective wording while correcting the
// common oversimplification that velocity-time area always means distance.

export const A4_KINEMATICS_DYNAMICS_LESSON = Object.freeze({
  id:'A4', section:'A', title:'Kinematics and Dynamics',
  tagline:'Describe motion, explain what changes it, and track momentum through interactions.',
  summary:'Kinematics describes motion using distance, displacement, speed, velocity, acceleration and graphs. Dynamics explains changes in motion using Newton\'s laws. Momentum links motion and interactions such as collisions, recoil and rockets.',
  objectives:[
    ['A4.1','define the terms: distance, displacement, speed, velocity, acceleration'],
    ['A4.2','apply displacement-time and velocity-time graphs'],
    ['A4.3','discuss Aristotle\'s arguments in support of his "law of motion", that is, v proportional to F'],
    ['A4.4',"state Newton's three laws of motion"],
    ['A4.5',"use Newton's laws to explain dynamic systems"],
    ['A4.6','define linear momentum'],
    ['A4.7','describe situations that demonstrate the law of conservation of linear momentum'],
    ['A4.8','apply the law of conservation of linear momentum'],
  ],
  prerequisites:['A2. vectors and directions','A3. forces and weight','A1. graph gradients and units'],
  formulae:[
    {name:'Speed',equation:'speed = distance/time',unit:'m s^-1'},
    {name:'Acceleration',equation:'a = (v - u)/t',unit:'m s^-2'},
    {name:"Newton's second law",equation:'F = ma',unit:'F in N; m in kg; a in m s^-2'},
    {name:'Linear momentum',equation:'p = mv',unit:'kg m s^-1 or N s'},
    {name:'Momentum conservation',equation:'total momentum before = total momentum after',unit:'use signed velocities in one dimension'},
  ],
  sections:[
    {
      id:'motion-language',heading:'1. The language of motion',objectives:['A4.1'],
      paragraphs:[
        'Distance is the total length of the path travelled. It is a scalar. Displacement is the directed change in position from the starting point to the finishing point. It is a vector.',
        'Speed is the rate at which distance is travelled. Velocity is the rate of change of displacement and therefore includes direction. A body can have constant speed but changing velocity if its direction changes.',
        'Acceleration is the rate of change of velocity. A body accelerates when it speeds up, slows down or changes direction. The sign of acceleration alone does not tell you whether the body is slowing down. You must compare the direction of the acceleration with the direction of the velocity.',
        'If velocity and acceleration point in the same direction, speed increases. If they point in opposite directions, speed decreases. A negative acceleration can therefore mean speeding up when the velocity is negative.'
      ],
      workedExamples:[
        {prompt:'A student walks 100 m east and 100 m west back to the start.',solution:'Distance = 200 m. Displacement = 0 m.'},
        {prompt:'Velocity changes from 4 m/s east to 10 m/s east in 3 s.',solution:'a = (10 - 4)/3 = 2 m/s^2 east.'},
      ],
    },
    {
      id:'motion-graphs',heading:'2. Displacement-time and velocity-time graphs',objectives:['A4.2'],
      paragraphs:[
        'On a displacement-time graph, gradient represents velocity. A horizontal line means the body is at rest. A straight sloping line means constant velocity. A steeper straight line means a greater speed. A negative gradient means velocity in the chosen negative direction.',
        'On a velocity-time graph, gradient represents acceleration. A horizontal line means constant velocity. A straight positive or negative slope means constant acceleration. The syllabus limits numerical gradient finding here to straight-line sections.',
        'The signed area between a velocity-time graph and the time axis gives displacement. Area above the axis is positive when that direction has been chosen positive. Area below the axis is negative.',
        'Total distance is different when the body reverses direction. Find the magnitude of every area and add those magnitudes. If the entire graph stays on one side of the time axis, the magnitude of the displacement equals the distance.',
        'A velocity-time graph crossing the time axis means the velocity passes through zero. If the sign changes, the body reverses direction.'
      ],
      workedExamples:[
        {prompt:'A vehicle moves at +4 m/s for 3 s, then -2 m/s for 3 s.',steps:['Displacement = 4 x 3 + (-2) x 3 = 6 m','Distance = 12 + 6 = 18 m']},
        {prompt:'Velocity rises uniformly from 0 to 12 m/s in 4 s.',solution:'Acceleration = gradient = 12/4 = 3 m/s^2.'},
      ],
      interactives:['Motion Graph Explorer: drag velocity-time points and see acceleration, displacement and distance update','Area Builder: split a graph at v = 0 and compare signed area with total distance'],
    },
    {
      id:'aristotle-newton',heading:'3. From Aristotle to Newton',objectives:['A4.3','A4.4'],
      paragraphs:[
        'The syllabus asks you to discuss Aristotle\'s view that motion required a continuing force, summarized as velocity being proportional to force. That idea can seem reasonable in everyday life because friction and air resistance usually make moving objects slow when the driving force stops.',
        'Experiments and observations with reduced friction showed that motion persists for longer as resistance is reduced. This led toward the idea that a force is not needed to maintain constant velocity. A resultant force is needed to change velocity.',
        "Newton's first law states that a body remains at rest or continues with constant velocity unless a resultant force acts on it. The word resultant matters because several forces can act and still add to zero.",
        "Newton's second law for the constant-mass situations in this course is F = ma, where F is the resultant force. A greater resultant force gives a greater acceleration; a greater mass gives a smaller acceleration for the same resultant force.",
        "Newton's third law states that when two bodies interact, each exerts a force on the other that is equal in magnitude and opposite in direction. The two forces act on different bodies, so they do not cancel each other on one free-body diagram."
      ],
      comparisons:[
        {idea:'Aristotle',statement:'Continuing motion requires continuing force; the syllabus summarizes the view as v proportional to F.',whyItSeemedReasonable:'Friction is present in ordinary experience, so objects commonly slow when pushing stops.',whatDiscreditedIt:'Reducing resistance lets motion persist, and Newtonian mechanics explains constant velocity with zero resultant force.'},
      ],
    },
    {
      id:'dynamic-systems',heading:'4. Using Newton\'s laws in real systems',objectives:['A4.5'],
      paragraphs:[
        'Start by choosing the body you are analysing. Draw or list every force acting on that body. Combine them to find the resultant. Then choose the law that connects the resultant force to the observed motion.',
        'A rocket does not need to push against air. The engine pushes exhaust gas backward and the gas pushes the rocket forward. These forces form a Newton third-law pair on different bodies.',
        'A garden sprinkler rotates because the sprinkler changes the momentum of the outgoing water and the water exerts an opposite force on the sprinkler arms.',
        'On a trampoline, compare the upward contact force with the downward weight. If the upward force is larger, the resultant is upward and the student accelerates upward. If the two are equal, the instantaneous acceleration is zero.'
      ],
      workedExamples:[
        {prompt:'A 55 kg student is pushed upward by a trampoline with 825 N. Take g = 10 N/kg.',steps:['Weight = 55 x 10 = 550 N downward','Resultant = 825 - 550 = 275 N upward','a = F/m = 275/55 = 5.0 m/s^2 upward']},
      ],
      interactives:['Free-Body Builder: add forces to one chosen body and calculate the resultant','Rocket and Exhaust: show the third-law force pair on different bodies'],
    },
    {
      id:'momentum',heading:'5. Linear momentum',objectives:['A4.6'],
      paragraphs:[
        'Linear momentum is the product of mass and velocity: p = mv. Because velocity is a vector, momentum is also a vector and has the same direction as the velocity.',
        'The SI unit is kg m s^-1. This is equivalent to N s. When motion is along one straight line, choose one direction as positive and give motion in the opposite direction a negative velocity and momentum.',
        'Momentum and kinetic energy are different quantities. Momentum depends on v and is a vector. Kinetic energy depends on v^2 and is a scalar.'
      ],
      examples:[
        {prompt:'A 0.50 kg ball moves east at 8.0 m/s.',solution:'p = 0.50 x 8.0 = 4.0 kg m/s east.'},
        {prompt:'A 2.0 kg trolley moves west at 3.0 m/s when east is positive.',solution:'p = 2.0 x (-3.0) = -6.0 kg m/s.'},
      ],
    },
    {
      id:'momentum-conservation',heading:'6. Conservation of linear momentum',objectives:['A4.7','A4.8'],
      paragraphs:[
        'For a system with negligible resultant external force during an interaction, total linear momentum before the interaction equals total linear momentum after it. The internal forces between the objects can be large; they do not change the total momentum of the complete chosen system.',
        'Examples include trolley collisions, gun recoil and two skaters pushing apart. A system that starts at rest has zero total momentum, so opposite final momenta must add to zero.',
        'For one-dimensional calculations, choose a positive direction before writing the equation. Carry the signs of all velocities through the calculation. If a body rebounds, its velocity changes sign.',
        'If two bodies stick together, they share one final velocity. The final momentum is then the combined mass multiplied by that common velocity.',
        'The syllabus excludes oblique collision calculations. SPARK therefore keeps required A4.8 calculations along one straight line.'
      ],
      workedExamples:[
        {prompt:'A 2.0 kg trolley at 3.0 m/s catches a 1.0 kg trolley at rest and they stick.',steps:['Initial momentum = 2.0 x 3.0 = 6.0 kg m/s','Final mass = 3.0 kg','6.0 = 3.0v','v = 2.0 m/s in the original direction']},
        {prompt:'A 60 kg skater at rest pushes a 40 kg skater east at 3.0 m/s.',steps:['Initial total momentum = 0','40 x 3.0 = 120 kg m/s east','Other skater momentum = 120 kg m/s west','v = 120/60 = 2.0 m/s west']},
      ],
      interactives:['Collision Lab: set masses and signed velocities, then compare total momentum before and after','Recoil Lab: begin from zero momentum and vary the two masses'],
    },
  ],
  objectiveCards:{
    'A4.1':{inShort:'Distance and speed are scalars. Displacement, velocity and acceleration are vectors. Acceleration is the rate of change of velocity.',howAsked:'Define or distinguish the quantities and calculate simple speed or acceleration.',watchOut:'Acceleration is not simply “getting faster”. Slowing down and changing direction are also changes of velocity.'},
    'A4.2':{inShort:'Displacement-time gradient = velocity. Velocity-time gradient = acceleration. Signed velocity-time area = displacement.',howAsked:'Describe motion, calculate a straight-line gradient, or use velocity-time areas.',watchOut:'Do not call every velocity-time area distance. If velocity becomes negative, add magnitudes for distance but use signs for displacement.'},
    'A4.3':{inShort:'Aristotle linked continuing motion with continuing force; friction made this seem reasonable, but reduced-resistance observations discredited the idea.',howAsked:'Discuss the argument, why it seemed plausible and what evidence challenged it.',watchOut:'Do not simply call Aristotle wrong. Explain the observation behind the view and why the later evidence changed the model.'},
    'A4.4':{inShort:'Know all three Newton laws, especially resultant force in the first and second laws and different bodies in the third.',howAsked:'State a law or identify which law explains a situation.',watchOut:'An action-reaction pair does not cancel because the two forces act on different bodies.'},
    'A4.5':{inShort:'Choose the body, find the resultant force and use Newton\'s laws to explain its acceleration or interaction.',howAsked:'Explain rockets, sprinklers or trampolines, or calculate acceleration from a resultant force.',watchOut:'A rocket does not push against the air.'},
    'A4.6':{inShort:'Linear momentum p = mv. It is a vector in the direction of velocity.',howAsked:'Define momentum, give its unit or calculate it.',watchOut:'Momentum is not kinetic energy. Direction and sign matter.'},
    'A4.7':{inShort:'In a suitable system, total momentum before an interaction equals total momentum after.',howAsked:'Describe recoil, trolley collisions or other demonstrations and explain what is conserved.',watchOut:'Choose the system carefully. A large external force means the object alone may not conserve momentum.'},
    'A4.8':{inShort:'Use signed one-dimensional momentum before = momentum after to solve collisions and recoil problems.',howAsked:'Find an unknown velocity before or after a collision or separation.',watchOut:'A rebound reverses the velocity sign. Oblique collision calculations are excluded.'},
  },
  commonMistakes:[
    'Using distance when the question asks for displacement.',
    'Treating constant speed around a bend as zero acceleration.',
    'Using area under a displacement-time graph.',
    'Calling signed velocity-time area distance when the graph crosses below zero.',
    'Forgetting that F in F = ma is the resultant force.',
    'Putting a Newton third-law pair on the same body.',
    'Dropping direction or signs in momentum calculations.',
    'Using conservation of momentum without considering external forces on the chosen system.',
  ],
});
