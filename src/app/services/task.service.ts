import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuthService } from './firebase-auth.service';
export interface Task {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
  closedAt:any;
  closed:boolean;

}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<Task>;
 user :Observable<string>;
   tasks: Observable<Task[]>;
   firebaseAuthService:FirebaseAuthService
  constructor(public afAuth: AngularFireAuth, afs: AngularFirestore) {
    this.tasksCollection=afs.collection<Task>('tasks');
    
 
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  }
   getTasks() {
    return this.tasks
  }
  getopenTasks(d) {
   
    
 
    return this.tasksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(a=>a.closed===d);
      })
    );
  }
  getTask(id) {
    return this.tasksCollection.doc<Task>(id).valueChanges();
  }
  closeTask(task: Task, id: string) {
    task.closed=true;
    return this.tasksCollection.doc(id).update(task);
  }
  openTask(task: Task, id: string) {
    task.closed=false;
    return this.tasksCollection.doc(id).update(task);
  }
  updateTask(task: Task, id: string) {
    return this.tasksCollection.doc(id).update(task);
  }
  /*addTaskToFirebase() {
    this.db.list('Tasks/').push({
      text: 'this.myTask',
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }*/
  addTask(task: Task) {
    return this.tasksCollection.add(task);
  }
 getuser(){
  return this.firebaseAuthService.getLoggedInUser().email
 }
  removeTask(id) {
    return this.tasksCollection.doc(id).delete();
  }
   }

