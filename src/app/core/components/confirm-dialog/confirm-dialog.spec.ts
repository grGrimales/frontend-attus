import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./confirm-dialog";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

try {
    TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
    );
} catch {
}

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    // Definimos el mock con vi.fn() de Vitest
    const mockDialogRef = {
        close: vi.fn()
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        await TestBed.configureTestingModule({
            imports: [ConfirmDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: { title: 'Teste', message: 'Mensagem' } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });

    it('deve chamar o fechamento do diálogo ao confirmar', () => {
        component.onConfirm();
        expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('deve chamar o fechamento do diálogo ao cancelar', () => {
        component.onCancel();
        expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });
});