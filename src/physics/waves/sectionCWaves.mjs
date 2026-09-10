import { SECTION_C_WAVES_OPTICS_LESSONS } from '../course/sectionCWavesOpticsLessons.mjs';

export const SECTION_C_OBJECTIVES = Object.freeze(Object.fromEntries(SECTION_C_WAVES_OPTICS_LESSONS.flatMap(topic => topic.objectives)));
const SPECS = [
  {
    "objective": "C1.1",
    "profile": "KC",
    "stem": "Which statement correctly distinguishes a transverse wave from a longitudinal wave?",
    "correct": "In a transverse wave particles vibrate perpendicular to the direction of travel, while in a longitudinal wave they vibrate parallel to it.",
    "distractors": [
      "Transverse waves require matter but longitudinal waves travel through a vacuum.",
      "Transverse waves transfer matter while longitudinal waves transfer energy only.",
      "Transverse waves always move faster than longitudinal waves."
    ],
    "explanation": "Wave type is defined by the direction of particle vibration relative to wave travel.",
    "tags": []
  },
  {
    "objective": "C1.1",
    "profile": "KC",
    "stem": "Which pair contains one transverse wave followed by one longitudinal wave?",
    "correct": "Light, then sound in air",
    "distractors": [
      "Sound in air, then light",
      "Sound in air, then sound in water",
      "Light, then radio waves"
    ],
    "explanation": "Light is transverse. Sound in a material medium is longitudinal.",
    "tags": []
  },
  {
    "objective": "C1.1",
    "profile": "KC",
    "stem": "A compression in a slinky is a region where the coils are",
    "correct": "closer together than their normal spacing.",
    "distractors": [
      "farther apart than normal.",
      "moving permanently with the wave.",
      "at a crest above the rest position."
    ],
    "explanation": "Compressions are regions of increased particle density in a longitudinal wave.",
    "tags": []
  },
  {
    "objective": "C1.1",
    "profile": "KC",
    "stem": "A pulse differs from a progressive wave because a pulse is",
    "correct": "a single travelling disturbance.",
    "distractors": [
      "a wave that never transfers energy.",
      "always longitudinal.",
      "a stationary pattern with no travel."
    ],
    "explanation": "A pulse is a single disturbance, while a progressive wave is a continuing train of disturbances.",
    "tags": []
  },
  {
    "objective": "C1.2",
    "profile": "UK",
    "stem": "A wave has frequency 50 Hz and wavelength 0.40 m. Its speed is",
    "correct": "20 m/s",
    "distractors": [
      "0.008 m/s",
      "125 m/s",
      "200 m/s"
    ],
    "explanation": "Using v = fλ gives 50 × 0.40 = 20 m/s.",
    "tags": []
  },
  {
    "objective": "C1.2",
    "profile": "UK",
    "stem": "A wave has period 0.020 s. Its frequency is",
    "correct": "50 Hz",
    "distractors": [
      "0.020 Hz",
      "20 Hz",
      "500 Hz"
    ],
    "explanation": "f = 1/T = 1/0.020 = 50 Hz.",
    "tags": []
  },
  {
    "objective": "C1.2",
    "profile": "KC",
    "stem": "The amplitude of a wave is the",
    "correct": "maximum displacement from the rest position.",
    "distractors": [
      "distance from crest to trough.",
      "distance between consecutive crests.",
      "number of waves passing a point each second."
    ],
    "explanation": "Amplitude is measured from the equilibrium position to a crest or trough.",
    "tags": []
  },
  {
    "objective": "C1.2",
    "profile": "UK",
    "stem": "A wave enters a different medium. Which quantity is fixed by the source and stays unchanged?",
    "correct": "frequency",
    "distractors": [
      "speed",
      "wavelength",
      "amplitude in every case"
    ],
    "explanation": "Frequency is set by the source. Speed and wavelength can change at a boundary.",
    "tags": []
  },
  {
    "objective": "C1.3",
    "profile": "KC",
    "stem": "On a displacement-position graph, the horizontal distance between consecutive crests represents the",
    "correct": "wavelength.",
    "distractors": [
      "period.",
      "frequency.",
      "amplitude."
    ],
    "explanation": "A displacement-position graph is a spatial snapshot, so crest spacing is wavelength.",
    "tags": []
  },
  {
    "objective": "C1.3",
    "profile": "KC",
    "stem": "On a displacement-time graph, the horizontal interval between consecutive crests represents the",
    "correct": "period.",
    "distractors": [
      "wavelength.",
      "wave speed.",
      "amplitude."
    ],
    "explanation": "The horizontal axis is time, so crest-to-crest separation is one period.",
    "tags": []
  },
  {
    "objective": "C1.3",
    "profile": "UK",
    "stem": "A student sees a sinusoidal graph and immediately labels the crest spacing as wavelength. What should the student check first?",
    "correct": "The label and unit on the horizontal axis.",
    "distractors": [
      "Whether the wave is loud.",
      "Whether the line is drawn in blue.",
      "Whether the source is moving."
    ],
    "explanation": "The same shaped curve can represent displacement against position or displacement against time.",
    "tags": []
  },
  {
    "objective": "C1.3",
    "profile": "UK",
    "stem": "A longitudinal wave can be represented by a displacement curve because the curve shows",
    "correct": "particle displacement from equilibrium, not the physical shape of the wave.",
    "distractors": [
      "the wave changing into a transverse wave.",
      "the material moving permanently forward.",
      "only the pressure and never displacement."
    ],
    "explanation": "A graph is a representation of a quantity, not a picture of the physical wave shape.",
    "tags": []
  },
  {
    "objective": "C2.1",
    "profile": "KC",
    "stem": "Sound is produced when a source",
    "correct": "vibrates and creates pressure disturbances in a medium.",
    "distractors": [
      "creates light that turns into sound.",
      "moves all air particles from the source to the listener.",
      "raises the air temperature above boiling point."
    ],
    "explanation": "A vibrating source creates alternating compressions and rarefactions that travel through the medium.",
    "tags": []
  },
  {
    "objective": "C2.1",
    "profile": "UK",
    "stem": "Why does sound from an electric bell fade as air is removed from a bell jar?",
    "correct": "There are fewer particles to pass the pressure disturbance from one region to another.",
    "distractors": [
      "The bell stops vibrating because vacuum has no gravity.",
      "Sound becomes transverse in low pressure.",
      "The speed of light decreases."
    ],
    "explanation": "Sound needs a material medium. Removing particles reduces transmission.",
    "tags": []
  },
  {
    "objective": "C2.1",
    "profile": "KC",
    "stem": "Sound in air is best described as",
    "correct": "a longitudinal mechanical wave.",
    "distractors": [
      "a transverse electromagnetic wave.",
      "a longitudinal electromagnetic wave.",
      "a transverse wave that needs no medium."
    ],
    "explanation": "Sound requires a medium and involves particle vibration parallel to propagation.",
    "tags": []
  },
  {
    "objective": "C2.1",
    "profile": "KC",
    "stem": "In a sound wave, a rarefaction is a region where air particles are",
    "correct": "more spread out than normal.",
    "distractors": [
      "more closely packed than normal.",
      "stationary forever.",
      "moving at the speed of light."
    ],
    "explanation": "Rarefactions are low-density regions between compressions.",
    "tags": []
  },
  {
    "objective": "C2.2",
    "profile": "KC",
    "stem": "The pitch of a sound is mainly determined by its",
    "correct": "frequency.",
    "distractors": [
      "amplitude.",
      "speed only.",
      "distance from the source."
    ],
    "explanation": "Higher frequency corresponds to higher pitch.",
    "tags": []
  },
  {
    "objective": "C2.2",
    "profile": "KC",
    "stem": "The loudness of a sound is mainly related to its",
    "correct": "amplitude.",
    "distractors": [
      "frequency only.",
      "wavelength only.",
      "period only."
    ],
    "explanation": "Greater amplitude means greater energy transfer and is perceived as greater loudness.",
    "tags": []
  },
  {
    "objective": "C2.2",
    "profile": "UK",
    "stem": "Two sound traces have the same frequency but different amplitudes. They differ mainly in",
    "correct": "loudness.",
    "distractors": [
      "pitch.",
      "wave type.",
      "whether they can travel through air."
    ],
    "explanation": "Same frequency gives the same pitch, while different amplitude changes loudness.",
    "tags": []
  },
  {
    "objective": "C2.2",
    "profile": "KC",
    "stem": "Which frequency is above the normal upper limit of human hearing?",
    "correct": "25 kHz",
    "distractors": [
      "25 Hz",
      "250 Hz",
      "2.5 kHz"
    ],
    "explanation": "The usual audible range is about 20 Hz to 20 kHz.",
    "tags": []
  },
  {
    "objective": "C2.3",
    "profile": "UK",
    "stem": "An echo returns 0.50 s after a shout. Taking the speed of sound as 340 m/s, how far away is the wall?",
    "correct": "85 m",
    "distractors": [
      "170 m",
      "340 m",
      "680 m"
    ],
    "explanation": "The sound travels to the wall and back, so distance to wall = vt/2 = 340 × 0.50 / 2 = 85 m.",
    "tags": []
  },
  {
    "objective": "C2.3",
    "profile": "UK",
    "stem": "Lightning is seen and thunder is heard 5.0 s later. Taking sound speed as 340 m/s, the strike is approximately",
    "correct": "1700 m away.",
    "distractors": [
      "68 m away.",
      "340 m away.",
      "6800 m away."
    ],
    "explanation": "Light travel time is negligible here, so d = vt = 340 × 5.0 = 1700 m.",
    "tags": []
  },
  {
    "objective": "C2.3",
    "profile": "UK",
    "stem": "Why is the distance to a reflecting cliff calculated using vt/2 in an echo experiment?",
    "correct": "The measured time includes the outward and return journeys of the sound.",
    "distractors": [
      "The sound speed is halved at reflection.",
      "Only half the frequency reaches the cliff.",
      "The wavelength doubles at the cliff."
    ],
    "explanation": "The sound travels twice the one-way distance during the measured interval.",
    "tags": []
  },
  {
    "objective": "C2.3",
    "profile": "KC",
    "stem": "Sound generally travels fastest in",
    "correct": "solids.",
    "distractors": [
      "gases.",
      "a vacuum.",
      "empty space at 3 × 10^8 m/s."
    ],
    "explanation": "Closely coupled particles in solids transfer mechanical disturbances rapidly. Sound does not travel in vacuum.",
    "tags": []
  },
  {
    "objective": "C2.4",
    "profile": "KC",
    "stem": "Hearing a person around a doorway before seeing the person is evidence of sound",
    "correct": "diffraction.",
    "distractors": [
      "reflection.",
      "polarisation.",
      "radioactivity."
    ],
    "explanation": "Sound diffracts around openings and obstacles when its wavelength is comparable with their size.",
    "tags": []
  },
  {
    "objective": "C2.4",
    "profile": "KC",
    "stem": "An echo is direct evidence that sound undergoes",
    "correct": "reflection.",
    "distractors": [
      "refraction only.",
      "dispersion.",
      "nuclear decay."
    ],
    "explanation": "An echo is sound reflected from a surface and returning to the listener.",
    "tags": []
  },
  {
    "objective": "C2.4",
    "profile": "KC",
    "stem": "Alternating loud and quiet positions produced by two coherent loudspeakers are evidence of",
    "correct": "interference.",
    "distractors": [
      "thermal expansion.",
      "radioactive decay.",
      "total internal reflection only."
    ],
    "explanation": "Superposition produces constructive and destructive interference.",
    "tags": []
  },
  {
    "objective": "C2.4",
    "profile": "UK",
    "stem": "Sound carrying unusually far at night because layers of air bend the waves is an example of",
    "correct": "refraction.",
    "distractors": [
      "reflection.",
      "diffraction only.",
      "electromagnetic induction."
    ],
    "explanation": "Changes in sound speed with air temperature can refract sound paths.",
    "tags": []
  },
  {
    "objective": "C2.5",
    "profile": "KC",
    "stem": "Ultrasound is sound with frequency",
    "correct": "above about 20 kHz.",
    "distractors": [
      "below 20 Hz only.",
      "between 20 Hz and 20 kHz only.",
      "exactly 340 Hz."
    ],
    "explanation": "Ultrasound is defined by frequency above the normal human audible range.",
    "tags": []
  },
  {
    "objective": "C2.5",
    "profile": "UK",
    "stem": "Why is ultrasound useful for locating a crack inside a metal block?",
    "correct": "Pulses reflect from internal boundaries and the return time gives depth information.",
    "distractors": [
      "Ultrasound turns the crack into visible light.",
      "The metal becomes radioactive at the crack.",
      "Ultrasound passes through every boundary without reflection."
    ],
    "explanation": "Reflections from discontinuities reveal their positions without cutting the material open.",
    "tags": []
  },
  {
    "objective": "C2.5",
    "profile": "KC",
    "stem": "A major advantage of diagnostic ultrasound over X-rays in prenatal imaging is that ultrasound",
    "correct": "is non-ionising.",
    "distractors": [
      "always gives a colour image.",
      "travels through a vacuum faster than light.",
      "has a frequency below human hearing."
    ],
    "explanation": "Diagnostic ultrasound is a non-ionising mechanical wave.",
    "tags": []
  },
  {
    "objective": "C2.5",
    "profile": "UK",
    "stem": "Echo sounding from a ship uses ultrasound mainly to determine",
    "correct": "water depth from the travel time of a reflected pulse.",
    "distractors": [
      "the mass of the ship.",
      "the temperature of the Sun.",
      "the electric current in the engine."
    ],
    "explanation": "The round-trip time and known wave speed give the distance to the seabed.",
    "tags": []
  },
  {
    "objective": "C3.1",
    "profile": "KC",
    "stem": "All electromagnetic waves in a vacuum travel at approximately",
    "correct": "3 × 10^8 m/s.",
    "distractors": [
      "340 m/s.",
      "1500 m/s.",
      "9.8 m/s."
    ],
    "explanation": "All parts of the electromagnetic spectrum have the same speed in vacuum.",
    "tags": []
  },
  {
    "objective": "C3.1",
    "profile": "KC",
    "stem": "Which property is common to all electromagnetic waves?",
    "correct": "They are transverse and can travel through a vacuum.",
    "distractors": [
      "They are longitudinal and require air.",
      "They all have the same wavelength.",
      "They all have the same frequency."
    ],
    "explanation": "Electromagnetic waves are transverse and do not require a material medium.",
    "tags": []
  },
  {
    "objective": "C3.1",
    "profile": "KC",
    "stem": "Which statement about electromagnetic waves is correct?",
    "correct": "They carry energy and can undergo wave behaviours such as reflection and refraction.",
    "distractors": [
      "Only visible light carries energy.",
      "Radio waves require a material medium.",
      "Gamma rays travel slower than radio waves in vacuum."
    ],
    "explanation": "The electromagnetic family shares core wave properties.",
    "tags": []
  },
  {
    "objective": "C3.1",
    "profile": "UK",
    "stem": "Radio waves and gamma rays differ in wavelength and frequency, but in a vacuum they have the same",
    "correct": "speed.",
    "distractors": [
      "frequency.",
      "wavelength.",
      "photon energy."
    ],
    "explanation": "Vacuum speed is common across the spectrum.",
    "tags": []
  },
  {
    "objective": "C3.2",
    "profile": "KC",
    "stem": "Which sequence is in order of increasing frequency?",
    "correct": "radio, microwave, infrared, visible, ultraviolet, X-ray, gamma",
    "distractors": [
      "gamma, X-ray, ultraviolet, visible, infrared, microwave, radio",
      "radio, infrared, microwave, visible, X-ray, ultraviolet, gamma",
      "microwave, radio, visible, infrared, ultraviolet, gamma, X-ray"
    ],
    "explanation": "Increasing frequency corresponds to decreasing wavelength across the standard spectrum order.",
    "tags": []
  },
  {
    "objective": "C3.2",
    "profile": "KC",
    "stem": "Which electromagnetic wave has the shortest wavelength?",
    "correct": "gamma rays",
    "distractors": [
      "radio waves",
      "microwaves",
      "infrared"
    ],
    "explanation": "Gamma rays lie at the highest-frequency, shortest-wavelength end of the spectrum.",
    "tags": []
  },
  {
    "objective": "C3.2",
    "profile": "KC",
    "stem": "Within visible light, which colour has the longer wavelength?",
    "correct": "red",
    "distractors": [
      "violet",
      "ultraviolet",
      "X-ray"
    ],
    "explanation": "Red has a longer wavelength and lower frequency than violet.",
    "tags": []
  },
  {
    "objective": "C3.2",
    "profile": "UK",
    "stem": "If wavelength decreases for an electromagnetic wave in vacuum, its frequency",
    "correct": "increases.",
    "distractors": [
      "decreases.",
      "becomes zero.",
      "stays fixed while speed increases."
    ],
    "explanation": "Since c = fλ and c is fixed in vacuum, frequency and wavelength vary inversely.",
    "tags": []
  },
  {
    "objective": "C3.3",
    "profile": "KC",
    "stem": "Which source-use pairing is correct?",
    "correct": "X-ray tube - medical radiograph",
    "distractors": [
      "radioactive nucleus - microwave cooking",
      "magnetron - gamma cancer treatment",
      "warm body - ultraviolet sterilisation"
    ],
    "explanation": "X-rays from an X-ray tube are used for radiographs.",
    "tags": []
  },
  {
    "objective": "C3.3",
    "profile": "KC",
    "stem": "Infrared radiation is commonly used in",
    "correct": "remote controls and thermal imaging.",
    "distractors": [
      "measuring nuclear half-life.",
      "X-ray radiography.",
      "gamma sterilisation only."
    ],
    "explanation": "Warm bodies emit infrared, which is useful for thermal detection and signalling.",
    "tags": []
  },
  {
    "objective": "C3.3",
    "profile": "KC",
    "stem": "Gamma rays used to sterilise medical equipment are commonly produced by",
    "correct": "radioactive nuclei.",
    "distractors": [
      "a loudspeaker cone.",
      "a liquid-in-glass thermometer.",
      "a vibrating string."
    ],
    "explanation": "Gamma radiation is emitted in nuclear transitions of radioactive sources.",
    "tags": []
  },
  {
    "objective": "C3.3",
    "profile": "UK",
    "stem": "Microwaves are suitable for cooking partly because",
    "correct": "water molecules in food absorb microwave energy and warm.",
    "distractors": [
      "they are the slowest electromagnetic waves in vacuum.",
      "they cannot carry energy.",
      "they are longitudinal sound waves."
    ],
    "explanation": "Microwave absorption by polar molecules transfers energy to food.",
    "tags": []
  },
  {
    "objective": "C4.1",
    "profile": "KC",
    "stem": "Which observation most strongly supported Young's wave account of light?",
    "correct": "A pattern of bright and dark interference fringes from two slits.",
    "distractors": [
      "A sharp shadow from an opaque object.",
      "A ray travelling straight through air.",
      "A plane mirror forming a virtual image."
    ],
    "explanation": "Interference is naturally explained by superposition of waves.",
    "tags": []
  },
  {
    "objective": "C4.1",
    "profile": "KC",
    "stem": "Newton's historical particle model of light helped explain",
    "correct": "straight-line propagation and sharp shadows.",
    "distractors": [
      "only interference fringes.",
      "why sound needs air.",
      "radioactive decay."
    ],
    "explanation": "A corpuscular picture was consistent with ray-like straight paths, though incomplete.",
    "tags": []
  },
  {
    "objective": "C4.1",
    "profile": "KC",
    "stem": "The modern description of light recognises that light",
    "correct": "shows both wave-like and particle-like behaviour.",
    "distractors": [
      "is only a mechanical longitudinal wave.",
      "has no energy.",
      "cannot travel through a vacuum."
    ],
    "explanation": "Modern physics includes wave-particle behaviour.",
    "tags": []
  },
  {
    "objective": "C4.1",
    "profile": "KC",
    "stem": "Which statement best compares Huygens and Newton in the historical debate about light?",
    "correct": "Huygens argued for a wave model, while Newton promoted a particle model.",
    "distractors": [
      "Both argued that light was sound.",
      "Huygens proposed radioactivity and Newton proposed electricity.",
      "Both rejected straight-line propagation."
    ],
    "explanation": "The historical models differed on whether light was wave-like or corpuscular.",
    "tags": []
  },
  {
    "objective": "C4.2",
    "profile": "KC",
    "stem": "In Young's double-slit experiment, alternating bright and dark fringes arise from",
    "correct": "constructive and destructive interference.",
    "distractors": [
      "radioactive absorption.",
      "thermal expansion of the screen.",
      "sound reflection."
    ],
    "explanation": "The two coherent light waves superpose to reinforce or cancel at different positions.",
    "tags": []
  },
  {
    "objective": "C4.2",
    "profile": "UK",
    "stem": "For a clear Young double-slit pattern, the two slits should be illuminated by light that is",
    "correct": "coherent, with a stable phase relationship.",
    "distractors": [
      "randomly changing in unrelated phases.",
      "purely longitudinal sound.",
      "blocked from reaching the screen."
    ],
    "explanation": "A stable interference pattern requires coherent waves.",
    "tags": []
  },
  {
    "objective": "C4.2",
    "profile": "UK",
    "stem": "The central bright fringe in a symmetric double-slit setup occurs where the paths from the two slits are",
    "correct": "equal.",
    "distractors": [
      "different by half a wavelength.",
      "different by exactly one quarter wavelength.",
      "both zero because light does not travel."
    ],
    "explanation": "Equal path lengths give zero phase difference and constructive interference.",
    "tags": []
  },
  {
    "objective": "C4.2",
    "profile": "KC",
    "stem": "Which observation in a double-slit practical is direct evidence of wave interference?",
    "correct": "A repeated pattern of bright and dark bands on the screen.",
    "distractors": [
      "The lamp becomes warmer.",
      "The screen gains mass.",
      "The slits become wider after use."
    ],
    "explanation": "The fringe pattern is the observable result of interference. Conducting the experiment itself remains a practical skill.",
    "tags": []
  },
  {
    "objective": "C4.3",
    "profile": "KC",
    "stem": "Why is diffraction of visible light not usually obvious around a doorway?",
    "correct": "The wavelength of visible light is far smaller than the width of the doorway.",
    "distractors": [
      "Light cannot diffract.",
      "Visible light is longitudinal.",
      "Doorways absorb all light completely."
    ],
    "explanation": "Diffraction is most noticeable when an aperture is comparable in size to the wavelength.",
    "tags": []
  },
  {
    "objective": "C4.3",
    "profile": "KC",
    "stem": "Diffraction becomes more noticeable when the gap size is",
    "correct": "comparable with the wavelength.",
    "distractors": [
      "millions of times larger than the wavelength only.",
      "unrelated to wavelength.",
      "exactly zero for every wave."
    ],
    "explanation": "Strong spreading occurs when aperture and wavelength are of similar scale.",
    "tags": []
  },
  {
    "objective": "C4.3",
    "profile": "UK",
    "stem": "Sound diffracts around everyday openings more noticeably than visible light mainly because sound has",
    "correct": "much longer wavelengths.",
    "distractors": [
      "no frequency.",
      "no energy.",
      "a higher vacuum speed than light."
    ],
    "explanation": "Sound wavelengths can be comparable with doors and walls, while visible wavelengths are tiny.",
    "tags": []
  },
  {
    "objective": "C4.3",
    "profile": "UK",
    "stem": "Which change would make diffraction of a wave at a gap more pronounced?",
    "correct": "Use a longer wavelength while keeping the gap size fixed.",
    "distractors": [
      "Use a much shorter wavelength.",
      "Increase wave speed without changing wavelength or gap.",
      "Remove the wave source."
    ],
    "explanation": "A larger wavelength-to-gap ratio increases diffraction.",
    "tags": []
  },
  {
    "objective": "C4.4",
    "profile": "UK",
    "stem": "A pinhole camera forms an inverted image mainly because light",
    "correct": "travels in straight lines through the small aperture.",
    "distractors": [
      "always bends toward the normal in air.",
      "is absorbed by the pinhole.",
      "travels in circular paths."
    ],
    "explanation": "Straight-line ray propagation maps upper object points to lower image points and vice versa.",
    "tags": []
  },
  {
    "objective": "C4.4",
    "profile": "KC",
    "stem": "A sharp shadow behind an opaque object is evidence that light approximately",
    "correct": "travels in straight lines.",
    "distractors": [
      "travels only as sound.",
      "has zero wavelength.",
      "always reflects backward."
    ],
    "explanation": "Ray optics explains shadow formation through straight-line propagation.",
    "tags": []
  },
  {
    "objective": "C4.4",
    "profile": "KC",
    "stem": "An eclipse is explained at this level mainly using",
    "correct": "straight-line propagation of light and shadow formation.",
    "distractors": [
      "latent heat.",
      "Ohm's law.",
      "radioactive decay."
    ],
    "explanation": "Eclipses involve one body entering the shadow cast by another.",
    "tags": []
  },
  {
    "objective": "C4.4",
    "profile": "KC",
    "stem": "Which device most directly relies on a small aperture and straight-line propagation to form an image?",
    "correct": "pinhole camera",
    "distractors": [
      "immersion heater",
      "transformer",
      "Geiger counter"
    ],
    "explanation": "A pinhole camera uses narrow bundles of straight rays to form an inverted image.",
    "tags": []
  },
  {
    "objective": "C4.5",
    "profile": "UK",
    "stem": "A ray strikes a plane mirror at 35° to the normal. The angle of reflection is",
    "correct": "35°",
    "distractors": [
      "55°",
      "70°",
      "145°"
    ],
    "explanation": "The angle of incidence equals the angle of reflection, both measured from the normal.",
    "tags": []
  },
  {
    "objective": "C4.5",
    "profile": "KC",
    "stem": "The angle of incidence is measured between the incident ray and the",
    "correct": "normal to the surface.",
    "distractors": [
      "mirror surface itself.",
      "reflected ray.",
      "edge of the page."
    ],
    "explanation": "Reflection angles are defined relative to the normal.",
    "tags": []
  },
  {
    "objective": "C4.5",
    "profile": "KC",
    "stem": "Which statement is one of the laws of reflection?",
    "correct": "The incident ray, reflected ray and normal lie in the same plane.",
    "distractors": [
      "The reflected ray always travels along the surface.",
      "The angle of reflection is twice the angle of incidence.",
      "The frequency becomes zero after reflection."
    ],
    "explanation": "The laws include equality of the angles and coplanarity of rays and normal.",
    "tags": []
  },
  {
    "objective": "C4.5",
    "profile": "UK",
    "stem": "A ray makes 20° with the mirror surface. Its angle of incidence is",
    "correct": "70°",
    "distractors": [
      "20°",
      "40°",
      "110°"
    ],
    "explanation": "The normal is 90° to the surface, so i = 90° - 20° = 70°.",
    "tags": []
  },
  {
    "objective": "C4.6",
    "profile": "KC",
    "stem": "An image in a plane mirror is",
    "correct": "virtual, upright, laterally inverted and the same size as the object.",
    "distractors": [
      "real, inverted and smaller.",
      "real, upright and behind the mirror.",
      "virtual, inverted vertically and twice the size."
    ],
    "explanation": "Plane mirror images have the standard virtual, upright, same-size geometry with lateral inversion.",
    "tags": []
  },
  {
    "objective": "C4.6",
    "profile": "KC",
    "stem": "The image formed by a plane mirror appears",
    "correct": "the same distance behind the mirror as the object is in front.",
    "distractors": [
      "on the mirror surface only.",
      "twice as far behind as the object is in front.",
      "at the principal focus."
    ],
    "explanation": "Object distance equals image distance for a plane mirror.",
    "tags": []
  },
  {
    "objective": "C4.6",
    "profile": "UK",
    "stem": "Why is a plane mirror image called virtual?",
    "correct": "The reflected rays only appear to come from the image position and do not actually meet there.",
    "distractors": [
      "The image has no colour.",
      "The image is always smaller.",
      "The mirror absorbs every ray."
    ],
    "explanation": "A virtual image cannot be formed on a screen because the rays do not really converge there.",
    "tags": []
  },
  {
    "objective": "C4.6",
    "profile": "UK",
    "stem": "A student moves 0.50 m closer to a plane mirror. The distance between the student and the image decreases by",
    "correct": "1.0 m",
    "distractors": [
      "0.25 m",
      "0.50 m",
      "2.0 m"
    ],
    "explanation": "Both object and image positions move 0.50 m toward the mirror, so their separation falls by 1.0 m.",
    "tags": []
  },
  {
    "objective": "C4.7",
    "profile": "KC",
    "stem": "A pencil partly immersed in water appears bent because light is",
    "correct": "refracted at the water-air boundary.",
    "distractors": [
      "radioactively emitted.",
      "diffracted only by the pencil.",
      "converted to sound."
    ],
    "explanation": "Changing speed at a boundary changes ray direction, producing an apparent displacement.",
    "tags": []
  },
  {
    "objective": "C4.7",
    "profile": "KC",
    "stem": "A swimming pool appears shallower than its true depth because of",
    "correct": "refraction.",
    "distractors": [
      "conduction.",
      "electromagnetic induction.",
      "nuclear fission."
    ],
    "explanation": "Rays from the bottom bend away from the normal as they leave water, so the apparent depth is smaller.",
    "tags": []
  },
  {
    "objective": "C4.7",
    "profile": "KC",
    "stem": "Which observation is evidence of refraction?",
    "correct": "A ray changes direction as it passes obliquely from air into glass.",
    "distractors": [
      "An echo returns from a wall.",
      "A spring stretches under a force.",
      "A fuse melts when current is too large."
    ],
    "explanation": "Refraction is a change in direction associated with a change in wave speed at a boundary.",
    "tags": []
  },
  {
    "objective": "C4.7",
    "profile": "UK",
    "stem": "A coin in water appears displaced from its actual position. The best explanation is",
    "correct": "light bends when it changes speed at the water-air boundary.",
    "distractors": [
      "the coin physically rises.",
      "water produces gamma rays.",
      "the eye sends light into the coin and moves it."
    ],
    "explanation": "Apparent depth is a refraction effect.",
    "tags": []
  },
  {
    "objective": "C4.8",
    "profile": "KC",
    "stem": "A light ray passes from air into glass at an oblique angle. It normally bends",
    "correct": "towards the normal.",
    "distractors": [
      "away from the normal.",
      "along the surface in every case.",
      "back along the incident ray without entering glass."
    ],
    "explanation": "Light slows in glass relative to air and bends toward the normal.",
    "tags": []
  },
  {
    "objective": "C4.8",
    "profile": "KC",
    "stem": "When light passes from glass into air at an angle below the critical angle, it bends",
    "correct": "away from the normal.",
    "distractors": [
      "towards the normal.",
      "into a longitudinal wave.",
      "without changing speed."
    ],
    "explanation": "Entering the optically less dense medium increases speed and bends the ray away from the normal.",
    "tags": []
  },
  {
    "objective": "C4.8",
    "profile": "UK",
    "stem": "During refraction at a stationary boundary, which quantity remains unchanged?",
    "correct": "frequency",
    "distractors": [
      "speed",
      "wavelength",
      "direction in every case"
    ],
    "explanation": "The source fixes frequency, while speed and wavelength change across media.",
    "tags": []
  },
  {
    "objective": "C4.8",
    "profile": "UK",
    "stem": "A ray enters a glass block along the normal. It",
    "correct": "continues straight without changing direction, though its speed changes.",
    "distractors": [
      "reflects completely.",
      "bends by 90°.",
      "stops at the boundary."
    ],
    "explanation": "At normal incidence there is no directional bending because i = 0°.",
    "tags": []
  },
  {
    "objective": "C4.9",
    "profile": "KC",
    "stem": "White light passing through a prism produces a spectrum because different wavelengths are",
    "correct": "refracted by different amounts.",
    "distractors": [
      "all reflected by exactly the same amount.",
      "converted into sound frequencies.",
      "destroyed inside the glass."
    ],
    "explanation": "Dispersion results from refractive index varying with wavelength.",
    "tags": []
  },
  {
    "objective": "C4.9",
    "profile": "KC",
    "stem": "In a visible spectrum produced by a prism, which colour is generally deviated most?",
    "correct": "violet",
    "distractors": [
      "red",
      "infrared",
      "radio"
    ],
    "explanation": "Violet light generally has a larger refractive index in glass and bends more than red.",
    "tags": []
  },
  {
    "objective": "C4.9",
    "profile": "KC",
    "stem": "The separation of white light into its component colours is called",
    "correct": "dispersion.",
    "distractors": [
      "conduction.",
      "resonance only.",
      "radioactivity."
    ],
    "explanation": "A prism disperses white light because different wavelengths refract differently.",
    "tags": []
  },
  {
    "objective": "C4.9",
    "profile": "UK",
    "stem": "A prism produces red and violet rays at different angles. This shows that glass has",
    "correct": "a refractive index that depends on wavelength.",
    "distractors": [
      "zero refractive index for every colour.",
      "the same wave speed for all colours within glass.",
      "no effect on visible light."
    ],
    "explanation": "Material dispersion means wave speed and refractive index vary with wavelength.",
    "tags": []
  },
  {
    "objective": "C4.10",
    "profile": "UK",
    "stem": "Light travels from air into glass with angle of incidence 45° and refraction 28°. The refractive index is approximately",
    "correct": "1.51",
    "distractors": [
      "0.66",
      "1.00",
      "2.41"
    ],
    "explanation": "n = sin 45° / sin 28° ≈ 1.51.",
    "tags": []
  },
  {
    "objective": "C4.10",
    "profile": "KC",
    "stem": "In Snell's law for light entering a material from air, refractive index is",
    "correct": "n = sin i / sin r.",
    "distractors": [
      "n = sin r / sin i.",
      "n = i/r using angles directly.",
      "n = i + r."
    ],
    "explanation": "Snell's law uses the ratio of sines, not the ratio of the angles themselves.",
    "tags": []
  },
  {
    "objective": "C4.10",
    "profile": "UK",
    "stem": "A glass block has refractive index 1.50. If light speed in vacuum is 3.0 × 10^8 m/s, its speed in the glass is",
    "correct": "2.0 × 10^8 m/s",
    "distractors": [
      "1.5 × 10^8 m/s",
      "3.0 × 10^8 m/s",
      "4.5 × 10^8 m/s"
    ],
    "explanation": "n = c/v, so v = c/n = 3.0 × 10^8 / 1.50 = 2.0 × 10^8 m/s.",
    "tags": []
  },
  {
    "objective": "C4.10",
    "profile": "XS",
    "stem": "In a Snell's law experiment, plotting sin i on the vertical axis against sin r on the horizontal axis gives a gradient equal to",
    "correct": "the refractive index n.",
    "distractors": [
      "1/n always.",
      "the speed of sound.",
      "the critical angle in degrees."
    ],
    "explanation": "For air to medium, sin i = n sin r, so gradient = n.",
    "tags": []
  },
  {
    "objective": "C4.11",
    "profile": "KC",
    "stem": "The critical angle is the angle of incidence in the denser medium for which the refracted ray",
    "correct": "travels along the boundary at 90° to the normal.",
    "distractors": [
      "returns along the normal.",
      "has zero frequency.",
      "is absorbed completely."
    ],
    "explanation": "At the critical angle, the refracted angle is 90°.",
    "tags": []
  },
  {
    "objective": "C4.11",
    "profile": "KC",
    "stem": "Total internal reflection occurs when light travels from a denser to a less dense medium and the angle of incidence is",
    "correct": "greater than the critical angle.",
    "distractors": [
      "less than the critical angle.",
      "exactly 0°.",
      "measured from the surface and is always 90°."
    ],
    "explanation": "Both conditions are required for total internal reflection.",
    "tags": []
  },
  {
    "objective": "C4.11",
    "profile": "UK",
    "stem": "Which condition does NOT permit total internal reflection?",
    "correct": "Light travelling from air into glass.",
    "distractors": [
      "Light travelling from glass toward air at an angle above c.",
      "Light travelling from water toward air above its critical angle.",
      "Light in a denser medium incident beyond the critical angle."
    ],
    "explanation": "TIR requires travel from higher refractive index toward lower refractive index.",
    "tags": []
  },
  {
    "objective": "C4.11",
    "profile": "UK",
    "stem": "At an incidence angle smaller than the critical angle inside glass, the ray generally",
    "correct": "partly refracts out of the glass.",
    "distractors": [
      "must be totally internally reflected.",
      "stops moving.",
      "turns into sound."
    ],
    "explanation": "Below the critical angle a refracted ray exists in the less dense medium.",
    "tags": []
  },
  {
    "objective": "C4.12",
    "profile": "UK",
    "stem": "A medium has refractive index 2.0. Its critical angle is approximately",
    "correct": "30°",
    "distractors": [
      "45°",
      "60°",
      "90°"
    ],
    "explanation": "sin c = 1/n = 0.5, so c = 30°.",
    "tags": []
  },
  {
    "objective": "C4.12",
    "profile": "UK",
    "stem": "If refractive index increases, the critical angle for a medium-air boundary generally",
    "correct": "decreases.",
    "distractors": [
      "increases.",
      "stays exactly 90°.",
      "becomes unrelated to refractive index."
    ],
    "explanation": "Since sin c = 1/n, a larger n gives a smaller c.",
    "tags": []
  },
  {
    "objective": "C4.12",
    "profile": "UK",
    "stem": "Glass of refractive index 1.5 has a critical angle closest to",
    "correct": "42°",
    "distractors": [
      "19°",
      "60°",
      "75°"
    ],
    "explanation": "c = sin^-1(1/1.5) ≈ 41.8°.",
    "tags": []
  },
  {
    "objective": "C4.12",
    "profile": "KC",
    "stem": "Which equation relates critical angle c to refractive index n for a material-air boundary?",
    "correct": "sin c = 1/n",
    "distractors": [
      "sin c = n",
      "cos c = n",
      "tan c = 1/n^2"
    ],
    "explanation": "For refraction from the material to air at r = 90°, Snell's law gives sin c = 1/n.",
    "tags": []
  },
  {
    "objective": "C4.13",
    "profile": "KC",
    "stem": "Optical fibres guide light mainly by repeated",
    "correct": "total internal reflection.",
    "distractors": [
      "diffuse absorption.",
      "nuclear scattering.",
      "sound diffraction."
    ],
    "explanation": "The core-cladding geometry keeps suitable rays reflecting internally.",
    "tags": []
  },
  {
    "objective": "C4.13",
    "profile": "KC",
    "stem": "A right-angle prism used to turn a ray through 90° relies on",
    "correct": "total internal reflection at an internal face.",
    "distractors": [
      "latent heat.",
      "electromagnetic induction.",
      "evaporation."
    ],
    "explanation": "Prisms can use TIR as an efficient reflecting surface.",
    "tags": []
  },
  {
    "objective": "C4.13",
    "profile": "UK",
    "stem": "For light to remain trapped in the core of an optical fibre, the core should have",
    "correct": "a higher refractive index than the cladding.",
    "distractors": [
      "a lower refractive index than the cladding.",
      "exactly zero refractive index.",
      "no boundary with the cladding."
    ],
    "explanation": "The ray must travel from the denser core toward the less dense cladding to undergo TIR.",
    "tags": []
  },
  {
    "objective": "C4.13",
    "profile": "UK",
    "stem": "Which diagram feature is essential when showing total internal reflection in a prism?",
    "correct": "The incident angle at the internal boundary must exceed the critical angle.",
    "distractors": [
      "The ray must enter from air and immediately bend away from every normal.",
      "The reflected ray must leave the prism at the same boundary.",
      "The ray must become longitudinal."
    ],
    "explanation": "A correct TIR diagram must satisfy the critical-angle condition at the internal surface.",
    "tags": []
  },
  {
    "objective": "C5.1",
    "profile": "KC",
    "stem": "A converging lens changes a parallel beam into rays that",
    "correct": "meet at the principal focus.",
    "distractors": [
      "spread as if from a focus on the incident side.",
      "remain parallel in every case.",
      "reflect back to the source."
    ],
    "explanation": "A converging lens focuses paraxial parallel rays at its principal focus.",
    "tags": []
  },
  {
    "objective": "C5.1",
    "profile": "KC",
    "stem": "A diverging lens makes a parallel beam",
    "correct": "spread out as if the rays came from a principal focus on the incident side.",
    "distractors": [
      "converge to a real focus on the far side.",
      "stop inside the lens.",
      "travel at the speed of sound."
    ],
    "explanation": "Diverging rays appear to originate from a virtual principal focus.",
    "tags": []
  },
  {
    "objective": "C5.1",
    "profile": "KC",
    "stem": "Which lens is thicker at the centre than at the edges?",
    "correct": "a converging lens",
    "distractors": [
      "a diverging lens",
      "a plane mirror",
      "a prism only"
    ],
    "explanation": "A standard convex converging lens is thicker centrally.",
    "tags": []
  },
  {
    "objective": "C5.1",
    "profile": "UK",
    "stem": "Parallel rays incident on a thin converging lens along the principal axis emerge",
    "correct": "converging toward the principal focus.",
    "distractors": [
      "parallel but reversed.",
      "diverging from the optical centre only.",
      "as longitudinal waves."
    ],
    "explanation": "This ray behaviour defines the principal focus of a converging lens.",
    "tags": []
  },
  {
    "objective": "C5.2",
    "profile": "KC",
    "stem": "The focal length of a lens is the distance between the",
    "correct": "optical centre and the principal focus.",
    "distractors": [
      "object and image only.",
      "two edges of the lens.",
      "screen and lamp regardless of focus."
    ],
    "explanation": "Focal length is measured from the optical centre to the principal focus.",
    "tags": []
  },
  {
    "objective": "C5.2",
    "profile": "KC",
    "stem": "The principal axis is the",
    "correct": "straight line through the optical centre and principal foci.",
    "distractors": [
      "edge of the lens.",
      "line joining the object and top of image only.",
      "normal to a mirror only."
    ],
    "explanation": "The principal axis is the main symmetry axis used in lens ray diagrams.",
    "tags": []
  },
  {
    "objective": "C5.2",
    "profile": "KC",
    "stem": "The focal plane is a plane",
    "correct": "through the principal focus and perpendicular to the principal axis.",
    "distractors": [
      "coincident with the lens surface in every case.",
      "parallel to the principal axis through the object.",
      "where no rays can meet."
    ],
    "explanation": "Parallel rays arriving at small angles focus at points in the focal plane.",
    "tags": []
  },
  {
    "objective": "C5.2",
    "profile": "KC",
    "stem": "Magnification describes the ratio of",
    "correct": "image size to object size.",
    "distractors": [
      "object size to wavelength only.",
      "focal length to frequency.",
      "speed to period."
    ],
    "explanation": "Linear magnification compares image and object dimensions.",
    "tags": []
  },
  {
    "objective": "C5.3",
    "profile": "KC",
    "stem": "A real image is one where light rays",
    "correct": "actually converge and the image can be formed on a screen.",
    "distractors": [
      "only appear to come from a point and cannot be projected.",
      "never contains light.",
      "is always upright."
    ],
    "explanation": "Real images correspond to actual ray convergence.",
    "tags": []
  },
  {
    "objective": "C5.3",
    "profile": "KC",
    "stem": "A virtual image",
    "correct": "cannot be projected onto a screen because the rays do not actually meet at the image position.",
    "distractors": [
      "is always smaller than the object.",
      "must be inverted.",
      "forms only with diverging mirrors."
    ],
    "explanation": "Virtual images arise from apparent extensions of rays.",
    "tags": []
  },
  {
    "objective": "C5.3",
    "profile": "UK",
    "stem": "An object placed inside the focal length of a converging lens forms an image that is",
    "correct": "virtual, upright and magnified.",
    "distractors": [
      "real, inverted and diminished.",
      "real and exactly at the focus.",
      "virtual and always smaller."
    ],
    "explanation": "With u < f, emerging rays diverge and their backward extensions form a magnified virtual image.",
    "tags": []
  },
  {
    "objective": "C5.3",
    "profile": "KC",
    "stem": "Which image can be caught on a white screen?",
    "correct": "a real image",
    "distractors": [
      "a virtual image only",
      "a plane mirror image only",
      "an apparent image behind a diverging lens only"
    ],
    "explanation": "Only actual ray convergence deposits a spatial image on a screen.",
    "tags": []
  },
  {
    "objective": "C5.4",
    "profile": "UK",
    "stem": "An image is 6.0 cm high and the object is 2.0 cm high. The magnification is",
    "correct": "3.0",
    "distractors": [
      "0.33",
      "4.0",
      "12"
    ],
    "explanation": "m = image size/object size = 6.0/2.0 = 3.0.",
    "tags": []
  },
  {
    "objective": "C5.4",
    "profile": "KC",
    "stem": "For a thin lens using the positive classroom distances in this syllabus, magnification can be found from",
    "correct": "m = v/u.",
    "distractors": [
      "m = u/v only.",
      "m = f/u always.",
      "m = uv."
    ],
    "explanation": "Magnification equals image distance divided by object distance in the stated convention.",
    "tags": []
  },
  {
    "objective": "C5.4",
    "profile": "UK",
    "stem": "A lens forms an image 30 cm from the lens for an object 60 cm away. The magnification magnitude is",
    "correct": "0.50",
    "distractors": [
      "2.0",
      "30",
      "90"
    ],
    "explanation": "m = v/u = 30/60 = 0.50.",
    "tags": []
  },
  {
    "objective": "C5.4",
    "profile": "UK",
    "stem": "A magnification of 0.40 means the image is",
    "correct": "smaller than the object.",
    "distractors": [
      "larger than the object.",
      "the same size as the object.",
      "always virtual regardless of setup."
    ],
    "explanation": "A magnitude below 1 indicates a reduced image.",
    "tags": []
  },
  {
    "objective": "C5.5",
    "profile": "UK",
    "stem": "A converging lens focuses a distant object sharply on a screen 15 cm behind the lens. Its focal length is approximately",
    "correct": "15 cm",
    "distractors": [
      "7.5 cm",
      "30 cm",
      "60 cm"
    ],
    "explanation": "For a very distant object, incoming rays are nearly parallel and focus approximately one focal length from the lens.",
    "tags": []
  },
  {
    "objective": "C5.5",
    "profile": "UK",
    "stem": "For a converging lens with u = 30 cm and v = 60 cm, the focal length is",
    "correct": "20 cm",
    "distractors": [
      "10 cm",
      "30 cm",
      "90 cm"
    ],
    "explanation": "1/f = 1/30 + 1/60 = 1/20, so f = 20 cm.",
    "tags": []
  },
  {
    "objective": "C5.5",
    "profile": "KC",
    "stem": "Which equation is used to determine focal length from measured object and image distances?",
    "correct": "1/f = 1/u + 1/v",
    "distractors": [
      "f = u + v",
      "1/f = u + v",
      "f = uv"
    ],
    "explanation": "The thin lens equation links focal, object and image distances.",
    "tags": []
  },
  {
    "objective": "C5.5",
    "profile": "XS",
    "stem": "In a focal-length experiment, the image should be adjusted until it is",
    "correct": "sharply focused on the screen before distances are recorded.",
    "distractors": [
      "as blurred as possible.",
      "formed behind the observer.",
      "made virtual so it cannot reach a screen."
    ],
    "explanation": "A sharp real image gives the correct image distance for the chosen object position.",
    "tags": []
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
    id:`c-waves-${serial}`,objective:spec.objective,topic,profile:spec.profile,stem:spec.stem,
    options:Object.freeze(options),answer,explanation:spec.explanation,traps:Object.freeze(traps),tags:Object.freeze(spec.tags||[]),
    assessmentScope: spec.objective==='C4.2' ? 'knowledge-support-for-practical' : 'objective-linked'
  });
}
export const SECTION_C_MCQ_BANK=Object.freeze(SPECS.map(makeQuestion));

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
export const SECTION_C_FLASHCARDS=Object.freeze(SECTION_C_WAVES_OPTICS_LESSONS.flatMap(flashcardsForTopic));
export const SECTION_C_TOPICS=Object.freeze(SECTION_C_WAVES_OPTICS_LESSONS.map(topic=>Object.freeze({
  id:topic.id,title:topic.title,lesson:topic,objectives:Object.freeze(Object.fromEntries(topic.objectives)),
  mcq:Object.freeze(SECTION_C_MCQ_BANK.filter(q=>q.topic===topic.id)),flashcards:Object.freeze(SECTION_C_FLASHCARDS.filter(card=>card.topic===topic.id)),
})));
function rng(seed){let s=(Number(seed)>>>0)||1;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296);}
function shuffle(items,random){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out;}
export function buildSectionCObjectiveAudit({seed=1}={}){const random=rng(seed),selected=[];for(const objective of Object.keys(SECTION_C_OBJECTIVES)){const pool=SECTION_C_MCQ_BANK.filter(q=>q.objective===objective);if(!pool.length)throw new Error(`No Section C MCQ support for ${objective}`);selected.push(pool[Math.floor(random()*pool.length)]);}return shuffle(selected,random);}
// Internal SPARK checkpoint. Its topic quotas are for broad revision coverage and are not presented as exact CXC Paper 01 weighting.
export const DEFAULT_SECTION_C_CHECKPOINT_QUOTAS=Object.freeze({C1:3,C2:5,C3:3,C4:14,C5:5});
export function buildSectionCCheckpoint({seed=1,quotas=DEFAULT_SECTION_C_CHECKPOINT_QUOTAS}={}){const random=rng(seed),selected=[];for(const topic of SECTION_C_TOPICS){const count=Number(quotas[topic.id]||0),pool=shuffle(topic.mcq,random);if(count>pool.length)throw new Error(`Quota ${count} exceeds ${topic.id} pool`);selected.push(...pool.slice(0,count));}return shuffle(selected,random);}
export function sectionCStats(){return {section:'C',topics:SECTION_C_TOPICS.length,objectives:Object.keys(SECTION_C_OBJECTIVES).length,mcq:SECTION_C_MCQ_BANK.length,flashcards:SECTION_C_FLASHCARDS.length,byTopic:Object.fromEntries(SECTION_C_TOPICS.map(t=>[t.id,{objectives:Object.keys(t.objectives).length,mcq:t.mcq.length,flashcards:t.flashcards.length}]))};}
export const SECTION_C_PRACTICAL_ONLY_OBJECTIVES=Object.freeze(['C4.2']);
