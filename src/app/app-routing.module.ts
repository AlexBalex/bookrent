import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { AppComponent } from './app.component';
import { BookRentComponent } from './book-rent/book-rent.component';
import { AuthentificationComponent } from './authentification/authentification.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'book-list/:filter', component: BookListComponent },
  { path: 'book-description', component: BookDescriptionComponent },
  { path: 'book-rent', component: BookRentComponent},
  { path: 'authentification', component: AuthentificationComponent },

  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
