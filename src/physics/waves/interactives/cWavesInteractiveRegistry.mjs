export const WAVES_INTERACTIVES=Object.freeze([
{id:'c1-wave-builder',topic:'C1',title:'Wave builder',objectives:['C1.1','C1.2'],action:'Change frequency, wavelength and wave type, then connect the controls with speed, period and particle motion.'},
{id:'c1-wave-graphs',topic:'C1',title:'Wave graph explorer',objectives:['C1.2','C1.3'],action:'Switch between position and time graphs, read crest spacing and identify whether the horizontal interval is wavelength or period.'},
{id:'c2-echo-ranging',topic:'C2',title:'Echo ranging lab',objectives:['C2.3','C2.5'],action:'Change pulse return time and wave speed, then calculate one-way distance from the measured round trip.'},
{id:'c2-pitch-loudness',topic:'C2',title:'Pitch and loudness',objectives:['C2.1','C2.2'],action:'Change frequency and amplitude independently and observe which property changes pitch and which changes loudness.'},
{id:'c3-em-spectrum',topic:'C3',title:'Electromagnetic spectrum explorer',objectives:['C3.1','C3.2','C3.3'],action:'Move through the spectrum, compare wavelength and frequency, and review characteristic sources and uses.'},
{id:'c4-reflection',topic:'C4',title:'Reflection ray lab',objectives:['C4.4','C4.5','C4.6'],action:'Change the incident angle and verify the reflected angle from the normal while reviewing plane-mirror image geometry.'},
{id:'c4-refraction',topic:'C4',title:'Snell law explorer',objectives:['C4.7','C4.8','C4.10'],action:'Change incidence angle and refractive index, then compare the calculated refracted ray and wave speed in the material.'},
{id:'c4-total-internal-reflection',topic:'C4',title:'Critical angle and TIR',objectives:['C4.11','C4.12','C4.13'],action:'Change refractive index and internal incidence angle to identify refraction, the critical condition and total internal reflection.'},
{id:'c4-double-slit',topic:'C4',title:'Young double-slit pattern',objectives:['C4.1','C4.2','C4.3'],action:'Change slit spacing, wavelength and screen distance, then connect bright and dark regions with interference and diffraction.'},
{id:'c5-lens-rays',topic:'C5',title:'Converging lens ray model',objectives:['C5.1','C5.2','C5.3','C5.4'],action:'Change object and focal distances, predict the real-image position and calculate magnification for a converging lens.'},
{id:'c5-focal-length',topic:'C5',title:'Focal length practical',objectives:['C5.5'],action:'Change measured object and image distances, then calculate focal length and compare repeated readings.'},
]);
export function wavesInteractivesForTopic(topicId){return WAVES_INTERACTIVES.filter(item=>item.topic===topicId);}
