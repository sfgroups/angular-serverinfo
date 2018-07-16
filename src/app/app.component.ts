import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridNg2;
    private gridApi;
    private gridColumnApi;

    title = 'app';

    columnDefs = [
        {headerName: 'Host Name', field: 'hostname', checkboxSelection: false },
        {headerName: 'FQDN', field: 'fqdn' },
        {headerName: 'IP', field: 'ip'},
        {headerName: 'Domain', field: 'domain'},
        {headerName: 'Application', field: 'application'},
        {headerName: 'CPU', field: 'cpu'},
        {headerName: 'Memory', field: 'memory'},
        {headerName: 'Owner', field: 'owner'}

    ];

    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {      
        this.rowData = this.http.get(' http://localhost:4200/assets/servers5.json');      
    }
    onBtExport() {
      var params = {        
        allColumns: 1,       
      };      
      this.gridApi.exportDataAsCsv(params);
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
      
    }
  }

  function getBooleanValue(cssSelector) {
    return document.querySelector(cssSelector).checked === true;
  }
