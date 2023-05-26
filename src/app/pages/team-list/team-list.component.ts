import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
