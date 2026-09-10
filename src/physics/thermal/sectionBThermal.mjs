import { SECTION_B_THERMAL_LESSONS } from '../course/sectionBThermalLessons.mjs';

export const SECTION_B_OBJECTIVES = Object.freeze(Object.fromEntries(SECTION_B_THERMAL_LESSONS.flatMap(topic => topic.objectives)));
const SPECS = [
  {
    "objective": "B1.1",
    "profile": "KC",
    "stem": "Which statement best describes the caloric theory of heat?",
    "correct": "Heat is a weightless fluid that flows from hotter bodies to colder bodies.",
    "distractors": [
      "Heat is the average kinetic energy of particles.",
      "Heat is a force created only by friction.",
      "Heat is matter that always has measurable mass."
    ],
    "explanation": "The caloric theory treated heat as a conserved, weightless fluid moving from hot to cold.",
    "tags": [
      "caloric",
      "history"
    ]
  },
  {
    "objective": "B1.1",
    "profile": "UK",
    "stem": "Rumford observed that boring a cannon barrel produced heat continuously while mechanical work continued. Why did this challenge the caloric theory?",
    "correct": "A finite store of caloric should eventually have been exhausted.",
    "distractors": [
      "The cannon became lighter each time it was bored.",
      "The borer stopped removing metal completely.",
      "The surrounding air reached absolute zero."
    ],
    "explanation": "Unlimited heating from continued work did not fit the idea of a finite material store of caloric.",
    "tags": [
      "rumford",
      "evidence"
    ]
  },
  {
    "objective": "B1.1",
    "profile": "KC",
    "stem": "According to the kinetic theory, thermal energy in a body is associated mainly with the",
    "correct": "random motion of its particles.",
    "distractors": [
      "amount of caloric trapped between particles.",
      "gravitational potential energy of the whole body.",
      "colour of the surface only."
    ],
    "explanation": "The kinetic account connects thermal energy with microscopic particle motion.",
    "tags": [
      "kinetic-theory"
    ]
  },
  {
    "objective": "B1.1",
    "profile": "UK",
    "stem": "Two blocks are rubbed together and both warm up. Which interpretation is most consistent with the kinetic theory?",
    "correct": "Mechanical work increases the internal motion of particles.",
    "distractors": [
      "Caloric is created from nothing and stored in the blocks.",
      "The blocks gain mass because heat is matter.",
      "The rubbing removes all thermal energy from the surfaces."
    ],
    "explanation": "Frictional work transfers energy into internal particle motion.",
    "tags": [
      "kinetic-theory",
      "work"
    ]
  },
  {
    "objective": "B1.1",
    "profile": "UK",
    "stem": "Which observation is the strongest evidence against heat being a finite material substance stored in a body?",
    "correct": "Heat can be generated for as long as mechanical work is continuously done.",
    "distractors": [
      "Hot objects are sometimes heavier than cold objects.",
      "Ice melts at 0 °C.",
      "Metals conduct thermal energy better than wood."
    ],
    "explanation": "Continuous production by work is inconsistent with exhausting a fixed stored substance.",
    "tags": [
      "caloric",
      "evidence"
    ]
  },
  {
    "objective": "B1.2",
    "profile": "KC",
    "stem": "In Joule’s paddle-wheel experiment, falling weights were used mainly to provide a measured amount of",
    "correct": "mechanical work.",
    "distractors": [
      "caloric fluid.",
      "electric charge.",
      "radiant energy."
    ],
    "explanation": "The falling weights did known mechanical work that was transferred into heating the water.",
    "tags": [
      "joule",
      "experiment"
    ]
  },
  {
    "objective": "B1.2",
    "profile": "UK",
    "stem": "A 2.0 kg mass falls through 5.0 m. Taking g = 10 N/kg, how much gravitational potential energy is available to do work?",
    "correct": "100 J",
    "distractors": [
      "10 J",
      "25 J",
      "1000 J"
    ],
    "explanation": "mgh = 2.0 × 10 × 5.0 = 100 J.",
    "tags": [
      "joule",
      "work",
      "calculation"
    ]
  },
  {
    "objective": "B1.2",
    "profile": "UK",
    "stem": "Joule found that repeated experiments gave a fixed relationship between mechanical work done and thermal energy produced. This supported the idea that",
    "correct": "energy changes form while the total amount is conserved.",
    "distractors": [
      "thermal energy is a material fluid that is used up.",
      "mechanical work and thermal energy have unrelated units.",
      "energy is destroyed whenever friction acts."
    ],
    "explanation": "A consistent mechanical equivalent of heat supports energy conservation and conversion between forms.",
    "tags": [
      "joule",
      "conservation"
    ]
  },
  {
    "objective": "B1.2",
    "profile": "KC",
    "stem": "Why was Joule’s water container insulated as far as practical?",
    "correct": "To reduce energy transfer between the water and the surroundings.",
    "distractors": [
      "To make the water boil at a lower temperature.",
      "To increase the mass of the falling weights.",
      "To stop the paddle from doing work."
    ],
    "explanation": "Reducing external energy transfer makes the measured temperature rise better represent the work supplied.",
    "tags": [
      "joule",
      "experiment",
      "errors"
    ]
  },
  {
    "objective": "B1.2",
    "profile": "UK",
    "stem": "Which conclusion follows most directly from Joule’s experiments?",
    "correct": "A measured amount of mechanical work can be converted into an equivalent amount of thermal energy.",
    "distractors": [
      "Heat always moves from cold bodies to hot bodies.",
      "Temperature and total thermal energy are the same quantity.",
      "All mechanical energy becomes visible light."
    ],
    "explanation": "Joule quantified the conversion of mechanical work into thermal energy.",
    "tags": [
      "joule",
      "conservation"
    ]
  },
  {
    "objective": "B2.1",
    "profile": "KC",
    "stem": "When two bodies at different temperatures are placed in thermal contact, the net transfer of thermal energy is from",
    "correct": "the higher-temperature body to the lower-temperature body.",
    "distractors": [
      "the body with greater mass to the body with smaller mass.",
      "the body with more total thermal energy to the body with less, regardless of temperature.",
      "the lower-temperature body to the higher-temperature body."
    ],
    "explanation": "Temperature determines the direction of net thermal energy transfer.",
    "tags": [
      "temperature",
      "thermal-equilibrium"
    ]
  },
  {
    "objective": "B2.1",
    "profile": "KC",
    "stem": "Two bodies are in thermal equilibrium when",
    "correct": "they are at the same temperature and there is no net thermal energy transfer between them.",
    "distractors": [
      "they contain the same total amount of thermal energy.",
      "their masses are equal.",
      "both are at 0 °C."
    ],
    "explanation": "Thermal equilibrium means equal temperature and no net transfer.",
    "tags": [
      "thermal-equilibrium"
    ]
  },
  {
    "objective": "B2.1",
    "profile": "UK",
    "stem": "A small cup of tea is at 80 °C and a large bath is at 40 °C. If they are brought into thermal contact, net energy initially flows",
    "correct": "from the tea to the bath.",
    "distractors": [
      "from the bath to the tea because the bath contains more water.",
      "in neither direction because the bath contains more total energy.",
      "from whichever body has greater mass."
    ],
    "explanation": "Direction depends on temperature, not total energy content.",
    "tags": [
      "temperature",
      "application"
    ]
  },
  {
    "objective": "B2.1",
    "profile": "UK",
    "stem": "Which statement correctly distinguishes temperature from thermal energy?",
    "correct": "Temperature indicates the direction of net thermal energy transfer, while total thermal energy also depends on the amount and nature of the substance.",
    "distractors": [
      "Temperature is simply the total thermal energy divided by time.",
      "A larger object must always have a higher temperature.",
      "Bodies at the same temperature must contain the same total thermal energy."
    ],
    "explanation": "Temperature is an intensive state variable, while energy content also depends on mass and material.",
    "tags": [
      "temperature",
      "concept"
    ]
  },
  {
    "objective": "B2.2",
    "profile": "KC",
    "stem": "Which physical property is used in a liquid-in-glass thermometer?",
    "correct": "The length of a liquid column.",
    "distractors": [
      "The mass of the glass.",
      "The colour of the scale markings.",
      "The weight of the thermometer."
    ],
    "explanation": "The liquid expands so the column length changes with temperature.",
    "tags": [
      "thermometry"
    ]
  },
  {
    "objective": "B2.2",
    "profile": "KC",
    "stem": "A resistance thermometer measures temperature using the change in",
    "correct": "electrical resistance.",
    "distractors": [
      "mass.",
      "gravitational field strength.",
      "amount of substance."
    ],
    "explanation": "Electrical resistance of a suitable conductor varies predictably with temperature.",
    "tags": [
      "thermometry",
      "resistance"
    ]
  },
  {
    "objective": "B2.2",
    "profile": "KC",
    "stem": "A thermocouple is based on a temperature-dependent change in",
    "correct": "voltage produced by junctions of different metals.",
    "distractors": [
      "volume of a fixed mass of liquid only.",
      "weight of the junction.",
      "frequency of sound emitted."
    ],
    "explanation": "A thermocouple develops a small voltage related to the temperature difference between junctions.",
    "tags": [
      "thermometry",
      "thermocouple"
    ]
  },
  {
    "objective": "B2.2",
    "profile": "UK",
    "stem": "Which property would be unsuitable as the basis of a thermometer because it does not normally vary predictably with temperature?",
    "correct": "The mass of a sealed thermometer.",
    "distractors": [
      "The pressure of a fixed volume of gas.",
      "The electrical resistance of platinum.",
      "The length of a liquid column."
    ],
    "explanation": "A sealed thermometer keeps essentially the same mass, while the other properties vary systematically with temperature.",
    "tags": [
      "thermometry"
    ]
  },
  {
    "objective": "B2.3",
    "profile": "KC",
    "stem": "What is the purpose of the constriction in a traditional clinical liquid-in-glass thermometer?",
    "correct": "It holds the liquid column at the maximum reading after removal from the patient.",
    "distractors": [
      "It makes the bulb larger so the thermometer is slower.",
      "It lets the liquid return immediately to the bulb.",
      "It fixes the boiling point at 100 °C."
    ],
    "explanation": "The constriction prevents the column from falling back immediately, allowing the reading to be taken after removal.",
    "tags": [
      "thermometer-design",
      "clinical"
    ]
  },
  {
    "objective": "B2.3",
    "profile": "UK",
    "stem": "Which change generally increases the sensitivity of a liquid-in-glass thermometer?",
    "correct": "Using a narrower capillary bore.",
    "distractors": [
      "Using a much wider capillary bore.",
      "Making the bulb extremely thick-walled.",
      "Removing the scale."
    ],
    "explanation": "A given volume expansion produces a larger length change in a narrow bore.",
    "tags": [
      "thermometer-design",
      "sensitivity"
    ]
  },
  {
    "objective": "B2.3",
    "profile": "UK",
    "stem": "A thermometer must respond quickly to a rapidly changing temperature. Which feature is most helpful?",
    "correct": "A small bulb with thin walls.",
    "distractors": [
      "A very large bulb with thick walls.",
      "A long, wide capillary with no bulb.",
      "A constriction that traps the liquid column."
    ],
    "explanation": "Low thermal mass and thin walls reduce the time needed to reach thermal equilibrium.",
    "tags": [
      "thermometer-design",
      "response-time"
    ]
  },
  {
    "objective": "B2.3",
    "profile": "UK",
    "stem": "Why is alcohol preferred to mercury in some very low-temperature thermometers?",
    "correct": "Alcohol remains liquid at temperatures below the freezing point of mercury.",
    "distractors": [
      "Alcohol has no thermal expansion.",
      "Mercury boils at 0 °C.",
      "Alcohol always gives a wider range at high temperatures."
    ],
    "explanation": "Mercury freezes near −39 °C, so alcohol is useful for lower temperatures.",
    "tags": [
      "thermometer-design",
      "range"
    ]
  },
  {
    "objective": "B2.4",
    "profile": "KC",
    "stem": "The lower fixed point on the Celsius scale is defined using",
    "correct": "pure melting ice at 0 °C.",
    "distractors": [
      "pure boiling water at 0 °C.",
      "ice at any temperature below 0 °C.",
      "steam at 0 °C."
    ],
    "explanation": "The lower fixed point is the temperature of pure melting ice.",
    "tags": [
      "celsius-scale",
      "fixed-points"
    ]
  },
  {
    "objective": "B2.4",
    "profile": "KC",
    "stem": "The upper fixed point on the Celsius scale is the temperature of",
    "correct": "steam above water boiling at normal atmospheric pressure.",
    "distractors": [
      "any hot water at 100 °C regardless of pressure.",
      "pure melting ice.",
      "water vapour at any pressure."
    ],
    "explanation": "The standard upper fixed point requires steam above boiling water at normal atmospheric pressure.",
    "tags": [
      "celsius-scale",
      "fixed-points"
    ]
  },
  {
    "objective": "B2.4",
    "profile": "KC",
    "stem": "The interval between the lower and upper fixed points on the Celsius scale is divided into",
    "correct": "100 equal degrees.",
    "distractors": [
      "10 equal degrees.",
      "273 equal degrees.",
      "360 equal degrees."
    ],
    "explanation": "The fixed-point interval from 0 °C to 100 °C is divided into 100 equal parts.",
    "tags": [
      "celsius-scale"
    ]
  },
  {
    "objective": "B2.4",
    "profile": "UK",
    "stem": "Why must the conditions of the Celsius fixed points be stated carefully?",
    "correct": "Melting and boiling temperatures depend on factors such as purity and pressure.",
    "distractors": [
      "Temperature is independent of all physical conditions.",
      "Only the colour of the thermometer changes the fixed points.",
      "The lower fixed point depends only on the thermometer mass."
    ],
    "explanation": "Purity affects melting point and pressure affects boiling point, so standard conditions matter.",
    "tags": [
      "celsius-scale",
      "conditions"
    ]
  },
  {
    "objective": "B2.5",
    "profile": "KC",
    "stem": "The temperature of a body is related most directly to the",
    "correct": "average kinetic energy of its particles.",
    "distractors": [
      "total mass of its particles only.",
      "kinetic energy of its fastest particle only.",
      "gravitational potential energy of the body."
    ],
    "explanation": "Temperature reflects average microscopic kinetic energy.",
    "tags": [
      "kinetic-theory",
      "temperature"
    ]
  },
  {
    "objective": "B2.5",
    "profile": "UK",
    "stem": "Two samples of the same substance are at the same temperature, but one has twice the mass. Which statement is correct?",
    "correct": "Their particles have the same average kinetic energy, although the larger sample has more particles.",
    "distractors": [
      "The larger sample must have particles with twice the average kinetic energy.",
      "The smaller sample must have the higher temperature.",
      "Their total thermal energies must be identical."
    ],
    "explanation": "Equal temperature implies equal average particle kinetic energy for the same substance, not equal total energy.",
    "tags": [
      "kinetic-theory",
      "temperature"
    ]
  },
  {
    "objective": "B2.5",
    "profile": "KC",
    "stem": "When the temperature of a body rises, the average kinetic energy of its particles generally",
    "correct": "increases.",
    "distractors": [
      "decreases.",
      "becomes exactly zero.",
      "stays unchanged while only mass changes."
    ],
    "explanation": "Higher temperature corresponds to greater average particle kinetic energy.",
    "tags": [
      "kinetic-theory"
    ]
  },
  {
    "objective": "B2.5",
    "profile": "UK",
    "stem": "Which statement is incorrect?",
    "correct": "Temperature is the kinetic energy of the fastest molecule in a body.",
    "distractors": [
      "Temperature is related to average particle kinetic energy.",
      "Particles at one temperature have a range of individual speeds.",
      "Heating generally increases average particle kinetic energy."
    ],
    "explanation": "Temperature concerns an average, not the fastest individual particle.",
    "tags": [
      "kinetic-theory",
      "misconception"
    ]
  },
  {
    "objective": "B2.6",
    "profile": "KC",
    "stem": "In a solid, particles are best described as",
    "correct": "closely packed and vibrating about fixed positions.",
    "distractors": [
      "far apart and moving freely in all directions.",
      "close together but sliding freely past one another.",
      "stationary with no vibration at any temperature."
    ],
    "explanation": "Strong interactions hold solid particles near fixed positions, where they vibrate.",
    "tags": [
      "states-of-matter",
      "solid"
    ]
  },
  {
    "objective": "B2.6",
    "profile": "KC",
    "stem": "In a liquid, particles are generally",
    "correct": "close together but able to move past one another.",
    "distractors": [
      "fixed in a regular lattice and unable to move past one another.",
      "very far apart with negligible interactions.",
      "completely motionless."
    ],
    "explanation": "This arrangement explains fixed volume but variable shape.",
    "tags": [
      "states-of-matter",
      "liquid"
    ]
  },
  {
    "objective": "B2.6",
    "profile": "UK",
    "stem": "Why can a gas be compressed much more than a liquid?",
    "correct": "There is much more empty space between gas particles.",
    "distractors": [
      "Gas particles are easily crushed into smaller particles.",
      "Liquid particles have no mass.",
      "Gas particles stop moving when compressed."
    ],
    "explanation": "Compression mainly reduces the large spaces between gas particles.",
    "tags": [
      "states-of-matter",
      "gas",
      "compression"
    ]
  },
  {
    "objective": "B2.6",
    "profile": "KC",
    "stem": "Which state has neither a fixed shape nor a fixed volume?",
    "correct": "Gas.",
    "distractors": [
      "Solid.",
      "Liquid.",
      "A solid-liquid mixture must always have both fixed shape and volume."
    ],
    "explanation": "A gas fills the available container and has no fixed volume or shape.",
    "tags": [
      "states-of-matter"
    ]
  },
  {
    "objective": "B2.7",
    "profile": "KC",
    "stem": "Gas pressure on the wall of a container is caused by",
    "correct": "collisions of moving gas particles with the wall.",
    "distractors": [
      "the particles becoming heavier near the wall.",
      "a permanent attractive pull from the wall only.",
      "the gas particles being compressed into smaller sizes."
    ],
    "explanation": "Repeated momentum-changing collisions produce pressure.",
    "tags": [
      "kinetic-theory",
      "gas-pressure"
    ]
  },
  {
    "objective": "B2.7",
    "profile": "UK",
    "stem": "Why does diffusion generally occur faster in gases than in liquids?",
    "correct": "Gas particles are farther apart and move freely through larger spaces.",
    "distractors": [
      "Gas particles have no kinetic energy.",
      "Liquid particles are completely fixed in place.",
      "Gas molecules are always larger than liquid molecules."
    ],
    "explanation": "Greater spacing and free motion allow faster mixing in gases.",
    "tags": [
      "kinetic-theory",
      "diffusion"
    ]
  },
  {
    "objective": "B2.7",
    "profile": "UK",
    "stem": "Why do solids generally expand less than gases for the same temperature rise?",
    "correct": "Stronger interactions in solids resist increases in particle separation.",
    "distractors": [
      "Solid particles have zero kinetic energy.",
      "Gas particles have no mass.",
      "Solids contain no spaces between particles at all."
    ],
    "explanation": "The stronger constraints in solids limit changes in average separation.",
    "tags": [
      "kinetic-theory",
      "expansion"
    ]
  },
  {
    "objective": "B2.7",
    "profile": "UK",
    "stem": "Why are liquids difficult to compress?",
    "correct": "Their particles are already close together with little empty space between them.",
    "distractors": [
      "Their particles are infinitely large.",
      "Their particles have no motion.",
      "Compression would require turning all particles into gas."
    ],
    "explanation": "There is little space available to reduce between neighbouring liquid particles.",
    "tags": [
      "kinetic-theory",
      "liquid"
    ]
  },
  {
    "objective": "B2.8",
    "profile": "UK",
    "stem": "Why are expansion gaps left in some railway tracks and bridges?",
    "correct": "They allow materials to expand when heated without buckling or damaging the structure.",
    "distractors": [
      "They make the material conduct thermal energy faster.",
      "They prevent all contraction when cooled.",
      "They increase the mass of the structure."
    ],
    "explanation": "Engineering gaps accommodate dimensional changes with temperature.",
    "tags": [
      "thermal-expansion",
      "application"
    ]
  },
  {
    "objective": "B2.8",
    "profile": "UK",
    "stem": "Why may a bridge deck rest on rollers at one end?",
    "correct": "The rollers allow the deck to change length as its temperature changes.",
    "distractors": [
      "The rollers stop the bridge from conducting thermal energy.",
      "The rollers increase gravitational field strength.",
      "The rollers keep the bridge at absolute zero."
    ],
    "explanation": "Rollers permit expansion and contraction without large internal stresses.",
    "tags": [
      "thermal-expansion",
      "application"
    ]
  },
  {
    "objective": "B2.8",
    "profile": "UK",
    "stem": "A tight metal lid on a glass jar is run under hot water. Why does this often help loosen it?",
    "correct": "The metal lid expands when heated, increasing its diameter.",
    "distractors": [
      "The glass instantly becomes much denser.",
      "The metal contracts when heated.",
      "The water removes gravity from the lid."
    ],
    "explanation": "Heating the metal increases its dimensions and can loosen the fit.",
    "tags": [
      "thermal-expansion",
      "application"
    ]
  },
  {
    "objective": "B2.8",
    "profile": "UK",
    "stem": "A bimetallic strip bends when heated because",
    "correct": "the two bonded metals expand by different amounts.",
    "distractors": [
      "both metals always contract by identical amounts.",
      "one metal loses all its mass.",
      "electric current must flow through the strip."
    ],
    "explanation": "Different expansion coefficients make one side lengthen more than the other.",
    "tags": [
      "thermal-expansion",
      "bimetallic"
    ]
  },
  {
    "objective": "B2.9",
    "profile": "UK",
    "stem": "A graph of gas pressure against Celsius temperature at constant volume is extended backwards. The temperature-axis intercept is close to",
    "correct": "−273 °C.",
    "distractors": [
      "0 °C.",
      "100 °C.",
      "273 °C."
    ],
    "explanation": "The extrapolated zero-pressure intercept is near absolute zero, −273 °C.",
    "tags": [
      "kelvin-scale",
      "graph"
    ]
  },
  {
    "objective": "B2.9",
    "profile": "UK",
    "stem": "Which graph can also be extrapolated to estimate absolute zero?",
    "correct": "Volume against Celsius temperature for a fixed mass of gas at constant pressure.",
    "distractors": [
      "Mass against time for a sealed gas.",
      "Weight against volume at constant density.",
      "Colour against pressure with no temperature measurements."
    ],
    "explanation": "Charles-law data give an approximately linear volume-temperature relation whose extrapolation approaches zero near −273 °C.",
    "tags": [
      "kelvin-scale",
      "graph"
    ]
  },
  {
    "objective": "B2.9",
    "profile": "KC",
    "stem": "Absolute zero is used as",
    "correct": "the zero of the Kelvin temperature scale.",
    "distractors": [
      "the upper fixed point of the Celsius scale.",
      "the boiling point of water.",
      "the temperature at which all real gases remain gases."
    ],
    "explanation": "The Kelvin scale starts at absolute zero.",
    "tags": [
      "kelvin-scale"
    ]
  },
  {
    "objective": "B2.9",
    "profile": "UK",
    "stem": "Why is the zero-pressure or zero-volume intercept called an extrapolation rather than a direct measurement for a real gas?",
    "correct": "Real gases condense before the idealised straight-line relation can be followed all the way to the intercept.",
    "distractors": [
      "The Kelvin scale has no zero.",
      "Pressure can never be measured above room temperature.",
      "Gas particles become infinitely massive near −273 °C."
    ],
    "explanation": "Real gases change phase before reaching the ideal-gas intercept.",
    "tags": [
      "kelvin-scale",
      "limitations"
    ]
  },
  {
    "objective": "B2.10",
    "profile": "UK",
    "stem": "27 °C is approximately",
    "correct": "300 K.",
    "distractors": [
      "246 K.",
      "273 K.",
      "327 K."
    ],
    "explanation": "T/K = θ/°C + 273, so 27 + 273 = 300 K.",
    "tags": [
      "temperature-conversion",
      "calculation"
    ]
  },
  {
    "objective": "B2.10",
    "profile": "UK",
    "stem": "400 K is approximately",
    "correct": "127 °C.",
    "distractors": [
      "673 °C.",
      "400 °C.",
      "−127 °C."
    ],
    "explanation": "θ/°C = T/K − 273, so 400 − 273 = 127 °C.",
    "tags": [
      "temperature-conversion",
      "calculation"
    ]
  },
  {
    "objective": "B2.10",
    "profile": "UK",
    "stem": "A temperature rises by 20 °C. The temperature change in kelvin is",
    "correct": "20 K.",
    "distractors": [
      "293 K.",
      "253 K.",
      "0.073 K."
    ],
    "explanation": "Celsius degrees and kelvins have the same size, so temperature differences have the same numerical value.",
    "tags": [
      "temperature-change"
    ]
  },
  {
    "objective": "B2.10",
    "profile": "KC",
    "stem": "0 °C corresponds approximately to",
    "correct": "273 K.",
    "distractors": [
      "0 K.",
      "100 K.",
      "373 K."
    ],
    "explanation": "The Kelvin scale is offset from Celsius by about 273.",
    "tags": [
      "temperature-conversion"
    ]
  },
  {
    "objective": "B2.11",
    "profile": "UK",
    "stem": "A gas at 2.0 × 10⁵ Pa occupies 300 cm³. It is compressed to 100 cm³ at constant temperature. Its new pressure is",
    "correct": "6.0 × 10⁵ Pa.",
    "distractors": [
      "6.7 × 10⁴ Pa.",
      "2.0 × 10⁵ Pa.",
      "1.8 × 10⁸ Pa."
    ],
    "explanation": "Using P₁V₁ = P₂V₂ gives P₂ = 2.0 × 10⁵ × 300 / 100 = 6.0 × 10⁵ Pa.",
    "tags": [
      "gas-laws",
      "boyle",
      "calculation"
    ]
  },
  {
    "objective": "B2.11",
    "profile": "UK",
    "stem": "A gas has volume 200 cm³ at 300 K. At constant pressure it is heated to 450 K. Its new volume is",
    "correct": "300 cm³.",
    "distractors": [
      "133 cm³.",
      "200 cm³.",
      "650 cm³."
    ],
    "explanation": "At constant pressure V/T is constant, so V₂ = 200 × 450/300 = 300 cm³.",
    "tags": [
      "gas-laws",
      "charles",
      "calculation"
    ]
  },
  {
    "objective": "B2.11",
    "profile": "UK",
    "stem": "A sealed rigid container has pressure 100 kPa at 300 K. It is heated to 360 K. The new pressure is",
    "correct": "120 kPa.",
    "distractors": [
      "83.3 kPa.",
      "100 kPa.",
      "160 kPa."
    ],
    "explanation": "At constant volume P/T is constant, so P₂ = 100 × 360/300 = 120 kPa.",
    "tags": [
      "gas-laws",
      "pressure-law",
      "calculation"
    ]
  },
  {
    "objective": "B2.11",
    "profile": "UK",
    "stem": "A gas-law calculation involves temperatures of 20 °C and 80 °C. Before using Charles’ law or the pressure law, the temperatures should be",
    "correct": "converted to kelvin.",
    "distractors": [
      "used directly in degrees Celsius.",
      "converted to degrees Fahrenheit.",
      "subtracted so only 60 is used as an absolute temperature."
    ],
    "explanation": "Gas-law proportionalities use absolute temperature in kelvin.",
    "tags": [
      "gas-laws",
      "kelvin"
    ]
  },
  {
    "objective": "B2.12",
    "profile": "UK",
    "stem": "At constant temperature, a gas is compressed to half its volume. According to kinetic theory, its pressure rises mainly because particles",
    "correct": "strike the walls more frequently.",
    "distractors": [
      "move twice as fast because the temperature is unchanged.",
      "become twice as large.",
      "stop colliding with one another."
    ],
    "explanation": "At constant temperature average speed is unchanged, but the shorter travel distance raises collision frequency.",
    "tags": [
      "kinetic-theory",
      "boyle"
    ]
  },
  {
    "objective": "B2.12",
    "profile": "UK",
    "stem": "A fixed volume of gas is heated. Why does its pressure increase?",
    "correct": "Particles move faster, so wall collisions are more frequent and have greater momentum change.",
    "distractors": [
      "Particles become smaller and stop striking the walls.",
      "The number of particles must double.",
      "The container volume always increases."
    ],
    "explanation": "Higher temperature raises average kinetic energy and particle speed, strengthening and increasing collisions.",
    "tags": [
      "kinetic-theory",
      "pressure-law"
    ]
  },
  {
    "objective": "B2.12",
    "profile": "UK",
    "stem": "A gas is heated while its pressure is kept constant. Why does its volume increase?",
    "correct": "The gas expands so the faster particles do not make the collision effect per unit area increase.",
    "distractors": [
      "The particles are crushed into a smaller space.",
      "The gas loses all kinetic energy.",
      "The number of molecules automatically decreases."
    ],
    "explanation": "Expansion offsets the increased particle speed so the pressure remains constant.",
    "tags": [
      "kinetic-theory",
      "charles"
    ]
  },
  {
    "objective": "B2.12",
    "profile": "KC",
    "stem": "Which statement is NOT part of the kinetic-theory explanation of gas compression?",
    "correct": "The particles themselves are squashed into smaller particles.",
    "distractors": [
      "Gas pressure arises from wall collisions.",
      "Reducing volume makes wall collisions more frequent.",
      "At constant temperature the average particle kinetic energy stays approximately constant."
    ],
    "explanation": "Gas particles are treated as particles whose spacing changes; they are not compressed into smaller particles.",
    "tags": [
      "kinetic-theory",
      "misconception"
    ]
  },
  {
    "objective": "B3.1",
    "profile": "KC",
    "stem": "Specific heat capacity is the energy needed to raise the temperature of",
    "correct": "1 kg of a substance by 1 K.",
    "distractors": [
      "an entire object by 1 K, regardless of its mass.",
      "1 g of any substance by 100 K.",
      "1 kg of a substance by 273 K."
    ],
    "explanation": "Specific heat capacity is defined per kilogram per kelvin.",
    "tags": [
      "specific-heat-capacity",
      "definition"
    ]
  },
  {
    "objective": "B3.1",
    "profile": "KC",
    "stem": "The SI unit commonly used for specific heat capacity is",
    "correct": "J kg⁻¹ K⁻¹.",
    "distractors": [
      "J K⁻¹.",
      "J kg⁻¹.",
      "W kg⁻¹."
    ],
    "explanation": "Specific heat capacity is energy per kilogram per kelvin.",
    "tags": [
      "specific-heat-capacity",
      "units"
    ]
  },
  {
    "objective": "B3.1",
    "profile": "UK",
    "stem": "A 2.0 kg copper block has specific heat capacity 380 J kg⁻¹ K⁻¹. Its heat capacity is",
    "correct": "760 J K⁻¹.",
    "distractors": [
      "190 J K⁻¹.",
      "380 J K⁻¹.",
      "1520 J K⁻¹."
    ],
    "explanation": "C = mc = 2.0 × 380 = 760 J/K.",
    "tags": [
      "heat-capacity",
      "calculation"
    ]
  },
  {
    "objective": "B3.1",
    "profile": "KC",
    "stem": "Which statement correctly distinguishes heat capacity from specific heat capacity?",
    "correct": "Heat capacity belongs to a particular object; specific heat capacity is a property of the material.",
    "distractors": [
      "Both are independent of mass and material.",
      "Specific heat capacity belongs only to a particular object size.",
      "Heat capacity and specific heat capacity always have the same numerical value."
    ],
    "explanation": "Heat capacity scales with the object mass; specific heat capacity characterises the material.",
    "tags": [
      "heat-capacity",
      "concept"
    ]
  },
  {
    "objective": "B3.2",
    "profile": "UK",
    "stem": "How much energy is needed to heat 0.50 kg of water, c = 4200 J kg⁻¹ K⁻¹, from 20 °C to 70 °C?",
    "correct": "105 000 J.",
    "distractors": [
      "42 000 J.",
      "147 000 J.",
      "294 000 J."
    ],
    "explanation": "E = mcΔT = 0.50 × 4200 × 50 = 105 000 J.",
    "tags": [
      "specific-heat-capacity",
      "calculation"
    ]
  },
  {
    "objective": "B3.2",
    "profile": "UK",
    "stem": "A 200 g metal sample with c = 900 J kg⁻¹ K⁻¹ warms by 10 K. The energy supplied is",
    "correct": "1800 J.",
    "distractors": [
      "18 J.",
      "18 000 J.",
      "1.8 × 10⁶ J."
    ],
    "explanation": "Convert 200 g to 0.200 kg, then E = 0.200 × 900 × 10 = 1800 J.",
    "tags": [
      "specific-heat-capacity",
      "mass-conversion",
      "calculation"
    ]
  },
  {
    "objective": "B3.2",
    "profile": "UK",
    "stem": "A 0.50 kg block gains 4000 J and its temperature rises by 20 K. Its specific heat capacity is",
    "correct": "400 J kg⁻¹ K⁻¹.",
    "distractors": [
      "100 J kg⁻¹ K⁻¹.",
      "200 J kg⁻¹ K⁻¹.",
      "800 J kg⁻¹ K⁻¹."
    ],
    "explanation": "c = E/(mΔT) = 4000/(0.50 × 20) = 400 J kg⁻¹ K⁻¹.",
    "tags": [
      "specific-heat-capacity",
      "calculation"
    ]
  },
  {
    "objective": "B3.2",
    "profile": "UK",
    "stem": "A substance warms from 25 °C to 65 °C. Which value should be used for ΔT in E = mcΔT?",
    "correct": "40 K.",
    "distractors": [
      "65 K.",
      "298 K.",
      "338 K."
    ],
    "explanation": "The temperature change is 65 − 25 = 40 °C, numerically equal to 40 K.",
    "tags": [
      "temperature-change",
      "specific-heat-capacity"
    ]
  },
  {
    "objective": "B3.3",
    "profile": "UK",
    "stem": "In an electrical specific-heat-capacity experiment, the specific heat capacity is found from",
    "correct": "c = Pt/(mΔT).",
    "distractors": [
      "c = mΔT/(Pt).",
      "c = Pt m ΔT.",
      "c = P/(tmΔT)."
    ],
    "explanation": "The heater supplies E = Pt, and E = mcΔT, so c = Pt/(mΔT).",
    "tags": [
      "specific-heat-capacity",
      "experiment"
    ]
  },
  {
    "objective": "B3.3",
    "profile": "UK",
    "stem": "Why is a metal block lagged during a specific-heat-capacity experiment?",
    "correct": "To reduce energy transfer to the surroundings.",
    "distractors": [
      "To increase the block mass.",
      "To make the thermometer read in kelvin.",
      "To stop the heater from supplying energy."
    ],
    "explanation": "Lagging improves the approximation that electrical energy supplied heats the block.",
    "tags": [
      "specific-heat-capacity",
      "experiment",
      "errors"
    ]
  },
  {
    "objective": "B3.3",
    "profile": "UK",
    "stem": "Why is a small amount of oil often placed in the thermometer hole of a metal block?",
    "correct": "To improve thermal contact between the thermometer and the block.",
    "distractors": [
      "To lower the mass of the block.",
      "To make the heater power zero.",
      "To eliminate the need to measure temperature."
    ],
    "explanation": "Oil fills air gaps and improves thermal contact.",
    "tags": [
      "specific-heat-capacity",
      "experiment"
    ]
  },
  {
    "objective": "B3.3",
    "profile": "UK",
    "stem": "In the method of mixtures, a hot metal is placed in cooler water. A common simplifying assumption is that",
    "correct": "energy lost by the metal equals energy gained by the water.",
    "distractors": [
      "both final temperatures remain equal to their starting temperatures.",
      "the metal has zero heat capacity.",
      "all energy is lost to the surroundings."
    ],
    "explanation": "The ideal calculation neglects energy transfer to the container and surroundings.",
    "tags": [
      "specific-heat-capacity",
      "mixtures"
    ]
  },
  {
    "objective": "B3.4",
    "profile": "KC",
    "stem": "During the melting of pure ice at constant pressure, while energy is supplied steadily, the temperature",
    "correct": "remains approximately constant until the phase change is complete.",
    "distractors": [
      "rises continuously at the same rate.",
      "falls below absolute zero.",
      "jumps immediately to 100 °C."
    ],
    "explanation": "During a phase change supplied energy changes particle arrangement rather than temperature.",
    "tags": [
      "phase-change",
      "heating-curve"
    ]
  },
  {
    "objective": "B3.4",
    "profile": "UK",
    "stem": "Why does temperature remain constant during a phase change even though energy is supplied?",
    "correct": "The energy is used to overcome intermolecular forces rather than increase average kinetic energy.",
    "distractors": [
      "The heater stops transferring energy.",
      "The particles lose all potential energy instantly.",
      "The mass becomes zero."
    ],
    "explanation": "Latent energy changes particle separation and potential energy while average kinetic energy stays roughly constant.",
    "tags": [
      "phase-change",
      "kinetic-theory"
    ]
  },
  {
    "objective": "B3.4",
    "profile": "UK",
    "stem": "On a temperature-time heating curve, a horizontal section usually represents",
    "correct": "a phase change occurring at constant temperature.",
    "distractors": [
      "a period when no energy enters the substance.",
      "a measurement error that must always be ignored.",
      "a region where time stops."
    ],
    "explanation": "A plateau indicates energy is being absorbed without a temperature rise.",
    "tags": [
      "heating-curve",
      "phase-change"
    ]
  },
  {
    "objective": "B3.4",
    "profile": "KC",
    "stem": "When water boils at its boiling point under constant pressure, continued heating causes",
    "correct": "more liquid to change into vapour while the temperature remains nearly constant.",
    "distractors": [
      "the temperature to rise without limit while no vapour forms.",
      "the water to freeze.",
      "the specific latent heat to become zero."
    ],
    "explanation": "At the boiling point, supplied energy drives vaporisation until the liquid is converted.",
    "tags": [
      "phase-change",
      "boiling"
    ]
  },
  {
    "objective": "B3.5",
    "profile": "UK",
    "stem": "How much energy is needed to melt 0.20 kg of ice at 0 °C if the specific latent heat of fusion is 340 000 J kg⁻¹?",
    "correct": "68 000 J.",
    "distractors": [
      "17 000 J.",
      "170 000 J.",
      "680 000 J."
    ],
    "explanation": "E = ml = 0.20 × 340 000 = 68 000 J.",
    "tags": [
      "latent-heat",
      "fusion",
      "calculation"
    ]
  },
  {
    "objective": "B3.5",
    "profile": "UK",
    "stem": "How much energy is needed to vaporise 0.10 kg of water at its boiling point if lᵥ = 2.3 × 10⁶ J kg⁻¹?",
    "correct": "2.3 × 10⁵ J.",
    "distractors": [
      "2.3 × 10⁴ J.",
      "2.3 × 10⁶ J.",
      "2.3 × 10⁷ J."
    ],
    "explanation": "E = ml = 0.10 × 2.3 × 10⁶ = 2.3 × 10⁵ J.",
    "tags": [
      "latent-heat",
      "vaporisation",
      "calculation"
    ]
  },
  {
    "objective": "B3.5",
    "profile": "UK",
    "stem": "A sample of ice below 0 °C is heated until it has just melted. Which calculation structure is correct?",
    "correct": "First use mcΔT to warm the ice to 0 °C, then use ml to melt it.",
    "distractors": [
      "Use ml only and ignore the initial temperature.",
      "Use mcΔT only and ignore the phase change.",
      "Multiply mcΔT by ml."
    ],
    "explanation": "Warming within one phase and changing phase are separate energy stages.",
    "tags": [
      "latent-heat",
      "multi-stage"
    ]
  },
  {
    "objective": "B3.5",
    "profile": "KC",
    "stem": "Why is there no ΔT term in E = ml?",
    "correct": "The temperature remains constant during the phase change.",
    "distractors": [
      "Mass is always zero during a phase change.",
      "Specific latent heat has units of K.",
      "The formula applies only at absolute zero."
    ],
    "explanation": "Latent energy changes phase at constant transition temperature.",
    "tags": [
      "latent-heat",
      "concept"
    ]
  },
  {
    "objective": "B3.6",
    "profile": "UK",
    "stem": "A heater of power P melts a corrected mass m of ice in time t. The specific latent heat is calculated from",
    "correct": "l = Pt/m.",
    "distractors": [
      "l = m/(Pt).",
      "l = Pm/t.",
      "l = mt/P."
    ],
    "explanation": "Electrical energy supplied is Pt and equals ml in the ideal calculation.",
    "tags": [
      "latent-heat",
      "experiment"
    ]
  },
  {
    "objective": "B3.6",
    "profile": "UK",
    "stem": "Why is an unheated control funnel of ice useful in an experiment to measure latent heat of fusion?",
    "correct": "It estimates the ice melted by energy from the surroundings so this can be corrected for.",
    "distractors": [
      "It doubles the electrical power.",
      "It keeps all ice at 100 °C.",
      "It measures the density of the heater."
    ],
    "explanation": "The control separates environmental melting from heater-caused melting.",
    "tags": [
      "latent-heat",
      "fusion",
      "control"
    ]
  },
  {
    "objective": "B3.6",
    "profile": "UK",
    "stem": "In an electrical experiment for latent heat of vaporisation, a convenient measurement is",
    "correct": "the mass of water lost while boiling steadily for a measured time.",
    "distractors": [
      "the colour of the steam only.",
      "the final room temperature only.",
      "the volume of the electrical leads."
    ],
    "explanation": "The heater energy Pt is related to the mass changed to vapour.",
    "tags": [
      "latent-heat",
      "vaporisation",
      "experiment"
    ]
  },
  {
    "objective": "B3.6",
    "profile": "UK",
    "stem": "Why should timing begin after a latent-heat apparatus has reached a steady phase-change condition?",
    "correct": "So the measured heater energy is associated mainly with the phase change during the timed interval.",
    "distractors": [
      "So no energy is supplied during the measurement.",
      "So the mass becomes independent of time.",
      "So the boiling point becomes 0 K."
    ],
    "explanation": "A steady state reduces startup effects and makes the energy-mass relation more reliable.",
    "tags": [
      "latent-heat",
      "experiment"
    ]
  },
  {
    "objective": "B3.7",
    "profile": "KC",
    "stem": "Which statement distinguishes evaporation from boiling?",
    "correct": "Evaporation occurs at the surface at any temperature; boiling occurs throughout the liquid at its boiling point.",
    "distractors": [
      "Evaporation occurs only at the boiling point; boiling occurs at any temperature.",
      "Both occur only at the surface.",
      "Boiling always occurs without bubbles."
    ],
    "explanation": "Evaporation is a surface process possible at any temperature, while boiling is a bulk process at the boiling point.",
    "tags": [
      "evaporation",
      "boiling"
    ]
  },
  {
    "objective": "B3.7",
    "profile": "UK",
    "stem": "Why does evaporation cool a liquid?",
    "correct": "The faster particles escape, lowering the average kinetic energy of those left behind.",
    "distractors": [
      "The slowest particles escape first, raising the average energy.",
      "Evaporation creates energy from nothing.",
      "All particles stop moving at the surface."
    ],
    "explanation": "Preferential escape of higher-energy particles lowers the remaining average kinetic energy.",
    "tags": [
      "evaporation",
      "cooling"
    ]
  },
  {
    "objective": "B3.7",
    "profile": "UK",
    "stem": "Which change generally increases the rate of evaporation from a wet surface?",
    "correct": "Increasing air movement over the surface.",
    "distractors": [
      "Reducing the exposed surface area.",
      "Sealing the surface under saturated air.",
      "Lowering the temperature while keeping all else unchanged."
    ],
    "explanation": "Moving air removes vapour near the surface and supports continued evaporation.",
    "tags": [
      "evaporation",
      "rate"
    ]
  },
  {
    "objective": "B3.7",
    "profile": "UK",
    "stem": "Why does water boil below 100 °C at high altitude?",
    "correct": "The atmospheric pressure is lower, so the vapour pressure needed for boiling is reached at a lower temperature.",
    "distractors": [
      "Gravity disappears completely.",
      "The specific heat capacity becomes zero.",
      "Evaporation stops at high altitude."
    ],
    "explanation": "Boiling temperature depends on external pressure.",
    "tags": [
      "boiling",
      "pressure"
    ]
  },
  {
    "objective": "B4.1",
    "profile": "KC",
    "stem": "Conduction is transfer of thermal energy through a material mainly by",
    "correct": "particle interactions without bulk movement of the material.",
    "distractors": [
      "bulk circulation of the entire material.",
      "infrared waves only.",
      "evaporation from the surface only."
    ],
    "explanation": "Conduction transfers energy through microscopic interactions while the material does not flow as a whole.",
    "tags": [
      "conduction"
    ]
  },
  {
    "objective": "B4.1",
    "profile": "UK",
    "stem": "Why are metals generally much better thermal conductors than non-metals?",
    "correct": "Mobile electrons carry energy rapidly through the metal as well as lattice vibrations.",
    "distractors": [
      "Metal atoms do not vibrate.",
      "Metals contain no particles.",
      "Only metals can emit infrared radiation."
    ],
    "explanation": "Free or conduction electrons provide an additional fast energy-transfer mechanism.",
    "tags": [
      "conduction",
      "metals"
    ]
  },
  {
    "objective": "B4.1",
    "profile": "UK",
    "stem": "Why do materials such as wool and foam provide useful insulation?",
    "correct": "They trap pockets of air, which is a poor conductor and cannot circulate freely.",
    "distractors": [
      "They create a perfect vacuum in every pore.",
      "They increase convection currents through the material.",
      "They convert all thermal energy into mass."
    ],
    "explanation": "Trapped air conducts poorly and restricted movement suppresses convection.",
    "tags": [
      "conduction",
      "insulation"
    ]
  },
  {
    "objective": "B4.1",
    "profile": "KC",
    "stem": "During conduction in a stationary solid, the material as a whole",
    "correct": "does not flow from the hot end to the cold end.",
    "distractors": [
      "moves continuously from the cold end to the hot end.",
      "must change into a gas.",
      "loses all internal energy."
    ],
    "explanation": "Energy passes through the solid while particles remain near their positions.",
    "tags": [
      "conduction",
      "concept"
    ]
  },
  {
    "objective": "B4.2",
    "profile": "UK",
    "stem": "Which sequence correctly describes the start of a convection current in a fluid heated from below?",
    "correct": "The heated fluid expands, becomes less dense, rises, and cooler denser fluid moves in to replace it.",
    "distractors": [
      "The heated fluid contracts, becomes denser and rises.",
      "The fluid becomes solid and remains fixed.",
      "Radiation forces all particles downward."
    ],
    "explanation": "Density differences caused by heating drive bulk circulation.",
    "tags": [
      "convection",
      "density"
    ]
  },
  {
    "objective": "B4.2",
    "profile": "KC",
    "stem": "Convection occurs in",
    "correct": "liquids and gases because they can flow.",
    "distractors": [
      "solids only.",
      "a perfect vacuum only.",
      "all materials equally, including rigid solids."
    ],
    "explanation": "Convection requires bulk movement of a fluid.",
    "tags": [
      "convection"
    ]
  },
  {
    "objective": "B4.2",
    "profile": "UK",
    "stem": "During the day, a sea breeze often develops because",
    "correct": "land warms faster, air above it rises, and cooler air moves in from the sea.",
    "distractors": [
      "the sea always becomes hotter than land first.",
      "air over the land becomes denser when heated.",
      "conduction through a vacuum pulls air inland."
    ],
    "explanation": "Unequal heating sets up a convection circulation.",
    "tags": [
      "convection",
      "sea-breeze"
    ]
  },
  {
    "objective": "B4.2",
    "profile": "UK",
    "stem": "Why is a room heater often placed near the floor rather than near the ceiling?",
    "correct": "Heated air rises and helps set up circulation through the room.",
    "distractors": [
      "Cold air always rises above hot air.",
      "Convection occurs only in solids.",
      "Radiation cannot travel upward."
    ],
    "explanation": "Low placement supports a convection current as warm low-density air rises.",
    "tags": [
      "convection",
      "application"
    ]
  },
  {
    "objective": "B4.3",
    "profile": "KC",
    "stem": "Thermal radiation is mainly transferred as",
    "correct": "infrared electromagnetic waves.",
    "distractors": [
      "longitudinal sound waves.",
      "moving liquid currents only.",
      "electrons crossing a metal wire only."
    ],
    "explanation": "Thermal radiation is electromagnetic, mainly in the infrared region for ordinary temperatures.",
    "tags": [
      "radiation",
      "infrared"
    ]
  },
  {
    "objective": "B4.3",
    "profile": "KC",
    "stem": "Which method of thermal energy transfer can occur through a vacuum?",
    "correct": "Radiation.",
    "distractors": [
      "Conduction only.",
      "Convection only.",
      "Conduction and convection only."
    ],
    "explanation": "Electromagnetic radiation does not require a material medium.",
    "tags": [
      "radiation",
      "vacuum"
    ]
  },
  {
    "objective": "B4.3",
    "profile": "UK",
    "stem": "How does most thermal energy from the Sun reach Earth?",
    "correct": "By electromagnetic radiation through space.",
    "distractors": [
      "By convection currents through the vacuum.",
      "By conduction through particles filling all of space.",
      "By sound waves."
    ],
    "explanation": "Space is effectively a vacuum, so radiation carries the energy.",
    "tags": [
      "radiation",
      "sun"
    ]
  },
  {
    "objective": "B4.3",
    "profile": "KC",
    "stem": "As the temperature of a body increases, the rate at which it emits thermal radiation generally",
    "correct": "increases.",
    "distractors": [
      "decreases to zero.",
      "stays exactly constant.",
      "depends only on its mass and not its temperature."
    ],
    "explanation": "Hotter bodies emit thermal radiation more strongly.",
    "tags": [
      "radiation",
      "emission"
    ]
  },
  {
    "objective": "B4.4",
    "profile": "XS",
    "stem": "Two identical cans, one dull black and one shiny silvered, contain equal amounts of water at the same initial temperature. To compare emission fairly, which variable should be kept the same?",
    "correct": "The volume of water in each can.",
    "distractors": [
      "The surface finish of the cans.",
      "Whether one can is heated continuously and the other is not.",
      "The time intervals at which one can is read only."
    ],
    "explanation": "A fair comparison changes surface finish while controlling other relevant variables such as water volume and initial temperature.",
    "tags": [
      "radiation",
      "experiment",
      "controls"
    ]
  },
  {
    "objective": "B4.4",
    "profile": "XS",
    "stem": "To compare absorption by two differently finished surfaces using a radiant heater, the surfaces should be placed",
    "correct": "at the same distance and orientation from the heater.",
    "distractors": [
      "at different distances chosen at random.",
      "one inside a vacuum and one in water.",
      "with different areas and different starting temperatures."
    ],
    "explanation": "Equal geometry controls the incident radiation so surface finish is the manipulated variable.",
    "tags": [
      "radiation",
      "experiment"
    ]
  },
  {
    "objective": "B4.4",
    "profile": "KC",
    "stem": "A Leslie cube is useful for investigating",
    "correct": "how surface finish affects thermal radiation emitted at the same temperature.",
    "distractors": [
      "how pressure changes with gas volume.",
      "the latent heat of fusion directly.",
      "the speed of sound."
    ],
    "explanation": "Different faces at the same temperature let emission from different finishes be compared.",
    "tags": [
      "radiation",
      "leslie-cube"
    ]
  },
  {
    "objective": "B4.4",
    "profile": "XS",
    "stem": "In an investigation of how surface colour affects radiation emission, the manipulated variable should be",
    "correct": "the surface finish or colour.",
    "distractors": [
      "the starting temperature and surface finish together.",
      "the mass and shape of every container independently.",
      "the time unit used on the clock."
    ],
    "explanation": "Only the surface property under investigation should be deliberately changed.",
    "tags": [
      "radiation",
      "experiment",
      "variables"
    ]
  },
  {
    "objective": "B4.5",
    "profile": "KC",
    "stem": "Which surface is generally the best absorber and emitter of thermal radiation?",
    "correct": "A dull black surface.",
    "distractors": [
      "A shiny silvered surface.",
      "A polished white metal surface.",
      "A mirror-like surface."
    ],
    "explanation": "Good absorbers are good emitters, and dull black surfaces are strong at both.",
    "tags": [
      "radiation",
      "surface"
    ]
  },
  {
    "objective": "B4.5",
    "profile": "KC",
    "stem": "A shiny silvered surface is generally",
    "correct": "a poor absorber and poor emitter of thermal radiation.",
    "distractors": [
      "a strong absorber and strong emitter.",
      "a good emitter but poor absorber.",
      "unable to reflect radiation."
    ],
    "explanation": "Good absorption and emission go together; shiny surfaces tend to be poor at both and good reflectors.",
    "tags": [
      "radiation",
      "surface"
    ]
  },
  {
    "objective": "B4.5",
    "profile": "UK",
    "stem": "Why are refrigerator condenser fins often dark or black?",
    "correct": "A dark surface is a good emitter, helping transfer thermal energy to the surroundings.",
    "distractors": [
      "Black surfaces prevent all conduction.",
      "Black surfaces have zero heat capacity.",
      "The colour makes convection impossible."
    ],
    "explanation": "Dark surfaces emit radiation more effectively.",
    "tags": [
      "radiation",
      "application"
    ]
  },
  {
    "objective": "B4.5",
    "profile": "UK",
    "stem": "Why is emergency thermal foil shiny?",
    "correct": "Its shiny surface is a poor emitter and good reflector of thermal radiation.",
    "distractors": [
      "It is a perfect conductor that removes heat from the person.",
      "It increases evaporation from the skin.",
      "It creates thermal energy inside the body."
    ],
    "explanation": "Low emissivity and high reflectivity reduce radiative energy loss.",
    "tags": [
      "radiation",
      "application"
    ]
  },
  {
    "objective": "B4.6",
    "profile": "UK",
    "stem": "In a vacuum flask, the vacuum between the walls mainly reduces",
    "correct": "conduction and convection.",
    "distractors": [
      "radiation only.",
      "electrical current only.",
      "evaporation through an open neck only."
    ],
    "explanation": "With almost no particles between the walls, conduction and convection across the gap are greatly reduced.",
    "tags": [
      "vacuum-flask",
      "thermal-transfer"
    ]
  },
  {
    "objective": "B4.6",
    "profile": "UK",
    "stem": "Why are the facing walls of a vacuum flask silvered?",
    "correct": "To reduce transfer by thermal radiation through reflection and low emissivity.",
    "distractors": [
      "To increase convection in the vacuum.",
      "To make the glass conduct better.",
      "To increase evaporation at the neck."
    ],
    "explanation": "Silvered shiny surfaces are poor emitters and good reflectors.",
    "tags": [
      "vacuum-flask",
      "radiation"
    ]
  },
  {
    "objective": "B4.6",
    "profile": "UK",
    "stem": "What is an important function of the stopper in a vacuum flask?",
    "correct": "It limits convection and evaporation through the neck and provides an insulating closure.",
    "distractors": [
      "It increases radiation by making the surface black.",
      "It keeps the vacuum filled with water.",
      "It forces thermal energy to conduct through metal."
    ],
    "explanation": "The neck is a remaining path for energy transfer, so an insulating stopper reduces it.",
    "tags": [
      "vacuum-flask",
      "design"
    ]
  },
  {
    "objective": "B4.6",
    "profile": "UK",
    "stem": "Why is the absorber plate of a solar water heater often painted dull black?",
    "correct": "To absorb incident solar radiation efficiently.",
    "distractors": [
      "To reflect most incoming radiation away.",
      "To prevent the water from warming.",
      "To eliminate conduction into the water."
    ],
    "explanation": "Dull black surfaces are good absorbers of radiation.",
    "tags": [
      "solar-heater",
      "radiation"
    ]
  }
];


