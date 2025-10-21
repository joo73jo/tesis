import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasEstudiantePage } from './noticias-estudiante.page';

describe('NoticiasEstudiantePage', () => {
  let component: NoticiasEstudiantePage;
  let fixture: ComponentFixture<NoticiasEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
