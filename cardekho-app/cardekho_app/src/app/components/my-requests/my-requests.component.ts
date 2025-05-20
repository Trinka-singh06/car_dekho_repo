import { Component, OnInit } from '@angular/core';
import { CarSellRequest } from '../../models/car_sell_request';
import { CarSellRequestService } from '../../services/car-sell-request.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GridModule, RouterLink],
  providers: [CarSellRequestService],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent implements OnInit {
  requests: CarSellRequest[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  // Grid settings
  pageSettings = { pageSize: 10 };
  sortSettings = { columns: [{ field: 'requestDate', direction: 'Descending' }] };
  constructor(
    private route: ActivatedRoute,
    private carSellRequestService: CarSellRequestService
  ) { }

  ngOnInit(): void {
    // Check for success parameter in URL
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.successMessage = 'Your car sell request has been submitted successfully! We will contact you shortly.';
      }
    });

    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.carSellRequestService.getUserRequests().subscribe(
      (data) => {
        this.requests = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load your sell requests. Please try again later.';
        this.loading = false;
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge bg-warning';
      case 'approved':
        return 'badge bg-success';
      case 'rejected':
        return 'badge bg-danger';
      case 'listed':
        return 'badge bg-primary';
      default:
        return 'badge bg-secondary';
    }
  }

  formatDate(date: Date): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }
}


