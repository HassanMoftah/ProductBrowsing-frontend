import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  message:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  ngOnInit(): void {
    this.message=this.data.message;
  }
  close(flag){
    this.dialogRef.close(flag);
  }
}
