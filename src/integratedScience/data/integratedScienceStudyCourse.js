// Full learner-facing Integrated Science study fallback.
// Objective codes mirror the audited Integrated Science question-bank metadata.

const section = (title, paragraphs, bullets=[]) => ({title,paragraphs,bullets});
const topic = (id,sectionId,sortOrder,title,objectives,introduction,sections,keyPoints,workedExample) => ({
  id,subjectId:"integrated-science",sectionId,title,description:introduction,sortOrder,enabled:true,
  metadata:{lesson:{objectives,introduction,sections,keyPoints,workedExample,summary:keyPoints.slice(0,3).join(" ")}},
});

export const INTEGRATED_SCIENCE_STUDY_SECTIONS=Object.freeze([
  {id:"module-1-organisms-life-processes",subjectId:"integrated-science",title:"Module 1: Organisms and Life Processes",description:"Cells, reproduction, transport, excretion, coordination and health.",sortOrder:10,enabled:true,metadata:{module:1}},
  {id:"module-2-energy",subjectId:"integrated-science",title:"Module 2: Energy",description:"Energy changes, life processes, fuels, electricity, heat transfer and ventilation.",sortOrder:20,enabled:true,metadata:{module:2}},
  {id:"module-3-our-planet",subjectId:"integrated-science",title:"Module 3: Our Planet",description:"Earth and space, weather, water, forces, materials, household chemistry and pollution.",sortOrder:30,enabled:true,metadata:{module:3}},
]);

