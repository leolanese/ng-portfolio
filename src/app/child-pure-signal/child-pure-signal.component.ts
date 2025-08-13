import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { User } from '../types/user.types';

import { ApiSignalService } from '../shared/api.signal.service';

@Component({
  selector: 'app-child-card-pure-signal',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  `,
  styles: `
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      border-color: #007bff;
    }

    .card:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .user-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .user-email {
      font-size: 0.875rem;
      color: #666;
      margin: 0;
    }

    .user-company {
      font-size: 0.75rem;
      color: #888;
      margin: 0;
      font-style: italic;
    }
  `
})
export class ChildCardPureSignalComponent {
  readonly childItem = input.required<User>(); 
  readonly userSelected = output<User>();
  private readonly apiSignalService = inject(ApiSignalService);

  protected handleCardClick(): void {
    this.userSelected.emit(this.childItem());
    this.apiSignalService.setSelectedUser(this.childItem());
    console.log('User selected in Child component:', this.childItem());
  }
}