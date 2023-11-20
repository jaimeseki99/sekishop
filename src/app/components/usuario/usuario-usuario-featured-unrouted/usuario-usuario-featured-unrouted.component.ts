import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-usuario-usuario-featured-unrouted',
  templateUrl: './usuario-usuario-featured-unrouted.component.html',
  styleUrls: ['./usuario-usuario-featured-unrouted.component.css']
})
export class UsuarioUsuarioFeaturedUnroutedComponent implements OnInit {

  oPage: IUsuarioPage | undefined;
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUsuarioToRemove: IUsuario | null = null;

  @Output() usuarioClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oUsuarioAjaxService.getPageByComprasNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
      next: (data: IUsuarioPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
  })

}

  onUsuariolick(usuarioId: number) {
    this.usuarioClicked.emit(usuarioId);
  }

}
