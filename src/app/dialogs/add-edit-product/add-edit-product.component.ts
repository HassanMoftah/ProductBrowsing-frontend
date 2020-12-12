import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MDProduct } from 'src/app/models/MDProduct.model';
import { ProductService } from 'src/app/services/ProductService.service';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  title: string = 'Add New Product';
  IsEditMode: boolean = false;
  Proccessing: boolean = false;
  product: MDProduct;
  Image:any=null;
  constructor(private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,private productSRV:ProductService,
    public dialogRef: MatDialogRef<AddEditProductComponent>
  ) {}

  ngOnInit(): void {
    this.product = this.data.Value;
    if (this.product.Id > 0) {
      this.IsEditMode = true;
      this.title = 'Update Product';
    }
  }

  save() {
    this.Proccessing=true;
    let newimage=new FormData();
    newimage.append("Image",this.Image);
    if(this.IsEditMode){
      this.Update(newimage);
    }
    else{
      this.Add(newimage);
    }
  }

  Add(data) {
     this.productSRV.add(this.product).subscribe(res=>{
        if(this.Image==null){this.dialogRef.close(res);}
        else{
          this.UploadImage(data,res.Id);
        }
     },err=>{
       this.toastr.error("Bad Request");
       this.dialogRef.close(false);
     });
  }

  Update(data) {
    this.productSRV.update(this.product).subscribe(res=>{
      if(this.Image==null){this.dialogRef.close(res);}
      else{
        this.UploadImage(data,res.Id);
      }
   },err=>{
     this.toastr.error("Bad Request");
     this.dialogRef.close(false);
   });
  }

  UploadImage(data,id) {
    this.productSRV.uploadImage(id,data).subscribe(res=>{
      this.dialogRef.close(res);
    },err=>{
      this.dialogRef.close(false);
      this.toastr.error("Bad Request");
    });
  }

  cancel() {
     this.dialogRef.close(false);
  }

  onChange(files: FileList) {
    this.Image = files.item(0)
    var reader = new FileReader();
     reader.onload = (event: any) => {
      this.product.ImgThumbnial = event.target.result;
    }
    reader.readAsDataURL(this.Image);
  }
}
