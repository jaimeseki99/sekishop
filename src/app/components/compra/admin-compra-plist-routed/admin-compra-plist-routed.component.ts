import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-compra-plist-routed',
  templateUrl: './admin-compra-plist-routed.component.html',
  styleUrls: ['./admin-compra-plist-routed.component.css']
})
export class AdminCompraPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_usuario: number;
  id_producto: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCompraAjaxService: CompraAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { 
    this.id_usuario = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idusuario") ?? "0");
    this.id_producto = parseInt(this.oActivatedRoute.snapshot.paramMap.get("idproducto") ?? "0");
  }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oCompraAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " compras", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Se ha producido un error al generar las compras: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: '¿Estás seguro de eliminar todas las compras?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oCompraAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " compras", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al eliminar las compras: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Se ha cancelado la eliminación de las compras", '', { duration: 2000 });
      }
    });
  }

}
