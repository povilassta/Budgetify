import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
})
export class MainModule {}
