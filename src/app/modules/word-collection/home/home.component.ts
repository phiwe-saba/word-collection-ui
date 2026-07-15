import { Component } from '@angular/core';
import { WordCollectionService } from '../../../services/word-collection.service';
import { WordCollection } from '../../../models/word-collection';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { WordFilterRequest } from '../../../DTOs/word-filter-request';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoading: boolean = false;
  data: WordCollection[] = [];
  totalPages: number = 0;
  totalRecords: number = 0;
  wordTypes: string[] = [];

  private isSearchMode: boolean = false;

  filter: WordFilterRequest = {
    word: '',
    wordType: '',
    pageNumber: 1,
    pageSize: 10
  }

  constructor(private wordCollectionService: WordCollectionService, private router: Router) { }

  ngOnInit(): void {
    this.loadWordTypes();
    this.loadData();
  }

  loadWordTypes(): void {
    this.wordCollectionService.getWordTypes().subscribe({
      next: (response: string[]) => {
        this.wordTypes = response;
      },
      error: (error) => {
        console.error('Error fetching word types:', error);
      }
    });
  }

  loadData(): void {
    this.isSearchMode = false;
    this.isLoading = true;

    this.wordCollectionService.getAllWords().subscribe({
      next: (response) => {
        this.totalRecords = response.length;
        this.totalPages = Math.ceil(response.length / this.filter.pageSize) || 1;

        const start = (this.filter.pageNumber - 1) * this.filter.pageSize;
        this.data = response.slice(start, start + this.filter.pageSize);

        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  search(): void {
    this.isSearchMode = true;
    this.filter.pageNumber = 1;
    this.isLoading = true;

    this.wordCollectionService.searchWords(this.filter).subscribe({
      next: (response) => {
        this.data = response.data;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  clear(): void {
    this.filter = {
      word: '',
      wordType: '',
      pageNumber: 1,
      pageSize: 10
    }
    this.loadData();
  }

  nextPage(): void {
    if (this.filter.pageNumber < this.totalPages) {
      this.filter.pageNumber++;
      this.isSearchMode ? this.search() : this.loadData();
    }
  }

  previousPage(): void {
    if (this.filter.pageNumber > 1) {
      this.filter.pageNumber--;
      this.isSearchMode ? this.search() : this.loadData();
    }
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

    this.wordCollectionService.deleteWordById(wordId).subscribe({
      next: () => {
        this.data = this.data.filter(x => x.id !== wordId);
      },
      error: (err) => {
        console.error('Error deleting record:', err);
      }
    });
  }
}
