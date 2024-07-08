import { useCombobox, useMultipleSelection } from "downshift";
import React, { useMemo } from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./MultiSelectTags.module.scss";
import CancelIcon from "public/icons/cancel.svg";
import { getFilteredTags } from "../../utils/utils";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  Path,
  UseFormStateReturn,
  type Control,
  type FieldValues,
} from "react-hook-form";
export function MultiSelect<T extends FieldValues>(props: {
  items: { name: string; id: string }[] | undefined;
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
  error: string | undefined;
}) {
  const { error } = props;
  const { onChange, value } = props.field;
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const items = React.useMemo(() => getFilteredTags(value, inputValue, props.items), [inputValue, props.items, value]);
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, getItemProps } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    stateReducer(_state, actionAndChanges) {
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
          if (newSelectedItem && value) {
            onChange([...value, newSelectedItem]);
            setInputValue("");
          }
          if (newSelectedItem && !value) {
            onChange([newSelectedItem]);
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

  const handleUnselect = (option: { name: string; id: string }) => {
    onChange(value.filter((s: { name: string; id: string }) => s.id !== option.id));
  };

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem, selectedItems } = useMultipleSelection<{
    name: string;
    id: string;
  }>({
    selectedItems: value,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          onChange(newSelectedItems);
          break;
        default:
          break;
      }
    },
  });

  return (
    <div className={styles.multiSelectSearch}>
      <p className={styles.label} {...getLabelProps()}>
        Tags:
      </p>
      <div className={styles.searchInputWrapper}>
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
                    <button onClick={() => handleUnselect(selectedItemForRender)} type="button">
                      <CancelIcon className={styles.cancelIcon} />
                    </button>
                  </div>
                </Badge>
              </div>
            );
          })}
          <input className={styles.searchInput} {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))} />
        </div>
      </div>
      <ul className={styles.searchList} {...getMenuProps()}>
        {isOpen &&
          items?.map((tag, index) => (
            <li className={styles.searchItem} key={tag.id}>
              <button className={styles.searchItemButton} {...getItemProps({ item: tag, index })} type="button">
                {tag.name}
              </button>
            </li>
          ))}
      </ul>
      <p className={styles.errorInfo}>{error || ""}</p>
    </div>
  );
}

export const MultiSelectField = <T extends FieldValues>({
  name,
  control,
  items,
  error,
}: {
  control: Control<T>;
  name: Path<T>;
  items: { name: string; id: string }[] | undefined;
  error: string | undefined;
}) => (
  <Controller
    control={control}
    render={(controllerProps) => <MultiSelect error={error} {...controllerProps} items={items} />}
    name={name}
  />
);
