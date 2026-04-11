import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Loading } from "../../core/components/loading/loading";
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form';

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
    MatTableModule,
    MatProgressSpinnerModule,
    Loading
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {
  public userService = inject(UserService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'email', 'actions'];

  editUser(user: User) {
    console.log('Edit', user);
  }

  deleteUser(id: number) {
    console.log('Delete', id);
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '700px',
      panelClass: 'flat-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New user received:', result);
      }
    });
  }

  retryFetch() {
    this.userService.fetchUsers();
  }
}