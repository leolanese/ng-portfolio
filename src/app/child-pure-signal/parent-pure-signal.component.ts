import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ApiService } from '../api.signal.service';
import { User } from '../types/user.types';
import { ChildCardPureSignalComponent } from './child-pure-signal.component';

@Component({
  selector: 'app-parent-pure-signal',
  imports: [ChildCardPureSignalComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>{{ title }}</p>
    
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
  title = '/child-pure-signal';
  // Modern Parent Component with Writable Signals

  private readonly apiService = inject(ApiService);
   
  // Writable signals for reactive state management
  private readonly selectedUserSignal = signal<User | null>(null);
  
  // Computed signals for derived state
  readonly isLoading = computed(() => this.apiService.isLoading());
  readonly isError = computed(() => this.apiService.isError());
  readonly users = computed(() => this.apiService.items());
  readonly selectedUser = this.selectedUserSignal.asReadonly();
  readonly errorDetails = computed(() => this.apiService.isError());
   
  // Optional inputs with default values
  readonly loadingMessage = input('Loading users...');
  readonly errorMessage = input('An error occurred while loading users');
  readonly emptyMessage = input('No users found');
   
  protected handleUserSelection(user: User): void {
    // Update local state through writable signal
    this.selectedUserSignal.set(user);
    
    // Also update shared service state
    this.apiService.setSelectedUser(user);
    
    console.log('User selected in Parent Component:', user);
    console.log('Parent state updated via writable signal');
  }
}
