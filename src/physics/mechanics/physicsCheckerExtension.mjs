// Physics-specific primitive checks for SPARK's canonical CXC mark-scheme
// engine. These functions have the same { ok, why, got } contract as the
// existing Math checkers so they can be registered in the same CHECKERS map.
// They do not decide marks or dependencies; the existing canonical marker
// remains responsible for M/A/B, dependencies and ECF.

import { comparePhysicsQuantity, parseNumber, tidyPhysicsText, countSignificantFigures, countDecimalPlaces } from './physicsQuantity.mjs';

function norm(raw){
  return tidyPhysicsText(raw).toLowerCase()
    .replace(/[’']/g,"'")
    .replace(/\s+/g,' ')
    .trim();
}

function includesTerm(text, term){
  const t=norm(term);
  if(!t) return false;
  // Single letters/symbols need token boundaries so k does not match 'skater'.
  if(/^[a-z]$/i.test(t)) return new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`,'i').test(text);
  return text.includes(t);
}

export function checkWrittenConcept(raw,spec={}){
  const text=norm(raw);
  if(!text) return {ok:false,why:'nothing written',got:String(raw??'')};
  const all=spec.all||[], any=spec.any||[], forbidden=spec.forbidden||[];
  const missingAll=all.filter(term=>!includesTerm(text,term));
  const anyOk=!any.length || any.some(term=>includesTerm(text,term));
  const forbiddenHit=forbidden.find(term=>includesTerm(text,term));
  const ok=!missingAll.length && anyOk && !forbiddenHit;
  let why='required physics idea is not stated';
  if(forbiddenHit) why=`contains a conflicting statement: ${forbiddenHit}`;
  else if(ok) why='required physics idea is stated';
  return {ok,why,got:String(raw??''),missing:missingAll,forbiddenHit:forbiddenHit||null};
}

export function checkPhysicsQuantity(raw,spec={}){
  const result=comparePhysicsQuantity(raw,{value:spec.value,unit:spec.unit},{
    quantity:spec.quantity,
    tolerance:typeof spec.tolerance==='number'?spec.tolerance:1e-9,
    relativeTolerance:typeof spec.relativeTolerance==='number'?spec.relativeTolerance:1e-6,
    unitRequired:spec.unitRequired!==false,
  });
  if(!result.correct){
    const why={
      'no-number':'no number could be read','unit-missing':`the unit (${spec.unit}) is missing`,
      'unit-incompatible':`the unit is not compatible with ${spec.quantity}`,'value-mismatch':'not the required value',
    }[result.reason]||'not correct';
    return {ok:false,why,got:result.got??result.value??null,unitMissing:result.reason==='unit-missing',unitWrong:result.reason==='unit-incompatible'};
  }
  if(typeof spec.sf==='number' && countSignificantFigures(raw)<spec.sf){
    return {ok:false,why:`give the answer to at least ${spec.sf} significant figures`,got:result.got,precisionOnly:true};
  }
  if(typeof spec.dp==='number' && countDecimalPlaces(raw)!==spec.dp){
    return {ok:false,why:`give the answer to ${spec.dp} decimal place${spec.dp===1?'':'s'}`,got:result.got,precisionOnly:true};
  }
  return {ok:true,why:'correct',got:result.got,baseValue:result.got};
}

function directionTokens(direction){
  const d=norm(direction);
  const map={
    east:['east','e','right'], west:['west','w','left'], north:['north','n','upward','up'], south:['south','s','downward','down'],
    upward:['upward','up'], downward:['downward','down'],
  };
  return map[d]||[d];
}

export function checkDirectedQuantity(raw,spec={}){
  const text=norm(raw);
  const wanted=directionTokens(spec.direction||'');
  // Direction words are semantic labels, not part of the physical unit. Strip
  // only a trailing direction token before the quantity parser sees the unit.
  let numericText=String(raw ?? '').trim();
  const directionWords=[...new Set([...(wanted||[]),'east','west','north','south','upward','downward','left','right','up','down'])]
    .sort((a,b)=>b.length-a.length);
  for(const token of directionWords){
    const escaped=token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re=new RegExp(`\\s+${escaped}\\s*$`,'i');
    if(re.test(numericText)){ numericText=numericText.replace(re,'').trim(); break; }
  }
  const numeric=checkPhysicsQuantity(numericText,spec);
  if(!numeric.ok) return numeric;
  const opposite={east:'west',west:'east',north:'south',south:'north',upward:'downward',downward:'upward'}[norm(spec.direction||'')];
  const hasDirection=wanted.some(t=>includesTerm(text,t));
  if(!hasDirection){
    if(opposite && directionTokens(opposite).some(t=>includesTerm(text,t))) return {...numeric,ok:false,why:`the direction should be ${spec.direction}`,directionWrong:true};
    return {...numeric,ok:false,why:`state the direction (${spec.direction})`,directionMissing:true};
  }
  return {...numeric,why:'correct value and direction'};
}


export function checkDirectionAngle(raw,spec={}){
  const text=norm(raw);
  const angle=parseNumber(raw);
  if(angle===null) return {ok:false,why:'no direction angle could be read',got:String(raw??'')};
  const want=Number(spec.angleDeg);
  const tol=Number(spec.angleTolerance ?? 2);
  const angleOk=Math.abs(angle-want)<=tol;
  const references={
    'north of east':['north of east','n of e','above east','above the horizontal'],
    'south of east':['south of east','s of e','below east','below the horizontal'],
    'east of north':['east of north','e of n'],
    'west of north':['west of north','w of n'],
    'north of west':['north of west','n of w'],
    'south of west':['south of west','s of w'],
  };
  const wanted=references[norm(spec.reference)] || [norm(spec.reference)];
  const refOk=wanted.some(x=>x && text.includes(x));
  return {ok:angleOk&&refOk,why:!angleOk?'the angle is not within the accepted range':!refOk?`state the reference direction (${spec.reference})`:'correct angle and reference direction',got:{angle,reference:String(raw??'')}};
}

// Return candidate fragments starting at every number. Unit parsing is then
// delegated to the quantity parser, which deliberately fails closed on an
// incompatible or absent unit.
function numericFragments(raw){
  const text=tidyPhysicsText(raw);
  const starts=[]; const re=/[-+]?\d+(?:[.,]\d+)?(?:\s*(?:\*|x)\s*10\s*\^?\s*[-+]?\d+|\s*e\s*[-+]?\d+)?/ig;
  let m; while((m=re.exec(text))) starts.push(m.index);
  const pieces=[];
  for(let i=0;i<starts.length;i++){
    const end=i+1<starts.length?starts[i+1]:text.length;
    pieces.push(text.slice(starts[i],end).trim());
  }
  return pieces;
}

export function checkContainsQuantity(raw,spec={}){
  for(const fragment of numericFragments(raw)){
    const r=checkPhysicsQuantity(fragment,{...spec,sf:undefined,dp:undefined});
    if(r.ok) return {...r,why:'required value appears in the working'};
  }
  return {ok:false,why:'the required value was not found in the working',got:null};
}

export function checkContainsSignedQuantity(raw,spec={}){
  return checkContainsQuantity(raw,spec);
}

export function checkContainsValues(raw,spec={}){
  const text=tidyPhysicsText(raw);
  const found=[]; const re=/[-+]?\d+(?:\.\d+)?/g; let m;
  while((m=re.exec(text))) found.push(Number(m[0]));
  const want=(spec.values||[]).map(Number); const tol=spec.tolerance??1e-9;
  const hits=want.filter(w=>found.some(g=>Math.abs(g-w)<=tol));
  const need=spec.needAll?want.length:(spec.need??1);
  return {ok:hits.length>=need,why:hits.length>=need?'required values are present':'required values are missing',got:found};
}

export function checkUnitName(raw,spec={}){
  const text=norm(raw);
  const forbidden=(spec.forbidden||[]).find(x=>includesTerm(text,x));
  if(forbidden) return {ok:false,why:`${forbidden} is not the required unit in this context`,got:String(raw??'')};
  const ok=(spec.accepted||[]).some(x=>includesTerm(text,x));
  return {ok,why:ok?'correct unit':'the required unit is missing',got:String(raw??'')};
}

export function checkFormulaUse(raw,spec={}){
  // For formula recognition, explicit and implicit multiplication are equivalent:
  // rho*g*V, rho g V and rho gV should all represent the same method.
  const compactFormula = value => norm(value).replace(/\s+/g,'').replace(/\^/g,'').replace(/_/g,'').replace(/[×*]/g,'');
  const text=compactFormula(raw);
  const aliases={
    'gradient=deltaT2/deltal':['gradient=δt2/δl','gradient=deltat2/deltal','δt2/δl','changeint2/changeinlength'],
    'g=4pi2/S':['g=4*pi2/s','g=4pi2/s','g=4*π2/s','g=4π2/s','g=4*pi^2/s','g=4π^2/s'],
    'V=Vfinal-Vinitial':['v=vfinal-vinitial','volume=final-initial','v=vf-vi','displacementvolume=finalvolume-initialvolume'],
    'rho=m/V':['ρ=m/v','rho=m/v','density=mass/volume'],
    'R=sqrt(A2+B2)':['r=sqrt(a2+b2)','r=√(a2+b2)','r2=a2+b2','resultant=sqrt(a2+b2)'],
    'tan(theta)=8/6':['tanθ=8/6','tantheta=8/6','tan(theta)=8/6'],
    'tan(theta)=12/9':['tanθ=12/9','tantheta=12/9','tan(theta)=12/9'],
    'Fx=Fcos(theta)':['fx=fcosθ','fx=fcos(theta)','horizontal=fcosθ','horizontal=fcos(theta)'],
    'Fy=Fsin(theta)':['fy=fsinθ','fy=fsin(theta)','vertical=fsinθ','vertical=fsin(theta)'],
    'vx=vcos(theta)':['vx=vcosθ','vx=vcos(theta)','horizontal=vcosθ','horizontal=vcos(theta)'],
    'vy=vsin(theta)':['vy=vsinθ','vy=vsin(theta)','vertical=vsinθ','vertical=vsin(theta)'],
    'W=mg':['w=mg','weight=mass*g','weight=massxg'],
    'gradient=deltaF/deltax':['gradient=δf/δx','gradient=deltaf/deltax','δf/δx','changeinforce/changeinextension','force/extension'],
    'a=(v-u)/t':['a=(v-u)/t','a=v-u/t','acceleration=changeinvelocity/time','changeinvelocity/time'],
    'work=Fd':['w=f*d','w=fd','work=force*distance','work=forcexdisplacement','work=force*displacement'],
    'Ep=mgh':['ep=mgh','e_p=mgh','gpe=mgh','potentialenergy=mgh'],
    'Ek=0.5mv2':['ek=0.5*m*v2','ek=0.5mv2','ek=1/2*m*v2','ek=1/2mv2','ek=½mv2','ke=0.5*m*v2','ke=0.5mv2','kineticenergy=0.5*m*v2'],
    'P=E/t':['p=e/t','p=w/t','power=energy/time','power=work/time'],
    'eff=useful/input*100':['efficiency=usefuloutput/totalinput*100','efficiency=useful/input*100','usefuloutput/totalinput*100','useful/input*100'],
    'energy-conservation':['energybefore=energyafter','totalenergybefore=totalenergyafter','energycannotbecreatedordestroyed','gpelost=kegained','conservationofenergy','energyisconserved'],
    'pressure=F/A':['p=f/a','pressure=force/area','pressure=normalforce/area'],
    'fluid-pressure=rho*g*h':['p=ρ*g*h','p=rho*g*h','p=ρgh','p=rhogh','pressure=density*g*depth','pressure=densityxgxdepth'],
    'upthrust=rho*g*V':['u=ρ*g*v','u=rho*g*v','upthrust=ρ*g*v','upthrust=rho*g*v','fb=ρ*g*v','fb=rho*g*v','buoyantforce=ρ*g*v','buoyantforce=rho*g*v','upthrust=weightoffluiddisplaced'],
    'T=C+273':['t=c+273','t=θ+273','t=theta+273','kelvin=celsius+273'],
    'P1V1=P2V2':['p1v1=p2v2','p₁v₁=p₂v₂'],
    'V1/T1=V2/T2':['v1/t1=v2/t2','v₁/t₁=v₂/t₂'],
    'P1/T1=P2/T2':['p1/t1=p2/t2','p₁/t₁=p₂/t₂'],
    'C=mc':['c=m*c','c=mc','heatcapacity=mass*specificheatcapacity'],
    'E=mcDeltaT':['e=m*c*δt','e=mcδt','e=m*c*deltat','e=mcdeltat','eh=mcδt','eh=mcdeltat'],
    'E=ml':['e=m*l','e=ml','eh=ml'],
    'E=Pt':['e=p*t','e=pt','energy=power*time'],
    'c=Pt/(mDeltaT)':['c=p*t/(m*δt)','c=pt/(mδt)','c=p*t/(m*deltat)','c=pt/(mdeltat)'],
    'l=Pt/m':['l=p*t/m','l=pt/m'],
    'v=fλ':['v=fλ','v=flambda','v=f*lambda','speed=frequency*wavelength','wavespeed=frequency*wavelength'],
    'f=1/T':['f=1/t','frequency=1/period','frequency=one/period'],
    'd=vt':['d=v*t','d=vt','distance=speed*time'],
    'n=sin(i)/sin(r)':['n=sin(i)/sin(r)','n=sini/sinr','refractiveindex=sini/sinr'],
    'n=c/v':['n=c/v','refractiveindex=speedinvacuum/speedinmedium','refractiveindex=c/v'],
    'sin(c)=1/n':['sin(c)=1/n','sinc=1/n','sincriticalangle=1/refractiveindex'],
    'm=image/object':['m=imagesize/objectsize','magnification=imagesize/objectsize'],
    'm=v/u':['m=v/u','magnification=imagedistance/objectdistance'],
    '1/f=1/u+1/v':['1/f=1/u+1/v','reciprocalfocallength=1/u+1/v'],
    'Q=It':['q=it','charge=current*time','charge=currentxtime'],
    'V=E/Q':['v=e/q','voltage=energy/charge','potentialdifference=energy/charge'],
    'P=IV':['p=iv','power=current*voltage','power=currentxvoltage'],
    'R=V/I':['r=v/i','resistance=voltage/current','resistance=potentialdifference/current'],
    'Rseries=R1+R2':['r=r1+r2','rtotal=r1+r2','seriesresistance=sum'],
    '1/Rparallel=1/R1+1/R2':['1/r=1/r1+1/r2','parallelreciprocal'],
    'I=P/V':['i=p/v','current=power/voltage'],
    'Vs/Vp=Ns/Np':['vs/vp=ns/np','voltageratio=turnsratio'],
    'VpIp=VsIs':['vpip=vsis','primarypower=secondarypower'],
    'A=Z+N':['a=z+n','massnumber=protons+neutrons','massnumber=atomicnumber+neutronnumber'],
    'N=A-Z':['n=a-z','neutrons=massnumber-atomicnumber','neutronnumber=massnumber-atomicnumber'],
    'remaining=N0/(2^n)':['n=n0/(2^n)','remaining=initial/(2^n)','remaining=initial/2^n','fractionremaining=(1/2)^n'],
    'E=mc2':['e=mc2','e=m*c2','e=mc^2','energy=mass*c2','energy=mass*speedoflight2'],
    'alpha:A-4,Z-2':['a-4','z-2','alpha:a-4,z-2'],
    'beta:A,Z+1':['aunchanged','z+1','beta:a,z+1'],

  };
  const candidates=aliases[spec.formula]||[String(spec.formula||'')];
  const ok=candidates.some(x=>text.includes(compactFormula(x)));
  return {ok,why:ok?'correct method/formula is shown':'the required method/formula is not shown',got:String(raw??'')};
}


export function checkDistinctConceptCount(raw,spec={}){
  const source = raw && typeof raw === 'object'
    ? (spec.fields || Object.keys(raw)).map(field => raw?.[field]).filter(v => v != null).join(' | ')
    : String(raw ?? '');
  const text = norm(source);
  const groups = spec.groups || [];
  const matched = groups.filter(group => (Array.isArray(group) ? group : [group]).some(term => includesTerm(text,term)));
  const need = Number(spec.need || 1);
  return {ok:matched.length>=need,why:matched.length>=need?`${matched.length} distinct required concepts are present`:`only ${matched.length} distinct required concepts are present`,got:source,count:matched.length};
}

export function checkMatchedErrorPrecaution(response,spec={}){
  const error=norm(response?.[spec.errorField]??'');
  const precaution=norm(response?.[spec.precautionField]??'');
  if(!error || !precaution) return {ok:false,why:'both the error and its precaution are required',got:null};
  const pairs=[
    {errors:['parallax'],precautions:['eye level','perpendicular','square on','line of sight']},
    {errors:['zero error'],precautions:['check zero','zero correction','correct for zero','calibrate']},
    {errors:['spring not vertical','ruler not vertical'],precautions:['vertical','clamp','align']},
    {errors:['reaction time'],precautions:['many oscillations','20 oscillations','repeat','average']},
    {errors:['energy loss','heat loss','surroundings'],precautions:['insulate','lag','lid','reduce heat loss','reduce energy loss']},
    {errors:['poor thermal contact','thermometer contact'],precautions:['oil','thermal paste','good contact']},
    {errors:['ordinary evaporation','room evaporation','background evaporation'],precautions:['control','subtract','baseline','correct']},
  ];
  const match=pairs.find(p=>p.errors.some(x=>error.includes(x)) && p.precautions.some(x=>precaution.includes(x)));
  return {ok:Boolean(match),why:match?'the precaution matches the named error':'the precaution does not clearly address the named error',got:{error:response?.[spec.errorField],precaution:response?.[spec.precautionField]}};
}

export const PHYSICS_CHECKERS=Object.freeze({
  physicsQuantity:checkPhysicsQuantity,
  directedQuantity:checkDirectedQuantity,
  directionAngle:checkDirectionAngle,
  containsQuantity:checkContainsQuantity,
  containsSignedQuantity:checkContainsSignedQuantity,
  containsValues:checkContainsValues,
  writtenConcept:checkWrittenConcept,
  unitName:checkUnitName,
  formulaUse:checkFormulaUse,
  distinctConceptCount:checkDistinctConceptCount,
  matchedErrorPrecaution:checkMatchedErrorPrecaution,
});

export function physicsCheck(raw,spec={}){
  const fn=PHYSICS_CHECKERS[spec.type];
  if(!fn) return {ok:false,why:`unknown physics check type ${spec.type}`,got:null};
  try{return fn(raw,spec);}catch(error){return {ok:false,why:'the response could not be read',got:null,error:String(error)}}
}
