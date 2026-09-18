import { checkProse } from "../../practice/cxcMarking/prose";
import { conceptPresent, conceptsPresent, normaliseITAnswer, phrasePresent } from "./itPaper2Canonical";

function partKey(questionNumber, partId) {
  return `${questionNumber}-${partId}`;
}

function asResponse(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return { answer: String(value ?? "") };
}

export function informationTechnologyResponseText(value) {
  const response = asResponse(value);
  const pieces = [response.answer, response.working, response.pseudocode];
  if (response.ipo) pieces.push(response.ipo.input, response.ipo.process, response.ipo.output);
  if (response.table) pieces.push(...Object.values(response.table));
  return pieces.filter(item => String(item ?? "").trim()).join("\n").trim();
}

function criterion(code, marks, description, earned, why) {
  const safeMarks = Math.max(0, Number(marks || 0));
  const safeEarned = Math.max(0, Math.min(safeMarks, Number(earned || 0)));
  return { code, marks: safeMarks, earned: safeEarned, correct: safeEarned === safeMarks, description, why };
}

function distribute(total, count) {
  const base = Math.floor(total / count);
  const extra = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < extra ? 1 : 0));
}

function conceptCriteria(answer, keys, required, totalMarks, description) {
  const hits = conceptsPresent(answer, keys);
  const use = Math.min(required, hits.length);
  const share = distribute(totalMarks, required);
  return share.map((marks, index) => criterion(
    `C${index + 1}`,
    marks,
    `${description} ${index + 1}`,
    index < use ? marks : 0,
    index < use ? `Accepted concept: ${hits[index]}.` : "A distinct accepted point was not established."
  ));
}

function proseCriterion(answer, marks, key, description = key, quorum = 0.55) {
  const checked = checkProse(String(answer || ""), { key, quorum });
  return criterion("B1", marks, description, checked.ok ? marks : 0, checked.ok ? "Required idea established." : checked.why);
}

function anyPhrase(answer, phrases) {
  return phrases.some(item => phrasePresent(answer, item));
}

function formulaNormal(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[−–—]/g, "-")
    .replace(/[×X]/g, "*")
    .replace(/\s+/g, "")
    .replace(/^=/, "=");
}

function formulaMatches(answer, accepted) {
  const got = formulaNormal(answer);
  return accepted.some(item => got === formulaNormal(item));
}

