/**
 * Syllabus-specific image and video references, only where they add value
 * beyond SPARK's existing interactive Physics and IT tools.
 * Source/licence details are shown next to the teaching media.
 */
const PD=["Public domain","https://creativecommons.org/publicdomain/mark/1.0/"];
const CC0=["CC0 1.0","https://creativecommons.org/publicdomain/zero/1.0/"];
const BYSA3=["CC BY-SA 3.0","https://creativecommons.org/licenses/by-sa/3.0/"];
const BYSA4=["CC BY-SA 4.0","https://creativecommons.org/licenses/by-sa/4.0/"];
const BY4=["CC BY 4.0","https://creativecommons.org/licenses/by/4.0/"];
const escapeFile=file=>encodeURIComponent(file.replace(/ /g,"_"));
function ref(file,title,alt,focus,credit,license,kind="image",note=""){
  return Object.freeze({file,title,alt,focus,credit,license:license[0],licenseUrl:license[1],kind,note,
    mediaUrl:"https://commons.wikimedia.org/wiki/Special:FilePath/"+escapeFile(file),
    sourceUrl:"https://commons.wikimedia.org/wiki/File:"+escapeFile(file)
  });
}
export const PHYSICS_REFERENCE_MEDIA=Object.freeze({
  A1:[
    ref("Simple pendulum.svg","Simple pendulum and displacement",
      "A scientific simple pendulum diagram with bob, string, and an angular displacement from the vertical.",
      "Identify the equilibrium position, length and displacement. In a practical, time several oscillations before calculating the period.",
      "Chris-martin",PD),
    ref("Gravity Pendulum.webm","Watch a gravity pendulum move",
      "A short physics animation of a pendulum moving under gravity.",
      "Watch how the bob reverses at the extremes. A moving pendulum continually exchanges kinetic and gravitational potential energy.",
      "Gpeyre",BYSA4,"video",
      "This is a simplified animation, not a stopwatch-calibrated practical measurement."),
  ],
  B4:[
    ref("Heat Diagram.PNG","How heat is transferred",
      "A teaching diagram comparing conduction, convection and induction.",
      "Look for heat travelling through direct contact and circulating fluids. Induction is a specific electromagnetic cooking method; radiation is a separate heat-transfer process.",
      "Arman Cagle",BYSA3,"image",
      "This source compares conduction, convection and induction. It is not a complete list of the three standard heat-transfer mechanisms."),
  ],
  C3:[
    ref("The electromagnetic spectrum.svg","Electromagnetic radiation spectrum",
      "Diagram of electromagnetic radiation bands arranged by wavelength and frequency.",
      "As wavelength gets shorter, frequency generally increases. All electromagnetic waves travel at the same speed in a vacuum.",
      "National Institute of Environmental Health Sciences, NIH",PD),
  ],
  C5:[
    ref("Convex lens diagram.svg","See the parts of a converging lens",
      "Labelled ray diagram of a convex lens and its optical axis.",
      "Locate the lens and optical axis, then compare principal rays with SPARK's interactive lens practice.",
      "Tetobbe",CC0),
  ],
  D4:[
    ref("Series and parallel circuits.svg","Series and parallel resistor circuits",
      "Two schematic circuits illustrating two resistors in series versus in parallel.",
      "In series, current passes through each component along one route. In parallel, components have separate branches with the same potential difference.",
      "Xyzzy n",BYSA3),
  ],
  D7:[
    ref("Ideal transformer.svg","Transformer primary and secondary coils",
      "An electrical schematic depicting a source connected through an ideal transformer to a load.",
      "Identify primary and secondary circuits. Relate the turns ratio to voltage changes under the ideal-transformer assumption.",
      "Original: Constant314; vector: Wikimpan",CC0,"image",
      "Ideal transformer model. Real transformers have losses."),
  ],
  E3:[
    ref("Half Life.gif","How repeated half-lives reduce a quantity",
      "Graph showing the amount of a radioactive sample decreasing by half over successive half-life intervals.",
      "At each half-life interval, half of the remaining undecayed nuclei would be expected to remain. This graph is a statistical model.",
      "KieranMaher",PD,"image",
      "This is an illustrative decay model; individual radioactive decays are random."),
  ],
});
export const IT_REFERENCE_MEDIA=Object.freeze({
  2:[
    ref("Motherboard diagram.svg","Look inside a computer system",
      "An English-labelled block diagram of a late-2000s computer motherboard and connected hardware.",
      "Follow the CPU, memory, buses and peripheral connections. Explain what has changed in more recent computer architecture.",
      "Gribeco; English adaptation by Moxfyre",BYSA3,"image",
      "Historical block diagram. Modern devices may use different chipsets, layouts and connections."),
  ],
  8:[
    ref("NetworkTopologies.svg","Compare computer network topologies",
      "Diagram comparing bus, ring, star, mesh and other network connection patterns.",
      "Identify where devices connect. Compare fault tolerance, cabling and the practical advantages of a star topology.",
      "Maksim; SVG by Malyszkz",PD),
  ],
  19:[
    ref("Relational DB Example ER Diagram Corporation.svg","One-to-many database relationship",
      "Small entity-relationship diagram connecting a corporation to multiple service businesses.",
      "Identify the parent entity and many related child records. Compare this with primary and foreign keys in Database Studio.",
      "Fishpi",PD),
  ],
  23:[
    ref("FlowchartExample.png","Follow a complete algorithm flowchart",
      "Flowchart for calculating the factorial of an integer with decisions, processing blocks, and a loop.",
      "Trace the algorithm using a small integer and record each variable change. Compare each shape to the symbols in SPARK's flowchart activities.",
      "Yaxh",PD),
  ],
});
export const referencesFor=(subject,topicId)=>{
  const entries=subject==="physics"?PHYSICS_REFERENCE_MEDIA:subject==="information-technology"?IT_REFERENCE_MEDIA:null;
  return entries?.[String(topicId)]||[];
};
