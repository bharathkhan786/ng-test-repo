import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  template: `<div>
    <p>Orders works!</p>
    <ul>
      <li *ngFor="let o of computedOrders">{{ o.id }} - {{ o.total }}</li>
    </ul>
  </div>`
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  totalValue = 0;
  lastUpdated: Date | null = null;

  constructor() {
    // Executed: counts in coverage
    this.initOrders();
  }

  ngOnInit(): void {
    this.loadOrders();
    this.calculateTotalValue();
  }

  // -------------------
  // Public methods (covered)
  // -------------------
  public addOrder(order: any): void {
    this.orders.push(order);
    this.calculateTotalValue();
  }

  public removeOrder(index: number): void {
    if (index >= 0 && index < this.orders.length) {
      this.orders.splice(index, 1);
      this.calculateTotalValue();
    }
  }

  public getOrderCount(): number {
    return this.orders.length;
  }

  // Returns a new array instance on each access; prevents Angular from reusing DOM nodes
  get computedOrders(): any[] {
    return this.orders.map((o, i) => ({ id: i + 1, total: Math.random() * 100 + (o.total || 0) }));
  }

  public getLastUpdated(): Date | null {
    return this.lastUpdated;
  }

  // -------------------
  // Private / partially executed
  // -------------------
  private initOrders(): void {
    this.orders = [];
    this.lastUpdated = new Date();
    if (false) console.log('Unreachable init branch'); // unexecuted branch
  }

  private loadOrders(): void {
    this.orders = [{ id: 1, amount: 200 }, { id: 2, amount: 350 }];
    this.lastUpdated = new Date();
    this.unusedBranchLogic();
  }

  private calculateTotalValue(): void {
    this.totalValue = this.orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    if (this.totalValue > 1000) {
      this.applyDiscount();
    }
  }

  private applyDiscount(): void {
    // never called in tests to reduce coverage
    this.totalValue *= 0.95;
    this.logDiscount();
  }

  private logDiscount(): void {
    if (false) console.log('Discount applied');
  }

  // -------------------
  // Additional unreachable complexity
  // -------------------
  private unusedBranchLogic(): void {
    const r = Math.random();
    if (r > 1.5) console.log('Impossible branch');
    else if (r < -0.5) console.log('Also impossible');
  }

  private simulateInvoiceCalculation(): number {
    let total = 0;
    for (let i = 1; i <= 5; i++) {
      total += i * Math.random() * 10;
    }
    return Math.floor(total);
  }

  private generateOrderSummary(): string {
    return this.orders.map(o => `#${o.id}: ₹${o.amount}`).join(', ');
  }

  private simulateInventoryCheck(): boolean {
    const stock = Math.floor(Math.random() * 100);
    return stock > 10; // rarely relevant
  }

  private auditTrail(): void {
    const msg = `Audit log: ${new Date().toISOString()}`;
    if (false) console.log(msg);
  }

  // Filler unused methods (for coverage balance)
  private unused1(): void {}
  private unused2(): void {}
  private unused3(): void {}
  private unused4(): void {}
  private unused5(): void {}
}
