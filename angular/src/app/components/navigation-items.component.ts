import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { assetIconLoader, LOGO, Route } from "../core";
import { NgIcon, provideNgIconLoader } from "@ng-icons/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ProfilesComponent } from "./profiles.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-navigation-items',
  standalone: true,
  imports: [CommonModule, NgIcon, ProfilesComponent],
  template: `
    <ul class="menu menu-lg">
      <li *ngFor="let route of routes; let index = index">
        <a [attr.href]="route.path"  [attr.class]="route.path === (activePath$ | async) ? 'ring-2 ring-primary' : ''">
        <div *ngIf="route.iconClass" class="mx-1 h-4 w-4 {{route.iconClass}} {{route.path === (activePath$ | async)  ? 'bg-primary' : 'bg-neutral'}}"></div>
        <ng-icon *ngIf="route.icon" class="text-lg" [name]="route.icon" />
        <span [class.text-primary]="route.path === (activePath$ | async)">{{route.name}}</span>
        </a>
        <div *ngIf="index === routes.length - 1" class="divider"></div>
      </li>
      <app-profiles />
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [assetIconLoader]
})
export class NavigationItemsComponent {
  @Input({required: true}) routes!: Route[];

  activePath$: Observable<string | null>;

  constructor(route: ActivatedRoute) {
    this.activePath$ = route.fragment;
  }
}
