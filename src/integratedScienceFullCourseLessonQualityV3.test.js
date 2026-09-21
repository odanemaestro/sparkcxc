const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname,"..","supabase","migrations");
const objectiveMigrationPattern = /^20260921\d+_integrated_science_objective_(\d+)\.sql$/;

function objectiveMigrations(){
  return fs.readdirSync(migrationsDir)
    .map(name => {
      const match = name.match(objectiveMigrationPattern);
      return match
        ? {
            name,
            suffix:match[1],
            content:fs.readFileSync(path.join(migrationsDir,name),"utf8"),
          }
        : null;
    })
    .filter(Boolean)
    .sort((a,b)=>a.name.localeCompare(b.name));
}

function rawApostrophesInJsonStrings(content){
  const violations=[];
  const jsonStrings=content.match(/"(?:\\.|[^"\\])*"/g) || [];

  jsonStrings.forEach(token=>{
    for(let index=0; index<token.length;){
      if(token[index] !== "'"){
        index += 1;
        continue;
      }

      let end=index;
      while(end < token.length && token[end] === "'") end += 1;
      const runLength=end-index;

      if(runLength % 2 !== 0){
        violations.push(token.slice(Math.max(0,index-36),Math.min(token.length,end+36)));
      }

      index=end;
    }
  });

  return violations;
}

describe("Integrated Science full-course lesson quality V3",()=>{
  const migrations=objectiveMigrations();
  const studyView=fs.readFileSync(
    path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
    "utf8"
  );

  test("has exactly one objective migration for each of the 114 canonical syllabus objectives",()=>{
    expect(migrations).toHaveLength(114);
  });

  test.each(migrations.map(item=>[item.name,item.content]))(
    "%s contains a complete learner lesson contract",
    (_name,content)=>{
      expect(content).toContain('"lesson"');
      expect(content).toContain('"objectives"');
      expect(content).toContain('"introduction"');
      expect(content).toContain('"sections"');
      expect(content).toContain('"keyPoints"');
      expect(content).toContain('"workedExample"');
      expect(content).toContain('"checks"');
      expect(content).toContain('"summary"');
    }
  );

  test.each(migrations.map(item=>[item.name,item.content]))(
    "%s escapes apostrophes inside SQL JSON strings",
    (_name,content)=>{
      expect(rawApostrophesInJsonStrings(content)).toEqual([]);
    }
  );

  test.each(migrations.map(item=>[item.name,item.content]))(
    "%s includes a scientific visual or interactive model",
    (_name,content)=>{
      expect(
        content.includes('"interactiveModels"') ||
        content.includes('"interactiveDiagrams"')
      ).toBe(true);
    }
  );

  test("every objective interactive model type is rendered by the shared study view",()=>{
    const types=new Set();

    migrations.forEach(({content})=>{
      const modelBlocks=[
        ...content.matchAll(/"interactiveModels"\s*:\s*\[([\s\S]*?)\]/g),
      ];

      modelBlocks.forEach(block=>{
        for(const match of block[1].matchAll(/"type"\s*:\s*"([^"]+)"/g)){
          types.add(match[1]);
        }
      });
    });

    expect(types.size).toBeGreaterThan(0);

    for(const type of types){
      expect(studyView).toContain(`model?.type === "${type}"`);
    }
  });

  test.each(migrations.map(item=>[item.suffix,item.name]))(
    "objective suffix %s has its own acceptance regression",
    (suffix)=>{
      const acceptancePath=path.join(
        __dirname,
        `integratedScienceObjective${suffix}AcceptanceV1.test.js`
      );
      expect(fs.existsSync(acceptancePath)).toBe(true);
    }
  );
});
