import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';
import { StringArrayPipe } from './pipes/string-array.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StringArrayPipe, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  userData: any = [];

  constructor(
    private userServices: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getUser();
  }

  add() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '50vw',
      data: {
        data: 'add',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);
      const state = data['state'];
      state == 'confirm' && this.addUser(data);
    });
  }

  addUser(data: any) {
    const param = {
      username: data['username'],
      email: data['email'],
      phone_number: data['phone_number'],
      hobby: data['hobby'],
      skillsets: data['skillsets'],
    };
    this.userServices.createUser(param)
      .subscribe(res => {
        this.openSnackBar('User added.');
        this.getUser();
      });
  }

  edit(data: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '50vw',
      data: {
        data: 'edit',
        userData: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = JSON.parse(result);
      const state = data['state'];
      console.log(data);
      console.log(state);
      state == 'confirm' && this.editUser(data);
    });
  }

  editUser(data: any) {
    console.log(data);
    const param = {
      id: data['id'],
      username: data['username'],
      email: data['email'],
      phone_number: data['phone_number'],
      hobby: data['hobby'],
      skillsets: data['skillsets'],
    };
    this.userServices.updateUser(param)
      .subscribe(res => {
        this.openSnackBar('User updated.');
        this.getUser();
      });
  }

  getUser() {
    this.userServices.getUser()
      .subscribe(res => {
        this.userData = res['data'];
      });
  }

  delete(data: any) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result == 'confirm' && this.deleteUser(data);
    });
  }

  deleteUser(id: number) {
    this.userServices.deleteUser(id)
      .subscribe(res => {
        this.openSnackBar('User deleted.');
        this.getUser();
      });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      direction: "ltr"
    });
  }

}
