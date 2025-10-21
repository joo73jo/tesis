import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificacionesDocentePage } from './calificaciones-docente.page';

describe('CalificacionesDocentePage', () => {
  let component: CalificacionesDocentePage;
  let fixture: ComponentFixture<CalificacionesDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
