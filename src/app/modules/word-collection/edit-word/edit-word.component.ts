import { Component } from '@angular/core';
import { UpdateWordRequest } from '../../../DTOs/update-word-request';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WordCollectionService } from '../../../services/word-collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WordCollection } from '../../../models/word-collection';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-word',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-word.component.html',
  styleUrl: './edit-word.component.css'
})
export class EditWordComponent {
  wordId: number = 0;
  wordTypes: string[] = [];
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private wordCollectionService: WordCollectionService, private router: Router, private route: ActivatedRoute) { }

  form = this.formBuilder.group({
    word: ['', Validators.required],
    wordType: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.wordId = Number(id);

    this.loadWordTypes();
    this.loadWord();
  }

  loadWordTypes(): void {
    this.wordCollectionService.getWordTypes().subscribe({
      next: (response) => {
        this.wordTypes = response;
      },

      error: (error: any) => {
        this.isLoading = false;
        console.error('Error fetching word types:', error);
      }
    });
  }

  loadWord(): void {
    this.isLoading = true;
    this.wordCollectionService.getWordById(this.wordId).subscribe({
      next: (response: WordCollection) => {
        this.form.patchValue({
          word: response.word,
          wordType: response.wordType
        });

        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error fetching word details:', error);
      }
    });
  }

  update(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request: UpdateWordRequest = {
      word: this.form.value.word!,
      wordType: this.form.value.wordType!
    };

    this.wordCollectionService.updateWordById(this.wordId, request)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
