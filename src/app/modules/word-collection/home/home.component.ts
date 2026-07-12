import { Component } from '@angular/core';
import { WordCollectionService } from '../../../services/word-collection.service';
import { WordCollection } from '../../../models/word-collection';
import { RouterOutlet } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoading: boolean = false;
  data: WordCollection[] = [];

  constructor(private wordCollectionService: WordCollectionService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.wordCollectionService.getAllWords().subscribe(
      (response: WordCollection[]) => {
        this.data = response;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  editWord(wordId: number): void {
    // Implement the logic to edit the word with the given wordId
    console.log('Edit word with ID:', wordId);
  }

  deleteWord(wordId: number): void {
    // Implement the logic to delete the word with the given wordId
    console.log('Delete word with ID:', wordId);
  }
}
