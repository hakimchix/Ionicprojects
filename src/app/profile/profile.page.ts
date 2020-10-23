import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from './profile.model';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: ProfileModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService
  ) { }
 
 async getUser(){
  return this.user.email;
}
  ngOnInit() {
    this.route.data
    .subscribe((result) => {
      this.user = result['data'];
    })
  }
updateprofile(){
this.authService.setProfileData(this.user.name,'https://www.w3schools.com/w3images/avatar2.png')
}
  signOut() {
    this.authService.signOut().subscribe(() => {
      // Sign-out successful.
      this.router.navigate(['sign-in']);
    }, (error) => {
      console.log('signout error', error);
    });
  }

}
