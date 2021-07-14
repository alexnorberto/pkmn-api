import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PkmnListComponent } from './components/pkmn-list/pkmn-list.component';
import { PkmnStatsComponent } from './components/pkmn-view/pkmn-stats/pkmn-stats.component';
import { PkmnViewComponent } from './components/pkmn-view/pkmn-view.component';

const routes: Routes = [
  {path:"", redirectTo: "pkmnlist", pathMatch:"full"},
  {path:"pkmnlist",component:PkmnListComponent},
  {path:"pkmnview/:id",component:PkmnViewComponent, children: [
    {path:"", redirectTo: "stats", pathMatch:"full"},
    {path:"stats",component:PkmnStatsComponent}
  ]},
  {path:"**", redirectTo: "pkmnlist"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
