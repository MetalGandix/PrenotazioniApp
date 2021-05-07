import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneCampoComponent } from './prenotazione-campo.component';

describe('PrenotazioneCampoComponent', () => {
  let component: PrenotazioneCampoComponent;
  let fixture: ComponentFixture<PrenotazioneCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotazioneCampoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
