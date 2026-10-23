import {isSourceParticleDiagram} from "../../integratedScience/practice/scienceParticleDiagramMarking";
const grid=(xs,ys)=>ys.flatMap(y=>xs.map(x=>[x,y]));
const SOLID=grid([.22,.43,.64],[.23,.44,.65]);
const SOLID_ALT=grid([.25,.45,.65],[.20,.40,.60]);
const LIQUID=[
 [.18,.22],[.37,.20],[.60,.26],[.78,.18],
 [.24,.44],[.49,.45],[.72,.47],
 [.17,.66],[.40,.70],[.64,.69],[.82,.66]
];
const LIQUID_ALT=[
 [.20,.18],[.42,.22],[.64,.19],[.81,.30],
 [.16,.41],[.36,.47],[.59,.44],[.76,.50],
 [.24,.69],[.48,.72],[.70,.70]
];
const table=(solid,liquid)=>({particleLayout:{solid,liquid}});
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export function integratedScienceParticleFixtures(qid,pi,ii,item,maxMarks){
 if(maxMarks!==2||!isSourceParticleDiagram(qid,pi,ii,item))return null;
 const full=table(SOLID,LIQUID),equiv=table(SOLID_ALT,LIQUID_ALT);
 return {kind:"structured",ruleId:"is:geometric-particle-diagram-v1",
  sourceAnswer:full,alternatives:[equiv],
  fixtures:[
   F("full",full,2,"solid and liquid independently plotted"),
   F("equivalent",equiv,2,"translated particle positions preserve topology"),
   F("partial",table(SOLID,[]),1,"solid correct, liquid not drawn"),
   F("partial",table([],LIQUID),1,"liquid correct, solid not drawn"),
   F("incorrect",table(LIQUID,SOLID),0,"regularity assignments reversed"),
   F("competing",table([...SOLID,SOLID[0]],LIQUID),{min:0,max:2},"overlapping particles are ambiguous"),
   F("blank",{},0),
   F("irrelevant",table([[.1,.1],[.9,.9]],[[.1,.1]]),0,"isolated marks"),
   F("ceiling",full,{min:0,max:2})
  ]};
}
