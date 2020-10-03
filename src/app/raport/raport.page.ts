import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.page.html',
  styleUrls: ['./raport.page.scss'],
})
export class RaportPage implements OnInit {
  show1:boolean
  show2:boolean
  show3:boolean
  v:Int16Array
  constructor() { }

  ngOnInit() {
  }

}
