import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Item } from '@shared/models/item';

@Component({
  selector: 'listbox-native',
  imports: [],
  templateUrl: './listbox-native.html',
  styleUrl: './listbox-native.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Native {
  readonly items = input.required<Item[]>();
  readonly selectedItemId = signal('');
  readonly selectedItem = computed(
    () => this.items().find((item) => item.id === this.selectedItemId()) ?? null,
  );

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;

    this.selectedItemId.set(selectElement?.value ?? '');
  }
}
