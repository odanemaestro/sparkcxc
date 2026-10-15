import { buildDocumentHtml, escapeDocumentHtml } from "./documentExport.mjs";
describe("Word Studio document export", () => {
  test("escapes content so typed HTML does not execute", () => {
    expect(escapeDocumentHtml('<script>alert("x")</script>')).toBe("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    const output = buildDocumentHtml({ body: '<img src=x onerror=alert(1)>' });
    expect(output).not.toContain("<img");
    expect(output).toContain("&lt;img");
  });
  test("preserves header, footer, paragraphs, page setup and table", () => {
    const html = buildDocumentHtml({ title: "Technology Club", header: "School", footer: "Page 1", body: "One\nTwo", columns: 2, orientation: "landscape", table: true });
    expect(html).toContain("A4 landscape");
    expect(html).toContain("column-count:2");
    expect(html).toContain("<p>One</p>");
    expect(html).toContain("<p>Two</p>");
    expect(html).toContain("<table>");
  });
});
