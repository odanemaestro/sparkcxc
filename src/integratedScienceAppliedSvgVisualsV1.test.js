const fs=require("fs");
const path=require("path");
const read=name=>fs.readFileSync(path.join(__dirname,"subjects","components",name),"utf8");

const water=read("WaterSafetyExplorer.jsx");
const waterCss=read("waterSafetyExplorer.css");
const fishing=read("FishingMethodsExplorer.jsx");
const fishingCss=read("fishingMethodsExplorer.css");

describe("Integrated Science applied SVG visual acceptance V1",()=>{
  test("water safety renders recognisable flotation and rescue devices",()=>{
    for(const term of [
      "spark-water-device-svg",
      "Life jacket fitted around a person",
      "buoyant foam",
      "reflective strips",
      "secure buckle",
      "Ring buoy with attached rescue line",
      "inflatable chamber",
      "protective canopy",
      "trapped air adds buoyancy",
      "close adult supervision is still required"
    ]) expect(water).toContain(term);
    for(const term of [
      ".ws-jacket",
      ".ws-reflective",
      ".ws-ring.outer",
      ".ws-rescue-line",
      ".ws-raft",
      ".ws-armband"
    ]) expect(waterCss).toContain(term);
  });

  test("fishing methods render the gear geometry that controls selectivity",()=>{
    for(const term of [
      "spark-fishing-gear-svg",
      "one line, hook and a single fish",
      "funnel entrance",
      "escape gap",
      "main line with floats",
      "branch lines with hooks",
      "floats support upper edge",
      "weights hold lower edge down",
      "cone-shaped trawl net",
      "bottom trawling can disturb seabed habitat"
    ]) expect(fishing).toContain(term);
    for(const term of [
      ".fg-hook",
      ".fg-pot",
      ".fg-funnel",
      ".fg-main-line",
      ".fg-seine",
      ".fg-trawl-net"
    ]) expect(fishingCss).toContain(term);
  });

  test("applied visuals retain responsive and dark theme coverage",()=>{
    expect(waterCss).toContain("@media(max-width:900px)");
    expect(waterCss).toContain('html[data-theme="dark"] .spark-water-device-svg');
    expect(fishingCss).toContain("@media(max-width:900px)");
    expect(fishingCss).toContain('html[data-theme="dark"] .spark-fishing-gear-svg');
  });
});
