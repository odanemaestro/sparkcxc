// Generated from the user-supplied CSEC Physics study notes and normalized for SPARK.
// The objective wording is retained for syllabus alignment. Supporting text is used as audited study guidance.

export const PHYSICS_WORKBOOK_SECTIONS = Object.freeze({
  "A": "Mechanics",
  "B": "Thermal Physics and Kinetic Theory",
  "C": "Waves and Optics",
  "D": "Electricity and Magnetism",
  "E": "The Physics of the Atom"
});

export const PHYSICS_WORKBOOK_TOPICS = Object.freeze([
  {
    "code": "A1",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Scientific Method and Measurement",
    "oneSentence": "How physics decides what is true, and how a quantity is measured, recorded and plotted so that the result can be trusted.",
    "whyItMatters": "Paper 02 opens with a compulsory data analysis question in every sitting. It hands you a table of readings and asks you to plot them, draw a best fit line, find a gradient and say what could have gone wrong. That question is this topic. Experimental Skills is also a fifth of the whole certificate.",
    "explanation": [
      "Physics is not a list of facts to remember. It is a method for settling arguments about the world by measurement. Galileo is in the syllabus because he was the first to insist on that method: he did not ask what a falling body ought to do, he timed one and let the timing decide.",
      "The method has a shape you will be asked to reproduce. You notice something and ask a question about it. You turn the question into a hypothesis, which is a statement clear enough to be proved wrong. You design an experiment that changes one thing, keeps the others fixed, and measures the effect. You record the readings, plot them, and see whether the result supports the hypothesis or not."
    ],
    "objectiveCount": 10,
    "objectives": [
      {
        "code": "A1.1",
        "statement": "discuss how the methodology employed by Galileo contributed to the development of Physics",
        "summary": "Galileo tested his ideas by experiment and measurement instead of accepting what earlier authorities had said, and he described motion using mathematics. That combination, measure it and then model it, is the method physics still uses.",
        "formula": "",
        "exam": "Usually ‘discuss the contribution of Galileo to the development of physics’ or ‘state TWO features of the scientific method’. Marks are for naming the features, experiment, measurement, mathematical description, and for saying that observation is used to test an idea rather than to illustrate it.",
        "watch": "Do not just say he ‘dropped things from a tower’. The marks are for the method, not the story."
      },
      {
        "code": "A1.2",
        "statement": "investigate the factors which might affect the period of a simple pendulum",
        "summary": "Change one factor at a time. Vary the length of the string while keeping the mass of the bob and the angle of swing fixed, then vary each of the others in turn. Only the length changes the period.",
        "formula": "T = 2π √(l / g)",
        "exam": "Asked as a planning and designing question, or as the data analysis question with the timings supplied. Marks are for identifying the manipulated, responding and controlled variables, for timing several swings rather than one, and for a table with the right headings and units.",
        "watch": "Measuring the string only, instead of to the centre of the bob. Using a large angle, where the relationship stops holding."
      },
      {
        "code": "A1.3",
        "statement": "use graphs of experimental data from the simple pendulum",
        "summary": "Plot the quantity you changed on the horizontal axis and the quantity you measured on the vertical axis, use a scale that fills at least half the grid, label both axes with quantity and unit, and mark each point with a cross or a dot in a circle.",
        "formula": "",
        "exam": "‘Plot a graph of … against …’ The first named quantity goes on the vertical axis. Marks are for the axes with units, a sensible scale, correctly plotted points and a best fit line.",
        "watch": "Awkward scales such as 3 units to a square, which cause plotting mistakes. A scale that squeezes the points into a corner of the grid loses a mark on its own."
      },
      {
        "code": "A1.4",
        "statement": "draw a line of ‘best fit’ for a set of plotted values",
        "summary": "A best fit line is the straight line that passes as close as possible to all the plotted points, with roughly as many points above it as below. It is drawn with a ruler and it does not have to pass through any particular point.",
        "formula": "",
        "exam": "‘Draw the best fit straight line.’ Marks are for using a ruler, for balancing points on both sides, and for not forcing the line through the origin unless the physics requires it.",
        "watch": "Joining the points dot to dot. That is not a best fit line and earns nothing."
      },
      {
        "code": "A1.5",
        "statement": "determine the gradient of the straight line graph",
        "summary": "Choose two points on the line, not plotted points, that are far apart. Read off the change in the vertical quantity and the change in the horizontal quantity, and divide. Give the gradient a unit, worked out from the two axis units.",
        "formula": "gradient = Δy / Δx",
        "exam": "‘Determine the gradient of the graph’ or ‘use the graph to find …’. Marks are for a large triangle drawn on the graph, correct readings from it, the division, and the unit.",
        "watch": "Using two of the plotted points instead of two points on the line. Omitting the unit."
      },
      {
        "code": "A1.6",
        "statement": "express the result of a measurement or calculation to an appropriate number of significant figures",
        "summary": "Give the answer to the same number of significant figures as the least precise reading it came from, usually two or three in this examination.",
        "formula": "",
        "exam": "‘Give your answer to an appropriate number of significant figures’ or ‘to 2 decimal places’. A correct number in the wrong form loses the accuracy mark.",
        "watch": "Copying every digit off the calculator. Rounding an intermediate value and then using the rounded one."
      },
      {
        "code": "A1.7",
        "statement": "discuss possible types and sources of error in any measurement",
        "summary": "Random errors change size and direction from reading to reading and are reduced by repeating and averaging. Systematic errors are the same every time and are not reduced by repeating; they include zero error and a wrongly calibrated instrument. Parallax error comes from reading a scale at an angle.",
        "formula": "",
        "exam": "‘State ONE source of error in this experiment and how it could be reduced.’ The mark requires the error to be named and the reduction to match it: repeating helps a random error, checking the zero helps a systematic one.",
        "watch": "Writing ‘human error’. It names nothing. Say what the human did wrong: read the scale at an angle, started the stopwatch late."
      },
      {
        "code": "A1.8",
        "statement": "use a variety of instruments to measure different quantities",
        "summary": "Metre rule for lengths to the nearest millimetre, vernier caliper to 0.01 cm, micrometer screw gauge to 0.01 mm, balance for mass, stopwatch for time, measuring cylinder for the volume of a liquid.",
        "formula": "",
        "exam": "‘Name a suitable instrument for measuring …’ or a diagram of a vernier or micrometer scale to read. Reading the scale correctly is a standard Paper 01 item.",
        "watch": "Giving a reading without a unit, or quoting a vernier reading to more places than the instrument allows."
      },
      {
        "code": "A1.9",
        "statement": "assess the suitability of instruments on the basis of sensitivity, accuracy and range",
        "summary": "Sensitivity is the smallest change an instrument can show. Accuracy is how close its reading is to the true value. Range is the largest and smallest values it can measure. A suitable instrument has enough sensitivity for the change you expect and a range that covers the values.",
        "formula": "",
        "exam": "‘Give a reason for your choice of instrument.’ The mark is for linking the property to the measurement: the change expected is small, so the more sensitive instrument is needed.",
        "watch": "Treating sensitive and accurate as the same word. A sensitive instrument with a zero error is precise and wrong."
      },
      {
        "code": "A1.10",
        "statement": "apply the formula for density: ρ = m / V",
        "summary": "Density is the mass of a substance divided by its volume, ρ = m / V. Find the mass on a balance and the volume by measuring the sides of a regular solid, or by displacement of water for an irregular one.",
        "formula": "ρ = m / V",
        "exam": "‘Calculate the density of the material.’ Marks are for the substitution and for the unit. Watch the units given: a mass in grams with a volume in cm³ gives g/cm³, and 1 g/cm³ is 1000 kg/m³.",
        "watch": "Mixing grams with m³. Forgetting to subtract the empty cylinder’s mass."
      }
    ]
  },
  {
    "code": "A2",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Vectors",
    "oneSentence": "Which quantities need a direction as well as a size, and how to combine or split them.",
    "whyItMatters": "Forces, velocities and momentum are all vectors, so getting the direction wrong turns a correct calculation into a wrong answer. Vector questions appear in Paper 01 every sitting and inside the structured questions on forces and motion.",
    "explanation": [
      "Some quantities are fully described by a number and a unit. A mass of 5 kg is 5 kg no matter which way you face. These are scalars.",
      "Other quantities are not complete until you say which way. A force of 5 N pushing east and a force of 5 N pushing west have the same size and opposite effects. These are vectors, and they must be added in a way that respects direction."
    ],
    "objectiveCount": 4,
    "objectives": [
      {
        "code": "A2.1",
        "statement": "distinguish between scalars and vectors and give examples of each",
        "summary": "A scalar has magnitude only: mass, time, distance, speed, energy, temperature. A vector has magnitude and direction: displacement, velocity, acceleration, force, weight, momentum.",
        "formula": "",
        "exam": "‘Distinguish between a scalar and a vector quantity and give ONE example of each.’ Both halves are needed: the definition and an example that is actually of that type.",
        "watch": "Calling weight a scalar. Weight is a force and therefore a vector; mass is the scalar."
      },
      {
        "code": "A2.2",
        "statement": "use scale diagrams to find the resultant of two vectors",
        "summary": "Draw the first vector to scale, draw the second starting at the tip of the first and in its own direction, then draw the line from the tail of the first to the tip of the second. That closing line is the resultant. Measure its length and convert with your scale, and measure its angle with a protractor.",
        "formula": "",
        "exam": "‘Using a scale drawing, determine the magnitude and direction of the resultant.’ Marks are for stating the scale, for the construction, for the measured length converted correctly, and for the direction.",
        "watch": "Not stating the scale. Measuring the resultant but forgetting to convert it back into newtons or metres per second."
      },
      {
        "code": "A2.3",
        "statement": "calculate the resultant of vectors which are parallel, anti-parallel and perpendicular",
        "summary": "Parallel vectors add: 6 N east and 4 N east give 10 N east. Anti-parallel vectors subtract: 6 N east and 4 N west give 2 N east. Perpendicular vectors combine by Pythagoras, with the direction from a tangent.",
        "formula": "R = √(A² + B²), tan θ = B / A",
        "exam": "‘Calculate the magnitude of the resultant force and state its direction.’ The direction must be described against something fixed: north of east, or the angle to the horizontal.",
        "watch": "Using Pythagoras on vectors that are not at right angles. Giving the angle without saying what it is measured from."
      },
      {
        "code": "A2.4",
        "statement": "explain that a single vector is equivalent to two other vectors at right angles",
        "summary": "Any single vector can be replaced by two vectors at right angles that together produce the same effect. These are its components, and they are found with F cos θ along the direction of the angle and F sin θ perpendicular to it.",
        "formula": "horizontal = F cos θ, vertical = F sin θ",
        "exam": "‘Explain why a single force may be represented by two forces at right angles’ or a diagram with a force at an angle to resolve. Which function goes with which component depends on where the angle is, so mark the angle on your diagram first.",
        "watch": "Using sine where cosine belongs. Check by asking whether the component is next to the angle, which takes cosine, or opposite it, which takes sine."
      }
    ]
  },
  {
    "code": "A3",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Statics",
    "oneSentence": "What forces do, how a force turns something about a pivot, and what keeps a body balanced or stable.",
    "whyItMatters": "Moments, the principle of moments and Hooke’s law are among the most heavily examined ideas in Section A. A structured question on a beam balanced on a pivot appears very regularly, and Hooke’s law is a standard data analysis question.",
    "explanation": [
      "A force is a push or a pull. You never see a force itself, only what it does: it can change the size of a body, change its shape, or change its motion by speeding it up, slowing it down or turning it.",
      "Forces come in a small number of kinds. Gravitational force acts between masses and gives an object its weight. Electric force acts between charges. Magnetic force acts between magnets and moving charges. Nuclear force holds the particles of a nucleus together. Contact forces such as friction and tension are the everyday face of electric forces between atoms."
    ],
    "objectiveCount": 14,
    "objectives": [
      {
        "code": "A3.1",
        "statement": "explain the effects of forces",
        "summary": "A force can change the size of a body, change its shape, or change its motion, meaning start it, stop it, speed it up, slow it down or change its direction.",
        "formula": "",
        "exam": "‘State THREE effects of a force.’ One mark each. Change of motion counts once even if you list starting and stopping separately, so give size, shape and motion.",
        "watch": "Listing ‘push’ and ‘pull’ as effects. Those are what a force is, not what it does."
      },
      {
        "code": "A3.2",
        "statement": "identify types of forces",
        "summary": "Gravitational force acts between any two masses. Electric force acts between charges. Magnetic force acts between magnets and between moving charges. Nuclear force holds protons and neutrons together in the nucleus.",
        "formula": "",
        "exam": "‘Identify the type of force acting in each situation.’ Typical situations: a comb picking up paper, electric; a compass needle turning, magnetic; a ball falling, gravitational; protons held in a nucleus, nuclear.",
        "watch": "Calling friction a fifth fundamental force. Friction is a contact force, electric in origin."
      },
      {
        "code": "A3.3",
        "statement": "determine the weight of objects",
        "summary": "Weight is the gravitational force on a mass, W = m g. With g = 10 N/kg on Earth, a mass of 3 kg has a weight of 30 N.",
        "formula": "W = m g",
        "exam": "‘Calculate the weight of a body of mass …’ or a graph of weight against mass whose gradient must be found and identified as g. State the unit: newtons for weight, kilograms for mass.",
        "watch": "Answering in kilograms. Weight is a force and is measured in newtons."
      },
      {
        "code": "A3.4",
        "statement": "show how derived quantities and their related units are produced",
        "summary": "A derived quantity is built from the base quantities by multiplying or dividing, and its unit is built the same way. Density is mass divided by volume, so its unit is kg divided by m³, written kg/m³.",
        "formula": "",
        "exam": "‘Show that the unit of … is …’ or ‘derive the unit of the gradient’. Marks are for writing the defining equation first and then substituting units into it.",
        "watch": "Guessing the unit from memory instead of deriving it. The derivation is the mark."
      },
      {
        "code": "A3.5",
        "statement": "recall the special names given to the units for some derived quantities",
        "summary": "Some derived units have their own names: the newton (N) for force, the joule (J) for energy and work, the watt (W) for power, the pascal (Pa) for pressure, the hertz (Hz) for frequency.",
        "formula": "",
        "exam": "‘State the SI unit of …’ or ‘express the newton in base units’. Both directions are examined.",
        "watch": "Confusing the joule with the newton metre in the context of moments, where the correct unit is the newton metre and the name joule is not used."
      },
      {
        "code": "A3.6",
        "statement": "express derived units using the index notation",
        "summary": "Index notation writes a unit with powers instead of a division line: m/s becomes m s⁻¹, m/s² becomes m s⁻², kg/m³ becomes kg m⁻³.",
        "formula": "",
        "exam": "Units appear in index form throughout Paper 01 and in the table headings of the data analysis question, so a heading may read ‘t/s’ or ‘v/m s⁻¹’.",
        "watch": "Reading m s⁻¹ as anything other than metres per second."
      },
      {
        "code": "A3.7",
        "statement": "identify situations in which the application of a force will result in a turning effect",
        "summary": "A turning effect is produced when a force acts on a body that is free to turn about a pivot, and the line of action of the force does not pass through the pivot. Opening a door, using a spanner, sitting on a seesaw.",
        "formula": "",
        "exam": "‘Identify the pivot’ or ‘explain why the force produces a turning effect’. Naming the pivot correctly is often the first mark of a beam question.",
        "watch": "Measuring the distance to where your hand is rather than perpendicular to the line of the force."
      },
      {
        "code": "A3.8",
        "statement": "define the moment of a force, T",
        "summary": "The moment of a force about a point is the force multiplied by the perpendicular distance from that point to the line of action of the force. Its unit is the newton metre (N m).",
        "formula": "moment = F × d",
        "exam": "‘Define the moment of a force.’ The definition mark requires both the force and the perpendicular distance from the pivot, and the unit. ‘Calculate the moment of the 8 N force about the pivot’ expects the multiplication, the unit, and often the direction of turning.",
        "watch": "Leaving out the word perpendicular. Giving the unit as joules."
      },
      {
        "code": "A3.9",
        "statement": "apply the principle of moments",
        "summary": "For a body in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about the same point. Use it with ‘total upward force equals total downward force’ to find unknown forces or distances.",
        "formula": "sum of clockwise moments = sum of anticlockwise moments",
        "exam": "‘Calculate the distance x at which the beam balances’ or ‘determine the force at the support’. Marks are for stating the principle, for correct moment terms with distances measured from the chosen pivot, and for the answer with its unit.",
        "watch": "Measuring distances from the end of the rule instead of from the pivot. Ignoring the weight of a non-uniform or heavy beam."
      },
      {
        "code": "A3.10",
        "statement": "explain the action of common tools and devices as levers",
        "summary": "A lever is a rigid bar turning about a pivot. In every lever you can identify the load being moved, the effort applied, and the fulcrum it turns about. A crowbar, a pair of scissors, a bottle opener and a wheelbarrow are all levers.",
        "formula": "",
        "exam": "‘Label the load, effort and fulcrum on the diagram’ or ‘explain how the tool makes the job easier’. The explanation needs moments: the effort acts at a greater distance, so a smaller force gives the same moment.",
        "watch": "Saying a lever ‘creates’ force. It does not. It trades a smaller force over a larger distance."
      },
      {
        "code": "A3.11",
        "statement": "determine the location of the centre of gravity of a body",
        "summary": "The centre of gravity is the single point where the whole weight of a body can be taken to act. For a regular shape it is at the geometric centre. For an irregular lamina, hang it from a point, hang a plumbline from the same point and draw the line, repeat from a second point, and the centre of gravity is where the lines cross.",
        "formula": "",
        "exam": "‘Describe an experiment to determine the centre of gravity of an irregular lamina.’ Marks are for suspending freely, the plumbline, marking the line, repeating from a different point, and the intersection.",
        "watch": "Suspending from only one point. One line is not enough to fix a point."
      },
      {
        "code": "A3.12",
        "statement": "relate the stability of an object to the position of its centre of gravity and its weight",
        "summary": "A body is stable when its centre of gravity is low and its base is wide, because tilting it raises the centre of gravity and its weight turns it back. It topples when the vertical line through its centre of gravity falls outside the base.",
        "formula": "",
        "exam": "‘Explain, in terms of the centre of gravity, why … is more stable.’ Both parts are needed: a low centre of gravity and a wide base, and the reason, that the vertical line stays within the base when tilted.",
        "watch": "Saying only ‘it is heavier at the bottom’ without mentioning the base or the line of action of the weight."
      },
      {
        "code": "A3.13",
        "statement": "investigate the relationship between extension and force",
        "summary": "Hang known weights from a spring, measure the length each time, and work out the extension as the new length minus the original length. Plot force against extension. The graph is a straight line through the origin until the limit of proportionality, after which it curves.",
        "formula": "",
        "exam": "This is a standard data analysis question. Marks are for the table with extension calculated correctly, the plotted graph, the straight line, the gradient, and for identifying the limit of proportionality on the curve.",
        "watch": "Plotting the total length instead of the extension, which gives a line with an intercept and loses the proportionality. Confusing the limit of proportionality with the elastic limit; they are different points."
      },
      {
        "code": "A3.14",
        "statement": "solve problems using Hooke’s law",
        "summary": "Hooke’s law says the extension of a spring is proportional to the force applied, provided the limit of proportionality is not exceeded. Written as F = k x, where k is the spring constant in N/m.",
        "formula": "F = k x",
        "exam": "‘Calculate the spring constant’ from a gradient, or ‘calculate the extension produced by a force of …’. The proviso, that the limit of proportionality is not exceeded, is often worth a mark in the statement of the law.",
        "watch": "Omitting the condition when stating the law. Using a force beyond the straight part of the graph, where the law no longer applies."
      }
    ]
  },
  {
    "code": "A4",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Kinematics and Dynamics",
    "oneSentence": "Describing motion with distance, speed and acceleration, then explaining it with Newton’s laws and momentum.",
    "whyItMatters": "Velocity-time graphs and Newton’s laws appear in almost every Paper 02, and conservation of momentum is a standard extended response question. The graph work also feeds straight into the data analysis question.",
    "explanation": [
      "Kinematics describes motion without asking what causes it. Distance is how far something has travelled and is a scalar. Displacement is how far it has ended up from where it started, together with the direction, and is a vector. Walk 100 m up the road and back and your distance is 200 m while your displacement is zero.",
      "Speed is distance divided by time and is a scalar. Velocity is displacement divided by time and is a vector, so it changes if either the speed or the direction changes. Acceleration is the change in velocity divided by the time taken, so a body slowing down has a negative acceleration and a body turning at constant speed is still accelerating."
    ],
    "objectiveCount": 8,
    "objectives": [
      {
        "code": "A4.1",
        "statement": "define the terms: distance, displacement, speed, velocity, acceleration",
        "summary": "Distance is the length of the path travelled, a scalar. Displacement is the straight line from start to finish with its direction, a vector. Speed is distance per unit time, a scalar. Velocity is displacement per unit time, a vector. Acceleration is the rate of change of velocity.",
        "formula": "a = (v − u) / t",
        "exam": "‘Define acceleration’ or ‘distinguish between speed and velocity’. The definition of acceleration must say rate of change of velocity, not rate of change of speed, and the unit is m/s².",
        "watch": "Defining acceleration as ‘getting faster’. Slowing down and turning are both accelerations."
      },
      {
        "code": "A4.2",
        "statement": "apply displacement- time and velocity- time graphs",
        "summary": "On a displacement-time graph the gradient is the velocity. On a velocity-time graph the gradient is the acceleration and the area under the line is the distance travelled.",
        "formula": "velocity = gradient of displacement-time graph; acceleration = gradient of velocity-time graph; distance = area under velocity-time graph",
        "exam": "‘Describe the motion shown in each section of the graph’ and ‘calculate the total distance travelled’. Describing the motion needs the words at rest, constant velocity, accelerating uniformly or decelerating, matched to the right section.",
        "watch": "Finding the area under a displacement-time graph. Reading a gradient without using the axis units, which gives a number with no meaning."
      },
      {
        "code": "A4.3",
        "statement": "discuss Aristotle’s arguments in support of his “law of motion”, that is, v  F”",
        "summary": "Aristotle held that a force must act continuously to keep a body moving, so velocity is proportional to force. It fits everyday experience because friction is always present, but it is wrong: it cannot explain why a body keeps moving after the push stops.",
        "formula": "",
        "exam": "‘Discuss Aristotle’s law of motion and explain why it was discredited.’ Marks are for stating his claim that v is proportional to F, for the everyday observation that supports it, and for the observation it cannot explain.",
        "watch": "Dismissing Aristotle as simply foolish. The marks are for explaining why his rule looked right and what defeated it."
      },
      {
        "code": "A4.4",
        "statement": "state Newton’s three laws of motion",
        "summary": "First law: a body stays at rest or moves with constant velocity unless a resultant force acts on it. Second law: the resultant force equals mass times acceleration, F = m a. Third law: for every action there is an equal and opposite reaction, acting on a different body.",
        "formula": "F = m a",
        "exam": "‘State Newton’s first law of motion.’ The word resultant, or the phrase unbalanced force, is usually required. For the third law, the phrase ‘on a different body’ or ‘on another object’ is what separates a full answer from a half one.",
        "watch": "Stating the first law without the word resultant, which makes it say that a body with any force on it must change velocity."
      },
      {
        "code": "A4.5",
        "statement": "use Newton’s laws to explain dynamic systems",
        "summary": "Identify the resultant force on the body, then apply F = m a or the relevant law. A rocket rises because the engine pushes gas down and the gas pushes the rocket up, which is the third law. A garden sprinkler turns for the same reason.",
        "formula": "F = m a",
        "exam": "‘Use Newton’s laws to explain how a rocket is propelled’ or ‘calculate the acceleration of the body’. In an explanation, name the law you are using and say what pushes what.",
        "watch": "Saying a rocket pushes against the air. It does not need air, and works in space, because the pair of forces is between the rocket and its exhaust gas."
      },
      {
        "code": "A4.6",
        "statement": "define linear momentum",
        "summary": "Linear momentum is the product of the mass of a body and its velocity, p = m v. It is a vector, in the direction of the velocity, and its unit is kg m/s, which is the same as the newton second.",
        "formula": "p = m v",
        "exam": "‘Define linear momentum and state its unit.’ Both are needed. The unit may be written kg m s⁻¹ or N s.",
        "watch": "Confusing momentum with kinetic energy. Momentum is m v and is a vector; kinetic energy is ½ m v² and is a scalar."
      },
      {
        "code": "A4.7",
        "statement": "describe situations that demonstrate the law of conservation of linear momentum",
        "summary": "A ball rebounding from a wall, two trolleys colliding on a track, a gun recoiling as a bullet leaves it, a rocket rising as gas is pushed out. In each case the total momentum before equals the total momentum after.",
        "formula": "",
        "exam": "‘Describe a situation which demonstrates the conservation of linear momentum.’ Marks are for the situation and for saying what is equal to what: total momentum before equals total momentum after.",
        "watch": "Describing a situation where an external force clearly acts, such as a ball hitting the ground, without noting that the Earth is part of the system."
      },
      {
        "code": "A4.8",
        "statement": "apply the law of conservation of linear momentum",
        "summary": "Total momentum before a collision equals total momentum after, provided no external force acts. Write m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂, take one direction as positive, and solve for the unknown.",
        "formula": "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
        "exam": "‘Calculate the velocity of the trolleys after the collision.’ Marks are for stating the principle, for correct signs on the velocities, for the substitution and for the answer with a direction as well as a size.",
        "watch": "Dropping the direction from the answer. A velocity of 2 m/s and one of −2 m/s are different answers."
      }
    ]
  },
  {
    "code": "A5",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Energy",
    "oneSentence": "What energy is, the forms it takes, how it moves between them, and the four quantities built on it: work, potential and kinetic energy, power and efficiency.",
    "whyItMatters": "Energy runs through the whole paper, and the Caribbean energy sources objective is one of the few places where an extended response question asks for discussion rather than calculation. Efficiency and power appear again in the electricity section.",
    "explanation": [
      "Energy is the capacity to do work, and work is done when a force moves something along the direction it acts. Both are measured in joules, and that shared unit is the clue that they are the same currency.",
      "Energy is never made or destroyed, only moved from one form to another. That is the law of conservation of energy, and it is the most useful single statement in the subject, because it lets you work out an unknown quantity at the end of a chain from a known one at the start."
    ],
    "objectiveCount": 13,
    "objectives": [
      {
        "code": "A5.1",
        "statement": "define energy",
        "summary": "Energy is the capacity to do work. Its unit is the joule (J).",
        "formula": "",
        "exam": "‘Define energy and state its unit.’ The definition and the unit are separate marks.",
        "watch": "Defining energy as ‘the power to do things’. Power is a different quantity with a different unit."
      },
      {
        "code": "A5.2",
        "statement": "identify the various forms of energy",
        "summary": "Gravitational, elastic, chemical, electrical, magnetic, electromagnetic, thermal, nuclear, kinetic and sound.",
        "formula": "",
        "exam": "‘Name the form of energy stored in …’ or ‘state the energy changes taking place’. Use the syllabus names: chemical, not ‘food energy’; elastic, not ‘spring energy’.",
        "watch": "Writing ‘heat energy’ where ‘thermal energy’ is the syllabus term, and ‘light energy’ where ‘electromagnetic’ is meant."
      },
      {
        "code": "A5.3",
        "statement": "describe the energy transformation(s) in a given situation",
        "summary": "Name the form the energy starts in, then each form it becomes, joined by arrows. A torch: chemical → electrical → light and thermal. Keep it to one or two steps, and remember thermal energy always appears as a by-product.",
        "formula": "",
        "exam": "‘Describe the energy transformations that occur.’ Marks are for each correct form in the correct order. Two-step chains are the limit the syllabus sets.",
        "watch": "Missing the starting form. A chain that begins at ‘electrical’ for a battery-powered device has skipped the chemical energy in the cell."
      },
      {
        "code": "A5.4",
        "statement": "apply the relationship: work = force x displacement",
        "summary": "Work is done when a force moves a body in the direction of the force, W = F × d, measured in joules. If nothing moves, or the movement is at right angles to the force, no work is done.",
        "formula": "W = F × d",
        "exam": "‘Calculate the work done in lifting the load.’ The force to use for lifting is the weight, mg, not the mass. Marks are for the correct force, the correct distance and the unit.",
        "watch": "Using mass in newtons. Multiply by g first. Using the total distance moved when only part of it was along the force."
      },
      {
        "code": "A5.5",
        "statement": "discuss the use of energy from alternative sources, and its importance to the Caribbean",
        "summary": "Alternative sources for the Caribbean include solar, wind, hydroelectric, geothermal, tidal and wave energy, and biomass. They matter because most Caribbean territories import fuel, so local renewable sources cut cost and reduce dependence, and they produce far less pollution.",
        "formula": "",
        "exam": "This is an extended response favourite: ‘discuss the use of alternative sources of energy and their importance to the Caribbean’. Marks are spread across naming sources, linking them to Caribbean conditions, and giving balanced advantages and disadvantages.",
        "watch": "Listing sources with no Caribbean link. The objective says ‘importance to the Caribbean’, and general answers lose the marks that phrase carries."
      },
      {
        "code": "A5.6",
        "statement": "define potential energy",
        "summary": "Potential energy is the energy a body has because of its position or its condition. A book on a shelf, a stretched spring, a charged cell and a compressed gas all store potential energy.",
        "formula": "",
        "exam": "‘Define potential energy and give TWO examples.’ Position or condition must appear in the definition.",
        "watch": "Defining it as ‘stored energy’ alone. That is true but too vague to earn the mark; say stored because of position or condition."
      },
      {
        "code": "A5.7",
        "statement": "calculate the change in gravitational potential energy using Ep = mgh",
        "summary": "The change in gravitational potential energy is Ep = m g h, where h is the change in height. Lifting a 2 kg book 1.5 m gives 2 × 10 × 1.5 = 30 J.",
        "formula": "Ep = m g h",
        "exam": "‘Calculate the gain in potential energy of the load.’ Marks are for using the vertical height and for the unit. With g = 10 N/kg the arithmetic is usually straightforward, so the marks sit in the choice of h.",
        "watch": "Using the length of a slope as h. Using the mass in place of the weight, or the other way round."
      },
      {
        "code": "A5.8",
        "statement": "define kinetic energy",
        "summary": "Kinetic energy is the energy a body has because of its motion.",
        "formula": "",
        "exam": "‘Define kinetic energy.’ Position or motion is the distinction being tested; the answer must say motion.",
        "watch": "Defining it as ‘the energy of a moving object’ and stopping there, without the idea that it is energy the body has because of that motion."
      },
      {
        "code": "A5.9",
        "statement": "calculate kinetic energies using the expression Ek = ½mv²",
        "summary": "Ek = ½ m v². A 1200 kg car at 20 m/s has ½ × 1200 × 20² = 240 000 J.",
        "formula": "Ek = ½ m v²",
        "exam": "‘Calculate the kinetic energy of the body’ or ‘calculate its speed just before it hits the ground’. The second type expects mgh = ½mv² and the cancellation of mass.",
        "watch": "Forgetting the half. Squaring m as well as v."
      },
      {
        "code": "A5.10",
        "statement": "apply the law of conservation of energy",
        "summary": "Energy cannot be created or destroyed, only transferred from one form to another. The total energy of a closed system stays the same.",
        "formula": "total energy before = total energy after; mgh = ½ m v² for a freely falling or swinging body",
        "exam": "‘Use the law of conservation of energy to calculate …’. Marks are for stating what is equal to what before substituting, and for accounting for any energy lost when the question mentions friction.",
        "watch": "Applying mgh = ½mv² to a case with significant friction without saying so. If the question gives an energy loss, subtract it."
      },
      {
        "code": "A5.11",
        "statement": "define power and apply definition",
        "summary": "Power is the rate of doing work, or the rate at which energy is transferred, P = E / t. Its unit is the watt (W), which is one joule per second.",
        "formula": "P = E / t",
        "exam": "‘Define power and state its unit’ and ‘calculate the power developed’. Both the definition and the unit carry marks, and the working must show the energy before the division.",
        "watch": "Giving power in joules. The joule is energy; the watt is power."
      },
      {
        "code": "A5.12",
        "statement": "explain the term efficiency",
        "summary": "Efficiency is the fraction of the energy supplied to a device that comes out in the useful form, usually written as a percentage. It is always less than 100 per cent because some energy always becomes thermal energy.",
        "formula": "",
        "exam": "‘Explain why the efficiency of the machine is less than 100 per cent.’ The mark is for naming where the energy goes: work done against friction, transferred as thermal energy to the surroundings.",
        "watch": "Saying energy is ‘lost’. It is not destroyed, it is transferred to a form that is not useful, and examiners look for that wording."
      },
      {
        "code": "A5.13",
        "statement": "calculate efficiency in given situations",
        "summary": "Efficiency = useful output ÷ total input × 100%. A motor supplied with 500 J that does 300 J of useful work is 60 per cent efficient.",
        "formula": "efficiency = (useful output / total input) × 100%",
        "exam": "‘Calculate the efficiency of the device.’ Marks are for identifying which figure is the useful output, for the division and for the percentage. An answer over 100 per cent will be marked wrong on sight.",
        "watch": "Dividing input by output. Forgetting to multiply by 100 when the question asks for a percentage."
      }
    ]
  },
  {
    "code": "A6",
    "section": "A",
    "sectionTitle": "Mechanics",
    "title": "Hydrostatics",
    "oneSentence": "Pressure, how it varies with depth in a fluid, and why things float.",
    "whyItMatters": "Pressure and Archimedes’ principle are short, self-contained and reliably examined, in Paper 01 as calculations and in Paper 02 as an explanation of flotation.",
    "explanation": [
      "Pressure is force spread over an area. The same force concentrated on a small area gives a large pressure, which is why a drawing pin pushes into wood while your thumb does not, and why a sharp knife cuts better than a blunt one.",
      "In a fluid, the pressure at a point comes from the weight of fluid above it, so it increases with depth. It also increases with the density of the fluid, since a denser fluid weighs more for the same depth. It does not depend on the shape or the width of the container, only on the depth, which is why a dam is built thicker at the bottom than at the top."
    ],
    "objectiveCount": 3,
    "objectives": [
      {
        "code": "A6.1",
        "statement": "define pressure and apply definition",
        "summary": "Pressure is the force acting normally per unit area, P = F / A. Its unit is the pascal (Pa), which is one newton per square metre.",
        "formula": "P = F / A",
        "exam": "‘Define pressure and state its unit’ and ‘calculate the pressure exerted on the floor’. The definition needs the word normally or perpendicular, and areas given in cm² must be converted.",
        "watch": "Using mass in kilograms as the force. Leaving the area in cm², which makes the answer 10 000 times too small."
      },
      {
        "code": "A6.2",
        "statement": "relate the pressure at a point in a fluid to its depth and the density",
        "summary": "The pressure at a point in a fluid is p = ρ g h, where h is the depth below the surface. It increases with depth and with the density of the fluid, and does not depend on the shape or width of the container. All points at the same level in a fluid at rest are at the same pressure.",
        "formula": "p = ρ g h",
        "exam": "‘Calculate the pressure at a depth of …’ or ‘explain why a dam is thicker at its base’. The explanation needs pressure rising with depth, so the wall must withstand a greater force lower down.",
        "watch": "Measuring h from the bottom instead of down from the surface. Forgetting that the question may want atmospheric pressure added."
      },
      {
        "code": "A6.3",
        "statement": "apply Archimedes’ principle to predict whether a body would float or sink in a given fluid",
        "summary": "Archimedes’ principle: a body wholly or partly immersed in a fluid experiences an upthrust equal to the weight of the fluid it displaces. It floats if the upthrust can equal its weight, which happens when its average density is less than the fluid’s, and sinks if it cannot.",
        "formula": "upthrust = weight of fluid displaced; floats when density of body < density of fluid",
        "exam": "‘Use Archimedes’ principle to explain why the ship floats’ or ‘calculate the upthrust on the block’. The explanation must compare the upthrust with the weight, not merely state the principle.",
        "watch": "Comparing masses instead of densities. A 10 000 tonne ship floats while a 1 kg stone sinks, so mass alone decides nothing."
      }
    ]
  },
  {
    "code": "B1",
    "section": "B",
    "sectionTitle": "Thermal Physics and Kinetic Theory",
    "title": "Nature of Heat",
    "oneSentence": "The argument that settled what heat actually is, and why it was won by experiment rather than by reasoning.",
    "whyItMatters": "Two objectives only, but they are the history that explains why energy is conserved, and they are asked as short discussion questions.",
    "explanation": [
      "In the eighteenth century heat was thought to be a substance. It was called caloric, an invisible weightless fluid that flowed from hot bodies into cold ones. The theory worked well enough: it explained why a hot body cools, why heat flows from hot to cold, and why mixing hot and cold water gives something in between.",
      "It had one fatal problem. If caloric is a substance, there is only so much of it in a body, so you should eventually be able to squeeze it all out. Count Rumford, boring cannon barrels in Munich, noticed that the boring produced heat without limit for as long as the drilling continued, even with a blunt tool that cut almost nothing away. A substance would have run out. Mechanical work would not."
    ],
    "objectiveCount": 2,
    "objectives": [
      {
        "code": "B1.1",
        "statement": "differentiate between the caloric and kinetic theories of heat as they existed in the eighteenth century",
        "summary": "The caloric theory said heat is a weightless fluid that flows from hot bodies to cold ones. The kinetic theory says heat is energy carried by the random motion of particles. Rumford’s cannon-boring showed that heat could be produced without limit by doing work, which no finite quantity of fluid could explain.",
        "formula": "",
        "exam": "‘Differentiate between the caloric theory and the kinetic theory of heat’ or ‘state the evidence against the caloric theory’. Marks are for both descriptions and for naming Rumford’s observation, that heat was produced without limit by mechanical work.",
        "watch": "Saying the caloric theory was disproved because heat has no weight. Rumford’s weighing experiments were suggestive, but the unlimited production of heat by work is the argument the syllabus wants."
      },
      {
        "code": "B1.2",
        "statement": "discuss the role of Joule’s experiments in establishing the principle of conservation of energy",
        "summary": "Joule measured how much mechanical work produces a given quantity of heat, using falling weights to turn a paddle in an insulated container of water. He found the ratio is always the same, which showed heat is a form of energy and that energy is conserved when it changes form.",
        "formula": "",
        "exam": "‘Discuss the role of Joule’s experiments in establishing the principle of conservation of energy.’ Marks are for describing the experiment, for the finding that a fixed work gives a fixed heating, and for the conclusion that energy changes form without being destroyed.",
        "watch": "Describing the apparatus and stopping. The conclusion, that mechanical energy and thermal energy are interchangeable in a fixed ratio, is where the marks are."
      }
    ]
  },
  {
    "code": "B2",
    "section": "B",
    "sectionTitle": "Thermal Physics and Kinetic Theory",
    "title": "Macroscopic Properties and Phenomena",
    "oneSentence": "Temperature and how it is measured, the three phases of matter explained by particle motion, thermal expansion, and the gas laws.",
    "whyItMatters": "The largest topic in Section B at twelve objectives. The gas laws are a reliable calculation question and the kinetic theory explanations are standard extended response material.",
    "explanation": [
      "Temperature is not the same as thermal energy. Temperature tells you the direction thermal energy will flow: energy always moves from the body at higher temperature to the body at lower temperature, and stops when they are equal. A bath at 40 °C contains far more thermal energy than a cup of tea at 80 °C, but energy still flows from the tea to the bath if they touch.",
      "To measure temperature you need a physical property that changes reliably with it. The length of a liquid column in a thin tube, the electrical resistance of a wire, the pressure of a fixed volume of gas and the voltage across a thermocouple junction all work, and each gives a different type of thermometer suited to a different job."
    ],
    "objectiveCount": 12,
    "objectives": [
      {
        "code": "B2.1",
        "statement": "relate temperature to the direction of net thermal energy transfer",
        "summary": "Temperature decides the direction of net thermal energy transfer. Energy flows from the body at the higher temperature to the body at the lower temperature, and stops when the two are equal, a state called thermal equilibrium.",
        "formula": "",
        "exam": "‘Relate temperature to the direction of thermal energy transfer’ or ‘explain what is meant by thermal equilibrium’. The mark for equilibrium requires no net transfer, not simply that the bodies touch.",
        "watch": "Saying energy flows from the body with more heat. It flows from the body at the higher temperature, whatever the amounts of energy involved."
      },
      {
        "code": "B2.2",
        "statement": "identify physical properties which vary with temperature and may be used as the basis for measuring temperature",
        "summary": "Any property that varies steadily with temperature can measure it: the volume of a liquid, the length of a solid, the electrical resistance of a wire, the pressure of a fixed volume of gas, the voltage generated at a thermocouple junction, and the colour of a very hot body.",
        "formula": "",
        "exam": "‘Identify TWO physical properties which vary with temperature and could be used in a thermometer.’ Name the property and, if asked, the thermometer that uses it.",
        "watch": "Naming a thermometer instead of a property. The question asks what changes, not what the instrument is called."
      },
      {
        "code": "B2.3",
        "statement": "relate the use of a thermometer to its design",
        "summary": "The design follows the job. A clinical thermometer has a narrow range around body temperature and a constriction so the reading holds after removal. A laboratory thermometer has a wide range. A thermocouple has a very small junction so it responds quickly and can read a point rather than a region.",
        "formula": "",
        "exam": "‘Relate the design of the thermometer to its use’ or ‘state ONE feature of a clinical thermometer and explain its purpose’. Each mark needs a feature and the reason for it.",
        "watch": "Listing features with no purpose attached. The constriction is worth a mark only when you say it stops the mercury running back."
      },
      {
        "code": "B2.4",
        "statement": "define the fixed points on the Celsius scale",
        "summary": "The lower fixed point is the temperature of pure melting ice, taken as 0 °C. The upper fixed point is the temperature of steam above water boiling at normal atmospheric pressure, taken as 100 °C.",
        "formula": "",
        "exam": "‘Define the lower and upper fixed points on the Celsius scale.’ The conditions, pure melting ice and steam at normal atmospheric pressure, are what separate a full answer from a half one.",
        "watch": "Writing ‘the freezing point of water’ and ‘the boiling point of water’ with no conditions. Both depend on purity and pressure."
      },
      {
        "code": "B2.5",
        "statement": "relate the temperature of a body to the kinetic energy of molecules",
        "summary": "The temperature of a body is a measure of the average kinetic energy of its particles. Heating a body makes its particles move faster, so the average kinetic energy rises and the temperature rises with it.",
        "formula": "",
        "exam": "‘Relate the temperature of a body to the kinetic energy of its molecules.’ The word average is usually required for the mark.",
        "watch": "Saying temperature is the kinetic energy of the molecules. It is a measure of the average kinetic energy."
      },
      {
        "code": "B2.6",
        "statement": "distinguish among solids, liquids and gases",
        "summary": "In a solid the particles are closely packed in a regular pattern, held by strong forces, and vibrate about fixed positions. In a liquid they are still close but not fixed, so they slide past one another. In a gas they are far apart with negligible forces, moving rapidly in all directions.",
        "formula": "",
        "exam": "‘Distinguish among solids, liquids and gases’ is often set as a table with rows for arrangement, forces, motion, shape and volume. Fill every row, because each is a separate mark.",
        "watch": "Describing shape and volume without the particle arrangement behind them. The syllabus asks for the differences in intermolecular forces and motion as well."
      },
      {
        "code": "B2.7",
        "statement": "use the Kinetic theory to explain the different macroscopic properties of solids, liquids and gases; Expansion",
        "summary": "Use the particle picture to explain the property. A gas exerts pressure because its particles collide with the walls of the container. A liquid takes the shape of its container because its particles can slide past one another. A solid keeps its shape because its particles vibrate about fixed positions.",
        "formula": "",
        "exam": "‘Use the kinetic theory to explain why …’ The mark is for the particle behaviour, not for restating the observation. Say what the particles do, then what that produces.",
        "watch": "Answering with the property rather than the explanation. ‘A gas is compressible because it can be squeezed’ earns nothing."
      },
      {
        "code": "B2.8",
        "statement": "explain observations of the effects of thermal expansion",
        "summary": "Most substances expand when heated because their particles vibrate more strongly and take up more room. Overhead telephone and power lines are hung slack in the day so they do not snap when they contract at night; bridges rest on rollers; a metal lid is loosened by running it under hot water.",
        "formula": "",
        "exam": "‘Explain observations of the effects of thermal expansion’ or ‘state TWO applications’. An application answer needs the effect and the use, for example the bimetallic strip bends because the two metals expand unequally, and that bending switches a circuit.",
        "watch": "Saying the metal ‘gets hot and grows’. Say the particles vibrate more and their average separation increases."
      },
      {
        "code": "B2.9",
        "statement": "relate graphs of pressure or volume against temperature to the establishment of the Kelvin temperature scale",
        "summary": "Plot the pressure of a fixed mass of gas at constant volume against temperature in degrees Celsius. The graph is a straight line, and extended backwards it cuts the temperature axis at about −273 °C, where the pressure would be zero. That temperature is absolute zero and is the start of the Kelvin scale.",
        "formula": "",
        "exam": "‘Explain how a graph of pressure against temperature leads to the Kelvin scale’ or a graph to extend back to the axis. Marks are for the straight line, for extrapolating it, and for identifying the intercept as absolute zero.",
        "watch": "Reading the intercept off a graph that has not been extended far enough. Draw the line back to the axis with a ruler."
      },
      {
        "code": "B2.10",
        "statement": "use the relationship between the Kelvin and Celsius scales",
        "summary": "Add 273 to a Celsius temperature to get kelvin, subtract 273 to go back. So 27 °C is 300 K and 400 K is 127 °C.",
        "formula": "T (K) = θ (°C) + 273",
        "exam": "Almost never asked on its own. It appears inside every gas law calculation, and the conversion is usually worth a mark of its own.",
        "watch": "Converting a temperature difference. A rise of 20 °C is a rise of 20 K, not 293 K."
      },
      {
        "code": "B2.11",
        "statement": "apply the gas laws",
        "summary": "Boyle’s law: at constant temperature, P₁V₁ = P₂V₂. Charles’ law: at constant pressure, V₁/T₁ = V₂/T₂. Pressure law: at constant volume, P₁/T₁ = P₂/T₂. Temperatures must be in kelvin.",
        "formula": "P₁V₁ = P₂V₂; V₁/T₁ = V₂/T₂; P₁/T₁ = P₂/T₂",
        "exam": "‘Calculate the new pressure of the gas.’ Marks are for naming or writing the correct law, for the conversion to kelvin, for the substitution and for the answer with a unit.",
        "watch": "Leaving temperature in Celsius, which is the single commonest error in Section B. Using Boyle’s law when the temperature has changed."
      },
      {
        "code": "B2.12",
        "statement": "give qualitative explanations of the gas laws in terms of the Kinetic theory",
        "summary": "Gas pressure comes from particles colliding with the walls of the container. Boyle: halve the volume and the same particles hit the walls twice as often, so the pressure doubles. Pressure law: raise the temperature and the particles move faster, hitting harder and more often, so the pressure rises. Charles: raise the temperature at constant pressure and the gas must expand to keep the collision rate down.",
        "formula": "",
        "exam": "‘Use the kinetic theory to explain Boyle’s law.’ Marks are for the collisions with the walls, for what happens to their frequency or force, and for the resulting change in pressure.",
        "watch": "Saying the particles ‘get squashed’. Particles do not change size; what changes is how often they hit the walls."
      }
    ]
  },
  {
    "code": "B3",
    "section": "B",
    "sectionTitle": "Thermal Physics and Kinetic Theory",
    "title": "Thermal Measurements",
    "oneSentence": "Heat capacity and specific heat capacity, latent heat, and why temperature stops rising during a change of phase.",
    "whyItMatters": "Specific heat capacity and specific latent heat are the calculation backbone of Section B, and the electrical method of measuring them is a favourite data analysis question.",
    "explanation": [
      "Different substances need different amounts of energy to warm up. Specific heat capacity is the energy needed to raise the temperature of one kilogram of a substance by one kelvin, and it is a property of the material. Heat capacity is the energy needed to raise the temperature of a particular object by one kelvin, so it depends on the size of that object as well as what it is made of.",
      "Water has an unusually high specific heat capacity, about 4200 J/kg K. That is why the sea warms and cools far more slowly than the land, why water is used as a coolant in car engines, and why coastal places have milder weather than inland ones."
    ],
    "objectiveCount": 7,
    "objectives": [
      {
        "code": "B3.1",
        "statement": "distinguish between specific heat capacity, ‘c’ and heat capacity ‘C’",
        "summary": "Specific heat capacity, c, is the energy needed to raise the temperature of one kilogram of a substance by one kelvin, measured in J/kg K. Heat capacity, C, is the energy needed to raise the temperature of a whole object by one kelvin, measured in J/K. They are related by C = mc.",
        "formula": "C = m c",
        "exam": "‘Distinguish between heat capacity and specific heat capacity’ and ‘define specific heat capacity’. The definition needs one kilogram, one kelvin, and the unit.",
        "watch": "Giving the unit of specific heat capacity as J/K. That is heat capacity; the specific quantity is per kilogram as well."
      },
      {
        "code": "B3.2",
        "statement": "apply the relationship EH = mc ΔT",
        "summary": "EH = m c ΔT. To heat 0.5 kg of water, specific heat capacity 4200 J/kg K, from 20 °C to 70 °C: 0.5 × 4200 × 50 = 105 000 J.",
        "formula": "EH = m c ΔT",
        "exam": "‘Calculate the thermal energy required to raise the temperature of …’. Marks are for the substitution with mass in kilograms and for the unit. Questions often supply the heater’s power and time instead of the energy, so work out E = Pt first.",
        "watch": "Using the final temperature as ΔT. Using grams, which makes the answer a thousand times too small."
      },
      {
        "code": "B3.3",
        "statement": "determine the specific heat capacity of metals and liquids",
        "summary": "Electrical method: heat a lagged block or a known mass of liquid with an immersion heater of known power for a measured time, record the temperature rise, then c = Pt / (mΔT). Method of mixtures: drop a hot solid of known mass and temperature into cold water and equate the energy the solid loses to the energy the water gains.",
        "formula": "c = P t / (m ΔT); method of mixtures: m₁c₁ΔT₁ = m₂c₂ΔT₂",
        "exam": "‘Describe an experiment to determine the specific heat capacity of a metal.’ Marks are for the apparatus, the measurements taken, the calculation, and at least one precaution against energy loss.",
        "watch": "Forgetting to state a precaution. Assuming no energy is lost without saying that the assumption is being made."
      },
      {
        "code": "B3.4",
        "statement": "demonstrate that temperature remains constant during a phase change",
        "summary": "Heat crushed ice steadily and record its temperature every half minute. The temperature rises to 0 °C, then stays there while the ice melts even though heating continues, then rises again once all of it is liquid. The flat part of the graph is the change of phase.",
        "formula": "",
        "exam": "‘Sketch a graph of temperature against time for ice heated steadily until it boils’ or ‘explain why the temperature remains constant while the ice melts’. The explanation must say the energy is used to break the forces between the particles rather than to raise their kinetic energy.",
        "watch": "Saying no energy is being supplied during the flat part. It is; it simply is not raising the temperature."
      },
      {
        "code": "B3.5",
        "statement": "apply the relationship EH = ml",
        "summary": "EH = m l, where l is the specific latent heat. To melt 0.2 kg of ice, specific latent heat of fusion 340 000 J/kg: 0.2 × 340 000 = 68 000 J. There is no temperature term because the temperature does not change.",
        "formula": "EH = m l",
        "exam": "‘Calculate the energy needed to melt …’ or a two-stage problem combining mcΔT and ml. Marks are for splitting the problem into its stages and for using the right constant in each.",
        "watch": "Multiplying by a temperature change as well. Using the latent heat of fusion where vaporisation is meant, or the other way round."
      },
      {
        "code": "B3.6",
        "statement": "determine the specific latent heat of vaporisation and of fusion of water",
        "summary": "Use an electrical heater of known power. For fusion, melt ice with the heater and measure the mass of water collected in a measured time, then l = Pt/m. For vaporisation, boil water and measure the mass lost in a measured time, then l = Pt/m. Run a control with the heater off to correct for melting caused by the room.",
        "formula": "l = P t / m",
        "exam": "‘Describe an experiment to determine the specific latent heat of fusion of ice.’ Marks are for the heater of known power, the timing, the mass collected, the control experiment, and the calculation.",
        "watch": "Omitting the control. Starting the timing before the heater has brought the system to a steady state."
      },
      {
        "code": "B3.7",
        "statement": "distinguish between evaporation and boiling",
        "summary": "Evaporation occurs at any temperature, only at the surface, and cools the liquid left behind. Boiling occurs only at the boiling point, throughout the liquid with bubbles forming inside it, and needs a continuous supply of energy at a fixed temperature.",
        "formula": "",
        "exam": "‘Distinguish between evaporation and boiling’, usually as a table. Give temperature, where it happens, and whether the liquid cools. ‘Explain why evaporation causes cooling’ needs the escape of the faster particles and the fall in average kinetic energy.",
        "watch": "Saying evaporation happens ‘below the boiling point’. It happens at any temperature, including at the boiling point."
      }
    ]
  },
  {
    "code": "B4",
    "section": "B",
    "sectionTitle": "Thermal Physics and Kinetic Theory",
    "title": "Transfer of Thermal Energy",
    "oneSentence": "The three ways thermal energy moves, what each needs to work, and how devices are designed around them.",
    "whyItMatters": "The vacuum flask and the solar water heater are asked repeatedly as extended response questions, and they need all three transfer methods in one answer.",
    "explanation": [
      "Thermal energy moves from hotter to colder places in three ways, and telling them apart is the whole topic.",
      "Conduction passes energy through a material without the material itself moving. Particles at the hot end vibrate more strongly and pass the vibration on to their neighbours. In metals there is a second and much faster route: free electrons carry energy through the metal, which is why metals are far better conductors than anything else. Gases are the worst conductors, because their particles are far apart and rarely collide, and that is why trapped air is the basis of nearly every insulator."
    ],
    "objectiveCount": 6,
    "objectives": [
      {
        "code": "B4.1",
        "statement": "explain the transfer of thermal energy by conduction",
        "summary": "Conduction is the transfer of thermal energy through a material without the material moving. Particles at the hot end vibrate more and pass energy to neighbouring particles by collision. In metals free electrons also carry energy, which makes metals much better conductors. Air is a very poor conductor, which is why trapped air insulates.",
        "formula": "",
        "exam": "‘Explain the transfer of thermal energy by conduction’ and ‘explain why a woollen jumper keeps you warm’. The jumper answer must credit the trapped air, not the wool itself.",
        "watch": "Saying the heat ‘travels through’ with no mechanism. Name the vibrating particles and, for a metal, the free electrons."
      },
      {
        "code": "B4.2",
        "statement": "explain the transfer of thermal energy by convection",
        "summary": "Convection is the transfer of thermal energy by the movement of the fluid itself. Heated fluid expands, becomes less dense and rises; cooler denser fluid sinks to replace it, setting up a convection current. It happens in liquids and gases only.",
        "formula": "",
        "exam": "‘Explain, in terms of convection, how a sea breeze is produced.’ Marks are for the unequal heating, the expansion and fall in density, the rising air, and the cooler air moving in.",
        "watch": "Saying hot air rises because it is hot. It rises because it is less dense than the fluid around it."
      },
      {
        "code": "B4.3",
        "statement": "explain the transfer of thermal energy by radiation",
        "summary": "Radiation is the transfer of thermal energy as infrared electromagnetic waves. It needs no material medium and travels through a vacuum, which is how energy reaches the Earth from the Sun.",
        "formula": "",
        "exam": "‘Explain the transfer of thermal energy by radiation’ or ‘state how thermal energy from the Sun reaches the Earth’. The mark requires radiation and the fact that no medium is needed.",
        "watch": "Calling it ‘heat rays’ with no mention of electromagnetic or infrared. Saying it needs air to travel through."
      },
      {
        "code": "B4.4",
        "statement": "conduct experiments to investigate the factors on which absorption and emission of radiation depend",
        "summary": "Compare surfaces at the same temperature. Fill identical cans, one dull black and one shiny silvered, with hot water and record the temperature every minute: the black one cools faster, showing it emits more. To test absorption, place both the same distance from a heater and record which warms faster: the black one does. Texture and colour are the two factors.",
        "formula": "",
        "exam": "This appears as a planning and designing question. Marks are for the hypothesis, the manipulated and controlled variables, the readings to be taken, and how the results would be displayed.",
        "watch": "Changing more than one thing at a time, for example comparing a large black can with a small shiny one."
      },
      {
        "code": "B4.5",
        "statement": "recall that good absorbers are good emitters",
        "summary": "A surface that is a good absorber of radiation is also a good emitter. Dull black surfaces are best at both; shiny, light-coloured surfaces are poorest at both, and are therefore the best reflectors.",
        "formula": "",
        "exam": "‘Explain why the pipes of a solar water heater are painted black’ or ‘why is a vacuum flask silvered’. State the rule and then apply it to the device in the question.",
        "watch": "Treating absorption and emission as opposites. The same surface is good at both or poor at both."
      },
      {
        "code": "B4.6",
        "statement": "relate the principles of thermal energy transfer to the design of devices",
        "summary": "A vacuum flask blocks all three: the vacuum stops conduction and convection, the silvered walls reflect radiation, and the stopper stops convection and evaporation through the neck. A solar water heater does the reverse, using a black surface to absorb radiation, glass to trap it, and convection to circulate the water.",
        "formula": "",
        "exam": "‘Explain how the design of a vacuum flask reduces thermal energy transfer’ is a standard extended response question. One mark per feature and the transfer it prevents, so list every feature.",
        "watch": "Naming features without naming the transfer method each one blocks. ‘The vacuum keeps it hot’ does not earn the mark; ‘the vacuum has no particles, so there is no conduction or convection’ does."
      }
    ]
  },
  {
    "code": "C1",
    "section": "C",
    "sectionTitle": "Waves and Optics",
    "title": "Wave Motion",
    "oneSentence": "What a wave is, the quantities that describe one, and how to read the two graphs that represent it.",
    "whyItMatters": "Three objectives, but they underpin the whole section. The wave equation appears in sound, light and electricity questions, and the two graph types are regularly confused, which costs marks.",
    "explanation": [
      "A wave carries energy from one place to another without carrying the material with it. Drop a stone in a pond and the ripples travel outwards, but a floating leaf only bobs up and down; the water does not move to the edge of the pond. That is the defining feature of a wave, and it is worth a mark when a question asks what a wave transfers.",
      "There are two ways the particles can move relative to the travel of the wave. In a transverse wave they vibrate at right angles to the direction the wave travels, as in water waves, light and all electromagnetic waves. In a longitudinal wave they vibrate along the direction of travel, producing regions where the particles are squashed together, called compressions, and regions where they are spread out, called rarefactions. Sound is the standard longitudinal wave."
    ],
    "objectiveCount": 3,
    "objectives": [
      {
        "code": "C1.1",
        "statement": "differentiate between types of waves",
        "summary": "A pulse is a single disturbance; a progressive wave is a continuous train of disturbances. In a transverse wave the particles vibrate at right angles to the direction of travel, as in water waves and light. In a longitudinal wave they vibrate along the direction of travel, producing compressions and rarefactions, as in sound.",
        "formula": "",
        "exam": "‘Differentiate between transverse and longitudinal waves and give ONE example of each.’ Both the direction of vibration and an example are needed. Compressions and rarefactions are the terms expected for longitudinal waves.",
        "watch": "Giving sound as an example of a transverse wave. Describing the difference by the shape of the drawing rather than by the direction the particles vibrate."
      },
      {
        "code": "C1.2",
        "statement": "apply speed, frequency, wavelength, period and amplitude",
        "summary": "Speed v = f λ. Frequency f is the number of waves passing a point per second, in hertz, and equals 1/T. Wavelength λ is the distance between consecutive points in phase. Period T is the time for one complete wave. Amplitude is the maximum displacement from the rest position.",
        "formula": "v = f λ; f = 1 / T",
        "exam": "‘Calculate the wavelength of the wave’ or ‘determine its frequency’. Marks are for the correct rearrangement, the substitution and the unit. Watch for a period given instead of a frequency.",
        "watch": "Using the period where the frequency belongs. Forgetting that frequency does not change when a wave enters a new medium."
      },
      {
        "code": "C1.3",
        "statement": "represent transverse and longitudinal waves in displacement- position and displacement-time graphs",
        "summary": "A displacement-position graph shows the whole wave frozen at one instant, so the distance between crests is the wavelength. A displacement-time graph follows one particle over time, so the distance between crests is the period. Read the horizontal axis label to tell them apart.",
        "formula": "",
        "exam": "‘Use the graph to determine the wavelength’ or ‘… the period’. The first mark is choosing the right quantity for the axis shown. A follow-up often asks for the frequency or speed from what you read off.",
        "watch": "Assuming a wave-shaped graph shows wavelength. If the horizontal axis is time, it shows the period."
      }
    ]
  },
  {
    "code": "C2",
    "section": "C",
    "sectionTitle": "Waves and Optics",
    "title": "Sound",
    "oneSentence": "How sound is made and carried, what pitch and loudness correspond to, how fast it travels, and what ultrasound is used for.",
    "whyItMatters": "The speed of sound applied to thunder and lightning is a recurring calculation, and ultrasound gives a short factual question that is easy to secure.",
    "explanation": [
      "Sound is produced by something vibrating: a string, a drum skin, a loudspeaker cone, vocal cords. The vibration pushes on the air next to it, squashing it into a compression, then moves back and leaves a rarefaction. Those regions travel outwards as a longitudinal wave, and when they reach an ear they push the eardrum in and out at the same rate.",
      "Sound needs a material to travel through. Put a ringing bell in a jar and pump the air out and the sound fades to nothing while the bell is still visibly ringing, which is the standard demonstration that sound cannot cross a vacuum."
    ],
    "objectiveCount": 5,
    "objectives": [
      {
        "code": "C2.1",
        "statement": "describe how sound is produced and propagated in a medium",
        "summary": "Sound is produced by a vibrating body and travels through a medium as a longitudinal wave. The vibration compresses the particles next to it, then leaves them spread out, so compressions and rarefactions move outwards. Sound cannot travel through a vacuum because there are no particles to compress.",
        "formula": "",
        "exam": "‘Describe how sound is produced and transmitted through air’ or ‘explain why sound cannot travel through a vacuum’. Marks are for the vibrating source, the compressions and rarefactions, and the need for particles.",
        "watch": "Describing sound as a transverse wave with crests and troughs. The terms are compressions and rarefactions."
      },
      {
        "code": "C2.2",
        "statement": "relate the terms ‘pitch’ and ‘loudness’ to wave parameters",
        "summary": "Pitch depends on frequency: the higher the frequency, the higher the pitch. Loudness depends on amplitude: the larger the amplitude, the louder the sound. The human ear detects roughly 20 Hz to 20 000 Hz.",
        "formula": "",
        "exam": "‘Relate pitch and loudness to the properties of the wave’ or an oscilloscope trace to interpret. State the range of audible frequencies when asked, using 20 Hz to 20 kHz.",
        "watch": "Linking loudness to frequency. Amplitude carries the energy, and energy is what makes a sound loud."
      },
      {
        "code": "C2.3",
        "statement": "apply the speed of sound to practical situations",
        "summary": "Sound travels at about 340 m/s in air and light at 3 × 10⁸ m/s, so light arrives effectively instantly. Multiply the delay between the flash and the thunder by 340 to get the distance of the strike: a gap of 5 s means about 1700 m.",
        "formula": "d = v t; for an echo, distance to reflector = v t / 2",
        "exam": "‘Calculate how far away the lightning struck’ or ‘calculate the distance to the cliff’. The echo type is where the marks are lost, so read carefully whether the sound made a round trip.",
        "watch": "Forgetting to halve for an echo. Adding the travel time of the light, which is negligible."
      },
      {
        "code": "C2.4",
        "statement": "cite evidence that sound waves reflect, refract, diffract and interfere",
        "summary": "Reflection gives echoes. Refraction occurs when sound passes from one medium to another, for example air into water. Diffraction lets you hear someone talking around a corner. Interference produces points that are louder and quieter when two sources sound together.",
        "formula": "",
        "exam": "‘Cite evidence that sound waves undergo diffraction’ or ‘give ONE example of the reflection of sound’. One example, correctly matched to the behaviour, is the mark.",
        "watch": "Offering an echo as evidence of refraction, or hearing around a corner as evidence of reflection. Match the example to the right behaviour."
      },
      {
        "code": "C2.5",
        "statement": "describe the use of ultrasound",
        "summary": "Ultrasound is sound of frequency above the upper limit of human hearing, that is above about 20 000 Hz. It is used in pre-natal scanning to image an unborn baby, and in industry to test materials for cracks without cutting them open.",
        "formula": "",
        "exam": "‘Define ultrasound and state TWO of its uses.’ The definition needs the comparison with the audible range, and each use should say what is being detected.",
        "watch": "Defining ultrasound as ‘very loud sound’. It is defined by frequency, not by loudness."
      }
    ]
  },
  {
    "code": "C3",
    "section": "C",
    "sectionTitle": "Waves and Optics",
    "title": "Electromagnetic Waves",
    "oneSentence": "The family of waves that includes light, what they all share, and how the members differ.",
    "whyItMatters": "A short topic with three objectives that is examined almost every sitting as a straightforward recall question, usually the spectrum in order with one source and one use.",
    "explanation": [
      "Electromagnetic waves are a family of transverse waves that all travel at the same speed in a vacuum, 3 × 10⁸ m/s, and all can travel through a vacuum because they need no material medium. Light is the part of the family the eye can detect.",
      "The members differ only in wavelength and therefore in frequency, and the whole range is called the electromagnetic spectrum. In order of increasing frequency, and so decreasing wavelength: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. Learning them in order is the single most useful piece of memorising in the section."
    ],
    "objectiveCount": 3,
    "objectives": [
      {
        "code": "C3.1",
        "statement": "state the properties of e.m. waves",
        "summary": "All electromagnetic waves are transverse, travel at 3 × 10⁸ m/s in a vacuum, need no material medium, carry energy, and can be reflected, refracted and diffracted. They differ only in wavelength and frequency.",
        "formula": "",
        "exam": "‘State THREE properties common to all electromagnetic waves.’ One mark each, so give the speed in a vacuum, transverse, and no medium required, and add that they carry energy if a fourth is wanted.",
        "watch": "Listing properties of light specifically rather than of the whole family."
      },
      {
        "code": "C3.2",
        "statement": "differentiate between types of e.m. waves in terms of their wavelengths",
        "summary": "In order of increasing frequency and decreasing wavelength: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.",
        "formula": "",
        "exam": "‘Arrange these electromagnetic waves in order of increasing wavelength’ is the standard form. Read whether it asks for increasing or decreasing, and whether it means wavelength or frequency, because those reverse each other.",
        "watch": "Reversing the order. Writing the visible colours in the wrong order within the band."
      },
      {
        "code": "C3.3",
        "statement": "identify a source and use of each type of e.m. wave",
        "summary": "Radio waves, from a transmitting aerial, used for broadcasting. Microwaves, from a magnetron, used for cooking and mobile telephones. Infrared, from any warm body, used in remote controls and thermal imaging. Visible light, from the Sun and lamps, used for seeing and in optical fibres. Ultraviolet, from the Sun, used in sterilising and security marking. X-rays, from an X-ray tube, used for radiographs. Gamma rays, from radioactive nuclei, used in sterilising equipment and treating cancer.",
        "formula": "",
        "exam": "‘State ONE source and ONE use of each type of electromagnetic wave’, often as a table to complete. Each cell is a mark, so fill every one.",
        "watch": "Giving the same use twice for two different members. Naming the Sun as the source for everything, which earns little credit."
      }
    ]
  },
  {
    "code": "C4",
    "section": "C",
    "sectionTitle": "Waves and Optics",
    "title": "Light Waves",
    "oneSentence": "How scientists decided what light is, then the behaviour of light rays: straight lines, reflection, refraction, dispersion and total internal reflection.",
    "whyItMatters": "The largest topic in Section C at thirteen objectives, and the source of the ray diagrams and Snell’s law calculations that appear in nearly every Paper 02.",
    "explanation": [
      "The nature of light was argued over for centuries. Newton held that light is a stream of particles, which explains why it travels in straight lines and casts sharp shadows. Huygens held that it is a wave, which explains why two beams can pass through each other undisturbed. Young settled the argument for waves in 1801 by passing light through two narrow slits and producing a pattern of bright and dark bands, which only interference of waves can explain. Then in the twentieth century Einstein showed that light also behaves as particles in the photoelectric effect, so the modern answer is that light behaves as both.",
      "Diffraction of light is not usually noticed because it is only obvious when the gap is comparable in size to the wavelength, and light’s wavelength is under a millionth of a metre. Sound diffracts around a doorway because its wavelength is about the same size as the doorway."
    ],
    "objectiveCount": 13,
    "objectives": [
      {
        "code": "C4.1",
        "statement": "compare the rival theories of light held by scientists",
        "summary": "Newton held that light is a stream of particles, which explains straight-line travel and sharp shadows. Huygens held that it is a wave. Young’s double slit experiment produced interference fringes, which only waves explain, and settled the argument for waves. Einstein later showed light also behaves as particles, so it has a dual nature.",
        "formula": "",
        "exam": "‘Compare the rival theories of light held by Newton and Huygens’ or ‘state the evidence that light is a wave’. Marks are for each theory, the evidence, and the modern dual view.",
        "watch": "Saying the wave theory simply replaced the particle theory. The syllabus notes that twentieth century experiments restored the particle description alongside it."
      },
      {
        "code": "C4.2",
        "statement": "conduct a Young’s double slit experiment to show that light is a wave",
        "summary": "Shine monochromatic light through a single slit onto two narrow, closely spaced slits, and observe the pattern on a screen beyond. Alternating bright and dark bands appear. Bright bands occur where the two waves arrive in phase and reinforce; dark bands where they arrive out of phase and cancel. Only waves can cancel, so light is a wave.",
        "formula": "",
        "exam": "Asked as a description of the experiment with a diagram, or as an explanation of the pattern. Marks are for the arrangement, the observation of alternating bright and dark fringes, and the explanation in terms of constructive and destructive interference.",
        "watch": "Describing the pattern without explaining it. The dark fringes are the evidence, because particles could not cancel each other out."
      },
      {
        "code": "C4.3",
        "statement": "explain why the diffraction of light is not normally observed",
        "summary": "Diffraction is only noticeable when the gap is about the same size as the wavelength. Light has a wavelength under a millionth of a metre, far smaller than any everyday opening, so the spreading is too small to see. Sound, with a wavelength of about a metre, diffracts around doorways easily.",
        "formula": "",
        "exam": "‘Explain why the diffraction of light is not normally observed.’ The mark requires the comparison of the wavelength of light with the size of the opening.",
        "watch": "Saying light does not diffract. It does; the effect is simply too small to notice with ordinary gaps."
      },
      {
        "code": "C4.4",
        "statement": "apply the principle that light travels in straight lines",
        "summary": "Light travels in straight lines, drawn as rays. This explains sharp shadows, eclipses, and the inverted image formed by a pinhole camera.",
        "formula": "",
        "exam": "‘Explain, with the aid of a diagram, how a pinhole camera forms an image’ or an eclipse diagram to complete. Marks are for straight rays drawn with a ruler and arrows showing direction.",
        "watch": "Drawing rays freehand or without arrows. Forgetting to say why the image is inverted."
      },
      {
        "code": "C4.5",
        "statement": "apply the laws of reflection",
        "summary": "The angle of incidence equals the angle of reflection, and the incident ray, the reflected ray and the normal all lie in the same plane. Both angles are measured from the normal.",
        "formula": "angle of incidence = angle of reflection",
        "exam": "‘Complete the ray diagram to show the reflected ray’ or a calculation of an angle after one or two mirrors. Draw and label the normal first; it is often a mark on its own.",
        "watch": "Measuring from the mirror surface. An angle of 30° to the surface is 60° to the normal, and confusing them reverses the answer."
      },
      {
        "code": "C4.6",
        "statement": "describe the formation of images in a plane mirror",
        "summary": "The image in a plane mirror is virtual, upright, the same size as the object, as far behind the mirror as the object is in front, and laterally inverted, meaning left and right are exchanged.",
        "formula": "",
        "exam": "‘State THREE characteristics of the image formed in a plane mirror’, or a ray diagram to construct. The dashed lines behind the mirror are usually a mark, because they show you know the image is virtual.",
        "watch": "Drawing the rays behind the mirror as solid lines. Calling the image inverted rather than laterally inverted; it is not upside down."
      },
      {
        "code": "C4.7",
        "statement": "give examples of observations which indicate that light can be refracted",
        "summary": "A straw in a glass of water appears bent at the surface. A swimming pool looks shallower than it is. A coin at the bottom of a cup, hidden by the rim, becomes visible when water is poured in. A road appears wet on a hot day. All are caused by light changing direction as it changes speed between media.",
        "formula": "",
        "exam": "‘Give TWO observations which indicate that light can be refracted.’ Naming the observation is the mark; a brief reason improves it.",
        "watch": "Offering an example of reflection, such as seeing yourself in water, in a question about refraction."
      },
      {
        "code": "C4.8",
        "statement": "describe the refraction of light rays",
        "summary": "Light entering a denser medium slows down and bends towards the normal. Light leaving into a less dense medium speeds up and bends away from the normal. A ray passing through a rectangular block emerges parallel to its original direction but displaced sideways, which is called lateral displacement.",
        "formula": "",
        "exam": "‘Complete the path of the ray through the glass block.’ Marks are for bending the right way at each surface, for the emergent ray being parallel to the incident ray, and for showing the lateral displacement.",
        "watch": "Bending the ray away from the normal on entering glass. Forgetting that a ray along the normal does not bend at all."
      },
      {
        "code": "C4.9",
        "statement": "describe how a prism may be used to produce a spectrum",
        "summary": "Pass a narrow beam of white light through a triangular glass prism onto a screen. It emerges spread into a band of colours, red at one end and violet at the other. This happens because the glass refracts each colour by a different amount, violet most and red least, and the effect is called dispersion.",
        "formula": "",
        "exam": "‘Describe how a prism may be used to produce a spectrum’ or ‘name the colours in order’. Marks are for the white light source, the prism, the screen, the order of the colours, and dispersion as the name of the effect.",
        "watch": "Saying the prism adds the colours. It separates colours already present."
      },
      {
        "code": "C4.10",
        "statement": "apply Snell’s Law",
        "summary": "Snell’s law: n = sin i / sin r, where i is the angle of incidence in air, r the angle of refraction in the medium, and n the refractive index. Light entering water of refractive index 1.33 at 40° refracts at sin⁻¹(sin 40° / 1.33) = 28.9°.",
        "formula": "n = sin i / sin r; n = c / v",
        "exam": "‘Calculate the angle of refraction’ or ‘determine the refractive index of the glass’. Marks are for the substitution, the inverse sine and the answer in degrees. A graph question expects sin i against sin r with the gradient as n.",
        "watch": "Inverting the ratio when the light leaves the medium. Working in radians because the calculator was left in the wrong mode."
      },
      {
        "code": "C4.11",
        "statement": "explain ‘critical angle’ and ‘total internal reflection’",
        "summary": "The critical angle is the angle of incidence inside the denser medium for which the angle of refraction in the less dense medium is exactly 90°. Total internal reflection is what happens beyond it: all the light is reflected back inside the denser medium and none escapes.",
        "formula": "",
        "exam": "‘Explain the terms critical angle and total internal reflection.’ State both conditions for total internal reflection, because the question almost always wants them.",
        "watch": "Omitting the condition that the light must be going from denser to less dense. Saying ‘most’ of the light is reflected; at that point all of it is."
      },
      {
        "code": "C4.12",
        "statement": "relate critical angles to total internal reflection",
        "summary": "sin c = 1 / n, where c is the critical angle and n the refractive index. Glass of refractive index 1.5 has a critical angle of sin⁻¹(1/1.5) = 41.8°, so a ray striking the inside surface at more than about 42° is totally internally reflected.",
        "formula": "sin c = 1 / n",
        "exam": "‘Calculate the critical angle for the material’ or, given the critical angle, ‘determine the refractive index’. Both directions are examined, so be able to rearrange.",
        "watch": "Using n rather than 1/n. A critical angle greater than 90° means the formula was inverted."
      },
      {
        "code": "C4.13",
        "statement": "draw diagrams illustrating applications of total internal reflection",
        "summary": "A periscope uses two 45° prisms to turn light through 90° twice. An optical fibre keeps light inside a thin glass core by repeated total internal reflection along its length. An endoscope is a bundle of such fibres used to see inside the body.",
        "formula": "",
        "exam": "‘Draw a labelled diagram to show how total internal reflection is used in a periscope’ or the same for an optical fibre. Marks are for the ray path, the 45° angles or the shallow angle in the fibre, and the label naming total internal reflection.",
        "watch": "Drawing the ray leaving the fibre at a bend. Labelling the prism faces as mirrors, which misses the point of the question."
      }
    ]
  },
  {
    "code": "C5",
    "section": "C",
    "sectionTitle": "Waves and Optics",
    "title": "Lenses",
    "oneSentence": "How converging and diverging lenses bend light, the terms used to describe them, and how the image is found and measured.",
    "whyItMatters": "Ray diagrams for a converging lens and the magnification and lens formulae are steady Paper 02 material, and the terms in C5.2 are a guaranteed definition question.",
    "explanation": [
      "A converging lens is thicker in the middle than at the edges and brings a beam of parallel rays together at a point. A diverging lens is thinner in the middle and spreads a parallel beam out, so that the rays appear to come from a point behind the lens.",
      "The vocabulary is fixed and is examined directly. The principal axis is the line through the centre of the lens at right angles to its faces. The principal focus is the point on that axis where parallel rays converge, or appear to diverge from. The focal length is the distance from the centre of the lens to the principal focus. The focal plane is the plane through the principal focus at right angles to the axis. Magnification is how many times larger the image is than the object."
    ],
    "objectiveCount": 5,
    "objectives": [
      {
        "code": "C5.1",
        "statement": "illustrate the effect of converging and diverging lenses on a beam of parallel rays",
        "summary": "A converging lens brings a beam of parallel rays together at the principal focus on the far side. A diverging lens spreads a parallel beam out so that the rays appear to come from a principal focus on the same side as the incoming light.",
        "formula": "",
        "exam": "‘Illustrate the effect of a converging lens on a beam of parallel rays’ with a diagram. Marks are for the rays parallel before the lens, converging after it, meeting at a labelled principal focus, and arrows showing direction.",
        "watch": "Drawing the diverging lens rays meeting after the lens. They spread, and the focus is found by extending them backwards."
      },
      {
        "code": "C5.2",
        "statement": "define the terms: (a) principal axis; (b) principal focus; (c) focal length; (d) focal plane; (e) magnification",
        "summary": "Principal axis: the line through the centre of the lens, perpendicular to its faces. Principal focus: the point on the principal axis where rays parallel to it converge, or appear to diverge from. Focal length: the distance from the centre of the lens to the principal focus. Focal plane: the plane through the principal focus perpendicular to the principal axis. Magnification: the ratio of image size to object size.",
        "formula": "",
        "exam": "‘Define the following terms: principal axis, principal focus, focal length.’ One mark each and no working needed, which makes this one of the most reliable sets of marks in the section.",
        "watch": "Defining focal length as the distance from the lens to the image. That is the image distance, which changes with the object; the focal length is fixed."
      },
      {
        "code": "C5.3",
        "statement": "differentiate between real and virtual images",
        "summary": "A real image is formed where the rays actually meet, so it can be caught on a screen and is inverted. A virtual image is formed where the rays only appear to come from, so it cannot be caught on a screen and is upright.",
        "formula": "",
        "exam": "‘Differentiate between a real and a virtual image.’ Give the screen test and whether the image is upright or inverted, which is two marks rather than one.",
        "watch": "Saying a virtual image cannot be seen. It can be seen by the eye; it just cannot be projected onto a screen."
      },
      {
        "code": "C5.4",
        "statement": "apply the equations for magnification",
        "summary": "Magnification = image size ÷ object size, and also equals image distance ÷ object distance, m = v / u. An object 2 cm tall producing an image 6 cm tall has a magnification of 3.",
        "formula": "m = image size / object size = v / u",
        "exam": "‘Calculate the magnification produced by the lens’ or, given the magnification and object size, ‘calculate the size of the image’. Marks are for the correct ratio, the substitution and the recognition that magnification has no unit.",
        "watch": "Dividing object by image. Attaching a unit such as cm to the answer."
      },
      {
        "code": "C5.5",
        "statement": "determine the focal length of a converging lens",
        "summary": "Focus an illuminated object onto a screen with the lens, measure the object distance u and the image distance v, and substitute into 1/f = 1/u + 1/v. A quick approximate method is to focus a distant object onto a screen: the lens to screen distance is then the focal length.",
        "formula": "1/f = 1/u + 1/v",
        "exam": "‘Describe an experiment to determine the focal length of a converging lens.’ Marks are for the arrangement, the measurements, the repetition, and the calculation or graph. A calculation question gives two of u, v and f and asks for the third.",
        "watch": "Mixing centimetres and metres in the formula. Forgetting that the answer for f from a single pair of readings should be repeated and averaged."
      }
    ]
  },
  {
    "code": "D1",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Electrostatics",
    "oneSentence": "How objects become charged, the forces between charges, charging without contact, and where static electricity helps or is a hazard.",
    "whyItMatters": "Five objectives that set up the whole section. Induction and the electric field are regularly examined, and the hazard and application objective is an easy pair of marks.",
    "explanation": [
      "All matter contains positive protons fixed in the nuclei of its atoms and negative electrons that, in some materials, can move. Charging an object always means moving electrons, never protons.",
      "Rub a polythene rod with a cloth and electrons transfer from the cloth to the rod. The rod gains electrons and becomes negative; the cloth loses them and becomes positive. Rub a perspex rod and the transfer goes the other way. Nothing is created: charge is conserved, and the two objects end up with equal and opposite amounts."
    ],
    "objectiveCount": 5,
    "objectives": [
      {
        "code": "D1.1",
        "statement": "explain the charging of objects",
        "summary": "An object is charged by the transfer of electrons. Rubbing two materials together moves electrons from one to the other: the one that gains electrons becomes negatively charged and the one that loses them becomes positively charged. Charge is conserved, so the two charges are equal and opposite.",
        "formula": "",
        "exam": "‘Explain how a polythene rod becomes negatively charged when rubbed with a cloth.’ The mark requires electrons transferring to the rod, and a second mark often requires the cloth being left positive.",
        "watch": "Writing that positive charge moves onto the cloth. Say electrons leave it."
      },
      {
        "code": "D1.2",
        "statement": "describe the forces that electric charges exert on each other",
        "summary": "Like charges repel and unlike charges attract. The force acts along the line joining the charges and increases as they are brought closer together and as the charges grow larger.",
        "formula": "",
        "exam": "‘Describe the forces between two charged spheres’ or ‘state the test for a charged body’. The test question wants repulsion, and wants the reason attraction will not do.",
        "watch": "Offering attraction as the test for charge."
      },
      {
        "code": "D1.3",
        "statement": "explain charging by induction",
        "summary": "Bring a charged rod near a conductor without touching it. The free electrons move, leaving one end with charge opposite to the rod and the other with charge like it. Earth the far end so that charge escapes, remove the earth first, then remove the rod. The conductor is left charged opposite to the rod.",
        "formula": "",
        "exam": "‘Describe how a conductor may be charged by induction.’ Marks are for each step in the right order, especially removing the earth before removing the rod, and for stating the sign of the final charge.",
        "watch": "Removing the rod before breaking the earth connection, which lets the charge flow back and leaves the conductor neutral."
      },
      {
        "code": "D1.4",
        "statement": "define an electric field",
        "summary": "An electric field is a region in which a charge experiences a force. It is represented by field lines that start on positive charge and end on negative charge, and the direction of a line is the direction of the force on a small positive charge placed there.",
        "formula": "",
        "exam": "‘Define an electric field’ and ‘draw the electric field pattern between two oppositely charged parallel plates’. Marks are for the lines, the arrows showing direction, and even spacing where the field is uniform.",
        "watch": "Drawing lines without arrows. Letting field lines cross."
      },
      {
        "code": "D1.5",
        "statement": "describe one hazard and one useful application of static charge",
        "summary": "Hazard: charge building on a fuel tanker during filling can produce a spark that ignites the vapour, which is why tankers are earthed before delivery. Application: a photocopier charges a drum so that toner powder sticks only to the image, and an electrostatic precipitator charges smoke particles so that they are attracted to plates and removed from the exhaust.",
        "formula": "",
        "exam": "‘Describe ONE hazard and ONE useful application of static electricity.’ One mark for naming each and a second for explaining how the charge produces the effect.",
        "watch": "Naming lightning as the hazard without explaining the charge separation and discharge."
      }
    ]
  },
  {
    "code": "D2",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Current Electricity",
    "oneSentence": "What a current is, which way it is taken to flow, how charge and current are related, and the difference between direct and alternating current.",
    "whyItMatters": "Q = It is a standard calculation, and reading current-time and voltage-time graphs feeds directly into the electronics and transformer questions later in the section.",
    "explanation": [
      "A conductor has electrons that are free to move through it; an insulator does not. In a metal the outer electrons are not attached to any one atom, and an electric current in a metal is a flow of these free electrons.",
      "There is an awkward historical fact to keep straight. Conventional current is defined as flowing from the positive terminal of the supply to the negative, and every circuit rule and diagram uses that direction. Electrons actually flow the opposite way, from negative to positive, because they are negatively charged. The convention was fixed before the electron was discovered, and it was never changed."
    ],
    "objectiveCount": 7,
    "objectives": [
      {
        "code": "D2.1",
        "statement": "distinguish between conductors and insulators",
        "summary": "A conductor allows charge to flow through it easily because it contains charges that are free to move. An insulator does not, because its charges are bound in place. Metals, graphite and salt solutions are conductors; plastic, rubber, glass and dry air are insulators.",
        "formula": "",
        "exam": "‘Distinguish between a conductor and an insulator and give ONE example of each.’ The distinction must mention free charges being able to move, not simply that one conducts and the other does not.",
        "watch": "Defining a conductor as something that ‘lets electricity through’ without saying why."
      },
      {
        "code": "D2.2",
        "statement": "state that an electric current in a metal consists of a flow of electrons",
        "summary": "An electric current in a metal consists of a flow of electrons. The outer electrons of the metal atoms are not bound to any one atom and drift through the metal when a potential difference is applied.",
        "formula": "",
        "exam": "‘State what constitutes an electric current in a metal.’ A short recall mark. It may be followed by an explanation of why a lamp lights immediately, which needs the field being established throughout the circuit.",
        "watch": "Saying the electrons travel from the cell to the lamp before it lights."
      },
      {
        "code": "D2.3",
        "statement": "differentiate between electron flow and conventional current",
        "summary": "Conventional current flows from the positive terminal of the supply, round the circuit, to the negative terminal. Electron flow is from negative to positive, the opposite direction. All circuit diagrams and rules use conventional current.",
        "formula": "",
        "exam": "‘Differentiate between electron flow and conventional current’ or an arrow to add to a circuit diagram. Adding the arrow in the electron direction is a lost mark.",
        "watch": "Applying the motor and generator rules with the electron direction, which reverses every answer."
      },
      {
        "code": "D2.4",
        "statement": "state the unit of electrical current",
        "summary": "The unit of electric current is the ampere, symbol A. One ampere is a flow of one coulomb of charge per second.",
        "formula": "",
        "exam": "‘State the unit of electric current’ is a single recall mark, and it appears inside longer questions as the unit required on a numerical answer.",
        "watch": "Writing amp rather than ampere when the full name is asked for, or using a lowercase a for the symbol."
      },
      {
        "code": "D2.5",
        "statement": "apply the relationship Q = It",
        "summary": "Q = I t. A current of 3 A flowing for 20 s transfers 3 × 20 = 60 C of charge. Time must be in seconds.",
        "formula": "Q = I t",
        "exam": "‘Calculate the charge which flows through the lamp.’ Marks are for the conversion of time to seconds, the substitution, and the unit, which is the coulomb.",
        "watch": "Leaving time in minutes, which makes the answer sixty times too small."
      },
      {
        "code": "D2.6",
        "statement": "differentiate between direct and alternating currents",
        "summary": "Direct current flows in one direction only and is supplied by cells and batteries. Alternating current reverses direction regularly and is supplied by the mains. On a voltage-time graph, direct current is a horizontal line and alternating current is a wave crossing zero twice each cycle.",
        "formula": "",
        "exam": "‘Differentiate between direct and alternating current’ or a pair of graphs to identify. Give the direction behaviour and the source for each.",
        "watch": "Describing a.c. as ‘stronger’ than d.c. The difference is direction, not size."
      },
      {
        "code": "D2.7",
        "statement": "analyse current-time or voltage-time graphs",
        "summary": "Read the period as the time for one complete cycle, then find the frequency from f = 1/T. Read the peak value as the maximum height from the zero line. A horizontal line means a steady direct supply; a repeating curve crossing zero means alternating.",
        "formula": "f = 1 / T; charge = area under a current-time graph",
        "exam": "‘Use the graph to determine the frequency of the supply’ or ‘state the peak voltage’. Marks are for reading the period correctly from the scale and for the conversion to frequency.",
        "watch": "Measuring the period as half a cycle, which doubles the frequency. Measuring peak to peak instead of from zero."
      }
    ]
  },
  {
    "code": "D3",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Electrical Quantities",
    "oneSentence": "Potential difference as energy per unit charge, electrical power, and why conserving electrical energy matters.",
    "whyItMatters": "P = IV is one of the most used formulae in the whole paper, appearing in the household electricity, fuse rating and transformer questions as well as here.",
    "explanation": [
      "Electrical energy is convenient because it converts so readily into other forms. A lamp turns it into light and thermal energy, a motor into kinetic energy, a heater into thermal energy, a loudspeaker into sound. The conversion runs the other way too: a generator turns kinetic energy into electrical energy, a solar cell turns light into it, and a cell turns chemical energy into it.",
      "Potential difference, also called voltage, is the energy transferred per unit charge, V = E/Q. A potential difference of one volt means one joule of energy is transferred for every coulomb of charge that passes. That is why a 12 V battery drives a device harder than a 1.5 V cell: each coulomb carries eight times the energy."
    ],
    "objectiveCount": 4,
    "objectives": [
      {
        "code": "D3.1",
        "statement": "cite examples of the conversion of electrical energy to other forms and vice versa",
        "summary": "Electrical to other forms: a lamp gives light and thermal energy, a motor gives kinetic energy, a heater gives thermal energy, a loudspeaker gives sound. Other forms to electrical: a generator from kinetic energy, a solar cell from light, a cell from chemical energy, a microphone from sound.",
        "formula": "",
        "exam": "‘Cite TWO examples of the conversion of electrical energy into other forms.’ Name the device and both the useful form and, where relevant, the by-product.",
        "watch": "Naming the device without naming the energy forms. ‘A lamp’ is not an answer; ‘a lamp converts electrical energy into light and thermal energy’ is."
      },
      {
        "code": "D3.2",
        "statement": "apply the relationship V = E/Q",
        "summary": "V = E / Q. Potential difference is the energy transferred per unit charge, measured in volts, where one volt is one joule per coulomb. If 30 J is transferred by 5 C, the potential difference is 6 V.",
        "formula": "V = E / Q; E = Q V",
        "exam": "‘Define potential difference’ or ‘calculate the energy transferred when 4 C passes through a 12 V supply’. The definition needs energy per unit charge and the unit.",
        "watch": "Defining potential difference as ‘the push’ or ‘the force’. It is energy per unit charge."
      },
      {
        "code": "D3.3",
        "statement": "apply the relationship P =IV",
        "summary": "P = I V. A device drawing 2 A from a 120 V supply has a power of 240 W. Combined with R = V/I this also gives P = I²R and P = V²/R.",
        "formula": "P = I V; P = I² R; P = V² / R",
        "exam": "‘Calculate the power of the appliance’ or ‘calculate the current drawn by a 1500 W heater from a 240 V supply’. The second type, rearranged to I = P/V, is the one that appears in fuse questions.",
        "watch": "Using the wrong version of the formula for the quantities given, then substituting a resistance where a voltage belongs."
      },
      {
        "code": "D3.4",
        "statement": "discuss the importance of conserving electrical energy and the means of doing so",
        "summary": "Most Caribbean territories generate electricity from imported fuel, so using less lowers bills and the national fuel import bill, and reduces carbon dioxide emissions. Practical measures: switch off at the socket instead of standby, use light emitting diode lamps, use natural light and ventilation, service air conditioners and set them higher, and choose appliances with good energy ratings.",
        "formula": "",
        "exam": "‘Discuss the importance of conserving electrical energy and TWO means of doing so.’ Marks are split between the reasons and the measures, so answer both halves.",
        "watch": "Writing only about the environment. The cost of imported fuel is the point the syllabus makes for the region."
      }
    ]
  },
  {
    "code": "D4",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Circuits and Components",
    "oneSentence": "Circuit diagrams, series and parallel connections, cells, resistance and Ohm’s law, and the electrical safety of a house.",
    "whyItMatters": "Sixteen objectives, the largest topic in the syllabus. Resistance calculations and household wiring appear in almost every Paper 02, and the current against voltage experiment is a standard data analysis question.",
    "explanation": [
      "A circuit diagram uses agreed symbols so that any reader anywhere can build the same circuit. Learn the symbols for the cell, the battery, the lamp, the switch, the fixed and variable resistor, the ammeter, the voltmeter, the fuse, the diode and the light emitting diode, and note that a cell has a long thin line for positive and a short thick line for negative.",
      "Components can be joined in two ways. In series there is one path, so the same current passes through every component and the supply voltage divides between them. In parallel there are branches, so the current divides between them while each branch has the full supply voltage across it. Household appliances are connected in parallel so that each gets the full mains voltage and can be switched independently."
    ],
    "objectiveCount": 16,
    "objectives": [
      {
        "code": "D4.1",
        "statement": "use symbols to construct circuit diagrams",
        "summary": "Use the agreed symbols and draw the circuit with straight lines and right-angled corners. A cell is a long thin line for positive and a short thick line for negative; an ammeter is a circle marked A connected in series; a voltmeter is a circle marked V connected in parallel across the component.",
        "formula": "",
        "exam": "‘Draw a circuit diagram to show …’ Marks are for each correct symbol, for the meter placed in the right way, and for a complete circuit with no gaps.",
        "watch": "Drawing an ammeter across a component. It goes in the line, in series."
      },
      {
        "code": "D4.2",
        "statement": "differentiate between series and parallel circuits",
        "summary": "In series there is one path: the same current flows through every component and the supply voltage is shared between them. In parallel there are branches: each branch has the full supply voltage and the current divides between them, with the branch currents adding to the total.",
        "formula": "",
        "exam": "‘Differentiate between series and parallel circuits’ or a circuit with missing meter readings to complete. Use the two rules to fill in the values rather than guessing.",
        "watch": "Saying current is shared in series and voltage in parallel, which is the two rules the wrong way round."
      },
      {
        "code": "D4.3",
        "statement": "explain the functions of the various parts of a zinc-carbon cell",
        "summary": "The zinc case is the negative electrode. The carbon rod at the centre is the positive electrode. The ammonium chloride paste between them is the electrolyte, which allows ions to move. Manganese dioxide around the rod is the depolariser, which removes hydrogen that would otherwise collect and stop the cell working.",
        "formula": "",
        "exam": "‘Name the parts of a zinc-carbon cell and state the function of each.’ One mark per part with its function, so give the electrode, the electrolyte and the depolariser.",
        "watch": "Naming the parts without saying what each does. The function is where the second mark sits."
      },
      {
        "code": "D4.4",
        "statement": "distinguish between primary and secondary cells",
        "summary": "A primary cell converts chemical energy to electrical energy and cannot be recharged, because the reaction is not reversible. A secondary cell can be recharged by passing a current through it in the reverse direction, which reverses the chemical change. A dry cell is primary; a car battery is secondary.",
        "formula": "",
        "exam": "‘Distinguish between primary and secondary cells and give ONE example of each.’ The distinction must turn on whether the cell can be recharged.",
        "watch": "Distinguishing them by size or voltage. The recharging is the difference."
      },
      {
        "code": "D4.5",
        "statement": "draw a circuit diagram to show how a secondary cell can be recharged",
        "summary": "Connect a direct current supply of higher voltage than the cell across it, with the positive terminal of the supply to the positive terminal of the cell and the negative to the negative, so that current is driven backwards through the cell. Include an ammeter and a variable resistor to control the charging current.",
        "formula": "",
        "exam": "‘Draw a circuit diagram to show how a secondary cell may be recharged.’ Marks are for the supply of higher voltage, the correct polarity, and the ammeter and variable resistor in the circuit.",
        "watch": "Connecting positive to negative, which is the discharging arrangement, not the charging one."
      },
      {
        "code": "D4.6",
        "statement": "investigate the relationship between current and potential difference",
        "summary": "Connect the component in series with an ammeter and a variable supply, with a voltmeter across it. Change the voltage in steps, recording the current each time, and plot current against voltage. A metal conductor at constant temperature gives a straight line through the origin; a filament lamp gives a curve.",
        "formula": "",
        "exam": "A standard data analysis question. Marks are for the circuit diagram, the table with both quantities and units, the plotted graph, the shape described correctly, and the resistance from the gradient.",
        "watch": "Plotting the axes the wrong way round when the question names the graph. ‘Plot I against V’ means current on the vertical axis."
      },
      {
        "code": "D4.7",
        "statement": "explain the concept of resistance",
        "summary": "Resistance is the opposition of a component to the flow of charge, defined as the potential difference across it divided by the current through it. Its unit is the ohm, symbol Ω. A component has a resistance of one ohm when a potential difference of one volt drives a current of one ampere through it.",
        "formula": "",
        "exam": "‘Explain what is meant by the resistance of a conductor’ and ‘state the factors on which the resistance of a wire depends’. The factors are length, cross-sectional area, material and temperature.",
        "watch": "Defining resistance as ‘something that resists current’ with no reference to voltage divided by current."
      },
      {
        "code": "D4.8",
        "statement": "apply the relationship R = V / I",
        "summary": "R = V / I. A component with 6 V across it carrying 0.5 A has a resistance of 12 Ω. Rearranged, V = IR and I = V/R.",
        "formula": "R = V / I; V = I R",
        "exam": "‘Calculate the resistance of the component’ or ‘calculate the current through the 20 Ω resistor’. Marks are for the rearrangement, the substitution and the unit.",
        "watch": "Using the supply voltage across one component of a series circuit. Only part of it appears across each."
      },
      {
        "code": "D4.9",
        "statement": "explain why it is necessary for an ammeter to have a very low resistance",
        "summary": "An ammeter is connected in series, so all the current passes through it. If it had a significant resistance it would reduce the current it is meant to measure, so the reading would be lower than the true value. A very low resistance keeps that effect negligible.",
        "formula": "",
        "exam": "‘Explain why an ammeter must have a very low resistance.’ The mark requires the effect on the circuit, that it would otherwise reduce the current being measured.",
        "watch": "Saying only that it ‘should not affect the circuit’ without saying how it would."
      },
      {
        "code": "D4.10",
        "statement": "explain why it is necessary for a voltmeter to have a very high resistance",
        "summary": "A voltmeter is connected in parallel with the component, so it provides an alternative path for the current. A very high resistance means almost no current is diverted through it, so the circuit is barely disturbed and the reading is the true potential difference.",
        "formula": "",
        "exam": "‘Explain why a voltmeter must have a very high resistance.’ The mark requires that it should draw negligible current from the circuit.",
        "watch": "Giving the ammeter reason instead. The two explanations are opposite and cannot be swapped."
      },
      {
        "code": "D4.11",
        "statement": "solve problems involving series and parallel resistance",
        "summary": "In series, add the resistances: R = R₁ + R₂. In parallel, use 1/R = 1/R₁ + 1/R₂ and remember to invert at the end. Two 6 Ω resistors give 12 Ω in series and 3 Ω in parallel.",
        "formula": "series R = R₁ + R₂; parallel 1/R = 1/R₁ + 1/R₂",
        "exam": "‘Calculate the effective resistance between the two points.’ Marks are for the correct formula, the working and the unit. Show the inverted step in a parallel calculation, because it is often a mark on its own.",
        "watch": "Leaving the answer as 1/R. The question asks for R."
      },
      {
        "code": "D4.12",
        "statement": "solve problems involving series, parallel and series- parallel circuits",
        "summary": "Work from the inside out. Combine the parallel group into a single resistance first, then add it to the series parts to get the total. Use the total with the supply voltage to find the main current, then work back to find the voltage across and current through each component.",
        "formula": "combine parallel groups first, then series; I = V / R total",
        "exam": "‘Calculate the current through each resistor.’ Marks are spread across the stages, so write every one down. The final check, that branch currents sum to the total, catches most errors.",
        "watch": "Using the supply voltage for a component that has only part of it across it."
      },
      {
        "code": "D4.13",
        "statement": "discuss the reasons for using parallel connections of domestic appliances",
        "summary": "Appliances are connected in parallel so that each receives the full mains voltage, each can be switched on and off independently, and a fault in one does not stop the others working.",
        "formula": "",
        "exam": "‘Discuss the reasons for connecting domestic appliances in parallel.’ Give all three reasons, since each is a separate mark.",
        "watch": "Giving only the full voltage reason. Independent switching and independent failure are separate marks."
      },
      {
        "code": "D4.14",
        "statement": "explain the purpose of a fuse or circuit breaker and the earth wire",
        "summary": "A fuse is a thin wire in the live wire that melts and breaks the circuit if the current becomes too large. A circuit breaker does the same job by switching off automatically and can be reset. The earth wire connects the metal case of an appliance to the ground, so that if the live wire touches the case the large current flows to earth and blows the fuse rather than passing through a person.",
        "formula": "",
        "exam": "‘Explain the purpose of the fuse and the earth wire in a domestic circuit.’ Marks are for what each does and for the fuse being in the live wire.",
        "watch": "Saying the earth wire ‘takes away extra electricity’. It provides a safe path for a fault current and keeps the case at zero volts."
      },
      {
        "code": "D4.15",
        "statement": "select a fuse or circuit breaker of suitable current rating for a given appliance",
        "summary": "Work out the working current from I = P/V, then choose the next standard fuse above it. A 1200 W appliance on a 240 V supply draws 5 A, so a 13 A fuse would be chosen from the usual 3 A, 5 A and 13 A range, or a 5 A fuse if the range allows.",
        "formula": "I = P / V",
        "exam": "‘Determine the most suitable fuse for the appliance.’ Marks are for the current calculation and for choosing the correct rating from the list given, with a brief reason.",
        "watch": "Choosing the fuse nearest the calculated current when that is below it. A 5 A appliance must not have a 3 A fuse."
      },
      {
        "code": "D4.16",
        "statement": "state the adverse effects of connecting electrical appliances to incorrect or fluctuating voltage supplies",
        "summary": "Too high a voltage drives too large a current, so the appliance overheats, its insulation can melt and a fire may start. Too low a voltage means motors run slowly and may stall and overheat, and heaters and lamps underperform. Fluctuating supplies cause repeated surges that shorten the life of components and can destroy electronic equipment.",
        "formula": "",
        "exam": "‘State TWO adverse effects of connecting an appliance to an incorrect voltage supply.’ One mark each, and a reason attached to each raises the answer.",
        "watch": "Saying only that ‘it will not work’. Name the damage and the mechanism."
      }
    ]
  },
  {
    "code": "D5",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Electronics",
    "oneSentence": "The diode and rectification, the five logic gates and their truth tables, and the effect of electronics on society.",
    "whyItMatters": "Logic gates give predictable marks, because a truth table is either right or wrong and can be checked. The combination question in D5.5 appears regularly.",
    "explanation": [
      "A semiconductor diode allows current to pass in one direction only. Connected so that current can flow, it is forward biased and behaves almost like a plain wire. Connected the other way it is reverse biased and blocks the current almost completely.",
      "That one-way behaviour is what converts alternating current into direct current, a process called rectification. A single diode in series with the load passes only the halves of the cycle in one direction and blocks the others, so the output voltage rises and falls but never goes negative. That is half wave rectification, and its graph is the alternating wave with the negative humps removed."
    ],
    "objectiveCount": 6,
    "objectives": [
      {
        "code": "D5.1",
        "statement": "describe how a semi- conductor diode can be used in half wave rectification",
        "summary": "Place a diode in series with the load and the alternating supply. During the half cycles when the diode is forward biased, current flows through the load. During the other half cycles it is reverse biased and blocks the current, so nothing flows. The output is a series of humps in one direction only, with gaps between them.",
        "formula": "",
        "exam": "‘Describe how a semiconductor diode can be used for half wave rectification’, usually with graphs of input and output to sketch. Marks are for the circuit, for the output having no negative parts, and for the gaps where the blocked half cycles were.",
        "watch": "Sketching an output with the negative humps flipped up. That is full wave rectification, which is a different circuit."
      },
      {
        "code": "D5.2",
        "statement": "differentiate between direct current from batteries and rectified alternating current by a consideration of their voltage-time graphs",
        "summary": "A battery gives a horizontal straight line on a voltage-time graph, a steady value that does not change. Half wave rectified alternating current gives a series of separate humps of the same polarity, rising and falling, with gaps between them. Both are direct current because neither goes negative, but only the battery’s is steady.",
        "formula": "",
        "exam": "‘Differentiate between direct current from a battery and rectified alternating current by considering their voltage-time graphs.’ Marks are for both sketches and for the description of the difference, steady against varying.",
        "watch": "Saying the rectified output is alternating current. It never reverses direction, so it is direct current, just not a steady one."
      },
      {
        "code": "D5.3",
        "statement": "recall the symbols for AND, OR, NOT, NAND, NOR logic gates",
        "summary": "Learn the five shapes: AND is a D shape with a flat back, OR is a curved shield shape, NOT is a triangle with a small circle at its tip, NAND is the AND shape with a small circle on the output, NOR is the OR shape with a small circle on the output.",
        "formula": "",
        "exam": "‘Draw the symbol for a NAND gate’ or a diagram with gates to name. Draw the inversion circles clearly, since a missing circle turns a NAND into an AND and loses the mark.",
        "watch": "Leaving the circle off a NAND or NOR symbol, or adding one to an AND or OR."
      },
      {
        "code": "D5.4",
        "statement": "state the function of each gate with the aid of truth tables",
        "summary": "NOT: 0→1, 1→0. AND: output 1 only when both inputs are 1. OR: output 1 when either or both inputs are 1. NAND: the inverse of AND, so 1 unless both inputs are 1. NOR: the inverse of OR, so 1 only when both inputs are 0.",
        "formula": "",
        "exam": "‘Complete the truth table for the NOR gate.’ All four rows must be filled and the input columns must cover every combination. Marks are usually one for the table’s structure and one or more for the correct outputs.",
        "watch": "Writing only two or three rows. Two inputs always give exactly four combinations."
      },
      {
        "code": "D5.5",
        "statement": "analyze circuits involving the combinations of not more than three logic gates",
        "summary": "Work through the circuit one gate at a time. Add a column to the truth table for the output of each intermediate gate, fill it for every input combination, then use those columns as the inputs to the next gate until you reach the final output.",
        "formula": "",
        "exam": "‘Complete the truth table for the circuit shown’, with up to three gates. Marks are for the intermediate columns as well as the final one, so show them rather than jumping to the answer.",
        "watch": "Trying to reason the final output directly without the intermediate columns, which is where errors creep in."
      },
      {
        "code": "D5.6",
        "statement": "discuss the impact of electronic and technological advances on society",
        "summary": "Electronics has transformed communication, medicine, education, industry and entertainment. Benefits include instant communication, computerised medical imaging, online learning and greater industrial efficiency. Drawbacks include job losses to automation, electronic waste, loss of privacy, and the divide between those with access to the technology and those without.",
        "formula": "",
        "exam": "‘Discuss the impact of electronic and technological advances on society.’ Marks are split between positive and negative effects, so a one-sided answer cannot score full marks however long it is.",
        "watch": "Listing devices rather than impacts. The question asks what changed for people, not what was invented."
      }
    ]
  },
  {
    "code": "D6",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Magnetism",
    "oneSentence": "Which materials are magnetic, how a magnet attracts unmagnetised iron, permanent and temporary magnets, poles and magnetic fields.",
    "whyItMatters": "Field mapping and the rules about poles are the foundation of everything in electromagnetism, and the plotting compass experiment is a standard practical question.",
    "explanation": [
      "Only a few materials are magnetic: iron, steel, nickel, cobalt and some alloys. Everything else, including copper, aluminium, plastic and wood, is non-magnetic, which is why a magnet picks a steel pin out of a pile of sawdust.",
      "A magnetic material can be pictured as containing many tiny magnets, called domains. In an unmagnetised piece they point in random directions and cancel out. Bringing a magnet near lines them up so that the near end becomes a pole opposite to the magnet’s, and unlike poles attract, so the object is pulled in. That is induced magnetism and it explains why a magnet attracts an object that was not itself a magnet."
    ],
    "objectiveCount": 7,
    "objectives": [
      {
        "code": "D6.1",
        "statement": "differentiate between magnetic and non-magnetic materials",
        "summary": "Magnetic materials are attracted by a magnet and can be magnetised: iron, steel, nickel and cobalt. Non-magnetic materials are not attracted and cannot be magnetised: copper, aluminium, brass, plastic, wood and glass.",
        "formula": "",
        "exam": "‘Differentiate between magnetic and non-magnetic materials and give TWO examples of each.’ Choose examples confidently; naming aluminium as magnetic loses the mark.",
        "watch": "Assuming all metals are magnetic."
      },
      {
        "code": "D6.2",
        "statement": "explain how a magnet can attract an unmagnetised object",
        "summary": "A magnetic material contains domains, small regions that behave as tiny magnets. In an unmagnetised object they point randomly and cancel. A magnet brought near lines them up so that the near end of the object becomes a pole opposite to the magnet’s, and unlike poles attract, so the object is pulled towards the magnet.",
        "formula": "",
        "exam": "‘Explain how a magnet attracts an unmagnetised piece of iron.’ Marks are for the domains lining up, for the induced pole being opposite, and for unlike poles attracting.",
        "watch": "Saying the magnet ‘pulls the metal’ with no mechanism. The induced opposite pole is the explanation."
      },
      {
        "code": "D6.3",
        "statement": "distinguish between materials used to make “permanent” and “temporary” magnets",
        "summary": "Soft iron is used for temporary magnets: it magnetises easily and loses its magnetism as soon as the field is removed, which suits electromagnet cores, relays and transformer cores. Steel is used for permanent magnets: it is harder to magnetise but retains its magnetism, which suits bar magnets, compass needles and loudspeaker magnets.",
        "formula": "",
        "exam": "‘Distinguish between the materials used for permanent and temporary magnets, giving ONE use of each.’ The use must match the property, which is where the second mark sits.",
        "watch": "Choosing steel for an electromagnet core, which would defeat the purpose of being able to switch it off."
      },
      {
        "code": "D6.4",
        "statement": "identify the poles of a magnetic dipole",
        "summary": "Suspend the magnet so it can turn freely. The end that points towards the Earth’s geographic north is the north-seeking pole, or north pole; the other is the south-seeking pole. Poles always occur in pairs, and cutting a magnet in half produces two magnets each with both poles.",
        "formula": "",
        "exam": "‘Describe how you would identify the poles of a bar magnet.’ Marks are for suspending it freely, letting it settle, and identifying the end pointing north.",
        "watch": "Using a second magnet to identify poles without saying which of its poles is known. The suspension method needs no prior knowledge."
      },
      {
        "code": "D6.5",
        "statement": "investigate the forces between magnetic poles",
        "summary": "Suspend one bar magnet horizontally from a thread so it turns freely. Bring the north pole of a second magnet towards its north pole and observe repulsion, then towards its south pole and observe attraction. Move the second magnet closer and the effect becomes stronger.",
        "formula": "",
        "exam": "Set as a planning and designing or a description question. Marks are for the suspension, for testing both pole combinations, for varying the distance, and for the conclusions drawn.",
        "watch": "Laying the magnet on a bench where friction hides the force. It must be free to turn."
      },
      {
        "code": "D6.6",
        "statement": "define a magnetic field",
        "summary": "A magnetic field is a region in which a magnetic material experiences a force. It is represented by field lines that run from the north pole to the south pole outside the magnet, and the direction of a line at any point is the direction a compass north pole would point there.",
        "formula": "",
        "exam": "‘Define a magnetic field’ and ‘sketch the field pattern around a bar magnet’. Marks are for the definition, the shape of the lines, the arrows from north to south, and the crowding at the poles.",
        "watch": "Drawing the lines without arrows, or drawing them from south to north outside the magnet."
      },
      {
        "code": "D6.7",
        "statement": "map magnetic fields",
        "summary": "Place the magnet on paper and draw round it. Put a plotting compass near one pole, mark dots at the two ends of the needle, move the compass so its tail sits on the last dot, and repeat across the paper. Join the dots into a smooth curve and add an arrow. Repeat from several starting points. Iron filings sprinkled on paper over the magnet show the whole pattern at once.",
        "formula": "",
        "exam": "‘Describe how you would plot the magnetic field pattern around a bar magnet.’ Marks are for the compass method step by step, for joining the marks, for the arrow, and for repeating from different points.",
        "watch": "Describing the filings method alone when the question asks for the direction of the field, which filings do not show."
      }
    ]
  },
  {
    "code": "D7",
    "section": "D",
    "sectionTitle": "Electricity and Magnetism",
    "title": "Electromagnetism",
    "oneSentence": "The magnetic field a current makes, the force on a current in a field, the motor, induced e.m.f., the generator and the transformer.",
    "whyItMatters": "Fifteen objectives and the most heavily examined topic in Section D. The motor, the generator and the transformer each appear as extended response questions, and the transformer calculation is a reliable set of marks.",
    "explanation": [
      "A current produces a magnetic field around it. Around a straight wire the field is a set of circles centred on the wire, and the direction is given by the right-hand grip rule: point the thumb of the right hand along the conventional current and the fingers curl the way the field points. A coil of wire, called a solenoid, produces a field like a bar magnet’s, with a north pole at one end, and winding it round a soft iron core makes an electromagnet, far stronger and able to be switched off.",
      "When a current-carrying wire lies in a magnetic field, the two fields interact and the wire experiences a force. Fleming’s left-hand rule gives its direction: hold the first finger, second finger and thumb of the left hand at right angles, point the First finger along the Field, the seCond finger along the Current, and the thuMb shows the Motion. The force is larger with a bigger current, a stronger field, or a longer wire in the field, and it is greatest when the wire is at right angles to the field."
    ],
    "objectiveCount": 15,
    "objectives": [
      {
        "code": "D7.1",
        "statement": "conduct simple experiments to investigate the magnetic field pattern around current-carrying conductors",
        "summary": "Pass a current through a straight wire held vertically through a horizontal card, sprinkle iron filings on the card and tap it: they form circles round the wire. Place plotting compasses on the card and they point round the circle, reversing when the current is reversed. For a solenoid, the field inside is uniform and outside it resembles a bar magnet’s.",
        "formula": "",
        "exam": "Set as a description of the experiment with the pattern to sketch. Marks are for the apparatus, for the circular pattern round a straight wire, for the compass direction, and for what happens when the current reverses.",
        "watch": "Drawing the field round a straight wire as lines running along the wire. They are circles around it."
      },
      {
        "code": "D7.2",
        "statement": "apply suitable rules which relate the direction of current flow to the direction of the magnetic field",
        "summary": "Right-hand grip rule for a straight wire: point the right thumb along the conventional current and the curled fingers give the field direction. For a solenoid, curl the right fingers along the current in the turns and the thumb points to the north pole.",
        "formula": "",
        "exam": "‘State the direction of the magnetic field at point X’ or ‘mark the north pole of the solenoid’. Marks are for the correct direction, and often for showing which rule was used.",
        "watch": "Using the left hand. The left hand is for the motor rule, not for the field around a current."
      },
      {
        "code": "D7.3",
        "statement": "describe a commercial application of an electromagnet",
        "summary": "An electric bell, a relay, a circuit breaker, a scrapyard crane or a loudspeaker. In a bell, current through an electromagnet attracts an iron armature, which strikes the gong and simultaneously breaks the circuit; the electromagnet releases, the contact remakes, and the cycle repeats.",
        "formula": "",
        "exam": "‘Describe a commercial application of an electromagnet’, usually with a diagram to interpret. Marks are for the sequence of events and for the role of the soft iron core.",
        "watch": "Naming the device without describing how the electromagnet makes it work."
      },
      {
        "code": "D7.4",
        "statement": "conduct an experiment which demonstrates the existence of a force on a current-carrying conductor placed in a magnetic field",
        "summary": "Suspend a stiff wire horizontally between the poles of a horseshoe magnet so it lies at right angles to the field, and connect it to a battery through a switch. When the current is switched on the wire jumps. Reversing the current or turning the magnet round reverses the direction of the jump.",
        "formula": "",
        "exam": "‘Describe an experiment to demonstrate that a force acts on a current-carrying conductor in a magnetic field.’ Marks are for the arrangement at right angles, the observation, and at least one reversal test.",
        "watch": "Placing the wire along the field direction, where no force acts at all."
      },
      {
        "code": "D7.5",
        "statement": "sketch the resultant magnetic flux pattern when a current-carrying wire is placed perpendicular to a magnetic field",
        "summary": "Draw the uniform field of the magnet as straight parallel lines, and the circular field of the wire around it. On one side the two point the same way and reinforce, giving crowded lines; on the other they oppose and cancel, giving sparse lines. The wire is pushed from the crowded side towards the sparse side.",
        "formula": "",
        "exam": "‘Sketch the resultant magnetic flux pattern’ with the direction of the force to mark. Marks are for the crowding on one side, the weakening on the other, and an arrow for the force pointing from strong to weak.",
        "watch": "Drawing the two fields side by side without combining them, or putting the force arrow the wrong way round."
      },
      {
        "code": "D7.6",
        "statement": "apply Fleming’s left- hand (motor) rule",
        "summary": "Hold the first finger, second finger and thumb of the left hand mutually at right angles. First finger points along the Field, from north to south. seCond finger points along the conventional Current. The thuMb then shows the direction of the Motion, that is, the force.",
        "formula": "left hand: First finger Field, seCond finger Current, thuMb Motion",
        "exam": "‘Use Fleming’s left-hand rule to determine the direction in which the wire moves.’ The answer is a direction, so state it clearly as up, down, into the page or out of the page.",
        "watch": "Using the right hand, which reverses the answer. Forgetting that the field runs from north to south."
      },
      {
        "code": "D7.7",
        "statement": "identify the factors that affect the force on a current-carrying conductor in a magnetic field",
        "summary": "The force increases with the size of the current, the strength of the magnetic field, and the length of conductor inside the field. It also depends on the angle: it is greatest when the conductor is at right angles to the field and zero when the conductor lies along the field.",
        "formula": "",
        "exam": "‘State THREE factors which affect the size of the force on a current-carrying conductor in a magnetic field.’ One mark each, and the angle counts as a fourth if asked for more.",
        "watch": "Giving the resistance of the wire or the voltage of the supply. The force depends on the current, not the voltage directly."
      },
      {
        "code": "D7.8",
        "statement": "explain the action of a D.C. motor",
        "summary": "A coil carrying current sits between the poles of a magnet. The forces on its two sides act in opposite directions, by Fleming’s left-hand rule, so the coil turns. A split ring commutator reverses the current in the coil every half turn, so the force on each side keeps pushing it the same way round and rotation continues.",
        "formula": "",
        "exam": "‘Explain the action of a direct current motor.’ Marks are for the opposite forces on the two sides, the resulting turning effect, and the function of the split ring commutator.",
        "watch": "Describing the commutator as reversing the magnetic field. It reverses the current in the coil."
      },
      {
        "code": "D7.9",
        "statement": "describe simple activities which demonstrate an induced e.m.f",
        "summary": "Move a bar magnet into a coil connected to a sensitive galvanometer and the needle deflects. Hold the magnet still inside and the needle returns to zero. Pull it out and the needle deflects the other way. Moving the coil instead of the magnet has the same effect.",
        "formula": "",
        "exam": "‘Describe a simple activity which demonstrates an induced e.m.f.’ Marks are for the apparatus, the movement, the observation, and often for what happens when the movement stops.",
        "watch": "Omitting the stationary test. It is what proves the e.m.f. comes from the change."
      },
      {
        "code": "D7.10",
        "statement": "conduct simple experiments to show the magnitude of the induced e.m.f",
        "summary": "The induced e.m.f. is larger when the magnet is moved faster, when a stronger magnet is used, and when the coil has more turns. Each can be tested separately with the same coil and galvanometer, keeping the others fixed.",
        "formula": "",
        "exam": "Set as a planning and designing question, or as a list of factors. Marks are for controlling the other variables and for the comparison of deflections.",
        "watch": "Changing the magnet and the speed at the same time, which makes the result impossible to attribute."
      },
      {
        "code": "D7.11",
        "statement": "predict the direction of induced current given the direction of motion of the conductor and that of the magnetic field",
        "summary": "Use Fleming’s right-hand rule: First finger along the Field, thuMb along the Motion of the conductor, and the seCond finger then gives the direction of the induced Current. Lenz’s law gives the same answer: the induced current opposes the change producing it.",
        "formula": "right hand: First finger Field, thuMb Motion, seCond finger Current",
        "exam": "‘State the direction of the induced current’ with a diagram. Using the right hand is the mark, and quoting Lenz’s law as a check strengthens the answer.",
        "watch": "Using the left hand, which is for the motor effect. If motion produces current, use the right hand."
      },
      {
        "code": "D7.12",
        "statement": "explain the action of the A.C. generator",
        "summary": "A coil is rotated in a magnetic field. As it turns, the field through it changes, so an e.m.f. is induced. Slip rings and brushes connect the coil to the external circuit and keep the same coil end connected to the same terminal, so the output reverses every half turn, giving alternating current.",
        "formula": "",
        "exam": "‘Explain the action of an a.c. generator.’ Marks are for the rotation, the changing field through the coil, the induced e.m.f., and the slip rings giving an alternating output.",
        "watch": "Giving the generator a split ring commutator. That would make it a direct current generator."
      },
      {
        "code": "D7.13",
        "statement": "explain the principle of operation of a transformer",
        "summary": "An alternating current in the primary coil produces a continuously changing magnetic field. A soft iron core carries that changing field to the secondary coil, where it induces an alternating e.m.f. The voltages are in the same ratio as the numbers of turns, Vs/Vp = Ns/Np.",
        "formula": "Vs / Vp = Ns / Np",
        "exam": "‘Explain the principle of operation of a transformer’ and ‘calculate the number of turns on the secondary coil’. The explanation needs the changing field and the fact that direct current will not work.",
        "watch": "Saying the current passes from the primary to the secondary. The coils are not connected; only the changing field links them."
      },
      {
        "code": "D7.14",
        "statement": "state the advantages of using a.c. for transferring electrical energy",
        "summary": "Alternating voltages can be stepped up and down by transformers, and direct voltages cannot. Transmitting at very high voltage means a small current for the same power, and since the energy wasted in the cables is I²R, a smaller current wastes far less energy. The voltage is then stepped down again for safe use.",
        "formula": "power wasted in cables = I² R",
        "exam": "‘State the advantages of using a.c. for transferring electrical energy.’ Marks are for transformers being able to change a.c. voltages, for high voltage meaning low current, and for the I²R waste being reduced.",
        "watch": "Saying high voltage transmission is used because voltage is ‘stronger’. The reason is the reduced current and the reduced I²R loss."
      },
      {
        "code": "D7.15",
        "statement": "apply the ideal transformer formula",
        "summary": "For an ideal transformer no energy is wasted, so the output power equals the input power: Vp Ip = Vs Is. Combined with the turns ratio, stepping the voltage up steps the current down in the same proportion.",
        "formula": "Vs / Vp = Ns / Np; Vp Ip = Vs Is",
        "exam": "‘Calculate the current in the secondary coil.’ Marks are for the turns ratio, the power equation and the unit. A follow-up often asks why a real transformer is less than 100 per cent efficient.",
        "watch": "Assuming the current changes in the same ratio as the voltage. It changes in the inverse ratio."
      }
    ]
  },
  {
    "code": "E1",
    "section": "E",
    "sectionTitle": "The Physics of the Atom",
    "title": "Models of the Atom",
    "oneSentence": "How the picture of the atom changed, and the experiment that forced the change.",
    "whyItMatters": "Two objectives, and the Geiger-Marsden experiment is asked almost every year because it is the clearest example in the syllabus of evidence overturning a model.",
    "explanation": [
      "Dalton, at the start of the nineteenth century, treated the atom as a solid indivisible sphere. That held until Thomson discovered the electron in 1897, which showed atoms contain smaller pieces and that some of them are negative.",
      "Thomson proposed the plum pudding model: a sphere of positive charge with electrons dotted through it, like fruit in a pudding. It accounted for the electron and for the atom being neutral overall, and it predicted that a fast alpha particle fired at a thin foil would pass almost straight through, deflected only slightly, because the positive charge was spread thinly everywhere."
    ],
    "objectiveCount": 2,
    "objectives": [
      {
        "code": "E1.1",
        "statement": "describe the work done in establishing the modern view of the atom",
        "summary": "Dalton treated the atom as a solid indivisible sphere. Thomson discovered the electron and proposed a sphere of positive charge with electrons embedded in it. Rutherford replaced that with the nuclear model, a tiny dense positive nucleus with electrons outside. Bohr placed the electrons in fixed shells.",
        "formula": "",
        "exam": "‘Describe the work done in establishing the modern view of the atom.’ Marks are for the models in order, for who proposed each, and for what each explained or failed to explain.",
        "watch": "Listing names and dates with no physics. What each model said, and why it was replaced, is what earns the marks."
      },
      {
        "code": "E1.2",
        "statement": "describe the Geiger- Marsden experiment",
        "summary": "A beam of alpha particles was fired at a very thin gold foil in a vacuum, and a movable detector recorded where they went. Most passed straight through with no deflection, a few were deflected through large angles, and a very small number, about one in eight thousand, came almost straight back.",
        "formula": "",
        "exam": "‘Describe the Geiger-Marsden experiment and state the conclusions drawn from it.’ Pair every observation with its conclusion, since that pairing is how the marks are allocated.",
        "watch": "Giving the observations without the conclusions, or reversing them so that ‘most passed through’ is used to argue for a nucleus."
      }
    ]
  },
  {
    "code": "E2",
    "section": "E",
    "sectionTitle": "The Physics of the Atom",
    "title": "Structure of the Atom",
    "oneSentence": "What is inside an atom, how the particles compare, the mass and atomic numbers, isotopes, and the link to the periodic table.",
    "whyItMatters": "A = Z + N is a guaranteed calculation, and isotopes come up in both the atomic structure question and the radioactivity one.",
    "explanation": [
      "An atom has a central nucleus containing protons and neutrons, with electrons moving around it in shells. The protons carry positive charge, the neutrons carry none, and the electrons carry an equal and opposite charge to the proton.",
      "The masses are very unequal. A proton and a neutron have almost the same mass, taken as one unit each. An electron has about one two-thousandth of that, so nearly all the mass of an atom is in its nucleus, which was exactly Rutherford’s conclusion."
    ],
    "objectiveCount": 6,
    "objectives": [
      {
        "code": "E2.1",
        "statement": "sketch the structure of simple atoms",
        "summary": "Draw a small central nucleus containing the protons and neutrons, labelled, with electrons shown on circles around it. Fill the first shell with two electrons and the second with up to eight. For example, carbon has 6 protons and 6 neutrons in the nucleus, with 2 electrons in the first shell and 4 in the second.",
        "formula": "",
        "exam": "‘Sketch the structure of a lithium atom.’ Marks are for the nucleus with the right numbers of protons and neutrons, for the electrons in the right shells, and for labels.",
        "watch": "Putting the neutrons in the shells, or drawing more than two electrons in the first shell."
      },
      {
        "code": "E2.2",
        "statement": "compare the mass and charge of the electron with the mass and charge of the proton",
        "summary": "A proton has a relative mass of 1 and a charge of +1. A neutron has a relative mass of 1 and no charge. An electron has a relative mass of about 1/1840 and a charge of −1. So a proton and an electron carry equal and opposite charges, but the proton is about 1840 times heavier.",
        "formula": "",
        "exam": "‘Compare the mass and charge of the electron with those of the proton’, often as a table to complete. Every cell is a mark, so fill the location row as well if it is there.",
        "watch": "Giving the electron a positive charge, or giving the neutron a charge at all."
      },
      {
        "code": "E2.3",
        "statement": "explain why an atom is normally neutral and stable",
        "summary": "An atom is neutral because it contains equal numbers of protons and electrons, whose charges are equal and opposite and therefore cancel. It is stable because the strong nuclear force between the protons and neutrons is greater than the electric repulsion between the protons at nuclear distances.",
        "formula": "",
        "exam": "‘Explain why an atom is normally neutral and stable.’ Answer both parts: equal protons and electrons for neutrality, strong nuclear force overcoming repulsion for stability.",
        "watch": "Explaining neutrality and stopping. Stability is a separate mark and needs the nuclear force."
      },
      {
        "code": "E2.4",
        "statement": "apply the relationship A = Z + N",
        "summary": "A = Z + N. The mass number A is the number of protons plus neutrons; the atomic number Z is the number of protons; N is the number of neutrons. So for a nucleus with A = 23 and Z = 11, there are 11 protons, 11 electrons in the neutral atom, and 23 − 11 = 12 neutrons.",
        "formula": "A = Z + N; N = A − Z",
        "exam": "‘State the number of protons, neutrons and electrons in the atom.’ Three marks for three numbers, and the electron count is the one most often forgotten.",
        "watch": "Subtracting the wrong way round and getting a negative number of neutrons, which means the two numbers were swapped."
      },
      {
        "code": "E2.5",
        "statement": "explain what is meant by the term “isotope”",
        "summary": "Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons, and therefore different mass numbers. Carbon-12 and carbon-14 both have 6 protons, but 6 and 8 neutrons respectively.",
        "formula": "",
        "exam": "‘Explain what is meant by the term isotope’ and often ‘state ONE similarity and ONE difference between two isotopes’. The definition needs both the same protons and the different neutrons.",
        "watch": "Saying isotopes have different chemical properties. They do not; only their nuclear properties differ."
      },
      {
        "code": "E2.6",
        "statement": "relate the shell model of the atom to the periodic table",
        "summary": "Electrons fill shells outwards, two in the first, eight in the second, eight in the third for the first twenty elements. The number of occupied shells gives the period the element is in, and the number of electrons in the outer shell gives the group, which decides how the element reacts.",
        "formula": "",
        "exam": "‘Relate the shell model of the atom to the position of an element in the periodic table.’ Marks are for the outer shell electrons giving the group and the number of shells giving the period.",
        "watch": "Confusing group with period. Group comes from the outer shell count, period from the number of shells."
      }
    ]
  },
  {
    "code": "E3",
    "section": "E",
    "sectionTitle": "The Physics of the Atom",
    "title": "Radioactivity",
    "oneSentence": "What unstable nuclei emit, how the emissions differ, nuclear equations, half-life, the uses of radioisotopes, and nuclear energy.",
    "whyItMatters": "Thirteen objectives and the whole of the atomic physics examined in Paper 02. Half-life calculations and the comparison of the three emissions are near certainties.",
    "explanation": [
      "Some nuclei are unstable and break down on their own, emitting radiation. The process is called radioactive decay, it is random, and nothing done to the atom from outside changes it: heating, cooling, chemical reaction and pressure all leave the rate unaffected, because the decay happens in the nucleus and those influences act on the electrons.",
      "Three kinds of emission are named. An alpha particle is a helium nucleus, two protons and two neutrons, with charge +2 and a large mass. A beta particle is a fast electron from the nucleus, with charge −1 and a very small mass. A gamma ray is a high-energy electromagnetic wave with no charge and no mass."
    ],
    "objectiveCount": 13,
    "objectives": [
      {
        "code": "E3.1",
        "statement": "describe Marie Curie’s work in the field of radioactivity",
        "summary": "Marie Curie, working with Pierre Curie, discovered the elements polonium and radium, coined the term radioactivity, and showed that radioactivity is a property of the atom itself rather than of a chemical compound. She won Nobel Prizes in both Physics and Chemistry.",
        "formula": "",
        "exam": "‘Describe Marie Curie’s contribution to the field of radioactivity.’ Marks are for the discovery of the elements, for naming radioactivity, and for the conclusion that it is a property of the atom.",
        "watch": "Saying she discovered radioactivity. Becquerel discovered it; Curie named it and explained where it comes from."
      },
      {
        "code": "E3.2",
        "statement": "state the nature of the three types of radioactive emissions",
        "summary": "An alpha particle is a helium nucleus, 2 protons and 2 neutrons, charge +2, relatively large mass. A beta particle is a fast-moving electron emitted from the nucleus, charge −1, very small mass. A gamma ray is a high-energy electromagnetic wave, no charge and no mass.",
        "formula": "",
        "exam": "‘State the nature of the three types of radioactive emission.’ Give what each is, its charge and its mass, since a table of those three properties is the usual form.",
        "watch": "Describing a beta particle as an electron from the electron shells. It comes from the nucleus, formed when a neutron changes into a proton."
      },
      {
        "code": "E3.3",
        "statement": "describe experiments to compare the ranges of alpha, beta and gamma emissions",
        "summary": "Place a source in front of a Geiger-Müller tube and counter and record the count rate. Insert absorbers in turn: a sheet of paper stops alpha, a few millimetres of aluminium stops beta, and only several centimetres of lead substantially reduces gamma. Also move the source away: alpha stops within a few centimetres of air, beta within about a metre, gamma continues far further.",
        "formula": "",
        "exam": "‘Describe an experiment to compare the penetrating powers of alpha, beta and gamma radiation.’ Marks are for the detector, the background count and its subtraction, the absorbers in order, and the conclusions. A safety precaution is often a separate mark.",
        "watch": "Omitting the background count. Forgetting the safety precautions, which are usually specifically credited."
      },
      {
        "code": "E3.4",
        "statement": "describe the appearance of the tracks of radioactive emissions in a cloud chamber",
        "summary": "Alpha particles leave thick, straight, dense tracks of roughly equal length, because they ionise strongly and travel a fixed short distance. Beta particles leave thin, wispy, irregular tracks that bend and vary in length. Gamma rays leave almost no track, only occasional short stray tracks where they happen to eject an electron.",
        "formula": "",
        "exam": "‘Describe the appearance of the tracks produced by alpha and beta particles in a cloud chamber.’ Marks are for thickness, straightness and length for each, and for linking the appearance to the ionising power.",
        "watch": "Saying gamma leaves a long thin track. Gamma is uncharged and produces almost no direct ionisation."
      },
      {
        "code": "E3.5",
        "statement": "predict the effects of magnetic and electric fields on the motion of alpha particles, beta particles and gamma rays",
        "summary": "In a magnetic field, alpha and beta are deflected in opposite directions because their charges are opposite, and beta is deflected much more because it is far lighter. Gamma is not deflected at all because it has no charge. In an electric field, alpha is attracted towards the negative plate, beta towards the positive plate, and gamma passes straight through.",
        "formula": "",
        "exam": "‘Sketch the paths of alpha, beta and gamma radiation in a magnetic field into the page.’ Marks are for opposite directions for alpha and beta, for beta curving more, and for gamma going straight.",
        "watch": "Curving alpha and beta the same way, or giving them the same radius of curvature."
      },
      {
        "code": "E3.6",
        "statement": "interpret nuclear reactions in the standard form",
        "summary": "Balance the mass numbers on both sides and balance the atomic numbers on both sides. Alpha decay: A falls by 4, Z falls by 2, and a helium nucleus is emitted. Beta decay: A is unchanged, Z rises by 1, and an electron is emitted.",
        "formula": "alpha: A → A − 4, Z → Z − 2; beta: A unchanged, Z → Z + 1",
        "exam": "‘Complete the nuclear equation.’ Marks are for the mass number, the atomic number and, where asked, the name of the daughter element. Always check both totals balance before moving on.",
        "watch": "Reducing the mass number in beta decay. It does not change, because an electron has a mass number of zero."
      },
      {
        "code": "E3.7",
        "statement": "conduct an activity to demonstrate the random nature of radioactive decay",
        "summary": "Throw a large number of dice, remove every die showing a six, count and record how many remain, then throw the rest again and repeat. Plot the number remaining against the number of throws. The curve falls steeply at first and then more gently, and the number of throws to halve the population is always about the same.",
        "formula": "",
        "exam": "Set as a practical description or with a table of results to plot. Marks are for the plotted curve, its shape, and the conclusion that a constant fraction decays in each interval.",
        "watch": "Joining the points with straight line segments. The relationship is a smooth curve."
      },
      {
        "code": "E3.8",
        "statement": "recall that the decay process is independent of the conditions external to the nucleus",
        "summary": "Radioactive decay is a nuclear process, so it is unaffected by anything outside the nucleus. Heating, cooling, compressing, or combining the atom chemically leaves the rate of decay completely unchanged.",
        "formula": "",
        "exam": "‘State ONE factor which does NOT affect the rate of radioactive decay, and explain.’ Marks are for the factor and for the reason, that decay occurs in the nucleus.",
        "watch": "Saying temperature has a small effect. It has none."
      },
      {
        "code": "E3.9",
        "statement": "use graphs of random decay to show that such processes have constant half-lives",
        "summary": "Plot the count rate or the number of undecayed nuclei against time. Read off the time for the value to fall from its start to half its start, then from that half to a quarter, then from the quarter to an eighth. Each interval comes out the same, which shows the half-life is constant.",
        "formula": "",
        "exam": "‘Use the graph to show that the decay has a constant half-life.’ Marks are for at least two separate readings taken from different starting points and for the statement that they agree.",
        "watch": "Taking one reading and asserting the half-life is constant. Show the working for two or three."
      },
      {
        "code": "E3.10",
        "statement": "solve problems involving half-life",
        "summary": "Work out how many half-lives have passed by dividing the total time by the half-life, then halve the starting amount that many times. A 160 g sample with a half-life of 5 days, after 20 days, has passed 4 half-lives, so 160 → 80 → 40 → 20 → 10 g remains.",
        "formula": "remaining = original / 2ⁿ, where n = total time / half-life",
        "exam": "‘Calculate the mass remaining after …’ or ‘determine the half-life of the isotope’. Marks are for the number of half-lives, the halving sequence and the unit.",
        "watch": "Dividing the original amount by the number of half-lives instead of halving repeatedly. Four half-lives leaves a sixteenth, not a quarter."
      },
      {
        "code": "E3.11",
        "statement": "discuss the useful applications of radio- isotopes",
        "summary": "Medical: cobalt-60 gamma rays treat cancer, technetium-99 acts as a tracer to image organs, and gamma radiation sterilises instruments. Industrial: thickness gauges control sheet metal and paper, and gamma sources find cracks in welds. Dating: carbon-14 dates once-living material and uranium isotopes date rocks. Agricultural: tracers follow fertiliser uptake and irradiation preserves food.",
        "formula": "",
        "exam": "‘Discuss TWO useful applications of radioisotopes.’ Marks are for the application, the type of emission used, and why that choice suits the job.",
        "watch": "Naming applications with no reason for the choice of isotope. The half-life and the emission type are where the extra marks are."
      },
      {
        "code": "E3.12",
        "statement": "relate the release of energy in a nuclear reaction to a change in mass",
        "summary": "In a nuclear reaction the total mass of the products is slightly less than the total mass of the reactants, and the missing mass has been converted into energy according to E = mc². Because c² is about 9 × 10¹⁶, a very small mass gives an enormous amount of energy.",
        "formula": "E = m c²",
        "exam": "‘Relate the release of energy in a nuclear reaction to a change in mass’ and often ‘distinguish between fission and fusion’. Marks are for the mass loss, for E = mc², and for the correct description of each process.",
        "watch": "Saying mass is destroyed. It is converted into energy, and the total of mass and energy is conserved."
      },
      {
        "code": "E3.13",
        "statement": "cite arguments for and against the utilisation of nuclear energy",
        "summary": "For: an enormous energy output from a very small mass of fuel, no carbon dioxide produced during generation, and reliable output that does not depend on weather. Against: radioactive waste that stays dangerous for thousands of years, the risk and consequences of an accident, very high construction cost, and the link to nuclear weapons.",
        "formula": "",
        "exam": "‘Cite arguments for and against the use of nuclear energy.’ The marks are divided between the two sides, so an answer that argues only one way cannot score full marks.",
        "watch": "Writing only about danger. The energy density and the absence of carbon dioxide emissions during generation are the arguments in favour and they carry marks."
      }
    ]
  }
]);

export function physicsWorkbookTopic(topicCode) {
  return PHYSICS_WORKBOOK_TOPICS.find(topic => topic.code === String(topicCode || '').toUpperCase()) || null;
}

export function physicsWorkbookStats() {
  return Object.freeze({
    sections: Object.keys(PHYSICS_WORKBOOK_SECTIONS).length,
    topics: PHYSICS_WORKBOOK_TOPICS.length,
    objectives: PHYSICS_WORKBOOK_TOPICS.reduce((sum, topic) => sum + topic.objectiveCount, 0),
  });
}
