//@ts-nocheck
import { useMultipleSelection, useSelect } from "downshift"
import Badge from "src/components/Badge/Badge"

const techs = [
  {id: 'tech-1',  subject:'database' },
  {id: 'tech-2',  title: 'relational sql'},
  {id: 'tech-3',  title: 'nosql'},
  {id: 'tech-4',  title: 'frontend'},
  {id: 'tech-5',  title: 'react'},
  {id: 'tech-6',  title: 'javascript'},
  {id: 'tech-7',  title: 'react native'},
]
function gettechsFilter(selectedItems) {
  return function techsFilter(tech) {
    return selectedItems.indexOf(tech) < 0
  }
}
export function MultipleSelectTech() {

  function MultipleSelect() {
    const {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection({initialSelectedItems: [techs[0], techs[1]]})
    const items = techs.filter(gettechsFilter(selectedItems))
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      selectedItem: null,
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      items,
      stateReducer: (state, actionAndChanges) => {
        const {changes, type} = actionAndChanges
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
              highlightedIndex: 0, // with the first option highlighted.
            }
        }
        return changes
      },
      onStateChange: ({type, selectedItem: newSelectedItem}) => {
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
          case useSelect.stateChangeTypes.ToggleButtonBlur:
            if (newSelectedItem) {
              addSelectedItem(newSelectedItem)
            }
            break
          default:
            break
        }
      },
    })

    return (
      <div >
        <div >
          <label  {...getLabelProps()}>
            Pick some techs:
          </label>
          <div>
            {selectedItems.map(function renderSelectedItem(
              selectedItemForRender,
              index,
            ) {
              return (
                <div

                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({
                    selectedItem: selectedItemForRender,
                    index,
                  })}
                  >
                  <Badge value={selectedItemForRender.title}/>


                </div>
              )
            })}
            <div
              {...getToggleButtonProps(
                getDropdownProps({preventKeyAction: isOpen}),
              )}
            >
              <Badge value='+ add subject' variant="outline"/>
            </div>
          </div>
        </div>
        <ul
          className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                key={`${item.value}${index}`}
                {...getItemProps({item, index})}
              >
                <span>{item.title}</span>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  return <MultipleSelect />
}
