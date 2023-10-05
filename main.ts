import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';
// ...

if (environment.production) {
  enableProdMode();
}
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
  // platform.bootstrapModule(AppModule, { preserveWhitespaces: true });