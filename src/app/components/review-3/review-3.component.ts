import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-review-3',
  templateUrl: './review-3.component.html'
})
export class Review3Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  moderationQueue: any[] = [];
  approvedReviews: any[] = [];
  rejectedReviews: any[] = [];
  
  autoRefresh = true;
  refreshInterval = 5000;
  lastUpdated = new Date();

  constructor() {}

  ngOnInit(): void {
    this.loadModerationQueue();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByReviewId(index: number, review: { id: number }): number {
  return review.id;
}

  // Method with complex logic that needs optimization
  private loadModerationQueue(): void {
    // Simulate loading pending reviews for moderation
    const pendingReviews = [];
    
    for (let i = 0; i < 20; i++) {
      const review = {
        id: `pending_${i}`,
        productId: `prod_${Math.floor(Math.random() * 10)}`,
        rating: Math.floor(Math.random() * 5) + 1,
        title: `Pending Review ${i + 1}`,
        content: this.generateRandomContent(),
        author: `Customer${i}`,
        submittedAt: new Date(Date.now() - Math.random() * 86400000),
        flagged: Math.random() > 0.8,
        suspiciousWords: this.checkSuspiciousWords(this.generateRandomContent()),
        authorHistory: this.generateAuthorHistory(`Customer${i}`)
      };
      
      pendingReviews.push(review);
    }
    
    this.moderationQueue = pendingReviews;
    this.sortModerationQueue();
  }

  // Complex text generation with performance issues
  private generateRandomContent(): string {
    const templates = [
      'This product is amazing! I love it so much.',
      'Not what I expected, could be better.',
      'Perfect quality and fast delivery.',
      'Terrible experience, would not recommend.',
      'Good value for money, satisfied with purchase.',
      'Outstanding customer service and product quality.',
      'Disappointed with the build quality.'
    ];
    
    let content = templates[Math.floor(Math.random() * templates.length)];
    
    // Inefficient string concatenation
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
      content += ' ' + templates[Math.floor(Math.random() * templates.length)];
    }
    
    return content;
  }

  // Method with nested loops and inefficient processing
  private checkSuspiciousWords(content: string): string[] {
    const suspiciousWords = ['fake', 'scam', 'terrible', 'awful', 'worst', 'amazing', 'perfect', 'best'];
    const foundWords = [];
    
    // Inefficient nested loop
    for (let i = 0; i < suspiciousWords.length; i++) {
      const words = content.toLowerCase().split(' ');
      for (let j = 0; j < words.length; j++) {
        if (words[j].includes(suspiciousWords[i])) {
          foundWords.push(suspiciousWords[i]);
        }
      }
    }
    
    return foundWords;
  }

  // Method that could benefit from memoization
  private generateAuthorHistory(author: string): any {
    return {
      totalReviews: Math.floor(Math.random() * 50),
      averageRating: Math.random() * 5,
      accountAge: Math.floor(Math.random() * 365),
      verifiedPurchases: Math.floor(Math.random() * 30),
      suspiciousActivity: Math.random() > 0.9
    };
  }

  // Sorting with multiple criteria - could be optimized
  private sortModerationQueue(): void {
    this.moderationQueue.sort((a, b) => {
      // Priority 1: Flagged reviews first
      if (a.flagged && !b.flagged) return -1;
      if (!a.flagged && b.flagged) return 1;
      
      // Priority 2: Reviews with suspicious words
      if (a.suspiciousWords.length > b.suspiciousWords.length) return -1;
      if (a.suspiciousWords.length < b.suspiciousWords.length) return 1;
      
      // Priority 3: Suspicious author activity
      if (a.authorHistory.suspiciousActivity && !b.authorHistory.suspiciousActivity) return -1;
      if (!a.authorHistory.suspiciousActivity && b.authorHistory.suspiciousActivity) return 1;
      
      // Priority 4: Submission date (oldest first)
      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    });
  }

  private startAutoRefresh(): void {
    if (this.autoRefresh) {
      interval(this.refreshInterval)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.refreshData();
        });
    }
  }

  private refreshData(): void {
    this.lastUpdated = new Date();
    // Simulate new reviews coming in
    if (Math.random() > 0.7) {
      this.loadModerationQueue();
    }
  }

  // Action methods with duplicate code
  approveReview(reviewId: string): void {
    const reviewIndex = this.moderationQueue.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      const review = this.moderationQueue.splice(reviewIndex, 1)[0];
      review.status = 'approved';
      review.moderatedAt = new Date();
      this.approvedReviews.unshift(review);
    }
  }

  rejectReview(reviewId: string, reason: string): void {
    const reviewIndex = this.moderationQueue.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      const review = this.moderationQueue.splice(reviewIndex, 1)[0];
      review.status = 'rejected';
      review.rejectionReason = reason;
      review.moderatedAt = new Date();
      this.rejectedReviews.unshift(review);
    }
  }

  flagReview(reviewId: string): void {
    const review = this.moderationQueue.find(r => r.id === reviewId);
    if (review) {
      review.flagged = true;
      this.sortModerationQueue();
    }
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.startAutoRefresh();
    }
  }
}