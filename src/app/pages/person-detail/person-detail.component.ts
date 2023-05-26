import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
