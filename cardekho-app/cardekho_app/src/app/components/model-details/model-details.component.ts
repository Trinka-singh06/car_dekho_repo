import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CategoryService],
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.css'
})
export class ModelDetailsComponent implements OnChanges {
  @Input() modelName: string | null = null;
  @Input() categoryName: string | null = null;
  @Output() viewVariants = new EventEmitter<boolean>();

  modelDetails: any = null;
  imageBaseUrl = 'http://localhost:3000/uploads/';
  loading: boolean = false;
  error: string | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelName'] && this.modelName) {
      this.loadModelDetails();
    }
  }

  loadModelDetails(): void {
    this.loading = true;
    this.error = null;

    this.categoryService.getModelByName(this.modelName!)
      .subscribe({
        next: (data) => {
          this.modelDetails = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading model details:', err);
          this.error = 'Unable to load model details. Please try again.';
          this.loading = false;
        }
      });
  }

  onViewVariants(): void {
    this.viewVariants.emit(true);
  }

}
