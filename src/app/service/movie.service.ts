import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../movie/models/movie.model';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

//* This is where we write methods to get data
export class MovieService {
  url: string = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {}

  getLatestMovie(): Observable<any> {
    return this.http.get<any>(
      this.url + '/movie/latest?api_key=' + environment.movieApikey
    );
  }

  //* If the Api pull has an issue change the Observable type to movie.model
  getPopularMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      this.url + '/movie/popular?api_key=' + environment.movieApikey
    );
  }
}
