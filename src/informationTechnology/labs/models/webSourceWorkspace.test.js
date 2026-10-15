import { DEFAULT_WEB_FILES, validateWebFiles, buildSandboxPreview } from "./webSourceWorkspace.mjs";
test("default HTML and CSS open as a preview",()=>{
 expect(validateWebFiles(DEFAULT_WEB_FILES)).toEqual([]);
 expect(buildSandboxPreview(DEFAULT_WEB_FILES).html).toContain("Technology Club");
});
test("rejects active HTML and unsupported file paths",()=>{
 expect(buildSandboxPreview({...DEFAULT_WEB_FILES,"index.html":"<script>alert(1)</script>"}).errors.length).toBeGreaterThan(0);
 expect(validateWebFiles({...DEFAULT_WEB_FILES,"../evil.js":"x"}).length).toBeGreaterThan(0);
});
