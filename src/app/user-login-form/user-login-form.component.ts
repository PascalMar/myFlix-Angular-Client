import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(res => {
      localStorage.setItem('user', res.user.Username);
      localStorage.setItem('token', res.token);
      this.loadUserData(res.user.Username);  // Load user data including favorite movies
      this.dialogRef.close();
      this.snackBar.open(`Login success, Welcome ${res.user.Username}`, "OK", {
        duration: 2000
      });
    }, res => {
      this.snackBar.open("Login fail", "OK", {
        duration: 2000
      })
    });
  }

  loadUserData(username: string): void {
    this.fetchApiData.getUser(username).subscribe(user => {
      let userData = {
        id: user._id,
        username: user.Username,
        birthday: user.Birthday,
        email: user.Email,
        favoriteMovies: user.FavoriteMovies,  // Include favorite movies
        token: localStorage.getItem('token')
      };
      localStorage.setItem("user", JSON.stringify(userData));
      this.router.navigate(["movies"]);  // Navigate to movies after loading user data
    });
  }
}