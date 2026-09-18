import {chargeFromCurrentTime,frequencyFromPeriod,electricalPower,electricalEnergy,seriesResistance,parallelResistance,applianceCurrent,idealTransformerVoltage,idealTransformerCurrent,logicGate,magneticPoleForce,motorForceFactor,inducedEmfIndex,twoLampNetworkState} from '../dElectricityPhysics.mjs';

const signLabel = value => value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';

export const buildChargeTransferModel=({electrons=3,direction='toRod',testCharge='negative'}={})=>{
  const count=Math.max(0,Math.round(Number(electrons)||0));
  const rodCharge=direction==='toRod'?-count:count;
  const clothCharge=-rodCharge;
  const test=testCharge==='positive'?1:-1;
  const interaction=rodCharge===0?'no electrostatic test force':Math.sign(rodCharge)===test?'repel':'attract';
  return{electrons:count,direction,rodCharge,clothCharge,rodSign:signLabel(rodCharge),clothSign:signLabel(clothCharge),interaction};
};

export const buildElectrostaticInductionModel=({rodSign='negative',stage='separated'}={})=>{
  const negative=String(rodSign).toLowerCase()==='negative';
  const nearSign=negative?'positive':'negative';
  const farSign=negative?'negative':'positive';
  const earthed=stage==='earthed';
  const earthRemoved=stage==='earth-removed';
  const finished=stage==='rod-removed';
  return{
    rodSign:negative?'negative':'positive',stage,nearSign,farSign,
    earthed,
    conductorCharge: finished || earthRemoved ? nearSign : 'net neutral',
    instruction: stage==='separated'?'Charges separate in the conductor.':earthed?'Charge of the same sign as the rod flows to or from Earth.':earthRemoved?'Remove the Earth connection while the rod is still near.':'After the rod is removed, the remaining charge spreads over the conductor.'
  };
};

export const buildCellRechargeModel=({cellType='secondary',polarity='correct'}={})=>{
  const secondary=cellType==='secondary';
  const correct=polarity==='correct';
  return{
    cellType,polarity,
    rechargeable:secondary,
    safeToRecharge:secondary&&correct,
    result:!secondary?'Primary cells are not designed to be recharged.':correct?'Charging current is driven through the cell in the required reverse chemical direction.':'Reverse the charger leads before attempting to recharge the cell.'
  };
};

export const buildRectifierModel=({input=1,orientation='positive'}={})=>{
  const x=Number(input)||0;
  const output=orientation==='positive'?Math.max(0,x):Math.min(0,x);
  return{input:x,orientation,output};
};

export const buildTechnologyImpactModel=({benefit='',risk=''}={})=>({
  benefit:String(benefit||''),risk:String(risk||''),balanced:Boolean(benefit&&risk)
});

export const buildCurrentFieldModel=({currentDirection='up',turns=120}={})=>{
  const up=currentDirection==='up';
  const n=Math.max(1,Math.round(Number(turns)||1));
  return{
    currentDirection:up?'up':'down',
    fieldSense:up?'anticlockwise when viewed from above':'clockwise when viewed from above',
    turns:n,
    relativeFieldStrength:n/120,
    solenoidLeftPole:up?'S':'N',
    solenoidRightPole:up?'N':'S'
  };
};

export const buildChargeModel=({currentA=2,timeS=30})=>({currentA,timeS,chargeC:chargeFromCurrentTime({currentA,timeS})});
export const buildACModel=({periodS=.02,peakV=120})=>({periodS,peakV,frequencyHz:frequencyFromPeriod(periodS)});
export const buildPowerModel=({voltageV=12,currentA=2,timeS=60})=>({voltageV,currentA,timeS,powerW:electricalPower({voltageV,currentA}),energyJ:electricalEnergy({powerW:electricalPower({voltageV,currentA}),timeS})});
export const buildOhmModel=({voltageV=6,resistanceOhm=12})=>({voltageV,resistanceOhm,currentA:voltageV/resistanceOhm});
export const buildNetworkModel=({r1=6,r2=3,mode='parallel'})=>({r1,r2,mode,equivalentOhm:mode==='series'?seriesResistance([r1,r2]):parallelResistance([r1,r2])});
export const buildSafetyModel=({powerW=1200,voltageV=120})=>({powerW,voltageV,currentA:applianceCurrent({powerW,voltageV})});
export const buildLogicModel=({gate='AND',a=1,b=1})=>({gate,a,b,output:logicGate(gate,a,b)});
export const buildMagnetModel=({poleA='N',poleB='S'})=>({poleA,poleB,force:magneticPoleForce(poleA,poleB)});
export const buildMotorModel=({fieldT=.2,currentA=3,lengthM=.1})=>({fieldT,currentA,lengthM,forceIndex:motorForceFactor({fieldT,currentA,lengthM})});
export const buildInductionModel=({fieldT=.4,lengthM=.2,speedMps=5})=>({fieldT,lengthM,speedMps,emfIndex:inducedEmfIndex({fieldT,lengthM,speedMps})});
export const buildTransformerModel=({primaryV=240,primaryTurns=200,secondaryTurns=50,primaryCurrentA=2})=>{const secondaryV=idealTransformerVoltage({primaryV,primaryTurns,secondaryTurns});return{primaryV,primaryTurns,secondaryTurns,primaryCurrentA,secondaryV,secondaryCurrentA:idealTransformerCurrent({primaryV,primaryCurrentA,secondaryV})}};
export const buildTwoLampCircuitModel=({emfV=6,r1=6,r2=3,mode='series',switchClosed=true,removedLamp=false}={})=>({emfV,r1,r2,mode,switchClosed,removedLamp,...twoLampNetworkState({emfV,r1,r2,mode,switchClosed,removedLamp})});
