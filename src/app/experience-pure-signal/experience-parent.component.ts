import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ExperienceSignalService } from '../shared/experience.signal.service';
import { Experience } from '../types/experience.types';
import { ExperienceCardComponent } from './experience-card.component';

@Component({
  selector: 'app-experience-parent',
  imports: [ExperienceCardComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="experience-section">
      <header class="section-header">
        <h2>{{ title }}</h2>
        <p class="subtitle">{{ subtitle() }}</p>
      </header>
     
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
        @if (experiences().length) {
          <div class="stats-bar">
            <div class="stat">
              <span class="stat-number">{{ experienceCount() }}</span>
              <span class="stat-label">Total Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ angularExperiences().length }}</span>
              <span class="stat-label">Angular Projects</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ analyticsExperiences().length }}</span>
              <span class="stat-label">Analytics Roles</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ getUniqueTechs().length }}</span>
              <span class="stat-label">Technologies</span>
            </div>
          </div>

          <section class="experience-grid">
            @for (experience of experiences(); track experience.id) {
              <app-experience-card
                [experienceItem]="experience" 
                (experienceSelected)="handleExperienceSelection($event)" 
              />
            }
          </section>

          @if (selectedExperience()) {
            <div class="selection-info">
              <h3>Selected Experience: {{ selectedExperience()?.company }}</h3>
              <p><strong>Role:</strong> {{ selectedExperience()?.role }}</p>
              <p><strong>Duration:</strong> {{ selectedExperience()?.date }}</p>
              <p><strong>Location:</strong> {{ selectedExperience()?.country }}</p>
              <div class="tech-section">
                <strong>Technologies:</strong>
                <div class="tech-badges">
                  @for (tech of selectedExperience()?.techs || []; track tech) {
                    <span class="tech-badge" [class]="'tech-badge ' + tech">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
              <p><strong>Description:</strong> {{ selectedExperience()?.description }}</p>
              @if (selectedExperience()?.info) {
                <a 
                  [href]="selectedExperience()?.info" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="company-link">
                  Visit Company Website →
                </a>
              }
            </div>
          }
        } @else {
          <div class="empty-state">
            <p>{{ emptyMessage() }}</p>
          </div>
        }
      }
    </section>
  `,
  styles: `
    .experience-section {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      font-size: 1.125rem;
      color: #666;
      margin: 0;
    }

    .loading-state,
    .error-state,
    .empty-state {
      text-align: center;
      padding: 3rem;
    }

    .error-details {
      font-size: 0.875rem;
      color: #dc3545;
      margin-top: 0.5rem;
    }

    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .experience-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .selection-info {
      margin-top: 2rem;
      padding: 2rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border-left: 4px solid #007bff;
    }

    .selection-info h3 {
      color: #2c3e50;
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .selection-info p {
      margin: 0.5rem 0;
      color: #555;
      line-height: 1.6;
    }

    .selection-info strong {
      color: #2c3e50;
    }

    .tech-section {
      margin: 1rem 0;
    }

    .tech-section .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .tech-section .tech-badge {
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

    .company-link {
      display: inline-block;
      margin-top: 1rem;
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .company-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .experience-section {
        padding: 1rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .stats-bar {
        flex-direction: column;
        gap: 1rem;
      }

      .experience-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ExperienceParentComponent {
  title = 'Professional Experience';
  private readonly experienceSignalService = inject(ExperienceSignalService);
  
  readonly isLoading = this.experienceSignalService.isLoading;
  readonly isError = this.experienceSignalService.isError;
  readonly experiences = this.experienceSignalService.items;
  readonly selectedExperience = this.experienceSignalService.selectedExperience;
  readonly errorDetails = this.experienceSignalService.errorDetails;
  readonly experienceCount = this.experienceSignalService.experienceCount;
  readonly angularExperiences = this.experienceSignalService.angularExperiences;
  readonly analyticsExperiences = this.experienceSignalService.analyticsExperiences;

  getUniqueTechs(): string[] {
    const allTechs = this.experiences().flatMap(exp => exp.techs || []);
    return [...new Set(allTechs)].sort();
  }
   
  readonly subtitle = input('Senior Angular Front-End Developer | User-Centric UX & Analytics');
  readonly loadingMessage = input('Loading professional experience...');
  readonly errorMessage = input('An error occurred while loading experience data');
  readonly emptyMessage = input('No experience data found');
   
  protected handleExperienceSelection(experience: Experience): void {
    this.experienceSignalService.setSelectedExperience(experience);
  }
}
