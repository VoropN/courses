import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('../courses/courses.module').then((mod) => mod.CoursesModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../about/about.module').then((mod) => mod.AboutModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../page-not-found/page-not-found.module').then(
        (mod) => mod.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
