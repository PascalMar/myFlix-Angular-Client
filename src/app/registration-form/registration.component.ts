import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  /** Input for user data. */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs the UserRegistrationFormComponent.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - The dialog reference for the user registration form.
   * @param snackBar - The snack bar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,           // The service for fetching API data.
    public dialogRef: MatDialogRef<RegistrationComponent>,       // The reference to the dialog.
    public snackBar: MatSnackBar) { }    // The service for showing snack bar notifications.

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
  }

  /**
   * Registers a new user.
   * Upon successful registration, closes the dialog and displays a success message.
   * Upon failure, displays an error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open("User registered successfully!", 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error(error);
      this.snackBar.open("User registration failed. Please try again.", 'OK', {
        duration: 2000
      });
    });
  }

}
