import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { ApiService } from '../services/api.service';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface msg {
  from:string;
  to: string;
  type: string;
  key?: string;
  msg: string;
  timestamp:Date;
  

}
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  user: any;
  sender:any;
  chat: string;
  unsubscribe: any;
  msga: any= []
  messages: any = [];
  chatKeys: any = [];
  userType: string='admin';
  loader: boolean = true;
  private userCollection: AngularFirestoreCollection<msg>;
  constructor(
    public api: FirebaseAuthService,
    private route: ActivatedRoute,
    private router: Router,private fireStore: AngularFirestore
  ) {   this.userCollection=fireStore.collection<msg>('chatRoom')
    this.route.queryParamMap.subscribe(snap => { 
      this.user = snap['params'];
      this.getChat();
      this.messages.sort(this.sortDate);
    });
    this.userType = this.api.admin ? 'admin' : 'user';
  }

  ngOnInit() {
    this.getuser().then(data=>this.sender=data); this.messages=[]
  }
  async getuser(){
    if(this.api.currentUser){
    return this.api.currentUser.displayName
  }
  }
  goBack() {
    this.router.navigate(['/home'], { skipLocationChange: false });
  }

  logout() {
    console.log('lgout');
    this.api.signOut();
  }
  
  sendChat() {
    this.chat ? console.log(this.chat) : '';
    let key = this.generateRandomString(16);
    if(this.chat){
     
      return this.fireStore.collection<msg>("chatRoom").add({
        type: this.userType,
        to: this.user.name,
        from: this.sender,
        key: key,
        msg: this.chat,
        timestamp:new Date(Date.now())
  });

    }

   
  }


  
  getChat() {

    
    
  this.getChats().subscribe(e=>{console.log("e",e)
  e.filter(e2=>(e2.to===this.user.name && e2.from===this.sender)).map(e3=>{this.messages.push(e3);this.chatKeys.push(e3.key);})
     })
     
     this.getChats().subscribe(e=>{console.log("e",e)
     e.filter(e2=>(e2.from===this.user.name && e2.to===this.sender)).map(e3=>{this.messages.push(e3);this.chatKeys.push(e3.key);})
     this.messages.sort(this.sortDate); })
   
    console.log(' msgs: befor sorting', this.messages);
  this.loader=false

    }

  getChats() {  this.messages=[] 
    console.log('get chat', this.user.id);
   return this.unsubscribe =  this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
         
          return data ;
        }).sort(this.sortDate)}
       )
      
    )
    
   
 
  }

  sortDate(a, b) {  
    var dateA = a.timestamp; 
    var dateB = b.timestamp; 
    return dateA > dateB ? 1 : -1;  
  };


  ionViewWillLeave() {
    this.unsubscribe=''
    console.log('unsubscribe successfully');
  }

  formatDate(message: any) {
    let date = message['timestamp'] ? message['timestamp'].toDate() : new Date();
    return this.formatAMPM(date);
  }

  sendMsg(id: string, msg: string, type: string) {
    this.messages=[]
    let key = this.generateRandomString(16);
    this.fireStore.collection("chatRoom").add({
          type: type,
          id: id,
          key: key,
          msg: msg,
          timestamp: new Date()
         
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
    var jour=date.toDateString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =jour+"   "+ hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}