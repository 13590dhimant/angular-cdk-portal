import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  show: boolean = false;
  show1: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  onCLick() {
    this.show = !this.show;

    setTimeout(() => this.show = true);
  }

  onCLick1() {
    this.show1 = !this.show1;
    setTimeout(() => this.show1 = true);

  }
}
