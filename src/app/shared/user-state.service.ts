import { Injectable, signal } from '@angular/core';
import { User } from '../types/user.types';

@Injectable()
export class UserStateService {
  // 3.2 Multiple instances possible using Injector (Local Instance)
  // Local state for this service instance
  private readonly selectedUserSignal = signal<User | null>(null);
  readonly selectedUser = this.selectedUserSignal.asReadonly();

  setSelectedUser(user: User): void {
    this.selectedUserSignal.set(user);
  }

  clearSelectedUser(): void {
    this.selectedUserSignal.set(null);
  }
}
