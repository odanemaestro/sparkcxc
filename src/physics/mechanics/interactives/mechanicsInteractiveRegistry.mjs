export const MECHANICS_INTERACTIVES=Object.freeze([
  {id:'a1-pendulum',topic:'A1',title:'Pendulum Lab',objectives:['A1.2','A1.3'],skill:'investigate',studentAction:'Change length, mass and angle; time repeated oscillations; compare the data.'},
  {id:'a1-plot-points',topic:'A1',title:'Plot the Points',objectives:['A1.3'],skill:'graph',studentAction:'Plot supplied pendulum data on correctly scaled axes and check each coordinate.'},
  {id:'a1-best-fit',topic:'A1',title:'Best-Fit Challenge',objectives:['A1.4'],skill:'graph',studentAction:'Position a line to represent the overall trend without joining points dot-to-dot.'},
  {id:'a1-gradient',topic:'A1',title:'Gradient Tool',objectives:['A1.5'],skill:'graph',studentAction:'Choose two points far apart on the best-fit line and calculate gradient with units.'},
  {id:'a1-instruments',topic:'A1',title:'Instrument Explorer',objectives:['A1.8','A1.9'],skill:'measure',studentAction:'Read vernier and micrometer scales, apply zero correction, and choose a suitable range.'},
  {id:'a1-density',topic:'A1',title:'Density by Displacement',objectives:['A1.10'],skill:'measure',studentAction:'Read initial/final volumes and calculate density.'},
  {id:'a2-resultant',topic:'A2',title:'Resultant Vector Lab',objectives:['A2.2','A2.3'],skill:'construct',studentAction:'Build triangle/parallelogram resultants and compare measured and calculated answers.'},
  {id:'a2-components',topic:'A2',title:'Component Resolver',objectives:['A2.4'],skill:'resolve',studentAction:'Change magnitude/angle and reconstruct the vector from perpendicular components.'},
  {id:'a3-moment',topic:'A3',title:'Moment Beam',objectives:['A3.7','A3.8','A3.9'],skill:'balance',studentAction:'Move forces along a beam and balance clockwise and anticlockwise moments.'},
  {id:'a3-lever',topic:'A3',title:'Lever Explorer',objectives:['A3.10'],skill:'explain',studentAction:'Move fulcrum, effort and load to compare lever classes and moment arms.'},
  {id:'a3-centre-gravity',topic:'A3',title:'Centre-of-Gravity Lab',objectives:['A3.11'],skill:'investigate',studentAction:'Suspend an irregular lamina from different points and use plumb lines to locate its centre of gravity.'},
  {id:'a3-stability',topic:'A3',title:'Topple or Return?',objectives:['A3.12'],skill:'predict',studentAction:'Change base width, centre-of-gravity height and tilt to predict stability.'},
  {id:'a3-spring',topic:'A3',title:'Force-Extension Lab',objectives:['A3.13','A3.14'],skill:'investigate',studentAction:'Collect force-extension data, identify the proportional region and determine k.'},
  {id:'a4-motion',topic:'A4',title:'Motion Graph Explorer',objectives:['A4.1','A4.2'],skill:'graph',studentAction:'Build velocity-time segments and compare gradient, displacement and distance.'},
  {id:'a4-area',topic:'A4',title:'Velocity-Time Area Builder',objectives:['A4.2'],skill:'graph',studentAction:'Split positive and negative regions of a velocity-time graph and compare signed displacement with total distance.'},
  {id:'a4-newton',topic:'A4',title:"Newton's Laws Lab",objectives:['A4.4','A4.5'],skill:'model',studentAction:'Combine forces, find the resultant and observe the acceleration.'},
  {id:'a4-collision',topic:'A4',title:'Collision and Recoil Lab',objectives:['A4.6','A4.7','A4.8'],skill:'conserve',studentAction:'Change masses and velocities while tracking signed momentum before and after.'},
  {id:'a5-work',topic:'A5',title:'Work Explorer',objectives:['A5.4'],skill:'calculate',studentAction:'Change force, displacement and direction to see which component does work.'},
  {id:'a5-energy',topic:'A5',title:'Energy Conservation Lab',objectives:['A5.6','A5.7','A5.8','A5.9','A5.10'],skill:'conserve',studentAction:'Move a body through height and track gravitational, kinetic and non-useful energy.'},
  {id:'a5-power',topic:'A5',title:'Stair Power Lab',objectives:['A5.11'],skill:'calculate',studentAction:'Change mass, stair height and time to compare useful power.'},
  {id:'a5-efficiency',topic:'A5',title:'Efficiency Flow',objectives:['A5.12','A5.13'],skill:'evaluate',studentAction:'Allocate input energy between useful and non-useful outputs and calculate efficiency.'},
  {id:'a6-pressure',topic:'A6',title:'Pressure Footprint',objectives:['A6.1'],skill:'model',studentAction:'Change force and area to compare pressure.'},
  {id:'a6-depth',topic:'A6',title:'Pressure-Depth Tank',objectives:['A6.2'],skill:'model',studentAction:'Move a sensor through fluids of different density and compare pressure.'},
  {id:'a6-hole-jet',topic:'A6',title:'Hole-Jet Visualizer',objectives:['A6.2'],skill:'predict',studentAction:'Open holes at different depths and compare the qualitative jet reach caused by different fluid pressures.'},
  {id:'a6-buoyancy',topic:'A6',title:'Buoyancy Lab',objectives:['A6.3'],skill:'predict',studentAction:'Change mass, volume and fluid density to predict rise, sink or neutral buoyancy.'},
  {id:'a6-submarine',topic:'A6',title:'Submarine Ballast',objectives:['A6.3'],skill:'apply',studentAction:'Add or remove ballast and compare weight with upthrust.'},
]);

export function validateMechanicsInteractiveRegistry(objectiveIds){
  const known=new Set(objectiveIds);
  const ids=new Set(); const problems=[];
  for(const item of MECHANICS_INTERACTIVES){
    if(ids.has(item.id))problems.push(`duplicate interactive id ${item.id}`); ids.add(item.id);
    if(!/^A[1-6]$/.test(item.topic))problems.push(`invalid topic ${item.topic}`);
    if(!item.objectives.length)problems.push(`${item.id} has no objectives`);
    for(const o of item.objectives)if(!known.has(o))problems.push(`${item.id} references unknown objective ${o}`);
    if(!item.studentAction?.trim())problems.push(`${item.id} needs a student action`);
  }
  return {valid:problems.length===0,problems,count:MECHANICS_INTERACTIVES.length};
}
