import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as resumeJSON from '../../../assets/resume.json';
const resume = resumeJSON;
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      education works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent {

}
