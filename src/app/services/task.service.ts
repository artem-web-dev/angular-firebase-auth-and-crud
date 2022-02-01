import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Injectable } from "@angular/core";
import {Task} from "src/app/models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  userId: string | null

  constructor(private fs: AngularFirestore) {
    this.userId = localStorage.getItem('uid')
  }

  getAll() {
    return this.fs.collection<Task>(`tasks`).valueChanges({idField: 'id'})
  }

  create(task: Task) {
    const newTask = {...task, userId: this.userId}
    return this.fs.collection<Task>(`tasks`).add(<Task>newTask)
  }

  update(task: Task) {
    return this.fs.collection<Task>(`tasks`).doc(`${task.id}`).set(task, {merge: true})
  }

  delete(task: Task) {
    return this.fs.collection<Task>(`tasks`).doc(`${task.id}`).delete()
  }
}
