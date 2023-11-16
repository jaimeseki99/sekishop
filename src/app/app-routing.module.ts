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



const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent},

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent },
  { path: 'admin/usuario/view/:id', component: AdminUsuarioViewRoutedComponent},
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent },

  { path: 'producto/plist', component: AdminProductoPlistRoutedComponent},

  { path: 'admin/producto/plist', component: AdminProductoPlistRoutedComponent },
  { path: 'admin/producto/view/:id', component: AdminProductoViewRoutedComponent },
  { path: 'admin/producto/new', component: AdminProductoNewRoutedComponent },
  { path: 'admin/producto/edit/:id', component: AdminProductoEditRoutedComponent }

  //{ path: 'admin/compra/plist' },
  //{ path: 'admin/compra/byuser/:iduser'},
  //{ path: 'admin/compra/byproducto/:idproducto'},
  //{ path: 'admin/compra/view/:id' },
  //{ path: 'admin/compra/add' },
  //{ path: 'admin/compra/edit/:id'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
