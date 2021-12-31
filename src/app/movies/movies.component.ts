import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../http.service';
import { MovieFormDialogComponent } from '../shared/dialogs/movie-form-dialog/movie-form-dialog.component';
import { Movie } from '../shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.httpService.getAllMovies()
      .subscribe({
        next: (movies) => { this.movies = movies; },
        error: (err) => {
          err.error ? err = err.error : err;
          alert(JSON.stringify(err, null, 4));
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MovieFormDialogComponent, {
      width: '500px'
    });
  }

  deleteMovie(_id: string): void {
    this.httpService.deleteMovie(_id).subscribe({
      next: () => {
        window.location.reload();
        alert('Successful delete');
      },
      error: (err) => {
        err.error ? err = err.error : err;
        alert(JSON.stringify(err, null, 4));
      }
    });
  }

}
