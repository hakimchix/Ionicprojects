import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Task {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
  closedAt:any;
  closed:boolean;

}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  taskObsrv: Observable<Task[]>;
tasks :Task[];
 
  private todosCollection: AngularFirestoreCollection<Task>;
  constructor(private fireStore: AngularFirestore) {
    this.todosCollection = fireStore.collection<Task>('tasks');
 
    this.taskObsrv = this.todosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
   }

   
   getopenTasks(d) {
   
    
 
    return this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(a=>a.closed===d);
      })
    );
  }
   async getopentask(d){
    this.getopenTasks(d).subscribe(res =>{ this.tasks =res;});
    
   }
async gettasks(){

this.taskObsrv.subscribe(a=>{this.tasks=a;})
}
  ngOnInit() {this.gettasks();
  }
  priority_color(i){

    switch(i) { 
      case 1: { 
        
        return "danger";
        break; 
     }
      case 2: { 
         //statements; 
         return "primary";
         break; 
      } 
      case 3: { 
         //statements; 
         return "light";
         break; 
      } 
      default: { 
         //statements; 
         return "dark";
         break; 
      } 
    } 
      }

      close(item) {
        this.changeTask(item,true);
       }
       open(item) {
        this.changeTask(item,false);
       }
       remove(item) {
       
        return this.todosCollection.doc(item).delete()
        .then(()=>{})
        .catch(err=>{console.error(err)})
       }
       
       changeTask(task: Task,colse:boolean) {
         task.closed=colse;
         return this.todosCollection.doc(task.id).update(task);
      }

}
