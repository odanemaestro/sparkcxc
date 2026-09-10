export const THERMAL_INTERACTIVES=Object.freeze([
  {id:'b1-joule-work-heat',topic:'B1',title:'Joule work-to-heat lab',objectives:['B1.2'],action:'Change falling mass, height and transfer efficiency, then compare mechanical work with the thermal-energy increase.'},
  {id:'b2-gas-laws',topic:'B2',title:'Gas-law explorer',objectives:['B2.10','B2.11','B2.12'],action:'Change pressure, volume and absolute temperature, then predict the new state before reading the calculation.'},
  {id:'b2-kelvin-extrapolation',topic:'B2',title:'Kelvin extrapolation',objectives:['B2.9','B2.10'],action:'Inspect a pressure-temperature trend and identify the extrapolated zero-pressure intercept.'},
  {id:'b2-expansion',topic:'B2',title:'Thermal expansion model',objectives:['B2.7','B2.8'],action:'Change length and temperature rise to compare how much a solid expands.'},
  {id:'b3-heating-curve',topic:'B3',title:'Heating curve explorer',objectives:['B3.4','B3.5'],action:'Add energy and identify warming regions and constant-temperature phase changes.'},
  {id:'b3-specific-heat',topic:'B3',title:'Specific heat experiment',objectives:['B3.2','B3.3'],action:'Change heater power, time, mass and temperature rise, then calculate the measured specific heat capacity.'},
  {id:'b4-radiation-surfaces',topic:'B4',title:'Radiation surface comparison',objectives:['B4.3','B4.4','B4.5'],action:'Compare identical surfaces at one temperature and identify the strongest relative emitter.'},
  {id:'b4-convection',topic:'B4',title:'Convection current explorer',objectives:['B4.2','B4.6'],action:'Change the temperature difference and connect density change with the strength of convection.'},
]);
export function thermalInteractivesForTopic(topicId){return THERMAL_INTERACTIVES.filter(item=>item.topic===topicId);}
