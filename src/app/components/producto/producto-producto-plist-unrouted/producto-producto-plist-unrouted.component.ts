import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICompraPage, IProducto, IProductoPage, IUsuario } from 'src/app/model/model.interfaces';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';

@Component({
  selector: 'app-producto-producto-plist-unrouted',
  templateUrl: './producto-producto-plist-unrouted.component.html',
  styleUrls: ['./producto-producto-plist-unrouted.component.css']
})
export class ProductoProductoPlistUnroutedComponent implements OnInit {

  @Input() reload: Subject<boolean> = new Subject<boolean>();
  @Output() producto_selection = new EventEmitter<IProducto>();

  activeOrder: boolean = true; 
  activeProducto: IProducto | null = null;

  oPage: IProductoPage | undefined;
  oUsuario: IUsuario | null = null; // data of user if id_user is set for filter
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProductoToRemove: IProducto | null = null;
  ref: DynamicDialogRef | undefined;


  constructor(
    public oSessionService: SessionAjaxService,
    private oProductoAjaxService: ProductoAjaxService,
  ) { }

  ngOnInit() {
    this.reload.subscribe(response => {
      if (response) {
        if (this.activeOrder) {
          this.oProductoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
            next: (data: IProductoPage) => {
              this.oPage = data;
              this.oPaginatorState.pageCount = data.totalPages;
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
            }
          })
        } else {
          this.oProductoAjaxService.getPageByCompraDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
            next: (data: IProductoPage) => {
              this.oPage = data;
              this.oPaginatorState.pageCount = data.totalPages;
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
            }
          })
        }
      }
    });
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByComprasDesc();
    }
  }

  getPage(): void {
    this.oProductoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IProductoPage) => {
        this.oPage = data;
        if (this.oPage.content.length > 0) {
          this.activeProducto = this.oPage.content[0];
          this.producto_selection.emit(this.activeProducto);
        }
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByComprasDesc();
    }
  }

  doShowCompras(oThread: IProducto) {
    this.producto_selection.emit(oThread);
    this.activeProducto = oThread;
    return false;
  }

  onOrderChange(event: any) {
    this.activeOrder = !this.activeOrder;
    this.orderDirection = "desc";
    if (this.activeOrder) {
      this.getPage();
    } else {
      this.getPageByComprasDesc();
    }
  }

  getPageByComprasDesc(): void {
    this.oProductoAjaxService.getPageByCompraDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
      next: (data: IProductoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.activeProducto = this.oPage.content[0];
        this.producto_selection.emit(this.activeProducto);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
