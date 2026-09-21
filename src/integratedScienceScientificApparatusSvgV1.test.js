const fs=require("fs");
const path=require("path");

const read=name=>fs.readFileSync(path.join(__dirname,"subjects","components",name),"utf8");

const photo=read("PhotosynthesisEnergyExplorer.jsx");
const photoCss=read("photosynthesisEnergyExplorer.css");
const respiration=read("RespirationImportanceExplorer.jsx");
const respirationCss=read("respirationImportanceExplorer.css");

describe("Integrated Science scientific apparatus SVG acceptance V1",()=>{
  test("leaf starch test renders the required laboratory sequence",()=>{
    for(const term of [
      "spark-photo-starch-svg",
      "Boil leaf in water",
      "Heat leaf in ethanol",
      "hot water bath",
      "ethanol is flammable, heat indirectly",
      "Rinse and add iodine",
      "blue-black = starch present",
      "brown/yellow-brown = no starch"
    ]) expect(photo).toContain(term);
    for(const term of [".pst-beaker",".pst-test-tube",".pst-ethanol",".pst-leaf",".pst-blue-black"]) expect(photoCss).toContain(term);
  });

  test("respiration evidence renders carbon dioxide and heat apparatus",()=>{
    for(const term of [
      "spark-respiration-evidence-svg",
      "germinating seeds",
      "limewater turns milky",
      "CO₂ carried through delivery tube",
      "bicarbonate indicator: red → yellow as CO₂ rises",
      "temperature rises",
      "insulated flask reduces heat exchange with surroundings"
    ]) expect(respiration).toContain(term);
    for(const term of [".re-flask",".re-delivery",".re-limewater",".re-chamber",".re-thermometer",".re-mercury"]) expect(respirationCss).toContain(term);
  });

  test("apparatus diagrams retain responsive and dark theme coverage",()=>{
    expect(photoCss).toContain("@media(max-width:700px)");
    expect(photoCss).toContain('html[data-theme="dark"] .spark-photo-starch-svg');
    expect(respirationCss).toContain("@media(max-width:620px)");
    expect(respirationCss).toContain('html[data-theme="dark"] .spark-respiration-evidence-svg');
  });
});
