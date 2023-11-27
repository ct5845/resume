import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { EDUCATION_ROUTE, HOME_ROUTE, INTERESTS_ROUTE, Route, SKILLS_ROUTE, WORK_ROUTE } from "../core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matArrowBackIos, matArrowForwardIos } from "@ng-icons/material-icons/baseline";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, NgIconComponent ],
  template: `
    <a *ngIf="(state$ | async)?.prev; let prev" [attr.href]="prev.path" class="btn shadow">
      <ng-icon class="text-lg" name="matArrowBackIos" />
      <div class="flex flex-col items-start">
        <span class="text-sm font-bold">{{ prev.name }}</span>
        <span class="text-xs font-thin">Previous</span>
      </div>
    </a>
    <div class="flex-1"></div>
    <a *ngIf="(state$ | async)?.next; let next" [attr.href]="next.path" class="btn shadow">
      <ng-icon class="text-lg" name="matArrowForwardIos" />
      <div class="flex flex-col items-start">
        <span class="text-sm font-bold">{{ next.name }}</span>
        <span class="text-xs font-thin">Next</span>
      </div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ matArrowBackIos, matArrowForwardIos })]
})
export class FooterComponent {
  state$: Observable<{ next?: Route; prev?: Route; }>;

  constructor(public route: ActivatedRoute) {
    this.state$ = route.fragment.pipe(
      map((fragment) => {
        switch (fragment) {
          case HOME_ROUTE.path:
            return { next: WORK_ROUTE };
          case WORK_ROUTE.path:
            return { next: EDUCATION_ROUTE, prev: HOME_ROUTE };
          case EDUCATION_ROUTE.path:
            return { next: SKILLS_ROUTE, prev: WORK_ROUTE };
          case SKILLS_ROUTE.path:
            return { next: INTERESTS_ROUTE, prev: EDUCATION_ROUTE };
          case INTERESTS_ROUTE.path:
            return { prev: SKILLS_ROUTE };
          default:
            return {};
        }
      }));
  }
}
