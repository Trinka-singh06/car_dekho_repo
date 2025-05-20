import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-car-slider',
  standalone: true,
  imports: [ CarouselModule,CommonModule],
  templateUrl: './car-slider.component.html',
  styleUrl: './car-slider.component.css'
})
export class CarSliderComponent {
  carImages: any[] = [
    { imgSrc: 'assets/car1.avif', title: 'Tata Harrier EV', desc: 'Showcased: AWD, tech-laden, and more' },
    { imgSrc: 'assets/car2.avif', title: 'Mahindra XUV700', desc: 'Best-selling SUV in India' },
    { imgSrc: 'assets/car3.avif', title: 'Hyundai Creta', desc: 'Stylish & Powerful Performance' }
  ];
}
