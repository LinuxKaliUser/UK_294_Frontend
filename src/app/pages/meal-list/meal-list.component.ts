import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent  extends BaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
