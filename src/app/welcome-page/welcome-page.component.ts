import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Represents the Welcome Page Component responsible for displaying the welcome page and managing user authentication dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructs a new WelcomePageComponent.
   * @param dialog - Angular Material dialog service.
   */
  constructor(public dialog: MatDialog) { }

  /** Lifecycle hook that is called after data-bound properties of a directive are initialized. */
  ngOnInit(): void {
  }

  /** Opens the user registration dialog. */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /** Opens the user login dialog. */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
