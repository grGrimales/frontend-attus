import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../core/components/confirm-dialog/confirm-dialog';

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
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '700px',
      panelClass: 'flat-dialog-panel',
      data: user
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(formData => this.userService.saveUser(formData, user.id)),
      take(1)
    ).subscribe();
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'flat-dialog-panel'
    });

    dialogRef.afterClosed().pipe(
      filter(result => result === true),
      take(1)
    ).subscribe(() => {
      this.userService.deleteUser(id).subscribe();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '700px',
      panelClass: 'flat-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.saveUser(result).subscribe();
      }
    });
  }

  retryFetch() {
    this.userService.fetchUsers();
  }
}