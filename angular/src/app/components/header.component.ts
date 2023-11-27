import { ChangeDetectionStrategy, Component, HostBinding, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LogoDirective } from "./logo-directive.component";
import { ThemeComponent } from "./theme.component";
import { ContactComponent } from "./contact.component";
import { NgIcon, provideNgIconLoader } from "@ng-icons/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { assetIconLoader } from "../core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoDirective, ThemeComponent, ContactComponent, NgIcon,
  HttpClientModule],
  template: `
    <a aria-label="home" href="./" class="leading-none">
      <ng-icon size="2rem" name="favicon"></ng-icon>
    </a>
    <div class="flex-1"></div>
    <app-theme />
    <app-contact />
  `,
  viewProviders: [assetIconLoader]
})
export class HeaderComponent {
  @HostBinding('class') classes = 'flex flex-1 items-center';
}
