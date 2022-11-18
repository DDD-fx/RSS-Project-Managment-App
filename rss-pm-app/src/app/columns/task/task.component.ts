import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../api/models/api-board.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public tasks: ITask[] = [];

  // constructor() {}

  ngOnInit(): void {
    console.log(this.tasks);
  }
}
