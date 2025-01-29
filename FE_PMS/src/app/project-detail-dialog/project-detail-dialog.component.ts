import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail-dialog',
  templateUrl: './project-detail-dialog.component.html',
  styleUrl: './project-detail-dialog.component.css'
})
export class ProjectDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
