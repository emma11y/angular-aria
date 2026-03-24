import { Directive, DOCUMENT, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Directive({
  selector: '[titlePage]',
  standalone: true,
})
export class TitlePageDirective {
  protected readonly router: Router = inject(Router);
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  private document: Document = inject(DOCUMENT);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((data: any) => {
        if (!data) return;

        // for accessibility - https://access42.net/accessibilite-rechargement-page-single-page-applications
        const titlePageElement: HTMLElement | null = this.document.getElementById('title-page');
        if (titlePageElement) {
          titlePageElement.innerHTML = `${data.title} - Comment utiliser Angular ARIA ?`;
        }
      });
  }
}
