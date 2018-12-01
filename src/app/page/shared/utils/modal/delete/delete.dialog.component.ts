
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

export interface DeleteDialogData {
    id: number;
    title: string;
    message: string;
}

@Component({
    selector: 'app-delete.dialog',
    templateUrl: './delete.dialog.html',
    styleUrls: ['./delete.dialog.scss']
})
export class DeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    ) { }

    onNoClick(): void {
        this.dialogRef.close({ delete: false });
    }

    confirmDelete(): void {
        this.dialogRef.close({ delete: true });
    }
}
