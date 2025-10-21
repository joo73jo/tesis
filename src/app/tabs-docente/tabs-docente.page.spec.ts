import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsDocentePage } from './tabs-docente.page';

describe('TabsDocentePage', () => {
  let component: TabsDocentePage;
  let fixture: ComponentFixture<TabsDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
