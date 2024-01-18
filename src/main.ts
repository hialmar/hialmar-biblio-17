import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

import { Routes, RouterOutlet, provideRouter } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AjoutComponent } from './ajout/ajout.component';
import { BiblioService } from './biblio.service';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'list/add', component: AjoutComponent },
  { path: 'list/view/:titre', component: AjoutComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet],
  providers: [BiblioService],
})
export class App {
}

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient()],
});
