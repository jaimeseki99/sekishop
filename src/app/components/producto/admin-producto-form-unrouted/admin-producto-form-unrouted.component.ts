import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProducto, formOperation } from 'src/app/model/model.interfaces';
import { ProductoAjaxService } from 'src/app/service/producto.ajax.service.service';

@Component({
  selector: 'app-admin-producto-form-unrouted',
  templateUrl: './admin-producto-form-unrouted.component.html',
  styleUrls: ['./admin-producto-form-unrouted.component.css']
})
export class AdminProductoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  productoForm!: FormGroup;
  oProducto: IProducto = {} as IProducto;
  status: HttpErrorResponse | null = null;


  constructor(
    private oFormBuilder: FormBuilder,
    private oProductoAjaxService: ProductoAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
    
  ) { 
    this.initializeForm(this.oProducto);
  }

  initializeForm(oProducto: IProducto) {
    this.productoForm = this.oFormBuilder.group({
      id: [oProducto.id],
      nombre: [oProducto.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      categoria: [oProducto.categoria, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      stock: [oProducto.stock, [Validators.required, Validators.pattern('^[0-9]+$')]],
      precio: [oProducto.precio, [Validators.required, Validators.pattern('^[0-9]+(\.[0.9]+)?$')]],
      descripcion: [oProducto.descripcion, [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oProductoAjaxService.getOne(this.id).subscribe({
        next: (data: IProducto) => {
          this.oProducto = data;
          this.initializeForm(this.oProducto);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al obtener los datos del producto", '', {duration: 2000});
        }
      })
    } else {
      this.initializeForm(this.oProducto);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.productoForm.valid) {
      if (this.operation == 'NEW') {
        this.oProductoAjaxService.newOne(this.productoForm.value).subscribe({
          next: (data: IProducto) => {
            this.oProducto = data;
            this.initializeForm(this.oProducto);
            this.oMatSnackBar.open("Se ha creado el producto.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'producto', 'view', this.oProducto]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create user.", '', { duration: 2000 });
          }
        })

      } else {
        this.oProductoAjaxService.updateOne(this.productoForm.value).subscribe({
          next: (data: IProducto) => {
            this.oProducto = data;
            this.initializeForm(this.oProducto);
            this.oMatSnackBar.open("Se ha actualizado el producto con éxito.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'producto', 'view', this.oProducto.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Ha habido un error al actualizar el producto.", '', { duration: 2000 });
          }
        })
      }
    }
  }
 
}