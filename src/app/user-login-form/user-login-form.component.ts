import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/registration.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Represents the User Login Form Component responsible for user authentication.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /** User data for login */
  @Input() userData = { Username: "", Password: "" };

  /**
   * Constructs a new UserLoginFormComponent.
   * @param fetchApiData - The service responsible for fetching API data.
   * @param dialogRef - The reference to the dialog component.
   * @param snackBar - Angular Material snack bar service.
   * @param router - Angular router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /** Lifecycle hook that is called after data-bound properties of a directive are initialized. */
  ngOnInit(): void { }

  /** Logs in the user. */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', res.token);
      this.dialogRef.close();
      this.snackBar.open(`Login success, Welcome ${res.user.Username}`, "OK", {
        duration: 2000
      });
      this.router.navigate(["movies"]);
    }, res => {
      this.snackBar.open("Login fail", "OK", {
        duration: 2000
      })
    });
  }
}
