import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../dialogs/add-edit-product/add-edit-product.component';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { MDProduct } from '../models/MDProduct.model';
@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  OpenAddEditProduct(data: MDProduct) {
    return this.dialog.open(AddEditProductComponent, {
      width: '35%',
      height: 'max-height',
      panelClass:'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  openConfirmDelete(message:string){
      return this.dialog.
      open(ConfirmDeleteComponent,{
          width:'30%',
          height:'max-height',
          panelClass:'custome-mat-card',
          disableClose:true,
          data:{
              message:message
          }
      });
  }
}
