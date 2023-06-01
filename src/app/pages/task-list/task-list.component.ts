import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Task } from 'src/app/dataaccess/task';
import { HeaderService } from 'src/app/service/header.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends BaseComponent implements OnInit {
  taskDataSource = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'designation', 'sequence','taskDuration','date setting','remarks'];

  constructor(private taskService: TaskService, private dialog: MatDialog,
    private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar,
    protected override translate: TranslateService) {
    super(translate);
    this.headerService.setPage('nav.tasks');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    if (this.paginator) {
      this.taskDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.taskService.getList().subscribe(obj => {
      this.taskDataSource.data = obj;
    });
  }

  async edit(e: Task) {
    await this.router.navigate(['task', e.id]);
  }

  async add() {
    await this.router.navigate(['task']);
  }

  delete(e: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.taskService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open(this.deletedMessage, this.closeMessage, {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000});
            }
          },
          error: () => this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000})
        });
      }
    });
  }
}

