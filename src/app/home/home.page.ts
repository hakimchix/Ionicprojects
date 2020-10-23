import { Component, OnInit } from '@angular/core';
import {ProfilePage} from '../profile/profile.page'
import { FirebaseAuthService } from '../services/firebase-auth.service';

import { Router } from '@angular/router';

import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController ,LoadingController,NavController} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

curentuser:any;
 usersList: any[];
 now: Date = new Date();

  
    userObsrv: Observable<{any}[]>;
   users :any[];
    
     private userCollection: AngularFirestoreCollection<any>;
    constructor(public api:FirebaseAuthService ,private  navCtrl:NavController, private router: Router,private fireStore: AngularFirestore,private loadingController: LoadingController, public modalController: ModalController) { this.curentuser="init"
    this.userCollection = fireStore.collection<any>('Users');
 
    this.userObsrv = this.userCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
     
    }

async getcLoggedUser(){
  this.curentuser= this.api.currentUser}
  ngOnInit() {
  
 

    console.log('home user', this.api.getLoggedInUser().displayName);

    this.getcLoggedUser();
    this.getUsersList()
   console.log( this.usersList.map(k=>{k.filter(g=>{g.name==this.curentuser.displayName})}) )
  }
  
  openChat(usr: any){
    this.router.navigate(['/chat-room/'], { queryParams: usr, skipLocationChange: false });
  }
  logout() {
    console.log('lgout');
    this.api.signOut();
  }

  getUsersList() {
     this.usersList=[];
    this.userObsrv.subscribe(a=> {this.usersList=a}
    )
    
  }
   ionViewWillEnter () {
    this.getuserconnected()
      }
   
  

  async getuserconnected() {
    const loading = await this.loadingController.create({
      message: 'Loading App..'
    });
    await loading.present();
    
        const T=this.api.platform.ready()
        
      .then(a=>{
       
        loading.dismiss()
       alert(a);
      
        });
        if(T){
          loading.dismiss()
        }
         else{
          this.navCtrl.navigateRoot('LoginPage');
         }
      }
     
}
