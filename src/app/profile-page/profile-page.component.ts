import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  user: any = {};


  constructor(
    public fetchData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userProfile();
  }

  userProfile(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;

    this.fetchData.getUser(username).subscribe((response) => {
      this.user = response;
      if (this.user) {
        console.log('User data loaded:', this.user);
        this.userData.Username = this.user.Username || '';
        this.userData.Password = this.user.Password || '';
        this.userData.Email = this.user.Email || '';
        const birthDate = new Date(this.user.Birthday);
        const formattedBirthDate = birthDate.toISOString().split('T')[0];
        this.userData.Birthday = formattedBirthDate || '';
        this.getFavoriteMovies();
      } else {
        console.error('User data could not be loaded');
      }
    });
  }

  getFavoriteMovies(): void {
    this.fetchData.getFavouriteMovies(this.userData.Username).subscribe(
      (response: any) => {
        this.FavoriteMovies = response.FavoriteMovies || [];
        console.log('Favorite movies loaded:', this.FavoriteMovies);
      },
      (error) => {
        console.error('Error loading favorite movies:', error);
      }
    );
  }

  updateProfile(): void {
    console.log('Updating profile for user:', this.userData); // Hinzugefügt
    this.fetchData.editUser(this.userData).subscribe(
      (response) => {
        console.log('Profile Update', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000
        });
      },
      () => {
        this.snackBar.open('Error, Profile not updated', 'No success', {
          duration: 2000,
        });
      }
    );
  }

  async deleteUser(): Promise<void> {
    if (confirm('Do you want to delete your account permanently?')) {
      this.fetchData.deleteUser().subscribe(
        (result: any) => {
          this.snackBar.open('Account deleted successfully!', 'OK', {
            duration: 3000,
          });
          localStorage.clear();
          this.router.navigate(['welcome']);
        },
        (error) => {
          this.snackBar.open('Account deleted successfully!', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['welcome']);
        }
      );
    }
  }
}
