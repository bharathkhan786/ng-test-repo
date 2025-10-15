import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Review2Component } from './review-2.component';

jest.mock('./review-2.component.html', () => '');

describe('Review2Component', () => {
  let component: Review2Component;
  let fixture: ComponentFixture<Review2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review2Component]
    })
      .overrideComponent(Review2Component, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(Review2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate stats correctly', () => {
    const mockReviews = [
      { rating: 5 }, { rating: 4 }, { rating: 3 }
    ];
    component['calculateStats'](mockReviews);
    expect(component.stats.average).toBe(4);
    expect(component.stats.total).toBe(3);
  });
});