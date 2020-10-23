import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { ChatRoomPageRoutingModule } from './chat-room-routing.module';
import { ApiService } from '../services/api.service';
import { ChatRoomPage } from './chat-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomPageRoutingModule
  ],
  declarations: [ChatRoomPage]
})
export class ChatRoomPageModule {}