import React from "react";

// SPARK V5.3.10.2 - Keep Insight copy readable while still storing a plain-text
// summary that can be reused by PDFs and email reports. Text inside curly
// quotation marks is a syllabus topic and is emphasized in the UI.
export default function InsightText({ text = "" }) {
  const value = String(text || "");
  const parts = value.split(/(“[^”]+”)/g).filter(Boolean);

  return <>{parts.map((part, index) => (
    /^“[^”]+”$/.test(part)
      ? <strong className="spark-insight-topic" key={`${part}-${index}`}>{part}</strong>
      : <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
  ))}</>;
}
