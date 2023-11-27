import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as resumeJSON from '../../../assets/resume.json';
const resume = resumeJSON;
@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      interests works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestsComponent {

}
