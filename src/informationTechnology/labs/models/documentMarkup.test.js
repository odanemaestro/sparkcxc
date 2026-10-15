/** @jest-environment jsdom */
import { sanitizeDocumentMarkup } from "./documentMarkup.mjs";
describe("Word editor safe rich text", () => {
  test("keeps emphasis, paragraphs and allowed font styling", () => {
    const html = sanitizeDocumentMarkup('<p><strong>Club</strong> <em>News</em></p><span style="font-size: 18px">Hi</span>');
    expect(html).toContain("<strong>Club</strong>");
    expect(html).toContain("<em>News</em>");
    expect(html).toContain("font-size:18px");
  });
  test("strips scripts, event handlers and dangerous HTML", () => {
    const html = sanitizeDocumentMarkup('<img src=x onerror="alert(1)"><script>alert(1)</script><span onclick="x()">Safe</span>');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("onclick");
    expect(html).toContain("Safe");
  });
  test("converts user text into escaped content", () => {
    expect(sanitizeDocumentMarkup("A &amp; B <b>bold</b>")).toBe("A &amp; B <b>bold</b>");
  });
});
