import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from './components/cat-card/cat-card.component';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatCardComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cats: string[] = [];
  likedCats: string[] = [];
  currentIndex = 0;
  buttonEffect: 'like' | 'dislike' | null = null;

  ngOnInit() {
    this.fetchCats();
  }

  async fetchCats() {
  const promises = Array.from({ length: 10 }, () =>
    fetch('https://cataas.com/cat?json=true').then(res => res.json())
  );
  const data = await Promise.all(promises);
  this.cats = data.map(cat => `https://cataas.com/cat/${cat.id}`);
 }

  handleSwipe(action: 'like' | 'dislike') {
    if (action === 'like') this.likedCats.push(this.cats[this.currentIndex]);
    this.currentIndex++;
        setTimeout(() => this.buttonEffect = null, 350);
  }
  

  get remainingCats() {
    return this.cats.slice(this.currentIndex);
  }
}
