import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import '../styles/main.css';

import { MainModule } from './modules/main.module';

if (ENV === 'production') {
  enableProdMode();
  require('offline-plugin/runtime').install();
}
platformBrowserDynamic().bootstrapModule(MainModule);


