import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: '[appTitle]',
  standalone: true,
})
export class TitleDirective {
  @Input({ alias: 'class' }) className?: string;
  @Input() level!: number;

  @HostBinding('class') get classes() {
    switch (this.level) {
      case 1:
        return `text-5xl font-extrabold tracking-tighter mb-6 print:text-2xl print:mb-3 ${this.className ?? ''}`;
      case 2:
        return `text-3xl mb-2 text-primary font-bold print:text-xl print:mb-1 ${this.className ?? ''}`;
      case 3:
        return `text-2xl mb-2 text-secondary flex flex-row justify-between print:text-lg print:mb-1 ${this.className ?? ''}`;
    }
    return '';
  }

  constructor() { }

}
