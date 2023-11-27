import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { assetIconLoader, BasicLocation } from "../core";
import { NgIcon } from "@ng-icons/core";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-identity",
  standalone: true,
  imports: [CommonModule, NgIcon, HttpClientModule],
  template: `
    <h1 class="text-6xl font-extrabold leading-[5.1rem] print:text-5xl">
      <a
        href="./"
        class="bg-gradient-to-r from-primary to-secondary box-decoration-clone px-4 text-white print:bg-none print:px-0 print:text-primary">
        <ng-container *ngFor="let token of splitName">
          {{ token }}
        </ng-container>
        <br class="print:hidden" />
      </a>
    </h1>
    <h2 class="mt-6 text-4xl font-bold tracking-wide text-secondary-focus print:mt-2 print:text-3xl">
      {{role}}
    </h2>
    <p class="mt-2 font-medium print:mt-1 flex justify-center items-center">
      <span>{{location.city}}</span>
      <span class="mx-2 print:mx-1">•</span>
      <ng-icon class="mr-2" [name]="location.icon['angular']" />
      <span>{{location.countryCode}}</span>
    </p>
  `,
  viewProviders: [assetIconLoader],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityComponent implements OnChanges {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) location!: BasicLocation;
  splitName?: string[];

  ngOnChanges() {
    this.splitName = this.name.split(" ");
  }
}
