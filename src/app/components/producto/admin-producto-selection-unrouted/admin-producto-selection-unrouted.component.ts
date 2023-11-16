import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IProducto, IProductoPage } from 'src/app/model/model.interfaces';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';

@Component({
  selector: 'app-admin-producto-selection-unrouted',
  templateUrl: './admin-producto-selection-unrouted.component.html',
  styleUrls: ['./admin-producto-selection-unrouted.component.css']
})
export class AdminProductoSelectionUnroutedComponent implements OnInit {

  oPage: IProductoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProductoToRemove: IProducto | null = null;

  constructor(
    private oProductoAjaxService: ProductoAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }


  getPage(): void {
    this.oProductoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({    
      next: (data: IProductoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  onSelectProducto(oProducto: IProducto) {
    this.oDynamicDialogRef.close(oProducto);
  }

}
