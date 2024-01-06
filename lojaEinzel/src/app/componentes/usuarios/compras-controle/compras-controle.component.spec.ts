import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasControleComponent } from './compras-controle.component';

describe('ComprasControleComponent', () => {
  let component: ComprasControleComponent;
  let fixture: ComponentFixture<ComprasControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasControleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
