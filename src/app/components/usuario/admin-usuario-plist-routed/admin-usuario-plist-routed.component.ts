import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { RouterModule } from '@angular/router';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-usuario-plist-routed',
  templateUrl: './admin-usuario-plist-routed.component.html',
  styleUrls: ['./admin-usuario-plist-routed.component.css']
})
export class AdminUsuarioPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oUsuarioAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " usuarios", '', {duration: 2000});
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Ha habido un problema al generar usuarios: " + oError.message, '', {duration: 2000});
        this.bLoading = false;
      }
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Estás seguro de eliminar todos los usuarios?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oUsuarioAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " usuarios", '', {duration: 2000});
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Ha habido un problema al eliminar los usuarios: " + oError.message, '', {duration: 2000});
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Borrado cancelado", '', {duration: 2000});
      }
    });
  }

}
