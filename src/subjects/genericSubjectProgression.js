export function orderedGenericTopics(structure = {}) {
  const ordered = [];
  const seen = new Set();

  const add = topic => {
    const id = String(topic?.id || "").trim();
    if (!id || seen.has(id)) return;
    seen.add(id);
    ordered.push(topic);
  };

  (structure?.sections || []).forEach(section => {
    (section?.topics || []).forEach(add);
  });
  (structure?.unassignedTopics || []).forEach(add);
  (structure?.topics || []).forEach(add);

  return ordered;
}

function completedIdSet(completedIds) {
  if (completedIds instanceof Set) return completedIds;
  return new Set((completedIds || []).map(value => String(value || "").trim()).filter(Boolean));
}

export function buildSequentialProgression(structure = {}, completedIds = new Set()) {
  const orderedTopics = orderedGenericTopics(structure);
  const completed = completedIdSet(completedIds);

  let firstIncompleteIndex = orderedTopics.findIndex(topic => !completed.has(topic.id));
  if (firstIncompleteIndex < 0) firstIncompleteIndex = orderedTopics.length;

  const unlockedIds = new Set(
    orderedTopics
      .slice(0, Math.min(orderedTopics.length, firstIncompleteIndex + 1))
      .map(topic => topic.id)
  );

  return {
    orderedTopics,
    completedIds:completed,
    firstIncompleteIndex,
    currentTopic:firstIncompleteIndex < orderedTopics.length
      ? orderedTopics[firstIncompleteIndex]
      : orderedTopics[orderedTopics.length - 1] || null,
    unlockedIds,
    isUnlocked(topicOrId) {
      const id = String(topicOrId?.id || topicOrId || "").trim();
      return Boolean(id && unlockedIds.has(id));
    },
  };
}

export function resolveSequentialTopic({
  structure = {},
  completedIds = new Set(),
  requestedTopicId = null,
  requestedSectionId = null,
} = {}) {
  const progression = buildSequentialProgression(structure,completedIds);
  const requested = progression.orderedTopics.find(
    topic => topic.id === String(requestedTopicId || "")
  );

  if (requested && progression.isUnlocked(requested)) return requested;

  if (requestedSectionId) {
    const firstUnlockedInSection = progression.orderedTopics.find(
      topic => topic.sectionId === String(requestedSectionId) && progression.isUnlocked(topic)
    );
    if (firstUnlockedInSection) return firstUnlockedInSection;
  }

  return progression.currentTopic || progression.orderedTopics[0] || null;
}

export function adjacentGenericTopic(structure = {}, topicId, offset) {
  const ordered = orderedGenericTopics(structure);
  const index = ordered.findIndex(topic => topic.id === String(topicId || ""));
  if (index < 0) return null;
  const nextIndex = index + Number(offset || 0);
  return nextIndex >= 0 && nextIndex < ordered.length ? ordered[nextIndex] : null;
}
