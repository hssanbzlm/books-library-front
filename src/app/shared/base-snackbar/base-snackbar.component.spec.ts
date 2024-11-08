import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSnackbarComponent } from './base-snackbar.component';

describe('BaseSnackbarComponent', () => {
  let component: BaseSnackbarComponent;
  let fixture: ComponentFixture<BaseSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
