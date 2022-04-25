import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CategoryPost } from 'src/app/models/category-post.model';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories!: Category[];
  public isExpenseFilter: boolean = false;
  public isIncomeFilter: boolean = false;
  private BASE_URL: string = 'http://localhost:3000/categories/';
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get(this.BASE_URL).pipe(
      tap({
        next: (res: any) => {
          this.categories = res;
        },
      })
    );
  }

  public insertCategory(data: CategoryPost): Observable<any> {
    return this.http.post(this.BASE_URL, data);
  }

  public updateCategory(name: string, categoryId: string): Observable<any> {
    return this.http.patch(`${this.BASE_URL}${categoryId}`, {
      name,
    });
  }

  public deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${categoryId}`);
  }

  private filterHelper(type: string): Category[] {
    type === 'income'
      ? (this.isExpenseFilter = false)
      : (this.isIncomeFilter = false);
    if (type === 'income' ? this.isIncomeFilter : this.isExpenseFilter) {
      type === 'income'
        ? (this.isIncomeFilter = false)
        : (this.isExpenseFilter = false);
      return this.categories;
    } else {
      type === 'income'
        ? (this.isIncomeFilter = true)
        : (this.isExpenseFilter = true);
      return this.categories.filter((c) => c.type === type);
    }
  }

  public filterCategories(type?: string): Category[] {
    if (!type) {
      this.isIncomeFilter = false;
      this.isExpenseFilter = false;
      return this.categories;
    } else {
      return this.filterHelper(type);
    }
  }
}
