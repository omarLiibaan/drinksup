import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.page.html',
  styleUrls: ['./loadingpage.page.scss'],
})
export class LoadingpagePage implements OnInit {
  random : number;
  
  constructor() { 
    this.random = Math.floor(Math.random() * 100);
  }

  ngOnInit() {
    
  }

}
