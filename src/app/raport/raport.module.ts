import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaportPageRoutingModule } from './raport-routing.module';

import { RaportPage } from './raport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaportPageRoutingModule
  ],
  declarations: [RaportPage]
})
export class RaportPageModule {}
