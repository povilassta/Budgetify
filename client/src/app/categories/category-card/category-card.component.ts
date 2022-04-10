import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.sass'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;

  constructor() {}

  ngOnInit(): void {}
}
