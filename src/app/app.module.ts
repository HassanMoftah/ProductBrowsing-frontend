import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { AppRoutingModule } from './app.routingModule';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { AddEditProductComponent } from './dialogs/add-edit-product/add-edit-product.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Interceptor} from '../app/services/interceptor.service';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [AppComponent, LoginComponent, ProductsComponent, AddEditProductComponent, ConfirmDeleteComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,MatProgressSpinnerModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      maxOpened: 10,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
  ],
  providers: [DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:Interceptor,
    multi:true
}],
  bootstrap: [AppComponent],
})
export class AppModule {}
