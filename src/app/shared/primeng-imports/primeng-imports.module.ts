import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ToolbarModule,
    ButtonModule,
    TieredMenuModule
  ],
  exports: [
    ToolbarModule,
    ButtonModule,
    TieredMenuModule
  ]
})
export class PrimengImportsModule { }
