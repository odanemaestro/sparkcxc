function finite(v,n){const x=Number(v);if(!Number.isFinite(x))throw new TypeError(`${n} must be finite`);return x}function positive(v,n){const x=finite(v,n);if(x<=0)throw new RangeError(`${n} must be > 0`);return x}
export function chargeFromCurrentTime({currentA,timeS}){return finite(currentA,'currentA')*positive(timeS,'timeS')}
export function currentFromChargeTime({chargeC,timeS}){return finite(chargeC,'chargeC')/positive(timeS,'timeS')}
export function frequencyFromPeriod(periodS){return 1/positive(periodS,'periodS')}
export function voltageFromEnergyCharge({energyJ,chargeC}){return finite(energyJ,'energyJ')/positive(chargeC,'chargeC')}
export function electricalPower({currentA,voltageV}){return finite(currentA,'currentA')*finite(voltageV,'voltageV')}
export function electricalEnergy({powerW,timeS}){return finite(powerW,'powerW')*positive(timeS,'timeS')}
export function resistance({voltageV,currentA}){return finite(voltageV,'voltageV')/positive(currentA,'currentA')}
export function seriesResistance(values){if(!Array.isArray(values)||!values.length)throw new TypeError('values required');return values.reduce((s,v)=>s+positive(v,'resistance'),0)}
export function parallelResistance(values){if(!Array.isArray(values)||!values.length)throw new TypeError('values required');return 1/values.reduce((s,v)=>s+1/positive(v,'resistance'),0)}
export function applianceCurrent({powerW,voltageV}){return positive(powerW,'powerW')/positive(voltageV,'voltageV')}
export function idealTransformerVoltage({primaryV,primaryTurns,secondaryTurns}){return finite(primaryV,'primaryV')*positive(secondaryTurns,'secondaryTurns')/positive(primaryTurns,'primaryTurns')}
export function idealTransformerCurrent({primaryV,primaryCurrentA,secondaryV}){return positive(primaryV,'primaryV')*positive(primaryCurrentA,'primaryCurrentA')/positive(secondaryV,'secondaryV')}
export function logicGate(gate,a,b=0){const A=a?1:0,B=b?1:0;switch(String(gate).toUpperCase()){case'AND':return A&&B?1:0;case'OR':return A||B?1:0;case'NOT':return A?0:1;case'NAND':return A&&B?0:1;case'NOR':return A||B?0:1;default:throw new RangeError('unknown gate')}}
export function magneticPoleForce(a,b){return String(a).toUpperCase()===String(b).toUpperCase()?'repel':'attract'}
export function motorForceFactor({fieldT,currentA,lengthM}){return positive(fieldT,'fieldT')*positive(currentA,'currentA')*positive(lengthM,'lengthM')}
export function inducedEmfIndex({fieldT,lengthM,speedMps}){return positive(fieldT,'fieldT')*positive(lengthM,'lengthM')*positive(speedMps,'speedMps')}

// Two identical-branch lamp network fed from a battery of negligible internal
// resistance. Series: one path, same current, p.d.s add. Parallel: each lamp
// has the full e.m.f. across it and the branch currents add. `removedLamp`
// models physically unscrewing lamp 2: in series the only path is broken, in
// parallel lamp 1 keeps its own complete path.
export function twoLampNetworkState({emfV,r1,r2,mode='series',switchClosed=true,removedLamp=false}){
  const e=finite(emfV,'emfV');
  const R1=positive(r1,'r1'), R2=positive(r2,'r2');
  const off={openCircuit:false,totalResistanceOhm:mode==='series'?seriesResistance([R1,R2]):parallelResistance([R1,R2]),totalCurrentA:0,lamp1:{currentA:0,voltageV:0,powerW:0},lamp2:{currentA:0,voltageV:0,powerW:0}};
  if(removedLamp&&mode==='series')return{...off,openCircuit:true,totalResistanceOhm:Infinity};
  if(!switchClosed)return removedLamp?{...off,totalResistanceOhm:R1}:off;
  if(removedLamp){ // parallel with lamp 2 removed
    const i1=e/R1;
    return {openCircuit:false,totalResistanceOhm:R1,totalCurrentA:i1,lamp1:{currentA:i1,voltageV:e,powerW:e*i1},lamp2:{currentA:0,voltageV:0,powerW:0}};
  }
  if(mode==='series'){
    const total=seriesResistance([R1,R2]);
    const i=e/total;
    return {openCircuit:false,totalResistanceOhm:total,totalCurrentA:i,lamp1:{currentA:i,voltageV:i*R1,powerW:i*i*R1},lamp2:{currentA:i,voltageV:i*R2,powerW:i*i*R2}};
  }
  const i1=e/R1, i2=e/R2;
  return {openCircuit:false,totalResistanceOhm:parallelResistance([R1,R2]),totalCurrentA:i1+i2,lamp1:{currentA:i1,voltageV:e,powerW:e*i1},lamp2:{currentA:i2,voltageV:e,powerW:e*i2}};
}
