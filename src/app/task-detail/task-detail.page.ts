import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


import { Task , TaskService } from '../services/task.service';
import {TasksPage} from '../tasks/tasks.page'
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  task: Task = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2,
    closedAt:'',
    closed:false
  };
  tskpg:TasksPage
  taskId = null;
  todos: Task;
  private todosCollection: AngularFirestoreCollection<Task>;
  constructor(private router: Router,private route: ActivatedRoute, private nav: NavController, private fireStore: AngularFirestore, private loadingController: LoadingController) { 
this.todosCollection=this.fireStore.collection('tasks');

  }
  

  
  updateTask(todo: Task, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTask(todo: Task) {
    return this.todosCollection.add(todo)
    .then(()=>{this.router.navigateByUrl('/tasks');})
    .catch(err=>{console.error(err)})

  }



  async removeTask(id) {
    return this.todosCollection.doc(id).delete()
    .then(()=>{this.router.navigateByUrl('/tasks');})
    .catch(err=>{console.error(err)})
  
  }
  getTodo(id) {
    return this.todosCollection.doc<Task>(id).valueChanges();
  }
  ngOnInit() {
    this.taskId = this.route.snapshot.params.id
  if (this.taskId)  {
    
  this.loadTodo();
         }
  }
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
 
   
       this.getTodo(this.taskId).subscribe(res => {
      
        this.todos = res;
        loading.dismiss();
        this.task =  this.todos;
       
    });
    
  }

  


  async lireTodo(){
    this.loadTodo;
  this.task =  this.todos;
}

gotaskpage(){
  this.router.navigateByUrl('/tasks');
}

  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.taskId) {
      this.updateTask(this.task, this.taskId).then(() => {
        loading.dismiss();
      
      });
    } else {
      this.addTask(this.task).then(() => {
        loading.dismiss();
        
        
      });
    }
  }


}
