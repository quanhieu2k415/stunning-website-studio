export function sortBySortOrder<T extends { sort_order?: number | null }>(
  items: readonly T[] | null | undefined
): T[] {
  return [...(items ?? [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );
}
