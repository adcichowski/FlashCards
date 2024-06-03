import { useCombobox, useMultipleSelection, useSelect } from "downshift";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./MultiSelectTech.module.scss";
import { badges } from "src/components/Badge/constants";
import clsx from "clsx";
import { useGetTags } from "./hooks/useGetTags";
import { renderTechsIcon } from "./constants/techs";
import CancelIcon from "public/icons/cancel.svg";
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
  const { data } = useGetTags();
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const [selectedItems, setSelectedItems] = React.useState<{ id: string; name: string }[]>([]);
  const items = React.useMemo(
    () => getFilteredTags(selectedItems, inputValue, data?.tags),
    [selectedItems, inputValue],
  );
  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      if (!newSelectedItems) return;
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems);
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
            setSelectedItems([...selectedItems, newSelectedItem]);
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
    <div className={styles.multiSelectParent}>
      <div className={styles.multiSelectInputWrapper}>
        <div className={styles.selectedList}>
          {selectedItems.map((selectedItemForRender, index) => {
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
                    <button
                      className={styles.cancelIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedItem(selectedItemForRender);
                      }}
                    >
                      <CancelIcon />
                    </button>
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

      <ul className={clsx(styles.searchList, !(isOpen && items.length) && styles.hidden)} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li className={styles.searchItem} key={item.id}>
              <button {...getItemProps({ item, index })} className={styles.searchItemButton}>
                {item.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
