import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { LayoutComponent } from "./components/layout.component";
import { HeaderComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map, Observable } from "rxjs";
import { HOME_ROUTE, MEDIA_QUERIES, Route, ROUTES } from "./core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent, HeaderComponent, NavigationComponent],
  template: `
    <app-layout>
      <app-header header></app-header>
      <router-outlet main></router-outlet>
      <app-navigation [routes]="(routes$ | async) ?? []" nav></app-navigation>
    </app-layout>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  routes$: Observable<Route[]>;
  splash$: Observable<boolean>;
  showHeader$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver,
              route: ActivatedRoute) {
    this.routes$ = breakpointObserver.observe(MEDIA_QUERIES["md-"])
      .pipe(map(state =>
        ROUTES.filter(route => route.path !== HOME_ROUTE.path || state.matches)));

    this.showHeader$ = breakpointObserver.observe(MEDIA_QUERIES["lg+"]).pipe(map(state => state.matches));

    this.splash$ = route.fragment.pipe(map(fragment => fragment === HOME_ROUTE.path));
  }
}
