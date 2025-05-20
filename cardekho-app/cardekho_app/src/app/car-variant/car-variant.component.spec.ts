import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVariantComponent } from './car-variant.component';

describe('CarVariantComponent', () => {
  let component: CarVariantComponent;
  let fixture: ComponentFixture<CarVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarVariantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
