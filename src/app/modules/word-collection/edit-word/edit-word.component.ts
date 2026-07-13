import { Component } from '@angular/core';
import { UpdateWordRequest } from '../../../DTOs/update-word-request';
import { FormBuilder } from '@angular/forms';
import { WordCollectionService } from '../../../services/word-collection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-word',
  standalone: true,
  imports: [],
  templateUrl: './edit-word.component.html',
  styleUrl: './edit-word.component.css'
})
export class EditWordComponent {
  form: any;
  wordId: number = 0;
  wordTypes: string[] = [];

  constructor(private formBuilder: FormBuilder, private wordCollectionService: WordCollectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  
  update(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: UpdateWordRequest = {
      word: this.form.value.word!,
      wordType: this.form.value.wordType!
    };

    this.wordCollectionService
      .updateWordById(this.wordId, request)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      });

  }
}
