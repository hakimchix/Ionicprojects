import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageResolver } from '.././profile/profile.resolver';
import { ProfilePageGuard } from '.././profile/profile-can-activate.guard';
import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage,  resolve: {
      data: ProfilePageResolver
    },
    
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],providers: [ProfilePageResolver, ProfilePageGuard]
})
export class EventPageRoutingModule {}
