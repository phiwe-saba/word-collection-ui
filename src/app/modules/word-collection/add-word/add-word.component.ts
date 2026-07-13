import { Component } from '@angular/core';
import { WordCollectionService } from '../../../services/word-collection.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWordRequest } from '../../../DTOs/create-word-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-word',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-word.component.html',
  styleUrl: './add-word.component.css'
})
export class AddWordComponent {

  constructor(private formBuilder: FormBuilder, private wordCollectionService: WordCollectionService, private router: Router) { }

  wordTypes: string[] = [];
  isLoading = false;

  form = this.formBuilder.group({
    word: ['', Validators.required],
    wordType: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadWordTypes();
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

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request: CreateWordRequest = {
      word: this.form.value.word!,
      wordType: this.form.value.wordType!
    };

    this.wordCollectionService.createWord(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
