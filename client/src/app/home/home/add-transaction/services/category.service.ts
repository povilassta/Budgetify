import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories!: Category[];
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
}
