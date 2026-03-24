import { Component, DOCUMENT, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '@core/services/local-storage.service';
import { NavItem } from '../nav-item/nav-item';

interface Theme {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [NavItem],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly document: Document = inject(DOCUMENT);

  themes: Theme[] = [
    {
      id: 'light',
      title: 'Clair',
      icon: 'fa-solid fa-sun',
    },
    {
      id: 'dark',
      title: 'Sombre',
      icon: 'fa-solid fa-moon',
    },
  ];

  public themeSelected: string | null = null;

  constructor(@Inject(PLATFORM_ID) private plateformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.plateformId)) {
      let theme = this.localStorageService.get('theme') as string;

      if (!theme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          theme = 'light';
        } else {
          theme = 'light';
        }
      }

      this.setTheme(theme);
    }
  }

  //#region FUNCTION

  public setTheme(theme: string): void {
    this.themeSelected = theme;
    this.document.documentElement.setAttribute('data-selected-theme', theme);
    this.localStorageService.set('theme', this.themeSelected);
  }

  //#endregion

  //#region EVENTS

  public onThemeClick(theme: Theme) {
    this.setTheme(theme.id);
  }

  //#endregion
}
