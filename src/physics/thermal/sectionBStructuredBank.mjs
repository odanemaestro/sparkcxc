// Original CSEC-style structured practice for Section B Thermal Physics.
// The mark criteria follow the same one-mark-per-criterion convention used by
// the audited Mechanics structured banks. Drawing and graph marks remain manual.

const c=(code,profile,objective,description,check=null,extra={})=>({code,marks:1,profile,objective,description,...(check?{check}:{}),...extra});

export const SECTION_B_STRUCTURED_BANK=Object.freeze([
  {
    id:'b1-p2-joule-rumford-01',topic:'B1',kind:'extended response',marks:15,
    title:'From caloric to conservation of energy',
    stem:'Two historical experiments changed the scientific explanation of heat. Use the evidence from Rumford and Joule to answer the questions.',
    parts:[
      {id:'a',marks:3,objective:'B1.1',prompt:'State one central idea of the caloric theory and two features of the kinetic explanation of heat.',criteria:[
        c('B1','KC','B1.1','states that caloric was treated as a weightless material fluid or substance',{type:'writtenConcept',all:['heat'],any:['fluid','substance','caloric']}),
        c('B2','KC','B1.1','links thermal behaviour to particle motion',{type:'writtenConcept',all:['particle'],any:['motion','moving','kinetic']}),
        c('B3','KC','B1.1','states that hotter matter has greater average particle kinetic energy or faster particle motion',{type:'writtenConcept',any:['average kinetic energy','move faster','moving faster','greater kinetic energy']}),
      ]},
      {id:'b',marks:4,objective:'B1.1',prompt:'Explain why Rumford’s cannon-boring observations challenged the caloric theory.',criteria:[
        c('B1','UK','B1.1','identifies continuous mechanical work or boring',{type:'writtenConcept',any:['work','boring','friction']}),
        c('B2','UK','B1.1','states that heat continued to be produced while the work continued',{type:'writtenConcept',all:['heat'],any:['continued','continuously','without limit','as long']}),
        c('B3','UK','B1.1','states that a finite store of caloric should have been exhausted',{type:'writtenConcept',any:['run out','exhausted','finite','used up']}),
        c('B4','UK','B1.1','concludes that the observation supports heat being related to energy or particle motion rather than a stored material',{type:'writtenConcept',any:['energy','motion','not a substance','not material','kinetic']}),
      ]},
      {id:'c',marks:5,objective:'B1.2',prompt:'Describe the essential measurements in Joule’s paddle-wheel experiment and state the conclusion drawn from them.',criteria:[
        c('B1','KC','B1.2','identifies falling masses or weights driving the paddle',{type:'writtenConcept',any:['falling mass','falling weight','weights','masses']}),
        c('B2','UK','B1.2','identifies measured mechanical work from the falling masses',{type:'writtenConcept',all:['work'],any:['mgh','height','falling']}),
        c('B3','KC','B1.2','states that the water temperature rise is measured',{type:'writtenConcept',all:['temperature'],any:['rise','change','increase']}),
        c('B4','XS','B1.2','identifies insulation or reducing transfer to the surroundings',{type:'writtenConcept',any:['insulat','lagg','surroundings','heat loss','energy loss']}),
        c('B5','UK','B1.2','concludes that a fixed amount of work corresponds to a fixed thermal-energy increase',{type:'writtenConcept',all:['work'],any:['fixed','equivalent','thermal energy','heat']}),
      ]},
      {id:'d',marks:3,objective:'B1.2',prompt:'A falling mass loses 120 J of gravitational potential energy and 112 J is measured as thermal energy in the water. Explain the 8 J difference and state the conservation principle involved.',criteria:[
        c('B1','UK','B1.2','identifies transfer to the surroundings or apparatus as a reason for the difference',{type:'writtenConcept',any:['surroundings','apparatus','friction','sound','loss']}),
        c('B2','UK','B1.2','states that the energy is transferred rather than destroyed',{type:'writtenConcept',all:['energy'],any:['transferred','not destroyed','not lost from universe']}),
        c('B3','KC','B1.2','states conservation of energy',{type:'writtenConcept',all:['energy'],any:['conserved','conservation']}),
      ]},
    ],
  },
  {
    id:'b2-p2-gas-laws-01',topic:'B2',kind:'structured',marks:15,
    title:'Temperature scales and gas behaviour',
    stem:'A sealed gas sample is used in a series of experiments. Treat the gas-law relationships as ideal over the measured range.',
    parts:[
      {id:'a',marks:2,objective:'B2.4',prompt:'Define the lower and upper fixed points of the Celsius scale.',criteria:[
        c('B1','KC','B2.4','defines the lower fixed point as pure melting ice at 0 °C',{type:'writtenConcept',all:['0'],any:['pure melting ice','melting ice']}),
        c('B2','KC','B2.4','defines the upper fixed point as steam above boiling water at normal atmospheric pressure at 100 °C',{type:'writtenConcept',all:['100'],any:['steam','normal atmospheric pressure','boiling water']}),
      ]},
      {id:'b',marks:3,objective:'B2.9',prompt:'Explain how a pressure against Celsius temperature graph at constant volume is used to establish absolute zero.',criteria:[
        c('B1','UK','B2.9','states that the measured points give an approximately straight-line trend',{type:'writtenConcept',any:['straight line','linear']}),
        c('B2','UK','B2.9','states that the line is extrapolated backwards to zero pressure',{type:'writtenConcept',all:['zero pressure'],any:['extrapolate','extend']}),
        c('B3','UK','B2.9','identifies the intercept near −273 °C as absolute zero and notes that real gases condense before the ideal line is physically followed there',{type:'writtenConcept',all:['273'],any:['absolute zero','condense','extrapolation']}),
      ]},
      {id:'c',marks:5,objective:'B2.11',prompt:'At constant pressure, a gas occupies 240 cm^3 at 27 °C. Calculate its volume at 127 °C.',criteria:[
        c('M1','UK','B2.10','converts 27 °C to 300 K',{type:'containsValues',values:[300],needAll:true}),
        c('M2','UK','B2.10','converts 127 °C to 400 K',{type:'containsValues',values:[400],needAll:true}),
        c('M3','UK','B2.11','uses V1/T1 = V2/T2',{type:'formulaUse',formula:'V1/T1=V2/T2'}),
        c('M4','UK','B2.11','uses the given volume and absolute temperatures',{type:'containsValues',values:[240,300,400],needAll:true}),
        c('A1','UK','B2.11','obtains 320 cm^3',{type:'physicsQuantity',quantity:'volume',value:320,unit:'cm3',relativeTolerance:0.002},{depends:['M3']}),
      ]},
      {id:'d',marks:5,objective:'B2.12',prompt:'Use kinetic theory to explain why the pressure of a fixed volume of gas rises when its temperature is increased.',criteria:[
        c('B1','KC','B2.12','states that gas pressure is caused by particle collisions with the container walls',{type:'writtenConcept',all:['collision'],any:['wall','container']}),
        c('B2','UK','B2.12','states that a higher temperature means greater average particle kinetic energy',{type:'writtenConcept',all:['kinetic energy'],any:['average','greater','increase']}),
        c('B3','UK','B2.12','states that the particles move faster',{type:'writtenConcept',all:['particle'],any:['faster','speed increases','higher speed']}),
        c('B4','UK','B2.12','states that wall collisions occur more frequently and/or with greater momentum change',{type:'writtenConcept',any:['more frequent','more often','harder','greater force','momentum']}),
        c('B5','UK','B2.12','links the changed collisions to increased pressure',{type:'writtenConcept',all:['pressure'],any:['increase','greater','rises']}),
      ]},
    ],
  },
  {
    id:'b2-p2-particles-thermometers-01',topic:'B2',kind:'extended response',marks:15,
    title:'Particles, thermometers and expansion',
    stem:'A laboratory uses liquid-in-glass thermometers and observes how solids, liquids and gases respond when heated.',
    parts:[
      {id:'a',marks:4,objective:'B2.6',prompt:'Compare the particle arrangement and motion in a solid, a liquid and a gas.',criteria:[
        c('B1','KC','B2.6','solid particles are close and vibrate about fixed positions',{type:'writtenConcept',all:['solid'],any:['fixed position','vibrate']}),
        c('B2','KC','B2.6','liquid particles remain close but can move or slide past one another',{type:'writtenConcept',all:['liquid'],any:['slide','move past','not fixed']}),
        c('B3','KC','B2.6','gas particles are widely separated',{type:'writtenConcept',all:['gas'],any:['far apart','widely separated','large spaces']}),
        c('B4','KC','B2.6','gas particles move rapidly and randomly in all directions',{type:'writtenConcept',all:['gas'],any:['random','rapid','all directions']}),
      ]},
      {id:'b',marks:3,objective:'B2.7',prompt:'Use kinetic theory to explain why a gas is much easier to compress than a liquid.',criteria:[
        c('B1','UK','B2.7','gas particles have large spaces between them',{type:'writtenConcept',all:['gas'],any:['space','far apart']}),
        c('B2','UK','B2.7','compression reduces the empty space rather than squeezing the particles themselves',{type:'writtenConcept',any:['empty space','closer','not particles','particles do not']}),
        c('B3','UK','B2.7','liquid particles are already close together so there is little space to remove',{type:'writtenConcept',all:['liquid'],any:['close','little space','touching']}),
      ]},
      {id:'c',marks:4,objective:'B2.8',prompt:'Explain why an expansion gap is left in a bridge or railway structure and what could happen if no allowance were made.',criteria:[
        c('B1','KC','B2.8','states that the material expands when heated',{type:'writtenConcept',all:['expand'],any:['heat','temperature']}),
        c('B2','UK','B2.8','links heating to increased particle vibration and average separation',{type:'writtenConcept',all:['particle'],any:['vibrate','separation','further apart']}),
        c('B3','UK','B2.8','states that the gap or roller gives the structure room to expand',{type:'writtenConcept',any:['gap','roller','room','space']}),
        c('B4','UK','B2.8','identifies buckling, bending, cracking or damaging stress without the allowance',{type:'writtenConcept',any:['buckle','bend','crack','stress','damage']}),
      ]},
      {id:'d',marks:4,objective:'B2.3',prompt:'State two design features that make a liquid-in-glass thermometer more sensitive and explain the effect of each feature.',responseFields:['feature1','feature2'],criteria:[
        c('B1','KC','B2.3','identifies a narrow bore or capillary',{type:'writtenConcept',any:['narrow bore','narrow capillary','thin tube']},{field:'feature1'}),
        c('B2','UK','B2.3','explains that a small volume expansion produces a larger movement of the column',{type:'writtenConcept',any:['moves further','larger movement','greater length','more movement']},{field:'feature1'}),
        c('B3','KC','B2.3','identifies a relatively large bulb or suitable high-expansion liquid',{type:'writtenConcept',any:['large bulb','expands more','high expansion']},{field:'feature2'}),
        c('B4','UK','B2.3','explains that more liquid expansion is produced for a given temperature change',{type:'writtenConcept',any:['more expansion','greater expansion','given temperature','small temperature']},{field:'feature2'}),
      ]},
    ],
  },
  {
    id:'b2-p2-thermal-equilibrium-01',topic:'B2',kind:'structured',marks:15,
    title:'Thermal equilibrium and thermometry',
    stem:'A student uses a thermometer to compare the temperatures of several objects in a laboratory.',
    parts:[
      {id:'a',marks:3,objective:'B2.1',prompt:'Explain what happens when a thermometer at 20 °C is placed in contact with water at 60 °C and state when the reading is valid.',criteria:[
        c('B1','KC','B2.1','states net thermal energy initially transfers from the hotter water to the cooler thermometer',{type:'writtenConcept',all:['water'],any:['to thermometer','hotter','60']}),
        c('B2','KC','B2.1','states the transfer continues until they reach the same temperature',{type:'writtenConcept',all:['same temperature'],any:['until','equilibrium']}),
        c('B3','UK','B2.1','identifies this condition as thermal equilibrium with no net energy transfer',{type:'writtenConcept',all:['equilibrium'],any:['no net','no overall','same temperature']}),
      ]},
      {id:'b',marks:3,objective:'B2.2',prompt:'Name three different physical properties that vary with temperature and are used as thermometric properties.',criteria:[
        c('B1','KC','B2.2','names liquid-column length or liquid volume',{type:'writtenConcept',any:['liquid column','liquid volume','mercury','alcohol']}),
        c('B2','KC','B2.2','names electrical resistance',{type:'writtenConcept',all:['resistance']}),
        c('B3','KC','B2.2','names gas pressure or thermocouple voltage as another valid property',{type:'writtenConcept',any:['gas pressure','pressure','voltage','thermocouple']}),
      ]},
      {id:'c',marks:3,objective:'B2.5',prompt:'Relate the temperature of a body to the motion of its particles.',criteria:[
        c('B1','KC','B2.5','states temperature is related to average particle kinetic energy',{type:'writtenConcept',all:['average','kinetic energy']}),
        c('B2','UK','B2.5','states particles move faster on average when temperature rises',{type:'writtenConcept',all:['particle'],any:['faster','speed increases']}),
        c('B3','UK','B2.5','distinguishes average particle kinetic energy from total thermal energy',{type:'writtenConcept',all:['average'],any:['total energy','thermal energy','amount of substance','mass']}),
      ]},
      {id:'d',marks:3,objective:'B2.3',prompt:'A thermometer must respond quickly to a changing temperature. State two design choices that improve response time and explain one.',criteria:[
        c('B1','KC','B2.3','identifies a small bulb or small thermal mass',{type:'writtenConcept',any:['small bulb','small mass','low mass']}),
        c('B2','KC','B2.3','identifies thin bulb walls or good thermal contact',{type:'writtenConcept',any:['thin wall','thin glass','good contact']}),
        c('B3','UK','B2.3','explains that less energy/time is needed for the thermometer to reach thermal equilibrium',{type:'writtenConcept',any:['equilibrium','faster','less energy','quick response']}),
      ]},
      {id:'e',marks:3,objective:'B2.10',prompt:'Convert −23 °C to kelvin and 350 K to degrees Celsius. Then state the size in kelvin of a temperature rise of 15 °C.',criteria:[
        c('A1','UK','B2.10','obtains 250 K',{type:'physicsQuantity',quantity:'temperature',value:250,unit:'K'}),
        c('A2','UK','B2.10','obtains 77 °C using the CSEC +273 convention',{type:'physicsQuantity',quantity:'temperature',value:77,unit:'°C'}),
        c('A3','UK','B2.10','states that a rise of 15 °C is a rise of 15 K',{type:'physicsQuantity',quantity:'temperature_change',value:15,unit:'K'}),
      ]},
    ],
  },
  {
    id:'b3-p2-cooling-curve-01',topic:'B3',kind:'data analysis',marks:25,
    title:'Cooling and phase change',
    stem:'A student cools a pure substance from the liquid state and records its temperature every minute. The readings are: time / min = 0, 1, 2, 3, 4, 5, 6, 7, 8; temperature / °C = 82, 72, 63, 55, 55, 55, 47, 39, 33.',
    parts:[
      {id:'a',marks:5,objective:'B3.4',prompt:'Plot a graph of temperature against time and draw a suitable smooth curve through the points.',requireDrawing:true,criteria:[
        c('M1','XS','B3.4','uses time on the horizontal axis and temperature on the vertical axis',null,{manual:true}),
        c('M2','XS','B3.4','labels both axes with quantities and units',null,{manual:true}),
        c('M3','XS','B3.4','uses a sensible scale that occupies the plotting area',null,{manual:true}),
        c('M4','XS','B3.4','plots the points accurately',null,{manual:true}),
        c('M5','XS','B3.4','draws a suitable smooth cooling curve rather than dot-to-dot segments',null,{manual:true}),
      ]},
      {id:'b',marks:5,objective:'B3.4',prompt:'Use the data to identify the freezing temperature and explain why the temperature remains constant from 3 to 5 minutes even though energy continues to leave the substance.',criteria:[
        c('A1','UK','B3.4','identifies 55 °C as the freezing temperature',{type:'physicsQuantity',quantity:'temperature',value:55,unit:'°C'}),
        c('B1','UK','B3.4','identifies the constant-temperature interval as a phase change',{type:'writtenConcept',any:['phase change','freezing','liquid to solid']}),
        c('B2','UK','B3.4','states that energy continues to transfer from the substance',{type:'writtenConcept',all:['energy'],any:['leaves','transferred','released']}),
        c('B3','UK','B3.4','states that particle potential/intermolecular energy changes rather than average kinetic energy',{type:'writtenConcept',any:['forces','bonds','potential energy','intermolecular']}),
        c('B4','UK','B3.4','links constant average kinetic energy to constant temperature',{type:'writtenConcept',all:['temperature'],any:['kinetic energy','constant']}),
      ]},
      {id:'c',marks:5,objective:'B3.2',prompt:'A 0.20 kg sample of the liquid has specific heat capacity 1800 J/kg K. Calculate the thermal energy transferred as it cools from 82 °C to 55 °C.',criteria:[
        c('M1','UK','B3.2','uses EH = mcΔT',{type:'formulaUse',formula:'E=mcDeltaT'}),
        c('M2','UK','B3.2','calculates ΔT = 27 K or 27 °C',{type:'containsValues',values:[27],needAll:true}),
        c('M3','UK','B3.2','uses mass 0.20 kg and c = 1800 J/kg K',{type:'containsValues',values:[0.2,1800],needAll:true}),
        c('A1','UK','B3.2','obtains 9720 J',{type:'physicsQuantity',quantity:'energy',value:9720,unit:'J'},{depends:['M1']}),
        c('A2','UK','B3.2','expresses the answer in a valid energy unit such as 9.72 kJ',{type:'physicsQuantity',quantity:'energy',value:9720,unit:'J',relativeTolerance:0.002},{depends:['M1']}),
      ]},
      {id:'d',marks:5,objective:'B3.5',prompt:'During freezing, 13.6 kJ is transferred from the 0.20 kg sample. Calculate its specific latent heat of fusion.',criteria:[
        c('M1','UK','B3.5','uses EH = ml or l = E/m',{type:'formulaUse',formula:'E=ml'}),
        c('M2','UK','B3.5','converts 13.6 kJ to 13 600 J or uses consistent units',{type:'containsValues',values:[13.6,13600],need:1}),
        c('M3','UK','B3.5','uses mass 0.20 kg',{type:'containsValues',values:[0.2],needAll:true}),
        c('A1','UK','B3.5','obtains 68 000 J/kg',{type:'physicsQuantity',quantity:'specific_latent_heat',value:68000,unit:'J/kg',relativeTolerance:0.002},{depends:['M1']}),
        c('B1','KC','B3.5','does not include a temperature-change factor during the phase change',{type:'writtenConcept',any:['no temperature change','constant temperature','no deltat','no delta t']}),
      ]},
      {id:'e',marks:5,objective:'B3.4',prompt:'State one source of uncertainty in the cooling experiment, one matching improvement, and explain why repeated temperature readings at fixed time intervals are useful.',responseFields:['error','precaution','repeats'],criteria:[
        c('B1','XS','B3.4','identifies a relevant measurement or environmental limitation',{type:'writtenConcept',any:['parallax','thermometer','heat loss','surroundings','timing','reaction']},{field:'error'}),
        c('B2','XS','B3.4','gives a precaution that addresses the named limitation',{type:'writtenConcept',any:['eye level','insulate','lag','same interval','digital','stir','repeat']},{field:'precaution'}),
        c('B3','XS','B3.4','states that fixed intervals provide comparable data for the cooling trend',{type:'writtenConcept',any:['fixed interval','trend','compare','graph']},{field:'repeats'}),
        c('B4','XS','B3.4','states that repeated readings improve reliability or help identify anomalies',{type:'writtenConcept',any:['reliable','anomal','repeat','average','mean']},{field:'repeats'}),
        c('B5','XS','B3.4','links the measurements to locating the constant-temperature phase-change region',{type:'writtenConcept',any:['plateau','constant temperature','phase change','freezing']},{field:'repeats'}),
      ]},
    ],
  },
  {
    id:'b3-p2-specific-heat-01',topic:'B3',kind:'structured',marks:15,
    title:'Specific heat capacity of a metal block',
    stem:'A student uses a 0.80 kg metal block, an electrical heater rated at 48 W, a thermometer and lagging. The heater is switched on for 300 s and the block temperature rises by 16.0 °C.',
    parts:[
      {id:'a',marks:3,objective:'B3.1',prompt:'Distinguish between heat capacity and specific heat capacity, including their units.',criteria:[
        c('B1','KC','B3.1','defines heat capacity as energy needed to raise the temperature of an object by 1 K',{type:'writtenConcept',all:['energy'],any:['object','body','1 k','one kelvin']}),
        c('B2','KC','B3.1','defines specific heat capacity per kilogram per kelvin',{type:'writtenConcept',all:['kilogram'],any:['kelvin','1 k','temperature']}),
        c('B3','KC','B3.1','states appropriate units J/K and J/(kg K)',{type:'writtenConcept',all:['j'],any:['j/k','j kg','kg k']}),
      ]},
      {id:'b',marks:4,objective:'B3.3',prompt:'Calculate the specific heat capacity of the metal, assuming the heater energy is transferred to the block.',criteria:[
        c('M1','UK','B3.3','calculates electrical energy E = Pt',{type:'formulaUse',formula:'E=Pt'}),
        c('A1','UK','B3.3','obtains E = 14 400 J',{type:'physicsQuantity',quantity:'energy',value:14400,unit:'J'},{depends:['M1']}),
        c('M2','UK','B3.3','uses c = Pt/(mΔT)',{type:'formulaUse',formula:'c=Pt/(mDeltaT)'}),
        c('A2','UK','B3.3','obtains 1125 J/kg K',{type:'physicsQuantity',quantity:'specific_heat_capacity',value:1125,unit:'J/(kg K)',relativeTolerance:0.003},{depends:['M2']}),
      ]},
      {id:'c',marks:5,objective:'B3.3',prompt:'Describe three features of the experimental method that improve the quality of the result and explain why each is useful.',responseFields:['feature1','feature2','feature3'],criteria:[
        c('B1','XS','B3.3','uses lagging or insulation to reduce energy transfer to surroundings',{type:'writtenConcept',any:['lagg','insulat','surroundings']},{field:'feature1'}),
        c('B2','XS','B3.3','improves thermometer contact with oil or good contact',{type:'writtenConcept',any:['oil','contact','thermometer']},{field:'feature2'}),
        c('B3','XS','B3.3','measures the block mass accurately',{type:'writtenConcept',any:['mass','balance','weigh']},{field:'feature3'}),
        c('B4','XS','B3.3','measures heater power and heating time or voltage/current/time',{type:'writtenConcept',any:['power','time','voltage','current','vit','pt']},{field:'response'}),
        c('B5','XS','B3.3','waits for or records the highest/equilibrium temperature or repeats readings',{type:'writtenConcept',any:['highest temperature','maximum temperature','equilibrium','repeat','average']},{field:'response'}),
      ]},
      {id:'d',marks:3,objective:'B3.3',prompt:'The calculated value is lower than a trusted reference value. Give a physical reason and explain the direction of the error.',criteria:[
        c('B1','UK','B3.3','identifies energy transfer to surroundings or apparatus',{type:'writtenConcept',any:['surroundings','heat loss','energy loss','heater','thermometer']}),
        c('B2','UK','B3.3','states that not all electrical input heated the metal block',{type:'writtenConcept',all:['energy'],any:['not all','some','less']}),
        c('B3','UK','B3.3','connects the assumption E = mcΔT to a biased calculated c',{type:'writtenConcept',any:['calculated c','specific heat','too low','lower']}),
      ]},
    ],
  },
  {
    id:'b3-p2-latent-01',topic:'B3',kind:'structured',marks:15,
    title:'Latent heat and evaporation',
    stem:'A 120 W immersion heater boils water steadily. In 240 s the measured mass of water decreases by 12.0 g after correcting for ordinary evaporation.',
    parts:[
      {id:'a',marks:4,objective:'B3.6',prompt:'Calculate the specific latent heat of vaporisation from these readings.',criteria:[
        c('M1','UK','B3.6','uses E = Pt',{type:'formulaUse',formula:'E=Pt'}),
        c('A1','UK','B3.6','obtains 28 800 J supplied',{type:'physicsQuantity',quantity:'energy',value:28800,unit:'J'},{depends:['M1']}),
        c('M2','UK','B3.6','converts 12.0 g to 0.0120 kg and uses l = Pt/m',{type:'formulaUse',formula:'l=Pt/m'}),
        c('A2','UK','B3.6','obtains 2.40 × 10^6 J/kg',{type:'physicsQuantity',quantity:'specific_latent_heat',value:2.4e6,unit:'J/kg',relativeTolerance:0.004},{depends:['M2']}),
      ]},
      {id:'b',marks:4,objective:'B3.6',prompt:'Explain why a control or correction for ordinary evaporation is needed in a latent heat experiment.',criteria:[
        c('B1','XS','B3.6','states that water can be lost without energy from the heater being responsible for all of it',{type:'writtenConcept',any:['evaporation','room','surroundings','without heater']}),
        c('B2','XS','B3.6','states that this extra mass loss would otherwise be attributed to the heater',{type:'writtenConcept',all:['mass'],any:['heater','attributed','counted']}),
        c('B3','UK','B3.6','states that an overestimated mass in l = Pt/m would make the calculated latent heat too low',{type:'writtenConcept',all:['latent heat'],any:['too low','smaller','underestimate']}),
        c('B4','XS','B3.6','describes subtracting the control mass loss or measuring a baseline',{type:'writtenConcept',any:['subtract','control','baseline','correct']}),
      ]},
      {id:'c',marks:4,objective:'B3.7',prompt:'Distinguish between evaporation and boiling and explain why evaporation cools a liquid.',criteria:[
        c('B1','KC','B3.7','states evaporation occurs at the surface and at any temperature',{type:'writtenConcept',all:['surface'],any:['any temperature','all temperatures']}),
        c('B2','KC','B3.7','states boiling occurs throughout the liquid at the boiling point',{type:'writtenConcept',all:['boiling'],any:['throughout','bubbles','boiling point']}),
        c('B3','UK','B3.7','states that faster or higher-energy surface particles escape during evaporation',{type:'writtenConcept',any:['faster particles','high energy','higher energy','fastest']}),
        c('B4','UK','B3.7','states that the average kinetic energy and temperature of the remaining liquid fall',{type:'writtenConcept',all:['average'],any:['kinetic energy','temperature falls','cools']}),
      ]},
      {id:'d',marks:3,objective:'B3.5',prompt:'Explain why temperature does not rise while a pure liquid boils even though energy is continuously supplied.',criteria:[
        c('B1','UK','B3.5','states that supplied energy is used in the phase change',{type:'writtenConcept',all:['energy'],any:['phase change','boiling','change state']}),
        c('B2','UK','B3.5','states that the energy overcomes or separates intermolecular forces',{type:'writtenConcept',any:['force','bond','separate','potential energy']}),
        c('B3','UK','B3.5','states that average kinetic energy does not increase, so temperature remains constant',{type:'writtenConcept',all:['temperature'],any:['kinetic energy','constant','does not increase']}),
      ]},
    ],
  },
  {
    id:'b4-p2-vacuum-flask-01',topic:'B4',kind:'extended response',marks:15,
    title:'Thermal energy transfer and the vacuum flask',
    stem:'A vacuum flask is designed to keep a drink close to its initial temperature for several hours.',
    parts:[
      {id:'a',marks:6,objective:'B4.6',prompt:'Explain how the vacuum, silvered surfaces and stopper reduce thermal energy transfer.',criteria:[
        c('B1','KC','B4.6','states the vacuum contains almost no particles',{type:'writtenConcept',all:['vacuum'],any:['no particles','few particles','almost no matter']}),
        c('B2','UK','B4.6','links the vacuum to reduced conduction',{type:'writtenConcept',all:['vacuum','conduction']}),
        c('B3','UK','B4.6','links the vacuum to reduced convection',{type:'writtenConcept',all:['vacuum','convection']}),
        c('B4','KC','B4.6','identifies the silvered surfaces as shiny/reflective',{type:'writtenConcept',any:['silver','shiny','reflect']}),
        c('B5','UK','B4.6','links silvering to reduced infrared radiation by reflection or low emission',{type:'writtenConcept',all:['radiation'],any:['reflect','poor emitter','low emissivity']}),
        c('B6','UK','B4.6','links the stopper to reduced conduction, convection and/or evaporation through the neck',{type:'writtenConcept',all:['stopper'],any:['conduction','convection','evaporation','neck']}),
      ]},
      {id:'b',marks:3,objective:'B4.1',prompt:'Explain why a metal spoon in a hot drink becomes warm along its length much faster than a wooden spoon.',criteria:[
        c('B1','KC','B4.1','states that conduction transfers energy through the material without bulk movement',{type:'writtenConcept',all:['conduction'],any:['without moving','through material']}),
        c('B2','UK','B4.1','identifies free electrons in metal as rapid energy carriers',{type:'writtenConcept',all:['electron'],any:['free','mobile','carry']}),
        c('B3','UK','B4.1','states wood lacks the same mobile electron conduction mechanism and is a poorer conductor',{type:'writtenConcept',all:['wood'],any:['poor conductor','insulator','no free electron']}),
      ]},
      {id:'c',marks:3,objective:'B4.2',prompt:'Explain why warm air above a heater rises and cooler air moves in to replace it.',criteria:[
        c('B1','UK','B4.2','states heated air expands',{type:'writtenConcept',all:['air'],any:['expand']}),
        c('B2','UK','B4.2','states its density decreases',{type:'writtenConcept',all:['density'],any:['decrease','less dense','lower']}),
        c('B3','UK','B4.2','states the less-dense warm air rises and cooler denser air sinks or moves in, forming convection',{type:'writtenConcept',any:['rises','cooler air','denser','convection']}),
      ]},
      {id:'d',marks:3,objective:'B4.3',prompt:'State three properties of thermal radiation relevant to this flask.',criteria:[
        c('B1','KC','B4.3','identifies thermal radiation as infrared electromagnetic radiation',{type:'writtenConcept',any:['infrared','electromagnetic']}),
        c('B2','KC','B4.3','states radiation does not require a material medium',{type:'writtenConcept',any:['vacuum','no medium','does not need particles']}),
        c('B3','KC','B4.3','states hotter bodies emit more radiation or radiation travels as waves',{type:'writtenConcept',any:['hotter','emit more','wave','speed of light']}),
      ]},
    ],
  },
  {
    id:'b4-p2-radiation-01',topic:'B4',kind:'structured',marks:15,
    title:'Comparing thermal radiation from surfaces',
    stem:'A student compares two identical metal cans. One is dull black and the other is shiny silver. Each contains the same volume of water at the same starting temperature.',
    parts:[
      {id:'a',marks:4,objective:'B4.4',prompt:'Describe a fair experiment to compare how well the two surfaces emit thermal radiation.',criteria:[
        c('B1','XS','B4.4','uses identical containers that differ only in surface finish',{type:'writtenConcept',all:['identical'],any:['surface','black','silver']}),
        c('B2','XS','B4.4','uses equal water volumes and the same starting temperature',{type:'writtenConcept',all:['same'],any:['volume','temperature']}),
        c('B3','XS','B4.4','records temperatures at equal time intervals',{type:'writtenConcept',all:['temperature'],any:['interval','time','minute']}),
        c('B4','XS','B4.4','compares cooling rates or plots temperature against time',{type:'writtenConcept',any:['cooling rate','graph','temperature against time','cools faster']}),
      ]},
      {id:'b',marks:3,objective:'B4.5',prompt:'Predict which can cools faster and explain the prediction.',criteria:[
        c('B1','UK','B4.5','predicts the dull black can cools faster',{type:'writtenConcept',all:['black'],any:['faster','cools more','greater']}),
        c('B2','KC','B4.5','states dull black is a good emitter',{type:'writtenConcept',all:['black'],any:['good emitter','emits']}),
        c('B3','KC','B4.5','states shiny silver is a poor emitter/good reflector',{type:'writtenConcept',all:['silver'],any:['poor emitter','reflect']}),
      ]},
      {id:'c',marks:4,objective:'B4.4',prompt:'The student now investigates absorption using a radiant heater. State two variables that must be controlled and explain why the cans should be placed the same distance from the heater.',responseFields:['control1','control2','distanceReason'],criteria:[
        c('B1','XS','B4.4','identifies a valid control such as water volume, starting temperature, can dimensions or heater output',{type:'writtenConcept',any:['volume','temperature','size','heater','time']},{field:'control1'}),
        c('B2','XS','B4.4','identifies a second valid control',{type:'writtenConcept',any:['volume','temperature','size','heater','time']},{field:'control2'}),
        c('B3','XS','B4.4','states equal distance keeps the incident radiation intensity comparable',{type:'writtenConcept',any:['same intensity','radiation intensity','fair comparison','same radiation']},{field:'distanceReason'}),
        c('B4','XS','B4.4','states only surface finish should be the manipulated variable',{type:'writtenConcept',any:['surface','only variable','fair test','manipulated']},{field:'distanceReason'}),
      ]},
      {id:'d',marks:4,objective:'B4.6',prompt:'Apply the same surface rule to explain why a solar-water-heater absorber is dull black while some insulation surfaces are shiny.',criteria:[
        c('B1','KC','B4.5','states good absorbers are good emitters',{type:'writtenConcept',all:['absorber'],any:['emitter','good emitter']}),
        c('B2','UK','B4.6','links dull black to strong absorption of solar radiation',{type:'writtenConcept',all:['black'],any:['absorb','solar','radiation']}),
        c('B3','UK','B4.6','links shiny surfaces to poor emission/absorption and strong reflection',{type:'writtenConcept',all:['shiny'],any:['reflect','poor emitter','poor absorber']}),
        c('B4','UK','B4.6','connects the surface choice to the intended energy-transfer direction',{type:'writtenConcept',any:['gain energy','reduce loss','keep','thermal transfer']}),
      ]},
    ],
  },
]);

export function sectionBStructuredStats(){
  const topics={};
  for(const q of SECTION_B_STRUCTURED_BANK){topics[q.topic]=(topics[q.topic]||0)+1;}
  const marks=SECTION_B_STRUCTURED_BANK.reduce((sum,q)=>sum+q.marks,0);
  return {questions:SECTION_B_STRUCTURED_BANK.length,marks,byTopic:topics};
}
