import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginReqPageRoutingModule } from './login-req-routing.module';

import { LoginReqPage } from './login-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginReqPageRoutingModule
  ],
  declarations: [LoginReqPage]
})
export class LoginReqPageModule {}
