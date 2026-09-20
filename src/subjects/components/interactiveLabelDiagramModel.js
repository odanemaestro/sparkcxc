const clean = value => String(value ?? "").trim();

export function normalizeInteractiveLabelActivity(activity = {}) {
  const labels = (Array.isArray(activity.labels) ? activity.labels : [])
    .map(label => ({
      id:clean(label?.id),
      text:clean(label?.text),
      hint:clean(label?.hint),
      explanation:clean(label?.explanation),
    }))
    .filter(label => label.id && label.text);

  const labelIds = new Set(labels.map(label => label.id));

  const targets = (Array.isArray(activity.targets) ? activity.targets : [])
    .map(target => ({
      id:clean(target?.id),
      labelId:clean(target?.labelId),
      boxX:Number(target?.boxX ?? 0),
      boxY:Number(target?.boxY ?? 0),
      anchorX:Number(target?.anchorX ?? 0),
      anchorY:Number(target?.anchorY ?? 0),
      side:["left","right","top","bottom"].includes(target?.side) ? target.side : "right",
    }))
    .filter(target => target.id && labelIds.has(target.labelId));

  return {
    id:clean(activity.id),
    title:clean(activity.title) || "Label the diagram",
    instructions:clean(activity.instructions) || "Place each label on the correct part of the diagram.",
    template:clean(activity.template),
    labels,
    targets,
  };
}

export function correctDiagramPlacements(activity = {}) {
  const normalized = normalizeInteractiveLabelActivity(activity);
  return Object.fromEntries(
    normalized.targets.map(target => [target.id,target.labelId])
  );
}

export function scoreDiagramPlacements(activity = {}, placements = {}) {
  const normalized = normalizeInteractiveLabelActivity(activity);
  const details = normalized.targets.map(target => ({
    targetId:target.id,
    expected:target.labelId,
    received:clean(placements?.[target.id]),
    correct:clean(placements?.[target.id]) === target.labelId,
  }));
  const correct = details.filter(item => item.correct).length;
  const total = details.length;
  return {
    correct,
    total,
    percent:total ? Math.round((correct / total) * 100) : 0,
    complete:total > 0 && correct === total,
    details,
  };
}

export function nextDiagramHintTarget(activity = {}, placements = {}) {
  const normalized = normalizeInteractiveLabelActivity(activity);
  return normalized.targets.find(
    target => clean(placements?.[target.id]) !== target.labelId
  ) || null;
}