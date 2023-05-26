import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Person } from 'src/app/dataaccess/person';
import { HeaderService } from 'src/app/service/header.service';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent extends BaseComponent implements OnInit,AfterViewInit {
  personDataSource = new MatTableDataSource<Person>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'name', 'sequence','task','date setting','remarks'];

  constructor(private personService: PersonService, private dialog: MatDialog,
    private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar,
    protected override translate: TranslateService) {
    super(translate);
    this.headerService.setPage('nav.person');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.personDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.personService.getList().subscribe(obj => {
      this.personDataSource.data = obj;
    });
  }

  async edit(e: Person) {
    await this.router.navigate(['person', e.id]);
  }

  async add() {
    await this.router.navigate(['person']);
  }

  delete(e: Person) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.personService.delete(e.id).subscribe({
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
