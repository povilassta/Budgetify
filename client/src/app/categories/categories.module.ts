import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryCardComponent, AddCategoryComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class CategoriesModule {}
