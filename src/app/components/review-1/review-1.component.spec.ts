import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Review1Component } from './review-1.component';

jest.mock('./review-1.component.html', () => '');

describe('Review1Component', () => {
  let component: Review1Component;
  let fixture: ComponentFixture<Review1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Review1Component],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder
      ]
    })
      .overrideComponent(Review1Component, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(Review1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit review when form is valid', () => {
    component.reviewForm.patchValue({
      productId: '1',
      rating: 5,
      title: 'Great product!',
      content: 'This is an amazing product that I would recommend.',
      recommend: true
    });

    const submitSpy = jest.spyOn(component, 'submitReview');
    component.submitReview();
    expect(submitSpy).toHaveBeenCalled();
  });
});