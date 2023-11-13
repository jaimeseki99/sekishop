import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-admin-usuario-plist-routed',
  templateUrl: './admin-usuario-plist-routed.component.html',
  styleUrls: ['./admin-usuario-plist-routed.component.css']
})
export class AdminUsuarioPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  
  constructor(
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oMatSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oUsuarioAjaxService.generateRandom(amount).subscribe({
      next: (data: any) => {
        this.bLoading = false;
        this.oMatSnackBar.open('Usuarios generados con éxito', '', {duration: 2000});
      },
      error : (error: HttpErrorResponse) => {
        this.bLoading = false;
        this.oMatSnackBar.open('Error al generar usuarios', '', {duration: 2000});
      }
    })
  }

  doEmpty() {
    this.oUsuarioAjaxService.empty().subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open('Usuarios eliminados con éxito', '', {duration: 2000});
        this.forceReload.next(true);
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open('Error al eliminar usuarios', '', {duration: 2000});
        this.bLoading = false;
      },
  })
}

}
