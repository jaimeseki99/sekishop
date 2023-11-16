import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProducto } from 'src/app/model/model.interfaces';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';

@Component({
  selector: 'app-admin-producto-detail-unrouted',
  templateUrl: './admin-producto-detail-unrouted.component.html',
  styleUrls: ['./admin-producto-detail-unrouted.component.css']
})
export class AdminProductoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oProducto: IProducto = {} as IProducto;
  status: HttpErrorResponse | null = null;

  constructor(
    private oProducoAjaxService: ProductoAjaxService,
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
    this.oProducoAjaxService.getOne(this.id).subscribe({
      next: (data: IProducto) => {
        this.oProducto = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
