import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Team } from 'src/app/dataaccess/team';
import { HeaderService } from 'src/app/service/header.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent extends BaseComponent implements OnInit {
  team = new Team();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    totalMembers: new UntypedFormControl(''),
    person: new UntypedFormControl(''),
    remarks: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,protected override translate: TranslateService,  private formBuilder: UntypedFormBuilder,
    private teamService: TeamService) {
      super(translate);
  }

   ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.teamService.getOne(id).subscribe(obj => {
        this.team = obj;
        this.headerService.setPage('Team Edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('Team New');
      this.objForm = this.formBuilder.group(this.team);
    }
  }

  async back() {
    await this.router.navigate(['teams']);
  }


  async save(formData: any) {
    this.team = Object.assign(formData);

    if (this.team.id) {
      this.teamService.update(this.team).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.teamService.save(this.team).subscribe({
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

