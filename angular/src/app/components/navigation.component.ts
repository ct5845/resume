import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NavigationItemsComponent } from "./navigation-items.component";
import { Route } from "../core";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NavigationItemsComponent],
  template: `
    <ng-container *ngIf="showHeader">
      <header class="px-2 pb-2">
        <ng-content select="[header]" />
      </header>
      <div class="divider"></div>
    </ng-container>
    <app-navigation-items [routes]="routes" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input({ required: true }) routes!: Route[];
  @Input() showHeader?: boolean;
}
