import { Component, OnInit,ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CalendarComponent } from "ionic2-calendar";
import { ModalController ,LoadingController} from '@ionic/angular';

import { EventPage } from '../event/event.page';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { map } from 'rxjs/operators';





registerLocaleData(localeFr, 'fr');
export interface Event  {
  title: string;
  description: string;
  CreatedBy: string;
  StartTime: string;
  EndTime: string;
}
@Component({
  selector: 'app-planing',
  templateUrl: './planing.page.html',
  styleUrls: ['./planing.page.scss'],
})

export class PlaningPage implements OnInit {
  @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;
  eventSource;


  currentDate = new Date();
  currentMonth: string="april";
  showAddEvent: boolean;
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  minDate = new Date().toISOString();
  newEvent :Event= {
    title: '',
    description: '',
    CreatedBy: '',
    StartTime: new Date().toISOString(),
    EndTime: new Date().toISOString()
  };
  allEvents :Event[];
 EventsObsrv:Observable<Event[]>;
 private eventCollection: AngularFirestoreCollection<Event>;

 viewTitle;

 isToday:boolean;

  calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };



  constructor( private loadingController: LoadingController, public modalController: ModalController,private fireStore: AngularFirestore,
    ) {
    
      this.eventCollection = this.fireStore.collection<Event>('Events');
    
      this.EventsObsrv =this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
   
    this.CreatEvents();
    }
   
  
  ngOnInit() {    

    
  
}



addEvent(event: Event) {
  return this.eventCollection.add(event)
  .then(()=>{this.loadEvents;
    this.showHideForm();})
  .catch(err=>{console.error(err)})

}
showHideForm() {
  this.showAddEvent = !this.showAddEvent;
  this.newEvent = {
    title: '',
    description: '',
    CreatedBy: '',
    StartTime: new Date().toISOString(),
    EndTime: new Date().toISOString()
  };
}

async getBookingList() {
  const loading = await this.loadingController.create({
    message: 'Loading Todo..'
  });
  await loading.present();
  
      this.eventCollection.valueChanges()
    .subscribe(a=>{
     
      loading.dismiss()
      this.allEvents=a;
    
      });
      
    }
  
async loadEvents() 

{ await  this.CreatEvents();
  /*this.allEvents.map(ev=>{ ev.StartTime =new Date(ev.StartTime).toTimeString();
  ev.EndTime =new Date(ev.EndTime).toTimeString()})
  /*this.allEvents = [];
  this.afDB.list('Events').snapshotChanges().subscribe(actions => {
    
    actions.forEach(action => {
      console.log('action: ' + action.payload.exportVal().title);
      this.allEvents.push({
        title: action.payload.exportVal().title,
        StartTime:  new Date(action.payload.exportVal().startTime).toISOString(),
        EndTime: new Date(action.payload.exportVal().endTime).toISOString(),
        description: action.payload.exportVal().description,
        imageURL: action.payload.exportVal().imageURL
      });
      
    });
  });*/
 
}
onViewTitleChanged(title: string) {
  this.currentMonth = title;
  this.viewTitle = title;
}

async onEventSelected(event: any) {
  console.log('Event: ' + JSON.stringify(event));
  const modal = await this.modalController.create({
    component: EventPage,
    componentProps: event
  });
  return await modal.present();
}

onTimeSelected(ev: any) {
  const selected = new Date(ev.selectedTime);
  this.newEvent.StartTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.newEvent.EndTime = (selected.toISOString());
}
/*    
*/
onRangeChanged(ev) {
  console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}

markDisabled = (date:Date) => {
  var current = new Date();
  current.setHours(0, 0, 0);
  return date < current;
};
changeMode(mode) {
  this.calendar.mode = mode;
}

today() {
  this.calendar.currentDate = new Date();
}



onCurrentDateChanged(event:Date) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);
  this.isToday = today.getTime() === event.getTime();
}

 async CreatEvents() {
  var events = [];
   this.getBookingList()

  
       

   if(this.allEvents){
    this.allEvents.forEach(values=>{
         
          events.push({
            title: values.title,
            startTime: new Date(values.StartTime),
            endTime: new Date(values.EndTime),
            CreatedBy:values.CreatedBy,
            description:values.description,
            allDay: false
        });
        }) 
      }
        
     this.eventSource= events;
   
}





}