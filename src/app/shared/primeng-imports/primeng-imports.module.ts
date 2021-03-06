import { NgModule } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    InputMaskModule,
    CalendarModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    PanelModule,
    ChartModule,
    MessagesModule,
    InputSwitchModule,
    SidebarModule,
    DialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimengImportsModule { }
