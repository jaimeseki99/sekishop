import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUsername: string = "";
  oSessionUsuario: IUsuario | null = null;
  sUrl: string = "";

  constructor(
    private oSessionService: SessionAjaxService,
    private oUsuarioAjaxService: UsuarioAjaxService,
    private oDialogService: DialogService,
    private oRouter: Router
  ) { 

    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.sUrl = ev.url;
      }
    })
      
    this.strUsername = oSessionService.getUsername();
    this.oUsuarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oSessionUsuario = oUsuario;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUsername = this.oSessionService.getUsername();
          this.oUsuarioAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oSessionUsuario = oUsuario;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          })
        }
        if (data.type == 'logout') {
          this.strUsername = "";
        }
      }
    });
  }

}
