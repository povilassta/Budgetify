import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories!: Category[];
  public isExpenseFilter: boolean = false;
  public isIncomeFilter: boolean = false;
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get('http://localhost:3000/categories').pipe(
      tap({
        next: (res: any) => {
          this.categories = res;
        },
      })
    );
  }

  public filterCategories(type?: string): Category[] {
    if (!type) {
      this.isIncomeFilter = false;
      this.isExpenseFilter = false;
      return this.categories;
    } else if (type === 'income') {
      this.isExpenseFilter = false;
      if (this.isIncomeFilter) {
        this.isIncomeFilter = false;
        return this.categories;
      } else {
        this.isIncomeFilter = true;
        return this.categories.filter((c) => c.type === 'income');
      }
    } else if (type === 'expense') {
      this.isIncomeFilter = false;
      if (this.isExpenseFilter) {
        this.isExpenseFilter = false;
        return this.categories;
      } else {
        this.isExpenseFilter = true;
        return this.categories.filter((c) => c.type === 'expense');
      }
    } else {
      return this.categories;
    }
  }
}
