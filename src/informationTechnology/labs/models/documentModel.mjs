export function countTextMatches(text, query) {
  const needle = query.trim();
  if (!needle) return 0;
  let count = 0;
  let from = 0;
  const source = String(text).toLocaleLowerCase();
  const target = needle.toLocaleLowerCase();
  while (from <= source.length - target.length) {
    const index = source.indexOf(target, from);
    if (index < 0) break;
    count += 1;
    from = index + target.length;
  }
  return count;
}

export function replaceTextMatches(text, query, replacement, replaceAll = true) {
  const needle = query.trim();
  if (!needle) return { text: String(text), replaced: 0 };
  const source = String(text);
  const lowerSource = source.toLocaleLowerCase();
  const lowerNeedle = needle.toLocaleLowerCase();
  let cursor = 0;
  let replaced = 0;
  let result = "";
  while (cursor < source.length) {
    const index = lowerSource.indexOf(lowerNeedle, cursor);
    if (index < 0 || (!replaceAll && replaced > 0)) {
      result += source.slice(cursor);
      break;
    }
    result += source.slice(cursor, index) + replacement;
    cursor = index + needle.length;
    replaced += 1;
  }
  return { text: result || (source.length ? source : ""), replaced };
}