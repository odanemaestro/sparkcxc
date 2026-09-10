// SPARK CSEC Physics Section D lesson candidates.
// Built from the user-supplied complete study notes and CXC 22/G/SYLL 13 objective map.
// Per-objective KC/UK/XS labels from the external draft are intentionally not exposed as official CXC classifications.

export const SECTION_D_ELECTRICITY_MAGNETISM_LESSONS = Object.freeze([
  {
    "id": "D1",
    "section": "D",
    "title": "Electrostatics",
    "tagline": "How objects become charged, the forces between charges, charging without contact, and where static electricity helps or is a hazard.",
    "summary": "How objects become charged, the forces between charges, charging without contact, and where static electricity helps or is a hazard.",
    "whyItMatters": "Introduces charge, charging methods, electric fields and practical uses and hazards of static electricity.",
    "objectives": [
      [
        "D1.1",
        "explain the charging of objects"
      ],
      [
        "D1.2",
        "describe the forces that electric charges exert on each other"
      ],
      [
        "D1.3",
        "explain charging by induction"
      ],
      [
        "D1.4",
        "define an electric field"
      ],
      [
        "D1.5",
        "describe one hazard and one useful application of static charge"
      ]
    ],
    "prerequisites": [],
    "formulae": [],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "All matter contains positive protons fixed in the nuclei of its atoms and negative electrons that, in some materials, can move. Charging an object always means moving electrons, never protons.",
          "Rub a polythene rod with a cloth and electrons transfer from the cloth to the rod. The rod gains electrons and becomes negative; the cloth loses them and becomes positive. Rub a perspex rod and the transfer goes the other way. Nothing is created: charge is conserved, and the two objects end up with equal and opposite amounts.",
          "Charges exert forces on each other without touching. Like charges repel, unlike charges attract, and the force grows rapidly as they are brought closer. Repulsion is the only certain test for charge, because a charged object also attracts an uncharged one.",
          "An object can be charged without touching it, which is charging by induction. Bring a charged rod near a conductor and the free electrons in the conductor move: towards the rod if it is positive, away from it if it is negative. Earth the far side, so the unwanted charge escapes to the ground, remove the earth, then remove the rod. The conductor is left with a charge opposite to the rod's.",
          "The region around a charge where another charge feels a force is called an electric field, and it is drawn with field lines running from positive to negative. Static charge is useful in photocopiers, in electrostatic dust precipitators and in spray painting, and is a hazard when it builds up on a fuel tanker or on a person, where a spark can ignite vapour or damage electronic components."
        ]
      }
    ],
    "objectiveCards": {
      "D1.1": {
        "inShort": "An object is charged by the transfer of electrons. Rubbing two materials together moves electrons from one to the other: the one that gains electrons becomes negatively charged and the one that loses them becomes positively charged. Charge is conserved, so the two charges are equal and opposite.",
        "detail": "Protons are locked inside the nuclei and never move in this process, which is why every explanation must be written in terms of electrons. When polythene is rubbed with a woollen cloth, electrons move from the wool onto the polythene, leaving the polythene negative and the wool positive by the same amount. Perspex rubbed with the same cloth loses electrons and becomes positive. Insulators can hold the charge in place because their electrons cannot move through the material; a metal held in the hand cannot be charged this way because the charge escapes through the body to earth.",
        "formula": "",
        "howAsked": "'Explain how a polythene rod becomes negatively charged when rubbed with a cloth.' The mark requires electrons transferring to the rod, and a second mark often requires the cloth being left positive.",
        "watchOut": "Writing that positive charge moves onto the cloth. Say electrons leave it."
      },
      "D1.2": {
        "inShort": "Like charges repel and unlike charges attract. The force acts along the line joining the charges and increases as they are brought closer together and as the charges grow larger.",
        "detail": "These forces act at a distance, with nothing between the charges needed. To test whether an object is charged, bring it near a suspended object of known charge: if they repel, the object is definitely charged, and with the same sign. Attraction proves nothing on its own, because a charged rod also attracts an uncharged conductor by inducing opposite charge on the near side. Repulsion is therefore the only certain test, and that statement is worth a mark whenever the topic appears.",
        "formula": "",
        "howAsked": "'Describe the forces between two charged spheres' or 'state the test for a charged body'. The test question wants repulsion, and wants the reason attraction will not do.",
        "watchOut": "Offering attraction as the test for charge."
      },
      "D1.3": {
        "inShort": "Bring a charged rod near a conductor without touching it. The free electrons move, leaving one end with charge opposite to the rod and the other with charge like it. Earth the far end so that charge escapes, remove the earth first, then remove the rod. The conductor is left charged opposite to the rod.",
        "detail": "The order of steps is where the marks are, and getting it wrong reverses the result. With a negative rod held near, electrons are repelled to the far end. Earthing the far end lets them escape to the ground. Breaking the earth connection traps the deficit. Only then is the rod taken away, and the remaining positive charge spreads over the conductor. Remove the earth before the rod, always. The conductor has been charged without ever touching the rod, and the rod keeps its own charge, which is the difference between induction and charging by contact.",
        "formula": "",
        "howAsked": "'Describe how a conductor may be charged by induction.' Marks are for each step in the right order, especially removing the earth before removing the rod, and for stating the sign of the final charge.",
        "watchOut": "Removing the rod before breaking the earth connection, which lets the charge flow back and leaves the conductor neutral."
      },
      "D1.4": {
        "inShort": "An electric field is a region in which a charge experiences a force. It is represented by field lines that start on positive charge and end on negative charge, and the direction of a line is the direction of the force on a small positive charge placed there.",
        "detail": "The pattern depends on the arrangement. Around an isolated positive point charge the lines run radially outwards; around a negative one they run radially inwards. Between two parallel charged plates the lines are straight, parallel and evenly spaced, showing a uniform field. Between unlike point charges the lines curve from the positive to the negative. Where the lines are closer together the field is stronger. Field lines never cross, because the force at a point has only one direction.",
        "formula": "",
        "howAsked": "'Define an electric field' and 'draw the electric field pattern between two oppositely charged parallel plates'. Marks are for the lines, the arrows showing direction, and even spacing where the field is uniform.",
        "watchOut": "Drawing lines without arrows. Letting field lines cross."
      },
      "D1.5": {
        "inShort": "Hazard: charge building on a fuel tanker during filling can produce a spark that ignites the vapour, which is why tankers are earthed before delivery. Application: a photocopier charges a drum so that toner powder sticks only to the image, and an electrostatic precipitator charges smoke particles so that they are attracted to plates and removed from the exhaust.",
        "detail": "Each answer needs the mechanism, not just the name. In the fuel example, friction between the moving liquid and the pipe separates charge, the charge accumulates because the tanker is insulated by its tyres, and the eventual spark supplies the energy to ignite the vapour, so a bonding wire to earth removes the charge as it forms. In spray painting, the paint droplets are given the same charge so that they repel each other and spread into an even mist, while the object is given the opposite charge so that the paint is attracted to it and wraps around the far side, wasting less.",
        "formula": "",
        "howAsked": "'Describe ONE hazard and ONE useful application of static electricity.' One mark for naming each and a second for explaining how the charge produces the effect.",
        "watchOut": "Naming lightning as the hazard without explaining the charge separation and discharge."
      }
    },
    "practicals": [
      "Rub polythene and perspex rods and test them against a suspended charged rod to show like charges repel and unlike attract.",
      "Charge a gold leaf electroscope by induction and by contact, and compare what happens to the leaf.",
      "Bring a charged rod near a thin stream of water from a tap and watch the stream bend."
    ],
    "commonMistakes": [
      "Saying protons move during charging. Only electrons move.",
      "Using attraction as a test for charge. An uncharged object is also attracted.",
      "Getting the sign wrong in induction. The induced charge is opposite to the charging rod."
    ]
  },
  {
    "id": "D2",
    "section": "D",
    "title": "Current Electricity",
    "tagline": "What a current is, which way it is taken to flow, how charge and current are related, and the difference between direct and alternating current.",
    "summary": "What a current is, which way it is taken to flow, how charge and current are related, and the difference between direct and alternating current.",
    "whyItMatters": "Builds the ideas of current, charge, potential difference and direct versus alternating current that underpin later circuit work.",
    "objectives": [
      [
        "D2.1",
        "distinguish between conductors and insulators"
      ],
      [
        "D2.2",
        "state that an electric current in a metal consists of a flow of electrons"
      ],
      [
        "D2.3",
        "differentiate between electron flow and conventional current"
      ],
      [
        "D2.4",
        "state the unit of electrical current"
      ],
      [
        "D2.5",
        "apply the relationship Q = It"
      ],
      [
        "D2.6",
        "differentiate between direct and alternating currents"
      ],
      [
        "D2.7",
        "analyse current-time or voltage-time graphs"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Charge and current",
        "equation": "Q = I t",
        "symbols": "Q is charge, I is current, t is time",
        "unit": "Q in coulombs (C), I in amperes (A), t in seconds",
        "condition": "One coulomb is the charge passing when one ampere flows for one second."
      },
      {
        "name": "Frequency from a graph",
        "equation": "f = 1 / T",
        "symbols": "T is the period read off the time axis",
        "unit": "hertz (Hz)",
        "condition": "Read the period as the time for one complete cycle, not half of one."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A conductor has electrons that are free to move through it; an insulator does not. In a metal the outer electrons are not attached to any one atom, and an electric current in a metal is a flow of these free electrons.",
          "There is an awkward historical fact to keep straight. Conventional current is defined as flowing from the positive terminal of the supply to the negative, and every circuit rule and diagram uses that direction. Electrons actually flow the opposite way, from negative to positive, because they are negatively charged. The convention was fixed before the electron was discovered, and it was never changed.",
          "Current is the rate of flow of charge, measured in amperes. One ampere is one coulomb of charge passing a point each second, so the charge that flows is the current multiplied by the time, Q = It.",
          "Current can be steady in one direction, which is direct current and is what a cell provides, or it can reverse direction regularly, which is alternating current and is what the mains provides. On a voltage-time graph a direct supply is a horizontal line and an alternating supply is a curve that rises and falls either side of zero, crossing it twice in each cycle.",
          "Reading those graphs is a skill in itself. The period is the time for one complete cycle, the frequency is one divided by the period, and the peak value is the maximum height reached. Caribbean mains supplies are typically 50 Hz or 60 Hz depending on the territory."
        ]
      }
    ],
    "objectiveCards": {
      "D2.1": {
        "inShort": "A conductor allows charge to flow through it easily because it contains charges that are free to move. An insulator does not, because its charges are bound in place. Metals, graphite and salt solutions are conductors; plastic, rubber, glass and dry air are insulators.",
        "detail": "In a metal the conducting charges are free electrons. In a solution they are ions, positive and negative, which move in opposite directions. Semiconductors such as silicon sit between the two and conduct better when warmed or when impurities are added, which is what makes the diode of D5.1 possible. The practical consequences are everywhere: copper is used for wiring because it conducts well, and it is sheathed in plastic because plastic does not.",
        "formula": "",
        "howAsked": "'Distinguish between a conductor and an insulator and give ONE example of each.' The distinction must mention free charges being able to move, not simply that one conducts and the other does not.",
        "watchOut": "Defining a conductor as something that 'lets electricity through' without saying why."
      },
      "D2.2": {
        "inShort": "An electric current in a metal consists of a flow of electrons. The outer electrons of the metal atoms are not bound to any one atom and drift through the metal when a potential difference is applied.",
        "detail": "Without a supply connected, the free electrons move randomly in all directions and no net charge passes any point. Connecting a cell applies a potential difference that gives them a slow drift in one direction on top of that random motion, and that drift is the current. The drift is surprisingly slow, a fraction of a millimetre per second, yet a lamp lights instantly because the electric field is set up along the whole wire almost at once and every electron in the circuit starts moving together.",
        "formula": "",
        "howAsked": "'State what constitutes an electric current in a metal.' A short recall mark. It may be followed by an explanation of why a lamp lights immediately, which needs the field being established throughout the circuit.",
        "watchOut": "Saying the electrons travel from the cell to the lamp before it lights."
      },
      "D2.3": {
        "inShort": "Conventional current flows from the positive terminal of the supply, round the circuit, to the negative terminal. Electron flow is from negative to positive, the opposite direction. All circuit diagrams and rules use conventional current.",
        "detail": "The convention was chosen when it was assumed that whatever flowed in a wire moved from positive to negative, and it was kept after the electron was discovered because every existing rule depended on it. So when you apply Fleming's left-hand rule or work out which way a current flows through a component, use conventional current. Only mention electron flow when the question asks about it directly.",
        "formula": "",
        "howAsked": "'Differentiate between electron flow and conventional current' or an arrow to add to a circuit diagram. Adding the arrow in the electron direction is a lost mark.",
        "watchOut": "Applying the motor and generator rules with the electron direction, which reverses every answer."
      },
      "D2.4": {
        "inShort": "The unit of electric current is the ampere, symbol A. One ampere is a flow of one coulomb of charge per second.",
        "detail": "The ampere is one of the base units of the SI system, and the coulomb is derived from it rather than the other way round: one coulomb is defined as the charge passing when one ampere flows for one second. Small currents are measured in milliamperes, where 1 mA is 0.001 A, which is the usual scale for electronic circuits.",
        "formula": "",
        "howAsked": "'State the unit of electric current' is a single recall mark, and it appears inside longer questions as the unit required on a numerical answer.",
        "watchOut": "Writing amp rather than ampere when the full name is asked for, or using a lowercase a for the symbol."
      },
      "D2.5": {
        "inShort": "Q = I t. A current of 3 A flowing for 20 s transfers 3 × 20 = 60 C of charge. Time must be in seconds.",
        "detail": "Rearranged, I = Q/t gives the current from a known charge and time, and t = Q/I gives how long a transfer takes. Questions often give the time in minutes or hours, and converting is usually worth a mark: a current of 0.5 A for 2 minutes transfers 0.5 × 120 = 60 C. The formula also links to energy through D3.2, since V = E/Q means the energy transferred is E = VIt.",
        "formula": "Q = I t",
        "howAsked": "'Calculate the charge which flows through the lamp.' Marks are for the conversion of time to seconds, the substitution, and the unit, which is the coulomb.",
        "watchOut": "Leaving time in minutes, which makes the answer sixty times too small."
      },
      "D2.6": {
        "inShort": "Direct current flows in one direction only and is supplied by cells and batteries. Alternating current reverses direction regularly and is supplied by the mains. On a voltage-time graph, direct current is a horizontal line and alternating current is a wave crossing zero twice each cycle.",
        "detail": "Alternating current is used for mains distribution because it can be stepped up and down by transformers, which direct current cannot, and high voltage transmission wastes far less energy. Direct current is needed by most electronic devices, which is why a charger contains a rectifier to convert the mains supply. A battery-driven torch runs on direct current; a household socket supplies alternating current.",
        "formula": "",
        "howAsked": "'Differentiate between direct and alternating current' or a pair of graphs to identify. Give the direction behaviour and the source for each.",
        "watchOut": "Describing a.c. as 'stronger' than d.c. The difference is direction, not size."
      },
      "D2.7": {
        "inShort": "Read the period as the time for one complete cycle, then find the frequency from f = 1/T. Read the peak value as the maximum height from the zero line. A horizontal line means a steady direct supply; a repeating curve crossing zero means alternating.",
        "detail": "Take the axis scales from the labels before reading anything. If one horizontal division is 5 ms and a complete cycle spans four divisions, the period is 20 ms and the frequency is 1/0.02 = 50 Hz. The peak value is measured from the zero line to the top of the curve, not from the bottom of one trough to the top of the next, which is twice as large. On a current-time graph the area under the line gives the charge that has flowed, since Q = It.",
        "formula": "f = 1 / T;  charge = area under a current-time graph",
        "howAsked": "'Use the graph to determine the frequency of the supply' or 'state the peak voltage'. Marks are for reading the period correctly from the scale and for the conversion to frequency.",
        "watchOut": "Measuring the period as half a cycle, which doubles the frequency. Measuring peak to peak instead of from zero."
      }
    },
    "practicals": [
      "Test a range of materials in a simple circuit with a lamp to sort them into conductors and insulators.",
      "Display the output of a cell and of a low-voltage a.c. supply on an oscilloscope and compare the traces."
    ],
    "commonMistakes": [
      "Saying conventional current is the flow of electrons. It is the opposite direction.",
      "Leaving time in minutes in Q = It. It must be in seconds.",
      "Reading half a cycle as the period on a voltage-time graph."
    ]
  },
  {
    "id": "D3",
    "section": "D",
    "title": "Electrical Quantities",
    "tagline": "Potential difference as energy per unit charge, electrical power, and why conserving electrical energy matters.",
    "summary": "Potential difference as energy per unit charge, electrical power, and why conserving electrical energy matters.",
    "whyItMatters": "Connects electrical energy, power, current and potential difference and develops quantitative electrical-energy calculations.",
    "objectives": [
      [
        "D3.1",
        "cite examples of the conversion of electrical energy to other forms and vice versa"
      ],
      [
        "D3.2",
        "apply the relationship V = E/Q"
      ],
      [
        "D3.3",
        "apply the relationship P =IV"
      ],
      [
        "D3.4",
        "discuss the importance of conserving electrical energy and the means of doing so"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Potential difference",
        "equation": "V = E / Q",
        "symbols": "E is the energy transferred, Q the charge",
        "unit": "volt (V), which is one joule per coulomb",
        "condition": "Rearranged, E = QV gives the energy transferred by a charge passing through a potential difference."
      },
      {
        "name": "Electrical power",
        "equation": "P = I V",
        "symbols": "I is current, V is potential difference",
        "unit": "watt (W)",
        "condition": "Combined with R = V/I this also gives P = I²R and P = V²/R."
      },
      {
        "name": "Electrical energy",
        "equation": "E = P t = I V t",
        "symbols": "t is time in seconds",
        "unit": "joule (J)",
        "condition": "For a bill, energy is measured in kilowatt hours: 1 kWh is a kilowatt for an hour, or 3 600 000 J."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Electrical energy is convenient because it converts so readily into other forms. A lamp turns it into light and thermal energy, a motor into kinetic energy, a heater into thermal energy, a loudspeaker into sound. The conversion runs the other way too: a generator turns kinetic energy into electrical energy, a solar cell turns light into it, and a cell turns chemical energy into it.",
          "Potential difference, also called voltage, is the energy transferred per unit charge, V = E/Q. A potential difference of one volt means one joule of energy is transferred for every coulomb of charge that passes. That is why a 12 V battery drives a device harder than a 1.5 V cell: each coulomb carries eight times the energy.",
          "Power is the rate of transferring energy, and for an electrical device it is the current multiplied by the potential difference, P = IV. A lamp drawing 0.5 A from a 240 V supply has a power of 120 W, which means it transfers 120 J every second.",
          "Combining the two gives the energy used: E = Pt = IVt. That is what an electricity meter measures and what a bill charges for, usually in kilowatt hours rather than joules.",
          "Conserving electrical energy matters in the Caribbean in particular, because most territories generate electricity by burning imported fuel. Using less lowers household bills, reduces the national fuel import cost, and cuts the carbon dioxide released. The practical measures are the examinable part: switching off at the socket rather than leaving devices on standby, replacing filament lamps with light emitting diode lamps, using natural light and ventilation, servicing air conditioners, and choosing appliances with a good energy rating."
        ]
      }
    ],
    "objectiveCards": {
      "D3.1": {
        "inShort": "Electrical to other forms: a lamp gives light and thermal energy, a motor gives kinetic energy, a heater gives thermal energy, a loudspeaker gives sound. Other forms to electrical: a generator from kinetic energy, a solar cell from light, a cell from chemical energy, a microphone from sound.",
        "detail": "Give the pair in the direction the question asks for, and name the useful output as well as the by-product where there is one, since thermal energy appears in nearly every conversion. A filament lamp is a good example of why efficiency matters here: most of its input becomes thermal energy and only a small fraction becomes light, which is exactly why light emitting diode lamps replaced them.",
        "formula": "",
        "howAsked": "'Cite TWO examples of the conversion of electrical energy into other forms.' Name the device and both the useful form and, where relevant, the by-product.",
        "watchOut": "Naming the device without naming the energy forms. 'A lamp' is not an answer; 'a lamp converts electrical energy into light and thermal energy' is."
      },
      "D3.2": {
        "inShort": "V = E / Q. Potential difference is the energy transferred per unit charge, measured in volts, where one volt is one joule per coulomb. If 30 J is transferred by 5 C, the potential difference is 6 V.",
        "detail": "Read the formula as a definition rather than a calculation and the topic becomes easier. A 9 V battery gives every coulomb that passes through it 9 J of energy, and that energy is delivered to the components in the circuit. Rearranged as E = QV, and with Q = It from D2.5, it gives E = IVt, the energy a device uses. A voltmeter connected across a component measures the energy given up per coulomb in that component.",
        "formula": "V = E / Q;  E = Q V",
        "howAsked": "'Define potential difference' or 'calculate the energy transferred when 4 C passes through a 12 V supply'. The definition needs energy per unit charge and the unit.",
        "watchOut": "Defining potential difference as 'the push' or 'the force'. It is energy per unit charge."
      },
      "D3.3": {
        "inShort": "P = I V. A device drawing 2 A from a 120 V supply has a power of 240 W. Combined with R = V/I this also gives P = I²R and P = V²/R.",
        "detail": "Choose the version that matches what the question gives you. With current and voltage, use IV. With current and resistance, use I²R, which is the form that explains why thick cables are used for large currents: doubling the current quadruples the energy wasted as thermal energy in the cable. With voltage and resistance, use V²/R. The energy used over a period is then Pt, and dividing a device's power by the mains voltage gives the current it draws, which is how a fuse rating is chosen in D4.15.",
        "formula": "P = I V;  P = I² R;  P = V² / R",
        "howAsked": "'Calculate the power of the appliance' or 'calculate the current drawn by a 1500 W heater from a 240 V supply'. The second type, rearranged to I = P/V, is the one that appears in fuse questions.",
        "watchOut": "Using the wrong version of the formula for the quantities given, then substituting a resistance where a voltage belongs."
      },
      "D3.4": {
        "inShort": "Most Caribbean territories generate electricity from imported fuel, so using less lowers bills and the national fuel import bill, and reduces carbon dioxide emissions. Practical measures: switch off at the socket instead of standby, use light emitting diode lamps, use natural light and ventilation, service air conditioners and set them higher, and choose appliances with good energy ratings.",
        "detail": "A strong answer separates why from how. The why is economic and environmental: fuel is imported and paid for in foreign exchange, generation produces carbon dioxide, and demand growth requires costly new capacity. The how is a list of specific actions with the reason each one works, for example replacing a 60 W filament lamp with an 8 W light emitting diode lamp of the same brightness cuts that lamp's energy use by around 85 per cent. Mentioning the Caribbean context directly is usually required, since the objective names it.",
        "formula": "",
        "howAsked": "'Discuss the importance of conserving electrical energy and TWO means of doing so.' Marks are split between the reasons and the measures, so answer both halves.",
        "watchOut": "Writing only about the environment. The cost of imported fuel is the point the syllabus makes for the region."
      }
    },
    "practicals": [
      "Measure the current through and the voltage across a lamp and calculate its power, then compare with the value printed on it.",
      "Read a domestic electricity meter at the start and end of a day and work out the energy used and its cost."
    ],
    "commonMistakes": [
      "Confusing power with energy. The watt is a rate; the joule is an amount.",
      "Using minutes or hours in E = Pt when the answer is wanted in joules.",
      "Answering the conservation question with general environmental comment and no specific measures."
    ]
  },
  {
    "id": "D4",
    "section": "D",
    "title": "Circuits and Components",
    "tagline": "Circuit diagrams, series and parallel connections, cells, resistance and Ohm's law, and the electrical safety of a house.",
    "summary": "Circuit diagrams, series and parallel connections, cells, resistance and Ohm's law, and the electrical safety of a house.",
    "whyItMatters": "Develops practical circuit reasoning, resistance, series and parallel networks, component characteristics, household wiring and electrical safety.",
    "objectives": [
      [
        "D4.1",
        "use symbols to construct circuit diagrams"
      ],
      [
        "D4.2",
        "differentiate between series and parallel circuits"
      ],
      [
        "D4.3",
        "explain the functions of the various parts of a zinc-carbon cell"
      ],
      [
        "D4.4",
        "distinguish between primary and secondary cells"
      ],
      [
        "D4.5",
        "draw a circuit diagram to show how a secondary cell can be recharged"
      ],
      [
        "D4.6",
        "investigate the relationship between current and potential difference"
      ],
      [
        "D4.7",
        "explain the concept of resistance"
      ],
      [
        "D4.8",
        "apply the relationship R = V / I"
      ],
      [
        "D4.9",
        "explain why it is necessary for an ammeter to have a very low resistance"
      ],
      [
        "D4.10",
        "explain why it is necessary for a voltmeter to have a very high resistance"
      ],
      [
        "D4.11",
        "solve problems involving series and parallel resistance"
      ],
      [
        "D4.12",
        "solve problems involving series, parallel and series- parallel circuits"
      ],
      [
        "D4.13",
        "discuss the reasons for using parallel connections of domestic appliances"
      ],
      [
        "D4.14",
        "explain the purpose of a fuse or circuit breaker and the earth wire"
      ],
      [
        "D4.15",
        "select a fuse or circuit breaker of suitable current rating for a given appliance"
      ],
      [
        "D4.16",
        "state the adverse effects of connecting electrical appliances to incorrect or fluctuating voltage supplies"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Resistance",
        "equation": "R = V / I",
        "symbols": "V is the potential difference across the component, I the current through it",
        "unit": "ohm (Ω)",
        "condition": "Defined for any component. Ohm's law is the further statement that R stays constant for a metal at constant temperature."
      },
      {
        "name": "Resistors in series",
        "equation": "R = R₁ + R₂ + R₃",
        "symbols": "the total resistance of resistors joined end to end",
        "unit": "ohm (Ω)",
        "condition": "The total is always larger than the largest single resistor."
      },
      {
        "name": "Resistors in parallel",
        "equation": "1/R = 1/R₁ + 1/R₂",
        "symbols": "the total resistance of resistors joined across the same two points",
        "unit": "ohm (Ω)",
        "condition": "Remember to invert at the end. Two equal resistors in parallel give half the value of one."
      },
      {
        "name": "Current rating of a fuse",
        "equation": "I = P / V",
        "symbols": "P is the appliance power, V the mains voltage",
        "unit": "ampere (A)",
        "condition": "Choose the next standard fuse above the calculated current."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A circuit diagram uses agreed symbols so that any reader anywhere can build the same circuit. Learn the symbols for the cell, the battery, the lamp, the switch, the fixed and variable resistor, the ammeter, the voltmeter, the fuse, the diode and the light emitting diode, and note that a cell has a long thin line for positive and a short thick line for negative.",
          "Components can be joined in two ways. In series there is one path, so the same current passes through every component and the supply voltage divides between them. In parallel there are branches, so the current divides between them while each branch has the full supply voltage across it. Household appliances are connected in parallel so that each gets the full mains voltage and can be switched independently.",
          "A cell converts chemical energy into electrical energy. In a zinc-carbon cell the zinc case is the negative electrode, a carbon rod down the middle is the positive electrode, and an ammonium chloride paste between them is the electrolyte. A primary cell cannot be recharged and is thrown away; a secondary cell, such as a car battery, can be recharged by driving current through it backwards from a supply of higher voltage.",
          "Resistance opposes the flow of charge, and it is defined as the potential difference across a component divided by the current through it, R = V/I, measured in ohms. For a metal conductor at constant temperature the current is proportional to the voltage, which is Ohm's law, and the current against voltage graph is a straight line through the origin. A filament lamp does not obey it, because heating changes the resistance and the graph curves.",
          "Resistors in series add: R = R₁ + R₂. Resistors in parallel combine through 1/R = 1/R₁ + 1/R₂, and the result is always smaller than the smallest of them, because adding a branch gives the current another route.",
          "A house is wired for safety as well as function. The live wire carries the supply, the neutral completes the circuit, and the earth wire connects the metal case of an appliance to the ground so that a fault sends current safely away rather than through a person. A fuse or circuit breaker is fitted in the live wire and disconnects the supply if the current exceeds a safe value."
        ]
      }
    ],
    "objectiveCards": {
      "D4.1": {
        "inShort": "Use the agreed symbols and draw the circuit with straight lines and right-angled corners. A cell is a long thin line for positive and a short thick line for negative; an ammeter is a circle marked A connected in series; a voltmeter is a circle marked V connected in parallel across the component.",
        "detail": "Draw the circuit as a rectangle wherever possible, with components spaced along the sides, because a tidy diagram is easier to mark and easier to check. The symbols examined most often are the cell and battery, lamp, switch, fixed resistor, variable resistor or rheostat, ammeter, voltmeter, fuse, diode and light emitting diode. Show the direction of conventional current with an arrow if the question asks. The syllabus prints the full list of graphical symbols, and it is worth working through it once.",
        "formula": "",
        "howAsked": "'Draw a circuit diagram to show ...' Marks are for each correct symbol, for the meter placed in the right way, and for a complete circuit with no gaps.",
        "watchOut": "Drawing an ammeter across a component. It goes in the line, in series."
      },
      "D4.2": {
        "inShort": "In series there is one path: the same current flows through every component and the supply voltage is shared between them. In parallel there are branches: each branch has the full supply voltage and the current divides between them, with the branch currents adding to the total.",
        "detail": "Two rules cover almost every question. In series, I is the same everywhere and V₁ + V₂ = V supply. In parallel, V is the same across every branch and I₁ + I₂ = I total. A break anywhere in a series circuit stops everything, which is why old Christmas lights all failed together. A break in one branch of a parallel circuit leaves the others working, which is why houses are wired in parallel.",
        "formula": "",
        "howAsked": "'Differentiate between series and parallel circuits' or a circuit with missing meter readings to complete. Use the two rules to fill in the values rather than guessing.",
        "watchOut": "Saying current is shared in series and voltage in parallel, which is the two rules the wrong way round."
      },
      "D4.3": {
        "inShort": "The zinc case is the negative electrode. The carbon rod at the centre is the positive electrode. The ammonium chloride paste between them is the electrolyte, which allows ions to move. Manganese dioxide around the rod is the depolariser, which removes hydrogen that would otherwise collect and stop the cell working.",
        "detail": "A chemical reaction at the zinc releases electrons, making the case negative, while the reaction at the carbon rod takes them up, making it positive. The electrolyte completes the internal circuit by carrying ions. Without the depolariser, hydrogen bubbles form on the carbon rod, insulating it and raising the internal resistance so the cell rapidly stops delivering current, an effect called polarisation. The cell converts chemical energy into electrical energy, and once the chemicals are used up it cannot be restored, which is what makes it a primary cell.",
        "formula": "",
        "howAsked": "'Name the parts of a zinc-carbon cell and state the function of each.' One mark per part with its function, so give the electrode, the electrolyte and the depolariser.",
        "watchOut": "Naming the parts without saying what each does. The function is where the second mark sits."
      },
      "D4.4": {
        "inShort": "A primary cell converts chemical energy to electrical energy and cannot be recharged, because the reaction is not reversible. A secondary cell can be recharged by passing a current through it in the reverse direction, which reverses the chemical change. A dry cell is primary; a car battery is secondary.",
        "detail": "The practical differences follow from that. A primary cell is cheaper, lighter and convenient for low-drain devices such as remote controls and torches, and is discarded when flat. A secondary cell costs more but is reused hundreds of times, delivers much larger currents, and is used where that matters, as in a vehicle or a phone. A secondary cell also holds its voltage more steadily as it discharges.",
        "formula": "",
        "howAsked": "'Distinguish between primary and secondary cells and give ONE example of each.' The distinction must turn on whether the cell can be recharged.",
        "watchOut": "Distinguishing them by size or voltage. The recharging is the difference."
      },
      "D4.5": {
        "inShort": "Connect a direct current supply of higher voltage than the cell across it, with the positive terminal of the supply to the positive terminal of the cell and the negative to the negative, so that current is driven backwards through the cell. Include an ammeter and a variable resistor to control the charging current.",
        "detail": "The supply must be direct current and its voltage must exceed the cell's, or no current will flow into the cell. Connecting positive to positive is what forces the current the opposite way to its discharge direction, which reverses the chemical reactions and restores the cell. The variable resistor limits the current so the cell does not overheat, and the ammeter lets the charging current be monitored. Reversing the connections would discharge the cell instead and could damage it.",
        "formula": "",
        "howAsked": "'Draw a circuit diagram to show how a secondary cell may be recharged.' Marks are for the supply of higher voltage, the correct polarity, and the ammeter and variable resistor in the circuit.",
        "watchOut": "Connecting positive to negative, which is the discharging arrangement, not the charging one."
      },
      "D4.6": {
        "inShort": "Connect the component in series with an ammeter and a variable supply, with a voltmeter across it. Change the voltage in steps, recording the current each time, and plot current against voltage. A metal conductor at constant temperature gives a straight line through the origin; a filament lamp gives a curve.",
        "detail": "The straight line through the origin is the result Ohm's law predicts, and its gradient is 1/R, so the resistance can be found from it. The lamp curves because the filament heats as the current rises, its resistance increases, and the current therefore grows less than proportionally, giving a line that bends towards the voltage axis. Keeping the temperature constant is the key control in the metal wire version, which is why the current is kept low and readings are taken quickly. Reversing the connections and repeating with negative values shows whether the component behaves the same in both directions, which is how a diode is distinguished.",
        "formula": "",
        "howAsked": "This can be assessed through data analysis. Marks are for the circuit diagram, the table with both quantities and units, the plotted graph, the shape described correctly, and the resistance from the gradient.",
        "watchOut": "Plotting the axes the wrong way round when the question names the graph. 'Plot I against V' means current on the vertical axis."
      },
      "D4.7": {
        "inShort": "Resistance is the opposition of a component to the flow of charge, defined as the potential difference across it divided by the current through it. Its unit is the ohm, symbol Ω. A component has a resistance of one ohm when a potential difference of one volt drives a current of one ampere through it.",
        "detail": "Resistance arises because the moving electrons collide with the vibrating atoms of the conductor, transferring energy to them, which is why a resistor warms up. It increases with the length of a wire, decreases as the wire is made thicker, depends on the material, and for a metal increases with temperature, because hotter atoms vibrate more and get in the way more often.",
        "formula": "",
        "howAsked": "'Explain what is meant by the resistance of a conductor' and 'state the factors on which the resistance of a wire depends'. The factors are length, cross-sectional area, material and temperature.",
        "watchOut": "Defining resistance as 'something that resists current' with no reference to voltage divided by current."
      },
      "D4.8": {
        "inShort": "R = V / I. A component with 6 V across it carrying 0.5 A has a resistance of 12 Ω. Rearranged, V = IR and I = V/R.",
        "detail": "This relation defines resistance and applies to every component. Ohm's law is the additional statement that R stays constant for a metallic conductor at constant temperature, which is why the graph is a straight line. A filament lamp still has a resistance at any moment, calculated the same way, but the value changes as it heats, so the lamp is described as non-ohmic. In a series circuit, use the total resistance with the supply voltage; in a parallel branch, use the branch resistance with the voltage across that branch.",
        "formula": "R = V / I;  V = I R",
        "howAsked": "'Calculate the resistance of the component' or 'calculate the current through the 20 Ω resistor'. Marks are for the rearrangement, the substitution and the unit.",
        "watchOut": "Using the supply voltage across one component of a series circuit. Only part of it appears across each."
      },
      "D4.9": {
        "inShort": "An ammeter is connected in series, so all the current passes through it. If it had a significant resistance it would reduce the current it is meant to measure, so the reading would be lower than the true value. A very low resistance keeps that effect negligible.",
        "detail": "Think about what adding the meter does to the circuit. In series the resistances add, so an ammeter with resistance R raises the total and lowers the current everywhere. An ideal ammeter has zero resistance and changes nothing. The same reasoning explains why an ammeter must never be connected across a supply: with almost no resistance, the current would be enormous and the meter would be destroyed.",
        "formula": "",
        "howAsked": "'Explain why an ammeter must have a very low resistance.' The mark requires the effect on the circuit, that it would otherwise reduce the current being measured.",
        "watchOut": "Saying only that it 'should not affect the circuit' without saying how it would."
      },
      "D4.10": {
        "inShort": "A voltmeter is connected in parallel with the component, so it provides an alternative path for the current. A very high resistance means almost no current is diverted through it, so the circuit is barely disturbed and the reading is the true potential difference.",
        "detail": "It is the mirror image of the ammeter argument. In parallel, adding a branch lowers the combined resistance and increases the current drawn from the supply. If the voltmeter's resistance were comparable with the component's, a significant share of the current would flow through the meter instead, changing the voltage it was measuring. An ideal voltmeter has infinite resistance and takes no current at all.",
        "formula": "",
        "howAsked": "'Explain why a voltmeter must have a very high resistance.' The mark requires that it should draw negligible current from the circuit.",
        "watchOut": "Giving the ammeter reason instead. The two explanations are opposite and cannot be swapped."
      },
      "D4.11": {
        "inShort": "In series, add the resistances: R = R₁ + R₂. In parallel, use 1/R = 1/R₁ + 1/R₂ and remember to invert at the end. Two 6 Ω resistors give 12 Ω in series and 3 Ω in parallel.",
        "detail": "A useful check: a series total is always bigger than the largest resistor and a parallel total is always smaller than the smallest. If your parallel answer comes out larger than either resistor, you forgot to invert. For two resistors in parallel the shortcut R = R₁R₂/(R₁ + R₂) is quicker and avoids the inversion error. For three or more, work in fractions or decimals throughout and invert once at the end.",
        "formula": "series R = R₁ + R₂;  parallel 1/R = 1/R₁ + 1/R₂",
        "howAsked": "'Calculate the effective resistance between the two points.' Marks are for the correct formula, the working and the unit. Show the inverted step in a parallel calculation, because it is often a mark on its own.",
        "watchOut": "Leaving the answer as 1/R. The question asks for R."
      },
      "D4.12": {
        "inShort": "Work from the inside out. Combine the parallel group into a single resistance first, then add it to the series parts to get the total. Use the total with the supply voltage to find the main current, then work back to find the voltage across and current through each component.",
        "detail": "Set the work out in stages so each step earns its mark. For a 4 Ω resistor in series with two 12 Ω resistors in parallel across a 12 V supply: the parallel pair gives 6 Ω, the total is 4 + 6 = 10 Ω, the main current is 12/10 = 1.2 A, the voltage across the 4 Ω resistor is 1.2 × 4 = 4.8 V, so the voltage across the parallel group is 12 − 4.8 = 7.2 V, and each 12 Ω branch carries 7.2/12 = 0.6 A. Check at the end that the two branch currents add back to the main current.",
        "formula": "combine parallel groups first, then series;  I = V / R total",
        "howAsked": "'Calculate the current through each resistor.' Marks are spread across the stages, so write every one down. The final check, that branch currents sum to the total, catches most errors.",
        "watchOut": "Using the supply voltage for a component that has only part of it across it."
      },
      "D4.13": {
        "inShort": "Appliances are connected in parallel so that each receives the full mains voltage, each can be switched on and off independently, and a fault in one does not stop the others working.",
        "detail": "All three reasons are usually needed for full marks. In series, the supply voltage would divide between the appliances, so none would receive its rated voltage and a lamp designed for 240 V would glow dimly. In series, a single switch would control everything at once. And in series, one failed appliance would break the only path and stop all the rest. Parallel connection removes all three problems, at the cost of a larger total current drawn from the supply, which is why the main cable is thick and fused.",
        "formula": "",
        "howAsked": "'Discuss the reasons for connecting domestic appliances in parallel.' Give all three reasons, since each is a separate mark.",
        "watchOut": "Giving only the full voltage reason. Independent switching and independent failure are separate marks."
      },
      "D4.14": {
        "inShort": "A fuse is a thin wire in the live wire that melts and breaks the circuit if the current becomes too large. A circuit breaker does the same job by switching off automatically and can be reset. The earth wire connects the metal case of an appliance to the ground, so that if the live wire touches the case the large current flows to earth and blows the fuse rather than passing through a person.",
        "detail": "The two protections work together. The earth wire gives the fault current a low resistance path, which makes the current large enough to blow the fuse quickly, and it holds the case at zero volts so it is safe to touch. Both the fuse and the switch must be in the live wire: putting them in the neutral would break the circuit but leave the appliance connected to the live supply and still dangerous. A circuit breaker is preferred in modern installations because it acts faster and is reset rather than replaced.",
        "formula": "",
        "howAsked": "'Explain the purpose of the fuse and the earth wire in a domestic circuit.' Marks are for what each does and for the fuse being in the live wire.",
        "watchOut": "Saying the earth wire 'takes away extra electricity'. It provides a safe path for a fault current and keeps the case at zero volts."
      },
      "D4.15": {
        "inShort": "Work out the working current from I = P/V, then choose the next standard fuse above it. A 1200 W appliance on a 240 V supply draws 5 A, so a 13 A fuse would be chosen from the usual 3 A, 5 A and 13 A range, or a 5 A fuse if the range allows.",
        "detail": "The rule is that the fuse rating must be above the normal working current, so it does not blow in ordinary use, but as close to it as the available ratings allow, so it blows promptly on a fault. Calculate first, then pick. A 60 W lamp on 240 V draws 0.25 A and takes a 3 A fuse. A 3 kW kettle on 240 V draws 12.5 A and takes a 13 A fuse. Choosing a much larger fuse than needed leaves the appliance unprotected.",
        "formula": "I = P / V",
        "howAsked": "'Determine the most suitable fuse for the appliance.' Marks are for the current calculation and for choosing the correct rating from the list given, with a brief reason.",
        "watchOut": "Choosing the fuse nearest the calculated current when that is below it. A 5 A appliance must not have a 3 A fuse."
      },
      "D4.16": {
        "inShort": "Too high a voltage drives too large a current, so the appliance overheats, its insulation can melt and a fire may start. Too low a voltage means motors run slowly and may stall and overheat, and heaters and lamps underperform. Fluctuating supplies cause repeated surges that shorten the life of components and can destroy electronic equipment.",
        "detail": "Connect the effect to the physics. Since P = V²/R, running an appliance at higher than its rated voltage raises the power sharply: a 10 per cent overvoltage raises the power by about 21 per cent, and the extra thermal energy has nowhere to go. A motor running below its rated voltage cannot develop its normal turning force, draws a large current while stalled and burns out its windings. Surge protectors and voltage regulators are the practical answers, which is why sensitive equipment in areas with an unreliable supply is protected in this way.",
        "formula": "",
        "howAsked": "'State TWO adverse effects of connecting an appliance to an incorrect voltage supply.' One mark each, and a reason attached to each raises the answer.",
        "watchOut": "Saying only that 'it will not work'. Name the damage and the mechanism."
      }
    },
    "practicals": [
      "Vary the voltage across a fixed resistor with a variable supply, record the current each time, and plot current against voltage.",
      "Repeat with a filament lamp and compare the shape of the two graphs.",
      "Measure the current at several points in a series circuit and then in a parallel circuit, and compare.",
      "Take apart a three-pin plug and identify the live, neutral and earth wires and the fuse."
    ],
    "commonMistakes": [
      "Forgetting to invert the answer in a parallel resistance calculation.",
      "Connecting an ammeter in parallel or a voltmeter in series.",
      "Saying the current is used up as it goes round a series circuit. It is the same everywhere.",
      "Choosing a fuse rating below the working current of the appliance."
    ]
  },
  {
    "id": "D5",
    "section": "D",
    "title": "Electronics",
    "tagline": "The diode and rectification, the five logic gates and their truth tables, and the effect of electronics on society.",
    "summary": "The diode and rectification, the five logic gates and their truth tables, and the effect of electronics on society.",
    "whyItMatters": "Introduces rectification, smoothing and digital logic so students can interpret simple electronic systems and truth tables.",
    "objectives": [
      [
        "D5.1",
        "describe how a semi- conductor diode can be used in half wave rectification"
      ],
      [
        "D5.2",
        "differentiate between direct current from batteries and rectified alternating current by a consideration of their voltage-time graphs"
      ],
      [
        "D5.3",
        "recall the symbols for AND, OR, NOT, NAND, NOR logic gates"
      ],
      [
        "D5.4",
        "state the function of each gate with the aid of truth tables"
      ],
      [
        "D5.5",
        "analyze circuits involving the combinations of not more than three logic gates"
      ],
      [
        "D5.6",
        "discuss the impact of electronic and technological advances on society"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "AND",
        "equation": "output is 1 only when both inputs are 1",
        "symbols": "two inputs A and B",
        "unit": "logic levels 0 and 1",
        "condition": "Truth table rows 00→0, 01→0, 10→0, 11→1."
      },
      {
        "name": "OR",
        "equation": "output is 1 when at least one input is 1",
        "symbols": "two inputs A and B",
        "unit": "logic levels 0 and 1",
        "condition": "Truth table rows 00→0, 01→1, 10→1, 11→1."
      },
      {
        "name": "NOT",
        "equation": "output is the opposite of the input",
        "symbols": "one input",
        "unit": "logic levels 0 and 1",
        "condition": "0→1 and 1→0. Also called an inverter."
      },
      {
        "name": "NAND and NOR",
        "equation": "the outputs of AND and OR, each inverted",
        "symbols": "two inputs A and B",
        "unit": "logic levels 0 and 1",
        "condition": "NAND is 1 except when both inputs are 1. NOR is 1 only when both inputs are 0."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A semiconductor diode allows current to pass in one direction only. Connected so that current can flow, it is forward biased and behaves almost like a plain wire. Connected the other way it is reverse biased and blocks the current almost completely.",
          "That one-way behaviour is what converts alternating current into direct current, a process called rectification. A single diode in series with the load passes only the halves of the cycle in one direction and blocks the others, so the output voltage rises and falls but never goes negative. That is half wave rectification, and its graph is the alternating wave with the negative humps removed.",
          "The result is direct current in the sense that it never reverses, but it is not steady like a battery's. A battery gives a horizontal line on a voltage-time graph. Half wave rectified alternating current gives a series of separate humps with gaps between them, and comparing those two graphs is exactly what one objective asks for.",
          "Logic gates handle digital signals, where a voltage is treated as either high, written 1, or low, written 0. Five gates are named in the syllabus. NOT reverses its single input. AND gives 1 only when both inputs are 1. OR gives 1 when at least one input is 1. NAND is AND followed by NOT. NOR is OR followed by NOT.",
          "Combinations are worked out one gate at a time. Write a truth table with a column for every input, a column for the output of each intermediate gate, and a final column for the output. Fill it row by row and the answer appears without guesswork."
        ]
      }
    ],
    "objectiveCards": {
      "D5.1": {
        "inShort": "Place a diode in series with the load and the alternating supply. During the half cycles when the diode is forward biased, current flows through the load. During the other half cycles it is reverse biased and blocks the current, so nothing flows. The output is a series of humps in one direction only, with gaps between them.",
        "detail": "Sketch the input and output on the same time axis, one above the other, and the point becomes obvious. The input crosses zero and goes negative on every second half cycle; the output has those negative halves missing entirely, leaving flat gaps. The current through the load is always in the same direction, so it is direct current, though a very uneven one. A capacitor across the load smooths it towards a steady value, and using four diodes in a bridge gives full wave rectification, which flips the negative halves rather than discarding them.",
        "formula": "",
        "howAsked": "'Describe how a semiconductor diode can be used for half wave rectification', usually with graphs of input and output to sketch. Marks are for the circuit, for the output having no negative parts, and for the gaps where the blocked half cycles were.",
        "watchOut": "Sketching an output with the negative humps flipped up. That is full wave rectification, which is a different circuit."
      },
      "D5.2": {
        "inShort": "A battery gives a horizontal straight line on a voltage-time graph, a steady value that does not change. Half wave rectified alternating current gives a series of separate humps of the same polarity, rising and falling, with gaps between them. Both are direct current because neither goes negative, but only the battery's is steady.",
        "detail": "Draw the two graphs side by side with the same axes. The battery trace is flat at, say, 6 V for the whole time shown. The rectified trace starts at zero, rises to a peak, falls back to zero, stays at zero for the length of the blocked half cycle, then repeats. The frequency of the humps equals the frequency of the supply for half wave rectification. Adding a smoothing capacitor makes the rectified trace sag only slightly between humps, moving it closer to the battery's line, which is how a mains adapter produces something a device can use.",
        "formula": "",
        "howAsked": "'Differentiate between direct current from a battery and rectified alternating current by considering their voltage-time graphs.' Marks are for both sketches and for the description of the difference, steady against varying.",
        "watchOut": "Saying the rectified output is alternating current. It never reverses direction, so it is direct current, just not a steady one."
      },
      "D5.3": {
        "inShort": "Learn the five shapes: AND is a D shape with a flat back, OR is a curved shield shape, NOT is a triangle with a small circle at its tip, NAND is the AND shape with a small circle on the output, NOR is the OR shape with a small circle on the output.",
        "detail": "The small circle always means inversion, which is the memory hook that ties the set together: NAND is AND plus a circle, NOR is OR plus a circle, and NOT is a plain buffer triangle plus a circle. Getting the AND and OR shapes the right way round is the other half of the job, and the reliable cue is that the OR gate has a curved back where the input lines enter while the AND gate has a straight one.",
        "formula": "",
        "howAsked": "'Draw the symbol for a NAND gate' or a diagram with gates to name. Draw the inversion circles clearly, since a missing circle turns a NAND into an AND and loses the mark.",
        "watchOut": "Leaving the circle off a NAND or NOR symbol, or adding one to an AND or OR."
      },
      "D5.4": {
        "inShort": "NOT: 0→1, 1→0. AND: output 1 only when both inputs are 1. OR: output 1 when either or both inputs are 1. NAND: the inverse of AND, so 1 unless both inputs are 1. NOR: the inverse of OR, so 1 only when both inputs are 0.",
        "detail": "Write every truth table the same way, with the inputs counting up in binary, 00, 01, 10, 11, so no row is missed. Then fill the output column from the rule. A one-line description helps for each: AND needs both, OR needs at least one, NAND is 'not both', NOR is 'neither'. Those four phrases are enough to reconstruct any of the tables under exam pressure.",
        "formula": "",
        "howAsked": "'Complete the truth table for the NOR gate.' All four rows must be filled and the input columns must cover every combination. Marks are usually one for the table's structure and one or more for the correct outputs.",
        "watchOut": "Writing only two or three rows. Two inputs always give exactly four combinations."
      },
      "D5.5": {
        "inShort": "Work through the circuit one gate at a time. Add a column to the truth table for the output of each intermediate gate, fill it for every input combination, then use those columns as the inputs to the next gate until you reach the final output.",
        "detail": "Take an AND gate whose output feeds a NOT gate. Build a table with columns A, B, the AND output, and the final output. The AND column reads 0, 0, 0, 1 down the four rows, and inverting it gives 1, 1, 1, 0, which is a NAND. That method never fails and never needs a shortcut. With three inputs there are eight rows, so lay them out as 000 through to 111 in binary order. Label each intermediate wire on the diagram before starting, because the labels become the column headings.",
        "formula": "",
        "howAsked": "'Complete the truth table for the circuit shown', with up to three gates. Marks are for the intermediate columns as well as the final one, so show them rather than jumping to the answer.",
        "watchOut": "Trying to reason the final output directly without the intermediate columns, which is where errors creep in."
      },
      "D5.6": {
        "inShort": "Electronics has transformed communication, medicine, education, industry and entertainment. Benefits include instant communication, computerised medical imaging, online learning and greater industrial efficiency. Drawbacks include job losses to automation, electronic waste, loss of privacy, and the divide between those with access to the technology and those without.",
        "detail": "A good answer for this region names concrete effects rather than general praise. Mobile telephones reached Caribbean territories where laying fixed lines was uneconomic, giving communication to communities that had none. Online learning kept schools running during storms and closures. Against that, automation reduces the number of manufacturing and clerical jobs, discarded devices leak lead and mercury into landfill, and households without a device or a connection fall behind, which is the digital divide. Balance is what earns the marks: give both sides.",
        "formula": "",
        "howAsked": "'Discuss the impact of electronic and technological advances on society.' Marks are split between positive and negative effects, so a one-sided answer cannot score full marks however long it is.",
        "watchOut": "Listing devices rather than impacts. The question asks what changed for people, not what was invented."
      }
    },
    "practicals": [
      "Connect a diode in series with a lamp and a cell, then reverse it, and observe that the lamp lights one way only.",
      "Build each gate on a breadboard with switches for inputs and a light emitting diode for the output, and complete its truth table by testing every combination.",
      "Display the output of a half wave rectifier on an oscilloscope alongside the input."
    ],
    "commonMistakes": [
      "Drawing a full wave output for a half wave rectifier. Half wave leaves gaps where the blocked halves were.",
      "Missing rows from a truth table. Two inputs always give four rows; three inputs give eight.",
      "Confusing NAND with AND, or NOR with OR, by forgetting the inversion."
    ]
  },
  {
    "id": "D6",
    "section": "D",
    "title": "Magnetism",
    "tagline": "Which materials are magnetic, how a magnet attracts unmagnetised iron, permanent and temporary magnets, poles and magnetic fields.",
    "summary": "Which materials are magnetic, how a magnet attracts unmagnetised iron, permanent and temporary magnets, poles and magnetic fields.",
    "whyItMatters": "Builds the field model of magnetism, magnetic materials, magnetisation, domains and practical field mapping.",
    "objectives": [
      [
        "D6.1",
        "differentiate between magnetic and non-magnetic materials"
      ],
      [
        "D6.2",
        "explain how a magnet can attract an unmagnetised object"
      ],
      [
        "D6.3",
        "distinguish between materials used to make \"permanent\" and \"temporary\" magnets"
      ],
      [
        "D6.4",
        "identify the poles of a magnetic dipole"
      ],
      [
        "D6.5",
        "investigate the forces between magnetic poles"
      ],
      [
        "D6.6",
        "define a magnetic field"
      ],
      [
        "D6.7",
        "map magnetic fields"
      ]
    ],
    "prerequisites": [],
    "formulae": [],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Only a few materials are magnetic: iron, steel, nickel, cobalt and some alloys. Everything else, including copper, aluminium, plastic and wood, is non-magnetic, which is why a magnet picks a steel pin out of a pile of sawdust.",
          "A magnetic material can be pictured as containing many tiny magnets, called domains. In an unmagnetised piece they point in random directions and cancel out. Bringing a magnet near lines them up so that the near end becomes a pole opposite to the magnet's, and unlike poles attract, so the object is pulled in. That is induced magnetism and it explains why a magnet attracts an object that was not itself a magnet.",
          "Soft iron magnetises easily and loses its magnetism as soon as the magnetising field is removed, which makes it a temporary magnet and the right core for an electromagnet. Steel is harder to magnetise but keeps its magnetism, which makes it a permanent magnet and the right material for a compass needle or a bar magnet.",
          "Every magnet has two poles, north-seeking and south-seeking, and they always come in pairs: cut a magnet in half and each piece has both. Like poles repel and unlike poles attract, and as with electric charge, repulsion is the only certain test that an object is itself a magnet.",
          "The region around a magnet where a magnetic material feels a force is the magnetic field, drawn with lines running from north to south outside the magnet. The lines are closest together at the poles, where the field is strongest, and they never cross. A plotting compass placed in the field points along a line, which is how the pattern is mapped."
        ]
      }
    ],
    "objectiveCards": {
      "D6.1": {
        "inShort": "Magnetic materials are attracted by a magnet and can be magnetised: iron, steel, nickel and cobalt. Non-magnetic materials are not attracted and cannot be magnetised: copper, aluminium, brass, plastic, wood and glass.",
        "detail": "The distinction is easily tested with a magnet, and it is used practically to separate steel from other metals in scrap and recycling plants. It is worth noting that many metals people expect to be magnetic are not: copper, aluminium and brass are all non-magnetic, and stainless steel is only weakly magnetic in some forms. Iron and its alloys are the important cases for this syllabus.",
        "formula": "",
        "howAsked": "'Differentiate between magnetic and non-magnetic materials and give TWO examples of each.' Choose examples confidently; naming aluminium as magnetic loses the mark.",
        "watchOut": "Assuming all metals are magnetic."
      },
      "D6.2": {
        "inShort": "A magnetic material contains domains, small regions that behave as tiny magnets. In an unmagnetised object they point randomly and cancel. A magnet brought near lines them up so that the near end of the object becomes a pole opposite to the magnet's, and unlike poles attract, so the object is pulled towards the magnet.",
        "detail": "This is induced magnetism, and it explains a familiar chain: a magnet picks up a paper clip, and that clip picks up a second one, because the first clip has itself become a magnet by induction. Remove the original magnet and soft iron loses its induced magnetism at once, so the chain falls apart. The domain picture also explains why a magnet can be destroyed by hammering it or heating it strongly: both jumble the domains back into random directions.",
        "formula": "",
        "howAsked": "'Explain how a magnet attracts an unmagnetised piece of iron.' Marks are for the domains lining up, for the induced pole being opposite, and for unlike poles attracting.",
        "watchOut": "Saying the magnet 'pulls the metal' with no mechanism. The induced opposite pole is the explanation."
      },
      "D6.3": {
        "inShort": "Soft iron is used for temporary magnets: it magnetises easily and loses its magnetism as soon as the field is removed, which suits electromagnet cores, relays and transformer cores. Steel is used for permanent magnets: it is harder to magnetise but retains its magnetism, which suits bar magnets, compass needles and loudspeaker magnets.",
        "detail": "The words soft and hard here describe magnetic behaviour, not physical hardness. The choice always follows the job. An electromagnet must be able to switch off, so a soft iron core is essential; a steel core would stay magnetised and the device would not release its load. A compass needle must keep its magnetism indefinitely, so steel is used. A transformer core is soft iron because it must magnetise and demagnetise many times each second.",
        "formula": "",
        "howAsked": "'Distinguish between the materials used for permanent and temporary magnets, giving ONE use of each.' The use must match the property, which is where the second mark sits.",
        "watchOut": "Choosing steel for an electromagnet core, which would defeat the purpose of being able to switch it off."
      },
      "D6.4": {
        "inShort": "Suspend the magnet so it can turn freely. The end that points towards the Earth's geographic north is the north-seeking pole, or north pole; the other is the south-seeking pole. Poles always occur in pairs, and cutting a magnet in half produces two magnets each with both poles.",
        "detail": "The full names, north-seeking and south-seeking, explain where the labels come from and are worth using when defining them. A magnetic dipole is simply a pair of opposite poles, and no single pole has ever been found on its own, which is why breaking a magnet always yields more complete magnets rather than separated poles. The Earth itself behaves as a large magnet, and because a compass north pole is attracted to it, the Earth's magnetic pole in the geographic north is in fact a magnetic south pole.",
        "formula": "",
        "howAsked": "'Describe how you would identify the poles of a bar magnet.' Marks are for suspending it freely, letting it settle, and identifying the end pointing north.",
        "watchOut": "Using a second magnet to identify poles without saying which of its poles is known. The suspension method needs no prior knowledge."
      },
      "D6.5": {
        "inShort": "Suspend one bar magnet horizontally from a thread so it turns freely. Bring the north pole of a second magnet towards its north pole and observe repulsion, then towards its south pole and observe attraction. Move the second magnet closer and the effect becomes stronger.",
        "detail": "Suspension is what makes the forces visible, since the magnet must be free to move for a small force to show. Control the experiment by using the same second magnet throughout and approaching from the same direction, so only the pole and the distance change. The conclusions are that like poles repel, unlike poles attract, and the force increases as the separation decreases. Repulsion is also the only conclusive test for magnetism, because a magnet attracts unmagnetised iron as well.",
        "formula": "",
        "howAsked": "Set as a planning and designing or a description question. Marks are for the suspension, for testing both pole combinations, for varying the distance, and for the conclusions drawn.",
        "watchOut": "Laying the magnet on a bench where friction hides the force. It must be free to turn."
      },
      "D6.6": {
        "inShort": "A magnetic field is a region in which a magnetic material experiences a force. It is represented by field lines that run from the north pole to the south pole outside the magnet, and the direction of a line at any point is the direction a compass north pole would point there.",
        "detail": "Reading a field diagram is a matter of two rules. Where the lines are closer together the field is stronger, which is why they crowd at the poles. Lines never cross, because a compass at any point has only one direction to face. Between two unlike poles the lines run across the gap from north to south; between two like poles they curve away from each other, leaving a point midway where the fields cancel and a compass has no preferred direction, called a neutral point.",
        "formula": "",
        "howAsked": "'Define a magnetic field' and 'sketch the field pattern around a bar magnet'. Marks are for the definition, the shape of the lines, the arrows from north to south, and the crowding at the poles.",
        "watchOut": "Drawing the lines without arrows, or drawing them from south to north outside the magnet."
      },
      "D6.7": {
        "inShort": "Place the magnet on paper and draw round it. Put a plotting compass near one pole, mark dots at the two ends of the needle, move the compass so its tail sits on the last dot, and repeat across the paper. Join the dots into a smooth curve and add an arrow. Repeat from several starting points. Iron filings sprinkled on paper over the magnet show the whole pattern at once.",
        "detail": "The two methods complement each other. The plotting compass is slower but gives direction, which the filings cannot. The filings are quick and show the shape of the whole field including the crowding at the poles, but must be tapped gently to let them settle and give no sense of which way the field points. A complete answer usually mentions both and says what each contributes. Keep other magnets and iron objects away from the bench, since they distort the pattern.",
        "formula": "",
        "howAsked": "'Describe how you would plot the magnetic field pattern around a bar magnet.' Marks are for the compass method step by step, for joining the marks, for the arrow, and for repeating from different points.",
        "watchOut": "Describing the filings method alone when the question asks for the direction of the field, which filings do not show."
      }
    },
    "practicals": [
      "Test a range of materials with a magnet and sort them into magnetic and non-magnetic.",
      "Suspend a bar magnet and bring the poles of a second magnet near, to show attraction and repulsion.",
      "Map the field around a bar magnet with a plotting compass, marking the position of the needle repeatedly and joining the marks.",
      "Sprinkle iron filings on paper over a magnet and tap gently to reveal the field pattern."
    ],
    "commonMistakes": [
      "Listing copper or aluminium as magnetic. They are not.",
      "Drawing field lines from south to north outside the magnet, or leaving off the arrows.",
      "Using attraction as the test for a magnet. Only repulsion proves it."
    ]
  },
  {
    "id": "D7",
    "section": "D",
    "title": "Electromagnetism",
    "tagline": "The magnetic field a current makes, the force on a current in a field, the motor, induced e.m.f., the generator and the transformer.",
    "summary": "The magnetic field a current makes, the force on a current in a field, the motor, induced e.m.f., the generator and the transformer.",
    "whyItMatters": "Connects current and magnetic fields to forces, motors, electromagnetic induction, generators, transformers and power transmission.",
    "objectives": [
      [
        "D7.1",
        "conduct simple experiments to investigate the magnetic field pattern around current-carrying conductors"
      ],
      [
        "D7.2",
        "apply suitable rules which relate the direction of current flow to the direction of the magnetic field"
      ],
      [
        "D7.3",
        "describe a commercial application of an electromagnet"
      ],
      [
        "D7.4",
        "conduct an experiment which demonstrates the existence of a force on a current-carrying conductor placed in a magnetic field"
      ],
      [
        "D7.5",
        "sketch the resultant magnetic flux pattern when a current-carrying wire is placed perpendicular to a magnetic field"
      ],
      [
        "D7.6",
        "apply Fleming’s left- hand (motor) rule"
      ],
      [
        "D7.7",
        "identify the factors that affect the force on a current-carrying conductor in a magnetic field"
      ],
      [
        "D7.8",
        "explain the action of a D.C. motor"
      ],
      [
        "D7.9",
        "describe simple activities which demonstrate an induced e.m.f"
      ],
      [
        "D7.10",
        "conduct simple experiments to show the magnitude of the induced e.m.f"
      ],
      [
        "D7.11",
        "predict the direction of induced current given the direction of motion of the conductor and that of the magnetic field"
      ],
      [
        "D7.12",
        "explain the action of the A.C. generator"
      ],
      [
        "D7.13",
        "explain the principle of operation of a transformer"
      ],
      [
        "D7.14",
        "state the advantages of using a.c. for transferring electrical energy"
      ],
      [
        "D7.15",
        "apply the ideal transformer formula"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Right-hand grip rule",
        "equation": "thumb along the conventional current, fingers curl along the field",
        "symbols": "for the field around a straight wire or through a solenoid",
        "unit": "direction only",
        "condition": "Use the right hand for the field made by a current, and the left hand for the force on a current."
      },
      {
        "name": "Fleming's left-hand (motor) rule",
        "equation": "First finger Field, seCond finger Current, thuMb Motion",
        "symbols": "left hand, three fingers at right angles",
        "unit": "direction only",
        "condition": "Use it when a current in a field produces motion."
      },
      {
        "name": "Fleming's right-hand (generator) rule",
        "equation": "First finger Field, thuMb Motion, seCond finger induced Current",
        "symbols": "right hand, three fingers at right angles",
        "unit": "direction only",
        "condition": "Use it when motion in a field produces a current."
      },
      {
        "name": "Ideal transformer",
        "equation": "Vs / Vp = Ns / Np",
        "symbols": "V is voltage, N is number of turns, p is primary and s is secondary",
        "unit": "volts and turns",
        "condition": "A step-up transformer has more turns on the secondary."
      },
      {
        "name": "Ideal transformer power",
        "equation": "Pout = Pin, so Vp Ip = Vs Is",
        "symbols": "P is power, I is current",
        "unit": "watt (W)",
        "condition": "An ideal transformer wastes no energy, so stepping the voltage up steps the current down."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A current produces a magnetic field around it. Around a straight wire the field is a set of circles centred on the wire, and the direction is given by the right-hand grip rule: point the thumb of the right hand along the conventional current and the fingers curl the way the field points. A coil of wire, called a solenoid, produces a field like a bar magnet's, with a north pole at one end, and winding it round a soft iron core makes an electromagnet, far stronger and able to be switched off.",
          "When a current-carrying wire lies in a magnetic field, the two fields interact and the wire experiences a force. Fleming's left-hand rule gives its direction: hold the first finger, second finger and thumb of the left hand at right angles, point the First finger along the Field, the seCond finger along the Current, and the thuMb shows the Motion. The force is larger with a bigger current, a stronger field, or a longer wire in the field, and it is greatest when the wire is at right angles to the field.",
          "That force is what drives a direct current motor. A coil carrying current sits in a magnetic field; the forces on its two sides act in opposite directions and turn it. A split ring commutator reverses the current every half turn, so the coil keeps turning the same way instead of stopping half way round.",
          "The reverse process also works. Move a conductor through a magnetic field, or change the field through a coil, and a voltage is induced across it, called an induced electromotive force. If the circuit is complete, a current flows. Nothing is induced while everything is stationary; it is the change that matters.",
          "The size of the induced e.m.f. increases with the speed of the movement, the strength of the field, and the number of turns on the coil. Its direction is given by Fleming's right-hand rule, and by Lenz's law, which says the induced current always opposes the change that caused it.",
          "An alternating current generator uses this to turn kinetic energy into electrical energy, with slip rings rather than a commutator so the output alternates. A transformer uses it to change voltage: an alternating current in the primary coil produces a changing field in a soft iron core, and that changing field induces an alternating voltage in the secondary coil. Because alternating voltages can be transformed and direct ones cannot, alternating current is used to transmit electrical energy over long distances at high voltage and low current, which wastes far less energy in the cables."
        ]
      }
    ],
    "objectiveCards": {
      "D7.1": {
        "inShort": "Pass a current through a straight wire held vertically through a horizontal card, sprinkle iron filings on the card and tap it: they form circles round the wire. Place plotting compasses on the card and they point round the circle, reversing when the current is reversed. For a solenoid, the field inside is uniform and outside it resembles a bar magnet's.",
        "detail": "The card is what makes the pattern visible, since the filings need something to lie on. Use a large current, briefly, so the field is strong enough to align them. Reversing the current reverses every compass, which is the observation showing that the field direction depends on the current direction. With a solenoid, hang the coil through the card the same way and the pattern shows straight parallel lines inside the coil, the sign of a uniform field, and looping lines outside from one end to the other.",
        "formula": "",
        "howAsked": "Set as a description of the experiment with the pattern to sketch. Marks are for the apparatus, for the circular pattern round a straight wire, for the compass direction, and for what happens when the current reverses.",
        "watchOut": "Drawing the field round a straight wire as lines running along the wire. They are circles around it."
      },
      "D7.2": {
        "inShort": "Right-hand grip rule for a straight wire: point the right thumb along the conventional current and the curled fingers give the field direction. For a solenoid, curl the right fingers along the current in the turns and the thumb points to the north pole.",
        "detail": "Two versions of the same rule, and which one to use depends on the shape. For the straight wire the thumb is the current and the fingers are the field. For the solenoid the fingers are the current and the thumb is the field, pointing out of the north end. Always use conventional current, from positive to negative, since using electron flow reverses every answer. A quick alternative for a solenoid is to look at the end: if the current goes anticlockwise as you look at it, that end is a North pole, and clockwise makes it a South pole.",
        "formula": "",
        "howAsked": "'State the direction of the magnetic field at point X' or 'mark the north pole of the solenoid'. Marks are for the correct direction, and often for showing which rule was used.",
        "watchOut": "Using the left hand. The left hand is for the motor rule, not for the field around a current."
      },
      "D7.3": {
        "inShort": "An electric bell, a relay, a circuit breaker, a scrapyard crane or a loudspeaker. In a bell, current through an electromagnet attracts an iron armature, which strikes the gong and simultaneously breaks the circuit; the electromagnet releases, the contact remakes, and the cycle repeats.",
        "detail": "Describe the chain of cause and effect and the marks follow. In a relay, a small current through an electromagnet attracts a pivoted iron armature which closes a second, separate circuit carrying a much larger current, so a small safe current can switch a dangerous one. In a scrapyard crane, a large electromagnet lifts steel and drops it when the current is switched off, which is why a permanent magnet would not do. Every one of these depends on a soft iron core so that the magnetism can be switched off.",
        "formula": "",
        "howAsked": "'Describe a commercial application of an electromagnet', usually with a diagram to interpret. Marks are for the sequence of events and for the role of the soft iron core.",
        "watchOut": "Naming the device without describing how the electromagnet makes it work."
      },
      "D7.4": {
        "inShort": "Suspend a stiff wire horizontally between the poles of a horseshoe magnet so it lies at right angles to the field, and connect it to a battery through a switch. When the current is switched on the wire jumps. Reversing the current or turning the magnet round reverses the direction of the jump.",
        "detail": "The two reversals are the important observations, because together they show the force depends on both the current direction and the field direction. A more controlled version rests the magnet on a top-pan balance: switching on the current changes the reading, because the wire pushes on the magnet with an equal and opposite force, and the change in reading measures the force. That version allows the force to be measured for different currents and shows it is proportional to the current.",
        "formula": "",
        "howAsked": "'Describe an experiment to demonstrate that a force acts on a current-carrying conductor in a magnetic field.' Marks are for the arrangement at right angles, the observation, and at least one reversal test.",
        "watchOut": "Placing the wire along the field direction, where no force acts at all."
      },
      "D7.5": {
        "inShort": "Draw the uniform field of the magnet as straight parallel lines, and the circular field of the wire around it. On one side the two point the same way and reinforce, giving crowded lines; on the other they oppose and cancel, giving sparse lines. The wire is pushed from the crowded side towards the sparse side.",
        "detail": "The resulting picture is often called a catapult field, because the distorted lines look like a stretched catapult pushing the wire out. It is the best available explanation at this level of why the force arises: the field lines behave as though they were in tension and try to straighten, pushing the wire away from the region where they are squeezed together. Drawing the two fields separately first and then combining them is the way to get the sketch right.",
        "formula": "",
        "howAsked": "'Sketch the resultant magnetic flux pattern' with the direction of the force to mark. Marks are for the crowding on one side, the weakening on the other, and an arrow for the force pointing from strong to weak.",
        "watchOut": "Drawing the two fields side by side without combining them, or putting the force arrow the wrong way round."
      },
      "D7.6": {
        "inShort": "Hold the first finger, second finger and thumb of the left hand mutually at right angles. First finger points along the Field, from north to south. seCond finger points along the conventional Current. The thuMb then shows the direction of the Motion, that is, the force.",
        "detail": "The mnemonic is in the capital letters: Field, Current, Motion on First finger, seCond finger, thuMb. Use the left hand for the motor effect, where a current in a field produces movement, and the right hand for the generator effect, where movement produces a current. Set your hand up physically rather than trying to picture it, and always check that you are using conventional current rather than electron flow.",
        "formula": "left hand: First finger Field, seCond finger Current, thuMb Motion",
        "howAsked": "'Use Fleming's left-hand rule to determine the direction in which the wire moves.' The answer is a direction, so state it clearly as up, down, into the page or out of the page.",
        "watchOut": "Using the right hand, which reverses the answer. Forgetting that the field runs from north to south."
      },
      "D7.7": {
        "inShort": "The force increases with the size of the current, the strength of the magnetic field, and the length of conductor inside the field. It also depends on the angle: it is greatest when the conductor is at right angles to the field and zero when the conductor lies along the field.",
        "detail": "Each factor can be tested one at a time with the balance arrangement of D7.4. Doubling the current doubles the force. Using a stronger magnet, or two magnets, increases it. Sliding the wire so that more of its length lies between the poles increases it. Turning the wire so that it lies along the field reduces the force to nothing, which is why a motor coil is wound so its sides lie across the field.",
        "formula": "",
        "howAsked": "'State THREE factors which affect the size of the force on a current-carrying conductor in a magnetic field.' One mark each, and the angle counts as a fourth if asked for more.",
        "watchOut": "Giving the resistance of the wire or the voltage of the supply. The force depends on the current, not the voltage directly."
      },
      "D7.8": {
        "inShort": "A coil carrying current sits between the poles of a magnet. The forces on its two sides act in opposite directions, by Fleming's left-hand rule, so the coil turns. A split ring commutator reverses the current in the coil every half turn, so the force on each side keeps pushing it the same way round and rotation continues.",
        "detail": "Write the explanation in order. The current enters through brushes pressing on the commutator, flows along one side of the coil in one direction and back along the other in the opposite direction, so the two forces are opposite and produce a turning effect. Without the commutator the coil would turn half a revolution and then be pushed back, oscillating rather than rotating. The commutator swaps the connections just as the coil passes the vertical, reversing the current so the turning effect continues in the same sense. The turning effect is increased by more turns, a larger current, a stronger magnet, or a soft iron core in the coil.",
        "formula": "",
        "howAsked": "'Explain the action of a direct current motor.' Marks are for the opposite forces on the two sides, the resulting turning effect, and the function of the split ring commutator.",
        "watchOut": "Describing the commutator as reversing the magnetic field. It reverses the current in the coil."
      },
      "D7.9": {
        "inShort": "Move a bar magnet into a coil connected to a sensitive galvanometer and the needle deflects. Hold the magnet still inside and the needle returns to zero. Pull it out and the needle deflects the other way. Moving the coil instead of the magnet has the same effect.",
        "detail": "The stationary case is the observation that matters most, because it shows the e.m.f. depends on change rather than on the presence of a field. The demonstrations to know are: magnet into and out of a coil; a wire moved across the poles of a horseshoe magnet, which deflects the meter only while it is moving and only when it cuts across the field lines rather than sliding along them; and switching a current on or off in one coil, which induces a brief e.m.f. in a nearby coil at the moment of switching.",
        "formula": "",
        "howAsked": "'Describe a simple activity which demonstrates an induced e.m.f.' Marks are for the apparatus, the movement, the observation, and often for what happens when the movement stops.",
        "watchOut": "Omitting the stationary test. It is what proves the e.m.f. comes from the change."
      },
      "D7.10": {
        "inShort": "The induced e.m.f. is larger when the magnet is moved faster, when a stronger magnet is used, and when the coil has more turns. Each can be tested separately with the same coil and galvanometer, keeping the others fixed.",
        "detail": "Set up the coil and galvanometer once and vary one factor at a time. Move the same magnet in slowly and then quickly, and compare the size of the deflection. Swap for a stronger magnet at the same speed. Change to a coil with more turns, again at the same speed. In each case record the maximum deflection. The conclusion is that the e.m.f. depends on the rate at which the field through the coil changes and on the number of turns linking that field.",
        "formula": "",
        "howAsked": "Set as a planning and designing question, or as a list of factors. Marks are for controlling the other variables and for the comparison of deflections.",
        "watchOut": "Changing the magnet and the speed at the same time, which makes the result impossible to attribute."
      },
      "D7.11": {
        "inShort": "Use Fleming's right-hand rule: First finger along the Field, thuMb along the Motion of the conductor, and the seCond finger then gives the direction of the induced Current. Lenz's law gives the same answer: the induced current opposes the change producing it.",
        "detail": "Lenz's law is the check. Push a north pole into a coil and the induced current flows so as to make the near face of the coil a north pole, which repels the magnet and opposes the motion. Pull it out and the current reverses to make that face a south pole, attracting the magnet and again opposing the motion. That opposition is why work must be done to generate electricity, and it is conservation of energy showing up in electromagnetism: the mechanical work done against the opposing force becomes the electrical energy generated.",
        "formula": "right hand: First finger Field, thuMb Motion, seCond finger Current",
        "howAsked": "'State the direction of the induced current' with a diagram. Using the right hand is the mark, and quoting Lenz's law as a check strengthens the answer.",
        "watchOut": "Using the left hand, which is for the motor effect. If motion produces current, use the right hand."
      },
      "D7.12": {
        "inShort": "A coil is rotated in a magnetic field. As it turns, the field through it changes, so an e.m.f. is induced. Slip rings and brushes connect the coil to the external circuit and keep the same coil end connected to the same terminal, so the output reverses every half turn, giving alternating current.",
        "detail": "The output is largest when the coil is horizontal, moving across the field lines fastest, and zero when it is vertical, moving along them. So the voltage varies smoothly between a positive peak and a negative peak, one complete cycle for each revolution. The difference from the motor is worth stating: a generator has slip rings, which are two continuous rings, while a motor has a split ring commutator, which is one ring cut in two, and that single difference is what makes one output alternating and the other unidirectional. Increasing the speed of rotation raises both the frequency and the peak voltage.",
        "formula": "",
        "howAsked": "'Explain the action of an a.c. generator.' Marks are for the rotation, the changing field through the coil, the induced e.m.f., and the slip rings giving an alternating output.",
        "watchOut": "Giving the generator a split ring commutator. That would make it a direct current generator."
      },
      "D7.13": {
        "inShort": "An alternating current in the primary coil produces a continuously changing magnetic field. A soft iron core carries that changing field to the secondary coil, where it induces an alternating e.m.f. The voltages are in the same ratio as the numbers of turns, Vs/Vp = Ns/Np.",
        "detail": "Every step matters in the explanation. The supply must be alternating, because a steady current gives a steady field and a steady field induces nothing; a transformer does not work on direct current. The core must be soft iron so that it magnetises and demagnetises easily as the field reverses, and it is laminated, built from thin insulated sheets, to reduce currents circulating in the core itself that would waste energy as thermal energy. More turns on the secondary than the primary steps the voltage up; fewer steps it down.",
        "formula": "Vs / Vp = Ns / Np",
        "howAsked": "'Explain the principle of operation of a transformer' and 'calculate the number of turns on the secondary coil'. The explanation needs the changing field and the fact that direct current will not work.",
        "watchOut": "Saying the current passes from the primary to the secondary. The coils are not connected; only the changing field links them."
      },
      "D7.14": {
        "inShort": "Alternating voltages can be stepped up and down by transformers, and direct voltages cannot. Transmitting at very high voltage means a small current for the same power, and since the energy wasted in the cables is I²R, a smaller current wastes far less energy. The voltage is then stepped down again for safe use.",
        "detail": "Put numbers to it and the argument becomes concrete. Sending 100 kW at 250 V needs 400 A; the same power at 25 kV needs only 4 A. Because the waste depends on the square of the current, cutting the current to a hundredth cuts the waste to a ten-thousandth. The alternative would be enormously thick cables to reduce R, which would be far more expensive. Alternating current also allows simpler generators and motors, but the transmission argument is the one the syllabus asks for.",
        "formula": "power wasted in cables = I² R",
        "howAsked": "'State the advantages of using a.c. for transferring electrical energy.' Marks are for transformers being able to change a.c. voltages, for high voltage meaning low current, and for the I²R waste being reduced.",
        "watchOut": "Saying high voltage transmission is used because voltage is 'stronger'. The reason is the reduced current and the reduced I²R loss."
      },
      "D7.15": {
        "inShort": "For an ideal transformer no energy is wasted, so the output power equals the input power: Vp Ip = Vs Is. Combined with the turns ratio, stepping the voltage up steps the current down in the same proportion.",
        "detail": "A transformer with 200 primary turns and 1000 secondary turns fed at 240 V gives 240 × 1000/200 = 1200 V, a step-up of five times. If the input current is 5 A, the input power is 1200 W, so the output current is 1200/1200 = 1 A, five times smaller. Real transformers are not quite ideal: some energy is lost as thermal energy in the resistance of the coils, in currents induced within the core, and in repeatedly magnetising and demagnetising the core, so the output power is slightly less than the input.",
        "formula": "Vs / Vp = Ns / Np;  Vp Ip = Vs Is",
        "howAsked": "Use the turns ratio together with electrical power relationships to calculate transformer voltages and currents. If a question concerns a real transformer, identify energy transfers that reduce the output power below the input power.",
        "watchOut": "Assuming the current changes in the same ratio as the voltage. It changes in the inverse ratio."
      }
    },
    "practicals": [
      "Pass a large current through a vertical wire through a horizontal card and sprinkle iron filings to show the circular field.",
      "Hang a length of wire between the poles of a horseshoe magnet and switch on a current, observing the direction it jumps.",
      "Move a magnet in and out of a coil connected to a sensitive galvanometer and watch the needle deflect, then reverse the motion.",
      "Wind primary and secondary coils of different turns on a soft iron core and compare the input and output voltages."
    ],
    "commonMistakes": [
      "Using the left hand for a generator or the right hand for a motor.",
      "Applying Fleming's rules with the direction of electron flow instead of conventional current.",
      "Saying a transformer works on direct current. It needs a changing field.",
      "Forgetting that the induced e.m.f. is zero when the magnet is held still inside the coil."
    ]
  }
]);
