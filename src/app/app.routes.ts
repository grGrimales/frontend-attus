import { Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'users', component: UserListComponent }
];