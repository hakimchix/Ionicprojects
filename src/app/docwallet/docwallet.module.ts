import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocwalletPageRoutingModule } from './docwallet-routing.module';

import { DocwalletPage } from './docwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocwalletPageRoutingModule
  ],

  declarations: [DocwalletPage]
})
export class DocwalletPageModule {}