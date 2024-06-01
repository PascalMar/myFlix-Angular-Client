import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  /** Toolbar Links */
  openMovies(): void {
    this.router.navigate(['movies']);
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.snackBar.open('User logged out successfully', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}