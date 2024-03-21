import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    FormsModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {
  title: string = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', Validators.required);
  phone_number = new FormControl('', Validators.required);
  hobby = new FormControl('', Validators.required);
  skillsets = new FormControl('', Validators.required);
  id = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    @Inject(MAT_DIALOG_DATA) userData: any,
  ) {
    data['data'] == 'add' && (this.title = 'Add User');
    data['data'] == 'edit' && this.editData(userData);
  }

  editData(data: any) {
    this.title = 'Edit User';
    const user = data['userData'];
    this.id.setValue(user['id']);
    this.email.setValue(user['email']);
    this.username.setValue(user['username']);
    this.phone_number.setValue(user['phone_number']);
    this.hobby.setValue(user['hobby']);
    this.skillsets.setValue(user['skillsets']);
  }

  close(state: string) {
    const userData = {
      state: state,
      id: this.id.value,
      username: this.username.value,
      email: this.email.value,
      phone_number: this.phone_number.value?.toString(),
      hobby: this.hobby.value,
      skillsets: this.skillsets.value
    };
    this.dialogRef.close(JSON.stringify(userData));
  }

}
