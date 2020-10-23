import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController ,LoadingController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx/index';
import { StatusBar } from '@ionic-native/status-bar/ngx/index';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ApiService } from '../app/services/api.service';
import { FCM } from '@ionic-native/fcm/ngx/index'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public guard:string="false";
  public appPages = [
    {
      title: 'SignIn',
      url: '/sign-in',
      icon: 'log-in',
      en:true
     
    },
    {
      title: 'SignUP',
      url: '/sign-up',
      icon: 'person-add',
      en:true
    }, {
      title: 'Profil',
      url: '/profile',
      icon: 'person',
      en:true
    },
    {
      title: 'Movements',
      url: '/pocket',
      icon: 'add-circle',
       en:true
    },
    {
      title: 'Reports',
      url: '/rapports',
      icon: 'podium',
       en:true
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: 'flag',
      en:true
    },
    {
      title: 'home',
      url: '/home',
      icon: 'home',
      en:true
    },       
    {
      title: 'Palning',
      url: '/planing',
      icon: 'trail-sign',
      en:true
    },
    {
      title: 'wallet for Docs',
      url: '/docwallet',
      icon: 'cloud-upload',
      en:true
    },
    {
      title: 'ContactDB',
      url: '/contact',
      icon: 'at',
      en:true
    },   
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
     private statusBar: StatusBar,private user:FirebaseAuthService,private backgroundMode: BackgroundMode,private fcm: FCM
  ) {
    this.initializeApp();
  }
   initializeApp() {
     this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
      this.fcm.getToken().then(token => {
      console.log(token);
     
      });
    });
  
 
  this.fcm.onNotification().subscribe(data => {
    if(data.wasTapped){
      console.log("Received in background");
    } else {
     console.log("Received in foreground");
    };
  });
  this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
  });
this.fcm.hasPermission().then(hasPermission => {
    if (hasPermission) {
      console.log("Has permission!");
    }
  })
  }
  ngOnInit(){
   
this.fcm.getToken().then(token => {
  alert(token);

 })

  }
  
}

