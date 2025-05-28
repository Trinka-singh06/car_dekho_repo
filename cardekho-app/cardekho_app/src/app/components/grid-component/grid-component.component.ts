import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEventArgs, FilterService, GridComponent, GridModule, GroupService, PageService, PageSettingsModel, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridService } from '../../services/grid.service';

@Component({
  selector: 'app-grid-component',
  standalone: true,
  imports: [GridModule, HttpClientModule, FormsModule, CommonModule],
  providers: [PageService, GridService,
    SortService,
    ToolbarService,
    FilterService,
    GroupService],
  templateUrl: './grid-component.component.html',
  styleUrl: './grid-component.component.css'
})

export class GridComponentComponent implements OnInit {
@ViewChild('grid') public grid!: GridComponent;

  data: any[] = [];
  total: number = 0;
  pageSize = 10;
  currentPage = 1;

  // Declare and bind once
  public pageSettings: PageSettingsModel = {
    pageSize: this.pageSize,
    pageSizes: [5, 10, 20, 50],
    currentPage: this.currentPage
  };

  constructor(private gridService: GridService) { }

  ngOnInit() {
    this.loadData(this.currentPage, this.pageSize);
  }

  onDataBound(): void {
    if (this.grid) {
      this.grid.pageSettings.totalRecordsCount = this.total;
    }
  }

  onActionBegin(args: any): void {
    if (args.requestType === 'paging') {
      const newPage = args.currentPage || 1;
      const newPageSize = args.pageSize || this.pageSize;

      console.log('Page change:', newPage, 'Size:', newPageSize);

      this.currentPage = newPage;
      this.pageSize = newPageSize;

      // Stop grid default paging behavior
      args.cancel = true;
      this.loadData(this.currentPage, this.pageSize);
    }
  }

  loadData(page: number, pageSize: number): void {
    this.gridService.getData(page, pageSize).subscribe((res) => {
      const records = res.data?.result || res.data || [];
      const count = res.data?.count || res.total || 0;

      this.data = records;
      this.total = count;

      if (this.grid) {
        this.grid.dataSource = this.data;
        this.grid.pageSettings.totalRecordsCount = this.total;

      }
    });
  }
}