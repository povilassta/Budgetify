import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryService } from '../home/home/add-transaction/services/category.service';
import { Category } from '../models/category.model';
import { SearchFilterPipe } from '../search-filter.pipe';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [SearchFilterPipe],
})
export class CategoriesComponent implements OnInit {
  public categories!: Category[];
  public value: string = '';

  public trackBy(index: number, item: Category): string {
    return item._id;
  }

  constructor(
    public categoryService: CategoryService,
    public searchFilter: SearchFilterPipe
  ) {}

  public filterCategories(type?: string): void {
    this.categories = this.categoryService.filterCategories(type);
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.categories = data),
      });
  }
}
