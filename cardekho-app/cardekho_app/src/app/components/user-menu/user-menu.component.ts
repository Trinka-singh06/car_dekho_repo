import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers:[AuthService],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  user: any;
  isMenuOpen: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
  
  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
    // Redirect to home page or refresh
    window.location.reload();
  }

}
