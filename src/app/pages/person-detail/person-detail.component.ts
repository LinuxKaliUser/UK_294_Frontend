import { Component, OnInit,ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/dataaccess/person';
import { PersonService } from 'src/app/service/person.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export default class PersonDetailComponent extends BaseComponent implements OnInit {
  person = new Person();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    task: new UntypedFormControl(''),
    dateSetting: new UntypedFormControl(''),
    remarks: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,protected override translate: TranslateService,  private formBuilder: UntypedFormBuilder,
    private personService: PersonService) {
      super(translate);
  }

   ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.personService.getOne(id).subscribe(obj => {
        this.person = obj;
        this.headerService.setPage('Person Edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('Person New');
      this.objForm = this.formBuilder.group(this.person);
    }
  }

  async back() {
    await this.router.navigate(['persons']);
  }


  async save(formData: any) {
    this.person = Object.assign(formData);

    if (this.person.id) {
      this.personService.update(this.person).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.personService.save(this.person).subscribe({
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





