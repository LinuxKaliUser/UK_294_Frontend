import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { HeaderService } from 'src/app/service/header.service';
import {  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meal } from 'src/app/dataaccess/meal';
import { MealService } from 'src/app/service/meal.service';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent extends BaseComponent implements OnInit,AfterViewInit  {
 mealDataSource = new MatTableDataSource<Meal>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'designation', 'sequence','cost','dateSetting','remarks', 'actions'];

  constructor(private mealService:MealService, private dialog: MatDialog,
    private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar,
    protected override translate: TranslateService) {
    super(translate);
    this.headerService.setPage('Meals');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.mealDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.mealService.getList().subscribe(obj => {
      this.mealDataSource.data = obj;
    });
  }

  async edit(e:Meal) {
    await this.router.navigate(['meal', e.id]);
  }

  async add() {
    await this.router.navigate(['meal']);
  }

  delete(e:Meal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Meal deletion',
        message: 'Do you want this meal deleted?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.mealService.delete(e.id).subscribe({
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





