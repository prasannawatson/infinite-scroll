import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  data: any[] = [];
  page = 10;
  searchText="";
  loading = false;
  endOfData = false;

  header = [
    'id',
    'name', 'website', 'logo', 'address', 'zipcode']
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadData();
    this.setupScrollListener();
  }

  private loadData() {
    if (this.loading || this.endOfData) {
      return;
    }

    this.loading = true;
    const subPath = `api/data` 
    this.searchService.fetchData(subPath).subscribe(
      (response: any) => {
        this.data = [...this.data, ...response.data];
        this.page + 10;
        this.loading = true;
        if (response.data.length === 0) {
          this.endOfData = true;
        }
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  private setupScrollListener() {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      if (
        this.scrollContainer.nativeElement.scrollTop +
          this.scrollContainer.nativeElement.clientHeight >=
        this.scrollContainer.nativeElement.scrollHeight
      ) {
        this.loadData();
      }
    });
  }
}
