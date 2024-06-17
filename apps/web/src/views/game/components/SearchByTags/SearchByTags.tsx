import { useCombobox, useMultipleSelection, useSelect } from "downshift";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./SearchByTags.module.scss";
import clsx from "clsx";
import { useGetTags } from "./hooks/useGetTags";
import CancelIcon from "public/icons/cancel.svg";
import Link from "next/link";
import { useGetSelectedTags } from "./hooks/useGetSelectedTags";
import { getFilteredTags } from "../../utils/utils";

export function SearchByTags() {
  const { selectedTags, addTagToParams, removeTagFromParams } = useGetSelectedTags();

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
  return (
    <div className={styles.search}>
      <p {...getLabelProps()}>Search By Tags:</p>
      <div className={styles.searchInputWrapper}>
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
          <input className={styles.searchInput} {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))} />
        </div>
      </div>

      {isOpen && (
        <ul className={clsx(styles.searchList)} {...getMenuProps()}>
          {items.map((tag, index) => (
            <li className={styles.searchItem} key={tag.id}>
              <Link
                className={styles.searchItemButton}
                href={{ query: { tags: addTagToParams(tag) } }}
                {...getItemProps({ item: tag, index })}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
