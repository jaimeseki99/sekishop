import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICompra, IProducto, formOperation } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario-compra-form-unrouted',
  templateUrl: './usuario-compra-form-unrouted.component.html',
  styleUrls: ['./usuario-compra-form-unrouted.component.css']
})
export class UsuarioCompraFormUnroutedComponent implements OnInit {

  compraForm!: FormGroup;
  oCompra: ICompra = { fecha: new Date(Date.now()), usuario: { id: 0}, producto: { id: 0 } } as ICompra;
  status: HttpErrorResponse | null = null;

  id: number = 0;
  id_producto: number = 0;
  operation: formOperation = 'NEW';

  constructor(
    private oFormBuilder: FormBuilder,
    private oCompraAjaxService: CompraAjaxService,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef,
    public oDynamicDialogConfig: DynamicDialogConfig
    
  ) { 
    if (oDynamicDialogConfig) {
      if (oDynamicDialogConfig.data) {
        if (oDynamicDialogConfig.data.id) {
          this.oCompra.id = oDynamicDialogConfig.data.id;
        } else {
          this.oCompra.id = 0;
        }
        if (oDynamicDialogConfig.data.id_producto) {
          this.oCompra.producto = { id: oDynamicDialogConfig.data.id_producto } as IProducto;
        } else {
          this.oCompra.producto = { } as IProducto;
        }
        if (oDynamicDialogConfig.data.operation) {
          this.operation = oDynamicDialogConfig.data.operation;
        } else {
          this.operation = 'NEW';
        }
      }
    }
    this.initializeForm(this.oCompra);
  }

  initializeForm(oCompra: ICompra) {
    this.compraForm = this.oFormBuilder.group({
      id: [oCompra.id],
      cantidad: [oCompra.cantidad, [Validators.required]],
      fecha: [new Date(oCompra.fecha), [Validators.required]],
      usuario: this.oFormBuilder.group({
        id: [oCompra.usuario.id, Validators.required]
      }),
      producto: this.oFormBuilder.group({
        id: [oCompra.producto.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oCompraAjaxService.getOne(this.oCompra.id).subscribe({
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
          this.oDynamicDialogRef.close(data);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("No se ha podido realizar la compra.", '', {duration: 2000});
        }
      });
    } else {
      this.oCompraAjaxService.updateOne(this.compraForm.value).subscribe({
        next: (data: ICompra) => {
          this.oCompra = data;
          this.initializeForm(this.oCompra);
          this.oMatSnackBar.open("Se han actualizado correctamente los datos de la compra.", '', {duration: 2000});
          this.oDynamicDialogRef.close(data);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Ha habido un error al modificar la compra.", '', {duration: 2000});
        }
      });
    }
  }
}

}
