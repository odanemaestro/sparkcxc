const fs = require("fs");
const path = require("path");

describe("Integrated Science Phase 1.1 visual polish", () => {
  const transport = fs.readFileSync(
    path.join(__dirname,"subjects","components","TransportProcessExplorer.jsx"),
    "utf8"
  );
  const css = fs.readFileSync(
    path.join(__dirname,"subjects","components","transportProcessExplorer.css"),
    "utf8"
  );
  const index = fs.readFileSync(
    path.join(__dirname,"..","public","index.html"),
    "utf8"
  );

  test("diffusion explanation is clear in the across-cells context", () => {
    expect(transport).toContain(
      "Diffusion does not require a selectively permeable membrane, although substances may diffuse across the cell membrane"
    );
  });

  test("diffusion scene does not imply a selectively permeable barrier", () => {
    const diffusionStart = transport.indexOf("function DiffusionScene");
    const osmosisStart = transport.indexOf("function OsmosisScene");
    const diffusionBlock = transport.slice(diffusionStart,osmosisStart);
    expect(diffusionBlock).not.toContain('className="centre-guide"');
  });

  test("mobile SVG teaching labels receive dedicated readability treatment", () => {
    expect(css).toContain("SPARK_TRANSPORT_MOBILE_READABILITY_V1");
    expect(css).toContain(".spark-transport-stage .zone-label");
    expect(css).toContain("font-size:23px");
    expect(css).toContain(".spark-transport-stage .membrane-label");
    expect(css).toContain(".spark-transport-stage .energy-badge text");
  });

  test("standard mobile web app capability meta is present", () => {
    expect(index).toContain('name="mobile-web-app-capable"');
    expect(index).toContain('content="yes"');
  });
});