import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useGetTags } from "./useGetTags";

export type TagType = { name: string };
export const useGetSelectedTags = () => {
  const tagsFromParams = useSearchParams().get("tags")?.split(",") || [];
  const { data } = useGetTags();
  const selectedTags = useMemo(
    () => data?.tags.filter((tag) => tagsFromParams.includes(tag?.name.toLowerCase())) || [],
    [data, tagsFromParams],
  );

  const addTagToParams = useCallback(
    (tag: TagType) => [...tagsFromParams, tag.name.toLowerCase()].join(","),
    [tagsFromParams],
  );
  const removeTagFromParams = useCallback(
    (tag: TagType) => [...tagsFromParams.filter((v) => v !== tag.name.toLowerCase())].join(","),
    [tagsFromParams],
  );

  return { selectedTags, tags: data, tagsFromParams, addTagToParams, removeTagFromParams };
};
