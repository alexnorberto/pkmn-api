import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PkmnApiService } from 'src/app/services/pkmn-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pkmn-view',
  templateUrl: './pkmn-view.component.html',
  styleUrls: ['./pkmn-view.component.css']
})
export class PkmnViewComponent implements OnInit {

  pkmnData : any;

  constructor(
    private location:Location,
    private pkmnApi:PkmnApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pkmnData = this.location.getState();

    this.route.params.subscribe(params => {
      this.pkmnData.id = +params['id'];
    });
    this.getPkmnById(this.pkmnData.id);

    document.getElementById("main-toolbar-title").textContent = this.pkmnData.name;




  }

  getPkmnById(id):void{
    this.pkmnApi.getPkmnById(id).subscribe(
      pkmn => {
        console.log(pkmn)
        this.pkmnData = {
          "name": pkmn.name,
          "id": pkmn.id,
          "sprite": pkmn.sprites.front_default,
          "sprites": pkmn.sprites,
          "type1": pkmn.types[0],
          "type2": pkmn.types[1],
          "stats": pkmn.stats,
          "abilities": pkmn.abilities,
          "base-exp": pkmn.base_experience,
          "forms": pkmn.forms,
          "location": pkmn.location_area_encounters,
          "moves": pkmn.moves,
          "species": pkmn.species.url,


        };
      }, e => console.log(e)
    )
  }

}
