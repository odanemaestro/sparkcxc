export const ELECTRICITY_INTERACTIVES=Object.freeze([
{id:'d1-charge-transfer',topic:'D1',title:'Charge transfer explorer',objectives:['D1.1','D1.2'],action:'Move electrons between materials and compare attraction and repulsion.'},
{id:'d1-induction-field',topic:'D1',title:'Induction and electric field',objectives:['D1.3','D1.4','D1.5'],action:'Follow charge separation, earthing order and electric field direction.'},
{id:'d2-charge-current',topic:'D2',title:'Charge and current',objectives:['D2.1','D2.2','D2.3','D2.4','D2.5'],action:'Change current and time and calculate transferred charge while comparing electron and conventional-current directions.'},
{id:'d2-ac-waveform',topic:'D2',title:'A.C. waveform analyser',objectives:['D2.6','D2.7'],action:'Change period and peak voltage and read frequency and peak value.'},
{id:'d3-power-energy',topic:'D3',title:'Electrical power and energy',objectives:['D3.1','D3.2','D3.3','D3.4'],action:'Change voltage, current and time and compare power, energy and conservation choices.'},
{id:'d4-ohms-law',topic:'D4',title:"Ohm's law lab",objectives:['D4.6','D4.7','D4.8','D4.9','D4.10'],action:'Change potential difference and resistance, observe current and connect meter placement with resistance requirements.'},
{id:'d4-series-parallel',topic:'D4',title:'Series and parallel network',objectives:['D4.1','D4.2','D4.11','D4.12','D4.13'],action:'Build series and parallel resistor combinations and compare equivalent resistance and branch behaviour.'},
{id:'d4-domestic-safety',topic:'D4',title:'Domestic electrical safety',objectives:['D4.14','D4.15','D4.16'],action:'Select appliance power and supply voltage, calculate operating current and choose an appropriate protective device.'},
{id:'d4-cell-recharge',topic:'D4',title:'Cells and recharging',objectives:['D4.3','D4.4','D4.5'],action:'Compare primary and secondary cells and review the correct polarity for recharging.'},
{id:'d5-diode-rectifier',topic:'D5',title:'Half-wave rectifier',objectives:['D5.1','D5.2'],action:'Compare alternating input with the one-direction pulsed output of a semiconductor diode.'},
{id:'d5-logic-gates',topic:'D5',title:'Logic gate builder',objectives:['D5.3','D5.4','D5.5'],action:'Set binary inputs, choose gates and verify truth-table outputs for short gate combinations.'},
{id:'d5-technology-impact',topic:'D5',title:'Technology impact balance',objectives:['D5.6'],action:'Sort positive and negative social effects and build a balanced discussion.'},
{id:'d6-magnetic-fields',topic:'D6',title:'Magnetic field mapper',objectives:['D6.1','D6.2','D6.3','D6.4','D6.5','D6.6','D6.7'],action:'Compare magnetic materials, pole forces and plotting-compass field direction.'},
{id:'d7-current-field',topic:'D7',title:'Current and magnetic field',objectives:['D7.1','D7.2','D7.3'],action:'Change current direction and inspect the field around a conductor and solenoid.'},
{id:'d7-motor-effect',topic:'D7',title:'Motor effect lab',objectives:['D7.4','D7.5','D7.6','D7.7','D7.8'],action:'Change field, current and conductor direction and apply Fleming’s left-hand rule.'},
{id:'d7-induction-generator',topic:'D7',title:'Induction and generator',objectives:['D7.9','D7.10','D7.11','D7.12'],action:'Change field strength and motion and compare induced e.m.f. magnitude and direction.'},
{id:'d7-transformer',topic:'D7',title:'Transformer explorer',objectives:['D7.13','D7.14','D7.15'],action:'Change turns ratio and primary values, then calculate ideal secondary voltage and current.'}
]);export function electricityInteractivesForTopic(topicId){return ELECTRICITY_INTERACTIVES.filter(i=>i.topic===topicId)}
