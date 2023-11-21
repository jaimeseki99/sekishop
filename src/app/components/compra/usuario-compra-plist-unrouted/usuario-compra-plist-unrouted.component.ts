import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ICompra, ICompraPage, IProducto, IUsuario } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { AdminCompraDetailUnroutedComponent } from '../admin-compra-detail-unrouted/admin-compra-detail-unrouted.component';
import { UsuarioCompraFormUnroutedComponent } from '../usuario-compra-form-unrouted/usuario-compra-form-unrouted.component';

@Component({
  providers: [ConfirmationService],
  selector: 'app-usuario-compra-plist-unrouted',
  templateUrl: './usuario-compra-plist-unrouted.component.html',
  styleUrls: ['./usuario-compra-plist-unrouted.component.css']
})
export class UsuarioCompraPlistUnroutedComponent implements OnInit {

  @Input()
  set id_usuario(value: number) {
    if (value) {
      this.id_usuario_filter = value;
    } else {
      this.id_usuario_filter = 0;
    }
    this.getPage();
  }
  get id_usuario(): number {
    return this.id_usuario_filter;
  }

  @Input() 
  set id_producto(value: number) {
    if (value) {
      this.id_producto_filter = value;
    } else {
      this.id_producto_filter = 0;
    }
    this.getPage();
  }
  get id_producto(): number {
    return this.id_producto_filter;
  }

  @Output() compra_change = new EventEmitter<Boolean>();

  id_usuario_filter: number = 0;
  id_producto_filter: number = 0;

  oPage: ICompraPage | undefined;
  oUsuario: IUsuario | null = null;
  oProducto: IProducto | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oCompraToRemove: ICompra | null = null;
  

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    public oSesionAjaxService: SessionAjaxService,
    private oProductoAjaxService: ProductoAjaxService,
    private oCompraAjaxService: CompraAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_usuario > 0) {
      this.getUsuario();
    }
    if (this.id_producto > 0) {
      this.getProducto();
    }
  }

  getPage(): void {
    this.oCompraAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_usuario_filter, this.id_producto_filter).subscribe({
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

  ref: DynamicDialogRef | undefined;

  doView(compra: ICompra) {
    this.ref = this.oDialogService.open(AdminCompraDetailUnroutedComponent, {
      data: {
        id: compra.id
      },
      header: "Detalle de la compra",
      width: "50%",
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: false
    })
  }

  doRemove(compra: ICompra) {
    this.oCompraToRemove = compra;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("Se ha cancelado la compra.", '', { duration: 2000 });
        this.oCompraAjaxService.removeOne(this.oCompraToRemove?.id).subscribe({
          next: () => {
            this.getPage();
            this.compra_change.emit(true);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se ha podido cancelar la compra.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("No se ha podido cancelar la compra.", "", { duration: 2000 });
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

  realizarNuevaCompra(): void {
    if (this.id_producto_filter > 0 && this.oSesionAjaxService.isSessionActive()) {
      this.ref = this.oDialogService.open(UsuarioCompraFormUnroutedComponent, {
        data: {
          id_usuario: this.id_usuario_filter,
          id_producto: this.id_producto_filter,
        },
        header: "Nueva compra",
        width: "50%",
        contentStyle: { "overflow": "auto" },
        baseZIndex: 10000,
        maximizable: false
      });

      this.ref.onClose.subscribe((nuevaCompra: number) => {
        this.getPage();
        this.compra_change.emit(true);
    });
  }
}

}
