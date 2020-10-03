import { Component, OnInit ,NgZone} from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Platform} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-req',
  templateUrl: './login-req.page.html',
  styleUrls: ['./login-req.page.scss'],
})
export class LoginReqPage implements OnInit {

  constructor(public alertController: AlertController,private router:Router,private ngZone:NgZone,public platform:Platform) {  this.platform = platform;}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: 'Securite notification',
      message: 'Acces not authorised',
      buttons: [{
        text: 'sign-in',
        
        cssClass: 'secondary',
        handler: (blah) => {
          this.redirectToPage('sign-in');
        }
      }, {
        text: 'sign-up',
        handler: () => {
          this.redirectToPage('sign-up');
        }
      }]
    });
    await alert.present();
  }
  ngOnInit() {
    this.presentAlert();
   

  }
  redirectToPage(page) {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate([page]);
    });
  }
  exitApp(){
    navigator['app'].exitApp();
 }
}
