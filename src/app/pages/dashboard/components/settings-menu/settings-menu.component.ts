import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TaskFormComponent } from "src/app/pages/dashboard/components";
import { TaskService } from "src/app/services/task.service";
import { Task} from "src/app/models/task";

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  @Input() data!: Task

  constructor(private dialog: MatDialog, private tasksService: TaskService) {
  }


  editTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {data: this.data})
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteTask() {
    this.tasksService.delete(this.data)
  }


}
