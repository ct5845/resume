import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitleDirective } from "./title.directive";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, TitleDirective],
  template: `
    <h1 appTitle [level]="1">
      <ng-content select="[header]" />
    </h1>
    <ng-content select="[content]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  @Input({ alias: 'class' }) className?: string;
  @HostBinding('class') get classes() {
    return `mx-auto max-w-prose print:mx-0 print:max-w-none ${this.className ?? ''}`;
  }
}
