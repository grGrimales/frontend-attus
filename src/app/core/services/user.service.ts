import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { delay, of, tap, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private usersSignal = signal<User[]>([]);
    private loadingSignal = signal<boolean>(false);
    private errorSignal = signal<string | null>(null);
    private searchTermSignal = signal<string>('');

    users = this.usersSignal.asReadonly();
    isLoading = this.loadingSignal.asReadonly();
    error = this.errorSignal.asReadonly();

    filteredUsers = computed(() => {
        const term = this.searchTermSignal().toLowerCase();
        return this.usersSignal().filter(u =>
            u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
        );
    });

    constructor() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const mockData: User[] = [
            { id: 1, name: 'Grediana Rojas', email: 'grediana@example.com', cpf: '12344499933', phone: '48988774422', status: 'active' },
            { id: 2, name: 'Carlos Guzman', email: 'carlos@example.com', cpf: '12344499922', phone: '48988774423', status: 'active' }
        ];

        of(mockData).pipe(
            delay(1500),
            tap(data => {
                this.usersSignal.set(data);
                this.loadingSignal.set(false);
            }),
            catchError(err => {
                this.errorSignal.set('Erro ao carregar usuários. Tente novamente.');
                this.loadingSignal.set(false);
                return throwError(() => err);
            })
        ).subscribe();
    }

    setSearchTerm(term: string) {
        this.searchTermSignal.set(term);
    }

    setFilter(term: string) {
        this.setSearchTerm(term);
    }

    saveUser(userData: User, id?: number) {
        const currentUsers = this.usersSignal();

        if (id) {
            const updatedUsers = currentUsers.map(u =>
                u.id === id ? { ...userData, id } : u
            );
            this.usersSignal.set(updatedUsers);
        } else {
            const newUser = { ...userData, id: Date.now() };
            this.usersSignal.set([...currentUsers, newUser]);
        }

        return of(true);
    }


    deleteUser(id: number) {
        const currentUsers = this.usersSignal();
        const updatedList = currentUsers.filter(u => u.id !== id);
        this.usersSignal.set(updatedList);

        return of(true);
    }
}