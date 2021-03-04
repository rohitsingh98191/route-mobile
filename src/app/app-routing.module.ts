import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from './guard/protected.guard'

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {path:'',pathMatch:'full',redirectTo:'login'},
 { path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule),canActivate:[ProtectedGuard] },
 {path:"**",redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
