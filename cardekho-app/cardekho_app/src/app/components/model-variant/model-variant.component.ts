import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-model-variant',
  standalone: true,
  imports: [],
  templateUrl: './model-variant.component.html',
  styleUrl: './model-variant.component.css'
})
export class ModelVariantComponent implements OnChanges {
  @Input() modelName: string | null = null;
  @Output() backToModelDetails = new EventEmitter<boolean>();

  variants: any[] = [];
  imageBaseUrl = 'http://localhost:3000/uploads/';
  loading: boolean = false;
  error: string | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelName'] && this.modelName) {
      this.loadVariants();
    }
  }

  loadVariants(): void {
    this.loading = true;
    this.error = null;

    this.categoryService.getModelByName(this.modelName!)
      .subscribe({
        next: (model) => {
          if (model && model.variants) {
            this.variants = model.variants;
          } else {
            this.error = 'No variants found for this model.';
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading variants:', err);
          this.error = 'Unable to load variants. Please try again.';
          this.loading = false;
        }
      });
  }

  onBackToModel(): void {
    this.backToModelDetails.emit(true);
  }

  compareVariants(variant1: any, variant2: any): void {
    // Implement comparison functionality
    console.log('Comparing variants:', variant1, variant2);
    // You could navigate to a comparison page or open a comparison modal
  }
}