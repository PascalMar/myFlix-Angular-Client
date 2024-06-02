import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @Input()
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
    this.user = this.fetchData.getUser();
    if (this.user) {
      console.log('User data loaded:', this.user);
      this.userData.Username = this.user.username || '';
      this.userData.Password = this.user.token || '';
      this.userData.Email = this.user.email || '';
      this.userData.Birthday = this.user.birthday || '';
      this.fetchData.getAllMovies().subscribe(
        (response) => {
          console.log('Movies loaded:', response);
          const favoriteMovies = this.user.FavoriteMovies || [];
          this.FavoriteMovies = response.filter((movie: any) => favoriteMovies.includes(movie._id));
          console.log('Favorite movies filtered:', this.FavoriteMovies);
        },
        (error) => {
          console.error('Error loading movies:', error);
        }
      );
    } else {
      console.error('User data could not be loaded');
    }
  }

  updateProfile(): void {
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

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchData.deleteUser().subscribe(
        (response: any) => {
          console.log('User deleted:', response);
          this.snackBar.open('Profile Deleted', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['welcome']);
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Error deleting profile', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}