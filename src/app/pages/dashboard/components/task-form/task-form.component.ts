import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "src/app/services/task.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "src/app/models/task";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  statuses = [
    {
      label: 'To do',
      value: 'TODO'
    },
    {
      label: 'In progress',
      value: 'IN_PROGRESS'
    },
    {
      label: 'Done',
      value: 'DONE'
    }
  ]

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      status: [this.data?.status || null, Validators.required],
    });
  }

  onPostSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (!!this.data) {
      const updateData = {...this.form.value, id: this.data.id}
      this.taskService.update(updateData).then(() => {
        this.close()
      })
    } else {
      this.taskService.create(this.form.value).then(() => {
        this.close()
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
