import { Directive, ElementRef, HostBinding } from "@angular/core";
import { LOGO } from "../core";

@Directive({
  selector: "svg[appLogo]",
  standalone: true
})
export class LogoDirective {
  @HostBinding("attr.viewBow") viewBox = "0 0 30 30";
  @HostBinding("attr.xmlns") xmlns = "http://www.w3.org/2000/svg";

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.innerHTML = LOGO;
  }
}
