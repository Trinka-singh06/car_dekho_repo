import { Component } from '@angular/core';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { AccordionModule, ToolbarModule, ContextMenuModule, BreadcrumbModule, CarouselModule, TabModule, TreeViewModule, SidebarModule, MenuModule, AppBarModule, StepperModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule, TextAreaModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule, OtpInputModule, SmartTextAreaModule, SpeechToTextModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule, FabModule, SpeedDialModule, SmartPasteButtonModule } from '@syncfusion/ej2-angular-buttons';

import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CarSliderComponent } from './components/car-slider/car-slider.component';
import { HomeComponent } from './components/home/home.component';
import { filter } from 'rxjs';
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { CategoryCardComponent } from "./category-card/category-card.component";
import { UsedCarComponent } from "./components/used-car/used-car.component";
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { jwtAuthGuard } from './jwt-auth.guard';
import { authGuard } from './auth.guard';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridModule, PagerModule, RouterModule,DropDownButtonModule, RouterOutlet, AccordionModule, ToolbarModule, ContextMenuModule, BreadcrumbModule, CarouselModule, TabModule, TreeViewModule, SidebarModule, MenuModule, AppBarModule, StepperModule, TextBoxModule, TextAreaModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule, OtpInputModule, SmartTextAreaModule, SpeechToTextModule, DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule, ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule, FabModule, SpeedDialModule, SmartPasteButtonModule, CommonModule, RouterOutlet, NavbarComponent,
    SearchFormComponent,
    CarSliderComponent,
      HomeComponent, SearchResultComponent, CategoryCardComponent, UsedCarComponent],
   providers: [
      AuthService,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'cardekho_app';
  isAdmin = true;
  showHome = true; // Initially, home content is visible
  filters: any;
  showSellCarForm = false;
  showRouterOutlet = true;
  
  constructor(private router: Router) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      
        if (event.url.includes('/sell-car-form')) {
        this.showHome = false;
        this.showSellCarForm = true;
      } else if (event.url.includes('/results')) {
        this.showHome = false;
        this.showSellCarForm = false;
      } else if (event.url === '/home' || event.url === '/') {
        this.showHome = true;
        this.showSellCarForm = false;
      }
    });
  }


  usedCarList: any[] = [];

  selectedModel: string | null = null;
  selectedCategory: string | null = null;
  // showHome: boolean = true;
  showExplorer: boolean = false;

  onSelectionChanged(event: {
    model?: string | null;
    category?: string | null;
    exploreCars?: boolean;
    usedCars?: any[]; // 👈 add this
    city?: string;
  }) {
    this.selectedModel = event.model || null;
    this.selectedCategory = event.category || null;
    this.usedCarList = event.usedCars || [];
    this.showExplorer = !!event.exploreCars;
    
    // Update showHome based on selections
    this.showHome = !this.selectedModel && 
                    !this.selectedCategory && 
                    this.usedCarList.length === 0 && 
                    !this.showExplorer &&
                    !this.showSellCarForm;
  }
  
}
