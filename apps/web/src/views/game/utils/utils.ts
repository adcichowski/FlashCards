export function getFilteredTags(
  selectedItems: { id: string; name: string }[] | undefined,
  inputValue: string | undefined,
  tags: { name: string; id: string }[] | undefined,
) {
  if (!tags) return [];
  return tags.filter(
    (tag) =>
      !selectedItems?.map((v) => v.id).includes(tag.id) &&
      tag.name.toLowerCase().includes(inputValue ? inputValue.toLowerCase() : ""),
  );
}
