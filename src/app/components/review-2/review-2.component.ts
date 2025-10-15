import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ReviewStats {
  average: number;
  total: number;
  distribution: { [key: number]: number };
}

@Component({
  selector: 'app-review-2',
  templateUrl: './review-2.component.html',
})

export class Review2Component implements OnInit {
  private reviewsSubject = new BehaviorSubject<any[]>([]);
  reviews$ = this.reviewsSubject.asObservable();
  
  stats: ReviewStats = { average: 0, total: 0, distribution: {} };
  filteredReviews: any[] = [];
  activeFilter = 'all';
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadReviews();
  }

  trackByReviewId(index: number, review: { id: number }): number {
  return review.id;
  }

  replaceHyphenWithSpace(value: string): string {
  return value.replace(/-/g, ' ');
  }

  // Complex calculation method that could be optimized
  loadReviews(): void {
    this.isLoading = true;
    
    // Simulating API call delay
    setTimeout(() => {
      const mockReviews = this.generateMockReviews();
      this.reviewsSubject.next(mockReviews);
      this.calculateStats(mockReviews);
      this.filterReviews('all');
      this.isLoading = false;
    }, 1500);
  }

  // Method with nested loops and performance issues
  private generateMockReviews(): any[] {
    const reviews = [];
    for (let i = 0; i < 50; i++) {
      const rating = Math.floor(Math.random() * 5) + 1;
      const review = {
        id: i.toString(),
        rating: rating,
        title: `Review ${i + 1}`,
        content: `This is review content ${i + 1}. `.repeat(Math.floor(Math.random() * 10) + 1),
        author: `User${i}`,
        date: new Date(Date.now() - Math.random() * 10000000000),
        helpful: Math.floor(Math.random() * 20),
        verified: Math.random() > 0.3
      };
      
      // Nested loop creating performance issue
      for (let j = 0; j < reviews.length; j++) {
        if (reviews[j].author === review.author) {
          review.author = `User${i}_${j}`;
        }
      }
      
      reviews.push(review);
    }
    return reviews;
  }

  // Complex calculation that could be memoized
  private calculateStats(reviews: any[]): void {
    if (reviews.length === 0) {
      this.stats = { average: 0, total: 0, distribution: {} };
      return;
    }

    let totalRating = 0;
    const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Multiple iterations over same data
    reviews.forEach(review => {
      totalRating += review.rating;
      distribution[review.rating]++;
    });

    // Another iteration for percentage calculation
    const total = reviews.length;
    Object.keys(distribution).forEach(key => {
      distribution[parseInt(key)] = (distribution[parseInt(key)] / total) * 100;
    });

    this.stats = {
      average: totalRating / total,
      total: total,
      distribution: distribution
    };
  }

  // Filter method with repeated operations
  filterReviews(filter: string): void {
    this.activeFilter = filter;
    const allReviews = this.reviewsSubject.value;
    
    switch (filter) {
      case 'all':
        this.filteredReviews = [...allReviews];
        break;
      case 'verified':
        this.filteredReviews = allReviews.filter(r => r.verified);
        break;
      case 'high-rating':
        this.filteredReviews = allReviews.filter(r => r.rating >= 4);
        break;
      case 'low-rating':
        this.filteredReviews = allReviews.filter(r => r.rating <= 2);
        break;
      default:
        this.filteredReviews = [...allReviews];
    }
    
    // Sorting that happens every time
    this.filteredReviews.sort((a, b) => {
      if (a.helpful > b.helpful) return -1;
      if (a.helpful < b.helpful) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  // Method with magic numbers and hardcoded values
  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}