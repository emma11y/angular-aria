import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from '@shared/components/header/header';
import { Footer } from '@shared/components/footer/footer';
import { filter, map, mergeMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TitlePageDirective } from '@directives/title-page.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, TitlePageDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = inject(Title);

  protected readonly router: Router = inject(Router);
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
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

        this.title.setTitle(`${data.title} - Comment utiliser Angular ARIA ?`);
      });
  }
}
