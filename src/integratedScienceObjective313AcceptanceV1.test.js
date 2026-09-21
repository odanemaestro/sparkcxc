const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921070000_integrated_science_objective_313.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SolarSystemExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","solarSystemExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.1.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.1.3"');expect(migration).toContain("3.1.3 The Solar System");});
 test("covers eight planets and correct order",()=>{expect(migration).toContain("Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune");expect(migration).toContain("eight major planets");expect(explorer).toContain("Planet order");});
 test("covers banked planet facts",()=>{expect(migration).toContain("Jupiter is the largest");expect(migration).toContain("iron oxide");expect(migration).toContain("Saturn");expect(explorer).toContain("Red Planet");});
 test("covers Earth and Mercury positions",()=>{expect(migration).toContain("Earth is the third planet");expect(migration).toContain("Mercury is closest");});
 test("covers moon facts",()=>{expect(migration).toContain("Mercury and Venus are the only two major planets with no natural satellites");expect(explorer).toContain("Known moons");});
 test("keeps giant-planet classification accurate",()=>{expect(migration).toContain("Jupiter and Saturn are gas giants");expect(migration).toContain("Uranus and Neptune are usually classified as ice giants");expect(explorer).toContain("ICE GIANTS");});
 test("covers elliptical orbits",()=>{expect(migration).toContain("elliptical paths");expect(explorer).toContain("Elliptical orbits");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"solar-system"');expect(view).toContain("SolarSystemExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to sixty-eight objectives",()=>{expect(migration).toContain('"objectivesBuilt":68');});
});
