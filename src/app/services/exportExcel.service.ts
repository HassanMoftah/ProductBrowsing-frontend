import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MDProduct } from '../models/MDProduct.model';
@Injectable({ providedIn: 'root' })
export class ExportExcel {
  title = 'Products Lists';
  header = ['Name', 'Price', 'LastUpdated'];
  constructor(private datePipe: DatePipe) {}

  exportData(data: MDProduct[]) {
    let datacomposed= this.GetData(data);
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Products');
    let titleRow = worksheet.addRow([this.title]);
    // Set font, size and style in title row.
    titleRow.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };
    // Blank Row
    worksheet.addRow([]);
    //Add row with current date
    let subTitleRow = worksheet.addRow([
      'Date : ' + this.datePipe.transform(new Date(), 'medium'),
    ]);
    worksheet.mergeCells('A1:D2');
    worksheet.addRow(this.header);
    datacomposed.forEach(element=>{
        worksheet.addRow(element);
    });
   
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Products.xlsx');
  });
  }
  GetData(products:MDProduct[]){
      let data=new Array<object>();
      products.forEach(element => {
          let row=[element.Name,element.Price,this.datePipe.transform(element.Lastupdated,'short')];
          data.push(row);
      });
     return data;
  }
}
