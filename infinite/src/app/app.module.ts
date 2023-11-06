import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app.router.module';
import { AppComponent } from './app.component';
import { SearchService } from './shared/service/search.service';
import { TableComponent } from './table/table.component';
import { SharedModule } from './shared/shared-module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
  ],
  declarations: [AppComponent, TableComponent],
  providers: [HttpClient, SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
