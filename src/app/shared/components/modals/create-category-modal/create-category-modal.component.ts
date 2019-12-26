import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent {
  public newCategoryForm: FormGroup = this.fb.group({
    title: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    ]
  });

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private fb: FormBuilder
  ) { }

  formIsInvalid(): boolean {
    return !(
      this.newCategoryForm.valid &&
      this.newCategoryForm.get('title').value
    );
  }

  submit(): void {
    this.dialogRef.close({
      categoryTitle: this.newCategoryForm.get('title').value,
    });
  }
}