function queryConditions(value) {
  return normaliseITAnswer(value)
    .replace(/[“”'"]/g, "")
    .split(/\band\b/i)
    .map(part => part.replace(/\s+/g, "").trim())
    .filter(Boolean)
    .sort();
}

function queryMatches(answer, expected) {
  const a = queryConditions(answer);
  const b = queryConditions(expected);
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function responseField(response, name) {
  return String(asResponse(response)?.table?.[name] ?? "");
}

function scoreMachineCharacteristics(prompt, answer, marks) {
  const text = normaliseITAnswer(prompt);
  let keys = [];
  if (text.includes("supercomputer")) keys = ["high_processing", "large_workload", "reliability", "large_storage"];
  else if (text.includes("mainframe")) keys = ["many_users", "transactions", "reliability", "large_storage", "high_processing"];
  else keys = ["dedicated_task", "built_in", "real_time", "compact", "reliability"];
  return conceptCriteria(answer, keys, 2, marks, "Relevant characteristic");
}

function databaseKeyFromVisual(question, role) {
  const tables = question?.visual?.tables || [];
  if (!tables.length) return "";
  if (role === "primary") return tables[0]?.fields?.find(([, type]) => String(type).toUpperCase() === "PK")?.[0] || "";
  return tables[1]?.fields?.find(([, type]) => String(type).toUpperCase() === "FK")?.[0] || "";
}

function exactTerm(answer, expected, marks, description = expected) {
  const ok = normaliseITAnswer(answer).replace(/[^a-z0-9]/g, "") === normaliseITAnswer(expected).replace(/[^a-z0-9]/g, "");
  return [criterion("A1", marks, description, ok ? marks : 0, ok ? "Correct term." : `Expected ${expected}.`)];
}

function inferPseudocode(prompt) {
  const match = String(prompt).match(/reads ([^,]+), ([^,]+), ([^,]+),[\s\S]*at least (\d+)/i);
  return match ? { variables: [match[1], match[2], match[3]].map(x => x.trim()), threshold: Number(match[4]) } : { variables: [], threshold: null };
}

function gradePseudocode(part, response) {
  const text = informationTechnologyResponseText(response);
  const normal = normaliseITAnswer(text);
  const spec = part.responseSpec?.variables?.length ? part.responseSpec : inferPseudocode(part.prompt);
  const vars = spec.variables || [];
  const threshold = Number(spec.threshold);
  const hasInputVerb = /\b(read|input|accept|get|enter)\b/i.test(text);
  const varsFound = vars.filter(v => normal.includes(normaliseITAnswer(v))).length;
  const scoreLine = normal.split(/\n|;/).find(line => /\bscore\b/.test(line) && vars.every(v => line.includes(normaliseITAnswer(v))));
  const hasCondition = Number.isFinite(threshold)
    && /\b(if|when)\b/i.test(text)
    && new RegExp(`(?:score\\s*(?:>=|=>|≥)\\s*${threshold}|${threshold}\\s*(?:<=|=<|≤)\\s*score)`, "i").test(text.replace(/\s+/g, " "));
  const hasAccept = /\b(display|print|output|write|show)\b[\s\S]{0,30}\baccept\b/i.test(text);
  const hasElse = /\belse\b|\botherwise\b/i.test(text);
  const hasReview = /\b(display|print|output|write|show)\b[\s\S]{0,30}\breview\b/i.test(text);

  return [
    criterion("P1", 2, "Reads all three input values", hasInputVerb && varsFound === 3 ? 2 : varsFound >= 2 ? 1 : 0,
      hasInputVerb && varsFound === 3 ? "All required inputs are read." : "All three named inputs must be read."),
    criterion("P2", 2, "Calculates SCORE using all three values", scoreLine ? 2 : 0,
      scoreLine ? "SCORE calculation uses all three inputs." : "The SCORE calculation must use all three named inputs."),
    criterion("P3", 1, "Uses the correct threshold condition", hasCondition ? 1 : 0,
      hasCondition ? "Correct threshold condition found." : `The condition should compare SCORE with ${threshold}.`),
    criterion("P4", 1, "Displays ACCEPT on the true branch", hasAccept ? 1 : 0,
      hasAccept ? "ACCEPT output found." : "The true branch must display ACCEPT."),
    criterion("P5", 1, "Includes ELSE or OTHERWISE", hasElse ? 1 : 0,
      hasElse ? "Alternative branch found." : "An ELSE/OTHERWISE branch is required."),
    criterion("P6", 1, "Displays REVIEW on the false branch", hasReview ? 1 : 0,
      hasReview ? "REVIEW output found." : "The false branch must display REVIEW."),
  ];
}

function gradeIPO(part, response) {
  const r = asResponse(response);
  const input = String(r.ipo?.input || "");
  const process = String(r.ipo?.process || "");
  const output = String(r.ipo?.output || "");
  const variables = part.responseSpec?.variables || [];
  const inputOk = variables.length > 0 && variables.every(v => normaliseITAnswer(input).includes(normaliseITAnswer(v)));
  const processOk = conceptPresent(process, "processing")
    || (/\b(calculate|compute|score)\b/i.test(process) && /\b(compare|threshold|>=|≥)\b/i.test(process));
  const outputOk = conceptPresent(output, "accept") && conceptPresent(output, "review");
  return [
    criterion("I1", 1, "Input contains all required values", inputOk ? 1 : 0, inputOk ? "All inputs are present." : "All named input values are required."),
    criterion("I2", 1, "Process calculates the score and compares it with the threshold", processOk ? 1 : 0, processOk ? "Process is suitable." : "The process must calculate SCORE and compare it with the threshold."),
    criterion("I3", 1, "Output gives ACCEPT or REVIEW", outputOk ? 1 : 0, outputOk ? "Both possible outputs are present." : "The outputs should include ACCEPT and REVIEW."),
  ];
}

function genericMarkScheme(part, response) {
  const answer = informationTechnologyResponseText(response);
  const points = (part.markScheme || []).filter(Boolean);
  if (!points.length) return [criterion("G1", part.marks, "Required response", 0, "No canonical mark point was available.")];
  const share = distribute(part.marks, points.length);
  return points.map((raw, index) => {
    const key = String(raw)
      .replace(/\b(?:award\s+)?(?:up to\s+)?\d+\s+marks?\b.*$/i, "")
      .replace(/\b\d+\s+marks?\b\.?/gi, "")
      .replace(/\bor equivalent\b/gi, "")
      .trim();
    const checked = checkProse(answer, { key, quorum: 0.5 });
    return criterion(`G${index + 1}`, share[index], key || "Mark-scheme point", checked.ok ? share[index] : 0, checked.ok ? "Mark-scheme idea found." : checked.why);
  });
}

export function informationTechnologyPaper2RuleFor(question, part) {
  const prompt = normaliseITAnswer(part?.prompt);
  if (/state two characteristics of a (supercomputer|mainframe|embedded computer)/.test(prompt)) return "machine-characteristics";
  if (prompt.includes("hardware device used to connect the local networks to other networks")) return "router";
  if (prompt.includes("distinguish between an intranet and an extranet")) return "intranet-extranet";
  if (prompt.includes("state three transmission media")) return "media";
  if (prompt.includes("factors, other than cost") && prompt.includes("cloud")) return "cloud-factors";
  if (prompt.includes("verification and validation are both useful")) return "validation-verification";
  if (prompt.includes("email asking staff") && prompt.includes("password")) return "phishing";
  if (prompt.includes("difference between data and information")) return "data-information";
  if (prompt.includes("judge the reliability of information")) return "reliability";
  if (prompt.includes("system software") && prompt.includes("application software")) return "software-examples";
  if (prompt.includes("distinguish between ram and secondary storage")) return "ram-storage";
  if (prompt.includes("four basic stages") && prompt.includes("information-processing")) return "ipos-stages";
  if (prompt.includes("spreadsheet formula") && prompt.includes("d2")) return "formula-d2-total";
  if (prompt.includes("function") && prompt.includes("d4") && prompt.includes("d2:d3")) return "sum-d4";
  if (prompt.includes("characteristics of a good algorithm")) return "algorithm-characteristics";
  if (prompt.includes("trace table or dry run")) return "trace-table";
  if (prompt.includes("syntax error") && prompt.includes("logic error")) return "syntax-logic";
  if (prompt.includes("features of good internal program documentation")) return "documentation";
  if (prompt.startsWith("write query criteria")) return "query";
  if (prompt.includes("database object") && prompt.includes("user-friendly record entry")) return "database-form";
  if (prompt.includes("features that could be used in a report")) return "report-features";
  if (prompt.includes("data types for a date field and an amount field")) return "database-types";
  if (prompt.includes("why a primary key is important")) return "primary-importance";
  if (prompt.includes("formula in d2 to calculate revenue")) return "formula-revenue";
  if (prompt.includes("formula in e2 to calculate tax")) return "formula-tax";
  if (prompt.includes("function in d4 to calculate total revenue")) return "sum-revenue";
  if (prompt.includes("relative reference and an absolute reference")) return "references";
  if (prompt.includes("display only records") && prompt.includes("arrange them into order")) return "filter-sort";
  if (prompt.includes("summarising a large dataset")) return "pivot";
  if (prompt.includes("chart type") && prompt.includes("monthly revenue")) return "line-chart";
  if (prompt.includes("linking a summary worksheet")) return "linked-worksheets";
  if (prompt.includes("decisions that should be made before the website")) return "website-planning";
  if (prompt.includes("types of hyperlink")) return "hyperlinks";
  if (prompt.includes("registration link does not work")) return "website-test";
  if (prompt.includes("personalised letters")) return "mail-merge";
  if (prompt.includes("content controls")) return "content-controls";
  if (prompt.includes("review features")) return "review-features";
  if (prompt.includes("headings") && prompt.includes("automatic table of contents")) return "toc";
  if (prompt.includes("protecting an important document")) return "document-protection";
  if (prompt.includes("primary key of")) return "database-primary-field";
  if (prompt.includes("should act as the foreign key")) return "database-foreign-field";
  if (prompt.includes("relationship between")) return "database-relationship";
  if (prompt.startsWith("construct an ipo chart")) return "ipo";
  if (prompt.includes("language-neutral pseudocode")) return "pseudocode";
  return "fallback";
}

export function gradeInformationTechnologyPart(question, part, response) {
  const answer = informationTechnologyResponseText(response);
  const rule = informationTechnologyPaper2RuleFor(question, part);
  let criteria = [];

  switch (rule) {
    case "machine-characteristics":
      criteria = scoreMachineCharacteristics(part.prompt, answer, part.marks);
      break;
    case "router":
      criteria = [
        criterion("A1", 1, "Identifies a router", conceptPresent(answer, "router") ? 1 : 0, conceptPresent(answer, "router") ? "Router identified." : "Router was not identified."),
        criterion("A2", 1, "States that it connects/forwards between networks", conceptPresent(answer, "connect_networks") ? 1 : 0, conceptPresent(answer, "connect_networks") ? "Router function established." : "The function of connecting different networks is required."),
      ];
      break;
    case "intranet-extranet": {
      const a = conceptPresent(answer, "intranet") && conceptPresent(answer, "intranet_private");
      const b = conceptPresent(answer, "extranet") && conceptPresent(answer, "extranet_external");
      criteria = [
        criterion("A1",1,"Describes an intranet as private/internal",a?1:0,a?"Intranet described correctly.":"The intranet definition is incomplete."),
        criterion("A2",1,"Describes an extranet as controlled external access",b?1:0,b?"Extranet described correctly.":"The extranet definition is incomplete."),
        criterion("A3",1,"Makes the distinction clear",a&&b?1:0,a&&b?"Clear distinction made.":"Both sides of the distinction are required."),
      ];
      break;
    }
    case "media":
      criteria = conceptCriteria(answer, ["twisted_pair","coaxial","fibre","infrared","microwave","satellite"], 3, 3, "Distinct transmission medium");
      break;
    case "cloud-factors":
      criteria = conceptCriteria(answer, ["accessibility","security","capacity","internet_availability","policy"], 2, 2, "Cloud-storage consideration");
      break;
    case "validation-verification": {
      const v = conceptPresent(answer,"validation") && conceptPresent(answer,"validation_rule");
      const r = conceptPresent(answer,"verification") && conceptPresent(answer,"verification_accuracy");
      criteria = [
        criterion("A1",1,"Explains validation",v?1:0,v?"Validation explained.":"Validation should be linked to checking rules."),
        criterion("A2",1,"Explains verification",r?1:0,r?"Verification explained.":"Verification should be linked to entry accuracy."),
        criterion("A3",1,"Shows that they address different errors",v&&r?1:0,v&&r?"Different roles established.":"Both different roles must be established."),
      ];
      break;
    }
    case "phishing": {
      const phishing = conceptPresent(answer,"phishing");
      const hits = conceptsPresent(answer,["verify_sender","avoid_link","type_official_url","dont_share_credentials","report_message"]);
      criteria = [criterion("A1",1,"Identifies phishing/social engineering",phishing?1:0,phishing?"Threat identified.":"The likely threat is phishing.")];
      [0,1].forEach(i => criteria.push(criterion(`A${i+2}`,2,`Precaution ${i+1}`,hits[i]?2:0,hits[i]?`Accepted precaution: ${hits[i]}.`:"A distinct suitable precaution is required.")));
      break;
    }
    case "data-information": {
      const d=conceptPresent(answer,"data_raw"), info=conceptPresent(answer,"information_processed");
      const example=/spreadsheet|cell|formula|total|average|quantity|price|cost/i.test(answer);
      criteria=[
        criterion("A1",1,"Defines data as raw facts/values",d?1:0,d?"Data defined.":"Data should be identified as raw/unprocessed facts."),
        criterion("A2",1,"Defines information as processed meaningful data",info?1:0,info?"Information defined.":"Information should be identified as processed/meaningful data."),
        criterion("A3",1,"Uses a relevant spreadsheet example",example?1:0,example?"Relevant example used.":"A relevant example from the worksheet is needed."),
      ];
      break;
    }
    case "reliability":
      criteria=conceptCriteria(answer,["authenticity","currency","relevance","bias"],2,2,"Reliability criterion");
      break;
    case "software-examples": {
      const systems=conceptsPresent(answer,["operating_system","utility"]);
      const app=conceptPresent(answer,"application");
      criteria=[
        criterion("A1",1,"First system-software example",systems.length>=1?1:0,systems.length>=1?"Valid system-software example found.":"A system-software example is required."),
        criterion("A2",1,"Second system-software example",systems.length>=2?1:0,systems.length>=2?"Second distinct system-software example found.":"A second system-software example is required."),
        criterion("A3",1,"Application-software example",app?1:0,app?"Application-software example found.":"An application-software example is required."),
      ];
      break;
    }
    case "ram-storage": {
      const ram=conceptPresent(answer,"ram_temporary"), sec=conceptPresent(answer,"secondary_longterm");
      criteria=[
        criterion("A1",1,"RAM is temporary/volatile working memory",ram?1:0,ram?"RAM described correctly.":"RAM should be described as temporary/volatile working memory."),
        criterion("A2",1,"Secondary storage is longer-term/non-volatile",sec?1:0,sec?"Secondary storage described correctly.":"Secondary storage should be described as longer-term/non-volatile."),
        criterion("A3",1,"Makes a clear comparison",ram&&sec?1:0,ram&&sec?"Clear distinction made.":"Both sides of the comparison are required."),
      ];
      break;
    }
    case "ipos-stages":
      criteria=conceptCriteria(answer,["input","processing","output","storage"],4,4,"IPOS stage");
      break;
    case "formula-d2-total":
    case "formula-revenue": {
      const ok=formulaMatches(answer,["=B2*C2","=C2*B2"]);
      criteria=[criterion("A1",part.marks,"Uses the correct cell references and multiplication",ok?part.marks:0,ok?"Equivalent formula accepted.":"Expected a formula equivalent to =B2*C2.")];
      break;
    }
    case "sum-d4":
    case "sum-revenue": {
      const ok=formulaMatches(answer,["=SUM(D2:D3)"]);
      criteria=[criterion("A1",part.marks,"Uses SUM on D2:D3",ok?part.marks:0,ok?"Equivalent SUM function accepted.":"Expected =SUM(D2:D3).")];
      break;
    }
    case "algorithm-characteristics": {
      const hits=conceptsPresent(answer,["finite","precise","unambiguous","clear_flow","terminates"]);
      const explained = /\b(because|means|so that|therefore|must|ensures?|allows?)\b/i.test(answer) || answer.split(/[.;\n]/).some(x=>x.trim().split(/\s+/).length>=6);
      criteria=[
        criterion("A1",1,"First characteristic",hits.length>=1?1:0,hits.length>=1?`Accepted: ${hits[0]}.`:"A valid characteristic is required."),
        criterion("A2",1,"Second characteristic",hits.length>=2?1:0,hits.length>=2?`Accepted: ${hits[1]}.`:"A second distinct characteristic is required."),
        criterion("A3",2,"Explains one characteristic",hits.length>=1&&explained?2:0,hits.length>=1&&explained?"One characteristic is explained.":"One stated characteristic must also be explained."),
      ];
      break;
    }
    case "trace-table":
      criteria=[
        criterion("A1",1,"Describes a dry run/step-through",conceptPresent(answer,"trace_step")?1:0,conceptPresent(answer,"trace_step")?"Dry-run process established.":"Describe stepping through the algorithm."),
        criterion("A2",1,"Records changing variable values",conceptPresent(answer,"trace_values")?1:0,conceptPresent(answer,"trace_values")?"Variable values mentioned.":"Mention recording/changing variable values."),
        criterion("A3",1,"Follows iterations/passes or control flow",/\b(pass|iteration|step|loop|condition|branch)\b/i.test(answer)?1:0,/\b(pass|iteration|step|loop|condition|branch)\b/i.test(answer)?"Control flow mentioned.":"Show how the trace follows passes/steps."),
        criterion("A4",1,"Uses the trace to verify logic/find errors",conceptPresent(answer,"find_errors")?1:0,conceptPresent(answer,"find_errors")?"Testing purpose established.":"Explain that the trace helps verify logic or find errors."),
      ];
      break;
    case "syntax-logic": {
      const syntax=conceptPresent(answer,"syntax")&&conceptPresent(answer,"syntax_rules");
      const logic=conceptPresent(answer,"logic")&&conceptPresent(answer,"logic_wrong_result");
      criteria=[
        criterion("A1",1,"Explains syntax error",syntax?1:0,syntax?"Syntax error explained.":"Syntax should be linked to breaking language rules."),
        criterion("A2",1,"Explains logic error",logic?1:0,logic?"Logic error explained.":"Logic should be linked to a wrong result while the program can still run."),
        criterion("A3",1,"Makes the distinction clear",syntax&&logic?1:0,syntax&&logic?"Clear distinction made.":"Both error types must be distinguished."),
      ];
      break;
    }
    case "documentation":
      criteria=conceptCriteria(answer,["meaningful_names","comments","indentation","whitespace"],3,3,"Internal-documentation feature");
      break;
    case "query": {
      const ok=queryMatches(answer,"Parish='Kingston' AND Status='Active'");
      criteria=[criterion("A1",3,"Uses both required criteria joined by AND",ok?3:0,ok?"Equivalent query criteria accepted.":"Both Parish='Kingston' and Status='Active' must be joined with AND.")];
      break;
    }
    case "database-form": {
      const f=conceptPresent(answer,"form"), adv=conceptPresent(answer,"form_advantage");
      criteria=[
        criterion("A1",1,"Names a form",f?1:0,f?"Form identified.":"The database object is a form."),
        criterion("A2",2,"States a valid advantage",adv?2:0,adv?"Valid form advantage stated.":"Explain an advantage such as easier/controlled data entry or clearer interface."),
      ];
      break;
    }
    case "report-features":
      criteria=conceptCriteria(answer,["sorting","grouping","count","sum","average","headings","selected_fields"],3,4,"Useful report feature");
      break;
    case "database-types": {
      const r=asResponse(response);
      const date=responseField(r,"Date")||answer, amount=responseField(r,"Amount")||answer;
      const dateOk=conceptPresent(date,"date_time");
      const amountOk=conceptPresent(amount,"currency_type")||conceptPresent(amount,"number_type");
      criteria=[
        criterion("A1",2,"Date uses Date/Time",dateOk?2:0,dateOk?"Suitable Date data type.":"Date should use Date/Time."),
        criterion("A2",2,"Amount uses Currency or numeric type",amountOk?2:0,amountOk?"Suitable Amount data type.":"Amount should use Currency or a suitable numeric type."),
      ];
      break;
    }
    case "primary-importance": {
      const unique=conceptPresent(answer,"primary_unique"), support=conceptPresent(answer,"primary_support");
      criteria=[
        criterion("A1",2,"Uniquely identifies each record",unique?2:0,unique?"Unique identification established.":"A primary key uniquely identifies each record."),
        criterion("A2",2,"Supports integrity/relationships/retrieval",support?2:0,support?"Additional purpose established.":"A further benefit such as preventing duplicates or supporting relationships/retrieval is required."),
      ];
      break;
    }
    case "formula-tax": {
      const ok=formulaMatches(answer,["=D2*$F$2","=$F$2*D2"]);
      criteria=[criterion("A1",3,"Calculates D2 × fixed F2 rate",ok?3:0,ok?"Correct absolute reference accepted.":"Expected a formula equivalent to =D2*$F$2.")];
      break;
    }
    case "references": {
      const rel=conceptPresent(answer,"relative_changes"), abs=conceptPresent(answer,"absolute_fixed");
      const example=/\$[A-Z]+\$\d+|[A-Z]+\d+/i.test(answer);
      criteria=[
        criterion("A1",1,"Relative reference changes when copied",rel?1:0,rel?"Relative reference explained.":"State that a relative reference changes when copied."),
        criterion("A2",1,"Absolute reference remains fixed",abs?1:0,abs?"Absolute reference explained.":"State that an absolute reference remains fixed."),
        criterion("A3",1,"Provides a clear comparison/example",rel&&abs&&(example||/\bwhile\b|\bwhereas\b|\bbut\b/i.test(answer))?1:0,rel&&abs?"Comparison present.":"Add a clear comparison or suitable example."),
      ];
      break;
    }
    case "filter-sort": {
      const fil=conceptPresent(answer,"filter"), s=conceptPresent(answer,"sort");
      criteria=[
        criterion("A1",1,"Uses Filter to show matching records",fil?1:0,fil?"Filter identified.":"Filter is required."),
        criterion("A2",1,"Uses Sort to arrange records",s?1:0,s?"Sort identified.":"Sort is required."),
        criterion("A3",1,"Uses both features for the two different tasks",fil&&s?1:0,fil&&s?"Both functions matched to the task.":"Both Filter and Sort are required."),
      ];
      break;
    }
    case "pivot": {
      const pv=conceptPresent(answer,"pivot"), adv=conceptPresent(answer,"pivot_advantage");
      criteria=[
        criterion("A1",2,"Names a pivot table",pv?2:0,pv?"Pivot table identified.":"Pivot table is required."),
        criterion("A2",2,"States a valid advantage",adv?2:0,adv?"Valid advantage stated.":"Explain how a pivot table quickly summarises/reorganises a large dataset."),
      ];
      break;
    }
    case "line-chart": {
      const line=conceptPresent(answer,"line_chart"), reason=conceptPresent(answer,"trend_time");
      criteria=[
        criterion("A1",2,"Selects a line graph/chart",line?2:0,line?"Line graph selected.":"A line graph is most suitable."),
        criterion("A2",2,"Explains that it shows change/trend over time",reason?2:0,reason?"Reason established.":"The reason should refer to showing change/trend over time."),
      ];
      break;
    }
    case "linked-worksheets": {
      const update=conceptPresent(answer,"linked_update"), reentry=conceptPresent(answer,"reduce_reentry");
      const full=update||reentry;
      criteria=[criterion("A1",4,"Explains a valid benefit of linking worksheets",full?4:0,full?"Valid linked-worksheet benefit explained.":"Explain that linked values update with source data or that linking reduces re-entry/duplication and errors.")];
      break;
    }
    case "website-planning":
      criteria=conceptCriteria(answer,["purpose","audience","pages","content","layout"],2,2,"Website-planning decision");
      break;
    case "hyperlinks":
      criteria=conceptCriteria(answer,["link_page","link_same_page","link_email","link_file"],2,2,"Useful hyperlink type");
      break;
    case "website-test": {
      const fix=conceptPresent(answer,"fix_link"), retest=conceptPresent(answer,"retest");
      criteria=[
        criterion("A1",2,"Corrects/tests the broken Registration link",fix?2:0,fix?"Broken link action established.":"Correct and test the broken Registration link."),
        criterion("A2",1,"Performs another pre-publication check",retest?1:0,retest?"Additional check stated.":"Retest navigation/display/content or use a test audience."),
      ];
      break;
    }
    case "mail-merge": {
      const mm=conceptPresent(answer,"mail_merge");
      const components=conceptPresent(answer,"primary_document")&&conceptPresent(answer,"data_source");
      criteria=[
        criterion("A1",2,"Names mail merge",mm?2:0,mm?"Mail merge identified.":"The feature is mail merge."),
        criterion("A2",1,"Recognises main document and data source",components?1:0,components?"Mail-merge components recognised.":"Reference to the main/primary document and data source is required."),
      ];
      break;
    }
    case "content-controls":
      criteria=conceptCriteria(answer,["text_box","check_box","date_picker","drop_down","command_button"],2,3,"Fillable-form content control");
      break;
    case "review-features":
      criteria=conceptCriteria(answer,["spell_grammar","comments","track_changes","thesaurus","word_count"],3,4,"Document review feature");
      break;
    case "toc": {
      const heading=conceptPresent(answer,"heading_styles"), toc=conceptPresent(answer,"generate_toc");
      criteria=[
        criterion("A1",2,"Applies heading styles/levels",heading?2:0,heading?"Heading structure established.":"Apply heading styles/levels."),
        criterion("A2",2,"Generates/updates TOC from headings",toc?2:0,toc?"Automatic TOC process established.":"Generate/update the automatic table of contents from the headings."),
      ];
      break;
    }
    case "document-protection":
      criteria=conceptCriteria(answer,["autosave","backup","password_restriction"],2,4,"Document-protection method");
      break;
    case "database-primary-field": {
      const expected=databaseKeyFromVisual(question,"primary");
      criteria=exactTerm(answer,expected,part.marks,`Primary key: ${expected}`);
      break;
    }
    case "database-foreign-field": {
      const expected=databaseKeyFromVisual(question,"foreign");
      criteria=exactTerm(answer,expected,part.marks,`Foreign key: ${expected}`);
      break;
    }
    case "database-relationship": {
      const rel=conceptPresent(answer,"one_to_many"), explain=conceptPresent(answer,"one_parent_many_children");
      criteria=[
        criterion("A1",2,"Identifies one-to-many relationship",rel?2:0,rel?"Relationship identified.":"The relationship is one-to-many."),
        criterion("A2",1,"Explains one parent can link to several child records",explain?1:0,explain?"Relationship interpreted.":"Explain that one parent record can link to several child records."),
      ];
      break;
    }
    case "ipo":
      criteria=gradeIPO(part,response);
      break;
    case "pseudocode":
      criteria=gradePseudocode(part,response);
      break;
    default:
      criteria=genericMarkScheme(part,response);
  }

  const possible=criteria.reduce((sum,item)=>sum+item.marks,0);
  let earned=criteria.reduce((sum,item)=>sum+item.earned,0);
  // Canonical rules are authored to the part total. Guard against future bank edits.
  if (possible !== Number(part.marks || 0) && possible > 0) {
    earned = Math.round((earned / possible) * Number(part.marks || 0));
  }
  earned=Math.max(0,Math.min(Number(part.marks||0),earned));
  return { rule, earned, possible:Number(part.marks||0), criteria, answer };
}

export function markInformationTechnologyPaper2(paper,responses={}) {
  const parts={};
  const profiles={"Theory":0,"Productivity Tools":0,"Problem-Solving and Programming":0};
  let marks=0;
  for (const question of paper?.questions||[]) {
    for (const part of question.parts||[]) {
      const key=partKey(question.number,part.id);
      const evaluation=gradeInformationTechnologyPart(question,part,responses[key]);
      parts[key]=evaluation;
      marks+=evaluation.earned;
      profiles[part.profile]=(profiles[part.profile]||0)+evaluation.earned;
    }
  }
  return {paperId:paper?.id||null,marks,of:Number(paper?.totalMarks||90),profiles,parts};
}

function modelAnswerForRule(question,part,rule) {
  if (rule==="machine-characteristics") {
    const p=normaliseITAnswer(part.prompt);
    if (p.includes("supercomputer")) return {answer:"high processing capacity; handles very large datasets"};
    if (p.includes("mainframe")) return {answer:"supports many concurrent users; handles a large transaction volume"};
    return {answer:"built into another device for a specific control task; can provide real-time control"};
  }
  const models={
    router:"router; connects different networks and forwards data between them",
    "intranet-extranet":"An intranet is a private internal network for an organisation. An extranet gives controlled access to authorised external users.",
    media:"twisted pair; fibre-optic cable; satellite",
    "cloud-factors":"security; accessibility",
    "validation-verification":"Validation checks whether data follows specified rules. Verification checks whether data was entered accurately. They address different kinds of data-entry error.",
    phishing:"phishing; verify the sender/domain; do not follow suspicious links",
    "data-information":"Data is raw facts or values. Information is processed data with meaning, for example the spreadsheet total calculated from the quantity and price.",
    reliability:"authenticity; currency",
    "software-examples":"operating system; utility software; word processor application software",
    "ram-storage":"RAM is temporary volatile working memory. Secondary storage is long-term non-volatile storage, so the two are used for different purposes.",
    "ipos-stages":"Input; Processing; Output; Storage",
    "formula-d2-total":"=B2*C2",
    "sum-d4":"=SUM(D2:D3)",
    "algorithm-characteristics":"finite, so the algorithm must eventually terminate; unambiguous, so every step is clear",
    "trace-table":"Use a dry run to step through each pass of the algorithm, record the changing variable values and check the logic to identify errors.",
    "syntax-logic":"A syntax error breaks the rules of the programming language. A logic error allows the program to run but produces the wrong result.",
    documentation:"meaningful variable names; useful comments; indentation",
    query:"Parish='Kingston' AND Status='Active'",
    "database-form":"Form. It provides easier and more controlled data entry.",
    "report-features":"sorting; grouping; SUM",
    "database-types":null,
    "primary-importance":"A primary key uniquely identifies each record, helps prevent duplicate/ambiguous records and supports relationships and retrieval.",
    "formula-revenue":"=B2*C2",
    "formula-tax":"=D2*$F$2",
    "sum-revenue":"=SUM(D2:D3)",
    references:"A relative reference changes when copied, while an absolute reference such as $F$2 remains fixed.",
    "filter-sort":"Filter displays only matching records; Sort arranges the records into the required order.",
    pivot:"Pivot table. It creates a quick grouped summary and reorganises a large dataset without rewriting the source data.",
    "line-chart":"Line graph, because it shows change or trend over time.",
    "linked-worksheets":"Linked values update when source data changes, avoiding retyping and reducing duplication/errors.",
    "website-planning":"purpose; intended audience",
    hyperlinks:"link to another page; email address",
    "website-test":"correct and test the broken Registration link; retest navigation with a test audience",
    "mail-merge":"Mail merge uses a main/primary document together with a data source or recipient list.",
    "content-controls":"text box; date picker",
    "review-features":"spelling and grammar check; comments; track changes",
    toc:"Apply heading styles/levels, then generate or update the automatic table of contents from those headings.",
    "document-protection":"automatic save; backup copy",
  };
  if (rule==="database-primary-field") return {answer:databaseKeyFromVisual(question,"primary")};
  if (rule==="database-foreign-field") return {answer:databaseKeyFromVisual(question,"foreign")};
  if (rule==="database-relationship") return {answer:"one-to-many; one parent record can be linked to several child records"};
  if (rule==="ipo") {
    const vars=part.responseSpec?.variables||[];
    return {ipo:{input:vars.join(", "),process:"calculate SCORE and compare with the threshold",output:"ACCEPT or REVIEW"}};
  }
  if (rule==="pseudocode") {
    const spec=part.responseSpec||inferPseudocode(part.prompt);
    const [a,b,c]=spec.variables||[];
    return {pseudocode:`INPUT ${a}, ${b}, ${c}\nSCORE = ${a} + ${b} + ${c}\nIF SCORE >= ${spec.threshold} THEN\n  DISPLAY ACCEPT\nELSE\n  DISPLAY REVIEW\nENDIF`};
  }
  if (rule==="database-types") return {table:{Date:"Date/Time",Amount:"Currency"}};
  return {answer:models[rule]||String(part.markScheme?.join(" ")||"")};
}

export function modelResponsesForInformationTechnologyPaper2(paper) {
  const responses={};
  for (const question of paper?.questions||[]) {
    for (const part of question.parts||[]) {
      const rule=informationTechnologyPaper2RuleFor(question,part);
      responses[partKey(question.number,part.id)]=modelAnswerForRule(question,part,rule);
    }
  }
  return responses;
}
