import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class ProfilePageGuard implements CanActivate {

  
  constructor(
   
  
   
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly router: Router
  ) {}

   canActivate(
   ): Promise<boolean> | Observable<boolean> | boolean  {
    // check if user is authenticated

    if (  this.firebaseAuthService.currentUser!= null
      ) {
      return true;
    } else {
      // Navigate to the login page
      this.router.navigate(['login-req']);
      return false;
    }
  }
}
