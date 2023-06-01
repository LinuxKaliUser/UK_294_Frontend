import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Task } from 'src/app/dataaccess/task';
import { HeaderService } from 'src/app/service/header.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent extends BaseComponent implements OnInit {

  task = new Task();
  public objForm = new UntypedFormGroup({
    designation: new UntypedFormControl(''),
    taskDuration: new UntypedFormControl(''),
    dateSetting: new UntypedFormControl(''),
    remarks: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,protected override translate: TranslateService,  private formBuilder: UntypedFormBuilder,
    private taskService: TaskService) {
      super(translate);
  }

   ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.taskService.getOne(id).subscribe(obj => {
        this.task = obj;
        this.headerService.setPage('Task Edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('Task New');
      this.objForm = this.formBuilder.group(this.task);
    }
  }

  async back() {
    await this.router.navigate(['tasks']);
  }


  async save(formData: any) {
    this.task = Object.assign(formData);

    if (this.task.id) {
      this.taskService.update(this.task).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.taskService.save(this.task).subscribe({
        next: () => {
          this.snackBar.open(this.messageNewSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageNewError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
