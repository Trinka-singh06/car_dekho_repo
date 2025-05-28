import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponentComponent } from './grid-component.component';

describe('GridComponentComponent', () => {
  let component: GridComponentComponent;
  let fixture: ComponentFixture<GridComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
