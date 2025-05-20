import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVariantComponent } from './model-variant.component';

describe('ModelVariantComponent', () => {
  let component: ModelVariantComponent;
  let fixture: ComponentFixture<ModelVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelVariantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
