import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { RootComponent } from './root/root.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookRentComponent } from './book-rent/book-rent.component';
import { AuthentificationComponent } from './authentification/authentification.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    RootComponent,
    BookDescriptionComponent,
    BookRentComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
