import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Experience } from './../types/experience.types';

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService {
  private readonly baseUrl = 'https://raw.githubusercontent.com/leolanese/React-ContextAPI-portfolio/refs/heads/master/src/resources/experience.json';

  private readonly selectedExperienceSignal = signal<Experience | null>(null);

  private readonly experienceResource = httpResource<Experience[]>(() => ({
    url: this.baseUrl,
    method: 'GET',
    headers: {
      accept: 'application/json'
    },
    defaultValue: []
  }));

  readonly items = computed(() => this.experienceResource.value() ?? []);
  readonly isLoading = this.experienceResource.isLoading;
  readonly isError = computed(() => this.experienceResource.error() as HttpErrorResponse | null);
  readonly selectedExperience = this.selectedExperienceSignal.asReadonly();

  readonly hasExperiences = computed(() => this.items().length > 0);
  readonly experienceCount = computed(() => 15);

  readonly errorDetails = computed(() => this.isError());
  
  readonly angularExperiences = computed(() => 
    this.items().filter(exp => exp.techs?.includes('angular'))
  );
  
  readonly analyticsExperiences = computed(() => 
     this.items().filter(exp => exp.techs?.includes('analytics'))
  );
  
  readonly selectedExperienceDetails = computed(() => {
    const exp = this.selectedExperienceSignal();
    if (!exp) return null;
    
    return {
      company: exp.company,
      role: exp.role,
      date: exp.date,
      country: exp.country,
      description: exp.description,
      hasInfo: !!exp.info
    };
  });

  setSelectedExperience(experience: Experience): void {
    this.selectedExperienceSignal.set(experience);
    console.log('Experience selected in service:', experience);
  }

  clearSelectedExperience(): void {
    this.selectedExperienceSignal.set(null);
  }

  getExperienceById(id: number): Experience | undefined {
    return this.items().find(exp => exp.id === id);
  }

  getExperiencesByCompany(company: string): Experience[] {
    return this.items().filter(exp => 
      exp.company.toLowerCase().includes(company.toLowerCase())
    );
  }
}
