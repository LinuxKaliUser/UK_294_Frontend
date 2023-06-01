import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Team } from 'src/app/dataaccess/team';
import { HeaderService } from 'src/app/service/header.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent extends BaseComponent implements OnInit,AfterViewInit {
  teamDataSource = new MatTableDataSource<Team>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'name','totalMembers', 'persons','remarks', 'actions'];

  constructor(private teamService: TeamService, private dialog: MatDialog,
    private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar,
    protected override translate: TranslateService) {
    super(translate);
    this.headerService.setPage('Teams');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.teamDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.teamService.getList().subscribe(obj => {
      this.teamDataSource.data = obj;
    });
  }

  async edit(e: Team) {
    await this.router.navigate(['team', e.id]);
  }

  async add() {
    await this.router.navigate(['team']);
  }

  delete(e: Team) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.teamService.delete(e.id).subscribe({
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

