import { PaginatorState } from 'primeng/paginator';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProducto, IProductoPage, IUsuarioPage } from 'src/app/model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';

@Component({
  selector: 'app-producto-producto-featured-unrouted',
  templateUrl: './producto-producto-featured-unrouted.component.html',
  styleUrls: ['./producto-producto-featured-unrouted.component.css']
})
export class ProductoProductoFeaturedUnroutedComponent implements OnInit {

  oPage: IProductoPage | undefined;
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProductoToRemove: IProducto | null = null;


  constructor(
    private oProductoAjaxService: ProductoAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage():void {
    this.oProductoAjaxService.getPageByCompraDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
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


}
