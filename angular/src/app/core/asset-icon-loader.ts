import { provideNgIconLoader } from "@ng-icons/core";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export const assetIconLoader = provideNgIconLoader(name => {
  const http = inject(HttpClient);
  return http.get(`/assets/${name}.svg`, { responseType: 'text' });
});
