import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocwalletPage } from './docwallet.page';

const routes: Routes = [
  {
    path: '',
    component: DocwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocwalletPageRoutingModule {}