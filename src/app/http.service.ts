import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './shared/models/movie.model';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user/register', user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/user/login', { email, password });
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/movie');
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>('/api/movie/create', movie);
  }

  deleteMovie(_id: string): Observable<Movie> {
    return this.http.delete<Movie>(`/api/movie/delete/${_id}`);
  }

  logout(): Observable<any> {
    return this.http.get<any>('/api/user/logout');
  }
}
