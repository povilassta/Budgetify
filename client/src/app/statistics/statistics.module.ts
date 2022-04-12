import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, SharedModule, HomeModule],
})
export class StatisticsModule {}
