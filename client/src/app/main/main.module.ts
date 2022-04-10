import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../home/home/home.component';
import { HomeModule } from '../home/home.module';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesModule } from '../categories/categories.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    LayoutModule,
    HomeModule,
    CategoriesModule,
  ],
})
export class MainModule {}
