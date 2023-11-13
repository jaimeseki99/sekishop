import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent },
  { path: 'logout', component: LogoutRoutedComponent},

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent },
  //{ path: 'admin/usuario/view/:id' },
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent },

  //{ path: 'admin/producto/plist' },
  //{ path: 'admin/producto/view/:id' },
  //{ path: 'admin/producto/new' },
  //{ path: 'admin/producto/edit/:id' },

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
