import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      print works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintComponent {

}
