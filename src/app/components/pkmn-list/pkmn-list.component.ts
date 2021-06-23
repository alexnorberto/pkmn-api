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
  fullPkmnSpriteList = []

  //params to get pkmn list
  nextStartPosition = 0;
  nextPageLimit = 20;

  // MatPaginator Inputs
  fullPkmnListlength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 100];

  // MatPaginator Output
  pageEvent?: PageEvent;

  constructor(
    private pkmnApi : PkmnApiService,
  ) { }

  ngOnInit(): void {
    this.getPkmnList(0,10);
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
    this.pkmnApi.getPkmnList(startPosition,pageSize)
    .subscribe(
      pageList => {
        pageList.results.forEach(pkmn => {
          this.getPkmnByUrl(pkmn.url);
        });
        this.fullPkmnList = pageList.results;
        this.fullPkmnListlength = pageList.count;        
      },
      e => console.log(e)
    );
  }

  getPkmnByUrl(url){
    this.pkmnApi.getPkmnByUrl(url)
    .subscribe(
      pkmnData => {
        this.fullPkmnSpriteList.push(pkmnData.sprites);
      },
      e => console.log(e)
    );
  }

  onPaginate(pageEvent:PageEvent){
    let startPosition = pageEvent.pageIndex * pageEvent.pageSize;
    this.getPkmnList(startPosition,pageEvent.pageSize)
  }

}
