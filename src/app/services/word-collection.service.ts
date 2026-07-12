import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorcommonService } from './errorcommon.service';
import { WordCollection } from '../models/word-collection';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordCollectionService {

  private getAllWordsUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getAllWords}`;
  private getWordByIdUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getWordById}`;
  private getWordByNameUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getWordByName}`;
  private createWordUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.createWord}`;

  constructor(private httpClient: HttpClient, private errServ: ErrorcommonService) { }

  getAllWords(): Observable<WordCollection[]> {
    return this.httpClient.get<WordCollection[]>(this.getAllWordsUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(err);
      })
    );
  }

  updateWordById(wordId: number, wordData: WordCollection): Observable<WordCollection> {
    const updateWordUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.updateWordById}/${wordId}`;
    return this.httpClient.put<WordCollection>(updateWordUrl, wordData).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(err);
      })
    );
  }
}
