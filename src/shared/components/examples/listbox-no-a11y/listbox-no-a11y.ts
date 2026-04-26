import { Component, computed, Input, signal } from '@angular/core';
import { Item } from '@shared/models/item';

@Component({
  selector: 'listbox-no-a11y',
  imports: [],
  templateUrl: './listbox-no-a11y.html',
  styleUrl: './listbox-no-a11y.scss',
})
export class ListboxNoA11y {
  @Input() items!: Item[];
  public isComboboxOpen = false;

  readonly selectedItemId = signal('');

  readonly selectedItem = computed(
    () => this.items.find((item) => item.id === this.selectedItemId()) ?? null,
  );

  onOptionClick(id: string) {
    this.isComboboxOpen = false;
    this.selectedItemId.set(id);
  }
}
