import { CommonModule, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { WorkshopSignalService } from '../shared/workshop.signal.service';
import { Workshop } from '../types/workshop.types';

@Component({
  selector: 'app-workshop-card',
  imports: [CommonModule, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article 
      class="workshop-card" 
      role="listitem"
      tabindex="0"
      (click)="handleCardClick()">
      <div class="card-header">
        <div class="workshop-info">
          <div class="type-badge" [class]="'type-' + workshopItem().type">
            {{ workshopItem().type | titlecase }}
          </div>
          <h3 class="workshop-title">{{ workshopItem().title }}</h3>
        </div>
        @if (workshopItem().location || workshopItem().date) {
          <div class="location-date">
            @if (workshopItem().location) {
              <span class="location">{{ workshopItem().location }}</span>
            }
            @if (workshopItem().date) {
              <span class="date">{{ workshopItem().date }}</span>
            }
          </div>
        }
      </div>
      
      <div class="card-content">
        <p class="description">{{ workshopItem().description }}</p>
        <div class="tech-badges">
          @for (tech of workshopItem().techs || []; track tech) {
            <span class="tech-badge" [class]="'tech-badge ' + tech">
              {{ tech }}
            </span>
          }
        </div>
      </div>
      
      <div class="card-footer">
        <a 
          [href]="workshopItem().url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="workshop-link"
          (click)="$event.stopPropagation()">
          {{ getLinkText() }} →
        </a>
      </div>
    </article>
  `,
  styles: `
    .workshop-card {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .workshop-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #007bff;
    }

    .workshop-card:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .workshop-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .type-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      align-self: flex-start;
    }

    .type-badge.type-conference {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .type-badge.type-workshop {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .type-badge.type-collaboration {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .workshop-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
      line-height: 1.3;
    }

    .location-date {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .location {
      font-size: 0.875rem;
      color: #666;
      font-weight: 500;
    }

    .date {
      font-size: 0.75rem;
      color: #888;
      font-style: italic;
    }

    .card-content {
      flex: 1;
    }

    .description {
      font-size: 0.875rem;
      color: #555;
      line-height: 1.5;
      margin: 0 0 1rem 0;
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #f0f0f0;
      color: #666;
      border: 1px solid #e0e0e0;
    }

    .tech-badge.functional {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }

    .tech-badge.ecmascript {
      background: linear-gradient(135deg, #f7df1e, #f0db4f);
      color: #333;
      border-color: #f7df1e;
    }

    .tech-badge.rwd {
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      border-color: #ff6b6b;
    }

    .tech-badge.responsive {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
      border-color: #4ecdc4;
    }

    .tech-badge.javascript {
      background: linear-gradient(135deg, #f7df1e, #f0db4f);
      color: #333;
      border-color: #f7df1e;
    }

    .tech-badge.angular {
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      border-color: #dd0031;
    }

    .tech-badge.react {
      background: linear-gradient(135deg, #61dafb, #21d4fd);
      color: #333;
      border-color: #61dafb;
    }

    .tech-badge.openjs {
      background: linear-gradient(135deg, #f7df1e, #f0db4f);
      color: #333;
      border-color: #f7df1e;
    }

    .card-footer {
      border-top: 1px solid #f0f0f0;
      padding-top: 1rem;
    }

    .workshop-link {
      color: #007bff;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .workshop-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .location-date {
        align-items: flex-start;
      }
    }
  `
})
export class WorkshopCardComponent {
  readonly workshopItem = input.required<Workshop>(); 
  readonly workshopSelected = output<Workshop>();

  private readonly workshopSignalService = inject(WorkshopSignalService);

  protected handleCardClick(): void {
    this.workshopSelected.emit(this.workshopItem());
    this.workshopSignalService.setSelectedWorkshop(this.workshopItem());
  }

  protected getLinkText(): string {
    switch (this.workshopItem().type) {
      case 'conference':
        return 'View Conference';
      case 'workshop':
        return 'View Workshop';
      case 'collaboration':
        return 'View Collaboration';
      default:
        return 'View Details';
    }
  }
}
