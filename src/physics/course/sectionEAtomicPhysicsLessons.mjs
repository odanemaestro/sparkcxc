// SPARK CSEC Physics Section E lesson candidates.
// Built from the user-supplied complete study notes and CXC 22/G/SYLL 13 objective map.
// Per-objective KC/UK/XS labels from the external draft are intentionally not exposed as official CXC classifications.

export const SECTION_E_ATOMIC_PHYSICS_LESSONS = Object.freeze([
  {
    "id": "E1",
    "section": "E",
    "title": "Models of the Atom",
    "tagline": "How the picture of the atom changed, and the experiment that forced the change.",
    "summary": "How the picture of the atom changed, and the experiment that forced the change.",
    "whyItMatters": "Shows how atomic models changed when new experimental evidence could no longer be explained by earlier models.",
    "objectives": [
      [
        "E1.1",
        "describe the work done in establishing the modern view of the atom"
      ],
      [
        "E1.2",
        "describe the Geiger- Marsden experiment"
      ]
    ],
    "prerequisites": [],
    "formulae": [],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Dalton, at the start of the nineteenth century, treated the atom as a solid indivisible sphere. That held until Thomson discovered the electron in 1897, which showed atoms contain smaller pieces and that some of them are negative.",
          "Thomson proposed the plum pudding model: a sphere of positive charge with electrons dotted through it, like fruit in a pudding. It accounted for the electron and for the atom being neutral overall, and it predicted that a fast alpha particle fired at a thin foil would pass almost straight through, deflected only slightly, because the positive charge was spread thinly everywhere.",
          "Geiger and Marsden tested that prediction in Rutherford's laboratory, and the result destroyed the model. Almost all the alpha particles did pass straight through, but a very small number came back almost the way they had come. Rutherford's remark was that it was as surprising as firing a shell at tissue paper and having it bounce back.",
          "The only explanation was that the positive charge and nearly all the mass are concentrated in a tiny central nucleus, with the electrons far outside and the atom mostly empty space. That is the nuclear model, and it is still the picture used today.",
          "Bohr then refined it by placing the electrons in fixed shells at particular distances, which explained why atoms emit light of particular colours and connects the structure of the atom to the periodic table."
        ]
      }
    ],
    "objectiveCards": {
      "E1.1": {
        "inShort": "Dalton treated the atom as a solid indivisible sphere. Thomson discovered the electron and proposed a sphere of positive charge with electrons embedded in it. Rutherford replaced that with the nuclear model, a tiny dense positive nucleus with electrons outside. Bohr placed the electrons in fixed shells.",
        "detail": "Each model was accepted because it explained the evidence of its day, and each was replaced when new evidence contradicted it, which is the point the syllabus is making about how science works. Dalton explained why elements combine in fixed ratios. Thomson's electron explained cathode rays and required the positive charge to be somewhere. Rutherford's nucleus explained the large-angle scattering that Thomson's model could not. Bohr's shells explained why each element emits only certain colours of light rather than a continuous spread.",
        "formula": "",
        "howAsked": "'Describe the work done in establishing the modern view of the atom.' Marks are for the models in order, for who proposed each, and for what each explained or failed to explain.",
        "watchOut": "Listing names and dates with no physics. What each model said, and why it was replaced, is what earns the marks."
      },
      "E1.2": {
        "inShort": "A beam of alpha particles was fired at a very thin gold foil in a vacuum, and a movable detector recorded where they went. Most passed straight through with no deflection, a few were deflected through large angles, and a very small number, about one in eight thousand, came almost straight back.",
        "detail": "The three observations lead to three conclusions and they are usually marked separately. Most passing straight through means the atom is mostly empty space. A few deflected through large angles means there is a concentrated positive charge that repels the positive alpha particle. A very few bouncing back means that charge is also extremely massive, since a light object cannot reverse a fast heavy one. Together they give the nuclear model: a tiny, dense, positively charged nucleus containing nearly all the mass, with the electrons far outside. The foil had to be extremely thin so that particles met only one layer of atoms, and the whole apparatus was evacuated because alpha particles are absorbed by a few centimetres of air.",
        "formula": "",
        "howAsked": "'Describe the Geiger-Marsden experiment and state the conclusions drawn from it.' Pair every observation with its conclusion, since that pairing is how the marks are allocated.",
        "watchOut": "Giving the observations without the conclusions, or reversing them so that 'most passed through' is used to argue for a nucleus."
      }
    },
    "practicals": [
      "Roll marbles at a hidden shape under a card and deduce its outline from the way they scatter, as a model of the Rutherford experiment."
    ],
    "commonMistakes": [
      "Saying the experiment proved the atom has electrons. It was about where the positive charge and mass are.",
      "Reporting that most alpha particles were deflected. Almost all passed straight through."
    ]
  },
  {
    "id": "E2",
    "section": "E",
    "title": "Structure of the Atom",
    "tagline": "What is inside an atom, how the particles compare, the mass and atomic numbers, isotopes, and the link to the periodic table.",
    "summary": "What is inside an atom, how the particles compare, the mass and atomic numbers, isotopes, and the link to the periodic table.",
    "whyItMatters": "Develops atomic and nuclear structure, nuclide notation, isotopes, ions and the shell model used to interpret the periodic table.",
    "objectives": [
      [
        "E2.1",
        "sketch the structure of simple atoms"
      ],
      [
        "E2.2",
        "compare the mass and charge of the electron with the mass and charge of the proton"
      ],
      [
        "E2.3",
        "explain why an atom is normally neutral and stable"
      ],
      [
        "E2.4",
        "apply the relationship A = Z + N"
      ],
      [
        "E2.5",
        "explain what is meant by the term \"isotope\""
      ],
      [
        "E2.6",
        "relate the shell model of the atom to the periodic table"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Mass, atomic and neutron number",
        "equation": "A = Z + N",
        "symbols": "A is the mass number, Z the atomic number or proton number, N the number of neutrons",
        "unit": "counts, no unit",
        "condition": "Rearranged, N = A − Z gives the number of neutrons."
      },
      {
        "name": "Nuclide notation",
        "equation": "ᴬZ X",
        "symbols": "A above and Z below the chemical symbol X",
        "unit": "none",
        "condition": "Carbon-14 is written with 14 above and 6 below the symbol C, so it has 8 neutrons."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "An atom has a central nucleus containing protons and neutrons, with electrons moving around it in shells. The protons carry positive charge, the neutrons carry none, and the electrons carry an equal and opposite charge to the proton.",
          "The masses are very unequal. A proton and a neutron have almost the same mass, taken as one unit each. An electron has about one two-thousandth of that, so nearly all the mass of an atom is in its nucleus, which was exactly Rutherford's conclusion.",
          "An atom is neutral because it has equal numbers of protons and electrons, so the charges cancel. It is stable because the strong nuclear force holds the protons and neutrons together against the electric repulsion between the protons.",
          "Two numbers describe a nucleus. The atomic number Z is the number of protons, and it decides which element the atom is. The mass number A is the total number of protons and neutrons, so the number of neutrons is N = A − Z. A nuclide is written with A above and Z below the chemical symbol.",
          "Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. They behave identically in chemical reactions, because chemistry depends on the electrons, but they differ in mass and in nuclear stability, which is why some isotopes are radioactive and others are not.",
          "The shell model links to the periodic table. Electrons fill shells from the innermost outwards, holding two in the first and eight in the second, and the number of electrons in the outermost shell decides the group an element sits in and how it reacts."
        ]
      }
    ],
    "objectiveCards": {
      "E2.1": {
        "inShort": "Draw a small central nucleus containing the protons and neutrons, labelled, with electrons shown on circles around it. Fill the first shell with two electrons and the second with up to eight. For example, carbon has 6 protons and 6 neutrons in the nucleus, with 2 electrons in the first shell and 4 in the second.",
        "detail": "Keep the nucleus small compared with the shells, since the atom is mostly empty space. Label the protons, neutrons and electrons rather than relying on the drawing to speak for itself. The filling rule for the first twenty elements is two in the first shell, eight in the second, eight in the third: sodium, with 11 electrons, has 2, 8, 1. That last figure, the number in the outer shell, is what E2.6 connects to the periodic table.",
        "formula": "",
        "howAsked": "'Sketch the structure of a lithium atom.' Marks are for the nucleus with the right numbers of protons and neutrons, for the electrons in the right shells, and for labels.",
        "watchOut": "Putting the neutrons in the shells, or drawing more than two electrons in the first shell."
      },
      "E2.2": {
        "inShort": "A proton has a relative mass of 1 and a charge of +1. A neutron has a relative mass of 1 and no charge. An electron has a relative mass of about 1/1840 and a charge of −1. So a proton and an electron carry equal and opposite charges, but the proton is about 1840 times heavier.",
        "detail": "These comparisons explain two important facts. Because the electron's mass is so small, nearly all the mass of an atom is in the nucleus, which is why alpha particles bounced back off it. And because the proton and electron charges are exactly equal and opposite, an atom with equal numbers of each is precisely neutral rather than approximately so. A table with rows for particle, relative mass, relative charge and location is the clearest way to present this in an answer.",
        "formula": "",
        "howAsked": "'Compare the mass and charge of the electron with those of the proton', often as a table to complete. Every cell is a mark, so fill the location row as well if it is there.",
        "watchOut": "Giving the electron a positive charge, or giving the neutron a charge at all."
      },
      "E2.3": {
        "inShort": "An atom is neutral because it contains equal numbers of protons and electrons, whose charges are equal and opposite and therefore cancel. It is stable because the strong nuclear force between the protons and neutrons is greater than the electric repulsion between the protons at nuclear distances.",
        "detail": "The two halves of the question are different, and both are needed. Neutrality is about charge and involves the electrons. Stability is about the nucleus and does not involve the electrons at all. Protons all carry positive charge and repel one another strongly at such small separations, so something must hold them together; that is the strong nuclear force, which acts between protons and neutrons alike but only over distances about the size of a nucleus. In very large nuclei the repulsion begins to win, which is why the heaviest elements are radioactive.",
        "formula": "",
        "howAsked": "'Explain why an atom is normally neutral and stable.' Answer both parts: equal protons and electrons for neutrality, strong nuclear force overcoming repulsion for stability.",
        "watchOut": "Explaining neutrality and stopping. Stability is a separate mark and needs the nuclear force."
      },
      "E2.4": {
        "inShort": "A = Z + N. The mass number A is the number of protons plus neutrons; the atomic number Z is the number of protons; N is the number of neutrons. So for a nucleus with A = 23 and Z = 11, there are 11 protons, 11 electrons in the neutral atom, and 23 − 11 = 12 neutrons.",
        "detail": "Read the nuclide symbol carefully: the larger number on top is always the mass number and the smaller one below is the atomic number. In a neutral atom the number of electrons equals Z. The atomic number identifies the element, so anything with Z = 6 is carbon whatever its mass number. These conversions appear inside nuclear equation questions, where the mass numbers and atomic numbers must each balance across the equation.",
        "formula": "A = Z + N;  N = A − Z",
        "howAsked": "'State the number of protons, neutrons and electrons in the atom.' Three marks for three numbers, and the electron count is the one most often forgotten.",
        "watchOut": "Subtracting the wrong way round and getting a negative number of neutrons, which means the two numbers were swapped."
      },
      "E2.5": {
        "inShort": "Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons, and therefore different mass numbers. Carbon-12 and carbon-14 both have 6 protons, but 6 and 8 neutrons respectively.",
        "detail": "Because the number of protons is the same, the number of electrons is the same, and chemical behaviour depends on the electrons, so isotopes of an element are chemically identical. What differs is the mass and, importantly, the stability of the nucleus. Carbon-12 is stable and carbon-14 is not, which is what makes carbon dating possible. Most elements occur naturally as a mixture of isotopes, which is why the relative atomic mass in the periodic table is rarely a whole number.",
        "formula": "",
        "howAsked": "'Explain what is meant by the term isotope' and often 'state ONE similarity and ONE difference between two isotopes'. The definition needs both the same protons and the different neutrons.",
        "watchOut": "Saying isotopes have different chemical properties. They do not; only their nuclear properties differ."
      },
      "E2.6": {
        "inShort": "Electrons fill shells outwards, two in the first, eight in the second, eight in the third for the first twenty elements. The number of occupied shells gives the period the element is in, and the number of electrons in the outer shell gives the group, which decides how the element reacts.",
        "detail": "Sodium has 11 electrons arranged 2, 8, 1, so it is in period 3 and group 1, and its single outer electron is easily lost, which is why it is so reactive. Chlorine has 17 electrons arranged 2, 8, 7, so it is in period 3 and group 7, and it readily gains one electron to complete its outer shell. Neon has 2, 8, a full outer shell, so it does not react at all and sits in group 0. This is where physics and chemistry meet in the syllabus, and it explains why the periodic table has the shape it does.",
        "formula": "",
        "howAsked": "'Relate the shell model of the atom to the position of an element in the periodic table.' Marks are for the outer shell electrons giving the group and the number of shells giving the period.",
        "watchOut": "Confusing group with period. Group comes from the outer shell count, period from the number of shells."
      }
    },
    "practicals": [
      "Build models of the first twenty atoms with counters for protons, neutrons and electrons and check A = Z + N for each."
    ],
    "commonMistakes": [
      "Confusing mass number with atomic number when reading a nuclide symbol.",
      "Saying isotopes have different numbers of protons. That would make them different elements.",
      "Giving the electron the same mass as a proton."
    ]
  },
  {
    "id": "E3",
    "section": "E",
    "title": "Radioactivity",
    "tagline": "What unstable nuclei emit, how the emissions differ, nuclear equations, half-life, the uses of radioisotopes, and nuclear energy.",
    "summary": "What unstable nuclei emit, how the emissions differ, nuclear equations, half-life, the uses of radioisotopes, and nuclear energy.",
    "whyItMatters": "Explains radioactive emissions, detection, nuclear equations, half-life, radioisotope uses, hazards and nuclear-energy arguments.",
    "objectives": [
      [
        "E3.1",
        "describe Marie Curie’s work in the field of radioactivity"
      ],
      [
        "E3.2",
        "state the nature of the three types of radioactive emissions"
      ],
      [
        "E3.3",
        "describe experiments to compare the ranges of alpha, beta and gamma emissions"
      ],
      [
        "E3.4",
        "describe the appearance of the tracks of radioactive emissions in a cloud chamber"
      ],
      [
        "E3.5",
        "predict the effects of magnetic and electric fields on the motion of alpha particles, beta particles and gamma rays"
      ],
      [
        "E3.6",
        "interpret nuclear reactions in the standard form"
      ],
      [
        "E3.7",
        "conduct an activity to demonstrate the random nature of radioactive decay"
      ],
      [
        "E3.8",
        "recall that the decay process is independent of the conditions external to the nucleus"
      ],
      [
        "E3.9",
        "use graphs of random decay to show that such processes have constant half-lives"
      ],
      [
        "E3.10",
        "solve problems involving half-life"
      ],
      [
        "E3.11",
        "discuss the useful applications of radio- isotopes"
      ],
      [
        "E3.12",
        "relate the release of energy in a nuclear reaction to a change in mass"
      ],
      [
        "E3.13",
        "cite arguments for and against the utilisation of nuclear energy"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Half-life",
        "equation": "after n half-lives, the amount remaining is the original divided by 2ⁿ",
        "symbols": "n is the number of half-lives elapsed",
        "unit": "time in the same unit as the half-life",
        "condition": "After 3 half-lives, one eighth remains. The number of half-lives is the total time divided by the half-life."
      },
      {
        "name": "Alpha decay",
        "equation": "A falls by 4, Z falls by 2",
        "symbols": "the emitted particle is a helium nucleus",
        "unit": "none",
        "condition": "Mass numbers and atomic numbers must balance on both sides of the equation."
      },
      {
        "name": "Beta decay",
        "equation": "A unchanged, Z rises by 1",
        "symbols": "a neutron becomes a proton and an electron, and the electron is emitted",
        "unit": "none",
        "condition": "The mass number does not change because a neutron and a proton have the same mass number."
      },
      {
        "name": "Mass and energy",
        "equation": "E = m c²",
        "symbols": "m is the mass converted, c the speed of light",
        "unit": "E in joules",
        "condition": "Because c² is so large, a very small mass gives an enormous energy."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Some nuclei are unstable and break down on their own, emitting radiation. The process is called radioactive decay, it is random, and nothing done to the atom from outside changes it: heating, cooling, chemical reaction and pressure all leave the rate unaffected, because the decay happens in the nucleus and those influences act on the electrons.",
          "Three kinds of emission are named. An alpha particle is a helium nucleus, two protons and two neutrons, with charge +2 and a large mass. A beta particle is a fast electron from the nucleus, with charge −1 and a very small mass. A gamma ray is a high-energy electromagnetic wave with no charge and no mass.",
          "Their properties follow from that. Alpha is the most strongly ionising and therefore the least penetrating, stopped by paper or a few centimetres of air. Beta is moderately ionising and passes through paper but is stopped by a few millimetres of aluminium. Gamma barely ionises at all and is only reduced, never fully stopped, by several centimetres of lead.",
          "In a magnetic or electric field the three separate. Alpha, positive and heavy, is deflected slightly one way; beta, negative and light, is deflected much more the other way; gamma, uncharged, is not deflected at all.",
          "When a nucleus decays it changes into a different nucleus, and the change is written as a nuclear equation in which the mass numbers balance and the atomic numbers balance. Alpha decay reduces A by 4 and Z by 2. Beta decay leaves A unchanged and raises Z by 1, because a neutron has turned into a proton and an electron.",
          "Although any single decay is unpredictable, a large sample decays at a rate that follows a fixed pattern. The half-life is the time for half the undecayed nuclei in a sample to decay, or for the activity to fall to half its value, and it is constant for a given isotope. That is what makes carbon dating, medical tracing and industrial gauging possible.",
          "Nuclear energy comes from the conversion of a tiny amount of mass into a very large amount of energy. Fission splits a heavy nucleus into lighter ones and is what a nuclear power station uses; fusion joins light nuclei into a heavier one and is what powers the Sun."
        ]
      }
    ],
    "objectiveCards": {
      "E3.1": {
        "inShort": "Marie Curie, working with Pierre Curie, discovered the elements polonium and radium, coined the term radioactivity, and showed that radioactivity is a property of the atom itself rather than of a chemical compound. She won Nobel Prizes in both Physics and Chemistry.",
        "detail": "She began by measuring the radiation from uranium ores and found some gave off more than their uranium content could account for, which led her to conclude that other, more active elements must be present. Isolating them from tonnes of pitchblende took years of chemical work and produced polonium and then radium. Her insight that the effect did not depend on the chemical form of the uranium is the important physics: it pointed to the atom, and eventually to the nucleus, as the source. Her work also led to the medical use of radiation, and she organised mobile X-ray units in the First World War. She died of an illness attributed to her long exposure, at a time when the dangers were not understood.",
        "formula": "",
        "howAsked": "'Describe Marie Curie's contribution to the field of radioactivity.' Marks are for the discovery of the elements, for naming radioactivity, and for the conclusion that it is a property of the atom.",
        "watchOut": "Saying she discovered radioactivity. Becquerel discovered it; Curie named it and explained where it comes from."
      },
      "E3.2": {
        "inShort": "An alpha particle is a helium nucleus, 2 protons and 2 neutrons, charge +2, relatively large mass. A beta particle is a fast-moving electron emitted from the nucleus, charge −1, very small mass. A gamma ray is a high-energy electromagnetic wave, no charge and no mass.",
        "detail": "The nature of each explains everything else about it. Alpha is large and doubly charged, so it interacts strongly with the atoms it passes and loses its energy quickly, making it highly ionising and poorly penetrating. Beta is far lighter and singly charged, so it interacts less and travels further. Gamma has no charge and no mass, interacts only weakly, and can pass through considerable thicknesses of material. Gamma is often emitted alongside alpha or beta as the new nucleus settles into a lower energy state.",
        "formula": "",
        "howAsked": "'State the nature of the three types of radioactive emission.' Give what each is, its charge and its mass, since a table of those three properties is the usual form.",
        "watchOut": "Describing a beta particle as an electron from the electron shells. It comes from the nucleus, formed when a neutron changes into a proton."
      },
      "E3.3": {
        "inShort": "Place a source in front of a Geiger-Müller tube and counter and record the count rate. Insert absorbers in turn: a sheet of paper stops alpha, a few millimetres of aluminium stops beta, and only several centimetres of lead substantially reduces gamma. Also move the source away: alpha stops within a few centimetres of air, beta within about a metre, gamma continues far further.",
        "detail": "Take a background count first with no source present and subtract it from every reading, because background radiation is always present and would otherwise be counted as part of the source. Then work through the absorbers in order of increasing stopping power and watch where the count rate falls sharply. A drop when paper is inserted shows alpha is present; a further drop with aluminium shows beta; a count that remains after thick aluminium shows gamma. Handle sources with tongs, keep them at arm's length, point them away from the body, and return them to a lead-lined container.",
        "formula": "",
        "howAsked": "'Describe an experiment to compare the penetrating powers of alpha, beta and gamma radiation.' Marks are for the detector, the background count and its subtraction, the absorbers in order, and the conclusions. A safety precaution is often a separate mark.",
        "watchOut": "Omitting the background count. Forgetting the safety precautions, which are usually specifically credited."
      },
      "E3.4": {
        "inShort": "Alpha particles leave thick, straight, dense tracks of roughly equal length, because they ionise strongly and travel a fixed short distance. Beta particles leave thin, wispy, irregular tracks that bend and vary in length. Gamma rays leave almost no track, only occasional short stray tracks where they happen to eject an electron.",
        "detail": "A cloud chamber contains air saturated with alcohol vapour. A charged particle passing through ionises the air along its path, and the vapour condenses on those ions, leaving a visible line of droplets exactly like a vapour trail behind an aircraft. The appearance of the track therefore reports directly on how strongly the particle ionises. Alpha's thick equal-length tracks are the clearest evidence that alpha particles are emitted with the same energy from a given source.",
        "formula": "",
        "howAsked": "'Describe the appearance of the tracks produced by alpha and beta particles in a cloud chamber.' Marks are for thickness, straightness and length for each, and for linking the appearance to the ionising power.",
        "watchOut": "Saying gamma leaves a long thin track. Gamma is uncharged and produces almost no direct ionisation."
      },
      "E3.5": {
        "inShort": "In a magnetic field, alpha and beta are deflected in opposite directions because their charges are opposite, and beta is deflected much more because it is far lighter. Gamma is not deflected at all because it has no charge. In an electric field, alpha is attracted towards the negative plate, beta towards the positive plate, and gamma passes straight through.",
        "detail": "Work it out from the charge and the mass rather than memorising a picture. Alpha carries +2 and beta −1, so in the same field they curve opposite ways. The amount of curvature depends on the charge-to-mass ratio, and since a beta particle has about one seven-thousandth the mass of an alpha particle, its path bends far more sharply. Gamma is uncharged, so no electric or magnetic force acts on it and it continues undeviated, which is itself a useful way to identify it.",
        "formula": "",
        "howAsked": "'Sketch the paths of alpha, beta and gamma radiation in a magnetic field into the page.' Marks are for opposite directions for alpha and beta, for beta curving more, and for gamma going straight.",
        "watchOut": "Curving alpha and beta the same way, or giving them the same radius of curvature."
      },
      "E3.6": {
        "inShort": "Balance the mass numbers on both sides and balance the atomic numbers on both sides. Alpha decay: A falls by 4, Z falls by 2, and a helium nucleus is emitted. Beta decay: A is unchanged, Z rises by 1, and an electron is emitted.",
        "detail": "Radium-226, with Z = 88, decaying by alpha emission gives a nucleus with A = 222 and Z = 86, which is radon, plus the alpha particle written as helium with A = 4 and Z = 2. Check: 226 = 222 + 4 and 88 = 86 + 2. For beta decay, carbon-14 with Z = 6 gives nitrogen with A = 14 and Z = 7, plus an electron written with A = 0 and Z = −1. Check: 14 = 14 + 0 and 6 = 7 − 1. The atomic number rises because a neutron inside the nucleus has become a proton. Gamma emission changes neither number, since the nucleus only loses energy.",
        "formula": "alpha: A → A − 4, Z → Z − 2;  beta: A unchanged, Z → Z + 1",
        "howAsked": "'Complete the nuclear equation.' Marks are for the mass number, the atomic number and, where asked, the name of the daughter element. Always check both totals balance before moving on.",
        "watchOut": "Reducing the mass number in beta decay. It does not change, because an electron has a mass number of zero."
      },
      "E3.7": {
        "inShort": "Throw a large number of dice, remove every die showing a chosen face, count how many remain, and repeat. Plot number remaining against throw number. The curve decreases non-linearly and, for a large sample, approximately the same fraction is removed in each interval, modelling random radioactive decay and half-life.",
        "detail": "Each die has the same probability of removal on every throw, but the individual die that will be removed cannot be predicted. Because a roughly constant fraction is removed each round, the number remaining follows an exponential-like decrease rather than a straight line. Larger samples give a smoother result because random fluctuations are smaller relative to the total.",
        "formula": "",
        "howAsked": "Set as a practical description or with a table of results to plot. Marks are for the plotted curve, its shape, and the conclusion that a constant fraction decays in each interval.",
        "watchOut": "Joining the points with straight line segments. The relationship is a smooth curve."
      },
      "E3.8": {
        "inShort": "Radioactive decay is a nuclear process, so it is unaffected by anything outside the nucleus. Heating, cooling, compressing, or combining the atom chemically leaves the rate of decay completely unchanged.",
        "detail": "This is what separates nuclear change from chemical change and it is often examined as a short explanation. Chemical reaction rates depend strongly on temperature and concentration because they involve the outer electrons, which are easily influenced. Radioactive decay involves the nucleus, which is far smaller, far more tightly bound and screened by the electrons, so ordinary laboratory conditions cannot reach it. It follows that a radioactive isotope cannot be made safe by heating, freezing or reacting it, which matters when nuclear waste is discussed.",
        "formula": "",
        "howAsked": "'State ONE factor which does NOT affect the rate of radioactive decay, and explain.' Marks are for the factor and for the reason, that decay occurs in the nucleus.",
        "watchOut": "Saying temperature has a small effect. It has none."
      },
      "E3.9": {
        "inShort": "Plot the count rate or the number of undecayed nuclei against time. Read off the time for the value to fall from its start to half its start, then from that half to a quarter, then from the quarter to an eighth. Each interval comes out the same, which shows the half-life is constant.",
        "detail": "Reading it more than once is the point of the exercise, because a single reading proves nothing about constancy. Take the starting count as 800: find the time when it reaches 400, then the further time to reach 200, then to 100. All three intervals should be equal within reading error, and quoting them and their agreement is what earns the marks. Subtract the background count from every reading before plotting, or the curve will flatten towards the background level rather than towards zero and the later half-lives will come out too long.",
        "formula": "",
        "howAsked": "'Use the graph to show that the decay has a constant half-life.' Marks are for at least two separate readings taken from different starting points and for the statement that they agree.",
        "watchOut": "Taking one reading and asserting the half-life is constant. Show the working for two or three."
      },
      "E3.10": {
        "inShort": "Work out how many half-lives have passed by dividing the total time by the half-life, then halve the starting amount that many times. A 160 g sample with a half-life of 5 days, after 20 days, has passed 4 half-lives, so 160 → 80 → 40 → 20 → 10 g remains.",
        "detail": "Work out how many half-lives have elapsed by dividing the time by the half-life, then halve the undecayed amount once for each half-life. The same proportional reasoning applies to activity because activity is proportional to the number of undecayed nuclei for a given isotope. Questions can also run backwards: use the fraction remaining to determine the number of half-lives and hence the elapsed time.",
        "formula": "remaining = original / 2ⁿ, where n = total time / half-life",
        "howAsked": "'Calculate the mass remaining after ...' or 'determine the half-life of the isotope'. Marks are for the number of half-lives, the halving sequence and the unit.",
        "watchOut": "Dividing the original amount by the number of half-lives instead of halving repeatedly. Four half-lives leaves a sixteenth, not a quarter."
      },
      "E3.11": {
        "inShort": "Medical: cobalt-60 gamma rays treat cancer, technetium-99 acts as a tracer to image organs, and gamma radiation sterilises instruments. Industrial: thickness gauges control sheet metal and paper, and gamma sources find cracks in welds. Dating: carbon-14 dates once-living material and uranium isotopes date rocks. Agricultural: tracers follow fertiliser uptake and irradiation preserves food.",
        "detail": "Match the isotope to the job by its emission and half-life, because that is what a stronger answer shows. A medical tracer needs a short half-life so the patient is not exposed for long, and gamma emission so the radiation escapes the body to be detected. A thickness gauge needs beta, which is partly absorbed by the sheet so that changes in thickness change the count rate, and a long half-life so the source does not need constant replacement. Carbon dating works because living things take in carbon-14 continuously and stop at death, after which the proportion falls with a half-life of 5730 years, so the remaining fraction gives the age.",
        "formula": "",
        "howAsked": "'Discuss TWO useful applications of radioisotopes.' Marks are for the application, the type of emission used, and why that choice suits the job.",
        "watchOut": "Naming applications with no reason for the choice of isotope. The half-life and the emission type are where the extra marks are."
      },
      "E3.12": {
        "inShort": "In a nuclear reaction the total mass of the products is slightly less than the total mass of the reactants, and the missing mass has been converted into energy according to E = mc². Because c² is about 9 × 10¹⁶, a very small mass gives an enormous amount of energy.",
        "detail": "Fission splits a heavy nucleus such as uranium-235, after it absorbs a neutron, into two lighter nuclei plus two or three neutrons, and those neutrons can split further nuclei, giving a chain reaction. Fusion joins light nuclei, as in hydrogen nuclei combining to form helium in the Sun, and releases even more energy per kilogram, but requires enormous temperatures and pressures to overcome the repulsion between the nuclei. In both cases the source of the energy is the same: a small loss of mass. That is why nuclear fuel yields so much more energy per kilogram than any chemical fuel.",
        "formula": "E = m c²",
        "howAsked": "'Relate the release of energy in a nuclear reaction to a change in mass' and often 'distinguish between fission and fusion'. Marks are for the mass loss, for E = mc², and for the correct description of each process.",
        "watchOut": "Saying mass is destroyed. It is converted into energy, and the total of mass and energy is conserved."
      },
      "E3.13": {
        "inShort": "For: an enormous energy output from a very small mass of fuel, no carbon dioxide produced during generation, and reliable output that does not depend on weather. Against: radioactive waste that stays dangerous for thousands of years, the risk and consequences of an accident, very high construction cost, and the link to nuclear weapons.",
        "detail": "A good answer gives specifics on both sides and then reaches a conclusion. On the positive side, one kilogram of uranium yields as much energy as roughly two thousand tonnes of coal, and a station running steadily suits base load demand in a way that solar and wind cannot without storage. On the negative side, spent fuel must be isolated for millennia and no permanent solution is in general use, accidents such as Chernobyl and Fukushima contaminated large areas, and construction takes many years at very high cost. For small Caribbean territories the scale, the cost and the hurricane and seismic risk are practical objections worth naming.",
        "formula": "",
        "howAsked": "'Cite arguments for and against the use of nuclear energy.' The marks are divided between the two sides, so an answer that argues only one way cannot score full marks.",
        "watchOut": "Writing only about danger. The energy density and the absence of carbon dioxide emissions during generation are the arguments in favour and they carry marks."
      }
    },
    "practicals": [
      "Throw a large number of dice repeatedly, removing those showing a six each time, and plot the number remaining against the number of throws to model random decay.",
      "Measure the count rate from a source with paper, then aluminium, then lead between source and detector, to identify the emissions present.",
      "Plot a decay curve from recorded count rate against time and read the half-life from it at several starting points."
    ],
    "commonMistakes": [
      "Saying half-life is the time for the sample to half in mass. It is the time for half the undecayed nuclei to decay.",
      "Failing to balance mass numbers or atomic numbers in a nuclear equation.",
      "Deflecting alpha and beta the same way in a field. They carry opposite charges.",
      "Confusing fission with fusion."
    ]
  }
]);
