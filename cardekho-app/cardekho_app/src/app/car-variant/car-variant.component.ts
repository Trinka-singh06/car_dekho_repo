import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonEngine } from '@angular/ssr';

@Component({
  selector: 'app-car-variant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-variant.component.html',
  styleUrl: './car-variant.component.css'
})
export class CarVariantComponent implements OnInit {
  carModel: string = '';
  variants: any[] = [];

  // Dummy data for car variants
  carVariantsData: any = {
    "Mahindra-BE-6": [
      { name: "BE 6 Variant 1", image: "assets/mahindra-be6-1.jpg" },
      { name: "BE 6 Variant 2", image: "assets/mahindra-be6-2.jpg" }
    ],
    "MG-Windsor-EV": [
      { name: "Windsor EV Base", image: "assets/mg-windsor-ev-1.jpg" },
      { name: "Windsor EV Pro", image: "assets/mg-windsor-ev-2.jpg" }
    ],
    "MG-Comet-EV": [
      { name: "Comet EV Standard", image: "assets/mg-comet-ev-1.jpg" },
      { name: "Comet EV Plus", image: "assets/mg-comet-ev-2.jpg" }
    ]
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.carModel = params.get('model') || '';
      this.variants = this.carVariantsData[this.carModel] || [];
    });
  }
}
