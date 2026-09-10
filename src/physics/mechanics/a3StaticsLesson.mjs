// SPARK Physics A3 Statics lesson content candidate.
// The exact syllabus objective wording is preserved. Explanations are original,
// student-facing and audited for the conditions under which each relationship
// is valid.

export const A3_STATICS_LESSON = Object.freeze({
  id:'A3', section:'A', title:'Statics',
  tagline:'Forces, turning effects, balance, stability and elasticity.',
  summary:'Statics asks what forces do, how forces turn objects about pivots, how balanced forces keep bodies in equilibrium, where weight acts, and how springs and elastic bands respond to loading.',
  objectives:[
    ['A3.1','explain the effects of forces'],
    ['A3.2','identify types of forces'],
    ['A3.3','determine the weight of objects'],
    ['A3.4','show how derived quantities and their related units are produced'],
    ['A3.5','recall the special names given to the units for some derived quantities'],
    ['A3.6','express derived units using the index notation'],
    ['A3.7','identify situations in which the application of a force will result in a turning effect'],
    ['A3.8','define the moment of a force, T'],
    ['A3.9','apply the principle of moments'],
    ['A3.10','explain the action of common tools and devices as levers'],
    ['A3.11','determine the location of the centre of gravity of a body'],
    ['A3.12','relate the stability of an object to the position of its centre of gravity and its weight'],
    ['A3.13','investigate the relationship between extension and force'],
    ['A3.14',"solve problems using Hooke's law"],
  ],
  prerequisites:['A1. measurement, graphs, gradient and errors','A2. force as a vector'],
  formulae:[
    {name:'Weight',equation:'W = mg',symbols:'W weight, m mass, g gravitational field strength',unit:'W in N; m in kg; g in N kg^-1'},
    {name:'Moment of a force',equation:'T = Fd',symbols:'F force; d perpendicular distance from pivot to the line of action',unit:'N m'},
    {name:'Principle of moments',equation:'sum clockwise moments = sum anticlockwise moments',symbols:'all moments taken about the same point',unit:'N m'},
    {name:"Hooke's law",equation:'F = kx',symbols:'F force; k spring constant; x extension',unit:'k in N m^-1 when x is in m'},
  ],
  sections:[
    {
      id:'forces',heading:'1. What a force can do',objectives:['A3.1','A3.2'],
      paragraphs:[
        'A force is a push or a pull. You do not see a force itself; you observe its effect. A force can change the size of a body, change its shape, or change its motion. A change of motion includes starting, stopping, speeding up, slowing down or changing direction.',
        'The syllabus asks you to recognise situations involving electric, magnetic, nuclear and gravitational forces. A charged object attracting paper is electric. A compass responding to a magnet is magnetic. Weight is gravitational. The force that binds the particles in a nucleus is nuclear.',
        'Do not confuse a type of force with an effect of a force. Push and pull describe what a force is. Changing shape, size or motion describes what it does.'
      ],
      examples:[
        {prompt:'A moving ball is struck sideways but its speed stays almost unchanged. Has the force changed its motion?',solution:'Yes. Its direction has changed, so its velocity has changed.'},
        {prompt:'Which force gives a book its weight?',solution:'Gravitational force.'},
      ],
    },
    {
      id:'weight-units',heading:'2. Weight, derived quantities and units',objectives:['A3.3','A3.4','A3.5','A3.6'],
      paragraphs:[
        'Mass and weight are different quantities. Mass is measured in kilograms. Weight is the gravitational force acting on the mass and is measured in newtons. For this course, use W = mg. On Earth, CSEC questions commonly use g = 10 N kg^-1 unless another value is given.',
        'A derived quantity is built from other quantities. Its unit is produced in the same way from the units in the defining equation. For example, density = mass/volume, so the SI unit is kg/m^3, written in index notation as kg m^-3.',
        'The SI base quantities used across this course include length in metres, mass in kilograms, time in seconds, temperature in kelvin and electric current in amperes. Mechanics calculations often involve only kg, m and s, but those are not the only base quantities used in Physics.',
        'Some derived units have special names. Force is measured in newtons, pressure in pascals, work and energy in joules, power in watts and frequency in hertz. The named unit and its base-unit form describe the same physical quantity.'
      ],
      derivations:[
        {quantity:'Speed',equation:'distance/time',unit:'m/s = m s^-1'},
        {quantity:'Acceleration',equation:'velocity/time',unit:'(m s^-1)/s = m s^-2'},
        {quantity:'Force',equation:'mass x acceleration',unit:'kg m s^-2 = N'},
        {quantity:'Pressure',equation:'force/area',unit:'N m^-2 = kg m^-1 s^-2 = Pa'},
        {quantity:'Density',equation:'mass/volume',unit:'kg m^-3'},
      ],
      examples:[
        {prompt:'A 3.2 kg bag is on Earth where g = 10 N/kg. Find its weight.',solution:'W = mg = 3.2 x 10 = 32 N.'},
        {prompt:'Write kg/m^3 using index notation.',solution:'kg m^-3.'},
      ],
    },
    {
      id:'moments',heading:'3. Turning effects and moments',objectives:['A3.7','A3.8','A3.9'],
      paragraphs:[
        'A force has a turning effect when it acts on a body that can rotate about a point or axis. Opening a door, using a spanner and balancing a seesaw are familiar examples.',
        'The moment of a force about a point is the force multiplied by the perpendicular distance from that point to the line of action of the force. The word perpendicular is essential. The distance is not simply the distance from the pivot to where your hand touches the object.',
        'Moment = Fd. Its unit is newton metre, N m. In this context do not write joule. A joule and N m have the same base dimensions, but they name different physical quantities and the syllabus explicitly keeps the moment unit as N m.',
        'For a body in rotational equilibrium, the total clockwise moment about a chosen point equals the total anticlockwise moment about that same point. In full static equilibrium, the resultant force is also zero.',
        'The syllabus excludes oblique-force calculations from the principle-of-moments objective. Use perpendicular forces or perpendicular distances in the calculation questions at this level.'
      ],
      workedExamples:[
        {prompt:'A 6.0 N force acts 0.40 m from a pivot. Find its moment.',steps:['T = Fd','T = 6.0 x 0.40','T = 2.4 N m']},
        {prompt:'A 6.0 N force acts 0.40 m on one side of a pivot. What force 0.30 m on the other side balances it?',steps:['Clockwise moment = anticlockwise moment','6.0 x 0.40 = F x 0.30','F = 8.0 N']},
      ],
      interactives:['Moment Beam: drag forces along a beam and see clockwise and anticlockwise moments update','Door and Spanner: compare turning effect as the force position and direction change'],
    },
    {
      id:'levers',heading:'4. Levers',objectives:['A3.10'],
      paragraphs:[
        'A lever is a rigid body that turns about a fulcrum. The effort is the force you apply and the load is the force you are trying to move or overcome.',
        'A lever can reduce the effort needed by giving the effort a larger perpendicular distance from the fulcrum than the load. The lever does not create force from nothing. It trades force against distance moved.',
        'In a first-class lever the fulcrum lies between effort and load. In a second-class lever the load lies between fulcrum and effort. In a third-class lever the effort lies between fulcrum and load.',
        'Common examples include crowbars and scissors, bottle openers and wheelbarrows, and tweezers or the human forearm. What matters in an explanation is identifying the fulcrum, effort and load and relating their distances to moments.'
      ],
      examples:[
        {prompt:'Why does a bottle opener have a long handle?',solution:'The longer effort arm gives a larger moment for the same applied effort, so a smaller effort can balance the load moment.'},
      ],
      interactives:['Lever Explorer: move fulcrum, effort and load and compare mechanical advantage qualitatively'],
    },
    {
      id:'centre-stability',heading:'5. Centre of gravity and stability',objectives:['A3.11','A3.12'],
      paragraphs:[
        'The centre of gravity is the point through which the whole weight of a body may be considered to act. For a uniform regular object in a uniform gravitational field, it is at the geometric centre.',
        'For an irregular lamina, suspend it freely from one point and hang a plumbline from the same point. Draw the vertical line. Repeat from another suspension point. The lines intersect at the centre of gravity. A third line can be used as a check.',
        'A supported object remains stable while the vertical line of action of its weight falls inside its base of support. When that line passes outside the base, the weight produces a moment that makes the object topple.',
        'A wider base and a lower centre of gravity generally increase stability because a larger tilt is needed before the line of action of the weight passes beyond the edge of the base.',
        'Orientation matters. Turning the same cuboid from its narrow end onto a broad face can both widen the base and lower the centre of gravity relative to the support.'
      ],
      interactives:['Plumbline Lab: suspend an irregular lamina from several points and locate the intersection','Topple or Return?: tilt a block and watch the vertical line through the centre of gravity relative to the base'],
    },
    {
      id:'elasticity',heading:'6. Extension, force and Hooke\'s law',objectives:['A3.13','A3.14'],
      paragraphs:[
        'Extension is the increase in length of an object: extension = stretched length - original length. Do not use the total stretched length as though it were the extension.',
        'To investigate a spring, measure its original length, add known loads, allow it to settle, and record its new length. Convert mass to force when necessary, calculate the extension, and plot force against extension or extension against force as instructed.',
        'In the proportional region, force is proportional to extension. For a graph of force on the vertical axis against extension on the horizontal axis, the straight-line gradient is the spring constant k.',
        "Hooke's law is F = kx within the proportional region. The limit of proportionality is where the force-extension graph stops being straight. The elastic limit is the point beyond which the object does not return fully to its original dimensions after the force is removed. These two limits are related but are not the same definition.",
        'Loading and unloading readings help show whether permanent deformation has occurred. Elastic bands may show a different force-extension shape from a spring, so never assume a straight line unless the data support it or the question states that Hooke\'s law applies.'
      ],
      workedExamples:[
        {prompt:'A spring extends 6.0 cm under a force of 3.0 N in the proportional region. Find k.',steps:['x = 6.0 cm = 0.060 m','k = F/x','k = 3.0/0.060 = 50 N m^-1']},
        {prompt:'A spring has k = 80 N/m. Find the extension produced by 4.0 N.',steps:['F = kx','x = F/k','x = 4.0/80 = 0.050 m']},
      ],
      interactives:['Force-Extension Lab: add and remove loads, build a table and plot the graph','Gradient Challenge: choose two well-separated points on the straight region and calculate k'],
    },
  ],
  objectiveCards:{
    'A3.1':{inShort:'A force can change the size, shape or motion of a body.',howAsked:'State or explain effects of a force, or identify the effect in a situation.',watchOut:'Do not list push and pull as effects; they describe a force itself.'},
    'A3.2':{inShort:'Recognise gravitational, electric, magnetic and nuclear forces in physical situations.',howAsked:'Identify the force acting in a named situation.',watchOut:'Do not confuse a contact force such as friction with the syllabus list of force types in this objective.'},
    'A3.3':{inShort:'Weight is gravitational force: W = mg.',howAsked:'Calculate weight or mass, or interpret a weight-against-mass graph.',watchOut:'Weight is in newtons. Mass is in kilograms.'},
    'A3.4':{inShort:'Use the defining equation to build a derived unit from base units.',howAsked:'Show or derive the unit of a quantity from its equation.',watchOut:'Do not guess the unit from memory when the derivation is what is being assessed.'},
    'A3.5':{inShort:'Know common special names such as newton, joule, watt, pascal and hertz.',howAsked:'Match a derived unit or physical quantity to its special unit name.',watchOut:'A named unit still has an equivalent base-unit expression.'},
    'A3.6':{inShort:'Move units from the denominator into negative powers, for example m/s^2 = m s^-2.',howAsked:'Express a compound unit using index notation or convert it back.',watchOut:'A denominator changes the sign of the exponent.'},
    'A3.7':{inShort:'A force produces a turning effect when its line of action has a perpendicular distance from the pivot.',howAsked:'Identify a turning-effect situation or compare two ways of applying a force.',watchOut:'A force through the pivot has zero moment about that pivot.'},
    'A3.8':{inShort:'Moment = force x perpendicular distance from pivot to line of action.',howAsked:'Define moment, calculate it and state its unit.',watchOut:'The unit is N m, not J, in a moments answer.'},
    'A3.9':{inShort:'For rotational equilibrium, total clockwise moment = total anticlockwise moment about the same point.',howAsked:'Find an unknown load or distance on a balanced beam.',watchOut:'Measure distances from the pivot and use perpendicular distances.'},
    'A3.10':{inShort:'A lever turns about a fulcrum; the effort and load act at different moment arms.',howAsked:'Identify load, effort and fulcrum and explain why a tool reduces effort.',watchOut:'A lever does not create energy or force; it changes the force-distance trade-off.'},
    'A3.11':{inShort:'For an irregular lamina, the intersection of vertical plumb lines from different suspension points locates the centre of gravity.',howAsked:'Describe the plumbline experiment or locate the centre of gravity of a regular body.',watchOut:'One suspension line is not enough to locate a point.'},
    'A3.12':{inShort:'An object topples when the vertical line through its centre of gravity passes outside its base.',howAsked:'Compare stability after changing base width, orientation or centre-of-gravity height.',watchOut:'Saying only “heavier at the bottom” is incomplete; explain the centre of gravity and base.'},
    'A3.13':{inShort:'Measure force and extension, plot the relationship and identify the proportional region.',howAsked:'Complete a table, plot a force-extension graph, identify proportionality or discuss errors.',watchOut:'Extension is new length minus original length.'},
    'A3.14':{inShort:"Within the proportional region, F = kx.",howAsked:'Calculate force, extension or spring constant and interpret a force-extension gradient.',watchOut:'Do not apply F = kx beyond the proportional region unless the question explicitly justifies it.'},
  },
  commonMistakes:[
    'Using mass in kilograms as though it were weight in newtons.',
    'Using a non-perpendicular distance in a moment calculation.',
    'Calling the moment unit a joule.',
    'Forgetting the weight of a uniform beam when its centre of gravity is not at the pivot.',
    'Using stretched length instead of extension.',
    'Confusing the limit of proportionality with the elastic limit.',
    'Explaining stability without referring to the line of action of weight and the base.',
  ],
});
