import { useCombobox, useMultipleSelection, useSelect } from "downshift";
import React, { useMemo } from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./MultiSelectTech.module.scss";
import clsx from "clsx";
import { useGetTags } from "./hooks/useGetTags";
import CancelIcon from "public/icons/cancel.svg";
import Link from "next/link";
import { useGetSelectedTags } from "./hooks/useGetSelectedTags";

function getFilteredTags(
  selectedItems: { id: string; name: string }[],
  inputValue: string | undefined,
  tags: { name: string; id: string }[] | undefined,
) {
  if (!tags) return [];
  return tags
    .filter((tag) => !selectedItems.map((v) => v.id).includes(tag.id))
    .filter((tag) => {
      return tag.name.includes(inputValue ? inputValue?.toLowerCase() : "");
    });
}

export function MultiSelectTech(props: { name: string; id: string }) {
  const { selectedTags, tagsFromParams, addTagToParams, removeTagFromParams } = useGetSelectedTags();
  const { data } = useGetTags();
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const items = React.useMemo(
    () => getFilteredTags(selectedTags, inputValue, data?.tags),
    [selectedTags, inputValue, data],
  );
  const { getSelectedItemProps, getDropdownProps } = useMultipleSelection({
    selectedItems: selectedTags,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      if (!newSelectedItems) return;
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          break;
        default:
          break;
      }
    },
  });
  const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
    defaultHighlightedIndex: 1, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            setInputValue("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });
  console.log(tagsFromParams, selectedTags);
  return (
    <div className={styles.multiSelectParent}>
      <p {...getLabelProps()}>Search By Tags:</p>

      <div className={styles.multiSelectInputWrapper}>
        <div className={styles.selectedList}>
          {selectedTags.map((selectedItemForRender, index) => {
            return (
              <div
                className={styles.wrapperBadge}
                key={selectedItemForRender.id}
                {...getSelectedItemProps({
                  selectedItem: selectedItemForRender,
                  index,
                })}
              >
                <Badge
                  name={selectedItemForRender.name.toLowerCase().split(" ").join("_")}
                  key={selectedItemForRender.id}
                >
                  <div className={styles.selectedItem}>
                    {selectedItemForRender.name}
                    <Link
                      href={{
                        query: {
                          tags: removeTagFromParams(selectedItemForRender),
                        },
                      }}
                    >
                      <CancelIcon className={styles.cancelIcon} />
                    </Link>
                  </div>
                </Badge>
              </div>
            );
          })}
          <input
            className={styles.multiSelectInput}
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            {...props}
          />
        </div>
      </div>

      <ul className={clsx(styles.searchList)} {...getMenuProps()}>
        {isOpen &&
          items.map((tag, index) => (
            <li className={styles.searchItem} key={tag.id}>
              <Link
                href={{ query: { tags: addTagToParams(tag) } }}
                {...getItemProps({ item: tag, index })}
                className={styles.searchItemButton}
              >
                {tag.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
