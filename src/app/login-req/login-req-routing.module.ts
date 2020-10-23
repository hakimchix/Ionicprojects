import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginReqPage } from './login-req.page';

const routes: Routes = [
  {
    path: '',
    component: LoginReqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginReqPageRoutingModule {}
