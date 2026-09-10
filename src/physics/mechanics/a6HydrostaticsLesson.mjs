export const A6_OBJECTIVES=Object.freeze({
  'A6.1':'define pressure and apply definition',
  'A6.2':'relate the pressure at a point in a fluid to its depth and the density',
  'A6.3':'apply Archimedes’ principle to predict whether a body would float or sink in a given fluid',
});
const card=(id,inShort,understand,examined,watchOut)=>({id,syllabusWording:A6_OBJECTIVES[id],inShort,understand,examined,watchOut});
export const A6_HYDROSTATICS_LESSON=Object.freeze({
  id:'A6',section:'A',title:'Hydrostatics',tagline:'Understand pressure in fluids and use upthrust to explain floating and sinking.',
  summary:'Hydrostatics studies fluids at rest. You calculate pressure, explain why fluid pressure changes with depth and density, and apply Archimedes’ principle to rafts, boats, balloons and submarines.',
  formulae:[
    {name:'Pressure',equation:'p = F/A',unit:'Pa = N m⁻²',condition:'F is the force normal to the surface'},
    {name:'Pressure due to a fluid',equation:'p = ρgh',unit:'Pa',condition:'p is the pressure due to the fluid column at depth h'},
    {name:'Archimedes’ principle',equation:'upthrust = weight of fluid displaced',unit:'N',condition:'weight of displaced fluid = ρfluid g Vdisplaced'},
  ],
  sections:[
    {id:'pressure',heading:'1. Pressure',objectives:['A6.1'],paragraphs:[
      'Pressure is the normal force per unit area: p = F/A. Normal means perpendicular to the surface.',
      'The SI unit is the pascal, Pa. One pascal is one newton per square metre. A given force produces a greater pressure when it acts over a smaller area.',
      'If the force comes from an object’s weight, calculate W = mg first. Convert areas to square metres before using SI units: 1 cm² = 1 × 10⁻⁴ m².',
      'Pressure and force are different quantities. A large force can produce a modest pressure if spread over a large area.'
    ],interactives:['Pressure Footprint: keep force fixed and vary contact area to see pressure change']},
    {id:'fluid-pressure',heading:'2. Pressure in a fluid at rest',objectives:['A6.2'],paragraphs:[
      'For a liquid of density ρ at depth h, the pressure due to the liquid is p = ρgh. It increases with depth, density and gravitational field strength.',
      'This expression gives gauge pressure due to the fluid column. If a question asks for total or absolute pressure at the point, add the pressure acting on the fluid surface, such as atmospheric pressure.',
      'In one connected fluid at rest, points at the same horizontal level have the same pressure. Container shape and width do not change the pressure at a given depth.',
      'The lower parts of a dam experience greater water pressure because they are at greater depth. A can with holes at different heights sends water farther from the lower holes for the same reason.'
    ],interactives:['Pressure-Depth Tank: drag a sensor through fluids of different density and compare equal-depth points','Hole-Jet Visualizer: compare outflow from holes at different depths']},
    {id:'archimedes',heading:'3. Upthrust and Archimedes’ principle',objectives:['A6.3'],paragraphs:[
      'A body immersed in a fluid experiences an upward resultant force called upthrust because fluid pressure is generally greater on its lower surfaces than on its upper surfaces.',
      'Archimedes’ principle states that the upthrust on a body equals the weight of the fluid displaced by the body.',
      'For a fully immersed body, upthrust = ρfluid g Vobject. Compare this with the body’s weight. If upthrust is greater, the body accelerates upward; if smaller, it sinks; if equal, it can remain neutrally buoyant.',
      'A floating body is in vertical equilibrium, so upthrust equals its weight. It therefore displaces a weight of fluid equal to its own weight. Only the submerged part contributes to displaced volume.',
      'Average density is often the quickest way to predict behaviour when fully immersed. An object less dense than the fluid can rise and float; equal density gives neutral buoyancy; greater density gives a tendency to sink. Hollow boats float because their overall average density, including the enclosed air space, can be less than the water.',
      'Submarines change their average density by taking water into or forcing water out of ballast tanks. Balloons use the same buoyancy idea in air, which is also a fluid.'
    ],interactives:['Buoyancy Lab: vary object mass, volume and fluid density and compare weight with upthrust','Submarine Ballast: add or remove ballast and watch average density and net force change']},
  ],
  objectiveCards:Object.freeze([
    card('A6.1','Pressure is force acting normally per unit area: p = F/A.','Use the force perpendicular to the surface and express area in m² for pascals. Smaller contact area gives greater pressure for the same force.','Define pressure, state its unit, or calculate pressure on a surface.','Do not use mass in kilograms as the force; convert mass to weight when necessary.'),
    card('A6.2','Fluid pressure due to a column is p = ρgh and increases with density and depth.','At the same horizontal level in the same connected fluid at rest, pressure is the same. The formula gives pressure due to the fluid; add surface pressure only if total pressure is requested.','Calculate fluid pressure or explain observations such as dams and holes at different depths.','Do not make pressure depend on container width or total volume when depth and fluid are unchanged.'),
    card('A6.3','Upthrust equals the weight of fluid displaced. Compare upthrust with weight to predict motion or equilibrium.','A floating body displaces its own weight of fluid. For a fully immersed object, average density relative to fluid density predicts whether it tends to rise, remain neutral or sink.','Apply Archimedes’ principle to rafts, boats, balloons, submarines and immersed objects.','Do not say a floating object has no weight; it floats because upthrust balances weight.'),
  ]),
  commonMistakes:['Using mass instead of force in p = F/A.','Forgetting to convert cm² to m².','Adding atmospheric pressure when only pressure due to the liquid is requested.','Assuming container shape changes pressure at equal depth.','Using the full object volume for a partially submerged floating body.','Saying upthrust must be greater than weight for a body floating at rest.'],
  interactives:['Pressure Footprint','Pressure-Depth Tank','Hole-Jet Visualizer','Buoyancy Lab','Submarine Ballast'],
});
