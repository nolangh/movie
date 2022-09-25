import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { CommonModule } from '@angular/common';
import { Movies } from '../models/movie.model';
import { environment } from 'src/environments/environment';

//* ANCHOR look into making these methods observables

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  latestMovies: any;
  popularMovies!: Movies;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getLatestMovies();
    this.getPopularMovies();
    //* TODO add all methods here so data is available on page load
  }

  //* Fetch popular Movies
  //* TODO Copy this methode for fetching other data
  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      (res) => {
        this.popularMovies = this.modifyData(res);
        console.table(this.popularMovies);
      },
      (err) => {
        console.log('Not Able to fetch Movies', err);
      }
    );
  }

  //* Fetch latest Movies
  getLatestMovies() {
    this.movieService.getLatestMovie().subscribe(
      (res) => {
        this.latestMovies = res;
        console.table(this.latestMovies, console.time());
      },
      (err) => {
        console.log("Couldn't fetch Latest Movies", err);
      }
    );
  }

  modifyData(movies: Movies): Movies {
    if (movies.results) {
      movies.results.forEach((element: any) => {
        element.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          element.backdrop_path +
          'api_key?' +
          environment.movieApikey;
        if (!element.title) {
          element.title = element.name;
        }
      });
    }
    return movies;
  }
}
