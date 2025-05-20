import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCarFormComponent } from './seller-car-form.component';

describe('SellerCarFormComponent', () => {
  let component: SellerCarFormComponent;
  let fixture: ComponentFixture<SellerCarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerCarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
