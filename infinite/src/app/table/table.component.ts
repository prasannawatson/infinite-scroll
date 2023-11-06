import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../shared/modules/data-table/data-table.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(DataTableComponent)
  dataTable: any = DataTableComponent;
  constructor() {}

  ngOnInit() {}
}
