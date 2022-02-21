import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {WindowComponent} from "./window.component";
import {PortalModule} from "@angular/cdk/portal";
import {WindowRouterComponent} from "./window-router.component";
import {ProductComponent} from './product/product.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PortalModule
  ],
  declarations: [OrdersComponent, WindowComponent, WindowRouterComponent, ProductComponent]
})
export class OrdersModule {
}
