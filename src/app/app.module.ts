import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

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
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { AdminUsuarioFormUnroutedComponent } from './components/usuario/admin-usuario-form-unrouted/admin-usuario-form-unrouted.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioDetailUnroutedComponent } from './components/usuario/admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { PaginatorModule } from 'primeng/paginator';
import { AdminUsuarioSelectionUnroutedComponent } from './components/usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioPlistUnroutedComponent } from './components/usuario/admin-usuario-plist-unrouted/admin-usuario-plist-unrouted.component';
import { AdminProductoDetailUnroutedComponent } from './components/producto/admin-producto-detail-unrouted/admin-producto-detail-unrouted.component';
import { AdminProductoViewRoutedComponent } from './components/producto/admin-producto-view-routed/admin-producto-view-routed.component';
import { AdminProductoEditRoutedComponent } from './components/producto/admin-producto-edit-routed/admin-producto-edit-routed.component';
import { AdminProductoFormUnroutedComponent } from './components/producto/admin-producto-form-unrouted/admin-producto-form-unrouted.component';
import { AdminProductoNewRoutedComponent } from './components/producto/admin-producto-new-routed/admin-producto-new-routed.component';
import { AdminProductoPlistRoutedComponent } from './components/producto/admin-producto-plist-routed/admin-producto-plist-routed.component';
import { AdminProductoPlistUnroutedComponent } from './components/producto/admin-producto-plist-unrouted/admin-producto-plist-unrouted.component';
import { AdminProductoSelectionUnroutedComponent } from './components/producto/admin-producto-selection-unrouted/admin-producto-selection-unrouted.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [		
    AppComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    MenuUnroutedComponent,
    HomeRoutedComponent,
    AdminUsuarioFormUnroutedComponent,
    AdminUsuarioDetailUnroutedComponent,
    AdminUsuarioEditRoutedComponent,
    AdminUsuarioNewRoutedComponent,
    AdminUsuarioSelectionUnroutedComponent,
    AdminUsuarioViewRoutedComponent,
    AdminUsuarioPlistRoutedComponent,
    AdminUsuarioPlistUnroutedComponent,
    AdminProductoDetailUnroutedComponent,
    AdminProductoSelectionUnroutedComponent,
    AdminProductoViewRoutedComponent,
    AdminProductoEditRoutedComponent,
    AdminProductoFormUnroutedComponent,
    AdminProductoNewRoutedComponent,
    AdminProductoPlistRoutedComponent,
    AdminProductoPlistUnroutedComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    DynamicDialogModule,
    PaginatorModule,
    HttpClientModule,
    RouterModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  providers: [
    UsuarioAjaxService,
    ProductoAjaxService,
    CompraAjaxService,
    SessionAjaxService,
    MatSnackBar,
    DialogService,
    CryptoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
