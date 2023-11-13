import { Component, Input, OnInit } from '@angular/core';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsuarioDetailUnroutedComponent } from '../admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-usuario-plist-unrouted',
  templateUrl: './admin-usuario-plist-unrouted.component.html',
  styleUrls: ['./admin-usuario-plist-unrouted.component.css']
})
export class AdminUsuarioPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IUsuarioPage | undefined;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  oUsuarioAEliminar: IUsuario | null = null;
  
  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oUsuarioAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IUsuarioPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error : (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    if (this.orderDirection === 'asc') {
      this.orderDirection = 'desc';
    } else {
      this.orderDirection = 'asc';
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(usuario: IUsuario) {
    this.ref = this.oDialogService.open(AdminUsuarioDetailUnroutedComponent, {
      data: {
        id: usuario.id
      },
      header: 'Detalle de usuario',
      width: '70%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(usuario: IUsuario) {
    this.oUsuarioAEliminar = usuario;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open('Se ha eliminado el usuario', '', {duration: 2000});
        this.oUsuarioAjaxService.removeOne(this.oUsuarioAEliminar?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error : (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error al eliminar el usuario', '', {duration: 2000});
          }
    });
    },
    reject: (type: ConfirmEventType) => {
      this.oMatSnackBar.open('No se ha eliminado el usuario', '', {duration: 2000});
  }
});
  }

}
