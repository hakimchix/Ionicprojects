import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx/index';
import { StatusBar } from '@ionic-native/status-bar/ngx/index';
import { EventPageModule } from './event/event.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgCalendarModule  } from 'ionic2-calendar';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { AmdModule } from '../app/amd/amd.module';
import { FCM } from '@ionic-native/fcm/ngx/index'

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx/index';
import { FilePath } from '@ionic-native/file-path/ngx'

import { ProfilePageResolver } from './profile/profile.resolver';
import { ProfilePageGuard } from './profile/profile-can-activate.guard';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,  NgCalendarModule,  AmdModule,IonicStorageModule,
    AngularFireModule.initializeApp(environment.firebase1),
    AngularFireAuthModule,AngularFirestoreModule,EventPageModule, BrowserAnimationsModule
  ],
  providers: [
    StatusBar,ScreenOrientation, 
    SplashScreen,  BackgroundMode,FilePath,
    FirebaseAuthService,AngularFireModule,FCM,FileChooser,File,ProfilePageResolver,ProfilePageGuard,
    { provide: RouteReuseStrategy,useClass:IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
