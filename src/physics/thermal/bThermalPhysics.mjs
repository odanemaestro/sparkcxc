// Audited pure models for CSEC Physics Section B. These functions contain no UI
// state and are intentionally small so their scientific behaviour can be locked
// by independent tests.

function finite(value, name){
  const n=Number(value);
  if(!Number.isFinite(n)) throw new TypeError(`${name} must be a finite number`);
  return n;
}
function positive(value,name){const n=finite(value,name);if(n<=0) throw new RangeError(`${name} must be greater than zero`);return n;}
function nonNegative(value,name){const n=finite(value,name);if(n<0) throw new RangeError(`${name} must not be negative`);return n;}

export function celsiusToKelvin(celsius){return finite(celsius,'celsius')+273;}
export function kelvinToCelsius(kelvin){const k=nonNegative(kelvin,'kelvin');return k-273;}

export function boyleFinalPressure({p1,v1,v2}){
  return positive(p1,'p1')*positive(v1,'v1')/positive(v2,'v2');
}
export function boyleFinalVolume({p1,v1,p2}){
  return positive(p1,'p1')*positive(v1,'v1')/positive(p2,'p2');
}
export function charlesFinalVolume({v1,t1K,t2K}){
  return positive(v1,'v1')*positive(t2K,'t2K')/positive(t1K,'t1K');
}
export function pressureLawFinalPressure({p1,t1K,t2K}){
  return positive(p1,'p1')*positive(t2K,'t2K')/positive(t1K,'t1K');
}
export function gasLawFromCelsius({mode,p1,v1,t1C,p2,v2,t2C}){
  if(mode==='boyle-pressure') return boyleFinalPressure({p1,v1,v2});
  if(mode==='boyle-volume') return boyleFinalVolume({p1,v1,p2});
  if(mode==='charles-volume') return charlesFinalVolume({v1,t1K:celsiusToKelvin(t1C),t2K:celsiusToKelvin(t2C)});
  if(mode==='pressure-pressure') return pressureLawFinalPressure({p1,t1K:celsiusToKelvin(t1C),t2K:celsiusToKelvin(t2C)});
  throw new RangeError(`unknown gas-law mode ${mode}`);
}

export function heatCapacity({massKg,specificHeatJPerKgK}){
  return positive(massKg,'massKg')*positive(specificHeatJPerKgK,'specificHeatJPerKgK');
}
export function sensibleHeat({massKg,specificHeatJPerKgK,deltaTK}){
  return positive(massKg,'massKg')*positive(specificHeatJPerKgK,'specificHeatJPerKgK')*finite(deltaTK,'deltaTK');
}
export function specificHeatFromElectrical({powerW,timeS,massKg,deltaTK}){
  const d=finite(deltaTK,'deltaTK'); if(d===0) throw new RangeError('deltaTK must not be zero');
  return positive(powerW,'powerW')*positive(timeS,'timeS')/(positive(massKg,'massKg')*d);
}
export function latentEnergy({massKg,specificLatentHeatJPerKg}){
  return positive(massKg,'massKg')*positive(specificLatentHeatJPerKg,'specificLatentHeatJPerKg');
}
export function specificLatentHeatFromElectrical({powerW,timeS,massKg}){
  return positive(powerW,'powerW')*positive(timeS,'timeS')/positive(massKg,'massKg');
}
export function methodOfMixturesFinalTemperature({hotMassKg,hotSpecificHeat,coldMassKg,coldSpecificHeat,hotTempC,coldTempC}){
  const mh=positive(hotMassKg,'hotMassKg'), ch=positive(hotSpecificHeat,'hotSpecificHeat');
  const mc=positive(coldMassKg,'coldMassKg'), cc=positive(coldSpecificHeat,'coldSpecificHeat');
  const th=finite(hotTempC,'hotTempC'), tc=finite(coldTempC,'coldTempC');
  return (mh*ch*th+mc*cc*tc)/(mh*ch+mc*cc);
}

export function heatingCurveState({energyJ,massKg=1,specificHeatSolid=2100,latentFusion=334000,specificHeatLiquid=4200,latentVaporization=2260000,startTempC=-20,meltingTempC=0,boilingTempC=100}){
  let e=nonNegative(energyJ,'energyJ'); const m=positive(massKg,'massKg');
  const qWarmSolid=m*positive(specificHeatSolid,'specificHeatSolid')*(meltingTempC-startTempC);
  if(e<qWarmSolid) return {phase:'solid warming',temperatureC:startTempC+e/(m*specificHeatSolid),stageEnergyJ:e};
  e-=qWarmSolid; const qMelt=m*positive(latentFusion,'latentFusion');
  if(e<qMelt) return {phase:'melting',temperatureC:meltingTempC,fractionChanged:e/qMelt,stageEnergyJ:e};
  e-=qMelt; const qWarmLiquid=m*positive(specificHeatLiquid,'specificHeatLiquid')*(boilingTempC-meltingTempC);
  if(e<qWarmLiquid) return {phase:'liquid warming',temperatureC:meltingTempC+e/(m*specificHeatLiquid),stageEnergyJ:e};
  e-=qWarmLiquid; const qBoil=m*positive(latentVaporization,'latentVaporization');
  if(e<qBoil) return {phase:'boiling',temperatureC:boilingTempC,fractionChanged:e/qBoil,stageEnergyJ:e};
  return {phase:'vapour after boiling',temperatureC:boilingTempC,stageEnergyJ:e-qBoil};
}

export function radiationSurfaceModel({temperatureC=80,surface='dull-black'}){
  const t=finite(temperatureC,'temperatureC');
  const emissivity={ 'dull-black':0.95, 'dull-white':0.70, 'shiny-metal':0.10 }[surface];
  if(emissivity==null) throw new RangeError(`unknown surface ${surface}`);
  // Relative index only. The UI deliberately avoids presenting this as a full
  // Stefan-Boltzmann calculation, which is outside the CSEC requirement here.
  const relativeEmission=emissivity*Math.max(0,t+273)**4;
  return {surface,emissivity,relativeEmission};
}

export function thermalExpansionModel({initialLengthM=1,temperatureRiseC=50,coefficientPerK=12e-6}){
  const l=positive(initialLengthM,'initialLengthM'), dT=finite(temperatureRiseC,'temperatureRiseC'), alpha=positive(coefficientPerK,'coefficientPerK');
  const extensionM=l*alpha*dT;
  return {initialLengthM:l,temperatureRiseC:dT,coefficientPerK:alpha,extensionM,finalLengthM:l+extensionM};
}
