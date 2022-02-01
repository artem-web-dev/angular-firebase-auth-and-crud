import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TaskFormComponent } from "src/app/pages/dashboard/components";
import { TaskService } from "src/app/services/task.service";
import {Task} from "src/app/models/task";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  tasks!: (Task & { id: string; })[]

  constructor(public dialog: MatDialog, private tasksService: TaskService) {
  }

  ngOnInit() {
    this.tasksService.getAll().subscribe((tasks) => {
      this.tasks = tasks.filter((task) => task.userId === localStorage.getItem('uid'))
    })
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskFormComponent);
    dialogRef.afterClosed().subscribe();
  }

}
