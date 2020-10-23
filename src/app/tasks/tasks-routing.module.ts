import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageResolver } from '.././profile/profile.resolver';
import { ProfilePageGuard } from '.././profile/profile-can-activate.guard';
import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage,  resolve: {
      data: ProfilePageResolver
    },
    canActivate: [ProfilePageGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],providers: [ProfilePageResolver, ProfilePageGuard]
})
export class TasksPageRoutingModule {}
