import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: "", password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(res => {
      this.dialogRef.close();
      this.snackBar.open(`Login success, Welcom ${res.user.username}`, "OK", {
        duration: 2000
      });
      let user = {
        id: res.user._id,
        username: res.user.username,
        birthday: res.user.birthday,
        email: res.user.email,
        token: res.token
      }
      localStorage.setItem("user", JSON.stringify(user))
    }, res => {
      this.snackBar.open("Login fail", "OK", {
        duration: 2000
      })
    })
  }
}