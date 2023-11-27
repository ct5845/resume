import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as resumeJSON from '../../../assets/resume.json';
import { ContentComponent } from "../../components/content.component";
import { TitleDirective } from "../../components/title.directive";
const resume = resumeJSON;

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ContentComponent, TitleDirective],
  template: `
    <app-content>
      <span header>Work Experience</span>
      <ul content>
        <li *ngFor="let experience of resume.work">
          <h2 appTitle [level]="2">{{ experience.position }}</h2>
          <h3 appTitle [level]="3">
            <span>{{ experience.name }}</span>
            <span class="text-accent">
            {{ experience.startDate }} - {{experience.endDate ?? 'Present'}}
            </span>
          </h3>
          <ul class="mb-6 list-disc pl-4">
            <li *ngFor="let highlight of experience.highlights">
              {{ highlight }}
            </li>

          </ul>
        </li>
      </ul>
    </app-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkComponent {
  resume = resume;
}
