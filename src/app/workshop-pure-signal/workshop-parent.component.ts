import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { WorkshopSignalService } from '../shared/workshop.signal.service';
import { Workshop } from '../types/workshop.types';
import { WorkshopCardComponent } from './workshop-card.component';

@Component({
  selector: 'app-workshop-parent',
  imports: [WorkshopCardComponent, JsonPipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="workshop-section">
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
        @if (workshops().length) {
          <div class="stats-bar">
            <div class="stat">
              <span class="stat-number">{{ workshopCount() }}</span>
              <span class="stat-label">Total Events</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ conferences().length }}</span>
              <span class="stat-label">Conferences</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ workshops().length }}</span>
              <span class="stat-label">Workshops</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ collaborations().length }}</span>
              <span class="stat-label">Collaborations</span>
            </div>
          </div>

          <div class="filter-tabs">
            <button 
              class="filter-tab" 
              [class.active]="activeFilter() === 'all'"
              (click)="setFilter('all')">
              All ({{ workshopCount() }})
            </button>
            <button 
              class="filter-tab" 
              [class.active]="activeFilter() === 'conference'"
              (click)="setFilter('conference')">
              Conferences ({{ conferences().length }})
            </button>
            <button 
              class="filter-tab" 
              [class.active]="activeFilter() === 'workshop'"
              (click)="setFilter('workshop')">
              Workshops ({{ workshops().length }})
            </button>
            <button 
              class="filter-tab" 
              [class.active]="activeFilter() === 'collaboration'"
              (click)="setFilter('collaboration')">
              Collaborations ({{ collaborations().length }})
            </button>
          </div>

          <section class="workshop-grid">
            @for (workshop of filteredWorkshops(); track workshop.id) {
              <app-workshop-card
                [workshopItem]="workshop" 
                (workshopSelected)="handleWorkshopSelection($event)" 
              />
            }
          </section>

          @if (selectedWorkshop()) {
            <div class="selection-info">
              <h3>Selected Event: {{ selectedWorkshop()?.title }}</h3>
              <p><strong>Type:</strong> {{ selectedWorkshop()?.type | titlecase }}</p>
              <p><strong>Category:</strong> {{ selectedWorkshop()?.category }}</p>
              @if (selectedWorkshop()?.location) {
                <p><strong>Location:</strong> {{ selectedWorkshop()?.location }}</p>
              }
              @if (selectedWorkshop()?.date) {
                <p><strong>Date:</strong> {{ selectedWorkshop()?.date }}</p>
              }
              <div class="tech-section">
                <strong>Technologies:</strong>
                <div class="tech-badges">
                  @for (tech of selectedWorkshop()?.techs || []; track tech) {
                    <span class="tech-badge" [class]="'tech-badge ' + tech">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
              <p><strong>Description:</strong> {{ selectedWorkshop()?.description }}</p>
              <a 
                [href]="selectedWorkshop()?.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="workshop-link">
                {{ getLinkText() }} →
              </a>
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
    .workshop-section {
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

    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-tab {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 25px;
      background: white;
      color: #666;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-tab:hover {
      border-color: #007bff;
      color: #007bff;
    }

    .filter-tab.active {
      background: #007bff;
      border-color: #007bff;
      color: white;
    }

    .workshop-grid {
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

    .workshop-link {
      display: inline-block;
      margin-top: 1rem;
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .workshop-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .workshop-section {
        padding: 1rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .stats-bar {
        flex-direction: column;
        gap: 1rem;
      }

      .filter-tabs {
        flex-direction: column;
        align-items: center;
      }

      .workshop-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class WorkshopParentComponent {
  title = 'Speaking & Workshops';
  
  private readonly workshopSignalService = inject(WorkshopSignalService);
  
  readonly isLoading = this.workshopSignalService.isLoading;
  readonly isError = this.workshopSignalService.isError;
  readonly workshops = this.workshopSignalService.items;
  readonly selectedWorkshop = this.workshopSignalService.selectedWorkshop;
  readonly errorDetails = this.workshopSignalService.errorDetails;
  readonly workshopCount = this.workshopSignalService.workshopCount;
  readonly conferences = this.workshopSignalService.conferences;
  readonly workshopsFiltered = this.workshopSignalService.workshops;
  readonly collaborations = this.workshopSignalService.collaborations;

  private readonly activeFilterSignal = signal<'all' | 'conference' | 'workshop' | 'collaboration'>('all');
  readonly activeFilter = this.activeFilterSignal.asReadonly();

  readonly filteredWorkshops = computed(() => {
    const filter = this.activeFilterSignal();
    switch (filter) {
      case 'conference':
        return this.conferences();
      case 'workshop':
        return this.workshopsFiltered();
      case 'collaboration':
        return this.collaborations();
      default:
        return this.workshops();
    }
  });
   
  readonly subtitle = input('International speaker, workshop leader, and community contributor');
  readonly loadingMessage = input('Loading workshops and speaking engagements...');
  readonly errorMessage = input('An error occurred while loading workshop data');
  readonly emptyMessage = input('No workshop data found');
   
  protected handleWorkshopSelection(workshop: Workshop): void {
    this.workshopSignalService.setSelectedWorkshop(workshop);
    
    console.log('Workshop selected in Workshop Parent Component:', workshop);
    console.log('Parent state updated via service signal');
  }

  protected setFilter(filter: 'all' | 'conference' | 'workshop' | 'collaboration'): void {
    this.activeFilterSignal.set(filter);
  }

  protected getLinkText(): string {
    const workshop = this.selectedWorkshop();
    if (!workshop) return 'View Details';
    
    switch (workshop.type) {
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
