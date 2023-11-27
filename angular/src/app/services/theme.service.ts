import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { getTheme, setTheme, storeTheme, systemTheme, Theme } from "../core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #theme$ = new BehaviorSubject<Theme | null>(getTheme());
  theme$ = this.#theme$.asObservable();
  absoluteTheme$ = this.#theme$.pipe(map(theme => theme ?? systemTheme() ));
  isSystem$ = this.#theme$.pipe(map(theme => theme === null));
  isDark$ = this.absoluteTheme$.pipe(map(theme => theme === Theme.dark));

  update = (value: Theme | null) => {
    this.#theme$.next(value);
    storeTheme(value);
    setTheme(value ?? systemTheme());
  }
}
