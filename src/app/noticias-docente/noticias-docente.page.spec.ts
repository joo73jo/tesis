import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasDocentePage } from './noticias-docente.page';

describe('NoticiasDocentePage', () => {
  let component: NoticiasDocentePage;
  let fixture: ComponentFixture<NoticiasDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
