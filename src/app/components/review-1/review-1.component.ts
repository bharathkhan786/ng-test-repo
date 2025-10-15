import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-1',
  templateUrl: './review-1.component.html'
})
export class Review1Component implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      productId: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      title: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      recommend: [true]
    });
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  // This method has optimization opportunities - could use caching, error handling
  loadReviews(): void {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
      // Inefficient sorting - could be optimized
      this.reviews.sort((a, b) => {
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
    }
  }

  // Complex method that could be refactored
  submitReview(): void {
    if (this.reviewForm.valid) {
      this.isSubmitting = true;
      const newReview = {
        id: Date.now().toString(),
        ...this.reviewForm.value,
        createdAt: new Date(),
        helpful: 0,
        verified: Math.random() > 0.5
      };

      // Duplicate logic that could be extracted
      setTimeout(() => {
        this.reviews.unshift(newReview);
        localStorage.setItem('reviews', JSON.stringify(this.reviews));
        
        // More duplicate sorting logic
        this.reviews.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        
        this.reviewForm.reset({ rating: 5, recommend: true });
        this.isSubmitting = false;
      }, 1000);
    }
  }

  // Method with code duplication opportunities
  markHelpful(reviewId: string): void {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpful = review.helpful || 0;
      review.helpful++;
      localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }
  }

  // Another method with similar patterns
  deleteReview(reviewId: string): void {
    this.reviews = this.reviews.filter(r => r.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }
}