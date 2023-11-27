import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { getTheme, setTheme, systemTheme } from "./core";
import { provideNgIconsConfig } from "@ng-icons/core";

setTheme(getTheme() ?? systemTheme());

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideNgIconsConfig({
      size: '1.2em',
    })
  ]
};
