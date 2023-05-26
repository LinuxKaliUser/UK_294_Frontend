import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
