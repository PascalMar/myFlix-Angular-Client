import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SummaryPageComponent } from '../summary-page/summary-page.component';

/**
 * Represents the Movie Card Component responsible for displaying movie information.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** List of movies */
  movies: any[] = [];
  /** User information */
  user: any = {};
  /** List of favorite movies */
  FavoriteMovies: any[] = [];
  /** Indicates whether the component is rendering from favorites */
  @Input() isFromFav: boolean = false;
  /** Movie data */
  @Input() movie: any;

  /**
   * Constructs a new MovieCardComponent.
   * @param fetchApiData - The service responsible for fetching API data.
   * @param dialog - Angular Material dialog service.
   * @param snackBar - Angular Material snack bar service.
   * @param router - Angular router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /** Lifecycle hook that is called after data-bound properties of a directive are initialized. */
  ngOnInit(): void {
    this.getMovies();
  }

  /** Fetches all movies from the API. */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.getFavMovies();
    });
  }

  /** Fetches favorite movies of the current user from the API. */
  getFavMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;

    this.fetchApiData.getUser(username).subscribe((response) => {
      this.FavoriteMovies = response.FavoriteMovies
      const favMovies = this.movies.filter((movie: any) => response.FavoriteMovies.includes(movie.Title))
      if (this.isFromFav) this.movies = favMovies;
    });
  }

  /**
   * Checks if a movie is a favorite.
   * @param movieId - The ID of the movie.
   * @returns True if the movie is a favorite, otherwise false.
   */
  isFavoriteMovie(movieId: string): boolean {
    return this.FavoriteMovies.includes(movieId);
  }

  /**
   * Opens a dialog with director information.
   * @param name - The name of the director.
   * @param bio - The biography of the director.
   * @param birth - The birth date of the director.
   */
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

  /**
   * Opens a dialog with genre information.
   * @param name - The name of the genre.
   * @param description - The description of the genre.
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog with movie summary.
   * @param title - The title of the movie.
   * @param description - The summary of the movie.
   */
  openSummaryDialog(title: string, description: string): void {
    this.dialog.open(SummaryPageComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px',
    });
  }

  /**
   * Adds a movie to favorites.
   * @param movie - The movie to add to favorites.
   */
  addFavMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.addFavouriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Deletes a movie from favorites.
   * @param movie - The movie to remove from favorites.
   */
  deleteFavMovies(movie: any): void {
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}
