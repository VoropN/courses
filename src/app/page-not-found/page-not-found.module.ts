import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './containers';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}
