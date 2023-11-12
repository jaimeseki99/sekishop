import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioAjaxService } from './service/usuario.ajax.service.service';
import { ProductoAjaxService } from './service/producto.ajax.service.service';
import { CompraAjaxService } from './service/compra.ajax.service.service';
import { SessionAjaxService } from './service/session.ajax.service.ts.service';
import { CryptoService } from './service/crypto.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [		
    AppComponent,
    LoginRoutedComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    UsuarioAjaxService,
    ProductoAjaxService,
    CompraAjaxService,
    SessionAjaxService,
    CryptoService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
