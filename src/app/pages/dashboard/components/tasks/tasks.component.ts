import { Component, Input } from '@angular/core';
import { Task } from "src/app/models/task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @Input() tasksData!: Task[];
  public displayedColumns: string[] = ['title', 'status', 'actions'];

  transformStatus(status:string): string{
    return status.replace('_',' ')
  }
}
