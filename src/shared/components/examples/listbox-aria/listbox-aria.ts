import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Item } from '@shared/models/item';

// based on https://angular.dev/guide/aria/overview

@Component({
  selector: 'listbox-aria',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listbox-aria.html',
  styleUrl: './listbox-aria.scss',
})
export class ListboxAria {
  @Input() items!: Item[];

  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);

  /** The options available in the listbox. */
  options = viewChildren<Option<string>>(Option);

  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];

    const selectedItem = this.items.find((item) => item.id === values[0]) ?? null;

    return selectedItem?.label;
    /* ? `Valeur sélectionnée : ${selectedItem.label}`
      : 'Aucune valeur sélectionnée';*/
  });

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
