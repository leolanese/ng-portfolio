import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { User } from '../types/user.types';
import { ChildCardPureSignalComponent } from './child-pure-signal.component';

import { ApiSignalService } from '../shared/api.signal.service';

@Component({
  selector: 'app-parent-pure-signal',
  imports: [ChildCardPureSignalComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isLoading()) {
      <div class="loading-state">
        <p>{{ loadingMessage() }}</p>
      </div>
    } @else if (isError()) {
      <div class="error-state">
        <p>{{ errorMessage() }}</p>
        <p class="error-details">{{ errorDetails() | json }}</p>
      </div>
    } @else {
      @if (users().length) {
        <section class="card-container">
          @for (user of users(); track user.id) {

            <app-child-card-pure-signal
              [childItem]="user" 
              (userSelected)="handleUserSelection($event)" 
            />
            
          }
        </section>
        @if (selectedUser()) {
          <div class="selection-info">
            <h3>Selected User: {{ selectedUser()?.name }}</h3>
            <p>Email: {{ selectedUser()?.email }}</p>
            <p>Company: {{ selectedUser()?.company?.name }}</p>
          </div>
        }
      } @else {
        <div class="empty-state">
          <p>{{ emptyMessage() }}</p>
        </div>
      }
    }
  `,
  styles: `
    .loading-state,
    .error-state,
    .empty-state {
      text-align: center;
      padding: 2rem;
    }

    .error-details {
      font-size: 0.875rem;
      color: #dc3545;
      margin-top: 0.5rem;
    }

    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .selection-info {
      margin-top: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
  `
})
export class ParentPureSignalComponent {
  private readonly apiSignalService = inject(ApiSignalService);
  
  readonly isLoading = this.apiSignalService.isLoading;
  readonly isError = this.apiSignalService.isError;
  readonly users = this.apiSignalService.items;
  readonly selectedUser = this.apiSignalService.selectedUser;
  readonly errorDetails = this.apiSignalService.isError;
   
  readonly loadingMessage = input('Loading users...');
  readonly errorMessage = input('An error occurred while loading users');
  readonly emptyMessage = input('No users found');
   
  protected handleUserSelection(user: User): void {
    this.apiSignalService.setSelectedUser(user);
  }
}
