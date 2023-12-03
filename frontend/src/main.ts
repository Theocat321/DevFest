import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Injector } from '@angular/core';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
