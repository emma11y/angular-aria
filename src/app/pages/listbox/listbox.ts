import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { Component } from '@angular/core';
import { Item } from '@shared/models/item';
import { Native } from '@shared/components/examples/listbox-native/listbox-native';
import { ListboxAria } from '@shared/components/examples/listbox-aria/listbox-aria';
import { ListboxCustom } from '@shared/components/examples/listbox-custom/listbox-custom';
import { ListboxNoA11y } from '@shared/components/examples/listbox-no-a11y/listbox-no-a11y';

@Component({
  selector: 'app-listbox',
  imports: [
    TabList,
    Tab,
    Tabs,
    TabPanel,
    TabContent,
    Native,
    ListboxAria,
    ListboxCustom,
    ListboxNoA11y,
  ],
  templateUrl: './listbox.html',
  styleUrl: './listbox.scss',
})
export class Listbox {
  items: Item[] = [
    {
      id: 'blanc',
      label: 'Blanc',
      active: false,
    },
    {
      id: 'bleu',
      label: 'Bleu',
      active: false,
    },
    {
      id: 'jaune',
      label: 'Jaune',
      active: false,
    },
    {
      id: 'noir',
      label: 'Noir',
      active: false,
    },
    {
      id: 'orange',
      label: 'Orange',
      active: false,
    },
    {
      id: 'rose',
      label: 'Rose',
      active: false,
    },
    {
      id: 'rouge',
      label: 'Rouge',
      active: false,
    },
    {
      id: 'vert',
      label: 'Vert',
      active: false,
    },
    {
      id: 'violet',
      label: 'Violet',
      active: false,
    },
  ];
}
