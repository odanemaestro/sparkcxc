export const SPEED_OF_LIGHT_MPS=3.0e8;
export function atomicComposition({A,Z,charge=0}){A=Number(A);Z=Number(Z);charge=Number(charge);return{protons:Z,neutrons:A-Z,electrons:Z-charge};}
export function nuclideBalanced({parentA,parentZ,daughterA,daughterZ,emittedA,emittedZ}){return Number(parentA)===Number(daughterA)+Number(emittedA)&&Number(parentZ)===Number(daughterZ)+Number(emittedZ);}
export function alphaDaughter({A,Z}){return{A:Number(A)-4,Z:Number(Z)-2};}
export function betaMinusDaughter({A,Z}){return{A:Number(A),Z:Number(Z)+1};}
export function fractionRemainingAfterHalfLives(n){n=Number(n);return 1/(2**n);}
export function halfLivesElapsed({elapsed,halfLife}){return Number(elapsed)/Number(halfLife);}
export function amountAfterTime({initial,elapsed,halfLife}){return Number(initial)*fractionRemainingAfterHalfLives(halfLivesElapsed({elapsed,halfLife}));}
export function massEnergy({massKg,c=SPEED_OF_LIGHT_MPS}){return Number(massKg)*Number(c)**2;}
export const RADIATION_PROPERTIES=Object.freeze({alpha:{charge:2,relativeMass:4,ionising:'high',penetrating:'low',absorber:'paper or a few centimetres of air'},beta:{charge:-1,relativeMass:'very small',ionising:'medium',penetrating:'medium',absorber:'a few millimetres of aluminium'},gamma:{charge:0,relativeMass:0,ionising:'low',penetrating:'high',absorber:'thick lead or concrete reduces intensity'}});
export function fieldDeflection(type){const t=String(type||'').toLowerCase();if(t==='alpha')return{electric:'toward negative plate',magnetic:'curves as a positive charge',relative:'slight'};if(t==='beta')return{electric:'toward positive plate',magnetic:'curves opposite to alpha',relative:'strong'};return{electric:'none',magnetic:'none',relative:'none'};}
export function decaySeries({initial=600,throws=8,removalProbability=1/6}){let n=Number(initial),out=[n];for(let i=0;i<Number(throws);i++){n=n*(1-Number(removalProbability));out.push(n);}return out;}
