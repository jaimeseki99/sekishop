import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { AdminProductoViewRoutedComponent } from './components/producto/admin-producto-view-routed/admin-producto-view-routed.component';
import { AdminProductoEditRoutedComponent } from './components/producto/admin-producto-edit-routed/admin-producto-edit-routed.component';
import { AdminProductoNewRoutedComponent } from './components/producto/admin-producto-new-routed/admin-producto-new-routed.component';
import { AdminProductoPlistRoutedComponent } from './components/producto/admin-producto-plist-routed/admin-producto-plist-routed.component';
import { AdminCompraNewRoutedComponent } from './components/compra/admin-compra-new-routed/admin-compra-new-routed.component';
import { AdminCompraEditRoutedComponent } from './components/compra/admin-compra-edit-routed/admin-compra-edit-routed.component';
import { AdminCompraPlistRoutedComponent } from './components/compra/admin-compra-plist-routed/admin-compra-plist-routed.component';
import { AdminCompraViewRoutedComponent } from './components/compra/admin-compra-view-routed/admin-compra-view-routed.component';



const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent},

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent },
  { path: 'admin/usuario/view/:id', component: AdminUsuarioViewRoutedComponent},
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent },


  { path: 'admin/producto/plist', component: AdminProductoPlistRoutedComponent },
  { path: 'admin/producto/view/:id', component: AdminProductoViewRoutedComponent },
  { path: 'admin/producto/new', component: AdminProductoNewRoutedComponent },
  { path: 'admin/producto/edit/:id', component: AdminProductoEditRoutedComponent },

  { path: 'admin/compra/plist', component: AdminCompraPlistRoutedComponent },
  { path: 'admin/compra/plist/byusuario/:idusuario', component: AdminCompraPlistRoutedComponent},
  { path: 'admin/compra/plist/byproducto/:idproducto', component: AdminCompraPlistRoutedComponent},
  { path: 'admin/compra/view/:id', component: AdminCompraViewRoutedComponent},
  { path: 'admin/compra/new', component: AdminCompraNewRoutedComponent },
  { path: 'admin/compra/edit/:id', component: AdminCompraEditRoutedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
