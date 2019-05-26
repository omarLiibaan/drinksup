import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  exo : string = "premium";

  offres_icon : string = "1";
  favoris_icon : string = ".3";
  constructor() { }

  ngOnInit() {
  }

  offreclick(){
    this.offres_icon = "1";
    this.favoris_icon = ".3";
  }

  barclick(){
    this.offres_icon = ".6";
    this.favoris_icon = ".3";
  }

  faveclick(){
    this.offres_icon = ".6";
    this.favoris_icon = "1";
  }

  profilclick(){
    this.offres_icon = ".6";
    this.favoris_icon = ".3";
  }

}
