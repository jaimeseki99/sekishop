import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICompra } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';

@Component({
  selector: 'app-usuario-compra-detail-unrouted',
  templateUrl: './usuario-compra-detail-unrouted.component.html',
  styleUrls: ['./usuario-compra-detail-unrouted.component.css']
})
export class UsuarioCompraDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oCompra: ICompra = { usuario: {}, producto: {} } as ICompra;
  status: HttpErrorResponse | null = null;

  constructor(
    private oCompraAjaxService: CompraAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
      this.id = config.data.id;
        }
      }
   }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oCompraAjaxService.getOne(this.id).subscribe({
      next: (data: ICompra) => {
        this.oCompra = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
