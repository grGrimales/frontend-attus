import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnDestroy {
  @Output() search = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  constructor() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value);
    });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}