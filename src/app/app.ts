import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private userService = inject(UserService);
  protected readonly title = signal('desafio-frontend-attus');

  handleSearch(term: string) {
    this.userService.setSearchTerm(term);
  }
}
