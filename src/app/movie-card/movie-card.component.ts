import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SummaryPageComponent } from '../summary-page/summary-page.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  @Input() isFromFav: boolean = false;
  @Input() movie: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      if (this.isFromFav) this.getFavMovies()
      return this.movies;
    });
  }

  /* Favorite Setup */
  getFavMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;

    this.fetchApiData.getUser(username).subscribe((response) => {
      this.FavoriteMovies = response.FavoriteMovies || [];
    });
  }


  isFavoriteMovie(movieId: string): boolean {
    return this.FavoriteMovies.includes(movieId);
  }

  /* Functions for each of the Movie Card Buttons */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px',
    });
  }

  openSummaryDialog(title: string, description: string): void {
    this.dialog.open(SummaryPageComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px',
    });
  }

  /* Favorite Functions */
  addFavMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // const username = user.username;
    this.fetchApiData.addFavouriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  deleteFavMovies(movie: any): void {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // const username = user.username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}
