import { Component, inject, Input, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss',
})
export class NavItem {
  @Input() link!: string;
  @Input() title!: string;

  public readonly router: Router = inject(Router);
}
