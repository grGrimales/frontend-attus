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
            { id: 1, name: 'Grediana Rojas', email: 'grediana@example.com', cpf: '123', phone: '123', status: 'active' },
            { id: 2, name: 'Carlos Guzman', email: 'carlos@example.com', cpf: '456', phone: '456', status: 'inactive' }
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
}