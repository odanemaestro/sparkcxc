const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "theme.css"), "utf8");

describe("SPARK V5.3.9K1 consistent error UI", () => {
  test("auth and recovery errors use the shared block error surface", () => {
    expect(app).toContain('className="spark-form-error spark-form-error--block" role="alert"');
    expect(css).toContain(".spark-form-error--block");
  });

  test("field validation, including phone errors, uses the shared compact error surface", () => {
    expect(app).toContain('className="spark-form-error spark-form-error--field" role="alert"');
    expect(app).toContain("Enter a valid phone number for the selected country.");
    expect(css).toContain(".spark-form-error--field");
  });

  test("tutor form validation uses the existing global error toast variant", () => {
    expect(app).toContain('showToast(error, "error")');
    expect(app).toContain('showToast(validationError, "error")');
  });

  test("login persistence copy and checkbox are polished", () => {
    expect(app).toContain("Keep me logged in");
    expect(app).not.toContain("<span>Remember Me</span>");
    expect(app).toContain('className="spark-auth-remember-checkbox"');
    expect(css).toContain(".spark-auth-remember-checkbox:checked");
  });

  test("tutor CTA uses the concise label everywhere", () => {
    expect(app).toContain("Become a tutor");
    expect(app).not.toContain("Submit application to become a tutor");
  });

  test("legacy plain-red auth and field error renderers are removed", () => {
    expect(app).not.toContain('{err && <div style={{color:T.red,fontSize:13,marginBottom:12}}>{err}</div>}');
    expect(app).not.toMatch(/\{error\s*&&\s*<div[^>]*style=\{\{[^}]*fontSize:\s*12[^}]*color:\s*T\.red/);
  });
});
