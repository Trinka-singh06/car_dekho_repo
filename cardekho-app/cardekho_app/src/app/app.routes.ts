import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { SellCarComponent } from './components/sell-car/sell-car.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { jwtAuthGuard } from './jwt-auth.guard';
import { authGuard } from './auth.guard';
import { SellerCarFormComponent } from './seller-car-form/seller-car-form.component';
import { UsedCarComponent } from './components/used-car/used-car.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' }, 
    // { path: '', component: HomeComponent, pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'login', component:LoginRegisterComponent},
    { path: 'results', component: SearchResultComponent },
    { path: 'sell-car-form', component: SellerCarFormComponent },
    { path:'explore', component:CategoryCardComponent},
    {path: 'used-car', component:UsedCarComponent},
    {      
        path: 'sell-car', 
        component: SellCarComponent,
    
      },
      { 
        path: 'my-requests', 
        component: MyRequestsComponent,
        // canActivate: [authGuard] 
      },
      { 
        path: 'request-details/:id', 
        component: RequestDetailsComponent,
        // canActivate: [authGuard] 
      }

];
