import { NavbarModule } from './../../components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterModule } from '../../components/footer/footer.module';
import { BannerComponent } from '../../components/banner/banner.component';

@NgModule({
  declarations: [HeaderComponent, BannerComponent],
  imports: [CommonModule, NavbarModule, FooterModule],
  exports: [HeaderComponent],
})
export class SharedComponentsModule {}
