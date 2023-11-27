import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ThemeService } from "../services/theme.service";
import { combineLatest, map, Observable } from "rxjs";
import { Theme } from "../core";
import { matComputer, matModeNight, matWbSunny } from "@ng-icons/material-icons/baseline";
import { matModeNightOutline, matWbSunnyOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <label tabIndex="0" class="btn btn-secondary btn-outline shadow">
      <div class="swap swap-flip swap-active">
        <ng-icon
          *ngFor="let icon of themeIcons$ | async"
          [name]="icon.name"
          [attr.class]="icon.class" />
      </div>
      <span>Theme</span>
    </label>
    <ul
      tabIndex="0"
      class="menu menu-lg dropdown-content rounded-box bg-base-200 z-10 p-2 mt-2 shadow-md">
      <li *ngFor="let button of themeButtons">
        <button (click)="theme.update(button.value)" [class.active]="button.value === (theme.theme$ | async)" type="button">
          <ng-icon [name]="button.icon" />
          <span>{{ button.name }}</span>
        </button>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons( {
      matWbSunny,
      matWbSunnyOutline,
      matModeNight,
      matModeNightOutline,
      matComputer
    })
  ]
})
export class ThemeComponent {
  @HostBinding('class') classes = 'dropdown dropdown-end';
  themeIcons$: Observable<{ name: string, class: string}[]>;
  themeButtons: { icon: string, name: string, value: Theme | null }[];

  constructor(public theme: ThemeService) {
    this.themeIcons$ = combineLatest([
      theme.isSystem$,
      theme.isDark$
    ]).pipe(map(([isSystem, isDark]) => [
      {
        name: 'matWbSunny',
        class: !isSystem && !isDark ? 'swap-on' : 'swap-off'
      },
      {
        name: 'matWbSunnyOutline',
        class: isSystem && !isDark ? 'swap-on' : 'swap-off'
      },
      {
        name: 'matModeNight',
        class: !isSystem && isDark ? 'swap-on' : 'swap-off'
      },
      {
        name: 'matModeNightOutline',
        class: isSystem && isDark ? 'swap-on' : 'swap-off'
      }
    ]));

    this.themeButtons = [
      {
        icon: 'matWbSunny',
        name: 'Light',
        value: Theme.light,
      },
      {
        icon: 'matModeNight',
        name: 'Dark',
        value: Theme.dark,
      },
      {
        icon: 'matComputer',
        name: 'System',
        value: null,
      }
    ];
  }
}
