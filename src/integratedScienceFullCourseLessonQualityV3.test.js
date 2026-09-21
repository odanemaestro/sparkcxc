const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname,"..","supabase","migrations");
const objectiveMigrationPattern = /^20260921\d+_integrated_science_objective_(\d+)\.sql$/;

function objectiveMigrations(){
  return fs.readdirSync(migrationsDir)
    .map(name => {
      const match = name.match(objectiveMigrationPattern);
      return match ? {name,suffix:match[1],content:fs.readFileSync(path.join(migrationsDir,name),"utf8")} : null;
    })
    .filter(Boolean)
    .sort((a,b)=>a.name.localeCompare(b.name));
}

describe("Integrated Science full-course lesson quality V3",()=>{
  const migrations=objectiveMigrations();

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
      const modelBlocks=[...content.matchAll(/"interactiveModels"\s*:\s*\[([\s\S]*?)\]/g)];
      modelBlocks.forEach(block=>{
        for(const match of block[1].matchAll(/"type"\s*:\s*"([^"]+)"/g)) types.add(match[1]);
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
