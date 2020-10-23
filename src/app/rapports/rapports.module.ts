import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapportsPageRoutingModule } from './rapports-routing.module';

import { RapportsPage } from './rapports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RapportsPageRoutingModule
  ],
  declarations: [RapportsPage]
})
export class RapportsPageModule {}