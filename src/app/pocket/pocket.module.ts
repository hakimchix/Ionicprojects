import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PocketPageRoutingModule } from './pocket-routing.module';

import { PocketPage } from './pocket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketPageRoutingModule
  ],
  declarations: [PocketPage]
})
export class PocketPageModule {}
