import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBorrowComponent } from './cancel-borrow.component';

describe('CancelBorrowComponent', () => {
  let component: CancelBorrowComponent;
  let fixture: ComponentFixture<CancelBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelBorrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
