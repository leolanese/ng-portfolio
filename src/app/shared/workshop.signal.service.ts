import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Workshop } from '../types/workshop.types';

@Injectable({ providedIn: 'root' })
export class WorkshopSignalService {
  private readonly baseUrl = 'https://raw.githubusercontent.com/leolanese/React-ContextAPI-portfolio/refs/heads/master/src/resources/workshops.json';

  private readonly selectedWorkshopSignal = signal<Workshop | null>(null);

  private readonly workshopResource = httpResource<Workshop[]>(() => ({
    url: this.baseUrl,
    method: 'GET',
    headers: {
      accept: 'application/json'
    },
    defaultValue: []
  }));

  readonly items = computed(() => this.workshopResource.value() ?? []);
  readonly isLoading = this.workshopResource.isLoading;
  readonly isError = computed(() => this.workshopResource.error() as HttpErrorResponse | null);
  readonly selectedWorkshop = this.selectedWorkshopSignal.asReadonly();

  readonly hasWorkshops = computed(() => this.items().length > 0);
  readonly workshopCount = computed(() => this.items().length);
  readonly errorDetails = computed(() => this.isError());
  
  readonly conferences = computed(() => 
    this.items().filter(workshop => workshop.type === 'conference')
  );
  
  readonly workshops = computed(() => 
    this.items().filter(workshop => workshop.type === 'workshop')
  );
  
  readonly collaborations = computed(() => 
    this.items().filter(workshop => workshop.type === 'collaboration')
  );
  
  readonly functionalProgrammingWorkshops = computed(() => 
    this.items().filter(workshop => 
      workshop.techs.some(tech => tech.includes('functional'))
    )
  );
  
  readonly selectedWorkshopDetails = computed(() => {
    const workshop = this.selectedWorkshopSignal();
    if (!workshop) return null;
    
    return {
      title: workshop.title,
      type: workshop.type,
      location: workshop.location,
      date: workshop.date,
      description: workshop.description,
      category: workshop.category,
      hasUrl: !!workshop.url
    };
  });

  setSelectedWorkshop(workshop: Workshop): void {
    this.selectedWorkshopSignal.set(workshop);
    console.log('Workshop selected in service:', workshop);
  }

  clearSelectedWorkshop(): void {
    this.selectedWorkshopSignal.set(null);
  }

  getWorkshopsByType(type: 'conference' | 'workshop' | 'collaboration'): Workshop[] {
    return this.items().filter(workshop => workshop.type === type);
  }

  getWorkshopsByTech(tech: string): Workshop[] {
    return this.items().filter(workshop => 
      workshop.techs.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
  }
}
