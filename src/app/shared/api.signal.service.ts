import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiSignalService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  private readonly selectedUserSignal = signal<any | null>(null);

  private readonly usersResource = httpResource<any[]>(() => ({
    url: `${this.baseUrl}/users`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    },
    defaultValue: []
  }));

  readonly isLoading = this.usersResource.isLoading;
  readonly items = computed(() => this.usersResource.value() ?? []);
  readonly isError = computed(() => this.usersResource.error() as HttpErrorResponse | null);
  readonly selectedUser = this.selectedUserSignal.asReadonly();

  setSelectedUser(user: any): void {
    this.selectedUserSignal.set(user);
    console.log('User selected in service:', user);
  }

  clearSelectedUser(): void {
    this.selectedUserSignal.set(null);
  }
} 