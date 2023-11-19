import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICompra, IProducto, IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { AdminProductoSelectionUnroutedComponent } from '../../producto/admin-producto-selection-unrouted/admin-producto-selection-unrouted.component';


@Component({
  providers: [DialogService],
  selector: 'app-admin-compra-form-unrouted',
  templateUrl: './admin-compra-form-unrouted.component.html',
  styleUrls: ['./admin-compra-form-unrouted.component.css']
})
export class AdminCompraFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  compraForm!: FormGroup;
  oCompra: ICompra = { fecha: new Date(Date.now()), usuario: {}, producto: {} } as ICompra;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private FormBuilder: FormBuilder,
    private oCompraAjaxService: CompraAjaxService,
    private router: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) { 
    this.initializeForm(this.oCompra);
  }

  initializeForm(oCompra: ICompra) {
    this.compraForm = this.FormBuilder.group({
      id: [oCompra.id],
      cantidad: [oCompra.cantidad, [Validators.required]],
      fecha: [new Date(oCompra.fecha), [Validators.required]],
      usuario: this.FormBuilder.group({
        id: [oCompra.usuario.id, Validators.required]
      }),
      producto: this.FormBuilder.group({
        id: [oCompra.producto.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oCompraAjaxService.getOne(this.id).subscribe({
        next: (data: ICompra) => {
          this.oCompra = data;
          this.initializeForm(this.oCompra);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al obtener la compra del servidor.", '', {duration: 2000});
        }
      });
    } else {
      this.initializeForm(this.oCompra);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.compraForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.compraForm.valid) {
      if (this.operation == 'NEW') {
        this.oCompraAjaxService.newOne(this.compraForm.value).subscribe({
          next: (data: ICompra) => {
            this.oCompra = { "usuario": {}, "producto": {} } as ICompra;
            this.initializeForm(this.oCompra);
            this.oMatSnackBar.open("Compra realizada con éxito.", '', { duration: 2000 });
            this.router.navigate(['/admin', 'compra', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Ha habido un fallo al realizar la compra", '', { duration: 2000});
          }
        });
      } else {
        this.oCompraAjaxService.updateOne(this.compraForm.value).subscribe({
          next: (data: ICompra) => {
            this.oCompra = data;
            this.initializeForm(this.oCompra);
            this.oMatSnackBar.open("Se han actualizado los datos de la compra", '', {duration: 2000});
            this.router.navigate(['/admin', 'compra', 'view', this.oCompra.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se ha podido actualizar la compra", '', { duration: 2000});
          }
        });
      }
    }
  }

  onShowUsuariosSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminUsuarioSelectionUnroutedComponent, {
      header: 'Seleccione un usuario',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    if (this.oDynamicDialogRef) {
    this.oDynamicDialogRef.onClose.subscribe((oUsuario: IUsuario) => {
      if (oUsuario) {
        this.oCompra.usuario = oUsuario;
        this.compraForm.controls['usuario'].patchValue({ id: oUsuario.id })
      }
    });
    }
  }

  onShowProductosSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminProductoSelectionUnroutedComponent, {
      header: 'Escoge el producto que deseas comprar',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    if (this.oDynamicDialogRef) {
    this.oDynamicDialogRef.onClose.subscribe((oProducto: IProducto) => {
      if (oProducto) {
        this.oCompra.producto = oProducto;
        this.compraForm.controls['producto'].patchValue({ id: oProducto.id })
      }
    });
  }
}

}
