import { Component, OnInit, ViewChild } from '@angular/core';
import { PkmnApiService } from 'src/app/services/pkmn-api.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pkmn-list',
  templateUrl: './pkmn-list.component.html',
  styleUrls: ['./pkmn-list.component.css']
})
export class PkmnListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fullPkmnList = [];
  fullPkmnSpriteList = [];

  // MatPaginator Inputs
  fullPkmnListlength = 0;
  maxPkmnListLength = 898;
  pageSize = 12;
  pageSizeOptions: number[] = [12, 36, 72];

  // MatPaginator Output
  pageEvent?: PageEvent;

  constructor(
    private pkmnApi : PkmnApiService,
  ) { }

  ngOnInit(): void {
    this.getPkmnList(0,this.pageSize);
    document.getElementById("main-toolbar").style.backgroundColor = "var(--red)";
  }

  //customization for mat-paginator labels
  ngAfterViewInit():void {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
    paginatorIntl.lastPageLabel = '';
    paginatorIntl.firstPageLabel = '';
  }

  getPkmnList(startPosition,pageSize):void{
    this.fullPkmnSpriteList = [];
    if (startPosition + pageSize > this.maxPkmnListLength)
      pageSize = this.maxPkmnListLength - startPosition;
    this.pkmnApi.getPkmnList(startPosition,pageSize)
    .subscribe(
      pageList => {
        this.fullPkmnList = pageList.results;
        if (pageList.count > this.maxPkmnListLength) 
          this.fullPkmnListlength = this.maxPkmnListLength;
        else  
          this.fullPkmnListlength = pageList.count;
        let temp = [];
        let spriteListSize = 0;
        pageList.results.forEach((element) => {          
          this.pkmnApi.getPkmnByUrl(element.url).subscribe(
            pkmn => {
              console.log("pkmn ",pkmn)
              spriteListSize++;
              let name = pkmn.name.split("-");

              let id = pkmn.id
              switch (pkmn.id.toString().length) {
                case 1: id = "00"+id; break;
                case 2: id = "0"+id;break;
              }

              temp[pkmn.id-1] = {
                "name": name[0],
                "id": id,
                "sprite": pkmn.sprites.back_default,
                "type1": pkmn.types[0],
                "type2": pkmn.types[1],
                "stats": pkmn.stats
              };

              if((spriteListSize) == pageList.results.length) {
                console.log("temp",temp)
                this.fullPkmnSpriteList = temp.filter(function(){return true});
                console.log("full",this.fullPkmnSpriteList)
              }
            }
            ,e => console.log("error getPkmnByUrl ",e)
          );
        });        
      },
      e => console.log("error getPkmnList ",e)
    );
  }

  onPaginate(pageEvent:PageEvent){
    let startPosition = pageEvent.pageIndex * pageEvent.pageSize;
    this.getPkmnList(startPosition,pageEvent.pageSize)
  }

  getBackgroundColor(type1,type2){
    let bgimg = "linear-gradient(to right, var(--"+type1+"),var(--"+type1+") )";
    if (type2) 
      bgimg = "linear-gradient(to right, var(--"+type1+"),var(--"+type2.type.name+"))";
    return bgimg
  }

  
  ggetPkmnList(startPosition,pageSize):void{
    this.fullPkmnSpriteList = [];
    if (startPosition + pageSize > this.maxPkmnListLength)
      pageSize = this.maxPkmnListLength - startPosition;
    this.pkmnApi.getPkmnList(startPosition,pageSize)
    .subscribe(
      pageList => {
        this.fullPkmnList = pageList.results;
        if (pageList.count > this.maxPkmnListLength) 
          this.fullPkmnListlength = this.maxPkmnListLength;
        else  
          this.fullPkmnListlength = pageList.count;
        let temp = [];
        let spriteListSize = 0;
        pageList.results.forEach((element) => {          
          this.pkmnApi.getPkmnByUrl(element.url).subscribe(
            pkmn => {
              spriteListSize++;
              let spriteId = pkmn.sprites.front_default.slice(-9);
              spriteId = spriteId.replaceAll(/\D/g, "");
              temp[spriteId-1] = pkmn.sprites;
              if((spriteListSize) == pageList.results.length) {
                console.log("temp",temp)
                this.fullPkmnSpriteList = temp.filter(function(){return true});
                console.log("full",this.fullPkmnSpriteList)
              }
            }
            ,e => console.log("error getPkmnByUrl ",e)
          );
        });        
      },
      e => console.log("error getPkmnList ",e)
    );
  }

}
