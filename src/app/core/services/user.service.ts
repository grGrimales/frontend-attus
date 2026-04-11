import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersSignal = signal<User[]>([
        { id: 1, name: 'Grediana Rojas', email: 'grediana@example.com', cpf: '123.456.789-00', phone: '48999999999', status: 'active' },
        { id: 2, name: 'Carlos Guzman', email: 'carlos@example.com', cpf: '987.654.321-11', phone: '48888888888', status: 'inactive' }
    ]);

    users = this.usersSignal.asReadonly();

    addUser(user: User) {
        this.usersSignal.update(current => [...current, user]);
    }

    deleteUser(id: number) {
        this.usersSignal.update(current => current.filter(u => u.id !== id));
    }
}