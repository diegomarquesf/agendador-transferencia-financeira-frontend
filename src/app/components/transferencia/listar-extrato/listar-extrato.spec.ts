import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExtrato } from './listar-extrato';

describe('ListarExtrato', () => {
  let component: ListarExtrato;
  let fixture: ComponentFixture<ListarExtrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarExtrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarExtrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
