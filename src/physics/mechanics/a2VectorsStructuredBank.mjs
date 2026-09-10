const c=(code,profile,objective,description,check=null,extra={})=>({code,marks:1,profile,objective,description,...(check?{check}:{}),...extra});

export const A2_STRUCTURED_BANK=Object.freeze([
  {id:'a2-p2-resultant-01',topic:'A2',kind:'structured',marks:15,title:'Resultant forces',stem:'Forces act at a point.',parts:[
    {id:'a',marks:3,objective:'A2.1',prompt:'Distinguish a scalar from a vector and give one example of each.',responseFields:['difference','scalar','vector'],criteria:[
      c('B1','KC','A2.1','scalar has magnitude only',{type:'writtenConcept',all:['magnitude'],any:['only','no direction']},{field:'difference'}),
      c('B2','KC','A2.1','valid scalar example',{type:'writtenConcept',any:['mass','time','distance','speed','energy','temperature']},{field:'scalar'}),
      c('B3','KC','A2.1','valid vector example',{type:'writtenConcept',any:['displacement','velocity','acceleration','force','weight','momentum']},{field:'vector'}),
    ]},
    {id:'b',marks:4,objective:'A2.3',prompt:'A 6 N force acts east and an 8 N force acts north. Calculate the magnitude and direction of the resultant.',responseFields:['magnitude','direction'],criteria:[
      c('M1','UK','A2.3','uses Pythagoras',{type:'formulaUse',formula:'R=sqrt(A2+B2)'}),
      c('A1','UK','A2.3','10 N',{type:'physicsQuantity',quantity:'force',value:10,unit:'N'},{field:'magnitude'}),
      c('M2','UK','A2.3','uses tangent with 8/6 or equivalent',{type:'formulaUse',formula:'tan(theta)=8/6'}),
      c('A2','UK','A2.3','about 53.1 degrees north of east',{type:'directionAngle',angleDeg:53.13,reference:'north of east',angleTolerance:2},{field:'direction'}),
    ]},
    {id:'c',marks:4,objective:'A2.3',prompt:'Forces of 12 N east, 7 N west, 3 N east and 2 N west act along one line. Determine the resultant.',responseFields:['answer','working'],criteria:[
      c('M1','UK','A2.3','chooses a sign convention',{type:'writtenConcept',any:['east positive','west negative','positive direction']},{field:'working'}),
      c('M2','UK','A2.3','forms 12-7+3-2',{type:'writtenConcept',all:['12','7','3','2']},{field:'working'}),
      c('A1','UK','A2.3','6 N east',{type:'directedQuantity',quantity:'force',magnitude:6,unit:'N',direction:'east'},{field:'answer'}),
      c('B1','KC','A2.3','direction stated',{type:'writtenConcept',all:['east']},{field:'answer'}),
    ]},
    {id:'d',marks:4,objective:'A2.4',prompt:'Resolve a 20 N force acting at 60° above the horizontal into horizontal and vertical components.',responseFields:['horizontal','vertical'],criteria:[
      c('M1','UK','A2.4','uses F cosθ horizontally',{type:'formulaUse',formula:'Fx=Fcos(theta)'}),
      c('A1','UK','A2.4','10 N horizontal',{type:'physicsQuantity',quantity:'force',value:10,unit:'N'},{field:'horizontal'}),
      c('M2','UK','A2.4','uses F sinθ vertically',{type:'formulaUse',formula:'Fy=Fsin(theta)'}),
      c('A2','UK','A2.4','17.3 N vertical',{type:'physicsQuantity',quantity:'force',value:17.32,unit:'N',relativeTolerance:0.01},{field:'vertical'}),
    ]},
  ]},
  {id:'a2-p2-scale-01',topic:'A2',kind:'structured',marks:15,title:'Scale drawing of two oblique forces',stem:'Two forces of 30 N and 40 N act at an angle of 70° to each other.',parts:[
    {id:'a',marks:3,objective:'A2.2',prompt:'State a suitable scale and calculate the drawn lengths for both forces.',responseFields:['scale','length30','length40'],criteria:[
      c('B1','XS','A2.2','states usable scale such as 1 cm = 10 N',{type:'writtenConcept',any:['1 cm = 10 N','1cm=10N','10 N per cm']},{field:'scale'}),
      c('A1','UK','A2.2','30 N drawn as 3 cm for stated scale',{type:'physicsQuantity',quantity:'length',value:3,unit:'cm'},{field:'length30'}),
      c('A2','UK','A2.2','40 N drawn as 4 cm for stated scale',{type:'physicsQuantity',quantity:'length',value:4,unit:'cm'},{field:'length40'}),
    ]},
    {id:'b',marks:6,objective:'A2.2',prompt:'Construct the vectors tip-to-tail and determine the resultant magnitude and direction.',requireDrawing:true,criteria:[
      c('B1','XS','A2.2','first vector correct scale/direction',null,{manual:true}),c('B2','XS','A2.2','second starts at tip and has correct angle',null,{manual:true}),
      c('B3','XS','A2.2','resultant drawn tail-to-final-tip',null,{manual:true}),c('B4','XS','A2.2','resultant length measured accurately',null,{manual:true}),
      c('B5','XS','A2.2','resultant magnitude converted with scale',null,{manual:true}),c('B6','XS','A2.2','direction measured and referenced clearly',null,{manual:true}),
    ]},
    {id:'c',marks:3,objective:'A2.2',prompt:'Explain why joining the two arrows head-to-head is not the tip-to-tail method.',criteria:[
      c('B1','KC','A2.2','second vector should begin at tip of first',{type:'writtenConcept',all:['tip'],any:['begin','start','second']}),
      c('B2','KC','A2.2','direction and magnitude must be preserved',{type:'writtenConcept',all:['direction','magnitude']}),
      c('B3','UK','A2.2','resultant connects initial tail to final tip',{type:'writtenConcept',all:['tail','tip'],any:['resultant','connect','from']}),
    ]},
    {id:'d',marks:3,objective:'A2.2',prompt:'Give three features of a high-quality scale vector diagram.',criteria:[
      c('B1','XS','A2.2','scale stated',{type:'writtenConcept',all:['scale']}),c('B2','XS','A2.2','arrows/directions accurate',{type:'writtenConcept',any:['direction','angle','arrow']}),c('B3','XS','A2.2','diagram large enough for accurate measurement',{type:'writtenConcept',any:['large','page','accurate measurement','sensible scale']}),
    ]},
  ]},
  {id:'a2-p2-components-01',topic:'A2',kind:'structured',marks:15,title:'Vector components in motion and forces',stem:'A ball leaves a launcher at 25 m/s at 37° above the horizontal. Use cos37° = 0.80 and sin37° = 0.60.',parts:[
    {id:'a',marks:4,objective:'A2.4',prompt:'Calculate its horizontal and vertical velocity components.',responseFields:['horizontal','vertical'],criteria:[
      c('M1','UK','A2.4','horizontal uses cos',{type:'formulaUse',formula:'vx=vcos(theta)'}),c('A1','UK','A2.4','20 m/s',{type:'physicsQuantity',quantity:'speed',value:20,unit:'m/s'},{field:'horizontal'}),
      c('M2','UK','A2.4','vertical uses sin',{type:'formulaUse',formula:'vy=vsin(theta)'}),c('A2','UK','A2.4','15 m/s',{type:'physicsQuantity',quantity:'speed',value:15,unit:'m/s'},{field:'vertical'}),
    ]},
    {id:'b',marks:4,objective:'A2.4',prompt:'Explain why those two components are equivalent to the original velocity vector.',criteria:[
      c('B1','KC','A2.4','components are perpendicular',{type:'writtenConcept',any:['right angle','perpendicular']}),
      c('B2','KC','A2.4','vector sum reconstructs original',{type:'writtenConcept',all:['vector'],any:['sum','combine','resultant','same effect']}),
      c('B3','UK','A2.4','horizontal and vertical directions identified',{type:'writtenConcept',all:['horizontal','vertical']}),
      c('B4','UK','A2.4','magnitude/direction are preserved by recombination',{type:'writtenConcept',any:['same magnitude','same direction','original vector','same effect']}),
    ]},
    {id:'c',marks:4,objective:'A2.3',prompt:'A 9 N force east and 12 N force south act together. Calculate the magnitude and state a clear direction.',responseFields:['magnitude','direction'],criteria:[
      c('M1','UK','A2.3','uses Pythagoras',{type:'formulaUse',formula:'R=sqrt(A2+B2)'}),c('A1','UK','A2.3','15 N',{type:'physicsQuantity',quantity:'force',value:15,unit:'N'},{field:'magnitude'}),
      c('M2','UK','A2.3','uses tan=12/9 or equivalent',{type:'formulaUse',formula:'tan(theta)=12/9'}),c('A2','UK','A2.3','about 53.1 degrees south of east',{type:'directionAngle',angleDeg:53.13,reference:'south of east',angleTolerance:2},{field:'direction'}),
    ]},
    {id:'d',marks:3,objective:'A2.1',prompt:'Explain why momentum is a vector but kinetic energy is a scalar.',criteria:[
      c('B1','KC','A2.1','momentum includes velocity direction',{type:'writtenConcept',all:['momentum','direction'],any:['velocity','vector']}),
      c('B2','KC','A2.1','kinetic energy has magnitude only',{type:'writtenConcept',all:['kinetic energy'],any:['magnitude only','scalar','no direction']}),
      c('B3','UK','A2.1','reversing velocity reverses momentum but not kinetic energy sign',{type:'writtenConcept',all:['momentum','kinetic energy'],any:['reverse','direction','sign']}),
    ]},
  ]},
]);
export function a2StructuredCoverage(){const objectives=new Set();const profiles={KC:0,UK:0,XS:0};let marks=0;for(const q of A2_STRUCTURED_BANK)for(const p of q.parts)for(const x of p.criteria){objectives.add(x.objective||p.objective);profiles[x.profile]+=x.marks||1;marks+=x.marks||1;}return{questionCount:A2_STRUCTURED_BANK.length,marks,objectives:[...objectives].sort(),profiles};}
