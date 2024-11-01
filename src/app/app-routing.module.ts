import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainScaffoldComponent} from './public/pages/main-scaffold/main-scaffold.component';
import {MainPageComponent} from './landing-hook/pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainScaffoldComponent, children: [
      { path: '', pathMatch: "full", component: MainPageComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
