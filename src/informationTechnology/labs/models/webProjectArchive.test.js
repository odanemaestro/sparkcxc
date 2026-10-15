import { buildSourceProjectArchive } from "./webProjectArchive.mjs";
import { DEFAULT_WEB_FILES } from "./webSourceWorkspace.mjs";
test("packages multiple HTML/CSS source files as a ZIP",()=>{
 const result=buildSourceProjectArchive({...DEFAULT_WEB_FILES,"activities.html":"<h1>Activities</h1>"});
 expect(result.errors).toEqual([]);
 expect([...result.data.slice(0,4)]).toEqual([80,75,3,4]);
 const content=new TextDecoder().decode(result.data);
 expect(content).toContain("activities.html");
 expect(content).toContain("styles.css");
});
test("rejects active content and invalid source file names",()=>{
 expect(buildSourceProjectArchive({...DEFAULT_WEB_FILES,"activities.html":"<script>alert(1)</script>"}).errors.length).toBeGreaterThan(0);
 expect(buildSourceProjectArchive({...DEFAULT_WEB_FILES,"../x.html":"Hello"}).errors.length).toBeGreaterThan(0);
});
