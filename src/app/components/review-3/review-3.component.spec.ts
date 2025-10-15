import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Review3Component } from './review-3.component';

jest.mock('./review-3.component.html', () => '');

describe('Review3Component', () => {
  let component: Review3Component;
  let fixture: ComponentFixture<Review3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review3Component],
      imports: [FormsModule]
    })
      .overrideComponent(Review3Component, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(Review3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should approve review correctly', () => {
    component.moderationQueue = [{ id: '1', title: 'Test Review' }];
    component.approveReview('1');
    expect(component.moderationQueue.length).toBe(0);
    expect(component.approvedReviews.length).toBe(1);
  });
});