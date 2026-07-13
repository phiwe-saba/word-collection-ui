import { Component } from '@angular/core';
import { WordCollectionService } from '../../../services/word-collection.service';
import { WordCollection } from '../../../models/word-collection';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoading: boolean = false;
  data: WordCollection[] = [];

  constructor(private wordCollectionService: WordCollectionService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.wordCollectionService.getAllWords().subscribe({
      next: (response) => {
        this.data = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  addWord(): void {
    this.router.navigate(['/add-word']);
  }

  editWord(wordId: number): void {
    this.router.navigate(['/edit-word', wordId]);
  }

  deleteWord(wordId: number): void {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    console.log('Deleting record with ID:', wordId);
    this.wordCollectionService.deleteWordById(wordId).subscribe({
      next: () => {
        this.data = this.data.filter(x => x.id !== wordId);
        console.log('data', this.data);
        console.log('wordId', wordId);
      },
      error: (err) => {
        console.error('Error deleting record:', err);
      }
    });
  }
}
