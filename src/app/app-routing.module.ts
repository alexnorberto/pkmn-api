import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PkmnListComponent } from './components/pkmn-list/pkmn-list.component';
import { PkmnViewComponent } from './components/pkmn-view/pkmn-view.component';

const routes: Routes = [
  {path:"", redirectTo: "pkmnlist", pathMatch:"full"},
  {path:"pkmnlist",component:PkmnListComponent},
  {path:"pkmnview",component:PkmnViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
