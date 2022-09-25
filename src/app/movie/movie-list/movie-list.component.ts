import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { CommonModule } from '@angular/common';
import { Movies } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  Movies$: Observable<Movies>;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.Movies$ = this.movieService.getPopularMovies();
  }
}
