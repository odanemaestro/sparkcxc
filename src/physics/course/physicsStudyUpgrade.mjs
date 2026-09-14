// SPARK Physics study upgrade layer.
// The base lessons preserve the syllabus narrative. This layer adds concise CSEC-style
// exam preparation, worked examples, data handling and self-checks across all 25 topics.

const freezeEntry = entry => Object.freeze({
  examFocus: Object.freeze(entry.examFocus || []),
  workedExamples: Object.freeze((entry.workedExamples || []).map(item => Object.freeze({
    ...item,
    steps: Object.freeze(item.steps || []),
  }))),
  dataSkill: entry.dataSkill ? Object.freeze({
    ...entry.dataSkill,
    columns: Object.freeze(entry.dataSkill.columns || []),
    rows: Object.freeze((entry.dataSkill.rows || []).map(row => Object.freeze(row))),
  }) : null,
  quickChecks: Object.freeze((entry.quickChecks || []).map(item => Object.freeze(item))),
  examLanguage: entry.examLanguage || '',
});

export const PHYSICS_STUDY_UPGRADES = Object.freeze({
  A1: freezeEntry({
    examFocus: [
      'State a measured quantity with a unit and a sensible number of significant figures.',
      'Use a best-fit line rather than joining plotted points one by one.',
      'Separate random error, systematic error and a limitation of the method when evaluating an experiment.',
    ],
    workedExamples: [{
      title: 'Density from displacement',
      prompt: 'A metal object has mass 156 g. The water level rises from 42 cm³ to 62 cm³ when the object is immersed. Calculate its density.',
      steps: ['Volume of object = 62 - 42 = 20 cm³.', 'Density = mass / volume = 156 / 20.', 'Density = 7.8 g/cm³.'],
      answer: '7.8 g/cm³',
    }],
    dataSkill: {
      title: 'Pendulum data and graph choice',
      prompt: 'For a simple pendulum investigation, calculate T from t/20 and plot T² against length, l. A straight trend is easier to test than a curved T against l graph.',
      columns: ['l / m', 'time for 20 oscillations / s', 'T / s', 'T² / s²'],
      rows: [['0.25', '20.2', '1.01', '1.02'], ['0.40', '25.4', '1.27', '1.61'], ['0.64', '32.0', '1.60', '2.56']],
    },
    quickChecks: [
      { question: 'Why time 20 oscillations instead of one?', answer: 'The total time is longer, so the percentage uncertainty from reaction time is smaller.' },
      { question: 'What is the gradient of a graph?', answer: 'Change in the vertical quantity divided by the corresponding change in the horizontal quantity, using two well-separated points on the best-fit line.' },
    ],
    examLanguage: 'When the question says determine, show the measurement or calculation. When it says evaluate, identify a limitation and explain how it affects the result or how to reduce it.',
  }),
  A2: freezeEntry({
    examFocus: [
      'State whether a quantity is scalar or vector by referring to magnitude and direction.',
      'Use a scale and direction consistently in vector diagrams.',
      'Resolve a vector into perpendicular components before combining components.',
    ],
    workedExamples: [{
      title: 'Perpendicular resultant',
      prompt: 'A student walks 6 m east and then 8 m north. Find the magnitude of the displacement.',
      steps: ['The two displacements are perpendicular.', 'R² = 6² + 8² = 100.', 'R = 10 m.'],
      answer: '10 m, directed north of east.',
    }],
    dataSkill: {
      title: 'Scale-diagram check',
      prompt: 'If 1 cm represents 2 N, a 6 N vector must be drawn 3 cm long. Write the scale beside the diagram before measuring the resultant.',
      columns: ['Vector', 'Magnitude', 'Scale length'],
      rows: [['P', '6 N', '3.0 cm'], ['Q', '8 N', '4.0 cm']],
    },
    quickChecks: [
      { question: 'Is speed a vector?', answer: 'No. Speed has magnitude only. Velocity has magnitude and direction.' },
      { question: 'Two equal opposite vectors act along one line. What is the resultant?', answer: 'Zero.' },
    ],
    examLanguage: 'For a vector answer, include a direction unless the question asks only for magnitude.',
  }),
  A3: freezeEntry({
    examFocus: [
      'Use moment = force × perpendicular distance from the pivot.',
      'State the principle of moments using clockwise and anticlockwise moments about the same pivot.',
      'For Hooke law work, distinguish force from mass and identify the straight-line proportional region.',
    ],
    workedExamples: [{
      title: 'Balancing moments',
      prompt: 'A 12 N force acts 0.30 m from a pivot. What force at 0.20 m on the other side balances the beam?',
      steps: ['Clockwise moment = 12 × 0.30 = 3.6 N m.', 'For equilibrium, anticlockwise moment = 3.6 N m.', 'F × 0.20 = 3.6, so F = 18 N.'],
      answer: '18 N',
    }, {
      title: 'Spring constant',
      prompt: 'A spring extends 4.0 cm under a force of 6.0 N in its proportional region. Find k.',
      steps: ['Convert extension: 4.0 cm = 0.040 m.', 'F = kx, so k = F/x.', 'k = 6.0/0.040 = 150 N/m.'],
      answer: '150 N/m',
    }],
    dataSkill: {
      title: 'Force-extension evidence',
      prompt: 'Plot force against extension. The gradient equals k when force is on the vertical axis and extension is on the horizontal axis.',
      columns: ['F / N', 'extension / m'],
      rows: [['1.0', '0.010'], ['2.0', '0.020'], ['3.0', '0.030'], ['4.0', '0.040']],
    },
    quickChecks: [
      { question: 'What makes a force produce a larger moment?', answer: 'A larger force or a larger perpendicular distance from the pivot.' },
      { question: 'Why is a low centre of gravity usually more stable?', answer: 'A greater tilt is needed before the line of action of the weight falls outside the base.' },
    ],
    examLanguage: 'Use perpendicular distance in moment calculations. A distance measured along a sloping force line is not automatically the moment arm.',
  }),
  A4: freezeEntry({
    examFocus: [
      'Keep distance and displacement separate, and speed and velocity separate.',
      'Read gradient as velocity on a displacement-time graph and acceleration on a velocity-time graph.',
      'Use signed momentum when objects move in opposite directions.',
    ],
    workedExamples: [{
      title: 'Velocity-time graph',
      prompt: 'A car increases speed uniformly from 4 m/s to 16 m/s in 6 s. Find the acceleration and displacement during this interval.',
      steps: ['Acceleration = (16 - 4)/6 = 2 m/s².', 'Displacement is area under the velocity-time graph.', 'Area = average velocity × time = (4 + 16)/2 × 6 = 60 m.'],
      answer: 'Acceleration 2 m/s², displacement 60 m.',
    }],
    dataSkill: {
      title: 'Graph interpretation',
      prompt: 'On a velocity-time graph, a section below the time axis represents motion in the chosen negative direction. Its area contributes negative displacement but positive distance.',
      columns: ['Interval', 'Velocity sign', 'Displacement sign'],
      rows: [['0-4 s', 'positive', 'positive'], ['4-7 s', 'negative', 'negative']],
    },
    quickChecks: [
      { question: 'A body moves at constant velocity. What is the resultant force?', answer: 'Zero, by Newton’s first law.' },
      { question: 'What is momentum?', answer: 'Mass × velocity, p = mv, with direction inherited from velocity.' },
    ],
    examLanguage: 'If a graph question asks for distance, add the magnitudes of areas. If it asks for displacement, preserve the signs.',
  }),
  A5: freezeEntry({
    examFocus: [
      'Track energy stores and transfers without saying energy is used up or lost.',
      'Use Ep = mgh and Ek = ½mv² with SI units.',
      'Distinguish energy from power and express efficiency as useful output divided by total input.',
    ],
    workedExamples: [{
      title: 'Energy and efficiency',
      prompt: 'A 2.0 kg load is raised 5.0 m using 125 J of electrical energy. Take g = 10 N/kg. Calculate the efficiency.',
      steps: ['Useful gravitational potential energy = mgh = 2.0 × 10 × 5.0 = 100 J.', 'Efficiency = useful/input × 100%.', 'Efficiency = 100/125 × 100% = 80%.'],
      answer: '80%',
    }],
    dataSkill: {
      title: 'Caribbean energy comparison',
      prompt: 'When comparing energy sources, use evidence such as reliability, local availability, environmental effects, cost and storage rather than naming a source as simply good or bad.',
      columns: ['Source', 'Strength', 'Limitation'],
      rows: [['Solar', 'Strong regional resource', 'Intermittent'], ['Wind', 'No fuel cost', 'Variable output'], ['Hydroelectric', 'Reliable where water is available', 'Site dependent']],
    },
    quickChecks: [
      { question: 'What is the SI unit of power?', answer: 'Watt, W, equal to joule per second.' },
      { question: 'Can an efficiency exceed 100%?', answer: 'No. Useful output cannot exceed the total input energy.' },
    ],
    examLanguage: 'For energy transformations, name the starting store or input and the useful and non-useful outputs.',
  }),
  A6: freezeEntry({
    examFocus: [
      'Use pressure = force/area and convert areas to m² when SI units are required.',
      'Relate liquid pressure to depth and density, not to the shape of the container.',
      'Compare upthrust with weight to predict whether an object rises, sinks or remains in equilibrium.',
    ],
    workedExamples: [{
      title: 'Pressure in a liquid',
      prompt: 'Find the gauge pressure 3.0 m below the surface of water of density 1000 kg/m³. Take g = 10 N/kg.',
      steps: ['p = ρgh.', 'p = 1000 × 10 × 3.0.', 'p = 30 000 Pa = 30 kPa.'],
      answer: '30 kPa',
    }],
    dataSkill: {
      title: 'Pressure-depth trend',
      prompt: 'For one liquid, a graph of pressure against depth is straight through the origin if atmospheric pressure is excluded. A steeper line indicates a denser liquid.',
      columns: ['Depth / m', 'Gauge pressure / kPa'],
      rows: [['0.5', '5'], ['1.0', '10'], ['1.5', '15']],
    },
    quickChecks: [
      { question: 'Why does a sharp knife cut more easily?', answer: 'The same force acts over a smaller area, producing greater pressure.' },
      { question: 'State Archimedes’ principle.', answer: 'The upthrust on an immersed body equals the weight of fluid displaced.' },
    ],
    examLanguage: 'When asked why an object floats, compare forces or average density. Do not say it floats only because it is light.',
  }),
  B1: freezeEntry({
    examFocus: [
      'Contrast caloric theory with the kinetic view of thermal energy.',
      'Use Rumford and Joule as experimental evidence, not as names to memorise without explanation.',
      'Connect mechanical work and heating through conservation of energy.',
    ],
    workedExamples: [{
      title: 'Mechanical work converted to thermal energy',
      prompt: 'A 3.0 kg mass falls 4.0 m. Take g = 10 N/kg. If 80% of the lost gravitational potential energy heats water, how much thermal energy reaches the water?',
      steps: ['Energy released = mgh = 3.0 × 10 × 4.0 = 120 J.', 'Thermal energy to water = 0.80 × 120.', 'Energy to water = 96 J.'],
      answer: '96 J',
    }],
    dataSkill: {
      title: 'Evidence versus explanation',
      prompt: 'Separate an observation from the conclusion drawn from it.',
      columns: ['Observation', 'Inference'],
      rows: [['Continuous boring keeps producing heat', 'Heat is not a finite stored fluid'], ['Known work gives a repeatable temperature rise', 'Mechanical work and thermal energy are equivalent energy transfers']],
    },
    quickChecks: [
      { question: 'Why did continuous heat production challenge caloric theory?', answer: 'A finite material store of caloric should eventually have been exhausted.' },
      { question: 'What did Joule’s work support?', answer: 'Energy is conserved while changing from mechanical to thermal forms.' },
    ],
    examLanguage: 'For questions that ask you to discuss, state the observation and explain what it shows about the theory.',
  }),
  B2: freezeEntry({
    examFocus: [
      'Use kelvin in gas-law calculations and convert with T/K = θ/°C + 273.',
      'Keep the controlled variable clear for Boyle’s law, Charles’ law and pressure law.',
      'Explain gas laws using molecular collisions and particle motion.',
    ],
    workedExamples: [{
      title: 'Boyle’s law',
      prompt: 'A gas occupies 300 cm³ at 100 kPa. Its temperature stays constant while the volume falls to 120 cm³. Find the new pressure.',
      steps: ['At constant temperature, p₁V₁ = p₂V₂.', 'p₂ = 100 × 300 / 120.', 'p₂ = 250 kPa.'],
      answer: '250 kPa',
    }, {
      title: 'Celsius to kelvin',
      prompt: 'Convert 27 °C to kelvin.',
      steps: ['T = 27 + 273.', 'T = 300 K.'],
      answer: '300 K',
    }],
    dataSkill: {
      title: 'Absolute-zero graph',
      prompt: 'A straight pressure-temperature or volume-temperature graph can be extrapolated toward zero at about -273 °C. This is evidence for the Kelvin scale, not a claim that the gas remains ideal all the way to that temperature.',
      columns: ['Temperature / °C', 'Relative pressure'],
      rows: [['-100', '0.63'], ['0', '1.00'], ['100', '1.37']],
    },
    quickChecks: [
      { question: 'Why must kelvin be used in gas-law ratios?', answer: 'Kelvin is an absolute temperature scale with zero corresponding to the extrapolated minimum thermal state.' },
      { question: 'Why does pressure rise when a sealed gas is heated at constant volume?', answer: 'Particles move faster and collide with the walls more frequently and with greater momentum change.' },
    ],
    examLanguage: 'State the condition, such as constant temperature or constant pressure, before applying a gas law.',
  }),
  B3: freezeEntry({
    examFocus: [
      'Distinguish heat capacity from specific heat capacity.',
      'Use E = mcΔT for temperature change and E = mL for phase change.',
      'During a phase change, explain where the energy goes when temperature remains constant.',
    ],
    workedExamples: [{
      title: 'Specific heat capacity',
      prompt: 'A 0.50 kg metal block receives 18 000 J and rises by 40 K. Calculate c.',
      steps: ['E = mcΔT.', 'c = E/(mΔT) = 18 000/(0.50 × 40).', 'c = 900 J/(kg K).'],
      answer: '900 J/(kg K)',
    }, {
      title: 'Specific latent heat',
      prompt: '84 kJ melts 0.25 kg of ice at 0 °C. Calculate the specific latent heat of fusion.',
      steps: ['E = mL.', 'L = E/m = 84 000/0.25.', 'L = 336 000 J/kg.'],
      answer: '3.36 × 10^5 J/kg',
    }],
    dataSkill: {
      title: 'Heating curve',
      prompt: 'Horizontal regions represent phase change. Sloping regions represent temperature change within one phase.',
      columns: ['Stage', 'Temperature behaviour', 'Energy effect'],
      rows: [['Solid warming', 'rises', 'particle kinetic energy increases'], ['Melting', 'constant', 'particle arrangement changes'], ['Liquid warming', 'rises', 'particle kinetic energy increases']],
    },
    quickChecks: [
      { question: 'Why is the measured c of a metal often higher than the accepted value in a simple electrical experiment?', answer: 'If heat loss is ignored, the supplied electrical energy is assumed to heat only the block, which distorts the calculated value. Energy also warms the heater, thermometer and surroundings.' },
      { question: 'How is evaporation different from boiling?', answer: 'Evaporation occurs at the surface and can happen below boiling point. Boiling occurs throughout the liquid at a fixed boiling temperature for a given pressure.' },
    ],
    examLanguage: 'Write ΔT as final minus initial temperature. A temperature difference has the same numerical value in kelvin and degrees Celsius.',
  }),
  B4: freezeEntry({
    examFocus: [
      'Describe conduction, convection and radiation using the correct physical mechanism.',
      'Relate dull black and shiny surfaces to both absorption and emission.',
      'Apply thermal-transfer principles to insulation, ventilation and device design.',
    ],
    workedExamples: [{
      title: 'Choosing a surface',
      prompt: 'A solar-water-heater absorber should take in radiant energy efficiently. Which surface finish is preferred and why?',
      steps: ['A good absorber is required.', 'Dull black surfaces are strong absorbers of thermal radiation.', 'Use a dull black absorber surface.'],
      answer: 'Dull black.',
    }],
    dataSkill: {
      title: 'Cooling comparison',
      prompt: 'To compare surface emission fairly, use containers with the same size, material, starting temperature and volume of water. Change only the surface finish.',
      columns: ['Time / min', 'Dull black / °C', 'Shiny / °C'],
      rows: [['0', '80', '80'], ['5', '70', '75'], ['10', '62', '71']],
    },
    quickChecks: [
      { question: 'Why does convection not occur in solids?', answer: 'The particles in a solid are not free to move in bulk and form circulating currents.' },
      { question: 'Which thermal-transfer process does not need a medium?', answer: 'Radiation.' },
    ],
    examLanguage: 'For a design question, identify the feature, name the transfer process it affects and explain the effect.',
  }),
  C1: freezeEntry({
    examFocus: [
      'Distinguish transverse and longitudinal waves by particle vibration relative to wave travel.',
      'Use v = fλ and T = 1/f with consistent units.',
      'Read wavelength from displacement-position graphs and period from displacement-time graphs.',
    ],
    workedExamples: [{
      title: 'Wave equation',
      prompt: 'A wave has frequency 25 Hz and wavelength 1.6 m. Find its speed.',
      steps: ['v = fλ.', 'v = 25 × 1.6.', 'v = 40 m/s.'],
      answer: '40 m/s',
    }],
    dataSkill: {
      title: 'Know the horizontal axis',
      prompt: 'The same-looking sinusoidal shape can show different information. Read the axis label before naming the interval.',
      columns: ['Graph', 'Crest-to-crest interval'],
      rows: [['displacement-position', 'wavelength, λ'], ['displacement-time', 'period, T']],
    },
    quickChecks: [
      { question: 'What does amplitude measure?', answer: 'Maximum displacement from the equilibrium position.' },
      { question: 'In a longitudinal wave, how do particles vibrate?', answer: 'Parallel to the direction in which the wave travels.' },
    ],
    examLanguage: 'Do not label the horizontal spacing as wavelength unless the horizontal axis represents position or distance.',
  }),
  C2: freezeEntry({
    examFocus: [
      'Link pitch to frequency and loudness to amplitude.',
      'For an echo, use the round-trip distance and divide by two when finding the distance to the reflector.',
      'Use reflection, refraction, diffraction and interference examples accurately.',
    ],
    workedExamples: [{
      title: 'Echo distance',
      prompt: 'An echo returns 0.60 s after a sharp sound. Take the speed of sound as 340 m/s. Find the distance to the wall.',
      steps: ['Total distance travelled = vt = 340 × 0.60 = 204 m.', 'The sound travels to the wall and back.', 'Distance to wall = 204/2 = 102 m.'],
      answer: '102 m',
    }],
    dataSkill: {
      title: 'Reducing timing uncertainty',
      prompt: 'Use a long measured distance and repeat several timings. Average the results before calculating the speed.',
      columns: ['Trial', 'Echo time / s'],
      rows: [['1', '0.58'], ['2', '0.60'], ['3', '0.59']],
    },
    quickChecks: [
      { question: 'What is ultrasound?', answer: 'Sound with frequency above the upper limit of human hearing, about 20 kHz.' },
      { question: 'Why can sound be heard around a corner?', answer: 'Sound diffracts around openings and obstacles.' },
    ],
    examLanguage: 'A high-pitched sound is not necessarily loud. Treat frequency and amplitude as separate properties.',
  }),
  C3: freezeEntry({
    examFocus: [
      'State common properties of all electromagnetic waves.',
      'Order the spectrum correctly by wavelength or frequency.',
      'Match each region with a realistic source, use and hazard where relevant.',
    ],
    workedExamples: [{
      title: 'Frequency from wavelength',
      prompt: 'An electromagnetic wave has wavelength 0.50 m. Use c = 3.0 × 10^8 m/s to calculate its frequency.',
      steps: ['c = fλ.', 'f = c/λ = 3.0 × 10^8 / 0.50.', 'f = 6.0 × 10^8 Hz.'],
      answer: '6.0 × 10^8 Hz',
    }],
    dataSkill: {
      title: 'Spectrum direction',
      prompt: 'As wavelength decreases across the spectrum, frequency increases because c = fλ in vacuum.',
      columns: ['Long wavelength', 'Middle', 'Short wavelength'],
      rows: [['radio', 'infrared / visible', 'ultraviolet / X-ray / gamma']],
    },
    quickChecks: [
      { question: 'Do electromagnetic waves require a material medium?', answer: 'No. They travel through vacuum.' },
      { question: 'Which travels faster in vacuum, radio waves or gamma rays?', answer: 'Neither. All electromagnetic waves travel at the same speed in vacuum.' },
    ],
    examLanguage: 'If asked for a use, name the region and the specific application. Avoid vague answers such as communication without identifying how.',
  }),
  C4: freezeEntry({
    examFocus: [
      'Measure angles from the normal, not from the surface.',
      'Use Snell’s law with the correct incident and refracted media.',
      'State both conditions for total internal reflection.',
    ],
    workedExamples: [{
      title: 'Snell’s law',
      prompt: 'Light travels from air into glass. The angle of incidence is 40° and the angle of refraction is 25°. Calculate the refractive index of the glass relative to air.',
      steps: ['n = sin i / sin r.', 'n = sin 40° / sin 25°.', 'n ≈ 1.52.'],
      answer: '1.52',
    }],
    dataSkill: {
      title: 'Refraction graph',
      prompt: 'A graph of sin i against sin r should be approximately straight. Its gradient gives the refractive index for light entering the material from air.',
      columns: ['i / °', 'r / °', 'sin i', 'sin r'],
      rows: [['20', '13', '0.342', '0.225'], ['40', '25', '0.643', '0.423'], ['60', '35', '0.866', '0.574']],
    },
    quickChecks: [
      { question: 'When does total internal reflection occur?', answer: 'Light must travel from a more optically dense medium toward a less optically dense medium and the angle of incidence must exceed the critical angle.' },
      { question: 'What is the image in a plane mirror like?', answer: 'Virtual, upright, same size, laterally inverted and as far behind the mirror as the object is in front.' },
    ],
    examLanguage: 'Draw and label the normal before marking angles. This prevents the most common reflection and refraction error.',
  }),
  C5: freezeEntry({
    examFocus: [
      'Use standard principal rays to construct lens images.',
      'Distinguish real images from virtual images by whether rays actually meet.',
      'Use magnification = image height/object height and the lens relationships required by the question.',
    ],
    workedExamples: [{
      title: 'Magnification',
      prompt: 'An object 2.0 cm high forms a real image 6.0 cm high. Calculate the magnification.',
      steps: ['magnification = image height / object height.', 'm = 6.0/2.0.', 'm = 3.0.'],
      answer: '3.0',
    }],
    dataSkill: {
      title: 'Focal-length practical',
      prompt: 'Take several object-distance and image-distance pairs rather than relying on one reading. Calculate a focal length for each pair and compare the spread.',
      columns: ['u / cm', 'v / cm', 'f / cm'],
      rows: [['30', '20', '12.0'], ['40', '17', '11.9'], ['50', '16', '12.1']],
    },
    quickChecks: [
      { question: 'What happens to parallel rays through a converging lens?', answer: 'They converge at the principal focus on the far side of the lens.' },
      { question: 'Can a virtual image be formed on a screen?', answer: 'No, because the light rays do not actually meet at the virtual-image position.' },
    ],
    examLanguage: 'On a ray diagram, use a ruler and show arrowheads so the direction of travel is clear.',
  }),
  D1: freezeEntry({
    examFocus: [
      'Describe charging as transfer or redistribution of electrons.',
      'Use attraction and repulsion evidence carefully, since a charged object can attract a neutral object by induction.',
      'Draw electric field direction as the direction a positive test charge would move.',
    ],
    workedExamples: [{
      title: 'Charging by induction',
      prompt: 'A negatively charged rod approaches a neutral metal sphere. Explain the first change inside the sphere.',
      steps: ['Electrons in the sphere are repelled by the negative rod.', 'They move toward the far side of the sphere.', 'The near side is left with a net positive region while the sphere remains neutral overall until earthing changes the total charge.'],
      answer: 'Charge separation occurs before any net charging.',
    }],
    dataSkill: {
      title: 'Field-line rules',
      prompt: 'Field lines start on positive charge and end on negative charge. Closer lines represent stronger field regions. Field lines do not cross.',
      columns: ['Feature', 'Meaning'],
      rows: [['arrow direction', 'force on positive test charge'], ['line spacing', 'relative field strength']],
    },
    quickChecks: [
      { question: 'Do protons move from one solid object to another during ordinary charging?', answer: 'No. Electrons are transferred or redistributed.' },
      { question: 'Give one useful static-charge application.', answer: 'Examples include electrostatic painting, photocopiers or electrostatic precipitators.' },
    ],
    examLanguage: 'Say electrons move. Avoid saying positive charge flows through ordinary solid materials during frictional charging.',
  }),
  D2: freezeEntry({
    examFocus: [
      'State that current in metals is due to moving electrons while conventional current is defined in the opposite direction.',
      'Use Q = It with current in amperes and time in seconds.',
      'Read period and peak values from alternating-current graphs before calculating frequency.',
    ],
    workedExamples: [{
      title: 'Charge transfer',
      prompt: 'A current of 0.40 A flows for 3.0 minutes. Find the charge transferred.',
      steps: ['Convert time: 3.0 min = 180 s.', 'Q = It.', 'Q = 0.40 × 180 = 72 C.'],
      answer: '72 C',
    }],
    dataSkill: {
      title: 'A.C. graph',
      prompt: 'Measure the time for one complete cycle to get the period, T. Then use f = 1/T.',
      columns: ['Period / s', 'Frequency / Hz'],
      rows: [['0.020', '50'], ['0.010', '100']],
    },
    quickChecks: [
      { question: 'What is the SI unit of charge?', answer: 'Coulomb, C.' },
      { question: 'How does direct current differ from alternating current?', answer: 'Direct current keeps one direction. Alternating current repeatedly changes direction.' },
    ],
    examLanguage: 'Convert minutes or milliseconds before substituting into Q = It.',
  }),
  D3: freezeEntry({
    examFocus: [
      'Use V = E/Q as energy transferred per unit charge.',
      'Use P = IV and combine with time when electrical energy is required.',
      'Explain conservation measures using both reduced energy use and reduced waste.',
    ],
    workedExamples: [{
      title: 'Electrical energy',
      prompt: 'A 12 V device draws 2.5 A for 4.0 minutes. Calculate the electrical energy transferred.',
      steps: ['Power = IV = 12 × 2.5 = 30 W.', 'Time = 4.0 min = 240 s.', 'Energy = Pt = 30 × 240 = 7200 J.'],
      answer: '7200 J',
    }],
    dataSkill: {
      title: 'Appliance comparison',
      prompt: 'Energy use depends on both power and operating time. A lower-power device used much longer may consume more energy.',
      columns: ['Device', 'Power', 'Time', 'Energy'],
      rows: [['lamp', '10 W', '5 h', '50 Wh'], ['kettle', '2000 W', '3 min', '100 Wh']],
    },
    quickChecks: [
      { question: 'What does 1 V mean?', answer: '1 joule of energy transferred per coulomb of charge.' },
      { question: 'What is electrical power?', answer: 'The rate of electrical energy transfer.' },
    ],
    examLanguage: 'When calculating energy from power, use a time unit consistent with the required energy unit.',
  }),
  D4: freezeEntry({
    examFocus: [
      'Place an ammeter in series and a voltmeter in parallel.',
      'Use a V-I graph to test ohmic behaviour and determine resistance.',
      'Combine resistors correctly and apply domestic safety rules using operating current.',
    ],
    workedExamples: [{
      title: 'Resistance from a V-I graph',
      prompt: 'A straight V-I graph passes through I = 0.50 A, V = 6.0 V. Find the resistance.',
      steps: ['For V on the vertical axis and I on the horizontal axis, gradient = ΔV/ΔI.', 'R = 6.0/0.50.', 'R = 12 Ω.'],
      answer: '12 Ω',
    }, {
      title: 'Fuse selection',
      prompt: 'A 230 V appliance is rated 920 W. Find the operating current and select the smallest suitable fuse from 3 A, 5 A and 13 A.',
      steps: ['I = P/V = 920/230 = 4.0 A.', 'Choose a fuse just above the normal operating current.', '5 A is suitable.'],
      answer: '4.0 A operating current, 5 A fuse.',
    }],
    dataSkill: {
      title: 'V-I practical',
      prompt: 'Record several V and I pairs. Plot V vertically against I horizontally. A straight line through the origin supports constant resistance at constant temperature.',
      columns: ['I / A', 'V / V'],
      rows: [['0.10', '1.2'], ['0.20', '2.4'], ['0.30', '3.6'], ['0.40', '4.8']],
    },
    quickChecks: [
      { question: 'Why must an ammeter have very low resistance?', answer: 'So inserting it in series changes the circuit current as little as possible.' },
      { question: 'Why are domestic appliances connected in parallel?', answer: 'Each receives the full supply potential difference and operates independently.' },
    ],
    examLanguage: 'State meter placement and resistance together when explaining ammeter or voltmeter design.',
  }),
  D5: freezeEntry({
    examFocus: [
      'Recognise diode direction and describe half-wave rectification from the output waveform.',
      'Build truth tables systematically for combined logic gates.',
      'Give balanced social impacts of technology with specific examples.',
    ],
    workedExamples: [{
      title: 'Logic sequence',
      prompt: 'Inputs A = 1 and B = 0 enter an AND gate, then the result passes through a NOT gate. Find the final output.',
      steps: ['AND output = 1 AND 0 = 0.', 'NOT changes 0 to 1.', 'Final output = 1.'],
      answer: '1',
    }],
    dataSkill: {
      title: 'Half-wave output',
      prompt: 'A single diode passes one polarity of the A.C. cycle and blocks the other, so the output is pulsating direct current rather than smooth battery D.C.',
      columns: ['Input half-cycle', 'Diode state', 'Output'],
      rows: [['forward biased', 'conducts', 'pulse present'], ['reverse biased', 'blocks', 'approximately zero']],
    },
    quickChecks: [
      { question: 'What does a NOT gate do?', answer: 'It inverts the input, changing 1 to 0 and 0 to 1.' },
      { question: 'Is rectified A.C. identical to a steady battery output?', answer: 'No. Half-wave rectified output is one-directional but pulsating.' },
    ],
    examLanguage: 'For combined gates, write the output after each gate. Do not try to guess the final result in one step.',
  }),
  D6: freezeEntry({
    examFocus: [
      'Distinguish magnetic materials from permanent-magnet and temporary-magnet materials.',
      'Use attraction and repulsion correctly when identifying poles.',
      'Map field direction with a plotting compass and show arrows from north to south outside a magnet.',
    ],
    workedExamples: [{
      title: 'Identifying an unknown pole',
      prompt: 'The north pole of a known magnet repels one end of an unknown magnet. Identify the unknown end.',
      steps: ['Like poles repel.', 'The known pole is north.', 'The unknown end must also be north.'],
      answer: 'North pole.',
    }],
    dataSkill: {
      title: 'Field mapping',
      prompt: 'Move a plotting compass step by step. Mark the direction of the north-seeking end, then join the marks into smooth field lines.',
      columns: ['Observation', 'Meaning'],
      rows: [['compass points tangent to line', 'local field direction'], ['lines are closer together', 'stronger field']],
    },
    quickChecks: [
      { question: 'Can attraction alone prove that an object is a magnet?', answer: 'No. A magnet can attract an unmagnetised magnetic material. Repulsion is the sure test for two magnetic poles.' },
      { question: 'Why is soft iron used for temporary electromagnets?', answer: 'It magnetises strongly and loses most of its magnetism when the field is removed.' },
    ],
    examLanguage: 'Use repulsion as the decisive test when identifying a magnetic pole.',
  }),
  D7: freezeEntry({
    examFocus: [
      'Use the correct hand rule for current-field direction and Fleming’s left-hand rule for motor force.',
      'State factors that increase induced e.m.f. and distinguish induction from the motor effect.',
      'Use transformer turns ratio and conservation of power for an ideal transformer.',
    ],
    workedExamples: [{
      title: 'Ideal transformer',
      prompt: 'A transformer has 500 turns on the primary and 100 turns on the secondary. The primary voltage is 230 V. Find the secondary voltage.',
      steps: ['Vs/Vp = Ns/Np.', 'Vs = 230 × 100/500.', 'Vs = 46 V.'],
      answer: '46 V',
    }, {
      title: 'Increasing induced e.m.f.',
      prompt: 'State two ways to increase the induced e.m.f. in a coil.',
      steps: ['Increase the rate of change of magnetic flux, for example move the magnet faster.', 'Increase field strength or number of turns.'],
      answer: 'Any two valid factors affecting rate of flux linkage change.',
    }],
    dataSkill: {
      title: 'Induction evidence',
      prompt: 'Compare deflection while changing one factor at a time. Reversing the motion reverses the induced-current direction.',
      columns: ['Motion', 'Relative speed', 'Meter response'],
      rows: [['magnet in', 'slow', 'small one direction'], ['magnet in', 'fast', 'larger same direction'], ['magnet out', 'fast', 'larger opposite direction']],
    },
    quickChecks: [
      { question: 'Why is high voltage used for long-distance A.C. transmission?', answer: 'For the same power, higher voltage means lower current, which reduces I²R heating losses in the cables.' },
      { question: 'What causes the force on a current-carrying conductor in a magnetic field?', answer: 'Interaction between the conductor’s magnetic field and the external magnetic field.' },
    ],
    examLanguage: 'Name the effect before applying a rule. Motor effect and electromagnetic induction are related topics but opposite processes.',
  }),
  E1: freezeEntry({
    examFocus: [
      'Link each atomic model to the evidence that forced the model to change.',
      'Describe the Geiger-Marsden observations before stating Rutherford’s conclusions.',
      'Use proportions such as most, some and very few accurately when describing scattering.',
    ],
    workedExamples: [{
      title: 'From observation to model',
      prompt: 'Very few alpha particles were deflected through large angles in the Geiger-Marsden experiment. What did Rutherford infer?',
      steps: ['Large deflections require a strong repulsive interaction.', 'Because only very few particles experience it, the responsible region occupies very little of the atom.', 'Positive charge and most mass are concentrated in a tiny nucleus.'],
      answer: 'The atom has a very small, dense, positively charged nucleus.',
    }],
    dataSkill: {
      title: 'Scattering evidence',
      prompt: 'Use frequency of each observation to support the atomic structure conclusion.',
      columns: ['Observation', 'Conclusion'],
      rows: [['most pass straight through', 'atom is mostly empty space'], ['some deflect slightly', 'positive charge affects passing alpha particles'], ['very few rebound', 'tiny dense positive nucleus']],
    },
    quickChecks: [
      { question: 'Why did the plum-pudding model fail?', answer: 'It could not explain the rare large-angle alpha-particle deflections.' },
      { question: 'What charge does an alpha particle have?', answer: '+2e.' },
    ],
    examLanguage: 'Do not jump straight to the nuclear model. CXC often awards separate marks for observation and inference.',
  }),
  E2: freezeEntry({
    examFocus: [
      'Use A = Z + N to move between mass number, proton number and neutron number.',
      'Distinguish atoms, ions and isotopes using proton and electron counts.',
      'Connect electron-shell occupancy with period and, for simple main-group examples, outer electrons with group behaviour.',
    ],
    workedExamples: [{
      title: 'Nuclear composition',
      prompt: 'An isotope is written with mass number 37 and atomic number 17. It has a charge of -1. Find protons, neutrons and electrons.',
      steps: ['Protons = Z = 17.', 'Neutrons = A - Z = 37 - 17 = 20.', 'A -1 ion has gained one electron, so electrons = 18.'],
      answer: '17 protons, 20 neutrons, 18 electrons.',
    }],
    dataSkill: {
      title: 'Isotope comparison',
      prompt: 'Isotopes have the same proton number but different neutron numbers. Their chemical behaviour is similar because neutral atoms have the same electron arrangement.',
      columns: ['Nuclide', 'Protons', 'Neutrons'],
      rows: [['carbon-12', '6', '6'], ['carbon-14', '6', '8']],
    },
    quickChecks: [
      { question: 'Why is a neutral atom electrically neutral?', answer: 'It has equal numbers of positively charged protons and negatively charged electrons.' },
      { question: 'What changes when a positive ion forms?', answer: 'Electrons are lost. The nucleus does not lose protons in ordinary ion formation.' },
    ],
    examLanguage: 'For neutron number, write N = A - Z before substituting. This avoids confusing mass number with proton number.',
  }),
  E3: freezeEntry({
    examFocus: [
      'Compare alpha, beta and gamma using charge, mass, ionising ability, penetration and field deflection.',
      'Balance mass number and atomic number separately in nuclear equations.',
      'Treat half-life as a statistical property of a large sample, not a prediction for one nucleus.',
    ],
    workedExamples: [{
      title: 'Half-life',
      prompt: 'A sample has activity 1600 Bq and a half-life of 6 h. Find the activity after 18 h.',
      steps: ['18 h corresponds to 18/6 = 3 half-lives.', '1600 → 800 → 400 → 200 Bq.', 'Activity after 18 h = 200 Bq.'],
      answer: '200 Bq',
    }, {
      title: 'Alpha decay equation',
      prompt: 'A nucleus with A = 238 and Z = 92 emits an alpha particle. Find the daughter A and Z.',
      steps: ['An alpha particle carries A = 4 and Z = 2.', 'Daughter A = 238 - 4 = 234.', 'Daughter Z = 92 - 2 = 90.'],
      answer: 'A = 234, Z = 90.',
    }],
    dataSkill: {
      title: 'Half-life from a graph',
      prompt: 'Choose two activity levels related by a factor of two and measure the horizontal time interval between them. Repeat with another pair to check consistency.',
      columns: ['Time / h', 'Activity / Bq'],
      rows: [['0', '800'], ['4', '400'], ['8', '200'], ['12', '100']],
    },
    quickChecks: [
      { question: 'Which radiation is most strongly ionising?', answer: 'Alpha.' },
      { question: 'Which of alpha, beta and gamma is not deflected by electric or magnetic fields?', answer: 'Gamma, because it has no charge.' },
      { question: 'Does heating a radioactive source change its half-life?', answer: 'No. Radioactive decay is a nuclear process and is essentially independent of ordinary external conditions.' },
    ],
    examLanguage: 'In a balanced nuclear equation, check the total A values and total Z values independently on both sides.',
  }),
});

export function physicsStudyUpgradeForTopic(topicId) {
  return PHYSICS_STUDY_UPGRADES[String(topicId || '').toUpperCase()] || null;
}

export function physicsStudyUpgradeStats() {
  const entries = Object.values(PHYSICS_STUDY_UPGRADES);
  return Object.freeze({
    topics: entries.length,
    workedExamples: entries.reduce((n, entry) => n + entry.workedExamples.length, 0),
    quickChecks: entries.reduce((n, entry) => n + entry.quickChecks.length, 0),
    dataSkills: entries.filter(entry => entry.dataSkill).length,
  });
}
