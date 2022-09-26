import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { CommonModule } from '@angular/common';
import { Movies } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  latestMovies!: any;
  popularMovies!: Movies;
  upcomingMovies!: Movies;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getLatestMovies();
    this.getPopularMovies();
    this.getUpcomingMovies();
    //* TODO add all methods here so data is available on page load
  }

  //* Popular Movies
  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      (res) => {
        this.popularMovies = this.modifyData(res);
      },
      (err) => {
        console.log('Not Able to fetch Movies', err);
      }
    );
  }

  //* Latest Movies
  getLatestMovies() {
    this.movieService.getLatestMovie().subscribe(
      (res) => {
        this.latestMovies = this.changeData(res);
        console.log(this.latestMovies);
      },
      (err) => {
        console.log("Couldn't fetch Latest Movies", err);
      }
    );
  }

  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path =
        'https://image.tmdb.org/t/p/original' +
        res.poster_path +
        '?api_key=' +
        environment.movieApikey;
    } else {
      'https://image.tmdb.org/t/p/original' +
        res.backdrop_path +
        '?api_key=' +
        environment.movieApikey;
    }

    return res;
  }

  //* UpComing Movies
  getUpcomingMovies() {
    this.movieService.getUpcomingMovies().subscribe(
      (res) => {
        this.upcomingMovies = this.modifyData(res);
      },
      (err) => {
        console.log('Error While fetching Upcoming Movies', err);
      }
    );
  }

  //* Modifier Method
  modifyData(movies: Movies): Movies {
    if (movies.results) {
      movies.results.forEach((element: any) => {
        element.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          element.backdrop_path +
          '?api_key=' +
          environment.movieApikey;
        if (!element.title) {
          element.title = element.name;
        }
      });
    }
    return movies;
  }
}
