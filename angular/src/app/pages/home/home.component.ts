import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MEDIA_QUERIES, ROUTES_NO_HOME } from "../../core";
import { map, Observable } from "rxjs";
import * as resumeJSON from '../../../assets/resume.json';
import { IdentityComponent } from "../../components/identity.component";
import { NavigationComponent } from "../../components/navigation.component";
const resume = resumeJSON;

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, IdentityComponent, NavigationComponent],
  template: `
      <app-identity *ngIf="(mediumOrSmaller$ | async)" [name]="basics.name" [location]="basics.location" [role]="basics.role" />
      <app-navigation class="flex flex-row items-center" [routes]="routesNoHome" [showHeader]="true" *ngIf="(mediumOrSmaller$ | async) === false">
        <app-identity header [name]="basics.name" [location]="basics.location" [role]="basics.role" />
      </app-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @HostBinding("class") classes: string = "";
  basics = resume.basics;
  mediumOrSmaller$: Observable<boolean>;
  routesNoHome = ROUTES_NO_HOME;

  constructor(breakpointObserver: BreakpointObserver) {
    this.mediumOrSmaller$ = breakpointObserver.observe(MEDIA_QUERIES["md-"])
      .pipe(map(state => state.matches));

    this.mediumOrSmaller$.subscribe(mediumOrSmaller => {
      if (mediumOrSmaller) {
        this.classes = "flex h-full min-h-[75vh] flex-col items-center justify-center text-center";
      } else {
        this.classes = "min-h-[75vh]";
      }
    });
  }
}
