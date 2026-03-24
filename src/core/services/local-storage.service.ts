import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public set(key: string, value: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public get(key: string): any {
    if (typeof localStorage !== 'undefined') {
      // Code that uses localStorage

      const item = localStorage.getItem(key);
      if (item == null) return null;
      return JSON.parse(item);
    }

    return null;
  }
}
