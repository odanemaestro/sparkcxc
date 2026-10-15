import { buildPresentationHtml } from "./presentationExport.mjs";
test("exports numbered slides with text and theme",()=>{
 const html=buildPresentationHtml([{title:"Welcome",body:"First point\nSecond point",bullets:true,layout:"Title and Content"}],"Ocean","School");
 expect(html).toContain("body class=\"ocean\"");
 expect(html).toContain("<li>First point</li>");
 expect(html).toContain("Slide 1 of 1");
 expect(html).toContain("School");
});
test("escapes script-like content",()=>{
 const html=buildPresentationHtml([{title:"<script>alert(1)</script>",body:"<img src=x>",layout:"Title and Content"}]);
 expect(html).not.toContain("<script>alert");
 expect(html).not.toContain("<img src=x>");
});
