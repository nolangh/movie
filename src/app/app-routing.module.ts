import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies', // maybe change back to movies
    pathMatch: 'full',
  },
  {
    path: 'movie-list',
    loadChildren: () =>
      import('./movie/movie.module').then((m) => m.MovieModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
