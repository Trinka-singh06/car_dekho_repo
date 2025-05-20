import { Component, OnInit } from '@angular/core';
import { CarSellRequest } from '../../models/car_sell_request';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarSellRequestService } from '../../services/car-sell-request.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  providers: [CarSellRequestService],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent implements OnInit {
  request: CarSellRequest | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carSellRequestService: CarSellRequestService
  ) { }

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.loadRequestDetails(+requestId);
    } else {
      this.errorMessage = 'Invalid request ID';
      this.loading = false;
    }
  }

  loadRequestDetails(requestId: number): void {
    this.carSellRequestService.getRequestById(requestId).subscribe(
      (data) => {
        this.request = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load request details. Please try again later.';
        this.loading = false;
      }
    );
  }

  getStatusClass(status: string): string {
    if (!status) return 'badge bg-secondary';

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

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  goBack(): void {
    this.router.navigate(['/my-requests']);
  }

  getProgressWidth(): string {
    if (!this.request) return '0%';

    switch (this.request.status.toLowerCase()) {
      case 'pending': return '0%';
      case 'approved': return this.request.inspectionDate ? '50%' : '25%';
      case 'inspection': return '50%';
      case 'valuation': return this.request.valuationAmount ? '75%' : '50%';
      case 'listed': return '100%';
      case 'rejected': return '25%';
      default: return '0%';
    }
  }

  getTimelinePointClass(point: string): string {
    if (!this.request) return 'bg-secondary text-white';

    const status = this.request.status.toLowerCase();

    // Inspection point
    if (point === 'inspection') {
      if (['approved', 'inspection', 'valuation', 'listed'].includes(status) ||
        (status === 'approved' && this.request.inspectionDate)) {
        return 'bg-success text-white';
      }
      return 'bg-secondary text-white';
    }

    // Valuation point
    if (point === 'valuation') {
      if (['valuation', 'listed'].includes(status) ||
        (status === 'approved' && this.request.valuationAmount)) {
        return 'bg-success text-white';
      }
      return 'bg-secondary text-white';
    }

    // Listed point
    if (point === 'listed') {
      if (status === 'listed') {
        return 'bg-success text-white';
      }
      return 'bg-secondary text-white';
    }

    return 'bg-secondary text-white';
  }
}