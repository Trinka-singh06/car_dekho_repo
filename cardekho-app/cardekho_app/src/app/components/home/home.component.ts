import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SearchFormComponent } from "../search-form/search-form.component";
import { CarSliderComponent } from "../car-slider/car-slider.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from "../../category-card/category-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SearchFormComponent, CarSliderComponent, RouterOutlet, CommonModule, RouterModule, RouterOutlet, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showHome = true; // Initially, home content is visible

  // onSelectionChanged(selection: { model?: string | null; category?: string | null }) {
  //   if (selection.model || selection.category) {
  //     this.showHome = false;
  //   } else {
  //     this.showHome = true;
  //   }
  // }
}
