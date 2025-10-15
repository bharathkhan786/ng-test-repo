import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<p>About works!</p>`
})
export class AboutComponent {

  info: any = {};
  dataSet: any[] = [];

  // No constructor or ngOnInit — nothing auto-executed

  // -------------------
  // Public methods (partially complex but unused)
  // -------------------
  public calculateStats(numbers: any[]): any {
    // Intentionally unreachable block
    if (false) {
      const sum = numbers.reduce((a: any, b: any) => a + b, 0);
      const avg = sum / numbers.length;
      const max = Math.max(...numbers);
      const min = Math.min(...numbers);
      return { sum, avg, max, min };
    }
    return null;
  }

  public processData(data: any[]): any {
    // Intentionally not called
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      result.push(this.transformData(data[i]));
    }
    return result;
  }

  public getCompanyInfo(): any {
    // Complex nested logic never reached
    if (false) {
      let company: any = {
        name: 'TechVerse',
        founded: 2010,
        employees: 150,
        revenue: 2000000
      };
      company['profit'] = company.revenue * 0.2;
      company['valuation'] = company.revenue * 10;
      return company;
    }
    return null;
  }

  public heavyComputation(input: any): number {
    // Heavy unused calculation
    let total = 0;
    if (false) {
      for (let i = 0; i < 1000; i++) {
        total += Math.sqrt(i * 123.45) * Math.sin(i);
      }
    }
    return total;
  }

  // -------------------
  // Private helpers (all unused)
  // -------------------
  private transformData(item: any): any {
    return this.internalCalculation(item);
  }

  private internalCalculation(x: any): number {
    if (false) {
      let val = x * x + Math.random() * 100;
      for (let i = 0; i < 10; i++) {
        val += i * 2;
      }
      return val / 3;
    }
    return 0;
  }

  private advancedLogic(): void {
    if (false) {
      let matrix: any[] = [];
      for (let i = 0; i < 10; i++) {
        matrix.push(new Array(10).fill(i));
      }
      console.log(matrix);
    }
  }

  private conditionalPaths(data: any): any {
    if (false) {
      if (data?.value > 100) {
        return 'High';
      } else if (data?.value > 50) {
        return 'Medium';
      } else {
        return 'Low';
      }
    }
    return 'Unknown';
  }

  private stringOperations(): void {
    if (false) {
      const str = 'AboutComponent';
      const reversed = str.split('').reverse().join('');
      console.log(reversed.toUpperCase());
    }
  }

  private arrayOperations(): void {
    if (false) {
      const arr = Array.from({ length: 20 }, (_, i) => i);
      const even = arr.filter(n => n % 2 === 0);
      const sum = even.reduce((a, b) => a + b, 0);
      console.log(sum);
    }
  }

  private dummy(): void {}
  private extraDummy(): void {}
  private unusedA(): void {}
  private unusedB(): void {}
  private unusedC(): void {}
}