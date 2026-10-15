import { DEFAULT_WEB_FILES, validateWebFiles, buildSandboxPreview } from "./webSourceWorkspace.mjs";
test("default HTML and CSS open as a preview",()=>{
 expect(validateWebFiles(DEFAULT_WEB_FILES)).toEqual([]);
 expect(buildSandboxPreview(DEFAULT_WEB_FILES).html).toContain("Technology Club");
});
test("rejects active HTML and unsupported file paths",()=>{
 expect(buildSandboxPreview({...DEFAULT_WEB_FILES,"index.html":"<script>alert(1)</script>"}).errors.length).toBeGreaterThan(0);
 expect(validateWebFiles({...DEFAULT_WEB_FILES,"../evil.js":"x"}).length).toBeGreaterThan(0);
});

test("uses restrictive CSP and retains source HTML head",()=>{
 const result=buildSandboxPreview({...DEFAULT_WEB_FILES, "index.html": '<!doctype html><html lang="en"><head><title>Sample</title></head><body><h1>Hello</h1></body></html>'});
 expect(result.errors).toEqual([]);
 expect(result.html).toContain('Content-Security-Policy');
 expect(result.html).toContain("default-src 'none'");
 expect(result.html.match(/<html/g)).toHaveLength(1);
 expect(result.html).toContain("<title>Sample</title>");
 expect(result.html).toContain("font-family: system-ui");
});
