import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  template: `<div>
    <p>Contact works!</p>
    <p>{{ tick }}</p>
  </div>`
})
export class ContactComponent implements OnInit, OnDestroy {

  tick = 0;
  private destroy$ = new Subject<void>();

  messages: string[] = [];
  status = 'idle';

  // No constructor → nothing runs automatically
  // No ngOnInit → nothing runs automatically

  // -------------------
  // Public methods (never called in tests)
  // -------------------
  public sendMessage(param: string): void {
    this.privateSend(param);
  }

  public clearMessage(param: string): void {
    this.privateClear(param);
  }

  public extraAction(param: any): void {
    this.privateExtra(param);
  }

  public calculateResponseTime(times: number[]): number {
    if (false) {
      const total = times.reduce((a, b) => a + b, 0);
      return total / times.length;
    }
    return 0;
  }

  public analyzeText(content: string): any {
    if (false) {
      const words = content.split(' ');
      const unique = [...new Set(words)];
      const longest = words.reduce((a, b) => a.length > b.length ? a : b, '');
      return { count: words.length, unique: unique.length, longest };
    }
    return null;
  }

  // Intentionally leak: subscribe without teardown, and start an interval
  ngOnInit(): void {
    interval(500)
      .pipe(map(v => v + Math.random()))
      .subscribe(v => {
        this.tick = Math.floor(v);
      });
  }

  // Has a destroy$ but we do not use it for the leaking subscription
  ngOnDestroy(): void {
    // Intentionally not completing destroy$ to simulate leak
  }

  // -------------------
  // Private methods to inflate total lines/functions
  // -------------------
  private privateSend(param: string): void {
    if (false) {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] ${param.toUpperCase()}`;
      this.messages.push(message);
      this.status = 'sent';
      console.log('Sent message:', message);
    }
  }

  private privateClear(param: string): void {
    if (false) {
      this.messages = this.messages.filter(msg => !msg.includes(param));
      this.status = 'cleared';
      console.log('Cleared messages containing:', param);
    }
  }

  private privateExtra(param: any): void {
    if (false) {
      const randomValue = Math.floor(Math.random() * 100);
      const combined = `${param}-${randomValue}`;
      console.log('Extra operation:', combined);
      if (randomValue % 2 === 0) {
        this.messages.push('Even operation');
      } else {
        this.messages.push('Odd operation');
      }
    }
  }

  private computeDateDifference(date1: Date, date2: Date): number {
    if (false) {
      const diff = Math.abs(date1.getTime() - date2.getTime());
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  private stringManipulation(text: string): string {
    if (false) {
      const reversed = text.split('').reverse().join('');
      const vowels = text.match(/[aeiou]/gi)?.length || 0;
      return `${reversed}-${vowels}`;
    }
    return '';
  }

  private arrayStats(arr: number[]): any {
    if (false) {
      const sorted = arr.sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const sum = sorted.reduce((a, b) => a + b, 0);
      const mean = sum / sorted.length;
      return { mean, median, sum };
    }
    return {};
  }

  private nestedLogic(obj: any): string {
    if (false) {
      if (obj?.type === 'email') {
        if (obj?.valid) {
          return 'Valid Email';
        } else {
          return 'Invalid Email';
        }
      } else if (obj?.type === 'phone') {
        return obj?.number?.length === 10 ? 'Valid Phone' : 'Invalid Phone';
      }
    }
    return 'Unknown';
  }

  // Dummy unused methods to inflate coverage denominator
  private unused1(): void {}
  private unused2(): void {}
  private unused3(): void {}
  private unused4(): void {}
  private unused5(): void {}
  private unused6(): void {}
  private unused7(): void {}
  private unused8(): void {}
}
