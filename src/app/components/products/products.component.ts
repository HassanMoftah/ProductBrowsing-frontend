import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MDProduct } from 'src/app/models/MDProduct.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ExportExcel } from 'src/app/services/exportExcel.service';
import { ProductService } from 'src/app/services/ProductService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: MDProduct[];
  Loading: boolean = true;
  root = environment.root;
  constructor(
    private productSRV: ProductService,
    private toastr: ToastrService,
    private dialogSRV: DialogService,
    private exportExcelSRV:ExportExcel
  ) {}
  ngOnInit(): void {
    this.productSRV.getAll().subscribe(
      (res) => {
        if (res == null || res.length == 0) {
          this.toastr.info('no products added yet !');
          this.Loading = false;
        } else {
          res.forEach((element) => {
            this.getImage(element);
          });
          this.products = res;
          this.Loading = false;
        }
      },
      (err) => {
        this.toastr.error('Server Error');
        this.Loading = false;
      }
    );
  }

  getImage(prduct: MDProduct) {
    if (prduct.Imagepath == '') {
      prduct.ImgThumbnial = 'assets/default.png';
    } else {
      prduct.ImgThumbnial = this.root + prduct.Imagepath;
    }
  }
  onAddNewClicked() {
    let product = new MDProduct();
    product.ImgThumbnial = 'assets/default.png';
    this.dialogSRV
      .OpenAddEditProduct(product)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
          this.getImage(res);
          this.products.push(res);
        }
      });
  }
  onEditClicked(prod: MDProduct) {
    let product = new MDProduct(
      prod.Id,
      prod.Name,
      prod.Price,
      prod.Lastupdated,
      prod.Imagepath,
      prod.ImgThumbnial
    );
    this.dialogSRV
      .OpenAddEditProduct(product)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
          let index = this.products.indexOf(prod);
          this.getImage(res);
          this.products[index] = res;
        }
      });
  }
  onDeleteClicked(prod: MDProduct) {
    let message="are you sure you want to delete product "+prod.Name+" ?";
    this.dialogSRV.openConfirmDelete(message).afterClosed().subscribe(res=>{
      if(res==true){
        this.productSRV.delete(prod).subscribe(res=>{
          let index=this.products.indexOf(prod);
          this.products.splice(index,1);
          this.toastr.success("product deleted successfully !");
        },err=>{
          this.toastr.error("Bad Request");
        });
      }
    });
  }
  onExportClicked(){
        this.exportExcelSRV.exportData(this.products);
  }
}
