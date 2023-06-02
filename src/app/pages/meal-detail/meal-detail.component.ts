import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Meal } from 'src/app/dataaccess/meal';
import { HeaderService } from 'src/app/service/header.service';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent extends BaseComponent implements OnInit {
  meal = new Meal();
  public objForm = new UntypedFormGroup({
    designation: new UntypedFormControl(''),
    cost: new UntypedFormControl(0.0),
    dateSetting: new UntypedFormControl(''),
    remarks: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,protected override translate: TranslateService,  private formBuilder: UntypedFormBuilder,
    private mealService: MealService) {
      super(translate);
  }

   ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.mealService.getOne(id).subscribe(obj => {
        this.meal = obj;
        this.headerService.setPage('Meal edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('Meal new');
      this.objForm = this.formBuilder.group(this.meal);
    }
  }

  async back() {
    await this.router.navigate(['meals']);
  }


  async save(formData: any) {
    this.meal = Object.assign(formData);

    if (this.meal.id) {
      this.mealService.update(this.meal).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.mealService.save(this.meal).subscribe({
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
