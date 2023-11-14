import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-admin-usuario-form-unrouted',
  templateUrl: './admin-usuario-form-unrouted.component.html',
  styleUrls: ['./admin-usuario-form-unrouted.component.css']
})
export class AdminUsuarioFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  userForm!: FormGroup
  oUsuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;


  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oUsuario);
   }

   initializeForm(oUsuario: IUsuario) {
    this.userForm = this.oFormBuilder.group({
      id: [oUsuario.id],
      nombre: [oUsuario.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido: [oUsuario.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      username: [oUsuario.username, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: [oUsuario.email, [Validators.required, Validators.email]],
      direccion: [oUsuario.direccion, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      telefono: [oUsuario.telefono,  [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      saldo: [oUsuario.saldo, [Validators.required]],
      rol: [oUsuario.rol, [Validators.required]],
    })
   }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.oUsuarioAjaxService.getOne(this.id).subscribe({
        next: (data: IUsuario) => {
          this.oUsuario = data;
          this.initializeForm(this.oUsuario);
        },
        error : (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open('Error al obtener el usuario', '', {duration: 2000});
        }
      })
    } else {
      this.initializeForm(this.oUsuario);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
   }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.operation === 'NEW') {
        this.oUsuarioAjaxService.newOne(this.userForm.value).subscribe({
          next: (data: IUsuario) => {
            this.oUsuario = data;
            this.initializeForm(this.oUsuario);
            this.oMatSnackBar.open('Usuario creado correctamente', '', {duration: 2000});
            this.oRouter.navigate(['/admin', 'usuario', 'view', this.oUsuario]);
          },
          error : (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error al crear el usuario', '', {duration: 2000});
          }
        })
      } else {
        this.oUsuarioAjaxService.updateOne(this.userForm.value).subscribe({
          next: (data: IUsuario) => {
            this.oUsuario = data;
            this.initializeForm(this.oUsuario);
            this.oMatSnackBar.open('Usuario actualizado correctamente', '', {duration: 2000});
            this.oRouter.navigate(['/admin/usuario']);
          },
          error : (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error al actualizar el usuario', '', {duration: 2000});
          }
        })
      }
    }

  }
}
