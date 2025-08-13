import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ExperienceSignalService } from '../shared/experience.signal.service';
import { Experience } from '../types/experience.types';

@Component({
  selector: 'app-experience-card',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article 
      class="experience-card" 
      role="listitem"
      tabindex="0"
      (click)="handleCardClick()">
              <div class="card-header">
          <div class="company-info">
            <h3 class="company-name">{{ experienceItem().company }}</h3>
            <div class="tech-badges">
              @for (tech of experienceItem().techs || []; track tech) {
                <span class="tech-badge" [class]="'tech-badge ' + tech">
                  {{ tech }}
                </span>
              }
            </div>
          </div>
        <div class="date-location">
          <span class="date">{{ experienceItem().date }}</span>
          <span class="country">{{ experienceItem().country }}</span>
        </div>
      </div>
      
      <div class="card-content">
        <h4 class="role">{{ experienceItem().role }}</h4>
        <p class="description">{{ experienceItem().description }}</p>
      </div>
      
      <div class="card-footer" *ngIf="experienceItem().info">
        <a 
          [href]="experienceItem().info" 
          target="_blank" 
          rel="noopener noreferrer"
          class="company-link"
          (click)="$event.stopPropagation()">
          Visit Company →
        </a>
      </div>
    </article>
  `,
  styles: `
    .experience-card {
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

    .experience-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #007bff;
    }

    .experience-card:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .company-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .company-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
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

    .tech-badge.angular {
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      border-color: #dd0031;
    }

    .tech-badge.aws {
      background: linear-gradient(135deg, #ff9900, #f90);
      color: white;
      border-color: #ff9900;
    }

    .tech-badge.nestjs {
      background: linear-gradient(135deg, #e0234e, #c41e3a);
      color: white;
      border-color: #e0234e;
    }

    .tech-badge.typescript {
      background: linear-gradient(135deg, #3178c6, #235a97);
      color: white;
      border-color: #3178c6;
    }

    .tech-badge.agile {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      border-color: #28a745;
    }

    .tech-badge.analytics {
      background: linear-gradient(135deg, #6f42c1, #5a32a3);
      color: white;
      border-color: #6f42c1;
    }

    .tech-badge.ssr {
      background: linear-gradient(135deg, #17a2b8, #138496);
      color: white;
      border-color: #17a2b8;
    }

    .tech-badge.cypress {
      background: linear-gradient(135deg, #5c5c5e, #4a4a4c);
      color: white;
      border-color: #5c5c5e;
    }

    .tech-badge.mobile-first {
      background: linear-gradient(135deg, #fd7e14, #e55a00);
      color: white;
      border-color: #fd7e14;
    }

    .tech-badge.ngrx {
      background: linear-gradient(135deg, #7b1fa2, #6a1b9a);
      color: white;
      border-color: #7b1fa2;
    }

    .tech-badge.devsecops {
      background: linear-gradient(135deg, #dc3545, #c82333);
      color: white;
      border-color: #dc3545;
    }

    .tech-badge.micro-frontends {
      background: linear-gradient(135deg, #20c997, #17a2b8);
      color: white;
      border-color: #20c997;
    }

    .tech-badge.pubsub {
      background: linear-gradient(135deg, #6f42c1, #5a32a3);
      color: white;
      border-color: #6f42c1;
    }

    .tech-badge.angularjs {
      background: linear-gradient(135deg, #e44d26, #d73a24);
      color: white;
      border-color: #e44d26;
    }

    .tech-badge.couchdb {
      background: linear-gradient(135deg, #ff6b35, #e55a00);
      color: white;
      border-color: #ff6b35;
    }

    .tech-badge.sentry {
      background: linear-gradient(135deg, #362d59, #2a1f3d);
      color: white;
      border-color: #362d59;
    }

    .tech-badge.lighthouse {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: white;
      border-color: #f39c12;
    }

    .date-location {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .date {
      font-size: 0.875rem;
      color: #666;
      font-weight: 500;
    }

    .country {
      font-size: 0.75rem;
      color: #888;
      font-style: italic;
    }

    .card-content {
      flex: 1;
    }

    .role {
      font-size: 1.125rem;
      font-weight: 600;
      color: #34495e;
      margin: 0 0 0.75rem 0;
    }

    .description {
      font-size: 0.875rem;
      color: #555;
      line-height: 1.5;
      margin: 0;
    }

    .card-footer {
      border-top: 1px solid #f0f0f0;
      padding-top: 1rem;
    }

    .company-link {
      color: #007bff;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .company-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .date-location {
        align-items: flex-start;
      }
    }
  `
})
export class ExperienceCardComponent {
  readonly experienceItem = input.required<Experience>(); 
  readonly experienceSelected = output<Experience>();

  private readonly experienceSignalService = inject(ExperienceSignalService);

  protected handleCardClick(): void {
    this.experienceSelected.emit(this.experienceItem());
    this.experienceSignalService.setSelectedExperience(this.experienceItem());
    console.log('Experience selected in Experience Card component:', this.experienceItem());
  }
}
