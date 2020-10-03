import { Component, OnInit } from '@angular/core';
import {ProfilePage} from '../profile/profile.page'
import { FirebaseAuthService } from '../firebase-auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 curentuser:string;

  constructor(private prflpage:FirebaseAuthService ) { this.curentuser="init"
   

   }
async getuser(){this.curentuser= this.prflpage.currentUser.email

}

  ngOnInit() {
  
    this.getuser()
    
  }
}
