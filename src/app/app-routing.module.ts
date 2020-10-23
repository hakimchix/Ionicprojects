import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfilePageGuard} from './profile/profile-can-activate.guard';
const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pocket',
    loadChildren: () => import('./pocket/pocket.module').then( m => m.PocketPageModule)
  },
  {
    path: 'raport',
    loadChildren: () => import('./raport/raport.module').then( m => m.RaportPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'planing',
    loadChildren: () => import('./planing/planing.module').then( m => m.PlaningPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'login-req',
    loadChildren: () => import('./login-req/login-req.module').then( m => m.LoginReqPageModule)
  },
  {
    path: 'task-detail',
    loadChildren: () => import('./task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
  },
 { path: 'task-detail/:id', loadChildren: () => import('./task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
},  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },{
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },  {
    path: 'rapports',
    loadChildren: () => import('./rapports/rapports.module').then( m => m.RapportsPageModule)
  },
  {
    path: 'docwallet',
    loadChildren: () => import('./docwallet/docwallet.module').then( m => m.DocwalletPageModule)
  },

] 

;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],providers: [ ProfilePageGuard]
})
export class AppRoutingModule { }
