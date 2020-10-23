import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User, auth } from 'firebase/app';
import { ProfileModel } from '../profile/profile.model';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseAuthService {

  currentUser: User;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();
  loader: boolean = false;
  user: any;
 
  db: any;
  admin: boolean = true;
  constructor(
    public angularFire: AngularFireAuth,
    public platform: Platform   , private snack: SnackbarService,
    private router: Router
  ) {
    this.angularFire.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.currentUser = user;
      } else {
        // No user is signed in.
        this.currentUser = null;
      }
    });

    // when using signInWithRedirect, this listens for the redirect results
    this.angularFire.getRedirectResult()
    .then((result) => {
      // result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
      if (result.user) {
        this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        this.currentUser = result.user;
        this.redirectResult.next(result);
      }
    }, (error) => {
      this.redirectResult.next({error: error.code});
    });
  }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  setProviderAdditionalInfo(additionalInfo: any) {
    this.userProviderAdditionalInfo = {...additionalInfo};
    
  }
  public setProfileData(name,photo) {
    
    this.currentUser.updateProfile({
      displayName:name,
      photoURL: photo,
      
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });

   
    }
  
  

  public getProfileData() {
    const userModel = new ProfileModel();
    let providerData : any = this.currentUser.providerData[0];

    if (this.userProviderAdditionalInfo) {
      providerData = {...providerData, ...this.userProviderAdditionalInfo};
    }

    // Default imgs are too small and our app needs a bigger image
    switch (providerData.providerId) {
      case 'facebook.com':
        userModel.image = providerData.photoURL + '?height=400';
        break;
      case 'password':
        userModel.image = providerData.photoURL;
        break;
      case 'twitter.com':
        userModel.image = providerData.photoURL.replace('_normal', '_400x400');
        break;
      case 'google.com':
        userModel.image = providerData.photoURL.split('=')[0];
        break;
      default:
        userModel.image = providerData.photoURL;
    }
    userModel.name = providerData.name || providerData.displayName || 'What\'s your name?';
    userModel.role = 'How would you describe yourself?';
    userModel.description = providerData.description || 'Anything else you would like to share with the world?';
    userModel.phoneNumber = providerData.phoneNumber || 'Is there a number where I can reach you?';
    userModel.email = providerData.email || 'Where can I send you emails?';
    userModel.provider = (providerData.providerId !== 'password') ? providerData.providerId : 'Credentials';

    return userModel;
  }

  // Get the currently signed-in user
  getLoggedInUser() {
    return this.currentUser;
  }
  resetPassword(email){
    this.angularFire.sendPasswordResetEmail(email).then(()=>alert('email reset send'))
  }
  signOut(): Observable<any> {
    return from(this.angularFire.signOut());
  }

  signInWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
    const provider = new auth.OAuthProvider(providerName);

    // add any permission scope you need
    if (scopes) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }

    if (this.platform.is('desktop')) {
      return this.angularFire.signInWithPopup(provider);
    } else {
      // web but not desktop, for example mobile PWA
      return this.angularFire.signInWithRedirect(provider);
    }
  }

  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    // const scopes = ['user_birthday'];
    return this.socialSignIn(provider.providerId);
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }

  signInWithTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.socialSignIn(provider.providerId);
  }
  signin2(email: string, password: string){
    this.signUpWithEmail(email,password)
    .then((user)=>{
      this.loader = false;
      
      this.user = {
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
  
      localStorage.setItem('loggedIn', this.user.id); 
      this.admin ? this.router.navigate(['/home'], { skipLocationChange: false }) : this.router.navigate(['/chat-room/'], { queryParams: { name: 'Messenger', id: this.user.id }, skipLocationChange: false });
      console.log('login', user);
    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      console.log('error while signin', error);
      this.snack.openSnackBar(error.message, 'ok');
      // ...
    });
  }
  sendMsg(id: string, msg: string, type: string) {
    let key = this.generateRandomString(16);
    this.db.collection("chatRoom/").doc(key).set({
          type: type,
          id: id,
          key: key,
          msg: msg,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
  }

  generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

}
