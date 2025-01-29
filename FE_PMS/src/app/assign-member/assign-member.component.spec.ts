import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMemberComponent } from './assign-member.component';

describe('AssignMemberComponent', () => {
  let component: AssignMemberComponent;
  let fixture: ComponentFixture<AssignMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
