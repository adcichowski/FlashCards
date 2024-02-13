import { useCombobox, useMultipleSelection, useSelect } from "downshift";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./MultiSelectTech.module.scss";
import { badges } from "src/components/Badge/constants";
const books = [
  { id: "tech-1", title: "database" },
  { id: "tech-2", title: "relational sql" },
  { id: "tech-4", title: "frontend" },
  { id: "tech-5", title: "react" },
  { id: "tech-6", title: "javascript" },
  { id: "tech-7", title: "react native" },
];

function getFilteredBooks(selectedItems: { id: string; title: string }[], inputValue: string | undefined) {
  return books.filter((book) => {
    return book.title.includes(inputValue ? inputValue?.toLowerCase() : "");
  });
}

export function MultiSelectTech() {
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const [selectedItems, setSelectedItems] = React.useState<{ id: string; title: string }[]>([]);
  const items = React.useMemo(() => getFilteredBooks(selectedItems, inputValue), [selectedItems, inputValue]);
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
      return item ? item.title : "";
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
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
      <div>
        <label className={styles.multiSelectLabel} {...getLabelProps()}>
          Technologies
        </label>
        <div className={styles.multiSelectInputWrapper}>
          <div className={styles.selectedList}>
            {selectedItems.map((selectedItemForRender, index) => {
              return (
                <div
                  key={selectedItemForRender.id}
                  {...getSelectedItemProps({
                    selectedItem: selectedItemForRender,
                    index,
                  })}
                >
                  <Badge
                    color={
                      badges?.[selectedItemForRender.title.toLowerCase().split(" ").join("_") as keyof typeof badges]
                    }
                    key={`selected-item-${index}`}
                  >
                    <div>
                      {selectedItemForRender.title}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedItem(selectedItemForRender);
                        }}
                      >
                        &#10005;
                      </span>
                    </div>
                  </Badge>
                </div>
              );
            })}
            <input
              className={styles.multiSelectInput}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
        </div>
      </div>
      <ul className={styles.searchList} {...getMenuProps()}>
        {isOpen &&
          items
            .filter((item) => !selectedItems.map((v) => v.id).includes(item.id))
            .map((item, index) => (
              <li key={`${item.title}${index}`} {...getItemProps({ item, index })}>
                {item.title}
              </li>
            ))}
      </ul>
    </div>
  );
}
