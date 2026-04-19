import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { Component } from '@angular/core';
import { Item } from '@shared/models/item';
import { Native } from '@shared/components/examples/listbox-native/listbox-native';
import { ListboxAria } from '@shared/components/examples/listbox-aria/listbox-aria';

@Component({
  selector: 'app-listbox',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent, Native, ListboxAria],
  templateUrl: './listbox.html',
  styleUrl: './listbox.scss',
})
export class Listbox {
  items: Item[] = [
    {
      id: 'blanc',
      label: 'Blanc',
    },
    {
      id: 'bleu',
      label: 'Bleu',
    },
    {
      id: 'jaune',
      label: 'Jaune',
    },
    {
      id: 'noir',
      label: 'Noir',
    },
    {
      id: 'orange',
      label: 'Orange',
    },
    {
      id: 'rose',
      label: 'Rose',
    },
    {
      id: 'rouge',
      label: 'Rouge',
    },
    {
      id: 'vert',
      label: 'Vert',
    },
    {
      id: 'violet',
      label: 'Violet',
    },
  ];
}
