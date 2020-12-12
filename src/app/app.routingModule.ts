import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { IsAuthUser } from './guards/IsAuthUser.guard';

const routes:Routes=[{path: '', redirectTo: '/login', pathMatch:'full'},
{path:'products',component:ProductsComponent,canActivate:[IsAuthUser]},
{path: 'login', component:LoginComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule{

}