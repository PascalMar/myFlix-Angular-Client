import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the Toolbar Component responsible for navigation and user logout.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  /**
   * Constructs a new ToolbarComponent.
   * @param router - Angular router service.
   * @param snackBar - Angular Material snack bar service.
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /** Lifecycle hook that is called after data-bound properties of a directive are initialized. */
  ngOnInit(): void {
  }

  /** Navigates to the movies page. */
  openMovies(): void {
    this.router.navigate(['movies']);
  }

  /** Navigates to the profile page. */
  openProfile(): void {
    this.router.navigate(['profile']);
  }

  /** Logs out the user. */
  logOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.snackBar.open('User logged out successfully', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
