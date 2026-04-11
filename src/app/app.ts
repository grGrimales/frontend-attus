import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('desafio-frontend-attus');

  handleSearch(term: string) {
    console.log('Search term from header:', term);
  }
}
