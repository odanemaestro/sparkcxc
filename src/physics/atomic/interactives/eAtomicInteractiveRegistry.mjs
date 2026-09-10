export const ATOMIC_INTERACTIVES=Object.freeze([
{id:'e1-scattering',topic:'E1',title:'Rutherford scattering model',objectives:['E1.1','E1.2'],action:'Change the impact parameter and connect scattering observations with the nuclear model.'},
{id:'e2-atom-builder',topic:'E2',title:'Atom and ion builder',objectives:['E2.1','E2.2','E2.3','E2.4'],action:'Set mass number, atomic number and charge, then compare protons, neutrons and electrons.'},
{id:'e2-isotope-builder',topic:'E2',title:'Isotope explorer',objectives:['E2.5','E2.6'],action:'Hold proton number fixed while changing neutrons and connect shell occupancy with period and group.'},
{id:'e3-radiation-properties',topic:'E3',title:'Radiation properties',objectives:['E3.2','E3.3','E3.4'],action:'Compare alpha, beta and gamma by charge, mass, ionisation, penetration and track appearance.'},
{id:'e3-field-deflection',topic:'E3',title:'Field deflection explorer',objectives:['E3.5'],action:'Select alpha, beta or gamma and compare its response to electric and magnetic fields.'},
{id:'e3-nuclear-equations',topic:'E3',title:'Nuclear equation balancer',objectives:['E3.6'],action:'Apply mass-number and atomic-number conservation to alpha and beta-minus decay.'},
{id:'e3-random-decay',topic:'E3',title:'Random decay model',objectives:['E3.7','E3.8'],action:'Model many random decay trials and separate unpredictable individual events from stable large-sample behaviour.'},
{id:'e3-half-life',topic:'E3',title:'Half-life explorer',objectives:['E3.9','E3.10'],action:'Change elapsed time and half-life and inspect repeated halving of activity or number remaining.'},
{id:'e3-mass-energy',topic:'E3',title:'Mass-energy calculator',objectives:['E3.12'],action:'Convert a small mass change into nuclear energy using E = mc^2.'},
{id:'e3-nuclear-energy-balance',topic:'E3',title:'Nuclear energy evidence balance',objectives:['E3.11','E3.13'],action:'Compare radioisotope applications and build a balanced case for and against nuclear-energy use.'}
]);
export function atomicInteractivesForTopic(topicId){return ATOMIC_INTERACTIVES.filter(i=>i.topic===topicId)}
