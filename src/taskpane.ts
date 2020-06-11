import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const sideloadMsg = document.getElementById('sideload-msg');
sideloadMsg.innerText = 'Please sideload your addin to see app body.';

Office.initialize = () => {
  sideloadMsg.style.display = 'none';
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => {
      sideloadMsg.innerText = err;
      sideloadMsg.style.display = 'block';
    });
};
