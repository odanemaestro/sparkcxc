import fs from "fs";
import path from "path";

describe("SPARK app-wide back-to-top component consistency", () => {
  const root=path.resolve(__dirname,"../..");
  const read=relative=>fs.readFileSync(path.join(root,relative),"utf8");
  test("root mounts exactly one shared action and study view mounts no duplicate",()=>{
    const app=read("App.js");
    const study=read("subjects/GenericSubjectStudyView.jsx");
    expect((app.match(/<ScrollToTopButton\b/g)||[])).toHaveLength(1);
    expect(study).not.toContain("FnhBackToTop");
    expect(study).not.toContain("spark-fnh-back-to-top");
  });
  test("rounded square shared styles cover dark, glass, safe areas and accessibility",()=>{
    const css=read("components/ui/ScrollToTopButton.css");
    expect(css).toContain("border-radius:16px");
    expect(css).toContain('html[data-theme="dark"] .spark-scroll-top');
    expect(css).toContain('html[data-glass="true"] .spark-scroll-top');
    expect(css).toContain('html[data-theme="dark"][data-glass="true"] .spark-scroll-top');
    expect(css).toContain("safe-area-inset-right");
    expect(css).toContain("prefers-reduced-motion");
    expect(css).toContain("prefers-reduced-transparency");
    expect(css).toContain("focus-visible");
    const fnhCss=read("fnh/components/fnhStudyExperience.css");
    expect(fnhCss).not.toContain(".spark-fnh-back-to-top");
  });
});
