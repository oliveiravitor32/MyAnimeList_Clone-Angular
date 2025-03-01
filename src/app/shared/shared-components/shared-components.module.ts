import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { BannerComponent } from '../../components/banner/banner.component';

import { NavbarModule } from './../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';

import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent, BannerComponent],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    NgOptimizedImage,
    FontAwesomeModule,
  ],
  exports: [HeaderComponent, NavbarModule],
})
export class SharedComponentsModule {}
