import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { matMenu } from "@ng-icons/material-icons/baseline";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <input [attr.id]="sideNavToggleId" type="checkbox" class="drawer-toggle lg:hidden" />
    <header class="sticky top-0 col-span-2 flex items-center p-2 backdrop-blur-sm md:col-span-4">
      <label
        [attr.for]="sideNavToggleId"
        aria-label="open sidebar"
        class="btn btn-circle btn-ghost lg:hidden">
        <ng-icon name="matMenu" />
      </label>
      <ng-content select="[header]"></ng-content>
    </header>
    <nav
      class="max-lg:drawer-side relative overflow-auto lg:row-span-2 lg:col-span-1 lg:col-start-2 z-10 lg:w-96 {{ sideDrawerLargeClass }}">
      <label [attr.for]="sideNavToggleId" aria-label="close sidebar" class="drawer-overlay"></label>
      <div
        class="backdrop-blur lg:fixed lg:w-96 lg:top-16 bg-base-200/80 h-full p-2 lg:bg-base-100 overflow-y-auto">
        <ng-content select="[nav]"></ng-content>
      </div>
    </nav>
    <main
      class="col-span-2 px-2 md:col-start-2 md:w-prose lg:col-span-1 lg:col-start-3 {{ contentClass }}">
      <ng-content select="[main]"></ng-content>
    </main>
    <footer
      class="sticky bottom-0 col-span-2 p-2 flex flex-row items-center backdrop-blur-sm md:col-start-2 lg:col-span-1 lg:col-start-3 {{ footerClass }}">
      <ng-content select="[footer]"></ng-content>
    </footer>
    
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ matMenu })
  ]
})
export class LayoutComponent implements OnChanges {
  @Input() splash?: boolean;
  sideDrawerLargeClass?: string;
  contentClass?: string;
  footerClass?: string;
  @HostBinding('class') classes = `drawer grid gap-1 min-h-screen grid-cols-2 grid-rows-[auto_1fr_auto] md:grid-cols-[1fr_auto_auto_1fr] md:grid-rows-[auto_auto_auto] md:min-h-fit`;

  sideNavToggleId = 'side-nav-open';

  ngOnChanges() {
    this.sideDrawerLargeClass = this.splash ? 'lg:hidden' : '';
    this.contentClass = this.splash ? '' : '';
    this.footerClass =  this.splash ? '' : 'lg:col-start-2 lg:col-span-1';
  }
}
