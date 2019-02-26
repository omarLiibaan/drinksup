import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.page.html',
  styleUrls: ['./offers-management.page.scss'],
})
export class OffersManagementPage implements OnInit {

  constructor() { }
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  ngOnInit() {
    this.days;
  }
  async showList() {
    console.log(this.days[2].toString());
  }

}
