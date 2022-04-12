import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';
import { Category } from 'src/app/models/category.model';

@UntilDestroy()
@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.sass'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;
  public isEditingMode: boolean = false;
  public categoryName!: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.categoryName = this.category.name;
  }

  public updateCategory(): void {
    this.isEditingMode = false;
    this.categoryService
      .updateCategory(this.categoryName, this.category._id)
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/categories']);
          });
      });
  }
}
