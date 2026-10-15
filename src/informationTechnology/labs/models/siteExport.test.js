import { exportSitePage } from "./siteExport.mjs";
const pages=[{id:"home",title:"Home",heading:"Welcome",body:"Club"}];
test("exports navigable accessible site HTML",()=>{
 const html=exportSitePage(pages[0],pages,{emailHref:"mailto:club@example.com",emailLabel:"Email",externalHref:"https://example.com",externalLabel:"School"});
 expect(html).toContain('href="#home"');
 expect(html).toContain('aria-label="Site navigation"');
 expect(html).toContain("mailto:club@example.com");
});
test("escapes content and blocks unsafe links",()=>{
 const html=exportSitePage({...pages[0],title:"<img>",body:"<script>"},[{...pages[0],body:"<script>"}],{emailHref:"javascript:alert(1)",emailLabel:"Email",externalHref:"javascript:alert(1)",externalLabel:"School"});
 expect(html).not.toContain("<script>");
 expect(html).not.toContain("javascript:");
 expect(html).toContain("&lt;script&gt;");
});
