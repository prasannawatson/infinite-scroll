import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from './modules/data-table/data-table.component';
import { PipeModule } from "./pipes/pipes.module";

/**
 * For declaration of components
 */
const components: any = [DataTableComponent];

/**
 * For declaration of directives
 */
const directives: any = [];

/**
 * To handle all the module imports
 */

/**
 * To handle all the declarations, imports and exports
 */
@NgModule({
    declarations: [components, ...directives],
    exports: [components, ...directives],
    imports: [CommonModule, RouterModule, FormsModule, PipeModule]
})
export class SharedModule {}
