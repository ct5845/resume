import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matAccountBox } from "@ng-icons/material-icons/baseline";
import { ProfilesComponent } from "./profiles.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NgIcon, ProfilesComponent],
  template: `
    <label tabIndex="0" for="profile-menu" class="btn btn-primary shadow">
      <ng-icon name="matAccountBox" class="text-lg" />
      <span>Contact</span>
    </label>
    <ul
      tabIndex="0"
      id="profile-menu"
      class="menu dropdown-content rounded-box menu-lg z-10 mt-2 bg-base-200 p-2 shadow-md">
      <app-profiles />
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ matAccountBox })
  ]
})
export class ContactComponent {
  @HostBinding('class') classes = "dropdown dropdown-end ml-2";
}
