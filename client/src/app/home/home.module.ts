import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import '@teamhive/lottie-player';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CarouselModule,
    NgbModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
