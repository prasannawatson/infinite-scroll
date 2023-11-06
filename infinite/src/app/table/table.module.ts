import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from '../shared/modules/data-table/data-table.module';

/**
 * @type {*}
 * Routes
 */
const routes: Routes = [{ path: '', component: TableComponent }];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class TableModule {}