function makeQuestion(spec,index){
  const answer=index%4;
  const options=[...spec.distractors];
  options.splice(answer,0,spec.correct);
  const traps=options.map((option,i)=>i===answer?'':`This option does not satisfy ${spec.objective}.`);
  const topic=spec.objective.split('.')[0];
  const serial=String(index+1).padStart(3,'0');
  return Object.freeze({
    id:`b-thermal-${serial}`,
    objective:spec.objective,
    topic,
    profile:spec.profile,
    stem:spec.stem,
    options:Object.freeze(options),
    answer,
    explanation:spec.explanation,
    traps:Object.freeze(traps),
    tags:Object.freeze(spec.tags||[]),
  });
}

export const SECTION_B_MCQ_BANK=Object.freeze(SPECS.map(makeQuestion));

function flashcardsForTopic(topic){
  return topic.objectives.flatMap(([objective,syllabusWording])=>{
    const card=topic.objectiveCards?.[objective]||{};
    const secondFront=card.formula?`State the key relationship for ${objective}.`:`What should you watch out for in ${objective}?`;
    const secondBack=card.formula||card.watchOut||card.detail||'';
    return [
      {id:`fc-${objective.toLowerCase().replace('.','-')}-1`,objective,topic:topic.id,front:syllabusWording,back:card.inShort||card.detail||'',syllabusWording},
      {id:`fc-${objective.toLowerCase().replace('.','-')}-2`,objective,topic:topic.id,front:secondFront,back:secondBack,syllabusWording},
      {id:`fc-${objective.toLowerCase().replace('.','-')}-3`,objective,topic:topic.id,front:`How is ${objective} assessed?`,back:card.howAsked||'Apply the syllabus objective accurately and include the required Physics conditions and units.',syllabusWording},
    ];
  });
}
export const SECTION_B_FLASHCARDS=Object.freeze(SECTION_B_THERMAL_LESSONS.flatMap(flashcardsForTopic));

export const SECTION_B_TOPICS=Object.freeze(SECTION_B_THERMAL_LESSONS.map(topic=>Object.freeze({
  id:topic.id,title:topic.title,lesson:topic,
  objectives:Object.freeze(Object.fromEntries(topic.objectives)),
  mcq:Object.freeze(SECTION_B_MCQ_BANK.filter(q=>q.topic===topic.id)),
  flashcards:Object.freeze(SECTION_B_FLASHCARDS.filter(card=>card.topic===topic.id)),
})));

function rng(seed){let s=(Number(seed)>>>0)||1;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296);}
function shuffle(items,random){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out;}
export function buildSectionBObjectiveAudit({seed=1}={}){
  const random=rng(seed),selected=[];
  for(const objective of Object.keys(SECTION_B_OBJECTIVES)){
    const pool=SECTION_B_MCQ_BANK.filter(q=>q.objective===objective);
    if(!pool.length) throw new Error(`No Section B MCQ for ${objective}`);
    selected.push(pool[Math.floor(random()*pool.length)]);
  }
  return shuffle(selected,random);
}
// Internal SPARK Section B checkpoint. This is not a claim about exact CXC
// Paper 01 section weighting. Quotas keep all four Thermal topics represented.
export const DEFAULT_SECTION_B_CHECKPOINT_QUOTAS=Object.freeze({B1:3,B2:13,B3:8,B4:6});
export function buildSectionBCheckpoint({seed=1,quotas=DEFAULT_SECTION_B_CHECKPOINT_QUOTAS}={}){
  const random=rng(seed),selected=[];
  for(const topic of SECTION_B_TOPICS){
    const count=Number(quotas[topic.id]||0),pool=shuffle(topic.mcq,random);
    if(count>pool.length) throw new Error(`Quota ${count} exceeds ${topic.id} pool`);
    selected.push(...pool.slice(0,count));
  }
  return shuffle(selected,random);
}
export function sectionBStats(){
  return {section:'B',topics:SECTION_B_TOPICS.length,objectives:Object.keys(SECTION_B_OBJECTIVES).length,mcq:SECTION_B_MCQ_BANK.length,flashcards:SECTION_B_FLASHCARDS.length,
    byTopic:Object.fromEntries(SECTION_B_TOPICS.map(t=>[t.id,{objectives:Object.keys(t.objectives).length,mcq:t.mcq.length,flashcards:t.flashcards.length}]))};
}
