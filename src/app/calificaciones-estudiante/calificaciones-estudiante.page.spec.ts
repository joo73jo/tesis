import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificacionesEstudiantePage } from './calificaciones-estudiante.page';

describe('CalificacionesEstudiantePage', () => {
  let component: CalificacionesEstudiantePage;
  let fixture: ComponentFixture<CalificacionesEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
