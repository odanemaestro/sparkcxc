function cleanText(value) {
  return String(value ?? "")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/[^\x20-\x7E]/g, "?");
}

function pdfEscape(value) {
  return cleanText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, maxChars = 78) {
  const words = cleanText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function rgb(hex) {
  const value = String(hex).replace("#", "");
  const number = Number.parseInt(value, 16);
  return [((number >> 16) & 255) / 255, ((number >> 8) & 255) / 255, (number & 255) / 255]
    .map(channel => channel.toFixed(3))
    .join(" ");
}

class PdfPage {
  constructor() {
    this.commands = [];
    this.y = 790;
  }
  fill(hex) { this.commands.push(`${rgb(hex)} rg`); }
  stroke(hex) { this.commands.push(`${rgb(hex)} RG`); }
  text(text, x, y, size = 10, bold = false, color = "#0F2557") {
    this.fill(color);
    this.commands.push(`BT /F${bold ? 2 : 1} ${size} Tf ${x} ${y} Td (${pdfEscape(text)}) Tj ET`);
  }
  line(x1, y1, x2, y2, color = "#D7E2EE", width = 1) {
    this.stroke(color);
    this.commands.push(`${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
  }
  rect(x, y, width, height, fill = "#F7FAFC", stroke = null, radius = 0) {
    this.fill(fill);
    if (stroke) this.stroke(stroke);
    if (radius > 0) {
      const r = Math.min(radius, width / 2, height / 2);
      const k = 0.5522847498;
      const x2 = x + width, y2 = y + height;
      this.commands.push(`${x+r} ${y} m ${x2-r} ${y} l ${x2-r+k*r} ${y} ${x2} ${y+r-k*r} ${x2} ${y+r} c ${x2} ${y2-r} l ${x2} ${y2-r+k*r} ${x2-r+k*r} ${y2} ${x2-r} ${y2} c ${x+r} ${y2} l ${x+r-k*r} ${y2} ${x} ${y2-r+k*r} ${x} ${y2-r} c ${x} ${y+r} l ${x} ${y+r-k*r} ${x+r-k*r} ${y} ${x+r} ${y} c ${stroke ? "B" : "f"}`);
    } else {
      this.commands.push(`${x} ${y} ${width} ${height} re ${stroke ? "B" : "f"}`);
    }
  }
  paragraph(text, x, y, options = {}) {
    const size = options.size || 10;
    const lineHeight = options.lineHeight || size * 1.45;
    const maxChars = options.maxChars || 80;
    const lines = wrapText(text, maxChars);
    lines.forEach((line, index) => this.text(line, x, y - index * lineHeight, size, options.bold, options.color || "#334E68"));
    return y - lines.length * lineHeight;
  }
}

function createPdf(pages) {
  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  const pageObjectNumbers = pages.map((_, index) => 5 + index * 2);
  objects.push(`<< /Type /Pages /Kids [${pageObjectNumbers.map(n => `${n} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  pages.forEach((page, index) => {
    const contentNumber = 6 + index * 2;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentNumber} 0 R >>`);
    const stream = page.commands.join("\n");
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  let pdf = "%PDF-1.4\n%SPARK\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Uint8Array.from(pdf, char => char.charCodeAt(0) & 0xff);
}


function percentMetric(value, available) {
  if (!available) return "N/A";
  const number = Number(value);
  return Number.isFinite(number) ? `${Math.round(number)}%` : "N/A";
}

const DISPLAY_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateOnly(value) {
  if (!value) return "";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getDate()} ${DISPLAY_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function sectionTitle(page, title, y) {
  page.text(title.toUpperCase(), 42, y, 9, true, "#0D9488");
  page.line(42, y - 8, 553, y - 8, "#D7E2EE", 0.8);
  return y - 26;
}

function skillRows(page, rows, y, emptyCopy) {
  if (!rows?.length) {
    page.text(emptyCopy, 48, y, 10, false, "#6B7C93");
    return y - 20;
  }
  rows.slice(0, 3).forEach(row => {
    page.text(cleanText(row.skill), 48, y, 10, true, "#15324B");
    page.text(`${Math.round(Number(row.score ?? row.mastery_score ?? 0))}%`, 510, y, 10, true, "#0D9488");
    y -= 18;
  });
  return y;
}

function addFooter(page, pageNumber, totalPages, subject = "Learning progress") {
  page.line(42, 42, 553, 42, "#D7E2EE", 0.8);
  page.text(`Generated by SPARK - ${cleanText(subject)}`, 42, 25, 8.5, false, "#6B7C93");
  page.text(`Page ${pageNumber} of ${totalPages}`, 500, 25, 8.5, false, "#6B7C93");
}

export function generateStudentProgressPdfBytes({ studentName, report, parentName = "", subject = "CSEC Mathematics" }) {
  const pages = [new PdfPage(), new PdfPage()];
  const page1 = pages[0];
  const summary = report.summary || {};
  const activity = report.activity || {};

  page1.rect(0, 710, 595, 132, "#0F2557");
  page1.text("SPARK", 42, 800, 24, true, "#FFFFFF");
  page1.text("STUDENT PROGRESS REPORT", 42, 774, 10, true, "#5EEAD4");
  page1.text(cleanText(studentName || "Student"), 42, 742, 21, true, "#FFFFFF");
  page1.text(subject, 42, 722, 10, false, "#D8E4F0");
  page1.text(report?.period?.label || "Progress summary", 398, 744, 11, true, "#FFFFFF");
  page1.text(formatDateOnly(report.generatedAt || Date.now()), 430, 724, 9, false, "#D8E4F0");

  let y = 680;
  page1.text("Performance at a glance", 42, y, 15, true, "#0F2557");
  y -= 20;
  const cards = Array.isArray(report?.metrics) && report.metrics.length
    ? report.metrics.slice(0, 4).map(item => [cleanText(item.label), cleanText(item.value)])
    : [
      ["Current mastery", percentMetric(summary.mastery, Number(summary.skillCount || 0) > 0)],
      ["Paper 1", percentMetric(summary.paper1Average, Number(summary.paper1Count || 0) > 0)],
      ["Paper 2", percentMetric(summary.paper2Average, Number(summary.paper2Count || 0) > 0)],
      ["2027", percentMetric(summary.paper2027Average, Number(summary.paper2027Count || 0) > 0)],
    ];
  cards.forEach(([label, value], index) => {
    const x = 42 + index * 128;
    page1.rect(x, y - 65, 116, 58, "#F2F8FA", "#D7E2EE", 7);
    page1.text(value, x + 12, y - 35, 20, true, "#0D9488");
    page1.text(label, x + 12, y - 52, 8.5, true, "#6B7C93");
  });
  y -= 92;

  y = sectionTitle(page1, "SPARK insight", y);
  y = page1.paragraph(summary.insight || "Complete more SPARK learning activities to build a richer progress picture.", 48, y, { size: 10.5, maxChars: 88, color: "#334E68" }) - 8;

  y = sectionTitle(page1, "Learning activity", y);
  const activityLabels = report.activityLabels || {};
  const activityPairs = [
    ["Lessons completed", activity.lessonsCompleted || 0],
    [activityLabels.questionsAttempted || "Questions attempted", activity.questionsAttempted || 0],
    [activityLabels.questionAccuracy || "Question accuracy", percentMetric(activity.questionAccuracy, Boolean(activity.hasQuestionAccuracy))],
    [activityLabels.examsCompleted || "Full exams completed", activity.examsCompleted || 0],
    [activityLabels.examAverage || "Exam average", percentMetric(activity.examAverage, Boolean(activity.hasExamAverage))],
    ["Tutor sessions", activity.tutorSessions || 0],
    ["Flashcards reviewed", activity.flashcardsReviewed || 0],
  ];
  if (report.studyCircle != null) {
    activityPairs.push(["Study Circle", report.studyCircle?.active ? (Number(report.studyCircle?.group_size || 0) > 0 ? `Active - ${Number(report.studyCircle.group_size)} students` : "Active") : "Not active"]);
  }
  activityPairs.forEach(([label, value], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 48 + col * 250;
    const yy = y - row * 22;
    page1.text(label, x, yy, 9.5, false, "#6B7C93");
    page1.text(String(value), x + 185, yy, 9.5, true, "#15324B");
  });
  y -= Math.ceil(activityPairs.length / 2) * 22 + 12;

  y = sectionTitle(page1, "Strongest areas", y);
  y = skillRows(page1, report.strongestSkills, y, "No mastery data recorded yet.") - 8;
  y = sectionTitle(page1, "Areas to improve", y);
  y = skillRows(page1, report.weakestSkills, y, "No priority areas recorded yet.") - 8;

  if (report.goal?.title) {
    y = sectionTitle(page1, "Student goal", y);
    page1.text(cleanText(report.goal.title), 48, y, 10.5, true, "#15324B");
    page1.text(`Target: ${report.goal.target_percent || "-"}%${report.goal.target_date ? ` by ${formatDateOnly(report.goal.target_date)}` : ""}`, 48, y - 17, 9.5, false, "#6B7C93");
  }

  const page2 = pages[1];
  page2.text("SPARK", 42, 800, 18, true, "#0F2557");
  page2.text("Progress detail", 42, 776, 14, true, "#0F2557");
  let y2 = 742;
  y2 = sectionTitle(page2, report?.assessmentLabel || "Recent assessment results", y2);
  if (report.exams?.length) {
    report.exams.slice(0, 5).forEach(exam => {
      page2.text(exam.label, 48, y2, 10, true, "#15324B");
      page2.text(`${exam.score}/${exam.maxScore}  (${exam.percent}%)`, 390, y2, 10, true, "#0D9488");
      page2.text(formatDateOnly(exam.completedAt), 48, y2 - 14, 8.5, false, "#6B7C93");
      y2 -= 35;
    });
  } else {
    page2.text(report?.emptyAssessmentCopy || "No assessment results in this reporting period.", 48, y2, 10, false, "#6B7C93");
    y2 -= 24;
  }

  y2 = sectionTitle(page2, "Recommended next steps", y2);
  (report.recommendations || []).slice(0, 4).forEach((recommendation, index) => {
    page2.text(`${index + 1}.`, 48, y2, 10, true, "#0D9488");
    y2 = page2.paragraph(recommendation, 66, y2, { size: 10, maxChars: 82, color: "#334E68" }) - 8;
  });

  y2 = sectionTitle(page2, "Recent achievements", y2);
  if (report.milestones?.length) {
    report.milestones.slice(0, 6).forEach(item => {
      page2.text(cleanText(item.title || "Learning milestone"), 48, y2, 10, true, "#15324B");
      page2.text(formatDateOnly(item.created_at), 450, y2, 8.5, false, "#6B7C93");
      y2 -= 20;
    });
  } else {
    page2.text("No milestones recorded in this reporting period.", 48, y2, 10, false, "#6B7C93");
    y2 -= 24;
  }

  y2 -= 8;
  page2.rect(42, Math.max(100, y2 - 92), 511, 84, "#F2F8FA", "#D7E2EE", 8);
  page2.text("For parents and students", 56, Math.max(162, y2 - 30), 10, true, "#0D9488");
  page2.paragraph("This report summarizes activity recorded in SPARK. It is designed to support conversations about progress and next steps. Individual results should be interpreted alongside classroom work, teacher feedback and the student's wider learning context.", 56, Math.max(142, y2 - 48), { size: 9.3, maxChars: 88, color: "#52677A" });

  if (parentName) page2.text(`Prepared for ${cleanText(parentName)}`, 42, 65, 9, false, "#6B7C93");
  pages.forEach((page, index) => addFooter(page, index + 1, pages.length, subject));
  return createPdf(pages);
}

export function progressReportPdfBlob(args) {
  return new Blob([generateStudentProgressPdfBytes(args)], { type: "application/pdf" });
}

export function downloadStudentProgressPdf(args) {
  const blob = progressReportPdfBlob(args);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = cleanText(args.studentName || "student").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  link.href = url;
  link.download = `SPARK_${safeName || "Student"}_Progress_Report.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function pdfBytesToBase64(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunk) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(bytes.length, offset + chunk)));
  }
  return btoa(binary);
}
