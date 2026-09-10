// SPARK Physics A5 Energy lesson candidate.
// Objective wording is locked to CXC 22/G/SYLL 13. Student explanations are
// clearer than the raw extraction while retaining the syllabus terminology.

export const A5_OBJECTIVES = Object.freeze({
  'A5.1':'define energy',
  'A5.2':'identify the various forms of energy',
  'A5.3':'describe the energy transformation(s) in a given situation',
  'A5.4':'apply the relationship: work = force x displacement',
  'A5.5':'discuss the use of energy from alternative sources, and its importance to the Caribbean',
  'A5.6':'define potential energy',
  'A5.7':'calculate the change in gravitational potential energy using Ep = mgh',
  'A5.8':'define kinetic energy',
  'A5.9':'calculate kinetic energies using the expression Ek = ½mv²',
  'A5.10':'apply the law of conservation of energy',
  'A5.11':'define power and apply definition',
  'A5.12':'explain the term efficiency',
  'A5.13':'calculate efficiency in given situations',
});

const card = (id, inShort, understand, examined, watchOut) => ({
  id, syllabusWording:A5_OBJECTIVES[id], inShort, understand, examined, watchOut,
});

export const A5_ENERGY_LESSON = Object.freeze({
  id:'A5', section:'A', title:'Energy',
  tagline:'Follow energy as it is stored, transferred and transformed, then calculate work, power and efficiency.',
  summary:'Energy links motion, forces, electricity, heat and machines. In this topic you identify energy forms and transformations, calculate work, gravitational potential energy and kinetic energy, apply conservation of energy, compare power and evaluate efficiency and alternative energy sources in a Caribbean context.',
  prerequisites:['A3. weight and forces','A4. speed and velocity','A1. units, significant figures and graphs'],
  formulae:[
    {name:'Work',equation:'W = Fd',condition:'d is the displacement in the direction of the force',unit:'joule (J)'},
    {name:'Change in gravitational potential energy',equation:'ΔEp = mgh',condition:'h is the vertical change in height',unit:'joule (J)'},
    {name:'Kinetic energy',equation:'Ek = ½mv²',condition:'v is speed',unit:'joule (J)'},
    {name:'Power',equation:'P = E/t = W/t',condition:'energy transferred or work done per unit time',unit:'watt (W) = J s⁻¹'},
    {name:'Efficiency',equation:'efficiency = useful output / total input × 100%',condition:'compare energy with energy or power with power',unit:'%'},
  ],
  sections:[
    {
      id:'meaning-and-forms', heading:'1. Energy and its forms', objectives:['A5.1','A5.2'],
      paragraphs:[
        'Energy is the capacity to do work. Its SI unit is the joule, J. Energy is a scalar quantity.',
        'The syllabus names gravitational, elastic, chemical, electrical, magnetic, electromagnetic, thermal, nuclear, kinetic and sound energy. Use these names when identifying forms in an examination answer.',
        'Potential energy is associated with position, condition or configuration. Kinetic energy is associated with motion. Some syllabus energy labels describe a particular store or transfer pathway, so the safest examination response is the specific syllabus term that fits the situation.',
        'Light is electromagnetic radiation. In a CSEC energy-transformation answer, use electromagnetic energy where the syllabus asks for that form rather than inventing a separate physical category called light energy.'
      ],
      interactives:['Energy Form Sort: drag situations into the syllabus energy forms and explain the evidence for each choice'],
    },
    {
      id:'transformations', heading:'2. Energy transformations', objectives:['A5.3'],
      paragraphs:[
        'An energy transformation describes the starting form and the form or forms into which it changes. The syllabus limits these transformation descriptions to one-step or two-step chains.',
        'Examples include a battery-powered lamp: chemical → electrical → electromagnetic + thermal; a loudspeaker: electrical → sound + thermal; and a hydroelectric plant: gravitational potential → kinetic → electrical.',
        'The syllabus specifically tells students to note thermal energy as a product or by-product of transformations. In real devices, non-useful transfers commonly spread energy to the surroundings thermally because of resistance, friction and other dissipative processes.',
        'Energy is not used up or destroyed. It is transferred or transformed. If an output is described as wasted, that means it is not useful for the intended purpose, not that energy has ceased to exist.'
      ],
      interactives:['Energy Flow Builder: connect input, intermediate and output forms; SPARK rejects chains that create or destroy energy'],
    },
    {
      id:'work', heading:'3. Work and energy transfer', objectives:['A5.4'],
      paragraphs:[
        'Work is done by a force when the point of application of the force is displaced in the direction of the force. For the syllabus relationship, W = Fd, use the displacement parallel to the force.',
        'If there is no displacement, no mechanical work is done on the object by that force. If displacement is perpendicular to the force, that force does zero work on the object.',
        'When force and displacement are not parallel, only the component in the direction of the displacement contributes. This is why pulling at an angle transfers less energy than the same force acting fully along the motion.',
        'One joule is the work done when a force of one newton moves its point of application one metre in the direction of the force.'
      ],
      workedExamples:[
        {prompt:'A 25 N force moves a box 4.0 m in the direction of the force.',solution:'W = Fd = 25 × 4.0 = 100 J.'},
        {prompt:'A student carries a suitcase horizontally at constant height. What work is done against gravity?',solution:'Zero. Weight is vertical while the displacement is horizontal, so the displacement in the direction of weight is zero.'},
      ],
      interactives:['Work Explorer: vary force, displacement and angle and see the parallel component and work update'],
    },
    {
      id:'caribbean-energy', heading:'4. Alternative energy sources and the Caribbean', objectives:['A5.5'],
      paragraphs:[
        'The syllabus specifically includes hydroelectricity, geothermal energy, tidal and wave energy, solar energy, wind energy and nuclear energy when discussing alternative energy sources relevant to the Caribbean.',
        'Alternative does not automatically mean renewable. Solar, wind, hydro, geothermal, tidal and wave sources are renewable on human timescales; nuclear energy uses a finite fuel even though it can reduce fossil-fuel use during electricity generation.',
        'A strong Caribbean answer does more than list sources. Link the source to a regional condition, then discuss advantages and disadvantages. Solar energy can use strong year-round sunshine; wind can use suitable trade-wind locations; hydroelectricity depends on rainfall, elevation and river flow; geothermal resources are especially relevant to volcanic islands; tidal and wave systems depend on suitable coastal conditions.',
        'Important comparison factors include reliability, intermittency, storage or backup needs, land and ecosystem effects, construction cost, fuel imports, maintenance, grid size, safety and environmental impact.',
        'The syllabus also asks for more efficient and economical use of energy. Reducing avoidable losses and matching a source to local conditions are therefore part of the discussion, not separate from it.'
      ],
      interactives:['Caribbean Energy Planner: compare source cards against rainfall, volcanic setting, wind resource, coast, cost and reliability constraints without declaring one source best everywhere'],
    },
    {
      id:'potential', heading:'5. Potential energy and gravitational potential energy', objectives:['A5.6','A5.7'],
      paragraphs:[
        'Potential energy is energy a body or system has because of its position, condition or configuration. Examples in the syllabus include a battery, a stretched spring or elastic band, and an object on a shelf.',
        'For a mass moved through a vertical height h in a uniform gravitational field, the change in gravitational potential energy is ΔEp = mgh.',
        'Use the vertical change in height, not the length of a ramp or path. The reference level for potential energy is chosen, so exam questions usually ask for a change or gain/loss rather than an absolute value.'
      ],
      workedExamples:[
        {prompt:'A 2.5 kg load is raised vertically by 3.0 m. Take g = 10 N/kg.',solution:'ΔEp = mgh = 2.5 × 10 × 3.0 = 75 J.'},
      ],
      interactives:['GPE Ramp: change path shape while holding vertical height fixed and see that ΔEp stays the same'],
    },
    {
      id:'kinetic', heading:'6. Kinetic energy', objectives:['A5.8','A5.9'],
      paragraphs:[
        'Kinetic energy is the energy a body has because of its motion.',
        'For a body of mass m moving with speed v, Ek = ½mv². Speed is squared, so doubling speed multiplies kinetic energy by four while doubling mass only doubles kinetic energy.',
        'Kinetic energy is a scalar. The direction of velocity does not change the value of Ek because v is squared.'
      ],
      workedExamples:[
        {prompt:'A 1200 kg car travels at 20 m/s.',solution:'Ek = ½ × 1200 × 20² = 240 000 J = 240 kJ.'},
      ],
      interactives:['Kinetic Energy Comparator: vary mass and speed and compare which change affects Ek more'],
    },
    {
      id:'conservation', heading:'7. Conservation of energy', objectives:['A5.10'],
      paragraphs:[
        'The law of conservation of energy states that energy cannot be created or destroyed; it can be transferred or transformed. For a defined system, account for all important forms before and after.',
        'In an ideal falling or swinging system with negligible resistive forces, a decrease in gravitational potential energy can appear as an equal increase in kinetic energy. This allows mgh = ½mv² between suitable states.',
        'If friction, air resistance or another dissipative effect matters, do not set GPE lost equal to KE gained unless the non-useful transfer has been included. The missing mechanical energy appears in other forms, commonly thermal energy and sound.'
      ],
      workedExamples:[
        {prompt:'A 2.0 kg object falls through 5.0 m from rest. Ignore resistance and take g = 10 N/kg.',steps:['GPE lost = 2.0 × 10 × 5.0 = 100 J','KE gained = 100 J','½ × 2.0 × v² = 100','v = 10 m/s']},
        {prompt:'The same object loses 20 J to non-useful transfers.',solution:'Final KE = 100 - 20 = 80 J, so v = √(2×80/2) = 8.94 m/s.'},
      ],
      interactives:['Energy Bar Lab: move an object through a fall and track GPE, KE and dissipated energy while total energy stays constant'],
    },
    {
      id:'power', heading:'8. Power', objectives:['A5.11'],
      paragraphs:[
        'Power is the rate of doing work or the rate at which energy is transferred. P = E/t or W/t.',
        'The SI unit is the watt. One watt is one joule per second.',
        'Two machines can transfer the same amount of energy but have different powers if they take different times. Greater power means energy is transferred faster, not that more total energy must always be used.'
      ],
      workedExamples:[
        {prompt:'A 50 kg student climbs 4.0 m vertically in 5.0 s. Take g = 10 N/kg.',steps:['Energy transferred = mgh = 50 × 10 × 4.0 = 2000 J','P = E/t = 2000/5.0 = 400 W']},
      ],
      interactives:['Stair Power Challenge: enter mass, vertical height and time, then compare power without confusing it with total energy'],
    },
    {
      id:'efficiency', heading:'9. Efficiency', objectives:['A5.12','A5.13'],
      paragraphs:[
        'Efficiency tells us what fraction of the total input is converted into the useful output for the intended task.',
        'Efficiency = useful output / total input × 100%. You may compare energy with energy or power with power, but the numerator and denominator must represent the same kind of quantity.',
        'Efficiency cannot exceed 100%. A 100% value is an ideal limiting case in which all input is useful. Real devices normally have non-useful transfers, so their measured efficiencies are usually below 100%.',
        'Do not say energy is lost or destroyed. Say it is transferred to non-useful forms or to the surroundings. Whether an output is useful depends on the purpose of the device. Thermal output is useful for an electric heater but mainly non-useful for a lamp intended to produce visible light.'
      ],
      workedExamples:[
        {prompt:'A motor receives 800 J and produces 600 J of useful mechanical output.',solution:'efficiency = 600/800 × 100% = 75%.'},
        {prompt:'A device takes 500 W and provides 425 W useful output.',solution:'efficiency = 425/500 × 100% = 85%.'},
      ],
      interactives:['Efficiency Sankey Builder: allocate input energy among useful and non-useful outputs; SPARK blocks totals that violate conservation'],
    },
  ],
  objectiveCards:Object.freeze([
    card('A5.1','Energy is the capacity to do work. Its unit is the joule (J).','Connect energy to the ability to cause change or do work. Do not confuse energy with power, which is a rate.','Define energy and state its SI unit.','Power is not a synonym for energy.'),
    card('A5.2','Use the syllabus forms: gravitational, elastic, chemical, electrical, magnetic, electromagnetic, thermal, nuclear, kinetic and sound.','Identify the form from the physical situation rather than from everyday wording. Light belongs to electromagnetic radiation; motion gives kinetic energy; height in a gravitational field gives gravitational potential energy.','Name the form of energy stored in or transferred by a stated system.','Use specific syllabus terms rather than vague labels such as “movement energy”.'),
    card('A5.3','Write the starting form and the one-step or two-step transformation in the correct order.','Track where the energy comes from and where it goes. Include thermal energy when it is a product or by-product in the situation, as highlighted by the syllabus.','Describe the energy transformation(s) in a device or event.','Do not say energy disappears or is used up.'),
    card('A5.4','Work = force × displacement in the direction of the force.','The displacement used must be parallel to the force. No displacement means no mechanical work by that force.','Calculate work done or energy transferred by a force.','Do not use a path length that is not in the force direction.'),
    card('A5.5','Discuss Caribbean-relevant alternative sources by linking each source to conditions, advantages and disadvantages.','The syllabus includes hydroelectric, geothermal, tidal/wave, solar, wind and nuclear energy and asks about efficient and economical energy use.','Discuss alternative energy sources and their importance to the Caribbean.','A list of sources without Caribbean relevance or trade-offs is not a discussion.'),
    card('A5.6','Potential energy is energy due to position, condition or configuration.','Examples include a body at height, a stretched elastic object and chemical energy in a battery.','Define potential energy and give examples.','“Stored energy” alone is too vague unless the reason for the storage is stated.'),
    card('A5.7','ΔEp = mgh, where h is the vertical change in height.','Gravitational potential energy depends on vertical height change, not the distance travelled along a slope.','Calculate a gain or loss in gravitational potential energy.','Use kilograms for mass and the vertical height in metres.'),
    card('A5.8','Kinetic energy is the energy a body has because of its motion.','It depends on mass and especially on speed because speed is squared in the formula.','Define kinetic energy.','Do not confuse kinetic energy with momentum.'),
    card('A5.9','Calculate kinetic energy using Ek = ½mv².','Kinetic energy depends on mass and the square of speed. Square the speed before multiplying by half the mass, and convert grams to kilograms when SI units are required.','Calculate kinetic energy in joules.','Forgetting the square on v is a common error.'),
    card('A5.10','Total energy is conserved; account for every important transfer or transformation.','Ideal mechanical problems may exchange GPE and KE. With resistance, include the non-useful transfers instead of pretending mechanical energy alone is conserved.','Apply conservation of energy to a falling body, pendulum, swing or other transformation.','Do not write mgh = ½mv² when the question states significant losses unless those losses are accounted for.'),
    card('A5.11','Power is the rate of doing work or transferring energy: P = E/t.','Power distinguishes how quickly energy is transferred. One watt equals one joule per second.','Define power, state its unit, or calculate power from energy/work and time.','Joule is energy; watt is power.'),
    card('A5.12','Efficiency is the fraction of the input converted to useful output.','Non-useful energy is transferred elsewhere, often thermally. Efficiency cannot exceed 100%; real devices are normally below 100%.','Explain efficiency and why a real device may have efficiency below 100%.','Do not say energy is destroyed or simply disappears.'),
    card('A5.13','efficiency = useful output ÷ total input × 100%.','Use energy/energy or power/power. Identify which output is useful for the device before calculating.','Calculate efficiency from energy or power data.','Do not divide total input by useful output, and do not report a physically impossible value above 100% without recognizing inconsistent data.'),
  ]),
  commonMistakes:[
    'Confusing power with energy.',
    'Using the full path length in W = Fd when the force is not along the whole displacement.',
    'Using ramp length instead of vertical height in mgh.',
    'Forgetting to square speed in ½mv².',
    'Calling energy destroyed when it has been transferred to non-useful forms.',
    'Treating alternative and renewable as exact synonyms.',
    'Reversing useful output and total input in an efficiency calculation.',
    'Writing an efficiency greater than 100% without recognizing that the data or calculation must be wrong.'
  ],
  interactives:[
    'Energy Form Sort','Energy Flow Builder','Work Explorer','Caribbean Energy Planner','GPE Ramp','Kinetic Energy Comparator','Energy Bar Lab','Stair Power Challenge','Efficiency Sankey Builder'
  ],
});
