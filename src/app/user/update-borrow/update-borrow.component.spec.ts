import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBorrowComponent } from './update-borrow.component';

describe('UpdateBorrowComponent', () => {
  let component: UpdateBorrowComponent;
  let fixture: ComponentFixture<UpdateBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBorrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
