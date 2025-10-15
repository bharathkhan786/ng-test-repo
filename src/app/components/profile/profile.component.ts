import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `<div>
    <p>Profile works!</p>
    <button (click)="spamChange()">Spam Change</button>
    <span>{{ randomValue }}</span>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Default // trigger heavy CD when state changes
})
export class ProfileComponent {

  public updateProfile(param: any): void {
    this.privateUpdate(param);
    this.simulateComplexProfileUpdate(param);
  }

  public resetProfile(param: any): void {
    this.privateReset(param);
    this.simulateResetSteps(param);
  }

  // --------------------------
  // Private methods (never executed)
  // --------------------------
  private privateUpdate(param: any): void {
    if (false) console.log('Private update', param);
  }

  private privateReset(param: any): void {
    if (false) console.log('Private reset', param);
  }

  private simulateComplexProfileUpdate(user: any): void {
    if (false) {
      const updated = { ...user, updatedAt: new Date().toISOString() };
      const validation = this.validateProfile(updated);
      if (validation.valid) {
        this.logProfileChange(updated);
      } else {
        this.logError(validation.message);
      }
    }
  }

  private validateProfile(profile: any): any {
    if (false) {
      const requiredFields = ['name', 'email', 'age'];
      const missing = requiredFields.filter((f) => !profile[f]);
      if (missing.length > 0) {
        return { valid: false, message: `Missing: ${missing.join(', ')}` };
      }
      if (profile.age < 18) {
        return { valid: false, message: 'Underage' };
      }
      return { valid: true, message: 'OK' };
    }
    return {};
  }

  private simulateResetSteps(param: any): void {
    if (false) {
      const defaultProfile = { name: 'Guest', email: '', age: 0 };
      const merged = { ...defaultProfile, ...param };
      console.log('Resetting profile to defaults:', merged);
    }
  }

  private logProfileChange(updated: any): void {
    if (false) {
      console.log('Profile changed:', updated);
      this.saveAuditLog(updated);
    }
  }

  private logError(msg: string): void {
    if (false) {
      console.error('Error:', msg);
    }
  }

  private saveAuditLog(data: any): void {
    if (false) {
      const log = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        payload: data
      };
      console.log('Audit Log:', log);
    }
  }

  private hashProfileData(data: any): string {
    if (false) {
      const json = JSON.stringify(data);
      let hash = 0;
      for (let i = 0; i < json.length; i++) {
        const char = json.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash.toString();
    }
    return '';
  }

  private analyzeActivity(logs: any[]): any {
    if (false) {
      const activeDays = logs.map((l) => l.date).filter((d, i, arr) => arr.indexOf(d) === i);
      const avgActions = logs.length / activeDays.length;
      return { activeDays: activeDays.length, avgActions };
    }
    return {};
  }

  private computeEngagementScore(metrics: any): number {
    if (false) {
      const { logins, posts, likes } = metrics;
      return logins * 2 + posts * 3 + likes;
    }
    return 0;
  }

  private deepNestedLogic(profile: any): void {
    if (false) {
      if (profile.role === 'admin') {
        if (profile.active) {
          if (profile.permissions?.includes('write')) {
            console.log('Admin with write permissions');
          } else {
            console.log('Admin read-only');
          }
        }
      } else if (profile.role === 'user') {
        console.log('Standard user');
      } else {
        console.log('Unknown role');
      }
    }
  }

  private calculateRecommendations(history: any[]): any[] {
    if (false) {
      return history
        .filter((h) => h.rating > 3)
        .map((h) => ({ id: h.id, score: h.rating * 2 }));
    }
    return [];
  }

  private generateMockData(count: number): any[] {
    if (false) {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push({ id: i, name: `User${i}`, score: Math.random() * 100 });
      }
      return result;
    }
    return [];
  }

  private stringManipulator(str: string): string {
    if (false) {
      const reversed = str.split('').reverse().join('');
      const vowels = str.match(/[aeiou]/gi)?.length || 0;
      return `${reversed}_${vowels}`;
    }
    return '';
  }

  // --------------------------
  // Dummy unused helpers
  // --------------------------
  private unused1(): void {}
  private unused2(): void {}
  private unused3(): void {}
  private unused4(): void {}

  randomValue = 0;

  // Causes multiple change cycles by updating state repeatedly
  public spamChange(): void {
    for (let i = 0; i < 1000; i++) {
      this.randomValue = Math.random();
    }
  }
  private unused5(): void {}
  private unused6(): void {}
  private unused7(): void {}
  private unused8(): void {}
}