export const INTEGRATED_SCIENCE_STUDY_TOPICS=Object.freeze([
  topic("is-m1-t1-units-of-life","module-1-organisms-life-processes",101,"Units of Life",
    ["1.1.1 Analyse diffusion, osmosis and active transport.","1.1.2 Examine animal and plant cells."],
    "Living things depend on cells and on the controlled movement of substances across cell membranes.",
    [
      section("Cells and organisation",["Cells are the basic structural and functional units of living organisms. Plant and animal cells share structures such as the cell membrane, cytoplasm and nucleus, while plant cells also have a cellulose cell wall, large vacuole and, in photosynthetic tissues, chloroplasts."],["Structure should always be linked to function.","Use a clear biological drawing with labels that do not cross."]),
      section("Movement across membranes",["Diffusion is the net movement of particles from higher to lower concentration. Osmosis is the net movement of water through a selectively permeable membrane from a region of higher water concentration to lower water concentration. Active transport moves substances against a concentration gradient and requires energy."],["Surface area, concentration difference and temperature can affect diffusion rate.","Osmosis refers specifically to water.","Active transport needs energy from respiration."]),
      section("Practical thinking",["In potato or plant-tissue investigations, measure initial and final size or mass, calculate the change, keep sample size and time controlled, and use several concentrations. A graph of change against concentration can help identify the concentration at which there is no net water movement."])
    ],
    ["Plant and animal cells share several core structures but plant cells have additional features.","Diffusion and osmosis are passive; active transport requires energy.","Fair membrane investigations change one factor at a time."],
    {title:"Osmosis calculation",prompt:"A potato strip changes from 40.0 mm to 43.2 mm. Find the change in length.",steps:["Change = final − initial.","43.2 − 40.0 = 3.2 mm."],answer:"+3.2 mm"}
  ),
  topic("is-m1-t2-plant-reproduction","module-1-organisms-life-processes",102,"Reproduction and Growth in Plants",
    ["1.2.1 Distinguish asexual and sexual reproduction.","1.2.2 Examine asexual reproduction in plants.","1.2.3 Examine sexual reproduction in plants.","1.2.4 Analyse plant growth patterns.","1.2.5 Describe crop-production methods.","1.2.6 Relate soil fertility to soil properties.","1.2.7 Evaluate soil erosion and food production."],
    "Plant reproduction and crop production connect flower biology, growth, soil and agriculture.",
    [
      section("Asexual and sexual reproduction",["Asexual reproduction uses one parent and produces genetically similar offspring. Vegetative methods include runners, bulbs, tubers, rhizomes and cuttings. Sexual reproduction involves gametes, pollination, fertilisation and seed formation, creating more genetic variation."]),
      section("Flowers, seeds and growth",["Know the roles of anther, filament, stigma, style, ovary and ovule. Pollination transfers pollen to a stigma. After fertilisation the ovule develops into a seed and the ovary develops into a fruit. Germination needs water, oxygen and a suitable temperature."],["Growth data should be measured at regular intervals.","Choose an appropriate line graph for continuous growth data."]),
      section("Soil and food production",["Soil texture, drainage, aeration, pH, mineral content and organic matter affect fertility. Crop rotation, compost, irrigation, mulching and careful fertiliser use can support production. Erosion removes fertile topsoil, so contouring, terracing, windbreaks and ground cover can reduce losses."])
    ],
    ["Sexual reproduction increases variation; asexual reproduction is faster and preserves useful traits.","Healthy crop growth depends on both biological and soil conditions.","Soil conservation protects long-term food production."],
    {title:"Growth graph choice",prompt:"A seedling is measured every two days for three weeks. Which graph is most suitable?",steps:["Time is continuous.","Height is continuous.","Plot height against time with a line or smooth curve."],answer:"A line graph of height against time."}
  ),
  topic("is-m1-t3-animal-reproduction","module-1-organisms-life-processes",103,"Reproduction and Growth in Animals",
    ["1.3.1 Outline asexual reproduction in animals.","1.3.2 Describe human reproductive organs.","1.3.3 Analyse the menstrual cycle.","1.3.4 Discuss pregnancy.","1.3.5 Discuss birth control.","1.3.6 Assess prenatal and postnatal care.","1.3.7 Compare male and female growth patterns.","1.3.8 Discuss human population control."],
    "Human reproduction is studied through anatomy, cycles, pregnancy, responsible health choices and population patterns.",
    [
      section("Reproductive systems",["Male organs include testes, sperm ducts, glands, urethra and penis. Female organs include ovaries, oviducts, uterus, cervix and vagina. Link each structure to its reproductive function rather than memorising labels alone."]),
      section("Cycle, fertilisation and pregnancy",["Ovulation releases an ovum. Fertilisation usually occurs in the oviduct, followed by cell division and implantation in the uterus. The placenta supports exchange between maternal and fetal blood without normally mixing the two blood supplies directly."]),
      section("Health and population",["Birth-control methods work in different ways, including preventing ovulation, preventing sperm reaching the ovum or preventing implantation. Prenatal care supports the mother and developing fetus; postnatal care supports recovery, feeding and infant health. Population decisions involve social, economic, health and environmental factors."])
    ],
    ["Structure and function should be learned together.","Pregnancy involves fertilisation, implantation and placental exchange.","Reproductive health questions require accurate biology and responsible evaluation."],
    {title:"Placenta reasoning",prompt:"Why is the placenta well supplied with blood vessels?",steps:["Exchange must be efficient.","A strong blood supply maintains concentration gradients for oxygen, nutrients and wastes."],answer:"It supports rapid exchange between maternal and fetal circulations."}
  ),
  topic("is-m1-t4-transport-systems","module-1-organisms-life-processes",104,"Transport Systems",
    ["1.4.1 Justify the need for transport systems.","1.4.2 Relate transport structures to function.","1.4.3 Distinguish blood groups."],
    "Large multicellular organisms need specialised transport systems because diffusion alone is too slow over long distances.",
    [
      section("Human circulation",["The heart pumps blood through arteries, capillaries and veins. Arteries have thick elastic walls for high pressure, veins have valves and wider lumens for lower-pressure return, and capillaries have very thin walls for exchange."]),
      section("Blood and blood groups",["Red blood cells carry oxygen using haemoglobin, white blood cells support defence, platelets help clotting and plasma transports dissolved substances. ABO blood groups depend on antigens and antibodies, so incompatible transfusions can cause agglutination."]),
      section("Transport in plants",["Xylem carries water and mineral ions and also provides support. Phloem translocates dissolved organic food such as sucrose. Transpiration from leaves helps pull water through xylem."])
    ],
    ["Transport surfaces and vessels are adapted to their jobs.","Capillaries are the main exchange vessels.","Blood compatibility matters because antigen-antibody reactions can be dangerous."],
    {title:"Vessel identification",prompt:"A vessel has valves, a wide lumen and a relatively thin wall. Identify it.",steps:["Valves prevent backflow.","A wide lumen and thinner wall suit lower pressure."],answer:"A vein."}
  ),
  topic("is-m1-t5-excretion","module-1-organisms-life-processes",105,"Excretion",
    ["1.5.1 Distinguish excretion and egestion.","1.5.2 Explain excretion by lungs, skin and kidneys.","1.5.3 Identify excretion in flowering plants."],
    "Excretion removes metabolic wastes made by cells, while egestion removes undigested material from the digestive system.",
    [
      section("Human excretion",["The lungs remove carbon dioxide and water vapour. The skin removes water, salts and small amounts of urea in sweat. Kidneys filter blood and regulate water, salts and urea before urine passes through ureters to the bladder."]),
      section("Kidney function",["At the nephron, filtration occurs at the glomerulus, useful substances are selectively reabsorbed, and water balance is adjusted before urine leaves the collecting ducts."],["Do not describe urine as stored in the kidney.","Relate nephron structures to filtration and reabsorption."]),
      section("Plant wastes",["Plants can remove gases through stomata, lose water by transpiration, store some wastes in leaves or bark, and release substances such as resins and gums."])
    ],
    ["Excretion is removal of metabolic waste.","Kidneys are both excretory and osmoregulatory organs.","Plants also produce and remove metabolic wastes."],
    {title:"Excretion or egestion?",prompt:"Undigested fibre leaves the body in faeces. Is this excretion?",steps:["Ask whether the material was produced by metabolism.","Undigested fibre was never absorbed or produced by cells."],answer:"No. It is egestion."}
  ),
  topic("is-m1-t6-coordination","module-1-organisms-life-processes",106,"Sense Organs and Coordination",
    ["1.6.1 Describe sense organs.","1.6.2 Relate eye structures to function.","1.6.3 Analyse sight defects.","1.6.4 Relate ear structures to function.","1.6.5 Relate nervous-system structures to function.","1.6.6 Relate endocrine structures to function."],
    "Coordination lets organisms detect changes and produce appropriate responses through receptors, nerves and hormones.",
    [
      section("Eye and vision",["The cornea and lens refract light, the iris controls pupil size, the retina contains receptors and the optic nerve carries impulses to the brain. Accommodation changes lens shape for near and distant objects. Myopia and hyperopia can be corrected with appropriate lenses."]),
      section("Ear and nervous system",["The pinna collects sound, the eardrum vibrates, ossicles transmit vibrations and the cochlea converts them into nerve impulses. Semicircular canals help balance. The central nervous system coordinates information while sensory and motor neurones carry impulses."],["Reflexes provide rapid automatic responses."]),
      section("Hormonal coordination",["Endocrine glands release hormones into blood. Hormones act more slowly than nerve impulses but can have longer-lasting effects. Examples include insulin in blood-glucose control and adrenaline in emergency responses."])
    ],
    ["Sense organs contain specialised receptors.","Nervous and hormonal coordination work on different time scales.","Diagram labels must be connected to functions, not memorised in isolation."],
    {title:"Reflex pathway",prompt:"Put these in order: motor neurone, receptor, effector, sensory neurone, relay neurone.",steps:["A stimulus is first detected by a receptor.","Impulses pass sensory → relay → motor.","The motor neurone activates an effector."],answer:"Receptor → sensory neurone → relay neurone → motor neurone → effector."}
  ),
  topic("is-m1-t7-health","module-1-organisms-life-processes",107,"Health",
    ["1.7.1 Discuss microbes.","1.7.2 Discuss communicable disease.","1.7.3 Outline immunisation.","1.7.4 Discuss non-communicable disease.","1.7.5 Examine exercise effects.","1.7.6 Evaluate drug use.","1.7.7 Discuss hygiene.","1.7.8 Discuss pests and parasites.","1.7.9 Recommend pest control.","1.7.10 Describe food contaminants.","1.7.11 Determine microbial growth conditions.","1.7.12 Apply food-preservation principles."],
    "Health questions combine microorganisms, disease prevention, lifestyle, hygiene, food safety and evidence from investigations.",
    [
      section("Disease and immunity",["Pathogens include certain bacteria, viruses, fungi and protozoa. Communicable diseases can spread by droplets, contaminated food or water, vectors, body fluids or direct contact. Vaccination stimulates immune memory so the body can respond faster to later exposure."]),
      section("Lifestyle and exercise",["Exercise immediately increases breathing rate, heart rate and blood flow to active muscles. Long-term activity can improve cardiovascular fitness. Non-communicable diseases are influenced by genetics, diet, inactivity, tobacco, alcohol and other risk factors."]),
      section("Hygiene, pests and food",["Good hygiene interrupts transmission. Food preservation works by slowing microbial growth or destroying microbes through methods such as refrigeration, drying, salting, canning and pasteurisation. Controlled experiments on microbes must compare conditions fairly and use safe procedures."])
    ],
    ["Communicable and non-communicable diseases have different causes and controls.","Vaccination prepares immune memory.","Food preservation changes conditions needed for microbial growth."],
    {title:"Food preservation reasoning",prompt:"Why does refrigeration slow food spoilage?",steps:["Microbial enzymes work more slowly at low temperature.","Microbes reproduce more slowly."],answer:"Low temperature slows microbial metabolism and reproduction."}
  ),

  topic("is-m2-t1-conservation-energy","module-2-energy",201,"Conservation of Energy",
    ["2.1.1 Explain energy.","2.1.2 Discuss mass-energy conversion and conservation.","2.1.3 Examine photosynthesis.","2.1.4 Analyse energy transfer in the environment."],
    "Energy changes form and moves through systems, but total energy is conserved.",
    [
      section("Energy stores and transfers",["Energy can be stored chemically, kinetically, gravitationally, elastically and thermally. Transfers occur through forces doing work, electrical currents, heating and radiation. Useful-energy questions should distinguish useful output from energy dissipated to surroundings."]),
      section("Photosynthesis",["Green plants capture light energy and store it as chemical energy in glucose. Carbon dioxide and water are raw materials and oxygen is released. Light intensity, carbon dioxide concentration and temperature can limit the rate."],["Carbon dioxide + water → glucose + oxygen","Chlorophyll absorbs light energy."]),
      section("Food chains and efficiency",["Energy enters most ecosystems through producers. At each trophic level some energy is transferred to biomass while much is lost through respiration, movement, waste and heat, so less energy is available at higher trophic levels."])
    ],
    ["Energy is conserved even when useful energy decreases.","Photosynthesis transfers light energy into chemical energy.","Energy transfer through food chains is inefficient."],
    {title:"Efficiency",prompt:"A device receives 500 J and provides 350 J useful output. Find efficiency.",steps:["Efficiency = useful output ÷ input × 100%.","350 ÷ 500 × 100 = 70%."],answer:"70%"}
  ),
  topic("is-m2-t2-life-energy","module-2-energy",202,"Energy in Life Processes",
    ["2.2.1 Examine food as energy.","2.2.2 Examine digestion.","2.2.3 Relate teeth to digestion.","2.2.4 Evaluate respiration.","2.2.5 Distinguish aerobic and anaerobic respiration.","2.2.6 Examine breathing.","2.2.7 Explain gaseous exchange.","2.2.8 Explain smoking effects."],
    "Food, digestion, respiration, breathing and gas exchange work together to provide usable energy to cells.",
    [
      section("Food and digestion",["Carbohydrates and fats are major energy sources; proteins are important for growth and repair. Digestion breaks large insoluble molecules into smaller soluble molecules that can be absorbed. Enzymes are specific and work best within suitable temperature and pH ranges."]),
      section("Respiration and breathing",["Aerobic respiration releases energy using oxygen and produces carbon dioxide and water. Anaerobic respiration releases less energy. Breathing ventilates the lungs; respiration is the chemical process occurring in cells."]),
      section("Gas exchange and smoking",["Alveoli have a large surface area, thin moist walls and a strong blood supply, supporting rapid diffusion. Smoking can damage cilia and alveoli, increase mucus and reduce efficient gas exchange."])
    ],
    ["Digestion prepares nutrients for absorption.","Breathing and respiration are not the same process.","Alveoli are adapted for efficient diffusion."],
    {title:"Rate from bubbles",prompt:"A plant produces 90 bubbles in 3 minutes. Find bubbles per minute.",steps:["Rate = amount ÷ time.","90 ÷ 3 = 30."],answer:"30 bubbles per minute"}
  ),
  topic("is-m2-t3-energy-sources","module-2-energy",203,"Fossil Fuels and Alternative Sources of Energy",
    ["2.3.1 Examine fossil-fuel use.","2.3.2 Appraise alternative energy in the Caribbean."],
    "Energy choices involve reliability, cost, environmental effects and the resources available in each Caribbean territory.",
    [
      section("Fossil fuels",["Coal, petroleum and natural gas store chemical energy formed over geological time. They are energy-dense and established but non-renewable. Combustion releases carbon dioxide and can release other pollutants."]),
      section("Renewable alternatives",["Solar, wind, hydroelectric, geothermal, biomass and ocean-energy options are renewable on human time scales. Their usefulness depends on geography, weather, storage, grid capacity, cost and environmental trade-offs."]),
      section("Caribbean evaluation",["A strong answer weighs advantages and limitations in context. Solar is widely available but intermittent; wind depends on suitable sites; geothermal potential is concentrated in volcanic islands; hydroelectricity depends on relief and rainfall."])
    ],
    ["No energy source is impact-free.","Caribbean energy decisions should be evaluated using local conditions.","Renewables can reduce fossil-fuel dependence but may require storage and grid changes."],
    {title:"Energy-choice evaluation",prompt:"Why might solar power need battery storage?",steps:["Solar output falls at night and with cloud cover.","Demand may occur when generation is low."],answer:"Storage keeps some generated energy available when sunlight is insufficient."}
  ),
  topic("is-m2-t4-electricity","module-2-energy",204,"Electricity and Lighting",
    ["2.4.1 Examine conductors.","2.4.2 Examine circuit current.","2.4.3 Assess household electricity consumption.","2.4.4 Discuss electrical safety.","2.4.5 Discuss energy conservation.","2.4.6 Compare artificial light sources.","2.4.7 Discuss first aid for electrical accidents.","2.4.8 Discuss electrical hazards.","2.4.9 Discuss fire extinguishing.","2.4.10 Explain protective gear."],
    "Electricity is studied through circuits, household energy use, safety and efficient lighting.",
    [
      section("Circuits and measurements",["Current is the rate of flow of charge, voltage is energy transferred per unit charge, and resistance opposes current. Ammeters are connected in series and voltmeters in parallel. For an ohmic conductor at constant temperature, current is proportional to voltage."]),
      section("Household electricity",["Electrical energy is commonly billed in kilowatt-hours. Energy used = power × time. Appliances with greater power or longer operating time use more energy."],["1 kWh = energy used by a 1 kW device for 1 hour.","Fuse, breaker and earth systems reduce electrical risk."]),
      section("Lighting and safety",["Compare lamp technologies using efficiency, lifespan, brightness, heat and cost. For an electrical accident, isolate the supply before touching the casualty when safe to do so, call for help and follow trained first-aid procedures. Use the correct extinguisher for the type of fire."])
    ],
    ["Meters must be connected correctly.","Household energy depends on both power and time.","Electrical safety actions should remove the hazard before assisting."],
    {title:"Electricity cost",prompt:"A 1.5 kW heater runs for 2 h. Find energy used.",steps:["Energy = power × time.","1.5 × 2 = 3.0 kWh."],answer:"3.0 kWh"}
  ),
  topic("is-m2-t5-heat-ventilation","module-2-energy",205,"Temperature Control and Ventilation",
    ["2.5.1 Examine heat transfer.","2.5.2 Outline thermostats.","2.5.3 Compare thermometers.","2.5.4 Explain human temperature regulation.","2.5.5 Explain ventilation."],
    "Thermal-energy transfer explains household insulation, cooling, thermostats and temperature regulation.",
    [
      section("Conduction, convection and radiation",["Conduction transfers thermal energy through collisions and free electrons, especially in metals. Convection occurs in fluids when density changes cause bulk movement. Infrared radiation transfers energy without requiring matter."]),
      section("Control and measurement",["Thermostats use temperature-sensitive components to switch heating or cooling systems. Thermometers differ in range, sensitivity, response time, robustness and suitable use."]),
      section("Humans and buildings",["Sweating and increased skin blood flow increase heat loss; shivering and reduced skin blood flow help conserve or generate heat. Ventilation replaces stale air, controls humidity and heat, and can reduce accumulation of pollutants."])
    ],
    ["Heat transfer can occur by conduction, convection and radiation.","Temperature-control devices use feedback.","Ventilation is important for heat, moisture and air quality."],
    {title:"Black and shiny surfaces",prompt:"Which surface is the better infrared emitter: dull black or shiny silver?",steps:["Dull black surfaces are strong absorbers and emitters.","Shiny surfaces are weak emitters."],answer:"Dull black."}
  ),

  topic("is-m3-t1-universe","module-3-our-planet",301,"The Universe and Our Solar System",
    ["3.1.1 Identify universe components.","3.1.2 Explain orbits.","3.1.3 Describe the solar system.","3.1.4 Discuss effects of other bodies on Earth.","3.1.5 Discuss exploration."],
    "Space science connects gravity, orbital motion, the solar system and the effects of space exploration.",
    [
      section("Scale of the universe",["The universe contains galaxies, stars, planetary systems, gas, dust and other matter and energy. Our Solar System is within the Milky Way galaxy."]),
      section("Orbits and Earth",["Gravity provides the inward force that keeps planets and satellites in orbit. Earth's rotation causes day and night, while its revolution around the Sun and axial tilt are central to seasonal patterns. The Moon contributes strongly to tides."]),
      section("Exploration",["Satellites support communication, weather observation, navigation and environmental monitoring. Space exploration also brings scientific benefits, cost, risk and debris-management challenges."])
    ],
    ["Gravity is central to orbital motion.","Rotation and revolution have different effects.","Space technology has practical Caribbean uses such as weather monitoring."],
    {title:"Orbit reasoning",prompt:"Why does a satellite not simply fly away in a straight line?",steps:["Its inertia tends to carry it forward.","Gravity continuously accelerates it toward Earth."],answer:"Gravity bends its motion into an orbit."}
  ),
  topic("is-m3-t2-terrestrial","module-3-our-planet",302,"The Terrestrial Environment",
    ["3.2.1 Examine Caribbean air masses.","3.2.2 Examine Caribbean weather.","3.2.3 Examine tides.","3.2.4 Explain volcanic eruptions."],
    "Caribbean weather, tides and volcanic activity can be explained using physical processes and regional geography.",
    [
      section("Weather and air masses",["Air masses carry temperature and moisture characteristics from their source regions. Trade winds, tropical waves, fronts and pressure systems influence Caribbean weather. Weather describes short-term atmospheric conditions; climate describes long-term patterns."]),
      section("Tides",["Tides result mainly from gravitational interactions involving the Moon and Sun. Spring tides have a larger range when effects reinforce; neap tides have a smaller range when effects partly oppose."]),
      section("Volcanoes",["Magma composition, gas content and viscosity influence eruption style. More viscous magma can trap gases and produce more explosive eruptions. Caribbean volcanic hazards include ash, pyroclastic flows, gases and lahars."])
    ],
    ["Weather and climate are different ideas.","Tide range varies with Sun-Moon-Earth geometry.","Volcanic eruption style is strongly affected by magma viscosity and gas."],
    {title:"Spring or neap tide?",prompt:"The Sun, Earth and Moon are nearly aligned. Which tide range is expected?",steps:["Solar and lunar tidal effects reinforce each other.","This creates a larger tidal range."],answer:"A spring tide."}
  ),
  topic("is-m3-t3-water","module-3-our-planet",303,"Water and the Aquatic Environment",
    ["3.3.1 Discuss water properties.","3.3.2 Distinguish hard and soft water.","3.3.3 Explain water uses.","3.3.4 Describe fishing methods.","3.3.5 Evaluate water pollution.","3.3.6 Investigate purification.","3.3.7 Determine flotation conditions.","3.3.8 Explain navigation devices.","3.3.9 Identify water safety devices.","3.3.10 Discuss diving effects."],
    "Water is studied as a substance, a resource, a habitat and a medium for transport and recreation.",
    [
      section("Water quality and treatment",["Water dissolves many substances and has useful thermal properties. Hard water contains dissolved calcium or magnesium ions and forms less lather with soap. Treatment may include screening, sedimentation, filtration and disinfection."]),
      section("Aquatic resources and pollution",["Fishing methods should be evaluated for efficiency and sustainability. Sewage, fertiliser, oil, plastics and industrial wastes can reduce water quality, damage habitats and alter oxygen levels."]),
      section("Flotation, navigation and diving",["An object floats when forces balance and its average density and displaced-water upthrust are sufficient. Navigation may use compass, charts, GPS, radar and sonar. Diving changes pressure with depth and can affect gas spaces and dissolved gases in the body."])
    ],
    ["Water treatment uses several stages for different contaminants.","Pollution can affect both organisms and human water use.","Floating and diving questions require forces and pressure reasoning."],
    {title:"Floating condition",prompt:"A boat is floating at rest. Compare its weight and upthrust.",steps:["It has no vertical acceleration.","Resultant vertical force is zero."],answer:"Upthrust equals weight."}
  ),
  topic("is-m3-t4-forces","module-3-our-planet",304,"Forces",
    ["3.4.1 Investigate forces.","3.4.2 Describe gravity.","3.4.3 Determine centre of gravity.","3.4.4 Investigate equilibrium.","3.4.5 Examine momentum conservation.","3.4.6 Explain simple machines.","3.4.7 Relate skeleton to function.","3.4.8 Explain skeletal-muscle movement.","3.4.9 Examine machine efficiency."],
    "Forces explain motion, balance, machines and movement of the human skeleton.",
    [
      section("Force, motion and equilibrium",["A force can change motion or shape. Weight is the gravitational force on a mass. A body in equilibrium has zero resultant force and zero resultant turning effect. The centre of gravity is the effective point through which weight acts."]),
      section("Momentum and machines",["Momentum = mass × velocity. In an isolated interaction total momentum is conserved. Simple machines trade force for distance; mechanical advantage compares load with effort, while efficiency compares useful output with input."]),
      section("Skeleton and muscles",["Bones provide support, protection and levers for movement. Joints allow controlled motion. Skeletal muscles work by contraction and commonly act in antagonistic pairs across joints."])
    ],
    ["Equilibrium requires balanced forces and moments.","Momentum is conserved in an isolated system.","Machines cannot be more than 100% efficient."],
    {title:"Moment",prompt:"A 20 N force acts 0.40 m from a pivot. Find the moment.",steps:["Moment = force × perpendicular distance.","20 × 0.40 = 8.0 N m."],answer:"8.0 N m"}
  ),
  topic("is-m3-t5-materials","module-3-our-planet",305,"Metals and Non-metals",
    ["3.5.1 Relate properties to uses.","3.5.2 Compare metal reactivity.","3.5.3 Discuss aluminium utensils.","3.5.4 Discuss alloys.","3.5.5 Examine rusting.","3.5.6 Discuss tarnish prevention."],
    "Material choice depends on properties such as strength, conductivity, density, corrosion resistance and reactivity.",
    [
      section("Properties and uses",["Metals are generally good electrical and thermal conductors, malleable and strong, while non-metals show a wider range of properties. A good answer links a named property to the exact use."]),
      section("Reactivity and alloys",["More reactive metals lose electrons more readily. Reactivity affects extraction, corrosion and safe use. Alloys combine elements to produce properties such as greater strength, hardness or corrosion resistance."]),
      section("Corrosion",["Rusting of iron requires water and oxygen. Salt can accelerate corrosion. Painting, oiling, plastic coating, galvanising and sacrificial protection work by excluding reactants or providing a more reactive metal."])
    ],
    ["Always link properties to uses.","Alloys are designed for improved combinations of properties.","Rusting requires both oxygen and water."],
    {title:"Rusting control",prompt:"Why does galvanising protect iron even after a small scratch?",steps:["Zinc is more reactive than iron.","Zinc oxidises preferentially and protects the iron."],answer:"The zinc provides sacrificial protection."}
  ),
  topic("is-m3-t6-household-chemistry","module-3-our-planet",306,"Household Chemicals",
    ["3.6.1 Discuss household chemicals.","3.6.2 Examine acids, bases and salts.","3.6.3 Differentiate states of matter.","3.6.4 Examine mixtures.","3.6.5 Determine separation techniques.","3.6.6 Explain cleaning-agent effects.","3.6.7 Distinguish soap and soapless detergents."],
    "Household chemistry applies acids, bases, mixtures, separation and detergents to everyday products and safe use.",
    [
      section("Acids, bases and salts",["Acids produce hydrogen ions in aqueous solution and have pH below 7; bases neutralise acids and soluble bases are alkalis. Indicators change colour over characteristic pH ranges. Neutralisation can produce a salt and water."]),
      section("Matter, mixtures and separation",["Solids, liquids and gases differ in particle arrangement and motion. Mixtures contain substances not chemically combined. Filtration, decanting, evaporation, crystallisation, distillation and chromatography are chosen according to differences in particle size, solubility, boiling point or attraction."]),
      section("Cleaning agents",["Soaps can form scum in hard water; soapless detergents are less affected by hardness. Cleaning agents can damage surfaces if they are too acidic, alkaline, abrasive or reactive, so labels and safe handling matter."])
    ],
    ["Choose separation methods based on physical properties.","Neutralisation involves acid-base reaction.","Cleaning chemicals must be matched safely to surfaces and tasks."],
    {title:"Separation choice",prompt:"How would you obtain pure water from salt solution?",steps:["Filtration cannot remove dissolved salt.","Boil the water and condense the vapour."],answer:"Simple distillation."}
  ),
  topic("is-m3-t7-pollution","module-3-our-planet",307,"Pollutants and Environment",
    ["3.7.1 Discuss air pollution.","3.7.2 Justify community hygiene.","3.7.3 Discuss plastics."],
    "Environmental health depends on reducing pollution, managing waste and making responsible material choices.",
    [
      section("Air pollution",["Common air pollutants include particulate matter, carbon monoxide, sulfur dioxide, nitrogen oxides and excess greenhouse gases. Sources include vehicles, industry, open burning and some energy generation. Effects can include respiratory illness, smog, acid deposition and climate change."]),
      section("Community hygiene",["Safe waste storage, regular collection, drainage maintenance, clean water, sewage treatment and vector control reduce disease risk and environmental contamination. Community hygiene works best when households, businesses and public agencies all participate."]),
      section("Plastics",["Plastics are useful because they are light, durable and mouldable, but persistence can create long-term waste and marine-pollution problems. Reduce, reuse, suitable recycling, product redesign and responsible disposal can lower impacts."])
    ],
    ["Pollution answers should identify source, pollutant, effect and control.","Community hygiene protects both people and ecosystems.","Plastic use involves benefits as well as disposal challenges."],
    {title:"Pollution chain",prompt:"Open burning produces fine particles. Give one likely health effect and one control.",steps:["Particles can enter the respiratory system.","A control should reduce burning or capture/manage waste differently."],answer:"Respiratory irritation or disease; improve waste collection and avoid open burning."}
  ),
]);

export function integratedScienceStudyStructure(){
  return {
    sections:INTEGRATED_SCIENCE_STUDY_SECTIONS.map(row=>({...row})),
    topics:INTEGRATED_SCIENCE_STUDY_TOPICS.map(row=>({...row})),
    activities:[],
  };
}
