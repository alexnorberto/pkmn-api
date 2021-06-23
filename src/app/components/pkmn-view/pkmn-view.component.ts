import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pkmn-view',
  templateUrl: './pkmn-view.component.html',
  styleUrls: ['./pkmn-view.component.css']
})
export class PkmnViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("main-toolbar").style.backgroundColor = "var(--electric)";
    document.getElementById("main-toolbar").textContent = "normal"
  }

}
