import { Component, computed, Input, signal, viewChild } from '@angular/core';
import { Item } from '@shared/models/item';

enum SelectActionsEnum {
  CloseSelect = 1,
  First = 2,
  Last = 3,
  Next = 4,
  Open = 5,
  Close = 6,
  PageDown = 7,
  PageUp = 8,
  Previous = 9,
  Select = 10,
  Type = 11,
}

// based on https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

@Component({
  selector: 'listbox-custom',
  imports: [],
  templateUrl: './listbox-custom.html',
  styleUrl: './listbox-custom.scss',
})
export class ListboxCustom {
  @Input() items!: Item[];
  public isComboboxOpen = false;

  listbox = viewChild<HTMLDivElement>('listboxEl');

  readonly activeIndex = signal(0);
  readonly selectedItemId = signal('');

  readonly selectedItem = computed(
    () => this.items.find((item) => item.id === this.selectedItemId()) ?? null,
  );

  onOptionClick(index: number) {
    this.updateOption(index);
  }

  // if we click somewhere else than the listbox1, we close the listbox
  public onComboboxBlur(event: any): void {
    if (event.relatedTarget === null || event.relatedTarget.id !== 'listbox-custom') {
      this.isComboboxOpen = false;
    }
  }

  public onComboboxKeyDown(event: KeyboardEvent): void {
    const action: SelectActionsEnum | undefined = this.getActionFromKey(event);

    if (!action) {
      return;
    }

    event.preventDefault();

    switch (action) {
      case SelectActionsEnum.Open:
      case SelectActionsEnum.Close:
        this.isComboboxOpen = !this.isComboboxOpen;
        return;
      case SelectActionsEnum.CloseSelect:
        this.updateOption(this.activeIndex(), true);
        return;
      case SelectActionsEnum.First:
      case SelectActionsEnum.Last:
      case SelectActionsEnum.Next:
      case SelectActionsEnum.Previous:
      case SelectActionsEnum.PageUp:
      case SelectActionsEnum.PageDown:
        this.setCurrentOption(this.getUpdatedIndex(action));
        break;
    }
  }

  private getActionFromKey(event: any): SelectActionsEnum | undefined {
    const { key, altKey } = event;

    const openKeys: string[] = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!this.isComboboxOpen && openKeys.includes(key)) {
      return SelectActionsEnum.Open;
    }

    switch (key) {
      case 'Home':
        return SelectActionsEnum.First;
      case 'End':
        return SelectActionsEnum.Last;
      case 'ArrowUp':
        if (altKey) {
          return SelectActionsEnum.Select;
        } else {
          return SelectActionsEnum.Previous;
        }
      case 'ArrowDown':
        if (!altKey) {
          return SelectActionsEnum.Next;
        }
        break;
      case 'PageUp':
        return SelectActionsEnum.PageUp;
      case 'PageDown':
        return SelectActionsEnum.PageDown;
      case 'Escape':
        return SelectActionsEnum.Close;
      case 'Enter':
      case ' ':
        return SelectActionsEnum.CloseSelect;
    }

    return undefined;
  }

  private getUpdatedIndex(action: SelectActionsEnum): number {
    const pageSize = 10; // used for pageup/pagedown

    const maxIndex = this.items.length - 1;
    const currentIndex = this.items.findIndex((x) => x.active === true);

    switch (action) {
      case SelectActionsEnum.First:
        return 0;
      case SelectActionsEnum.Last:
        return maxIndex;
      case SelectActionsEnum.Previous:
        return Math.max(0, currentIndex - 1);
      case SelectActionsEnum.Next:
        return Math.min(maxIndex, currentIndex + 1);
      case SelectActionsEnum.PageUp:
        return Math.max(0, currentIndex - pageSize);
      case SelectActionsEnum.PageDown:
        return Math.min(maxIndex, currentIndex + pageSize);
      default:
        return currentIndex;
    }
  }

  private updateOption(index: number, close = true): void {
    if (close) {
      this.isComboboxOpen = false;
    }

    const currentOption = this.items[index];

    this.setSelectedOption(currentOption.id);
  }

  private setCurrentOption(index: number) {
    this.items[this.activeIndex()].active = false;

    const currentOption = this.items[index];
    currentOption.active = true;
    this.activeIndex.set(index);

    // scroll to active option
    this.scrollToActiveOption(index);
  }

  private setSelectedOption(id: string): void {
    this.selectedItemId.set(id);
  }

  private scrollToActiveOption(index: number): void {
    // ensure the new option is in view
    const listboxElement = (this.listbox() as any).nativeElement;
    const activeElement = document.querySelector(`#listbox-custom-${this.activeIndex()}`);
    if (this.isScrollable(listboxElement)) {
      this.maintainScrollVisibility(activeElement, listboxElement);
    }

    // ensure the new option is visible on screen
    // ensure the new option is in view
    if (index === this.items.length - 1) {
      activeElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  // check if an element is currently scrollable
  private isScrollable(element: any): boolean {
    return element && element.clientHeight < element.scrollHeight;
  }

  // ensure a given child element is within the parent's visible scroll area
  // if the child is not visible, scroll the parent
  private maintainScrollVisibility(activeElement: any, scrollParent: any): void {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  }
}
