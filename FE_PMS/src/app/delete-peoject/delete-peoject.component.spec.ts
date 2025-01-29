import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePeojectComponent } from './delete-peoject.component';

describe('DeletePeojectComponent', () => {
  let component: DeletePeojectComponent;
  let fixture: ComponentFixture<DeletePeojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePeojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePeojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
