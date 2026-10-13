import fs from 'fs';
import path from 'path';
import {CHEMISTRY_PAPER2_PRACTICE_SETS,CHEMISTRY_SVGS} from './data/chemistryPaper2Bank';
import {CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG,CHEMISTRY_2013_Q3_STARCH_MODEL_SVG} from './data/chemistryHistorical2013PolymerSvgs';
import {CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG} from './data/chemistryHistorical2015ModelsSvgs';
import {CHEMISTRY_2025_OXYGEN_PREPARATION_SVG} from './data/chemistryHistorical2025ModelSvgs';

function collect(){
 const diagrams=new Set(),visited=new WeakSet();
 const walk=value=>{
  if(typeof value==='string'&&value.trim().startsWith('<svg'))diagrams.add(value);
  else if(value&&typeof value==='object'&&!visited.has(value)){visited.add(value);Object.values(value).forEach(walk);}
 };
 for(const file of fs.readdirSync(path.join(__dirname,'data')).filter(f=>f.endsWith('.js')))walk(require('./data/'+file));
 return [...diagrams];
}

test('every stored Chemistry figure is valid vector XML with a finite viewBox',()=>{
 const diagrams=collect();
 expect(diagrams.length).toBeGreaterThanOrEqual(156);
 for(const markup of diagrams){
  const doc=new DOMParser().parseFromString(markup,'image/svg+xml');
  expect(doc.querySelector('parsererror')).toBeNull();
  expect(doc.querySelector('image,script,foreignObject')).toBeNull();
  const box=doc.documentElement.getAttribute('viewBox').split(/[ ,]+/).map(Number);
  expect(box).toHaveLength(4);
  expect(box.every(Number.isFinite)).toBe(true);
  expect(box[2]).toBeGreaterThan(0);expect(box[3]).toBeGreaterThan(0);
 }
});

test('displayed organic structures obey carbon, oxygen, hydrogen and halogen valences',()=>{
 let examined=0;const failures=[];
 for(const markup of collect()){
  const doc=new DOMParser().parseFromString(markup,'image/svg+xml');
  // Composite panels reuse the independently checked structures inside scaled groups.
  if(doc.querySelector('g[transform]'))continue;
  const atoms=[...doc.querySelectorAll('text')].filter(t=>/^(C|H|O|Cl|Br)$/.test(t.textContent.trim())).map(t=>({symbol:t.textContent.trim(),x:Number(t.getAttribute('x')),y:Number(t.getAttribute('y'))-7,bonds:0}));
  if(atoms.filter(a=>a.symbol==='C').length<1||atoms.filter(a=>a.symbol==='H').length<3||!doc.querySelector('line'))continue;
  const nearest=(x,y)=>atoms.map((a,i)=>({i,d:Math.hypot(a.x-x,a.y-y)})).sort((a,b)=>a.d-b.d)[0];
  let links=0;
  for(const line of doc.querySelectorAll('line')){
   const a=nearest(Number(line.getAttribute('x1')),Number(line.getAttribute('y1'))),b=nearest(Number(line.getAttribute('x2')),Number(line.getAttribute('y2')));
   if(a.d>30||b.d>30||a.i===b.i)continue;
   atoms[a.i].bonds++;atoms[b.i].bonds++;links++;
  }
  if(!links)continue;
  examined++;
  for(const atom of atoms)if(atom.bonds!=={C:4,O:2,H:1,Cl:1,Br:1}[atom.symbol])failures.push({title:doc.querySelector('title')?.textContent,...atom});
 }
 expect(examined).toBeGreaterThan(20);
 expect(failures).toEqual([]);
});

test('electrode materials and gas collection diagrams agree with the questions',()=>{
 for(const paper of CHEMISTRY_PAPER2_PRACTICE_SETS){
  const electro=paper.questions[4].parts[0];
  expect(electro.context).toMatch(/inert/i);
  expect(electro.svg).toContain('inert electrode');
  expect(electro.svg).not.toContain('copper electrode');
  const gas=paper.questions[5].parts[1];
  if(gas.context.includes('ammonia')){
   expect(gas.svg).toContain('inverted dry gas jar');expect(gas.svg).toContain('CaO drying tube');expect(gas.svg).toContain('upward delivery');
  }else{
   expect(gas.svg).toContain('upright gas jar');expect(gas.svg).toContain('CaCl₂ drying tube');expect(gas.svg).toContain('downward delivery');
  }
 }
});

test('biological models identify the alpha carbon and do not imply glucose has four-membered rings',()=>{
 expect(CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG).toContain('H₂N–CH(R)–C(=O)–OH');
 expect(CHEMISTRY_2013_Q3_STARCH_MODEL_SVG).toContain('α(1→4)');
 expect(CHEMISTRY_2013_Q3_STARCH_MODEL_SVG).toContain('Boxes represent residues');
});

test('distillation names both coolant connections and oxygen collection uses an immersed jar mouth',()=>{
 expect(CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG).toContain('Cooling water out (upper end)');
 expect(CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG).toContain('Cooling water in (lower end)');
 expect(CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG).toContain('Electrically heated water bath');
 const doc=new DOMParser().parseFromString(CHEMISTRY_2025_OXYGEN_PREPARATION_SVG,'image/svg+xml');
 expect(doc.querySelector('path[d="M474 300 V110 H553 V300"]')).not.toBeNull();
 expect(CHEMISTRY_SVGS.gasPrep).not.toMatch(/<image/);
});
