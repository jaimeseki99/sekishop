import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICompra, ICompraPage, IProducto, IUsuario } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { AdminCompraDetailUnroutedComponent } from '../admin-compra-detail-unrouted/admin-compra-detail-unrouted.component';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-compra-plist-unrouted',
  templateUrl: './admin-compra-plist-unrouted.component.html',
  styleUrls: ['./admin-compra-plist-unrouted.component.css']
})
export class AdminCompraPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;
  @Input() id_producto: number = 0;

  oPage: ICompraPage | undefined;
  oUsuario: IUsuario | null = null;
  oProducto: IProducto | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 10, pageCount: 0};
  status: HttpErrorResponse | null = null;
  oCompraToRemove: ICompra | null = null;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oProductoAjaxService: ProductoAjaxService,
    private oCompraAjaxService: CompraAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit( 
  ) {
    this.getPage();
    if (this.id_usuario > 0) {
      this.getUsuario();
    }
    if (this.id_producto> 0) {
      this.getProducto();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oCompraAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_usuario, this.id_producto).subscribe({
      next: (data: ICompraPage) => {
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

  doView(compra: ICompra) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminCompraDetailUnroutedComponent, {
      data: {
        id: compra.id
      },
      header: 'Mostrando detalles de la compra',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(compra: ICompra) {
    this.oCompraToRemove = compra;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("Se ha eliminado la compra.", '', { duration: 2000 });
        this.oCompraAjaxService.removeOne(this.oCompraToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Ha habido un error a la hora de borrar la compra.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("Se ha cancelado la eliminación de la compra.", "", { duration: 2000 });
      }
    });
  }

  getUsuario(): void {
    this.oUsuarioAjaxService.getOne(this.id_usuario).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  getProducto(): void {
    this.oProductoAjaxService.getOne(this.id_producto).subscribe({
      next: (data: IProducto) => {
        this.oProducto = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }



  
}
