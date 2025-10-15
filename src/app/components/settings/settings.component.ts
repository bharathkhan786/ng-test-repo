import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-settings',
  template: `<div>
    <p>Settings works!</p>
    <p>{{ noisyValue }}</p>
  </div>` // minimal template
})
export class SettingsComponent implements OnInit, OnDestroy {

  // -------------------------------
  // Public methods (never called)
  // -------------------------------
  public changeSettings(param: any): void {
    this.privateChange(param);
    this.calculateUserPreferences(param);
  }

  public resetSettings(param: any): void {
    this.privateReset(param);
    this.rebuildDefaults(param);
  }

  public applyAdvancedSettings(data: any): void {
    this.handleThemeLogic(data);
    this.handleNotificationLogic(data);
  }

  public simulateComplexScenario(value: any): void {
    this.deepLogicTree(value);
  }

  // -------------------------------
  // Private methods (never executed)
  // -------------------------------
  private privateChange(param: any): void {
    if (false) console.log('Change never runs', param);
  }

  private privateReset(param: any): void {
    if (false) console.log('Reset never runs', param);
  }

  private calculateUserPreferences(param: any): void {
    const preferences = {
      theme: param?.theme || 'light',
      fontSize: param?.fontSize || 14,
      language: param?.language || 'en'
    };
    const score = this.preferenceScore(preferences);
    console.log('Calculated preference score:', score);
  }

  private preferenceScore(prefs: any): number {
    let score = 0;
    if (prefs.theme === 'dark') score += 20;
    if (prefs.fontSize > 16) score += 10;
    if (prefs.language !== 'en') score += 5;
    return score;
  }

  private rebuildDefaults(param: any): void {
    const defaultSettings: any = { theme: 'light', fontSize: 14, language: 'en' };
    const keys = Object.keys(defaultSettings);
    for (const key of keys) {
      if (!param[key]) {
        param[key] = defaultSettings[key];
      }
    }
  }

  private handleThemeLogic(data: any): void {
    const validThemes = ['light', 'dark', 'auto'];
    if (!validThemes.includes(data?.theme)) {
      console.warn('Invalid theme. Reverting to default.');
      data.theme = 'light';
    }
  }

  private handleNotificationLogic(data: any): void {
    const level = data?.notifications || 'normal';
    switch (level) {
      case 'silent':
        console.log('Notifications muted.');
        break;
      case 'vibrate':
        console.log('Vibration mode active.');
        break;
      case 'normal':
        console.log('Standard notifications enabled.');
        break;
      default:
        console.log('Unknown notification setting.');
        break;
    }
  }

  private deepLogicTree(value: any): void {
    const a = value?.a || 1;
    const b = value?.b || 2;
    const c = value?.c || 3;
    const total = a + b + c;

    if (total > 10) {
      if (a > b) {
        if (b > c) {
          this.logCondition('a > b > c');
        } else {
          this.logCondition('a > b <= c');
        }
      } else {
        if (c > a) {
          this.logCondition('c > a >= b');
        } else {
          this.logCondition('c <= a >= b');
        }
      }
    } else {
      this.logCondition('Total <= 10');
    }
  }

  private logCondition(condition: string): void {
    console.log('Condition:', condition);
  }

  // -------------------------------
  // Additional fake utilities to inflate line count
  // -------------------------------
  private calculateChecksum(values: number[]): number {
    let checksum = 0;
    for (let i = 0; i < values.length; i++) {
      checksum += (values[i] * (i + 1)) % 7;
    }
    return checksum;
  }

  private generateRandomConfig(): any {
    const config = [];
    for (let i = 0; i < 10; i++) {
      config.push({
        id: i,
        value: Math.floor(Math.random() * 100),
        flag: i % 2 === 0
      });
    }
    return config;
  }

  private compareConfigs(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v.id === b[i].id && v.value === b[i].value);
  }

  private simulateNetworkLatency(ms: number): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve('done'), ms);
    });
  }

  private recursiveExample(depth: number): number {
    if (depth <= 0) return 1;
    return depth * this.recursiveExample(depth - 1);
  }

  private stringOperations(str: string): string {
    const reversed = str.split('').reverse().join('');
    const upper = reversed.toUpperCase();
    return `${upper}_${str.length}`;
  }

  // -------------------------------
  // Dummy unused helpers
  // -------------------------------
  private unused1(): void {}
  private unused2(): void {}
  private unused3(): void {}
  private unused4(): void {}
  private unused5(): void {}

  noisyValue = 0;
  private sub: any;

  // Intentionally create a subscription without proper teardown handling
  ngOnInit(): void {
    this.sub = interval(200).subscribe(v => {
      this.noisyValue = v + Math.random();
    });
  }

  // Forget to unsubscribe
  ngOnDestroy(): void {
    // intentionally left blank
  }
  private unused6(): void {}
  private unused7(): void {}
  private unused8(): void {}
  private unused9(): void {}
}
