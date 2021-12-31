import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../../http.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-form-dialog',
  templateUrl: './movie-form-dialog.component.html',
  styleUrls: ['./movie-form-dialog.component.scss']
})
export class MovieFormDialogComponent implements OnInit {

  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MovieFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Movie>,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: [''],
      description: [''],
      imgUrl: ['']
    });
  }

  addMovie(): void {
    this.httpService.addMovie(this.movieForm.value).subscribe({
      next: () => {
        alert('Movie added successfully');
        window.location.reload();
      },
      error: (err) => {
        err.error ? err = err.error : err;
        alert(JSON.stringify(err, null, 4));
      }
    });
  }

}
