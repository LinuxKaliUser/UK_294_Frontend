import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { HeaderService } from 'src/app/service/header.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,protected override translate: TranslateService,  private formBuilder: UntypedFormBuilder,
    private taskService: TaskService) {
      super(translate);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  async back() {
    await this.router.navigate(['tasks']);
  }
}
