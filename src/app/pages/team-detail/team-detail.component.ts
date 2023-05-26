import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
