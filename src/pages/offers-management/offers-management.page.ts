import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.page.html',
  styleUrls: ['./offers-management.page.scss'],
})
export class OffersManagementPage implements OnInit {

  constructor() { }
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  jours = '';
  ngOnInit() {
    this.days;
  }
  async showList() {
    console.log(this.jours);
  }


}
