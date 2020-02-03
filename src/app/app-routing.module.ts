import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import(`./auth/auth.module`).then(auth => auth.AuthModule) },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
