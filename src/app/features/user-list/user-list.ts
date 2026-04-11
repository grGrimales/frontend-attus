import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {
  private userService = inject(UserService);

  users = this.userService.users;

  displayedColumns: string[] = ['name', 'email', 'actions'];
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log('Search', value);
  }

  editUser(user: User) {
    console.log('Edit', user);
  }

  deleteUser(id: number) {
    console.log('Delete', id);
  }

  addUser() {
    console.log('Add new user');
  }
}