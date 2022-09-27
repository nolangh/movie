import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../movie/models/movie.model';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

//* ANCHOR Possible add this after the api key "&language=en-US&page=1"

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

  getPopularMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      this.url + '/movie/popular?api_key=' + environment.movieApikey
    );
  }

  getTopRatedMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      this.url + '/movie/top_rated?api_key=' + environment.movieApikey
    );
  }

  getTrendingMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      this.url + '/trending/all/week?api_key=' + environment.movieApikey
    );
  }

  getUpcomingMovies(): Observable<Movies> {
    return this.http.get<Movies>(
      this.url + '/movie/upcoming?api_key=' + environment.movieApikey
    );
  }
}
