// SPARK CSEC Physics Section C lesson candidates.
// Built from the user-supplied complete study notes and CXC 22/G/SYLL 13 objective map.
// Per-objective KC/UK/XS labels from the external draft are intentionally not exposed as official CXC classifications.

export const SECTION_C_WAVES_OPTICS_LESSONS = Object.freeze([
  {
    "id": "C1",
    "section": "C",
    "title": "Wave Motion",
    "tagline": "What a wave is, the quantities that describe one, and how to read the two graphs that represent it.",
    "summary": "What a wave is, the quantities that describe one, and how to read the two graphs that represent it.",
    "whyItMatters": "Provides the core wave language, representations and wave equation used throughout sound, light and electromagnetic-wave topics.",
    "objectives": [
      [
        "C1.1",
        "differentiate between types of waves"
      ],
      [
        "C1.2",
        "apply speed, frequency, wavelength, period and amplitude"
      ],
      [
        "C1.3",
        "represent transverse and longitudinal waves in displacement- position and displacement-time graphs"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Wave equation",
        "equation": "v = f λ",
        "symbols": "v is wave speed, f is frequency, λ is wavelength",
        "unit": "v in m/s, f in Hz, λ in m",
        "condition": "The most used formula in the section. It applies to every wave, including sound and light."
      },
      {
        "name": "Frequency and period",
        "equation": "f = 1 / T",
        "symbols": "f is frequency, T is period",
        "unit": "f in hertz (Hz), T in seconds",
        "condition": "A period of 0.02 s is a frequency of 50 Hz."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A wave carries energy from one place to another without carrying the material with it. Drop a stone in a pond and the ripples travel outwards, but a floating leaf only bobs up and down; the water does not move to the edge of the pond. That is the defining feature of a wave, and it is worth a mark when a question asks what a wave transfers.",
          "There are two ways the particles can move relative to the travel of the wave. In a transverse wave they vibrate at right angles to the direction the wave travels, as in water waves, light and all electromagnetic waves. In a longitudinal wave they vibrate along the direction of travel, producing regions where the particles are squashed together, called compressions, and regions where they are spread out, called rarefactions. Sound is the standard longitudinal wave.",
          "A pulse is a single disturbance travelling through a medium. A progressive wave is a continuous train of them.",
          "The quantities are fixed and must be learned exactly. Amplitude is the maximum displacement from the rest position, and it measures how much energy the wave carries. Wavelength is the distance between two consecutive points in the same phase, for example crest to crest. Period is the time for one complete oscillation. Frequency is the number of complete waves passing a point each second, measured in hertz, and it is one divided by the period. Speed is how fast the wave travels, and it links to the others through v = fλ.",
          "Two graphs are drawn and they look alike, which is why they are confused. A displacement-position graph is a snapshot of the whole wave at one instant, so the distance between crests on it is the wavelength. A displacement-time graph follows one point as time passes, so the distance between crests on it is the period. Always read the horizontal axis before deciding which quantity you are looking at."
        ]
      }
    ],
    "objectiveCards": {
      "C1.1": {
        "inShort": "A pulse is a single disturbance; a progressive wave is a continuous train of disturbances. In a transverse wave the particles vibrate at right angles to the direction of travel, as in water waves and light. In a longitudinal wave they vibrate along the direction of travel, producing compressions and rarefactions, as in sound.",
        "detail": "Test which kind you have by asking what direction the particles move compared with the wave. A rope flicked sideways gives a transverse wave, with crests and troughs. A slinky pushed and pulled along its length gives a longitudinal wave, with regions of squashed coils, the compressions, and stretched coils, the rarefactions. All electromagnetic waves are transverse and can travel through a vacuum. Sound is longitudinal and cannot: it needs particles to compress.",
        "formula": "",
        "howAsked": "'Differentiate between transverse and longitudinal waves and give ONE example of each.' Both the direction of vibration and an example are needed. Compressions and rarefactions are the terms expected for longitudinal waves.",
        "watchOut": "Giving sound as an example of a transverse wave. Describing the difference by the shape of the drawing rather than by the direction the particles vibrate."
      },
      "C1.2": {
        "inShort": "Speed v = f λ. Frequency f is the number of waves passing a point per second, in hertz, and equals 1/T. Wavelength λ is the distance between consecutive points in phase. Period T is the time for one complete wave. Amplitude is the maximum displacement from the rest position.",
        "detail": "Most questions are one substitution. A wave of frequency 50 Hz and wavelength 0.4 m travels at 50 × 0.4 = 20 m/s. Given the speed and one other quantity you can always find the third. Remember that when a wave passes from one medium into another its frequency stays the same, because the source sets it, while its speed and wavelength both change. That fact explains refraction and is often the missing mark.",
        "formula": "v = f λ;  f = 1 / T",
        "howAsked": "'Calculate the wavelength of the wave' or 'determine its frequency'. Marks are for the correct rearrangement, the substitution and the unit. Watch for a period given instead of a frequency.",
        "watchOut": "Using the period where the frequency belongs. Forgetting that frequency does not change when a wave enters a new medium."
      },
      "C1.3": {
        "inShort": "A displacement-position graph shows the whole wave frozen at one instant, so the distance between crests is the wavelength. A displacement-time graph follows one particle over time, so the distance between crests is the period. Read the horizontal axis label to tell them apart.",
        "detail": "A progressive wave varies in both space and time at once, so no single graph can show all of it; each of these fixes one variable and plots the other. On either graph, the amplitude is read the same way, from the rest position up to a crest. Longitudinal waves can be drawn on the same axes by plotting the displacement of each particle from its rest position, which turns compressions and rarefactions into a curve that looks transverse even though the wave is not.",
        "formula": "",
        "howAsked": "'Use the graph to determine the wavelength' or '... the period'. The first mark is choosing the right quantity for the axis shown. A follow-up often asks for the frequency or speed from what you read off.",
        "watchOut": "Assuming a wave-shaped graph shows wavelength. If the horizontal axis is time, it shows the period."
      }
    },
    "practicals": [
      "Send pulses along a stretched slinky, first sideways for a transverse wave and then by pushing along its length for a longitudinal one.",
      "Use a ripple tank to measure wavelength and frequency and check that v = fλ."
    ],
    "commonMistakes": [
      "Reading a period off a displacement-position graph, or a wavelength off a displacement-time graph.",
      "Measuring amplitude from crest to trough. It is measured from the rest position to the crest, so it is half of that.",
      "Saying a wave carries matter along with it."
    ]
  },
  {
    "id": "C2",
    "section": "C",
    "title": "Sound",
    "tagline": "How sound is made and carried, what pitch and loudness correspond to, how fast it travels, and what ultrasound is used for.",
    "summary": "How sound is made and carried, what pitch and loudness correspond to, how fast it travels, and what ultrasound is used for.",
    "whyItMatters": "Applies wave ideas to sound, including production, propagation, reflection, diffraction, interference and ultrasound.",
    "objectives": [
      [
        "C2.1",
        "describe how sound is produced and propagated in a medium"
      ],
      [
        "C2.2",
        "relate the terms ‘pitch’ and ‘loudness’ to wave parameters"
      ],
      [
        "C2.3",
        "apply the speed of sound to practical situations"
      ],
      [
        "C2.4",
        "cite evidence that sound waves reflect, refract, diffract and interfere"
      ],
      [
        "C2.5",
        "describe the use of ultrasound"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Speed of sound",
        "equation": "v = d / t",
        "symbols": "d is the distance travelled, t the time taken",
        "unit": "m/s",
        "condition": "For an echo the sound travels there and back, so the distance to the reflector is d/2."
      },
      {
        "name": "Wave equation applied to sound",
        "equation": "v = f λ",
        "symbols": "v about 340 m/s in air",
        "unit": "m/s",
        "condition": "A 170 Hz note in air has a wavelength of 340 / 170 = 2 m."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Sound is produced by something vibrating: a string, a drum skin, a loudspeaker cone, vocal cords. The vibration pushes on the air next to it, squashing it into a compression, then moves back and leaves a rarefaction. Those regions travel outwards as a longitudinal wave, and when they reach an ear they push the eardrum in and out at the same rate.",
          "Sound needs a material to travel through. Put a ringing bell in a jar and pump the air out and the sound fades to nothing while the bell is still visibly ringing, which is the standard demonstration that sound cannot cross a vacuum.",
          "Two properties of the wave map onto two things we hear. Frequency decides pitch: a higher frequency is heard as a higher note. Amplitude decides loudness: a bigger amplitude carries more energy and sounds louder. The human ear detects roughly 20 Hz to 20 000 Hz, and sound above that range is called ultrasound.",
          "Sound travels at about 340 m/s in air, far slower than light at 3 × 10⁸ m/s. That difference is why you see lightning before you hear thunder, and counting the gap gives the distance of the strike. Sound travels faster in liquids and faster still in solids, because the particles are closer together and pass the disturbance on sooner.",
          "Sound behaves like any other wave. It reflects, which gives echoes. It refracts when it passes between media of different density. It diffracts, which is why you can hear someone around a corner even though you cannot see them. And two sound waves can interfere, producing places that are louder and quieter."
        ]
      }
    ],
    "objectiveCards": {
      "C2.1": {
        "inShort": "Sound is produced by a vibrating body and travels through a medium as a longitudinal wave. The vibration compresses the particles next to it, then leaves them spread out, so compressions and rarefactions move outwards. Sound cannot travel through a vacuum because there are no particles to compress.",
        "detail": "Trace the chain from source to ear. A loudspeaker cone moves forward and pushes the air molecules closer together, forming a compression. It moves back and the molecules spread apart, forming a rarefaction. Each molecule only vibrates back and forth about its own position; it is the pattern of compressions that travels. When the pattern reaches an ear it moves the eardrum in and out at the frequency of the source. The bell jar experiment proves the need for a medium: as the air is pumped out the sound dies away although the hammer is still seen striking.",
        "formula": "",
        "howAsked": "'Describe how sound is produced and transmitted through air' or 'explain why sound cannot travel through a vacuum'. Marks are for the vibrating source, the compressions and rarefactions, and the need for particles.",
        "watchOut": "Describing sound as a transverse wave with crests and troughs. The terms are compressions and rarefactions."
      },
      "C2.2": {
        "inShort": "Pitch depends on frequency: the higher the frequency, the higher the pitch. Loudness depends on amplitude: the larger the amplitude, the louder the sound. The human ear detects roughly 20 Hz to 20 000 Hz.",
        "detail": "These are two separate pairings and questions often test whether you can keep them apart. Two notes of the same pitch can differ in loudness, and two sounds of the same loudness can differ in pitch. On an oscilloscope trace, a higher pitched note shows more waves across the screen while a louder one shows taller waves. The audible range is worth memorising, since the definition of ultrasound depends on its upper end.",
        "formula": "",
        "howAsked": "'Relate pitch and loudness to the properties of the wave' or an oscilloscope trace to interpret. State the range of audible frequencies when asked, using 20 Hz to 20 kHz.",
        "watchOut": "Linking loudness to frequency. Amplitude carries the energy, and energy is what makes a sound loud."
      },
      "C2.3": {
        "inShort": "Sound travels at about 340 m/s in air and light at 3 × 10⁸ m/s, so light arrives effectively instantly. Multiply the delay between the flash and the thunder by 340 to get the distance of the strike: a gap of 5 s means about 1700 m.",
        "detail": "Because the light takes a negligible time to arrive, the whole delay belongs to the sound. The same reasoning handles echoes, but with a correction: the sound travels to the reflector and back, so a wall giving an echo after 0.5 s at 340 m/s is 340 × 0.5 ÷ 2 = 85 m away. Sound travels faster in water, about 1500 m/s, and faster still in steel, because closer particles pass the disturbance on more quickly.",
        "formula": "d = v t;  for an echo, distance to reflector = v t / 2",
        "howAsked": "'Calculate how far away the lightning struck' or 'calculate the distance to the cliff'. The echo type is where the marks are lost, so read carefully whether the sound made a round trip.",
        "watchOut": "Forgetting to halve for an echo. Adding the travel time of the light, which is negligible."
      },
      "C2.4": {
        "inShort": "Reflection gives echoes. Refraction occurs when sound passes from one medium to another, for example air into water. Diffraction lets you hear someone talking around a corner. Interference produces points that are louder and quieter when two sources sound together.",
        "detail": "Each behaviour is evidence that sound is a wave, and each has a familiar example the examiner accepts. Echoes in a canyon or a large hall are reflection. Sound carrying further at night is refraction, caused by the change in air temperature with height bending the waves back down. Hearing but not seeing someone around a corner is diffraction, and it works for sound and not for light because sound wavelengths are comparable with the size of a doorway while light's are far smaller. Standing in front of two loudspeakers playing the same note and walking sideways gives loud and quiet positions, which is interference.",
        "formula": "",
        "howAsked": "'Cite evidence that sound waves undergo diffraction' or 'give ONE example of the reflection of sound'. One example, correctly matched to the behaviour, is the mark.",
        "watchOut": "Offering an echo as evidence of refraction, or hearing around a corner as evidence of reflection. Match the example to the right behaviour."
      },
      "C2.5": {
        "inShort": "Ultrasound is sound of frequency above the upper limit of human hearing, that is above about 20 000 Hz. It is used in pre-natal scanning to image an unborn baby, and in industry to test materials for cracks without cutting them open.",
        "detail": "Both uses work the same way. A pulse of ultrasound is sent into the object, and it reflects wherever the material changes: a boundary between tissues, or the surface of a crack. The time taken for the reflection to return gives the depth, and building up many such measurements produces an image. Ultrasound is preferred to X-rays for scanning because it does not ionise, so it is safer for the unborn child. Ultrasound is also used to measure depth of water from a ship, which is called echo sounding.",
        "formula": "",
        "howAsked": "'Define ultrasound and state TWO of its uses.' The definition needs the comparison with the audible range, and each use should say what is being detected.",
        "watchOut": "Defining ultrasound as 'very loud sound'. It is defined by frequency, not by loudness."
      }
    },
    "practicals": [
      "Ring an electric bell inside a bell jar and pump the air out, listening as the sound fades.",
      "Measure the speed of sound by timing an echo from a wall a measured distance away.",
      "Change the frequency of a signal generator driving a loudspeaker and listen to the change in pitch, then change the amplitude and listen to the change in loudness."
    ],
    "commonMistakes": [
      "Forgetting that an echo travels twice the distance to the reflector.",
      "Saying pitch depends on loudness, or that a louder sound travels faster.",
      "Claiming sound travels fastest in air. It is slowest in gases and fastest in solids."
    ]
  },
  {
    "id": "C3",
    "section": "C",
    "title": "Electromagnetic Waves",
    "tagline": "The family of waves that includes light, what they all share, and how the members differ.",
    "summary": "The family of waves that includes light, what they all share, and how the members differ.",
    "whyItMatters": "Organises the electromagnetic spectrum by wavelength and frequency and connects each region with characteristic sources, properties and uses.",
    "objectives": [
      [
        "C3.1",
        "state the properties of e.m. waves"
      ],
      [
        "C3.2",
        "differentiate between types of e.m. waves in terms of their wavelengths"
      ],
      [
        "C3.3",
        "identify a source and use of each type of e.m. wave"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Speed of electromagnetic waves",
        "equation": "c = 3 × 10⁸ m/s",
        "symbols": "c is the speed of all electromagnetic waves in a vacuum",
        "unit": "m/s",
        "condition": "Use it with v = fλ to find a wavelength from a frequency, or the reverse."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "Electromagnetic waves are a family of transverse waves that all travel at the same speed in a vacuum, 3 × 10⁸ m/s, and all can travel through a vacuum because they need no material medium. Light is the part of the family the eye can detect.",
          "The regions of the spectrum are arranged by wavelength and frequency, and the whole range is called the electromagnetic spectrum. In order of increasing frequency, and so decreasing wavelength: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. Learning them in order is the single most useful piece of memorising in the section.",
          "Because v = fλ and the speed is the same for all of them, a longer wavelength always means a lower frequency. The higher-frequency members carry more energy, which is why X-rays and gamma rays are dangerous while radio waves are not.",
          "Each member has characteristic sources and uses that follow from its energy and wavelength. Radio waves pass easily through buildings and are used for broadcasting. Microwaves are absorbed by water molecules and are used for cooking and for mobile telephones. Infrared is emitted by anything warm and is used in remote controls and thermal imaging. Ultraviolet from the Sun causes tanning and sunburn. X-rays pass through soft tissue but not bone, giving radiographs. Gamma rays come from radioactive nuclei and are used to sterilise equipment and to treat cancer."
        ]
      }
    ],
    "objectiveCards": {
      "C3.1": {
        "inShort": "All electromagnetic waves are transverse, can travel through a vacuum, travel at 3 × 10^8 m/s in a vacuum, carry energy, and can show wave behaviours such as reflection, refraction, diffraction and interference. Regions of the spectrum are distinguished by wavelength and frequency.",
        "detail": "The shared properties are the important idea. Electromagnetic waves do not require a material medium, which is why energy from the Sun can cross space. In a vacuum every region of the spectrum travels at the same speed, c = 3 × 10^8 m/s. In materials their speeds can differ from the vacuum value, and different wavelengths may be refracted by different amounts.",
        "formula": "",
        "howAsked": "'State THREE properties common to all electromagnetic waves.' One mark each, so give the speed in a vacuum, transverse, and no medium required, and add that they carry energy if a fourth is wanted.",
        "watchOut": "Listing properties of light specifically rather than of the whole family."
      },
      "C3.2": {
        "inShort": "In order of increasing frequency and decreasing wavelength: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.",
        "detail": "Because c = fλ in a vacuum, increasing frequency corresponds to decreasing wavelength. The sequence from longest wavelength to shortest is radio, microwave, infrared, visible, ultraviolet, X-ray and gamma. Within visible light, red has a longer wavelength and lower frequency than violet. Higher-frequency electromagnetic radiation also corresponds to greater photon energy, although the spectrum-ordering objective is fundamentally about wavelength and frequency.",
        "formula": "",
        "howAsked": "'Arrange these electromagnetic waves in order of increasing wavelength' is one possible question form. Read whether it asks for increasing or decreasing, and whether it means wavelength or frequency, because those reverse each other.",
        "watchOut": "Reversing the order. Writing the visible colours in the wrong order within the band."
      },
      "C3.3": {
        "inShort": "Radio waves, from a transmitting aerial, used for broadcasting. Microwaves, from a magnetron, used for cooking and mobile telephones. Infrared, from any warm body, used in remote controls and thermal imaging. Visible light, from the Sun and lamps, used for seeing and in optical fibres. Ultraviolet, from the Sun, used in sterilising and security marking. X-rays, from an X-ray tube, used for radiographs. Gamma rays, from radioactive nuclei, used in sterilising equipment and treating cancer.",
        "detail": "Pair each use with the property that makes it possible, because that is what a better answer shows. Microwaves cook because water molecules absorb them strongly and warm. X-rays image bone because they pass through soft tissue and are absorbed by denser material. Gamma rays sterilise because their high energy kills bacteria. Infrared suits remote controls because it is easily produced, harmless and blocked by walls, so it stays in the room.",
        "formula": "",
        "howAsked": "'State ONE source and ONE use of each type of electromagnetic wave', often as a table to complete. Each cell is a mark, so fill every one.",
        "watchOut": "Giving the same use twice for two different members. Naming the Sun as the source for everything, which earns little credit."
      }
    },
    "practicals": [
      "Detect infrared beyond the red end of a spectrum produced by a prism, using a blackened thermometer bulb.",
      "Show that a television remote control emits something invisible by viewing it through a phone camera."
    ],
    "commonMistakes": [
      "Giving the spectrum out of order, most often putting ultraviolet on the wrong side of visible light.",
      "Saying different electromagnetic waves travel at different speeds in a vacuum. They do not.",
      "Confusing microwaves with radio waves in a question about mobile telephones."
    ]
  },
  {
    "id": "C4",
    "section": "C",
    "title": "Light Waves",
    "tagline": "How scientists decided what light is, then the behaviour of light rays: straight lines, reflection, refraction, dispersion and total internal reflection.",
    "summary": "How scientists decided what light is, then the behaviour of light rays: straight lines, reflection, refraction, dispersion and total internal reflection.",
    "whyItMatters": "Develops reflection, refraction, interference, diffraction, Snell's law, critical angle and total internal reflection using ray and wave models.",
    "objectives": [
      [
        "C4.1",
        "compare the rival theories of light held by scientists"
      ],
      [
        "C4.2",
        "conduct a Young’s double slit experiment to show that light is a wave"
      ],
      [
        "C4.3",
        "explain why the diffraction of light is not normally observed"
      ],
      [
        "C4.4",
        "apply the principle that light travels in straight lines"
      ],
      [
        "C4.5",
        "apply the laws of reflection"
      ],
      [
        "C4.6",
        "describe the formation of images in a plane mirror"
      ],
      [
        "C4.7",
        "give examples of observations which indicate that light can be refracted"
      ],
      [
        "C4.8",
        "describe the refraction of light rays"
      ],
      [
        "C4.9",
        "describe how a prism may be used to produce a spectrum"
      ],
      [
        "C4.10",
        "apply Snell’s Law"
      ],
      [
        "C4.11",
        "explain ‘critical angle’ and ‘total internal reflection’"
      ],
      [
        "C4.12",
        "relate critical angles to total internal reflection"
      ],
      [
        "C4.13",
        "draw diagrams illustrating applications of total internal reflection"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Laws of reflection",
        "equation": "angle of incidence = angle of reflection",
        "symbols": "both angles measured from the normal",
        "unit": "degrees",
        "condition": "Always measure from the normal, the line at right angles to the surface, never from the surface itself."
      },
      {
        "name": "Snell's law",
        "equation": "n = sin i / sin r",
        "symbols": "n is the refractive index, i the angle of incidence, r the angle of refraction",
        "unit": "n has no unit",
        "condition": "For light going from air into the medium. Refractive index of water is about 1.33 and of glass about 1.5."
      },
      {
        "name": "Refractive index and speed",
        "equation": "n = speed of light in vacuum / speed of light in the medium",
        "symbols": "n is the refractive index",
        "unit": "no unit",
        "condition": "A larger refractive index means light travels more slowly in that medium."
      },
      {
        "name": "Critical angle",
        "equation": "sin c = 1 / n",
        "symbols": "c is the critical angle, n the refractive index",
        "unit": "c in degrees",
        "condition": "Glass of refractive index 1.5 has a critical angle of about 42°."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "The nature of light was argued over for centuries. Newton held that light is a stream of particles, which explains why it travels in straight lines and casts sharp shadows. Huygens held that it is a wave, which explains why two beams can pass through each other undisturbed. Young settled the argument for waves in 1801 by passing light through two narrow slits and producing a pattern of bright and dark bands, which only interference of waves can explain. Then in the twentieth century Einstein showed that light also behaves as particles in the photoelectric effect, so the modern answer is that light behaves as both.",
          "Diffraction of light is not usually noticed because it is only obvious when the gap is comparable in size to the wavelength, and light's wavelength is under a millionth of a metre. Sound diffracts around a doorway because its wavelength is about the same size as the doorway.",
          "For most practical purposes light can be treated as travelling in straight lines, which are drawn as rays. That single assumption explains shadows, eclipses and the inverted image in a pinhole camera.",
          "When light meets a surface it reflects, obeying two laws: the angle of incidence equals the angle of reflection, and the incident ray, the reflected ray and the normal all lie in the same plane. A plane mirror forms an image that is upright, the same size as the object, as far behind the mirror as the object is in front, laterally inverted, and virtual, meaning the rays only appear to come from it.",
          "When light passes from one transparent medium into another it changes speed, and if it meets the surface at an angle it changes direction as well. That is refraction, and it explains why a pool looks shallower than it is and why a straw in a glass appears bent. Snell's law fixes the amount, through the refractive index.",
          "Going from a dense medium into a less dense one, the ray bends away from the normal, and past a certain angle of incidence it cannot leave at all and is reflected back inside. That angle is the critical angle, and the effect is total internal reflection, which is what makes optical fibres, periscopes and endoscopes work."
        ]
      }
    ],
    "objectiveCards": {
      "C4.1": {
        "inShort": "Newton developed a particle model of light, while Huygens developed a wave model. Interference and diffraction provided strong evidence for wave behaviour. Later experiments such as the photoelectric effect showed that light also exchanges energy in particle-like packets, so modern physics uses wave and photon descriptions depending on the phenomenon.",
        "detail": "Scientific models are judged by the evidence they explain. Newton's corpuscular model helped account for straight-line propagation and reflection. Huygens' wave model explained wavefront behaviour. Young's interference experiment and later diffraction evidence strongly supported the wave model. Twentieth-century quantum experiments showed that light also transfers energy in discrete photons. The modern description therefore has wave-particle duality rather than one older model simply erasing the other.",
        "formula": "",
        "howAsked": "'Compare the rival theories of light held by Newton and Huygens' or 'state the evidence that light is a wave'. Marks are for each theory, the evidence, and the modern dual view.",
        "watchOut": "Saying the wave theory simply replaced the particle theory. The syllabus notes that twentieth century experiments restored the particle description alongside it."
      },
      "C4.2": {
        "inShort": "Pass monochromatic light through two narrow, closely spaced slits and observe alternating bright and dark fringes on a screen. The pattern results from constructive and destructive interference, which is clear evidence of the wave behaviour of light.",
        "detail": "The two slits act as coherent sources. Where the waves arrive in phase, their amplitudes reinforce and a bright fringe forms. Where they arrive out of phase by half a wavelength, destructive interference produces a dark fringe. Narrow slits allow diffraction so the two wave patterns overlap. A single-colour source gives a clear, stable fringe pattern.",
        "formula": "",
        "howAsked": "Asked as a description of the experiment with a diagram, or as an explanation of the pattern. Marks are for the arrangement, the observation of alternating bright and dark fringes, and the explanation in terms of constructive and destructive interference.",
        "watchOut": "Describing the pattern without explaining it. The dark fringes are the evidence, because particles could not cancel each other out."
      },
      "C4.3": {
        "inShort": "Diffraction is most noticeable when the width of a gap or obstacle is comparable with the wavelength. Visible-light wavelengths are extremely small compared with ordinary doorways and openings, so everyday spreading is difficult to notice, even though light does diffract.",
        "detail": "The amount of diffraction depends on the ratio of wavelength to the size of the gap or obstacle. Sound has wavelengths comparable with everyday openings, so it spreads noticeably around doors and corners. Visible light has wavelengths of only a few hundred nanometres, so a much narrower slit is needed before the spreading becomes obvious.",
        "formula": "",
        "howAsked": "'Explain why the diffraction of light is not normally observed.' The mark requires the comparison of the wavelength of light with the size of the opening.",
        "watchOut": "Saying light does not diffract. It does; the effect is simply too small to notice with ordinary gaps."
      },
      "C4.4": {
        "inShort": "Light travels in straight lines, drawn as rays. This explains sharp shadows, eclipses, and the inverted image formed by a pinhole camera.",
        "detail": "A small source gives a sharp shadow called the umbra. A large source gives an umbra with a partial shadow around it, the penumbra, because part of the source is still visible from there. A solar eclipse occurs when the Moon passes between the Sun and the Earth, blocking the light; a lunar eclipse when the Earth comes between the Sun and the Moon. In a pinhole camera, light from the top of the object travels in a straight line through the hole to the bottom of the screen and light from the bottom to the top, so the image is inverted. Widening the hole makes the image brighter but blurred, because each point on the object now sends light to a patch rather than a point.",
        "formula": "",
        "howAsked": "'Explain, with the aid of a diagram, how a pinhole camera forms an image' or an eclipse diagram to complete. Marks are for straight rays drawn with a ruler and arrows showing direction.",
        "watchOut": "Drawing rays freehand or without arrows. Forgetting to say why the image is inverted."
      },
      "C4.5": {
        "inShort": "The angle of incidence equals the angle of reflection, and the incident ray, the reflected ray and the normal all lie in the same plane. Both angles are measured from the normal.",
        "detail": "The normal is the construction line drawn at right angles to the surface at the point where the ray strikes, and every angle in reflection and refraction is measured from it. A ray striking a mirror at 30° to the normal leaves at 30° to the normal on the other side of it. When several mirrors are involved, apply the law at each surface in turn, redrawing the normal each time. A rough surface still obeys the law at every point, but because the surface tilts differently from point to point the reflected rays scatter, which is called diffuse reflection and is why most objects are visible from any direction.",
        "formula": "angle of incidence = angle of reflection",
        "howAsked": "'Complete the ray diagram to show the reflected ray' or a calculation of an angle after one or two mirrors. Draw and label the normal first; it is often a mark on its own.",
        "watchOut": "Measuring from the mirror surface. An angle of 30° to the surface is 60° to the normal, and confusing them reverses the answer."
      },
      "C4.6": {
        "inShort": "The image in a plane mirror is virtual, upright, the same size as the object, as far behind the mirror as the object is in front, and laterally inverted, meaning left and right are exchanged.",
        "detail": "Virtual means the rays do not actually pass through the image; they only appear to come from it, so it cannot be caught on a screen. Draw it by reflecting the object point perpendicular to the mirror to an equal distance behind, then joining that image point to the eye with straight lines and marking the part in front of the mirror as the real path and the part behind as a dashed construction. Lateral inversion is what makes writing appear reversed in a mirror and why AMBULANCE is painted backwards on the front of the vehicle.",
        "formula": "",
        "howAsked": "'State THREE characteristics of the image formed in a plane mirror', or a ray diagram to construct. The dashed lines behind the mirror are usually a mark, because they show you know the image is virtual.",
        "watchOut": "Drawing the rays behind the mirror as solid lines. Calling the image inverted rather than laterally inverted; it is not upside down."
      },
      "C4.7": {
        "inShort": "A straw in a glass of water appears bent at the surface. A swimming pool looks shallower than it is. A coin at the bottom of a cup, hidden by the rim, becomes visible when water is poured in. A road appears wet on a hot day. All are caused by light changing direction as it changes speed between media.",
        "detail": "Each observation is worth learning as a ready example. The apparent depth effect is the one most often asked: light from the bottom of the pool bends away from the normal as it leaves the water, so it reaches the eye at a steeper angle and the brain, assuming straight-line travel, places the bottom higher than it is. The mirage on a hot road is refraction in air of varying temperature and density rather than at a sharp boundary, and the syllabus lists it as an observation rather than asking for the full explanation.",
        "formula": "",
        "howAsked": "'Give TWO observations which indicate that light can be refracted.' Naming the observation is the mark; a brief reason improves it.",
        "watchOut": "Offering an example of reflection, such as seeing yourself in water, in a question about refraction."
      },
      "C4.8": {
        "inShort": "Light entering a denser medium slows down and bends towards the normal. Light leaving into a less dense medium speeds up and bends away from the normal. A ray passing through a rectangular block emerges parallel to its original direction but displaced sideways, which is called lateral displacement.",
        "detail": "Refraction happens because the light changes speed, and the change of direction follows from that. The two rules are worth memorising as a pair: towards the normal on entering a denser medium, away from it on leaving. A ray entering a rectangular glass block bends towards the normal at the first face and away from it by the same amount at the second, so the two changes cancel in direction but leave the ray shifted to one side. A ray meeting the surface along the normal, at 0°, passes through without bending, although it still changes speed.",
        "formula": "",
        "howAsked": "'Complete the path of the ray through the glass block.' Marks are for bending the right way at each surface, for the emergent ray being parallel to the incident ray, and for showing the lateral displacement.",
        "watchOut": "Bending the ray away from the normal on entering glass. Forgetting that a ray along the normal does not bend at all."
      },
      "C4.9": {
        "inShort": "Pass a narrow beam of white light through a triangular glass prism onto a screen. It emerges spread into a band of colours, red at one end and violet at the other. This happens because the glass refracts each colour by a different amount, violet most and red least, and the effect is called dispersion.",
        "detail": "White light is a mixture of colours, and each has a different wavelength and travels at a slightly different speed in glass, so each has a slightly different refractive index. Violet slows most and bends most; red slows least and bends least. The prism shape matters: unlike a rectangular block, its two refracting faces are not parallel, so the separation produced at the first face is increased at the second rather than cancelled. Newton showed the colours are in the light and not added by the glass by passing the spectrum through a second, inverted prism and recombining it into white light.",
        "formula": "",
        "howAsked": "'Describe how a prism may be used to produce a spectrum' or 'name the colours in order'. Marks are for the white light source, the prism, the screen, the order of the colours, and dispersion as the name of the effect.",
        "watchOut": "Saying the prism adds the colours. It separates colours already present."
      },
      "C4.10": {
        "inShort": "Snell's law: n = sin i / sin r, where i is the angle of incidence in air, r the angle of refraction in the medium, and n the refractive index. Light entering water of refractive index 1.33 at 40° refracts at sin⁻¹(sin 40° / 1.33) = 28.9°.",
        "detail": "Refractive index also equals the speed of light in a vacuum divided by its speed in the medium, so a larger n means a slower speed and more bending. Both angles are measured from the normal. When light travels the other way, out of the medium into air, the formula inverts: n = sin r / sin i with r now in air. The experiment that measures n is worth knowing: trace rays through a rectangular block with pins for several angles, plot sin i against sin r, and the gradient of the straight line is the refractive index.",
        "formula": "n = sin i / sin r;  n = c / v",
        "howAsked": "'Calculate the angle of refraction' or 'determine the refractive index of the glass'. Marks are for the substitution, the inverse sine and the answer in degrees. A graph question expects sin i against sin r with the gradient as n.",
        "watchOut": "Inverting the ratio when the light leaves the medium. Working in radians because the calculator was left in the wrong mode."
      },
      "C4.11": {
        "inShort": "The critical angle is the angle of incidence inside the denser medium for which the angle of refraction in the less dense medium is exactly 90°. Total internal reflection is what happens beyond it: all the light is reflected back inside the denser medium and none escapes.",
        "detail": "Increase the angle of incidence inside a block of glass and the refracted ray bends further from the normal, growing weaker as more light is reflected. At the critical angle the refracted ray grazes along the surface at 90°. Beyond it there is no refracted ray at all and the surface behaves as a perfect mirror. Two conditions must both hold: the light must be travelling from a denser medium into a less dense one, and the angle of incidence must exceed the critical angle. Both are usually needed for full marks.",
        "formula": "",
        "howAsked": "'Explain the terms critical angle and total internal reflection.' State both conditions for total internal reflection, because the question almost always wants them.",
        "watchOut": "Omitting the condition that the light must be going from denser to less dense. Saying 'most' of the light is reflected; at that point all of it is."
      },
      "C4.12": {
        "inShort": "sin c = 1 / n, where c is the critical angle and n the refractive index. Glass of refractive index 1.5 has a critical angle of sin⁻¹(1/1.5) = 41.8°, so a ray striking the inside surface at more than about 42° is totally internally reflected.",
        "detail": "The formula comes straight from Snell's law with the angle of refraction set to 90°, since sin 90° = 1. A denser medium has a larger refractive index and therefore a smaller critical angle, which is why diamond, with n about 2.4 and a critical angle near 24°, traps light so effectively and sparkles. Water, with n about 1.33, has a critical angle near 49°.",
        "formula": "sin c = 1 / n",
        "howAsked": "'Calculate the critical angle for the material' or, given the critical angle, 'determine the refractive index'. Both directions are examined, so be able to rearrange.",
        "watchOut": "Using n rather than 1/n. A critical angle greater than 90° means the formula was inverted."
      },
      "C4.13": {
        "inShort": "A periscope uses two 45° prisms to turn light through 90° twice. An optical fibre keeps light inside a thin glass core by repeated total internal reflection along its length. An endoscope is a bundle of such fibres used to see inside the body.",
        "detail": "In the periscope, light meets the sloping face of the prism at 45°, which is greater than the critical angle for glass of about 42°, so it is totally internally reflected. Prisms are used rather than mirrors because they give a brighter image with no double reflections from a silvered backing. In an optical fibre the light enters at a shallow angle and strikes the wall well above the critical angle every time, so it travels the length of the fibre with almost no loss even round bends. An endoscope carries two bundles, one to send light in and one to bring the image back.",
        "formula": "",
        "howAsked": "'Draw a labelled diagram to show how total internal reflection is used in a periscope' or the same for an optical fibre. Marks are for the ray path, the 45° angles or the shallow angle in the fibre, and the label naming total internal reflection.",
        "watchOut": "Drawing the ray leaving the fibre at a bend. Labelling the prism faces as mirrors, which misses the point of the question."
      }
    },
    "practicals": [
      "Trace rays through a rectangular glass block with pins, measure the angles of incidence and refraction, and plot sin i against sin r to find the refractive index.",
      "Use a ray box and a plane mirror to check that the angle of incidence equals the angle of reflection.",
      "Send white light through a triangular prism onto a screen and observe the spectrum.",
      "Increase the angle of incidence inside a semicircular block until the refracted ray disappears, to find the critical angle."
    ],
    "commonMistakes": [
      "Measuring angles from the surface instead of from the normal.",
      "Drawing the refracted ray bending the wrong way. Into a denser medium it bends towards the normal.",
      "Describing the image in a plane mirror as real. It is virtual.",
      "Using Snell's law with the angles the wrong way round when the light leaves the medium."
    ]
  },
  {
    "id": "C5",
    "section": "C",
    "title": "Lenses",
    "tagline": "How converging and diverging lenses bend light, the terms used to describe them, and how the image is found and measured.",
    "summary": "How converging and diverging lenses bend light, the terms used to describe them, and how the image is found and measured.",
    "whyItMatters": "Uses ray diagrams and lens relationships to explain image formation, magnification and the focal length of converging and diverging lenses.",
    "objectives": [
      [
        "C5.1",
        "illustrate the effect of converging and diverging lenses on a beam of parallel rays"
      ],
      [
        "C5.2",
        "define the terms: (a) principal axis; (b) principal focus; (c) focal length; (d) focal plane; (e) magnification"
      ],
      [
        "C5.3",
        "differentiate between real and virtual images"
      ],
      [
        "C5.4",
        "apply the equations for magnification"
      ],
      [
        "C5.5",
        "determine the focal length of a converging lens"
      ]
    ],
    "prerequisites": [],
    "formulae": [
      {
        "name": "Magnification",
        "equation": "m = image size / object size = v / u",
        "symbols": "v is the image distance, u the object distance",
        "unit": "no unit",
        "condition": "A magnification less than 1 means the image is smaller than the object."
      },
      {
        "name": "Lens formula",
        "equation": "1/f = 1/u + 1/v",
        "symbols": "f is the focal length, u the object distance, v the image distance",
        "unit": "all three in the same unit of length",
        "condition": "Used with a scale diagram to find the focal length of a converging lens."
      }
    ],
    "sections": [
      {
        "id": "overview",
        "heading": "Topic explained",
        "paragraphs": [
          "A converging lens is thicker in the middle than at the edges and brings a beam of parallel rays together at a point. A diverging lens is thinner in the middle and spreads a parallel beam out, so that the rays appear to come from a point behind the lens.",
          "The vocabulary is fixed and is examined directly. The principal axis is the line through the centre of the lens at right angles to its faces. The principal focus is the point on that axis where parallel rays converge, or appear to diverge from. The focal length is the distance from the centre of the lens to the principal focus. The focal plane is the plane through the principal focus at right angles to the axis. Magnification is how many times larger the image is than the object.",
          "An image is real if the rays actually meet there, so it can be caught on a screen. It is virtual if the rays only appear to come from it, so it cannot. A converging lens forms a real image when the object is beyond the principal focus, and a virtual, magnified, upright image when the object is closer than the principal focus, which is how a magnifying glass works. A diverging lens always forms a virtual image.",
          "Ray diagrams are constructed with two standard rays. A ray parallel to the principal axis is refracted through the principal focus. A ray through the centre of the lens continues undeviated. Where the two cross is where the image is, and drawing them accurately with a ruler earns most of the marks."
        ]
      }
    ],
    "objectiveCards": {
      "C5.1": {
        "inShort": "A converging lens brings a beam of parallel rays together at the principal focus on the far side. A diverging lens spreads a parallel beam out so that the rays appear to come from a principal focus on the same side as the incoming light.",
        "detail": "Draw both with a ray box and three parallel rays. For the converging lens the rays cross at a real point beyond the lens, and a screen placed there shows a bright spot. For the diverging lens the emerging rays never meet; extended backwards as dashed lines they meet at a point in front of the lens, so its principal focus is virtual. That is why a converging lens can burn paper in sunlight and a diverging lens cannot.",
        "formula": "",
        "howAsked": "'Illustrate the effect of a converging lens on a beam of parallel rays' with a diagram. Marks are for the rays parallel before the lens, converging after it, meeting at a labelled principal focus, and arrows showing direction.",
        "watchOut": "Drawing the diverging lens rays meeting after the lens. They spread, and the focus is found by extending them backwards."
      },
      "C5.2": {
        "inShort": "Principal axis: the line through the centre of the lens, perpendicular to its faces. Principal focus: the point on the principal axis where rays parallel to it converge, or appear to diverge from. Focal length: the distance from the centre of the lens to the principal focus. Focal plane: the plane through the principal focus perpendicular to the principal axis. Magnification: the ratio of image size to object size.",
        "detail": "Learn these as five short sentences, because they are asked as a list and each is worth a mark. Two carry conditions that are easily dropped. The principal focus is defined for rays parallel to the principal axis, not for any parallel rays, and the phrase 'or appear to diverge from' is what makes the definition cover diverging lenses as well. The focal plane matters because rays parallel to each other but not to the axis converge on that plane rather than at the principal focus itself.",
        "formula": "",
        "howAsked": "'Define the following terms: principal axis, principal focus, focal length.' One mark each and no working needed, which makes this a direct definition-style task.",
        "watchOut": "Defining focal length as the distance from the lens to the image. That is the image distance, which changes with the object; the focal length is fixed."
      },
      "C5.3": {
        "inShort": "A real image is formed where the rays actually meet, so it can be caught on a screen and is inverted. A virtual image is formed where the rays only appear to come from, so it cannot be caught on a screen and is upright.",
        "detail": "The screen test is the clearest way to tell them apart, and the phrase 'can be formed on a screen' is what examiners look for. The image on a cinema screen is real. The image in a plane mirror and the enlarged image seen through a magnifying glass are virtual. In a ray diagram, real rays are drawn as solid lines with arrows and virtual constructions as dashed lines, and using the right kind of line is often a mark.",
        "formula": "",
        "howAsked": "'Differentiate between a real and a virtual image.' Give the screen test and whether the image is upright or inverted, which is two marks rather than one.",
        "watchOut": "Saying a virtual image cannot be seen. It can be seen by the eye; it just cannot be projected onto a screen."
      },
      "C5.4": {
        "inShort": "Magnification = image size ÷ object size, and also equals image distance ÷ object distance, m = v / u. An object 2 cm tall producing an image 6 cm tall has a magnification of 3.",
        "detail": "The two forms are interchangeable, so a question giving distances can be answered without knowing the sizes, and one giving sizes without knowing the distances. Magnification has no unit because it is a ratio, and both quantities in the ratio must be in the same unit. A value greater than 1 means the image is larger than the object, and a value less than 1 means it is smaller, which is the normal case for a camera.",
        "formula": "m = image size / object size = v / u",
        "howAsked": "'Calculate the magnification produced by the lens' or, given the magnification and object size, 'calculate the size of the image'. Marks are for the correct ratio, the substitution and the recognition that magnification has no unit.",
        "watchOut": "Dividing object by image. Attaching a unit such as cm to the answer."
      },
      "C5.5": {
        "inShort": "Focus an illuminated object onto a screen with the lens, measure the object distance u and the image distance v, and substitute into 1/f = 1/u + 1/v. A quick approximate method is to focus a distant object onto a screen: the lens to screen distance is then the focal length.",
        "detail": "For the accurate method, set the illuminated object, the lens and the screen on a metre rule. Move the lens until a sharp image forms, then record u and v. Repeat for several object distances and take the mean of the values of f, or plot 1/v against 1/u, which gives a straight line whose intercepts are both 1/f. The distant object method works because rays from a far away object arrive effectively parallel, so they converge at the principal focus, and it is accurate enough to set a starting point for the full experiment. A scale ray diagram gives a third route: draw the two standard rays to scale and measure the focal length off the drawing.",
        "formula": "1/f = 1/u + 1/v",
        "howAsked": "'Describe an experiment to determine the focal length of a converging lens.' Marks are for the arrangement, the measurements, the repetition, and the calculation or graph. A calculation question gives two of u, v and f and asks for the third.",
        "watchOut": "Mixing centimetres and metres in the formula. Forgetting that the answer for f from a single pair of readings should be repeated and averaged."
      }
    },
    "practicals": [
      "Focus a distant object onto a screen with a converging lens and measure the lens to screen distance, which is approximately the focal length.",
      "Place an illuminated object at several measured distances, focus the image on a screen each time, and use the lens formula to find f.",
      "Draw scale ray diagrams for an object at different distances and compare the predicted image with the one observed."
    ],
    "commonMistakes": [
      "Drawing the rays bending at the front and back surfaces separately. At this level they are drawn bending once at the centre line of the lens.",
      "Forgetting arrows on the rays, or drawing them freehand.",
      "Calling a magnified image real when the object is inside the focal length. It is virtual.",
      "Mixing units in the lens formula, such as u in centimetres and f in metres."
    ]
  }
]);
