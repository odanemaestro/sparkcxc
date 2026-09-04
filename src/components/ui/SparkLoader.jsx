import React from "react";

export default function SparkLoader({
  variant = "screen",
  label = "Loading SPARK",
}) {
  const safeVariant = ["screen", "section", "inline"].includes(variant)
    ? variant
    : "section";

  return (
    <div
      className={`spark-loader spark-loader--${safeVariant}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="spark-loader__bar" aria-hidden="true">
        <span className="spark-loader__fill" />
      </div>
      <span className="spark-loader__sr">{label}</span>
    </div>
  );
}
