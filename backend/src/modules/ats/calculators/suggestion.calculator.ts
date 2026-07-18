export function mergeSuggestions(
  ...lists: string[][]
): string[] {
  return [...new Set(lists.flat())];
}