import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

try {
    TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
    );
} catch {
}

describe('UserService', () => {
    let service: UserService;

    const mockUsers: User[] = [
        { id: 1, name: 'Carlos Guzman', email: 'carlos@example.com', cpf: '123449999', phone: '48988445522', status: 'active' },
        { id: 2, name: 'Grediana Rojas', email: 'grediana@example.com', cpf: '123449998', phone: '48988445527', status: 'active' }
    ];

    beforeEach(() => {
        vi.restoreAllMocks();
        vi.spyOn(UserService.prototype, 'fetchUsers').mockImplementation(() => undefined);

        TestBed.configureTestingModule({
            providers: [
                UserService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(UserService);

        mockUsers.forEach(user => {
            service.saveUser(user);
        });
    });

    it('deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('deve inicializar com uma lista de usuários no signal', () => {
        const users = service.users();
        expect(users.length).toBe(2);
        expect(users[0].name).toBe('Carlos Guzman');
    });

    it('deve filtrar usuários por nome através do search term', () => {
        service.setSearchTerm('Grediana');
        const filtered = service.filteredUsers();
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toContain('Grediana');
    });

    it('deve adicionar um novo usuario e atualizar o signal', () => {
        const newUser: User = {
            id: 3,
            name: 'Novo Usuario',
            email: 'novo@test.com',
            cpf: '789448895',
            phone: '789448895',
            status: 'active'
        };

        service.saveUser(newUser).subscribe(result => {
            expect(result).toBe(true);
        });

        expect(service.users().length).toBe(3);
        expect(service.users().some(user => user.email === newUser.email)).toBe(true);
    });
    it('deve excluir um usuário do signal', async () => {
        const deleteSpy = vi.spyOn(service, 'deleteUser').mockReturnValue(of(true));
        const idToDelete = 1;

        await firstValueFrom(service.deleteUser(idToDelete));

        expect(deleteSpy).toHaveBeenCalledWith(idToDelete);

    });
});